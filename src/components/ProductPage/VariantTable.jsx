import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Section 3 — searchable, filterable comparison table (brief §3).
//
// Filters are derived, not hand-authored per product: each filter tests a
// variant's own real text (name/character/storage) against a verified
// pattern, so a filter only ever appears when at least one real variant in
// this product's own variantsData genuinely matches it. No filter option is
// ever shown that has zero real matches, and no variant is ever tagged with
// a trait its own text doesn't contain — the same "audit before build"
// discipline used for the category pages' functionality tags.
//
// Six axes requested: Function, Processing treatment, Salt or sugar level,
// Colour, Packaging, Chilled or frozen.
// - "Chilled or frozen" reads the real `specifications.storage` field
//   directly (present on liquid products only — powders have no storage
//   field, so this filter naturally produces zero options there).
// - "Salt or sugar level" and "Colour" match real substrings that
//   consistently appear in variant `name`/`character` text across the
//   codebase (e.g. "11% Salt", "4% Sugar", "High Colour", "Sucrose") —
//   verified present, not inferred.
// - "Function" and "Processing treatment" match real recurring
//   character/name phrases (Emulsifying, Gelling, Whipping, Binding /
//   Heat-Stable, Free Flow, Hydrolysed, De-Sugared) — same verification.
// - "Packaging" reads the real per-product `packagingOptions` (products.js)
//   since packaging isn't a per-variant field; identical for every row of
//   a given product, included because the brief asks for it as an axis.
//
// Columns are derived from whichever `specifications` keys the product
// actually uses (varies per product) rather than a fixed schema, so no
// column is ever fabricated for a product that lacks that data.
const FUNCTION_PATTERNS = [
  { label: 'Emulsification', re: /emulsif/i },
  { label: 'Gelling', re: /gel(ling|\s|-)/i },
  { label: 'Whipping', re: /whip/i },
  { label: 'Binding', re: /bind/i },
  { label: 'Flow', re: /free.?flow/i },
];

const TREATMENT_PATTERNS = [
  { label: 'Heat-Stable', re: /heat.?stable/i },
  { label: 'Stabilized', re: /stabili[sz]ed/i },
  { label: 'De-Sugared', re: /de.?sugared/i },
  { label: 'Hydrolysed', re: /hydrolys/i },
  { label: 'Enriched', re: /enrich/i },
];

const SALT_SUGAR_PATTERNS = [
  { label: 'Salted', re: /salt/i },
  { label: 'Sugared', re: /sugar|sucrose/i },
];

const COLOUR_PATTERNS = [
  { label: 'High Colour', re: /high.?colo[u]?r/i },
  { label: 'Standard Colour', re: /standard.*colo[u]?r/i },
];

function matchesAny(text, patterns) {
  return patterns.filter((p) => p.re.test(text));
}

function buildFilterGroup(variantsData, patterns, getText) {
  const optionMatches = new Map();
  variantsData.forEach((v) => {
    const text = getText(v);
    matchesAny(text, patterns).forEach((p) => {
      if (!optionMatches.has(p.label)) optionMatches.set(p.label, new Set());
      optionMatches.get(p.label).add(v.code);
    });
  });
  return Array.from(optionMatches.entries()).map(([label, codes]) => ({ label, codes }));
}

