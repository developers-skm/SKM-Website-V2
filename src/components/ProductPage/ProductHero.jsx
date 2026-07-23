// Immersive editorial hero — image occupies ~60% width, the content panel
// overlaps its left edge on desktop (negative margin pulling the panel over
// the photo) rather than sitting as a fully separate rectangle beside it, so
// the two feel like one connected composition instead of a generic 50/50
// split. Warm eggshell panel, no dark overlay anywhere on the photo itself.
//
// Three CTAs above the fold per the product-detail-page brief: primary
// "Request a Sample", secondary "Download Technical Data Sheet" (only
// rendered when a real per-product PDF exists — see data/products.js —
// never a fabricated document link), and a text-only "Request Pricing".
// Both sample and pricing route to the same real get-quote flow with
// productId prefilled — there is no separate pricing-intent destination in
// the app (same precedent as Home's FinalEnquiry section).
//
// "Main functional benefits" and "Main application tags" are derived
// directly from the real variantsData/applicationsData already passed into
// every product page — not new data. Benefits are deduplicated `benefits`
// strings truncated to their leading clause (before the first comma) so
// they read as short tags rather than full sentences; capped at 3.
// Applications are the real applicationsData `name` values, capped at 4.
// The previous "ISO 9001 Certified" badge was removed — no such
// certification exists in data/certifications.js (real ones are FSSAI,
// BRC, ISO/IEC 17025, NABL, Halal, Kosher, etc.), so it was a fabricated
// claim rather than real product-page content.
function deriveBenefitTags(variantsData) {
  if (!variantsData?.length) return [];
  const seen = new Set();
  const tags = [];
  for (const variant of variantsData) {
    if (!variant.benefits) continue;
    const tag = variant.benefits.split(',')[0].trim().replace(/\.$/, '');
    if (tag && !seen.has(tag)) {
      seen.add(tag);
      tags.push(tag);
    }
    if (tags.length >= 3) break;
  }
  return tags;
}

export default function ProductHero({
  backgroundImage,
  backgroundAlt,
  categoryLabel,
  titleLine1,
  titleLine2,
  description,
  primaryBadge,
  variantsData,
  applicationsData,
  tdsUrl,
  onRequestQuote,
  onRequestPricing,
}) {
  const benefitTags = deriveBenefitTags(variantsData);
  const applicationTags = (applicationsData ?? []).slice(0, 4).map((a) => a.name);

  return (
    <div className="relative w-full bg-white dark:bg-surface-900/40 overflow-hidden">
      <div className="mx-auto max-w-[1440px] w-full">
        <div className="relative flex flex-col lg:flex-row lg:min-h-[640px] lg:items-center">

          {/* Image — ~60% width on desktop, full width stacked on mobile */}
          <div className="relative w-full lg:w-[60%] h-[280px] sm:h-[380px] lg:h-[620px] order-1 lg:order-2 rounded-b-[24px] lg:rounded-[28px] overflow-hidden lg:mr-5">
            <img
              src={backgroundImage}
              alt={backgroundAlt}
              className="absolute inset-0 w-full h-full object-cover select-none"
              fetchPriority="high"
            />
          </div>

          {/* Content panel — overlaps the image's left edge on desktop via
              negative margin, sits as a warm eggshell card with real padding
              and shadow rather than a flat filled rectangle */}
          <div className="relative z-10 w-full lg:w-[46%] order-2 lg:order-1 lg:-mr-[6%] bg-[#fbf7f1] dark:bg-surface-900 rounded-[24px] lg:rounded-[28px] shadow-[0_20px_60px_rgba(36,30,24,0.08)] px-6 sm:px-12 lg:px-16 py-10 sm:py-14 lg:py-[72px] flex flex-col gap-7 -mt-8 lg:mt-0">
            <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400 self-start">
              <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
              {categoryLabel}
            </span>
            <h1 className="font-heading font-bold text-[40px] sm:text-[54px] lg:text-[64px] text-heading dark:text-white leading-[1.02] tracking-tight m-0">
              {titleLine1} {titleLine2}
            </h1>
            <p className="font-body text-[17px] sm:text-[18px] text-surface-600 dark:text-surface-300 leading-[1.75] m-0 max-w-[56ch]">
              {description}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2">
              <span className="inline-flex items-center gap-1.5 font-body text-[12.5px] font-semibold text-heading dark:text-white">
                <svg className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {primaryBadge ?? '100% Hen Egg Product'}
              </span>
            </div>

            {benefitTags.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="font-body text-[11.5px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500">
                  Main functional benefits
                </span>
                <div className="flex flex-wrap gap-2">
                  {benefitTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-white dark:bg-surface-800 border border-[#e5ddd0] dark:border-surface-700 font-body text-[12.5px] font-semibold text-heading dark:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {applicationTags.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="font-body text-[11.5px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500">
                  Main application tags
                </span>
                <div className="flex flex-wrap gap-2">
                  {applicationTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-600/8 dark:bg-brand-950/40 border border-brand-600/20 dark:border-brand-900/40 font-body text-[12.5px] font-semibold text-brand-700 dark:text-brand-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-3">
              <button
                onClick={onRequestQuote}
                className="self-start inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13.5px] uppercase tracking-[0.05em] leading-none px-8 py-[18px] rounded-[200px] transition-all duration-300 shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] cursor-pointer"
              >
                Request a Sample
              </button>
              {tdsUrl && (
                <a
                  href={tdsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-transparent text-heading dark:text-white font-heading font-bold text-[13.5px] uppercase tracking-[0.05em] leading-none px-8 py-[18px] rounded-[200px] border border-[#d8d0c4] dark:border-surface-700 hover:border-brand-600/40 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-300 cursor-pointer"
                >
                  Download Technical Data Sheet
                </a>
              )}
              <button
                onClick={onRequestPricing}
                className="font-body font-semibold text-[13.5px] text-brand-600 dark:text-brand-400 hover:text-[#a80000] dark:hover:text-brand-300 underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
              >
                Request Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
