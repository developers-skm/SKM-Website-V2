import React from 'react';
import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';

const containerVariants = makeContainerVariants(0.15);
const cardVariants = makeItemVariants({ y: 30, stiffness: 85 });

const missionItems = [
  { title: "Innovate and Excel",       desc: "Innovate and excel in what we do." },
  { title: "Stakeholder Value",        desc: "Maximize value for stakeholders." },
  { title: "Integrity and Honesty",    desc: "Sustain integrity and honesty." },
  { title: "Social Contribution",      desc: "Contribute to social needs." },
];

export default function VisionMission() {
  return (
    <div className="w-full bg-page dark:bg-surface-900/40 pt-[110px] pb-[40px] sm:pt-[130px] lg:pt-[60px] lg:pb-[60px] border-b border-[#eee] dark:border-surface-800/40 overflow-hidden">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-16"
      >
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="section-label justify-center">Purpose & Direction</span>
          <h2 className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Our Vision & Mission
          </h2>
          <p className="font-body text-[16px] text-surface-500 dark:text-surface-400 max-w-2xl leading-[30px] m-0">
            Driving forces that inspire our team, guide our long-term goals, and anchor our commitment to global excellence.
          </p>
        </div>

        {/* Vision & Mission cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">

          {/* Vision card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="relative overflow-hidden rounded-[10px] bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.16)] p-8 sm:p-10 md:p-12 flex flex-col justify-between group transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600/3 dark:bg-brand-900/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600 bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 px-3 py-1 rounded">
                  Our Vision
                </span>
                <div className="w-12 h-12 rounded-[10px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>

              {/* Quote — preview testimonial border-l-4 pattern */}
              <blockquote className="m-0 border-l-4 border-brand-600 pl-6 py-2 bg-[rgba(228, 10, 24,0.02)] dark:bg-brand-950/10 rounded-r-[10px] text-left flex flex-col gap-3">
                <span className="font-body text-[12px] font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-widest leading-none">
                  Building a Healthy Society
                </span>
                <p className="font-body text-[18px] sm:text-[20px] font-medium leading-[30px] text-surface-700 dark:text-surface-200 m-0 italic">
                  "To be the leader in the sectors we operate with the responsibility of building a healthy society."
                </p>
              </blockquote>
            </div>

            <div className="w-full h-[3px] bg-gradient-to-r from-brand-600 to-surface-300 rounded-full mt-10 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* Mission card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="relative overflow-hidden rounded-[10px] bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.16)] p-8 sm:p-10 md:p-12 flex flex-col justify-between group transition-all duration-300"
          >
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600 bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 px-3 py-1 rounded">
                  Our Mission
                </span>
                <div className="w-12 h-12 rounded-[10px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col gap-3 text-left">
                {missionItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 bg-surface-50 dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[8px] hover:border-brand-600/20 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-[6px] bg-brand-600/6 dark:bg-brand-950/80 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-body text-[15px] font-medium text-surface-700 dark:text-surface-300 leading-snug m-0">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full h-[3px] bg-gradient-to-r from-brand-600 to-surface-300 rounded-full mt-8 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
