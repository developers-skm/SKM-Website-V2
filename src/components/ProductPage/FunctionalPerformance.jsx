// Section 4 — functional performance (brief §4). No numeric performance-test
// data (whip volume scores, gel-strength charts, etc.) exists as structured
// data anywhere in the codebase — only free text embedded in specific
// variants' `character`/`benefits`/`description` fields (e.g. "Gel Strength:
// 1000-1100 g/cm²" on one Egg Albumen Powder SKU). Rather than fabricate a
// chart or score, each trait below is evidenced with the real variant quote
// it's drawn from, and traits with no real textual evidence for a given
// product are omitted rather than invented — see feedback-skm-design-rules
// memory (content is frozen; no placeholder claims).
const TRAITS = [
  { key: 'whipping', label: 'Whipping', keywords: ['whip', 'foam', 'aerat', 'volume increase', 'meringue'] },
  { key: 'emulsification', label: 'Emulsification', keywords: ['emulsif', 'oil-water', 'oil and water', 'splitting'] },
  { key: 'gelling', label: 'Gelling', keywords: ['gel ', 'gelation', 'coagulat', 'gel strength'] },
  { key: 'binding', label: 'Binding', keywords: ['bind', 'sliceab', 'moisture retention', 'water-retain', 'water retention'] },
  { key: 'texture', label: 'Texture', keywords: ['texture', 'crumb', 'mouthfeel', 'chewiness', 'firmness', 'viscosity'] },
  { key: 'colour', label: 'Colour', keywords: ['colour', 'color', 'golden', 'yellow', 'carotene'] },
  { key: 'protein', label: 'Protein Enrichment', keywords: ['protein', 'amino acid', 'biological value'] },
];

// Scores each variant's evidence rather than taking the first substring hit
// — a keyword landing in the short, purpose-built `name`/`character` fields
// (e.g. "High Whip", "Gel Strength") is much stronger proof of that trait
// than the same word appearing incidentally inside a longer description
// sentence (e.g. "protein" turning up in an unrelated gel-strength variant's
// prose). The variant with the highest score for a trait is used as its
// evidence; ties keep catalogue order.
function scoreField(field, keywords, weight) {
  if (!field) return 0;
  const lower = field.toLowerCase();
  const hits = keywords.filter((k) => lower.includes(k)).length;
  return hits * weight;
}

function findEvidence(variantsData, keywords, usedCodes) {
  let best = null;
  for (const v of variantsData) {
    if (usedCodes.has(v.code)) continue;
    const score =
      scoreField(v.name, keywords, 3) +
      scoreField(v.specifications?.character, keywords, 3) +
      scoreField(v.specifications?.color, keywords, 3) +
      scoreField(v.benefits, keywords, 1) +
      scoreField(v.description, keywords, 1);
    if (score === 0) continue;
    if (!best || score > best.score) {
      const quote = v.benefits ?? v.description ?? v.specifications?.character ?? v.specifications?.color;
      best = { score, quote, variantName: v.name, variantCode: v.code };
    }
  }
  return best;
}

export default function FunctionalPerformance({ variantsData, productName, onDiscussPerformance, tdsUrl }) {
  // Each variant can only be used as evidence once — otherwise two traits
  // that both happen to score highest on the same SKU (e.g. a high-gel
  // variant whose benefits mention both "sliceability" and "gel strength")
  // would show the exact same quote twice, reading as a copy-paste bug.
  const usedCodes = new Set();
  const traitsWithEvidence = TRAITS
    .map((trait) => {
      const evidence = findEvidence(variantsData, trait.keywords, usedCodes);
      if (evidence) usedCodes.add(evidence.variantCode);
      return evidence && { ...trait, ...evidence };
    })
    .filter(Boolean);

  if (traitsWithEvidence.length === 0) return null;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 max-w-2xl">
        <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
          <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
          Functional Performance
        </span>
        <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white m-0 tracking-tight leading-[1.1]">
          How {productName} Performs
        </h2>
        <p className="font-body text-[17px] text-surface-600 dark:text-surface-400 leading-[1.7] m-0">
          Functional behaviour evidenced across the variant range, drawn directly from each SKU's own specification.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {traitsWithEvidence.map((trait) => (
          <div
            key={trait.key}
            className="flex flex-col gap-3 rounded-[22px] border border-surface-200/60 dark:border-surface-800 bg-white dark:bg-surface-900/40 px-6 py-7"
          >
            <span className="font-heading font-bold text-[16px] text-heading dark:text-white">
              {trait.label}
            </span>
            <p className="font-body text-[14.5px] text-surface-600 dark:text-surface-300 leading-[1.7] m-0">
              {trait.quote}
            </p>
            <span className="font-mono text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mt-1">
              {trait.variantCode} — {trait.variantName}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          onClick={onDiscussPerformance}
          className="self-start inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-8 py-[17px] rounded-[200px] transition-all duration-300 shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] cursor-pointer"
        >
          Discuss Performance Requirements
        </button>
        {tdsUrl && (
          <a
            href={tdsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-semibold text-[13.5px] text-brand-600 dark:text-brand-400 hover:text-[#a80000] dark:hover:text-brand-300 underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200"
          >
            Download Functional Guide
          </a>
        )}
      </div>
    </div>
  );
}
