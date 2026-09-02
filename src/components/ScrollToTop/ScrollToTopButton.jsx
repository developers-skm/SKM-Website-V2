import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTopButton() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setIsScrollable(docHeight > 150);
          setIsVisible(scrollTop > 300);
          if (docHeight > 0) {
            setScrollProgress((scrollTop / docHeight) * 100);
          } else {
            setScrollProgress(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // Monitor document height changes without wasteful interval polling
    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        handleScroll();
      });
      try {
        resizeObserver.observe(document.documentElement);
      } catch (e) {
        // fallback
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  if (!isScrollable) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={handleClick}
          className="fab-scroll-top fixed right-[30px] z-50 flex items-center justify-center w-[45px] h-[45px] rounded-full bg-white hover:bg-brand-600 transition-all duration-200 group cursor-pointer focus:outline-none shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.18), inset 0 0 0 2px rgba(228, 10, 24,0.25)' }}
          aria-label="Scroll to top"
        >
          {/* Circular progress SVG — stroke: brand-600 */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              strokeWidth="3"
              stroke="rgba(228, 10, 24,0.15)"
              fill="transparent"
              r={radius}
              cx="22.5"
              cy="22.5"
            />
            <circle
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="var(--color-brand-600)"
              fill="transparent"
              r={radius}
              cx="22.5"
              cy="22.5"
              className="transition-all duration-100"
            />
          </svg>

          {/* Arrow — preview's upward path, white on hover */}
          <svg
            className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors duration-200 relative z-10"
            fill="currentColor"
            viewBox="0 0 24 23"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.556131 11.4439L11.8139 0.186067L13.9214 2.29352L13.9422 20.6852L9.70638 20.7061L9.76793 8.22168L3.6064 14.4941L0.556131 11.4439Z" />
            <path d="M23.1276 11.4999L16.0288 4.40105L15.9991 10.4203L20.1031 14.5243L23.1276 11.4999Z" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
