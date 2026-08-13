import { motion, useReducedMotion } from 'framer-motion';
import { getVariantsForProduct } from '../../../data/productVariants';
import { EASE_PREMIUM, DURATION, STAGGER, fadeUp } from '../../../utils/motionTokens';

const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

// Section 6 — processing and usage guidance (brief §6). Only 2 of the 5
// brief items have real supporting data anywhere in the codebase:
// Storage (variant `specifications.storage`, already used across the
// product page work) and Processing Tolerance (heat-stability/thermal
// language genuinely present in some variants' `benefits`/`character`
// text, e.g. "resists thermal breakdown", "Heat-Emulsifying Stability").
// Reconstitution ratios, addition points, and mixing instructions don't
// exist anywhere in the codebase — inventing them would mean fabricating
// real technical process specs for a real client's products, so they're
// omitted entirely rather than guessed at.
//
// Tolerance evidence is scanned only from each product's own application-
// relevant variant (same `findRecommendedVariant` match used in Sections
// 4/5), not every variant of every matched product — scanning all variants
// produced a real bug where a meat/surimi-processing quote (from an
// Egg Albumen Powder gel-strength SKU) appeared on the Bakery page, since
// that product is also matched to Bakery for unrelated reasons (whipping,
// colour). Deliberately narrow keyword list: "pasteuriz(ed)" was tried and
// dropped — it's a universal boilerplate descriptor on nearly every
// variant's base description, not a genuine processing-tolerance claim.
const TOLERANCE_KEYWORDS = ['heat-stable', 'heat stable', 'thermal', 'retort', 'hot-fill', 'hot fill', 'high-shear', 'high shear'];

function collectDistinct(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function findRecommendedVariant(application, variantsData) {
  const needles = [application.title, ...application.tags].map((s) => s.toLowerCase());
  return (
    variantsData.find((v) => {
      const haystack = v.applications?.toLowerCase() ?? '';
      return needles.some((n) => haystack.includes(n));
    }) ?? variantsData[0] ?? null
  );
}

export default function ProcessingGuidance({ application, matchedProducts, onDownloadGuide, onContactSupport }) {
  const reduceMotion = useReducedMotion();
  const relevantVariants = matchedProducts
    .map((p) => findRecommendedVariant(application, getVariantsForProduct(p.id)))
    .filter(Boolean);

  const storageValues = collectDistinct(relevantVariants.map((v) => v.specifications?.storage));

  const toleranceEvidence = relevantVariants
    .filter((v) => {
      const text = [v.benefits, v.description, v.specifications?.character, v.specifications?.color]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return TOLERANCE_KEYWORDS.some((k) => text.includes(k));
    })
    .slice(0, 2);

  const facts = [
    storageValues.length > 0 && {
      label: 'Storage',
      value: storageValues.join(' / '),
    },
  ].filter(Boolean);

  if (facts.length === 0 && toleranceEvidence.length === 0) return null;

  return (
    <div className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1000px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <motion.div {...fadeUp(reduceMotion)} className="flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            Processing Guidance
          </span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading m-0 tracking-tight leading-[1.1]">
            Processing &amp; Usage Guidance
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : STAGGER } } }}
        >
          {facts.map(({ label, value }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              transition={{ duration: reduceMotion ? 0.01 : DURATION.functional, ease: EASE_PREMIUM }}
              className="flex flex-col gap-2 rounded-[20px] border border-surface-200/60 px-6 py-6"
            >
              <span className="font-body text-[11.5px] font-bold uppercase tracking-wider text-surface-400">
                {label}
              </span>
              <p className="font-heading font-bold text-[16px] text-heading m-0">
                {value}
              </p>
            </motion.div>
          ))}

          {toleranceEvidence.length > 0 && (
            <motion.div
              variants={itemVariants}
              transition={{ duration: reduceMotion ? 0.01 : DURATION.functional, ease: EASE_PREMIUM }}
              className="flex flex-col gap-2 rounded-[20px] border border-surface-200/60 px-6 py-6 sm:col-span-2"
            >
              <span className="font-body text-[11.5px] font-bold uppercase tracking-wider text-surface-400">
                Processing Tolerance
              </span>
              <ul className="flex flex-col gap-2 m-0 pl-4">
                {toleranceEvidence.map((v) => (
                  <li key={v.code} className="font-body text-[14px] text-surface-600 leading-[1.6]">
                    <span className="font-mono text-[11.5px] font-bold text-brand-600 mr-2">{v.code}</span>
                    {v.benefits ?? v.description}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            onClick={onDownloadGuide}
            className="self-start inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-8 py-[17px] rounded-[200px] transition-all duration-200 shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Download Application Guide
          </button>
          <button
            onClick={onContactSupport}
            className="font-body font-semibold text-[13.5px] text-brand-600 hover:text-[#a80000] underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
          >
            Contact Technical Support
          </button>
        </div>
      </div>
    </div>
  );
}
