// Same limits as the backend (backend/src/middleware/upload.js) and the old
// Contact modal's UploadZone.
export const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export const validateResumeFile = (file) => {
  const extension = `.${file.name.split('.').pop().toLowerCase()}`;
  if (!ACCEPTED_EXTENSIONS.includes(extension)) return 'Only PDF, DOC or DOCX files are accepted.';
  if (file.size > MAX_UPLOAD_BYTES) return 'File is larger than 5MB.';
  return null;
};
