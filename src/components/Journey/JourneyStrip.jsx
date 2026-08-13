import { motion } from 'framer-motion';
import journeyStages from '../../data/journeyStages';
import { containerVariants, itemVariants } from '../../utils/animationVariants';
import JourneyScrollSection from './JourneyScrollSection';

/**
 * Farm-to-product story (plan.md §3).
 * variant="compact" — homepage teaser strip, one photo + line per stage.
 * variant="full"    — scrollytelling long-form used on the "Our Journey" page.
 */
export default function JourneyStrip({ variant = 'compact', onPageChange }) {
  if (variant === 'full') {
    return <FullJourney onPageChange={onPageChange} />;
  }
  return <CompactJourney onPageChange={onPageChange} />;
}

function CompactJourney({ onPageChange }) {
  return (
    <div className="w-full bg-page dark:bg-surface-950 py-[40px] lg:py-[60px] border-b border-[#eee] dark:border-surface-800/40">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="section-label">From Farm To Your Formulation</span>
            <h2 className="font-heading font-bold text-[32px] sm:text-[38px] lg:text-[44px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
              Our Journey
            </h2>
            <p className="font-body text-[15px] text-surface-500 dark:text-surface-400 leading-[26px] m-0">
              Six documented stages carry every egg from a biosecure hatchery to your factory floor — see the process behind every batch.
            </p>
          </div>
          <button
            onClick={() => onPageChange?.('journey')}
            className="group inline-flex items-center gap-2 font-body font-semibold text-[13px] uppercase tracking-[0.05em] text-brand-600 hover:text-brand-700 dark:hover:text-brand-400 bg-transparent border-none p-0 cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            See The Full Journey
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden>
              <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
              <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {journeyStages.map((stage) => (
            <motion.button
              key={stage.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              onClick={() => onPageChange?.('journey')}
              className="group relative flex flex-col rounded-[14px] overflow-hidden aspect-[3/4] cursor-pointer border border-[#eee] dark:border-surface-800 focus:outline-none"
            >
              <img
                src={stage.image}
                alt={stage.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.78) 100%)' }}
              />
              <span className="absolute top-2.5 left-2.5 font-heading font-bold text-[10px] text-white/90 bg-white/15 backdrop-blur-sm border border-white/20 px-2 py-[3px] rounded-full">
                {stage.step}
              </span>
              <span className="absolute bottom-2.5 left-2.5 right-2.5 font-heading font-bold text-[11.5px] sm:text-[12.5px] text-white leading-[1.25] text-left">
                {stage.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

function FullJourney({ onPageChange }) {
  return (
    <div className="w-full bg-page dark:bg-surface-950">
      {/* Intro */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[900px] w-full px-4 sm:px-6 lg:px-8 pt-[110px] pb-[40px] sm:pt-[130px] lg:pt-[90px] text-center flex flex-col items-center gap-5"
      >
        <motion.span variants={itemVariants} className="section-label justify-center">
          From Farm To Your Formulation
        </motion.span>
        <motion.h1
          variants={itemVariants}
          className="font-heading font-bold text-[38px] sm:text-[52px] lg:text-[60px] text-heading dark:text-white leading-[1.05] tracking-tight m-0"
        >
          Our Journey
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="font-body text-[16px] sm:text-[18px] text-surface-500 dark:text-surface-400 leading-[30px] m-0 max-w-2xl"
        >
          Most buyers can't visit an egg processing plant across the world before they trust it. So we're showing you the whole chain instead — six documented stages, from a biosecure hatchery to the cold chain that carries your order to your door.
        </motion.p>
      </motion.div>

      {/* Stages */}
      <JourneyScrollSection steps={journeyStages} />

      {/* Closing CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="w-full bg-page dark:bg-surface-900/40 border-t border-[#eee] dark:border-surface-800/40 py-[70px] lg:py-[90px]"
      >
        <div className="mx-auto max-w-[700px] w-full px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-heading dark:text-white leading-[1.15] tracking-tight m-0">
            This is the process behind every product we make.
          </h2>
          <p className="font-body text-[15px] text-surface-500 dark:text-surface-400 leading-[26px] m-0">
            Explore the egg powders and liquid egg products this chain produces, or talk to us about your formulation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onPageChange?.('home')}
              className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-7 py-[15px] rounded-[200px] transition-all duration-300 shadow-[0_4px_20px_rgba(228,10,24,0.25)] hover:shadow-[0_6px_28px_rgba(228,10,24,0.4)] cursor-pointer"
            >
              Explore Our Products
            </button>
            <button
              onClick={() => onPageChange?.('get-quote')}
              className="inline-flex items-center gap-2.5 bg-transparent hover:bg-brand-600/6 dark:hover:bg-brand-950/30 text-surface-900 dark:text-surface-100 border border-surface-250 dark:border-surface-700 font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-7 py-[15px] rounded-[200px] transition-all duration-300 cursor-pointer"
            >
              Request A Quote
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
