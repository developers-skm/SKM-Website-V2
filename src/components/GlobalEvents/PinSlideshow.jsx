import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_PREMIUM } from '../../utils/motionTokens';
import { imageVariant } from './journeyUtils';

const SLIDE_MS = 2800;

const slide = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%' }),
};
const fade = { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } };

const arrow =
  'absolute top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border-0 bg-white/92 text-heading shadow-[0_2px_10px_rgba(0,0,0,0.25)] cursor-pointer opacity-0 transition-opacity duration-300 hover:bg-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-brand-600 group-hover:opacity-100 [@media(hover:none)]:opacity-100';

// The event's photographs as an auto-sliding gallery (photos come from the
// event's `gallery` in globalEvents.js; falls back to its single `image`).
// Holds while the journey is paused; clicking a photo opens the event.
export default function PinSlideshow({ stop, paused, reduce, onOpen }) {
  const slides = useMemo(
    () => (stop.gallery?.length > 1 ? stop.gallery : [imageVariant(stop.image, 1200)].filter(Boolean)),
    [stop]
  );
  const n = slides.length;
  const [{ i, dir }, setPos] = useState({ i: 0, dir: 1 });

  const go = (d) => setPos((p) => ({ i: (p.i + d + n) % n, dir: d }));

  // Auto-advance; restarts after any manual change so it never double-jumps.
  useEffect(() => {
    if (paused || n < 2) return undefined;
    const t = setInterval(() => {
      if (!document.hidden) setPos((p) => ({ i: (p.i + 1) % n, dir: 1 }));
    }, SLIDE_MS);
    return () => clearInterval(t);
  }, [paused, n, i]);

  // Warm the next slide.
  useEffect(() => {
    if (n > 1) new Image().src = slides[(i + 1) % n];
  }, [i, n, slides]);

  return (
    <div className="group relative h-full w-full overflow-hidden rounded-[inherit] bg-surface-200">
      <AnimatePresence initial={false} custom={dir}>
        <motion.button
          key={i}
          type="button"
          custom={dir}
          variants={reduce ? fade : slide}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: reduce ? 0.2 : 0.7, ease: EASE_PREMIUM }}
          onClick={() => onOpen(stop)}
          aria-label={`Open ${stop.title} - photo ${i + 1} of ${n}`}
          className="absolute inset-0 cursor-pointer border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
        >
          <img src={slides[i]} alt={`${stop.title} - photo ${i + 1}`} className="h-full w-full object-cover" draggable="false" />
        </motion.button>
      </AnimatePresence>

      {n > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${arrow} left-2`}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${arrow} right-2`}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-12 items-end justify-center bg-gradient-to-t from-black/40 to-transparent pb-2">
            <div className="pointer-events-auto flex items-center">
              {slides.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setPos({ i: k, dir: k > i ? 1 : -1 })}
                  aria-label={`Show photo ${k + 1}`}
                  aria-current={k === i ? 'true' : undefined}
                  className="grid h-5 w-4 place-items-center border-0 bg-transparent p-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-300 ${k === i ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`} />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
