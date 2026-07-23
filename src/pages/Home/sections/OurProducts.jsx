import { motion } from 'framer-motion';
import { getProductById } from '../../../data/products';

// Bento col-span pattern for 3-col grid — rows: [2+1] [1+2] [2+1]
const bentoColSpans = [2, 1, 1, 2, 2, 1];

// Six representative products from src/data/products.js — the single source
// of truth also used by cross-sell and the Get Quote product picker.
const FEATURED_PRODUCT_IDS = [
  'whole_egg_powder',
  'egg_yolk_powder',
  'egg_albumen_powder',
  'whole_egg_liquid',
  'egg_yolk_liquid',
  'customized_mix',
];

const featuredProducts = FEATURED_PRODUCT_IDS.map(getProductById).filter(Boolean);

// Reworked card chrome — white body with the photo cropped to the top two-
// thirds and a proper text footer (not a poster-style gradient-over-image
// with white text). Reads as a product catalog rather than a hero collage,
// which sits better next to the more restrained sections around it.
export default function OurProducts({ onPageChange }) {
  return (
    <div
      id="product-discovery"
      className="w-full bg-white dark:bg-surface-900/40 py-[60px] lg:py-[85px] scroll-mt-[100px] xl:scroll-mt-[120px]"
    >
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-14">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Our Portfolio</span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] lg:text-[48px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Our Product Offerings
          </h2>
          <p className="font-body text-[15px] sm:text-[16px] text-surface-500 dark:text-surface-400 leading-[26px] m-0">
            Explore our range of high-performance egg powders, fresh liquid eggs, and custom blends engineered to satisfy stringent global food standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {featuredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ y: -6 }}
              onClick={() => onPageChange(product.page)}
              className={`group relative flex flex-col cursor-pointer overflow-hidden rounded-[22px] bg-surface-50 dark:bg-surface-900 border border-surface-200/60 dark:border-surface-800 shadow-[0_4px_20px_rgba(0,72,88,0.06)] hover:shadow-[0_16px_44px_rgba(0,72,88,0.16)] transition-shadow duration-300 ${
                bentoColSpans[idx] === 2 ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              {/* Image — cropped to top portion, not full-bleed poster */}
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 font-body text-[10.5px] font-semibold uppercase tracking-[0.08em] text-heading bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="absolute top-4 right-4 font-heading font-black text-[13px] text-white/70 bg-black/20 backdrop-blur-sm w-7 h-7 rounded-full flex items-center justify-center">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Text footer — white/surface body, not overlaid on the image */}
              <div className="flex flex-col gap-2.5 p-5 md:p-6 flex-1">
                <h3 className="font-heading font-bold text-[19px] text-heading dark:text-white m-0 leading-tight">
                  {product.title}
                </h3>
                <p className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 leading-[22px] m-0 line-clamp-2">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between pt-3 mt-auto border-t border-surface-200/70 dark:border-surface-800">
                  <button
                    onClick={(e) => { e.stopPropagation(); onPageChange(product.page); }}
                    className="group/btn inline-flex items-center gap-1.5 font-body font-semibold text-[11.5px] uppercase tracking-[0.07em] text-brand-600 dark:text-brand-400 hover:text-brand-700 bg-transparent border-none p-0 cursor-pointer transition-colors duration-200"
                  >
                    Read More
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor" className="group-hover/btn:translate-x-0.5 transition-transform duration-200" aria-hidden>
                      <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
                      <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
                    </svg>
                  </button>
                  <span className="font-body text-[10.5px] font-medium text-surface-400 dark:text-surface-500 select-none">100% Pure</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
