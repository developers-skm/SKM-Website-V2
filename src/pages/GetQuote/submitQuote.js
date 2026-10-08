const API_URL = import.meta.env.VITE_API_URL || '';

export default async function submitQuote(payload) {
  const res = await fetch(`${API_URL}/api/v1/quote/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  // The server may return a non-JSON body (proxy error, crash page) — don't let that mask the status.
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.message || `Submission failed (${res.status})`);
    error.status = res.status;
    throw error;
  }
  return data;
}
