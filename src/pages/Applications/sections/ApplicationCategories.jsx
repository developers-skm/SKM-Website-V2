import { motion, useReducedMotion } from 'framer-motion';
import applications from '../../../data/applications';
import { getProductById } from '../../../data/products';
import { EASE_PREMIUM, DURATION } from '../../../utils/motionTokens';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

// Section 2 — application categories (brief §2). The brief lists 8
// categories; only 4 (Bakery & Confectionery, Mayonnaise & Salad Dressing,
// Meat & Fish, Noodles & Pasta) have real photography, copy, and product
// matches anywhere in the codebase — the other 4 (Ice Cream & Dairy,
// Protein & Nutrition, Convenience Foods, Custom Application) have none.
// This is the same situation already handled on the homepage
// (Home/sections/ApplicationAreas.jsx), which established the rule: render
// only categories with genuine data, no placeholder cards. Each card gets
// a specific "Explore X Solutions" action per the brief, rather than the
// previous whole-card-is-a-link pattern.
export default function ApplicationCategories({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  return (
    <div id="application-categories" className="w-full py-16 sm:py-20 lg:py-24 scroll-mt-[100px]">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ staggerChildren: reduceMotion ? 0 : 0.07 }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10"
      >
        <motion.div variants={itemVariants} transition={{ duration: reduceMotion ? 0.01 : DURATION.sectionEntrance, ease: EASE_PREMIUM }} className="flex flex-col gap-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            Application Categories
          </span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white m-0 tracking-tight leading-[1.1]">
            Browse By What You're Making
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-7">
          {applications.map((app) => {
            const matchedProducts = app.matchedProductIds.map(getProductById).filter(Boolean);
            return (
              <motion.div
                key={app.id}
                variants={itemVariants}
                transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
                className="group flex flex-col h-full rounded-[24px] overflow-hidden bg-white dark:bg-surface-900 border border-surface-200/70 dark:border-surface-800 hover:border-brand-600/50 hover:-translate-y-[7px] shadow-[0_3px_14px_rgba(36,30,24,0.05)] hover:shadow-[0_16px_36px_rgba(36,30,24,0.12)] focus-within:ring-2 focus-within:ring-brand-500/40 transition-[border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transitionProperty: 'border-color, box-shadow, transform' }}
              >
                <div className="relative w-full aspect-[3/2] overflow-hidden" style={{ maskImage: 'radial-gradient(120% 120% at 50% 0%, #000 60%, #000 100%)' }}>
                  <img
                    src={app.image}
                    alt={app.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                </div>
                <div className="relative flex flex-col gap-2 px-7 pt-6 pb-7">
                  <span className="absolute left-0 top-0 h-0.5 w-0 bg-[linear-gradient(90deg,transparent,#e8b64a,transparent)] group-hover:w-full transition-all duration-500 ease-out" aria-hidden="true" />
                  <h3 className="font-heading font-bold text-[22px] text-heading dark:text-white leading-[1.2] m-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
                    {app.title}
                  </h3>
                  <p className="font-body text-[15px] text-surface-600 dark:text-surface-400 leading-[1.55] m-0">
                    {app.problem}
                  </p>
                  {matchedProducts.length > 0 && (
                    <p className="font-body text-[13px] text-surface-400 dark:text-surface-500 mt-1 m-0">
                      {matchedProducts.length} matching {matchedProducts.length === 1 ? 'product' : 'products'}
                    </p>
                  )}
                  <button
                    onClick={() => onPageChange(app.page)}
                    className="mt-3 self-start inline-flex items-center gap-1.5 font-body font-bold text-[12.5px] uppercase tracking-[0.05em] text-brand-600 dark:text-brand-400 hover:text-[#a80000] cursor-pointer bg-transparent border-none p-0 active:scale-[0.98] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    Explore {app.title.split(' & ')[0].split(' and ')[0]} Solutions
                    <svg className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-1.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
