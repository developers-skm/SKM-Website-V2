import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import { containerVariants } from '../../utils/animationVariants';

// Import Assets — Powder Bag in Box
import HdpeBagImg from '../../assets/3. PRODUCTS/Customized Packages/Powder Product primary container - HDPE Bag.jpeg';
import CartonBoxImg from '../../assets/3. PRODUCTS/Customized Packages/Powder Product secondary container - Carton Box.jpeg';

// Import Assets — Paper Bag
import PaperBagJpegImg from '../../assets/3. PRODUCTS/Customized Packages/Paper Bag.jpeg';
import PaperBagJpgImg from '../../assets/3. PRODUCTS/Customized Packages/Paper Bag.jpg';

// Import Assets — Liquid LDPE Bag
import FrozenLdpeImg from '../../assets/3. PRODUCTS/Customized Packages/Frozen product primary Pack - LDPE Bag.jpeg';
import LiquidLdpeImg from '../../assets/3. PRODUCTS/Customized Packages/Liquid Product primary pack - LDPE.jpeg';

// Import Assets — Pallecon
import SaltedPrimaryImg from '../../assets/3. PRODUCTS/Customized Packages/Salted Product Primary pack - LDPE - Copy.jpeg';
import SaltedSecondaryImg from '../../assets/3. PRODUCTS/Customized Packages/Salted Product Secondary pack - Pallecon - Copy.jpeg';

