import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import ScrollFrameSequence from '../../components/common/ScrollFrameSequence';
import { scrollToSectionId } from '../../components/Navbar/useProductDiscoveryNavigation';
import products, { PRODUCT_CATEGORIES, getProductById } from '../../data/products';
import { getBrochureUrl } from '../../data/brochureUrl';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';
import { EASE_PREMIUM, DURATION, fadeUp, cardRise } from '../../utils/motionTokens';

const ProductListPdf = getBrochureUrl('Product List - SKM Egg Products Export India Limited.pdf');

// Products Hub — real, data-backed sections only. Fields with no genuine
// per-product data anywhere in the repo (function/application tags, product
// codes, shelf-life values, technical data sheets, application/packaging
// guides) are omitted rather than invented, per this session's standing
// no-invented-content rule. See per-section notes below.

const CATEGORY_OPTIONS = Object.values(PRODUCT_CATEGORIES);

// Packaging options — real, taken directly from products.js, and scoped to
// whichever Format is currently selected: Egg Powders only ever shows its
// own real packaging set (20kg, 25kg, Bag-in-Box), Liquid Eggs shows its
// own (1kg, 5kg, 20kg), etc. — never a flat, mixed list of every product's
// packaging regardless of format. When no format is selected, every real
// packaging value across all products is shown (nothing to narrow by yet).
function getPackagingOptionsForCategory(category) {
  const scoped = category ? products.filter((p) => p.category === category) : products;
  return Array.from(new Set(scoped.flatMap((p) => p.packagingOptions))).sort();
}

// Groups a category's flat packagingOptions (e.g. ["20kg", "25kg",
// "Bag-in-Box"]) into a single display tag per real container-type label,
// with each weight value nested as its own filterable sub-pill — e.g. one
// "Bag-in-Box (20 kg) (25 kg)" tag instead of 3 separate flat pills. Values
// with no weight-style siblings (e.g. "Custom") render as a standalone tag.
//
// products.js itself only stores weights for Egg Powders (Bag-in-Box) and
// Liquid Eggs (Bag (LDPE)) — the real container-type names live in each
// category's dedicated packaging page (CategoryPage.jsx / packagingData in
// CustomizedPackagesPage.jsx), not as a field on the product record. This
// map surfaces those same real, verified type names rather than fabricating
// one — e.g. Liquid Eggs is genuinely "Bag (LDPE)" per CustomizedPackagesPage
// packagingData, never "Bag-in-Box" (that name is real only for powders).
// Speciality Products has no single documented container-type shared across
// its 2 products (Speciality Liquid Blends, Egg White Cube), so it's
// intentionally absent here and falls through to flat weight pills.
const CATEGORY_PACKAGING_LABEL = {
  [PRODUCT_CATEGORIES.POWDERS]: 'Bag-in-Box',
  [PRODUCT_CATEGORIES.LIQUIDS]: 'Bag (LDPE)',
};

const SIZE_PATTERN = /^\d+(\.\d+)?(kg|g|ml|l)$/i;

// Formats any real per-product/category packagingOptions value (kg, g, mL,
// L) into its display form — e.g. "20kg" -> "20 kg", "250ML" -> "250 ML".
function formatSizeLabel(value) {
  const match = value.match(/^(\d+(?:\.\d+)?)(kg|g|ml|l)$/i);
  if (!match) return value;
  const [, amount, unit] = match;
  const unitDisplay = { kg: 'kg', g: 'g', ml: 'ML', l: 'L' }[unit.toLowerCase()];
  return `${amount} ${unitDisplay}`;
}

function groupPackagingOptions(options, category) {
  const weights = options.filter((o) => SIZE_PATTERN.test(o));
  const labels = options.filter((o) => !SIZE_PATTERN.test(o));

  if (!category) {
    // No format selected — weights and labels here are pooled across every
    // category's products, so there's no single real container-type they
    // can be coherently grouped under (grouping them would silently pair
    // weights from one product's category with an unrelated label from
    // another's). Render every real value as its own flat pill instead.
    return [...labels, ...weights].map((v) => ({
      key: v,
      label: SIZE_PATTERN.test(v) ? formatSizeLabel(v) : v,
      value: v,
      grouped: false,
    }));
  }

  const realLabel = CATEGORY_PACKAGING_LABEL[category];

  if (weights.length > 0 && realLabel && !labels.includes(realLabel)) {
    // Category has a verified real container-type name not already present
    // as one of its own packagingOptions values (Liquid Eggs: weights only).
    return [{ key: realLabel, label: realLabel, values: weights, grouped: true }];
  }

  if (labels.length === 0) {
    // No category-level label — group each of this category's products
    // under its own real title instead (e.g. Speciality Products has 2
    // dissimilar products, Speciality Liquid Blends in ML/L and Egg White
    // Cube in g, so a single flat/shared group would mix incompatible
    // units — group per real product instead).
    const scoped = products.filter((p) => p.category === category);
    return scoped
      .filter((p) => p.packagingOptions.some((o) => SIZE_PATTERN.test(o)))
      .map((p) => ({
        key: p.id,
        label: p.title,
        values: p.packagingOptions.filter((o) => SIZE_PATTERN.test(o)),
        grouped: true,
      }));
  }

  return labels.map((label) => ({
    key: label,
    label,
    values: weights.length > 0 ? weights : [label],
    grouped: true,
  }));
}

