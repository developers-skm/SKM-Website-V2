import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';

export default function NotFound({ onPageChange }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(800px) rotateY(${dx * 14}deg) rotateX(${-dy * 10}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-page px-4 pt-[100px] pb-16">
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist or has been moved." noindex />
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(228, 10, 24,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Decorative grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-brand-600) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-600) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* 3D 404 */}
        <motion.div
          ref={cardRef}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
        >
          <span
            className="select-none font-black leading-none tracking-tighter"
            style={{
              fontSize: 'clamp(120px, 22vw, 260px)',
              color: 'var(--color-brand-600)',
              textShadow: [
                '1px 1px 0 #a80000',
                '2px 2px 0 #a80000',
                '3px 3px 0 #a00000',
                '4px 4px 0 #980000',
                '5px 5px 0 #900000',
                '6px 6px 0 #880000',
                '7px 7px 0 #800000',
                '8px 8px 0 #780000',
                '9px 9px 0 #700000',
                '10px 10px 0 #680000',
                '11px 11px 0 #600000',
                '12px 12px 0 #580000',
                '13px 13px 0 #500000',
                '14px 14px 0 #480000',
                '15px 15px 0 #400000',
                '20px 20px 35px rgba(0,0,0,0.35)',
              ].join(', '),
            }}
          >
            404
          </span>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className="h-[3px] w-24 rounded-full bg-brand-600 mb-7"
        />

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="font-heading text-2xl sm:text-3xl font-bold text-surface-800 mb-3"
        >
          Page Not Found
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5 }}
          className="text-surface-500 text-base sm:text-lg max-w-md leading-relaxed mb-10"
        >
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </motion.p>

        {/* CTA button */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onPageChange?.('home')}
          className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-brand-600 text-white font-semibold text-base shadow-[0_4px_24px_rgba(228, 10, 24,0.35)] hover:shadow-[0_6px_32px_rgba(228, 10, 24,0.5)] transition-all duration-300 overflow-hidden"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
