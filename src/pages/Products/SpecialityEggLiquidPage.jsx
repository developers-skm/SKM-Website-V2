import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import ProductHero from '../../components/ProductPage/ProductHero';
import { containerVariants, itemVariants } from '../../utils/animationVariants';

import EggLiquidMainImg from '../../assets/3. PRODUCTS/Speciality products/Egg Liquids/EGG LIQUIDS TETRA PACK_1000x667px.png';

const features = [
  {
    title: 'Consumer Friendly',
    description: 'Designed for ease of use — simply pour and use with no cracking, separating, or measuring required.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Household Use',
    description: 'Ideal for everyday home cooking — baking, omelettes, scrambled eggs, and more without waste.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    title: 'RTC Applications',
    description: 'Perfect for Ready-to-Cook food formats — enabling faster and more consistent meal preparation.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Pasteurized & Safe',
    description: 'Pasteurized under strict hygiene controls to eliminate Salmonella and ensure food-grade safety standards.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
];

export default function SpecialityEggLiquidPage({ onPageChange }) {
  return (
    <div className="w-full flex flex-col bg-page dark:bg-surface-950 font-body text-left">
      <SEO
        title="Specialty Egg Liquids | Tetra Pack Pasteurized Egg Products"
        description="SKM's specialty egg liquids in convenient tetra pack format for household, RTC & institutional use. Pasteurized for safety. Ready-to-use liquid eggs — convenient, hygienic, and shelf-stable."
        keywords="specialty egg liquid, tetra pack egg liquid, ready to cook egg liquid, RTC egg products, household liquid egg, pasteurized egg tetra pack, egg liquid tetra pack India, ready to use egg, specialty egg products, liquid egg household, convenient egg product, shelf stable egg liquid"
        canonical="https://www.skmegg.com/speciality_egg_liquids"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Specialty Egg Liquids",
          "description": "Pasteurized liquid eggs in convenient tetra pack format for household, RTC, and institutional use.",
          "brand": { "@type": "Brand", "name": "SKM Egg Products" },
          "manufacturer": { "@type": "Organization", "name": "SKM Egg Products", "url": "https://www.skmegg.com" },
          "category": "Specialty Egg Products",
          "url": "https://www.skmegg.com/speciality_egg_liquids",
          "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "INR", "seller": { "@type": "Organization", "name": "SKM Egg Products" } }
        }}
      />

      <ProductHero
        backgroundImage={EggLiquidMainImg}
        backgroundAlt="SKM Easy Egg Liquids Tetra Pack background"
        categoryLabel="Speciality Products"
        titleLine1="Easy Egg"
        titleLine2="Liquids"
        description="Easy Egg Liquids are produced in a way that each consumer can use the product in a more convenient way as per their needs. User-friendly way for household as well as RTC applications."
      />

      {/* Key Features Grid */}
      <div className="w-full py-[40px] lg:py-[60px] border-b border-[#eee] dark:border-surface-900/60">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col gap-12"
        >
          <div className="flex flex-col gap-3">
            <span className="section-label">
              Product Highlights
            </span>
            <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-heading dark:text-white uppercase tracking-wider m-0">
              Why Easy Egg Liquids?
            </h2>
            <p className="text-sm text-surface-400 dark:text-surface-500 font-medium max-w-2xl m-0">
              Convenience-first egg liquid products designed to simplify egg usage at home and in the food service industry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
                className="bg-surface-50 dark:bg-surface-900/30 border border-surface-200/60 dark:border-surface-800 rounded-3xl p-6 flex flex-col gap-4 transition-colors duration-300 hover:border-gold-500/40"
              >
                <div className="w-11 h-11 rounded-2xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-600/30">
                  {feature.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-[13px] text-heading dark:text-white uppercase tracking-wider m-0">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed m-0">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Product Info Strip */}
      <div className="w-full py-12 sm:py-16 bg-page dark:bg-surface-900/10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Format', value: 'Tetra Pack', sub: 'Consumer-ready packaging' },
              { label: 'Usage', value: 'Household & RTC', sub: 'Versatile applications' },
              { label: 'Safety', value: 'Pasteurized', sub: 'Salmonella Negative / 25g' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-2xl px-8 py-6 flex flex-col gap-1 text-center transition-colors duration-300 hover:border-gold-500/40"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-surface-400 dark:text-surface-500">{stat.label}</span>
                <span className="text-xl font-black text-brand-600 dark:text-brand-400">{stat.value}</span>
                <span className="text-[10px] font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wide">{stat.sub}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>


    </div>
  );
}
