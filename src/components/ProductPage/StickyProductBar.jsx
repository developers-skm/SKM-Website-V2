import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// Section 10 — sticky conversion bar (brief §10): "Product name | Request
// Sample | Download TDS | Request Quote", appearing once the visitor
// scrolls past the hero, with a bottom-sticky variant on mobile.
//
// Desktop/tablet (`md:` and up): fixed top bar, as before.
// Mobile: fixed bottom bar — replaces the sitewide generic
// MobileStickyActions bar (Navbar/MobileStickyActions.jsx, "Find Product /
// Request Quote") on product detail pages, which App.jsx suppresses there
// via PRODUCT_DETAIL_ROUTES so the two bottom bars never stack.
export default function StickyProductBar({ productName, tdsUrl, onRequestSample, onRequestQuote }) {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const heroHeight = window.innerHeight * 0.9;
    const onScroll = () => setVisible(window.scrollY > heroHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Desktop/tablet — top bar */}
          <motion.div
            initial={{ y: reduceMotion ? 0 : -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduceMotion ? 0 : -60, opacity: 0 }}
            transition={reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 300, damping: 30 }}
            className="hidden md:block fixed top-[68px] xl:top-[80px] inset-x-0 z-40 bg-white/97 dark:bg-surface-900/97 backdrop-blur-md border-b border-surface-200/70 dark:border-surface-800 shadow-[0_4px_20px_rgba(36,30,24,0.06)]"
          >
            <div className="mx-auto max-w-[1440px] w-full px-6 lg:px-12 py-3.5 flex items-center justify-between gap-6">
              <span className="font-heading font-bold text-[16px] text-heading dark:text-white truncate">
                {productName}
              </span>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={onRequestSample}
                  className="inline-flex items-center justify-center min-h-[40px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[12px] uppercase tracking-[0.05em] leading-none px-6 py-2.5 rounded-[200px] transition-all duration-300 cursor-pointer"
                >
                  Request Sample
                </button>
                {tdsUrl && (
                  <a
                    href={tdsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-h-[40px] text-heading dark:text-white font-heading font-bold text-[12px] uppercase tracking-[0.05em] leading-none px-6 py-2.5 rounded-[200px] border border-surface-200 dark:border-surface-700 hover:border-brand-600/40 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-300"
                  >
                    Download TDS
                  </a>
                )}
                <button
                  onClick={onRequestQuote}
                  className="inline-flex items-center justify-center min-h-[40px] font-body font-bold text-[12.5px] text-brand-600 dark:text-brand-400 hover:text-[#a80000] underline underline-offset-4 decoration-brand-600/40 cursor-pointer bg-transparent border-none px-2"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </motion.div>

          {/* Mobile — bottom sticky bar, replaces the generic sitewide bar
              while active (App.jsx suppresses it via onVisibilityChange) */}
          <motion.div
            initial={{ y: reduceMotion ? 0 : 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduceMotion ? 0 : 60, opacity: 0 }}
            transition={reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 300, damping: 30 }}
            className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/97 dark:bg-surface-900/97 backdrop-blur-md border-t border-surface-200/70 dark:border-surface-800 shadow-[0_-4px_20px_rgba(36,30,24,0.08)]"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            <div className="px-3 py-2.5 flex flex-col gap-2">
              <span className="font-heading font-bold text-[13.5px] text-heading dark:text-white truncate px-1">
                {productName}
              </span>
              <div className="flex items-stretch gap-2">
                <button
                  onClick={onRequestSample}
                  className="flex-1 inline-flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[12px] uppercase tracking-[0.03em] leading-none min-h-[44px] rounded-[200px] transition-all duration-200 cursor-pointer"
                >
                  Sample
                </button>
                {tdsUrl && (
                  <a
                    href={tdsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-white font-heading font-bold text-[12px] uppercase tracking-[0.03em] leading-none min-h-[44px] rounded-[200px] transition-all duration-200"
                  >
                    TDS
                  </a>
                )}
                <button
                  onClick={onRequestQuote}
                  className="flex-1 inline-flex items-center justify-center bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-white font-heading font-bold text-[12px] uppercase tracking-[0.03em] leading-none min-h-[44px] rounded-[200px] transition-all duration-200 cursor-pointer"
                >
                  Quote
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
