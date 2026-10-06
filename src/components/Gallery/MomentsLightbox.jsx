import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import useScrollLock from '../../hooks/useScrollLock';
import { imageProps, TYPE_LABEL } from './momentsUtils';

const EASE = [0.22, 1, 0.36, 1];
const pad = (n) => String(n).padStart(2, '0');

const btn =
  'grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm cursor-pointer transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'left' ? 'm15 5-7 7 7 7' : 'm9 5 7 7-7 7'} />
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

  useScrollLock(true);

  const go = useCallback((d) => onIndex((index + d + total) % total), [index, total, onIndex]);

  // Focus handling: remember the opener, focus Close, restore on unmount.
  useEffect(() => {
    openerRef.current = document.activeElement;
    closeRef.current?.focus();
    return () => openerRef.current?.focus?.({ preventScroll: true });
  }, []);

  // Keyboard: ← → Esc, and a Tab focus trap.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'Tab') {
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

  // Warm the neighbours so next / previous feels instant.
  useEffect(() => {
    [-1, 1].forEach((d) => {
      const n = items[(index + d + total) % total];
      if (n) new Image().src = imageProps(n.image, 1920).src;
    });
  }, [index, items, total]);

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Moment viewer: ${moment.title}`}
      className="fixed inset-0 z-[200] flex flex-col bg-[#0d0d0d]/95 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.3 }}
    >
      <div className="flex items-center justify-between px-4 pt-4 sm:px-8 sm:pt-6">
        <span className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] tabular-nums text-white/70" aria-live="polite">
          {pad(index + 1)} <span className="text-white/35">/</span> {pad(total)}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close viewer" className={btn}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-24"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <button type="button" onClick={() => go(-1)} aria-label="Previous moment" className={`${btn} absolute left-3 z-10 hidden sm:left-8 sm:grid`}>
          <Chevron dir="left" />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={moment.id}
            src={img.src}
            srcSet={img.srcSet}
            sizes="100vw"
            alt={moment.alt}
            width={img.width}
            height={img.height}
            className="max-h-full max-w-full select-none rounded-[10px] object-contain shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(1);
              else if (info.offset.x > 70) go(-1);
            }}
          />
        </AnimatePresence>

        <button type="button" onClick={() => go(1)} aria-label="Next moment" className={`${btn} absolute right-3 z-10 hidden sm:right-8 sm:grid`}>
          <Chevron dir="right" />
        </button>
      </div>

      <div className="flex items-end justify-between gap-4 px-4 pb-5 sm:px-8 sm:pb-8">
        <div className="min-w-0">
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
            {[moment.label, TYPE_LABEL[moment.type]].filter(Boolean).join('  ·  ')}
          </span>
          <h2 className="mt-1 mb-0 font-heading text-[18px] font-bold leading-tight sm:text-[26px]">{moment.title}</h2>
          {moment.caption && <p className="mt-1 mb-0 max-w-[70ch] font-body text-[13px] text-white/65 sm:text-[14px]">{moment.caption}</p>}
        </div>
        <div className="flex shrink-0 gap-2 sm:hidden">
          <button type="button" onClick={() => go(-1)} aria-label="Previous moment" className={btn}><Chevron dir="left" /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next moment" className={btn}><Chevron dir="right" /></button>
        </div>
      </div>
    </motion.div>,
    document.body
  );
}
