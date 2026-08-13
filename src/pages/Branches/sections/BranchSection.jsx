import React from 'react';
import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';

const containerVariants = makeContainerVariants(0.12);
const itemVariants = makeItemVariants({ y: 25, stiffness: 80 });

export default function BranchSection({ branch }) {
  const { name, tagline, region, vision, activities } = branch;

  return (
    <div className="w-full bg-page dark:bg-surface-950 pt-[110px] pb-[40px] sm:pt-[130px] lg:pt-[60px] lg:pb-[60px] border-b border-[#eee] dark:border-surface-900/60 overflow-hidden">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-20"
      >

        {/* ── Section Header ── */}
        <div className="text-center flex flex-col items-center gap-4">
          <motion.span variants={itemVariants} className="section-label justify-center">
            Branches — {region}
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
          >
            {name.split(' ')[0]}{' '}
            {name.split(' ').slice(1).join(' ')}
          </motion.h2>

          {tagline && (
            <motion.p
              variants={itemVariants}
              className="font-body text-[16px] text-surface-500 dark:text-surface-400 max-w-2xl leading-[30px] m-0"
            >
              {tagline}
            </motion.p>
          )}
        </div>

        {/* ── Hero image + Vision (2 columns) ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">

          {/* Left: Image placeholder */}
          <motion.div
            variants={itemVariants}
            className="flex-1 w-full relative flex justify-center items-start group"
          >
            <div className="absolute w-[80%] h-[80%] -right-4 -bottom-4 bg-brand-600/6 rounded-full blur-3xl group-hover:bg-[rgba(228, 10, 24,0.10)] transition-all duration-500 -z-10 pointer-events-none" />

            {/* Image container — rounded-[10px] matching migration plan */}
            <div className="w-full max-w-2xl rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.16)] transition-all duration-500 overflow-hidden">
              <div className="relative rounded-[16px] overflow-hidden aspect-[4/3] w-full bg-surface-100 dark:bg-surface-800 flex flex-col items-center justify-center gap-3">
                <svg className="w-12 h-12 text-surface-300 dark:text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-surface-400 dark:text-surface-500 m-0">
                  Image coming soon
                </p>
                <div className="absolute inset-0 border-2 border-dashed border-[#eee] dark:border-surface-700 rounded-[16px] pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Right: Vision */}
          <motion.div
            variants={itemVariants}
            className="flex-1 flex flex-col justify-center gap-6"
          >
            <div className="flex flex-col gap-2">
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">
                Our Direction
              </span>
              <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white tracking-tight m-0">
                Vision
              </h3>
            </div>

            {/* Vision quote — preview testimonial border-l-4 pattern */}
            <div className="border-l-4 border-brand-600 pl-8 py-6 bg-[rgba(228, 10, 24,0.02)] dark:bg-brand-950/15 rounded-r-[10px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-600/4 dark:bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-[8px] bg-brand-600 flex items-center justify-center shadow-md shadow-brand-600/20">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <p className="font-body text-[16px] sm:text-[18px] font-medium text-surface-700 dark:text-surface-200 leading-[28px] m-0 italic">
                  "{vision}"
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Activities ── */}
        <motion.div variants={containerVariants} className="flex flex-col gap-8">
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">
              What We Do
            </span>
            <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white tracking-tight m-0">
              Activities of {name}
            </h3>
          </motion.div>

          {/* Activity cards — rounded-[10px] border-[#eee] + hover shadow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((activity, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="flex items-start gap-4 p-4 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.08)] transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-[6px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-body text-[15px] font-medium text-surface-700 dark:text-surface-300 leading-[26px] m-0">
                  {activity}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Tagline Banner ── */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-[10px] bg-brand-600 p-8 sm:p-10 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
          <p className="font-heading font-bold relative text-[17px] sm:text-[19px] text-white tracking-tight m-0 uppercase">
            Strategic partner for Indian egg ingredients in {region}.
          </p>
        </motion.div>

      </motion.section>
    </div>
  );
}
