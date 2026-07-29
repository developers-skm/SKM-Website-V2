import { motion, useReducedMotion } from 'framer-motion';
import { getVariantsForProduct } from '../../../data/productVariants';
import { EASE_PREMIUM, DURATION, STAGGER, fadeUp } from '../../../utils/motionTokens';

const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

// Section 4 — recommended products (brief §4). Each card's fields are all
// real: "Product and variant" comes from a genuine match between this
// application's name/tags and that variant's own `applications` text
// (same lookup strategy as the product page's own RecommendedApplications
// component, now made possible by exporting `variantsData` from each
// product page — see data/productVariants.js). "Reason recommended" reuses
// this application's own `intro` copy (no new marketing text). "Functional
// benefit" is the matched variant's own `benefits` field. "Format" is the
// product's real `packagingOptions`. "Related documentation" links the
// real TDS PDF where one exists (data/products.js `tdsUrl`) — omitted
// otherwise, never a fabricated document link.
function findRecommendedVariant(application, variantsData) {
  const needles = [application.title, ...application.tags].map((s) => s.toLowerCase());
  return (
    variantsData.find((v) => {
      const haystack = v.applications?.toLowerCase() ?? '';
      return needles.some((n) => haystack.includes(n));
    }) ?? variantsData[0] ?? null
  );
}

export default function RecommendedProducts({ application, matchedProducts, onPageChange, onAddToComparison, comparisonIds }) {
  const reduceMotion = useReducedMotion();
  return (
    <div id="recommended-products" className="w-full py-16 sm:py-20 lg:py-24 scroll-mt-[100px]">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <motion.div {...fadeUp(reduceMotion)} className="flex flex-col gap-3">
          <span className="section-label">Products That Solve This</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Recommended Products For {application.title}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : STAGGER } } }}
        >
          {matchedProducts.map((product) => {
            const variantsData = getVariantsForProduct(product.id);
            const variant = findRecommendedVariant(application, variantsData);
            const isComparing = comparisonIds.includes(product.id);

            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
                className="group flex flex-col rounded-[24px] overflow-hidden border border-surface-200/60 dark:border-surface-800 hover:border-brand-600/40 bg-white dark:bg-surface-900/40 shadow-[0_3px_14px_rgba(36,30,24,0.05)] hover:shadow-[0_14px_34px_rgba(36,30,24,0.12)] hover:-translate-y-1 focus-within:ring-2 focus-within:ring-brand-500/40 transition-all duration-300"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <img src={product.image} alt={product.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                </div>

                <div className="flex flex-col gap-4 px-6 py-6">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-heading font-bold text-[18px] text-heading dark:text-white m-0 leading-tight">
                      {product.title}
                    </h3>
                    {variant && (
                      <span className="font-mono text-[11.5px] font-bold text-brand-600 dark:text-brand-400">
                        {variant.code} — {variant.name}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-body text-[11px] font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500">
                      Why Recommended
                    </span>
                    <p className="font-body text-[13.5px] text-surface-600 dark:text-surface-300 leading-[1.6] m-0">
                      {application.intro}
                    </p>
                  </div>

                  {variant?.benefits && (
                    <div className="flex flex-col gap-1">
                      <span className="font-body text-[11px] font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500">
                        Functional Benefit
                      </span>
                      <p className="font-body text-[13.5px] text-surface-600 dark:text-surface-300 leading-[1.6] m-0">
                        {variant.benefits}
                      </p>
                    </div>
                  )}

                  {product.packagingOptions?.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <span className="font-body text-[11px] font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500">
                        Format
                      </span>
                      <p className="font-body text-[13.5px] text-surface-600 dark:text-surface-300 m-0">
                        {product.packagingOptions.join(', ')}
                      </p>
                    </div>
                  )}

                  {product.tdsUrl && (
                    <a
                      href={product.tdsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body font-semibold text-[13px] text-brand-600 dark:text-brand-400 hover:text-[#a80000] underline underline-offset-4 decoration-brand-600/40"
                    >
                      Related Documentation (Technical Data Sheet)
                    </a>
                  )}

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 mt-1 border-t border-surface-200/60 dark:border-surface-800">
                    <button
                      onClick={() => onPageChange(product.page)}
                      className="inline-flex items-center min-h-[40px] font-body font-bold text-[12px] uppercase tracking-[0.05em] text-heading dark:text-white hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer bg-transparent border border-surface-200 dark:border-surface-700 hover:border-brand-600/40 rounded-full px-4 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      View Product
                    </button>
                    <button
                      onClick={() => onPageChange('get-quote', { productId: product.id, applicationId: application.id })}
                      className="inline-flex items-center min-h-[40px] font-body font-bold text-[12px] uppercase tracking-[0.05em] text-white bg-brand-600 hover:bg-[#a80000] cursor-pointer rounded-full px-4 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Request Sample
                    </button>
                    <motion.button
                      onClick={() => onAddToComparison(product.id)}
                      aria-pressed={isComparing}
                      animate={{ scale: isComparing && !reduceMotion ? [1, 1.08, 1] : 1 }}
                      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                      className={`inline-flex items-center gap-1.5 min-h-[40px] font-body font-bold text-[12px] uppercase tracking-[0.05em] cursor-pointer bg-transparent border-none px-1 transition-colors duration-200 ${
                        isComparing ? 'text-brand-600 dark:text-brand-400' : 'text-surface-400 dark:text-surface-500 hover:text-brand-600 dark:hover:text-brand-400'
                      }`}
                    >
                      {isComparing ? '✓ Added' : 'Add to Comparison'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
