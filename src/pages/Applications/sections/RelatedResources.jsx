import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_PREMIUM, DURATION, STAGGER, fadeUp } from '../../../utils/motionTokens';

const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

// Section 7 — related resources (brief §7). Of the 5 brief resource types
// (Technical guide, Product flyer, Video, FAQ, Case example), only Product
// Flyer has real files anywhere in the codebase — the same TDS PDFs used
// throughout the product/application work, and only for the 3 products
// that have one. No videos, FAQs, or case studies exist anywhere in this
// codebase, so those types are omitted entirely rather than shown as
// placeholder or broken entries.
export default function RelatedResources({ matchedProducts, onPageChange }) {
  const reduceMotion = useReducedMotion();
  const [openedId, setOpenedId] = useState(null);
  const flyers = matchedProducts.filter((p) => p.tdsUrl);

  if (flyers.length === 0) return null;

  const handleOpen = (id) => {
    setOpenedId(id);
    window.setTimeout(() => setOpenedId((prev) => (prev === id ? null : prev)), 750);
  };

  return (
    <div className="w-full bg-[#f8f4ee] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <motion.div {...fadeUp(reduceMotion)} className="flex flex-col gap-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            Resources
          </span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading m-0 tracking-tight leading-[1.1]">
            Related Resources
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : STAGGER } } }}
        >
          {flyers.map((product) => {
            const isOpened = openedId === product.id;
            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
                className="group flex items-center justify-between gap-4 rounded-[20px] border border-surface-200/60 hover:border-brand-600/40 bg-white px-6 py-6 transition-colors duration-300"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-[12px] bg-brand-600/6 border border-brand-600/12 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-body text-[10.5px] font-bold uppercase tracking-wider text-surface-400">
                      Product Flyer
                    </span>
                    <span className="font-heading font-semibold text-[14.5px] text-heading truncate">
                      {product.title}
                    </span>
                  </div>
                </div>
                <a
                  href={product.tdsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleOpen(product.id)}
                  className={`flex-shrink-0 font-body font-bold text-[12px] uppercase tracking-[0.05em] px-4 py-2 rounded-full border transition-all duration-200 ${
                    isOpened
                      ? 'text-white bg-brand-600 border-brand-600'
                      : 'text-brand-600 hover:text-[#a80000] border-surface-200 hover:border-brand-600/30'
                  }`}
                >
                  {isOpened ? 'Opened ✓' : 'Open Resource'}
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        <button
          onClick={() => onPageChange('brochure')}
          className="self-start font-body font-bold text-[13px] uppercase tracking-[0.05em] text-brand-600 hover:text-[#a80000] underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
        >
          View All Application Resources
        </button>
      </div>
    </div>
  );
}
