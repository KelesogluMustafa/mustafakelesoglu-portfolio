'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { startServer } = require('./helpers');
const { LOCALES } = require('../src/i18n');
const pdfstruct = require('../src/content/pdfstruct');

let srv;
before(async () => {
  srv = await startServer();
});
after(() => srv.close());

const REPO = 'https://github.com/KelesogluMustafa/pdfstruct';
const LATEST = `${REPO}/releases/latest`;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

test('/pdfstruct renders in every locale with one H1, GitHub links and the current public release', async () => {
  assert.equal(pdfstruct.version, 'v0.2.1', 'update this test together with the released version');
  for (const locale of LOCALES) {
    const res = await srv.get(`/${locale}/pdfstruct`);
    assert.equal(res.status, 200, `${locale} should be 200`);
    const html = await res.text();
    const content = pdfstruct.localized(locale);
    assert.match(html, new RegExp(`<html lang="${locale}"`));
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, 'exactly one h1');
    assert.ok(html.includes(`href="${LATEST}"`), 'download points at the latest release');
    assert.ok(html.includes(`href="${REPO}"`), 'source points at the repository');
    assert.ok(html.includes(`href="${REPO}/releases/tag/v0.2.1"`), 'release notes point at the current version');
    assert.ok(html.includes(`href="${REPO}/releases/download/v0.2.1/SHA256SUMS.txt"`), 'checksums link');
    assert.ok(html.includes(`href="${REPO}/releases/download/v0.2.1/PDFStruct-Windows-Setup-0.2.1.zip"`), 'Windows setup link');
    assert.ok(!/v?0\.1\.0|0\.2\.0/.test(html), 'no leftover content from older releases');
    assert.ok(!/Portable/.test(html), 'no link to the portable build, which is not in this release');
    for (const format of pdfstruct.formats) assert.ok(html.includes(`<li>${format}</li>`), `output ${format}`);
    for (const input of pdfstruct.inputs) assert.ok(html.includes(`<li>${input}</li>`), `input ${input}`);
    for (const tool of ['inspect', 'search', 'read_excerpt', 'convert']) assert.ok(html.includes(`<code>${tool}</code>`), tool);
    assert.equal((html.match(/<details/g) || []).length, content.faq.items.length);
    assert.ok(content.faq.items.length <= 6);
    assert.match(html, /<link rel="canonical" href="https:\/\/mustafakelesoglu.de\/[a-z]{2}\/pdfstruct">/);
    for (const code of ['de', 'en', 'tr', 'x-default']) assert.ok(html.includes(`hreflang="${code}"`), `hreflang ${code}`);
    assert.match(html, /property="og:title" content="PDFStruct/);
    assert.match(html, /property="og:image" content="https:\/\/mustafakelesoglu.de\/img\/pdfstruct\/og-banner.jpg"/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.match(html, /"@type":"SoftwareApplication"/);
    assert.match(html, /"@type":"FAQPage"/);
    assert.ok(!/"offers"|"operatingSystem"|aggregateRating/.test(html), 'no unverified structured-data claims');
  }
});

test('/pdfstruct uses only local images that exist, with dimensions; the hero is not lazy-loaded', async () => {
  const html = await (await srv.get('/en/pdfstruct')).text();
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const imgs = main.match(/<img[^>]+>/g) || [];
  assert.ok(imgs.length >= 5);
  for (const img of imgs) {
    assert.match(img, / width="\d+"/);
    assert.match(img, / height="\d+"/);
    assert.match(img, / alt="[^"]+"/);
    assert.ok(!/data:image|[A-Za-z]:\\/.test(img), 'no base64 or Windows paths');
    const urls = [
      img.match(/ src="([^"]+)"/)[1],
      ...img
        .match(/ srcset="([^"]+)"/)[1]
        .split(', ')
        .map((s) => s.split(' ')[0]),
    ];
    for (const url of urls) {
      assert.ok(url.startsWith('/img/pdfstruct/'), url);
      assert.ok(fs.existsSync(path.join(PUBLIC_DIR, url)), `${url} exists`);
    }
  }
  const hero = imgs.find((img) => img.includes('/hero-'));
  assert.ok(hero && !hero.includes('loading="lazy"'), 'hero image loads eagerly');
  for (const img of imgs.filter((i) => /how-it-works|claude-context/.test(i))) assert.ok(img.includes('loading="lazy"'));
  assert.ok(fs.existsSync(path.join(PUBLIC_DIR, pdfstruct.images.og)));
});

test('/pdfstruct donation area has no link, payment form or third-party script while the URL is empty', async () => {
  assert.equal(pdfstruct.links.donation, '', 'donation URL starts empty');
  for (const locale of LOCALES) {
    const html = await (await srv.get(`/${locale}/pdfstruct`)).text();
    const content = pdfstruct.localized(locale);
    assert.ok(html.includes(content.donate.soon), 'shows the coming-soon state');
    assert.match(html, /<button class="[^"]*ps-donate__soon[^"]*" type="button" disabled>/);
    assert.ok(!html.includes('href="#"') && !html.includes('href=""'), 'no placeholder links');
    assert.ok(!/freemius|ko-fi|buymeacoffee|paypal|stripe|<form[^>]*donat/i.test(html), 'no payment integration');
    const scripts = html.match(/<script[^>]+src="([^"]+)"/g) || [];
    for (const s of scripts) assert.ok(!/src="https?:/.test(s), 'no third-party scripts');
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
  for (const p of ['/en/projects', '/en/']) {
    const html = await (await srv.get(p)).text();
    assert.ok(html.includes('href="/en/pdfstruct"'), `${p} should link the card to /en/pdfstruct`);
    assert.match(html, /PDF extraction • OCR • Multi-format conversion/);
    assert.ok(!html.includes('/en/projects/pdfstruct'), `${p} must not use the generic project URL`);
    assert.ok(!html.includes('Version 0.1.0'), `${p} must not mention the old release`);
  }
});

test('sitemap lists /pdfstruct once per locale and not the generic project URL', async () => {
  const xml = await (await srv.get('/sitemap.xml')).text();
  for (const locale of LOCALES) assert.ok(xml.includes(`<loc>https://mustafakelesoglu.de/${locale}/pdfstruct</loc>`));
  assert.ok(!xml.includes('/projects/pdfstruct'));
});
