import { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import { containerVariants, itemVariants } from '../../utils/animationVariants';
import { EASE_PREMIUM } from '../../utils/motionTokens';
import products from '../../data/products';
import applications from '../../data/applications';
import certifications from '../../data/certifications';
import { getBrochureUrl } from '../../data/brochureUrl';

// Shared motion primitives for restrained, premium technical document feel
const sectionHeadingReveal = (reduceMotion) => ({
  initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: reduceMotion ? 0.01 : 0.65, ease: EASE_PREMIUM },
});

const sectionSupportReveal = (reduceMotion) => ({
  initial: { opacity: 0, y: reduceMotion ? 0 : 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: reduceMotion ? 0.01 : 0.55, ease: EASE_PREMIUM, delay: reduceMotion ? 0 : 0.08 },
});

const resourceGridVariants = (reduceMotion) => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: reduceMotion ? 0 : 0.05, delayChildren: reduceMotion ? 0 : 0.05 },
  },
});

const resourceItemVariants = (reduceMotion) => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: reduceMotion ? 0.01 : 0.55, ease: EASE_PREMIUM },
  },
});

const filterExitVariants = {
  hidden: { opacity: 0, y: 8, transition: { duration: 0.16, ease: EASE_PREMIUM } },
};

const TDS_PRODUCTS = products.filter((p) => p.tdsUrl);

const DOCUMENT_GROUPS = [
  { id: 'technical-data-sheets', label: 'Technical Data Sheets (TDS)', count: TDS_PRODUCTS.length, hasRealDocs: true },
  { id: 'safety-documents', label: 'Safety Documents (MSDS)', count: 0, hasRealDocs: false },
  { id: 'packaging-specifications', label: 'Packaging Specs', count: 0, hasRealDocs: false },
  { id: 'product-guides', label: 'Product Guides', count: 0, hasRealDocs: false },
];

