import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useMotionValueEvent, useTransform, AnimatePresence } from 'framer-motion';

// JourneyScrollSection — premium vertical scroll-driven storytelling,
// inspired by the interaction style of coffee-tech.com (pinned visual,
// scroll-scrubbed milestone transitions). No branding, copy, imagery, or
// code was taken from that site — only the category of interaction. Built
// with Framer Motion (already a project dependency; no GSAP present, no
// new dependency added).
//
// Layout (desktop, lg+): 2-panel —
//   image = sticky large image panel (dominant element, carries the step
//           number as a badge)
//   copy  = sticky heading/description/stat panel
// Both panels are position:sticky at the same offset, so they read as one
// sticky content area while the underlying scroll-linked crossfade
// advances. No separate timeline/step-marker rail — kept intentionally
// minimal per direct design feedback that a left-side dot timeline read as
// clutter rather than premium/editorial.
//
// Mobile (< lg): single column, image above copy per step, no sticky
// panels, no parallax — plain stacked reveal-on-scroll per step instead
// (see MobileJourneyList below).
//
// Reduced motion: skips the scroll-scrubbed crossfade/scale/parallax
// entirely and renders the same single-column stacked list used on
// mobile, with instant (near-zero-duration) reveal transitions instead of
// continuous scroll-linked motion.
//
// Navbar is a floating logo + menu button (no fixed full-width bar), so
// the sticky panel here pins at `top-0`/full viewport height — nothing
// fixed above it to clear.

// Staggered reveal for the copy panel's children (eyebrow, heading,
// description, stat) — each animates in individually rather than the
// whole block fading as one unit.
const copyContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const copyItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] } },
};

