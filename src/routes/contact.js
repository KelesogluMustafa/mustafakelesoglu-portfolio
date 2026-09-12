'use strict';

const express = require('express');
const config = require('../config');
const logger = require('../lib/logger');
const { buildMeta } = require('../lib/seo');
const {
  validateContact,
  looksLikeSpam,
  validateAttachments,
  PROJECT_TYPES,
  BUDGETS,
  LIMITS,
  ATTACHMENT_LIMITS,
} = require('../lib/contact-validation');
const { contactRateLimiter } = require('../middleware/security');
const { deliver } = require('../lib/contact-delivery');
const { readRawBody } = require('../lib/raw-body');
const { parseContentType, parseMultipart } = require('../lib/multipart');

const router = express.Router({ mergeParams: true });

const URLENCODED_BODY_LIMIT = 32 * 1024;
// Combined attachment ceiling plus generous slack for text fields, multipart headers and
// boundary overhead — derived from the one shared constant instead of a second magic number.
const MULTIPART_BODY_LIMIT = ATTACHMENT_LIMITS.maxTotalBytes + 256 * 1024;

/**
 * Reads and parses the request body regardless of whether the browser sent it as
 * application/x-www-form-urlencoded (no attachments picked, or a non-JS/legacy client) or
 * multipart/form-data (the contact form's real encoding once file input was added — a
 * browser sends multipart for that form whether or not the visitor actually chose a file).
 * Returns plain text fields plus any raw, not-yet-validated file parts.
 */
async function readContactBody(req) {
  const { type, boundary } = parseContentType(req.headers['content-type']);

  if (type === 'multipart/form-data') {
    if (!boundary) {
      const err = new Error('Missing multipart boundary');
      err.status = 400;
      throw err;
    }
    const raw = await readRawBody(req, MULTIPART_BODY_LIMIT);
    const parts = parseMultipart(raw, boundary);
    const fields = {};
    const files = [];
    for (const part of parts) {
      if (!part.name) continue;
      if (part.filename !== undefined) {
        if (part.filename === '') continue; // browsers send one empty entry when no file was chosen
        files.push({ filename: part.filename, mimetype: part.contentType || '', buffer: part.data });
      } else {
        fields[part.name] = part.data.toString('utf8');
      }
    }
    return { fields, files };
  }

  // Default: application/x-www-form-urlencoded (or unspecified — treated the same way the
  // previous express.urlencoded()-based handler always did).
  const raw = await readRawBody(req, URLENCODED_BODY_LIMIT);
  const fields = {};
  for (const [key, value] of new URLSearchParams(raw.toString('utf8')).entries()) {
    fields[key] = value;
  }
  return { fields, files: [] };
}

function render(res, { values = {}, errors = {}, status = 200, state = 'form', globalError = null, deliveryResult = null }) {
  const dict = res.locals.dict;
  res.status(status).render('pages/contact', {
    meta: buildMeta({
      locale: res.locals.locale,
      pagePath: '/contact',
      title: dict.meta.pages.contact.title,
      description: dict.meta.pages.contact.description,
    }),
    bodyClass: 'page-contact',
    pagePath: '/contact',
    values,
    errors,
    state,
    globalError,
    deliveryResult,
    attachmentLimits: ATTACHMENT_LIMITS,
    messageLimits: LIMITS.message,
    projectTypes: PROJECT_TYPES,
    budgets: BUDGETS,
    formTs: Date.now(),
  });
}

router.get('/contact', (req, res) => {
  render(res, {});
});

router.post('/contact', contactRateLimiter(), async (req, res, next) => {
  try {
    let fields;
    let rawFiles;
    try {
      ({ fields, files: rawFiles } = await readContactBody(req));
    } catch (err) {
      if (err.status === 413) {
        logger.warn('contact_body_too_large', { locale: res.locals.locale });
        return render(res, { status: 413, globalError: 'attachmentsSize' });
      }
      logger.warn('contact_body_unreadable', { locale: res.locals.locale, message: err.message });
      return render(res, { status: 400, globalError: 'uploadFailed' });
    }

    const { values, errors, ok } = validateContact(fields);

    if (req.rateLimited) {
      logger.warn('contact_rate_limited', { locale: res.locals.locale });
      return render(res, { values, status: 429, globalError: 'rateLimit' });
    }

    if (looksLikeSpam(fields)) {
      // Respond like a validation failure without revealing the honeypot.
      logger.info('contact_spam_rejected', { locale: res.locals.locale });
      return render(res, { values, status: 400, globalError: 'spam' });
    }

    const attachmentResult = validateAttachments(rawFiles);
    if (!attachmentResult.ok) {
      errors.attachments = attachmentResult.code;
    }

    if (!ok || !attachmentResult.ok) {
      return render(res, { values, errors, status: 422 });
    }

    const result = await deliver({ locale: res.locals.locale, values, attachments: attachmentResult.files });
    logger.info('contact_request', {
      locale: res.locals.locale,
      projectType: values.projectType,
      budget: values.budget,
      transport: result.transport,
      delivered: result.delivered,
      attachmentCount: attachmentResult.files.length,
    });

    return render(res, { state: result.delivered ? 'success' : 'dev', deliveryResult: result });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

// Exposed for tests
module.exports.config = config;