function TechnicalDocumentsSection({ onPageChange, globalSearchQuery }) {
  const reduceMotion = useReducedMotion();
  const [productFilter, setProductFilter] = useState(null);
  const [applicationFilter, setApplicationFilter] = useState(null);
  const [docTypeFilter, setDocTypeFilter] = useState('technical-data-sheets');

  const applicationProductIds = useMemo(() => {
    if (!applicationFilter) return null;
    return applications.find((a) => a.id === applicationFilter)?.matchedProductIds ?? [];
  }, [applicationFilter]);

  const visibleTds = useMemo(() => {
    return TDS_PRODUCTS.filter((p) => {
      if (productFilter && p.id !== productFilter) return false;
      if (applicationProductIds && !applicationProductIds.includes(p.id)) return false;
      if (globalSearchQuery && globalSearchQuery.trim() !== '') {
        const q = globalSearchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCategory = p.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCategory) return false;
      }
      return true;
    });
  }, [productFilter, applicationProductIds, globalSearchQuery]);

  const activeGroup = DOCUMENT_GROUPS.find((g) => g.id === docTypeFilter);

  return (
    <div id="technical-documents" className="relative w-full py-16 lg:py-24 border-b border-surface-200/60 scroll-mt-[100px] xl:scroll-mt-[120px]">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        
        {/* Section Heading */}
        <motion.div {...sectionHeadingReveal(reduceMotion)} className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="font-body text-[12px] font-bold uppercase tracking-widest text-brand-600">
              Verified Specifications
            </span>
          </div>
          <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-heading m-0 tracking-tight">
            Technical Documents & Data Sheets
          </h2>
          <p className="font-body text-[14.5px] text-surface-600 max-w-2xl m-0 leading-relaxed">
            Download laboratory-verified Technical Data Sheets (TDS) and quality specifications for SKM's egg powder and liquid formulations.
          </p>
        </motion.div>

        {/* Section 2 — Resource Filters */}
        <motion.div {...sectionSupportReveal(reduceMotion)} className="flex flex-col gap-5 p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-surface-200/80 shadow-lg shadow-black/5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-body text-[11.5px] font-bold uppercase tracking-wider text-surface-500 mr-2 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Document Type:
            </span>
            {DOCUMENT_GROUPS.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setDocTypeFilter(group.id)}
                aria-pressed={docTypeFilter === group.id}
                className={`inline-flex items-center gap-2 min-h-[44px] sm:min-h-[38px] px-4 py-2 rounded-xl font-body font-semibold text-[13px] transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 active:scale-[0.97] cursor-pointer ${
                  docTypeFilter === group.id
                    ? 'bg-brand-600 border border-brand-600 text-white shadow-lg shadow-brand-600/25'
                    : 'bg-white/80 border border-surface-200 text-surface-700 hover:border-brand-500/50 hover:text-heading'
                }`}
              >
                <span>{group.label}</span>
                {group.count > 0 && (
                  <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${docTypeFilter === group.id ? 'bg-white/20 text-white' : 'bg-surface-100 text-surface-600'}`}>
                    {group.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeGroup?.hasRealDocs && (
            <div className="flex flex-col gap-3 pt-4 border-t border-surface-200/60">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-body text-[11px] font-bold uppercase tracking-wider text-surface-400 mr-2">Filter Product:</span>
                <button
                  type="button"
                  onClick={() => setProductFilter(null)}
                  className={`inline-flex items-center min-h-[44px] sm:min-h-[32px] px-3 py-1 rounded-lg font-body text-[12px] font-semibold transition-all cursor-pointer ${
                    productFilter === null
                      ? 'bg-surface-900 text-white font-bold'
                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                  }`}
                >
                  All Products
                </button>
                {TDS_PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProductFilter(productFilter === p.id ? null : p.id)}
                    aria-pressed={productFilter === p.id}
                    className={`inline-flex items-center min-h-[44px] sm:min-h-[32px] px-3 py-1 rounded-lg font-body text-[12px] font-semibold transition-all cursor-pointer ${
                      productFilter === p.id
                        ? 'bg-brand-600 text-white font-bold shadow-sm'
                        : 'bg-surface-100 border border-surface-200 text-surface-600 hover:border-brand-500/40 hover:text-heading'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-body text-[11px] font-bold uppercase tracking-wider text-surface-400 mr-2">Filter Application:</span>
                <button
                  type="button"
                  onClick={() => setApplicationFilter(null)}
                  className={`inline-flex items-center min-h-[44px] sm:min-h-[32px] px-3 py-1 rounded-lg font-body text-[12px] font-semibold transition-all cursor-pointer ${
                    applicationFilter === null
                      ? 'bg-surface-900 text-white font-bold'
                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                  }`}
                >
                  All Applications
                </button>
                {applications.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setApplicationFilter(applicationFilter === app.id ? null : app.id)}
                    aria-pressed={applicationFilter === app.id}
                    className={`inline-flex items-center min-h-[44px] sm:min-h-[32px] px-3 py-1 rounded-lg font-body text-[12px] font-semibold transition-all cursor-pointer ${
                      applicationFilter === app.id
                        ? 'bg-brand-600 text-white font-bold shadow-sm'
                        : 'bg-surface-100 border border-surface-200 text-surface-600 hover:border-brand-500/40 hover:text-heading'
                    }`}
                  >
                    {app.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Section 3 — Technical Documents List */}
        <AnimatePresence mode="wait">
          {activeGroup?.hasRealDocs ? (
            <motion.div
              key={`${docTypeFilter}-${productFilter}-${applicationFilter}-${globalSearchQuery}`}
              variants={resourceGridVariants(reduceMotion)}
              initial="hidden"
              animate="visible"
              exit={reduceMotion ? undefined : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleTds.map((p) => {
                return (
                  <motion.div
                    key={p.id}
                    variants={resourceItemVariants(reduceMotion)}
                    exit={filterExitVariants.hidden}
                    whileHover={reduceMotion ? undefined : { y: -5 }}
                    transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                    className="group relative flex flex-col justify-between gap-6 rounded-2xl border border-surface-200/80 bg-white/80 backdrop-blur-xl p-6 transition-all duration-300 ease-out hover:border-brand-500/40 hover:shadow-2xl hover:shadow-brand-600/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/15 to-amber-500/10 border border-brand-500/20 text-brand-600 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-body text-[10px] font-extrabold uppercase tracking-widest text-brand-600">
                            Technical Data Sheet
                          </span>
                          <h3 className="font-heading font-bold text-[17px] text-heading truncate m-0 group-hover:text-brand-600 transition-colors duration-200">
                            {p.title}
                          </h3>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-[10.5px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex-shrink-0">
                        PDF Format
                      </span>
                    </div>

                    <p className="font-body text-[13px] text-surface-500 line-clamp-2 m-0 leading-relaxed">
                      Official product technical specification, microbiological parameters, shelf life, and storage conditions for {p.title}.
                    </p>

                    <div className="flex items-center pt-4 border-t border-surface-200/60">
                      <a
                        href={p.tdsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-body font-bold text-[12px] uppercase tracking-wider text-white bg-brand-600 hover:bg-brand-700 px-4 py-2.5 rounded-xl shadow-md shadow-brand-600/20 hover:shadow-lg hover:shadow-brand-600/30 transition-all duration-200 active:scale-[0.97]"
                      >
                        <span>Download TDS</span>
                        <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                );
              })}

              {visibleTds.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-full rounded-2xl border border-dashed border-surface-300 bg-white/40 p-10 text-center flex flex-col items-center gap-3"
                >
                  <svg className="w-10 h-10 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="font-heading font-semibold text-[16px] text-heading m-0">No documents found matching criteria</p>
                  <p className="font-body text-[13.5px] text-surface-500 m-0 max-w-md">Try resetting your filters or search query to view available technical documents.</p>
                  <button
                    type="button"
                    onClick={() => { setProductFilter(null); setApplicationFilter(null); }}
                    className="mt-2 text-[13px] font-bold text-brand-600 hover:underline cursor-pointer"
                  >
                    Reset Active Filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={docTypeFilter}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : 7 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: EASE_PREMIUM }}
              className="rounded-2xl border border-dashed border-surface-300 bg-white/50 p-10 text-center flex flex-col items-center gap-3 backdrop-blur-md"
            >
              <div className="w-12 h-12 rounded-full bg-brand-500/10 text-brand-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <p className="font-heading font-semibold text-[16px] text-heading m-0">
                {activeGroup?.label} Available Upon Request
              </p>
              <p className="font-body text-[14px] text-surface-600 max-w-lg m-0 leading-relaxed">
                Specific regulatory, MSDS safety, or customized packaging documentation is provided directly by our quality engineering team.
              </p>
              <InternalLink
                route="contact-us"
                onPageChange={onPageChange}
                className="mt-2 inline-flex items-center gap-2 font-body font-bold text-[13px] text-white bg-brand-600 hover:bg-brand-700 px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Request Custom Document
              </InternalLink>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Section 4 — Certifications
function CertificationsSection() {
  const reduceMotion = useReducedMotion();
  return (
    <div id="certifications" className="relative w-full py-16 lg:py-24 border-b border-surface-200/60">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        
        <motion.div {...sectionHeadingReveal(reduceMotion)} className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="font-body text-[12px] font-bold uppercase tracking-widest text-brand-600">
              International Accreditation
            </span>
          </div>
          <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-heading m-0 tracking-tight">
            Global Quality & Food Safety Certificates
          </h2>
          <p className="font-body text-[14.5px] text-surface-600 max-w-2xl m-0 leading-relaxed">
            SKM operates under internationally audited food safety, quality management, and ethical compliance standards.
          </p>
        </motion.div>

        <motion.div
          variants={resourceGridVariants(reduceMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={resourceItemVariants(reduceMotion)}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              transition={{ duration: 0.32, ease: EASE_PREMIUM }}
              className="group flex flex-col items-center gap-4 p-6 rounded-2xl border border-surface-200/80 bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 hover:border-brand-500/40 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative w-full aspect-[4/3] rounded-xl bg-white p-3 flex items-center justify-center border border-surface-100 shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
                <img
                  src={cert.logo}
                  alt={cert.name}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading font-bold text-[14.5px] text-heading text-center leading-snug">
                {cert.name}
              </span>
              <div className="flex items-center justify-center gap-4 pt-2 border-t border-surface-100 w-full">
                <a
                  href={cert.logo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body font-bold text-[12px] text-brand-600 hover:underline inline-flex items-center gap-1"
                >
                  <span>View Logo</span>
                </a>
                <span className="text-surface-300">•</span>
                <a
                  href={cert.logo}
                  download
                  className="font-body font-semibold text-[12px] text-surface-500 hover:text-heading hover:underline"
                >
                  Download
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex items-center justify-between flex-wrap gap-4 p-6 rounded-2xl bg-gradient-to-r from-brand-600/10 via-amber-500/5 to-transparent border border-brand-500/20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-heading font-bold text-[15px] text-heading m-0">Need standard-specific audit reports?</h4>
              <p className="font-body text-[13px] text-surface-600 m-0">NABL ISO/IEC 17025 lab reports and auditor verification packs are available on commercial request.</p>
            </div>
          </div>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 min-h-[42px] px-5 rounded-xl border border-surface-300 text-surface-400 font-body font-semibold text-[13px] cursor-not-allowed opacity-70"
          >
            Audit Pack Available On Order
          </button>
        </div>

      </div>
    </div>
  );
}

// Section 5 — Brochures & Application Guides
const brochureMeta = {
  'Company Profile - SKM Egg Products Export India Limited.pdf': {
    category: 'Corporate',
    title: 'Company Profile',
    desc: 'Comprehensive overview of SKM Egg Products Export India Limited — history, processing scale, plant capabilities, and global footprint.',
    featured: true,
  },
  'Product List - SKM Egg Products Export India Limited.pdf': {
    category: 'Corporate',
    title: 'Full Product Portfolio',
    desc: 'Complete catalog of SKM egg powders, liquid variants, customized bakery mixes, and technical food ingredients.',
    featured: true,
  },
  'SKM BAKERY MIX A5 FLYER (F&B).pdf': {
    category: 'Product Flyer',
    title: 'Bakery Mix Technical Flyer',
    desc: 'Technical overview covering SKM specialized bakery egg mixes, functional whipping performance, and dosage recommendations.',
    featured: false,
  },
  'SKM EGG ALBUMEN POWDER    A5 FLYER (F&B).pdf': {
    category: 'Product Flyer',
    title: 'Egg Albumen Powder Flyer',
    desc: 'Specification guide for high-gel and high-whip Egg Albumen Powder — ideal for confectionery, meat binders, and sports nutrition.',
    featured: false,
  },
  'SKM EGG YOLK POWDER A5 FLYER (F&B).pdf': {
    category: 'Product Flyer',
    title: 'Egg Yolk Powder Flyer',
    desc: 'Product flyer detailing emulsification capacity, fat content, heat stability, and applications in mayonnaise and sauces.',
    featured: false,
  },
  'SKM WHOLE EGG POWDER A5 FLYER (F&B).pdf': {
    category: 'Product Flyer',
    title: 'Whole Egg Powder Flyer',
    desc: 'Technical flyer for Whole Egg Powder — shelf-stable, pasteurized whole egg replacement for bakeries and commercial food manufacturing.',
    featured: false,
  },
};

function buildBrochureEntries() {
  return Object.keys(brochureMeta).map((fileName) => {
    const meta = brochureMeta[fileName];
    return { fileName, url: getBrochureUrl(fileName), ...meta };
  });
}

const brochureEntries = buildBrochureEntries();
const productPortfolio = brochureEntries.find((e) => e.title === 'Full Product Portfolio');

function BrochuresApplicationGuidesSection() {
  const reduceMotion = useReducedMotion();
  return (
    <div id="brochures" className="relative w-full py-16 lg:py-24 border-b border-surface-200/60">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        
        <motion.div {...sectionHeadingReveal(reduceMotion)} className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="font-body text-[12px] font-bold uppercase tracking-widest text-brand-600">
              Downloads & Publications
            </span>
          </div>
          <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-heading m-0 tracking-tight">
            Corporate Brochures & Technical Flyers
          </h2>
          <p className="font-body text-[14.5px] text-surface-600 max-w-2xl m-0 leading-relaxed">
            Access our official downloadable PDF literature, company overview documentation, and product line technical flyers.
          </p>
        </motion.div>

        <motion.div
          variants={resourceGridVariants(reduceMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {brochureEntries.map((entry) => (
            <motion.div
              key={entry.fileName}
              variants={resourceItemVariants(reduceMotion)}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              transition={{ duration: 0.32, ease: EASE_PREMIUM }}
              className="group flex flex-col justify-between gap-5 p-6 rounded-2xl border border-surface-200/80 bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 hover:border-brand-500/40 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex flex-col gap-3">
                <span className={`self-start font-body text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-lg ${
                  entry.category === 'Product Flyer'
                    ? 'text-brand-600 bg-brand-500/10 border border-brand-500/20'
                    : 'text-emerald-700 bg-emerald-500/10 border border-emerald-500/20'
                }`}>
                  {entry.category}
                </span>
                <h3 className="font-heading font-bold text-[18px] text-heading m-0 group-hover:text-brand-600 transition-colors duration-200">
                  {entry.title}
                </h3>
                <p className="font-body text-[13.5px] text-surface-500 leading-relaxed m-0">
                  {entry.desc}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-surface-200/60">
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body font-bold text-[11.5px] uppercase tracking-wider text-brand-600 hover:text-brand-700 px-3.5 py-2 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 transition-all duration-200"
                >
                  <span>View PDF</span>
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </a>
                <a
                  href={entry.url}
                  download
                  className="inline-flex items-center gap-1.5 font-body font-bold text-[11.5px] uppercase tracking-wider text-surface-700 hover:text-heading px-3.5 py-2 rounded-xl bg-surface-100 hover:bg-surface-200 transition-all duration-200"
                >
                  <span>Download</span>
                  <svg className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" /></svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {productPortfolio && (
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={productPortfolio.url}
              download
              className="inline-flex items-center gap-2.5 min-h-[48px] px-8 py-3.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[14px] uppercase tracking-wider shadow-lg shadow-brand-600/30 transition-all duration-200 active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download Complete Product Portfolio PDF
            </a>
          </div>
        )}

      </div>
    </div>
  );
}

// Section 6 — CSR Cards
const csrCards = [
  {
    title: 'Community Development',
    description: 'The SKM Health and Mind Welfare Charity Trust — Sevai Maiyam — supporting adopted families with housing, sanitation, and welfare.',
    page: 'community_development',
    iconType: 'community',
  },
  {
    title: 'Trust Outreach Programs',
    description: 'Sanitation, education fees, medical services, financial aid, elder care, and community initiatives.',
    page: 'trust_outreach',
    iconType: 'trust',
  },
  {
    title: 'Education Initiatives',
    description: 'ABL teaching systems, coaching centres, libraries, and educational support for underprivileged students.',
    page: 'csr_education',
    iconType: 'education',
  },
  {
    title: 'Environmental Sustainability',
    description: 'Carbon footprint reduction, wind energy investments, eco-efficient processing, and environmental policy commitments.',
    page: 'csr_sustainability',
    iconType: 'sustainability',
  },
  {
    title: 'MD Vision & Article',
    description: "The Olirum Erode Foundation — Managing Director's personal initiative across five key community focus areas.",
    page: 'md_article',
    iconType: 'md_article',
  },
];

function CsrIcon({ iconType }) {
  switch (iconType) {
    case 'community':
      return (
        <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-6 0h6" />
        </svg>
      );
    case 'trust':
      return (
        <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'education':
      return (
        <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    case 'sustainability':
      return (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V8.5a.5.5 0 01.5-.5h.5a2.5 2.5 0 002.5-2.5V3.935" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
  }
}

function CsrSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  return (
    <div id="csr" className="relative w-full py-16 lg:py-24 border-b border-surface-200/60">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        
        <motion.div {...sectionHeadingReveal(reduceMotion)} className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="font-body text-[12px] font-bold uppercase tracking-widest text-brand-600">
              Beyond The Factory Floor
            </span>
          </div>
          <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-heading m-0 tracking-tight">
            Corporate Social Responsibility (CSR)
          </h2>
          <p className="font-body text-[14.5px] text-surface-600 max-w-2xl m-0 leading-relaxed">
            Discover SKM's commitment to community welfare, clean energy, education, and sustainable development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {csrCards.map((card) => (
            <motion.button
              key={card.page}
              variants={itemVariants}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              transition={{ duration: 0.32, ease: EASE_PREMIUM }}
              onClick={() => onPageChange(card.page)}
              className="group flex flex-col items-start gap-3 p-6 text-left rounded-2xl bg-white/80 backdrop-blur-xl border border-surface-200/80 shadow-lg shadow-black/5 hover:border-brand-500/40 hover:shadow-2xl transition-all duration-300 cursor-pointer focus:outline-none"
            >
              <div className="p-3 rounded-xl bg-surface-100 border border-surface-200/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CsrIcon iconType={card.iconType} />
              </div>
              <h3 className="font-heading font-bold text-[18px] text-heading m-0 group-hover:text-brand-600 transition-colors duration-200">
                {card.title}
              </h3>
              <p className="font-body text-[13.5px] text-surface-500 leading-relaxed m-0">
                {card.description}
              </p>
              <span className="mt-2 font-body font-bold text-[12px] text-brand-600 inline-flex items-center gap-1 group-hover:underline">
                Explore Overview →
              </span>
            </motion.button>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

// Section 7 — FAQ
const FAQ_CATEGORIES = [
  {
    category: 'Product selection',
    question: 'How do I find the right egg product for my application?',
    answer: 'Use the SKM Product Finder on the Products Hub to filter by format and packaging, or browse by application (bakery, mayonnaise, meat & fish, noodles & pasta) to see matched products.',
  },
  {
    category: 'Samples',
    question: 'Can I request a product sample?',
    answer: 'There is no published self-serve sample catalogue — contact our team directly with your product and application to discuss a sample.',
  },
  {
    category: 'MOQ and commercial enquiry',
    question: 'What is your minimum order quantity?',
    answer: 'Minimum order quantity varies by product and packaging format — contact our team directly for a commercial quote specific to your requirement.',
  },
  {
    category: 'Packaging',
    question: 'What packaging formats are available?',
    answer: 'Bag-in-box and paper bag for powders (10–25 Kg), LDPE bags for chilled/frozen liquids (5–20 Kg), and Pallecon IBC bulk containers (1000 Kg).',
  },
  {
    category: 'Storage',
    question: 'What are the storage requirements for liquid egg products?',
    answer: 'Chilled liquid egg products are stored at 0°C to 4°C; frozen variants are stored at ≤ -18°C.',
  },
  {
    category: 'Export documentation',
    question: 'What regulatory approvals does SKM hold for export?',
    answer: 'The plant is approved under the Indian Export of Egg Products Quality Control & Monitoring Rules (1997), based on EU/USDA guidelines (Approval No: 05/2/EP/97).',
  },
  {
    category: 'Quality and certification',
    question: 'What certifications does SKM hold?',
    answer: `${certifications.map((c) => c.name).join(', ')} — with an NABL-accredited (ISO/IEC 17025) laboratory operational since 2006.`,
  },
];

function FaqSection({ onPageChange, globalSearchQuery }) {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = useMemo(() => {
    if (!globalSearchQuery || globalSearchQuery.trim() === '') return FAQ_CATEGORIES;
    const q = globalSearchQuery.toLowerCase();
    return FAQ_CATEGORIES.filter((item) =>
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }, [globalSearchQuery]);

  return (
    <div id="faq" className="relative w-full py-16 lg:py-24 border-b border-surface-200/60">
      <div className="mx-auto max-w-[960px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        
        <motion.div {...sectionHeadingReveal(reduceMotion)} className="flex flex-col gap-2 text-center items-center">
          <span className="font-body text-[12px] font-bold uppercase tracking-widest text-brand-600">
            Knowledge Center
          </span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-heading m-0 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-[14.5px] text-surface-600 max-w-xl m-0 leading-relaxed">
            Quick technical answers regarding specifications, storage, packaging, regulatory compliance, and ordering.
          </p>
        </motion.div>

        <motion.div
          variants={resourceGridVariants(reduceMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col gap-4"
        >
          {filteredFaqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.question}
                variants={resourceItemVariants(reduceMotion)}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-xl ${
                  isOpen
                    ? 'border-brand-500/50 bg-white/90 shadow-xl shadow-brand-600/5'
                    : 'border-surface-200/80 bg-white/70 hover:border-brand-500/30'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left p-6 cursor-pointer bg-transparent border-none focus:outline-none"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-body text-[11px] font-extrabold uppercase tracking-widest text-brand-600">
                      {item.category}
                    </span>
                    <span className="font-heading font-bold text-[16.5px] text-heading leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? 'bg-brand-600 text-white rotate-180' : 'bg-surface-100 text-surface-600'}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: EASE_PREMIUM }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-surface-100">
                        <p className="font-body text-[14.5px] text-surface-600 leading-relaxed m-0">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="p-8 text-center rounded-2xl bg-white/40 border border-surface-200">
              <p className="font-body text-[14px] text-surface-500 m-0">No questions matched your search term.</p>
            </div>
          )}
        </motion.div>

        <div className="flex justify-center">
          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13.5px] uppercase tracking-wider shadow-lg shadow-brand-600/25 transition-all duration-200 active:scale-[0.98]"
          >
            <span>Ask Technical Support A Question</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </InternalLink>
        </div>

      </div>
    </div>
  );
}

// Root Component
export default function ResourcesPage({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <PageWrapper
      seo={{
        title: 'Resources & Technical Downloads | SKM Egg Products',
        description: 'Access laboratory-verified technical data sheets, global quality certifications, product brochures, and application guides.',
        keywords: 'SKM egg products brochure, egg powder technical data sheet, egg product certifications download, SKM CSR, egg products quality specification',
        canonical: 'https://www.skmegg.com/resources',
      }}
      onPageChange={onPageChange}
    >
      {/* Root Full-Page Continuous Canvas Container */}
      <div className="relative w-full flex flex-col min-h-screen bg-slate-50 transition-colors duration-300">
        
        {/* Dedicated Fixed Background Image Layer with Controlled Opacity */}
        <div 
          className="fixed inset-0 bg-[url('/images/resources_bg.png')] bg-fixed bg-cover bg-center bg-no-repeat opacity-[0.12] pointer-events-none z-0"
          aria-hidden="true" 
        />

        {/* Ambient Decorative Lighting Elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-5 w-[30rem] h-[30rem] bg-brand-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Foreground Content Wrapper */}
        <div className="relative z-10 w-full flex flex-col">

          {/* Section 1 — Resource Hero & Search */}
          <div className="w-full pt-[110px] pb-20 sm:pt-[130px] lg:pt-28 lg:pb-28 border-b border-surface-200/60 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1000px] flex flex-col items-center text-center gap-8">
              
              {/* Premium Pill Badge */}
              <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: EASE_PREMIUM }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-600 font-body font-bold text-[12px] uppercase tracking-widest shadow-sm"
              >
                <span>Technical Repository & Downloads Hub</span>
              </motion.div>

              {/* Main Heading with Gradient Text */}
              <motion.h1
                initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.75, ease: EASE_PREMIUM, delay: reduceMotion ? 0 : 0.08 }}
                className="font-heading font-extrabold text-[36px] sm:text-[52px] lg:text-[62px] leading-[1.08] tracking-tight m-0 bg-clip-text text-transparent bg-gradient-to-r from-surface-950 via-heading to-surface-800"
              >
                Resources & Technical Downloads
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: EASE_PREMIUM, delay: reduceMotion ? 0 : 0.15 }}
                className="font-body text-[16px] sm:text-[18px] text-surface-600 max-w-2xl m-0 leading-relaxed"
              >
                Search, inspect, and download official technical data sheets (TDS), global quality certifications, product brochures, and regulatory guidelines.
              </motion.p>

              {/* Luxury Search Bar */}
              <motion.form
                role="search"
                onSubmit={(e) => e.preventDefault()}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.65, ease: EASE_PREMIUM, delay: reduceMotion ? 0 : 0.2 }}
                className="w-full max-w-[680px] relative flex items-center mt-2 shadow-2xl rounded-2xl"
              >
                <div className="relative w-full flex items-center">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-surface-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.25">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search product specifications, TDS, certificates, brochures or FAQ..."
                    aria-label="Search resources"
                    className="w-full min-h-[56px] pl-14 pr-24 py-4 rounded-2xl border border-surface-200/90 bg-white/90 backdrop-blur-xl font-body text-[15px] text-heading placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-inner"
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 px-3 py-1 text-[12px] font-bold rounded-lg bg-surface-200 text-surface-700 hover:bg-surface-300 cursor-pointer transition-colors"
                    >
                      Clear
                    </button>
                  ) : (
                    <span className="absolute right-4 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded-lg bg-surface-100 text-surface-400 border border-surface-200">
                      Live Search
                    </span>
                  )}
                </div>
              </motion.form>

              {/* Navigation Jump Tags */}
              <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: EASE_PREMIUM, delay: reduceMotion ? 0 : 0.28 }}
                className="flex flex-wrap items-center justify-center gap-2.5 pt-2"
              >
                <span className="font-body text-[12px] font-bold uppercase tracking-wider text-surface-400 mr-1">Quick Jump:</span>
                {[
                  { label: 'Technical Data Sheets', target: 'technical-documents' },
                  { label: 'Certifications', target: 'certifications' },
                  { label: 'Brochures', target: 'brochures' },
                  { label: 'CSR', target: 'csr' },
                  { label: 'FAQ', target: 'faq' },
                ].map((tag) => (
                  <button
                    key={tag.target}
                    type="button"
                    onClick={() => document.getElementById(tag.target)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })}
                    className="px-3.5 py-1.5 rounded-xl bg-white/70 border border-surface-200/80 font-body text-[12.5px] font-semibold text-surface-700 hover:border-brand-500 hover:text-brand-600 transition-all cursor-pointer shadow-sm"
                  >
                    {tag.label}
                  </button>
                ))}
              </motion.div>

              {/* Document Repository Key Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: EASE_PREMIUM, delay: reduceMotion ? 0 : 0.35 }}
                className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-8 border-t border-surface-200/60"
              >
                {[
                  { label: 'Technical Data Sheets', val: '3 Real TDS', sub: 'Laboratory Verified' },
                  { label: 'Quality Accreditation', val: '8 Global Standards', sub: 'BRCGS, ISO, Halal' },
                  { label: 'Publications', val: '6 Product Flyers', sub: 'PDF Literature' },
                  { label: 'Testing Standard', val: 'ISO/IEC 17025', sub: 'NABL Accredited' },
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center p-4 rounded-xl bg-white/60 border border-surface-200/60 backdrop-blur-md">
                    <span className="font-heading font-extrabold text-[20px] text-brand-600">{stat.val}</span>
                    <span className="font-body text-[12px] font-bold text-heading mt-0.5">{stat.label}</span>
                    <span className="font-body text-[11px] text-surface-400">{stat.sub}</span>
                  </div>
                ))}
              </motion.div>

            </div>
          </div>

          {/* Section 2 & 3 — Technical Documents */}
          <TechnicalDocumentsSection
            onPageChange={onPageChange}
            globalSearchQuery={searchQuery}
          />

          {/* Section 4 — Certifications */}
          <CertificationsSection />

          {/* Section 5 — Brochures & Guides */}
          <BrochuresApplicationGuidesSection />

          {/* Section 6 — CSR */}
          <CsrSection onPageChange={onPageChange} />

          {/* Section 7 — FAQ */}
          <FaqSection onPageChange={onPageChange} globalSearchQuery={searchQuery} />

          {/* Section 8 — Bottom Contact CTA */}
          <div className="w-full py-20 lg:py-28 text-center px-4">
            <motion.div
              {...sectionHeadingReveal(reduceMotion)}
              className="mx-auto max-w-[680px] p-10 rounded-3xl bg-white/80 border border-surface-200/80 backdrop-blur-xl shadow-2xl flex flex-col items-center gap-6"
            >
              <div className="w-14 h-14 rounded-full bg-brand-500/10 text-brand-600 flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading m-0 tracking-tight">
                Need Specific Technical Documentation?
              </h2>
              <p className="font-body text-[15px] text-surface-600 m-0 leading-relaxed">
                If you require customized packaging parameters, batch analytical certificates, or proprietary formulation data, our technical engineering team is ready to assist.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-2">
                <InternalLink
                  route="contact-us"
                  onPageChange={onPageChange}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13.5px] uppercase tracking-wider px-8 py-4 rounded-full shadow-xl shadow-brand-600/30 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  Request A Custom Document
                </InternalLink>
                <InternalLink
                  route="contact-us"
                  onPageChange={onPageChange}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-surface-100 hover:bg-surface-200 text-heading border border-surface-300 font-heading font-bold text-[13.5px] uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  Talk To Quality Support
                </InternalLink>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </PageWrapper>
  );
}
