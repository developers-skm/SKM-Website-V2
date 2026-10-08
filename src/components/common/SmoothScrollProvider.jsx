import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Lenis from 'lenis';

// Global smooth-scroll damping - the page previously used plain native
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
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      autoResize: true,
    });

    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Lenis caches the document's scroll limit. Re-measure whenever the content
    // or route resizes without using layout-thrashing interval timers.
    const resize = () => lenis.resize();
    const resizeObserver = new ResizeObserver(resize);
    if (document.body) resizeObserver.observe(document.body);
    const root = document.getElementById('root');
    if (root) resizeObserver.observe(root);
    window.addEventListener('load', resize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('load', resize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.__lenis === lenis) window.__lenis = null;
    };
  }, []);

  return children;
}

SmoothScrollProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
