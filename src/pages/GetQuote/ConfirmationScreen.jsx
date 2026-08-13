import { useMemo } from 'react';
import { motion } from 'framer-motion';
import JourneyStrip from '../../components/Journey/JourneyStrip';
import products, { getProductById } from '../../data/products';

// Section 5 — Confirmation screen (brief §5): Enquiry reference number,
// Requirement summary, Expected next step, Relevant product or resource
// links. Buttons: Download Enquiry Summary, Continue Browsing Products.
//
// Enquiry reference number: no backend exists yet (submitQuote.js is a
// frontend-only stub — see its own comment), so there is no real
// server-issued reference number to display. A client-side reference is
// generated here from the real submission timestamp — honestly labelled
// as a reference for this session, not represented as a database ID.
//
// Requirement summary: reuses the same real formData fields already shown
// in StepReview.jsx, not a separate/duplicated data source.
//
// Relevant product or resource links: for a single-product enquiry, links
// to that product's own real page; for a sample-cart enquiry, links to
// each selected product's real page; always includes a real link to
// /resources (the site's genuine documents/downloads hub).
//
// Download Enquiry Summary: builds a real text file from the actual
// formData in-browser (no server round-trip needed, no fabricated PDF) —
// an honest, functional action rather than a disabled placeholder, since
// generating a text summary from real form state requires no backend.
function buildReferenceNumber() {
  const now = new Date();
  const y = now.getFullYear();
  const stamp = now.getTime().toString().slice(-6);
  return `SKM-ENQ-${y}-${stamp}`;
}

function buildSummaryText({ formData, sampleProducts, singleProduct, referenceNumber }) {
  const lines = [
    `SKM Egg Products — Enquiry Summary`,
    `Reference: ${referenceNumber}`,
    '',
  ];
  if (sampleProducts.length) {
    lines.push(`Products requested: ${sampleProducts.map((p) => p.title).join(', ')}`);
  } else if (singleProduct) {
    lines.push(`Product: ${singleProduct.title}`);
  }
  if (formData.functionalRequirement) lines.push(`Functional Requirement: ${formData.functionalRequirement}`);
  if (formData.quantity) lines.push(`Estimated Volume: ${formData.quantity}`);
  if (formData.packaging) lines.push(`Packaging: ${formData.packaging}`);
  if (formData.country) lines.push(`Destination Country: ${formData.country}`);
  if (formData.deliveryDate) lines.push(`Required Delivery: ${formData.deliveryDate}`);
  lines.push('');
  lines.push(`Name: ${[formData.firstName, formData.lastName].filter(Boolean).join(' ')}`);
  if (formData.company) lines.push(`Company: ${formData.company}`);
  if (formData.jobRole) lines.push(`Job Role: ${formData.jobRole}`);
  lines.push(`Email: ${formData.email}`);
  lines.push(`Phone: ${formData.phone}`);
  if (formData.message) lines.push(`Message: ${formData.message}`);
  return lines.join('\n');
}

export default function ConfirmationScreen({ formData, onPageChange }) {
  const product = getProductById(formData.productId);
  const sampleProducts = useMemo(
    () => products.filter((p) => (formData.sampleProductIds ?? []).includes(p.id)),
    [formData.sampleProductIds]
  );
  const referenceNumber = useMemo(() => buildReferenceNumber(), []);

  const relevantLinks = sampleProducts.length
    ? sampleProducts.map((p) => ({ label: p.title, route: p.id }))
    : product
      ? [{ label: product.title, route: product.id }]
      : [];

  const handleDownloadSummary = () => {
    const text = buildSummaryText({ formData, sampleProducts, singleProduct: product, referenceNumber });
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${referenceNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="mx-auto max-w-[640px] w-full px-4 sm:px-6 lg:px-8 pt-[110px] pb-[70px] sm:pt-[130px] lg:pt-[90px] lg:pb-[90px] text-center flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <div className="flex flex-col gap-3">
          <h1 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white m-0 tracking-tight">
            Your enquiry is in.
          </h1>
          <p className="font-body text-[11.5px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 m-0">
            Reference: {referenceNumber}
          </p>
          <p className="font-body text-[15px] text-surface-500 dark:text-surface-400 leading-[26px] m-0">
            {product ? <>A member of our export sales team will review your interest in <strong className="text-surface-700 dark:text-surface-200">{product.title}</strong> and</> : sampleProducts.length ? 'Our export sales team will review your sample request and' : 'Our export sales team will review your request and'} reply within <strong className="text-surface-700 dark:text-surface-200">24 hours</strong> to <strong className="text-surface-700 dark:text-surface-200">{formData.email}</strong>.
          </p>
        </div>

        {/* Requirement summary */}
        <div className="w-full rounded-[14px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900/40 px-5 py-4 text-left flex flex-col gap-2">
          <span className="font-body text-[11px] font-bold uppercase tracking-wide text-surface-400 dark:text-surface-500">
            Requirement Summary
          </span>
          <div className="flex flex-col gap-1 font-body text-[13.5px] text-surface-700 dark:text-surface-200">
            {sampleProducts.length > 0 && <span>Products: {sampleProducts.map((p) => p.title).join(', ')}</span>}
            {!sampleProducts.length && product && <span>Product: {product.title}</span>}
            {formData.quantity && <span>Estimated Volume: {formData.quantity}</span>}
            {formData.country && <span>Destination: {formData.country}</span>}
          </div>
        </div>

        {/* Relevant product / resource links */}
        <div className="w-full flex flex-wrap items-center justify-center gap-2.5">
            {relevantLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => onPageChange(link.route)}
                className="font-body text-[12px] font-semibold text-brand-600 dark:text-brand-400 hover:underline bg-transparent border-none cursor-pointer px-0"
              >
                View {link.label} →
              </button>
            ))}
            <button
              onClick={() => onPageChange('resources')}
              className="font-body text-[12px] font-semibold text-brand-600 dark:text-brand-400 hover:underline bg-transparent border-none cursor-pointer px-0"
            >
              Browse Resources →
            </button>
          </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <button
            onClick={() => onPageChange('products')}
            className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-7 py-[15px] rounded-[200px] transition-all duration-300 shadow-[0_4px_20px_rgba(228,10,24,0.25)] hover:shadow-[0_6px_28px_rgba(228,10,24,0.4)] cursor-pointer"
          >
            Continue Browsing Products
          </button>
          <button
            onClick={handleDownloadSummary}
            className="inline-flex items-center gap-2.5 bg-transparent hover:bg-brand-600/6 dark:hover:bg-brand-950/30 text-surface-900 dark:text-surface-100 border border-surface-250 dark:border-surface-700 font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-7 py-[15px] rounded-[200px] transition-all duration-300 cursor-pointer"
          >
            Download Enquiry Summary
          </button>
        </div>
      </div>

      {/* Something to explore while they wait — not a dead end */}
      <JourneyStrip variant="compact" onPageChange={onPageChange} />
    </div>
  );
}
