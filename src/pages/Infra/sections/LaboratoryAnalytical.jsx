import React from 'react';
import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';

const analyticalInstruments = [
  'GC-ECD / FID', 'HPLC', 'LC-MS/MS', 'ELISA Systems', 'NIR',
];

const physicochemicalParams = [
  'Protein, fat, moisture, ash',
  'pH, total solids, solubility',
];

const microbiologicalParams = [
  ' ' 
];

const microbiologicalEquipment = [
  'Biosafety cabinets', 'Laminar airflow',
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
    description: 'Modern laboratory equipment verifies freshness and key parameters. Dedicated functional testing systems evaluate emulsification, foam stability, gel strength, viscosity, baking performance, and product flow characteristics - ensuring reliable industrial application.',
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
    description: 'Microbiology laboratory ensures products are free from pathogens and microbial contamination prior to dispatch. Routine testing and environmental monitoring are conducted using biosafety-controlled infrastructure.',
    chips: microbiologicalEquipment,
    chipLabel: 'Equipment',
    extraChipLabel: 'Parameters Tested',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Research and Development',
    description: 'Our upcoming Research and Development (R&D) facility will feature functional testing, application laboratories, and bakery application capabilities to evaluate product performance and functional properties across various end-use applications. Through close collaboration with our valued partners, we aim to develop successful product formulations by providing dedicated technical expertise, application support, and innovative solutions.',
    chips: ['Functional', 'Product Application', 'Bakery'],
    chipLabel: 'Key R&D Laboratories',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Poultry Disease Diagnostics',
    description: 'Comprehensive Disease control begins with feed mill and extends through strict biosecurity, vector control, and continuous flock monitoring. \n\nNewcastle Disease titres are verified through periodic serological testing, while enhanced biosecurity protocols safeguard against Avian Influenza, including controlled farm access, sanitation barriers, and perimeter management\n\nOur in-house diagnostic laboratory supports proactive flock health management through microbiological, serological, and molecular testing. Strict biosecurity protocols, controlled sample handling, and regulatory-aligned testing frameworks ensure early detection, disease prevention, and sustained flock health.',
    chips: ['Microbiology', 'Serology', 'Necropsy', 'Post Mortem'],
    chipLabel: 'Testings',
    fullWidth: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Controlled Processing Environment',
    description: 'Fresh eggs are received and processed daily in a modern, high-capacity facility operating under internationally aligned systems. All inputs—including air, water, processing aids, and packaging materials—are rigorously tested prior to use. Filtered air and sanitized process water are routinely monitored for microbiological and physicochemical integrity. Positive pressure packing rooms, validated HACCP protocols, monitored critical control points, and structured pest management ensure consistent product safety and quality.',
    fullWidth: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

const containerVariants = makeContainerVariants(0.1);
const itemVariants = makeItemVariants({ y: 25, stiffness: 80 });

// Lab Capabilities / Analytical Excellence. Shared by the Laboratory page and
// the Quality, Food Safety & Traceability hub page. `className` controls the
// inner container width/padding so each page can supply its own.
export default function LaboratoryAnalytical({ className = '' }) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`w-full flex flex-col gap-10 ${className}`}
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-4 max-w-2xl">
        <span className="section-label">
          Lab Capabilities
        </span>
        <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
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
            className={`p-6 bg-white border border-[#eee] rounded-[10px] flex flex-col gap-4 ${section.fullWidth ? 'sm:col-span-2' : ''} hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.1)] transition-all duration-300 group`}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-[8px] bg-brand-600/6 border border-brand-600/12 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                {section.icon}
              </div>
              <h3 className="font-heading font-bold text-[14px] text-heading m-0 tracking-tight leading-snug pt-2">
                {section.title}
              </h3>
            </div>
            {section.description.split('\n\n').map((para, k) => (
              <p key={k} className="font-body text-[14px] text-surface-500 leading-[24px] m-0">
                {para}
              </p>
            ))}

            {/* Chips footer - pinned to the card bottom so every card in a row lines up */}
            {(section.chips || section.extraChips) && (
            <div className="mt-auto flex flex-col gap-4">

            {/* Primary chips */}
            {section.chips && (
            <div className="flex flex-col gap-2">
              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-600">
                {section.chipLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {section.chips.map((chip, j) => (
                  <span
                    key={j}
                    className="font-body text-[10px] font-medium uppercase tracking-wide text-surface-600 bg-white border border-[#eee] px-2.5 py-1 rounded-[6px]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            )}

            {/* Extra chips (microbiological params) */}
            {section.extraChips && (
              <div className="flex flex-col gap-2">
                <span className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-600">
                  {section.extraChipLabel}
                </span>
                <div className="flex flex-wrap gap-2">
                  {section.extraChips.map((chip, j) => (
                    <span
                      key={j}
                      className="font-body text-[10px] font-medium uppercase tracking-wide text-surface-600 bg-white border border-[#eee] px-2.5 py-1 rounded-[6px]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            )}
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
  );
}
