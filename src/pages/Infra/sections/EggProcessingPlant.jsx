import React from 'react';
import { motion } from 'framer-motion';
import ImageSlider from '../../../components/ImageSlider/ImageSlider';
import IconInfoCard from '../../../components/common/IconInfoCard';
import StatCard from '../../../components/common/StatCard';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';

// Campus
import CampusOverview from '../../../assets/5. INFRASTRUCTURE/Egg Products/Campus/Campus overview.webp';
import AdminEntrance from '../../../assets/5. INFRASTRUCTURE/Egg Products/Campus/Admin Enterance.webp';
import SecurityEntrance from '../../../assets/5. INFRASTRUCTURE/Egg Products/Campus/Security enterance.webp';
import Temple from '../../../assets/5. INFRASTRUCTURE/Egg Products/Campus/Temple.webp';
import TransportOffice from '../../../assets/5. INFRASTRUCTURE/Egg Products/Campus/Transport office.webp';
import WeighBridge from '../../../assets/5. INFRASTRUCTURE/Egg Products/Campus/Weigh bridge.jpg';

// Process area
import AlbumenDryer from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Albumen Dryer.webp';
import BlastTreatment from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Blast treatment.webp';
import CIP from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/CIP.webp';
import ColdRoom from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Cold room.webp';
import Concentration from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Concentration.webp';
import EggBreaking from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Egg Breaking.webp';
import EggStorage from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Egg Storage.webp';
import EggConveyor from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Egg conveyor.webp';
import FPG from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/FPG.webp';
import FrozenStorage from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Frozen storage.webp';
import HotRoom from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Hot room.webp';
import LiquidFilling from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Liquid filling.webp';
import Pasteurization from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Pasteurization.webp';
import PrePasteurization from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Pre pasteurization.webp';
import RMG from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/RMG.webp';
import YolkDryer from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Yolk Dryer.webp';

// Utility
import Biogas from '../../../assets/5. INFRASTRUCTURE/Egg Products/Utility/Biogas.webp';
import Boiler from '../../../assets/5. INFRASTRUCTURE/Egg Products/Utility/Boiler.webp';
import ETP from '../../../assets/5. INFRASTRUCTURE/Egg Products/Utility/ETP.webp';
import UtilityOverview from '../../../assets/5. INFRASTRUCTURE/Egg Products/Utility/Utility Overview.webp';
import WTP from '../../../assets/5. INFRASTRUCTURE/Egg Products/Utility/WTP.webp';

const campusImages = [
  { src: AdminEntrance, label: 'Admin Entrance' },
  { src: SecurityEntrance, label: 'Security Entrance' },
  { src: WeighBridge, label: 'Weigh Bridge' },
  { src: TransportOffice, label: 'Transport Office' },
  { src: Temple, label: 'Temple' },
];

const processAreaImages = [
  { src: EggBreaking, label: 'Egg Breaking' },
  { src: EggConveyor, label: 'Egg Conveyor' },
  { src: EggStorage, label: 'Egg Storage' },
  { src: PrePasteurization, label: 'Pre-Pasteurization' },
  { src: Pasteurization, label: 'Pasteurization' },
  { src: Concentration, label: 'Concentration' },
  { src: AlbumenDryer, label: 'Albumen Dryer' },
  { src: YolkDryer, label: 'Yolk Dryer' },
  { src: BlastTreatment, label: 'Blast Treatment' },
  { src: ColdRoom, label: 'Cold Room' },
  { src: FrozenStorage, label: 'Frozen Storage' },
  { src: HotRoom, label: 'Hot Room' },
  { src: LiquidFilling, label: 'Liquid Filling' },
  { src: CIP, label: 'CIP System' },
  { src: FPG, label: 'FPG' },
  { src: RMG, label: 'RMG' },
];

const utilityImages = [
  { src: UtilityOverview, label: 'Utility Overview' },
  { src: Boiler, label: 'Boiler' },
  { src: WTP, label: 'Water Treatment Plant' },
  { src: ETP, label: 'Effluent Treatment Plant' },
  { src: Biogas, label: 'Biogas Facility' },
];

