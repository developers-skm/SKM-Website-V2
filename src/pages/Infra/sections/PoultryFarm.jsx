import React from 'react';
import { motion } from 'framer-motion';
import ImageSlider from '../../../components/ImageSlider/ImageSlider';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import IconInfoCard from '../../../components/common/IconInfoCard';
import StatCard from '../../../components/common/StatCard';

import MainGate from '../../../assets/5. INFRASTRUCTURE/Poultry farm/Main gate.webp';
import Entrance from '../../../assets/5. INFRASTRUCTURE/Poultry farm/Entrance.webp';
import ECshedOverview from '../../../assets/5. INFRASTRUCTURE/Poultry farm/EC shed overview.webp';
import ECshedInside from '../../../assets/5. INFRASTRUCTURE/Poultry farm/EC shed inside view.webp';
import OpenShed from '../../../assets/5. INFRASTRUCTURE/Poultry farm/Open shed view.webp';
import ShedFencing from '../../../assets/5. INFRASTRUCTURE/Poultry farm/Shed fencing.webp';
import HenInsideCage from '../../../assets/5. INFRASTRUCTURE/Poultry farm/Hen inside cage.webp';
import FeederView from '../../../assets/5. INFRASTRUCTURE/Poultry farm/Feeder view.webp';
import EggCollectingConveyor from '../../../assets/5. INFRASTRUCTURE/Poultry farm/Egg collecting conveyor.webp';
import EggCollectionArea from '../../../assets/5. INFRASTRUCTURE/Poultry farm/Egg collection area.webp';
import Silo from '../../../assets/5. INFRASTRUCTURE/Poultry farm/Silo.webp';
import MenEntryShower from '../../../assets/5. INFRASTRUCTURE/Poultry farm/Men entry shower.webp';
import ShowerArea from '../../../assets/5. INFRASTRUCTURE/Poultry farm/Shower area.webp';
import VehicleEntryShower from '../../../assets/5. INFRASTRUCTURE/Poultry farm/Vehicle entry shower.webp';

const farmImages = [
  { src: MainGate, label: 'Main Gate' },
  { src: Entrance, label: 'Farm Entrance' },
  { src: ECshedOverview, label: 'EC Shed Overview' },
  { src: ECshedInside, label: 'EC Shed Inside' },
  { src: OpenShed, label: 'Open Shed' },
  { src: ShedFencing, label: 'Shed Fencing' },
  { src: HenInsideCage, label: 'Hen Inside Cage' },
  { src: FeederView, label: 'Feeder View' },
  { src: EggCollectingConveyor, label: 'Egg Collecting Conveyor' },
  { src: EggCollectionArea, label: 'Egg Collection Area' },
  { src: Silo, label: 'Feed Silo' },
  { src: MenEntryShower, label: 'Personnel Entry Shower' },
  { src: ShowerArea, label: 'Shower Area' },
  { src: VehicleEntryShower, label: 'Vehicle Entry Shower' },
];

const statsData = [
  { value: '2.4M', label: 'Layers Housed' },
  { value: '164M', label: 'Eggs Annually' },
  { value: 'ISO 22000', label: 'Certified Farms' },
  { value: 'EC Sheds', label: 'Environmentally Controlled' },
];

const infoBlocks = [
  {
    title: 'Integrated Poultry Farms',
    body: 'Our ISO 22000 certified poultry farms ensure the production of clean, residue-free eggs under strict biosecurity controls. With 2.4 million layers housed across the farm, the farms produce approximately 164 million eggs annually. Dedicated chick and grower facilities, located separately, support controlled rearing environments. Our state-of-the-art farm facility includes environmentally controlled sheds optimized with automation.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: 'State-of-the-Art Facilities',
    body: 'State-of-the-art farm with environmentally controlled sheds. Comprehensive structural and operational biosecurity measures safeguard flock health. An attached laboratory routinely analyses water, tissues, and egg samples to ensure ongoing safety and quality monitoring.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Animal Welfare & Food Safety',
    body: 'Balanced, nutritionally optimized feed, daily sanitation protocols, potable water management, and safe disposal systems—including an on-site incinerator—maintain high standards of animal welfare and food safety.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Biosecurity & Hygiene Controls',
    body: 'Strict personnel and vehicle entry shower systems enforce biosecurity at every access point. Zoned layouts prevent cross-contamination between flocks, while dedicated sanitation barriers and perimeter controls maintain the integrity of the controlled environment across all farm sections.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function PoultryFarm() {

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
            Poultry{' '}
            Farm
          </h1>
          <p className="font-body text-[16px] leading-[30px] text-surface-500 dark:text-surface-400 max-w-2xl m-0">
            ISO 22000 certified integrated poultry farms housing 2.4 million layers, producing approximately 164 million eggs annually under strict biosecurity and animal welfare standards.
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
        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} />
          ))}
        </motion.div>

        {/* Featured hero image */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-[20px] overflow-hidden border border-[#eee] dark:border-surface-800 shadow-[5px_3px_40px_rgba(0,72,88,0.08)] group aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/7]"
        >
          <img
            src={ECshedOverview}
            alt="SKM Poultry Farm – Environmentally Controlled Shed Overview"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="text-xs font-bold text-white/80 uppercase tracking-widest m-0">SKM Poultry Farms — Environmentally Controlled Shed</p>
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
            <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Farm Gallery</span>
            <h2 className="font-heading font-bold text-[24px] sm:text-[30px] text-heading dark:text-white tracking-tight m-0">
              Farm Facilities
            </h2>
            <p className="font-body text-[15px] text-surface-500 dark:text-surface-400 max-w-2xl m-0 leading-[26px]">
              A look inside our integrated poultry farm — from environmentally controlled sheds to egg collection, biosecurity entry points, and feed management.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ImageSlider images={farmImages} />
          </motion.div>
        </motion.section>
      </div>

      {/* ── Info Blocks ── */}
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
              Farm Operations
            </span>
            <h2 className="font-heading font-bold text-[34px] sm:text-[40px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
              Integrated &{' '}
              Biosecure
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
              ISO 22000 certified. Biosecure farms. Residue-free eggs.
            </p>
          </motion.div>
        </motion.section>
      </div>

    </div>
  );
}
