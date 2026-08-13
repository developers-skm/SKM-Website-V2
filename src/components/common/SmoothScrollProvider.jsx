import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Lenis from 'lenis';

// Global smooth-scroll damping — the page previously used plain native
// scroll everywhere (no library, no wheel handler), which on some
// mice/trackpads reads as jumpy/too fast, especially on a long homepage.
// Lenis intercepts the wheel/touch delta and eases the resulting scroll
// position instead of jumping straight there; it still drives the same
// native `window.scrollY`, so Framer Motion's `useScroll`-based section
// animations (Traceability pin, Infrastructure sticky, map reveal, etc.)
// keep working unmodified. Tuned close to native feel (short duration,
// gentle easing) rather than an exaggerated "floaty" scroll. Disabled
// entirely under prefers-reduced-motion.
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 2.2,
      easing: (t) => 1 - Math.pow(1 - t, 5),
      smoothWheel: true,
      wheelMultiplier: 0.25,
      touchMultiplier: 0.3,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return children;
}

SmoothScrollProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