export default function JourneyScrollSection({ steps, onStepChange }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Maps continuous scroll progress (0..1) across the whole pinned section
  // to a discrete active step index — this is what "reverses naturally"
  // scrolling back up, since it's derived from scrollYProgress on every
  // frame rather than a one-shot IntersectionObserver trigger.
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const rawIndex = Math.min(steps.length - 1, Math.floor(latest * steps.length));
    setActiveIndex((prev) => {
      if (prev === rawIndex) return prev;
      onStepChange?.(rawIndex, steps[rawIndex]);
      return rawIndex;
    });
  });

  // Local progress (0..1) within just the current step's own scroll
  // segment — resets at every step boundary rather than climbing across
  // the whole section. Drives the subtle image parallax (translateY) and
  // the thin edge progress indicator; both stay tied to live scroll
  // position, not a one-shot trigger, so they scrub smoothly forward and
  // in reverse exactly like the crossfade above.
  const stepProgress = useTransform(scrollYProgress, (latest) => {
    const scaled = latest * steps.length;
    return scaled - Math.floor(scaled);
  });
  const imageParallaxY = useTransform(stepProgress, [0, 1], ['-2.5%', '2.5%']);

  if (reduceMotion) {
    return <MobileJourneyList steps={steps} isReducedMotion />;
  }

  return (
    <>
      {/* Desktop / large-viewport pinned experience — hidden below lg so
          mobile never receives a forced sticky layout or scroll-jacked
          height (per spec: "do not force a large sticky layout on small
          screens"). */}
      <div ref={containerRef} className="hidden lg:block relative w-full" style={{ height: `${steps.length * 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-page">
          <div className="mx-auto max-w-[1680px] w-full h-full px-8 xl:px-14 flex items-stretch gap-12 xl:gap-20 py-16 xl:py-20">

            {/* Image — sticky large panel, the dominant element. Slight
                parallax (translateY tied to stepProgress) adds depth
                without ever revealing the frame edge, since object-cover
                already overflows the container. */}
            <div className="relative flex-[1.2] min-w-0 h-full rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
              <AnimatePresence mode="sync" initial={false}>
                <motion.img
                  key={steps[activeIndex].id}
                  src={steps[activeIndex].image}
                  alt={steps[activeIndex].label ?? steps[activeIndex].title}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                  style={{ y: imageParallaxY }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.12) 0%, transparent 30%, transparent 100%)' }}
              />
              <span className="absolute top-6 left-6 font-heading font-black text-[17px] text-white bg-brand-600 w-11 h-11 rounded-full flex items-center justify-center z-10 shadow-lg">
                {steps[activeIndex].step ?? activeIndex + 1}
              </span>

              {/* Thin vertical progress indicator — how much of the
                  current step has scrolled, resets each step. */}
              <div className="absolute top-6 right-6 bottom-6 w-[3px] rounded-full bg-white/25 z-10" aria-hidden="true">
                <motion.div
                  className="w-full rounded-full bg-white origin-top"
                  style={{ scaleY: stepProgress }}
                />
              </div>
            </div>

            {/* Right — sticky title, description, stat. Children stagger
                in individually (eyebrow, then heading, then description,
                then stat) rather than fading as one block, for a layered
                editorial feel. */}
            <div className="relative flex-1 min-w-0 h-full flex flex-col justify-center py-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={steps[activeIndex].id}
                  variants={copyContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-6"
                >
                  <motion.span variants={copyItemVariants} className="font-body text-[12px] font-bold uppercase tracking-widest text-brand-600">
                    Stage {steps[activeIndex].step ?? activeIndex + 1} · {steps[activeIndex].label}
                  </motion.span>
                  <motion.h3 variants={copyItemVariants} className="font-heading font-bold text-[32px] xl:text-[40px] text-heading leading-[1.12] tracking-tight m-0">
                    {steps[activeIndex].title ?? steps[activeIndex].tagline}
                  </motion.h3>
                  <motion.p variants={copyItemVariants} className="font-body text-[16px] text-surface-500 leading-[28px] m-0 max-w-[42ch]">
                    {steps[activeIndex].description}
                  </motion.p>
                  {steps[activeIndex].stat && (
                    <motion.div variants={copyItemVariants} className="inline-flex items-center gap-4 mt-3 p-4 bg-surface-50 border border-[#eee] rounded-[10px] self-start">
                      <span className="font-heading font-bold text-[26px] text-brand-600 leading-none">
                        {steps[activeIndex].stat.value}
                      </span>
                      <span className="font-body text-[12px] text-surface-500 leading-tight max-w-[160px]">
                        {steps[activeIndex].stat.label}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet — plain single-column stacked layout */}
      <div className="lg:hidden">
        <MobileJourneyList steps={steps} />
      </div>
    </>
  );
}

// Shared mobile layout — image above content, reveal-on-scroll (not
// scroll-scrubbed), no sticky panels, no parallax. Also used verbatim for
// the reduced-motion desktop fallback per spec (heavy/continuous
// scroll-linked motion is skipped for prefers-reduced-motion users).
function MobileJourneyList({ steps, isReducedMotion = false }) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => (
        <article
          key={step.id}
          className={`w-full ${i !== steps.length - 1 ? 'border-b border-[#eee]' : ''}`}
        >
          <div className="mx-auto max-w-[720px] w-full px-4 sm:px-6 py-[44px] lg:py-[56px] flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: isReducedMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: isReducedMotion ? 0.01 : 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="relative rounded-[18px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
              style={{ aspectRatio: '4 / 3' }}
            >
              <img
                src={step.image}
                alt={step.label ?? step.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 font-heading font-black text-[14px] text-white bg-brand-600 w-9 h-9 rounded-full flex items-center justify-center">
                {step.step ?? i + 1}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: isReducedMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: isReducedMotion ? 0.01 : 0.5, ease: [0.25, 1, 0.5, 1], delay: isReducedMotion ? 0 : 0.08 }}
              className="flex flex-col gap-3"
            >
              <span className="font-body text-[11.5px] font-bold uppercase tracking-widest text-brand-600">
                Stage {step.step ?? i + 1} · {step.label}
              </span>
              <h3 className="font-heading font-bold text-[24px] text-heading leading-[1.2] tracking-tight m-0">
                {step.title ?? step.tagline}
              </h3>
              <p className="font-body text-[14.5px] text-surface-500 leading-[25px] m-0">
                {step.description}
              </p>
              {step.stat && (
                <div className="inline-flex items-center gap-3 mt-1 p-3.5 bg-surface-50 border border-[#eee] rounded-[10px] self-start">
                  <span className="font-heading font-bold text-[19px] text-brand-600 leading-none">
                    {step.stat.value}
                  </span>
                  <span className="font-body text-[11px] text-surface-500 leading-tight max-w-[140px]">
                    {step.stat.label}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </article>
      ))}
    </div>
  );
}
