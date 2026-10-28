import { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import { EASE_PREMIUM } from '../../utils/motionTokens';
import products from '../../data/products';
import certifications from '../../data/certifications';
import { getBrochureUrl } from '../../data/brochureUrl';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';

// Shared motion primitives for restrained, premium technical document feel
const sectionHeadingReveal = (reduceMotion) => ({
  initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: reduceMotion ? 0.01 : 0.65, ease: EASE_PREMIUM },
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

// Every search word must appear in the haystack; a trailing "s"/"es" is
// dropped so "certificates" still matches "certificate".
function matchesSearch(query, ...fields) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return true;
  const haystack = fields.filter(Boolean).join(' ').toLowerCase();
  return q.split(/\s+/).every((word) => {
    const stem = word.length > 3 ? word.replace(/(es|s)$/, '') : word;
    return haystack.includes(word) || haystack.includes(stem);
  });
}

const TDS_PRODUCTS = products.filter((p) => p.tdsUrl);

function TechnicalDocumentsSection({ globalSearchQuery }) {
  const reduceMotion = useReducedMotion();
  const visibleTds = useMemo(() => {
    return TDS_PRODUCTS.filter((p) => {
      if (globalSearchQuery && globalSearchQuery.trim() !== '') {
        const q = globalSearchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCategory = p.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCategory) return false;
      }
      return true;
    });
  }, [globalSearchQuery]);

  if (globalSearchQuery?.trim() && visibleTds.length === 0) return null;

  return (
    <div id="technical-documents" className="relative w-full bg-white py-16 lg:py-24 scroll-mt-[100px] xl:scroll-mt-[120px]">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        
        {/* Section Heading */}
        <motion.div {...sectionHeadingReveal(reduceMotion)} className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="font-body text-[12px] font-bold uppercase tracking-widest text-brand-600">
              Verified Specifications
            </span>
          </div>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading m-0 tracking-tight">
            Product Details
          </h2>
          <p className="font-body text-[14.5px] text-surface-600 max-w-2xl m-0 leading-relaxed">
            Download laboratory-verified product details for SKM's egg powder and liquid formulations.
          </p>
        </motion.div>

        {/* Section 3 - Technical Documents List */}
        <AnimatePresence mode="wait">
          <motion.div
              key={globalSearchQuery}
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
                            Product Details
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
                      Official product details, microbiological parameters, shelf life, and storage conditions for {p.title}.
                    </p>

                    <div className="flex items-center pt-4 border-t border-surface-200/60">
                      <a
                        href={p.tdsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-body font-bold text-[12px] uppercase tracking-wider text-white bg-brand-600 hover:bg-brand-700 px-4 py-2.5 rounded-xl shadow-md shadow-brand-600/20 hover:shadow-lg hover:shadow-brand-600/30 transition-all duration-200 active:scale-[0.97]"
                      >
                        <span>Download</span>
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
                  <p className="font-body text-[13.5px] text-surface-500 m-0 max-w-md">Try changing your search query to view available technical documents.</p>
                </motion.div>
              )}
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Section 4 - Certifications
function CertificationsSection({ globalSearchQuery }) {
  const reduceMotion = useReducedMotion();
  const visibleCerts = useMemo(
    () => certifications.filter((cert) => matchesSearch(
      globalSearchQuery,
      cert.name,
      'certificate certification certificates accreditation quality food safety',
    )),
    [globalSearchQuery],
  );
  if (visibleCerts.length === 0) return null;
  return (
    <div id="certifications" className="relative w-full py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        
        <motion.div {...sectionHeadingReveal(reduceMotion)} className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="font-body text-[12px] font-bold uppercase tracking-widest text-brand-600">
              International Accreditation
            </span>
          </div>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading m-0 tracking-tight">
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
          {visibleCerts.map((cert) => (
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
              <p className="font-body text-[13px] text-surface-600 m-0">NABL ISO/IEC 17025 lab reports and Global audit verification packs are available on commercial request.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Section 5 - Brochures & Application Guides
const brochureMeta = {
  'Company Profile - SKM Egg Products Export India Limited.pdf': {
    category: 'Corporate',
    title: 'Company Profile',
    desc: 'Comprehensive overview of SKM Egg Products Export India Limited - history, processing scale, plant capabilities, and global footprint.',
    featured: true,
  },
  'Product List - SKM Egg Products Export India Limited.pdf': {
    category: 'Corporate',
    title: 'Full Product Portfolio',
    desc: 'Complete catalogue of SKM egg powders, liquid variants, customised bakery mixes, and technical food ingredients.',
    featured: true,
  },
  'SKM BAKERY MIX A5 FLYER (F-B).pdf': {
    category: 'Product Detail',
    title: 'Bakery Mix Product Details',
    desc: 'Product detail covering SKM specialised bakery egg mixes, functional whipping performance, and dosage recommendations.',
    featured: false,
  },
  'SKM EGG ALBUMEN POWDER    A5 FLYER (F-B).pdf': {
    category: 'Product Detail',
    title: 'Egg Albumen Powder Product Details',
    desc: 'Product detail for high-gel and high-whip Egg Albumen Powder - ideal for confectionery, meat binders, and sports nutrition.',
    featured: false,
  },
  'SKM EGG YOLK POWDER A5 FLYER (F-B).pdf': {
    category: 'Product Detail',
    title: 'Egg Yolk Powder Product Details',
    desc: 'Product detail covering emulsification capacity, fat content, heat stability, and applications in mayonnaise and sauces.',
    featured: false,
  },
  'SKM WHOLE EGG POWDER A5 FLYER (F-B).pdf': {
    category: 'Product Detail',
    title: 'Whole Egg Powder Product Details',
    desc: 'Product details for Whole Egg Powder - shelf-stable, pasteurised whole egg replacement for bakeries and commercial food manufacturing.',
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

function BrochuresApplicationGuidesSection({ globalSearchQuery }) {
  const reduceMotion = useReducedMotion();
  const visibleBrochures = useMemo(
    () => brochureEntries.filter((e) => matchesSearch(globalSearchQuery, e.title, e.category, e.desc, 'brochure pdf download')),
    [globalSearchQuery],
  );
  if (visibleBrochures.length === 0) return null;
  return (
    <div id="brochures" className="relative w-full bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        
        <motion.div {...sectionHeadingReveal(reduceMotion)} className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="font-body text-[12px] font-bold uppercase tracking-widest text-brand-600">
              Downloads & Publications
            </span>
          </div>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading m-0 tracking-tight">
            Corporate Brochures & Product Details
          </h2>
          <p className="font-body text-[14.5px] text-surface-600 max-w-2xl m-0 leading-relaxed">
            Access our official downloadable PDF literature, company overview documentation, and product details.
          </p>
        </motion.div>

        <motion.div
          variants={resourceGridVariants(reduceMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleBrochures.map((entry) => (
            <motion.div
              key={entry.fileName}
              variants={resourceItemVariants(reduceMotion)}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              transition={{ duration: 0.32, ease: EASE_PREMIUM }}
              className="group flex flex-col justify-between gap-5 p-6 rounded-2xl border border-surface-200/80 bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 hover:border-brand-500/40 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex flex-col gap-3">
                <span className={`self-start font-body text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-lg ${
                  entry.category === 'Product Detail'
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

// Section 6 - FAQ
const FAQ_CATEGORIES = [
  {
    category: 'Product selection',
    question: 'How do I find the right egg product for my application?',
    answer: 'Use the SKM Product Finder on the Products Hub to filter by format and packaging, or browse by application (bakery, mayonnaise, meat & fish, noodles & pasta) to see matched products.',
  },
  {
    category: 'Samples',
    question: 'Can I request a product sample?',
    answer: 'There is no published self-serve sample catalogue - contact our team directly with your product and application to discuss a sample.',
  },
  {
    category: 'MOQ and commercial enquiry',
    question: 'What is your minimum order quantity?',
    answer: 'Minimum order quantity varies by product and packaging format - contact our team directly for a commercial quote specific to your requirement.',
  },
  {
    category: 'Packaging',
    question: 'What packaging formats are available?',
    answer: 'Bag-in-box and paper bag for powders (10,15,25 Kg), LDPE bags for chilled/frozen liquids (5–20 Kg), and Pallecon IBC bulk containers (1000 Kg).',
  },
  {
    category: 'Storage',
    question: 'What are the storage requirements for liquid egg products?',
    answer: 'Chilled liquid egg products are stored at 0°C to 4°C; frozen variants are stored at ≤ -18°C.',
  },
  {
    category: 'Export documentation',
    question: 'What regulatory approvals does SKM hold for export?',
    answer: 'The plant is approved under the Indian Export of Egg Products Quality Control & Monitoring Rules (1997), based on EU guidelines (Approval No: 05/2/EP/97).',
  },
  {
    category: 'Quality and certification',
    question: 'What certifications does SKM hold?',
    answer: 'FSSAI, Export Inspection Council, BRCGS, ISO 22000, Halal (JUHF & BPJPH) and Kosher. NABL-accredited (ISO/IEC 17025) laboratory operational since 2006.',
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
    <div id="faq" className="relative w-full bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[960px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        
        <motion.div {...sectionHeadingReveal(reduceMotion)} className="flex flex-col gap-2 text-center items-center">
          <span className="font-body text-[12px] font-bold uppercase tracking-widest text-brand-600">
            Knowledge Center
          </span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading m-0 tracking-tight">
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
        description: 'Access laboratory-verified product details, global quality certifications, product brochures, and application guides.',
        keywords: 'SKM egg products brochure, egg powder product detail, egg product certifications download, SKM CSR, egg products quality specification',
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

          {/* Section 1 - Resource Hero & Search */}
          <div className="w-full pt-[110px] pb-20 sm:pt-[130px] lg:pt-28 lg:pb-28 px-4 sm:px-6 lg:px-8">
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
                Search, inspect, and download official product details, global quality certifications, product brochures, and regulatory guidelines.
              </motion.p>

              {/* Luxury Search Bar */}
              <motion.form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Jump to the first section that still has results after filtering.
                  const target = ['technical-documents', 'certifications', 'brochures', 'faq']
                    .map((id) => document.getElementById(id))
                    .find(Boolean);
                  target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
                }}
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
                    placeholder="Search product details, certificates, brochures or FAQ..."
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
                  { label: 'Product Details', target: 'technical-documents' },
                  { label: 'Certifications', target: 'certifications' },
                  { label: 'Brochures', target: 'brochures' },
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

            </div>
          </div>

          {/* Section 2 & 3 - Technical Documents */}
          <TechnicalDocumentsSection globalSearchQuery={searchQuery} />

          <CurvedDivider bg="#fff" fill="#f8fafc" />
          {/* Section 4 - Certifications */}
          <CertificationsSection globalSearchQuery={searchQuery} />

          <CurvedDivider bg="#f8fafc" fill="#fff" />
          {/* Section 5 - Brochures & Guides */}
          <BrochuresApplicationGuidesSection globalSearchQuery={searchQuery} />

          <CurvedDivider bg="#fff" fill="#fff" />
          {/* Section 6 - FAQ */}
          <FaqSection onPageChange={onPageChange} globalSearchQuery={searchQuery} />

          <CurvedDivider bg="#fff" fill="#f8fafc" />
          {/* Section 7 - Bottom Contact CTA */}
          <div className="w-full py-20 lg:py-28 text-center px-4">
            <motion.div
              {...sectionHeadingReveal(reduceMotion)}
              className="mx-auto max-w-[680px] p-10 rounded-3xl bg-white/80 border border-surface-200/80 backdrop-blur-xl shadow-2xl flex flex-col items-center gap-6"
            >
              <div className="w-14 h-14 rounded-full bg-brand-500/10 text-brand-600 flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading m-0 tracking-tight">
                Need Specific Technical Documentation?
              </h2>
              <p className="font-body text-[15px] text-surface-600 m-0 leading-relaxed">
                If you require customised packaging parameters, batch analytical certificates, or proprietary formulation data, our technical engineering team is ready to assist.
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
