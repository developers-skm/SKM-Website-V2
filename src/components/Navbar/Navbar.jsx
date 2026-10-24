import { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import SKMLogo from '../../assets/LOGO/Skm-Logo-1536x332.png';
import MobileMenuTrigger from './MobileMenuTrigger';
import NavOverlay from './NavOverlay';

// Logo and menu button are deliberately NOT one fixed unit. The logo is
// site branding that belongs to the top of the page - it's `absolute`
// inside Layout's relative root (Layout.jsx), positioned near the top and
// left in normal document flow otherwise, so it scrolls away with the page
// like any other content and never floats over later sections. The menu
// button is the actual navigation control users need throughout a scroll,
// so it alone is `fixed` to the viewport. Component API preserved exactly
// - <Navbar activePage onPageChange /> - so App.jsx/Layout.jsx need no
// prop changes (Layout.jsx does need `relative` on its root div, see there).
// Pages whose first section is a dark photo/video hero, where the logo's black
// text and grey tagline bar get lost - the logo gets a soft white radial glow behind it there.
// Per page: the glow's RGB, its peak opacity and how far it spreads past the
// logo. White on the grey home hero, warm cream on the tan Products hero, and a
// tighter, stronger glow on the black About SKM hero so it stays clear of the
// 'ABOUT SKM' label below the logo.
const LOGO_GLOW_PAGES = {
  home: { rgb: '255,255,255', peak: 0.6, spread: '-inset-x-24 -inset-y-20 sm:-inset-x-36 sm:-inset-y-24 lg:-inset-x-44 lg:-inset-y-28' },
  products: { rgb: '255,236,196', peak: 0.6, spread: '-inset-x-24 -inset-y-20 sm:-inset-x-36 sm:-inset-y-24 lg:-inset-x-44 lg:-inset-y-28' },
  about_skm: { galaxy: true },
};

// About SKM's hero is deep space, so its logo sits in a small, slowly turning
// spiral galaxy seen at a tilt: a milky core (keeps the black text readable),
// three counter-staggered rings of spiral arms that turn at different speeds
// (inner faster than outer, so the arms wind like a real disc), a breathing
// violet-blue nebula, and three spirals of twinkling stars orbiting on top.
const GALAXY_DISC = [0, 1, 2].flatMap((arm) =>
  Array.from({ length: 30 }, (_, i) => {
    const r = 0.07 + i * 0.0145; // 0..0.5 of the glow's half-extent
    return {
      id: `${arm}-${i}`,
      r,
      theta: (arm * 2 * Math.PI) / 3 + i * 0.34,
      speed: 0.5 / (0.22 + r), // differential rotation
      size: i % 5 === 0 ? 3 : i % 3 === 0 ? 2.2 : 1.5,
      twinkle: 2.2 + ((i * 7 + arm * 3) % 9) * 0.35,
      delay: ((i * 5 + arm * 2) % 8) * 0.4,
    };
  }),
);

// Spiral-arm rings: each is a two-arm conic wash masked to a ring, offset in
// angle from the one inside it and turning slower the further out it is.
const ARMS = (c) =>
  `conic-gradient(from 0deg, transparent 0deg, ${c} 28deg, transparent 80deg, transparent 180deg, ${c} 208deg, transparent 260deg, transparent 360deg)`;
const GALAXY_RINGS = [
  { from: 0, mask: 'radial-gradient(closest-side, transparent 8%, #000 26%, #000 40%, transparent 52%)', color: 'rgba(235,238,255,0.72)', spin: 40 },
  { from: 34, mask: 'radial-gradient(closest-side, transparent 38%, #000 52%, #000 66%, transparent 78%)', color: 'rgba(190,200,255,0.66)', spin: 70 },
  { from: 70, mask: 'radial-gradient(closest-side, transparent 64%, #000 78%, #000 90%, transparent 100%)', color: 'rgba(165,150,240,0.6)', spin: 110 },
];

// Bright, softly glowing stars (round - no cross flare) scattered around the
// galaxy, a fine dust of tiny stars beyond it, and a shooting star that streaks
// across the band every few seconds.
const GLOW_STARS = [
  { left: '84%', top: '22%', size: 13, delay: 0, tint: '215,225,255' },
  { left: '95%', top: '56%', size: 10, delay: 1.3, tint: '255,235,200' },
  { left: '68%', top: '74%', size: 11, delay: 2.4, tint: '215,225,255' },
  { left: '9%', top: '28%', size: 10, delay: 0.7, tint: '255,235,200' },
  { left: '24%', top: '82%', size: 9, delay: 1.9, tint: '215,225,255' },
  { left: '56%', top: '12%', size: 8, delay: 3.1, tint: '255,240,215' },
  { left: '74%', top: '46%', size: 8, delay: 0.4, tint: '215,225,255' },
  { left: '3%', top: '66%', size: 9, delay: 2.8, tint: '215,225,255' },
];
const glowStarBg = (tint) =>
  `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 14%, rgba(${tint},0.55) 34%, rgba(${tint},0.16) 58%, rgba(${tint},0) 75%)`;
// Deterministic scatter so the dust is the same on every render.
const STAR_DUST = Array.from({ length: 48 }, (_, i) => {
  const x = ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;
  const y = ((Math.sin(i * 78.233) * 12345.6789) % 1 + 1) % 1;
  return [Math.round(x * 100), Math.round(y * 100), i % 4 === 0 ? 1.6 : 1];
});
const STAR_DUST_BG = STAR_DUST.map(
  ([x, y, r]) =>
    `radial-gradient(${r}px ${r}px at ${x}% ${y}%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) 55%, rgba(255,255,255,0) 100%)`,
).join(',');

function GalaxyStar({ star, angle, animated }) {
  const left = useTransform(angle, (a) => `${50 + star.r * 100 * Math.cos(star.theta + a * star.speed)}%`);
  const top = useTransform(angle, (a) => `${50 + star.r * 100 * 0.9 * Math.sin(star.theta + a * star.speed)}%`);
  return (
    <motion.span
      className="absolute rounded-full bg-white"
      style={{
        left,
        top,
        width: star.size,
        height: star.size,
        marginLeft: -star.size / 2,
        marginTop: -star.size / 2,
        boxShadow: '0 0 6px 1.5px rgba(205,215,255,0.9)',
      }}
      animate={animated ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.8 }}
      transition={{ duration: star.twinkle, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function LogoGalaxy() {
  const reduceMotion = useReducedMotion();
  const angle = useMotionValue(0);
  useAnimationFrame((t) => {
    if (!reduceMotion) angle.set((t / 1000) * 0.07); // ~90s per turn at the rim
  });

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-x-24 -inset-y-6 sm:-inset-x-32 sm:-inset-y-7 lg:-inset-x-40 lg:-inset-y-8"
      style={{ transform: 'rotate(-4deg)' }}
    >
      {/* nebula haze - slowly breathes */}
      <motion.span
        className="absolute -inset-x-10 -inset-y-5"
        style={{
          background:
            'radial-gradient(closest-side, rgba(140,150,255,0.3) 0%, rgba(150,105,225,0.18) 48%, rgba(120,90,200,0) 100%)',
          filter: 'blur(8px)',
        }}
        animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* spiral arms - a square disc squashed flat so it reads as tilted */}
      <span
        className="absolute left-0 w-full"
        style={{ top: '50%', aspectRatio: '1', marginTop: '-50%', transform: 'scaleY(0.2)' }}
      >
        {GALAXY_RINGS.map((ring) => (
          <motion.span
            key={ring.from}
            className="absolute inset-0"
            style={{
              background: ARMS(ring.color),
              WebkitMaskImage: ring.mask,
              maskImage: ring.mask,
              filter: 'blur(5px)',
              rotate: ring.from,
            }}
            animate={reduceMotion ? undefined : { rotate: [ring.from, ring.from + 360] }}
            transition={{ duration: ring.spin, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </span>

      {/* milky core */}
      <span
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.72) 30%, rgba(232,236,255,0.42) 56%, rgba(170,185,255,0.12) 80%, rgba(170,185,255,0) 100%)',
          filter: 'blur(2px)',
        }}
      />

      {/* fine star dust beyond the galaxy */}
      <motion.span
        className="absolute -inset-x-16 -inset-y-8"
        style={{ backgroundImage: STAR_DUST_BG }}
        animate={reduceMotion ? { opacity: 0.7 } : { opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* bright glowing stars */}
      {GLOW_STARS.map((gs) => (
        <motion.span
          key={gs.left + gs.top}
          className="absolute rounded-full"
          style={{ left: gs.left, top: gs.top, width: gs.size * 2, height: gs.size * 2, marginLeft: -gs.size, marginTop: -gs.size, backgroundImage: glowStarBg(gs.tint) }}
          animate={reduceMotion ? { opacity: 0.85 } : { opacity: [0.4, 1, 0.4], scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: 3 + (gs.delay % 2), delay: gs.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* shooting star */}
      {!reduceMotion && (
        <motion.span
          className="absolute h-px w-[70px]"
          style={{ left: '14%', top: '12%', rotate: 8, background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.95))', filter: 'drop-shadow(0 0 3px rgba(210,220,255,0.9))' }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: [0, 300], y: [0, 42], opacity: [0, 1, 0] }}
          transition={{ duration: 1.1, ease: 'easeIn', repeat: Infinity, repeatDelay: 6 }}
        />
      )}

      {/* orbiting stars */}
      <span
        className="absolute -inset-x-8 -inset-y-4"
        style={{
          WebkitMaskImage: 'radial-gradient(closest-side, #000 60%, transparent 100%)',
          maskImage: 'radial-gradient(closest-side, #000 60%, transparent 100%)',
        }}
      >
        {GALAXY_DISC.map((star) => (
          <GalaxyStar key={star.id} star={star} angle={angle} animated={!reduceMotion} />
        ))}
      </span>
    </span>
  );
}

export default function Navbar({ activePage, onPageChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuIntent, setMenuIntent] = useState('browse');
  const [openKey, setOpenKey] = useState(0);
  const logoGlow = LOGO_GLOW_PAGES[activePage] ?? null;
  const glowStop = (k) => `rgba(${logoGlow?.rgb},${((logoGlow?.peak ?? 0) * k).toFixed(3)})`;
  const menuButtonRef = useRef(null);
  const activeTriggerElRef = useRef(null);

  const openMenu = (intent = 'browse', triggerEl = menuButtonRef.current) => {
    setMenuIntent(intent);
    setOpenKey((prev) => prev + 1);
    setIsMenuOpen(true);
    activeTriggerElRef.current = triggerEl;
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogoClick = () => {
    onPageChange('home');
    closeMenu();
  };

  const handleContactEmail = () => {
    onPageChange('contact-us');
  };

  return (
    <>
      {/* Scrolls away with the page - absolute within Layout's relative
          root, not fixed. Matches Hero.jsx's own left padding exactly so
          the logo and hero copy share one left edge. */}
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.8 }}
        className="absolute top-[22px] left-3 sm:top-[23px] sm:left-5 lg:top-8 lg:left-7 z-30"
      >
        <button
          onClick={handleLogoClick}
          className="relative flex-shrink-0 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-lg flex items-center p-1 transition-all duration-200 hover:opacity-90"
          aria-label="SKM Egg Products - Home"
        >
          {logoGlow?.galaxy && <LogoGalaxy />}
          {logoGlow && !logoGlow.galaxy && (
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute ${logoGlow.spread}`}
              style={{
                background:
                  `radial-gradient(closest-side, ${glowStop(1)} 0%, ${glowStop(0.87)} 22%, ${glowStop(0.57)} 42%, ${glowStop(0.28)} 62%, ${glowStop(0.1)} 82%, ${glowStop(0)} 100%)`,
              }}
            />
          )}
          <img
            src={SKMLogo}
            alt="SKM Egg Products"
            className={`relative w-[170px] sm:w-[210px] lg:w-[250px] h-auto object-contain transition-opacity duration-200 hover:opacity-85 ${logoGlow ? "" : "drop-shadow-[0_1px_8px_rgba(255,255,255,0.55)]"}`}
            loading="eager"
          />
        </button>
      </motion.div>

      {/* Fixed to the viewport - hidden on offline page */}
      {activePage !== 'offline' && (
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.8, delay: 0.05 }}
          className="fixed top-5 right-5 sm:top-[22px] sm:right-8 lg:top-9 lg:right-16 z-40"
          style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}
        >
          <MobileMenuTrigger
            ref={menuButtonRef}
            isOpen={isMenuOpen}
            onClick={() => openMenu('browse', menuButtonRef.current)}
          />
        </motion.div>
      )}

      <NavOverlay
        isOpen={isMenuOpen}
        onClose={closeMenu}
        activePage={activePage}
        onPageChange={onPageChange}
        onContactEmail={handleContactEmail}
        triggerElRef={activeTriggerElRef}
        initialSearchMode={menuIntent === 'search'}
        openKey={openKey}
      />
    </>
  );
}
