import { motion, useReducedMotion } from 'framer-motion';
import { EASE_PREMIUM, DURATION, STAGGER } from '../../../utils/motionTokens';

// Section 1 — application hero (brief §1). "Select Your Application" is an
// in-page scroll to Section 2's real category cards below (both sections
// live on the same page, so no cross-page route is needed). "Talk to an
// Application Specialist" routes to the real Contact Us page — no dedicated
// application-specialist contact flow exists in the app, same pattern used
// throughout the product detail page work for "talk to a human" CTAs.
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function ApplicationHero({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  const scrollToCategories = () => {
    document.getElementById('application-categories')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36 text-center px-4">
      <img
        src="https://images.unsplash.com/photo-1713176679770-1ab32be3fb38?fm=jpg&q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0"
        srcSet="https://images.unsplash.com/photo-1713176679770-1ab32be3fb38?fm=jpg&q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0 1200w, https://images.unsplash.com/photo-1713176679770-1ab32be3fb38?fm=jpg&q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0 2400w"
        sizes="100vw"
        alt="Wooden crate filled with white eggs"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(20,16,10,0.35) 0%, rgba(20,16,10,0.25) 40%, rgba(20,16,10,0.75) 88%, rgba(20,16,10,0.94) 100%)' }}
        aria-hidden="true"
      />
      <motion.div
        className="relative z-10 mx-auto max-w-[820px] flex flex-col items-center gap-6"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : STAGGER } } }}
      >
        <motion.span variants={itemVariants} transition={{ duration: reduceMotion ? 0.01 : DURATION.sectionEntrance, ease: EASE_PREMIUM }} className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-400">
          <span className="w-5 h-px bg-brand-400" aria-hidden="true" />
          Applications Hub
        </motion.span>
        <motion.h1 variants={itemVariants} transition={{ duration: reduceMotion ? 0.01 : DURATION.sectionEntrance, ease: EASE_PREMIUM }} className="font-heading font-bold text-[38px] sm:text-[52px] lg:text-[60px] text-white leading-[1.05] tracking-tight m-0 drop-shadow-[0_2px_20px_rgba(0,0,0,0.25)]">
          What Are We Manufacturing?
        </motion.h1>
        <motion.p variants={itemVariants} transition={{ duration: reduceMotion ? 0.01 : DURATION.sectionEntrance, ease: EASE_PREMIUM }} className="font-body text-[16px] sm:text-[18px] text-white/80 leading-[1.7] m-0 max-w-[58ch]">
          Food manufacturers usually think about the product they're developing before they think about an egg product code. Start with what you're making, and we'll point you to the right ingredient.
        </motion.p>
        <motion.div variants={itemVariants} transition={{ duration: reduceMotion ? 0.01 : DURATION.sectionEntrance, ease: EASE_PREMIUM }} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-2">
          <button
            onClick={scrollToCategories}
            className="inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13.5px] uppercase tracking-[0.05em] leading-none px-8 py-[18px] rounded-[200px] transition-all duration-200 shadow-[0_8px_24px_rgba(228,10,24,0.35)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Select Your Application
          </button>
          <button
            onClick={() => onPageChange('contact-us')}
            className="font-body font-semibold text-[14px] text-white/90 hover:text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
          >
            Talk to an Application Specialist
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
