import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { itemVariants } from '../../utils/animationVariants';

const coreValues = [
  {
    title: "Evaluate and establish Benchmark / Target periodically",
    icon: (<svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>)
  },
  {
    title: "Develop and improve products and business processes",
    icon: (<svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>)
  },
  {
    title: "Deliver products and services at a competitive price",
    icon: (<svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>)
  },
  {
    title: "Returns by way of dividend and wealth creation",
    icon: (<svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>)
  },
  {
    title: "Compensate and motivate employees, stakeholders and sales partners",
    icon: (<svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>)
  },
  {
    title: "Compliance to the statutory regulations",
    icon: (<svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>)
  },
  {
    title: "Extend moral and financial support for social causes",
    icon: (<svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>)
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function CoreIdeologyPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Core Ideology | SKM Egg Products',
        description: 'Learn more about the guiding purpose, values, ethics, and principles that anchor SKM\'s corporate culture and operations.',
        keywords: 'SKM Core Ideology, corporate values, bio-security purpose, Thinking Out of the Shell',
      }}
      breadcrumbItems={[{ label: 'About Us' }, { label: 'Core Ideology' }]}
      onPageChange={onPageChange}
    >

      <div className="w-full bg-page dark:bg-surface-950 py-[40px] lg:py-[60px] overflow-hidden">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-16"
        >
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-4">
            <motion.span variants={itemVariants} className="section-label justify-center">
              Guiding Beliefs
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0 uppercase"
            >
              Core{' '}
              Ideology &amp; Values
            </motion.h2>
            <motion.p variants={itemVariants} className="font-body text-[16px] text-surface-500 dark:text-surface-400 max-w-2xl leading-[30px] m-0">
              At SKM, our business operations are built upon a foundation of shared vision, strong ethics, and a futuristic mindset that inspires sustainable development.
            </motion.p>
          </div>

          {/* Core mantra — border-l-4 preview blockquote pattern */}
          <motion.div
            variants={itemVariants}
            className="border-l-4 border-brand-600 pl-8 py-6 bg-brand-600/3 dark:bg-surface-900/70 rounded-r-[10px] max-w-4xl mx-auto w-full text-center relative overflow-hidden group"
          >
            <div className="absolute right-0 bottom-0 w-48 h-48 bg-brand-600/4 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 leading-none">
              Our Guiding Light
            </span>
            <h3 className="font-heading text-[22px] sm:text-[30px] font-bold tracking-wider text-brand-600 dark:text-white m-0 mt-3 mb-4 uppercase">
              "THINKING OUT OF THE SHELL"
            </h3>
            <p className="font-body text-[16px] text-surface-500 dark:text-surface-400 leading-[30px] max-w-2xl mx-auto m-0">
              It is not just a tagline, but a reflection of the curious spirit and corporate culture of innovation we have at SKM. It drives us to challenge standards, optimize processes, and exceed global standards.
            </p>
          </motion.div>

          {/* Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`relative overflow-hidden rounded-[10px] bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 p-6 flex items-start gap-5 hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.1)] transition-all duration-300${idx === coreValues.length - 1 && coreValues.length % 2 !== 0 ? ' sm:col-span-2 sm:max-w-lg sm:mx-auto sm:w-full' : ''}`}
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-[10px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
                  {value.icon}
                </div>
                <div className="flex items-start gap-3 min-w-0">
                  <span className="font-heading font-bold text-[13px] text-brand-600/40 dark:text-brand-700 leading-none mt-[3px] flex-shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h4 className="font-heading text-[15px] font-bold text-surface-800 dark:text-white m-0 leading-snug">
                    {value.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </PageWrapper>
  );
}
