import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import applications from '../../../data/applications';
import { getProductById } from '../../../data/products';
import { EASE_PREMIUM, DURATION, fadeUp } from '../../../utils/motionTokens';

// Section 4 — application-to-product matrix (brief §4). Built entirely from
// the same real `matchedProductIds` already used by the 4 real application
// guide pages (data/applications.js) — rows are the genuine applications,
// columns are the union of their real matched products, checkmarks show
// real matches only. No 8x8 grid is fabricated to match the brief's larger
// aspiration; the matrix is exactly as big as the real data supports.
//
// "Download Application Guide" routes to the real Brochures page (the only
// place real product-flyer PDFs exist) rather than a fabricated single
// "application guide" document that doesn't exist anywhere in the site.
// The brief's "Compare Recommended Products" button was dropped: no
// cross-product comparison view exists anywhere (the product page's own
// compare modal only diffs SKUs within one product), so checking boxes
// here just surfaces real per-product links instead of routing to a fake
// comparison destination.
export default function ApplicationProductMatrix({ onPageChange }) {
  const [checked, setChecked] = useState([]);
  const [hoverCol, setHoverCol] = useState(null);
  const [hoverRow, setHoverRow] = useState(null);
  const reduceMotion = useReducedMotion();

  const allProductIds = Array.from(new Set(applications.flatMap((a) => a.matchedProductIds)));
  const columnProducts = allProductIds.map(getProductById).filter(Boolean);

  const toggle = (id) => {
    setChecked((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  return (
    <div className="w-full bg-white dark:bg-surface-900/40 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <motion.div {...fadeUp(reduceMotion)} className="flex flex-col gap-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            Product Matrix
          </span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white m-0 tracking-tight leading-[1.1]">
            Recommended Products By Application
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp(reduceMotion, { delay: 0.1, distance: 24 })}
          className="overflow-x-auto rounded-[24px] border border-surface-200/60 dark:border-surface-800"
        >
          <table className="w-full border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-[#fbf7f1] dark:bg-surface-900 border-b border-surface-200/70 dark:border-surface-800">
                <th className="text-left px-5 py-4 font-body text-[11.5px] font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400">
                  Application
                </th>
                {columnProducts.map((product) => (
                  <th
                    key={product.id}
                    onMouseEnter={() => setHoverCol(product.id)}
                    onMouseLeave={() => setHoverCol(null)}
                    className={`px-4 py-4 font-body text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-200 ${hoverCol === product.id ? 'text-brand-600 dark:text-brand-400 bg-[#f3c969]/10' : 'text-surface-500 dark:text-surface-400'}`}
                  >
                    <label className="flex flex-col items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked.includes(product.id)}
                        onChange={() => toggle(product.id)}
                        onFocus={() => setHoverCol(product.id)}
                        onBlur={() => setHoverCol(null)}
                        aria-label={`Select ${product.title} to compare`}
                        className="w-4 h-4 accent-brand-600 cursor-pointer"
                      />
                      <span className="text-center leading-tight">{product.title}</span>
                    </label>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  onMouseEnter={() => setHoverRow(app.id)}
                  onMouseLeave={() => setHoverRow(null)}
                  className={`border-b border-surface-200/50 dark:border-surface-800/60 last:border-b-0 transition-colors duration-200 ${hoverRow === app.id ? 'bg-[#f3c969]/6' : ''}`}
                >
                  <td className={`px-5 py-4 font-heading font-semibold text-[14.5px] whitespace-nowrap transition-colors duration-200 ${hoverRow === app.id ? 'text-brand-600 dark:text-brand-400' : 'text-heading dark:text-white'}`}>
                    {app.title}
                  </td>
                  {columnProducts.map((product) => {
                    const isMatch = app.matchedProductIds.includes(product.id);
                    const isActiveIntersection = isMatch && (hoverRow === app.id || hoverCol === product.id);
                    return (
                      <td key={product.id} className="px-4 py-4 text-center">
                        {isMatch && (
                          <motion.svg
                            className={`w-4 h-4 mx-auto ${isActiveIntersection ? 'text-[#d19a2e]' : 'text-brand-600'}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-label="Recommended"
                            animate={{ scale: isActiveIntersection && !reduceMotion ? 1.2 : 1 }}
                            transition={{ duration: 0.2, ease: EASE_PREMIUM }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </motion.svg>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <AnimatePresence>
            {checked.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                transition={{ duration: reduceMotion ? 0.01 : DURATION.filterTransition, ease: EASE_PREMIUM }}
                className="flex flex-wrap items-center gap-3"
              >
                <span className="font-body text-[13px] text-surface-500 dark:text-surface-400">
                  {checked.length} selected:
                </span>
                {checked.map((id) => {
                  const product = getProductById(id);
                  return product && (
                    <motion.button
                      key={id}
                      layout
                      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: reduceMotion ? 0.01 : DURATION.fast, ease: EASE_PREMIUM }}
                      onClick={() => onPageChange(product.page)}
                      className="inline-flex items-center gap-1.5 font-body font-bold text-[12px] uppercase tracking-[0.05em] text-brand-600 dark:text-brand-400 hover:text-[#a80000] cursor-pointer bg-transparent border border-brand-600/20 hover:border-brand-600/40 rounded-full px-4 py-2"
                    >
                      {product.title}
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => onPageChange('brochure')}
          className="self-start inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-8 py-[17px] rounded-[200px] transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 cursor-pointer"
        >
          Download Application Guide
        </button>
      </div>
    </div>
  );
}
