import { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import SafeImage from '../../../components/common/SafeImage';
import journeyStages from '../../../data/journeyStages';
import { fadeUp } from '../../../utils/motionTokens';

// Section 7 — Traceability. Home-scoped sticky scroll-driven storytelling,
// following the same interaction pattern as components/Journey/
// JourneyScrollSection.jsx (pinned image + copy panel, scroll-scrubbed
// crossfade) WITHOUT modifying that shared component — JourneyScrollSection
// is used by JourneyStrip.jsx elsewhere and per standing project rule,
// shared components get a phase-scoped variant instead of a direct edit.
// Per-stage scroll budget is intentionally tighter here (58vh/stage vs the
// shared component's 100vh/stage) to avoid an excessive page length for 6
// stages stacked on top of 5 other homepage sections. Desktop (lg+) gets
// the sticky/pinned experience; mobile and prefers-reduced-motion both get
// the same plain stacked vertical timeline — no pinning, no scroll-jacking.
const EASE = [0.22, 1, 0.36, 1];
const VH_PER_STAGE = 58;

const copyContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};
const copyItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.22, ease: EASE } },
};

function DesktopSticky() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = journeyStages.length;

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const rawIndex = Math.min(total - 1, Math.floor(latest * total));
    setActiveIndex((prev) => (prev === rawIndex ? prev : rawIndex));
  });

  const stepProgress = useTransform(scrollYProgress, (latest) => {
    const scaled = latest * total;
    return scaled - Math.floor(scaled);
  });

  const active = journeyStages[activeIndex];

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${total * VH_PER_STAGE}vh` }}>
      <div className="sticky top-0 min-h-screen max-h-screen w-full overflow-hidden flex items-center">
        <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">
          <div className="flex items-stretch gap-10 xl:gap-16 h-[min(80vh,860px)]">

            <div className="relative flex-[1.2] min-w-0 h-full rounded-[8px] overflow-hidden">
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: EASE }}
                  className="absolute inset-0"
                >
                  <SafeImage
                    src={active.image}
                    alt={active.label}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-6 right-6 bottom-6 w-[3px] rounded-full bg-white/25 z-10" aria-hidden="true">
                <motion.div className="w-full rounded-full bg-white origin-top" style={{ scaleY: stepProgress }} />
              </div>
            </div>

            <div className="relative flex-1 min-w-0 h-full flex flex-col justify-center">
              <span className="section-label mb-6">Traceability</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  variants={copyContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-5"
                >
                  <motion.span variants={copyItemVariants} className="font-body text-[12.5px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                    Stage {active.step} · {total.toString().padStart(2, '0')}
                  </motion.span>
                  <motion.h3 variants={copyItemVariants} className="font-heading font-bold text-[34px] xl:text-[44px] text-heading dark:text-white leading-[1.08] tracking-tight m-0">
                    {active.label}
                  </motion.h3>
                  <motion.p variants={copyItemVariants} className="font-body text-[16px] lg:text-[17px] text-surface-500 dark:text-surface-400 leading-[1.8] m-0 max-w-[46ch]">
                    {active.description}
                  </motion.p>
                  {active.stat && (
                    <motion.div variants={copyItemVariants} className="flex items-baseline gap-3 mt-2 pt-5 border-t border-surface-200/70 dark:border-surface-800 self-start">
                      <span className="font-heading font-bold text-[26px] text-brand-600 dark:text-brand-400 leading-none tabular-nums">
                        {active.stat.value}
                      </span>
                      <span className="font-body text-[13px] text-surface-500 dark:text-surface-400 leading-tight max-w-[220px]">
                        {active.stat.label}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Stage index rail */}
              <div className="flex items-center gap-2 mt-10">
                {journeyStages.map((stage, i) => (
                  <span
                    key={stage.id}
                    className={`h-[3px] rounded-full transition-all duration-500 ${i === activeIndex ? 'w-10 bg-brand-600' : 'w-4 bg-surface-200 dark:bg-surface-800'}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function StackedTimeline({ reduceMotion }) {
  return (
    <div className="flex flex-col">
      {journeyStages.map((stage, i) => (
        <motion.div
          key={stage.id}
          {...fadeUp(reduceMotion, { delay: 0 })}
          className={`flex gap-4 py-8 ${i !== journeyStages.length - 1 ? 'border-b border-surface-200/70 dark:border-surface-800' : ''}`}
        >
          <div className="flex-1 flex flex-col gap-4">
            <div className="relative rounded-[8px] overflow-hidden aspect-[4/3]">
              <SafeImage src={stage.image} alt={stage.label} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-heading font-bold text-[22px] text-heading dark:text-white leading-[1.2] tracking-tight m-0">
                {stage.label}
              </h3>
              <p className="font-body text-[14.5px] text-surface-500 dark:text-surface-400 leading-[1.7] m-0">
                {stage.description}
              </p>
              {stage.stat && (
                <div className="flex items-baseline gap-2.5 mt-1">
                  <span className="font-heading font-bold text-[19px] text-brand-600 dark:text-brand-400 leading-none tabular-nums">
                    {stage.stat.value}
                  </span>
                  <span className="font-body text-[12px] text-surface-500 dark:text-surface-400 leading-tight">
                    {stage.stat.label}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function HomeJourney({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  const useSticky = !reduceMotion;

  return (
    <section className="w-full bg-white dark:bg-surface-950">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 pt-24 lg:pt-28">
        <motion.div {...fadeUp(reduceMotion)} className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Traceability</span>
          <h2 className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[52px] text-heading dark:text-white leading-[1.05] tracking-tight m-0">
            Farm-to-product journey
          </h2>
          <p className="font-body text-[16px] lg:text-[17px] text-surface-500 dark:text-surface-400 leading-[1.8] max-w-xl m-0">
            From biosecure layer farms and pathogen-free feed formulation to automated processing, NABL analytical testing, and global packaging dispatch.
          </p>
        </motion.div>
      </div>

      {useSticky ? (
        <>
          <div className="hidden lg:block">
            <DesktopSticky />
          </div>
          <div className="lg:hidden mx-auto max-w-[1680px] w-full px-6 sm:px-10 py-16">
            <StackedTimeline reduceMotion={reduceMotion} />
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
          <StackedTimeline reduceMotion={reduceMotion} />
        </div>
      )}

      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 pb-24 lg:pb-28 pt-8">
        <div className="pt-8 border-t border-surface-200/70 dark:border-surface-800">
          <InternalLink
            route="traceability"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[15px] transition-colors duration-[250ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Explore Complete Traceability System
            <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
              <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
              <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
            </svg>
          </InternalLink>
        </div>
      </div>
    </section>
  );
}
