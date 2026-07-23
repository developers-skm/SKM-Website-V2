import React from 'react';
import { motion } from 'framer-motion';
import FactoryImage from '../../../assets/2. ABOUT US/Our Company/Factory image.webp';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 15 } },
};

const stats = [
  { value: "2 Million",  label: "Eggs processed per day",       sub: "Integrated Scale" },
  { value: "7,500 MT",   label: "Egg powder annually",           sub: "Global Supply Capacity" },
  { value: "ISO 22000",  label: "Certified poultry & feed mill", sub: "European Union Compartmentalization" },
];

export default function OurCompany() {
  return (
    <div className="w-full bg-page dark:bg-surface-950 py-[40px] lg:py-[60px] border-b border-[#eee] dark:border-surface-900/60 overflow-hidden">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-12"
      >

        {/* ── Hero banner image ── */}
        <motion.div
          variants={itemVariants}
          className="relative w-full overflow-hidden rounded-[24px] group shadow-[0_8px_40px_rgba(0,0,0,0.10)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)] aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
        >
          <motion.img
            src={FactoryImage}
            alt="SKM Eggs Factory Facility"
            className="w-full h-full object-cover select-none"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            whileHover={{ scale: 1.03 }}
            style={{ transition: 'transform 700ms cubic-bezier(0.25,1,0.5,1)' }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/65 via-surface-950/10 to-transparent pointer-events-none" />

          {/* Bottom badge */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 flex items-end justify-between">
            <div className="bg-surface-950/70 backdrop-blur-md border border-white/10 px-3 py-2 sm:px-5 sm:py-3.5 rounded-[8px] flex flex-col gap-0.5 max-w-[72%] sm:max-w-none">
              <h4 className="font-heading text-[11px] sm:text-[13px] font-bold text-white m-0 tracking-wide uppercase">
                Integrated Feed & Farm Facility
              </h4>
              <p className="font-body text-[10px] sm:text-[11px] text-surface-300 m-0 leading-normal">
                Ensuring biosecurity and traceability at every stage
              </p>
            </div>
            <span className="hidden sm:block font-body text-[9px] font-bold text-brand-400 bg-brand-950/80 border border-brand-900/60 px-3 py-1 rounded uppercase tracking-wider">
              Established 1996
            </span>
          </div>
        </motion.div>

        {/* ── Header row: label+heading left, body text right ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">

          <div className="flex-1 flex flex-col gap-5">
            <motion.span variants={itemVariants} className="section-label">
              Our Company
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
            >
              A Commitment to <br />
              Excellence in processing
            </motion.h2>
          </div>

          <div className="flex-1 flex flex-col gap-4 lg:pt-2">
            <motion.p variants={itemVariants} className="font-body text-[16px] text-surface-500 dark:text-surface-400 leading-[30px] m-0">
              Established in 1996, SKM Egg Products began its journey with a clear commitment to excellence in egg processing.
            </motion.p>
            <motion.p variants={itemVariants} className="font-body text-[16px] text-surface-500 dark:text-surface-400 leading-[30px] m-0">
              Today, we operate as one of Asia's largest integrated egg processing facilities, combining advanced production technology with internationally aligned quality systems. Supported by fully integrated back-end farms, our operations process up to 2 million eggs per day, producing approximately 7,500 metric tonnes of egg powder annually.
            </motion.p>
            <motion.p variants={itemVariants} className="font-body text-[16px] text-surface-500 dark:text-surface-400 leading-[30px] m-0">
              The quality and safety of the raw material is ensured with the <strong>backward integration</strong> of our own layer farm and feed mill. Our poultry farm is ISO 22000 certified. Bio-security is maintained, and our poultry farms are registered under compartmentalization as per European Union norms.
            </motion.p>
          </div>
        </div>

        {/* ── Stats grid ── */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 bg-white dark:bg-surface-900/40 border border-[#eee] dark:border-surface-800 rounded-[10px] flex flex-col gap-1.5 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.1)] hover:border-brand-600/30 transition-all duration-300"
            >
              <span className="font-heading font-bold text-[22px] text-brand-600 dark:text-brand-400 leading-none">
                {stat.value}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-body text-[13px] font-medium text-surface-700 dark:text-surface-300 leading-tight">
                  {stat.label}
                </span>
                <span className="font-body text-[11px] text-surface-400 dark:text-surface-500 font-medium tracking-wide uppercase">
                  {stat.sub}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

      </motion.section>
    </div>
  );
}
