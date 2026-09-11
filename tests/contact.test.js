'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { startServer, validContactBody } = require('./helpers');
const { validateContact, looksLikeSpam } = require('../src/lib/contact-validation');
const { composeText, assertSmtpConfig } = require('../src/lib/contact-delivery');

let srv;
before(async () => {
  srv = await startServer();
});
after(() => srv.close());

test('validateContact accepts a complete request and normalises values', () => {
  const r = validateContact(validContactBody({ email: '  Erika@Example.COM ', website: 'example.com', name: '  Erika   Mustermann ' }));
  assert.equal(r.ok, true);
  assert.equal(r.values.email, 'erika@example.com');
  assert.equal(r.values.website, 'https://example.com/');
  assert.equal(r.values.name, 'Erika Mustermann');
  assert.equal(r.values.consent, true);
});

test('validateContact rejects missing and malformed fields', () => {
  const r = validateContact({
    name: 'A',
    email: 'nope',
    projectType: 'hack',
    website: 'not a url',
    budget: 'x',
    message: 'short',
    consent: '',
  });
  assert.equal(r.ok, false);
  assert.deepEqual(Object.keys(r.errors).sort(), ['budget', 'consent', 'email', 'message', 'name', 'projectType', 'website']);
});

test('validateContact strips control characters and enforces length limits', () => {
  const r = validateContact(validContactBody({ name: 'Eri\u0007\u0000ka', message: 'x'.repeat(3001) }));
  assert.equal(r.values.name, 'Erika');
  assert.equal(r.errors.message, 'message');
});

test('honeypot and timing heuristics flag bots', () => {
  assert.equal(looksLikeSpam({ website_url: 'http://spam', ts: String(Date.now() - 10000) }), true);
  assert.equal(looksLikeSpam({ website_url: '', ts: String(Date.now() - 500) }), true);
  assert.equal(looksLikeSpam({ website_url: '', ts: String(Date.now() - 10000) }), false);
  assert.equal(looksLikeSpam({ website_url: '' }), false);
});

test('SMTP message composition is text-only and carries the validated request', () => {
  const body = validContactBody({ name: 'Erika Mustermann', email: 'erika@example.com' });
  const { values } = validateContact(body);
  const message = composeText('de', values);
  assert.match(message, /Portfolio contact request \(de\)/);
  assert.match(message, /Name: Erika Mustermann/);
  assert.match(message, /Email: erika@example.com/);
  assert.match(message, /Message:/);
});

test('SMTP activation fails closed when credentials are missing', () => {
  assert.throws(
    () => assertSmtpConfig({ host: 'smtp.hostinger.com', port: 465, secure: true, user: '', pass: '', from: '' }),
    /missing user, pass, from/,
  );
});

test('GET /{locale}/contact renders the localized form', async () => {
  for (const [locale, label] of [
    ['de', 'Projektbeschreibung'],
    ['en', 'Project description'],
    ['tr', 'Proje açıklaması'],
  ]) {
    const html = await (await srv.get(`/${locale}/contact`)).text();
    assert.match(html, new RegExp(label));
    assert.match(html, /name="website_url"/);
    assert.match(html, /name="ts"/);
  }
});

test('POST with invalid data returns 422, re-renders values and localized errors', async () => {
  const res = await srv.post('/de/contact', validContactBody({ email: 'invalid', message: 'zu kurz', name: 'Erika' }));
  assert.equal(res.status, 422);
  const html = await res.text();
  assert.match(html, /Bitte geben Sie eine gültige E-Mail-Adresse an/);
  assert.match(html, /Bitte beschreiben Sie Ihr Vorhaben/);
  assert.match(html, /value="Erika"/);
  assert.match(html, /aria-invalid="true"/);
});

test('POST with valid data in development transport shows the honest "not delivered" notice', async () => {
  const res = await srv.post('/en/contact', validContactBody());
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.match(html, /Request validated, delivery not active yet/);
  assert.doesNotMatch(html, /Thank you for your request/);
});

test('POST that trips the honeypot is rejected without a success message', async () => {
  const res = await srv.post('/tr/contact', validContactBody({ website_url: 'http://bot.example' }));
  assert.equal(res.status, 400);
  assert.match(await res.text(), /Talep kabul edilemedi/);
});

test('POST that arrives too fast after render is rejected', async () => {
  const res = await srv.post('/de/contact', validContactBody({ ts: String(Date.now()) }));
  assert.equal(res.status, 400);
});

test('contact endpoint is rate limited per IP', async () => {
  const local = await startServer();
  try {
    let last;
    for (let i = 0; i < 6; i += 1) {
      last = await local.post('/de/contact', validContactBody());
    }
    assert.equal(last.status, 429);
    assert.match(await last.text(), /Zu viele Anfragen/);
  } finally {
    await local.close();
  }
});

test('oversized bodies are rejected safely', async () => {
  const res = await srv.post('/de/contact', validContactBody({ message: 'x'.repeat(40000) }));
  assert.ok([413, 422].includes(res.status));
});