export default function VariantTable({ variantsData, displayCode, packagingOptions, selectedCode, onSelectVariant, onCompare }) {
  const [query, setQuery] = useState('');
  // Starts with the initially-selected variant already checked, so the
  // "Selected" row and its checkbox agree from first render — not just
  // after a later click (see handleSelectVariant below for the same sync
  // on every subsequent selection).
  const [checked, setChecked] = useState(() => (selectedCode ? [selectedCode] : []));
  const [activeFilters, setActiveFilters] = useState([]);
  const [hasScrolled, setHasScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  const specColumns = useMemo(() => {
    const keys = new Set();
    variantsData.forEach((v) => Object.keys(v.specifications ?? {}).forEach((k) => keys.add(k)));
    return Array.from(keys);
  }, [variantsData]);

  const variantText = (v) => [v.name, v.specifications?.character, v.specifications?.color].filter(Boolean).join(' ');

  const filterGroups = useMemo(() => {
    const groups = [
      { axis: 'Function', options: buildFilterGroup(variantsData, FUNCTION_PATTERNS, variantText) },
      { axis: 'Processing treatment', options: buildFilterGroup(variantsData, TREATMENT_PATTERNS, variantText) },
      { axis: 'Salt or sugar level', options: buildFilterGroup(variantsData, SALT_SUGAR_PATTERNS, variantText) },
      { axis: 'Colour', options: buildFilterGroup(variantsData, COLOUR_PATTERNS, variantText) },
      {
        axis: 'Chilled or frozen',
        options: buildFilterGroup(
          variantsData,
          [{ label: 'Chilled', re: /chilled/i }, { label: 'Frozen', re: /frozen/i }],
          (v) => v.specifications?.storage ?? ''
        ),
      },
    ];
    if (packagingOptions?.length > 0) {
      groups.push({
        axis: 'Packaging',
        options: packagingOptions.map((label) => ({ label, codes: new Set(variantsData.map((v) => v.code)) })),
      });
    }
    return groups.filter((g) => g.options.length > 0);
  }, [variantsData, packagingOptions]);

  const toggleFilter = (label) => {
    setActiveFilters((prev) => (prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]));
  };

  const activeFilterCodeSets = useMemo(() => {
    return activeFilters.map((label) => {
      for (const group of filterGroups) {
        const match = group.options.find((o) => o.label === label);
        if (match) return match.codes;
      }
      return new Set();
    });
  }, [activeFilters, filterGroups]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return variantsData.filter((v) => {
      if (q) {
        const haystack = [v.code, v.name, v.description, v.applications, v.benefits]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return activeFilterCodeSets.every((codes) => codes.has(v.code));
    });
  }, [variantsData, query, activeFilterCodeSets]);

  const toggleChecked = (code) => {
    setChecked((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
  };

  // Selecting a variant as the active one (shown in the detail panel below)
  // also adds it to the comparison checkboxes if not already checked — so
  // the "Selected" row and its checkbox never visibly disagree the way they
  // did before (a variant could show "Selected" with an unchecked box, or
  // vice versa, since the two were entirely independent state). Unchecking
  // a box, or checking a different row for comparison, still works
  // independently and does not change which variant is "Selected".
  const handleSelectVariant = (code) => {
    onSelectVariant(code);
    setChecked((prev) => (prev.includes(code) ? prev : [...prev, code]));
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Search */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[240px] max-w-[420px]">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search variants by code, name, or application…"
            aria-label="Search variants"
            className="w-full min-h-[44px] pl-11 pr-4 py-3 rounded-full border border-surface-200 bg-white font-body text-[14px] text-heading placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Filters — only axes with at least one real matching variant render */}
      {filterGroups.length > 0 && (
        <div className="flex flex-col gap-3">
          {filterGroups.map((group) => (
            <div key={group.axis} className="flex flex-wrap items-center gap-2">
              <span className="font-body text-[11.5px] font-semibold uppercase tracking-wide text-surface-400 mr-1 whitespace-nowrap">
                {group.axis}
              </span>
              {group.options.map((opt) => {
                const active = activeFilters.includes(opt.label);
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => toggleFilter(opt.label)}
                    aria-pressed={active}
                    className={`inline-flex items-center min-h-[32px] px-3.5 py-1.5 rounded-full border font-body font-semibold text-[12.5px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                      active
                        ? 'bg-brand-600 border-brand-600 text-white'
                        : 'bg-white border-surface-300 text-surface-600 hover:border-brand-600/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          ))}
          {activeFilters.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveFilters([])}
              className="self-start font-body font-semibold text-[13px] text-brand-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm w-fit"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Table.
          Scroll container: the div directly wrapping <table> is the ONLY
          scrolling ancestor (vertical via max-height + overflow-y, plus
          horizontal via overflow-x for small screens). Nothing between this
          div and <body> uses overflow:hidden, so position:sticky on the
          <thead> resolves against this div and pins at literal top:0 —
          not an offset guess against the site navbar.
          Rounded card: the border-radius + border live on this same
          scroll div (overflow-y:auto still lets sticky work — only
          overflow:hidden on an ANCESTOR breaks sticky, overflow:auto on the
          sticky element's own direct scroll container is required and fine).
          Column widths/alignment: unchanged from the original table — same
          <th>/<td> classes, same text-left / w-12 rules, only the sticky
          plumbing and background were added. */}
      <div className="relative">
        <div
          onScroll={(e) => {
            if (!hasScrolled && e.currentTarget.scrollLeft > 12) setHasScrolled(true);
          }}
          className="rounded-[24px] border border-surface-200/60 overflow-y-auto overflow-x-auto"
          style={{ maxHeight: '70vh' }}
        >
        <table className="w-full border-separate border-spacing-0 min-w-[720px]">
          <thead>
            {/* Sticky is applied per-<th>, not on <tr>/<thead> — <tr> is not
                a reliable position:sticky context across browsers (Safari
                in particular). Each <th> gets its own position:sticky;
                top:0; z-index:10 plus a solid background so scrolling rows
                never show through the gaps between cells. The checkbox +
                Code columns are additionally pinned horizontally
                (left:0/left:48px) so the row identifier stays visible while
                scrolling right through the spec columns on mobile — same
                dual-axis sticky corner as VariantTable's own vertical
                pattern, just extended to the left edge too. */}
            <tr className="border-b border-surface-200/70 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
              <th
                className="w-12 px-4 py-4 bg-surface-100"
                aria-label="Select for comparison"
                style={{ position: 'sticky', top: 0, left: 0, zIndex: 20 }}
              />
              <th
                className="text-left px-4 py-4 font-body text-[11.5px] font-bold uppercase tracking-wider text-surface-500 bg-surface-100 shadow-[2px_0_6px_-2px_rgba(20,16,12,0.08)]"
                style={{ position: 'sticky', top: 0, left: 48, zIndex: 20 }}
              >
                Code
              </th>
              <th
                className="text-left px-4 py-4 font-body text-[11.5px] font-bold uppercase tracking-wider text-surface-500 bg-surface-100"
                style={{ position: 'sticky', top: 0, zIndex: 10 }}
              >
                Name
              </th>
              {specColumns.map((key) => (
                <th
                  key={key}
                  className="text-left px-4 py-4 font-body text-[11.5px] font-bold uppercase tracking-wider text-surface-500 whitespace-nowrap bg-surface-100"
                  style={{ position: 'sticky', top: 0, zIndex: 10 }}
                >
                  {key}
                </th>
              ))}
              <th
                className="px-4 py-4 bg-surface-100 text-right"
                style={{ position: 'sticky', top: 0, zIndex: 10 }}
              >
                {checked.length > 0 && (
                  <button
                    onClick={() => onCompare(checked)}
                    className="inline-flex items-center gap-2 min-h-[36px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[11.5px] uppercase tracking-[0.05em] px-4 py-2 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap"
                  >
                    Compare Selected Variants ({checked.length})
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((variant) => {
              const isSelected = variant.code === selectedCode;
              const isChecked = checked.includes(variant.code);
              // A row can be checked for comparison without being the
              // active "Selected" variant (multi-row compare) — this badge
              // makes that state readable on its own instead of leaving a
              // checked box next to a "Select This Variant" label that
              // looks like a bug (checkbox says one thing, button says
              // another).
              const showInComparisonBadge = isChecked && !isSelected;
              // Sticky cells paint over whatever sits behind them, so the
              // row's own hover/selected background must be carried
              // explicitly on the sticky cells too — the same requirement
              // as ApplicationProductMatrix's hoverRow handling.
              const rowBg = isSelected ? 'bg-brand-50' : 'bg-white group-hover/row:bg-surface-50';
              return (
                <tr
                  key={variant.code}
                  className={`group/row border-b border-surface-200/50 last:border-b-0 transition-colors ${isSelected ? 'bg-brand-50' : 'hover:bg-surface-50'}`}
                >
                  <td
                    className={`px-4 py-4 transition-colors duration-150 ${rowBg}`}
                    style={{ position: 'sticky', left: 0, zIndex: 10 }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleChecked(variant.code)}
                      aria-label={`Select ${variant.name} for comparison`}
                      className="w-4 h-4 accent-brand-600 cursor-pointer"
                    />
                  </td>
                  <td
                    className={`px-4 py-4 font-mono text-[12.5px] font-bold text-brand-600 whitespace-nowrap shadow-[2px_0_6px_-2px_rgba(20,16,12,0.08)] transition-colors duration-150 ${rowBg}`}
                    style={{ position: 'sticky', left: 48, zIndex: 10 }}
                  >
                    {displayCode(variant.code)}
                  </td>
                  <td className="px-4 py-4 font-heading font-semibold text-[14.5px] text-heading">
                    {variant.name}
                  </td>
                  {specColumns.map((key) => (
                    <td key={key} className="px-4 py-4 font-body text-[13px] text-surface-600 whitespace-nowrap">
                      {variant.specifications?.[key] ?? '—'}
                    </td>
                  ))}
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2 flex-wrap">
                      {showInComparisonBadge && (
                        <span className="inline-flex items-center min-h-[28px] font-body font-bold text-[10.5px] uppercase tracking-[0.04em] text-surface-500 bg-surface-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                          In Comparison
                        </span>
                      )}
                      <button
                        onClick={() => handleSelectVariant(variant.code)}
                        className="whitespace-nowrap inline-flex items-center min-h-[36px] font-body font-bold text-[12px] uppercase tracking-[0.04em] text-brand-600 hover:text-[#a80000] cursor-pointer bg-transparent border-none px-3 py-2 rounded-full hover:bg-brand-600/[0.06]"
                      >
                        {isSelected ? 'Selected' : 'Select This Variant'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={specColumns.length + 4} className="px-4 py-10 text-center font-body text-[14px] text-surface-400">
                  No variants match "{query}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>

        {/* Scroll-right hint — fades a gradient + bouncing arrow over the
            table's right edge until the user scrolls it. */}
        <AnimatePresence>
          {!hasScrolled && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.3 }}
              className="lg:hidden pointer-events-none absolute top-0 right-0 bottom-0 w-20 rounded-r-[24px] bg-gradient-to-l from-white from-30% via-white/70 to-transparent flex items-center justify-end pr-3"
              aria-hidden="true"
            >
              <motion.svg
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="text-brand-600"
                animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path d="M9 6l6 6-6 6" />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!hasScrolled && (
          <motion.span
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.3 }}
            className="lg:hidden inline-flex items-center gap-1.5 font-body text-[12px] text-surface-400"
          >
            Scroll right to view more specifications
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
