import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import certifications from '../../data/certifications';
import { containerVariants, itemVariants } from '../../utils/animationVariants';

const qualityCards = [
  { title: 'Food Safety Policy', description: 'Built on HACCP, ISO 22000, and BRCGS global standards — preventing contamination at every stage.', page: 'policy' },
  { title: 'Quality Assurance', description: 'NABL-accredited lab testing every batch for protein, residues, and microbiological safety.', page: 'quality_assurance' },
  { title: 'Quality Management System', description: 'ISO 22000, BRCGS, HACCP, 5S and TQM frameworks covering raw material to dispatch.', page: 'quality_management_system' },
];

const infraCards = [
  { title: 'Egg Processing Plant', stat: '2M', statLabel: 'Eggs Processed Daily', description: 'EU & USDA-compliant, fully automated, approved under Indian Export of Egg Products Rules 1997.', page: 'egg_processing_plant' },
  { title: 'Poultry Farm', stat: '2.4M', statLabel: 'Layers Housed', description: 'ISO 22000 certified integrated farms with environmentally controlled sheds and full biosecurity.', page: 'poultry_farm' },
  { title: 'Feed Mill', stat: '100%', statLabel: 'Residue-Free Ingredients', description: 'In-house feed mill screening every ingredient for mycotoxins, pesticides, and antibiotics.', page: 'feed_mill' },
  { title: 'Laboratory', stat: 'Since 2006', statLabel: 'NABL Accredited', description: 'GC-MS, HPLC, and LC-MS/MS testing platforms for feed, water, and finished products.', page: 'laboratory' },
];

