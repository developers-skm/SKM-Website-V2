import { useEffect, useId, useRef, useState } from 'react';
import { eggFacts } from '../../data/eggFacts';
import { eggCards } from '../../data/eggCards';
import henBody from '../../assets/images/hen/hen-body.webp';
import henLegA from '../../assets/images/hen/hen-leg-a.webp';
import henLegB from '../../assets/images/hen/hen-leg-b.webp';

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

  // Fade the image card out, then remove it.
  const dismissCard = () => {
    if (!factRef.current || fadingRef.current) return;
    fadingRef.current = true;
    if (labelRef.current) labelRef.current.style.transition = 'opacity 0.3s ease';
    fadeTimerRef.current = setTimeout(() => {
      fadingRef.current = false;
      factRef.current = null;
      setFact(null);
    }, 300);
  };

  // Touch has no "cursor leaves": tapping anywhere else, or waiting, closes it.
  useEffect(() => {
    if (!withImage || !fact) return undefined;
    const onDown = (e) => {
      if (!eggRef.current?.contains(e.target)) dismissCard();
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [withImage, fact]);

  const handleShow = (e) => {
    if (factRef.current) return;
    if (withImage && e?.nativeEvent?.pointerType && e.nativeEvent.pointerType !== 'mouse') {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = setTimeout(dismissCard, 4000);
    }
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
    if (withImage) dismissCard();
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
            ? 'absolute left-0 top-0 z-[7] w-[min(230px,calc(100vw-32px))] sm:w-[min(320px,calc(100vw-32px))] lg:w-[400px] opacity-0 text-left overflow-hidden rounded-xl bg-white border border-surface-200 shadow-[0_8px_24px_rgba(36,30,24,0.18)] font-body text-[12.5px] leading-[1.45] text-surface-600 will-change-transform pointer-events-none'
            : fact
            ? 'absolute left-0 top-0 z-[7] w-[min(300px,calc(100vw-32px))] opacity-0 text-left [text-shadow:0_0_6px_rgba(255,255,255,0.9)] font-body text-[12.5px] leading-[1.45] text-surface-600 will-change-transform pointer-events-none'
            : 'absolute left-0 top-0 z-[7] w-max max-w-[calc(100vw-32px)] opacity-0 text-center [text-shadow:0_0_6px_rgba(255,255,255,0.9)] font-body text-[12px] sm:text-[12.5px] font-semibold leading-[1.3] text-brand-600 will-change-transform pointer-events-none'
        }
      >
        {fact ? (
          withImage ? (
            <>
              <img src={fact.image} alt="" width="640" height="427" decoding="async" className="block w-full aspect-[3/2] object-cover" />
              <span className="block px-3 pt-2 pb-3 text-[12px] sm:px-4 sm:pt-3 sm:pb-4 sm:text-[13.5px]">
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


/**
 * A small hen built from layered transparent cut-outs of one photographic
 * hen (body, near leg, far leg - see assets/images/hen). Each leg swings from
 * its own hip, hidden under the belly feathers, so she genuinely walks: the
 * planted foot travels backward at exactly the ground speed while the other
 * lifts, swings forward and lands. Her speed along the divider is derived
 * from the stride, so feet never skate. She pauses between walks (gentle
 * breathing, nothing else moves). Feet are positioned from the real path so
 * they stand on the line at any width; only animates on screen, and under
 * prefers-reduced-motion she simply stands on the line.
 *
 * There is deliberately no peck: the head is far above the ground in this
 * artwork, so pecking needs extra head/neck art (see the project notes).
 */
const HEN_FEET = 0.97; // feet sit this far down the box
const HEN_PIVOT_A = '53.22% 77.06%'; // near-leg hip (inside the feathers)
const HEN_PIVOT_B = '63.16% 77.06%'; // far-leg hip
const HEN_LEG_LEN = 0.2286; // hip-to-ground, as a share of the box height
const CYCLE_MS = 900; // one full two-leg walking cycle
const STANCE = 0.55; // share of a leg's cycle spent planted
const SWING_DEG = 17; // leg swings +/- this far from vertical
const LIFT = 0.035; // foot lift during swing, as a share of box height
const smooth = (u) => u * u * (3 - 2 * u);

function WalkingHen({ pathRef, boxRef }) {
  const henRef = useRef(null);
  const bodyRef = useRef(null);
  const legARef = useRef(null);
  const legBRef = useRef(null);
  const [motion] = useState(() => ({ dir: Math.random() < 0.5 ? 1 : -1, phase: Math.random() }));

  useEffect(() => {
    const box = boxRef.current;
    const path = pathRef.current;
    const hen = henRef.current;
    const body = bodyRef.current;
    const legA = legARef.current;
    const legB = legBRef.current;
    if (!box || !path || !hen || !body || !legA || !legB) return undefined;

    const reduced = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const total = path.getTotalLength();
    const at = (len) => path.getPointAtLength(Math.min(Math.max(len, 0), total));

    // Put the hen at position s (0..1) along the curve, feet on the line.
    const place = (s) => {
      const sx = box.clientWidth / VB_W;
      const sy = box.clientHeight / VB_H;
      const p = at(s * total);
      const a = at(s * total - 3);
      const q = at(s * total + 3);
      const tilt = (Math.atan2((q.y - a.y) * sy, (q.x - a.x) * sx) * 180) / Math.PI * motion.dir * 0.7;
      hen.style.transform = `translate(${p.x * sx}px, ${p.y * sy}px) translate(-50%, -${HEN_FEET * 100}%) scaleX(${motion.dir}) rotate(${tilt}deg)`;
    };

    if (reduced) {
      const still = () => { place(0.5); hen.style.opacity = '1'; };
      still();
      window.addEventListener('resize', still);
      return () => window.removeEventListener('resize', still);
    }

    // One leg's pose for gait phase p (0..1): planted foot sweeps back at a
    // constant rate, then the leg lifts, swings forward and lands.
    const legPose = (p, amt, boxH) => {
      const L = HEN_LEG_LEN * boxH;
      let deg;
      let lift = 0;
      if (p < STANCE) {
        deg = -SWING_DEG + 2 * SWING_DEG * (p / STANCE);
      } else {
        const u = (p - STANCE) / (1 - STANCE);
        deg = SWING_DEG - 2 * SWING_DEG * smooth(u);
        lift = LIFT * boxH * Math.sin(Math.PI * u);
      }
      deg *= amt;
      // A rotated leg's foot rises by L(1 - cos); drop it back so it stays planted.
      const plant = L * (1 - Math.cos((deg * Math.PI) / 180));
      return `translateY(${(plant - lift * amt).toFixed(2)}px) rotate(${deg.toFixed(2)}deg)`;
    };

    let raf = 0;
    let visible = false;
    let last = 0;
    let dist = motion.phase * 1e6; // px travelled (wrapped to the path length below)
    let gait = motion.phase; // 0..1 walking-cycle phase
    let walkAmt = 1; // 0 = standing, 1 = full stride (eased)
    let walking = true;
    let until = 3500 + Math.random() * 3000; // ms left in the current walk / pause
    let clock = 0;

    const frame = (now) => {
      if (!visible) return;
      const dt = last ? Math.min(now - last, 64) : 0;
      last = now;
      clock += dt;

      until -= dt;
      if (until <= 0) {
        walking = !walking;
        until = walking ? 4000 + Math.random() * 3500 : 1800 + Math.random() * 1600;
      }
      // Ease in/out of the stride so starts and stops are never abrupt.
      walkAmt += ((walking ? 1 : 0) - walkAmt) * Math.min(1, dt / 220);
      if (!walking && walkAmt < 0.002) walkAmt = 0;

      const boxH = hen.clientHeight || 80;
      const stepSpeed = (HEN_LEG_LEN * boxH * 2 * Math.sin((SWING_DEG * Math.PI) / 180)) / ((STANCE * CYCLE_MS) / 1000); // px/s
      gait = (gait + (dt / CYCLE_MS) * walkAmt) % 1;
      dist += (stepSpeed * walkAmt * dt) / 1000;

      const len = Math.max(1, total * (box.clientWidth / VB_W));
      const t = (dist % len) / len;
      place(motion.dir > 0 ? t : 1 - t);
      hen.style.opacity = String(Math.max(0, Math.min(1, t / 0.05, (1 - t) / 0.05)));

      legA.style.transform = legPose(gait, walkAmt, boxH);
      legB.style.transform = legPose((gait + 0.5) % 1, walkAmt, boxH);

      // Body: ~1px rise-and-fall per step while walking; slow breathing at rest.
      const bob = -((1 - Math.cos(4 * Math.PI * gait)) / 2) * 1.2 * walkAmt;
      const breathe = 1 + 0.007 * Math.sin(clock / 700);
      body.style.transform = `translateY(${bob.toFixed(2)}px) scaleY(${breathe.toFixed(4)})`;
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = 0;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(box);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [boxRef, pathRef, motion]);

  const layer = 'absolute inset-0 h-full w-full max-w-none select-none will-change-transform';
  const img = { width: 289, height: 340, alt: '', 'aria-hidden': 'true', decoding: 'async', loading: 'lazy', draggable: false };
  return (
    <div
      ref={henRef}
      aria-hidden="true"
      style={{ transformOrigin: `50% ${HEN_FEET * 100}%`, aspectRatio: '289 / 340' }}
      className="absolute left-0 top-0 z-[6] h-[54px] sm:h-[66px] lg:h-[80px] opacity-0 will-change-transform pointer-events-none select-none drop-shadow-[0_2px_3px_rgba(36,30,24,0.22)]"
    >
      <img {...img} src={henLegB} ref={legBRef} className={layer} style={{ transformOrigin: HEN_PIVOT_B }} />
      <img {...img} src={henLegA} ref={legARef} className={layer} style={{ transformOrigin: HEN_PIVOT_A }} />
      <img {...img} src={henBody} ref={bodyRef} className={layer} style={{ transformOrigin: '50% 80%' }} />
    </div>
  );
}

export default function CurvedDivider({ flip = false, bg = '#fff', fill = '#ececec', className = '', cards = false, hen = false }) {
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
      {!flip && (hen
        ? <WalkingHen pathRef={pathRef} boxRef={boxRef} />
        : !prefersReducedMotion() && <RollingEgg pathRef={pathRef} boxRef={boxRef} withImage={cards} />)}
    </div>
  );
}
