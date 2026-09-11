'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { startServer } = require('./helpers');
const i18n = require('../src/i18n');
const projects = require('../src/content/projects');
const { services } = require('../src/content/services');
const { groups } = require('../src/content/skills');

function keys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

test('all locale dictionaries share the exact same key structure', () => {
  const de = new Set(keys(i18n.getDictionary('de')));
  for (const locale of ['en', 'tr']) {
    const other = new Set(keys(i18n.getDictionary(locale)));
    const missing = [...de].filter((k) => !other.has(k));
    const extra = [...other].filter((k) => !de.has(k));
    assert.deepEqual(missing, [], `keys missing in ${locale}`);
    assert.deepEqual(extra, [], `unexpected keys in ${locale}`);
  }
});

test('no dictionary value is empty', () => {
  for (const locale of i18n.LOCALES) {
    const dict = i18n.getDictionary(locale);
    for (const k of keys(dict)) {
      const value = i18n.translate(locale, k);
      assert.notEqual(String(value).trim(), '', `${locale}:${k} is empty`);
    }
  }
});

test('structured content carries every locale for every entry', () => {
  for (const p of projects.all()) {
    for (const locale of i18n.LOCALES) {
      const copy = p.i18n[locale];
      assert.ok(copy, `${p.slug} missing ${locale}`);
      for (const field of [
        'title',
        'tagline',
        'summary',
        'problem',
        'role',
        'solution',
        'features',
        'security',
        'outcomes',
        'ctaTitle',
        'ctaText',
      ]) {
        assert.ok(copy[field] && copy[field].length, `${p.slug}.${locale}.${field}`);
      }
    }
  }
  for (const s of services) {
    for (const locale of i18n.LOCALES) assert.ok(s.i18n[locale] && s.i18n[locale].title, `${s.slug} ${locale}`);
  }
  for (const g of groups) {
    for (const locale of i18n.LOCALES) assert.ok(g.i18n[locale] && g.i18n[locale].title, `${g.key} ${locale}`);
  }
});

test('translate interpolates variables and returns the key for misses', () => {
  assert.equal(i18n.translate('de', 'projects.filter.count', { count: 5 }), '5 Projekte');
  assert.equal(i18n.translate('en', 'does.not.exist'), 'does.not.exist');
});

test('localePath and negotiateLocale behave', () => {
  assert.equal(i18n.localePath('de', '/'), '/de/');
  assert.equal(i18n.localePath('en', '/projects/'), '/en/projects');
  assert.equal(i18n.negotiateLocale('tr-TR,tr;q=0.9'), 'tr');
  assert.equal(i18n.negotiateLocale('es'), 'de');
  assert.equal(i18n.negotiateLocale(undefined), 'de');
});

test('rendered pages do not leak another language for the language switcher and nav', async () => {
  const srv = await startServer();
  try {
    const checks = {
      de: ['Projekte', 'Leistungen', 'Über mich', 'Impressum'],
      en: ['Projects', 'Services', 'About', 'Imprint'],
      tr: ['Projeler', 'Hizmetler', 'Hakkımda', 'Künye'],
    };
    for (const [locale, words] of Object.entries(checks)) {
      const html = await (await srv.get(`/${locale}/`)).text();
      for (const w of words) assert.match(html, new RegExp(w), `${locale} should contain "${w}"`);
      // Content-Language header per locale
      const res = await srv.get(`/${locale}/about`);
      assert.equal(res.headers.get('content-language'), locale);
    }
    // Language switcher links to the same page in the other locales
    const html = await (await srv.get('/de/projects/savefold')).text();
    assert.match(html, /href="\/en\/projects\/savefold" hreflang="en"/);
    assert.match(html, /href="\/tr\/projects\/savefold" hreflang="tr"/);
  } finally {
    await srv.close();
  }
});
