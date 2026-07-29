import { motion, useReducedMotion } from 'framer-motion';
import { EASE_PREMIUM, DURATION, STAGGER } from '../../../utils/motionTokens';

// Section 5 — technical support (brief §5). Both buttons route to the two
// real conversion flows already used throughout the site: "Discuss Your
// Formulation" to the real Contact Us page, "Request Trial Sample" to the
// real Get Quote flow (its own Step 1 already asks which product and
// application — the same flow every other "Request Sample" CTA in the app
// uses). The 3 stage labels describe the real, already-existing path a
// visitor can take on this site (browse/select on this page → request a
// sample or quote → reach commercial supply via that same enquiry) rather
// than a fabricated formal "trial program" that doesn't exist.
const stages = [
  {
    step: '01',
    label: 'Product Selection',
    description: "Browse by application or formulation challenge on this page, or explore the full product range to find the right ingredient for your recipe.",
  },
  {
    step: '02',
    label: 'Samples & Trials',
    description: 'Request a sample through our guided quote flow — tell us your product, application, and destination, and our export sales team follows up directly.',
  },
  {
    step: '03',
    label: 'Commercial Supply',
    description: 'Once a formulation is validated, the same enquiry moves into a commercial quote — packaging, quantity, and destination confirmed with our team.',
  },
];

const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function TechnicalSupport({ onDiscussFormulation, onRequestTrial }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="w-full bg-[#fdf1f0] dark:bg-brand-950/20 py-16 sm:py-20 lg:py-24">
      <motion.div
        className="mx-auto max-w-[1000px] w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : STAGGER } } }}
      >
        <motion.div variants={itemVariants} transition={{ duration: reduceMotion ? 0.01 : DURATION.sectionEntrance, ease: EASE_PREMIUM }} className="flex flex-col items-center gap-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            Technical Support
          </span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white m-0 tracking-tight leading-[1.1]">
            From Product Selection To Commercial Supply
          </h2>
          <p className="font-body text-[17px] text-surface-600 dark:text-surface-400 leading-[1.7] m-0">
            Support doesn't stop at picking a product — our team stays involved through sampling, trials, and into full commercial supply.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} transition={{ duration: reduceMotion ? 0.01 : DURATION.sectionEntrance, ease: EASE_PREMIUM }} className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
          <motion.div
            className="hidden sm:block absolute top-[34px] left-[calc(16.666%+8px)] right-[calc(16.666%+8px)] h-px bg-gradient-to-r from-brand-600/25 via-brand-600/40 to-brand-600/25 dark:from-brand-400/20 dark:via-brand-400/35 dark:to-brand-400/20"
            style={{ transformOrigin: '0% 50%' }}
            initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0.01 : DURATION.process, ease: EASE_PREMIUM, delay: reduceMotion ? 0 : 0.2 }}
            aria-hidden="true"
          />
          {stages.map((stage) => (
            <div
              key={stage.step}
              className="group relative flex flex-col gap-3 rounded-[20px] bg-white dark:bg-surface-900/60 border border-surface-200/70 dark:border-surface-800 px-6 py-7 shadow-[0_4px_18px_rgba(36,30,24,0.06)] hover:shadow-[0_14px_34px_rgba(36,30,24,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-600 text-white font-mono text-[12.5px] font-bold shadow-[0_6px_16px_rgba(228,10,24,0.3)] group-hover:scale-105 transition-transform duration-300">
                {stage.step}
              </span>
              <span className="font-heading font-bold text-[16.5px] text-heading dark:text-white">
                {stage.label}
              </span>
              <p className="font-body text-[13.5px] text-surface-600 dark:text-surface-300 leading-[1.6] m-0">
                {stage.description}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} transition={{ duration: reduceMotion ? 0.01 : DURATION.sectionEntrance, ease: EASE_PREMIUM }} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <button
            onClick={onDiscussFormulation}
            className="inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13.5px] uppercase tracking-[0.05em] leading-none px-8 py-[18px] rounded-[200px] transition-all duration-200 shadow-[0_8px_24px_rgba(228,10,24,0.28)] hover:shadow-[0_12px_32px_rgba(228,10,24,0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Discuss Your Formulation
          </button>
          <button
            onClick={onRequestTrial}
            className="font-body font-semibold text-[14px] text-brand-600 dark:text-brand-400 hover:text-[#a80000] dark:hover:text-brand-300 underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
          >
            Request Trial Sample
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
