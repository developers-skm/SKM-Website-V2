import { motion } from 'framer-motion';
import { maskChild, maskParent, shutterBar } from './motionKit';

export function ShutterBar() {
  return (
    <motion.span
      variants={shutterBar}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 bg-gold-500"
    />
  );
}

export function MaskText({ text, by = 'word', stagger = 0.06, duration = 0.85, className = '' }) {
  const parts = by === 'char' ? Array.from(text) : text.split(' ');
  return (
    <motion.span variants={maskParent(stagger)} aria-hidden="true" className={`inline ${className}`}>
      {parts.map((p, i) => (
        <span
          key={`${p}-${i}`}
          className={`inline-block overflow-hidden align-bottom [padding-bottom:0.12em] [margin-bottom:-0.12em] ${
            by === 'word' && i < parts.length - 1 ? 'mr-[0.26em]' : ''
          }`}
        >
          <motion.span variants={maskChild(duration)} className="inline-block origin-bottom-left will-change-transform">
            {p === ' ' ? ' ' : p}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

