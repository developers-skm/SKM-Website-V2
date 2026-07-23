// Section 7 — related resources (brief §7). Of the 5 brief resource types
// (Technical guide, Product flyer, Video, FAQ, Case example), only Product
// Flyer has real files anywhere in the codebase — the same TDS PDFs used
// throughout the product/application work, and only for the 3 products
// that have one. No videos, FAQs, or case studies exist anywhere in this
// codebase, so those types are omitted entirely rather than shown as
// placeholder or broken entries.
export default function RelatedResources({ matchedProducts, onPageChange }) {
  const flyers = matchedProducts.filter((p) => p.tdsUrl);

  if (flyers.length === 0) return null;

  return (
    <div className="w-full bg-[#f8f4ee] dark:bg-surface-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            Resources
          </span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white m-0 tracking-tight leading-[1.1]">
            Related Resources
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {flyers.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-4 rounded-[20px] border border-surface-200/60 dark:border-surface-800 bg-white dark:bg-surface-900/40 px-6 py-6"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-[12px] bg-brand-600/6 dark:bg-brand-950/40 border border-brand-600/12 dark:border-brand-900/40">
                  <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-body text-[10.5px] font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500">
                    Product Flyer
                  </span>
                  <span className="font-heading font-semibold text-[14.5px] text-heading dark:text-white truncate">
                    {product.title}
                  </span>
                </div>
              </div>
              <a
                href={product.tdsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 font-body font-bold text-[12px] uppercase tracking-[0.05em] text-brand-600 dark:text-brand-400 hover:text-[#a80000] px-4 py-2 rounded-full border border-surface-200 dark:border-surface-700 hover:border-brand-600/30"
              >
                Open Resource
              </a>
            </div>
          ))}
        </div>

        <button
          onClick={() => onPageChange('brochure')}
          className="self-start font-body font-bold text-[13px] uppercase tracking-[0.05em] text-brand-600 dark:text-brand-400 hover:text-[#a80000] underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
        >
          View All Application Resources
        </button>
      </div>
    </div>
  );
}