export default function WhySKMPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Why SKM | Certifications, Quality & Infrastructure',
        description: 'SKM Egg Products is BRCGS, ISO 22000, Halal & Kosher certified, EU/USDA approved, and operates a fully integrated egg processing facility. Explore our certifications, quality systems, and infrastructure.',
        keywords: 'egg powder certifications, BRCGS egg products, ISO 22000 egg powder, EU approved egg exporter, halal egg powder, kosher egg powder, egg processing plant India, NABL accredited egg lab',
        canonical: 'https://www.skmegg.com/why_skm',
      }}
      breadcrumbItems={[{ label: 'Why SKM' }]}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page dark:bg-surface-950">

        {/* Hero */}
        <div className="w-full py-[60px] lg:py-[80px] border-b border-[#eee] dark:border-surface-800/40 text-center px-4">
          <div className="mx-auto max-w-[720px] flex flex-col items-center gap-4">
            <span className="section-label justify-center">The Rational Case</span>
            <h1 className="font-heading font-bold text-[36px] sm:text-[48px] lg:text-[54px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
              Why SKM
            </h1>
            <p className="font-body text-[15px] sm:text-[16px] text-surface-500 dark:text-surface-400 leading-[28px] m-0">
              Everything a procurement team needs to verify before trusting an overseas supplier — certifications, lab capability, and the infrastructure behind every batch.
            </p>
          </div>
        </div>

        {/* Certifications */}
        <div className="w-full py-[50px] lg:py-[70px] border-b border-[#eee] dark:border-surface-800/40">
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8"
          >
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div className="flex flex-col gap-1">
                <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">8 Active Certifications</span>
                <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading dark:text-white m-0 tracking-tight">Certifications</h2>
              </div>
              <button
                onClick={() => onPageChange('certifications')}
                className="font-body font-semibold text-[12px] uppercase tracking-wide text-brand-600 hover:text-brand-700 dark:hover:text-brand-400 bg-transparent border-none p-0 cursor-pointer"
              >
                Full Details →
              </button>
            </div>
            <motion.div variants={containerVariants} className="flex flex-wrap items-center gap-3">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.name}
                  variants={itemVariants}
                  title={cert.name}
                  className="flex items-center justify-center w-20 h-20 rounded-[10px] border border-[#eee] dark:border-surface-800 bg-surface-50 dark:bg-surface-900/40 p-3"
                >
                  <img src={cert.logo} alt={cert.name} loading="lazy" className="w-full h-full object-contain" />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>

        {/* Quality & Food Safety */}
        <div className="w-full py-[50px] lg:py-[70px] border-b border-[#eee] dark:border-surface-800/40 bg-page dark:bg-surface-900/40">
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8"
          >
            <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading dark:text-white m-0 tracking-tight">Quality & Food Safety</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {qualityCards.map((card) => (
                <motion.button
                  key={card.page}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  onClick={() => onPageChange(card.page)}
                  className="flex flex-col items-start gap-2 text-left p-6 bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[14px] shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.14)] hover:border-brand-600/30 transition-all duration-300 cursor-pointer focus:outline-none"
                >
                  <h3 className="font-heading font-bold text-[16px] text-heading dark:text-white m-0">{card.title}</h3>
                  <p className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 leading-[22px] m-0">{card.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Infrastructure */}
        <div className="w-full py-[50px] lg:py-[70px] border-b border-[#eee] dark:border-surface-800/40">
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8"
          >
            <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading dark:text-white m-0 tracking-tight">Infrastructure</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {infraCards.map((card) => (
                <motion.button
                  key={card.page}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  onClick={() => onPageChange(card.page)}
                  className="flex flex-col items-start gap-3 text-left p-6 bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[14px] shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.14)] hover:border-brand-600/30 transition-all duration-300 cursor-pointer focus:outline-none"
                >
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-[24px] text-brand-600 dark:text-brand-400 leading-none">{card.stat}</span>
                    <span className="font-body text-[10.5px] font-medium uppercase tracking-wide text-surface-400 dark:text-surface-500 mt-1">{card.statLabel}</span>
                  </div>
                  <h3 className="font-heading font-bold text-[15px] text-heading dark:text-white m-0">{card.title}</h3>
                  <p className="font-body text-[13px] text-surface-500 dark:text-surface-400 leading-[20px] m-0">{card.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Traceability cross-link */}
        <div className="w-full py-[50px] lg:py-[70px] border-b border-[#eee] dark:border-surface-800/40 bg-page dark:bg-surface-900/40">
          <div className="mx-auto max-w-[900px] w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-5">
            <h2 className="font-heading font-bold text-[24px] sm:text-[30px] text-heading dark:text-white m-0 tracking-tight">
              Want the full farm-to-product story?
            </h2>
            <p className="font-body text-[14px] text-surface-500 dark:text-surface-400 leading-[24px] m-0 max-w-lg">
              See the six-stage journey behind every batch, or go straight to the technical traceability framework if you're documenting for an audit.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onPageChange('journey')}
                className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-7 py-[15px] rounded-[200px] transition-all duration-300 shadow-[0_4px_20px_rgba(228,10,24,0.25)] hover:shadow-[0_6px_28px_rgba(228,10,24,0.4)] cursor-pointer"
              >
                See Our Journey
              </button>
              <button
                onClick={() => onPageChange('traceability')}
                className="inline-flex items-center gap-2.5 bg-transparent hover:bg-brand-600/6 dark:hover:bg-brand-950/30 text-surface-900 dark:text-surface-100 border border-surface-250 dark:border-surface-700 font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-7 py-[15px] rounded-[200px] transition-all duration-300 cursor-pointer"
              >
                Technical Traceability Docs
              </button>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="w-full py-[60px] lg:py-[80px] text-center px-4">
          <div className="mx-auto max-w-[600px] flex flex-col items-center gap-5">
            <h2 className="font-heading font-bold text-[24px] sm:text-[30px] text-heading dark:text-white m-0 tracking-tight">
              Ready to talk formulation?
            </h2>
            <button
              onClick={() => onPageChange('get-quote')}
              className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-7 py-[15px] rounded-[200px] transition-all duration-300 shadow-[0_4px_20px_rgba(228,10,24,0.25)] hover:shadow-[0_6px_28px_rgba(228,10,24,0.4)] cursor-pointer"
            >
              Request A Quote
            </button>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
