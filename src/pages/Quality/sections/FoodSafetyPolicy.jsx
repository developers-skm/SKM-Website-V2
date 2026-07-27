import React from 'react';
import { motion } from 'framer-motion';
import LCMSImage from '../../../assets/4. QUALITY/Food Safety and Quality Policy/LCMS.webp';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';

const commitments = [
  'Delivering safe and high functional products.',
  'Compliance to hygiene practices.',
  'Compliance to production of safe, authentic, legal food, environmental related rules and to manage quality to meet customer and regulatory requirements.',
  'Maintain internal & external communication on food safety related information and commitment to continually improve on quality culture.',
];



export default function FoodSafetyPolicy() {
  const containerVariants = makeContainerVariants(0.12);
  const itemVariants = makeItemVariants({ y: 25, stiffness: 80 });

  return (
    <div id="quality-policy" className="w-full bg-page dark:bg-surface-950 py-[40px] lg:py-[60px] border-b border-[#eee] dark:border-surface-900/60 overflow-hidden">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-20"
      >
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <motion.span
            variants={itemVariants}
            className="section-label justify-center"
          >
            Food Safety Policy
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
          >
            Food Safety &amp;{' '}
            Quality Policy
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-body text-[16px] text-surface-500 dark:text-surface-400 max-w-2xl leading-[30px] m-0"
          >
            We at SKM, as manufacturer and supplier of eggs and egg products, are committed to delight our customers through:
          </motion.p>
        </div>

        {/* Row 1: Image + Commitments (2 columns) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
          {/* Left: Image */}
          <motion.div
            variants={itemVariants}
            className="flex-1 w-full relative flex justify-center items-start group"
          >
            <div className="absolute w-[80%] h-[80%] -right-4 -bottom-4 bg-brand-600/10 rounded-full blur-3xl group-hover:bg-brand-600/15 transition-all duration-500 -z-10 pointer-events-none" />
            <div className="w-full max-w-2xl rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.16)] transition-all duration-500 overflow-hidden">
              <motion.div className="relative rounded-[16px] overflow-hidden aspect-[4/3] w-full" initial={{ clipPath: 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}>
                <motion.img
                  src={LCMSImage}
                  alt="LC-MS Laboratory Equipment at SKM"
                  className="w-full h-full object-cover select-none"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute bottom-4 left-4 right-4 bg-surface-950/70 backdrop-blur-md border border-white/10 p-3.5 rounded-xl">
                  <h4 className="text-sm font-bold text-white m-0 tracking-wide uppercase">
                    LC-MS/MS Laboratory
                  </h4>
                  <p className="text-[10px] text-surface-300 m-0 leading-normal mt-0.5">
                    Advanced residue analysis ensuring product safety and purity
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Policy Commitments (4 bullets) */}
          <motion.div
            variants={itemVariants}
            className="flex-1 flex flex-col gap-4"
          >
            {commitments.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex items-start gap-4 p-4 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.08)] transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-[8px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-body text-[15px] font-medium text-surface-700 dark:text-surface-300 leading-[26px] m-0">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: QMS Content — full width below */}
        <motion.div
          variants={itemVariants}
          className="border-l-4 border-brand-600 pl-8 py-6 bg-[rgba(228, 10, 24,0.02)] dark:bg-brand-950/15 rounded-r-[10px] flex flex-col gap-4"
        >
          <p className="text-sm sm:text-base text-surface-600 dark:text-surface-350 leading-relaxed m-0 font-body">
            Our Quality Management System is designed to deliver safe, consistent products in full alignment with defined customer specifications.
          </p>
          <p className="text-sm sm:text-base text-surface-600 dark:text-surface-350 leading-relaxed m-0 font-body">
            Built on internationally recognized quality management principles, the system integrates structured management review, preventive action, and a process-driven approach led by strong top management commitment. The focus remains on measurable performance and continuous improvement across the organization.
          </p>
          <p className="text-sm sm:text-base text-surface-600 dark:text-surface-350 leading-relaxed m-0 font-body">
            Our food safety framework is based on{' '}
            <strong className="text-brand-600 dark:text-brand-400">HACCP principles</strong>, ensuring controlled and documented monitoring from hatchery and feed mill through farming, processing, handling, and final delivery.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}
