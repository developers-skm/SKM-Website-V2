import React from 'react';
import { motion } from 'framer-motion';

import FeedMillAerial from '../../../assets/5. INFRASTRUCTURE/Feed mill/Feed mill aerial view.jpg';

const statsData = [
  { value: 'In-House', label: 'Feed Mill Laboratory' },
  { value: 'Lot-Wise', label: 'Ingredient Storage' },
  { value: 'Zero Residue', label: 'Verified Inputs Only' },
  { value: 'Automated', label: 'Farm Transport' },
];

const infoBlocks = [
  {
    title: 'Integrated Feed Mill',
    body: 'Our state-of-the-art feed mill, supported by an in-house laboratory, ensures the production of safe, balanced nutrition for our flocks. All ingredients are stored lot-wise in protected facilities and screened for toxins, pesticides, and antibiotic residues. Only verified, residue-free inputs are used in feed formulation.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Customized Feed Formulations',
    body: 'Customized formulations for chicks, growers, and layers deliver essential nutrients for optimal bird health and consistent egg quality. Automated vehicles ensure secure, contamination-free transport to farms.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    title: 'Ingredient Safety & Screening',
    body: 'Every raw material entering the feed mill undergoes rigorous testing for mycotoxins, pesticide residues, and antibiotic contaminants. Strict lot-wise storage prevents cross-contamination and ensures full traceability from ingredient intake to finished feed.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Farm-to-Feed Traceability',
    body: 'The in-house laboratory continuously monitors feed quality parameters, supporting a closed-loop supply chain. Integration between the feed mill, farm operations, and egg processing plant ensures that nutritional inputs are directly linked to final product quality and safety outcomes.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function FeedMill() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } },
  };

  return (
    <div className="w-full bg-page dark:bg-surface-950 overflow-hidden">

      {/* ── Hero ── */}
      <div className="relative py-[90px] bg-page dark:bg-surface-950 border-b border-[#eee] dark:border-surface-800/40 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 dark:bg-brand-950/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-6 items-start">
          <span className="section-label">
            Infrastructure
          </span>
          <h1 className="font-heading font-bold text-[42px] sm:text-[52px] lg:text-[60px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Feed{' '}
            Mill
          </h1>
          <p className="font-body text-[16px] leading-[30px] text-surface-500 dark:text-surface-400 max-w-2xl m-0">
            An integrated, in-house feed mill producing safe, balanced, residue-free nutrition for every stage of flock development — from chick to layer.
          </p>
        </div>
      </div>

      {/* ── Stats + Featured Image ── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex flex-col gap-10"
      >
        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((s, i) => (
            <div key={i} className="p-5 bg-brand-600/4 dark:bg-brand-950/20 border border-[rgba(228, 10, 24,0.10)] dark:border-brand-900/30 rounded-[10px] flex flex-col gap-1.5 shadow-[5px_3px_40px_rgba(0,72,88,0.05)]">
              <span className="font-heading font-bold text-[20px] sm:text-[22px] text-brand-600 dark:text-brand-400 leading-tight">{s.value}</span>
              <span className="font-body text-[11px] font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wide leading-tight">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Featured aerial image */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-[20px] overflow-hidden border border-[#eee] dark:border-surface-800 shadow-[5px_3px_40px_rgba(0,72,88,0.08)] group aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/7]"
        >
          <img
            src={FeedMillAerial}
            alt="SKM Feed Mill – Aerial View"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="text-xs font-bold text-white/80 uppercase tracking-widest m-0">SKM Feed Mill — Aerial View</p>
          </div>
        </motion.div>
      </motion.section>

      {/* ── Info Blocks ── */}
      <div className="w-full bg-page dark:bg-surface-900/10 border-t border-surface-100 dark:border-surface-800/40 py-16 lg:py-24">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10"
        >
          <motion.div variants={itemVariants} className="text-center flex flex-col items-center gap-3">
            <span className="section-label justify-center">
              Mill Operations
            </span>
            <h2 className="font-heading font-bold text-[34px] sm:text-[40px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
              Safe Nutrition,{' '}
              Controlled Inputs
            </h2>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {infoBlocks.map((block, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-6 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800 rounded-[10px] flex flex-col gap-4 hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.1)] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-[8px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  {block.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-[14px] text-heading dark:text-white m-0 tracking-tight leading-snug">
                    {block.title}
                  </h3>
                  <p className="font-body text-[14px] text-surface-500 dark:text-surface-400 leading-[24px] m-0">
                    {block.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tagline Banner */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-[10px] bg-brand-600 p-8 sm:p-10 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
            <p className="font-heading font-bold relative text-[17px] sm:text-[19px] text-white tracking-tight m-0 uppercase">
              In-house milling. Screened ingredients. Traceable nutrition.
            </p>
          </motion.div>
        </motion.section>
      </div>

    </div>
  );
}
