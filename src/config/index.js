'use strict';

require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

function envFlag(value, fallback = false) {
  if (value === undefined || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
}

function httpsUrl(value) {
  return /^https:\/\/\S+$/.test(value || '') ? value : '';
}

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
    // Where inbound project requests will be delivered after SMTP activation.
    toAddress: process.env.CONTACT_TO || 'info@mustafakelesoglu.de',
    // "log" keeps requests in the server log (without personal data) and tells the
    // visitor honestly that delivery is not yet active. Set "smtp" only after the
    // mailbox exists and every SMTP variable below has been configured.
    transport: process.env.CONTACT_TRANSPORT || 'log',
    smtp: {
      host: process.env.CONTACT_SMTP_HOST || 'smtp.hostinger.com',
      port: Number.parseInt(process.env.CONTACT_SMTP_PORT || '465', 10),
      secure: envFlag(process.env.CONTACT_SMTP_SECURE, true),
      user: process.env.CONTACT_SMTP_USER || '',
      pass: process.env.CONTACT_SMTP_PASS || '',
      from: process.env.CONTACT_SMTP_FROM || process.env.CONTACT_SMTP_USER || '',
    },
    rateLimitWindowMs: Number.parseInt(process.env.CONTACT_RATE_WINDOW_MS || String(15 * 60 * 1000), 10),
    rateLimitMax: Number.parseInt(process.env.CONTACT_RATE_MAX || '5', 10),
  },
  social: {
    github: process.env.SOCIAL_GITHUB || 'https://github.com/KelesogluMustafa',
    linkedin: process.env.SOCIAL_LINKEDIN || '',
  },
  pdfstruct: {
    // Voluntary donation page for /pdfstruct. Empty until the owner sets one; the page then
    // shows a "coming soon" state instead of a link. Only https URLs are accepted.
    donationUrl: /^https:\/\/\S+$/.test(process.env.PDFSTRUCT_DONATION_URL || '') ? process.env.PDFSTRUCT_DONATION_URL : '',
  },
  products: {
    // Public targets for the short product pages. Empty until the owner publishes them; the
    // page then shows a "not public yet" state instead of a dead link. Only https URLs count.
    runnermanagerDownloadUrl: httpsUrl(process.env.RUNNERMANAGER_DOWNLOAD_URL),
    researchstructRepoUrl: httpsUrl(process.env.RESEARCHSTRUCT_REPO_URL),
  },
};

module.exports = config;
