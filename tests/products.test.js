'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { startServer } = require('./helpers');
const { LOCALES } = require('../src/i18n');
const products = require('../src/content/products');
const projects = require('../src/content/projects');

let srv;
before(async () => {
  srv = await startServer();
});
after(() => srv.close());

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const VISUALSTRUCT_REPO = 'https://github.com/KelesogluMustafa/visualstruct';

function localImages(html) {
  const urls = [];
  for (const img of html.match(/<img[^>]+>/g) || []) {
    urls.push(img.match(/ src="([^"]+)"/)[1]);
    const srcset = img.match(/ srcset="([^"]+)"/);
    if (srcset) urls.push(...srcset[1].split(', ').map((s) => s.split(' ')[0]));
  }
  return urls;
}

test('product pages render in every locale with one H1, SEO metadata and local images that exist', async () => {
  for (const slug of products.slugs) {
    for (const locale of LOCALES) {
      const res = await srv.get(`/${locale}/${slug}`);
      assert.equal(res.status, 200, `/${locale}/${slug}`);
      const html = await res.text();
      const content = products.localized(slug, locale);
      assert.match(html, new RegExp(`<html lang="${locale}"`));
      assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, 'exactly one h1');
      assert.ok(html.includes(`<link rel="canonical" href="https://mustafakelesoglu.de/${locale}/${slug}">`), 'canonical');
      for (const code of ['de', 'en', 'tr', 'x-default']) assert.ok(html.includes(`hreflang="${code}"`), `hreflang ${code}`);
      assert.ok(html.includes(`property="og:image" content="https://mustafakelesoglu.de/img/${slug}/og-banner.jpg"`), 'share image');
      assert.match(html, /"@type":"SoftwareApplication"/);
      assert.ok(!/"offers"|aggregateRating|"operatingSystem"/.test(html), 'no unverified structured-data claims');
      assert.ok(html.includes(content.hero.eyebrow) || html.includes(content.hero.eyebrow.replace(/&/g, '&amp;')));
      const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
      const urls = localImages(main);
      assert.ok(urls.length >= 2, 'has artwork');
      for (const url of urls) {
        assert.ok(url.startsWith(`/img/${slug}/`), url);
        assert.ok(fs.existsSync(path.join(PUBLIC_DIR, url)), `${url} exists`);
      }
      for (const img of main.match(/<img[^>]+>/g)) {
        assert.match(img, / width="\d+"/);
        assert.match(img, / height="\d+"/);
        assert.match(img, / alt="[^"]+"/);
      }
    }
    assert.ok(fs.existsSync(path.join(PUBLIC_DIR, 'img', slug, 'og-banner.jpg')));
  }
});

test('product pages never link to a download or repository that is not public', async () => {
  for (const slug of products.slugs) {
    assert.equal(products.bySlug(slug).primaryUrl, '', `${slug} starts without a public target`);
    for (const locale of LOCALES) {
      const html = await (await srv.get(`/${locale}/${slug}`)).text();
      const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
      assert.equal((main.match(/<button class="[^"]*pl-pending[^"]*" type="button" disabled>/g) || []).length, 2, 'two pending buttons');
      assert.ok(!main.includes('href="#"') && !main.includes('href=""'), 'no placeholder links');
      assert.ok(!/href="https?:\/\/github\.com/.test(main), 'no GitHub link while nothing is public');
      assert.ok(main.includes('href="#how"') && main.includes('id="how"'), 'in-page link has a target');
      assert.ok(main.includes(`href="/${locale}/contact"`), 'contact call to action');
    }
  }
});

test('short links without a locale redirect like the root; generic project URLs redirect to the product page', async () => {
  for (const slug of products.slugs) {
    const bare = await srv.get(`/${slug}`);
    assert.equal(bare.status, 302);
    assert.equal(bare.headers.get('location'), `/de/${slug}`);
    const project = await srv.get(`/tr/projects/${slug}`);
    assert.equal(project.status, 301);
    assert.equal(project.headers.get('location'), `/tr/${slug}`);
  }
});

test('VisualStruct has a project card that opens GitHub and no page on this site', async () => {
  for (const locale of LOCALES) {
    for (const p of ['/visualstruct', '/projects/visualstruct']) {
      assert.equal((await srv.get(`/${locale}${p}`)).status, 404, `/${locale}${p} must not exist`);
    }
    const home = await (await srv.get(`/${locale}/`)).text();
    assert.ok(home.includes(`href="${VISUALSTRUCT_REPO}" target="_blank" rel="noopener noreferrer"`), 'card links to GitHub');
    assert.ok(!home.includes(`/${locale}/projects/visualstruct`) && !home.includes(`/${locale}/visualstruct`));
  }
  const xml = await (await srv.get('/sitemap.xml')).text();
  assert.ok(!/visualstruct/i.test(xml), 'not in the sitemap');
});

test('sitemap lists the product pages once per locale', async () => {
  const xml = await (await srv.get('/sitemap.xml')).text();
  for (const slug of products.slugs) {
    for (const locale of LOCALES) assert.ok(xml.includes(`<loc>https://mustafakelesoglu.de/${locale}/${slug}</loc>`));
    assert.ok(!xml.includes(`/projects/${slug}`));
  }
});

test('project order: SaveFold, RunnerManager, PDFStruct, ResearchStruct, VisualStruct, then the earlier order', () => {
  const order = projects.all().map((p) => p.slug);
  assert.deepEqual(order.slice(0, 5), ['savefold', 'runnermanager', 'pdfstruct', 'researchstruct', 'visualstruct']);
  assert.deepEqual(order.slice(5), [
    'lesedeutsch',
    'gevher',
    'launch-studio',
    'authoritylab',
    'pv-solar',
    'bestfood-chur',
    'verein-rhein',
    'kirikkale-taksicin',
  ]);
});

test('home page: four hero cards in the fixed order and the featured list in the new order', async () => {
  for (const locale of LOCALES) {
    const html = await (await srv.get(`/${locale}/`)).text();
    const hero = html.slice(html.indexOf('class="dhero__cards"'), html.indexOf('</section>', html.indexOf('class="dhero__cards"')));
    const hrefs = (hero.match(/class="dhero__card" href="([^"]+)"/g) || []).map((m) => m.match(/href="([^"]+)"/)[1]);
    assert.deepEqual(hrefs, [
      `/${locale}/projects/savefold`,
      `/${locale}/runnermanager`,
      `/${locale}/pdfstruct`,
      `/${locale}/researchstruct`,
    ]);
    assert.ok(!/visualstruct/i.test(hero), 'VisualStruct is not in the hero');
    assert.ok(!hero.includes('target="_blank"'), 'hero cards are internal links');
    for (const url of localImages(hero)) assert.ok(fs.existsSync(path.join(PUBLIC_DIR, url)), `${url} exists`);

    const list = html.slice(html.indexOf('project-list--feature'));
    const titles = (list.match(/class="project-row__title"><a [^>]*>([^<]+)</g) || []).map((m) => m.replace(/.*>([^<]+)<$/, '$1'));
    assert.deepEqual(titles.slice(0, 6), ['SaveFold', 'RunnerManager', 'PDFStruct', 'ResearchStruct', 'VisualStruct', 'LeseDeutsch']);
  }
});
