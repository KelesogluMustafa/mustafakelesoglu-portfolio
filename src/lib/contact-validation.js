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
  message: { min: 20, max: 3000 },
};

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
  if (values.message.length < LIMITS.message.min || values.message.length > LIMITS.message.max) errors.message = 'message';
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

module.exports = { validateContact, looksLikeSpam, PROJECT_TYPES, BUDGETS, LIMITS };