function FilterPill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[38px] px-4 py-2 rounded-full font-body font-semibold text-[13.5px] transition-all duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-gold ${
        active
          ? 'bg-gold-500 text-heading border border-transparent shadow-[0_2px_10px_rgba(232,182,74,0.35)]'
          : 'bg-white dark:bg-surface-900 border border-surface-200/70 dark:border-surface-800 text-surface-600 dark:text-surface-300 hover:border-gold-500/50 hover:text-heading dark:hover:text-white hover:-translate-y-px'
      }`}
    >
      <AnimatePresence initial={false}>
        {active && (
          <motion.svg
            initial={{ opacity: 0, scale: 0.6, width: 0 }}
            animate={{ opacity: 1, scale: 1, width: 11 }}
            exit={{ opacity: 0, scale: 0.6, width: 0 }}
            transition={{ duration: DURATION.buttonHover, ease: EASE_PREMIUM }}
            height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            className="text-heading"
          >
            <path d="M20 6L9 17l-5-5" />
          </motion.svg>
        )}
      </AnimatePresence>
      {children}
    </button>
  );
}

// Section 2 — SKM Product Finder. Live client-side filtering, no page
// reload. Filters: product format (category) and packaging option — the
// only two real, structured axes present in products.js. "Application" and
// "function" filters from the brief have no per-product data source and are
// intentionally not included.
function ProductFinder({ onPageChange, compareList, setCompareList }) {
  const [category, setCategory] = useState(null);
  const [packaging, setPackaging] = useState(null);
  const reduceMotion = useReducedMotion();

  const packagingOptions = useMemo(() => getPackagingOptionsForCategory(category), [category]);
  const packagingGroups = useMemo(() => groupPackagingOptions(packagingOptions, category), [packagingOptions, category]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (packaging && !p.packagingOptions.includes(packaging)) return false;
      return true;
    });
  }, [category, packaging]);

  // Selecting a different Format re-scopes the Packaging pills to that
  // format's own real options — if the currently-selected packaging value
  // doesn't exist for the newly selected format, clear it rather than leave
  // a stale filter silently applied (e.g. "Bag-in-Box" selected, then
  // switching from Egg Powders to Speciality Products, which has no
  // Bag-in-Box option).
  const handleCategoryChange = (nextCategory) => {
    setCategory(nextCategory);
    if (packaging && !getPackagingOptionsForCategory(nextCategory).includes(packaging)) {
      setPackaging(null);
    }
  };

  const clearFilters = () => {
    setCategory(null);
    setPackaging(null);
  };

  const toggleCompare = (id) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div
      id="product-finder"
      className="relative w-full py-[64px] lg:py-[92px] scroll-mt-[100px] xl:scroll-mt-[120px] overflow-hidden"
      style={{
        background:
          'radial-gradient(120% 140% at 15% 0%, rgba(232,182,74,0.06) 0%, rgba(232,182,74,0) 45%), #ffffff',
      }}
    >
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-9 lg:gap-11">
        <motion.div
          {...fadeUp(reduceMotion, { duration: 0.85, distance: 38 })}
          className="flex flex-col gap-2.5"
        >
          <span className="font-body text-[11.5px] font-semibold uppercase tracking-[0.14em] text-gold-600 dark:text-gold-400">
            Find Your Product
          </span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[36px] lg:text-[40px] text-heading dark:text-white leading-[1.12] tracking-[-0.01em] m-0">
            SKM Product Finder
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp(reduceMotion, { duration: 0.8, distance: 28, delay: reduceMotion ? 0 : 0.14 })}
          className="flex flex-col gap-7 p-6 sm:p-8 rounded-[20px] border border-surface-200/60 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-[0_1px_2px_rgba(20,16,12,0.04),0_16px_40px_-16px_rgba(20,16,12,0.10)] transition-shadow duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_1px_2px_rgba(20,16,12,0.05),0_22px_50px_-18px_rgba(20,16,12,0.14)]"
        >
          <div className="flex flex-col gap-3">
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-surface-400 dark:text-surface-500">Format</span>
            <div className="inline-flex flex-wrap gap-1 p-1.5 rounded-full bg-white dark:bg-surface-900 border border-surface-200/60 dark:border-surface-800 w-fit">
              {CATEGORY_OPTIONS.map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCategoryChange(active ? null : c)}
                    aria-pressed={active}
                    className="relative px-4 py-2 rounded-full font-body font-semibold text-[13.5px] transition-colors duration-[220ms] focus:outline-none focus-gold"
                  >
                    {active && (
                      <motion.span
                        layoutId="format-active-pill"
                        className="absolute inset-0 rounded-full bg-gold-500"
                        transition={reduceMotion ? { duration: 0.01 } : { duration: 0.32, ease: EASE_PREMIUM }}
                      />
                    )}
                    <span className={`relative z-10 transition-colors duration-200 ${active ? 'text-heading' : 'text-surface-600 dark:text-surface-300'}`}>{c}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-surface-400 dark:text-surface-500">Packaging</span>
            <div className="flex flex-wrap items-center gap-2">
              {packagingGroups.map((group) =>
                group.grouped ? (
                  <div
                    key={group.key}
                    className="inline-flex items-center gap-1 rounded-2xl border border-surface-200/50 dark:border-surface-800 bg-surface-50/70 dark:bg-surface-800/30 pl-4 pr-1.5 py-1.5"
                  >
                    <span className="font-body font-semibold text-[12.5px] text-surface-500 dark:text-surface-400 mr-1 whitespace-nowrap">
                      {group.label}
                    </span>
                    {group.values.map((value) => {
                      const active = packaging === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setPackaging(active ? null : value)}
                          aria-pressed={active}
                          className={`inline-flex items-center min-h-[44px] sm:min-h-[28px] px-2.5 py-1 rounded-lg font-body font-semibold text-[12px] transition-all duration-[220ms] focus:outline-none focus-gold ${
                            active
                              ? 'bg-gold-500 text-heading shadow-sm'
                              : 'bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-300 hover:bg-gold-500/10 dark:hover:bg-gold-500/10'
                          }`}
                        >
                          {value === group.label ? value : `(${formatSizeLabel(value)})`}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <FilterPill key={group.key} active={packaging === group.value} onClick={() => setPackaging(packaging === group.value ? null : group.value)}>
                    {group.label}
                  </FilterPill>
                )
              )}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {(category || packaging) && (
              <motion.button
                type="button"
                onClick={clearFilters}
                initial={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: EASE_PREMIUM }}
                className="self-start inline-flex items-center gap-1.5 font-body font-semibold text-[13px] text-surface-500 dark:text-surface-400 hover:text-heading dark:hover:text-white focus:outline-none focus-gold rounded-sm w-fit"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Clear Filters
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-surface-300 dark:bg-surface-700" aria-hidden="true" />
          <p className="font-body text-[13px] text-surface-500 dark:text-surface-400 m-0 tracking-wide" aria-live="polite">
            {filtered.length} of {products.length} products
          </p>
        </div>

        <motion.div layout={!reduceMotion} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          <AnimatePresence initial={false} mode="popLayout">
            {filtered.map((product, index) => (
              <motion.div
                key={product.id}
                layout={!reduceMotion}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 22, scale: reduceMotion ? 1 : 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : 10, scale: reduceMotion ? 1 : 0.985 }}
                transition={{
                  duration: reduceMotion ? 0.01 : 0.55,
                  ease: EASE_PREMIUM,
                  delay: reduceMotion ? 0 : Math.min(index, 8) * 0.05,
                }}
                whileHover={reduceMotion ? undefined : { y: -7, transition: { duration: 0.4, ease: EASE_PREMIUM } }}
                whileTap={reduceMotion ? undefined : { y: -4, scale: 0.99 }}
                className="group relative flex flex-col gap-3.5 p-5 sm:p-6 rounded-[14px] border border-surface-200/70 dark:border-surface-800 bg-white dark:bg-surface-900 transition-[border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold-500/60 hover:shadow-[0_26px_50px_-18px_rgba(20,16,12,0.2)] focus-within:border-gold-500/60"
              >
                <span
                  className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full bg-gold-500 scale-y-0 origin-center transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <div className="w-full aspect-[4/3] overflow-hidden rounded-[9px] bg-surface-50 dark:bg-surface-800/60">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                </div>
                <span className="font-heading font-bold text-[16.5px] text-heading dark:text-white tracking-[-0.005em]">{product.title}</span>
                <span className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 leading-[1.55]">{product.shortDescription}</span>
                <div className="flex items-center gap-4 mt-1 pt-1">
                  <InternalLink
                    route={product.page}
                    onPageChange={onPageChange}
                    className="inline-flex items-center gap-1 font-body font-semibold text-[13.5px] text-heading dark:text-white hover:text-gold-600 dark:hover:text-gold-400 focus:outline-none focus-gold rounded-sm transition-colors duration-200"
                  >
                    View Product Details
                    <span className="inline-block transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[7px]" aria-hidden="true">→</span>
                  </InternalLink>
                  <button
                    type="button"
                    onClick={() => toggleCompare(product.id)}
                    aria-pressed={compareList.includes(product.id)}
                    className={`font-body font-semibold text-[13px] transition-colors duration-200 focus:outline-none focus-gold rounded-sm ${
                      compareList.includes(product.id) ? 'text-gold-600 dark:text-gold-400 underline' : 'text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300 hover:underline'
                    }`}
                  >
                    {compareList.includes(product.id) ? 'Added to Comparison' : 'Add to Comparison'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// Section 3 — Product families. Real disclosure-per-category pattern
// (matching ProductFamilies.jsx on Home), covering all products via their
// real categories. "Egg White Cube" and "Speciality Liquid Blends" both
// live under PRODUCT_CATEGORIES.SPECIALITY — the brief's separate "Egg
// White Cube" and "Packaging solutions" categories are represented via the
// same real SPECIALITY/CUSTOMIZED groupings rather than invented new ones.
const familyGroups = [
  { id: 'powders', label: 'Egg Powders', category: PRODUCT_CATEGORIES.POWDERS, ctaLabel: 'View Egg Powder Range', categoryRoute: 'category_powders' },
  { id: 'liquids', label: 'Liquid Eggs', category: PRODUCT_CATEGORIES.LIQUIDS, ctaLabel: 'View Liquid Egg Range', categoryRoute: 'category_liquids' },
  { id: 'speciality', label: 'Speciality Products', category: PRODUCT_CATEGORIES.SPECIALITY, ctaLabel: 'Explore Specialty Products', categoryRoute: 'category_custom' },
  { id: 'customized', label: 'Customized Solutions', category: PRODUCT_CATEGORIES.CUSTOMIZED, ctaLabel: 'Explore Custom Solutions', categoryRoute: 'category_custom' },
];

function FamilyGroupBlock({ group, onPageChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const groupProducts = products.filter((p) => p.category === group.category);
  const listId = `hub-family-${group.id}-products`;

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -8 }}
      whileTap={reduceMotion ? undefined : { y: -5, scale: 0.99 }}
      transition={{ duration: 0.42, ease: EASE_PREMIUM }}
      className="group/card flex flex-col p-7 rounded-[16px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900 shadow-[0_1px_2px_rgba(20,16,12,0.03)] transition-[border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold-500/60 hover:shadow-[0_24px_48px_-20px_rgba(20,16,12,0.18)]"
    >
      <h3 className="font-heading font-bold text-[19px] sm:text-[20px] text-heading dark:text-white leading-[1.2] tracking-[-0.01em] m-0 transition-colors duration-300 group-hover/card:text-heading dark:group-hover/card:text-white">
        {group.label}
      </h3>
      <p className="font-body text-[13px] text-surface-400 dark:text-surface-500 mt-2 mb-5 tracking-[0.01em]">
        {groupProducts.length} product{groupProducts.length === 1 ? '' : 's'}
      </p>

      <InternalLink
        route={group.categoryRoute}
        onPageChange={onPageChange}
        className="group/cta inline-flex items-center gap-1.5 font-body font-semibold text-[14px] text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 self-start focus:outline-none focus-gold rounded-sm mb-3"
      >
        {group.ctaLabel}
        <span className="inline-block transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-1" aria-hidden="true">→</span>
      </InternalLink>

      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={listId}
        onClick={() => setIsExpanded((prev) => !prev)}
        className="group inline-flex items-center gap-2 font-body font-semibold text-[12.5px] uppercase tracking-[0.06em] text-surface-400 dark:text-surface-500 hover:text-brand-600 dark:hover:text-brand-400 bg-transparent border-none p-0 cursor-pointer self-start focus:outline-none focus-gold rounded-sm transition-colors duration-200"
      >
        {isExpanded ? 'Hide products' : 'Show products'}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded ? 'rotate-180' : ''}`} aria-hidden>
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.ul
            id={listId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: EASE_PREMIUM }}
            className="flex flex-col overflow-hidden list-none m-0 p-0 mt-4"
          >
            {groupProducts.map((product) => (
              <li key={product.id} className="border-t border-surface-200/70 dark:border-surface-800 first:border-t-0">
                <InternalLink
                  route={product.page}
                  onPageChange={onPageChange}
                  className="block py-2.5 font-body text-[14px] text-surface-700 dark:text-surface-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-150 focus:outline-none focus-gold rounded-sm"
                >
                  {product.title}
                </InternalLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProductFamiliesSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  return (
    <div id="product-families" className="w-full py-[68px] lg:py-[96px] bg-white dark:bg-surface-900/40 scroll-mt-[100px] xl:scroll-mt-[120px]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10 lg:gap-12">
        <motion.div
          {...fadeUp(reduceMotion, { duration: 0.9, distance: 40 })}
          className="flex flex-col gap-2.5"
        >
          <span className="font-body text-[11.5px] font-semibold uppercase tracking-[0.14em] text-gold-600 dark:text-gold-400">
            Our Portfolio
          </span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[38px] lg:text-[42px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Product families
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {familyGroups.map((group, index) => (
            <motion.div key={group.id} {...cardRise(reduceMotion, { index, distance: 36, stagger: 0.09, delay: 0.2, duration: 0.85 })}>
              <FamilyGroupBlock group={group} onPageChange={onPageChange} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Section 4 — Browse by functional requirement. No product in products.js
// carries a structured "function" tag (foaming, emulsification, gelling,
// etc.) — that taxonomy exists only as free-text `benefits` on individual
// product-detail pages, not as filterable per-product data here. Per the
// audit-before-build rule, this section is not fabricated with invented
// function-to-product mappings; it's presented as a genuinely upcoming
// capability instead of fake filters.
function FunctionalRequirementSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  return (
    <div id="functional-requirement" className="w-full py-[64px] lg:py-[92px] scroll-mt-[100px] xl:scroll-mt-[120px]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-7">
        <motion.h2
          {...fadeUp(reduceMotion, { duration: 0.9, distance: 40 })}
          className="font-heading font-bold text-[32px] sm:text-[38px] lg:text-[42px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
        >
          Browse by functional requirement
        </motion.h2>
        <motion.p
          {...fadeUp(reduceMotion, { duration: 0.8, distance: 24, delay: reduceMotion ? 0 : 0.13 })}
          className="font-body text-[15px] lg:text-[16px] text-surface-500 dark:text-surface-400 leading-[1.6] max-w-2xl m-0"
        >
          Function-based browsing (foaming, emulsification, gelling, colour development, and more) is coming soon. In the meantime, our team can match a product to your functional requirement directly.
        </motion.p>
        <motion.div
          {...fadeUp(reduceMotion, { duration: 0.85, distance: 30, delay: reduceMotion ? 0 : 0.24 })}
          className="flex flex-wrap items-center gap-4 mt-1"
        >
          <button
            type="button"
            disabled
            title="Coming soon"
            aria-disabled="true"
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-surface-300 dark:border-surface-700 text-surface-400 dark:text-surface-600 font-body font-semibold text-[15px] cursor-not-allowed opacity-60"
          >
            View Foaming Solutions
          </button>
          <button
            type="button"
            disabled
            title="Coming soon"
            aria-disabled="true"
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-surface-300 dark:border-surface-700 text-surface-400 dark:text-surface-600 font-body font-semibold text-[15px] cursor-not-allowed opacity-60"
          >
            View Emulsification Solutions
          </button>
          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[15px] transition-all duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(228,10,24,0.28)] active:translate-y-0 active:scale-[0.98] active:shadow-none focus:outline-none focus-gold"
          >
            Discuss a Functional Challenge
          </InternalLink>
        </motion.div>
      </div>
    </div>
  );
}

// Section 5 — Product comparison table. Only real, shared columns: Product,
// Category, Packaging options. The brief's "product code," "shelf life,"
// and "available documents" columns have no data source anywhere in the
// repo and are omitted, not invented. "Download Comparison" has no real
// export mechanism and stays a genuinely disabled button; "Request
// Technical Recommendation" routes to the real get-quote flow.
function ComparisonSection({ compareList, onPageChange }) {
  const compared = compareList.map(getProductById).filter(Boolean);
  const reduceMotion = useReducedMotion();

  return (
    <div id="product-comparison" className="w-full py-[60px] lg:py-[85px] dark:border-surface-800/40 bg-white dark:bg-surface-900/40 scroll-mt-[100px] xl:scroll-mt-[120px]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-6">
        <motion.h2
          {...fadeUp(reduceMotion, { duration: 0.85, distance: 36 })}
          className="font-heading font-bold text-[32px] sm:text-[38px] lg:text-[42px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
        >
          Product comparison
        </motion.h2>

        <AnimatePresence mode="wait" initial={false}>
          {compared.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : DURATION.fast }}
              className="font-body text-[15px] text-surface-500 dark:text-surface-400 m-0"
            >
              Use "Add to Comparison" in the Product Finder above to compare products side by side.
            </motion.p>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 40, scale: reduceMotion ? 1 : 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.85, ease: EASE_PREMIUM }}
              className="overflow-x-auto"
            >
              <table className="w-full border-collapse min-w-[560px]">
                <thead>
                  <tr>
                    <th className="text-left font-body font-semibold text-[12.5px] uppercase tracking-wide text-surface-400 dark:text-surface-500 border-b border-surface-200/70 dark:border-surface-800 py-3 pr-4">Product</th>
                    <th className="text-left font-body font-semibold text-[12.5px] uppercase tracking-wide text-surface-400 dark:text-surface-500 border-b border-surface-200/70 dark:border-surface-800 py-3 pr-4">Category</th>
                    <th className="text-left font-body font-semibold text-[12.5px] uppercase tracking-wide text-surface-400 dark:text-surface-500 border-b border-surface-200/70 dark:border-surface-800 py-3 pr-4">Packaging Options</th>
                    <th className="text-left font-body font-semibold text-[12.5px] uppercase tracking-wide text-surface-400 dark:text-surface-500 border-b border-surface-200/70 dark:border-surface-800 py-3">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {compared.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: EASE_PREMIUM, delay: reduceMotion ? 0 : 0.15 + Math.min(index, 6) * 0.07 }}
                      className="transition-colors duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-gold-500/[0.08] dark:hover:bg-gold-500/[0.07]"
                    >
                      <td className="font-body font-semibold text-[14.5px] text-heading dark:text-white border-b border-surface-200/70 dark:border-surface-800 py-3 pr-4">{product.title}</td>
                      <td className="font-body text-[14px] text-surface-600 dark:text-surface-300 border-b border-surface-200/70 dark:border-surface-800 py-3 pr-4">{product.category}</td>
                      <td className="font-body text-[14px] text-surface-600 dark:text-surface-300 border-b border-surface-200/70 dark:border-surface-800 py-3 pr-4">{product.packagingOptions.join(', ')}</td>
                      <td className="border-b border-surface-200/70 dark:border-surface-800 py-3">
                        <InternalLink
                          route={product.page}
                          onPageChange={onPageChange}
                          className="group/link inline-flex items-center gap-1 font-body font-semibold text-[13.5px] text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 focus:outline-none focus-gold rounded-sm"
                        >
                          View Details
                          <span className="inline-block transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-[5px]" aria-hidden="true">→</span>
                        </InternalLink>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          {...fadeUp(reduceMotion, { duration: 0.7, distance: 20, delay: reduceMotion ? 0 : 0.1 })}
          className="flex flex-wrap items-center gap-4 mt-1"
        >
          <button
            type="button"
            disabled={compared.length === 0}
            title={compared.length === 0 ? 'Add products to compare first' : undefined}
            aria-disabled={compared.length === 0}
            className={`inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full font-body font-semibold text-[15px] transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-gold ${
              compared.length === 0
                ? 'border border-surface-300 dark:border-surface-700 text-surface-400 dark:text-surface-600 cursor-not-allowed opacity-60'
                : 'bg-brand-600 hover:bg-brand-700 text-white cursor-pointer hover:-translate-y-[3px] hover:shadow-[0_14px_28px_rgba(228,10,24,0.26)] active:translate-y-0 active:scale-[0.98] active:shadow-none'
            }`}
          >
            Compare Selected Products
          </button>
          <button
            type="button"
            disabled
            title="Coming soon"
            aria-disabled="true"
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-surface-300 dark:border-surface-700 text-surface-400 dark:text-surface-600 font-body font-semibold text-[15px] cursor-not-allowed opacity-60"
          >
            Download Comparison
          </button>
          <InternalLink
            route="get-quote"
            onPageChange={onPageChange}
            className="group/link2 inline-flex items-center gap-2 min-h-[44px] px-2 font-body font-semibold text-[15px] text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 focus:outline-none focus-gold rounded-sm"
          >
            Request Technical Recommendation
            <span className="inline-block transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link2:translate-x-[5px]" aria-hidden="true">→</span>
          </InternalLink>
        </motion.div>
      </div>
    </div>
  );
}

// Section 6 — Custom product support. Real routes: customized_mix,
// customized_packages both exist in products.js/App.jsx; contact-us is real.
function CustomSupportSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  return (
    <div id="custom-support" className="relative w-full py-[60px] lg:py-[85px] bg-white dark:bg-surface-900/40 scroll-mt-[100px] xl:scroll-mt-[120px] overflow-hidden">
      {!reduceMotion && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute -right-[10%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,182,74,0.10) 0%, rgba(232,182,74,0) 70%)' }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -left-[8%] bottom-0 w-[320px] h-[320px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)' }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>
      )}
      <motion.div
        {...fadeUp(reduceMotion, { duration: 0.85, distance: 34 })}
        className="relative mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-6"
      >
        <h2 className="font-heading font-bold text-[32px] sm:text-[38px] lg:text-[42px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
          Custom product support
        </h2>
        <p className="font-body text-[15px] lg:text-[16px] text-surface-500 dark:text-surface-400 max-w-2xl m-0">
          Need a formulation or packaging configuration built around your exact recipe? Our Customized Mix and Customized Packages ranges are engineered to your specification.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-1">
          <InternalLink
            route="customized_mix"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[15px] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[0_14px_28px_rgba(228,10,24,0.26)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-gold"
          >
            Develop a Custom Solution
          </InternalLink>
          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-body font-semibold text-[15px] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-gold"
          >
            Contact Technical Team
          </InternalLink>
        </div>
      </motion.div>
    </div>
  );
}

