const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendQuoteEmail } = require('../utils/mailer');

const router = express.Router();

const validators = [
  body('first_name').trim().notEmpty().withMessage('First name is required.'),
  body('last_name').trim().notEmpty().withMessage('Last name is required.'),
  body('company').trim().notEmpty().withMessage('Company name is required.'),
  body('email').trim().isEmail().withMessage('A valid email is required.'),
  body('phone').trim().notEmpty().withMessage('Phone number is required.'),
];

router.post('/submit', express.json(), validators, async (req, res, next) => {
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
      packaging: req.body.packaging || null,
      destination_country: req.body.destination_country || null,
      delivery_date: req.body.delivery_date || null,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      company: req.body.company,
      job_role: req.body.job_role || null,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message || null,
    };

    await sendQuoteEmail(payload);

    res.status(201).json({ message: 'Quote request received.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
