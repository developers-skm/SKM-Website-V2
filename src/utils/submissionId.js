// Random id sent with every form submission so the server can drop an
// accidental duplicate (double click, retry) instead of emailing twice.
export default function newSubmissionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}
