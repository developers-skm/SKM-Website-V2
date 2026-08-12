import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import SafeImage from '../../../components/common/SafeImage';
import { fadeUp } from '../../../utils/motionTokens';

import CampusOverview from '../../../assets/5. INFRASTRUCTURE/Egg Products/Campus/Campus overview.webp';
import Pasteurization from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Pasteurization.webp';
import CIP from '../../../assets/5. INFRASTRUCTURE/Egg Products/Process areas/CIP.webp';
import UtilityOverview from '../../../assets/5. INFRASTRUCTURE/Egg Products/Utility/Utility Overview.webp';

// Section 8 — Infrastructure / Manufacturing. Large sticky visual (CSS
// position:sticky, NOT scroll-jacked/pinned like Traceability's section —
// deliberately a different mechanic so two identical sticky sequences don't
// run back to back) beside scrolling content blocks. Content drawn verbatim
// from src/pages/Infra/sections/EggProcessingPlant.jsx `infoBlocks` (real
// facility copy — facility compliance, process excellence, zoning/hygiene,
// biogas sustainability) — same content already approved and live on the
// Egg Processing Plant page, restructured for this composition, not
// invented. Each block activates on scroll via IntersectionObserver-driven
// whileInView, swapping the sticky image via crossfade.
const blocks = [
  {
    id: 'facility',
    eyebrow: 'Facility & Regulatory Compliance',
    title: 'Built to EU & USDA standards.',
    body: 'Constructed and equipped in accordance with EU and USDA regulatory requirements, approved under the Indian Export of Egg Products Quality Control & Monitoring Rules (1997). Two dedicated production lines — yolk and albumen — operate within a fully automated, climate-controlled environment.',
    image: CampusOverview,
  },
  {
    id: 'process',
    eyebrow: 'Process Excellence',
    title: '2 million eggs, processed daily.',
    body: 'Only microbiologically tested eggs are processed, producing approximately 7,500 tonnes annually. Operations follow cGMP, SSOP, Codex Alimentarius principles, and HACCP guidelines — every activity monitored through the integrated traceability system.',
    image: Pasteurization,
  },
  {
    id: 'zoning',
    eyebrow: 'Zoning & Hygiene Control',
    title: 'Contamination prevented by design.',
    body: 'Strict zoning protocols — red, white, and neutral areas — prevent cross-contamination, with dedicated tools and consumables for each zone, mandatory sanitation procedures, and routine air quality monitoring.',
    image: CIP,
  },
  {
    id: 'utility',
    eyebrow: 'Sustainable Energy — Biogas Initiative',
    title: 'A circular approach to plant utilities.',
    body: 'Our integrated biogas facility handles 70 tonnes of poultry litter, supporting circular and environmentally responsible operations. Nutrient-rich liquid fertilizer generated as a by-product is supplied to farmers at no cost.',
    image: UtilityOverview,
  },
];

function ContentBlock({ block, index, onEnter, reduceMotion }) {
  return (
    <div className="relative py-14 lg:py-20 border-t border-surface-200/70 dark:border-surface-800 first:border-t-0 first:pt-0">
      {/* Invisible tripwire — tracks which block is active for the sticky
          image, decoupled from the entrance fade below so scrolling back up
          doesn't replay the content reveal every time. */}
      <motion.span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        onViewportEnter={() => onEnter(index)}
        viewport={{ once: false, margin: '-45% 0px -45% 0px' }}
      />
      <motion.div {...fadeUp(reduceMotion, { distance: 28, duration: 0.8 })} className="flex flex-col gap-4">
        <span className="font-body text-[12.5px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          {block.eyebrow}
        </span>
        <h3 className="font-heading font-bold text-[26px] sm:text-[30px] lg:text-[34px] text-heading dark:text-white leading-[1.15] tracking-tight m-0">
          {block.title}
        </h3>
        <p className="font-body text-[15.5px] lg:text-[16.5px] text-surface-500 dark:text-surface-400 leading-[1.8] max-w-lg m-0">
          {block.body}
        </p>
        {/* Mobile-only inline image, since sticky panel is desktop-only */}
        <div className="lg:hidden relative mt-2 rounded-[8px] overflow-hidden aspect-[4/3]">
          <SafeImage src={block.image} alt={block.title} loading="lazy" className="w-full h-full object-cover" />
        </div>
      </motion.div>
    </div>
  );
}

const stats = [
  { value: '1996', label: 'Established' },
  { value: '2 Million', label: 'Eggs processed per day' },
  { value: '7,500 MT', label: 'Egg powder annually' },
  { value: 'ISO 22000', label: 'Certified poultry & feed mill' },
];

export default function CompanyIntro({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = blocks[activeIndex];

  return (
    <div className="w-full bg-white dark:bg-surface-900/40 py-20 lg:py-28">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">

        <motion.div {...fadeUp(reduceMotion)} className="flex flex-col gap-4 max-w-2xl mb-10">
          <span className="section-label">Infrastructure</span>
          <h2 className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[52px] text-heading dark:text-white leading-[1.05] tracking-tight m-0">
            Asia's largest integrated egg processing facility.
          </h2>
        </motion.div>

        <motion.div {...fadeUp(reduceMotion, { delay: 0.1 })} className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 border-y border-surface-200/70 dark:border-surface-800 py-8 mb-14 lg:mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1.5">
              <span className="font-heading font-bold text-[22px] sm:text-[26px] text-brand-600 dark:text-brand-400 leading-none tabular-nums">
                {stat.value}
              </span>
              <span className="font-body text-[12.5px] sm:text-[13px] text-surface-500 dark:text-surface-400 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Sticky visual — desktop only, plain CSS sticky (not scroll-jacked) */}
          <div className="hidden lg:block lg:col-span-6 lg:sticky lg:top-28 lg:self-start">
            <div className="relative rounded-[8px] overflow-hidden aspect-[4/5]">
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <SafeImage
                    src={active.image}
                    alt={active.eyebrow}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                {blocks.map((b, i) => (
                  <span
                    key={b.id}
                    className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${i === activeIndex ? 'bg-white' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling content blocks */}
          <div className="lg:col-span-6 flex flex-col">
            {blocks.map((block, i) => (
              <ContentBlock key={block.id} block={block} index={i} onEnter={setActiveIndex} reduceMotion={reduceMotion} />
            ))}

            <div className="pt-4">
              <InternalLink
                route="egg_processing_plant"
                onPageChange={onPageChange}
                className="group inline-flex items-center gap-2 font-body font-semibold text-[15px] text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
              >
                More About Our Facility
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className={reduceMotion ? '' : 'group-hover:translate-x-0.5 transition-transform duration-[250ms]'} aria-hidden>
                  <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
                  <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
                </svg>
              </InternalLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
