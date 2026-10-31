import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Confirmation popup shown only after the server has accepted an enquiry.
export default function EnquirySuccessDialog({ onClose }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current?.focus();
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-surface-950/70 backdrop-blur-[3px]" onClick={onClose} aria-hidden="true" />
      <motion.div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="enquiry-success-title"
        aria-describedby="enquiry-success-body"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_24px_48px_rgba(0,0,0,0.22)]"
      >
        <div className="h-1.5 w-full bg-brand-600" />
        <div className="flex flex-col items-center gap-5 px-8 py-9 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 id="enquiry-success-title" className="font-heading text-2xl font-bold text-heading m-0 tracking-tight">
            Thank you!
          </h3>
          <p id="enquiry-success-body" className="font-body text-sm text-surface-600 leading-relaxed m-0">
            Your enquiry has been submitted successfully. Our team will contact you shortly.
          </p>
          <button
            ref={buttonRef}
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-[200px] bg-brand-600 px-8 py-3 font-heading text-[12px] font-bold uppercase tracking-[0.05em] text-white transition-colors duration-200 hover:bg-[#a80000]"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}

EnquirySuccessDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};
