import React from 'react';
import { motion } from 'framer-motion';

export default function ComingSoon({ pageTitle, onBackHome }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 18,
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 120, damping: 12 },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[55vh] text-center px-4 py-8">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-lg flex flex-col items-center gap-6 p-8 md:p-12 bg-surface-50/50 dark:bg-surface-900/40 backdrop-blur-md border border-surface-200/80 dark:border-surface-800/80 rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Decorative background gradients */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Animated Badge Icon */}
        <motion.div 
          variants={iconVariants}
          className="flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900/50 text-brand-600 dark:text-brand-400 shadow-sm"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin-slow">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-950/60 px-3.5 py-1.5 rounded-full border border-brand-100/50 dark:border-brand-900/30 self-center">
            Coming Soon
          </span>
          <h2 className="text-3xl font-extrabold text-surface-800 dark:text-surface-100 tracking-tight mt-1">
            {pageTitle} Page
          </h2>
        </motion.div>

        <motion.p variants={itemVariants} className="text-sm md:text-base text-surface-500 dark:text-surface-400 max-w-sm leading-relaxed m-0">
          We are currently engineering this section to deliver an outstanding experience. Stay tuned for updates!
        </motion.p>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBackHome}
          className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-250 bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-600/20 hover:shadow-lg hover:shadow-brand-600/30"
        >
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
