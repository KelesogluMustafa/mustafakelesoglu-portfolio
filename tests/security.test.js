'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const { startServer } = require('./helpers');
const { errorHandler } = require('../src/middleware/errors');
const { cspNonce, securityHeaders } = require('../src/middleware/security');

let srv;
before(async () => {
  srv = await startServer();
});
after(() => srv.close());

test('security headers are set on HTML responses', async () => {
  const res = await srv.get('/de/');
  const csp = res.headers.get('content-security-policy');
  assert.ok(csp, 'CSP header present');
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /script-src 'self' 'nonce-[A-Za-z0-9+/=]+'/);
  assert.doesNotMatch(csp, /unsafe-inline/);
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(res.headers.get('x-frame-options'), 'SAMEORIGIN');
  assert.equal(res.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert.equal(res.headers.get('x-powered-by'), null);
});

test('inline scripts carry the per-request nonce and no style attributes are used', async () => {
  for (const path of ['/de/', '/de/projects/savefold', '/en/contact', '/tr/services', '/de/cv']) {
    const res = await srv.get(path);
    const csp = res.headers.get('content-security-policy');
    const nonce = csp.match(/'nonce-([^']+)'/)[1];
    const html = await res.text();
    assert.ok(html.includes(`<script nonce="${nonce}">`), `${path} bootstrap script uses nonce`);
    assert.doesNotMatch(html, /\sstyle="/, `${path}: inline style attributes violate the CSP`);
    assert.doesNotMatch(html, /<script(?! nonce=| type="application\/ld\+json"| type="module")/, `${path}: unexpected script tag`);
  }
});

test('user input is escaped in re-rendered forms', async () => {
  const res = await srv.post('/de/contact', {
    name: '<script>alert(1)</script>',
    email: 'bad',
    message: 'x',
    projectType: 'website',
    ts: String(Date.now() - 10000),
  });
  const html = await res.text();
  assert.doesNotMatch(html, /<script>alert\(1\)<\/script>/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
});

test('unexpected errors render a safe localized error page', async () => {
  // Reuse the real view setup but throw inside a route to exercise the central handler.
  const { app } = srv;
  const wrapper = express();
  wrapper.set('views', app.get('views'));
  wrapper.set('view engine', 'ejs');
  wrapper.locals.assets = app.locals.assets;
  wrapper.locals.config = app.locals.config;
  wrapper.use(cspNonce);
  wrapper.use(securityHeaders());
  wrapper.get('/boom', () => {
    throw new Error('secret internal detail');
  });
  wrapper.use(errorHandler);
  const server = await new Promise((resolve) => {
    const s = wrapper.listen(0, '127.0.0.1', () => resolve(s));
  });
  try {
    const res = await fetch(`http://127.0.0.1:${server.address().port}/boom`, { headers: { 'accept-language': 'tr' } });
    assert.equal(res.status, 500);
    const html = await res.text();
    assert.match(html, /Bir şeyler ters gitti/);
    assert.doesNotMatch(html, /\bat .*\.js:\d+/, 'no stack trace in output');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('production mode never prints the error message on the page', async () => {
  const wrapper = express();
  const { app } = srv;
  wrapper.set('views', app.get('views'));
  wrapper.set('view engine', 'ejs');
  wrapper.locals.assets = app.locals.assets;
  wrapper.locals.config = app.locals.config;
  wrapper.use(cspNonce);
  wrapper.get('/boom', () => {
    throw new Error('secret internal detail');
  });
  // Simulate production by toggling the flag the handler reads.
  const config = require('../src/config');
  const previous = config.isProduction;
  config.isProduction = true;
  wrapper.use(errorHandler);
  const server = await new Promise((resolve) => {
    const s = wrapper.listen(0, '127.0.0.1', () => resolve(s));
  });
  try {
    const res = await fetch(`http://127.0.0.1:${server.address().port}/boom`);
    assert.equal(res.status, 500);
    const html = await res.text();
    assert.doesNotMatch(html, /secret internal detail/);
  } finally {
    config.isProduction = previous;
    await new Promise((resolve) => server.close(resolve));
  }
});

test('static files are served, directory listing and dotfiles are not', async () => {
  const css = await srv.get('/css/tokens.css');
  assert.equal(css.status, 200);
  assert.match(css.headers.get('content-type'), /text\/css/);
  const dir = await srv.get('/css');
  assert.equal(dir.status, 404);
  const dot = await srv.get('/.env');
  assert.equal(dot.status, 404);
});

test('POST to non-form routes is not accepted', async () => {
  const res = await srv.post('/de/about', { a: 'b' });
  assert.equal(res.status, 404);
});
