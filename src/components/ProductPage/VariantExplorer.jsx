import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import VariantTable from './VariantTable';
import VariantCompareModal from './VariantCompareModal';
import VariantDetails from './VariantDetails';

// Variant explorer — searchable comparison table (brief §3) with a selected
// detail panel beneath it. Replaces the previous chip-selector layout: the
// table gives buyers a scannable overview across all SKUs at once, while
// selecting a row still opens the full spec document below, same as before.
//
// "Let SKM Recommend a Variant" routes to the real Contact Us page (general
// enquiry) rather than a fabricated recommendation engine — no such feature
// exists in the app.
export default function VariantExplorer({ variantsData, variantsSectionSubtitle, productName, displayCode, packagingOptions, onPageChange }) {
  const [selectedCode, setSelectedCode] = useState(variantsData[0]?.code ?? null);
  const [compareCodes, setCompareCodes] = useState(null);
  const selectedVariant = variantsData.find((v) => v.code === selectedCode) ?? variantsData[0];
  const panelId = 'variant-detail-panel';
  const tabId = selectedVariant ? `variant-tab-${selectedVariant.code}` : undefined;
  const compareVariants = compareCodes
    ? variantsData.filter((v) => compareCodes.includes(v.code))
    : null;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            Product Range
          </span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white m-0 tracking-tight leading-[1.1]">
            Variant Specifications
          </h2>
          <p className="font-body text-[17px] text-surface-600 dark:text-surface-400 leading-[1.7] m-0">
            {variantsSectionSubtitle ?? `Search or compare variants to find the right fit for our ${productName} range.`}
          </p>
          <span className="font-body text-[12.5px] font-medium text-surface-400 dark:text-surface-500">
            {variantsData.length} variants available
          </span>
        </div>
        {onPageChange && (
          <button
            onClick={() => onPageChange('contact-us')}
            className="font-body font-bold text-[13px] uppercase tracking-[0.05em] text-brand-600 dark:text-brand-400 hover:text-[#a80000] underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 whitespace-nowrap"
          >
            Let SKM Recommend a Variant
          </button>
        )}
      </div>

      <div className="flex flex-col gap-8">
        <VariantTable
          variantsData={variantsData}
          displayCode={displayCode}
          packagingOptions={packagingOptions}
          selectedCode={selectedVariant?.code}
          onSelectVariant={setSelectedCode}
          onCompare={setCompareCodes}
        />
        <VariantDetails
          variant={selectedVariant}
          displayCode={displayCode}
          panelId={panelId}
          tabId={tabId}
        />
      </div>

      <AnimatePresence>
        {compareVariants && compareVariants.length > 0 && (
          <VariantCompareModal
            variants={compareVariants}
            displayCode={displayCode}
            onClose={() => setCompareCodes(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
