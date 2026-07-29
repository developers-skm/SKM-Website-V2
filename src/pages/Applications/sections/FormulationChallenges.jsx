import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import formulationChallenges from '../../../data/formulationChallenges';
import { getProductById } from '../../../data/products';
import { EASE_PREMIUM, DURATION, STAGGER } from '../../../utils/motionTokens';

const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

// Section 3 — browse by formulation challenge (brief §3). Each challenge's
// product matches come from a real evidence audit of every product page's
// own variant text (see data/formulationChallenges.js) — not an assumed
// mapping. "Find Products for This Challenge" expands the card to reveal
// the real matched products with links to their own pages, since a
// challenge maps to several products rather than one single destination.
export default function FormulationChallenges({ onPageChange }) {
  const [openId, setOpenId] = useState(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-[#f8f4ee] dark:bg-surface-950 py-16 sm:py-20 lg:py-24">
      <motion.div
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : STAGGER } } }}
      >
        <motion.div variants={itemVariants} transition={{ duration: reduceMotion ? 0.01 : DURATION.sectionEntrance, ease: EASE_PREMIUM }} className="flex flex-col gap-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            Formulation Challenges
          </span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white m-0 tracking-tight leading-[1.1]">
            Browse By Formulation Challenge
          </h2>
          <p className="font-body text-[17px] text-surface-600 dark:text-surface-400 leading-[1.7] m-0">
            Already know the functional problem you're solving? Start there instead.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {formulationChallenges.map((challenge) => {
            const isOpen = openId === challenge.id;
            const matchedProducts = challenge.matchedProductIds.map(getProductById).filter(Boolean);
            return (
              <motion.div
                key={challenge.id}
                variants={itemVariants}
                transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
                className="group flex flex-col rounded-[22px] border border-surface-200/60 dark:border-surface-800 hover:border-brand-600/40 bg-white dark:bg-surface-900/40 px-6 py-7 transition-colors duration-300"
              >
                <h3 className="font-heading font-bold text-[18px] text-heading dark:text-white m-0">
                  {challenge.label}
                </h3>
                <p className="font-body text-[14px] text-surface-600 dark:text-surface-300 leading-[1.6] mt-2 mb-4">
                  {challenge.description}
                </p>
                <button
                  onClick={() => setOpenId(isOpen ? null : challenge.id)}
                  aria-expanded={isOpen}
                  className="self-start inline-flex items-center gap-1.5 font-body font-bold text-[12px] uppercase tracking-[0.05em] text-brand-600 dark:text-brand-400 hover:text-[#a80000] cursor-pointer bg-transparent border-none p-0"
                >
                  Find Products For This Challenge
                  <svg
                    className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && matchedProducts.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0.01 : DURATION.filterTransition, ease: EASE_PREMIUM }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-2 mt-5 pt-5 border-t border-surface-200/60 dark:border-surface-800">
                        {matchedProducts.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => onPageChange(product.page)}
                            className="group/item flex items-center justify-between gap-3 text-left font-body font-semibold text-[14px] text-heading dark:text-white hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer bg-transparent border-none p-0 py-1"
                          >
                            {product.title}
                            <svg className="w-3.5 h-3.5 flex-shrink-0 group-hover/item:translate-x-0.5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
