'use strict';

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('../config');

/**
 * Security headers. The site has no third-party scripts, fonts or images, so the CSP is
 * strict: everything comes from the same origin. Inline JSON-LD is allowed through a
 * dedicated script type (browsers do not execute application/ld+json, and CSP does not
 * block it), and the tiny theme bootstrap script uses a per-request nonce.
 */
function securityHeaders() {
  return helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
        'style-src': ["'self'"],
        'img-src': ["'self'", 'data:'],
        'font-src': ["'self'"],
        'connect-src': ["'self'"],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'base-uri': ["'self'"],
        'object-src': ["'none'"],
        'upgrade-insecure-requests': config.isProduction ? [] : null,
      },
    },
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    strictTransportSecurity: config.isProduction ? { maxAge: 15552000, includeSubDomains: true } : false,
  });
}

/** Attach a CSP nonce to every response before helmet runs. */
function cspNonce(req, res, next) {
  res.locals.cspNonce = require('crypto').randomBytes(16).toString('base64');
  next();
}

/** Rate limiter for state-changing endpoints (contact form). */
function contactRateLimiter() {
  return rateLimit({
    windowMs: config.contact.rateLimitWindowMs,
    limit: config.contact.rateLimitMax,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    // Rendered by the contact route so the message is localised.
    handler: (req, res, next) => {
      req.rateLimited = true;
      next();
    },
  });
}

/** Generic limiter for everything else: generous, protects against accidental floods. */
function globalRateLimiter() {
  return rateLimit({
    windowMs: 60 * 1000,
    limit: Number.parseInt(process.env.GLOBAL_RATE_MAX || '300', 10),
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  });
}

module.exports = { securityHeaders, cspNonce, contactRateLimiter, globalRateLimiter };
