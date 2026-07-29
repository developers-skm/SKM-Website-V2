import { motion, useReducedMotion } from 'framer-motion';
import certifications from '../../data/certifications';
import { EASE_PREMIUM, DURATION, STAGGER } from '../../utils/motionTokens';

// Section 2 — at-a-glance specification panel (brief §2). Every field here
// is derived from real per-product data already in the codebase (variant
// `specifications`, products.js `packagingOptions`, the shared certification
// set) or passed in explicitly by the page. Fields with no real source
// (shelf life, minimum order quantity) are omitted entirely rather than
// filled with placeholder values — see feedback-skm-design-rules memory.
//
// `storage` and `protein` are derived from variantsData so each product
// page doesn't need to hand-restate what's already true in its own variant
// table; if variants disagree (e.g. both chilled and frozen SKUs exist),
// all distinct values found are shown rather than one being invented.
function collectDistinct(variantsData, key) {
  const values = new Set();
  for (const v of variantsData) {
    const raw = v.specifications?.[key];
    if (raw) values.add(raw);
  }
  return Array.from(values);
}

// Primary functionality — derived from each variant's own `character` spec
// field (e.g. "Standard Emulsifying & Color Agent", "Gel Strength: > 1300
// g/cm²"), same source already used for the hero's benefit tags. Falls back
// to `functionality` prop only if the page explicitly passes one; otherwise
// this field is simply omitted rather than invented.
function deriveFunctionalitySummary(variantsData) {
  const values = new Set();
  for (const v of variantsData) {
    const raw = v.specifications?.character;
    if (raw) values.add(raw.split(':')[0].trim());
  }
  return Array.from(values).slice(0, 3).join(', ') || null;
}

// Collapses per-variant "Min 45.0%" style values to a single min-max range
// (e.g. "41.0% - 52.0%") instead of listing every distinct variant value —
// still fully derived from real data, just presented as one usable fact.
function proteinRange(variantsData) {
  const floors = variantsData
    .map((v) => v.specifications?.protein)
    .filter(Boolean)
    .map((raw) => parseFloat(raw.replace(/[^\d.]/g, '')))
    .filter((n) => !Number.isNaN(n));
  if (floors.length === 0) return null;
  const min = Math.min(...floors);
  const max = Math.max(...floors);
  return min === max ? `Min ${min.toFixed(1)}%` : `${min.toFixed(1)}% - ${max.toFixed(1)}% (min, by variant)`;
}

export default function SpecPanel({
  productForm,
  functionality,
  packagingOptions,
  variantsData,
  onAskTechnicalQuestion,
  tdsUrl,
}) {
  const reduceMotion = useReducedMotion();
  const storageValues = collectDistinct(variantsData, 'storage');
  const protein = proteinRange(variantsData);
  const functionalitySummary = functionality ?? deriveFunctionalitySummary(variantsData);

  const facts = [
    { label: 'Product Form', value: productForm },
    protein && { label: 'Protein Content', value: protein },
    functionalitySummary && { label: 'Primary Functionality', value: functionalitySummary },
    packagingOptions?.length > 0 && { label: 'Packaging', value: packagingOptions.join(', ') },
    storageValues.length > 0 && {
      label: storageValues.length > 1 ? 'Storage (Varies By Variant)' : 'Storage',
      value: storageValues.join(' / '),
    },
    
  ].filter(Boolean);

  if (facts.length === 0) return null;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 max-w-2xl">
         <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
          <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
          At A Glance
        </span>
        <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white m-0 tracking-tight leading-[1.1]">
          Specification Summary
        </h2>
      </div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: DURATION.sectionEntrance, ease: EASE_PREMIUM }}
        className="rounded-[32px] border border-surface-200/60 dark:border-surface-800 bg-white dark:bg-surface-900/40 px-6 sm:px-12 lg:px-16 py-10 sm:py-14 flex flex-col gap-9 shadow-[0_20px_60px_rgba(36,30,24,0.06)]"
      >
        <motion.dl
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : STAGGER } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7 m-0"
        >
          {facts.map(({ label, value }) => (
            <motion.div
              key={label}
              variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: DURATION.cardHover, ease: EASE_PREMIUM }}
              className="flex flex-col gap-1.5 border-t border-surface-200/70 dark:border-surface-800 pt-4 px-2 -mx-2 rounded-lg transition-colors duration-200 hover:bg-gold-500/[0.06] dark:hover:bg-gold-500/[0.05]"
            >
              <dt className="font-body text-[11.5px] font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500">
                {label}
              </dt>
              <dd className="font-heading font-bold text-[17px] text-heading dark:text-white leading-snug m-0">
                {value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
          {tdsUrl && (
            <a
              href={tdsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-8 py-[17px] rounded-[200px] transition-all duration-300 shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] cursor-pointer"
            >
              Download Full Specification
            </a>
          )}
          <button
            onClick={onAskTechnicalQuestion}
            className="font-body font-semibold text-[13.5px] text-brand-600 dark:text-brand-400 hover:text-[#a80000] dark:hover:text-brand-300 underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
          >
            Ask a Technical Question
          </button>
        </div>
      </motion.div>
    </div>
  );
}
