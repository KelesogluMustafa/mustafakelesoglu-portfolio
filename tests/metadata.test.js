'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { startServer } = require('./helpers');

let srv;
before(async () => {
  srv = await startServer();
});
after(() => srv.close());

function meta(html, attr, value) {
  const re = new RegExp(`<meta ${attr}="${value}" content="([^"]*)"`);
  const m = html.match(re);
  return m ? m[1] : null;
}

test('home page has localized title, description, canonical and hreflang set', async () => {
  const html = await (await srv.get('/de/')).text();
  assert.match(html, /<title>Webentwickler in Dinslaken[^<]*Mustafa Keleşoğlu<\/title>/);
  assert.ok(meta(html, 'name', 'description').length > 50);
  assert.match(html, /<link rel="canonical" href="https:\/\/mustafakelesoglu.de\/de\/">/);
  assert.match(html, /<link rel="alternate" hreflang="de" href="https:\/\/mustafakelesoglu.de\/de\/">/);
  assert.match(html, /<link rel="alternate" hreflang="en" href="https:\/\/mustafakelesoglu.de\/en\/">/);
  assert.match(html, /<link rel="alternate" hreflang="tr" href="https:\/\/mustafakelesoglu.de\/tr\/">/);
  assert.match(html, /<link rel="alternate" hreflang="x-default" href="https:\/\/mustafakelesoglu.de\/de\/">/);
});

test('Open Graph and Twitter metadata are present with the right locale', async () => {
  const html = await (await srv.get('/en/')).text();
  assert.equal(meta(html, 'property', 'og:locale'), 'en_GB');
  assert.ok(meta(html, 'property', 'og:title'));
  assert.match(meta(html, 'property', 'og:image'), /^https:\/\/mustafakelesoglu.de\/img\/og-default.png$/);
  assert.equal(meta(html, 'name', 'twitter:card'), 'summary_large_image');
  assert.match(html, /og:locale:alternate" content="de_DE"/);
});

test('project pages have project-specific share metadata and JSON-LD', async () => {
  const html = await (await srv.get('/tr/projects/authoritylab')).text();
  assert.match(html, /<title>AuthorityLab – Projeler · Mustafa Keleşoğlu<\/title>/);
  assert.equal(meta(html, 'property', 'og:type'), 'article');
  assert.match(meta(html, 'property', 'og:image'), /\/img\/og\/authoritylab.png$/);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  assert.ok(ld.some((o) => o['@type'] === 'SoftwareApplication'));
  assert.ok(ld.some((o) => o['@type'] === 'BreadcrumbList'));
});

test('home page carries Person structured data without invented facts', async () => {
  const html = await (await srv.get('/de/')).text();
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const person = ld.find((o) => o['@type'] === 'Person');
  assert.ok(person);
  assert.equal(person.name, 'Mustafa Keleşoğlu');
  assert.equal(person.address.addressLocality, 'Dinslaken');
  assert.ok(!('telephone' in person));
});

test('titles and descriptions are unique per page within a locale', async () => {
  const paths = ['/de/', '/de/projects', '/de/services', '/de/about', '/de/skills', '/de/cv', '/de/contact', '/de/imprint', '/de/privacy'];
  const titles = new Set();
  const descriptions = new Set();
  for (const p of paths) {
    const html = await (await srv.get(p)).text();
    titles.add(html.match(/<title>([^<]*)<\/title>/)[1]);
    descriptions.add(meta(html, 'name', 'description'));
  }
  assert.equal(titles.size, paths.length);
  assert.equal(descriptions.size, paths.length);
});

test('error pages are noindex and there is exactly one h1 per page', async () => {
  const nf = await (await srv.get('/de/missing')).text();
  assert.match(nf, /<meta name="robots" content="noindex, follow">/);
  for (const p of ['/de/', '/en/projects', '/tr/projects/savefold', '/de/contact', '/en/cv']) {
    const html = await (await srv.get(p)).text();
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${p} must have one h1`);
  }
});

test('no lorem ipsum, no template placeholders and no forbidden claims in rendered output', async () => {
  for (const p of ['/de/', '/en/', '/tr/', '/de/projects/savefold', '/en/projects/authoritylab', '/de/services']) {
    const html = await (await srv.get(p)).text();
    assert.doesNotMatch(html, /lorem ipsum/i, p);
    assert.doesNotMatch(html, /Penetrationstester|Cybersecurity Expert|Professional Pentester/i, p);
    assert.doesNotMatch(html, /\b\d{2,}\s*(Nutzer|users|kullanıcı)\b/i, `${p} must not claim user counts`);
  }
});
