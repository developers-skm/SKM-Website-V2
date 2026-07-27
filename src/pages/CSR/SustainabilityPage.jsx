import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import { makeContainerVariants, makeItemVariants } from '../../utils/animationVariants';

const pillars = [
  {
    label: 'Carbon Footprint',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Lowest Carbon Footprint',
    body: 'Our carbon footprint is kept at the lowest possible level, thanks to the strategic location of the plant, efficient recycling of wastes, and energy-efficient processes.',
  },
  {
    label: 'Clean Energy',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Wind Energy Generation',
    body: 'Our contribution to a clean environment is the installation of a wind mill that generates electricity of 3.5 million units per year — powering our operations with renewable energy.',
  },
  {
    label: 'Social Responsibility',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Community Welfare',
    body: 'We ensure our corporate social responsibility by providing free medical, educational, and food services to an entire village through the SKM Charitable Trust.',
  },
];

const environmentalObjectives = [
  'Set sound environmental objectives and targets.',
  'Install, maintain and operate facilities to comply with applicable environmental laws and other regulations.',
  'Minimise process waste and promote recovery and recycling of materials.',
  'Continually improve the awareness of the workforce.',
];

export default function SustainabilityPage({ onPageChange }) {
  const containerVariants = makeContainerVariants(0.1);
  const itemVariants = makeItemVariants({ y: 25, stiffness: 80 });

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Sustainability | CSR | SKM Egg Products"
        description="SKM Egg Products' commitment to sustainability — from wind energy generation and waste recycling to community welfare and environmental compliance."
        keywords="SKM sustainability, CSR, environmental policy, wind mill, carbon footprint, clean energy, SKM charitable trust"
      />
      <div className="w-full bg-page dark:bg-surface-950 py-[40px] lg:py-[60px] overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-20"
        >

          {/* ── Section Header ── */}
          <div className="text-center flex flex-col items-center gap-4">
            <motion.span variants={itemVariants} className="section-label justify-center">
              CSR — Sustainability
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
            >
              Sustainable &amp;{' '}
              Socially Responsible
            </motion.h2>
          </div>

          {/* ── Mission Statement ── */}
          <motion.div
            variants={itemVariants}
            className="border-l-4 border-brand-600 pl-8 py-6 bg-[rgba(228, 10, 24,0.02)] dark:bg-brand-950/15 rounded-r-[10px]"
          >
            <p className="font-body text-[15px] text-surface-600 dark:text-surface-350 leading-[26px] m-0">
              We are sustainable &amp; socially responsible by adopting business strategies and activities that meet the needs of the enterprise and its stakeholders at present, while <strong className="text-surface-850 dark:text-white">protecting, sustaining, and enhancing</strong> the human and natural resources that will be needed in the future.
            </p>
          </motion.div>

          {/* ── Three Pillars ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Our Approach</span>
              <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white tracking-tight m-0">Pillars of Sustainability</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {pillars.map((pillar, i) => (
                <div key={i} className="flex flex-col gap-4 p-6 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.08)] transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-[8px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300">
                      {pillar.icon}
                    </div>
                    <div className="flex flex-col gap-0.5 pt-1">
                      <span className="font-body text-[10px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">{pillar.label}</span>
                      <h4 className="font-heading font-bold text-[14px] text-heading dark:text-white m-0 tracking-tight leading-snug">{pillar.title}</h4>
                    </div>
                  </div>
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">{pillar.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Wind Energy Highlight ── */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-8 items-center p-8 sm:p-10 rounded-[10px] bg-surface-50 dark:bg-surface-900/50 border border-surface-100 dark:border-surface-800/60">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[rgba(228, 10, 24,0.07)] dark:bg-brand-950/40 border border-brand-600/15 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <span className="font-body text-[11px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Renewable Energy</span>
              <p className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white m-0 tracking-tight">
                3.5 Million Units{' '}
                <span className="text-surface-500 dark:text-surface-400 font-normal text-[18px]">of electricity per year</span>
              </p>
              <p className="text-sm text-surface-500 dark:text-surface-400 m-0">Generated through our on-site wind mill installation — a cornerstone of our clean energy commitment.</p>
            </div>
          </motion.div>

          {/* ── Environmental Policy ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Commitment</span>
              <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white tracking-tight m-0">Environmental Policy</h3>
            </div>
            <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400 leading-relaxed m-0">
              <strong className="text-surface-800 dark:text-white">SKM Egg Products Export (India) Ltd</strong> reaffirms its commitment to minimize the adverse impact of its operations on the environment. Towards the achievement of this goal it shall endeavour to:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {environmentalObjectives.map((point, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.07)] transition-all duration-300 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-[6px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">{point}</p>
                </div>
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
              Protecting the planet today — preserving it for tomorrow.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
