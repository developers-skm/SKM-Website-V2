import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// In-app entries are created by App's pushState with a `page` in their state,
// so a state without `page` is the first entry (direct visit / external link)
// and there is nowhere in-app to go back to.
const canGoBack = () => typeof window !== 'undefined' && !!window.history.state?.page;

/**
 * "Back" pill shown at the top, beside the logo, on inner pages after the
 * visitor arrived by clicking through the site (e.g. a "Learn more" button).
 * It is absolute within Layout's root, so like the logo it scrolls away with
 * the page. It uses browser history, so the previous page's scroll position
 * is restored by App's popstate handling.
 */
export default function BackButton({ activePage }) {
  const [visible, setVisible] = useState(canGoBack);

  useEffect(() => {
    setVisible(canGoBack());
  }, [activePage]);

  if (!visible || activePage === 'home' || activePage === 'offline') return null;

  return (
    // Keyed by page so the entrance replays on every navigation.
    <motion.div
      key={activePage}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.8, delay: 0.15 }}
      className="absolute z-30 top-[1px] left-4 sm:top-[2px] sm:left-6 lg:top-1 lg:left-8"
    >
      <motion.button
        type="button"
        onClick={() => window.history.back()}
        aria-label="Go back to the previous page"
        whileTap={{ scale: 0.92 }}
        className="group inline-flex items-center h-[22px] sm:h-6 lg:h-7 px-1.5 lg:px-2 rounded-full bg-white/90 backdrop-blur-sm border border-surface-200 shadow-[0_2px_8px_rgba(36,30,24,0.12)] font-heading font-bold text-[12px] lg:text-[13px] leading-none text-heading hover:bg-brand-600 hover:text-white hover:border-brand-600 focus-visible:bg-brand-600 focus-visible:text-white transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:-translate-x-1"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        {/* Hidden until the cursor is over the arrow (or it has keyboard focus). */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 ease-out group-hover:max-w-[48px] group-hover:opacity-100 group-hover:ml-1.5 group-focus-visible:max-w-[48px] group-focus-visible:opacity-100 group-focus-visible:ml-1.5">
          Back
        </span>
      </motion.button>
    </motion.div>
  );
}
