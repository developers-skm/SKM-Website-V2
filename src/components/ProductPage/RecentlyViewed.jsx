import { motion, useReducedMotion } from 'framer-motion';
import { EASE_PREMIUM, DURATION, STAGGER } from '../../utils/motionTokens';

// Shows up to 2 products the visitor looked at most recently (see
// utils/recentlyViewed.js). Renders nothing when there is no history.
export default function RecentlyViewed({ products, onPageChange }) {
  const reduceMotion = useReducedMotion();
  if (!products || products.length === 0) return null;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 max-w-2xl">
        <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600">
          <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
          Pick Up Where You Left Off
        </span>
        <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
          Recently Viewed
        </h2>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : STAGGER } } }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
      >
        {products.map((product) => (
          <motion.button
            key={product.id}
            type="button"
            onClick={() => onPageChange(product.page)}
            variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: DURATION.cardHover, ease: EASE_PREMIUM }}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            className="group flex flex-col sm:flex-row overflow-hidden rounded-[22px] border border-surface-200/60 bg-white text-left cursor-pointer transition-[box-shadow,border-color] duration-300 hover:shadow-[0_16px_40px_rgba(36,30,24,0.09)] hover:border-gold-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <span
              className={`relative block w-full sm:w-[42%] aspect-[4/3] sm:aspect-auto sm:min-h-[200px] flex-shrink-0 overflow-hidden ${
                product.imageFit === 'contain' ? 'bg-surface-50' : ''
              }`}
            >
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className={`absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-[1.03] ${
                  product.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'
                }`}
              />
            </span>
            <span className="flex flex-col gap-3 px-5 py-6 min-w-0">
              <span className="font-heading font-bold text-[17px] text-heading leading-tight">
                {product.title}
              </span>
              {product.shortDescription && (
                <span className="font-body text-[13.5px] text-surface-600 leading-[1.6] line-clamp-4">
                  {product.shortDescription}
                </span>
              )}
              <span className="mt-1 inline-flex items-center gap-1.5 font-body font-bold text-[12px] uppercase tracking-[0.05em] text-brand-600 group-hover:text-[#a80000]">
                View Product
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
