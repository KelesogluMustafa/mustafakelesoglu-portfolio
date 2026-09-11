'use strict';

/**
 * Locale registry and helpers.
 *
 * Every page is served under /{locale}/... . Copy lives in src/locales/{locale}.js,
 * structured content (projects, services, skills) lives in src/content and carries
 * per-locale fields so templates never mix languages.
 */

const LOCALES = ['de', 'en', 'tr'];
const DEFAULT_LOCALE = 'de';

const LOCALE_META = {
  de: { code: 'de', htmlLang: 'de', ogLocale: 'de_DE', label: 'Deutsch', short: 'DE', dir: 'ltr' },
  en: { code: 'en', htmlLang: 'en', ogLocale: 'en_GB', label: 'English', short: 'EN', dir: 'ltr' },
  tr: { code: 'tr', htmlLang: 'tr', ogLocale: 'tr_TR', label: 'Türkçe', short: 'TR', dir: 'ltr' },
};

const dictionaries = {
  de: require('../locales/de'),
  en: require('../locales/en'),
  tr: require('../locales/tr'),
};

function isLocale(value) {
  return LOCALES.includes(value);
}

function getDictionary(locale) {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}

/**
 * Resolve a dotted key ("nav.projects") in the locale dictionary.
 * Missing keys return the key itself so gaps are visible in QA instead of silently
 * falling back to another language.
 */
function translate(locale, key, vars) {
  const dict = getDictionary(locale);
  const value = key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict);
  if (value === undefined) return key;
  if (typeof value === 'string' && vars) {
    return value.replace(/\{(\w+)\}/g, (m, name) => (vars[name] !== undefined ? String(vars[name]) : m));
  }
  return value;
}

/** Build a locale-prefixed path. localePath('de', '/projects') -> '/de/projects' */
function localePath(locale, path = '/') {
  if (path === '/' || path === '') return `/${locale}/`;
  return `/${locale}/${path.replace(/^\/+/, '').replace(/\/+$/, '')}`;
}

/** Return the same page path in every locale, used for hreflang and the language switcher. */
function alternates(pagePath) {
  return LOCALES.map((code) => ({ ...LOCALE_META[code], href: localePath(code, pagePath) }));
}

/**
 * Pick the best locale from an Accept-Language header for the root redirect.
 * Falls back to the default locale.
 */
function negotiateLocale(acceptLanguage) {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const candidates = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.toLowerCase().split('-')[0], q: q ? Number.parseFloat(q) : 1 };
    })
    .filter((c) => c.tag && !Number.isNaN(c.q))
    .sort((a, b) => b.q - a.q);
  const match = candidates.find((c) => isLocale(c.tag));
  return match ? match.tag : DEFAULT_LOCALE;
}

module.exports = {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_META,
  isLocale,
  getDictionary,
  translate,
  localePath,
  alternates,
  negotiateLocale,
};
