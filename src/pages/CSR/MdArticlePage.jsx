import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import { makeContainerVariants, makeItemVariants } from '../../utils/animationVariants';

function ImagePlaceholder({ label, aspectClass = 'aspect-[4/3]' }) {
  return (
    <div className={`relative w-full ${aspectClass} rounded-2xl bg-surface-100 dark:bg-surface-800/60 border-2 border-dashed border-surface-200 dark:border-surface-700 flex flex-col items-center justify-center gap-3 overflow-hidden`}>
      <svg className="w-10 h-10 text-surface-300 dark:text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-surface-400 dark:text-surface-500 m-0 text-center px-4">{label}</p>
    </div>
  );
}

const focusAreas = [
  {
    label: 'Education',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    label: 'Health',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    label: 'Water Management',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    label: 'Waste Management',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
  },
  {
    label: 'Infrastructure',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export default function MdArticlePage({ onPageChange }) {
  const containerVariants = makeContainerVariants(0.1);
  const itemVariants = makeItemVariants({ y: 25, stiffness: 80 });

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="MD Article | CSR | SKM Egg Products"
        description="Olirum Erode Foundation (OEF) — established to develop Erode into a preferred place of living through environmental, water, and community welfare initiatives, co-founded by SKM's Managing Director."
        keywords="OEF, Olirum Erode Foundation, SKM MD, CSR, Erode development, community welfare, SKM Shree Shivkumar"
      />
      <div className="w-full bg-page dark:bg-surface-950 py-[40px] lg:py-[60px] overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-16"
        >

          {/* ── Section Header ── */}
          <div className="text-center flex flex-col items-center gap-4">
            <motion.span
              variants={itemVariants}
              className="section-label justify-center"
            >
              CSR — MD Article
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
            >
              Olirum Erode{' '}
              Foundation
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg font-semibold text-surface-500 dark:text-surface-400 m-0 uppercase tracking-widest"
            >
              OEF
            </motion.p>
          </div>

          {/* ── Foundation Overview ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <p className="font-body text-[15px] text-surface-600 dark:text-surface-350 leading-[26px] m-0">
              <strong className="text-surface-850 dark:text-white">Olirum Erode Foundation (OEF)</strong> has been established with the objective of developing Erode into a preferred place of living by creating and maintaining a hygienic and green environment, and also by developing and conserving water bodies available in the city. A <strong className="text-brand-600 dark:text-brand-400">30-member team</strong> — all successful entrepreneurs in Erode — joined together to establish this foundation.
            </p>

            {/* Images row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] overflow-hidden">
                <ImagePlaceholder label="OEF — image coming soon" aspectClass="aspect-[4/3]" />
              </div>
              <div className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] overflow-hidden">
                <ImagePlaceholder label="OEF — image coming soon" aspectClass="aspect-[4/3]" />
              </div>
            </div>
          </motion.div>

          {/* ── Mission & MD's Role ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="border-l-4 border-brand-600 pl-8 py-6 bg-[rgba(228, 10, 24,0.02)] dark:bg-brand-950/15 rounded-r-[10px] flex flex-col gap-4">
              <p className="font-body text-[15px] text-surface-600 dark:text-surface-350 leading-[26px] m-0">
                OEF is a <strong className="text-surface-850 dark:text-white">non-political and non-business affiliated organisation</strong>; however, individuals, business organisations and establishments can directly participate and contribute to the development of Erode. OEF is committed to developing Erode by joining hands with the common public and in collaboration with the State Government and the Erode Corporation.
              </p>
              <p className="font-body text-[15px] text-surface-600 dark:text-surface-350 leading-[26px] m-0">
                This foundation has Trustees, Advisors and Mentors for effective functioning and implementation of welfare activities. <strong className="text-brand-600 dark:text-brand-400">Mr. SKM. Shree Shivkumar</strong>, our Managing Director, is one of the founders in establishing OEF.
              </p>
            </div>

            {/* Images row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] overflow-hidden">
                <ImagePlaceholder label="OEF event — image coming soon" aspectClass="aspect-[4/3]" />
              </div>
              <div className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] overflow-hidden">
                <ImagePlaceholder label="OEF founders — image coming soon" aspectClass="aspect-[4/3]" />
              </div>
            </div>
          </motion.div>

          {/* ── Launch Event ── */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-[10px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900/50 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start shadow-[5px_3px_40px_rgba(0,72,88,0.05)]"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-[10px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-600 dark:text-brand-400">Launch Event</span>
              <h3 className="font-heading font-bold text-[15px] text-heading dark:text-white m-0 tracking-tight">
                Grand Inauguration — 04 June 2015
              </h3>
              <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">
                The establishment of OEF was made public in a grand manner at <strong className="text-surface-700 dark:text-surface-300">Vellalar College Ground</strong> on <strong className="text-brand-600 dark:text-brand-400">04.06.2015</strong>. Mr. <strong className="text-surface-700 dark:text-surface-300">S. Suriya</strong>, the famous Tamil cinema actor and founder of <strong className="text-surface-700 dark:text-surface-300">Agaram Foundation, Chennai</strong>, participated as Chief Guest.
              </p>
            </div>
          </motion.div>

          {/* ── Focus Areas ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <div className="text-center flex flex-col items-center gap-3">
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Strategic Focus</span>
              <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white tracking-tight m-0">
                OEF will mainly focus its activities on the following areas
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {focusAreas.map((area, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center gap-3 p-5 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.08)] transition-all duration-300 group text-center"
                >
                  <div className="w-12 h-12 rounded-[10px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300">
                    {area.icon}
                  </div>
                  <span className="font-heading font-bold text-[12px] text-heading dark:text-white uppercase tracking-wide leading-tight">
                    {area.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Call to Action Quote ── */}
          <motion.div
            variants={itemVariants}
            className="border-l-4 border-brand-600 pl-8 py-6 bg-[rgba(228, 10, 24,0.02)] dark:bg-brand-950/15 rounded-r-[10px] flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-[10px] bg-brand-600 flex items-center justify-center shadow-md shadow-brand-600/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-base sm:text-lg font-semibold text-brand-900 dark:text-brand-100 leading-relaxed m-0 italic">
              "Let us join to strengthen OEF and contribute our shares also for the development of our Erode city."
            </p>
          </motion.div>

          {/* ── Tagline Banner ── */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-[10px] bg-brand-600 p-8 sm:p-10 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
            <p className="font-heading font-bold relative text-[17px] sm:text-[19px] text-white tracking-tight m-0 uppercase">
              Building a greener, healthier, and thriving Erode.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
