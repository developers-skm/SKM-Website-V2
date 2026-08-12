import { motion, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import { fadeUp, EASE_PREMIUM } from '../../../utils/motionTokens';

// Final CTA. Editorial conclusion — oversized left-aligned headline (not
// centered/boxed), generous whitespace, one clear primary action and one
// secondary. Both destinations are real: `get-quote` is the only guided
// enquiry flow in the app (Step 1 is literally "Which product are you
// interested in?"); `contact-us` is the real direct-contact route. The
// previous 3-card selector was decorative (all 3 cards led to the same
// get-quote route) and read as the "tiny centered CTA card" pattern the
// brief explicitly asks to avoid — replaced with a single strong CTA pair.
function LineReveal({ children, delay = 0, reduceMotion }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: reduceMotion ? 0 : '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: reduceMotion ? 0.01 : 0.85, delay: reduceMotion ? 0 : delay, ease: EASE_PREMIUM }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function FinalEnquiry({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative w-full bg-[#fdfbf7] dark:bg-surface-950 py-24 lg:py-36 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[680px] h-[680px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,182,74,0.14) 0%, rgba(232,182,74,0) 70%)' }}
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: reduceMotion ? 0.01 : 1.3, ease: EASE_PREMIUM }}
      />

      <div className="relative mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">

          <h2 className="lg:col-span-9 font-heading font-bold text-[44px] sm:text-[60px] lg:text-[76px] text-heading dark:text-white leading-[1.02] tracking-tight m-0">
            <LineReveal reduceMotion={reduceMotion}>Tell us what you are</LineReveal>
            <LineReveal delay={0.1} reduceMotion={reduceMotion}>manufacturing.</LineReveal>
          </h2>

          <motion.p
            {...fadeUp(reduceMotion, { delay: 0.3 })}
            className="lg:col-span-6 font-body text-[17px] lg:text-[19px] text-surface-600 dark:text-surface-400 leading-[1.7] m-0"
          >
            Request a sample or quote — tell us your application, quantity, and destination in a few guided steps.
          </motion.p>
        </div>

        <motion.div {...fadeUp(reduceMotion, { delay: 0.42 })} className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-12 lg:mt-14">
          <InternalLink
            route="get-quote"
            onPageChange={onPageChange}
            className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-9 py-3 rounded-full bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[14px] uppercase tracking-[0.04em] transition-all duration-[250ms] shadow-[0_4px_20px_rgba(228,10,24,0.22)] hover:shadow-[0_6px_26px_rgba(228,10,24,0.34)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Start Your Product Enquiry
          </InternalLink>
          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="group inline-flex items-center gap-2 font-body font-semibold text-[15px] text-heading dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-[250ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
          >
            Talk to an Application Specialist
            <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor" className={reduceMotion ? '' : 'group-hover:translate-x-1 transition-transform duration-[250ms]'} aria-hidden>
              <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
              <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
            </svg>
          </InternalLink>
        </motion.div>
      </div>
    </div>
  );
}
