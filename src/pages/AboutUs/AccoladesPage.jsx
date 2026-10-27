import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { itemVariants } from '../../utils/animationVariants';

import { galleryItems, otherAwards } from '../../data/accolades';

const headerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

/*
  Gallery grid - 2 columns x 4 rows of equal 8:5 tiles, matching the ~1.6:1
  source photos so nothing is cropped heavily.
*/
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
        className={`absolute inset-0 w-full h-full object-cover select-none ${item.image.startsWith("/gallery") ? "" : "scale-[1.09]"}`}
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

      {/* Layer 1 - dark scrim: visible at rest, collapses upward on hover */}
      <div className="absolute inset-0 bg-black/20 origin-top transition-all duration-500 group-hover:scale-y-0 group-hover:opacity-0" />

      {/* Layer 2 - gradient + content: hidden at rest, rises from bottom on hover */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 origin-bottom scale-y-0 opacity-0 transition-all duration-500 group-hover:scale-y-100 group-hover:opacity-100"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 24.28%, rgba(0,0,0,0.82) 91.5%)' }}
      >
        <h3 className="font-heading font-bold text-[18px] xl:text-[22px] text-white uppercase tracking-wide m-0 mb-1.5 leading-[1.2]">
          {item.name}
        </h3>
        <p className="font-body text-white/85 text-[13px] xl:text-[14px] leading-snug m-0">
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
              className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] text-heading leading-[1.1] lg:leading-[1.05] tracking-tight m-0"
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
                className="relative aspect-[8/5] overflow-hidden group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className={`absolute inset-0 w-full h-full object-cover select-none ${item.image.startsWith("/gallery") ? "" : "scale-[1.09]"}`}
                  loading="lazy"
                />
                {/* Scrim - collapses upward on hover */}
                <div className="absolute inset-0 bg-black/20 origin-top transition-all duration-500 group-hover:scale-y-0 group-hover:opacity-0" />
                {/* Content - rises from bottom on hover */}
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

          {/* Desktop: 4-col metro CSS grid - auto-placement, images in natural order */}
          <div
            className="hidden lg:grid grid-cols-2 rounded-[20px] overflow-hidden w-full"
          >
            {galleryItems.map((item, idx) => (
              <GalleryCard
                key={idx}
                item={item}
                index={idx}
                className="aspect-[8/5]"
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
