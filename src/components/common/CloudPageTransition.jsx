import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import backLeft from '../../assets/clouds/bank-back-left.webp';
import backRight from '../../assets/clouds/bank-back-right.webp';
import frontLeft from '../../assets/clouds/bank-front-left.webp';
import frontRight from '../../assets/clouds/bank-front-right.webp';

// Cinematic cloud merge / unmerge page transition.
//
// Layered cloud formations drift in from the left and right edges, overlap
// and merge across the WHOLE screen, the route changes while it is fully
// covered, then the formations separate back towards their own edges.
// There are no panels or doors: each formation is one continuous cumulus
// bank (procedurally generated billow height-field, lit and self-shadowed)
// that is solid on its own side and breaks into real billows at its leading
// edge, so the two banks knit together with no seam or outline.
//
// The host is mounted once in App (it must outlive the page that starts the
// transition); pages trigger it with startCloudTransition().

const CLOSE_MS = 700; // clouds travel in and merge
const OPEN_MS = 800; // clouds separate and leave
const MIN_HOLD_MS = 450; // minimum time fully covered, lets the new page mount
const MAX_HOLD_MS = 3500; // never stay covered longer than this
const EASE = [0.65, 0, 0.35, 1];

let listener = null;

// Runs `onClosed` once the clouds fully cover the screen (the caller changes
// route there). Falls back to calling it immediately when the host isn't
// mounted or the visitor prefers reduced motion.
export function startCloudTransition({ delay = 0, onClosed }) {
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (!listener || reduced) {
    onClosed?.();
    return;
  }
  listener({ delay, onClosed });
}

// Two depth layers per side. Back: hazier, bluer and slower; front: crisper
// and quicker. Each image is a full-viewport, solid-on-one-side cloud bank.
const LAYERS = [
  { id: 'back', left: backLeft, right: backRight, speed: 1.12, delay: 0.1, haze: 'none', opacity: 1 },
  { id: 'front', left: frontLeft, right: frontRight, speed: 0.9, delay: 0, haze: 'none', opacity: 1 },
];

function Formation({ side, layer, merged }) {
  const sign = side === 'left' ? -1 : 1;
  const hidden = `${sign * 104}%`;
  return (
    <motion.img
      src={side === 'left' ? layer.left : layer.right}
      alt=""
      draggable={false}
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover select-none will-change-transform"
      initial={{ x: hidden }}
      animate={{ x: merged ? '0%' : hidden }}
      transition={{
        duration: ((merged ? CLOSE_MS : OPEN_MS) / 1000) * layer.speed,
        delay: merged ? layer.delay : layer.delay * 0.8,
        ease: EASE,
      }}
    />
  );
}

export default function CloudPageTransition() {
  const [phase, setPhase] = useState('idle'); // idle | closing | opening
  const activeRef = useRef(false);
  const timersRef = useRef([]);

  useEffect(() => {
    LAYERS.flatMap((l) => [l.left, l.right]).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const later = (fn, ms) => {
      timersRef.current.push(setTimeout(fn, ms));
    };

    listener = ({ delay, onClosed }) => {
      if (activeRef.current) return; // one transition at a time
      activeRef.current = true;

      later(() => {
        setPhase('closing');
        // Fully covered: switch page behind the clouds.
        later(() => {
          onClosed?.();
          const heldSince = performance.now();
          const waitForPage = () => {
            const held = performance.now() - heldSince;
            const loaderGone = !document.querySelector('[data-page-loader]');
            if ((held >= MIN_HOLD_MS && loaderGone) || held >= MAX_HOLD_MS) {
              setPhase('opening');
              later(() => {
                setPhase('idle');
                activeRef.current = false;
              }, OPEN_MS * 1.25 + 200);
            } else {
              later(waitForPage, 50);
            }
          };
          later(waitForPage, 50);
        }, CLOSE_MS * 1.12 + 120);
      }, delay);
    };

    const timers = timersRef.current;
    return () => {
      listener = null;
      timers.forEach(clearTimeout);
    };
  }, []);

  if (phase === 'idle' || typeof document === 'undefined') return null;

  const merged = phase === 'closing';

  return createPortal(
    <div className="fixed inset-0 z-[10000] overflow-hidden pointer-events-auto" aria-hidden="true">
      {/* Sky fill: fades in once the formations are nearly merged so no gap
          can show through, and fades out as they separate. */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #8fb6e0 0%, #b5d0ec 45%, #d9e8f6 100%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: merged ? 1 : 0 }}
        transition={
          merged
            ? { duration: 0.25, delay: (CLOSE_MS / 1000) * 0.6, ease: 'easeOut' }
            : { duration: 0.3, ease: 'easeIn' }
        }
      />
      {LAYERS.map((l) => (
        <div key={l.id} className="absolute inset-0">
          <Formation side="left" layer={l} merged={merged} />
          <Formation side="right" layer={l} merged={merged} />
        </div>
      ))}
    </div>,
    document.body,
  );
}
