'use strict';

/**
 * Server-side validation and normalisation for the contact form.
 * Returns { ok, values, errors } where errors maps field -> error key (resolved in the locale file).
 * The function is pure so it can be unit-tested without HTTP.
 */

const PROJECT_TYPES = ['website', 'wordpress', 'shop', 'app', 'migration', 'maintenance', 'other'];
const BUDGETS = ['unknown', 'b1', 'b2', 'b3', 'b4'];

const LIMITS = {
  name: { min: 2, max: 100 },
  company: { max: 150 },
  email: { max: 254 },
  website: { max: 300 },
  deadline: { max: 100 },
  message: { max: 5000 },
};

/**
 * Optional project-attachment rules. Kept as one exported object so the frontend template
 * can read the same numbers (via data attributes) instead of a second, separately maintained
 * set of constants in the client-side JavaScript.
 */
const ATTACHMENT_LIMITS = {
  maxFiles: 5,
  maxTotalBytes: 10 * 1024 * 1024, // combined size of ALL attachments, not per file
  allowedExtensions: ['.pdf', '.doc', '.docx', '.txt'],
  mimeByExtension: {
    '.pdf': ['application/pdf'],
    '.doc': ['application/msword'],
    '.docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    '.txt': ['text/plain'],
  },
  // Browsers fall back to this when they cannot guess a type; accepted only alongside a
  // matching, allowlisted file extension — never on its own.
  genericMimeFallback: 'application/octet-stream',
};

// File-signature ("magic bytes") checks, independent of the claimed extension/MIME type.
// This is the actual server-side content check the extension/MIME allowlist alone cannot
// provide: a renamed executable or script is rejected even if it is labelled "report.pdf".
const EXECUTABLE_SIGNATURES = [
  Buffer.from([0x4d, 0x5a]), // "MZ" – Windows PE/EXE and DLL
  Buffer.from([0x7f, 0x45, 0x4c, 0x46]), // "\x7fELF" – Linux/Unix executables
  Buffer.from([0xca, 0xfe, 0xba, 0xbe]), // Mach-O / Java class (fat binary)
  Buffer.from([0xfe, 0xed, 0xfa, 0xce]), // Mach-O 32-bit
  Buffer.from([0xfe, 0xed, 0xfa, 0xcf]), // Mach-O 64-bit
];

const FILE_SIGNATURES = {
  '.pdf': [Buffer.from('%PDF-', 'ascii')],
  '.doc': [Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])], // OLE2 compound file
  '.docx': [Buffer.from([0x50, 0x4b, 0x03, 0x04])], // ZIP/OOXML container
};

function startsWithAny(buffer, signatures) {
  return signatures.some((sig) => buffer.length >= sig.length && buffer.subarray(0, sig.length).equals(sig));
}

function extensionOf(filename) {
  const match = /\.[a-z0-9]+$/i.exec(filename || '');
  return match ? match[0].toLowerCase() : '';
}

/** Keeps only a plain, single-segment display name. Never used to build a filesystem path. */
function sanitizeFilename(filename) {
  const base = String(filename || '')
    .replace(/[\\/]+/g, '_') // no path separators
    .replace(/\.\.+/g, '.') // collapse ".." so a name can never look like a traversal attempt
    .replace(/[\x00-\x1f\x7f]/g, '') // strip control characters
    .trim();
  const trimmed = base.slice(0, 150) || 'attachment';
  return trimmed;
}

/**
 * Validates the full set of optional attachments as one unit (count + combined size first,
 * since those are cheap and the most likely reasons to reject), then checks each file's
 * extension, declared MIME type and real file signature. Never trusts the extension alone.
 *
 * @param {{filename: string, mimetype: string, buffer: Buffer}[]} files
 * @returns {{ok: true, files: {filename: string, mimetype: string, buffer: Buffer}[]} | {ok: false, code: string, filename?: string}}
 */
