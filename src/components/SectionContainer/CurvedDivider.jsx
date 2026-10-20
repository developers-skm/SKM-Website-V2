import { useEffect, useId, useRef, useState } from 'react';
import { eggFacts } from '../../data/eggFacts';
import { eggCards } from '../../data/eggCards';

/**
 * Curved section boundary - replaces a flat 1px border between two stacked
 * sections so the page reads as chapters rather than a stack of rectangles.
 * A single same-tone wave (matching the section below) reads as too subtle
 * a gradient at low height, so this draws the curve as a filled shape that
 * sits ON the preceding section's background (`bg`) using the following
 * section's color (`fill`) plus a thin brand-tinted edge line along the
 * curve itself - enough definition to read as a deliberate shape without
 * introducing a loud color band.
 *
 * A small white egg rolls along the curve line. It is positioned from the
 * real path geometry (so it follows the curve at any width), only animates
 * while on screen, and is not rendered at all under prefers-reduced-motion.
 */
const CURVE = 'M0,55 C240,15 480,15 720,45 C960,75 1200,75 1440,40';
const VB_W = 1440;
const VB_H = 120;


const prefersReducedMotion = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const HINT_MS = 2000;
const EGG_HINT = 'Curious About Us? Click to Discover Our Story';

// Remember the last statement so two clicks in a row never repeat it.
let lastFactIndex = -1;
const pickFact = (list) => {
  let i = Math.floor(Math.random() * list.length);
  if (i === lastFactIndex) i = (i + 1) % list.length;
  lastFactIndex = i;
  return list[i];
};

