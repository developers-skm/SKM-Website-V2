import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Restrained, category-specific background motif overlaid on a product
// family's existing image area. Purely decorative (aria-hidden), confined
// to the image's own bounding box, and only animates while in view.
export default function CategoryMotif({ kind }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-10% 0px -10% 0px' });
  const reduceMotion = useReducedMotion();
  const active = isInView && !reduceMotion;

  if (kind === 'powders') {
    const particles = [
      { left: '18%', top: '22%', size: 4, delay: 0 },
      { left: '34%', top: '46%', size: 3, delay: 0.4 },
      { left: '52%', top: '18%', size: 5, delay: 0.8 },
      { left: '68%', top: '58%', size: 3, delay: 0.2 },
      { left: '78%', top: '30%', size: 4, delay: 0.6 },
      { left: '44%', top: '68%', size: 3, delay: 1.1 },
    ];
    return (
      <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#f3c969]/70"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={active ? { y: [0, 14, 0], opacity: [0.15, 0.7, 0.15] } : { opacity: 0.15 }}
            transition={{ duration: 3.2, repeat: active ? Infinity : 0, delay: p.delay, ease: [0.45, 0, 0.55, 1] }}
          />
        ))}
      </div>
    );
  }

  if (kind === 'liquids') {
    return (
      <div ref={ref} className="absolute inset-x-0 bottom-0 h-16 pointer-events-none overflow-hidden" aria-hidden>
        <motion.div
          className="absolute inset-x-[-20%] bottom-[-30%] h-24 rounded-[50%]"
          style={{ background: 'linear-gradient(180deg, rgba(243,201,105,0.28) 0%, rgba(243,201,105,0) 70%)' }}
          animate={active ? { x: ['-4%', '4%', '-4%'] } : { x: '0%' }}
          transition={{ duration: 6, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  if (kind === 'custom') {
    const dots = [
      { fromX: -14, fromY: -10 },
      { fromX: 14, fromY: -8 },
      { fromX: 0, fromY: 14 },
    ];
    return (
      <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center" aria-hidden>
        {dots.map((d, i) => (
          <motion.span
            key={i}
            className="absolute w-2.5 h-2.5 rounded-full bg-[#f3c969]/60"
            initial={false}
            animate={active
              ? { x: [d.fromX, 0, d.fromX], y: [d.fromY, 0, d.fromY], opacity: [0.6, 0.15, 0.6] }
              : { x: 0, y: 0, opacity: 0.3 }}
            transition={{ duration: 4, repeat: active ? Infinity : 0, delay: i * 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
    );
  }

  return null;
}
