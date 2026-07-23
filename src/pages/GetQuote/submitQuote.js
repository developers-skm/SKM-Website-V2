// Frontend-only for now (confirmed with the user — see plan.md "Quote backend"):
// the Laravel Modules/Contact backend has empty stub controllers/requests,
// nothing is implemented server-side yet. This simulates a successful submit
// so the flow is fully interactive. The payload shape mirrors what
// EnquiryModal.jsx already sends to `${VITE_API_URL}/api/v1/contact/submit`,
// so swapping in the real fetch() call later is a one-line change:
//
//   const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/contact/submit`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//     body: JSON.stringify(payload),
//   });
//   if (!res.ok) throw new Error((await res.json()).message || 'Submission failed');
//
export default async function submitQuote(payload) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true, payload };
}
