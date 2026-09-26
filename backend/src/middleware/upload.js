const multer = require('multer');

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ACCEPTED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_BYTES },
  fileFilter: (req, file, cb) => {
    if (!ACCEPTED_MIME_TYPES.has(file.mimetype)) {
      return cb(new Error('Only PDF or DOC/DOCX files are accepted.'));
    }
    cb(null, true);
  },
});

module.exports = upload;
