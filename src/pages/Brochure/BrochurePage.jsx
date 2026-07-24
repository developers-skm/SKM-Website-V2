import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { getBrochureUrl } from '../../data/brochureUrl';

const brochureMeta = {
  'Company Profile - SKM Egg Products Export India Limited.pdf': {
    category: 'Corporate',
    title: 'Company Profile',
    desc: 'A comprehensive overview of SKM Egg Products Export India Limited — our history, scale, capabilities, and global reach since 1997.',
    featured: true,
  },
  'Product List - SKM Egg Products Export India Limited.pdf': {
    category: 'Corporate',
    title: 'Full Product List',
    desc: 'Complete catalog of all SKM egg products — powders, liquids, customized mixes and specialty solutions available for global food producers.',
    featured: true,
  },
  'SKM BAKERY MIX A5 FLYER (F&B).pdf': {
    category: 'Product Flyer',
    title: 'Bakery Mix',
    desc: "Technical flyer covering SKM's specialized bakery egg mix — composition, functional benefits, and applications in the F&B industry.",
    featured: false,
  },
  'SKM EGG ALBUMEN POWDER    A5 FLYER (F&B).pdf': {
    category: 'Product Flyer',
    title: 'Egg Albumen Powder',
    desc: 'Detailed specification sheet for SKM Egg Albumen Powder — ideal for confectionery, sports nutrition, and meat processing.',
    featured: false,
  },
  'SKM EGG YOLK POWDER A5 FLYER (F&B).pdf': {
    category: 'Product Flyer',
    title: 'Egg Yolk Powder',
    desc: 'Product flyer for SKM Egg Yolk Powder covering emulsification properties, composition, and key food industry applications.',
    featured: false,
  },
  'SKM WHOLE EGG POWDER A5 FLYER (F&B).pdf': {
    category: 'Product Flyer',
    title: 'Whole Egg Powder',
    desc: 'Specification flyer for SKM Whole Egg Powder — versatile, shelf-stable solution for bakeries, sauces, and ready meal manufacturers.',
    featured: false,
  },
};

function buildEntries() {
  return Object.keys(brochureMeta).map((fileName) => {
    const meta = brochureMeta[fileName];
    return { fileName, url: getBrochureUrl(fileName), ...meta };
  });
}

const entries = buildEntries();
const featured = entries.filter(e => e.featured);
const flyers = entries.filter(e => !e.featured);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 15 } },
};

function CategoryBadge({ label }) {
  const isFlyer = label === 'Product Flyer';
  return (
    <span
      className={`inline-flex items-center font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded ${
        isFlyer
          ? 'text-brand-600 bg-brand-600/6 border border-brand-600/15'
          : 'text-surface-600 dark:text-surface-400 bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700'
      }`}
    >
      {label}
    </span>
  );
}

function BrochureCard({ entry, large }) {
  return (
    <motion.div
      variants={itemVariants}
      className={`group flex flex-col gap-5 p-6 sm:p-8 rounded-[10px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900/50 shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.14)] hover:border-brand-600/20 transition-all duration-300 ${large ? 'sm:col-span-1' : ''}`}
    >
      {/* Icon + badge row */}
      <div className="flex items-start justify-between gap-3">
        <div className="w-12 h-12 rounded-[10px] bg-brand-600/6 dark:bg-brand-950/40 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <CategoryBadge label={entry.category} />
      </div>

      {/* Title + desc */}
      <div className="flex flex-col gap-2 flex-grow">
        <h3 className="font-heading font-bold text-[18px] sm:text-[20px] text-heading dark:text-white leading-snug m-0">
          {entry.title}
        </h3>
        <p className="font-body text-[14px] text-surface-500 dark:text-surface-400 leading-[22px] m-0">
          {entry.desc}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-[#f0f0f0] dark:border-surface-800">
        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex items-center gap-2 bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[11px] uppercase tracking-[0.05em] px-5 py-2.5 rounded-[200px] transition-all duration-300 shadow-[0_3px_14px_rgba(228, 10, 24,0.22)] hover:shadow-[0_5px_22px_rgba(228, 10, 24,0.38)]"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View PDF
        </a>
        <a
          href={entry.url}
          download
          className="inline-flex items-center gap-2 text-surface-500 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 font-heading font-bold text-[11px] uppercase tracking-[0.05em] px-4 py-2.5 rounded-[200px] border border-[#e5e5e5] dark:border-surface-700 hover:border-brand-600/30 dark:hover:border-brand-900/60 transition-all duration-300"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </a>
      </div>
    </motion.div>
  );
}

export default function BrochurePage({ onPageChange }) {
  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Brochures & Downloads | SKM Egg Products"
        description="Download SKM Egg Products brochures — company profile, full product list, and individual product flyers for egg powder and liquid solutions."
        keywords="SKM brochure, egg products PDF, company profile download, product flyer, egg powder catalog"
      />
      <Breadcrumb items={[{ label: 'Brochures & Downloads' }]} onPageChange={onPageChange} />

      <div className="w-full bg-page dark:bg-surface-950 py-[90px] lg:py-[120px] overflow-hidden">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-16"
        >
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-4">
            <motion.span variants={itemVariants} className="section-label">
              Resources
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
            >
              Brochures &amp;{' '}
              Downloads
            </motion.h2>
            <motion.p variants={itemVariants} className="font-body text-[16px] text-surface-500 dark:text-surface-400 max-w-2xl leading-[30px] m-0">
              View and download our corporate documents and product flyers to learn more about SKM's capabilities, certifications, and premium egg solutions.
            </motion.p>
          </div>

          {/* Corporate documents */}
          {featured.length > 0 && (
            <div className="flex flex-col gap-6">
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <h3 className="font-heading font-bold text-[13px] uppercase tracking-widest text-surface-400 dark:text-surface-500 m-0">
                  Corporate Documents
                </h3>
                <div className="flex-1 h-px bg-[#eee] dark:bg-surface-800" />
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {featured.map((entry, i) => (
                  <BrochureCard key={i} entry={entry} large />
                ))}
              </div>
            </div>
          )}

          {/* Product flyers */}
          {flyers.length > 0 && (
            <div className="flex flex-col gap-6">
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <h3 className="font-heading font-bold text-[13px] uppercase tracking-widest text-surface-400 dark:text-surface-500 m-0">
                  Product Flyers
                </h3>
                <div className="flex-1 h-px bg-[#eee] dark:bg-surface-800" />
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {flyers.map((entry, i) => (
                  <BrochureCard key={i} entry={entry} />
                ))}
              </div>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
