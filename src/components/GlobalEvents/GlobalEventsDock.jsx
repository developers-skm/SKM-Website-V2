import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_PREMIUM } from '../../utils/motionTokens';

// The journey view is loaded the first time it is opened.
const EventsJourneyMap = lazy(() => import('./EventsJourneyMap'));

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2';

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Wraps the Global Reach world map. "Events & Expos →" opens a separate
// journey view (SKM Events Around the World) in the same place; the original
// map stays mounted underneath, so going back is instant and loses nothing.
export default function GlobalEventsDock({ children, onPageChange }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const openerRef = useRef(null);
  const [mode, setMode] = useState('map'); // 'map' | 'events'
  const [loaded, setLoaded] = useState(false);

  const open = useCallback(() => {
    setLoaded(true);
    setMode('events');
    // The page scrolls as usual; only bring the map back if its top is off-screen.
    requestAnimationFrame(() => {
      const top = wrapRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) wrapRef.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  }, [reduce]);

  const close = useCallback(() => {
    setMode('map');
    requestAnimationFrame(() => openerRef.current?.focus({ preventScroll: true }));
  }, []);

  const events = mode === 'events';
  const fade = { duration: reduce ? 0.15 : 0.5, ease: EASE_PREMIUM };

  return (
    <div ref={wrapRef} className="relative scroll-mt-[90px]">
      {/* Normal Global Reach map (kept mounted) */}
      <motion.div
        className={events ? 'pointer-events-none absolute inset-x-0 top-0' : 'relative'}
        initial={false}
        animate={{ opacity: events ? 0 : 1 }}
        transition={fade}
        aria-hidden={events || undefined}
        inert={events}
      >
        <div className="relative">
          {children}
        </div>

        {/* Entry card under the map (all sizes) - below the map so it never covers a country */}
        <button
          ref={openerRef}
          type="button"
          onClick={open}
          aria-label="Open Events and Expos - SKM Events Around the World"
          className={`group mt-5 flex min-h-[72px] w-full items-center justify-between gap-4 rounded-[16px] border border-[#eee] border-l-[3px] border-l-brand-600 bg-white px-5 py-4 text-left shadow-[5px_3px_40px_rgba(0,72,88,0.08)] cursor-pointer ${focusRing}`}
        >
          <span>
            <span className="block font-heading text-[12px] font-bold uppercase tracking-[0.14em] text-heading">Events &amp; Expos</span>
            <span className="mt-1 block font-body text-[12.5px] text-surface-500">Follow SKM&rsquo;s journey across international exhibitions.</span>
          </span>
          <span className="text-brand-600 transition-transform duration-300 group-hover:translate-x-1">
            <Arrow />
          </span>
        </button>
      </motion.div>

      {/* Events journey */}
      {loaded && (
        <div className={events ? 'relative' : 'pointer-events-none invisible absolute inset-x-0 top-0'} aria-hidden={!events || undefined} inert={!events}>
          <Suspense fallback={<div className="h-[420px] rounded-[20px] border border-[#eee] bg-white" />}>
            <EventsJourneyMap active={events} onClose={close} onPageChange={onPageChange} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
