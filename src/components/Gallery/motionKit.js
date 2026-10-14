import { useRef } from 'react';
import { useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

// ── Shutter reveal ─────────────────────────────────────────────────────────
// A gold bar sweeps across the frame; the photograph appears behind it as it
// passes and then settles from a slight zoom. Used by every photo frame.
export const shutterBar = {
  hidden: { x: '-101%' },
  visible: { x: ['-101%', '0%', '101%'], transition: { duration: 1.1, times: [0, 0.45, 1], ease: [0.76, 0, 0.24, 1] } },
};
export const shutterImg = {
  hidden: { opacity: 0, scale: 1.22 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { opacity: { delay: 0.5, duration: 0.01 }, scale: { delay: 0.45, duration: 1.5, ease: EASE } },
  },
};

// ── Masked text rise ───────────────────────────────────────────────────────
// Words (or characters) slide up out of an overflow mask, one after another.
export const maskParent = (stagger) => ({ hidden: {}, visible: { transition: { staggerChildren: stagger } } });
export const maskChild = (dur) => ({
  hidden: { y: '115%', rotate: 4 },
  visible: { y: '0%', rotate: 0, transition: { duration: dur, ease: EASE } },
});

// ── Scroll parallax inside a frame ─────────────────────────────────────────
// The image is taller than its frame and drifts a few percent as it scrolls.
export function useParallax(reduce, range = 7) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : [`${range}%`, `-${range}%`]);
  return { ref, y };
}

// ── Pointer tilt + glare (mouse only) ──────────────────────────────────────
export function useTilt(reduce, max = 5) {
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useTransform(
    [gx, gy],
    ([x, y]) => `radial-gradient(420px circle at ${x}% ${y}%, rgba(255,255,255,0.28), transparent 60%)`
  );

  const onPointerMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return {
    style: { rotateX: rx, rotateY: ry, transformPerspective: 1000 },
    glare,
    handlers: { onPointerMove, onPointerLeave },
  };
}
