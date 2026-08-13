// Shared closing CTA band — soft red-tinted surface with an eyebrow, heading,
// and one or more actions. Used by product detail pages and application
// landing pages, which previously duplicated this section byte-for-byte.
export default function EnquiryCTABand({ eyebrow, heading, actions }) {
  return (
    <section className="w-full bg-[#fdf1f0] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[900px] w-full px-5 sm:px-8 lg:px-12 flex flex-col items-center text-center gap-5">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-heading m-0 tracking-tight leading-[1.15]">
          {heading}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-2">
          {actions.map((action) =>
            action.variant === 'link' ? (
              <button
                key={action.label}
                onClick={action.onClick}
                className="font-body font-semibold text-[14px] text-brand-600 hover:text-[#a80000] underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
              >
                {action.label}
              </button>
            ) : (
              <button
                key={action.label}
                onClick={action.onClick}
                className="mt-2 inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-8 py-[17px] rounded-[200px] transition-all duration-300 shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] cursor-pointer"
              >
                {action.label}
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
