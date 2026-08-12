// Centralized motion tokens — durations (seconds, for Framer Motion) and the
// shared premium easing curve. Keeps timing consistent across the site
// instead of ad-hoc numbers scattered per component.

export const EASE_PREMIUM = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.22,
  buttonHover: 0.2,
  cardHover: 0.38,
  filterTransition: 0.4,
  sectionEntrance: 0.7,
  functional: 0.8,
  process: 1,
  heroSignature: 1.5,
};

export const STAGGER = 0.07;

// Gold accent — used sparingly as a highlight color layered on top of the
// existing red brand system (buttons/CTAs stay red; gold marks progress,
// active states, and small egg-yolk-inspired highlights only).
export const GOLD = {
  400: '#f3c969',
  500: '#e8b64a',
  600: '#d19a2e',
};

// Albumen/cream accent — for albumen-family products, used the same
// sparing way gold is: small highlights, not backgrounds.
export const CREAM = {
  400: '#f6f1e6',
  500: '#ece2cc',
  600: '#dcc9a0',
};

export function fadeUp(reduceMotion, { distance = 20, duration = DURATION.sectionEntrance, delay = 0 } = {}) {
  return {
    initial: { opacity: 0, y: reduceMotion ? 0 : distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: reduceMotion ? 0.01 : duration, ease: EASE_PREMIUM, delay: reduceMotion ? 0 : delay },
  };
}

// Masked image reveal — clip-path wipes open (bottom-to-top by default)
// while the image itself scales down from a slight zoom to rest. Pass
// `from` to change wipe direction ('bottom' | 'left' | 'right' | 'top').
const CLIP_CLOSED = {
  bottom: 'inset(0 0 100% 0)',
  top: 'inset(100% 0 0 0)',
  left: 'inset(0 100% 0 0)',
  right: 'inset(0 0 0 100%)',
};

export function maskReveal(reduceMotion, { from = 'bottom', delay = 0, duration = DURATION.process } = {}) {
  return {
    wrapper: {
      initial: { clipPath: reduceMotion ? 'inset(0 0 0 0)' : CLIP_CLOSED[from] },
      whileInView: { clipPath: 'inset(0 0 0 0)' },
      viewport: { once: true, margin: '-100px' },
      transition: { duration: reduceMotion ? 0.01 : duration, delay: reduceMotion ? 0 : delay, ease: EASE_PREMIUM },
    },
    image: {
      initial: { scale: reduceMotion ? 1 : 1.06 },
      whileInView: { scale: 1 },
      viewport: { once: true, margin: '-100px' },
      transition: { duration: reduceMotion ? 0.01 : duration + 0.2, delay: reduceMotion ? 0 : delay, ease: EASE_PREMIUM },
    },
  };
}