function validateAttachments(files) {
  const list = Array.isArray(files) ? files : [];

  if (list.length > ATTACHMENT_LIMITS.maxFiles) {
    return { ok: false, code: 'attachmentsCount' };
  }

  const totalBytes = list.reduce((sum, f) => sum + (f.buffer ? f.buffer.length : 0), 0);
  if (totalBytes > ATTACHMENT_LIMITS.maxTotalBytes) {
    return { ok: false, code: 'attachmentsSize' };
  }

  const safeFiles = [];
  for (const file of list) {
    const filename = sanitizeFilename(file.filename);
    const ext = extensionOf(filename);
    const buffer = Buffer.isBuffer(file.buffer) ? file.buffer : Buffer.alloc(0);

    if (!ATTACHMENT_LIMITS.allowedExtensions.includes(ext)) {
      return { ok: false, code: 'attachmentsType', filename };
    }

    const declaredMime = String(file.mimetype || '').toLowerCase().split(';')[0].trim();
    const allowedMimes = ATTACHMENT_LIMITS.mimeByExtension[ext] || [];
    const mimeOk = allowedMimes.includes(declaredMime) || declaredMime === ATTACHMENT_LIMITS.genericMimeFallback || declaredMime === '';
    if (!mimeOk) {
      return { ok: false, code: 'attachmentsType', filename };
    }

    if (startsWithAny(buffer, EXECUTABLE_SIGNATURES)) {
      return { ok: false, code: 'attachmentsType', filename };
    }

    // .txt has no reliable magic number; reject anything containing a NUL byte or an
    // HTML/script/PHP opening tag in its first bytes, since that is never valid plain text.
    if (ext === '.txt') {
      const head = buffer.subarray(0, 512);
      if (head.includes(0x00) || /^\s*(<\?php|<script|<html|<!doctype)/i.test(head.toString('utf8'))) {
        return { ok: false, code: 'attachmentsType', filename };
      }
    } else if (!startsWithAny(buffer, FILE_SIGNATURES[ext] || [])) {
      return { ok: false, code: 'attachmentsType', filename };
    }

    safeFiles.push({ filename, mimetype: declaredMime || ATTACHMENT_LIMITS.genericMimeFallback, buffer });
  }

  return { ok: true, files: safeFiles };
}

// Pragmatic email check: one @, no spaces, a dot in the domain part.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(value) {
  if (typeof value !== 'string') return '';
  // Collapse control characters, trim, normalise unicode.
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .normalize('NFC')
    .trim();
}

function singleLine(value) {
  return str(value).replace(/\s+/g, ' ');
}

function normaliseUrl(value) {
  const v = singleLine(value);
  if (!v) return '';
  const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const url = new URL(withScheme);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    if (!url.hostname.includes('.')) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function validateContact(body = {}) {
  const errors = {};
  const values = {
    name: singleLine(body.name),
    company: singleLine(body.company),
    email: singleLine(body.email).toLowerCase(),
    projectType: singleLine(body.projectType),
    website: singleLine(body.website),
    budget: singleLine(body.budget),
    deadline: singleLine(body.deadline),
    message: str(body.message),
    consent: body.consent === 'on' || body.consent === 'true' || body.consent === true || body.consent === '1',
  };

  if (values.name.length < LIMITS.name.min || values.name.length > LIMITS.name.max) errors.name = 'name';
  if (values.company.length > LIMITS.company.max) errors.company = 'company';
  if (!values.email || values.email.length > LIMITS.email.max || !EMAIL_RE.test(values.email)) errors.email = 'email';
  if (!PROJECT_TYPES.includes(values.projectType)) errors.projectType = 'projectType';

  if (values.website) {
    if (values.website.length > LIMITS.website.max) {
      errors.website = 'website';
    } else {
      const normalised = normaliseUrl(values.website);
      if (normalised === null) errors.website = 'website';
      else values.website = normalised;
    }
  }

  if (values.budget && !BUDGETS.includes(values.budget)) errors.budget = 'budget';
  if (!values.budget) values.budget = 'unknown';
  if (values.deadline.length > LIMITS.deadline.max) errors.deadline = 'deadline';
  if (!values.message || values.message.length > LIMITS.message.max) errors.message = 'message';
  if (!values.consent) errors.consent = 'consent';

  return { ok: Object.keys(errors).length === 0, values, errors };
}

/**
 * Honeypot + timing check. The form carries a hidden "website_url" field that humans never
 * fill, and a "ts" field with the render timestamp; submissions faster than a few seconds
 * are almost always bots. Returns true when the submission looks automated.
 */
function looksLikeSpam(body = {}, now = Date.now()) {
  if (typeof body.website_url === 'string' && body.website_url.trim() !== '') return true;
  const ts = Number.parseInt(body.ts, 10);
  if (Number.isNaN(ts)) return false; // JS-disabled or old form: do not punish
  if (now - ts < 3000) return true;
  if (now - ts > 24 * 60 * 60 * 1000) return true;
  return false;
}

module.exports = {
  validateContact,
  looksLikeSpam,
  validateAttachments,
  PROJECT_TYPES,
  BUDGETS,
  LIMITS,
  ATTACHMENT_LIMITS,
};