const infoBlocks = [
  {
    title: 'Facility & Regulatory Compliance',
    body: 'The SKM egg processing facility is constructed and equipped in accordance with EU and USDA regulatory requirements. The plant is approved under the Indian Export of Egg Products Quality Control & Monitoring Rules (1997), based on EU/USDA guidelines (Approval No: 05/2/EP/97). Two dedicated production lines—yolk and albumen—operate within a fully automated, climate-controlled environment. Sterile zones are maintained under positive pressure, supported by an automated CIP system for validated cleaning of tanks and pipelines. Utilities are housed separately to prevent contamination risks, and effluent is treated in line with environmental standards to support sustainable operations.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Process Excellence',
    body: 'Only microbiologically tested eggs are processed, with a capacity of 2 million eggs per day, producing approximately 7,500 tonnes annually. Customized formulations, including co-dried and dry-blend solutions, are developed in collaboration with customers. Operations follow cGMP, SSOP, Codex Alimentarius principles, and HACCP guidelines. All activities are monitored through the integrated traceability system, ensuring food safety and full traceability.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Zoning & Hygiene Control',
    body: 'Strict zoning protocols (red, white, and neutral areas) prevent cross-contamination, with dedicated tools and consumables for each zone. Personnel hygiene is tightly controlled through mandatory sanitation procedures, protective clothing, environmental swabbing, and routine air quality monitoring.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Sustainable Energy – Biogas Initiative',
    body: 'Our integrated biogas facility supports circular and environmentally responsible operations. The plant has a 70-tonne poultry litter handling capacity. In addition, nutrient-rich liquid fertilizer generated as a by-product is supplied to farmers at no cost, reinforcing our commitment to sustainable agriculture.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const statsData = [
  { value: '2M+', label: 'Eggs Processed / Day' },
  { value: '7,500T', label: 'Annual Production' },
  { value: 'EU & USDA', label: 'Regulatory Approval' },
  { value: '70T', label: 'Biogas Litter Capacity' },
];

export default function EggProcessingPlant() {

  const containerVariants = makeContainerVariants(0.1);
  const itemVariants = makeItemVariants({ y: 25, stiffness: 80 });

  return (
    <div className="w-full bg-page dark:bg-surface-950 overflow-hidden">

      {/* ── Hero ── */}
      <div className="relative pt-[110px] pb-[90px] sm:pt-[130px] bg-page dark:bg-surface-950 border-b border-[#eee] dark:border-surface-800/40 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 dark:bg-brand-950/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-6 items-start">
          <span className="section-label">
            Infrastructure
          </span>
          <h1 className="font-heading font-bold text-[42px] sm:text-[52px] lg:text-[60px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Egg Processing{' '}
            Plant
          </h1>
          <p className="font-body text-[16px] leading-[30px] text-surface-500 dark:text-surface-400 max-w-2xl m-0">
            A fully automated, EU & USDA-compliant egg processing facility with a capacity of 2 million eggs per day, producing premium egg products under stringent food safety standards.
          </p>
        </div>
      </div>

      {/* ── Campus Overview ── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex flex-col gap-10"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Campus</span>
          <h2 className="font-heading font-bold text-[24px] sm:text-[30px] text-heading dark:text-white tracking-tight m-0">
            Campus Overview
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} />
          ))}
        </motion.div>

        {/* Grand Campus Overview Image */}
        <motion.div
          variants={itemVariants}
          className="relative w-full overflow-hidden rounded-[24px] group shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
        >
          <img
            src={CampusOverview}
            alt="Campus Overview"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
            <span className="font-heading font-bold text-white text-[18px] sm:text-[22px] tracking-tight drop-shadow-md">
              Campus Overview
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ImageSlider images={campusImages} autoPlay={3500} />
        </motion.div>
      </motion.section>

      {/* ── Process Area ── */}
      <div className="w-full bg-page dark:bg-surface-900/10 border-t border-b border-surface-100 dark:border-surface-800/40 py-16 lg:py-20">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10"
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Inside the Plant</span>
            <h2 className="font-heading font-bold text-[24px] sm:text-[30px] text-heading dark:text-white tracking-tight m-0">
              Process Area
            </h2>
            <p className="font-body text-[15px] text-surface-500 dark:text-surface-400 max-w-2xl m-0 leading-[26px]">
              Two dedicated production lines for yolk and albumen operate in a fully automated, climate-controlled sterile environment.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ImageSlider images={processAreaImages} autoPlay={3500} />
          </motion.div>
        </motion.section>
      </div>

      {/* ── Utility Area ── */}
      <div className="w-full bg-page dark:bg-surface-950 py-16 lg:py-20">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10"
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Support Systems</span>
            <h2 className="font-heading font-bold text-[24px] sm:text-[30px] text-heading dark:text-white tracking-tight m-0">
              Utility Area
            </h2>
            <p className="font-body text-[15px] text-surface-500 dark:text-surface-400 max-w-2xl m-0 leading-[26px]">
              Utility systems are housed separately to prevent contamination, supporting efficient and sustainable plant operations.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ImageSlider images={utilityImages} autoPlay={3500} />
          </motion.div>
        </motion.section>
      </div>

      {/* ── Info Blocks ── */}
      <div className="w-full bg-page dark:bg-surface-900/10 border-t border-surface-100 dark:border-surface-800/40 py-16 lg:py-24">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10"
        >
          <motion.div variants={itemVariants} className="text-center flex flex-col items-center gap-3">
            <span className="section-label justify-center">
              Plant Operations
            </span>
            <h2 className="font-heading font-bold text-[34px] sm:text-[40px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
              Standards &{' '}
              Sustainability
            </h2>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {infoBlocks.map((block, i) => (
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
              EU-approved facility. HACCP-driven processes. Sustainable by design.
            </p>
          </motion.div>
        </motion.section>
      </div>

    </div>
  );
}
