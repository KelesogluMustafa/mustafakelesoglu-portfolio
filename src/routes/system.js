'use strict';

const express = require('express');
const site = require('../content/site');
const projects = require('../content/projects');
const { LOCALES, localePath, negotiateLocale, DEFAULT_LOCALE } = require('../i18n');

const router = express.Router();

const STATIC_PATHS = ['/', '/projects', '/services', '/about', '/skills', '/cv', '/contact', '/imprint', '/privacy'];

function allPaths() {
  return [...STATIC_PATHS, ...projects.slugs.map((slug) => `/projects/${slug}`)];
}

/** Root redirect: server-side, honours Accept-Language, defaults to German. */
router.get('/', (req, res) => {
  const locale = negotiateLocale(req.get('accept-language')) || DEFAULT_LOCALE;
  res.set('Vary', 'Accept-Language');
  res.redirect(302, localePath(locale, '/'));
});

/** Trailing slashes on inner pages -> canonical form without slash (locale roots keep theirs). */
router.use((req, res, next) => {
  if (req.method === 'GET' && req.path.length > 4 && req.path.endsWith('/') && !/^\/(de|en|tr)\/$/.test(req.path)) {
    const query = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
    return res.redirect(301, req.path.replace(/\/+$/, '') + query);
  }
  next();
});

/** Bare locale without trailing slash -> canonical form with trailing slash. */
router.get(/^\/(de|en|tr)$/, (req, res) => {
  res.redirect(301, `${req.path}/`);
});

router.get('/sitemap.xml', (req, res) => {
  const urls = allPaths()
    .map((path) => {
      const alternates = LOCALES.map(
        (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${site.siteUrl}${localePath(l, path)}"/>`,
      ).join('\n');
      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${site.siteUrl}${localePath(DEFAULT_LOCALE, path)}"/>`;
      return LOCALES.map((l) => `  <url>\n    <loc>${site.siteUrl}${localePath(l, path)}</loc>\n${alternates}\n${xDefault}\n  </url>`).join(
        '\n',
      );
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  res.type('application/xml').send(xml);
});

router.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\n\nSitemap: ${site.siteUrl}/sitemap.xml\n`);
});

router.get('/healthz', (req, res) => {
  res.json({ ok: true });
});

module.exports = router;
module.exports.allPaths = allPaths;
