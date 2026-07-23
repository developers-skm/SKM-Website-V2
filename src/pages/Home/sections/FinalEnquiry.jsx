import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';

// New Section 8 — Final Conversion Section. Home previously ended at
// Section 7 (Global Reach); no equivalent section existed before this.
// All 3 enquiry routes lead to the real existing `get-quote` flow — the
// only real guided enquiry route in the app, whose own Step 1 is literally
// "Which product are you interested in?" and whose existing description
// (EnquiryCategories.jsx) already frames it as "Request a sample or quote."
// There is no separate route or prefill field for "sample" vs "pricing"
// intent, so no differentiated destination is invented — all three cards
// and the primary CTA go to `get-quote`; the secondary CTA goes to the real
// `contact-us` route for a direct human conversation instead of the
// self-serve flow.
const enquiryRoutes = [
  {
    id: 'select',
    label: 'I need help selecting a product.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
    ),
  },
  {
    id: 'sample',
    label: 'I need a product sample or specification.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    id: 'pricing',
    label: 'I need commercial pricing.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l2 2 4-4M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    ),
  },
];

export default function FinalEnquiry({ onPageChange }) {
  const [selectedId, setSelectedId] = useState(null);
  const reduceMotion = useReducedMotion();

  const fadeProps = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : delay, ease: [0.25, 1, 0.5, 1] },
  });

  return (
    <div className="w-full bg-[#fdfbf7] dark:bg-surface-950 py-[72px] lg:py-[100px]">
      <div className="mx-auto max-w-[1200px] w-full px-6 sm:px-10 lg:px-16 flex flex-col items-center text-center gap-4">

        <motion.h2
          {...fadeProps()}
          className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[50px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
        >
          Tell us what you are manufacturing.
        </motion.h2>

        {/* Existing approved supporting copy — EnquiryCategories.jsx's own
            product-enquiry description, reused verbatim, not a new sentence. */}
        <motion.p
          {...fadeProps(0.05)}
          className="font-body text-[16px] lg:text-[18px] text-surface-600 dark:text-surface-400 leading-[1.6] max-w-2xl m-0"
        >
          Request a sample or quote — tell us your application, quantity, and destination in a few guided steps.
        </motion.p>

        {/* Enquiry cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6 w-full mt-6">
          {enquiryRoutes.map((route, i) => {
            const isSelected = selectedId === route.id;
            return (
              <motion.button
                key={route.id}
                {...fadeProps(0.1 + i * 0.08)}
                type="button"
                onClick={() => { setSelectedId(route.id); onPageChange('get-quote'); }}
                aria-pressed={isSelected}
                className={`group relative flex flex-col items-center gap-4 text-center p-7 lg:p-8 rounded-[22px] border bg-white dark:bg-surface-900 shadow-[0_3px_14px_rgba(36,30,24,0.05)] hover:shadow-[0_10px_28px_rgba(36,30,24,0.1)] transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
                  isSelected ? 'border-brand-600 bg-brand-600/[0.04] dark:bg-brand-950/20' : 'border-surface-200/70 dark:border-surface-800 hover:border-brand-600/40'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-4 right-4 w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
                <span className="w-12 h-12 rounded-full bg-brand-600/8 dark:bg-brand-950/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-105 transition-transform duration-300">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    {route.icon}
                  </svg>
                </span>
                <span className="font-heading font-bold text-[16px] lg:text-[17px] text-heading dark:text-white leading-[1.4]">
                  {route.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* CTAs */}
        <motion.div {...fadeProps(0.4)} className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto">
          <InternalLink
            route="get-quote"
            onPageChange={onPageChange}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[48px] px-8 py-3 rounded-full bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[14px] uppercase tracking-[0.04em] transition-all duration-200 shadow-[0_4px_20px_rgba(228,10,24,0.22)] hover:shadow-[0_6px_26px_rgba(228,10,24,0.34)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Start Your Product Enquiry
          </InternalLink>
          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[48px] px-8 py-3 rounded-full bg-white dark:bg-surface-900 border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[14px] uppercase tracking-[0.04em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Talk to an Application Specialist
          </InternalLink>
        </motion.div>

      </div>
    </div>
  );
}
