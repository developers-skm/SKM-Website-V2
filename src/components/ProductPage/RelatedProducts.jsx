import { motion, useReducedMotion } from 'framer-motion';
import { PRODUCT_CATEGORIES } from '../../data/products';
import { EASE_PREMIUM, DURATION, STAGGER } from '../../utils/motionTokens';

// Refined editorial cross-sell cards — controlled image ratio, no heavy
// overlay (label lives in a white lower area instead of over the photo),
// subtle border, restrained hover. Reads as a premium ingredient catalogue
// entry rather than an image-dominant poster tile.
//
// Section 9 (brief §9) asks each card to explain "why it may be
// appropriate" — reuses the product's own real `shortDescription` (already
// approved catalogue copy from data/products.js) rather than writing new
// per-pairing justification text. The "Compare with X" button routes to
// that product's own page rather than a fabricated side-by-side compare
// view — no product-vs-product comparison feature exists anywhere in the
// app (Section 3's compare modal only compares SKUs within one product).
//
// "View Related Products" routes to the real category page
// (src/pages/Products/*CategoryPage.jsx) matching the current product's
// own category — a genuine destination showing the full set, not just the
// 3-card sample here.
const CATEGORY_ROUTES = {
  [PRODUCT_CATEGORIES.POWDERS]: 'category_powders',
  [PRODUCT_CATEGORIES.LIQUIDS]: 'category_liquids',
  [PRODUCT_CATEGORIES.SPECIALITY]: 'category_custom',
  [PRODUCT_CATEGORIES.CUSTOMIZED]: 'category_custom',
};

export default function RelatedProducts({ products, currentCategory, onPageChange }) {
  const reduceMotion = useReducedMotion();
  if (!products || products.length === 0) return null;
  const categoryRoute = currentCategory ? CATEGORY_ROUTES[currentCategory] : null;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 max-w-2xl">
        <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600">
          <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
          You May Also Need
        </span>
        <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading tracking-tight m-0 leading-[1.1]">
          Related Products
        </h2>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : STAGGER } } }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: DURATION.cardHover, ease: EASE_PREMIUM }}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            className="group relative flex flex-col overflow-hidden rounded-[22px] border border-surface-200/60 bg-white transition-[box-shadow,border-color] duration-300 hover:shadow-[0_16px_40px_rgba(36,30,24,0.09)] hover:border-gold-500/40"
          >
            <button
              onClick={() => onPageChange(product.page)}
              className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </button>
            <div className="flex flex-col gap-3 px-5 py-6">
              <h3 className="font-heading font-bold text-[17px] text-heading m-0 leading-tight">
                {product.title}
              </h3>
              {product.shortDescription && (
                <p className="font-body text-[13.5px] text-surface-600 leading-[1.6] m-0">
                  {product.shortDescription}
                </p>
              )}
              <button
                onClick={() => onPageChange(product.page)}
                className="mt-1 self-start inline-flex items-center gap-1.5 font-body font-bold text-[12px] uppercase tracking-[0.05em] text-brand-600 hover:text-[#a80000] cursor-pointer bg-transparent border-none p-0"
              >
                Compare With {product.title}
                <svg
                  className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {categoryRoute && (
        <button
          onClick={() => onPageChange(categoryRoute)}
          className="self-start font-body font-bold text-[13px] uppercase tracking-[0.05em] text-brand-600 hover:text-[#a80000] underline underline-offset-4 decoration-brand-600/40 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
        >
          View Related Products
        </button>
      )}
    </div>
  );
}
