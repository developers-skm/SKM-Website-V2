const crypto = require('crypto');

// HR portal auth. Credentials and the session secret live only in server
// environment variables (backend/.env locally, Vercel env vars in production):
//   HR_USERNAME        login name
//   HR_PASSWORD_HASH   "salt:hash" produced by backend/scripts/hash-hr-password.js
//   HR_SESSION_SECRET  long random string used to sign session cookies
// Sessions are stateless signed tokens in an httpOnly cookie, so they work on
// Vercel's serverless functions without a database.

const COOKIE_NAME = 'skm_hr_session';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

const isConfigured = () =>
  Boolean(process.env.HR_USERNAME && process.env.HR_PASSWORD_HASH && process.env.HR_SESSION_SECRET);

function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

function verifyCredentials(username, password) {
  const [salt, expected] = String(process.env.HR_PASSWORD_HASH || '').split(':');
  if (!salt || !expected) return false;
  // Always run the hash so a wrong username takes as long as a wrong password.
  const actual = crypto.scryptSync(String(password), salt, 64).toString('hex');
  const userOk = safeEqual(String(username).trim().toLowerCase(), String(process.env.HR_USERNAME).trim().toLowerCase());
  const passOk = safeEqual(actual, expected);
  return userOk && passOk;
}

const sign = (payload) =>
  crypto.createHmac('sha256', process.env.HR_SESSION_SECRET).update(payload).digest('base64url');

function createSessionToken(username) {
  const payload = Buffer.from(JSON.stringify({ u: username, exp: Date.now() + SESSION_TTL_MS })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function readSession(token) {
  if (!token || !isConfigured()) return null;
  const [payload, sig] = String(token).split('.');
  if (!payload || !sig || !safeEqual(sig, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
}

function getCookie(req, name) {
  const header = req.headers.cookie || '';
  const match = header.split(';').map((c) => c.trim()).find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

const cookieOptions = () => ({
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL),
  path: '/',
});

function setSessionCookie(res, username) {
  res.cookie(COOKIE_NAME, createSessionToken(username), { ...cookieOptions(), maxAge: SESSION_TTL_MS });
}

function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, cookieOptions());
}

// Express middleware guarding every HR management endpoint.
function requireHr(req, res, next) {
  const session = readSession(getCookie(req, COOKIE_NAME));
  if (!session) return res.status(401).json({ message: 'Please sign in to continue.' });
  req.hrUser = session.u;
  return next();
}

module.exports = { isConfigured, verifyCredentials, setSessionCookie, clearSessionCookie, requireHr };
