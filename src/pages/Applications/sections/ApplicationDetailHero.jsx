// Section 1 — problem-first application hero (brief §1). Shows the primary
// manufacturing challenge (real `problem` field), functional result (real
// `intro` field — already describes what the product does functionally,
// not new copy), and relevant product families derived from the real
// matched products' own `category` values (e.g. "Egg Powders", "Liquid
// Eggs") rather than an invented family taxonomy.
//
// "Find the Recommended Product" scrolls to Section 4 (the real matched
// products list) further down this same page. "Talk to an Application
// Specialist" routes to the real Contact Us page — no named/dedicated
// specialist contact exists in the app, same pattern used throughout the
// product detail page work.
export default function ApplicationDetailHero({ application, productFamilies, onPageChange }) {
  const scrollToProducts = () => {
    document.getElementById('recommended-products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative w-full overflow-hidden border-b border-[#eee] dark:border-surface-800/40">
      <img
        src={application.image}
        alt={application.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.82) 100%)' }}
      />
      <div className="relative z-10 mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 py-[100px] lg:py-[140px] flex flex-col gap-6 max-w-[760px]">
        <div className="flex flex-wrap items-center gap-2">
          {application.tags.map((tag) => (
            <span key={tag} className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-white bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-heading font-bold text-[32px] sm:text-[42px] lg:text-[48px] text-white leading-[1.15] tracking-tight m-0">
          {application.problem}
        </h1>

        <p className="font-body text-[15px] sm:text-[16px] text-white/80 leading-[28px] m-0 max-w-xl">
          {application.intro}
        </p>

        {productFamilies.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="font-body text-[12px] font-semibold uppercase tracking-[0.1em] text-white/60">
              Relevant Families:
            </span>
            {productFamilies.map((family) => (
              <span key={family} className="font-body text-[12.5px] font-semibold text-white border-b border-white/40">
                {family}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-3">
          <button
            onClick={scrollToProducts}
            className="inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13.5px] uppercase tracking-[0.05em] leading-none px-8 py-[18px] rounded-[200px] transition-all duration-300 shadow-[0_8px_24px_rgba(228,10,24,0.3)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.4)] cursor-pointer"
          >
            Find The Recommended Product
          </button>
          <button
            onClick={() => onPageChange('contact-us')}
            className="font-body font-semibold text-[14px] text-white/90 hover:text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
          >
            Talk to an Application Specialist
          </button>
        </div>
      </div>
    </div>
  );
}
