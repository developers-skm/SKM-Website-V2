// Calm closing section before the footer — soft red-tinted surface. Reuses
// only the approved "Request Sample / Get Quote" CTA wording and the
// product's own name/category (already passed into ProductPage); no new
// marketing copy is introduced. Gives the page a deliberate final beat
// instead of jumping straight from Related Products into the footer.
export default function FinalEnquiryCTA({ productName, productId, categoryLabel, onPageChange }) {
  return (
    <section className="w-full bg-[#fdf1f0] dark:bg-brand-950/20 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[900px] w-full px-5 sm:px-8 lg:px-12 flex flex-col items-center text-center gap-5">
        {categoryLabel && (
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            {categoryLabel}
          </span>
        )}
        <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-heading dark:text-white m-0 tracking-tight leading-[1.15]">
          {productName}
        </h2>
        <button
          onClick={() => onPageChange('get-quote', { productId })}
          className="mt-2 inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-8 py-[17px] rounded-[200px] transition-all duration-300 shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] cursor-pointer"
        >
          Request Sample / Get Quote
        </button>
      </div>
    </section>
  );
}
