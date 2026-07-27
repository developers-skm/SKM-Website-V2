import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import { makeContainerVariants, makeItemVariants } from '../../utils/animationVariants';

const familyStats = [
  { value: '228', label: 'Families Adopted', sub: 'Gandhi Nagar 174 · Rajiv Nagar 54' },
  { value: '786', label: 'Total Residents' },
  { value: '239', label: 'Children' },
  { value: '62', label: 'Elderly Residents' },
];

const environmentPoints = [
  'Individual toilet with proper drainage facilities for every household.',
  'Streets kept clean with trees planted and maintained on both sides.',
  'Dustbins provided in each street; garbage removed weekly by tractor.',
  'Electrical lights installed and maintained in all streets.',
];

const healthPoints = [
  'Medical care provided to Dalit women from the start of pregnancy through delivery.',
  'Referral to Erode General Hospital for treatment during maternity period when needed.',
  'Post-delivery consultations by doctors covering child rearing and disease prevention.',
  'Family planning counselling and arrangements offered after the 2nd or 3rd delivery.',
];

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

export default function CommunityDevelopmentPage({ onPageChange }) {
  const containerVariants = makeContainerVariants(0.12);
  const itemVariants = makeItemVariants({ y: 25, stiffness: 80 });

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Community Development | CSR | SKM Egg Products"
        description="SKM Health and Mind Welfare Charity Trust – Sevai Maiyam. Learn about SKM's community development efforts serving 228 families across Gandhi Nagar and Rajiv Nagar."
        keywords="SKM CSR, community development, Sevai Maiyam, SKM trust, social responsibility, Gandhi Nagar, Rajiv Nagar"
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
            <motion.span
              variants={itemVariants}
              className="section-label justify-center"
            >
              CSR — Community Development
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
            >
              SKM Health &amp; Mind{' '}
              Welfare Charity Trust
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg font-semibold text-surface-500 dark:text-surface-400 m-0 uppercase tracking-widest"
            >
              Sevai Maiyam
            </motion.p>
          </div>

          {/* ── Row 1: Foundation Story + Chairman Image ── */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

            {/* Left: Text */}
            <motion.div variants={itemVariants} className="flex-1 flex flex-col gap-5">
              <p className="font-body text-[15px] text-surface-600 dark:text-surface-350 leading-[26px] m-0">
                SKM.Maeilanandhan, a social activist, ventured to practice his mentor's preaching at Swaminathapuram village where he was born and brought up. This led to the formation of a Trust named <strong className="text-surface-850 dark:text-white">SKM Health and Mind Welfare Charity Trust</strong> in the year <strong className="text-brand-600 dark:text-brand-400">1988</strong>, and later through this trust he started a Service Centre named <strong className="text-surface-850 dark:text-white">Sevai Maiyam</strong> on <strong className="text-brand-600 dark:text-brand-400">September 15th, 1999</strong>.
              </p>
              <p className="font-body text-[15px] text-surface-600 dark:text-surface-350 leading-[26px] m-0">
                Swami Vivekanandha had emphasized that people who wish to serve must volunteer and go to villages to provide food, clothes, education and medication to the ignorant, poverty-stricken and unprivileged people — stressing that they are not backward but unprivileged.
              </p>
              <p className="font-body text-[15px] text-surface-600 dark:text-surface-350 leading-[26px] m-0">
                As an ardent devotee of Swami Vivekanandha, Thiru SKM.Maeilanandhan wanted to execute these values at his birthplace, Saminathapuram village, and translated that vision into action through the Trust and Sevai Maiyam.
              </p>
            </motion.div>

            {/* Right: Chairman image placeholder */}
            <motion.div variants={itemVariants} className="flex-1 w-full max-w-sm lg:max-w-xs xl:max-w-sm mx-auto lg:mx-0 flex-shrink-0">
              <div className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] overflow-hidden">
                <ImagePlaceholder label="Chairman — image coming soon" aspectClass="aspect-[3/4]" />
              </div>
            </motion.div>
          </div>

          {/* ── Row 2: Section image ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <div className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] overflow-hidden">
              <ImagePlaceholder label="Sevai Maiyam — image coming soon" aspectClass="aspect-[16/7]" />
            </div>

            {/* Text below the image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-5 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] flex flex-col gap-3">
                <h4 className="font-heading font-bold text-[12px] text-heading dark:text-white uppercase tracking-wider m-0">Location &amp; Service Centre</h4>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">
                  The Sevai Maiyam functions under the SKM Health and Mind Welfare Charity Trust at Saminathapuram in <strong className="text-surface-700 dark:text-surface-300">Modakkurichi Village, Erode District</strong>.
                </p>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">
                  Unprivileged and backward class children living in two Dalit colonies — <strong className="text-surface-700 dark:text-surface-300">Gandhi Nagar</strong> and <strong className="text-surface-700 dark:text-surface-300">Rajiv Nagar</strong> — are adopted and all basic necessities are provided to uplift their lives.
                </p>
              </div>
              <div className="p-5 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] flex flex-col gap-3">
                <h4 className="font-heading font-bold text-[12px] text-heading dark:text-white uppercase tracking-wider m-0">Holistic Approach</h4>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">
                  Adopting children reaches its full potential only when the whole family benefits. Hence, not only the children but also the elders in every household are taken care of under the program.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Family Stats ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Adopted Community</span>
              <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white tracking-tight m-0">Families &amp; Residents</h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {familyStats.map((stat, i) => (
                <div key={i} className="p-5 bg-brand-600/4 dark:bg-brand-950/20 border border-[rgba(228, 10, 24,0.10)] dark:border-brand-900/30 rounded-[10px] flex flex-col gap-1.5">
                  <span className="font-heading font-bold text-[26px] sm:text-[30px] text-brand-600 dark:text-brand-400 leading-tight">{stat.value}</span>
                  <span className="text-[11px] font-bold text-surface-700 dark:text-surface-300 leading-tight">{stat.label}</span>
                  {stat.sub && <span className="text-[10px] text-surface-400 dark:text-surface-500 leading-tight">{stat.sub}</span>}
                </div>
              ))}
            </div>
            <div className="p-5 bg-surface-50 dark:bg-surface-900/50 border border-surface-100 dark:border-surface-800/60 rounded-2xl">
              <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">
                Among the 228 families, the total number of people residing are <strong className="text-surface-850 dark:text-white">786</strong> — of whom <strong className="text-surface-850 dark:text-white">254 are males</strong>, <strong className="text-surface-850 dark:text-white">231 females</strong>, <strong className="text-surface-850 dark:text-white">239 children</strong>, and <strong className="text-surface-850 dark:text-white">62 elderly</strong>.
              </p>
            </div>
          </motion.div>

          {/* ── Clean, Green & Healthy Environment ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Infrastructure</span>
              <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white tracking-tight m-0">Clean, Green &amp; Healthy Environment</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {environmentPoints.map((point, i) => (
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

          {/* ── Healthy Child – Nation's Pride ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Maternal &amp; Child Health</span>
              <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white tracking-tight m-0">Healthy Child — Nation's Pride</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {healthPoints.map((point, i) => (
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
              Serving communities. Empowering lives. Building futures.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
