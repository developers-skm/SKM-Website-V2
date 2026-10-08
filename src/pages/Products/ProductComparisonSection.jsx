import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import InternalLink from '../../components/common/InternalLink';
import products, { PRODUCT_CATEGORIES } from '../../data/products';
import { getVariantsForProduct } from '../../data/productVariants';
import { EASE_PREMIUM, fadeUp } from '../../utils/motionTokens';
import VariantCompareModal from '../../components/ProductPage/VariantCompareModal';

// Customized Mix / Customized Packages are made to order, so there is
// nothing to compare side by side - every other product is selectable.
const EXCLUDED_IDS = new Set(['customized_mix', 'customized_packages']);
const COMPARABLE_PRODUCTS = products.filter((p) => !EXCLUDED_IDS.has(p.id));
const CATEGORY_ORDER = [PRODUCT_CATEGORIES.POWDERS, PRODUCT_CATEGORIES.LIQUIDS, PRODUCT_CATEGORIES.SPECIALITY];

// Liquid variant codes carry a storage suffix (e.g. "W1301_Chilled") that
// the product pages strip for display - same rule here.
const displayCode = (code) => code.replace('_Chilled', '').replace('_Frozen', '');

const TH = 'text-left font-body font-semibold text-[12.5px] uppercase tracking-wide text-surface-400 border-b border-surface-200/70 py-3 pr-4 whitespace-nowrap';
const TD = 'font-body text-[14px] text-surface-600 border-b border-surface-200/70 py-3 pr-4';

