// Best-effort duplicate-submission guard with no database.
//
// The browser sends a random `submission_id` per form attempt. A repeat of the
// same id (double click, network retry, back-and-resubmit) within the TTL is
// acknowledged without sending a second email. State lives in this instance's
// memory, so on serverless it covers the common case (rapid repeats hitting a
// warm instance); the frontend's in-flight lock covers the rest.

const TTL_MS = 10 * 60 * 1000;
const MAX_ENTRIES = 5000;
const ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;

const seen = new Map(); // id -> { state: 'pending' | 'done', at, body }

function prune(now) {
  for (const [id, entry] of seen) {
    if (now - entry.at > TTL_MS) seen.delete(id);
  }
  if (seen.size > MAX_ENTRIES) seen.clear();
}

function dedupe(req, res, next) {
  const id = req.body && req.body.submission_id;
  if (!id || !ID_PATTERN.test(String(id))) return next();

  const now = Date.now();
  prune(now);

  const existing = seen.get(id);
  if (existing) {
    // Already sent, or still sending - never send twice.
    return res.status(existing.state === 'done' ? 201 : 409).json(
      existing.state === 'done'
        ? existing.body
        : { message: 'Your enquiry is already being submitted.' },
    );
  }

  seen.set(id, { state: 'pending', at: now });

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode < 300) seen.set(id, { state: 'done', at: Date.now(), body });
    else seen.delete(id); // failed: allow the visitor to retry
    return originalJson(body);
  };
  // Connection dropped before a response was produced.
  res.on('close', () => {
    const entry = seen.get(id);
    if (entry && entry.state === 'pending') seen.delete(id);
  });

  return next();
}

module.exports = dedupe;
