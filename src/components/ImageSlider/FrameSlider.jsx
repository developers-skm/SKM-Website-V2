import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const variants = {
  enter: (d) => ({ x: d > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (d) => ({ x: d > 0 ? '-100%' : '100%' }),
};

/**
 * Compact sliding gallery that fills a single photo frame. It can run on its
 * own, or be controlled (`index` + `onIndexChange`) so several frames move in
 * step - see useSyncedSlides. Controlled frames leave autoplay to the parent.
 */
export default function FrameSlider({
  images,
  index: controlledIndex,
  onIndexChange,
  onHoverChange,
  label,
  interval = 4500,
  aspectRatio = '4/3',
}) {
  const reduceMotion = useReducedMotion();
  const controlled = controlledIndex !== undefined;
  const [ownIndex, setOwnIndex] = useState(0);
  const index = controlled ? controlledIndex : ownIndex;
  const pausedRef = useRef(false);
  const prevRef = useRef(index);
  const count = images.length;

  // Direction follows the change in index, so autoplay always slides forward
  // and "previous" slides back (wrapping counts as forward/back too).
  const direction = (() => {
    const p = prevRef.current;
    if (p === index) return 1;
    if (p === count - 1 && index === 0) return 1;
    if (p === 0 && index === count - 1) return -1;
    return index > p ? 1 : -1;
  })();
  useEffect(() => { prevRef.current = index; }, [index]);

  const setIndex = (i) => {
    const next = (i + count) % count;
    if (controlled) onIndexChange?.(next);
    else setOwnIndex(next);
  };

  useEffect(() => {
    if (controlled || reduceMotion || count < 2) return undefined;
    const id = setInterval(() => {
      if (!pausedRef.current) setOwnIndex((i) => (i + 1) % count);
    }, interval);
    return () => clearInterval(id);
  }, [controlled, count, interval, reduceMotion]);

  const hover = (v) => { pausedRef.current = v; onHoverChange?.(v); };

  return (
    <div
      className="group relative w-full overflow-hidden rounded-2xl bg-surface-100"
      style={{ aspectRatio }}
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
      onFocus={() => hover(true)}
      onBlur={() => hover(false)}
      role="group"
      aria-roledescription="carousel"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          src={images[index].src}
          alt={images[index].alt}
          decoding="async"
          transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {label && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 font-heading text-[11px] font-bold uppercase tracking-[0.08em] text-heading shadow-sm">
          {label}
        </span>
      )}

      {count > 1 && (
        <>
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => setIndex(index + dir)}
              aria-label={dir < 0 ? 'Previous photo' : 'Next photo'}
              className={`absolute top-1/2 -translate-y-1/2 ${dir < 0 ? 'left-3' : 'right-3'} z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-heading shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 hover:bg-brand-600 hover:text-white transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points={dir < 0 ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
              </svg>
            </button>
          ))}
          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
                className={`h-[6px] rounded-full transition-all duration-300 cursor-pointer ${i === index ? 'w-6 bg-white' : 'w-[6px] bg-white/60 hover:bg-white/90'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
