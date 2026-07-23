// Section 1 — application hero (brief §1). "Select Your Application" is an
// in-page scroll to Section 2's real category cards below (both sections
// live on the same page, so no cross-page route is needed). "Talk to an
// Application Specialist" routes to the real Contact Us page — no dedicated
// application-specialist contact flow exists in the app, same pattern used
// throughout the product detail page work for "talk to a human" CTAs.
export default function ApplicationHero({ onPageChange }) {
  const scrollToCategories = () => {
    document.getElementById('application-categories')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full bg-white dark:bg-surface-900/40 py-16 sm:py-20 lg:py-28 text-center px-4">
      <div className="mx-auto max-w-[820px] flex flex-col items-center gap-6">
        <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
          <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
          Applications Hub
        </span>
        <h1 className="font-heading font-bold text-[38px] sm:text-[52px] lg:text-[60px] text-heading dark:text-white leading-[1.05] tracking-tight m-0">
          What Are We Manufacturing?
        </h1>
        <p className="font-body text-[16px] sm:text-[18px] text-surface-600 dark:text-surface-400 leading-[1.7] m-0 max-w-[58ch]">
          Food manufacturers usually think about the product they're developing before they think about an egg product code. Start with what you're making, and we'll point you to the right ingredient.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-2">
          <button
            onClick={scrollToCategories}
            className="inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13.5px] uppercase tracking-[0.05em] leading-none px-8 py-[18px] rounded-[200px] transition-all duration-300 shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] cursor-pointer"
          >
            Select Your Application
          </button>
          <button
            onClick={() => onPageChange('contact-us')}
            className="font-body font-semibold text-[14px] text-brand-600 dark:text-brand-400 hover:text-[#a80000] dark:hover:text-brand-300 underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
          >
            Talk to an Application Specialist
          </button>
        </div>
      </div>
    </div>
  );
}
