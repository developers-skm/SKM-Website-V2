import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
};

export default function Breadcrumb({ items = [], onPageChange, variant = 'default' }) {
  const allItems = [{ label: 'Home', value: 'home', isHome: true }, ...items];
  const isCompact = variant === 'compact';

  const handleItemClick = (item) => {
    if (item.value && onPageChange) onPageChange(item.value);
  };

  // "compact" is used inline within a page's own hero block (e.g. product
  // pages fold it above ProductHero instead of rendering it as its own
  // full-width bar) — same labels/links/routes, just no outer band, no
  // decorative blur, and smaller type. Default rendering (every other page)
  // is untouched.
  if (isCompact) {
    return (
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center py-3.5 sm:py-4"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center flex-wrap gap-1 list-none p-0 m-0">
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;
            const isClickable = item.value && !isLast;
            return (
              <motion.li
                key={idx}
                variants={itemVariants}
                className="flex items-center font-body text-[12.5px] font-medium uppercase tracking-wide"
              >
                {idx > 0 && (
                  <span className="text-surface-400 dark:text-surface-500 mx-1.5 select-none" aria-hidden="true">
                    <svg className="w-2.5 h-2.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
                {isClickable ? (
                  <button
                    onClick={() => handleItemClick(item)}
                    className="py-0.5 px-1 rounded text-surface-500 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className="py-0.5 px-1 text-brand-600 dark:text-brand-400 select-none font-semibold">
                    {item.label}
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>
      </motion.nav>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-surface-900/20 border-b border-[#eee] dark:border-surface-800/40 py-3.5 sm:py-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/3 dark:bg-brand-950/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 text-left relative z-10">
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center flex-wrap gap-1 sm:gap-1.5 list-none p-0 m-0">
            {allItems.map((item, idx) => {
              const isLast = idx === allItems.length - 1;
              const isClickable = item.value && !isLast;

              return (
                <motion.li
                  key={idx}
                  variants={itemVariants}
                  className="flex items-center font-body text-[11px] sm:text-[12px] font-semibold uppercase tracking-widest"
                >
                  {idx > 0 && (
                    <span className="text-surface-300 dark:text-surface-600 mx-1 sm:mx-1.5 select-none" aria-hidden="true">
                      <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  )}

                  {isClickable ? (
                    <button
                      onClick={() => handleItemClick(item)}
                      className="group flex items-center gap-1.5 py-1 px-2 rounded-[6px] text-surface-400 dark:text-surface-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-600/4 dark:hover:bg-brand-950/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer"
                    >
                      {item.isHome && (
                        <svg className="w-3.5 h-3.5 fill-none stroke-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      )}
                      <span>{item.label}</span>
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 py-1 px-2 text-brand-600 dark:text-brand-400 select-none font-bold">
                      {item.isHome && (
                        <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      )}
                      <span>{item.label}</span>
                    </span>
                  )}
                </motion.li>
              );
            })}
          </ol>
        </motion.nav>
      </div>
    </div>
  );
}
