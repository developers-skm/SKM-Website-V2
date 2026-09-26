const express = require('express');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const { sendQuoteEmail } = require('../utils/mailer');

const router = express.Router();

const VALID_ENQUIRY_INTENTS = ['product-recommendation', 'sample-or-documents', 'price-quotation', 'general'];
const PHONE_PATTERN = /^\+?[0-9]{7,15}$/;

// A dedicated, tighter limiter for this endpoint (in addition to the
// contact-family limiter already applied ahead of this router in app.js) —
// ~5 submissions per IP per 10 minutes, per the export-enquiry brief.
const quoteSubmitLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many enquiries submitted. Please try again later.' },
});

const validators = [
  // Honeypot — a genuine visitor never fills this hidden field, so any
  // non-empty value here means the request is automated.
  body('website').custom((value) => {
    if (value) throw new Error('Invalid submission.');
    return true;
  }),
  body('first_name').trim().notEmpty().withMessage('First name is required.')
    .isLength({ min: 2, max: 80 }).withMessage('First name must be 2–80 characters.'),
  body('last_name').trim().notEmpty().withMessage('Last name is required.')
    .isLength({ min: 2, max: 80 }).withMessage('Last name must be 2–80 characters.'),
  body('company').trim().notEmpty().withMessage('Company name is required.')
    .isLength({ min: 2, max: 120 }).withMessage('Company name must be 2–120 characters.'),
  body('email').trim().isEmail().withMessage('A valid email is required.')
    .isLength({ max: 254 }).withMessage('Email is too long.')
    .normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone number is required.')
    .customSanitizer((value) => String(value).replace(/[\s-]/g, ''))
    .matches(PHONE_PATTERN).withMessage('Enter a valid phone number.'),
  body('destination_country').optional({ nullable: true, checkFalsy: true }).trim()
    .isLength({ max: 100 }).withMessage('Invalid destination country.'),
  body('enquiry_intent').optional({ nullable: true, checkFalsy: true }).trim()
    .isIn(VALID_ENQUIRY_INTENTS).withMessage('Invalid enquiry type.'),
  body('quantity_value').optional({ nullable: true, checkFalsy: true })
    .isFloat({ gt: 0, lt: 1000000000 }).withMessage('Enter a valid positive quantity.'),
  body('quantity_unit').optional({ nullable: true, checkFalsy: true }).trim()
    .isLength({ max: 30 }).withMessage('Invalid quantity unit.'),
  body('message').trim().notEmpty().withMessage('Please tell us about your requirement.')
    .isLength({ min: 20, max: 2000 }).withMessage('Message must be between 20 and 2000 characters.'),
  body('consent').custom((value) => {
    if (value !== true && value !== 'true') throw new Error('Please confirm consent to proceed.');
    return true;
  }),
];

router.post('/submit', quoteSubmitLimiter, express.json(), validators, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }

    const payload = {
      enquiry_type: req.body.enquiry_type || 'quote_request',
      enquiry_intent: req.body.enquiry_intent || null,
      product_id: req.body.product_id || null,
      sample_product_ids: req.body.sample_product_ids || null,
      application_id: req.body.application_id || null,
      functional_requirement: req.body.functional_requirement || null,
      product_type: req.body.product_type || null,
      quantity: req.body.quantity || null,
      quantity_value: req.body.quantity_value || null,
      quantity_unit: req.body.quantity_unit || null,
      packaging: req.body.packaging || null,
      destination_country: req.body.destination_country || null,
      delivery_date: req.body.delivery_date || null,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      company: req.body.company,
      job_role: req.body.job_role || null,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
    };

    await sendQuoteEmail(payload);

    res.status(201).json({ message: 'Quote request received.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
