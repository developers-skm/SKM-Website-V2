import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { itemVariants } from '../../utils/animationVariants';

import pic1 from '../../assets/ACCOLADES/Picture1.png';
import pic2 from '../../assets/ACCOLADES/Picture2.png';
import pic3 from '../../assets/ACCOLADES/Picture3.png';
import pic4 from '../../assets/ACCOLADES/Picture4.png';
import pic5 from '../../assets/ACCOLADES/Picture5.png';
import pic6 from '../../assets/ACCOLADES/Picture6.png';
import pic7 from '../../assets/ACCOLADES/Picture7.png';
import pic8 from '../../assets/ACCOLADES/Picture8.png';

const galleryItems = [
  {
    image: pic1,
    name: 'The Power of i (India)',
    description:
      'SKM Egg recognised that Shree Shivkumar has single-handedly made SKM a Category Leader in key Export Markets.',
  },
  {
    image: pic2,
    name: 'The Power of i (India)',
    description:
      'SKM Egg recognised that Shree Shivkumar has single-handedly made SKM a Category Leader in key Export Markets.',
  },
  {
    image: pic3,
    name: 'Best 5S Practice Award 2016',
    description: 'Best 5S Practice Award in 2016 provided by M/S ABK-AOTS.',
  },
  {
    image: pic4,
    name: 'Golden Trophy – APEDA 2011-2012',
    description:
      '"Golden Trophy" award provided by APEDA, Ministry of Commerce, Government of India for the year 2011-2012.',
  },
  {
    image: pic5,
    name: 'Golden Trophy – APEDA 2012-2013',
    description:
      '"Golden Trophy" award provided by APEDA, Ministry of Commerce, Government of India for the year 2012-2013.',
  },
  {
    image: pic6,
    name: 'Export Excellence Award – MEPZ 2013',
    description: 'Export Excellence Award at MEPZ, Special Economic Zone – Chennai 2013.',
  },
  {
    image: pic7,
    name: 'Padma Shree Award',
    description:
      'Shri SKM Maeilanandhan receiving Padma Shree Award from Honourable President of India, Shri Pranab Mukherjee.',
  },
  {
    image: pic8,
    name: 'Padma Shree Award',
    description:
      'Shri SKM Maeilanandhan receiving Padma Shree Award from Honourable President of India, Shri Pranab Mukherjee.',
  },
];

const otherAwards = [
  'We have been awarded Manufacturing Excellence Silver Award in 2006 and Manufacturing Excellence Gold Award in 2007 & 2008 by Frost & Sullivan.',
  'We have been awarded State Safety Award for the year 2007 by Government of Tamil Nadu.',
  'We have been awarded Best Export Performance Awards in 100% EOU category by MEPZ (Madras Export Processing Zone) for the year 2005-06.',
  'At SKM we are proud to be the leading exporter from India and in recognition of our performance the APEDA [Govt. of India] is awarding us the Silver Trophy since 2001 onwards. We have also been recognized by other Government bodies for our achievement in various fields.',
];

const headerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

/*
  Metro grid layout — images in natural order, CSS auto-placement fills rows:

  Col:  1       2       3       4
  R1: [   Pic1 (span-2)  ] [Pic2] [Pic3]
  R2: [Pic4] [Pic5] [   Pic6 (span-2)  ]
  R3: [   Pic7 (span-2)  ] [   Pic8 (span-2)  ]

  colSpan drives which cells each image occupies; auto-placement handles rows.
*/
const colSpans = [2, 1, 1, 1, 1, 2, 2, 2];