// Section 7 — Technical resources. Real destinations: the /resources page
// (product flyers + company profile via /brochure) and the real Product
// List PDF. Data sheets / application guides / packaging guide have no
// real files in the repo (only per-product flyers + one company profile +
// one product list exist under src/assets/Brouchers) and are not
// represented as separate fake downloads.
function TechnicalResourcesSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  return (
    <div id="technical-resources" className="w-full py-[60px] lg:py-[85px] bg-white dark:bg-surface-900/40 scroll-mt-[100px] xl:scroll-mt-[120px]">
      <motion.div
        {...fadeUp(reduceMotion, { duration: 0.85, distance: 34 })}
        className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-6"
      >
        <h2 className="font-heading font-bold text-[32px] sm:text-[38px] lg:text-[42px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
          Technical resources
        </h2>
        <p className="font-body text-[15px] lg:text-[16px] text-surface-500 dark:text-surface-400 max-w-2xl m-0">
          Product flyers, the full product portfolio, and our company profile — ready to view or download.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-1">
          <InternalLink
            route="resources"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[15px] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[0_14px_28px_rgba(228,10,24,0.26)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-gold"
          >
            Open Technical Library
          </InternalLink>
          <a
            href={ProductListPdf}
            download
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-body font-semibold text-[15px] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-gold"
          >
            Download Product Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProductsHubPage({ onPageChange, prefill }) {
  const reduceMotion = useReducedMotion();
  const [compareList, setCompareList] = useState([]);
  const heroScrubRef = useRef(null);

  // Mirrors Home.jsx's mount-aware scroll effect — Home's ProductFamilies
  // "Explore..." buttons navigate here with prefill.scrollTarget set to the
  // matching section id.
  useEffect(() => {
    if (prefill?.scrollTarget) {
      scrollToSectionId(prefill.scrollTarget);
    }
  }, [prefill]);

  return (
    <PageWrapper
      seo={{
        title: 'Egg Products | SKM Egg Products Catalogue',
        description: 'Browse SKM egg powders, liquid egg products, and customised solutions engineered for performance, consistency, and safety.',
        keywords: 'egg powder catalogue, liquid egg products, egg ingredient supplier, whole egg powder, whole egg liquid',
        canonical: 'https://www.skmegg.com/products',
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page dark:bg-surface-950">

        {/* Section 1 — Products hero. A premium entrance distinct from Home's
            center-out egg mask: the visual rises into place as a single
            unbroken image (a slow vertical reveal + gentle upward drift,
            like a blind lifting), while a thin gold line trails just above
            the image's leading edge and fades once the reveal settles.
            The background itself is a scroll-scrubbed frame sequence (egg
            transforming into egg powder) pinned for the scroll length of
            the wrapper below — same mechanism as Home's Hero. Copy keeps
            its own independent staggered entrance. */}
        <div ref={heroScrubRef} className="relative w-full h-[180vh]">
        <div className="sticky top-0 py-[70px] lg:py-[100px] border-b border-[#eee] dark:border-surface-800/40 text-center px-4 overflow-hidden">
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={reduceMotion ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: reduceMotion ? 0.01 : 1.2, ease: EASE_PREMIUM }}
          >
            <ScrollFrameSequence containerRef={heroScrubRef} basePath="/products-sequence" frameCount={200} />
          </motion.div>

          <div className="absolute inset-0 bg-black/15" aria-hidden="true" />

          {/* Thin gold line — trails the reveal's leading edge, then fades
              once the image has fully settled */}
          {!reduceMotion && (
            <motion.div
              className="absolute inset-x-0 h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, rgba(243,201,105,0) 0%, rgba(243,201,105,0.85) 50%, rgba(243,201,105,0) 100%)' }}
              initial={{ top: '100%', opacity: 1 }}
              animate={{ top: '0%', opacity: 0 }}
              transition={{
                top: { duration: 1.2, ease: EASE_PREMIUM },
                opacity: { duration: 1.5, delay: 0.3, ease: EASE_PREMIUM },
              }}
            />
          )}

          {/* Soft yolk-gold glow — settles upper-right once the reveal
              completes, echoing the site's warm accent without competing
              with the photo */}
          {!reduceMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none mix-blend-soft-light"
              style={{ background: 'radial-gradient(55% 50% at 84% 16%, rgba(232,182,74,0.45) 0%, rgba(232,182,74,0) 70%)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1, ease: EASE_PREMIUM }}
            />
          )}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1, delayChildren: reduceMotion ? 0 : 0.75 } } }}
            className="relative z-10 mx-auto max-w-[820px] flex flex-col items-center gap-6"
          >
            <motion.span
              variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 18 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: reduceMotion ? 0.01 : DURATION.fast, ease: EASE_PREMIUM }}
              className="section-label justify-center !text-white"
            >
              Products
            </motion.span>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 40 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: reduceMotion ? 0.01 : 0.9, ease: EASE_PREMIUM }}
              className="font-heading font-bold text-[36px] sm:text-[46px] lg:text-[52px] text-white leading-[1.15] tracking-tight m-0"
            >
              Egg Products Engineered for Performance, Consistency and Safety.
            </motion.h1>

            <motion.div
              variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 26 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-[640px] mt-2"
            >
              <button
                type="button"
                onClick={() => scrollToSectionId('product-families')}
                className="flex flex-col items-center gap-1.5 p-4 rounded-[16px] border border-white/20 bg-white/10 backdrop-blur-sm cursor-pointer hover:border-gold-400/70 hover:bg-white/15 hover:-translate-y-[3px] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] focus:outline-none focus-gold"
              >
                <span className="font-body font-semibold text-[13.5px] text-white">Browse by product format</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSectionId('product-finder')}
                className="flex flex-col items-center gap-1.5 p-4 rounded-[16px] border border-white/20 bg-white/10 backdrop-blur-sm cursor-pointer hover:border-gold-400/70 hover:bg-white/15 hover:-translate-y-[3px] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] focus:outline-none focus-gold"
              >
                <span className="font-body font-semibold text-[13.5px] text-white">Browse by packaging</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSectionId('functional-requirement')}
                className="flex flex-col items-center gap-1.5 p-4 rounded-[16px] border border-white/20 bg-white/10 backdrop-blur-sm cursor-pointer hover:border-gold-400/70 hover:bg-white/15 hover:-translate-y-[3px] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] focus:outline-none focus-gold"
              >
                <span className="font-body font-semibold text-[13.5px] text-white">Browse by functionality</span>
              </button>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-4"
            >
              <InternalLink
                route="whole_egg_powder"
                onPageChange={onPageChange}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(228,10,24,0.34)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-gold"
              >
                Browse Egg Powders
              </InternalLink>

              <InternalLink
                route="whole_egg_liquid"
                onPageChange={onPageChange}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white text-white hover:bg-white/20 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-gold"
              >
                Browse Liquid Eggs
              </InternalLink>

              <button
                type="button"
                onClick={() => scrollToSectionId('functional-requirement')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-white/40 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] hover:border-white/70 hover:-translate-y-[3px] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-0 active:scale-[0.98] cursor-pointer focus:outline-none focus-gold"
              >
                Find by Function
              </button>
            </motion.div>
          </motion.div>
        </div>
        </div>

        {/* Section 2 — SKM Product Finder */}
        <ProductFinder onPageChange={onPageChange} compareList={compareList} setCompareList={setCompareList} />
        <CurvedDivider bg="#fff" fill="#fff" className="dark:hidden" />
        <CurvedDivider bg="#121212" fill="#121212" className="hidden dark:block" />

        {/* Section 3 — Product families */}
        <ProductFamiliesSection onPageChange={onPageChange} />
        <CurvedDivider bg="#fff" fill="#fff" className="dark:hidden" />
        <CurvedDivider bg="#121212" fill="#121212" className="hidden dark:block" />

        {/* Section 4 — Browse by functional requirement */}
        <FunctionalRequirementSection onPageChange={onPageChange} />
        <CurvedDivider bg="#fff" fill="#fff" className="dark:hidden" />
        <CurvedDivider bg="#121212" fill="#121212" className="hidden dark:block" />

        {/* Section 5 — Product comparison */}
        <ComparisonSection compareList={compareList} onPageChange={onPageChange} />
        <CurvedDivider bg="#fff" fill="#fff" className="dark:hidden" />
        <CurvedDivider bg="#121212" fill="#121212" className="hidden dark:block" />

        {/* Section 6 — Custom product support */}
        <CustomSupportSection onPageChange={onPageChange} />

        {/* Section 7 — Technical resources */}
        <TechnicalResourcesSection onPageChange={onPageChange} />

      </div>
    </PageWrapper>
  );
}
