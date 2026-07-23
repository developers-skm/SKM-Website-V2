import React from 'react';
import { motion } from 'framer-motion';
import ImageSlider from '../../../components/ImageSlider/ImageSlider';

import ResidueLabAerial from '../../../assets/5. INFRASTRUCTURE/Laboratory/Residue lab aerial view.webp';
import ResidueLabFront from '../../../assets/5. INFRASTRUCTURE/Laboratory/Residue lab front view.webp';
import GCandHPLC from '../../../assets/5. INFRASTRUCTURE/Laboratory/GC and HPLC.webp';
import LCMS from '../../../assets/5. INFRASTRUCTURE/Laboratory/LCMS.webp';
import ExtractionRoom from '../../../assets/5. INFRASTRUCTURE/Laboratory/Extraction room.webp';
import PhysicochemicalView from '../../../assets/5. INFRASTRUCTURE/Laboratory/Physicochemical view.webp';
import LaminarFlow from '../../../assets/5. INFRASTRUCTURE/Laboratory/Laminar flow.webp';
import Incubators from '../../../assets/5. INFRASTRUCTURE/Laboratory/Incubators.webp';
import MediaStorage from '../../../assets/5. INFRASTRUCTURE/Laboratory/Media Storage.webp';
import ChemicalStorage from '../../../assets/5. INFRASTRUCTURE/Laboratory/Chemical Storage.webp';
import Autoclave from '../../../assets/5. INFRASTRUCTURE/Laboratory/Autoclave.webp';
import ShelfLifeStorage from '../../../assets/5. INFRASTRUCTURE/Laboratory/Shelf life storage.webp';

const labImages = [
  { src: ResidueLabAerial, label: 'Residue Lab – Aerial View' },
  { src: ResidueLabFront, label: 'Residue Lab – Front View' },
  { src: GCandHPLC, label: 'GC & HPLC' },
  { src: LCMS, label: 'LC-MS/MS' },
  { src: ExtractionRoom, label: 'Extraction Room' },
  { src: PhysicochemicalView, label: 'Physicochemical Lab' },
  { src: LaminarFlow, label: 'Laminar Airflow' },
  { src: Incubators, label: 'Incubators' },
  { src: MediaStorage, label: 'Media Storage' },
  { src: ChemicalStorage, label: 'Chemical Storage' },
  { src: Autoclave, label: 'Autoclave' },
  { src: ShelfLifeStorage, label: 'Shelf Life Storage' },
];

const statsData = [
  { value: 'NABL', label: 'ISO/IEC 17025 Accredited' },
  { value: 'Since 2006', label: 'Operational Excellence' },
  { value: 'EU & Japan', label: 'Regulatory Compliance' },
  { value: 'HACCP', label: 'Quality Framework' },
];

const analyticalInstruments = [
  'GC-MS', 'GC-ECD / FID', 'HPLC', 'LC-MS/MS', 'AAS', 'ELISA Systems',
];

const physicochemicalParams = [
  'Protein, fat, moisture, ash',
  'pH, total solids, solubility',
  'Organic acids and biochemical markers',
];

const microbiologicalParams = [
  'Salmonella', 'E. coli', 'Enterobacteriaceae', 'Total Plate Count',
  'Staphylococcus aureus', 'Bacillus cereus', 'Yeast & Mold',
];

const microbiologicalEquipment = [
  'Biosafety cabinets', 'Laminar airflow systems', 'Dedicated media storage facilities',
];

