// Usage: node backend/scripts/hash-hr-password.js "<password>"
// Prints HR_PASSWORD_HASH and a fresh HR_SESSION_SECRET to paste into
// backend/.env (local) or the Vercel project's environment variables.
const crypto = require('crypto');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node backend/scripts/hash-hr-password.js "<password>"');
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.scryptSync(password, salt, 64).toString('hex');
console.log(`HR_PASSWORD_HASH=${salt}:${hash}`);
console.log(`HR_SESSION_SECRET=${crypto.randomBytes(48).toString('hex')}`);
