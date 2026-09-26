const API_URL = import.meta.env.VITE_API_URL || '';

export default async function submitQuote(payload) {
  const res = await fetch(`${API_URL}/api/v1/quote/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Submission failed');
  }
  return data;
}
