'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { startServer } = require('./helpers');
const { LOCALES } = require('../src/i18n');
const pdfstruct = require('../src/content/pdfstruct');

let srv;
before(async () => {
  srv = await startServer();
});
after(() => srv.close());

const LATEST = 'https://github.com/KelesogluMustafa/pdfstruct/releases/latest';
const REPO = 'https://github.com/KelesogluMustafa/pdfstruct';
const NOTES = 'https://github.com/KelesogluMustafa/pdfstruct/releases/tag/v0.1.0';

test('/pdfstruct renders in every locale with the GitHub download, source and release links', async () => {
  for (const locale of LOCALES) {
    const res = await srv.get(`/${locale}/pdfstruct`);
    assert.equal(res.status, 200, `${locale} should be 200`);
    const html = await res.text();
    assert.match(html, new RegExp(`<html lang="${locale}"`));
    assert.match(html, /<h1 class="page-header__title">PDFStruct<\/h1>/);
    assert.ok(html.includes(`href="${LATEST}"`), 'download points at the latest release');
    assert.ok(html.includes(`href="${REPO}"`), 'source points at the repository');
    assert.ok(html.includes(`href="${NOTES}"`), 'release notes point at v0.1.0');
    assert.match(html, /v0\.1\.0/);
    assert.match(html, /<pre class="ps-code"><code>pdfstruct<\/code><\/pre>/);
    assert.match(html, /pdfxlsx document\.pdf/);
    for (const format of pdfstruct.formats) assert.ok(html.includes(`<li>${format}</li>`), format);
    assert.ok(html.includes('Windows x86_64') && html.includes('macOS Apple Silicon'));
    assert.ok(!/ko-fi|buymeacoffee|sponsors/i.test(html), 'no donation links yet');
    assert.match(html, /<link rel="canonical" href="https:\/\/mustafakelesoglu.de\/[a-z]{2}\/pdfstruct">/);
    assert.match(html, /property="og:title" content="PDFStruct/);
    assert.match(html, /property="og:image" content="https:\/\/mustafakelesoglu.de\/img\/og\/pdfstruct.png"/);
    assert.match(html, /"@type":"SoftwareApplication"/);
  }
});

test('/pdfstruct without a locale redirects like the root; the generic project URL redirects to the page', async () => {
  const bare = await srv.get('/pdfstruct');
  assert.equal(bare.status, 302);
  assert.equal(bare.headers.get('location'), '/de/pdfstruct');
  const en = await srv.get('/pdfstruct', { headers: { 'accept-language': 'en-US,en;q=0.9' } });
  assert.equal(en.headers.get('location'), '/en/pdfstruct');
  const project = await srv.get('/tr/projects/pdfstruct');
  assert.equal(project.status, 301);
  assert.equal(project.headers.get('location'), '/tr/pdfstruct');
});

test('the projects list and home page carry a PDFStruct card that links to /pdfstruct', async () => {
  for (const path of ['/en/projects', '/en/']) {
    const html = await (await srv.get(path)).text();
    assert.ok(html.includes('href="/en/pdfstruct"'), `${path} should link the card to /en/pdfstruct`);
    assert.match(html, /PDF extraction • OCR • Multi-format conversion/);
    assert.ok(!html.includes('/en/projects/pdfstruct'), `${path} must not use the generic project URL`);
  }
});

test('sitemap lists /pdfstruct once per locale and not the generic project URL', async () => {
  const xml = await (await srv.get('/sitemap.xml')).text();
  for (const locale of LOCALES) assert.ok(xml.includes(`<loc>https://mustafakelesoglu.de/${locale}/pdfstruct</loc>`));
  assert.ok(!xml.includes('/projects/pdfstruct'));
});
