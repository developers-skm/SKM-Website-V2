import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import { getProductById } from '../../../data/products';

// Short per-category CTA labels — keyed by the real applications.js `id`,
// not derived from the title string (splitting "Meat & Fish" or
// "Noodles & Pasta" on "&" would drop half the real category name).
const CTA_SHORT_NAME = {
  bakery: 'Bakery',
  mayonnaise: 'Mayonnaise',
  meat_fish: 'Meat & Fish',
  noodles_pasta: 'Noodles & Pasta',
};

// Premium application-solution-finder card — image, title, the full
// approved technical-need sentence (app.problem, verbatim, no truncation),
// a matching-product count derived only from successfully resolved
// matchedProductIds, and the resolved product type names. Explicit
// keyboard-accessible "selected" affordance (SKM-red accent + tinted
// background + check indicator) layered on top of the existing real
// content — no new business claims, just a clearer interactive state.
export default function ApplicationCard({ app, onPageChange }) {
  const reduceMotion = useReducedMotion();
  const [isSelected, setIsSelected] = useState(false);

  const matchedProducts = app.matchedProductIds
    .map(getProductById)
    .filter(Boolean);
  const matchingProductCount = matchedProducts.length;

  const titleId = `application-${app.id}-title`;
  const detailsId = `application-${app.id}-details`;

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
      className="h-full"
    >
      <InternalLink
        route={app.page}
        onPageChange={onPageChange}
        onClick={() => setIsSelected(true)}
        aria-labelledby={titleId}
        aria-describedby={detailsId}
        aria-pressed={isSelected}
        className={`group relative flex flex-col h-full rounded-[24px] overflow-hidden bg-white dark:bg-surface-900 border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
          isSelected
            ? 'border-brand-600 bg-brand-600/[0.03] dark:bg-brand-950/20 shadow-[0_10px_28px_rgba(228,10,24,0.12)]'
            : 'border-surface-200/70 dark:border-surface-800 shadow-[0_3px_14px_rgba(36,30,24,0.05)] hover:border-brand-600/50 hover:shadow-[0_12px_32px_rgba(36,30,24,0.1)]'
        }`}
      >
        {isSelected && (
          <span className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}

        <div className="relative w-full aspect-[3/2] overflow-hidden">
          <img
            src={app.image}
            alt={app.title}
            loading="lazy"
            className={`w-full h-full object-cover ${reduceMotion ? '' : 'transition-transform duration-500 ease-out group-hover:scale-[1.05]'}`}
          />
        </div>

        <div className="flex flex-col flex-1 px-7 pt-6">
          <h3 id={titleId} className="font-heading font-bold text-[22px] lg:text-[24px] text-heading dark:text-white leading-[1.2] m-0">
            {app.title}
          </h3>

          <div id={detailsId} className="flex flex-col">
            <div className="mt-4">
              <p className="font-body text-[12.5px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500 m-0 mb-1.5">
                Common technical need
              </p>
              <p className="font-body text-[15px] lg:text-[16px] text-surface-700 dark:text-surface-300 leading-[1.55] m-0">
                {app.problem}
              </p>
            </div>

            {matchingProductCount > 0 && (
              <div className="mt-4">
                <p className="font-body text-[14px] font-semibold text-heading dark:text-white m-0">
                  {matchingProductCount} matching {matchingProductCount === 1 ? 'product' : 'products'}
                </p>
                <p className="font-body text-[12.5px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500 m-0 mt-3 mb-1.5">
                  Recommended product types
                </p>
                <p className="font-body text-[14px] text-surface-500 dark:text-surface-400 leading-[1.5] m-0">
                  {matchedProducts.map((p) => p.title).join(' · ')}
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 pt-4 pb-6 border-t border-surface-200/80 dark:border-surface-800 flex items-center justify-between">
            <span className={`font-body font-semibold text-[14px] lg:text-[15px] transition-colors duration-200 ${
              isSelected ? 'text-brand-700 dark:text-brand-300' : 'text-brand-600 dark:text-brand-400 group-hover:text-brand-700 dark:group-hover:text-brand-300'
            }`}>
              Find Products for {CTA_SHORT_NAME[app.id] ?? app.title}
            </span>
            <svg
              width="11" height="11" viewBox="0 0 10 10" fill="currentColor"
              className={`text-brand-600 dark:text-brand-400 ${reduceMotion ? '' : 'group-hover:translate-x-1 transition-transform duration-200'}`}
              aria-hidden
            >
              <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
              <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
            </svg>
          </div>
        </div>
      </InternalLink>
    </motion.div>
  );
}