// Packaging types dataset
const packagingData = [
  {
    id: 'bag_in_box',
    type: 'Powder',
    title: 'Bag in Box',
    subtitle: 'Corrugated Box',
    description:
      'Primary containment uses a high-density polyethylene (HDPE) inner bag for moisture protection, enclosed within a robust corrugated carton box for safe stacking and transport.',
    skus: ['25 Kg', '20 Kg', '10 Kg'],
    images: [
      { src: HdpeBagImg, label: 'Primary Container — HDPE Bag' },
      { src: CartonBoxImg, label: 'Secondary Container — Carton Box' },
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
      </svg>
    ),
  },
  {
    id: 'bag_in_bag',
    type: 'Powder',
    title: 'Bag in Bag',
    subtitle: 'Paper Bag',
    description:
      'Eco-friendly multi-wall paper bag packaging for powder egg products. Designed for ease of handling, suitable for bakery and food-grade industrial dosing environments.',
    skus: ['20 Kg', '10 Kg'],
    images: [
      { src: PaperBagJpegImg, label: 'Paper Bag — Exterior View' },
      { src: PaperBagJpgImg, label: 'Paper Bag — Detail View' },
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'liquid_ldpe',
    type: 'Liquid',
    title: 'Bag (LDPE)',
    subtitle: 'Low Density Polyethylene',
    description:
      'Food-grade LDPE flexible inner bag packaging optimized for chilled and frozen liquid egg products. Provides complete barrier against contamination and ensures easy dispensing.',
    skus: ['20 Kg', '10 Kg', '5 Kg'],
    images: [
      { src: FrozenLdpeImg, label: 'Frozen Product — LDPE Bag' },
      { src: LiquidLdpeImg, label: 'Liquid Product — LDPE Primary Pack' },
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    id: 'pallecon',
    type: 'Liquid',
    title: 'Pallecon with Inner LDPE',
    subtitle: 'Bulk IBC Container',
    description:
      'Large-volume intermediate bulk container (IBC / Pallecon) with an inner LDPE liner, ideal for bulk liquid egg shipments. Stackable and compatible with standard fork-lift pallet systems.',
    skus: ['1000 Kg'],
    images: [
      { src: SaltedPrimaryImg, label: 'Primary Pack — LDPE Inner Bag' },
      { src: SaltedSecondaryImg, label: 'Secondary Pack — Pallecon IBC' },
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

export default function CustomizedPackagesPage({ onPageChange }) {

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 85, damping: 16 },
    },
  };

  return (
    <div className="w-full flex flex-col bg-page dark:bg-surface-950 font-body text-left">
      {/* SEO */}
      <SEO
        title="Egg Product Packaging | Bulk Egg Powder & Liquid Packaging Options"
        description="SKM offers industrial egg product packaging — bag-in-box, 25kg paper bags, LDPE bags, Pallecon IBCs. Flexible bulk packaging for egg powder and liquid egg products. Exporter from India."
        keywords="egg powder packaging, bag-in-box egg powder, 25kg egg powder bag, liquid egg packaging, Pallecon egg, IBC egg liquid, egg product bulk packaging, LDPE egg bag, egg powder paper bag, bulk egg packaging options, egg product container, egg liquid bulk packaging"
        canonical="https://www.skmegg.com/customized_packages"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Customized Egg Product Packages",
          "description": "Industrial packaging options for egg powder and liquid egg products — bag-in-box, paper bags, LDPE bags, and Pallecon IBC containers.",
          "brand": { "@type": "Brand", "name": "SKM Egg Products" },
          "manufacturer": { "@type": "Organization", "name": "SKM Egg Products", "url": "https://www.skmegg.com" },
          "category": "Egg Products",
          "url": "https://www.skmegg.com/customized_packages"
        }}
      />

      {/* Hero Banner */}
      <div className="relative py-[90px] bg-page dark:bg-surface-950 border-b border-[#eee] dark:border-surface-800/40 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/5 dark:bg-brand-950/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-500/5 dark:bg-brand-900/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center gap-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-650 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-900/40 px-4 py-1.5 rounded-full">
              Packaging Solutions
            </span>
            <h1 className="font-heading font-bold text-[42px] sm:text-[52px] lg:text-[60px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
              Customized{' '}
              Packages
            </h1>
            <p className="text-base sm:text-lg text-surface-500 dark:text-surface-400 leading-relaxed max-w-2xl m-0 font-medium">
              Customized packages of the products tailored for hassle-free use as per the industrial requirements. From small retail SKUs to bulk IBC pallet containers — every format is engineered for food-grade safety and logistics efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Packaging Cards Grid */}
      <div className="w-full py-16 sm:py-20 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col gap-10"
        >
          {/* Section Header */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-650 dark:text-brand-400">
              Available Formats
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-surface-850 dark:text-white uppercase tracking-wider m-0">
              Package Type Overview
            </h2>
          </div>

          {/* 2 × 2 Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {packagingData.map((pkg, pkgIndex) => (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                className="bg-surface-50 dark:bg-surface-900/30 border border-surface-200/60 dark:border-surface-800 rounded-3xl overflow-hidden flex flex-col"
              >
                {/* Card Header */}
                <div className="px-6 pt-6 pb-5 border-b border-surface-200/60 dark:border-surface-800 flex items-start gap-4">
                  {/* Type Badge + Icon */}
                  <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-600/30">
                    {pkg.icon}
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                        {pkg.type} Package
                      </span>
                      <span className="text-[10px] font-bold bg-surface-200 dark:bg-surface-800 text-surface-600 dark:text-surface-400 px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {pkg.subtitle}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-surface-850 dark:text-white m-0 leading-snug">
                      {pkg.type} Package in {pkg.title}
                    </h3>
                    <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed m-0 mt-1">
                      {pkg.description}
                    </p>
                  </div>
                </div>

                {/* Images Row */}
                <div className="px-6 pt-5 flex gap-4">
                  {pkg.images.map((img, imgIndex) => {
                    return (
                      <div
                        key={imgIndex}
                        className="relative flex-1 rounded-2xl overflow-hidden aspect-[4/3] bg-surface-100 dark:bg-surface-950 group border border-surface-200/60 dark:border-surface-800"
                      >
                        <img
                          src={img.src}
                          alt={img.label}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                          loading="lazy"
                        />
                        {/* Metro "before" overlay - collapses upward on hover */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-transparent transition-all duration-500 origin-top group-hover:scale-y-0 group-hover:opacity-0 pointer-events-none" />

                        {/* Metro content overlay - reveals from bottom on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex flex-col justify-end p-2.5 transition-all duration-500 scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 origin-bottom pointer-events-none">
                          <span className="text-[9px] font-bold text-white/90 truncate text-center">
                            {img.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* SKU Section */}
                <div className="px-6 pb-6 pt-5 flex flex-col gap-3 mt-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-surface-500 dark:text-surface-400">
                      Package SKU's
                    </span>
                    <div className="flex-1 h-px bg-surface-200 dark:bg-surface-800" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.skus.map((sku) => (
                      <span
                        key={sku}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 font-body text-[12px] font-bold text-surface-800 dark:text-white shadow-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-600 flex-shrink-0" />
                        {sku}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>


    </div>
  );
}
