import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function BrandIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill="none"
        stroke="var(--color-brand-600)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CustomCursor() {
  const [hasFinePointer, setHasFinePointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Icon follows instantly
  const dotX = useSpring(cursorX, { stiffness: 1000, damping: 50, mass: 0.1 });
  const dotY = useSpring(cursorY, { stiffness: 1000, damping: 50, mass: 0.1 });

  // Ring trails with a slight lag
  const ringX = useSpring(cursorX, { stiffness: 200, damping: 28, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 200, damping: 28, mass: 0.5 });

  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    setHasFinePointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);

        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el) {
          const style = window.getComputedStyle(el);
          setIsPointer(style.cursor === 'pointer');
        }
      });
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY]);

  if (!hasFinePointer) return null;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isHidden ? 0 : 1,
          scale: isPointer ? 1.6 : 1,
          width: isPointer ? 44 : 34,
          height: isPointer ? 44 : 34,
        }}
        transition={{ scale: { type: 'spring', stiffness: 300, damping: 25 } }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border-[1.5px] border-brand-600/40"
      />

      {/* Brand icon */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isHidden ? 0 : 1,
          scale: isPointer ? 1.3 : 1,
        }}
        transition={{ scale: { type: 'spring', stiffness: 600, damping: 30 } }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] drop-shadow-sm"
      >
        <BrandIcon />
      </motion.div>
    </>
  );
}
