// Section 5 — technical support (brief §5). Both buttons route to the two
// real conversion flows already used throughout the site: "Discuss Your
// Formulation" to the real Contact Us page, "Request Trial Sample" to the
// real Get Quote flow (its own Step 1 already asks which product and
// application — the same flow every other "Request Sample" CTA in the app
// uses). The 3 stage labels describe the real, already-existing path a
// visitor can take on this site (browse/select on this page → request a
// sample or quote → reach commercial supply via that same enquiry) rather
// than a fabricated formal "trial program" that doesn't exist.
const stages = [
  {
    step: '01',
    label: 'Product Selection',
    description: "Browse by application or formulation challenge on this page, or explore the full product range to find the right ingredient for your recipe.",
  },
  {
    step: '02',
    label: 'Samples & Trials',
    description: 'Request a sample through our guided quote flow — tell us your product, application, and destination, and our export sales team follows up directly.',
  },
  {
    step: '03',
    label: 'Commercial Supply',
    description: 'Once a formulation is validated, the same enquiry moves into a commercial quote — packaging, quantity, and destination confirmed with our team.',
  },
];

export default function TechnicalSupport({ onDiscussFormulation, onRequestTrial }) {
  return (
    <div className="w-full bg-[#fdf1f0] dark:bg-brand-950/20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1000px] w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-10">
        <div className="flex flex-col items-center gap-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            Technical Support
          </span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white m-0 tracking-tight leading-[1.1]">
            From Product Selection To Commercial Supply
          </h2>
          <p className="font-body text-[17px] text-surface-600 dark:text-surface-400 leading-[1.7] m-0">
            Support doesn't stop at picking a product — our team stays involved through sampling, trials, and into full commercial supply.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
          {stages.map((stage) => (
            <div key={stage.step} className="flex flex-col gap-2 rounded-[20px] bg-white/70 dark:bg-surface-900/40 border border-surface-200/60 dark:border-surface-800 px-6 py-7">
              <span className="font-mono text-[12px] font-bold text-brand-600 dark:text-brand-400">
                {stage.step}
              </span>
              <span className="font-heading font-bold text-[16px] text-heading dark:text-white">
                {stage.label}
              </span>
              <p className="font-body text-[13.5px] text-surface-600 dark:text-surface-300 leading-[1.6] m-0">
                {stage.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <button
            onClick={onDiscussFormulation}
            className="inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13.5px] uppercase tracking-[0.05em] leading-none px-8 py-[18px] rounded-[200px] transition-all duration-300 shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] cursor-pointer"
          >
            Discuss Your Formulation
          </button>
          <button
            onClick={onRequestTrial}
            className="font-body font-semibold text-[14px] text-brand-600 dark:text-brand-400 hover:text-[#a80000] dark:hover:text-brand-300 underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
          >
            Request Trial Sample
          </button>
        </div>
      </div>
    </div>
  );
}
