import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import cloud1 from '../../assets/clouds/cloud-1.webp';
import cloud2 from '../../assets/clouds/cloud-2.webp';
import cloud3 from '../../assets/clouds/cloud-3.webp';
import cloud4 from '../../assets/clouds/cloud-4.webp';
import wisp1 from '../../assets/clouds/wisp-1.webp';
import wisp2 from '../../assets/clouds/wisp-2.webp';

// Cinematic cloud merge / unmerge page transition.
//
// Layered cloud formations drift in from the left and right edges, overlap
// and merge across the WHOLE screen, the route changes while it is fully
// covered, then the formations separate back towards their own edges.
// There are no panels or doors: each formation is just a scatter of soft
// cloud sprites, so nothing parks in the middle of the screen.
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

function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Cloud sprites are procedurally generated (fractal noise + a light-march
// shadow pass) transparent WebPs - irregular silhouettes, feathered fringes,
// lit upper-left with silver-blue undersides. Several distinct masses and
// wisps so no shape repeats obviously.
const MASSES = [cloud1, cloud2, cloud3, cloud4];
const WISPS = [wisp1, wisp2];

// One formation: sprites scattered over a full viewport-sized box with heavy
// overlap, so when it sits at x = 0 it covers the whole screen. Back layers
// use bigger, softer masses; front layers add smaller masses and wisps.
function buildSprites(seed, count, { minW, maxW, wispChance }) {
  const rand = mulberry32(seed);
  const cols = Math.ceil(Math.sqrt(count * 1.6));
  const rows = Math.ceil(count / cols);
  const sprites = [];
  for (let i = 0; i < count; i += 1) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const wisp = rand() < wispChance;
    const pool = wisp ? WISPS : MASSES;
    sprites.push({
      src: pool[Math.floor(rand() * pool.length)],
      left: ((c + 0.5) / cols) * 100 + (rand() - 0.5) * (100 / cols) * 1.1,
      top: ((r + 0.5) / rows) * 100 + (rand() - 0.5) * (100 / rows) * 1.1,
      width: minW + rand() * (maxW - minW), // vmax
      flip: rand() > 0.5 ? -1 : 1,
      rotate: (rand() - 0.5) * 12,
      opacity: wisp ? 0.75 : 0.92 + rand() * 0.08,
      ratio: wisp ? 0.4375 : 0.625,
    });
  }
  return sprites;
}

const LAYERS = [
  // back: big, soft, slower, slightly hazy; front: defined, quicker, with wisps
  { id: 'back', count: 9, minW: 85, maxW: 120, wispChance: 0, speed: 1.12, delay: 0.1, seedL: 11, seedR: 47, haze: 'blur(1.5px)', opacity: 0.9 },
  { id: 'mid', count: 9, minW: 70, maxW: 100, wispChance: 0.15, speed: 1, delay: 0.05, seedL: 23, seedR: 61, haze: 'none', opacity: 1 },
  { id: 'front', count: 8, minW: 55, maxW: 85, wispChance: 0.3, speed: 0.9, delay: 0, seedL: 37, seedR: 79, haze: 'none', opacity: 1 },
];

function Formation({ side, layer, merged, sprites }) {
  const sign = side === 'left' ? -1 : 1;
  const hidden = `${sign * 140}%`; // far enough that no sprite edge shows
  return (
    <motion.div
      className="absolute inset-0 will-change-transform"
      style={{ filter: layer.haze, opacity: layer.opacity }}
      initial={{ x: hidden }}
      animate={{ x: merged ? '0%' : hidden }}
      transition={{
        duration: ((merged ? CLOSE_MS : OPEN_MS) / 1000) * layer.speed,
        delay: merged ? layer.delay : layer.delay * 0.8,
        ease: EASE,
      }}
    >
      {sprites.map((p, i) => (
        <img
          key={i}
          src={p.src}
          alt=""
          draggable={false}
          decoding="async"
          className="absolute max-w-none select-none"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.width}vmax`,
            height: `${p.width * p.ratio}vmax`,
            opacity: p.opacity,
            transform: `translate(-50%, -50%) scaleX(${p.flip}) rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </motion.div>
  );
}

export default function CloudPageTransition() {
  const [phase, setPhase] = useState('idle'); // idle | closing | opening
  const activeRef = useRef(false);
  const timersRef = useRef([]);

  const layers = useMemo(
    () =>
      LAYERS.map((l) => ({
        ...l,
        left: buildSprites(l.seedL, l.count, l),
        right: buildSprites(l.seedR, l.count, l),
      })),
    [],
  );

  useEffect(() => {
    [...MASSES, ...WISPS].forEach((src) => {
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
        style={{ background: 'linear-gradient(180deg, #a9c4e2 0%, #c9dbee 48%, #e3edf7 100%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: merged ? 1 : 0 }}
        transition={
          merged
            ? { duration: 0.25, delay: (CLOSE_MS / 1000) * 0.6, ease: 'easeOut' }
            : { duration: 0.3, ease: 'easeIn' }
        }
      />
      {layers.map((l) => (
        <div key={l.id} className="absolute inset-0">
          <Formation side="left" layer={l} merged={merged} sprites={l.left} />
          <Formation side="right" layer={l} merged={merged} sprites={l.right} />
        </div>
      ))}
    </div>,
    document.body,
  );
}
