// Section 8 — final CTA (brief §8). Both buttons route to the two real
// conversion flows used throughout the site: "Request Technical
// Consultation" to the real Contact Us page, "Request a Sample" to the real
// Get Quote flow pre-filled with this application (same `applicationId`
// prefill already used by the page's earlier single CTA).
export default function ApplicationFinalCTA({ application, onPageChange }) {
  return (
    <section className="w-full bg-[#fdf1f0] dark:bg-brand-950/20 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[900px] w-full px-5 sm:px-8 lg:px-12 flex flex-col items-center text-center gap-5">
        <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
          <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
          {application.title}
        </span>
        <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-heading dark:text-white m-0 tracking-tight leading-[1.15] max-w-[24ch]">
          Share Your Target Formulation With Our Team
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-2">
          <button
            onClick={() => onPageChange('contact-us')}
            className="inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-8 py-[17px] rounded-[200px] transition-all duration-300 shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] cursor-pointer"
          >
            Request Technical Consultation
          </button>
          <button
            onClick={() => onPageChange('get-quote', { applicationId: application.id })}
            className="font-body font-semibold text-[14px] text-brand-600 dark:text-brand-400 hover:text-[#a80000] dark:hover:text-brand-300 underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
          >
            Request a Sample
          </button>
        </div>
      </div>
    </section>
  );
}
