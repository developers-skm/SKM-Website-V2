const express = require('express');
const jobStore = require('../utils/jobStore');
const { toPublic, isPublic } = require('../utils/jobModel');

const router = express.Router();

// Public list of published openings (Active only, not past deadline) - managed
// from the HR portal at /newhr. Mounted without the enquiry rate limiter
// because every Careers page view calls it.
router.get('/', async (req, res, next) => {
  try {
    const jobs = (await jobStore.list()).filter(isPublic).map(toPublic);
    res.set('Cache-Control', 'no-store');
    res.json({ jobs });
  } catch (err) { next(err); }
});

module.exports = router;
