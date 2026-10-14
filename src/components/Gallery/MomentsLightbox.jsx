import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { animate, motion, AnimatePresence, useMotionValue, useReducedMotion } from 'framer-motion';
import useScrollLock from '../../hooks/useScrollLock';
import { imageProps, TYPE_LABEL } from './momentsUtils';
import { EASE } from './motionKit';
import { MaskText } from './MotionParts';

// Time each memory stays on screen while the slideshow plays.
const SLIDE_MS = 6500;
const pad = (n) => String(n).padStart(2, '0');

const btn =
  'grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm cursor-pointer transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

// Every memory enters with its own effect (cycled by position) so the show never
// feels repetitive, and its photograph moves in its own way (Ken Burns).
const FULL = 'inset(0 0 0 0)';
const EFFECTS = [
  { name: 'wipe', from: (d) => (d > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'), to: FULL },
  { name: 'iris', from: () => 'circle(0% at 50% 50%)', to: 'circle(150% at 50% 50%)' },
  { name: 'curtain', from: () => 'inset(100% 0 0 0)', to: FULL },
  { name: 'doors', from: () => 'inset(0 50% 0 50%)', to: FULL },
  { name: 'corner', from: (d) => (d > 0 ? 'circle(0% at 100% 100%)' : 'circle(0% at 0% 100%)'), to: 'circle(150% at 50% 100%)' },
  { name: 'slit', from: () => 'inset(50% 0 50% 0)', to: FULL },
];
const MOVES = [
  { from: { scale: 1.14, x: '0%', y: '0%' }, to: { scale: 1.04, x: '-1.5%', y: '-1%' } },
  { from: { scale: 1.0, x: '0%', y: '0%' }, to: { scale: 1.12, x: '1%', y: '0.5%' } },
  { from: { scale: 1.1, x: '2%', y: '0%' }, to: { scale: 1.1, x: '-2%', y: '0%' } },
  { from: { scale: 1.2, x: '0%', y: '1.5%' }, to: { scale: 1.05, x: '0%', y: '-1.5%' } },
  { from: { scale: 1.05, x: '-1.5%', y: '1%' }, to: { scale: 1.15, x: '1.5%', y: '-1%' } },
  { from: { scale: 1.16, x: '1.5%', y: '-1%' }, to: { scale: 1.03, x: '-1%', y: '1%' } },
];
const frame = {
  enter: ({ fx, d }) => ({ clipPath: EFFECTS[fx].from(d), opacity: 1 }),
  center: ({ fx }) => ({ clipPath: EFFECTS[fx].to, opacity: 1 }),
  exit: { opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: EASE } },
};

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'left' ? 'm15 5-7 7 7 7' : 'm9 5 7 7-7 7'} />
    </svg>
  );
}

function PlayPause({ playing }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13l11-6.5z" />}
    </svg>
  );
}

