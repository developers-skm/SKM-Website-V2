import React from 'react';
import { motion } from 'framer-motion';

export default function FuturePreviews() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 15 },
    },
  };

  const previews = [
    {
      title: "Core Ideology",
      desc: "Defining the fundamental values, ethics, and guiding principles that anchor SKM's corporate culture.",
      icon: (
        <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Accolades",
      desc: "A chronological showcase of international quality awards, certificates, and food safety recognitions.",
      icon: (
        <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: "Coffee Table Books",
      desc: "A premium visual archive showcasing our history, growth milestones, and customer interactions.",
      icon: (
        <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Events",
      desc: "Key industry gatherings, international expos, agricultural seminars, and corporate highlights.",
      icon: (
        <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full bg-page dark:bg-surface-950 py-20 lg:py-28 overflow-hidden relative border-b border-surface-100 dark:border-surface-900/60">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-16"
      >
        {/* Title */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-650 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-900/40 px-4 py-1.5 rounded-full">
            Future Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-surface-850 dark:text-white leading-tight tracking-tight m-0">
            More to Come
          </h2>
          <p className="text-sm sm:text-base text-surface-500 dark:text-surface-400 max-w-2xl leading-relaxed m-0">
            We are preparing comprehensive stories and visual contents for the remaining chapters.
          </p>
        </div>

        {/* Card Grid with custom styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {previews.map((preview, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-surface-900/30 border border-surface-200 dark:border-surface-800 p-6 flex flex-col justify-between h-[230px] group transition-all duration-300 shadow-xs hover:shadow-md"
            >
              {/* Card top details */}
              <div className="flex flex-col gap-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-800/80 border border-surface-200/65 dark:border-surface-700/60 flex items-center justify-center text-surface-500 dark:text-surface-400 group-hover:scale-105 transition-transform duration-300">
                    {preview.icon}
                  </div>
                  
                  {/* Subtle placeholder indicator */}
                  <span className="text-[8px] font-black uppercase tracking-wider text-brand-600/70 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 border border-brand-100/50 dark:border-brand-900/40 px-2 py-0.5 rounded">
                    Coming Soon
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-bold text-surface-800 dark:text-white m-0">
                    {preview.title}
                  </h3>
                  <p className="text-xs text-surface-400 dark:text-surface-550 leading-relaxed m-0 font-medium">
                    {preview.desc}
                  </p>
                </div>
              </div>

              {/* Inactive bottom indicator bar */}
              <div className="w-8 h-0.5 bg-surface-200 dark:bg-surface-800 rounded-full group-hover:bg-brand-500 group-hover:w-12 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
