import { motion, useReducedMotion } from 'framer-motion';
import applications from '../../data/applications';
import { EASE_PREMIUM, DURATION, STAGGER } from '../../utils/motionTokens';

// Section 5 — recommended applications (brief §5). Distinct from the visual
// ApplicationGallery above it: these cards carry real per-application facts
// rather than photography.
//
// "Why it fits" and "functional result" both come straight from the
// product's own `applicationsData` entry (no new copy). "Recommended
// variant" is derived by finding which of this product's real variants
// lists that application by name in its own `applications` field — never
// an invented pairing. "Related application guide" only links out when the
// application is one of the 4 real guide pages in data/applications.js
// (matched by name, case-insensitive substring both ways since e.g. gallery
// says "Mayonnaise" and the guide says "Mayonnaise & Salad Dressing"); the
// other application names used across product galleries (Omelette,
// Quiches, Ice Cream, Cosmetics, etc.) have no guide page yet, so that
// button is simply omitted for them rather than linking somewhere fake.
// Matches on individual significant words (stripped of trailing "s" so
// "Dressings" matches a guide titled "...Salad Dressing") rather than a
// single substring check, which missed real matches on plurals (e.g.
// "Dressings" vs "Mayonnaise & Salad Dressing").
function significantWords(str) {
  return str
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((w) => w.length > 2)
    .map((w) => (w.endsWith('s') ? w.slice(0, -1) : w));
}

function findGuide(appName) {
  const appWords = significantWords(appName);
  return applications.find((a) => {
    const titleWords = significantWords(a.title);
    return appWords.some((w) => titleWords.includes(w));
  }) ?? null;
}

// Returns every real variant whose own `applications` text names this
// application — not just the first match. A single application (e.g.
// "Cakes") genuinely appears across several real variants' applications
// fields, so showing only one was silently dropping real, equally valid
// recommendations.
function findRecommendedVariants(appName, variantsData) {
  const lower = appName.toLowerCase();
  return variantsData.filter((v) => v.applications?.toLowerCase().includes(lower));
}

export default function RecommendedApplications({ applicationsData, variantsData, displayCode, onPageChange }) {
  const reduceMotion = useReducedMotion();
  const cards = applicationsData.map((app) => ({
    ...app,
    guide: findGuide(app.name),
    recommendedVariants: findRecommendedVariants(app.name, variantsData),
  }));

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 max-w-2xl">
        <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
          <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
          Recommended For
        </span>
        <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white m-0 tracking-tight leading-[1.1]">
          Recommended Applications
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : STAGGER } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {cards.map((card) => (
          <motion.div
            key={card.name}
            variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: DURATION.cardHover, ease: EASE_PREMIUM }}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            className="flex flex-col gap-4 rounded-[22px] border border-surface-200/60 dark:border-surface-800 bg-white dark:bg-surface-900/40 px-6 py-7 transition-colors duration-300 hover:border-gold-500/40"
          >
            <h3 className="font-heading font-bold text-[18px] text-heading dark:text-white m-0">
              {card.name}
            </h3>

            <div className="flex flex-col gap-1">
              <span className="font-body text-[11px] font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500">
                Why It Fits
              </span>
              <p className="font-body text-[14px] text-surface-600 dark:text-surface-300 leading-[1.65] m-0">
                {card.description}
              </p>
            </div>

            {card.recommendedVariants.length > 0 && (
              <div className="flex flex-col gap-1.5 pt-3 border-t border-surface-200/60 dark:border-surface-800">
                <span className="font-body text-[11px] font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500">
                  {card.recommendedVariants.length > 1 ? 'Recommended Variants' : 'Recommended Variant'}
                </span>
                <div className="flex flex-col gap-1">
                  {card.recommendedVariants.map((variant) => (
                    <span key={variant.code} className="font-mono text-[12px] font-bold text-brand-600 dark:text-brand-400">
                      {displayCode(variant.code)} — {variant.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {card.guide && (
              <button
                onClick={() => onPageChange(card.guide.page)}
                className="group/link mt-auto self-start inline-flex items-center gap-1.5 font-body font-bold text-[12.5px] uppercase tracking-[0.05em] text-brand-600 dark:text-brand-400 hover:text-[#a80000] cursor-pointer bg-transparent border-none p-0"
              >
                View {card.guide.title} Application
                <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </button>
            )}
          </motion.div>
        ))}
      </motion.div>

      <button
        onClick={() => onPageChange('applications')}
        className="self-start font-body font-bold text-[13px] uppercase tracking-[0.05em] text-brand-600 dark:text-brand-400 hover:text-[#a80000] underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
      >
        View All Applications
      </button>
    </div>
  );
}
