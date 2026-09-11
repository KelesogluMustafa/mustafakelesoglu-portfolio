'use strict';

const path = require('path');
const express = require('express');
const compression = require('compression');
const config = require('./config');
const { securityHeaders, cspNonce, globalRateLimiter } = require('./middleware/security');
const { localeMiddleware } = require('./middleware/locale');
const { notFound, errorHandler } = require('./middleware/errors');
const systemRoutes = require('./routes/system');
const pageRoutes = require('./routes/pages');
const contactRoutes = require('./routes/contact');
const assets = require('./lib/assets');

function createApp() {
  const app = express();

  app.set('trust proxy', config.trustProxy);
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view cache', config.isProduction);
  app.disable('x-powered-by');
  app.set('etag', 'weak');

  app.use(cspNonce);
  app.use(securityHeaders());
  app.use(compression());

  // Template globals that do not depend on the locale.
  app.locals.config = { env: config.env, isProduction: config.isProduction };
  app.locals.assets = assets;

  app.use(
    express.static(path.join(__dirname, '..', 'public'), {
      maxAge: config.isProduction ? '7d' : 0,
      etag: true,
      index: false,
      redirect: false,
      setHeaders(res, filePath) {
        if (/\.(?:woff2?|ttf|css|js|svg|png|jpe?g|webp)$/i.test(filePath) && config.isProduction) {
          res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
        }
      },
    }),
  );

  // Rate limiting applies to dynamic routes only; static assets are served above.
  app.use(globalRateLimiter());
  app.use(systemRoutes);

  const localeRouter = express.Router({ mergeParams: true });
  localeRouter.use(localeMiddleware);
  localeRouter.use(contactRoutes);
  localeRouter.use(pageRoutes);
  app.use('/:locale(de|en|tr)', localeRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
