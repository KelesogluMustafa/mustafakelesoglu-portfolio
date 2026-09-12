'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { startServer, validContactBody, validContactFormData } = require('./helpers');
const { validateContact, looksLikeSpam, validateAttachments, ATTACHMENT_LIMITS } = require('../src/lib/contact-validation');
const { composeText, assertSmtpConfig, toNodemailerAttachments } = require('../src/lib/contact-delivery');
const config = require('../src/config');

function testFile(name, mimetype, buffer) {
  return new File([buffer], name, { type: mimetype });
}

function file(name, mimetype, buffer) {
  return { filename: name, mimetype, buffer };
}

const PDF_BYTES = Buffer.from('%PDF-1.4\n%fake pdf content for tests\n%%EOF');
const DOC_BYTES = Buffer.concat([Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]), Buffer.from('legacy word body')]);
const DOCX_BYTES = Buffer.concat([Buffer.from([0x50, 0x4b, 0x03, 0x04]), Buffer.from('zip-based docx body')]);
const TXT_BYTES = Buffer.from('Plain text attachment content for a test request.');
const EXE_BYTES = Buffer.from([0x4d, 0x5a, 0x90, 0x00, 0x03, 0x00, 0x00, 0x00]);

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
    message: '',
    consent: '',
  });
  assert.equal(r.ok, false);
  assert.deepEqual(Object.keys(r.errors).sort(), ['budget', 'consent', 'email', 'message', 'name', 'projectType', 'website']);
});

