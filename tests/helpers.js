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
    // Real multipart/form-data submission (the shape the browser form actually sends once it
    // carries a file input). `fetch` sets the Content-Type header itself, boundary included,
    // when the body is a FormData instance — do not override it.
    postForm: (path, formData, init = {}) =>
      fetch(base + path, {
        method: 'POST',
        redirect: 'manual',
        body: formData,
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

/** Builds a real multipart/form-data FormData for the contact form, optionally with files. */
function validContactFormData(overrides = {}, files = []) {
  const body = validContactBody(overrides);
  const formData = new FormData();
  for (const [key, value] of Object.entries(body)) {
    formData.append(key, value);
  }
  for (const file of files) {
    formData.append('attachments', file);
  }
  return formData;
}

module.exports = { startServer, validContactBody, validContactFormData };
