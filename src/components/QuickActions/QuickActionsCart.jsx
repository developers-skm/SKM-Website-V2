import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import QuickActionsIcon from '../../assets/images/quick-actions-icon.webp';

// Floating cart button shown sitewide (rendered by Layout.jsx), stacked above
// the ScrollToTop / Chatbot buttons (see .fab-cart in index.css). Clicking it
// opens a small popup above the button with two actions: Request Sample
// (opens the Get Quote flow) and a download link - the product's TDS on
// product pages, the Product Portfolio PDF everywhere else.
export default function QuickActionsCart({ downloadUrl, downloadLabel = 'Download Product Detail', onRequestSample }) {
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
    <div ref={rootRef} className="fab-cart fixed right-3 sm:right-[30px] z-50 flex flex-col items-end gap-3">
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
        className="relative flex items-center justify-center w-10 h-10 sm:w-[45px] sm:h-[45px] rounded-full bg-white hover:bg-brand-600 text-brand-600 hover:text-white transition-all duration-200 cursor-pointer focus:outline-none focus-gold"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.18), inset 0 0 0 2px rgba(228, 10, 24,0.25)' }}
      >
        {/* Solid red ring - same size and weight as the scroll-to-top button's ring. */}
        <svg viewBox="0 0 45 45" aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none">
          <circle cx="22.5" cy="22.5" r="20" fill="transparent" stroke="var(--color-brand-600)" strokeWidth="2.5" />
        </svg>
        {/* Line-art glyph used as a mask so it takes the button's text colour
            (red, white on hover) exactly like the other floating buttons. */}
        <span
          aria-hidden="true"
          className="block w-[22px] h-[22px] sm:w-6 sm:h-6 bg-current"
          style={{
            WebkitMask: `url(${QuickActionsIcon}) center / contain no-repeat`,
            mask: `url(${QuickActionsIcon}) center / contain no-repeat`,
          }}
        />
      </button>
    </div>
  );
}
