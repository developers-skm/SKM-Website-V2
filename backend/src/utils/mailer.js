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

function buildEnquiryEmailHtml(payload) {
  const label = ENQUIRY_TYPE_LABELS[payload.enquiry_type] || 'General Enquiry';
  const rows = Object.entries(payload)
    .filter(([key, value]) => key !== 'enquiry_type' && value !== null && value !== undefined && value !== '')
    .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;font-weight:600;white-space:nowrap;">${key}</td><td style="padding:4px 0;">${String(value)}</td></tr>`)
    .join('');

  return `
    <h2 style="margin:0 0 12px;">New ${label}</h2>
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

function buildQuoteEmailHtml(payload) {
  const rows = Object.entries(payload)
    .filter(([, value]) => value !== null && value !== undefined && value !== '')
    .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;font-weight:600;white-space:nowrap;">${key}</td><td style="padding:4px 0;">${Array.isArray(value) ? value.join(', ') : String(value)}</td></tr>`)
    .join('');

  return `
    <h2 style="margin:0 0 12px;">New Quote Request</h2>
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

module.exports = { sendEnquiryEmail, sendQuoteEmail };
