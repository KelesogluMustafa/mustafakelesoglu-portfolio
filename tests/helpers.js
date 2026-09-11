'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.GLOBAL_RATE_MAX = process.env.GLOBAL_RATE_MAX || '100000';

const { createApp } = require('../src/app');

/** Starts the app on an ephemeral port and returns helpers bound to it. */
async function startServer() {
  const app = createApp();
  const server = await new Promise((resolve) => {
    const s = app.listen(0, '127.0.0.1', () => resolve(s));
  });
  const base = `http://127.0.0.1:${server.address().port}`;
  return {
    base,
    app,
    server,
    get: (path, init = {}) => fetch(base + path, { redirect: 'manual', ...init }),
    post: (path, body, init = {}) =>
      fetch(base + path, {
        method: 'POST',
        redirect: 'manual',
        headers: { 'content-type': 'application/x-www-form-urlencoded', ...(init.headers || {}) },
        body: new URLSearchParams(body).toString(),
        ...init,
      }),
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

function validContactBody(overrides = {}) {
  return {
    name: 'Erika Mustermann',
    company: 'Beispiel GmbH',
    email: 'erika@example.com',
    projectType: 'website',
    website: 'example.com',
    budget: 'b2',
    deadline: 'Q1',
    message: 'Wir brauchen eine neue Unternehmenswebsite mit Kontaktformular und drei Leistungsseiten.',
    consent: 'on',
    website_url: '',
    ts: String(Date.now() - 10000),
    ...overrides,
  };
}

module.exports = { startServer, validContactBody };
