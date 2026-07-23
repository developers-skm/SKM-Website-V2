import React from 'react';
import { motion } from 'framer-motion';
import BrandLogo from '../../../assets/2. ABOUT US/Brand Identity/EPP VERTICAL LOGO_585x585px.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 15 } },
};

export default function BrandPhilosophy() {
  return (
    <div className="w-full bg-page dark:bg-surface-950 py-[40px] lg:py-[60px] border-b border-[#eee] dark:border-surface-900/60 overflow-hidden">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-center"
      >
        {/* Right: Text content */}
        <div className="flex-1 text-left flex flex-col gap-6 w-full">
          <motion.span variants={itemVariants} className="section-label">
            Brand Identity
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
          >
            The SKM Brand <br />
            Philosophy & Spirit
          </motion.h2>

          {/* Tagline block — preview blockquote border-l pattern */}
          <motion.div
            variants={itemVariants}
            className="border-l-4 border-brand-600 pl-6 py-4 bg-brand-600/3 dark:bg-brand-950/15 rounded-r-[10px]"
          >
            <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 leading-none">
              Our Core Tagline
            </span>
            <h3 className="font-heading text-[22px] sm:text-[26px] font-bold tracking-wider text-brand-600 dark:text-white m-0 mt-2 uppercase">
              "THINKING OUT OF THE SHELL"
            </h3>
          </motion.div>

          <div className="flex flex-col gap-4">
            <motion.p variants={itemVariants} className="font-body text-[16px] text-surface-500 dark:text-surface-400 leading-[30px] m-0">
              <strong className="text-surface-800 dark:text-surface-200">'THINKING OUT OF THE SHELL'</strong> is a reflection of the curious spirit and culture of innovation we have at SKM. It represents the futuristic and progressive face of SKM and embodies the ever-growing enthusiasm and energy in the organization.
            </motion.p>
            <motion.p variants={itemVariants} className="font-body text-[16px] text-surface-500 dark:text-surface-400 leading-[30px] m-0">
              We strive at SKM, to go beyond normal limits to delight our customers. Continuous repeat orders from long-lasting customers reflect the processes and values of sustained excellence at SKM.
            </motion.p>
          </div>
        </div>

        {/* Left: Brand logo */}
        <motion.div
          variants={itemVariants}
          className="flex-1 w-full relative flex justify-center items-center group"
        >
          <div className="absolute w-[80%] h-[80%] -left-4 -top-4 bg-brand-600/6 dark:bg-brand-650/5 rounded-full blur-3xl group-hover:bg-[rgba(228, 10, 24,0.10)] transition-all duration-500 -z-10 pointer-events-none" />

          <div className="w-full max-w-sm rounded-[20px] border border-[#eee] dark:border-surface-800 bg-surface-50 dark:bg-surface-900/40 p-6 md:p-8 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.16)] transition-all duration-500 overflow-hidden flex flex-col items-center gap-6 justify-center">
            <div className="relative bg-page dark:bg-surface-950 p-6 rounded-[16px] border border-[#eee] dark:border-surface-800/80 shadow-xs group-hover:shadow-md transition-all duration-300 w-full aspect-square flex items-center justify-center">
              <motion.img
                src={BrandLogo}
                alt="SKM Brand Logo - Thinking Out of the Shell"
                className="w-full h-full object-contain select-none"
                animate={{ y: [0, -6, 0] }}
                whileHover={{ scale: 1.25 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', scale: { duration: 0.3, ease: 'easeOut' } }}
              />
            </div>
            <div className="text-center flex flex-col gap-1 select-none">
              <h4 className="font-heading text-[15px] font-bold text-heading dark:text-white m-0 tracking-wide">
                SKM Vertical Brand Mark
              </h4>
              <p className="font-body text-[13px] text-surface-400 dark:text-surface-500 m-0">
                Official emblem of quality & futuristic mindset
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
