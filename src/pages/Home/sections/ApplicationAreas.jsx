import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import applications from '../../../data/applications';
import InternalLink from '../../../components/common/InternalLink';
import { getProductById } from '../../../data/products';
import { fadeUp, EASE_PREMIUM } from '../../../utils/motionTokens';
import SafeImage from '../../../components/common/SafeImage';

// Applications — premium editorial food spread. One dominant image
// (~60% width on desktop) crossfades to match whichever application row is
// active; the remaining applications render as a numbered editorial index
// (thin rules, numbering, typography) rather than a card grid. Same 4 real
// `applications` records, routes and matched-product counts as the
// original carousel version — presentation only, no content changes.
//
// Autoplay: the featured image was previously static unless a user
// actively hovered a row (so on load/mobile/no-hover it just sat on the
// first application forever). Now it advances on its own every 3.5s,
// looping through all 4 applications, and pauses while the user is
// hovering/focusing a row so it doesn't fight manual interaction. Disabled
// entirely under prefers-reduced-motion.
const AUTOPLAY_INTERVAL_MS = 3500;

function matchedCount(app) {
  return app.matchedProductIds.map(getProductById).filter(Boolean).length;
}

function ApplicationRow({ app, index, isActive, onActivate, onPageChange, reduceMotion }) {
  return (
    <motion.div
      {...fadeUp(reduceMotion, { distance: 18, delay: 0.25 + index * 0.09 })}
      className={index === 0 ? 'border-t border-surface-200/70 dark:border-surface-800' : ''}
    >
      <InternalLink
        route={app.page}
        onPageChange={onPageChange}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        className="group flex items-start gap-5 py-6 border-b border-surface-200/70 dark:border-surface-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
        aria-label={`Explore ${app.title} applications`}
      >
        <span className={`font-body text-[13px] pt-1 tabular-nums transition-colors duration-300 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-surface-400 dark:text-surface-600'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <h3 className={`font-heading font-bold text-[20px] sm:text-[23px] leading-[1.3] m-0 transition-colors duration-300 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-heading dark:text-white'}`}>
            {app.title}
          </h3>
          <p
            className={`font-body text-[14px] sm:text-[14.5px] text-surface-500 dark:text-surface-400 leading-[1.55] max-w-md transition-opacity duration-300 ${isActive ? 'lg:opacity-100' : 'lg:opacity-60'}`}
          >
            {app.problem}
          </p>
        </div>

        <svg
          width="13" height="13" viewBox="0 0 10 10" fill="currentColor"
          className={`flex-shrink-0 mt-1.5 transition-all duration-300 ${isActive ? 'text-brand-600 dark:text-brand-400 translate-x-1.5' : 'text-surface-300 dark:text-surface-700'}`}
          aria-hidden
        >
          <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
          <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
        </svg>
      </InternalLink>
    </motion.div>
  );
}

export default function ApplicationAreas({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(applications[0]?.id);
  const [isPaused, setIsPaused] = useState(false);
  const active = applications.find((a) => a.id === activeId) ?? applications[0];

  const activateById = useCallback((id) => {
    setActiveId(id);
  }, []);

  // Autoplay — advances to the next application every 3.5s, looping
  // continuously (including 4th → 1st, not stopping there). Pauses only
  // while the user is actively hovering/focusing a row, then resumes the
  // loop once they move away — it never overrides what's on screen mid-hover,
  // but a one-time hover doesn't kill the loop forever either.
  useEffect(() => {
    if (reduceMotion || isPaused) return undefined;
    const id = setInterval(() => {
      setActiveId((prev) => {
        const currentIndex = applications.findIndex((a) => a.id === prev);
        const nextIndex = (currentIndex + 1) % applications.length;
        return applications[nextIndex].id;
      });
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduceMotion, isPaused]);

  return (
    <div id="application-selector" className="w-full bg-white dark:bg-surface-900/40 pt-24 pb-24 lg:pt-32 lg:pb-32 scroll-mt-[100px] xl:scroll-mt-[120px]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">

        <motion.div {...fadeUp(reduceMotion)} className="flex flex-col gap-4 max-w-2xl mb-12 lg:mb-16">
          <span className="section-label">Applications</span>
          <h2 className="font-heading font-bold text-[38px] sm:text-[52px] lg:text-[62px] text-heading dark:text-white leading-[1.02] tracking-tight m-0">
            What we are applied for
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Dominant image — ~60% desktop, crossfades on active application. */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: EASE_PREMIUM }}
            className="lg:col-span-7 relative rounded-[8px] overflow-hidden aspect-[5/4] lg:aspect-[6/5]"
          >
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.65, ease: EASE_PREMIUM }}
                className="absolute inset-0"
              >
                <SafeImage
                  src={active.image}
                  alt={active.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 lg:p-12">
              <span className="font-body text-[11.5px] font-semibold uppercase tracking-[0.2em] text-white/70">
                {active.tags.join(' · ')}
              </span>
              <h3 className="mt-3 font-heading font-bold text-[26px] sm:text-[32px] lg:text-[36px] text-white leading-[1.1] tracking-tight m-0 max-w-md">
                {active.title}
              </h3>
              <InternalLink
                route={active.page}
                onPageChange={onPageChange}
                className="group mt-5 inline-flex items-center gap-2.5 font-body font-semibold text-[14px] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
              >
                Explore {matchedCount(active)} matching {matchedCount(active) === 1 ? 'product' : 'products'}
                <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor" className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden>
                  <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
                  <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
                </svg>
              </InternalLink>
            </div>
          </motion.div>

          {/* Editorial index — numbered rows, thin rules, no cards */}
          <div
            className="lg:col-span-5 flex flex-col"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {applications.map((app, i) => (
              <ApplicationRow
                key={app.id}
                app={app}
                index={i}
                isActive={app.id === active.id}
                onActivate={() => activateById(app.id)}
                onPageChange={onPageChange}
                reduceMotion={reduceMotion}
              />
            ))}

            <motion.div {...fadeUp(reduceMotion, { delay: 0.6 })} className="mt-8">
              <InternalLink
                route="applications"
                onPageChange={onPageChange}
                className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-white dark:bg-surface-900 border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.05em] transition-all duration-[250ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                View All Applications
              </InternalLink>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
