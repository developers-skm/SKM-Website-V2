import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import homeJourneyStages from '../../../data/homeJourneyStages';

// ─────────────────────────────────────────────────────────────────
// HomeJourney — "Farm-to-product journey" section.
//
// Rebuilt to match the same center vertical-timeline pattern used by
// TraceabilityLoopJourney.jsx ("How X Is Made", src/components/
// Traceability/TraceabilityLoopJourney.jsx) — alternating image/content
// rows either side of a numbered node timeline, a scroll-linked progress
// line (simple scaleY transform, not a pinned/scrubbed section), and
// one-time IntersectionObserver fade-ins per row. Same visual language,
// same easing token, same desktop/mobile split — fed with this section's
// own 8-stage homeJourneyStages data instead of processChapters.
// ─────────────────────────────────────────────────────────────────

const EASE_PRECISE = [0.22, 1, 0.36, 1];

// ─────────────────────────────────────────────────────────────────
// Stage Image
// ─────────────────────────────────────────────────────────────────
function StageImage({ stage }) {
  const [imgFailed, setImgFailed] = useState(false);
  const hasImage = Boolean(stage.image) && !imgFailed;

  return (
    <div className="w-full aspect-[4/3] relative overflow-hidden rounded-[20px] border border-[#ECECEC] bg-[#F7F7F5] shadow-xs flex items-center justify-center group">
      {hasImage ? (
        <>
          <img
            src={stage.image}
            alt={stage.label}
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.015]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-40 pointer-events-none" />
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#888888] font-mono text-[13px] p-6 text-center" aria-hidden="true">
          <span>{stage.label}</span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Stage Content
// ─────────────────────────────────────────────────────────────────
function StageContent({ stage, index, totalStages, entered, onPageChange }) {
  const stepLabel = String(index + 1).padStart(2, '0');
  const highlights = [stage.whatIsControlled, stage.recordsAndChecks].filter(Boolean);

  return (
    <div className="flex flex-col gap-4 sm:gap-5 justify-center">
      {/* Step Number + Category */}
      <div className="flex items-baseline gap-4">
        <span
          className="font-mono text-[48px] sm:text-[56px] font-extralight leading-none select-none tabular-nums"
          style={{ color: '#E0E0E0', opacity: entered ? 0.18 : 0 }}
        >
          {stepLabel}
        </span>
        <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#999999]">
          Stage {stepLabel} / {String(totalStages).padStart(2, '0')}
        </span>
      </div>

      {/* Title with hover underline */}
      <div className="relative self-start group/title">
        <h3 className="font-heading font-semibold text-[22px] sm:text-[26px] lg:text-[28px] text-[#111111] leading-[1.25] m-0 transition-colors duration-200 group-hover/title:text-[#2a2a2a]">
          {stage.label}
        </h3>
        <span className="absolute left-0 -bottom-0.5 w-full h-[1.5px] bg-[#E40A18] scale-x-0 group-hover/title:scale-x-100 origin-left transition-transform duration-300" />
      </div>

      {/* Narrative */}
      <p className="font-body text-[15px] sm:text-[15.5px] text-[#666666] leading-[1.85] m-0">
        {stage.whatHappens}
      </p>

      {/* Highlights (what is controlled / records & checks) */}
      {highlights.length > 0 && (
        <div className="flex flex-col gap-2 pt-1">
          {highlights.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[13.5px] sm:text-[14px] text-[#444444] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E40A18] flex-shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}

      {stage.route && stage.ctaLabel && (
        <div className="pt-1">
          <InternalLink
            route={stage.route}
            onPageChange={onPageChange}
            className="group inline-flex items-center gap-2 font-body font-semibold text-[14px] text-[#E40A18] hover:text-brand-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
          >
            <span>{stage.ctaLabel}</span>
            <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor" className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true">
              <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
              <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
            </svg>
          </InternalLink>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Timeline Node Center Circle
// ─────────────────────────────────────────────────────────────────
function NodeCircle({ step, isActive, isCompleted }) {
  return (
    <div
      className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono text-[13px] font-semibold transition-all duration-300 bg-white relative z-10 shadow-xs ${
        isActive
          ? 'border-[#E40A18] text-[#111111]'
          : isCompleted
          ? 'border-[#E40A18] text-[#E40A18]'
          : 'border-[#D6D6D6] text-[#999999]'
      }`}
    >
      {isActive ? (
        <span className="relative flex items-center justify-center w-full h-full">
          <span className="text-[12px] font-medium text-[#999999] opacity-35 select-none">{step}</span>
          <span className="absolute w-2.5 h-2.5 rounded-full bg-[#E40A18]" />
        </span>
      ) : isCompleted ? (
        <span className="text-[13px] font-bold text-[#E40A18]">✓</span>
      ) : (
        step
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Desktop Row — 3-column grid: Left | Center Node (80px) | Right
// ─────────────────────────────────────────────────────────────────
function DesktopRow({ stage, index, totalStages, isActive, isCompleted, onVisible, onPageChange, reducedMotion }) {
  const rowRef = useRef(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!entered) setEntered(true);
          onVisible(index);
        }
      },
      { threshold: 0, rootMargin: '-40% 0px -40% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [entered, index, onVisible]);

  const isImageLeft = index % 2 === 0;
  const leftX = reducedMotion ? 0 : -20;
  const rightX = reducedMotion ? 0 : 20;

  const leftTransition = { duration: 0.65, ease: EASE_PRECISE, delay: 0 };
  const rightTransition = { duration: 0.65, ease: EASE_PRECISE, delay: reducedMotion ? 0 : 0.08 };

  const stepLabel = String(index + 1).padStart(2, '0');

  return (
    <div ref={rowRef} className="grid grid-cols-[1fr_80px_1fr] gap-8 items-center py-10 lg:py-12 relative">
      <motion.div
        initial={{ opacity: 0, x: leftX }}
        animate={entered ? { opacity: 1, x: 0 } : {}}
        transition={leftTransition}
      >
        {isImageLeft
          ? <StageImage stage={stage} />
          : <StageContent stage={stage} index={index} totalStages={totalStages} entered={entered} onPageChange={onPageChange} />}
      </motion.div>

      <div className="flex flex-col items-center justify-center relative h-full">
        <NodeCircle step={stepLabel} isActive={isActive} isCompleted={isCompleted} />
      </div>

      <motion.div
        initial={{ opacity: 0, x: rightX }}
        animate={entered ? { opacity: 1, x: 0 } : {}}
        transition={rightTransition}
      >
        {isImageLeft
          ? <StageContent stage={stage} index={index} totalStages={totalStages} entered={entered} onPageChange={onPageChange} />
          : <StageImage stage={stage} />}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Mobile Stage — node + line on the left, image + content stacked right
// ─────────────────────────────────────────────────────────────────
function MobileStage({ stage, index, totalStages, isActive, isCompleted, onVisible, onPageChange, reducedMotion, isLast }) {
  const stageRef = useRef(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!entered) setEntered(true);
          onVisible(index);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [entered, index, onVisible]);

  const stepLabel = String(index + 1).padStart(2, '0');

  return (
    <div ref={stageRef} className="flex gap-4 relative py-6 border-b border-[#F0F0F0] last:border-none">
      <div className="flex flex-col items-center flex-shrink-0 w-10 relative">
        <NodeCircle step={stepLabel} isActive={isActive} isCompleted={isCompleted} />
        {!isLast && <div className="w-[1.5px] bg-[#E2E2E2] flex-1 my-2" />}
      </div>

      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
        animate={entered ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_PRECISE }}
        className="flex-1 flex flex-col gap-4"
      >
        <StageImage stage={stage} />
        <StageContent stage={stage} index={index} totalStages={totalStages} entered={entered} onPageChange={onPageChange} />
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main Export
// ─────────────────────────────────────────────────────────────────
export default function HomeJourney({ onPageChange }) {
  const reducedMotion = useReducedMotion() ?? false;
  const totalStages = homeJourneyStages.length;
  const [activeStage, setActiveStage] = useState(0);

  const headerRef = useRef(null);
  const [headerEntered, setHeaderEntered] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderEntered(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Continuous vertical progress line linking Stage 01 to the last stage
  const journeyContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: journeyContainerRef,
    offset: ['start 60%', 'end 60%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const handleVisible = useCallback((index) => {
    setActiveStage((prev) => (index > prev ? index : prev));
  }, []);

  const headerTransition = reducedMotion ? { duration: 0.15 } : { duration: 0.55, ease: EASE_PRECISE };

  return (
    <section className="w-full bg-[#FAFAF8] text-[#111111] py-20 sm:py-28 lg:py-32 border-y border-[#ECECEC] font-body transition-colors relative overflow-hidden">
      <div className="mx-auto max-w-[1360px] w-full px-5 sm:px-8 lg:px-12 flex flex-col gap-14 sm:gap-18 relative">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col gap-4 max-w-3xl relative z-10">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            animate={headerEntered ? { opacity: 1, y: 0 } : {}}
            transition={{ ...headerTransition, delay: 0 }}
          >
            <span className="w-5 h-[2px] bg-[#E40A18]" aria-hidden="true" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#888888]">OUR JOURNEY</span>
          </motion.div>

          <motion.h2
            className="font-heading font-semibold text-[34px] sm:text-[44px] lg:text-[50px] text-[#111111] leading-[1.1] tracking-tight m-0"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            animate={headerEntered ? { opacity: 1, y: 0 } : {}}
            transition={{ ...headerTransition, delay: reducedMotion ? 0 : 0.08 }}
          >
            Farm-to-product journey
          </motion.h2>

          <motion.p
            className="font-body text-[16px] sm:text-[17px] text-[#666666] leading-[1.9] m-0 max-w-xl"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            animate={headerEntered ? { opacity: 1, y: 0 } : {}}
            transition={{ ...headerTransition, delay: reducedMotion ? 0 : 0.16 }}
          >
            From biosecure layer farms and pathogen-free feed formulation to automated processing, NABL analytical testing, and global packaging dispatch.
          </motion.p>
        </div>

        {/* Journey — Center Vertical Timeline Layout */}
        <div ref={journeyContainerRef} className="relative z-10">
          {/* Desktop */}
          <div className="hidden lg:block relative">
            <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-[1px] bg-[#DDDDDD] z-0 pointer-events-none" />
            {!reducedMotion && (
              <motion.div
                style={{ scaleY: lineScaleY }}
                className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-[2px] bg-[#E40A18] origin-top z-0 pointer-events-none"
              />
            )}
            <div className="flex flex-col">
              {homeJourneyStages.map((stage, index) => (
                <DesktopRow
                  key={stage.id}
                  stage={stage}
                  index={index}
                  totalStages={totalStages}
                  isActive={index === activeStage}
                  isCompleted={index < activeStage}
                  onVisible={handleVisible}
                  onPageChange={onPageChange}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col gap-2">
            {homeJourneyStages.map((stage, index) => (
              <MobileStage
                key={stage.id}
                stage={stage}
                index={index}
                totalStages={totalStages}
                isActive={index === activeStage}
                isCompleted={index < activeStage}
                onVisible={handleVisible}
                onPageChange={onPageChange}
                reducedMotion={reducedMotion}
                isLast={index === totalStages - 1}
              />
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-8 border-t border-[#ECECEC] flex flex-wrap items-center justify-between gap-4 relative z-10">
          <InternalLink
            route="traceability"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-[#E40A18] hover:bg-brand-700 text-white font-body font-semibold text-[15px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
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
