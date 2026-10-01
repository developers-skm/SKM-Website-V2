const crypto = require('crypto');
const express = require('express');
const { body, validationResult } = require('express-validator');
const upload = require('../middleware/upload');
const { sendCareerApplicationEmail } = require('../utils/mailer');

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
  body('phone').trim().notEmpty().withMessage('Phone number is required.'),
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

router.post('/apply', upload.single('resume'), validators, async (req, res, next) => {
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
      'first_name', 'last_name', 'email', 'phone', 'current_location',
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

module.exports = router;
