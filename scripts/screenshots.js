'use strict';

/**
 * Responsive screenshot capture for visual QA.
 * Usage: BASE_URL=http://127.0.0.1:3000 node scripts/screenshots.js [outDir]
 * Requires the `playwright` dev dependency (or a global install via NODE_PATH).
 */
/* global document */
const fs = require('fs');
const path = require('path');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require('/opt/node22/lib/node_modules/playwright'));
}

const BASE = process.env.BASE_URL || 'http://127.0.0.1:3000';
const OUT = path.resolve(process.argv[2] || 'qa/screenshots');
const WIDTHS = [1440, 1024, 768, 390, 360];
const PAGES = [
  '/de/',
  '/de/projects',
  '/de/projects/savefold',
  '/de/projects/authoritylab',
  '/de/projects/pv-solar',
  '/de/services',
  '/de/about',
  '/de/skills',
  '/de/cv',
  '/de/contact',
  '/de/imprint',
  '/de/does-not-exist',
  '/en/',
  '/tr/',
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const problems = [];
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    page.on('pageerror', (e) => problems.push(`${width}px JS error: ${e.message}`));
    page.on('console', (m) => {
      if (m.type() === 'error' && !/404/.test(m.text())) problems.push(`${width}px console error: ${m.text()}`);
    });
    page.on('response', (r) => {
      if (r.status() >= 400 && !/does-not-exist/.test(r.url())) problems.push(`${width}px HTTP ${r.status()} for ${r.url()}`);
    });
    for (const p of PAGES) {
      await page.goto(BASE + p, { waitUntil: 'networkidle' });
      // Force reveal animations to finish
      await page.evaluate(() => document.querySelectorAll('[data-reveal-group] > *').forEach((el) => el.classList.add('is-visible')));
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (overflow > 0) problems.push(`${width}px horizontal overflow of ${overflow}px on ${p}`);
      const name = `${width}${p.replace(/\//g, '_').replace(/_$/, '') || '_root'}.png`;
      await page.screenshot({ path: path.join(OUT, name), fullPage: true });
    }
    // Mobile menu open state
    if (width <= 768) {
      await page.goto(BASE + '/de/', { waitUntil: 'networkidle' });
      await page.click('[data-nav-toggle]');
      await page.waitForTimeout(200);
      await page.screenshot({ path: path.join(OUT, `${width}_menu-open.png`), fullPage: false });
    }
    await context.close();
  }
  await browser.close();
  if (problems.length) {
    console.log('Problems found:');
    problems.forEach((p) => console.log(' -', p));
    process.exitCode = 1;
  } else {
    console.log(`OK: screenshots written to ${OUT}`);
  }
})();
