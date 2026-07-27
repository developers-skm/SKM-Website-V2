// Full-bleed editorial hero — the product photo fills the entire section as
// a background image with a minimum-opacity dark scrim over it (just enough
// for white text to stay legible), rather than sitting beside the content in
// its own boxed panel. All copy renders directly on top of the photo.
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
    <div className="relative w-full min-h-[560px] lg:min-h-[680px] flex items-center overflow-hidden">
      <img
        src={backgroundImage}
        alt={backgroundAlt}
        className="absolute inset-0 w-full h-full object-cover select-none"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1440px] w-full px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[640px] flex flex-col gap-7">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-white/90 self-start">
            <span className="w-5 h-px bg-white/70" aria-hidden="true" />
            {categoryLabel}
          </span>
          <h1 className="font-heading font-bold text-[40px] sm:text-[54px] lg:text-[64px] text-white leading-[1.02] tracking-tight m-0">
            {titleLine1} {titleLine2}
          </h1>
          <p className="font-body text-[17px] sm:text-[18px] text-white/85 leading-[1.75] m-0 max-w-[56ch]">
            {description}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-1">
            <span className="inline-flex items-center gap-1.5 font-body text-[12.5px] font-semibold text-white">
              <svg className="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {primaryBadge ?? '100% Hen Egg Product'}
            </span>
          </div>

          {benefitTags.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-body text-[11.5px] font-semibold uppercase tracking-wide text-white/60">
                Main functional benefits
              </span>
              <div className="flex flex-wrap gap-2">
                {benefitTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 font-body text-[12.5px] font-semibold text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {applicationTags.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-body text-[11.5px] font-semibold uppercase tracking-wide text-white/60">
                Main application tags
              </span>
              <div className="flex flex-wrap gap-2">
                {applicationTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-600/25 backdrop-blur-sm border border-brand-400/40 font-body text-[12.5px] font-semibold text-white"
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
              className="self-start inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13.5px] uppercase tracking-[0.05em] leading-none px-8 py-[18px] rounded-[200px] transition-all duration-300 shadow-[0_8px_24px_rgba(228,10,24,0.35)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.45)] cursor-pointer"
            >
              Request a Sample
            </button>
            {tdsUrl && (
              <a
                href={tdsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-white/10 backdrop-blur-sm text-white font-heading font-bold text-[13.5px] uppercase tracking-[0.05em] leading-none px-8 py-[18px] rounded-[200px] border border-white/40 hover:border-white/70 hover:bg-white/15 transition-all duration-300 cursor-pointer"
              >
                Download Technical Data Sheet
              </a>
            )}
            <button
              onClick={onRequestPricing}
              className="font-body font-semibold text-[13.5px] text-white underline underline-offset-4 decoration-white/50 hover:decoration-white transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
            >
              Request Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
