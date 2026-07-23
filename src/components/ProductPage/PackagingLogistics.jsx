import exportMarkets from '../../data/exportMarkets';

// Section 6 — packaging and logistics (brief §6). "Pallet information" is
// omitted: no per-product pallet spec (units/pallet, dimensions) exists
// anywhere in the codebase — only a general company-wide mention that IBC
// containers are "compatible with standard fork-lift pallet systems" on the
// Customized Packages page, which isn't a per-product fact worth restating
// here. "Export suitability" reuses the real, company-wide export market
// count (data/exportMarkets.js) rather than a fabricated per-product claim.
// Storage/chilled-frozen handling reuses the same real variant-derived
// values as Section 2's SpecPanel.
function collectDistinct(variantsData, key) {
  const values = new Set();
  for (const v of variantsData) {
    const raw = v.specifications?.[key];
    if (raw) values.add(raw);
  }
  return Array.from(values);
}

export default function PackagingLogistics({ packagingOptions, variantsData, onViewPackaging, onDiscussDelivery }) {
  const storageValues = collectDistinct(variantsData, 'storage');

  const facts = [
    packagingOptions?.length > 0 && { label: 'Available Pack Types', value: packagingOptions.join(', ') },
    storageValues.length > 0 && {
      label: storageValues.length > 1 ? 'Storage Conditions (By Variant)' : 'Storage Conditions',
      value: storageValues.join(' / '),
    },
    storageValues.some((v) => /chilled|frozen/i.test(v)) && {
      label: 'Chilled Or Frozen Handling',
      value: storageValues.filter((v) => /chilled|frozen/i.test(v)).join(' / '),
    },
    exportMarkets.length > 0 && {
      label: 'Export Suitability',
      value: `Exported to ${exportMarkets.length} countries worldwide`,
    },
  ].filter(Boolean);

  if (facts.length === 0) return null;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 max-w-2xl">
        <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
          <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
          Logistics
        </span>
        <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white m-0 tracking-tight leading-[1.1]">
          Packaging &amp; Logistics
        </h2>
      </div>

      <div className="rounded-[32px] border border-surface-200/60 dark:border-surface-800 bg-white dark:bg-surface-900/40 px-6 sm:px-12 lg:px-16 py-10 sm:py-14 flex flex-col gap-9 shadow-[0_20px_60px_rgba(36,30,24,0.06)]">
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7 m-0">
          {facts.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1.5 border-t border-surface-200/70 dark:border-surface-800 pt-4">
              <dt className="font-body text-[11.5px] font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500">
                {label}
              </dt>
              <dd className="font-heading font-bold text-[17px] text-heading dark:text-white leading-snug m-0">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
          <button
            onClick={onViewPackaging}
            className="self-start inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-8 py-[17px] rounded-[200px] transition-all duration-300 shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] cursor-pointer"
          >
            View Packaging Options
          </button>
          <button
            onClick={onDiscussDelivery}
            className="font-body font-semibold text-[13.5px] text-brand-600 dark:text-brand-400 hover:text-[#a80000] dark:hover:text-brand-300 underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
          >
            Discuss Delivery Requirements
          </button>
        </div>
      </div>
    </div>
  );
}