function GalleryCard({ item, index, className = '' }) {
  return (
    <motion.div
      className={`relative overflow-hidden group ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: 0.04 * index }}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover select-none"
        loading="lazy"
      />

      {/*
        Reference animation (project-metro.html):
        1. Scrim (::before): starts visible, collapses UPWARD on hover
           transform-origin: top  →  scaleY(1→0), opacity(1→0)
        2. Content overlay: starts hidden, RISES from bottom on hover
           transform-origin: bottom  →  scaleY(0→1), opacity(0→1)
        Both transition at 500ms ease-out.
      */}

      {/* Layer 1 — dark scrim: visible at rest, collapses upward on hover */}
      <div className="absolute inset-0 bg-black/20 origin-top transition-all duration-500 group-hover:scale-y-0 group-hover:opacity-0" />

      {/* Layer 2 — gradient + content: hidden at rest, rises from bottom on hover */}
      <div
        className="absolute inset-0 flex flex-col justify-end px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10 origin-bottom scale-y-0 opacity-0 transition-all duration-500 group-hover:scale-y-100 group-hover:opacity-100"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 24.28%, rgba(0,0,0,0.82) 91.5%)' }}
      >
        <h3 className="font-heading font-bold text-[16px] sm:text-[20px] lg:text-[24px] text-white uppercase tracking-wide m-0 mb-2 leading-[1.2]">
          {item.name}
        </h3>
        <p className="font-body text-white/70 text-[11px] sm:text-[12px] leading-relaxed m-0 line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function AccoladesPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Awards & Accolades | SKM Egg Products Achievements',
        description: "SKM Egg Products' national export awards, APEDA Star Export House recognition, BRCGS AA Grade, NABL accreditation, and industrial accolades. India's most awarded egg products manufacturer.",
        keywords: 'SKM Egg Products awards, APEDA export award, egg exporter award India, BRCGS AA egg, Padma Shree egg company, egg industry recognition, export excellence award egg, top egg manufacturer India, best egg producer award',
        canonical: 'https://www.skmegg.com/accolades',
      }}
      onPageChange={onPageChange}
    >

      <div className="w-full bg-page pt-[110px] pb-[40px] sm:pt-[130px] lg:pt-[60px] lg:pb-[60px] overflow-hidden">
        <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-16">

          {/* ── Header ── */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center flex flex-col items-center gap-4"
          >
            <motion.span variants={itemVariants} className="section-label justify-center">
              Honors &amp; Recognitions
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading leading-[1.1] tracking-tight m-0 uppercase"
            >
              Accolades &amp;{' '}
              Achievements
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="font-body text-[16px] text-surface-500 max-w-2xl leading-[30px] m-0"
            >
              Our dedication to food safety, supply chain transparency, and export standards has been
              recognized by national and global authorities.
            </motion.p>
          </motion.div>

          {/* ── Metro Gallery ── */}

          {/* Mobile / Tablet: simple 2-col grid */}
          <div className="grid grid-cols-2 gap-0 rounded-[20px] overflow-hidden lg:hidden">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="relative aspect-square overflow-hidden group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  loading="lazy"
                />
                {/* Scrim — collapses upward on hover */}
                <div className="absolute inset-0 bg-black/20 origin-top transition-all duration-500 group-hover:scale-y-0 group-hover:opacity-0" />
                {/* Content — rises from bottom on hover */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 origin-bottom scale-y-0 opacity-0 transition-all duration-500 group-hover:scale-y-100 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 24.28%, rgba(0,0,0,0.82) 91.5%)' }}
                >
                  <h3 className="font-heading font-bold text-[10px] sm:text-[12px] text-white uppercase tracking-wide m-0 leading-tight">
                    {item.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: 4-col metro CSS grid — auto-placement, images in natural order */}
          <div
            className="hidden lg:grid grid-cols-4 rounded-[20px] overflow-hidden w-full"
            style={{
              gridTemplateRows:
                'clamp(200px, 22vw, 340px) clamp(200px, 22vw, 340px) clamp(160px, 16vw, 250px)',
            }}
          >
            {galleryItems.map((item, idx) => (
              <GalleryCard
                key={idx}
                item={item}
                index={idx}
                className={colSpans[idx] === 2 ? 'col-span-2' : 'col-span-1'}
              />
            ))}
          </div>

          {/* ── Other Awards ── */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="bg-surface-50/50 border border-[#eee] rounded-[10px] p-8 sm:p-10 shadow-[5px_3px_40px_rgba(0,72,88,0.06)]"
          >
            <motion.span variants={itemVariants} className="section-label mb-4 inline-flex">
              More Recognitions
            </motion.span>
            <motion.h3
              variants={itemVariants}
              className="font-heading font-bold text-[24px] sm:text-[28px] text-heading m-0 mb-6"
            >
              Other Awards &amp; Achievements
            </motion.h3>
            <ul className="flex flex-col gap-4 m-0 p-0 list-none">
              {otherAwards.map((award, index) => (
                <motion.li key={index} variants={itemVariants} className="flex items-start gap-3">
                  <span className="mt-[9px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-600" />
                  <p className="font-body text-[15px] text-surface-500 leading-[26px] m-0">
                    {award}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>

    </PageWrapper>
  );
}