test('validateContact strips control characters and enforces length limits', () => {
  const r = validateContact(validContactBody({ name: 'Eri\u0007\u0000ka', message: 'x'.repeat(5001) }));
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

describe('optional project attachments (0-5 files, 10 MB combined)', () => {
  let uploadSrv;

  before(async () => {
    // This suite sends far more than 5 requests; the default contact rate limit (5 per
    // window) exists to stop abuse of the real endpoint and would otherwise make most of
    // these tests fail with 429 regardless of what they are actually checking. Raising it
    // only affects servers created after this point (each createApp() call captures the
    // limit at that moment), so the dedicated rate-limit test above is unaffected.
    config.contact.rateLimitMax = 1000;
    uploadSrv = await startServer();
  });
  after(() => uploadSrv.close());

  test('validateAttachments: count and combined-size rules are independent of any single file', () => {
    const many = Array.from({ length: 6 }, (_, i) => file(`f${i}.pdf`, 'application/pdf', PDF_BYTES));
    assert.deepEqual(validateAttachments(many.slice(0, 5)).ok, true);
    assert.deepEqual(validateAttachments(many).ok, false);
    assert.equal(validateAttachments(many).code, 'attachmentsCount');

    const big1 = file('a.txt', 'text/plain', Buffer.alloc(6 * 1024 * 1024, 'a'));
    const big2 = file('b.txt', 'text/plain', Buffer.alloc(5 * 1024 * 1024, 'a'));
    assert.equal(validateAttachments([big1, big2]).code, 'attachmentsSize'); // 11 MB combined, 2 files only
    assert.equal(validateAttachments([big1]).ok, true); // 6 MB alone is fine
  });

  test('validateAttachments: exactly 10 MB combined is accepted, one byte over is rejected', () => {
    const exact = [file('a.txt', 'text/plain', Buffer.alloc(5 * 1024 * 1024, 'a')), file('b.txt', 'text/plain', Buffer.alloc(5 * 1024 * 1024, 'a'))];
    assert.equal(validateAttachments(exact).ok, true);
    assert.equal(
      exact.reduce((sum, f) => sum + f.buffer.length, 0),
      ATTACHMENT_LIMITS.maxTotalBytes,
    );

    const overBy1 = [file('a.txt', 'text/plain', Buffer.alloc(5 * 1024 * 1024, 'a')), file('b.txt', 'text/plain', Buffer.alloc(5 * 1024 * 1024 + 1, 'a'))];
    assert.equal(validateAttachments(overBy1).code, 'attachmentsSize');
  });

  test('validateAttachments: accepts PDF, DOC, DOCX and TXT by real content, not just extension', () => {
    assert.equal(validateAttachments([file('report.pdf', 'application/pdf', PDF_BYTES)]).ok, true);
    assert.equal(validateAttachments([file('offer.doc', 'application/msword', DOC_BYTES)]).ok, true);
    assert.equal(
      validateAttachments([file('offer.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', DOCX_BYTES)]).ok,
      true,
    );
    assert.equal(validateAttachments([file('notes.txt', 'text/plain', TXT_BYTES)]).ok, true);
  });

  test('validateAttachments: rejects disallowed extensions and a renamed executable', () => {
    const svg = validateAttachments([file('logo.svg', 'image/svg+xml', Buffer.from('<svg></svg>'))]);
    assert.equal(svg.code, 'attachmentsType');

    // Same extension and declared MIME type as a real PDF, but the actual bytes are a
    // Windows executable — the file-signature check must catch what the extension can't.
    const disguised = validateAttachments([file('invoice.pdf', 'application/pdf', EXE_BYTES)]);
    assert.equal(disguised.code, 'attachmentsType');
  });

  test('validateAttachments: sanitizes filenames instead of trusting them for any path use', () => {
    const result = validateAttachments([file('../../etc/passwd.txt', 'text/plain', TXT_BYTES)]);
    assert.equal(result.ok, true);
    assert.doesNotMatch(result.files[0].filename, /\.\.|\//);
  });

  test('toNodemailerAttachments maps validated files into Nodemailer attachment objects', () => {
    const validated = validateAttachments([file('a.pdf', 'application/pdf', PDF_BYTES), file('b.txt', 'text/plain', TXT_BYTES)]);
    const mailAttachments = toNodemailerAttachments(validated.files);
    assert.equal(mailAttachments.length, 2);
    assert.deepEqual(
      mailAttachments.map((a) => a.filename),
      ['a.pdf', 'b.txt'],
    );
    assert.ok(Buffer.isBuffer(mailAttachments[0].content));
    assert.equal(mailAttachments[0].contentType, 'application/pdf');
  });

  test('0 files: the contact form still submits through the normal flow', async () => {
    const res = await uploadSrv.postForm('/en/contact', validContactFormData());
    assert.equal(res.status, 200);
    assert.match(await res.text(), /Request validated, delivery not active yet/);
  });

  test('1 valid PDF attachment is accepted', async () => {
    const res = await uploadSrv.postForm('/en/contact', validContactFormData({}, [testFile('report.pdf', 'application/pdf', PDF_BYTES)]));
    assert.equal(res.status, 200);
    assert.doesNotMatch(await res.text(), /aria-invalid="true"/);
  });

  test('5 valid attachments are accepted', async () => {
    const files = Array.from({ length: 5 }, (_, i) => testFile(`doc-${i}.pdf`, 'application/pdf', PDF_BYTES));
    const res = await uploadSrv.postForm('/en/contact', validContactFormData({}, files));
    assert.equal(res.status, 200);
    assert.match(await res.text(), /Request validated, delivery not active yet/);
  });

  test('6 attachments are rejected with the localized "too many files" error', async () => {
    const files = Array.from({ length: 6 }, (_, i) => testFile(`doc-${i}.pdf`, 'application/pdf', PDF_BYTES));
    const res = await uploadSrv.postForm('/en/contact', validContactFormData({}, files));
    assert.equal(res.status, 422);
    assert.match(await res.text(), /Please select at most 5 files/);
  });

  test('combined attachment size over 10 MB is rejected with the localized "too large" error', async () => {
    const files = [
      testFile('a.txt', 'text/plain', Buffer.alloc(5 * 1024 * 1024, 'a')),
      testFile('b.txt', 'text/plain', Buffer.alloc(5 * 1024 * 1024 + 1024, 'a')),
    ];
    const res = await uploadSrv.postForm('/en/contact', validContactFormData({}, files));
    assert.equal(res.status, 422);
    assert.match(await res.text(), /too large together/);
  });

  test('an unsupported file type is rejected with the localized error, in each locale', async () => {
    for (const [locale, text] of [
      ['de', /Nicht unterstütztes Dateiformat/],
      ['en', /Unsupported file type/],
      ['tr', /Desteklenmeyen dosya biçimi/],
    ]) {
      const res = await uploadSrv.postForm(`/${locale}/contact`, validContactFormData({}, [testFile('image.svg', 'image/svg+xml', Buffer.from('<svg/>'))]));
      assert.equal(res.status, 422);
      assert.match(await res.text(), text);
    }
  });

  test('the project description accepts 1 character and exactly 5000, and rejects empty and 5001, end to end', async () => {
    const single = await uploadSrv.postForm('/en/contact', validContactFormData({ message: 'x' }));
    assert.equal(single.status, 200);

    const ok = await uploadSrv.postForm('/en/contact', validContactFormData({ message: 'x'.repeat(5000) }));
    assert.equal(ok.status, 200);

    const empty = await uploadSrv.postForm('/en/contact', validContactFormData({ message: '' }));
    assert.equal(empty.status, 422);
    assert.match(await empty.text(), /required, maximum 5000 characters/);

    const tooLong = await uploadSrv.postForm('/en/contact', validContactFormData({ message: 'x'.repeat(5001) }));
    assert.equal(tooLong.status, 422);
    assert.match(await tooLong.text(), /required, maximum 5000 characters/);
  });

  test('the rendered form exposes the 5000-character limit and localized attachment copy', async () => {
    const de = await (await uploadSrv.get('/de/contact')).text();
    assert.match(de, /maxlength="5000"/);
    assert.doesNotMatch(de, /minlength=/);
    assert.match(de, /Anhänge/);
    assert.match(de, /Bis zu 5 Dateien · PDF, DOC, DOCX oder TXT · insgesamt max\. 10 MB/);

    const en = await (await uploadSrv.get('/en/contact')).text();
    assert.match(en, /Attachments/);
    assert.match(en, /Up to 5 files · PDF, DOC, DOCX or TXT · max\. 10 MB total/);

    const tr = await (await uploadSrv.get('/tr/contact')).text();
    assert.match(tr, /Dosyalar/);
    assert.match(tr, /En fazla 5 dosya · PDF, DOC, DOCX veya TXT · toplam maks\. 10 MB/);
  });

  test('the two-column form rows no longer rely on stretch alignment (Existing website / Approximate budget fix)', () => {
    const css = fs.readFileSync(path.join(__dirname, '..', 'public', 'css', 'components', 'forms.css'), 'utf8');
    assert.match(css, /\.form__row\s*\{[^}]*align-items:\s*start/s);
    assert.match(css, /\.field\s*\{[^}]*align-content:\s*start/s);
  });
});