// `items` is the full chronological list, so previous / next follow time.
export default function MomentsLightbox({ items, index, onIndex, onClose }) {
  const reduce = useReducedMotion();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const openerRef = useRef(null);
  const total = items.length;
  const moment = items[index];
  const img = imageProps(moment.image, 1920);

  const [dir, setDir] = useState(1);
  const [playing, setPlaying] = useState(!reduce);
  const [holding, setHolding] = useState(false);
  const progress = useMotionValue(0);

  useScrollLock(true);

  const go = useCallback(
    (d) => {
      setDir(d);
      onIndex((index + d + total) % total);
    },
    [index, total, onIndex]
  );

  // Slideshow clock: fills the progress bar, then advances. Pausing (button, or
  // holding the photo) freezes it mid-way and resuming continues from there.
  const running = playing && !holding;
  useEffect(() => {
    progress.set(0);
  }, [index, progress]);
  useEffect(() => {
    if (!running) return undefined;
    const left = SLIDE_MS * (1 - progress.get());
    const controls = animate(progress, 1, {
      duration: left / 1000,
      ease: 'linear',
      onComplete: () => go(1),
    });
    return () => controls.stop();
  }, [running, index, go, progress]);

  // Focus handling: remember the opener, focus Close, restore on unmount.
  useEffect(() => {
    openerRef.current = document.activeElement;
    closeRef.current?.focus();
    return () => openerRef.current?.focus?.({ preventScroll: true });
  }, []);

  // Keyboard: ← → Esc, space = play / pause, and a Tab focus trap.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === ' ' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.key === 'Tab') {
        const f = dialogRef.current?.querySelectorAll('button');
        if (!f?.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // Releasing the pointer anywhere resumes a held (paused) slide.
  useEffect(() => {
    const release = () => setHolding(false);
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    return () => {
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
    };
  }, []);

  // Pause while the tab is in the background.
  useEffect(() => {
    const onVis = () => document.hidden && setPlaying(false);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Warm the neighbours so the next memory is ready when it wipes in.
  useEffect(() => {
    [-1, 1, 2].forEach((d) => {
      const n = items[(index + d + total) % total];
      if (n) new Image().src = imageProps(n.image, 1920).src;
    });
  }, [index, items, total]);

  // Ken Burns direction alternates so consecutive memories do not feel the same.
  const fx = index % EFFECTS.length;
  const move = MOVES[index % MOVES.length];
  const custom = { fx, d: dir };

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Moment viewer: ${moment.title}`}
      className="fixed inset-0 z-[200] flex flex-col overflow-hidden bg-[#0a0a0a] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.4 }}
    >
      {/* Ambient backdrop: the current photograph, enlarged and softened */}
      <AnimatePresence initial={false}>
        <motion.img
          key={`bg-${moment.id}`}
          src={imageProps(moment.image, 640).src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover blur-[60px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 1.2, ease: 'easeInOut' }}
        />
      </AnimatePresence>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/80" />

      {/* Slide timer */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 z-20 h-[3px] bg-white/10">
        <motion.span className="block h-full origin-left bg-gold-400" style={{ scaleX: progress }} />
      </span>

      <div className="relative z-10 flex items-center justify-between px-4 pt-5 sm:px-8 sm:pt-7">
        <div className="flex items-center gap-4">
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] tabular-nums text-white/75" aria-live="polite">
            {pad(index + 1)} <span className="text-white/35">/</span> {pad(total)}
          </span>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
            className={`${btn} h-10 w-10`}
          >
            <PlayPause playing={playing} />
          </button>
        </div>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close viewer" className={btn}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div
        className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-24"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <button type="button" onClick={() => go(-1)} aria-label="Previous moment" className={`${btn} absolute left-3 z-20 hidden sm:left-8 sm:grid`}>
          <Chevron dir="left" />
        </button>

        <div className="relative h-full w-full">
          <AnimatePresence initial={false} custom={custom}>
            <motion.div
              key={moment.id}
              custom={custom}
              variants={reduce ? undefined : frame}
              initial={reduce ? { opacity: 0 } : 'enter'}
              animate={reduce ? { opacity: 1 } : 'center'}
              exit={reduce ? { opacity: 0 } : 'exit'}
              transition={{ duration: fx === 1 || fx === 4 ? 1.3 : 1.05, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 grid place-items-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) go(1);
                else if (info.offset.x > 70) go(-1);
              }}
              onPointerDown={() => setHolding(true)}
            >
              <div
                className="relative overflow-hidden rounded-[12px] shadow-[0_30px_100px_rgba(0,0,0,0.6)] h-[min(calc(100svh-215px),calc((100vw-2rem)/var(--r)))] sm:h-[min(calc(100svh-140px),calc((100vw-11rem)/var(--r)))]"
                style={{ '--r': img.ratio, aspectRatio: img.ratio }}
              >
                <motion.img
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes="100vw"
                  alt={moment.alt}
                  width={img.width}
                  height={img.height}
                  draggable={false}
                  className="block h-full w-full select-none object-cover"
                  initial={reduce ? false : move.from}
                  animate={reduce ? undefined : move.to}
                  transition={{ duration: SLIDE_MS / 1000 + 1.2, ease: 'linear' }}
                />
                {/* Soft light sweep as the memory settles */}
                {!reduce && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    initial={{ x: '-140%' }}
                    animate={{ x: '320%' }}
                    transition={{ duration: 1.6, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
                {/* Caption lives on the photograph so it moves with its slide */}
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 min-w-0 p-4 sm:p-8 lg:p-10"
          initial={reduce ? false : 'hidden'}
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { delayChildren: 0.45, staggerChildren: 0.12 } } }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0, x: -18 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } } }}
            className="flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400"
          >
            <span className="h-[2px] w-8 bg-gold-400" aria-hidden="true" />
            {[moment.label, TYPE_LABEL[moment.type]].filter(Boolean).join('  ·  ')}
          </motion.span>
          <h2 aria-label={moment.title} className="mt-2 mb-0 font-heading text-[20px] font-bold leading-tight sm:text-[34px]">
            <MaskText text={moment.title} stagger={0.07} duration={0.9} />
          </h2>
          {moment.caption && (
            <motion.p
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              className="mt-2 mb-0 max-w-[70ch] font-body text-[13px] text-white/70 sm:text-[15px]"
            >
              {moment.caption}
            </motion.p>
          )}
        </motion.div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button type="button" onClick={() => go(1)} aria-label="Next moment" className={`${btn} absolute right-3 z-20 hidden sm:right-8 sm:grid`}>
          <Chevron dir="right" />
        </button>
      </div>

      <div className="relative z-10 flex justify-center gap-3 px-4 pb-5 sm:hidden">
        <button type="button" onClick={() => go(-1)} aria-label="Previous moment" className={btn}><Chevron dir="left" /></button>
        <button type="button" onClick={() => go(1)} aria-label="Next moment" className={btn}><Chevron dir="right" /></button>
      </div>
    </motion.div>,
    document.body
  );
}
