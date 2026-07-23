import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

// Animates a numeric prefix inside a stat string once it scrolls into view —
// e.g. "2M+" counts up "2" while "M+" stays static, "30+" counts up "30".
// Kept generic (regex-driven) so TrustBar's stat strings don't need a parallel
// "numeric value" field; the display string already IS the source of truth.
export default function useCountUp(text, { duration = 1.6 } = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const match = text.match(/^([\d,.]+)(.*)$/);
  const numeric = match ? parseFloat(match[1].replace(/,/g, '')) : null;
  const suffix = match ? match[2] : '';
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0;
  const [display, setDisplay] = useState(numeric === null ? text : `0${suffix}`);

  useEffect(() => {
    if (!isInView || numeric === null) return;
    const controls = animate(0, numeric, {
      duration,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: (v) => {
        const formatted = decimals > 0
          ? v.toFixed(decimals)
          : Math.round(v).toLocaleString('en-US');
        setDisplay(`${formatted}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [isInView, numeric, suffix, decimals, duration]);

  return { ref, display };
}
