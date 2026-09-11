'use strict';

const i18n = require('../i18n');
const site = require('../content/site');
const projects = require('../content/projects');

/**
 * Resolves the locale from the URL prefix and exposes locale-aware helpers to templates.
 * Mounted under /:locale, so an unknown locale simply never reaches this middleware.
 */
function localeMiddleware(req, res, next) {
  const locale = req.params.locale;
  if (!i18n.isLocale(locale)) return next('router');

  const dict = i18n.getDictionary(locale);
  req.locale = locale;
  res.locals.locale = locale;
  res.locals.localeMeta = i18n.LOCALE_META[locale];
  res.locals.dict = dict;
  res.locals.t = (key, vars) => i18n.translate(locale, key, vars);
  res.locals.url = (path = '/') => i18n.localePath(locale, path);
  res.locals.site = site;
  res.locals.nav = buildNav(locale, dict);
  res.locals.footerProjects = projects.allLocalized(locale).map((p) => ({ slug: p.slug, title: p.title }));
  res.locals.currentPath = req.path;
  res.set('Content-Language', locale);
  next();
}

function buildNav(locale, dict) {
  const items = [
    { key: 'projects', path: '/projects' },
    { key: 'services', path: '/services' },
    { key: 'about', path: '/about' },
    { key: 'skills', path: '/skills' },
    { key: 'contact', path: '/contact' },
  ];
  return items.map((item) => ({ ...item, label: dict.nav[item.key], href: i18n.localePath(locale, item.path) }));
}

/**
 * Locale fallback for pages outside /:locale (root redirect, unknown paths).
 * Picks the locale for error pages from the Accept-Language header.
 */
function fallbackLocale(req, res, next) {
  if (!res.locals.locale) {
    const locale = i18n.negotiateLocale(req.get('accept-language'));
    req.params = { ...req.params, locale };
    return localeMiddleware(req, res, next);
  }
  next();
}

module.exports = { localeMiddleware, fallbackLocale, buildNav };
