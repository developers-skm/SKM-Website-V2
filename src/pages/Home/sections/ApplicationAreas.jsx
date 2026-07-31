import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import applications from '../../../data/applications';
import ApplicationCard from './ApplicationCard';
import InternalLink from '../../../components/common/InternalLink';
import { containerVariants, itemVariants } from '../../../utils/animationVariants';

// Application Finder / product-finding tool. Only 4 of the 6 approved
// category labels (Bakery and confectionery / Mayonnaise, sauces and
// dressings / Noodles and pasta / Meat, fish and surimi) have complete
// approved data, images, routes, and product mappings in
// src/data/applications.js. Protein and nutrition / Other industrial
// applications have none of that yet — no image, no technical-need text,
// no product mapping, no route — so per the missing-category rule they are
// not rendered (no invented content, no reused image, no fake destination).
//
// Cards themselves (ApplicationCard) are unchanged — this section only
// controls the carousel mechanics. Unlike an opacity/scale crossfade (which
// reads as a sudden cut), this renders one continuous strip of cards
// (`applications` repeated 3x so there's always a real card off-screen on
// both sides) and animates the strip's x position with a real slide on
// every step — autoplay every 3.5s continuously, plus drag/swipe.
//
// `isAnimatingRef` is a hard lock: autoplay, dot-clicks, and drag can only
// ever queue ONE step forward (right-to-left) at a time. Without it, an
// autoplay tick landing while the previous slide's transition/state update
// hadn't settled yet could stack two `step(1)` calls back to back, which
// visually reads as "sometimes jumps 2 cards instead of 1". The lock is
// released only in `handleSlideComplete`, i.e. once the previous move has
// fully finished and (if needed) the infinite-loop snap has happened.
const AUTOPLAY_INTERVAL_MS = 3500;
const SLIDE_TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] };

function useCardsPerView() {
  const [count, setCount] = useState(() =>
    typeof window === 'undefined' ? 3 : getCountForWidth(window.innerWidth)
  );

  useEffect(() => {
    const onResize = () => setCount(getCountForWidth(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return count;
}

function getCountForWidth(width) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

export default function ApplicationAreas({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  const cardsPerView = useCardsPerView();
  const total = applications.length;

  // `centerIndex` walks a virtual, non-wrapping sequence over the strip's
  // middle copy of `applications` (indices [total, 2*total)). The strip
  // itself never re-keys or wraps mid-animation — only after a slide
  // completes do we silently snap centerIndex back into the middle copy's
  // range, so the loop has no visible jump.
  const [centerIndex, setCenterIndex] = useState(total);
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = useRef(null);
  const cardRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const strip = [...applications, ...applications, ...applications];

  useLayoutEffect(() => {
    if (!cardRef.current) return;
    const update = () => setTrackWidth(cardRef.current?.offsetWidth ?? 0);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, [cardsPerView]);

  // Advances exactly one position, right-to-left, and only if no
  // transition is currently in flight — this is what prevents skipped or
  // stacked positions.
  const stepForward = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setCenterIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (total <= 1 || reduceMotion) return undefined;
    const id = setInterval(stepForward, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [total, reduceMotion, stepForward]);

  // After each slide settles, if we've drifted into the first or last
  // copy of the strip, snap (no animation) back to the equivalent index
  // in the middle copy — this is what makes the loop infinite. Only after
  // this settle do we release the lock, so the next step can't start
  // until the current one (including the snap) has fully finished.
  const handleSlideComplete = useCallback(() => {
    setCenterIndex((prev) => {
      if (prev < total) return prev + total;
      if (prev >= total * 2) return prev - total;
      return prev;
    });
    isAnimatingRef.current = false;
  }, [total]);

  const handleDragEnd = (_, info) => {
    const SWIPE_THRESHOLD = 60;
    if (info.offset.x <= -SWIPE_THRESHOLD) stepForward();
  };

  const gap = 24; // matches gap-6 (lg) — used for the pixel-accurate offset math
  const cardStep = trackWidth + gap;
  const activeStripIndex = centerIndex; // slot currently centered
  const offsetToCenter = -(activeStripIndex * cardStep) + (Math.floor(cardsPerView / 2) * cardStep);

  return (
    <div id="application-selector" className="w-full bg-white dark:bg-surface-900/40 pt-16 pb-10 lg:pt-24 lg:pb-16 xl:pt-28 xl:pb-20 scroll-mt-[100px] xl:scroll-mt-[120px]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto mb-7 lg:mb-9">
          <h2 className="font-heading font-bold text-[34px] sm:text-[40px] lg:text-[44px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            What we are Applied?
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="relative w-full overflow-hidden py-4">
          <motion.div
            ref={trackRef}
            className="flex items-stretch gap-5 lg:gap-6"
            style={{ touchAction: 'pan-y', cursor: 'grab' }}
            drag={trackWidth ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            animate={{ x: trackWidth ? offsetToCenter : 0 }}
            transition={reduceMotion ? { duration: 0 } : SLIDE_TRANSITION}
            onAnimationComplete={handleSlideComplete}
          >
            {strip.map((app, index) => {
              const isActive = index === activeStripIndex;

              return (
                <motion.div
                  key={index}
                  ref={index === 0 ? cardRef : undefined}
                  animate={{
                    scale: isActive ? 1 : 0.92,
                  }}
                  transition={SLIDE_TRANSITION}
                  style={{
                    boxShadow: isActive ? '0 20px 44px rgba(36,30,24,0.16)' : 'none',
                  }}
                  className={`w-[78vw] sm:w-[46%] lg:w-[31%] flex-none rounded-[24px] transition-[z-index] ${isActive ? 'z-20' : 'z-10'}`}
                >
                  <ApplicationCard app={app} onPageChange={onPageChange} isActive={isActive} />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {total > 1 && (
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2.5 mt-8 lg:mt-10">
            {applications.map((app, index) => (
              <button
                key={app.id}
                type="button"
                onClick={() => {
                  if (isAnimatingRef.current) return;
                  isAnimatingRef.current = true;
                  setCenterIndex(total + index);
                }}
                aria-label={`Show ${app.title}`}
                aria-current={activeStripIndex % total === index}
                className={`rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
                  activeStripIndex % total === index
                    ? 'w-3 h-3 bg-brand-600'
                    : 'w-2.5 h-2.5 bg-surface-300 dark:bg-surface-700 hover:bg-brand-600/50'
                }`}
              />
            ))}
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="flex justify-center mt-10 lg:mt-12">
          <InternalLink
            route="applications"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-white dark:bg-surface-900 border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.05em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            View All Applications
          </InternalLink>
        </motion.div>
      </motion.div>
    </div>
  );
}
