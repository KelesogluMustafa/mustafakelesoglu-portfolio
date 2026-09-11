'use strict';

require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const config = {
  env,
  isProduction: env === 'production',
  isTest: env === 'test',
  port: Number.parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || '0.0.0.0',
  // Public origin used for canonical URLs, hreflang and sitemap.
  siteUrl: (process.env.SITE_URL || 'https://mustafakelesoglu.de').replace(/\/+$/, ''),
  // Number of proxies in front of the app (Hostinger sits behind one).
  trustProxy: Number.parseInt(process.env.TRUST_PROXY || '1', 10),
  contact: {
    // Where inbound project requests will eventually be delivered.
    // Delivery is intentionally not wired to a provider yet (see docs/DECISIONS.md).
    toAddress: process.env.CONTACT_TO || 'info@mustafakelesoglu.de',
    // "log" keeps requests in the server log (without personal data) and tells the
    // visitor honestly that delivery is not yet active. Future values: "smtp", "api".
    transport: process.env.CONTACT_TRANSPORT || 'log',
    rateLimitWindowMs: Number.parseInt(process.env.CONTACT_RATE_WINDOW_MS || String(15 * 60 * 1000), 10),
    rateLimitMax: Number.parseInt(process.env.CONTACT_RATE_MAX || '5', 10),
  },
  social: {
    github: process.env.SOCIAL_GITHUB || 'https://github.com/KelesogluMustafa',
    linkedin: process.env.SOCIAL_LINKEDIN || '',
  },
  cvPath: process.env.CV_PDF_PATH || '',
};

module.exports = config;
