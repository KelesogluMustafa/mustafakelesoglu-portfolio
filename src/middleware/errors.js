'use strict';

const config = require('../config');
const { buildMeta } = require('../lib/seo');
const { fallbackLocale } = require('./locale');
const logger = require('../lib/logger');

/** 404 for anything that reached the end of the stack. */
function notFound(req, res, next) {
  fallbackLocale(req, res, () => {
    const dict = res.locals.dict;
    res.status(404);
    res.render('pages/404', {
      meta: buildMeta({
        locale: res.locals.locale,
        pagePath: '/',
        title: dict.meta.pages.notFound.title,
        description: dict.meta.pages.notFound.description,
        noindex: true,
      }),
      bodyClass: 'page-error',
    });
  });
}

/**
 * Central error handler. Logs the error server-side (without request bodies) and renders a
 * localized, generic error page. Stack traces are never sent to the client in production.
 */
function errorHandler(err, req, res, next) {
  const status = Number.isInteger(err.status) && err.status >= 400 && err.status < 600 ? err.status : 500;
  logger.error('request_error', {
    status,
    method: req.method,
    path: req.originalUrl,
    message: err.message,
    stack: config.isProduction ? undefined : err.stack,
  });

  if (res.headersSent) return;

  const render = () => {
    const dict = res.locals.dict;
    res.status(status);
    if (req.accepts(['html', 'json']) === 'json' && !req.accepts('html')) {
      return res.json({ error: dict.errors.server.title });
    }
    res.render('pages/error', {
      meta: buildMeta({
        locale: res.locals.locale,
        pagePath: '/',
        title: dict.meta.pages.error.title,
        description: dict.meta.pages.error.description,
        noindex: true,
      }),
      bodyClass: 'page-error',
      status,
      detail: config.isProduction ? null : err.message,
    });
  };

  try {
    fallbackLocale(req, res, render);
  } catch (renderError) {
    logger.error('error_page_render_failed', { message: renderError.message });
    res.status(500).type('text').send('Internal Server Error');
  }
}

module.exports = { notFound, errorHandler };
