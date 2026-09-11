'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { startServer } = require('./helpers');
const { allPaths } = require('../src/routes/system');
const { LOCALES } = require('../src/i18n');

let srv;
before(async () => {
  srv = await startServer();
});
after(() => srv.close());

test('root redirects to the default locale (German) without Accept-Language', async () => {
  const res = await srv.get('/');
  assert.equal(res.status, 302);
  assert.equal(res.headers.get('location'), '/de/');
});

test('root honours Accept-Language for supported locales and falls back otherwise', async () => {
  const en = await srv.get('/', { headers: { 'accept-language': 'en-GB,en;q=0.9' } });
  assert.equal(en.headers.get('location'), '/en/');
  const tr = await srv.get('/', { headers: { 'accept-language': 'tr-TR,tr;q=0.8,en;q=0.5' } });
  assert.equal(tr.headers.get('location'), '/tr/');
  const fr = await srv.get('/', { headers: { 'accept-language': 'fr-FR' } });
  assert.equal(fr.headers.get('location'), '/de/');
});

test('bare locale redirects to trailing-slash form; inner trailing slashes redirect away', async () => {
  const res = await srv.get('/de');
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('location'), '/de/');
  const inner = await srv.get('/en/projects/');
  assert.equal(inner.status, 301);
  assert.equal(inner.headers.get('location'), '/en/projects');
});

test('every core page renders with 200 in every locale', async () => {
  for (const locale of LOCALES) {
    for (const path of allPaths()) {
      const url = path === '/' ? `/${locale}/` : `/${locale}${path}`;
      const res = await srv.get(url);
      assert.equal(res.status, 200, `${url} should be 200`);
      const html = await res.text();
      assert.match(html, new RegExp(`<html lang="${locale}"`), `${url} should carry lang=${locale}`);
      assert.match(html, /<main id="main"/, `${url} should have a main landmark`);
    }
  }
});

test('unknown locale and unknown pages return a localized 404', async () => {
  const res = await srv.get('/fr/');
  assert.equal(res.status, 404);
  const res2 = await srv.get('/de/does-not-exist', { headers: { 'accept-language': 'de' } });
  assert.equal(res2.status, 404);
  const html = await res2.text();
  assert.match(html, /Diese Seite gibt es nicht/);
  const res3 = await srv.get('/tr/projects/unknown-slug');
  assert.equal(res3.status, 404);
  assert.match(await res3.text(), /Bu sayfa mevcut değil/);
});

test('CV is intentionally excluded from the public site and sitemap', async () => {
  const page = await srv.get('/de/cv');
  assert.equal(page.status, 404);

  const sitemap = await (await srv.get('/sitemap.xml')).text();
  assert.doesNotMatch(sitemap, /\/cv<\/loc>/);
});

test('sitemap lists every page in every locale with hreflang alternates', async () => {
  const res = await srv.get('/sitemap.xml');
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /xml/);
  const xml = await res.text();
  for (const locale of LOCALES) {
    assert.match(xml, new RegExp(`<loc>https://mustafakelesoglu.de/${locale}/</loc>`));
    assert.match(xml, new RegExp(`<loc>https://mustafakelesoglu.de/${locale}/projects/savefold</loc>`));
  }
  assert.match(xml, /hreflang="x-default"/);
});

test('robots.txt allows crawling and points to the sitemap', async () => {
  const res = await srv.get('/robots.txt');
  assert.equal(res.status, 200);
  const txt = await res.text();
  assert.match(txt, /Allow: \//);
  assert.match(txt, /Sitemap: https:\/\/mustafakelesoglu.de\/sitemap.xml/);
});

test('health endpoint responds', async () => {
  const res = await srv.get('/healthz');
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
});
