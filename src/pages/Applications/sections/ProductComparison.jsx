import { useMemo, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { getVariantsForProduct } from '../../../data/productVariants';
import { EASE_PREMIUM, DURATION } from '../../../utils/motionTokens';

// Section 5 — product comparison (brief §5). Only renders once the visitor
// has added products via Section 4's "Add to Comparison" — no fabricated
// default comparison. Uses the same real matched-variant-per-application
// lookup as Section 4 so the compared row is the same specific variant
// already recommended above, not an arbitrary first SKU.
//
// "Download Comparison" uses the browser's native print dialog (a real
// capability, scoped to just this table via a print stylesheet) rather
// than a fabricated PDF-export backend — no such service exists anywhere
// in the codebase. "Ask SKM to Recommend" routes to the real Contact Us
// page, same pattern as the Applications Hub's own "Let SKM Recommend a
// Variant" link.
function findRecommendedVariant(application, variantsData) {
  const needles = [application.title, ...application.tags].map((s) => s.toLowerCase());
  return (
    variantsData.find((v) => {
      const haystack = v.applications?.toLowerCase() ?? '';
      return needles.some((n) => haystack.includes(n));
    }) ?? variantsData[0] ?? null
  );
}

export default function ProductComparison({ application, comparisonIds, matchedProducts, onPageChange }) {
  const reduceMotion = useReducedMotion();
  const [hasScrolled, setHasScrolled] = useState(false);
  const comparedProducts = matchedProducts.filter((p) => comparisonIds.includes(p.id));

  const rows = useMemo(() => {
    const entries = comparedProducts.map((product) => {
      const variantsData = getVariantsForProduct(product.id);
      const variant = findRecommendedVariant(application, variantsData);
      return { product, variant };
    });
    const specKeys = Array.from(
      new Set(entries.flatMap(({ variant }) => Object.keys(variant?.specifications ?? {})))
    );
    return { entries, specKeys };
  }, [comparedProducts, application]);

  if (comparedProducts.length === 0) return null;

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0.96 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: reduceMotion ? 0.01 : DURATION.sectionEntrance, ease: EASE_PREMIUM }}
      style={{ transformOrigin: '50% 50%' }}
      className="w-full bg-[#f8f4ee] py-16 sm:py-20 lg:py-24 print:bg-white print:py-6"
      id="product-comparison-section"
    >
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 print:text-black">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            Comparison
          </span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading m-0 tracking-tight leading-[1.1] print:text-black">
            Compare Products For {application.title}
          </h2>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="relative">
            <div
              onScroll={(e) => {
                if (!hasScrolled && e.currentTarget.scrollLeft > 12) setHasScrolled(true);
              }}
              className="overflow-x-auto rounded-[24px] border border-surface-200/60 bg-white print:border-none print:rounded-none"
            >
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-surface-200/70">
                    <th className="sticky left-0 z-20 bg-white text-left px-5 py-4 font-body text-[11px] font-bold uppercase tracking-wider text-surface-400 shadow-[2px_0_6px_-2px_rgba(20,16,12,0.08)] print:static print:shadow-none" />
                    {rows.entries.map(({ product, variant }) => (
                      <th key={product.id} className="text-left px-5 py-4 align-bottom">
                        <span className="block font-heading font-bold text-[15px] text-heading print:text-black leading-tight">{product.title}</span>
                        {variant && <span className="block font-mono text-[11px] font-bold text-brand-600 print:text-black mt-1">{variant.code} — {variant.name}</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-surface-200/50">
                    <th scope="row" className="sticky left-0 z-10 bg-white text-left px-5 py-3.5 font-body text-[11.5px] font-semibold uppercase tracking-wider text-surface-400 whitespace-nowrap shadow-[2px_0_6px_-2px_rgba(20,16,12,0.08)] print:static print:shadow-none">Format</th>
                    {rows.entries.map(({ product }) => (
                      <td key={product.id} className="px-5 py-3.5 font-body text-[13.5px] text-surface-700 print:text-black">
                        {product.packagingOptions?.join(', ') ?? '—'}
                      </td>
                    ))}
                  </tr>
                  {rows.specKeys.map((key) => (
                    <tr key={key} className="border-b border-surface-200/50 last:border-b-0">
                      <th scope="row" className="sticky left-0 z-10 bg-white text-left px-5 py-3.5 font-body text-[11.5px] font-semibold uppercase tracking-wider text-surface-400 whitespace-nowrap shadow-[2px_0_6px_-2px_rgba(20,16,12,0.08)] print:static print:shadow-none">{key}</th>
                      {rows.entries.map(({ product, variant }) => (
                        <td key={product.id} className="px-5 py-3.5 font-body text-[13.5px] text-surface-700 print:text-black">
                          {variant?.specifications?.[key] ?? '—'}
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
                  className="lg:hidden print:hidden pointer-events-none absolute top-0 right-0 bottom-0 w-20 rounded-r-[24px] bg-gradient-to-l from-white from-30% via-white/70 to-transparent flex items-center justify-end pr-3"
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
                className="lg:hidden print:hidden inline-flex items-center gap-1.5 font-body text-[12px] text-surface-400"
              >
                Scroll right to view more products
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 print:hidden">
          <button
            onClick={() => window.print()}
            className="self-start inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-8 py-[17px] rounded-[200px] transition-all duration-200 shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Download Comparison
          </button>
          <button
            onClick={() => onPageChange('contact-us')}
            className="font-body font-semibold text-[13.5px] text-brand-600 hover:text-[#a80000] underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
          >
            Ask SKM To Recommend
          </button>
        </div>
      </div>
    </motion.div>
  );
}
