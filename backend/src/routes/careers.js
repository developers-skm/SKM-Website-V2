const crypto = require('crypto');
const express = require('express');
const { body, validationResult } = require('express-validator');
const upload = require('../middleware/upload');
const { sendCareerApplicationEmail, sendInternshipApplicationEmail, sendGroupEmploymentEmail } = require('../utils/mailer');
const dedupe = require('../middleware/dedupe');

const router = express.Router();

const APPLICATION_TYPES = ['job', 'talent_pool'];
const REFERENCE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

// There is no database, so the reference is generated here (server-side) and
// returned to the applicant and included in the recruitment email.
function generateReference() {
  const bytes = crypto.randomBytes(6);
  const code = Array.from(bytes, (b) => REFERENCE_ALPHABET[b % REFERENCE_ALPHABET.length]).join('');
  return `SKM-APP-${code}`;
}

const optionalText = (field) => body(field).optional({ nullable: true, checkFalsy: true }).trim();

const validators = [
  body('application_type').trim().isIn(APPLICATION_TYPES).withMessage('Invalid application type.'),
  body('first_name').trim().notEmpty().withMessage('First name is required.'),
  body('last_name').trim().notEmpty().withMessage('Last name is required.'),
  body('email').trim().isEmail().withMessage('A valid email is required.'),
  body('phone').trim().notEmpty().withMessage('Mobile number is required.'),
  body('date_of_birth').trim().isISO8601({ strict: true }).withMessage('A valid date of birth is required.'),
  body('gender').trim().notEmpty().withMessage('Gender is required.'),
  body('current_address').trim().notEmpty().withMessage('Current address is required.'),
  body('permanent_address').trim().notEmpty().withMessage('Permanent address is required.'),
  body('district_city').trim().notEmpty().withMessage('District / city is required.'),
  body('highest_qualification').trim().notEmpty().withMessage('Highest qualification is required.'),
  body('job_id').if(body('application_type').equals('job')).trim().notEmpty().withMessage('Job ID is required.'),
  body('job_title').if(body('application_type').equals('job')).trim().notEmpty().withMessage('Job title is required.'),
  body('preferred_department').if(body('application_type').equals('talent_pool')).trim().notEmpty().withMessage('Preferred department is required.'),
  ...[
    'job_department', 'job_location', 'current_location', 'current_company', 'current_designation',
    'specialization', 'total_experience', 'relevant_experience', 'current_ctc', 'expected_ctc',
    'notice_period', 'willing_to_relocate', 'referral_source', 'preferred_role', 'linkedin_url',
  ].map(optionalText),
];

router.post('/apply', upload.single('resume'), dedupe, validators, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Resume is required.' });
    }

    const reference = generateReference();
    const fields = [
      'application_type', 'job_id', 'job_title', 'job_department', 'job_location',
      'first_name', 'last_name', 'date_of_birth', 'gender', 'email', 'phone',
      'current_address', 'permanent_address', 'district_city', 'current_location',
      'current_company', 'current_designation', 'highest_qualification', 'specialization',
      'total_experience', 'relevant_experience', 'current_ctc', 'expected_ctc', 'notice_period',
      'willing_to_relocate', 'referral_source', 'preferred_department', 'preferred_role', 'linkedin_url',
    ];
    const payload = Object.fromEntries(fields.map((f) => [f, req.body[f] || null]));

    await sendCareerApplicationEmail(payload, req.file, reference);

    res.status(201).json({ message: 'Application received.', reference });
  } catch (err) {
    next(err);
  }
});

const internshipValidators = [
  body('name').trim().notEmpty().withMessage('Name is required.').isLength({ max: 120 }),
  body('institute').trim().notEmpty().withMessage('Institute is required.').isLength({ max: 200 }),
  body('course').trim().notEmpty().withMessage('Course is required.').isLength({ max: 120 }),
  body('current_year').trim().notEmpty().withMessage('Current year of course is required.').isLength({ max: 40 }),
  body('period_from').trim().isISO8601({ strict: true }).withMessage('A valid internship start date is required.'),
  body('period_to').trim().isISO8601({ strict: true }).withMessage('A valid internship end date is required.')
    .custom((value, { req }) => value >= req.body.period_from).withMessage('End date cannot be before the start date.'),
  body('email').trim().isEmail().withMessage('A valid email is required.'),
  body('phone').trim().notEmpty().withMessage('Mobile number is required.').isLength({ max: 20 }),
];

router.post('/internship', dedupe, internshipValidators, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }
    const reference = generateReference();
    const fields = ['name', 'institute', 'course', 'current_year', 'period_from', 'period_to', 'email', 'phone'];
    const payload = Object.fromEntries(fields.map((f) => [f, req.body[f] || null]));
    await sendInternshipApplicationEmail(payload, reference);
    res.status(201).json({ message: 'Internship application received.', reference });
  } catch (err) {
    next(err);
  }
});

const groupEmploymentValidators = [
  body('agency_name').trim().notEmpty().withMessage('Name of agency is required.').isLength({ max: 200 }),
  body('agency_experience').trim().notEmpty().withMessage('Agency experience is required.').isLength({ max: 500 }),
  body('manpower_min').trim().isInt({ min: 1, max: 1000000 }).withMessage('Minimum manpower must be a whole number of at least 1.'),
  body('manpower_max').trim().isInt({ min: 1, max: 1000000 }).withMessage('Maximum manpower must be a whole number of at least 1.')
    .custom((value, { req }) => Number(value) >= Number(req.body.manpower_min)).withMessage('Maximum manpower cannot be less than the minimum.'),
  body('location').trim().notEmpty().withMessage('Location is required.').isLength({ max: 200 }),
  body('email').trim().isEmail().withMessage('A valid email is required.'),
  body('phone').trim().notEmpty().withMessage('Mobile number is required.').isLength({ max: 20 }),
];

router.post('/group-employment', dedupe, groupEmploymentValidators, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }
    const reference = generateReference();
    const fields = ['agency_name', 'agency_experience', 'manpower_min', 'manpower_max', 'location', 'email', 'phone'];
    const payload = Object.fromEntries(fields.map((f) => [f, req.body[f] || null]));
    await sendGroupEmploymentEmail(payload, reference);
    res.status(201).json({ message: 'Enquiry received.', reference });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
