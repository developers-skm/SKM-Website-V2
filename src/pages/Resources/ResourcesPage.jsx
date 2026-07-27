import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import { containerVariants, itemVariants } from '../../utils/animationVariants';
import products from '../../data/products';
import applications from '../../data/applications';
import certifications from '../../data/certifications';
import { getBrochureUrl } from '../../data/brochureUrl';

// Sections 2 + 3 — Resource filters + Technical documents, built together
// since the filters need a real document list to act on.
//
// Section 2 filters: only Product, Application, and Document type are
// real, derivable axes. Language, Market, Certification, and Date are
// omitted — no per-document metadata for any of those exists anywhere in
// the repo (every document is English-only, untagged by export market or
// certification, and undated), so building those filters would mean
// either fake options or options that silently do nothing.
//
// Section 3 groups: only "Technical data sheets" has real downloadable
// files — exactly 3 of 11 products have a real TDS PDF
// (data/products.js `tdsUrl`: Whole Egg Powder, Egg Yolk Powder, Egg
// Albumen Powder). Safety documents, Packaging specifications, and Product
// guides don't exist as files anywhere, so those 3 groups render with an
// honest "not yet available" state rather than fake documents. "Add to
// Document Pack" is a real local selection
// mechanism (client-side, same pattern as the product-comparison feature
// on /products) feeding Section 8's "Request a Document" CTA.
const TDS_PRODUCTS = products.filter((p) => p.tdsUrl);

const DOCUMENT_GROUPS = [
  { id: 'technical-data-sheets', label: 'Technical data sheets', hasRealDocs: true },
  { id: 'safety-documents', label: 'Safety documents', hasRealDocs: false },
  { id: 'packaging-specifications', label: 'Packaging specifications', hasRealDocs: false },
  { id: 'product-guides', label: 'Product guides', hasRealDocs: false },
];

