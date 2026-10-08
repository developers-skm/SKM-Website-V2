import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// Floating cart button shown sitewide (rendered by Layout.jsx), stacked above
// the ScrollToTop / Chatbot buttons (see .fab-cart in index.css). Clicking it
// opens a small popup above the button with two actions: Request Sample
// (opens the Get Quote flow) and a download link - the product's TDS on
// product pages, the Product Portfolio PDF everywhere else.
export default function QuickActionsCart({ downloadUrl, downloadLabel = 'Download TDS', onRequestSample }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const pillClass =
    'inline-flex items-center justify-center whitespace-nowrap min-h-[40px] font-heading font-bold text-[12px] uppercase tracking-[0.05em] leading-none px-6 py-2.5 rounded-[200px] shadow-[0_6px_20px_rgba(0,0,0,0.16)] transition-all duration-200 cursor-pointer focus:outline-none focus-gold';

  return (
    <div ref={rootRef} className="fab-cart fixed right-[30px] z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            id="quick-actions-menu"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: 'easeOut' }}
            className="flex flex-col items-end gap-2.5"
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onRequestSample();
              }}
              className={`${pillClass} bg-brand-600 hover:bg-[#a80000] text-white`}
            >
              Request Sample
            </button>
            {downloadUrl && (
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`${pillClass} bg-white border border-surface-200 text-heading hover:border-brand-600/40 hover:text-brand-600`}
              >
                {downloadLabel}
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Quick actions"
        aria-expanded={open}
        aria-controls="quick-actions-menu"
        className="flex items-center justify-center w-[45px] h-[45px] rounded-full bg-white hover:bg-brand-600 text-brand-600 hover:text-white transition-all duration-200 cursor-pointer focus:outline-none focus-gold"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.18), inset 0 0 0 2px rgba(228, 10, 24,0.25)' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </button>
    </div>
  );
}
