import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import ProductHero from '../../components/ProductPage/ProductHero';
import { containerVariants, itemVariants } from '../../utils/animationVariants';

import EggWhiteCubeImg from '../../assets/3. PRODUCTS/Speciality products/Egg White Cube/EGG WHITE CUBE_1000x667px.png';
import ProteinMixImg from '../../assets/3. PRODUCTS/Speciality products/Egg White Cube/PROTEIN MIX_1000x667px.png';

const galleryImages = [
  { src: EggWhiteCubeImg, label: 'Egg White Cube' },
  { src: ProteinMixImg, label: 'Protein Mix' },
];

const features = [
  {
    title: 'Very Low in Calories',
    description: 'A naturally light protein source with minimal caloric content — ideal for calorie-conscious diets and weight management plans.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Zero Cholesterol',
    description: 'Contains no cholesterol — making it a heart-friendly protein choice suitable for people with cardiovascular health concerns.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: 'High in Protein',
    description: 'A concentrated source of high-quality egg white protein — supporting muscle development, recovery, and daily nutritional needs.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    title: 'Essential Amino Acids',
    description: 'Provides all essential amino acids that the human body cannot produce on its own — a complete protein for overall health.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
];

export default function EggWhiteCubePage({ onPageChange }) {
  return (
    <div className="w-full flex flex-col bg-page font-body text-left">
      <SEO
        title="Egg White Cube | High Protein Zero Cholesterol Egg Product"
        description="SKM Egg White Cubes — high protein, zero cholesterol, low calorie specialty egg product. Essential amino acids for fitness & nutrition. A convenient ready-to-eat egg white format."
        keywords="egg white cube, egg white protein cube, high protein egg product, zero cholesterol egg, egg white fitness, protein cube egg, low calorie egg product, egg white nutrition, specialty egg product India, egg white cube buy, egg white health food, egg white protein snack"
        canonical="https://www.skmegg.com/egg_white_cube"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Egg White Cube",
          "description": "High protein, zero cholesterol egg white cubes with essential amino acids. Low calorie specialty egg product for fitness and nutrition.",
          "brand": { "@type": "Brand", "name": "SKM Egg Products" },
          "manufacturer": { "@type": "Organization", "name": "SKM Egg Products", "url": "https://www.skmegg.com" },
          "category": "Specialty Egg Products",
          "url": "https://www.skmegg.com/egg_white_cube",
          "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "INR", "seller": { "@type": "Organization", "name": "SKM Egg Products" } }
        }}
      />

      <ProductHero
        backgroundImage={EggWhiteCubeImg}
        backgroundAlt="SKM Egg White Cube background"
        categoryLabel="Speciality Products"
        titleLine1="Egg White"
        titleLine2="Cube"
        description="Egg White Cubes are very low in calories, zero cholesterol, high in protein and provide amino acids that our bodies cannot produce, making them a great choice for everyone."
      />

      {/* Key Features + Product Image side by side */}
      <div className="w-full py-[40px] lg:py-[60px] border-b border-[#eee]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Left: Key features */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="flex-1 flex flex-col gap-8"
            >
              <div className="flex flex-col gap-3">
                <span className="section-label">
                  Nutritional Benefits
                </span>
                <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-heading uppercase tracking-wider m-0">
                  A Great Choice For Everyone
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className="flex items-start gap-4 bg-white border border-[#eee] rounded-[10px] p-5 shadow-[5px_3px_40px_rgba(0,72,88,0.04)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.10)] hover:border-gold-500/40 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-[8px] bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-600/20">
                      {feature.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-heading font-bold text-[13px] text-heading uppercase tracking-wider m-0">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-surface-500 leading-relaxed m-0">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Product images */}
            <div className="w-full lg:w-2/5 grid grid-cols-1 gap-1">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden group aspect-[4/3]"
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-transparent transition-all duration-500 origin-top group-hover:scale-y-0 group-hover:opacity-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent flex flex-col justify-end p-4 sm:p-5 transition-all duration-500 scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 origin-bottom">
                    <h3 className="font-heading font-bold text-[12px] sm:text-[14px] text-white uppercase tracking-wider m-0 leading-tight">
                      {img.label}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="w-full py-12 sm:py-16 bg-page">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Calories', value: 'Very Low' },
              { label: 'Cholesterol', value: 'Zero' },
              { label: 'Protein', value: 'High' },
              { label: 'Amino Acids', value: 'Complete' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="bg-white border border-surface-200 rounded-2xl px-6 py-5 flex flex-col gap-1 text-center transition-colors duration-300 hover:border-gold-500/40"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-surface-400">{stat.label}</span>
                <span className="text-lg font-black text-brand-600">{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>


    </div>
  );
}
