import React from 'react';
import { motion } from 'framer-motion';
import IconInfoCard from '../../../components/common/IconInfoCard';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';

// Import QA lab images
import ConicalFlask from '../../../assets/4. QUALITY/Quality Assurance/Conical flask.webp';
import ExtractionRoom from '../../../assets/4. QUALITY/Quality Assurance/Extraction room.webp';
import GCMS from '../../../assets/4. QUALITY/Quality Assurance/GCMS.webp';
import PetriPlate from '../../../assets/4. QUALITY/Quality Assurance/Petriplate and sample.webp';
import Protein from '../../../assets/4. QUALITY/Quality Assurance/Protein.webp';

const qaImages = [
  { src: ConicalFlask, alt: 'Conical Flask - Physicochemical Testing', label: 'Physicochemical Testing' },
  { src: ExtractionRoom, alt: 'Extraction Room - Residue Analysis', label: 'Extraction Room' },
  { src: GCMS, alt: 'GC-MS Instrument - Residue Monitoring', label: 'GC-MS Analysis' },
  { src: PetriPlate, alt: 'Petri Plate & Sample - Microbiological Testing', label: 'Microbiological Testing' },
  { src: Protein, alt: 'Protein Analysis Laboratory', label: 'Protein Analysis' },
];

const qaStats = [
  { value: 'Since 2006', label: 'NABL Accredited Lab', icon: '🏆' },
  { value: 'ISO/IEC 17025', label: 'Laboratory Accreditation', icon: '📋' },
  { value: 'EU & Japan', label: 'Regulatory Compliance', icon: '🌏' },
  { value: 'GC-MS · LC-MS · HPLC · AAS', label: 'Analytical Platforms', icon: '🔬' },
];

const qaBlocks = [
  {
    title: 'End-to-End Quality Control',
    body: 'A dedicated Quality Assurance team monitors parameters from raw materials to finished products, ensuring safety, specification compliance, and batch consistency.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Physicochemical & Functional Testing',
    body: 'Every lot is verified for freshness and key physicochemical parameters including protein, fat, moisture, pH, solubility, organic acids, and total solids. Our functional testing laboratory evaluates performance characteristics such as emulsification, foam stability, gel strength, viscosity, and baking performance—ensuring reliable application outcomes for industrial customers.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Residue & Contaminant Monitoring',
    body: 'Comprehensive surveillance ensures products are free from antibiotics, pesticides, and contaminants. Advanced analytical platforms including GC-MS, LC-MS/MS, HPLC, and AAS support rigorous testing of feed inputs, water, tissues, eggs, and finished products in line with EU and Japanese standards. Sampling and analysis are conducted in accordance with EU Directive 96/23 and relevant regulatory frameworks.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    title: 'Microbiological Assurance',
    body: 'Modern biosafety-controlled laboratories conduct pathogen and environmental monitoring to ensure product safety prior to dispatch. Parameters include Salmonella, E. coli, Enterobacteriaceae, Total Plate Count, Staphylococcus aureus, Bacillus cereus, Yeast and Mold.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const biosecurityBlocks = [
  {
    title: 'Disease Prevention & Monitoring',
    body: 'Comprehensive Disease control begins with certified hatcheries and extends through strict biosecurity, vector control, and continuous flock monitoring. Newcastle Disease titres are verified through periodic serological testing, while enhanced biosecurity protocols safeguard against Avian Influenza, including controlled farm access, sanitation barriers, and perimeter management. Farms supplying eggs are registered establishments in accordance with EU Directive 2008/798 requirements.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
  },
  {
    title: 'Controlled Processing Environment',
    body: 'Fresh eggs are received and processed daily in a modern, high-capacity facility operating under internationally aligned systems. All inputs—including air, water, processing aids, and packaging materials—are rigorously tested prior to use. Filtered air and sanitized process water are routinely monitored for microbiological and physicochemical integrity. Positive pressure packing rooms, validated HACCP protocols, monitored critical control points, and structured pest management ensure consistent product safety and quality.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];


export default function QualityAssurance() {
  const containerVariants = makeContainerVariants(0.1);
  const itemVariants = makeItemVariants({ y: 25, stiffness: 80 });

  return (
    <div id="quality-assurance" className="w-full bg-page pt-[100px] sm:pt-[110px] lg:pt-[120px] pb-[40px] lg:pb-[60px] border-b border-[#eee] overflow-hidden">
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
            Quality Assurance
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading leading-[1.1] tracking-tight m-0"
          >
            Quality Assurance &amp;{' '}
            Laboratory Excellence
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-body text-[16px] text-surface-500 max-w-3xl leading-[30px] m-0"
          >
            Our ISO/IEC 17025 (NABL) accredited laboratory, operational since 2006, supports compliance with European and Japanese regulatory standards. Quality systems are driven by HACCP, 5S, TQM, and continuous improvement practices, ensuring disciplined control across every stage of production.
          </motion.p>
        </div>

        {/* Stats Bar */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {qaStats.map((stat, i) => (
            <div
              key={i}
              className="p-5 bg-brand-600/4 border border-[rgba(228, 10, 24,0.10)] rounded-[10px] flex flex-col gap-1.5 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.1)] transition-all duration-300"
            >
              <span className="text-2xl">{stat.icon}</span>
              <span className="font-heading font-bold text-[15px] text-brand-600 leading-tight">{stat.value}</span>
              <span className="text-[10px] font-semibold text-surface-500 uppercase tracking-wide leading-tight">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Lab Photo Gallery */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-surface-400 uppercase tracking-widest m-0 text-center">Our Laboratory Facilities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {qaImages.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, y: -4 }}
                className="relative rounded-[20px] overflow-hidden aspect-[3/4] border border-[#eee] group hover:shadow-[5px_3px_40px_rgba(0,72,88,0.12)] hover:border-brand-600/30 transition-all duration-300"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-[10px] font-bold text-white uppercase tracking-wider leading-tight m-0">
                    {img.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* QA Detail Blocks */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {qaBlocks.map((block, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ y: -5 }}>
              <IconInfoCard icon={block.icon} title={block.title} body={block.body} />
            </motion.div>
          ))}
        </motion.div>

        {/* Section divider and header for Farm Biosecurity & Process Control */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3 mt-8 border-t border-surface-100 pt-12 text-center"
        >
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-surface-850 leading-tight tracking-tight m-0">
            Farm Biosecurity &amp; Process Control
          </h3>
          <div className="h-[3px] w-12 bg-brand-600 rounded-full" />
        </motion.div>

        {/* Biosecurity Detail Blocks */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {biosecurityBlocks.map((block, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ y: -5 }}>
              <IconInfoCard icon={block.icon} title={block.title} body={block.body} />
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
            Bio-secure sourcing. Controlled processing. Assured integrity.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}
