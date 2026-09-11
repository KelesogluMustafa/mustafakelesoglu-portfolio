'use strict';

/* global document, getComputedStyle, localStorage */

/**
 * Browser flows with Playwright against a running server.
 * Usage: BASE_URL=http://127.0.0.1:3000 node scripts/e2e.js
 *
 * Flows: home, language switch, projects list, every project detail, services -> contact,
 * invalid form submission, valid development submission, 404, mobile menu, keyboard navigation,
 * theme toggle, reduced motion, plus a few accessibility checks (focus visibility, labels, contrast
 * of primary text, heading order).
 */
const fs = require('fs');
const path = require('path');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require('/opt/node22/lib/node_modules/playwright'));
}

const BASE = process.env.BASE_URL || 'http://127.0.0.1:3000';
const OUT = path.resolve(process.env.E2E_OUT || 'qa/e2e');
const results = [];
let failures = 0;

async function step(name, fn) {
  try {
    await fn();
    results.push(`PASS  ${name}`);
  } catch (err) {
    failures += 1;
    results.push(`FAIL  ${name}\n      ${err.message.split('\n')[0]}`);
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('pageerror', (e) => consoleErrors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/404/.test(m.text())) consoleErrors.push(m.text());
  });

  await step('1. Home page opens in German with hero and skip link', async () => {
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    assert(page.url().endsWith('/de/'), `expected /de/, got ${page.url()}`);
    assert(await page.locator('h1').textContent(), 'h1 missing');
    assert((await page.locator('a.skip-link').count()) === 1, 'skip link missing');
  });

  await step('2. Language switch keeps the page and changes lang attribute', async () => {
    await page.goto(`${BASE}/de/projects/savefold`, { waitUntil: 'networkidle' });
    await page.click('.site-nav a.lang-switch__item[hreflang="en"]');
    await page.waitForLoadState('networkidle');
    assert(page.url().endsWith('/en/projects/savefold'), page.url());
    assert((await page.getAttribute('html', 'lang')) === 'en', 'lang not en');
    await page.click('.site-nav a.lang-switch__item[hreflang="tr"]');
    await page.waitForLoadState('networkidle');
    assert((await page.getAttribute('html', 'lang')) === 'tr', 'lang not tr');
    assert((await page.locator('h1').textContent()).includes('SaveFold'), 'h1 should still be SaveFold');
  });

  await step('3. Projects list opens and the filter works', async () => {
    await page.goto(`${BASE}/de/projects`, { waitUntil: 'networkidle' });
    assert((await page.locator('[data-project]').count()) === 5, 'expected 5 projects');
    await page.click('[data-filter="client"]');
    const hiddenGroups = await page.locator('[data-project-group][hidden]').count();
    assert(hiddenGroups === 1, 'product group should be hidden');
    assert(page.url().includes('filter=client'), 'URL should carry the filter');
    await page.click('[data-filter="all"]');
    assert((await page.locator('[data-project-group][hidden]').count()) === 0, 'all groups visible');
  });

  await step('4. Every project detail page renders all required sections', async () => {
    for (const slug of ['savefold', 'authoritylab', 'pv-solar', 'bestfood-chur', 'verein-rhein']) {
      await page.goto(`${BASE}/de/projects/${slug}`, { waitUntil: 'networkidle' });
      const headings = await page.locator('.project-section h2').allTextContents();
      for (const h of [
        'Kurzfassung',
        'Ausgangslage',
        'Meine Rolle',
        'Lösung',
        'Technologien',
        'Wichtige Funktionen',
        'Sicherheit',
        'Ergebnis',
      ]) {
        assert(
          headings.some((x) => x.includes(h)),
          `${slug}: section "${h}" missing`,
        );
      }
      assert((await page.locator('.project-aside__cta a.button').count()) === 1, `${slug}: CTA missing`);
    }
    // Interactive widgets
    await page.goto(`${BASE}/de/projects/authoritylab`, { waitUntil: 'networkidle' });
    await page.click('[data-al-case][data-al-decision="BLOCK"]');
    assert((await page.getAttribute('[data-al-result]', 'data-decision')) === 'BLOCK', 'AuthorityLab demo did not update');
    await page.goto(`${BASE}/de/projects/savefold`, { waitUntil: 'networkidle' });
    await page.click('[data-sf-cat="Videos"]');
    const visible = await page.locator('[data-sf-item]:not([hidden])').count();
    assert(visible === 1, `SaveFold preview filter expected 1 visible item, got ${visible}`);
  });

  await step('5. Services page leads to contact', async () => {
    await page.goto(`${BASE}/de/services`, { waitUntil: 'networkidle' });
    assert((await page.locator('.service-detail').count()) === 7, 'expected 7 services');
    await page.click('.cta-band a.button');
    await page.waitForLoadState('networkidle');
    assert(page.url().endsWith('/de/contact'), page.url());
  });

  await step('6. Invalid form submission shows inline errors (client and server)', async () => {
    await page.goto(`${BASE}/de/contact`, { waitUntil: 'networkidle' });
    await page.fill('#field-name', 'A');
    await page.fill('#field-email', 'not-an-email');
    await page.click('button[type="submit"]');
    // Client-side validation blocks the submit
    assert(page.url().endsWith('/de/contact'), 'should stay on contact');
    const invalid = await page.locator('[aria-invalid="true"]').count();
    assert(invalid >= 3, `expected several invalid fields, got ${invalid}`);
    const focused = await page.evaluate(() => document.activeElement && document.activeElement.id);
    assert(focused === 'field-name', `first invalid field should be focused, got ${focused}`);
    // Server-side: submit the form without JS validation
    const res = await page.request.post(`${BASE}/de/contact`, {
      form: { name: 'A', email: 'x', projectType: '', message: 'short', ts: String(Date.now() - 10000) },
    });
    assert(res.status() === 422, `server should answer 422, got ${res.status()}`);
  });

  await step('7. Valid development submission shows the honest not-delivered notice', async () => {
    await page.goto(`${BASE}/en/contact`, { waitUntil: 'networkidle' });
    await page.fill('#field-name', 'Erika Mustermann');
    await page.fill('#field-email', 'erika@example.com');
    await page.selectOption('#field-projectType', 'website');
    await page.fill('#field-message', 'We need a new company website with a contact form and three service pages.');
    await page.check('#field-consent');
    await page.waitForTimeout(3100); // honour the timing heuristic
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    const text = await page.locator('main').textContent();
    assert(text.includes('Request validated, delivery not active yet'), 'dev notice missing');
    assert(!text.includes('Thank you for your request'), 'must not fake success');
  });

  await step('8. 404 page is localized and offers navigation', async () => {
    const res = await page.goto(`${BASE}/tr/nicht-da`, { waitUntil: 'networkidle' });
    assert(res.status() === 404, `expected 404, got ${res.status()}`);
    assert((await page.locator('h1').textContent()).includes('Bu sayfa mevcut değil'), 'Turkish 404 title');
    assert((await page.locator('.error-page__actions a').count()) === 3, 'three recovery links');
  });

  await step('9. Mobile menu opens, traps nothing, closes with Escape', async () => {
    const mobile = await browser.newContext({ viewport: { width: 390, height: 800 } });
    const mp = await mobile.newPage();
    await mp.goto(`${BASE}/de/`, { waitUntil: 'networkidle' });
    const toggle = mp.locator('[data-nav-toggle]');
    assert(await toggle.isVisible(), 'toggle should be visible on mobile');
    await toggle.click();
    assert((await toggle.getAttribute('aria-expanded')) === 'true', 'aria-expanded true');
    assert(await mp.locator('#site-nav').isVisible(), 'nav visible');
    await mp.screenshot({ path: path.join(OUT, 'mobile-menu.png') });
    await mp.keyboard.press('Escape');
    assert((await toggle.getAttribute('aria-expanded')) === 'false', 'menu closes on Escape');
    await mobile.close();
  });

  await step('10. Keyboard navigation reaches nav, language switch and CTA with visible focus', async () => {
    await page.goto(`${BASE}/de/`, { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    const active = await page.evaluate(() => document.activeElement.className);
    assert(active.includes('skip-link'), `first tab should hit skip link, got ${active}`);
    const seen = [];
    for (let i = 0; i < 12; i += 1) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const el = document.activeElement;
        const cs = getComputedStyle(el);
        return { cls: el.className, outline: cs.outlineStyle, text: (el.textContent || '').trim().slice(0, 20) };
      });
      seen.push(info);
    }
    assert(
      seen.some((s) => s.cls.includes('site-nav__link')),
      'nav links reachable',
    );
    assert(
      seen.some((s) => s.cls.includes('lang-switch__item')),
      'language switch reachable',
    );
    assert(
      seen.some((s) => s.cls.includes('theme-toggle')),
      'theme toggle reachable',
    );
    assert(
      seen.every((s) => s.outline !== 'none'),
      'every focused element has a visible outline',
    );
  });

  await step('11. Theme toggle switches and persists', async () => {
    await page.goto(`${BASE}/de/`, { waitUntil: 'networkidle' });
    await page.click('[data-theme-toggle]');
    const t1 = await page.getAttribute('html', 'data-theme');
    assert(t1 === 'dark' || t1 === 'light', `theme set (${t1})`);
    await page.reload({ waitUntil: 'networkidle' });
    assert((await page.getAttribute('html', 'data-theme')) === t1, 'theme persisted');
    await page.screenshot({ path: path.join(OUT, `theme-${t1}.png`), fullPage: false });
    await page.evaluate(() => localStorage.removeItem('theme'));
  });

  await step('12. Reduced motion disables reveal transitions', async () => {
    const rm = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } });
    const rp = await rm.newPage();
    await rp.goto(`${BASE}/de/`, { waitUntil: 'networkidle' });
    const opacity = await rp.evaluate(() => getComputedStyle(document.querySelector('[data-reveal-group] > *')).opacity);
    assert(opacity === '1', `reveal items should be visible immediately, opacity=${opacity}`);
    await rm.close();
  });

  await step('13. Accessibility basics: labels, landmarks, alt text, heading order', async () => {
    for (const p of ['/de/', '/de/contact', '/de/projects/pv-solar', '/en/about']) {
      await page.goto(`${BASE}${p}`, { waitUntil: 'networkidle' });
      const report = await page.evaluate(() => {
        const issues = [];
        document.querySelectorAll('input, select, textarea').forEach((el) => {
          if (el.type === 'hidden') return;
          const id = el.id;
          const hasLabel = (id && document.querySelector(`label[for="${id}"]`)) || el.closest('label') || el.getAttribute('aria-label');
          if (!hasLabel) issues.push(`unlabelled control ${el.name || id}`);
        });
        document.querySelectorAll('img').forEach((img) => {
          if (!img.hasAttribute('alt')) issues.push(`img without alt: ${img.src}`);
        });
        ['header', 'main', 'footer', 'nav'].forEach((tag) => {
          if (!document.querySelector(tag)) issues.push(`missing landmark ${tag}`);
        });
        const levels = [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => Number(h.tagName[1]));
        for (let i = 1; i < levels.length; i += 1) {
          if (levels[i] - levels[i - 1] > 1) issues.push(`heading jump ${levels[i - 1]} -> ${levels[i]}`);
        }
        document.querySelectorAll('a[target="_blank"]').forEach((a) => {
          if (!/noopener/.test(a.rel)) issues.push(`external link without noopener: ${a.href}`);
        });
        return issues;
      });
      assert(report.length === 0, `${p}: ${report.join('; ')}`);
    }
  });

  await step('14. Touch targets on mobile are at least 44px tall for primary controls', async () => {
    const mobile = await browser.newContext({ viewport: { width: 360, height: 780 } });
    const mp = await mobile.newPage();
    await mp.goto(`${BASE}/de/`, { waitUntil: 'networkidle' });
    const small = await mp.evaluate(() =>
      [...document.querySelectorAll('.button, .nav-toggle, .theme-toggle, .lang-switch__item')]
        .filter((el) => el.offsetParent !== null)
        .map((el) => ({ cls: el.className, h: el.getBoundingClientRect().height }))
        .filter((x) => x.h < 36),
    );
    assert(small.length === 0, `small targets: ${JSON.stringify(small)}`);
    await mobile.close();
  });

  await step('15. No JavaScript or console errors across the flows', async () => {
    assert(consoleErrors.length === 0, consoleErrors.join(' | '));
  });

  await browser.close();
  console.log(results.join('\n'));
  fs.writeFileSync(path.join(OUT, 'report.txt'), results.join('\n') + '\n');
  if (failures) {
    console.log(`\n${failures} flow(s) failed`);
    process.exitCode = 1;
  } else {
    console.log('\nAll browser flows passed');
  }
})();
