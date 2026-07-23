import formulationChallenges from '../../../data/formulationChallenges';
import { getProductById } from '../../../data/products';

// Section 2 — common formulation challenges, scoped to this application
// (brief §2). Relevance is gated by the application's own curated
// `relevantChallengeIds` (data/applications.js) — NOT simply "shares a
// matched product with this challenge". A pure product-overlap check was
// tried first and produced a real bug: Bakery's matched products are also
// matched to "Strengthen Gel Or Binding" for their unrelated use in
// surimi/sausages, so a meat-processing description was appearing on the
// bakery page. relevantChallengeIds scopes each application to only the
// challenges its own real problem/intro copy actually describes.
//
// "Cost-in-use" from the brief is omitted entirely: no pricing or
// cost-efficiency claim exists anywhere in the codebase to support it.
//
// "See SKM Solution" routes to a matched product's own page that's also
// listed under this challenge — still a real shared-product link, just no
// longer the sole relevance gate.
export default function ApplicationFormulationChallenges({ application, onPageChange }) {
  const relevantChallenges = formulationChallenges
    .map((challenge) => {
      if (!application.relevantChallengeIds?.includes(challenge.id)) return false;
      const sharedProductIds = challenge.matchedProductIds.filter((id) =>
        application.matchedProductIds.includes(id)
      );
      return sharedProductIds.length > 0 && { ...challenge, sharedProductIds };
    })
    .filter(Boolean);

  if (relevantChallenges.length === 0) return null;

  return (
    <div className="w-full bg-[#f8f4ee] dark:bg-surface-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            Formulation Challenges
          </span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white m-0 tracking-tight leading-[1.1]">
            Common Challenges In {application.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {relevantChallenges.map((challenge) => {
            const solutionProduct = getProductById(challenge.sharedProductIds[0]);
            return (
              <div
                key={challenge.id}
                className="flex flex-col gap-3 rounded-[22px] border border-surface-200/60 dark:border-surface-800 bg-white dark:bg-surface-900/40 px-6 py-7"
              >
                <h3 className="font-heading font-bold text-[16px] text-heading dark:text-white m-0">
                  {challenge.label}
                </h3>
                <p className="font-body text-[14px] text-surface-600 dark:text-surface-300 leading-[1.6] m-0">
                  {challenge.description}
                </p>
                {solutionProduct && (
                  <button
                    onClick={() => onPageChange(solutionProduct.page)}
                    className="mt-1 self-start inline-flex items-center gap-1.5 font-body font-bold text-[12px] uppercase tracking-[0.05em] text-brand-600 dark:text-brand-400 hover:text-[#a80000] cursor-pointer bg-transparent border-none p-0"
                  >
                    See SKM Solution
                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
