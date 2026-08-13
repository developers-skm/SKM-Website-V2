import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { EASE_PREMIUM, DURATION } from '../../utils/motionTokens';

// "Compare Selected Variants" (brief §3 table action) — a focused overlay
// rather than a new page/route, since comparison is a transient reading
// task tied to the table state above it.
export default function VariantCompareModal({ variants, displayCode, onClose }) {
  const reduceMotion = useReducedMotion();
  const [hasScrolled, setHasScrolled] = useState(false);
  const specColumns = useMemo(() => {
    const keys = new Set();
    variants.forEach((v) => Object.keys(v.specifications ?? {}).forEach((k) => keys.add(k)));
    return Array.from(keys);
  }, [variants]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : DURATION.fast }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Compare selected variants"
    >
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.98 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.25, ease: EASE_PREMIUM }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1100px] max-h-[85vh] overflow-auto bg-white rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.3)] p-6 sm:p-10"
      >
        <div className="flex items-start justify-between gap-4 mb-8">
          <h3 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading m-0 tracking-tight">
            Compare Variants
          </h3>
          <button
            onClick={onClose}
            aria-label="Close comparison"
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-surface-200 hover:bg-surface-50 cursor-pointer"
          >
            <svg className="w-4 h-4 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="relative">
            <div
              onScroll={(e) => {
                if (!hasScrolled && e.currentTarget.scrollLeft > 12) setHasScrolled(true);
              }}
              className="overflow-x-auto"
            >
              <table className="w-full border-collapse min-w-[560px]">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-20 bg-white text-left px-3 py-3 font-body text-[11px] font-bold uppercase tracking-wider text-surface-400 shadow-[2px_0_6px_-2px_rgba(20,16,12,0.08)]" />
                    {variants.map((v) => (
                      <th key={v.code} className="text-left px-3 py-3 align-bottom">
                        <span className="block font-mono text-[11.5px] font-bold text-brand-600 mb-1">{displayCode(v.code)}</span>
                        <span className="block font-heading font-bold text-[15px] text-heading leading-tight">{v.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specColumns.map((key) => (
                    <tr key={key} className="border-t border-surface-200/70">
                      <th scope="row" className="sticky left-0 z-10 bg-white text-left px-3 py-3.5 font-body text-[11.5px] font-semibold uppercase tracking-wider text-surface-400 whitespace-nowrap align-top shadow-[2px_0_6px_-2px_rgba(20,16,12,0.08)]">
                        {key}
                      </th>
                      {variants.map((v) => (
                        <td key={v.code} className="px-3 py-3.5 font-body text-[13.5px] text-surface-700 align-top">
                          {v.specifications?.[key] ?? '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Scroll-right hint — fades a gradient + bouncing arrow over
                the table's right edge until the user scrolls it. */}
            <AnimatePresence>
              {!hasScrolled && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.3 }}
                  className="lg:hidden pointer-events-none absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white from-30% via-white/70 to-transparent flex items-center justify-end pr-3"
                  aria-hidden="true"
                >
                  <motion.svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="text-brand-600"
                    animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path d="M9 6l6 6-6 6" />
                  </motion.svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {!hasScrolled && (
              <motion.span
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.3 }}
                className="lg:hidden inline-flex items-center gap-1.5 font-body text-[12px] text-surface-400"
              >
                Scroll right to view more variants
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
