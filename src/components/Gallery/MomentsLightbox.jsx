import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { animate, motion, AnimatePresence, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import useScrollLock from '../../hooks/useScrollLock';
import { imageProps, TYPE_LABEL } from './momentsUtils';
import { EASE } from './motionKit';
import { MaskText } from './MotionParts';

// The viewer is a full-screen "journey story": each memory fills the screen,
// chapters follow the years, and a timeline rail along the bottom shows where
// you are in the journey. It plays by itself and can be paused or driven by hand.

const SLIDE_MS = 7000;
const pad = (n) => String(n).padStart(2, '0');
const chapterOf = (m) => m.year ?? (m.award ? 'Honours' : 'Archive');

const btn =
  'grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-md cursor-pointer transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

// Every memory enters with its own effect (cycled by position) so the show never
// feels repetitive, and its photograph moves in its own way (Ken Burns).
const FULL = 'inset(0 0 0 0)';
const EFFECTS = [
  { from: (d) => (d > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'), to: FULL },
  { from: () => 'circle(0% at 50% 50%)', to: 'circle(150% at 50% 50%)' },
  { from: () => 'inset(100% 0 0 0)', to: FULL },
  { from: () => 'inset(0 50% 0 50%)', to: FULL },
  { from: (d) => (d > 0 ? 'circle(0% at 100% 100%)' : 'circle(0% at 0% 100%)'), to: 'circle(150% at 50% 100%)' },
  { from: () => 'inset(50% 0 50% 0)', to: FULL },
];
const MOVES = [
  { from: { scale: 1.07, x: '0%', y: '0%' }, to: { scale: 1, x: '-0.5%', y: '0%' } },
  { from: { scale: 1, x: '0%', y: '0%' }, to: { scale: 1.06, x: '0.5%', y: '0%' } },
  { from: { scale: 1.04, x: '1%', y: '0%' }, to: { scale: 1.04, x: '-1%', y: '0%' } },
  { from: { scale: 1.06, x: '0%', y: '0.6%' }, to: { scale: 1.01, x: '0%', y: '-0.6%' } },
  { from: { scale: 1.01, x: '-0.8%', y: '0.5%' }, to: { scale: 1.07, x: '0.8%', y: '-0.5%' } },
  { from: { scale: 1.07, x: '0.8%', y: '-0.5%' }, to: { scale: 1, x: '-0.5%', y: '0.5%' } },
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

// One chapter (year) of the timeline rail; it fills as the slides inside it play.
function Chapter({ chapter, index, progress, active, onJump }) {
  const fill = useTransform(progress, (p) =>
    Math.min(1, Math.max(0, (index + p - chapter.start) / chapter.count))
  );
  return (
    <button
      type="button"
      onClick={() => onJump(chapter.start)}
      aria-label={`Go to ${chapter.label}`}
      aria-current={active ? 'true' : undefined}
      className="group flex min-w-0 flex-1 cursor-pointer flex-col gap-2 border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <span className="block h-[3px] w-full overflow-hidden rounded-full bg-white/25 transition-[height] duration-300 group-hover:h-[5px]">
        <motion.span
          className="block h-full origin-left bg-gold-400"
          style={{ scaleX: active ? fill : chapter.start < index ? 1 : 0 }}
        />
      </span>
      <span
        className={`truncate font-body text-[10px] font-bold uppercase tracking-[0.14em] transition-colors sm:text-[11px] ${
          active ? 'text-gold-400' : 'text-white/55 group-hover:text-white'
        }`}
      >
        {chapter.label}
      </span>
    </button>
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
  const next = items[(index + 1) % total];
  const img = imageProps(moment.image, 1920);

  const [dir, setDir] = useState(1);
  const [playing, setPlaying] = useState(!reduce);
  const [holding, setHolding] = useState(false);
  const [screen, setScreen] = useState(() => window.innerWidth / window.innerHeight);
  const progress = useMotionValue(0);

  useScrollLock(true);

  const chapters = useMemo(() => {
    const out = [];
    items.forEach((m, i) => {
      const label = chapterOf(m);
      const last = out[out.length - 1];
      if (last && last.label === label) last.count += 1;
      else out.push({ label, start: i, count: 1 });
    });
    return out;
  }, [items]);
  const chapterIdx = chapters.findIndex((c) => index >= c.start && index < c.start + c.count);

  const go = useCallback(
    (d) => {
      setDir(d);
      onIndex((index + d + total) % total);
    },
    [index, total, onIndex]
  );
  const jump = useCallback(
    (i) => {
      setDir(i >= index ? 1 : -1);
      onIndex(i);
    },
    [index, onIndex]
  );

  // Story clock: fills the timeline, then advances. Pausing (button, or holding
  // the photo) freezes it mid-way and resuming continues from there.
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

  // Screen shape decides which way the photo pans.
  useEffect(() => {
    const onResize = () => setScreen(window.innerWidth / window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
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

  const fx = index % EFFECTS.length;
  const move = MOVES[index % MOVES.length];
  const custom = { fx, d: dir };
  // Small or portrait pictures (e.g. award certificates) would blur if stretched
  // to the whole screen, so they are shown as a framed poster over the backdrop.
  // Full screen, nothing lost: the photo covers the whole screen and pans slowly
  // across its full height (or width), so every part of it is shown during the
  // slide. The direction alternates from one memory to the next.
  const panVertical = img.ratio < screen;
  const flip = index % 2 === 1;
  const [p0, p1] = panVertical ? ['50% 0%', '50% 100%'] : ['0% 50%', '100% 50%'];
  const pan = flip ? [p1, p0] : [p0, p1];
  const poster = img.ratio < 1 || (img.width ?? 0) < 1100;

  const rise = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Moment viewer: ${moment.title}`}
      className="fixed inset-0 z-[200] overflow-hidden bg-[#0a0a0a] text-white"
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
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover blur-[40px] saturate-125"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 1.2, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* The photograph(s) - full screen */}
      <AnimatePresence initial={false} custom={custom}>
        <motion.div
          key={moment.id}
          custom={custom}
          variants={reduce ? undefined : frame}
          initial={reduce ? { opacity: 0 } : 'enter'}
          animate={reduce ? { opacity: 1 } : 'center'}
          exit={reduce ? { opacity: 0 } : 'exit'}
          transition={{ duration: fx === 1 || fx === 4 ? 1.4 : 1.1, ease: [0.76, 0, 0.24, 1] }}
          className={`absolute inset-0 ${poster ? 'grid place-items-center px-4 pt-20 pb-44 sm:px-24 sm:pb-52' : ''}`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70) go(1);
            else if (info.offset.x > 70) go(-1);
          }}
          onPointerDown={() => setHolding(true)}
        >
          {poster ? (
            <div
              className="relative overflow-hidden rounded-[14px] shadow-[0_30px_100px_rgba(0,0,0,0.6)] ring-1 ring-white/20 h-[min(calc(100svh-17rem),calc((100vw-2rem)/var(--r)))] sm:h-[min(calc(100svh-18rem),calc((100vw-12rem)/var(--r)))]"
              style={{ '--r': img.ratio, aspectRatio: img.ratio }}
            >
              <motion.img
                src={img.src}
                srcSet={img.srcSet}
                sizes="100vw"
                alt={moment.alt}
                draggable={false}
                className="block h-full w-full select-none object-cover"
                initial={reduce ? false : move.from}
                animate={reduce ? undefined : move.to}
                transition={{ duration: SLIDE_MS / 1000 + 1.4, ease: 'linear' }}
              />
            </div>
          ) : (
            <motion.img
              src={img.src}
              srcSet={img.srcSet}
              sizes="100vw"
              alt={moment.alt}
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover"
              initial={reduce ? false : { objectPosition: pan[0] }}
              animate={reduce ? undefined : { objectPosition: pan[1] }}
              transition={{ duration: SLIDE_MS / 1000 + 1.2, ease: 'easeInOut' }}
              style={reduce ? { objectPosition: '50% 50%' } : undefined}
            />
          )}
          {/* Light sweep as the memory settles */}
          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-140%' }}
              animate={{ x: '320%' }}
              transition={{ duration: 1.8, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Cinematic grading so text is always readable */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/45" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-black/40 to-transparent" />

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 pt-5 sm:px-8 sm:pt-7">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] tabular-nums text-white/85" aria-live="polite">
            {pad(index + 1)} <span className="text-white/40">/</span> {pad(total)}
          </span>
          <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} className={`${btn} h-10 w-10`}>
            <PlayPause playing={playing} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous moment" className={`${btn} h-10 w-10 sm:hidden`}><Chevron dir="left" /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next moment" className={`${btn} h-10 w-10 sm:hidden`}><Chevron dir="right" /></button>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close viewer" className={btn}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </div>

      <button type="button" onClick={() => go(-1)} aria-label="Previous moment" className={`${btn} absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 sm:grid`}>
        <Chevron dir="left" />
      </button>
      <button type="button" onClick={() => go(1)} aria-label="Next moment" className={`${btn} absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 sm:grid`}>
        <Chevron dir="right" />
      </button>

      {/* Story text */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[84px] z-20 flex items-end justify-between gap-8 px-5 sm:bottom-[96px] sm:px-20 lg:px-28">
        <div className="min-w-0">
          <motion.div
            key={moment.id}
            initial={reduce ? false : 'hidden'}
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { delayChildren: 0.5, staggerChildren: 0.12 } } }}
            
          >
            <motion.span
              variants={{ hidden: { opacity: 0, x: -18 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } } }}
              className="flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400 sm:text-[12px]"
            >
              <span className="h-[2px] w-10 bg-gold-400" aria-hidden="true" />
              {[moment.label, TYPE_LABEL[moment.type]].filter(Boolean).join('  ·  ')}
            </motion.span>
            <h2 aria-label={moment.title} className="mt-2 mb-0 max-w-[24ch] font-heading text-[26px] font-bold leading-[1.08] tracking-tight sm:text-[44px] lg:text-[54px]">
              <MaskText text={moment.title} stagger={0.07} duration={0.9} />
            </h2>
            {moment.caption && (
              <motion.p variants={rise} className="mt-3 mb-0 max-w-[56ch] font-body text-[14px] leading-[24px] text-white/80 sm:text-[17px] sm:leading-[28px]">
                {moment.caption}
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Up next */}
        {next && next.id !== moment.id && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={`Next: ${next.title}`}
            className="pointer-events-auto hidden shrink-0 cursor-pointer items-center gap-4 rounded-[14px] border border-white/20 bg-black/30 p-2 pr-5 text-left text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xl:flex"
          >
            <img src={imageProps(next.image, 640).src} alt="" className="h-[64px] w-[96px] rounded-[10px] object-cover" />
            <span className="block max-w-[190px]">
              <span className="block font-body text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">Up next</span>
              <span className="mt-1 line-clamp-2 block font-heading text-[14px] font-bold leading-tight">{next.title}</span>
            </span>
          </button>
        )}
      </div>

      {/* Journey timeline */}
      <nav aria-label="Journey timeline" className="absolute inset-x-0 bottom-0 z-30 px-5 pb-5 pt-3 sm:px-20 sm:pb-7 lg:px-28">
        <div className="flex gap-1.5 sm:gap-2">
          {chapters.map((c, i) => (
            <Chapter key={c.label} chapter={c} index={index} progress={progress} active={i === chapterIdx} onJump={jump} />
          ))}
        </div>
      </nav>
    </motion.div>,
    document.body
  );
}
