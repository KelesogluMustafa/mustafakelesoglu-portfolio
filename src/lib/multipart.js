'use strict';

/**
 * Minimal, dependency-free multipart/form-data parser.
 *
 * This build environment has no npm registry access, so a well-known package (multer,
 * busboy, ...) could not be installed or tested here. Rather than declare a dependency that
 * cannot be verified in this environment, the contact form's small, bounded upload (a
 * handful of text fields plus up to 5 documents) is parsed with this self-contained,
 * unit-tested implementation. It only supports what a standard browser form actually sends
 * (RFC 7578 field/file parts with CRLF-delimited boundaries) — it is not a general-purpose
 * multipart library.
 */

const HEADER_SEP = Buffer.from('\r\n\r\n');

/**
 * Parses a Content-Type header and returns its base type plus a `boundary` parameter when
 * present. Handles both quoted and unquoted parameter values.
 */
function parseContentType(header) {
  const raw = String(header || '');
  const [rawType, ...rawParams] = raw.split(';');
  const type = rawType.trim().toLowerCase();
  const params = {};
  for (const part of rawParams) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    const key = part.slice(0, eq).trim().toLowerCase();
    let value = part.slice(eq + 1).trim();
    if (value.startsWith('"') && value.endsWith('"') && value.length >= 2) {
      value = value.slice(1, -1);
    }
    params[key] = value;
  }
  return { type, boundary: params.boundary || null };
}

/** Reverses the backslash-escaping browsers apply to `"` and `\` inside disposition values. */
function unescapeDispositionValue(value) {
  return value.replace(/\\(.)/g, '$1');
}

function parseHeaders(headerBuf) {
  const headers = {};
  const lines = headerBuf.toString('utf8').split('\r\n');
  for (const line of lines) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    headers[line.slice(0, colon).trim().toLowerCase()] = line.slice(colon + 1).trim();
  }
  return headers;
}

function parsePart(partBuf) {
  const sepIndex = partBuf.indexOf(HEADER_SEP);
  if (sepIndex === -1) return null;
  const headers = parseHeaders(partBuf.slice(0, sepIndex));
  const data = partBuf.slice(sepIndex + HEADER_SEP.length);

  const disposition = headers['content-disposition'] || '';
  const nameMatch = /(?:^|;)\s*name="((?:[^"\\]|\\.)*)"/.exec(disposition);
  const filenameMatch = /(?:^|;)\s*filename="((?:[^"\\]|\\.)*)"/.exec(disposition);
  if (!nameMatch) return null;

  return {
    name: unescapeDispositionValue(nameMatch[1]),
    filename: filenameMatch ? unescapeDispositionValue(filenameMatch[1]) : undefined,
    contentType: headers['content-type'],
    data,
  };
}

/**
 * Splits a full multipart/form-data body into parsed parts.
 * Throws a plain Error (never trusts partial/malformed input) if the boundary structure
 * does not match what was declared in the Content-Type header.
 */
function parseMultipart(buffer, boundary) {
  if (!Buffer.isBuffer(buffer)) throw new Error('multipart body must be a Buffer');
  if (!boundary) throw new Error('multipart boundary is required');

  const delimiter = Buffer.from(`--${boundary}`);
  let cursor = buffer.indexOf(delimiter);
  if (cursor === -1) throw new Error('multipart delimiter not found');
  cursor += delimiter.length;

  const parts = [];

  for (;;) {
    if (buffer[cursor] === 0x2d && buffer[cursor + 1] === 0x2d) break; // "--": final boundary
    if (buffer[cursor] === 0x0d && buffer[cursor + 1] === 0x0a) cursor += 2; // CRLF after boundary
    else if (cursor >= buffer.length) throw new Error('multipart body ended unexpectedly');

    const nextDelimiter = buffer.indexOf(delimiter, cursor);
    if (nextDelimiter === -1) throw new Error('multipart body is not terminated correctly');

    let partEnd = nextDelimiter;
    if (buffer[partEnd - 2] === 0x0d && buffer[partEnd - 1] === 0x0a) partEnd -= 2;
    if (partEnd < cursor) throw new Error('malformed multipart part boundaries');

    const part = parsePart(buffer.slice(cursor, partEnd));
    if (part) parts.push(part);

    cursor = nextDelimiter + delimiter.length;
  }

  return parts;
}

module.exports = { parseContentType, parseMultipart };