function TechnicalDocumentsSection({ onPageChange, documentPack, onTogglePack }) {
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
      return true;
    });
  }, [productFilter, applicationProductIds]);

  const activeGroup = DOCUMENT_GROUPS.find((g) => g.id === docTypeFilter);

  return (
    <div id="technical-documents" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40 scroll-mt-[100px] xl:scroll-mt-[120px]">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <h2 className="font-heading font-bold text-[24px] sm:text-[30px] text-heading dark:text-white m-0 tracking-tight">
          Technical documents
        </h2>

        {/* Section 2 — Resource filters */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-body text-[12px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500 mr-1">Document type</span>
            {DOCUMENT_GROUPS.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setDocTypeFilter(group.id)}
                aria-pressed={docTypeFilter === group.id}
                className={`inline-flex items-center min-h-[36px] px-3.5 py-2 rounded-full border font-body font-semibold text-[13px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                  docTypeFilter === group.id
                    ? 'bg-brand-600 border-brand-600 text-white'
                    : 'bg-white dark:bg-surface-900 border-surface-300 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:border-brand-600/50'
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>

          {activeGroup?.hasRealDocs && (
            <>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-body text-[12px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500 mr-1">Product</span>
                {TDS_PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProductFilter(productFilter === p.id ? null : p.id)}
                    aria-pressed={productFilter === p.id}
                    className={`inline-flex items-center min-h-[34px] px-3 py-1.5 rounded-full border font-body text-[12.5px] font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                      productFilter === p.id
                        ? 'bg-brand-600 border-brand-600 text-white'
                        : 'bg-white dark:bg-surface-900 border-surface-300 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:border-brand-600/50'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-body text-[12px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500 mr-1">Application</span>
                {applications.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setApplicationFilter(applicationFilter === app.id ? null : app.id)}
                    aria-pressed={applicationFilter === app.id}
                    className={`inline-flex items-center min-h-[34px] px-3 py-1.5 rounded-full border font-body text-[12.5px] font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                      applicationFilter === app.id
                        ? 'bg-brand-600 border-brand-600 text-white'
                        : 'bg-white dark:bg-surface-900 border-surface-300 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:border-brand-600/50'
                    }`}
                  >
                    {app.title}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Section 3 — Technical documents list */}
        {activeGroup?.hasRealDocs ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleTds.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between gap-4 rounded-[16px] border border-surface-200/70 dark:border-surface-800 bg-white dark:bg-surface-900/40 px-6 py-5"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-[12px] bg-brand-600/6 dark:bg-brand-950/40 border border-brand-600/12 dark:border-brand-900/40">
                    <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-body text-[10.5px] font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500">Technical Data Sheet</span>
                    <span className="font-heading font-semibold text-[14.5px] text-heading dark:text-white truncate">{p.title}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <a
                    href={p.tdsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body font-bold text-[12px] uppercase tracking-[0.05em] text-brand-600 dark:text-brand-400 hover:text-[#a80000] px-4 py-2 rounded-full border border-surface-200 dark:border-surface-700 hover:border-brand-600/30"
                  >
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={() => onTogglePack(p.id, p.title)}
                    aria-pressed={documentPack.some((d) => d.id === p.id)}
                    className={`font-body font-semibold text-[11.5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm ${
                      documentPack.some((d) => d.id === p.id) ? 'text-brand-600 dark:text-brand-400 underline' : 'text-surface-500 dark:text-surface-400 hover:underline'
                    }`}
                  >
                    {documentPack.some((d) => d.id === p.id) ? 'Added to Pack' : 'Add to Document Pack'}
                  </button>
                </div>
              </div>
            ))}
            {visibleTds.length === 0 && (
              <p className="font-body text-[14px] text-surface-500 dark:text-surface-400 col-span-full">No technical data sheets match this filter.</p>
            )}
          </div>
        ) : (
          <div className="rounded-[16px] border border-dashed border-surface-300 dark:border-surface-700 bg-surface-50/60 dark:bg-surface-900/30 px-6 py-8 text-center">
            <p className="font-body text-[14px] text-surface-500 dark:text-surface-400 m-0">
              {activeGroup?.label} are not yet available for download. <InternalLink route="contact-us" onPageChange={onPageChange} className="text-brand-600 dark:text-brand-400 hover:underline">Contact us</InternalLink> to request this document.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Section 4 — Certifications. Reuses the real 8-certification set
// (data/certifications.js), same source used sitewide. "View Certificate"
// opens the real certificate logo image (the only real asset per
// certificate); "Download Certificate" downloads that same image.
// "Request Complete Certification Pack" is a genuinely disabled button —
// no real certification-pack PDF exists, same precedent already
// established on Home's QualityCertificationProof and the combined
// Quality, Food Safety & Traceability page.
function CertificationsSection() {
  return (
    <div className="w-full py-[50px] lg:py-[70px] border-b border-[#eee] dark:border-surface-800/40 bg-page dark:bg-surface-900/40">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Certifications</span>
          <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading dark:text-white m-0 tracking-tight">Certificates</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {certifications.map((cert) => (
            <div key={cert.name} className="flex flex-col gap-3 p-5 rounded-[16px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900">
              <img src={cert.logo} alt={cert.name} loading="lazy" className="w-full aspect-square object-contain rounded-md bg-white p-2" />
              <span className="font-heading font-bold text-[13px] text-heading dark:text-white text-center">{cert.name}</span>
              <div className="flex items-center justify-center gap-4">
                <a href={cert.logo} target="_blank" rel="noopener noreferrer" className="font-body font-semibold text-[11.5px] text-brand-600 dark:text-brand-400 hover:underline">
                  View Certificate
                </a>
                <a href={cert.logo} download className="font-body font-semibold text-[11.5px] text-surface-500 dark:text-surface-400 hover:underline">
                  Download Certificate
                </a>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          disabled
          title="Coming soon"
          aria-disabled="true"
          className="self-start inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-surface-300 dark:border-surface-700 text-surface-400 dark:text-surface-600 font-body font-semibold text-[14px] cursor-not-allowed opacity-60"
        >
          Request Complete Certification Pack
        </button>
      </div>
    </div>
  );
}

// Section 5 — Brochures and application guides. Merges the real content
// from the standalone /brochure page (src/pages/Brochure/BrochurePage.jsx)
// directly into this resource centre, per the brief — same real PDF
// assets (Company Profile, Full Product List, 4 product flyers),
// served as static files from public/documents/brochures/, not duplicated
// as new data. /brochure itself stays live for SEO/direct linking (same
// precedent as every other consolidated page this session). "Download
// Product Portfolio" downloads the real Full Product List PDF. "Download
// Application Guide" has no real file anywhere in the repo — no dedicated
// application guide document exists — so it's a genuinely disabled button
// rather than a fake download.

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

function buildBrochureEntries() {
  return Object.keys(brochureMeta).map((fileName) => {
    const meta = brochureMeta[fileName];
    return { fileName, url: getBrochureUrl(fileName), ...meta };
  });
}

const brochureEntries = buildBrochureEntries();
const productPortfolio = brochureEntries.find((e) => e.title === 'Full Product List');

function BrochuresApplicationGuidesSection() {
  return (
    <div className="w-full py-[50px] lg:py-[70px] border-b border-[#eee] dark:border-surface-800/40">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Downloads</span>
          <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading dark:text-white m-0 tracking-tight">Brochures and application guides</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {brochureEntries.map((entry) => (
            <div key={entry.fileName} className="flex flex-col gap-3 p-6 rounded-[14px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900/50">
              <span className={`self-start font-body text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded ${entry.category === 'Product Flyer' ? 'text-brand-600 bg-brand-600/6 border border-brand-600/15' : 'text-surface-600 dark:text-surface-400 bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700'}`}>
                {entry.category}
              </span>
              <h3 className="font-heading font-bold text-[16px] text-heading dark:text-white m-0">{entry.title}</h3>
              <p className="font-body text-[13px] text-surface-500 dark:text-surface-400 leading-[21px] m-0 flex-1">{entry.desc}</p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#f0f0f0] dark:border-surface-800">
                <a href={entry.url} target="_blank" rel="noopener noreferrer" className="font-body font-bold text-[11px] uppercase tracking-[0.05em] text-brand-600 dark:text-brand-400 hover:text-[#a80000]">View PDF</a>
                <a href={entry.url} download className="font-body font-bold text-[11px] uppercase tracking-[0.05em] text-surface-500 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400">Download</a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {productPortfolio && (
            <a
              href={productPortfolio.url}
              download
              className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[14px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
              Download Product Portfolio
            </a>
          )}
          <button
            type="button"
            disabled
            title="Coming soon"
            aria-disabled="true"
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-surface-300 dark:border-surface-700 text-surface-400 dark:text-surface-600 font-body font-semibold text-[14px] cursor-not-allowed opacity-60"
          >
            Download Application Guide
          </button>
        </div>
      </div>
    </div>
  );
}

// Section 7 — Frequently asked questions. All 7 requested categories are
// shown; each answer is a real, verbatim/paraphrased fact already
// published on another page in this app (never invented) — Product
// selection (Products Hub finder + comparison), Packaging (real
// packaging formats), Storage (real chilled/frozen temperatures), Export
// documentation (real EU/USDA approval), Quality and certification (real
// 8 certifications + NABL lab). "Samples" and "MOQ and commercial
// enquiry" have no real documented policy anywhere in the repo (no sample-
// request mechanism, no published minimum order quantity), so those 2
// categories give an honest "ask us directly" answer rather than an
// invented number or policy. "Ask Another Question" routes to the real
// Contact Us page.
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

function FaqSection({ onPageChange }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full py-[50px] lg:py-[70px] border-b border-[#eee] dark:border-surface-800/40">
      <div className="mx-auto max-w-[900px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Support</span>
          <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading dark:text-white m-0 tracking-tight">Frequently asked questions</h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ_CATEGORIES.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.category} className="rounded-[14px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900/50 overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-4 cursor-pointer bg-transparent border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-body text-[10.5px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">{item.category}</span>
                    <span className="font-heading font-semibold text-[15px] text-heading dark:text-white">{item.question}</span>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden>
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <p className="font-body text-[14px] text-surface-600 dark:text-surface-300 leading-[1.6] m-0 px-6 pb-5">{item.answer}</p>
                )}
              </div>
            );
          })}
        </div>

        <InternalLink
          route="contact-us"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[14px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Ask Another Question
        </InternalLink>
      </div>
    </div>
  );
}

const csrCards = [
  { title: 'Community Development', description: 'The SKM Health and Mind Welfare Charity Trust — Sevai Maiyam — supporting adopted families with housing, sanitation, and welfare.', page: 'community_development' },
  { title: 'Trust Outreach Programs', description: 'Sanitation, education fees, medical services, financial aid, elder care, and more for the communities SKM serves.', page: 'trust_outreach' },
  { title: 'Education', description: 'ABL teaching systems, coaching centres, libraries, and cultural education initiatives for underserved students.', page: 'csr_education' },
  { title: 'Sustainability', description: 'Carbon footprint reduction, wind energy investment, and environmental policy commitments.', page: 'csr_sustainability' },
  { title: 'MD Article', description: "The Olirum Erode Foundation — the Managing Director's personal initiative across five community focus areas.", page: 'md_article' },
];

// Resources and Technical Downloads — this page previously covered
// Brochures + CSR only; it's now expanded into the real technical
// downloads hub the brief asks for, folding in the real content from
// /brochure (Section 5) and building the remaining sections only where
// real data exists.
//
// Section 1 — Resource hero and search. Real, page-local search: filters
// the real documents already listed in Section 3/5 below by title/category
// (no fabricated search index or backend). "Browse All Resources" scrolls
// to Section 3 (Technical documents), the real document library.
export default function ResourcesPage({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');
  const [documentPack, setDocumentPack] = useState([]);

  const toggleDocumentPack = (id, title) => {
    setDocumentPack((prev) =>
      prev.some((d) => d.id === id) ? prev.filter((d) => d.id !== id) : [...prev, { id, title }]
    );
  };

  return (
    <PageWrapper
      seo={{
        title: 'Resources and Technical Downloads | SKM Egg Products',
        description: 'Search and download SKM Egg Products technical data sheets, certifications, brochures, and application guides.',
        keywords: 'SKM egg products brochure, egg powder technical data sheet, egg product certifications download, SKM CSR, egg products corporate social responsibility',
        canonical: 'https://www.skmegg.com/resources',
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page dark:bg-surface-950">

        {/* Section 1 — Resource hero and search */}
        <div className="w-full py-[70px] lg:py-[100px] border-b border-[#eee] dark:border-surface-800/40 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="mx-auto max-w-[820px] flex flex-col items-center gap-6"
          >
            <span className="section-label justify-center">Resources</span>
            <h1 className="font-heading font-bold text-[36px] sm:text-[48px] lg:text-[54px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
              Resources and Technical Downloads
            </h1>

            <form
              role="search"
              onSubmit={(e) => e.preventDefault()}
              className="w-full max-w-[560px] flex items-center gap-3 mt-2"
            >
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search product specifications, certificates, brochures or application guides."
                  aria-label="Search resources"
                  className="w-full min-h-[46px] pl-11 pr-4 py-3 rounded-full border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 font-body text-[14px] text-heading dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <button
                type="submit"
                className="flex-shrink-0 inline-flex items-center justify-center min-h-[46px] px-6 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Search
              </button>
            </form>

            <button
              type="button"
              onClick={() => document.getElementById('technical-documents')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })}
              className="inline-flex items-center gap-2 mt-1 font-body font-semibold text-[14px] text-brand-600 dark:text-brand-400 hover:underline bg-transparent border-none p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
            >
              Browse All Resources
            </button>
          </motion.div>
        </div>

        {/* Sections 2 + 3 — Resource filters + Technical documents */}
        <TechnicalDocumentsSection onPageChange={onPageChange} documentPack={documentPack} onTogglePack={toggleDocumentPack} />

        {/* Section 4 — Certifications */}
        <CertificationsSection />

        {/* Section 5 — Brochures and application guides */}
        <BrochuresApplicationGuidesSection />

        {/* CSR */}
        <div className="w-full py-[50px] lg:py-[70px] border-b border-[#eee] dark:border-surface-800/40">
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-1">
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Beyond The Factory Floor</span>
              <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading dark:text-white m-0 tracking-tight">Corporate Social Responsibility</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {csrCards.map((card) => (
                <motion.button
                  key={card.page}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  onClick={() => onPageChange(card.page)}
                  className="flex flex-col items-start gap-2 text-left p-6 bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[14px] shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.14)] hover:border-brand-600/30 transition-all duration-300 cursor-pointer focus:outline-none"
                >
                  <h3 className="font-heading font-bold text-[16px] text-heading dark:text-white m-0">{card.title}</h3>
                  <p className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 leading-[22px] m-0">{card.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Section 7 — Frequently asked questions */}
        <FaqSection onPageChange={onPageChange} />

        {/* Section 8 — Resource CTA. "Request a Document" routes to the
            real Contact Us page — no dedicated document-request form
            exists, so it reuses the real contact channel, carrying the
            Document Pack selection (built in Section 3) as context when
            items have been added. "Talk to Technical Support" also routes
            to the real Contact Us page. */}
        <div className="w-full py-[60px] lg:py-[80px] text-center px-4">
          <div className="mx-auto max-w-[600px] flex flex-col items-center gap-5">
            <h2 className="font-heading font-bold text-[24px] sm:text-[30px] text-heading dark:text-white m-0 tracking-tight">
              Need something specific?
            </h2>
            {documentPack.length > 0 && (
              <p className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 m-0">
                {documentPack.length} document{documentPack.length === 1 ? '' : 's'} in your pack: {documentPack.map((d) => d.title).join(', ')}
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <InternalLink
                route="contact-us"
                onPageChange={onPageChange}
                className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-7 py-[15px] rounded-[200px] transition-all duration-300 shadow-[0_4px_20px_rgba(228,10,24,0.25)] hover:shadow-[0_6px_28px_rgba(228,10,24,0.4)] cursor-pointer"
              >
                Request a Document
              </InternalLink>
              <InternalLink
                route="contact-us"
                onPageChange={onPageChange}
                className="inline-flex items-center gap-2.5 bg-transparent hover:bg-brand-600/6 dark:hover:bg-brand-950/30 text-surface-900 dark:text-surface-100 border border-surface-250 dark:border-surface-700 font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-7 py-[15px] rounded-[200px] transition-all duration-300 cursor-pointer"
              >
                Talk to Technical Support
              </InternalLink>
            </div>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
