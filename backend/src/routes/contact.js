const express = require('express');
const { body, validationResult } = require('express-validator');
const upload = require('../middleware/upload');
const { sendEnquiryEmail } = require('../utils/mailer');

const router = express.Router();

const VALID_ENQUIRY_TYPES = ['job', 'internship', 'feedback', 'vendor', 'service', 'quality', 'general'];

const validators = [
  body('enquiry_type').trim().isIn(VALID_ENQUIRY_TYPES).withMessage('Invalid enquiry type.'),
  body('first_name').trim().notEmpty().withMessage('First name is required.'),
  body('last_name').trim().notEmpty().withMessage('Last name is required.'),
  body('email').trim().isEmail().withMessage('A valid email is required.'),
  body('phone').trim().notEmpty().withMessage('Phone number is required.'),
  body('message').optional({ nullable: true, checkFalsy: true }).trim(),
];

router.post('/submit', upload.single('resume'), validators, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }

    const payload = {
      enquiry_type: req.body.enquiry_type,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      company: req.body.company || null,
      location: req.body.location || null,
      product: req.body.product || null,
      position: req.body.position || null,
      qualification: req.body.qualification || null,
      job_description: req.body.job_description || null,
      institute_name: req.body.institute_name || null,
      period_from: req.body.period_from || null,
      period_to: req.body.period_to || null,
      persons_applied: req.body.persons_applied || null,
      batch_number: req.body.batch_number || null,
      website: req.body.website || null,
      nature_of_service: req.body.nature_of_service || null,
      years_of_experience: req.body.years_of_experience || null,
      manufacturing_location: req.body.manufacturing_location || null,
      products_manufactured: req.body.products_manufactured || null,
      interest: req.body.interest || null,
      feedback_type: req.body.feedback_type || null,
      partner_category: req.body.partner_category || null,
      message: req.body.message || null,
    };

    await sendEnquiryEmail(payload, req.file);

    res.status(201).json({ message: 'Enquiry received.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
