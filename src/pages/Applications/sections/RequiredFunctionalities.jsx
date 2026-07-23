import formulationChallenges from '../../../data/formulationChallenges';

// Section 3 — required egg functionalities (brief §3). Draws from the same
// real dataset used in Section 2, gated by the application's own curated
// `relevantChallengeIds` (data/applications.js) rather than a raw
// shared-product overlap — the overlap-only version showed surimi/binding
// functions on the bakery page because bakery's matched products are also
// (separately) matched to gelling for their unrelated meat-processing use.
// There's no separate "functionality" dataset in the codebase distinct
// from formulationChallenges — deliberately presented as a tight
// explanatory list rather than repeating Section 2's full challenge cards,
// so it reads as a compact "why this matters" summary instead of a
// duplicate section.
//
// "View Functional Solutions" scrolls to Section 4 (the real recommended
// products), the concrete destination for "solutions."
export default function RequiredFunctionalities({ application }) {
  const relevantFunctions = formulationChallenges.filter((challenge) =>
    application.relevantChallengeIds?.includes(challenge.id)
  );

  if (relevantFunctions.length === 0) return null;

  const scrollToProducts = () => {
    document.getElementById('recommended-products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full bg-white dark:bg-surface-900/40 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[900px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            Egg Functionality
          </span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white m-0 tracking-tight leading-[1.1]">
            Why These Functions Matter Here
          </h2>
        </div>

        <dl className="flex flex-col gap-0 m-0">
          {relevantFunctions.map((fn) => (
            <div key={fn.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-6 py-5 border-t border-surface-200/70 dark:border-surface-800 last:border-b">
              <dt className="font-heading font-bold text-[15.5px] text-heading dark:text-white flex-shrink-0 sm:w-[220px]">
                {fn.label}
              </dt>
              <dd className="font-body text-[14.5px] text-surface-600 dark:text-surface-300 leading-[1.65] m-0">
                {fn.description}
              </dd>
            </div>
          ))}
        </dl>

        <button
          onClick={scrollToProducts}
          className="self-start inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-8 py-[17px] rounded-[200px] transition-all duration-300 shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] cursor-pointer"
        >
          View Functional Solutions
        </button>
      </div>
    </div>
  );
}
