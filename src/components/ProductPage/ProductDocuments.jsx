import { getBrochureUrl } from '../../data/brochureUrl';

const companyProfilePdf = getBrochureUrl('Company Profile - SKM Egg Products Export India Limited.pdf');
const productListPdf = getBrochureUrl('Product List - SKM Egg Products Export India Limited.pdf');

// Section 8 — documents (brief §8). Only real PDFs are listed: the
// product's own flyer/TDS where one exists (data/products.js `tdsUrl`,
// real for only 3 of 11 products) plus the two real company-wide documents
// already published on BrochurePage.jsx (Company Profile, Full Product
// List) — genuinely relevant to every product since they're the company's
// only general-purpose product documents. Safety data sheets, allergen
// declarations, dedicated application guides, and packaging specification
// PDFs don't exist anywhere in the codebase, so those document types are
// omitted entirely rather than shown as broken/fake links.
export default function ProductDocuments({ tdsUrl, productName, onRequestPack }) {
  const documents = [
    tdsUrl && { label: `${productName} — Technical Data Sheet`, url: tdsUrl },
    { label: 'Company Profile', url: companyProfilePdf },
    { label: 'Full Product List', url: productListPdf },
  ].filter(Boolean);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 max-w-2xl">
        <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
          <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
          Resources
        </span>
        <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white m-0 tracking-tight leading-[1.1]">
          Documents
        </h2>
      </div>

      <div className="flex flex-col rounded-[28px] border border-surface-200/60 dark:border-surface-800 bg-white dark:bg-surface-900/40 overflow-hidden">
        {documents.map((doc, i) => (
          <div
            key={doc.url}
            className={`flex items-center justify-between gap-4 px-6 sm:px-10 py-6 ${i > 0 ? 'border-t border-surface-200/60 dark:border-surface-800' : ''}`}
          >
            <div className="flex items-center gap-4 min-w-0">
              <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-[12px] bg-brand-600/6 dark:bg-brand-950/40 border border-brand-600/12 dark:border-brand-900/40">
                <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              <span className="font-heading font-semibold text-[15px] sm:text-[16px] text-heading dark:text-white truncate">
                {doc.label}
              </span>
            </div>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex-shrink-0 inline-flex items-center gap-2 font-body font-bold text-[12px] uppercase tracking-[0.05em] text-brand-600 dark:text-brand-400 hover:text-[#a80000] px-4 py-2.5 rounded-full border border-surface-200 dark:border-surface-700 hover:border-brand-600/30 transition-colors duration-200"
            >
              Download
            </a>
          </div>
        ))}
      </div>

      <button
        onClick={onRequestPack}
        className="self-start inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-8 py-[17px] rounded-[200px] transition-all duration-300 shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] cursor-pointer"
      >
        Request Complete Document Pack
      </button>
    </div>
  );
}
