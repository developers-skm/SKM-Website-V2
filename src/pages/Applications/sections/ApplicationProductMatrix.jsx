import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getProductById } from '../../../data/products';
import { EASE_PREMIUM, fadeUp } from '../../../utils/motionTokens';

// Section 4 - application-to-product matrix. Column order and ticks follow
// the approved recommendation sheet (WEP, EYP, EYP-HS, EAP, WEL, EYL, EAL);
// rows are the 4 real applications. Display-only: no row/column selection.
//
// "Download Application Guide" routes to the real Brochures page (the only
// place real product-flyer PDFs exist) rather than a fabricated single
// "application guide" document that doesn't exist anywhere in the site.
const MATRIX_PRODUCT_IDS = [
  'whole_egg_powder',
  'egg_yolk_powder',
  'egg_yolk_powder_heat_stable',
  'egg_albumen_powder',
  'whole_egg_liquid',
  'egg_yolk_liquid',
  'egg_albumen_liquid',
];

const MATRIX_ROWS = [
  { id: 'bakery', title: 'Bakery & Confectionery', productIds: ['whole_egg_powder', 'egg_albumen_powder', 'whole_egg_liquid', 'egg_albumen_liquid'] },
  { id: 'mayonnaise', title: 'Mayonnaise & Salad Dressing', productIds: ['egg_yolk_powder', 'egg_yolk_powder_heat_stable', 'egg_yolk_liquid'] },
  { id: 'meat_fish', title: 'Meat & Fish', productIds: ['whole_egg_powder', 'egg_albumen_powder', 'whole_egg_liquid', 'egg_albumen_liquid'] },
  { id: 'noodles_pasta', title: 'Noodles & Pasta', productIds: ['egg_albumen_powder', 'egg_albumen_liquid'] },
];

const columnProducts = MATRIX_PRODUCT_IDS.map(getProductById).filter(Boolean);

export default function ApplicationProductMatrix({ onPageChange }) {
  const [hoverCol, setHoverCol] = useState(null);
  const [hoverRow, setHoverRow] = useState(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <motion.div {...fadeUp(reduceMotion)} className="flex flex-col gap-4 max-w-2xl">
          <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600">
            <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
            Product Matrix
          </span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading m-0 tracking-tight">
            Recommended Products by Application
          </h2>
        </motion.div>

        <motion.div {...fadeUp(reduceMotion, { delay: 0.1, distance: 24 })} className="flex flex-col gap-2.5">
          {/* Phones: 8 columns can't fit, so the table scrolls sideways with the
              Application column pinned; headers wrap on word boundaries only. */}
          <div className="rounded-[24px] border border-surface-200/60 overflow-x-auto sm:overflow-hidden">
            <table className="w-full min-w-[680px] sm:min-w-0 table-fixed border-collapse">
              <thead>
                <tr className="bg-[#fbf7f1] border-b border-surface-200/70">
                  <th className="w-[130px] sm:w-[22%] sticky left-0 z-10 sm:static bg-[#fbf7f1] text-left px-3 sm:px-4 lg:px-5 py-3 sm:py-4 font-body text-[10px] sm:text-[10.5px] lg:text-[11.5px] font-bold uppercase tracking-wider text-surface-500 align-middle">
                    Application
                  </th>
                  {columnProducts.map((product) => (
                    <th
                      key={product.id}
                      onMouseEnter={() => setHoverCol(product.id)}
                      onMouseLeave={() => setHoverCol(null)}
                      className={`px-1.5 sm:px-2 lg:px-3 py-3 sm:py-4 font-body text-[10px] lg:text-[11px] font-bold uppercase tracking-normal sm:tracking-wider align-middle transition-colors duration-200 ${hoverCol === product.id ? 'text-brand-600 bg-[#f3c969]/10' : 'text-surface-500'}`}
                    >
                      <span className="block text-center leading-snug">{product.title}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX_ROWS.map((app) => (
                  <tr
                    key={app.id}
                    onMouseEnter={() => setHoverRow(app.id)}
                    onMouseLeave={() => setHoverRow(null)}
                    className={`border-b border-surface-200/50 last:border-b-0 transition-colors duration-200 ${hoverRow === app.id ? 'bg-[#f3c969]/6' : ''}`}
                  >
                    <td
                      className={`sticky left-0 z-10 sm:static px-3 sm:px-4 lg:px-5 py-3 sm:py-4 font-heading font-semibold text-[12px] sm:text-[13px] lg:text-[14.5px] leading-snug transition-colors duration-200 ${hoverRow === app.id ? 'bg-[#fdf8ec] text-brand-600' : 'bg-white text-heading'}`}
                    >
                      {app.title}
                    </td>
                    {columnProducts.map((product) => {
                      const isMatch = app.productIds.includes(product.id);
                      const isActiveIntersection = isMatch && (hoverRow === app.id || hoverCol === product.id);
                      return (
                        <td key={product.id} className="px-1 sm:px-2 lg:px-4 py-3 sm:py-4 text-center">
                          {isMatch && (
                            <motion.svg
                              className={`w-4 h-4 mx-auto ${isActiveIntersection ? 'text-[#d19a2e]' : 'text-brand-600'}`}
                              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-label="Recommended"
                              animate={{ scale: isActiveIntersection && !reduceMotion ? 1.2 : 1 }}
                              transition={{ duration: 0.2, ease: EASE_PREMIUM }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </motion.svg>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <button
          onClick={() => onPageChange('brochure')}
          className="self-start inline-flex items-center justify-center gap-2.5 min-h-[44px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-8 py-[17px] rounded-[200px] transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_8px_24px_rgba(228,10,24,0.22)] hover:shadow-[0_10px_30px_rgba(228,10,24,0.32)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 cursor-pointer"
        >
          Download Application Guide
        </button>
      </div>
    </div>
  );
}
