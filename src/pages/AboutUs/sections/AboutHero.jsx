import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 15 } },
};

export default function AboutHero() {
  return (
    <div className="relative w-full bg-page dark:bg-surface-950 overflow-hidden py-[90px] sm:py-[110px] md:py-[130px] border-b border-[#eee] dark:border-surface-900">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,var(--color-brand-50)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_120%,var(--color-brand-950)_0%,transparent_50%)] pointer-events-none opacity-100 dark:opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_-20%,var(--color-brand-100)_0%,transparent_40%)] dark:bg-[radial-gradient(circle_at_10%_-20%,var(--color-brand-900)_0%,transparent_40%)] pointer-events-none opacity-60 dark:opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6 z-10"
      >
        <motion.span variants={itemVariants} className="section-label justify-center">
          Our Story
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="font-heading font-bold text-[42px] sm:text-[56px] lg:text-[72px] text-heading dark:text-white leading-[1.1] tracking-tight m-0 uppercase"
        >
          Thinking Out <br className="sm:hidden" />
          Of The Shell
        </motion.h1>

        <motion.div variants={itemVariants} className="w-16 h-[3px] bg-brand-600 rounded-full" />

        <motion.p
          variants={itemVariants}
          className="font-body text-[16px] sm:text-[18px] text-surface-500 dark:text-surface-350 max-w-2xl leading-[30px] m-0"
        >
          Pioneering premium egg processing in Asia since 1996, committed to excellence, innovation, and global safety standards.
        </motion.p>
      </motion.div>
    </div>
  );
}
