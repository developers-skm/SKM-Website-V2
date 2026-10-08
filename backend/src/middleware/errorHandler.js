const multer = require('multer');

function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    const message = err.code === 'LIMIT_FILE_SIZE' ? 'File is larger than 5MB.' : err.message;
    return res.status(400).json({ message });
  }
  // Mail-transport failures (bad SMTP login, timeout, refused connection) are
  // server-side faults, not bad input — log the real cause, answer 502.
  if (err && (err.command || err.responseCode || /^E[A-Z]+$/.test(err.code || ''))) {
    console.error('Mail error:', err.code, err.responseCode, err.message);
    return res.status(502).json({ message: 'We could not deliver your enquiry right now. Please try again shortly.' });
  }
  if (err && err.message) {
    return res.status(400).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Something went wrong. Please try again.' });
}

module.exports = errorHandler;
