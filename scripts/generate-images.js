'use strict';

/**
 * Generates the default Open Graph image, per-project share images and the apple-touch-icon
 * from HTML templates using the design tokens. Text-led on purpose: no stock imagery.
 * Usage: node scripts/generate-images.js
 */
const fs = require('fs');
const path = require('path');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require('/opt/node22/lib/node_modules/playwright'));
}

const projects = require('../src/content/projects');
const OUT = path.join(__dirname, '..', 'public', 'img');
const FONT = fs.readFileSync(path.join(__dirname, '..', 'public', 'fonts', 'Manrope-latin-ext.ttf')).toString('base64');

function page({ title, subtitle, footer, badge }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: Manrope; src: url(data:font/ttf;base64,${FONT}) format('truetype'); font-weight: 200 800; }
  html, body { margin: 0; width: 1200px; height: 630px; }
  body { font-family: Manrope, sans-serif; background: #0b1f3a; color: #f5f7fa; position: relative; overflow: hidden; }
  .glow { position: absolute; right: -120px; top: -160px; width: 620px; height: 620px; border-radius: 50%; background: radial-gradient(circle, rgba(45,212,191,0.28), transparent 65%); }
  .grid { position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent 0 39px, rgba(255,255,255,0.05) 39px 40px), repeating-linear-gradient(90deg, transparent 0 39px, rgba(255,255,255,0.05) 39px 40px); }
  .wrap { position: absolute; inset: 0; padding: 72px 80px; display: flex; flex-direction: column; justify-content: space-between; }
  .badge { display: inline-flex; align-items: center; gap: 12px; font-size: 22px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #2dd4bf; }
  .badge i { width: 14px; height: 14px; border-radius: 3px; background: #2dd4bf; display: inline-block; }
  h1 { font-size: ${title.length > 40 ? 60 : 76}px; line-height: 1.05; letter-spacing: -0.03em; margin: 24px 0 18px; max-width: 980px; font-weight: 800; }
  p { font-size: 30px; line-height: 1.35; color: rgba(245,247,250,0.8); margin: 0; max-width: 900px; }
  .foot { display: flex; align-items: center; justify-content: space-between; font-size: 24px; color: rgba(245,247,250,0.7); }
  .mark { display: flex; align-items: center; gap: 14px; font-weight: 800; color: #f5f7fa; font-size: 28px; }
  .mark svg { width: 44px; height: 44px; }
  </style></head><body>
  <div class="grid"></div><div class="glow"></div>
  <div class="wrap">
    <div>
      <div class="badge"><i></i>${badge}</div>
      <h1>${title}</h1>
      <p>${subtitle}</p>
    </div>
    <div class="foot">
      <div class="mark"><svg viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="7" fill="#2dd4bf"/><path d="M9 22V10l7 7 7-7v12" fill="none" stroke="#0b1f3a" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Mustafa Keleşoğlu</div>
      <div>${footer}</div>
    </div>
  </div></body></html>`;
}

const ICON = `<!doctype html><html><head><style>html,body{margin:0;width:180px;height:180px;background:#0b1f3a}</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="180" height="180"><rect width="32" height="32" fill="#0b1f3a"/><path d="M9 22V10l7 7 7-7v12" fill="none" stroke="#f5f7fa" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></body></html>`;

(async () => {
  fs.mkdirSync(path.join(OUT, 'og'), { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();

  await p.setContent(
    page({
      badge: 'Web Developer · Dinslaken, NRW',
      title: 'Websites & Web-Anwendungen mit Fokus auf Sicherheit.',
      subtitle: 'WordPress · Elementor · WooCommerce · Node.js · Express · Security-focused development',
      footer: 'mustafakelesoglu.de',
    }),
  );
  await p.screenshot({ path: path.join(OUT, 'og-default.png'), type: 'png' });

  for (const raw of projects.all()) {
    const pr = projects.localized(raw, 'de');
    await p.setContent(
      page({
        badge: pr.group === 'product' ? 'Software & Security Lab' : 'Client Website',
        title: pr.title,
        subtitle: pr.tagline,
        footer: pr.liveUrl ? pr.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'mustafakelesoglu.de',
      }),
    );
    await p.screenshot({ path: path.join(OUT, 'og', `${pr.slug}.png`), type: 'png' });
  }

  const ictx = await browser.newContext({ viewport: { width: 180, height: 180 } });
  const ip = await ictx.newPage();
  await ip.setContent(ICON);
  await ip.screenshot({ path: path.join(OUT, 'apple-touch-icon.png'), type: 'png' });

  await browser.close();
  console.log('images written to', OUT);
})();
