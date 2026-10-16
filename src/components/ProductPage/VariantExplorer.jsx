// Filter labels are derived from each product's own variant text (same
// patterns the old clickable filters used), so a label only appears when a
// real variant matches it. They are display-only.
const FILTER_AXES = [
  { axis: 'Function', patterns: [
    { label: 'Emulsification', re: /emulsif/i },
    { label: 'Gelling', re: /gel(ling|\s|-)/i },
    { label: 'Whipping', re: /whip/i },
    { label: 'Binding', re: /bind/i },
    { label: 'Free flow', re: /free.?flow/i },
  ] },
  { axis: 'Processing treatment', patterns: [
    { label: 'Stabilized', re: /stabili[sz]ed/i },
    { label: 'De-Sugared', re: /de.?sugared/i },
    { label: 'Hydrolysed', re: /hydrolys/i },
    { label: 'Enriched', re: /enrich/i },
  ] },
  { axis: 'Salt or sugar level', patterns: [
    { label: 'Salted', re: /salt/i },
    { label: 'Sugared', re: /sugar|sucrose/i },
  ] },
  { axis: 'Colour', patterns: [
    { label: 'High Colour', re: /high.?colo[u]?r/i },
    { label: 'Standard Colour', re: /standard.*colo[u]?r/i },
  ] },
  { axis: 'Chilled or frozen', storage: true, patterns: [
    { label: 'Chilled', re: /chilled/i },
    { label: 'Frozen', re: /frozen/i },
  ] },
];

function deriveFilters(variantsData = [], packagingOptions = []) {
  const variantText = (v) => [v.name, v.specifications?.character, v.specifications?.color].filter(Boolean).join(' ');
  const groups = FILTER_AXES.map(({ axis, patterns, storage }) => ({
    axis,
    options: patterns
      .filter((p) => variantsData.some((v) => p.re.test(storage ? v.specifications?.storage ?? '' : variantText(v))))
      .map((p) => p.label),
  }));
  if (packagingOptions?.length) groups.push({ axis: 'Packaging', options: packagingOptions });
  return groups.filter((g) => g.options.length > 0);
}

// Variant explorer - heading and static filter labels on the left, a plain
// variant-name table on the right. The table is fed per product page
// (`variantNamesTable`, empty until supplied); the labels are derived from the
// variants unless a page overrides them with `variantStaticFilters`.
export default function VariantExplorer({ variantsData, variantNamesTable = [], variantStaticFilters, variantsSectionSubtitle, productName, packagingOptions }) {
  const filters = variantStaticFilters ?? deriveFilters(variantsData, packagingOptions);
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-start lg:items-end justify-between gap-6 flex-wrap">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            Product Range
          </span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading m-0 tracking-tight leading-[1.1]">
            Variant Specifications
          </h2>
          <p className="font-body text-[17px] text-surface-600 leading-[1.7] m-0">
            {variantsSectionSubtitle ?? `Search or compare our  ${productName}  variants to find the product that best meets your specific requirements.`}
          </p>
          {filters.length > 0 && (
            <div className="flex flex-col gap-3">
              {filters.map((group) => (
                <div key={group.axis} className="flex flex-wrap items-center gap-2">
                  <span className="font-body text-[11.5px] font-semibold uppercase tracking-wide text-surface-400 mr-1 whitespace-nowrap">
                    {group.axis}
                  </span>
                  {group.options.map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center min-h-[32px] px-3.5 py-1.5 rounded-full border border-surface-300 bg-white font-body font-semibold text-[12.5px] text-surface-600 select-none"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}
          {variantNamesTable.length > 0 && (
            <span className="font-body text-[12.5px] font-medium text-surface-400">
              {variantNamesTable.length} variants available
            </span>
          )}
        </div>
        <div className="w-full lg:w-auto lg:min-w-[340px] rounded-[20px] border border-surface-200/60 bg-white overflow-hidden">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="text-left px-5 py-4 bg-surface-100 font-body text-[11.5px] font-bold uppercase tracking-wider text-surface-500">
                  Variant
                </th>
              </tr>
            </thead>
            <tbody>
              {variantNamesTable.length > 0 ? (
                variantNamesTable.map((name) => (
                  <tr key={name}>
                    <td className="px-5 py-3.5 border-t border-surface-200/50 font-heading font-semibold text-[14.5px] text-heading">
                      {name}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="h-[180px] border-t border-surface-200/50" />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
