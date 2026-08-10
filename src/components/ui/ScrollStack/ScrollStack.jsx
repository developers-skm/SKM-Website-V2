// Product Families' "scroll stack" — pure CSS `position: sticky` in normal
// document flow. No scroll-driven JS (no useScroll/useTransform, no
// window.scrollY, no rAF, no manual translateY/scale math). Each item is
// simply `position: sticky` with an increasing `top` and `z-index`; the
// browser's own sticky/stacking-context engine handles pinning, covering,
// and release — the same mechanism CSS-only "stacked cards" scroll effects
// have always used. This replaces an earlier Framer-Motion scroll-progress
// implementation that computed per-card scale/opacity/translateY from
// scrollYProgress: that approach produced two bugs that are structural to
// the technique, not tunable — (1) cards mid-transition were partially
// transparent/blurred by design, so both cards were simultaneously visible
// and readable ("ghosting"), and (2) the container's document height was a
// hand-derived vh formula that had to exactly match when the last card's
// sticky position should release, which is fundamentally fragile — sticky
// release is a layout fact (container bottom scrolls past viewport),  not
// something to reconstruct via scroll-progress math. CSS sticky gets both
// for free: an item is either fully covering (opaque, in front) or fully
// covered (behind, invisible) — never partially — and it releases exactly
// when its own flow position (bottom margin included) scrolls past, with
// no formula to keep in sync.
export default function ScrollStack({ children, className = '', style }) {
  return (
    <div className={`relative w-full ${className}`} style={style}>
      {children}
    </div>
  );
}

// `topOffset` — the sticky `top` for this card, in px. Callers pass an
// increasing value per index (e.g. `stackTop + index * edgeStep`) so
// earlier cards peek out by `edgeStep` px above the current one instead of
// being fully hidden — the "stacked edge" effect. `bottomSpacing` is plain
// `margin-bottom` (normal flow, not a scroll-math height reservation) that
// gives the next card (or the following section) room to visibly slide
// over/away from this one before it starts covering the next.
export function ScrollStackItem({ children, index = 0, topOffset, bottomSpacing, className = '' }) {
  return (
    <div
      className={`sticky w-full ${className}`}
      style={{ top: topOffset, marginBottom: bottomSpacing, zIndex: index + 1 }}
    >
      {children}
    </div>
  );
}
