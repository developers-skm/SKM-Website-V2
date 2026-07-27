import React from 'react';
import { motion } from 'framer-motion';
import Trace1 from '../../../assets/4. QUALITY/Traceability/Traceability Picture 1.png';
import Trace2 from '../../../assets/4. QUALITY/Traceability/Traceability Picture 2.png';
import TraceabilityLoopJourney from '../../../components/Traceability/TraceabilityLoopJourney';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';

const traceabilitySteps = [
  {
    step: '01',
    label: 'Hatchery',
    desc: 'Certified hatcheries with strict biosecurity protocols form the foundation of our traceability chain.',
  },
  {
    step: '02',
    label: 'Feed Mill',
    desc: 'Controlled feed formulation with tested ingredients, ensuring nutritional integrity from the start.',
  },
  {
    step: '03',
    label: 'Farm',
    desc: 'Registered layer farms with EU compartmentalization compliance and continuous flock health monitoring.',
  },
  {
    step: '04',
    label: 'Processing',
    desc: 'Validated HACCP-monitored processing facility with daily fresh egg intake and full CCP documentation.',
  },
  {
    step: '05',
    label: 'QA & Lab Testing',
    desc: 'NABL-accredited laboratory conducts physicochemical, microbiological, and residue testing on every batch.',
  },
  {
    step: '06',
    label: 'Packaging & Dispatch',
    desc: 'Positive pressure packing rooms and cold chain management ensure product integrity to final delivery.',
  },
];

export default function Traceability({ onPageChange }) {
  const containerVariants = makeContainerVariants(0.1);
  const itemVariants = makeItemVariants({ y: 25, stiffness: 80 });

  return (
    <div id="quality-traceability" className="w-full bg-page dark:bg-surface-900/40 py-[40px] lg:py-[60px] border-b border-[#eee] dark:border-surface-800/40 overflow-hidden">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-16"
      >
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <motion.span
            variants={itemVariants}
            className="section-label justify-center"
          >
            Traceability
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
          >
            Farm-to-Fork{' '}
            Traceability
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-body text-[16px] text-surface-500 dark:text-surface-400 max-w-2xl leading-[30px] m-0"
          >
            Complete supply chain visibility — every egg, every batch, every step is documented and traceable from biosecure hatchery to final dispatch.
          </motion.p>
        </div>

        {/* Interactive 360° Loop Flow Journey: How Whole Egg Powder Is Made */}
        <motion.div variants={itemVariants}>
          <TraceabilityLoopJourney onPageChange={onPageChange} />
        </motion.div>

        {/* Traceability Images */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {[
            { src: Trace1, alt: 'SKM Traceability Chain Diagram', label: 'End-to-End Traceability System' },
            { src: Trace2, alt: 'SKM Product Traceability Documentation', label: 'Batch Traceability Documentation' },
          ].map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="relative rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.14)] hover:border-brand-600/30 transition-all duration-300 overflow-hidden group"
            >
              <div className="relative rounded-[32px] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-contain select-none group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs font-bold text-surface-500 dark:text-surface-400 uppercase tracking-wider m-0">
                  {img.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Traceability Chain Steps */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {traceabilitySteps.map((step, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              className="flex items-start gap-4 p-5 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800 rounded-[10px] hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.1)] transition-all duration-300 group"
            >
              <span className="font-heading font-bold text-[22px] flex-shrink-0 leading-none text-brand-600 dark:text-brand-400">
                {step.step}
              </span>
              <div className="flex flex-col gap-1">
                <h4 className="font-heading font-bold text-[14px] text-heading dark:text-white m-0 tracking-tight">
                  {step.label}
                </h4>
                <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed m-0">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed End-to-End Traceability Framework */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[10px] p-6 sm:p-8 lg:p-10 shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:border-brand-600/30 transition-all duration-300 flex flex-col gap-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between border-b border-surface-100 dark:border-surface-800/60 pb-6">
            <div className="flex flex-col gap-2">
              <span className="font-body text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                System Overview
              </span>
              <h4 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white m-0 tracking-tight leading-none">
                End-to-End Traceability
              </h4>
            </div>
            <p className="text-sm sm:text-base text-surface-550 dark:text-surface-400 max-w-xl leading-relaxed m-0 font-body md:text-right">
              Our integrated traceability system links lot codes, batch identification, and farm origin back to feed ingredients.
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Transformation Stages */}
            <div className="flex flex-col gap-5">
              <h5 className="text-xs font-bold text-surface-400 dark:text-surface-500 uppercase tracking-widest m-0">
                Transformation Stages Monitored
              </h5>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-start p-4 bg-surface-50 dark:bg-surface-950/40 border border-surface-100 dark:border-surface-800/40 rounded-2xl">
                  <span className="w-7 h-7 rounded-lg bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-900/40 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-surface-800 dark:text-white leading-tight">
                      Feed Input to Egg
                    </span>
                    <span className="text-xs text-surface-500 dark:text-surface-400 leading-normal">
                      Monitoring feed formulations and nutritional integrity directly matching flock outputs.
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 bg-surface-50 dark:bg-surface-950/40 border border-surface-100 dark:border-surface-800/40 rounded-2xl">
                  <span className="w-7 h-7 rounded-lg bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-900/40 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-surface-800 dark:text-white leading-tight">
                      Shell Egg to Finished Product
                    </span>
                    <span className="text-xs text-surface-500 dark:text-surface-400 leading-normal">
                      Full visibility including all processing inputs, processing stages, and lot classifications.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Logistics & HACCP */}
            <div className="flex flex-col gap-6">
              {/* Packaging */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-900/40 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h5 className="text-sm font-bold text-surface-850 dark:text-white m-0">
                    Logistics &amp; Packaging
                  </h5>
                  <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed m-0 font-body">
                    Packaging details and delivery destinations are digitally recorded to ensure complete supply chain transparency.
                  </p>
                </div>
              </div>

              {/* CCPs */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-900/40 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h5 className="text-sm font-bold text-surface-850 dark:text-white m-0">
                    HACCP CCP Safeguards
                  </h5>
                  <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed m-0 font-body">
                    All Critical Control Points (CCPs) are documented and monitored under a robust HACCP framework, safeguarding both product safety and functional integrity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
