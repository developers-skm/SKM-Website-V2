import React from 'react';
import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';

// Import certificate images
import BRC from '../../../assets/4. QUALITY/Certificates/BRC FOOD_524x600px.png';
import EIC from '../../../assets/4. QUALITY/Certificates/EIC_524x600px.png';
import ERC from '../../../assets/4. QUALITY/Certificates/ERC_524x600px.png';
import FSSAI from '../../../assets/4. QUALITY/Certificates/FSSAI_524x600px.png';
import HALAL from '../../../assets/4. QUALITY/Certificates/HALAL_524x600px.png';
import ISO22000 from '../../../assets/4. QUALITY/Certificates/ISO 22000_524x600px.png';
import KOSHER from '../../../assets/4. QUALITY/Certificates/KOSHER_524x600px.png';
import NABL from '../../../assets/4. QUALITY/Certificates/NABL 17025_524x600px.png';

const certificates = [
  {
    id: 'brc',
    name: 'BRC Food',
    image: BRC,
    description: 'BRC Global Standard for Food Safety – ensuring highest food safety and quality management practices globally recognized by retailers and manufacturers.',
  },
  {
    id: 'eic',
    name: 'EIC',
    image: EIC,
    description: 'Export Inspection Council certification confirming compliance with Indian export standards and international food safety requirements for egg products.',
  },
  {
    id: 'erc',
    name: 'ERC',
    image: ERC,
    description: 'European Registration Compliance – confirming our establishment meets European Union norms for egg processing and export.',
  },
  {
    id: 'fssai',
    name: 'FSSAI',
    image: FSSAI,
    description: 'Food Safety and Standards Authority of India certification ensuring compliance with Indian food safety laws and hygiene standards.',
  },
  {
    id: 'halal',
    name: 'HALAL',
    image: HALAL,
    description: 'Halal certification confirming our products meet strict Islamic dietary laws and hygiene requirements, enabling access to global Halal markets.',
  },
  {
    id: 'iso22000',
    name: 'ISO 22000',
    image: ISO22000,
    description: 'ISO 22000 Food Safety Management System certification – internationally recognized standard for food safety management across the entire food supply chain.',
  },
  {
    id: 'kosher',
    name: 'KOSHER',
    image: KOSHER,
    description: 'Kosher certification ensuring our egg products meet Jewish dietary laws, enabling export to global Kosher-certified markets and distributors.',
  },
  {
    id: 'nabl',
    name: 'NABL ISO/IEC 17025',
    image: NABL,
    description: "National Accreditation Board for Testing and Calibration Laboratories accreditation per ISO/IEC 17025 – confirming our laboratory's technical competence and testing accuracy since 2006.",
  },
];

export default function Certifications() {

  const containerVariants = makeContainerVariants(0.08);
  const itemVariants = makeItemVariants({ y: 25, stiffness: 80 });

  return (
    <div id="quality-certifications" className="w-full bg-page dark:bg-surface-900/40 pt-[100px] sm:pt-[110px] lg:pt-[120px] pb-[40px] lg:pb-[60px] border-b border-[#eee] dark:border-surface-800/40 overflow-hidden">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-14"
      >
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <motion.span
            variants={itemVariants}
            className="section-label justify-center"
          >
            Certifications
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
          >
            Our{' '}
            Certifications
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-body text-[16px] text-surface-500 dark:text-surface-400 max-w-2xl leading-[30px] m-0"
          >
            Internationally recognized certifications that validate our commitment to food safety, quality, and compliance across global markets.
          </motion.p>
        </div>

        {/* Certificates Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[10px] overflow-hidden shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.14)] hover:border-brand-600/30 transition-all duration-300 group"
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Certificate Image */}
              <div className="relative p-6 pb-4 flex items-center justify-center">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full max-w-[180px] h-auto object-contain select-none transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Cert Name */}
              <div className="relative px-5 pb-4 text-center">
                <p className="font-heading font-bold text-[12px] text-surface-700 dark:text-surface-300 uppercase tracking-wider m-0">
                  {cert.name}
                </p>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Info bar */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center text-center"
        >
          <span className="font-body text-[12px] font-semibold text-brand-600 dark:text-brand-400">
            {certificates.length} Active Certifications &amp; Accreditations
          </span>
        </motion.div>
      </motion.section>
    </div>
  );
}
