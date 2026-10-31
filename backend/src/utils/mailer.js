const nodemailer = require('nodemailer');
const {
  planProductDeliveries,
  resolveEnquiryRecipient,
  getEnquiryLabel,
  applyOverride,
  DOMESTIC_COUNTRY,
} = require('../config/routing');

// Contact/enquiry form mailbox (job, internship, feedback, vendor, service, general).
const contactTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  connectionTimeout: 8000,
  greetingTimeout: 8000,
  socketTimeout: 8000,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Get a Quote mailbox - optional second SMTP account. Falls back to the
// contact mailbox's transporter/address if the *2 variables aren't set.
const quoteTransporter = process.env.SMTP_HOST2
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST2,
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 8000,
      port: Number(process.env.SMTP_PORT2) || 587,
      secure: process.env.SMTP_SECURE2 === 'true',
      auth: {
        user: process.env.SMTP_USER2,
        pass: process.env.SMTP_PASS2,
      },
    })
  : contactTransporter;

const BRAND_RED = '#e40a18';

const QUOTE_INTENT_LABELS = {
  'product-recommendation': 'Product Recommendation',
  'sample-or-documents': 'Sample / Technical Documents',
  'price-quotation': 'Price Quotation',
  general: 'Quote',
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Header values must be single-line - strip CR/LF so user input can never
// inject extra headers into the subject.
function singleLine(value) {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim();
}

function formatSubmittedAt(date = new Date()) {
  return `${date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })} IST`;
}

function row(label, value) {
  const display = value === null || value === undefined || value === '' ? 'Not provided' : escapeHtml(value);
  return `<tr>
    <td style="padding:9px 16px 9px 0;color:#6b6b6b;font-weight:600;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f0ece4;width:170px;">${escapeHtml(label)}</td>
    <td style="padding:9px 0;color:#1a1a1a;white-space:pre-wrap;vertical-align:top;border-bottom:1px solid #f0ece4;">${display}</td>
  </tr>`;
}

// Shared SKM-branded layout. `rows` is [[label, value], ...]; every value is escaped.
function buildEmailHtml({ heading, rows }) {
  return `<!doctype html>
<html><body style="margin:0;padding:24px 12px;background:#f6f3ec;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:640px;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e8e2d8;">
    <tr><td style="background:${BRAND_RED};padding:20px 28px;color:#ffffff;">
      <div style="font-size:20px;font-weight:700;letter-spacing:0.5px;">SKM Egg Products</div>
      <div style="font-size:12px;opacity:0.85;margin-top:2px;">Website Enquiry Notification</div>
    </td></tr>
    <tr><td style="padding:26px 28px 8px;">
      <h2 style="margin:0 0 14px;font-size:18px;color:#1a1a1a;">${escapeHtml(heading)}</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;line-height:1.5;">${rows.map(([l, v]) => row(l, v)).join('')}</table>
    </td></tr>
    <tr><td style="padding:16px 28px 24px;font-size:12px;color:#8a8a8a;">
      Reply directly to this email to respond to the customer.<br>
      Sent automatically from skmegg.com - SKM Egg Products Pvt. Ltd.
    </td></tr>
  </table>
</body></html>`;
}

function attachmentFor(file) {
  return file ? [{ filename: file.originalname, content: file.buffer }] : [];
}

// ── Contact / department enquiries ──────────────────────────────────────────
const CONTACT_FIELD_LABELS = [
  ['company', 'Company / Institute'],
  ['location', 'Location'],
  ['product', 'Product'],
  ['position', 'Position Applied For'],
  ['qualification', 'Qualification'],
  ['job_description', 'Job Description'],
  ['institute_name', 'Institute'],
  ['period_from', 'Period From'],
  ['period_to', 'Period To'],
  ['persons_applied', 'Persons Applied'],
  ['batch_number', 'Batch Number'],
  ['website', 'Website'],
  ['nature_of_service', 'Nature of Service'],
  ['years_of_experience', 'Years of Experience'],
  ['manufacturing_location', 'Manufacturing Location'],
  ['products_manufactured', 'Products Manufactured'],
  ['interest', 'Area of Interest'],
  ['feedback_type', 'Feedback Type'],
  ['partner_category', 'Partner Category'],
];

async function sendEnquiryEmail(payload, attachment) {
  const to = resolveEnquiryRecipient(payload.enquiry_type);
  if (!to) throw new Error('Invalid enquiry type.');
  const label = getEnquiryLabel(payload.enquiry_type);

  const extras = CONTACT_FIELD_LABELS
    .filter(([key]) => key !== 'company' && payload[key])
    .map(([key, text]) => [text, payload[key]]);
  const rows = [
    ['Customer Name', `${payload.first_name} ${payload.last_name}`],
    ['Company Name', payload.company],
    ['Email Address', payload.email],
    ['Phone Number', payload.phone],
    ['Enquiry Type', label],
    ...extras,
    ['Message / Requirements', payload.message],
    ['Submitted', formatSubmittedAt()],
  ];

  await contactTransporter.sendMail({
    from: process.env.MAIL_FROM,
    to: applyOverride(to),
    replyTo: payload.email,
    subject: `SKM Website - New ${label} Enquiry`,
    html: buildEmailHtml({ heading: `New ${label} Enquiry`, rows }),
    attachments: attachmentFor(attachment),
  });
}

// ── Quote / product enquiries ───────────────────────────────────────────────
// One email per distinct recipient (a mixed Indian sample request can span
// departments). Returns the number of emails sent.
async function sendQuoteEmail(payload) {
  const productIds = payload.product_ids;
  const deliveries = planProductDeliveries(payload.destination_country, productIds);
  const intentLabel = QUOTE_INTENT_LABELS[payload.enquiry_intent] || QUOTE_INTENT_LABELS.general;
  const scope = payload.destination_country === DOMESTIC_COUNTRY ? 'Domestic' : 'International';
  const quantity = payload.quantity_value
    ? `${payload.quantity_value}${payload.quantity_unit ? ` ${payload.quantity_unit}` : ''}`
    : payload.quantity;
  const submittedAt = formatSubmittedAt();

  await Promise.all(deliveries.map(({ to, products }) => quoteTransporter.sendMail({
    from: process.env.MAIL_FROM2 || process.env.MAIL_FROM,
    to: applyOverride(to),
    replyTo: payload.email,
    subject: `SKM Website - New ${intentLabel} Enquiry`,
    html: buildEmailHtml({
      heading: `New ${intentLabel} Enquiry`,
      rows: [
        ['Customer Name', `${payload.first_name} ${payload.last_name}`],
        ['Company Name', payload.company],
        ['Email Address', payload.email],
        ['Phone Number', payload.phone],
        ['Country', payload.destination_country],
        ['Market', scope],
        ['Product Name / Category', products.map((p) => `${p.title} (${p.category})`).join(', ')],
        ['Enquiry Type', intentLabel],
        ['Job Role', payload.job_role],
        ['Required Quantity', quantity],
        ['Packaging', payload.packaging],
        ['Delivery Date', payload.delivery_date],
        ['Functional Requirement', payload.functional_requirement],
        ['Message / Requirements', payload.message],
        ['Submitted', submittedAt],
      ],
    }),
  })));

  return deliveries.length;
}

// ── Careers ─────────────────────────────────────────────────────────────────
const CAREER_FIELD_LABELS = {
  application_type: 'Application Type',
  job_id: 'Job ID',
  job_title: 'Position',
  job_department: 'Department',
  job_location: 'Job Location',
  first_name: 'First Name',
  last_name: 'Last Name',
  email: 'Email',
  phone: 'Phone',
  current_location: 'Current Location',
  current_company: 'Current Company / Institute',
  current_designation: 'Current Designation',
  highest_qualification: 'Highest Qualification',
  specialization: 'Specialization',
  total_experience: 'Total Experience',
  relevant_experience: 'Relevant Experience',
  current_ctc: 'Current CTC',
  expected_ctc: 'Expected CTC',
  notice_period: 'Notice Period',
  willing_to_relocate: 'Willing to Relocate',
  referral_source: 'Heard About This Opportunity Via',
  preferred_department: 'Preferred Department',
  preferred_role: 'Preferred Role / Area of Interest',
  linkedin_url: 'LinkedIn Profile',
};

async function sendCareerApplicationEmail(payload, attachment, reference) {
  const isTalentPool = payload.application_type === 'talent_pool';
  const label = getEnquiryLabel(isTalentPool ? 'talent_pool' : 'job');
  const rows = [
    ['Reference', reference],
    ['Submitted', formatSubmittedAt()],
    ...Object.entries(CAREER_FIELD_LABELS).map(([key, text]) => [text, payload[key]]),
  ].filter(([, value]) => value !== null && value !== undefined && value !== '');

  await contactTransporter.sendMail({
    from: process.env.MAIL_FROM,
    to: applyOverride(resolveEnquiryRecipient(isTalentPool ? 'talent_pool' : 'job')),
    replyTo: payload.email,
    subject: `SKM Website - New ${label} Enquiry`,
    html: buildEmailHtml({
      heading: isTalentPool ? 'New Talent Pool Profile' : `New Job Application - ${singleLine(payload.job_title)}`,
      rows,
    }),
    attachments: attachmentFor(attachment),
  });
}

module.exports = { sendEnquiryEmail, sendQuoteEmail, sendCareerApplicationEmail };
