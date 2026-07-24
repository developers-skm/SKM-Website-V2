// Brochure PDFs live as static files in public/documents/brochures/ (not
// imported as JS modules) so Vite doesn't bundle/hash/sourcemap them into
// the JS build. This mirrors the filename -> url shape the old
// import.meta.glob(..., { query: '?url' }) call used to produce.
export function getBrochureUrl(fileName) {
  return `/documents/brochures/${encodeURIComponent(fileName)}`;
}
