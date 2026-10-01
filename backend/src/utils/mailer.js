const nodemailer = require('nodemailer');

// Contact/enquiry form mailbox (job, internship, feedback, vendor, service, general).
const contactTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Get a Quote mailbox — separate inbox so quote requests route to a
// different team/person than general enquiries. Falls back to the contact
// mailbox's transporter/address if the *2 variables aren't set.
const quoteTransporter = process.env.SMTP_HOST2
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST2,
      port: Number(process.env.SMTP_PORT2) || 587,
      secure: process.env.SMTP_SECURE2 === 'true',
      auth: {
        user: process.env.SMTP_USER2,
        pass: process.env.SMTP_PASS2,
      },
    })
  : contactTransporter;

const ENQUIRY_TYPE_LABELS = {
  job: 'Job Application',
  internship: 'Internship Request',
  feedback: 'Feedback & Complaints',
  vendor: 'Vendor Partner',
  service: 'Service Provider',
  quality: 'Contact Quality Team',
  general: 'General Enquiry',
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEnquiryEmailHtml(payload) {
  const label = ENQUIRY_TYPE_LABELS[payload.enquiry_type] || 'General Enquiry';
  const rows = Object.entries(payload)
    .filter(([key, value]) => key !== 'enquiry_type' && value !== null && value !== undefined && value !== '')
    .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;font-weight:600;white-space:nowrap;">${escapeHtml(key)}</td><td style="padding:4px 0;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`)
    .join('');

  return `
    <h2 style="margin:0 0 12px;">New ${escapeHtml(label)}</h2>
    <table cellpadding="0" cellspacing="0" style="font-family:sans-serif;font-size:14px;">${rows}</table>
  `;
}

async function sendEnquiryEmail(payload, attachment) {
  const label = ENQUIRY_TYPE_LABELS[payload.enquiry_type] || 'General Enquiry';

  await contactTransporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    replyTo: payload.email,
    subject: `[SKM Website] ${label} — ${payload.first_name} ${payload.last_name}`,
    html: buildEnquiryEmailHtml(payload),
    attachments: attachment
      ? [{ filename: attachment.originalname, content: attachment.buffer }]
      : [],
  });
}

function quoteRow(label, value) {
  const display = value === null || value === undefined || value === '' ? 'Not provided' : escapeHtml(value);
  return `<tr><td style="padding:4px 12px 4px 0;color:#666;font-weight:600;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:4px 0;white-space:pre-wrap;">${display}</td></tr>`;
}

function buildQuoteEmailHtml(payload) {
  const requiredQuantity = payload.quantity_value
    ? `${escapeHtml(payload.quantity_value)}${payload.quantity_unit ? ` ${escapeHtml(payload.quantity_unit)}` : ''}`
    : null;
  const sampleProducts = Array.isArray(payload.sample_product_ids) ? payload.sample_product_ids.join(', ') : payload.sample_product_ids;

  const rows = [
    quoteRow('Name', `${payload.first_name} ${payload.last_name}`),
    quoteRow('Company', payload.company),
    quoteRow('Job Role', payload.job_role),
    quoteRow('Email', payload.email),
    quoteRow('Phone', payload.phone),
    quoteRow('Country', payload.destination_country),
    quoteRow('Inquiry Type', payload.enquiry_intent),
    quoteRow('Product', payload.product_id || sampleProducts),
    quoteRow('Required Quantity', requiredQuantity || payload.quantity),
    quoteRow('Packaging', payload.packaging),
    quoteRow('Delivery Date', payload.delivery_date),
    quoteRow('Message', payload.message),
    quoteRow('Submitted At', new Date().toISOString()),
    quoteRow('Source', 'SKM Website — Get a Quote Form'),
  ].join('');

  return `
    <h2 style="margin:0 0 12px;">New Website Enquiry</h2>
    <table cellpadding="0" cellspacing="0" style="font-family:sans-serif;font-size:14px;">${rows}</table>
  `;
}

async function sendQuoteEmail(payload) {
  await quoteTransporter.sendMail({
    from: process.env.MAIL_FROM2 || process.env.MAIL_FROM,
    to: process.env.MAIL_TO2 || process.env.MAIL_TO,
    replyTo: payload.email,
    subject: `[SKM Website] Quote Request — ${payload.first_name} ${payload.last_name} (${payload.company})`,
    html: buildQuoteEmailHtml(payload),
  });
}

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
  const heading = isTalentPool ? 'New Talent Pool Profile' : 'New Job Application';
  const rows = [
    ['Reference', reference],
    ...Object.entries(CAREER_FIELD_LABELS).map(([key, label]) => [label, payload[key]]),
  ]
    .filter(([, value]) => value !== null && value !== undefined && value !== '')
    .map(([label, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;font-weight:600;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:4px 0;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`)
    .join('');

  const subject = isTalentPool
    ? `[SKM Careers] ${reference} Talent Pool — ${payload.first_name} ${payload.last_name}`
    : `[SKM Careers] ${reference} ${payload.job_title} — ${payload.first_name} ${payload.last_name}`;

  await contactTransporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO_CAREERS || process.env.MAIL_TO,
    replyTo: payload.email,
    subject,
    html: `<h2 style="margin:0 0 12px;">${heading}</h2><table cellpadding="0" cellspacing="0" style="font-family:sans-serif;font-size:14px;">${rows}</table>`,
    attachments: [{ filename: attachment.originalname, content: attachment.buffer }],
  });
}

module.exports = { sendEnquiryEmail, sendQuoteEmail, sendCareerApplicationEmail };