const contentSections = [
  {
    title: 'Analytical Instruments & Technology',
    description: 'Advanced analytical platforms support comprehensive safety and residue monitoring. These instruments enable precise screening of feed ingredients, additives, water, tissues, eggs, and finished products for antibiotics, pesticides, and contaminants in line with EU and Japanese regulations (including EU 96/23).',
    chips: analyticalInstruments,
    chipLabel: 'Platforms',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Physicochemical & Functional Testing',
    description: 'Modern laboratory equipment verifies freshness and key parameters. Dedicated functional testing systems evaluate emulsification, foam stability, gel strength, viscosity, baking performance, and product flow characteristics — ensuring reliable industrial application.',
    chips: physicochemicalParams,
    chipLabel: 'Parameters',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Microbiological Laboratory',
    description: 'A controlled microbiology laboratory ensures products are free from pathogens and microbial contamination prior to dispatch. Routine testing and environmental monitoring are conducted using biosafety-controlled infrastructure.',
    chips: microbiologicalEquipment,
    chipLabel: 'Equipment',
    extraChips: microbiologicalParams,
    extraChipLabel: 'Parameters Tested',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Poultry Disease Diagnostics',
    description: 'Our in-house diagnostic laboratory supports proactive flock health management through microbiological, serological, and molecular testing. Strict biosecurity protocols, controlled sample handling, and regulatory-aligned testing frameworks ensure early detection, disease prevention, and sustained flock health.',
    chips: ['Salmonella', 'Newcastle Disease', 'Avian Influenza', 'Mycoplasma'],
    chipLabel: 'Monitored Pathogens',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function Laboratory() {

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
            Quality &{' '}
            Laboratory
          </h1>
          <p className="font-body text-[16px] leading-[30px] text-surface-500 dark:text-surface-400 max-w-2xl m-0">
            Our ISO/IEC 17025 (NABL) accredited laboratory, operational since 2006, supports compliance with European and Japanese regulatory standards. Built on 5S, TQM, Quality Circles, and HACCP principles, the facility ensures disciplined control from raw material to finished product.
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
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((s, i) => (
            <div key={i} className="p-5 bg-brand-600/4 dark:bg-brand-950/20 border border-[rgba(228, 10, 24,0.10)] dark:border-brand-900/30 rounded-[10px] flex flex-col gap-1.5 shadow-[5px_3px_40px_rgba(0,72,88,0.05)]">
              <span className="font-heading font-bold text-[20px] sm:text-[22px] text-brand-600 dark:text-brand-400 leading-tight">{s.value}</span>
              <span className="font-body text-[11px] font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wide leading-tight">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Featured image */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-[20px] overflow-hidden border border-[#eee] dark:border-surface-800 shadow-[5px_3px_40px_rgba(0,72,88,0.08)] group aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/7]"
        >
          <img
            src={ResidueLabAerial}
            alt="SKM Laboratory – Residue Lab Aerial View"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="text-xs font-bold text-white/80 uppercase tracking-widest m-0">SKM Laboratory — Residue Analysis Lab</p>
          </div>
        </motion.div>
      </motion.section>

      {/* ── Gallery ── */}
      <div className="w-full bg-page dark:bg-surface-900/10 border-t border-b border-surface-100 dark:border-surface-800/40 py-16 lg:py-20">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10"
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Lab Facilities</span>
            <h2 className="font-heading font-bold text-[24px] sm:text-[30px] text-heading dark:text-white tracking-tight m-0">
              Laboratory Gallery
            </h2>
            <p className="font-body text-[15px] text-surface-500 dark:text-surface-400 max-w-2xl m-0 leading-[26px]">
              A dedicated Quality Assurance team oversees systematic monitoring, validation, and documentation across all production stages.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ImageSlider images={labImages} />
          </motion.div>
        </motion.section>
      </div>

      {/* ── Content Sections ── */}
      <div className="w-full bg-page dark:bg-surface-950 py-16 lg:py-24">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10"
        >
          <motion.div variants={itemVariants} className="text-center flex flex-col items-center gap-3">
            <span className="section-label justify-center">
              Lab Capabilities
            </span>
            <h2 className="font-heading font-bold text-[34px] sm:text-[40px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
              Analytical{' '}
              Excellence
            </h2>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {contentSections.map((section, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-6 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800 rounded-[10px] flex flex-col gap-4 hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.1)] transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[8px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    {section.icon}
                  </div>
                  <h3 className="font-heading font-bold text-[14px] text-heading dark:text-white m-0 tracking-tight leading-snug pt-2">
                    {section.title}
                  </h3>
                </div>
                <p className="font-body text-[14px] text-surface-500 dark:text-surface-400 leading-[24px] m-0">
                  {section.description}
                </p>

                {/* Primary chips */}
                <div className="flex flex-col gap-2">
                  <span className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                    {section.chipLabel}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {section.chips.map((chip, j) => (
                      <span
                        key={j}
                        className="font-body text-[10px] font-medium uppercase tracking-wide text-surface-600 dark:text-surface-300 bg-white dark:bg-surface-800/60 border border-[#eee] dark:border-surface-700 px-2.5 py-1 rounded-[6px]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Extra chips (microbiological params) */}
                {section.extraChips && (
                  <div className="flex flex-col gap-2">
                    <span className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                      {section.extraChipLabel}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {section.extraChips.map((chip, j) => (
                        <span
                          key={j}
                          className="font-body text-[10px] font-medium uppercase tracking-wide text-surface-600 dark:text-surface-300 bg-white dark:bg-surface-800/60 border border-[#eee] dark:border-surface-700 px-2.5 py-1 rounded-[6px]"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
              NABL accredited. Multi-platform testing. EU & Japan compliant.
            </p>
          </motion.div>
        </motion.section>
      </div>

    </div>
  );
}
