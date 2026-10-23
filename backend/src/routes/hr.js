const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  isConfigured, verifyCredentials, setSessionCookie, clearSessionCookie, requireHr,
} = require('../utils/hrAuth');
const jobStore = require('../utils/jobStore');
const { validateJob } = require('../utils/jobModel');

const router = express.Router();

// Brute-force guard: failed attempts only, per IP.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many failed attempts. Please try again in 15 minutes.' },
});

router.post('/login', loginLimiter, (req, res) => {
  if (!isConfigured()) {
    return res.status(503).json({ message: 'HR portal is not configured on the server.' });
  }
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: 'Enter your username and password.' });
  }
  if (!verifyCredentials(username, password)) {
    return res.status(401).json({ message: 'Incorrect username or password.' });
  }
  setSessionCookie(res, String(username).trim());
  return res.json({ user: { username: String(username).trim() } });
});

router.post('/logout', (req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

router.get('/me', requireHr, (req, res) => {
  res.json({ user: { username: req.hrUser } });
});

// ── Job openings (all HR-only) ───────────────────────────────────────────────
router.get('/jobs', requireHr, async (req, res, next) => {
  try {
    res.json({ jobs: await jobStore.list() });
  } catch (err) { next(err); }
});

router.post('/jobs', requireHr, async (req, res, next) => {
  try {
    const { data, error } = validateJob(req.body || {});
    if (error) return res.status(400).json({ message: error });
    res.status(201).json({ job: await jobStore.create(data) });
  } catch (err) { next(err); }
});

router.put('/jobs/:id', requireHr, async (req, res, next) => {
  try {
    const { data, error } = validateJob(req.body || {});
    if (error) return res.status(400).json({ message: error });
    const job = await jobStore.update(req.params.id, data);
    if (!job) return res.status(404).json({ message: 'Opening not found.' });
    res.json({ job });
  } catch (err) { next(err); }
});

router.delete('/jobs/:id', requireHr, async (req, res, next) => {
  try {
    const removed = await jobStore.remove(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Opening not found.' });
    res.json({ ok: true });
  } catch (err) { next(err); }
});

module.exports = router;
