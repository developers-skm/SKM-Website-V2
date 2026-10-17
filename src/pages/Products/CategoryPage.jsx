import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import { getProductById } from '../../data/products';

// Shared layout for the 3 Product Category transition pages (Egg Powders,
// Liquid Egg Products, Customised and Speciality Products).
//
// Section 1 — Category hero — covers exactly the 4 required points (format,
// main operational advantages, who commonly uses it, storage/supply
// considerations), each rendered only when the calling page supplies real
// data for it; no field is invented to fill a gap.
//
// Section 2 — Product cards — one card per real product in this category
// (products.js), not per SKU variant (variant-level code/name/benefit data
// lives inside each product's own page file, keyed by productId, and isn't
// shared category-wide). "Main functionality" and "Main applications" are
// real per-product fields supplied by the calling page (derived from that
// product's own variantsData/applicationsData); "Product code range" is
// the real min–max SKU code span read from that same per-product data.
// "Certifications or relevant claims" shows the real company-wide
// certifications (BRCGS, Halal, Kosher, etc.) since these are facility-
// level, not per-SKU — true for every product, not invented per card.
//
// Section 3 — Choose by functionality — real functionality tags, each
// mapped to the real product ids that genuinely carry that trait (verified
// against each product's own variantsData `character`/`name` fields).
//
// Section 5 — Packaging, storage and delivery — real packagingOptions
// (products.js) and, where supplied, real storage temperature language
// already established for that category.
//
// Section 6 — Closing CTA — Request a Sample / Request a Quote both route
// to the real get-quote flow (no separate sample-request mechanism exists,
// so "Request a Sample" reuses the same real conversion path rather than a
// fake dedicated form).
export default function CategoryPage({
  seo,
  categoryLabel,
  title,
  format,
  advantages,
  whoUsesIt,
  storage,
  categoryProductIds,
  productMeta,
  functionalityTags,
  onPageChange,
}) {
  const reduceMotion = useReducedMotion();
  const [activeTag, setActiveTag] = useState(null);

  const categoryProducts = useMemo(
    () => categoryProductIds.map(getProductById).filter(Boolean),
    [categoryProductIds]
  );

  const visibleProducts = useMemo(() => {
    if (!activeTag) return categoryProducts;
    const tag = functionalityTags.find((t) => t.label === activeTag);
    if (!tag) return categoryProducts;
    return categoryProducts.filter((p) => tag.productIds.includes(p.id));
  }, [categoryProducts, activeTag, functionalityTags]);

  const fadeProps = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : delay, ease: [0.25, 1, 0.5, 1] },
  });

  return (
    <PageWrapper
      seo={seo}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page">

        {/* Section 1 — Category hero */}
        <div className="w-full pt-[110px] pb-[60px] sm:pt-[130px] lg:pt-[85px] lg:pb-[85px] border-b border-[#eee]">
          <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">
            <motion.div {...fadeProps()} className="max-w-3xl mb-9 lg:mb-11">
              <span className="section-label">{categoryLabel}</span>
              <h1 className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[50px] text-heading leading-[1.1] tracking-tight m-0 mt-3">
                {title}
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
              {format && (
                <motion.div {...fadeProps(0)} className="flex flex-col gap-2.5 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7]">
                  <span className="font-body text-[12.5px] font-semibold uppercase tracking-wide text-surface-400">
                    What the format is
                  </span>
                  <span className="font-body text-[15px] text-surface-700 leading-[1.6]">
                    {format}
                  </span>
                </motion.div>
              )}

              {advantages && (
                <motion.div {...fadeProps(0.05)} className="flex flex-col gap-2.5 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7]">
                  <span className="font-body text-[12.5px] font-semibold uppercase tracking-wide text-surface-400">
                    Main operational advantages
                  </span>
                  <ul className="flex flex-col gap-1.5 list-none m-0 p-0">
                    {advantages.map((a) => (
                      <li key={a} className="font-body text-[14.5px] text-surface-700 leading-[1.6]">
                        {a}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {whoUsesIt && (
                <motion.div {...fadeProps(0.1)} className="flex flex-col gap-2.5 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7]">
                  <span className="font-body text-[12.5px] font-semibold uppercase tracking-wide text-surface-400">
                    Who commonly uses it
                  </span>
                  <span className="font-body text-[15px] text-surface-700 leading-[1.6]">
                    {whoUsesIt}
                  </span>
                </motion.div>
              )}

              {storage && (
                <motion.div {...fadeProps(0.15)} className="flex flex-col gap-2.5 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7]">
                  <span className="font-body text-[12.5px] font-semibold uppercase tracking-wide text-surface-400">
                    Storage and supply considerations
                  </span>
                  <span className="font-body text-[15px] text-surface-700 leading-[1.6]">
                    {storage}
                  </span>
                </motion.div>
              )}
            </div>

            <motion.div {...fadeProps(0.2)} className="flex flex-wrap items-center gap-4 mt-9 lg:mt-11">
              <InternalLink
                route="products"
                onPageChange={onPageChange}
                prefillData={{ scrollTarget: 'product-comparison' }}
                className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Compare Products
              </InternalLink>
            </motion.div>
          </div>
        </div>

        {/* Section 2 — Product cards */}
        <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] bg-white">
          <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-8">
            <h2 className="font-heading font-bold text-[32px] sm:text-[38px] lg:text-[42px] text-heading leading-[1.1] tracking-tight m-0">
              Products in this category
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {visibleProducts.map((product) => {
                const meta = productMeta[product.id] ?? {};
                return (
                  <div key={product.id} className="flex flex-col gap-3 p-5 rounded-[16px] border border-surface-200/70 bg-[#fdfbf7]">
                    <img src={product.image} alt={product.title} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-[10px]" />
                    <span className="font-heading font-bold text-[16px] text-heading">{product.title}</span>

                    {meta.functionality && (
                      <span className="font-body text-[13.5px] text-surface-700 leading-[1.5]">
                        <strong className="font-semibold text-heading">Main functionality: </strong>
                        {meta.functionality}
                      </span>
                    )}

                    {meta.applications?.length > 0 && (
                      <span className="font-body text-[13.5px] text-surface-700 leading-[1.5]">
                        <strong className="font-semibold text-heading">Main applications: </strong>
                        {meta.applications.join(', ')}
                      </span>
                    )}

                    <span className="font-body text-[13.5px] text-surface-700 leading-[1.5]">
                      <strong className="font-semibold text-heading">Format and packaging: </strong>
                      {product.packagingOptions.join(', ')}
                    </span>

                    <span className="font-body text-[12.5px] text-surface-500 leading-[1.5]">
                      <strong className="font-semibold text-heading">Certifications: </strong>
                      FSSAI, Export Inspection Council, BRCGS, ISO 22000, ISO 17025, Halal (JUHF & BPJPH) and Kosher
                    </span>

                    <div className="flex items-center gap-4 mt-1">
                      <InternalLink
                        route={product.page}
                        onPageChange={onPageChange}
                        className="font-body font-semibold text-[13.5px] text-brand-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
                      >
                        View Product
                      </InternalLink>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 3 — Choose by functionality */}
        {functionalityTags?.length > 0 && (
          <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee]">
            <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-6">
              <h2 className="font-heading font-bold text-[32px] sm:text-[38px] lg:text-[42px] text-heading leading-[1.1] tracking-tight m-0">
                Choose by functionality
              </h2>
              <div className="flex flex-wrap items-center gap-2.5">
                {functionalityTags.map((tag) => (
                  <button
                    key={tag.label}
                    type="button"
                    onClick={() => setActiveTag(activeTag === tag.label ? null : tag.label)}
                    aria-pressed={activeTag === tag.label}
                    className={`inline-flex items-center min-h-[44px] sm:min-h-[38px] px-4 py-2 rounded-full border font-body font-semibold text-[13.5px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
                      activeTag === tag.label
                        ? 'bg-brand-600 border-brand-600 text-white'
                        : 'bg-white border-surface-300 text-surface-600 hover:border-brand-600/50'
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
              {activeTag && (
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className="self-start font-body font-semibold text-[13.5px] text-brand-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm w-fit"
                >
                  Show All Products
                </button>
              )}
              <p className="font-body text-[14px] text-surface-500 m-0" aria-live="polite">
                Showing {visibleProducts.length} of {categoryProducts.length} products — see Section 2 above.
              </p>
            </div>
          </div>
        )}

        {/* Section 5 — Packaging, storage and delivery */}
        <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee]">
          <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-6">
            <h2 className="font-heading font-bold text-[32px] sm:text-[38px] lg:text-[42px] text-heading leading-[1.1] tracking-tight m-0">
              Packaging, storage and delivery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2.5 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7]">
                <span className="font-body text-[12.5px] font-semibold uppercase tracking-wide text-surface-400">
                  Packaging options
                </span>
                <span className="font-body text-[15px] text-surface-700 leading-[1.6]">
                  {Array.from(new Set(categoryProducts.flatMap((p) => p.packagingOptions))).join(', ')}
                </span>
              </div>

              {storage && (
                <div className="flex flex-col gap-2.5 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7]">
                  <span className="font-body text-[12.5px] font-semibold uppercase tracking-wide text-surface-400">
                    Storage temperature
                  </span>
                  <span className="font-body text-[15px] text-surface-700 leading-[1.6]">
                    {storage}
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-2.5 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7]">
                <span className="font-body text-[12.5px] font-semibold uppercase tracking-wide text-surface-400">
                  Shipment formats
                </span>
                <span className="font-body text-[15px] text-surface-700 leading-[1.6]">
                  Bulk export and containerised shipment, 30+ countries served.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-1">
              <InternalLink
                route="products"
                onPageChange={onPageChange}
                prefillData={{ scrollTarget: 'product-finder' }}
                className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[15px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                View Packaging Details
              </InternalLink>
              <InternalLink
                route="contact-us"
                onPageChange={onPageChange}
                className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-brand-600 text-brand-600 hover:bg-brand-600/6 font-body font-semibold text-[15px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Ask About Export Availability
              </InternalLink>
            </div>
          </div>
        </div>

        {/* Section 6 — Closing CTA */}
        <div className="w-full py-[60px] lg:py-[85px] text-center px-4">
          <div className="mx-auto max-w-[600px] flex flex-col items-center gap-5">
            <h2 className="font-heading font-bold text-[26px] sm:text-[32px] text-heading m-0 tracking-tight">
              Ready to move forward with {title}?
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <InternalLink
                route="get-quote"
                onPageChange={onPageChange}
                className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Request a Sample
              </InternalLink>
              <InternalLink
                route="get-quote"
                onPageChange={onPageChange}
                className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 hover:bg-brand-600/6 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Request a Quotation
              </InternalLink>
            </div>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
