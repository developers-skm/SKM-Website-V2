// Run with: npm test --prefix backend   (node:test, no extra dependencies)
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const nodemailer = require('nodemailer');

// Capture outgoing mail instead of hitting SMTP. Must be patched before the app loads.
const sent = [];
let failNext = false;
nodemailer.createTransport = () => ({
  sendMail: async (msg) => {
    if (failNext) {
      failNext = false;
      throw Object.assign(new Error('SMTP down'), { code: 'ECONNECTION' });
    }
    sent.push(msg);
    return {};
  },
});
process.env.MAIL_FROM = 'SKM Website <no-reply@skmegg.com>';
delete process.env.MAIL_ROUTING_OVERRIDE_TO;

const app = require('../src/app');
const routing = require('../src/config/routing');

let server;
let base;
let counter = 0;
test.before(async () => {
  await new Promise((resolve) => { server = app.listen(0, resolve); });
  base = `http://127.0.0.1:${server.address().port}`;
});
test.after(() => server.close());
test.beforeEach(() => { sent.length = 0; });

const uid = () => `test-submission-${Date.now()}-${counter++}`;
// A distinct X-Forwarded-For per request keeps the per-IP rate limiter out of the way.
const nextIp = () => `10.${Math.floor(counter / 250) % 250}.0.${(counter++ % 250) + 1}`;
const post = (url, body) => fetch(`${base}${url}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': nextIp() },
  body: JSON.stringify(body),
});

const quote = (over = {}) => ({
  enquiry_intent: 'price-quotation',
  product_id: 'whole_egg_powder',
  quantity_value: '10',
  quantity_unit: 'MT',
  destination_country: 'Japan',
  first_name: 'Ayaka',
  last_name: 'Sato',
  company: 'Sato Foods',
  email: 'john.doe@gmail.com',
  phone: '+81312345678',
  message: 'We need 10 MT monthly of whole egg powder.',
  consent: true,
  website: '',
  submission_id: uid(),
  ...over,
});

// ── Quote routing matrix ────────────────────────────────────────────────────
const MATRIX = [
  // [country, productId, expected recipient]
  ['Japan', 'whole_egg_powder', 'exportsales@skmegg.com'],
  ['Germany', 'egg_yolk_liquid', 'exportsales@skmegg.com'],
  ['UAE', 'egg_white_cube', 'exportsales@skmegg.com'],
  ['UK', 'customised_mix', 'exportsales@skmegg.com'],
  ['Other', 'whole_egg_liquid', 'exportsales@skmegg.com'],
  ['India', 'whole_egg_powder', 'exportsales@skmegg.com'],
  ['India', 'egg_yolk_powder_heat_stable', 'exportsales@skmegg.com'],
  ['India', 'egg_albumen_liquid', 'commercialbesteggs@skmegg.com'],
  ['India', 'whole_egg_liquid', 'commercialbesteggs@skmegg.com'],
  ['India', 'speciality_egg_liquids', 'customercare@skmegg.com'],
  ['India', 'egg_white_cube', 'customercare@skmegg.com'],
  ['India', 'customised_mix', 'customercare@skmegg.com'],
  ['India', 'customised_packages', 'customercare@skmegg.com'],
];

for (const [country, productId, expected] of MATRIX) {
  test(`quote: ${country} + ${productId} -> ${expected}`, async () => {
    const res = await post('/api/v1/quote/submit', quote({ destination_country: country, product_id: productId }));
    assert.equal(res.status, 201);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].to, expected);
    assert.equal(sent[0].replyTo, 'john.doe@gmail.com'); // dots preserved
    assert.match(sent[0].subject, /^SKM Website - New .+ Enquiry$/);
    assert.ok(!JSON.stringify(await res.json()).includes('@skmegg.com'), 'recipient not exposed');
  });
}

test('every catalogue product has an explicit category mapping', () => {
  const src = fs.readFileSync(path.join(__dirname, '../../src/data/products.js'), 'utf8');
  const ids = [...src.matchAll(/^ {4}id: '([a-z_]+)'/gm)].map((m) => m[1]);
  assert.ok(ids.length >= 11);
  for (const id of ids) assert.ok(routing.getProduct(id), `missing mapping for ${id}`);
});

test('backend country list covers the frontend export markets', () => {
  const src = fs.readFileSync(path.join(__dirname, '../../src/data/exportMarkets.js'), 'utf8');
  const names = [...src.matchAll(/name: '([^']+)'/g)].map((m) => m[1]);
  assert.ok(names.length >= 28);
  for (const name of names) assert.ok(routing.isValidCountry(name), `missing country ${name}`);
});

test('Indian sample cart spanning categories splits per department', async () => {
  const res = await post('/api/v1/quote/submit', quote({
    enquiry_intent: 'sample-or-documents',
    product_id: null,
    destination_country: 'India',
    sample_product_ids: ['whole_egg_powder', 'egg_yolk_liquid', 'egg_white_cube', 'egg_yolk_powder'],
  }));
  assert.equal(res.status, 201);
  assert.deepEqual(
    sent.map((m) => m.to).sort(),
    ['commercialbesteggs@skmegg.com', 'customercare@skmegg.com', 'exportsales@skmegg.com'],
  );
});

test('international sample cart sends a single email to exportsales', async () => {
  const res = await post('/api/v1/quote/submit', quote({
    product_id: null,
    sample_product_ids: ['whole_egg_powder', 'egg_yolk_liquid', 'egg_white_cube'],
  }));
  assert.equal(res.status, 201);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'exportsales@skmegg.com');
});

test('client-supplied recipient is ignored', async () => {
  const res = await post('/api/v1/quote/submit', quote({
    to: 'attacker@evil.com',
    recipient: 'attacker@evil.com',
    email_to: 'attacker@evil.com',
  }));
  assert.equal(res.status, 201);
  assert.equal(sent[0].to, 'exportsales@skmegg.com');
});

test('email body has the required fields and escapes HTML', async () => {
  await post('/api/v1/quote/submit', quote({ company: '<script>alert(1)</script> Ltd' }));
  const { html } = sent[0];
  for (const label of ['Customer Name', 'Company Name', 'Email Address', 'Phone Number', 'Country',
    'Product Name / Category', 'Enquiry Type', 'Message / Requirements', 'Submitted']) {
    assert.ok(html.includes(label), label);
  }
  assert.ok(!html.includes('<script>'));
});

// ── Validation / abuse ──────────────────────────────────────────────────────
test('invalid or missing data is rejected and sends no email', async () => {
  for (const over of [
    { destination_country: 'Atlantis' },
    { destination_country: '' },
    { product_id: 'not_a_product' },
    { product_id: null, sample_product_ids: null },
    { email: 'nope' },
    { phone: 'abc' },
    { message: 'short' },
    { consent: false },
    { website: 'http://spam.example' }, // honeypot
  ]) {
    const res = await post('/api/v1/quote/submit', quote(over));
    assert.equal(res.status, 400, JSON.stringify(over));
  }
  assert.equal(sent.length, 0);
});

test('a repeated submission_id sends only one email', async () => {
  const body = quote();
  const [a, b] = await Promise.all([post('/api/v1/quote/submit', body), post('/api/v1/quote/submit', body)]);
  const again = await post('/api/v1/quote/submit', body);
  // The concurrent twin gets 409 (still sending) or the cached 201 (already sent) - never a second email.
  assert.ok([a.status, b.status].includes(201));
  assert.ok([a.status, b.status].every((s) => s === 201 || s === 409));
  assert.equal(again.status, 201);
  assert.equal(sent.length, 1);
});

test('mail failure returns an error (never success) and the visitor can retry', async () => {
  const body = quote();
  failNext = true;
  const failed = await post('/api/v1/quote/submit', body);
  assert.equal(failed.status, 502);
  assert.equal(sent.length, 0);
  const retry = await post('/api/v1/quote/submit', body);
  assert.equal(retry.status, 201);
  assert.equal(sent.length, 1);
});

// ── Department (non-product) routing: country must not matter ───────────────
const CONTACT_MATRIX = [
  ['general', 'hrd@skmegg.com'],
  ['job', 'hrd@skmegg.com'],
  ['internship', 'hrd@skmegg.com'],
  ['feedback', 'hrd@skmegg.com'],
  ['vendor', 'hrd@skmegg.com'],
  ['service', 'hrd@skmegg.com'],
  ['quality', 'quality@skmegg.com'],
  ['technical', 'quality@skmegg.com'],
  ['product_application', 'quality@skmegg.com'],
];
for (const [type, expected] of CONTACT_MATRIX) {
  for (const country of ['India', 'Japan']) {
    test(`contact: ${type} (${country}) -> ${expected}`, async () => {
      const res = await post('/api/v1/contact/submit', {
        enquiry_type: type,
        first_name: 'A',
        last_name: 'B',
        email: 'a@b.com',
        phone: '9876543210',
        message: 'Hello',
        location: country,
        submission_id: uid(),
      });
      assert.equal(res.status, 201);
      assert.equal(sent.length, 1);
      assert.equal(sent[0].to, expected);
      assert.ok(sent[0].subject.startsWith('SKM Website - New '));
      assert.equal(sent[0].replyTo, 'a@b.com');
    });
  }
}

test('contact: unknown enquiry type is rejected', async () => {
  const res = await post('/api/v1/contact/submit', {
    enquiry_type: 'sales', first_name: 'A', last_name: 'B', email: 'a@b.com', phone: '1',
  });
  assert.equal(res.status, 400);
  assert.equal(sent.length, 0);
});

test('careers application -> hrd with the CV attached', async () => {
  const form = new FormData();
  Object.entries({
    application_type: 'job',
    job_id: 'J1',
    job_title: 'QA Executive',
    first_name: 'A',
    last_name: 'B',
    email: 'a@b.com',
    phone: '9876543210',
    highest_qualification: 'B.Sc',
    submission_id: uid(),
  }).forEach(([k, v]) => form.append(k, v));
  form.append('resume', new Blob(['%PDF-1.4'], { type: 'application/pdf' }), 'cv.pdf');
  const res = await fetch(`${base}/api/v1/careers/apply`, {
    method: 'POST',
    body: form,
    headers: { 'X-Forwarded-For': nextIp() },
  });
  assert.equal(res.status, 201);
  assert.equal(sent[0].to, 'hrd@skmegg.com');
  assert.equal(sent[0].attachments.length, 1);
});

test('MAIL_ROUTING_OVERRIDE_TO redirects all mail (staging)', async () => {
  process.env.MAIL_ROUTING_OVERRIDE_TO = 'test@example.com';
  try {
    await post('/api/v1/quote/submit', quote());
    assert.equal(sent[0].to, 'test@example.com');
  } finally {
    delete process.env.MAIL_ROUTING_OVERRIDE_TO;
  }
});
