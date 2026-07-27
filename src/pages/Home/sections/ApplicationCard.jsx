import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import { getProductById } from '../../../data/products';

// Image-led application card. Top ~60-65% is the image with a dark
// gradient scrim carrying the title and the short technical-need sentence
// (app.problem, verbatim) in white text — bottom section stays a plain
// white block for the matching-product count, recommended product types,
// and CTA, so that detail stays readable against a solid background
// rather than crowding onto the photo.
export default function ApplicationCard({ app, onPageChange, isActive = true }) {
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
            ? 'border-brand-600 shadow-[0_10px_28px_rgba(228,10,24,0.12)]'
            : 'border-surface-200/70 dark:border-surface-800 shadow-[0_3px_14px_rgba(36,30,24,0.05)] hover:border-brand-600/50 hover:shadow-[0_12px_32px_rgba(36,30,24,0.1)]'
        }`}
      >
        <div className="relative block min-h-[300px] sm:min-h-[340px] lg:min-h-[380px] overflow-hidden">
          <img
            src={app.image}
            alt={app.title}
            loading="lazy"
            className={`absolute inset-0 block w-full h-full object-cover ${reduceMotion ? '' : 'transition-transform duration-500 ease-out group-hover:scale-[1.05]'}`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          {!isActive && <div className="absolute inset-0 z-[1] bg-white/10" />}

          {isSelected && (
            <span className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-7">
            <h3 id={titleId} className="max-w-[90%] font-heading text-[24px] md:text-[28px] font-semibold leading-[1.2] text-white m-0">
              {app.title}
            </h3>

            <p className="mt-3 max-w-[95%] font-body text-[14px] lg:text-[15px] text-white/90 leading-[1.5] line-clamp-3 m-0">
              {app.problem}
            </p>
          </div>
        </div>

        <div id={detailsId} className="relative z-10 -mt-px flex flex-col bg-white dark:bg-surface-900 px-6 py-6">
          {matchingProductCount > 0 && (
            <>
              <p className="font-body text-base font-medium text-heading dark:text-white m-0">
                {matchingProductCount} matching {matchingProductCount === 1 ? 'product' : 'products'}
              </p>
              <div className="mt-6">
                <p className="font-body text-[12.5px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500 m-0 mb-1.5">
                  Recommended product types
                </p>
                <p className="font-body text-[14px] text-surface-500 dark:text-surface-400 leading-[1.5] m-0">
                  {matchedProducts.map((p) => p.title).join(' · ')}
                </p>
              </div>
            </>
          )}

          <div className="mt-5 pt-4 border-t border-surface-200/80 dark:border-surface-800 flex items-center justify-between">
            <span className={`font-body font-semibold text-[14px] lg:text-[15px] transition-colors duration-200 ${
              isSelected ? 'text-brand-700 dark:text-brand-300' : 'text-brand-600 dark:text-brand-400 group-hover:text-brand-700 dark:group-hover:text-brand-300'
            }`}>
              Find Products for {app.title}
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
