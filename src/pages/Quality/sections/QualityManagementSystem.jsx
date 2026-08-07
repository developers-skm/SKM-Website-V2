import React from 'react';
import { motion } from 'framer-motion';
import QMSChart from '../../../assets/4. QUALITY/Quality Management System/QMS.png';
import MicroLab from '../../../assets/4. QUALITY/Quality Management System/Microbiology Lab.webp';
import PhysicoLab from '../../../assets/4. QUALITY/Quality Management System/Physicochemical lab.webp';
import ResidueLabExt from '../../../assets/4. QUALITY/Quality Management System/Residue Lab Extraction.webp';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';

const qmsPillars = [
  {
    title: 'Top Management Commitment',
    desc: 'Driven by strong leadership involvement in quality decisions, policy reviews, and resource allocation for food safety.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: 'Process-Driven Approach',
    desc: 'All quality activities are structured around defined processes with documented inputs, outputs, and performance metrics.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: 'Preventive Action',
    desc: 'Systematic identification and elimination of potential non-conformances before they impact product quality or safety.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Structured Management Review',
    desc: 'Periodic reviews of quality performance data, customer feedback, audit findings, and corrective action effectiveness.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Measurable Performance',
    desc: 'KPIs and quality metrics provide objective evidence of system performance and drive data-based improvement decisions.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Continuous Improvement Culture',
    desc: 'Embedded quality culture with 5S, TQM, and Kaizen practices that engage all employees in ongoing performance enhancement.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

const labImages = [
  { src: MicroLab, alt: 'Microbiology Laboratory', label: 'Microbiology Lab' },
  { src: PhysicoLab, alt: 'Physicochemical Laboratory', label: 'Physicochemical Lab' },
  { src: ResidueLabExt, alt: 'Residue Laboratory Extraction', label: 'Residue Lab' },
];

export default function QualityManagementSystem() {
  const containerVariants = makeContainerVariants(0.1);
  const itemVariants = makeItemVariants({ y: 25, stiffness: 80 });

  return (
    <div id="quality-qms" className="w-full bg-page dark:bg-surface-950 pt-[100px] sm:pt-[110px] lg:pt-[120px] pb-[40px] lg:pb-[60px] overflow-hidden">
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
            Quality Management System
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
          >
            Quality Management{' '}
            System
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-body text-[16px] text-surface-500 dark:text-surface-400 max-w-4xl leading-[30px] m-0"
          >
            The dedicated and foolproof approach of quality management system is based on eight quality management principles, which are the management standard at SKM. The eight quality management principles form an integral part of the system for management review and preventive action. This system provides a platform for deploying excellent management practices throughout the organization. It focuses on top management commitment and involvement to improve the system, enabling us to excel in the global market. This system is based on process approach and is result-oriented.
          </motion.p>
        </div>

        {/* QMS Chart + Lab Gallery */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
          {/* QMS Diagram */}
          <motion.div
            variants={itemVariants}
            className="flex-1 w-full"
          >
            <div className="rounded-[20px] border border-[#eee] dark:border-surface-900 bg-white dark:bg-surface-900/40 p-4 shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.14)] hover:border-brand-600/30 transition-all duration-300 overflow-hidden group">
              <img
                src={QMSChart}
                alt="SKM Quality Management System Diagram"
                className="w-full h-auto object-contain select-none group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
              <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest text-center pt-3 m-0">
                SKM Quality Management System Framework
              </p>
            </div>
          </motion.div>

          {/* Lab Images */}
          <motion.div
            variants={itemVariants}
            className="flex-1 w-full flex flex-col gap-4"
          >
            {labImages.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 6 }}
                className="relative rounded-[20px] border border-[#eee] dark:border-surface-800 overflow-hidden group hover:shadow-[5px_3px_40px_rgba(0,72,88,0.1)] hover:border-brand-600/30 transition-all duration-300"
              >
                <div className="relative aspect-[16/6] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-surface-950/60 to-transparent" />
                  <div className="absolute left-0 inset-y-0 flex flex-col justify-center px-5">
                    <p className="font-heading font-bold text-[11px] text-white uppercase tracking-widest m-0">
                      {img.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* QMS Pillars */}
        <div className="flex flex-col gap-6">
          <motion.h3
            variants={itemVariants}
            className="text-sm font-bold text-surface-400 dark:text-surface-500 uppercase tracking-widest m-0 text-center"
          >
            Key Pillars of Our QMS
          </motion.h3>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {qmsPillars.map((pillar, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-5 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800 rounded-[10px] flex flex-col gap-3 hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.1)] transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-[8px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  {pillar.icon}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-heading font-bold text-[14px] text-heading dark:text-white m-0 tracking-tight">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed m-0">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Food Safety & HACCP Highlight Callout */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-[10px] bg-surface-50 dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800 p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 shadow-[5px_3px_40px_rgba(0,72,88,0.05)]"
        >
          <div className="flex-shrink-0 w-14 h-14 rounded-[10px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h4 className="font-heading font-bold text-[16px] sm:text-[18px] text-heading dark:text-white m-0 tracking-tight uppercase">
              HACCP Food Safety Framework
            </h4>
            <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed m-0 font-body">
              The food safety system follows the general principles and guidelines of HACCP to assure the safety of products from farm to fork. At every stage right from hatchery to feed mill, farm, processing, handling and delivery are closely monitored, controlled and documented.
            </p>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
