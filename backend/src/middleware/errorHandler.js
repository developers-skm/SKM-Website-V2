const multer = require('multer');

function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    const message = err.code === 'LIMIT_FILE_SIZE' ? 'File is larger than 5MB.' : err.message;
    return res.status(400).json({ message });
  }
  if (err && err.message) {
    return res.status(400).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Something went wrong. Please try again.' });
}

module.exports = errorHandler;