function ChevronIcon({ open }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      className={`flex-shrink-0 text-surface-400 transition-transform duration-300 ${open ? 'rotate-180 text-gold-600' : ''}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ProductThumb({ product, size }) {
  return (
    <img
      src={product.image}
      alt=""
      loading="lazy"
      className="rounded-xl object-cover flex-shrink-0 bg-surface-100"
      style={{ width: size, height: size }}
    />
  );
}

// Custom listbox (not a native <select>) so each option can show the
// product photo, category and variant count.
function ProductDropdown({ selectedId, onSelect }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const groups = useMemo(
    () =>
      CATEGORY_ORDER.map((category) => ({
        category,
        items: COMPARABLE_PRODUCTS.filter((p) => p.category === category),
      })).filter((g) => g.items.length > 0),
    []
  );
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const selected = flat.find((p) => p.id === selectedId) ?? null;

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const openList = () => {
    setActiveIndex(Math.max(0, flat.findIndex((p) => p.id === selectedId)));
    setOpen(true);
  };

  const choose = (product) => {
    onSelect(product.id);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        openList();
        return;
      }
      const delta = e.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((i) => (i + delta + flat.length) % flat.length);
    } else if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault();
      choose(flat[activeIndex]);
    }
  };

  return (
    <div ref={rootRef} className="relative w-full max-w-[520px]" onKeyDown={onKeyDown}>
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openList())}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="comparison-product-list"
        className={`w-full flex items-center gap-3.5 min-h-[64px] pl-3 pr-5 py-2.5 rounded-2xl bg-white border text-left cursor-pointer transition-all duration-[260ms] focus:outline-none focus-gold ${
          open
            ? 'border-gold-500 shadow-[0_12px_32px_rgba(232,182,74,0.22)]'
            : 'border-surface-200 shadow-[0_2px_10px_rgba(36,30,24,0.05)] hover:border-gold-500/60 hover:shadow-[0_8px_22px_rgba(36,30,24,0.08)]'
        }`}
      >
        {selected ? (
          <ProductThumb product={selected} size={44} />
        ) : (
          <span className="w-11 h-11 rounded-xl bg-gold-500/15 text-gold-600 flex items-center justify-center flex-shrink-0" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </span>
        )}
        <span className="flex flex-col min-w-0 flex-1">
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-surface-400">
            {selected ? selected.category : 'Product'}
          </span>
          <span className={`font-heading font-bold text-[16px] truncate ${selected ? 'text-heading' : 'text-surface-500'}`}>
            {selected ? selected.title : 'Select a product to compare'}
          </span>
        </span>
        <ChevronIcon open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="comparison-product-list"
            role="listbox"
            aria-label="Products"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: EASE_PREMIUM }}
            data-lenis-prevent
            className="absolute z-30 left-0 right-0 top-full mt-2 max-h-[420px] overflow-y-auto rounded-2xl bg-white border border-surface-200/80 shadow-[0_24px_60px_rgba(36,30,24,0.18)] p-2"
          >
            {groups.map((group) => (
              <div key={group.category} role="group" aria-label={group.category} className="flex flex-col">
                <span className="px-3 pt-3 pb-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-surface-400">
                  {group.category}
                </span>
                {group.items.map((product) => {
                  const index = flat.indexOf(product);
                  const isSelected = product.id === selectedId;
                  const isActive = index === activeIndex;
                  const variantCount = getVariantsForProduct(product.id).length;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => choose(product)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left cursor-pointer transition-colors duration-150 focus:outline-none ${
                        isSelected ? 'bg-gold-500/15' : isActive ? 'bg-surface-50' : 'bg-transparent'
                      }`}
                    >
                      <ProductThumb product={product} size={40} />
                      <span className="flex flex-col min-w-0 flex-1">
                        <span className="font-heading font-semibold text-[14.5px] text-heading truncate">{product.title}</span>
                        <span className="font-body text-[12.5px] text-surface-500">
                          {variantCount > 0 ? `${variantCount} variants` : 'Product overview'}
                        </span>
                      </span>
                      {isSelected && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-gold-600 flex-shrink-0">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ComparisonTable({ product, onPageChange, reduceMotion }) {
  const variants = getVariantsForProduct(product.id);
  const specColumns = useMemo(() => {
    const keys = new Set();
    variants.forEach((v) => Object.keys(v.specifications ?? {}).forEach((k) => keys.add(k)));
    return Array.from(keys);
  }, [variants]);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [checked, setChecked] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const toggleChecked = (code) => {
    setChecked((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
  };
  const compared = variants.filter((v) => checked.includes(v.code));

  const detailsLink = (
    <InternalLink
      route={product.page}
      onPageChange={onPageChange}
      className="group/link inline-flex items-center gap-1 font-body font-semibold text-[13.5px] text-brand-600 hover:text-brand-700 focus:outline-none focus-gold rounded-sm whitespace-nowrap"
    >
      View Details
      <span className="inline-block transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-[5px]" aria-hidden="true">→</span>
    </InternalLink>
  );

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: EASE_PREMIUM }}
      className="flex flex-col gap-3"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-heading font-bold text-[22px] text-heading m-0">{product.title}</h3>
        <span className="font-body text-[13px] text-surface-500">
          {variants.length > 0 ? `${variants.length} variants compared side by side` : product.category}
        </span>
      </div>

      {variants.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 min-h-[40px]">
          <span className="font-body text-[13px] text-surface-500">
            {checked.length === 0 ? 'Tick variants to compare them in detail.' : `${checked.length} selected`}
          </span>
          {checked.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setCompareOpen(true)}
                disabled={checked.length < 2}
                className="inline-flex items-center min-h-[40px] bg-brand-600 hover:bg-[#a80000] disabled:opacity-50 disabled:cursor-not-allowed text-white font-heading font-bold text-[12px] uppercase tracking-[0.05em] px-5 py-2 rounded-full transition-colors duration-300 cursor-pointer whitespace-nowrap"
              >
                Compare Selected ({checked.length})
              </button>
              <button
                type="button"
                onClick={() => setChecked([])}
                className="font-body font-semibold text-[13px] text-brand-600 hover:underline bg-transparent border-none cursor-pointer"
              >
                Clear
              </button>
              {checked.length < 2 && <span className="font-body text-[12px] text-surface-400">Select at least 2 variants</span>}
            </>
          )}
        </div>
      )}

      {createPortal(
        <AnimatePresence>
          {compareOpen && compared.length > 1 && (
            <VariantCompareModal variants={compared} displayCode={displayCode} onClose={() => setCompareOpen(false)} />
          )}
        </AnimatePresence>,
        document.body
      )}

      <div className="relative">
        <div
          data-lenis-prevent
          onScroll={(e) => {
            if (!hasScrolled && e.currentTarget.scrollLeft > 12) setHasScrolled(true);
          }}
          className="overflow-x-auto"
        >
          {variants.length > 0 ? (
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr>
                  <th className={`sticky left-0 z-20 bg-white ${TH} shadow-[2px_0_6px_-2px_rgba(20,16,12,0.08)]`}>
                    <span className="inline-flex items-center gap-3">
                      <span className="w-4 h-4" aria-hidden="true" />
                      Code
                    </span>
                  </th>
                  <th className={TH}>Name</th>
                  {specColumns.map((key) => (
                    <th key={key} className={TH}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {variants.map((variant, index) => (
                  <motion.tr
                    key={variant.code}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: EASE_PREMIUM, delay: reduceMotion ? 0 : Math.min(index, 8) * 0.05 }}
                    className="group/row transition-colors duration-[260ms] hover:bg-gold-500/[0.08]"
                  >
                    <td className={`sticky left-0 z-10 font-mono font-bold text-[12.5px] text-brand-600 whitespace-nowrap border-b border-surface-200/70 py-3 pr-4 shadow-[2px_0_6px_-2px_rgba(20,16,12,0.08)] group-hover/row:bg-[#fdf6e8] ${checked.includes(variant.code) ? 'bg-[#fdf6e8]' : 'bg-white'}`}>
                      <label className="inline-flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked.includes(variant.code)}
                          onChange={() => toggleChecked(variant.code)}
                          aria-label={`Select ${variant.name} for comparison`}
                          className="w-4 h-4 accent-brand-600 cursor-pointer"
                        />
                        {displayCode(variant.code)}
                      </label>
                    </td>
                    <td className={`${TD} min-w-[200px]`}>
                      <InternalLink
                        route={product.page}
                        onPageChange={onPageChange}
                        className="font-heading font-semibold text-[14.5px] text-heading hover:text-brand-600 hover:underline focus:outline-none focus-gold rounded-sm"
                      >
                        {variant.name}
                      </InternalLink>
                    </td>
                    {specColumns.map((key) => (
                      <td key={key} className={`${TD} whitespace-nowrap`}>{variant.specifications?.[key] ?? '—'}</td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full border-collapse min-w-[560px]">
              <thead>
                <tr>
                  <th className={TH}>Product</th>
                  <th className={TH}>Category</th>
                  <th className={TH}>Packaging Options</th>
                  <th className={TH}>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gold-500/[0.08] transition-colors duration-[260ms]">
                  <td className={`${TD} font-semibold text-[14.5px] text-heading`}>{product.title}</td>
                  <td className={TD}>{product.category}</td>
                  <td className={TD}>{product.packagingOptions.join(', ')}</td>
                  <td className="border-b border-surface-200/70 py-3">{detailsLink}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <AnimatePresence>
          {!hasScrolled && variants.length > 0 && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.3 }}
              className="lg:hidden pointer-events-none absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white from-30% via-white/70 to-transparent flex items-center justify-end pr-3"
              aria-hidden="true"
            >
              <motion.svg
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="text-brand-600"
                animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path d="M9 6l6 6-6 6" />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {variants.length > 0 && <div className="pt-1">{detailsLink}</div>}
    </motion.div>
  );
}

// Section 5 - Product comparison. A product dropdown (9 comparable
// products) drives the table below: pick a product and its variants are
// shown side by side with their real specifications. Speciality products
// have no variant data, so they show their overview row instead.
export default function ProductComparisonSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState(null);
  const selectedProduct = COMPARABLE_PRODUCTS.find((p) => p.id === selectedId) ?? null;

  return (
    <div id="product-comparison" className="w-full py-[60px] lg:py-[85px] bg-white scroll-mt-[100px] xl:scroll-mt-[120px]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-6">
        <motion.h2
          {...fadeUp(reduceMotion, { duration: 0.85, distance: 36 })}
          className="font-heading font-bold text-[32px] sm:text-[38px] lg:text-[42px] text-heading leading-[1.1] tracking-tight m-0"
        >
          Product comparison
        </motion.h2>

        <p className="font-body text-[15px] text-surface-500 m-0">
          Compare our product variants side by side within each product category to evaluate their specifications and identify the option that best meets your specific requirements.
        </p>

        <ProductDropdown selectedId={selectedId} onSelect={setSelectedId} />

        <AnimatePresence mode="wait" initial={false}>
          {selectedProduct && (
            <ComparisonTable key={selectedProduct.id} product={selectedProduct} onPageChange={onPageChange} reduceMotion={reduceMotion} />
          )}
        </AnimatePresence>

        <motion.div
          {...fadeUp(reduceMotion, { duration: 0.7, distance: 20, delay: reduceMotion ? 0 : 0.1 })}
          className="flex flex-wrap items-center gap-4 mt-1"
        >
          <InternalLink
            route="get-quote"
            onPageChange={onPageChange}
            className="group/link2 inline-flex items-center gap-2 min-h-[44px] px-2 font-body font-semibold text-[15px] text-brand-600 hover:text-brand-700 focus:outline-none focus-gold rounded-sm"
          >
            Request Technical Recommendation
            <span className="inline-block transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link2:translate-x-[5px]" aria-hidden="true">→</span>
          </InternalLink>
        </motion.div>
      </div>
    </div>
  );
}
