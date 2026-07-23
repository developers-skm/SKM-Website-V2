import { useMemo } from 'react';
import { motion } from 'framer-motion';

// "Compare Selected Variants" (brief §3 table action) — a focused overlay
// rather than a new page/route, since comparison is a transient reading
// task tied to the table state above it.
export default function VariantCompareModal({ variants, displayCode, onClose }) {
  const specColumns = useMemo(() => {
    const keys = new Set();
    variants.forEach((v) => Object.keys(v.specifications ?? {}).forEach((k) => keys.add(k)));
    return Array.from(keys);
  }, [variants]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Compare selected variants"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1100px] max-h-[85vh] overflow-auto bg-white dark:bg-surface-900 rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.3)] p-6 sm:p-10"
      >
        <div className="flex items-start justify-between gap-4 mb-8">
          <h3 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading dark:text-white m-0 tracking-tight">
            Compare Variants
          </h3>
          <button
            onClick={onClose}
            aria-label="Close comparison"
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 cursor-pointer"
          >
            <svg className="w-4 h-4 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr>
                <th className="text-left px-3 py-3 font-body text-[11px] font-bold uppercase tracking-wider text-surface-400" />
                {variants.map((v) => (
                  <th key={v.code} className="text-left px-3 py-3 align-bottom">
                    <span className="block font-mono text-[11.5px] font-bold text-brand-600 dark:text-brand-400 mb-1">{displayCode(v.code)}</span>
                    <span className="block font-heading font-bold text-[15px] text-heading dark:text-white leading-tight">{v.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specColumns.map((key) => (
                <tr key={key} className="border-t border-surface-200/70 dark:border-surface-800">
                  <th scope="row" className="text-left px-3 py-3.5 font-body text-[11.5px] font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500 whitespace-nowrap align-top">
                    {key}
                  </th>
                  {variants.map((v) => (
                    <td key={v.code} className="px-3 py-3.5 font-body text-[13.5px] text-surface-700 dark:text-surface-300 align-top">
                      {v.specifications?.[key] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