function RollingEgg({ pathRef, boxRef, withImage }) {
  const eggRef = useRef(null);
  const labelRef = useRef(null);
  const startRef = useRef(0);
  const tRef = useRef(0);
  const factRef = useRef(null);
  const factCycleRef = useRef(0);
  const hintTimerRef = useRef(0);
  const pausedRef = useRef(false);
  const fadingRef = useRef(false);
  const fadeTimerRef = useRef(0);
  const lastNowRef = useRef(0);
  const [fact, setFact] = useState(null);
  // The hint is revealed while the cursor is over the egg.
  const [hover, setHover] = useState(false);
  // Each egg gets its own direction, pace and starting point so a page never
  // shows them all rolling in step.
  const [motion] = useState(() => ({
    dir: Math.random() < 0.5 ? 1 : -1,
    ms: 13000 + Math.random() * 6000,
    phase: Math.random(),
  }));
  const gid = useId();

  useEffect(() => {
    const box = boxRef.current;
    const path = pathRef.current;
    const egg = eggRef.current;
    if (!box || !path || !egg) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    const total = path.getTotalLength();
    let raf = 0;
    let visible = false;

    const at = (len) => path.getPointAtLength(Math.min(Math.max(len, 0), total));

    const frame = (now) => {
      if (!visible) return;
      if (!startRef.current) startRef.current = now - motion.phase * motion.ms;
      // Cursor on the egg: freeze it by pushing its start time forward.
      if (pausedRef.current && lastNowRef.current) startRef.current += now - lastNowRef.current;
      lastNowRef.current = now;
      const elapsed = now - startRef.current;
      const cycle = Math.floor(elapsed / motion.ms);
      const t = (elapsed % motion.ms) / motion.ms;
      tRef.current = t;

      // The egg has finished its pass and vanished - its sentence goes with it.
      if (factRef.current && cycle !== factCycleRef.current) {
        factRef.current = null;
        setFact(null);
      }

      const w = box.clientWidth;
      const h = box.clientHeight;
      const sx = w / VB_W;
      const sy = h / VB_H;
      const eggH = parseFloat(getComputedStyle(egg).height) || 20;

      const s = motion.dir > 0 ? t : 1 - t;
      const p = at(s * total);
      const a = at(s * total - 3);
      const q = at(s * total + 3);
      const px = p.x * sx;
      const py = p.y * sy;
      // Unit normal pointing up out of the curve, so the egg rests on the line.
      const dx = (q.x - a.x) * sx;
      const dy = (q.y - a.y) * sy;
      const len = Math.hypot(dx, dy) || 1;
      const nx = dy / len;
      const ny = -dx / len;
      const lift = eggH * 0.42;

      const x = px + nx * lift;
      const y = py + ny * lift;
      const roll = ((px / (eggH * 0.5)) * 180) / Math.PI * 0.5;
      const fade = String(Math.max(0, Math.min(1, t / 0.06, (1 - t) / 0.06)));

      egg.style.opacity = fade;
      egg.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${roll}deg)`;

      const label = labelRef.current;
      if (label) {
        // Sentence rides above the egg, kept inside the page width.
        const lw = label.offsetWidth;
        const left = Math.min(Math.max(x - lw / 2, 8), Math.max(8, w - lw - 8));
        label.style.opacity = fadingRef.current ? '0' : fade;
        label.style.transform = `translate(${left}px, ${y - eggH * 0.8}px) translateY(-100%)`;
      }
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      lastNowRef.current = 0;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(box);

    return () => {
      io.disconnect();
      clearTimeout(hintTimerRef.current);
      clearTimeout(fadeTimerRef.current);
      pausedRef.current = false;
      cancelAnimationFrame(raf);
    };
  }, [boxRef, pathRef, motion]);

  const handleShow = () => {
    if (factRef.current) return;
    // Late in the pass there is no time to read - roll again from the start.
    if (tRef.current > 0.6) startRef.current = performance.now();
    const elapsed = performance.now() - startRef.current;
    factCycleRef.current = Math.floor(elapsed / motion.ms);
    const next = pickFact(withImage ? eggCards : eggFacts);
    factRef.current = next;
    setFact(next);
  };

  // Mouse: moving the cursor over the egg reveals the invitation text.
  // Clicking (or tapping) the egg shows one of the 20 statements.
  const handleLeave = (e) => {
    if (e.pointerType !== 'mouse') return;
    pausedRef.current = false;
    // Image card: fade it out as soon as the cursor leaves the egg.
    if (withImage && factRef.current && !fadingRef.current) {
      fadingRef.current = true;
      if (labelRef.current) labelRef.current.style.transition = 'opacity 0.3s ease';
      fadeTimerRef.current = setTimeout(() => {
        fadingRef.current = false;
        factRef.current = null;
        setFact(null);
      }, 300);
    }
  };

  const handleHover = (e) => {
    if (e.pointerType !== 'mouse') return;
    pausedRef.current = true;
    setHover(true);
    // Stay up for 2 seconds so the line can be read, even if the egg rolls
    // out from under the cursor.
    clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => setHover(false), HINT_MS);
  };

  return (
    <>
      <svg
        ref={eggRef}
        viewBox="0 0 24 30"
        overflow="visible"
        aria-hidden="true"
        onClick={handleShow}
        onPointerEnter={handleHover}
        onPointerLeave={handleLeave}
        className="absolute left-0 top-0 z-[6] h-[16px] sm:h-[20px] lg:h-[24px] w-auto opacity-0 will-change-transform cursor-pointer pointer-events-auto drop-shadow-[0_1px_2px_rgba(36,30,24,0.28)]"
      >
        <defs>
          <radialGradient id={gid} cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ece6da" />
          </radialGradient>
        </defs>
        {/* Larger invisible hit area so the small egg is easy to click. */}
        <circle cx="12" cy="15" r="20" fill="transparent" pointerEvents="all" />
        <path
          d="M12 1 C5 1 1 11 1 18 C1 24.5 6 29 12 29 C18 29 23 24.5 23 18 C23 11 19 1 12 1 Z"
          fill={`url(#${gid})`}
          stroke="#d8d0c2"
          strokeWidth="0.8"
        />
        <ellipse cx="8.5" cy="10" rx="2.2" ry="3.4" fill="#fff" opacity="0.9" transform="rotate(-18 8.5 10)" />
      </svg>
      {(fact || hover) && (
      <div
        ref={labelRef}
        className={
          fact && withImage
            ? 'absolute left-0 top-0 z-[7] w-[min(400px,calc(100vw-32px))] opacity-0 text-left overflow-hidden rounded-xl bg-white border border-surface-200 shadow-[0_8px_24px_rgba(36,30,24,0.18)] font-body text-[12.5px] leading-[1.45] text-surface-600 will-change-transform pointer-events-none'
            : fact
            ? 'absolute left-0 top-0 z-[7] w-[min(300px,calc(100vw-32px))] opacity-0 text-left [text-shadow:0_0_6px_rgba(255,255,255,0.9)] font-body text-[12.5px] leading-[1.45] text-surface-600 will-change-transform pointer-events-none'
            : 'absolute left-0 top-0 z-[7] w-max max-w-[calc(100vw-32px)] opacity-0 text-center [text-shadow:0_0_6px_rgba(255,255,255,0.9)] font-body text-[12px] sm:text-[12.5px] font-semibold leading-[1.3] text-brand-600 will-change-transform pointer-events-none'
        }
      >
        {fact ? (
          withImage ? (
            <>
              <img src={fact.image} alt="" width="640" height="427" decoding="async" className="block w-full aspect-[3/2] object-cover" />
              <span className="block px-4 pt-3 pb-4 text-[13.5px]">
                <span className="block font-heading font-bold text-[13px] text-brand-600 leading-[1.3] mb-0.5">{fact.title}</span>
                {fact.text}
              </span>
            </>
          ) : (
          <>
            <span className="block font-heading font-bold text-[13px] text-brand-600 leading-[1.3] mb-0.5">{fact.title}</span>
            {fact.text}
          </>
          )
        ) : (
          EGG_HINT
        )}
      </div>
      )}
    </>
  );
}


export default function CurvedDivider({ flip = false, bg = '#fff', fill = '#ececec', className = '', cards = false }) {
  const boxRef = useRef(null);
  const pathRef = useRef(null);

  return (
    <div
      ref={boxRef}
      aria-hidden
      className={`relative z-[5] w-full overflow-x-clip leading-none pointer-events-none select-none ${flip ? '-scale-y-100' : ''} ${className}`}
      style={{ backgroundColor: bg }}
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        className="w-full h-[36px] sm:h-[52px] lg:h-[64px] block"
      >
        <path d={`${CURVE} L1440,120 L0,120 Z`} fill={fill} />
        <path
          ref={pathRef}
          d={CURVE}
          fill="none"
          stroke="#e40a18"
          strokeOpacity="0.18"
          strokeWidth="2"
        />
      </svg>
      {!flip && !prefersReducedMotion() && <RollingEgg pathRef={pathRef} boxRef={boxRef} withImage={cards} />}
    </div>
  );
}
