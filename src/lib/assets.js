'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Asset manifest. CSS is split into small modules (tokens, base, layout, components, pages)
 * and linked in order; JavaScript is loaded as native ES modules. There is no bundler and no
 * build step, which keeps the Hostinger deployment to `npm install && npm start`.
 * Each URL carries a content hash so long cache lifetimes are safe.
 */
const PUBLIC_DIR = path.join(__dirname, '..', '..', 'public');

const CSS_FILES = [
  '/css/tokens.css',
  '/css/base.css',
  '/css/layout.css',
  '/css/components/buttons.css',
  '/css/components/header.css',
  '/css/components/footer.css',
  '/css/components/cards.css',
  '/css/components/forms.css',
  '/css/components/media.css',
  '/css/pages/home.css',
  '/css/pages/project.css',
  '/css/pages/content.css',
];

const hashes = new Map();

function hashFor(publicPath) {
  if (hashes.has(publicPath)) return hashes.get(publicPath);
  let hash = '0';
  try {
    const buf = fs.readFileSync(path.join(PUBLIC_DIR, publicPath));
    hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
  } catch {
    hash = '0';
  }
  if (process.env.NODE_ENV === 'production') hashes.set(publicPath, hash);
  return hash;
}

function url(publicPath) {
  return `${publicPath}?v=${hashFor(publicPath)}`;
}

function cssUrls() {
  return CSS_FILES.map(url);
}

module.exports = { url, cssUrls, CSS_FILES };
