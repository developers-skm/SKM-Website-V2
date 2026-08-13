import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SpecificationGrid from './SpecificationGrid';
import { EASE_PREMIUM } from '../../utils/motionTokens';

// Premium technical-document panel — large white surface, ~32px radius,
// generous 48-64px padding, near-invisible shadow (border + surface
// contrast carries the separation instead). Replaces the previous compact
// bordered card with a document that reads as a genuine spec sheet.
export default function VariantDetails({ variant, displayCode, panelId, tabId }) {
  const reduceMotion = useReducedMotion();

  if (!variant) return null;

  const transition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.3, ease: EASE_PREMIUM };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={variant.code}
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId}
        tabIndex={0}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
        transition={transition}
        className="rounded-[32px] border border-surface-200/60 bg-white px-6 sm:px-12 lg:px-16 py-10 sm:py-14 lg:py-16 flex flex-col gap-9 shadow-[0_20px_60px_rgba(36,30,24,0.06)] focus:outline-none"
      >
        {/* Top — code, name, description */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 bg-brand-600 px-3.5 py-[7px] rounded-full">
              <span className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase text-white leading-none">
                {displayCode(variant.code)}
              </span>
            </span>
            <h3 className="font-heading font-bold text-[26px] sm:text-[32px] text-heading m-0 tracking-tight leading-[1.15]">
              {variant.name}
            </h3>
          </div>
          {variant.description && (
            <p className="font-body text-[16px] sm:text-[17px] text-surface-600 leading-[1.7] m-0 max-w-[68ch]">
              {variant.description}
            </p>
          )}
        </div>

        {/* Middle — applications + benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 pt-7 border-t border-surface-200/70">
          {variant.applications && (
            <div className="flex flex-col gap-2.5">
              <span className="font-body text-[12.5px] font-bold uppercase tracking-widest text-brand-600">
                Typical Applications
              </span>
              <p className="font-body text-[16px] text-surface-600 leading-[1.7] m-0">
                {variant.applications}
              </p>
            </div>
          )}
          {variant.benefits && (
            <div className="flex flex-col gap-2.5">
              <span className="font-body text-[12.5px] font-bold uppercase tracking-widest text-brand-600">
                Key Benefits
              </span>
              <p className="font-body text-[16px] text-surface-600 leading-[1.7] m-0">
                {variant.benefits}
              </p>
            </div>
          )}
        </div>

        {/* Bottom — specifications */}
        {variant.specifications && (
          <div className="flex flex-col gap-5 pt-7 border-t border-surface-200/70">
            <span className="font-body text-[12.5px] font-bold uppercase tracking-widest text-surface-400">
              Technical Specifications
            </span>
            <SpecificationGrid specifications={variant.specifications} />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
