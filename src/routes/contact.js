'use strict';

const express = require('express');
const config = require('../config');
const logger = require('../lib/logger');
const { buildMeta } = require('../lib/seo');
const { validateContact, looksLikeSpam, PROJECT_TYPES, BUDGETS } = require('../lib/contact-validation');
const { contactRateLimiter } = require('../middleware/security');
const { deliver } = require('../lib/contact-delivery');

const router = express.Router({ mergeParams: true });

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
    projectTypes: PROJECT_TYPES,
    budgets: BUDGETS,
    formTs: Date.now(),
  });
}

router.get('/contact', (req, res) => {
  render(res, {});
});

router.post('/contact', contactRateLimiter(), express.urlencoded({ extended: false, limit: '32kb' }), async (req, res, next) => {
  try {
    const body = req.body || {};
    const { values, errors, ok } = validateContact(body);

    if (req.rateLimited) {
      logger.warn('contact_rate_limited', { locale: res.locals.locale });
      return render(res, { values, status: 429, globalError: 'rateLimit' });
    }

    if (looksLikeSpam(body)) {
      // Respond like a validation failure without revealing the honeypot.
      logger.info('contact_spam_rejected', { locale: res.locals.locale });
      return render(res, { values, status: 400, globalError: 'spam' });
    }

    if (!ok) {
      return render(res, { values, errors, status: 422 });
    }

    const result = await deliver({ locale: res.locals.locale, values });
    logger.info('contact_request', {
      locale: res.locals.locale,
      projectType: values.projectType,
      budget: values.budget,
      transport: result.transport,
      delivered: result.delivered,
    });

    return render(res, { state: result.delivered ? 'success' : 'dev', deliveryResult: result });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

// Exposed for tests
module.exports.config = config;
