import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import ScrollFrameSequence from '../../components/common/ScrollFrameSequence';
import { scrollToSectionId } from '../../components/Navbar/useProductDiscoveryNavigation';
import products, { PRODUCT_CATEGORIES } from '../../data/products';
import { getBrochureUrl } from '../../data/brochureUrl';
import useMediaQuery from '../../components/GlobalEvents/useMediaQuery';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';
import { EASE_PREMIUM, DURATION, fadeUp } from '../../utils/motionTokens';

const ProductListPdf = getBrochureUrl('Product List - SKM Egg Products Export India Limited.pdf');

// Products Hub - real, data-backed sections only. Fields with no genuine
// per-product data anywhere in the repo (function/application tags, product
// codes, shelf-life values, technical data sheets, application/packaging
// guides) are omitted rather than invented, per this session's standing
// no-invented-content rule. See per-section notes below.

const CATEGORY_OPTIONS = Object.values(PRODUCT_CATEGORIES);

// Packaging options - real, taken directly from products.js, and scoped to
// whichever Format is currently selected: Egg Powders only ever shows its
// own real packaging set (20kg, 25kg, Bag-in-Box), Liquid Eggs shows its
// own (1kg, 5kg, 20kg), etc. - never a flat, mixed list of every product's
// packaging regardless of format. When no format is selected, every real
// packaging value across all products is shown (nothing to narrow by yet).
function getPackagingOptionsForCategory(category) {
  const scoped = category ? products.filter((p) => p.category === category) : products;
  return Array.from(new Set(scoped.flatMap((p) => p.packagingOptions))).sort(comparePackagingSize);
}

// Sorts size values smallest to largest (100g, 250g, 500g, 1kg, 5kg, 20kg...).
// Weights (g/kg) come first, then volumes (ml/l); non-size labels such as
// "Bag-in-Box" or "Custom" sort alphabetically ahead of the sizes.
function sizeSortKey(value) {
  const match = value.match(/^(\d+(?:\.\d+)?)(kg|g|ml|l)$/i);
  if (!match) return null;
  const amount = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  if (unit === 'kg') return { group: 0, base: amount * 1000 };
  if (unit === 'g') return { group: 0, base: amount };
  if (unit === 'l') return { group: 1, base: amount * 1000 };
  return { group: 1, base: amount };
}

function comparePackagingSize(a, b) {
  const ka = sizeSortKey(a);
  const kb = sizeSortKey(b);
  if (!ka && !kb) return a.localeCompare(b);
  if (!ka) return -1;
  if (!kb) return 1;
  return ka.group - kb.group || ka.base - kb.base;
}

// Groups a category's flat packagingOptions (e.g. ["20kg", "25kg",
// "Bag-in-Box"]) into a single display tag per real container-type label,
// with each weight value nested as its own filterable sub-pill - e.g. one
// "Bag-in-Box (20 kg) (25 kg)" tag instead of 3 separate flat pills. Values
// with no weight-style siblings (e.g. "Custom") render as a standalone tag.
//
// products.js itself only stores weights for Egg Powders (Bag-in-Box) and
// Liquid Eggs (Bag (LDPE)) - the real container-type names live in each
// category's dedicated packaging page (CategoryPage.jsx / packagingData in
// CustomizedPackagesPage.jsx), not as a field on the product record. This
// map surfaces those same real, verified type names rather than fabricating
// one - e.g. Liquid Eggs is genuinely "Bag (LDPE)" per CustomizedPackagesPage
// packagingData, never "Bag-in-Box" (that name is real only for powders).
// Speciality Products has no single documented container-type shared across
// its 2 products (Speciality Liquid Blends, Egg White Cube), so it's
// intentionally absent here and falls through to flat weight pills.
const CATEGORY_PACKAGING_LABEL = {
  [PRODUCT_CATEGORIES.POWDERS]: 'Bag-in-Box',
  [PRODUCT_CATEGORIES.LIQUIDS]: 'Bag (LDPE)',
};

// Egg Powders ship in two container types, each with its own weights, so
// they're listed explicitly rather than derived from the flat option list.
const CATEGORY_PACKAGING_GROUPS = {
  [PRODUCT_CATEGORIES.POWDERS]: [
    { key: 'Bag-in-Box', label: 'Bag-in-Box', values: ['20kg', '25kg'] },
    { key: 'Bag-in-Bag', label: 'Bag-in-Bag', values: ['10kg', '20kg'] },
  ],
};

// Packaging filter values prefixed with this select a single product rather
// than a packagingOptions entry (used by the Customised Solutions pills).
const PRODUCT_PILL_PREFIX = 'product:';

function matchesPackaging(product, packaging) {
  return packaging.startsWith(PRODUCT_PILL_PREFIX)
    ? product.id === packaging.slice(PRODUCT_PILL_PREFIX.length)
    : product.packagingOptions.includes(packaging);
}

const SIZE_PATTERN = /^\d+(\.\d+)?(kg|g|ml|l)$/i;

// Formats any real per-product/category packagingOptions value (kg, g, mL,
// L) into its display form - e.g. "20kg" -> "20 kg", "250ml" -> "250 ML".
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
    // No format selected - weights and labels here are pooled across every
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

  if (category === PRODUCT_CATEGORIES.CUSTOMIZED) {
    // Both customised products share the single "Custom" packaging value,
    // so offer each product as its own pill and filter by product instead.
    return [
      {
        key: 'Custom',
        label: 'Custom',
        values: products
          .filter((p) => p.category === category)
          .map((p) => ({ value: `${PRODUCT_PILL_PREFIX}${p.id}`, label: p.title })),
        grouped: true,
      },
    ];
  }

  const explicitGroups = CATEGORY_PACKAGING_GROUPS[category];
  if (explicitGroups) {
    return explicitGroups.map((g) => ({ ...g, grouped: true }));
  }

  const realLabel = CATEGORY_PACKAGING_LABEL[category];

  if (weights.length > 0 && realLabel && !labels.includes(realLabel)) {
    // Category has a verified real container-type name not already present
    // as one of its own packagingOptions values (Liquid Eggs: weights only).
    return [{ key: realLabel, label: realLabel, values: weights, grouped: true }];
  }

  if (labels.length === 0) {
    // No category-level label - group each of this category's products
    // under its own real title instead (e.g. Speciality Products has 2
    // dissimilar products, Speciality Liquid Blends in ML/L and Egg White
    // Cube in g, so a single flat/shared group would mix incompatible
    // units - group per real product instead).
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
      className={`inline-flex items-center gap-1.5 min-h-[38px] px-4 py-2 rounded-full font-body font-semibold text-[13.5px] transition-all duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-gold ${
        active
          ? 'bg-gold-500 text-heading border border-transparent shadow-[0_2px_10px_rgba(232,182,74,0.35)]'
          : 'bg-white border border-surface-200/70 text-surface-600 hover:border-gold-500/50 hover:text-heading hover:-translate-y-px'
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

// Section 2 - SKM Product Finder. Live client-side filtering, no page
// reload. Filters: product format (category) and packaging option - the
// only two real, structured axes present in products.js. "Application" and
// "function" filters from the brief have no per-product data source and are
// intentionally not included.
function ProductFinder({ onPageChange }) {
  const [category, setCategory] = useState(null);
  const [packaging, setPackaging] = useState(null);
  // The same weight (e.g. 20 kg) can appear under two container types - track
  // which group it was picked from so only that pill highlights.
  const [packagingGroup, setPackagingGroup] = useState(null);
  const reduceMotion = useReducedMotion();

  const packagingOptions = useMemo(() => getPackagingOptionsForCategory(category), [category]);
  const packagingGroups = useMemo(() => groupPackagingOptions(packagingOptions, category), [packagingOptions, category]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (packaging && !matchesPackaging(p, packaging)) return false;
      return true;
    });
  }, [category, packaging]);

  // Selecting a different Format re-scopes the Packaging pills to that
  // format's own real options - if the currently-selected packaging value
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
          <span className="font-body text-[11.5px] font-semibold uppercase tracking-[0.14em] text-gold-600">
            Find Your Product
          </span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            SKM Product Finder
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp(reduceMotion, { duration: 0.8, distance: 28, delay: reduceMotion ? 0 : 0.14 })}
          className="flex flex-col gap-6 sm:gap-7 p-5 sm:p-8 rounded-[16px] sm:rounded-[20px] border border-surface-200/60 bg-white shadow-[0_1px_2px_rgba(20,16,12,0.04),0_16px_40px_-16px_rgba(20,16,12,0.10)] transition-shadow duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_1px_2px_rgba(20,16,12,0.05),0_22px_50px_-18px_rgba(20,16,12,0.14)]"
        >
          <div className="flex flex-col gap-3">
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-surface-400">Format</span>
            <div className="flex flex-wrap gap-2 sm:inline-flex sm:flex-wrap sm:gap-1 sm:p-1.5 sm:rounded-full sm:bg-white sm: sm:border sm:border-surface-200/60 sm: w-full sm:w-fit">
              {CATEGORY_OPTIONS.map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCategoryChange(active ? null : c)}
                    aria-pressed={active}
                    className={`relative min-h-[44px] sm:min-h-0 px-4 py-2 rounded-full font-body font-semibold text-[13.5px] transition-colors duration-[220ms] focus:outline-none focus-gold border sm:border-0 ${
                      active
                        ? 'bg-gold-500 border-transparent text-heading'
                        : 'bg-white border-surface-200/70 text-surface-600'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="format-active-pill"
                        className="hidden sm:block absolute inset-0 rounded-full bg-gold-500"
                        transition={reduceMotion ? { duration: 0.01 } : { duration: 0.32, ease: EASE_PREMIUM }}
                      />
                    )}
                    <span className={`relative z-10 transition-colors duration-200 ${active ? 'text-heading' : 'text-surface-600'}`}>{c}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-surface-400">Packaging</span>
            <div className="flex flex-wrap items-center gap-2">
              {packagingGroups.map((group) =>
                group.grouped ? (
                  <div
                    key={group.key}
                    className="flex flex-wrap items-center gap-1.5 rounded-xl sm:rounded-2xl border border-surface-200/50 bg-surface-50/70 px-3 py-2 sm:pl-4 sm:pr-1.5 sm:py-1.5"
                  >
                    <span className="font-body font-semibold text-[12.5px] text-surface-500 mr-1 whitespace-nowrap">
                      {group.label}
                    </span>
                    {group.values.map((item) => {
                      // Values are plain strings, or { value, label } when the
                      // filter value differs from the text shown.
                      const value = typeof item === 'string' ? item : item.value;
                      const text = typeof item === 'string' ? value : item.label;
                      const groupMatches =
                        packagingGroup === group.key || !packagingGroups.some((g) => g.key === packagingGroup);
                      const active = packaging === value && groupMatches;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setPackaging(active ? null : value);
                            setPackagingGroup(group.key);
                          }}
                          aria-pressed={active}
                          className={`inline-flex items-center min-h-[36px] sm:min-h-[28px] px-2.5 py-1 rounded-lg font-body font-semibold text-[12px] transition-all duration-[220ms] focus:outline-none focus-gold ${
                            active
                              ? 'bg-gold-500 text-heading shadow-sm'
                              : 'bg-white text-surface-600 hover:bg-gold-500/10'
                          }`}
                        >
                          {text === group.label ? text : `(${formatSizeLabel(text)})`}
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
                className="self-start inline-flex items-center gap-1.5 font-body font-semibold text-[13px] text-surface-500 hover:text-heading focus:outline-none focus-gold rounded-sm w-fit"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Clear Filters
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

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
                className="group relative flex flex-col gap-3.5 p-5 sm:p-6 rounded-[14px] border border-surface-200/70 bg-white transition-[border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold-500/60 hover:shadow-[0_26px_50px_-18px_rgba(20,16,12,0.2)] focus-within:border-gold-500/60"
              >
                <span
                  className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full bg-gold-500 scale-y-0 origin-center transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <div className="w-full aspect-[4/3] overflow-hidden rounded-[9px] bg-surface-50">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                </div>
                <span className="font-heading font-bold text-[16.5px] text-heading tracking-[-0.005em]">{product.title}</span>
                <span className="font-body text-[13.5px] text-surface-500 leading-[1.55]">{product.shortDescription}</span>
                <InternalLink
                  route={product.page}
                  onPageChange={onPageChange}
                  aria-label={product.title}
                  className="absolute inset-0 z-10 rounded-[14px] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// Manufacturing lines - one split card: Powder Line (left) and Liquid Line
// (right) each open their own manufacturing process page.
const manufacturingLines = [
  {
    id: 'powder',
    route: 'powder_line',
    label: 'Powder Line',
    description: 'Discover how fresh eggs are transformed into premium-quality spray-dried egg powders, from biosecure poultry farms to hygienic processing and packaging.',
    cta: 'View Manufacturing Process',
  },
  {
    id: 'liquid',
    route: 'liquid_line',
    label: 'Liquid Line',
    description: 'Discover how fresh eggs are transformed into premium-quality pasteurised liquid egg products, from biosecure poultry farms to hygienic processing and packaging.',
    cta: 'View Manufacturing Process',
  },
];

function ManufacturingLinesSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  return (
    <div id="manufacturing-lines" className="w-full py-[64px] lg:py-[92px] bg-white scroll-mt-[100px] xl:scroll-mt-[120px]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-9 lg:gap-11">
        <motion.div
          {...fadeUp(reduceMotion, { duration: 0.9, distance: 40 })}
          className="flex flex-col gap-2.5"
        >
          <span className="font-body text-[11.5px] font-semibold uppercase tracking-[0.14em] text-gold-600">
            Manufacturing Process
          </span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Explore Our Manufacturing Lines
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp(reduceMotion, { duration: 0.85, distance: 30, delay: reduceMotion ? 0 : 0.14 })}
          className="grid grid-cols-1 md:grid-cols-2 rounded-[16px] sm:rounded-[20px] border border-surface-200/70 bg-[#fdfbf7] overflow-hidden shadow-[0_1px_2px_rgba(20,16,12,0.04),0_16px_40px_-16px_rgba(20,16,12,0.10)]"
        >
          {manufacturingLines.map((line) => (
            <InternalLink
              key={line.id}
              route={line.route}
              onPageChange={onPageChange}
              className="group relative flex flex-col gap-3 p-7 sm:p-10 lg:p-12 border-b md:border-b-0 md:border-r last:border-0 border-surface-200/70 transition-colors duration-[320ms] hover:bg-gold-500/[0.07] focus:outline-none focus-gold"
            >
              <span className="flex items-center gap-3">
                <h3 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading leading-[1.15] tracking-[-0.01em] m-0">
                  {line.label}
                </h3>
                {line.comingSoon && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/40 font-body font-semibold text-[11px] uppercase tracking-[0.1em] text-heading">
                    Coming Soon
                  </span>
                )}
              </span>
              <p className="font-body text-[14.5px] text-surface-500 leading-[1.6] max-w-md m-0">{line.description}</p>
              {!line.comingSoon && (
                <span className="inline-flex items-center gap-1.5 mt-2 font-body font-semibold text-[14px] text-brand-600 group-hover:text-brand-700">
                  {line.cta}
                  <span className="inline-block transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" aria-hidden="true">→</span>
                </span>
              )}
            </InternalLink>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Section 4 - Browse by functional requirement. No product in products.js
// carries a structured "function" tag (foaming, emulsification, gelling,
// etc.) - that taxonomy exists only as free-text `benefits` on individual
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
          className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0"
        >
          Browse by Functional Requirement
        </motion.h2>
        <motion.p
          {...fadeUp(reduceMotion, { duration: 0.8, distance: 24, delay: reduceMotion ? 0 : 0.13 })}
          className="font-body text-[15px] lg:text-[16px] text-surface-500 leading-[1.6] max-w-2xl m-0"
        >
        Function-based product selection is available across key applications, including whipping, emulsification, gelling, colour development, and more. Our technical team can identify and recommend the right product to meet your specific functional requirements.
        </motion.p>
        <motion.div
          {...fadeUp(reduceMotion, { duration: 0.85, distance: 30, delay: reduceMotion ? 0 : 0.24 })}
          className="flex flex-wrap items-center gap-4 mt-1"
        >
          <InternalLink
            route="applications"
            onPageChange={onPageChange}
            prefillData={{ scrollTarget: 'formulation-challenges' }}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-surface-300 text-heading hover:border-gold-500/60 font-body font-semibold text-[15px] transition-colors duration-200 focus:outline-none focus-gold"
          >
            View Application
          </InternalLink>
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

// Section 6 - Custom product support. Real routes: customised_mix,
// customised_packages both exist in products.js/App.jsx; contact-us is real.
function CustomSupportSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  return (
    <div id="custom-support" className="relative w-full py-[60px] lg:py-[85px] bg-white scroll-mt-[100px] xl:scroll-mt-[120px] overflow-hidden">
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
        <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
          Custom Product Support
        </h2>
        <p className="font-body text-[15px] lg:text-[16px] text-surface-500 max-w-2xl m-0">
      Our Customised Mix and Customised Package solutions are precisely tailored to your recipe, process, and specific requirements
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-1">
          <InternalLink
            route="customised_mix"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[15px] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[0_14px_28px_rgba(228,10,24,0.26)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-gold"
          >
            Develop a Custom Solution
          </InternalLink>
          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-brand-600 text-brand-600 hover:bg-brand-600/6 font-body font-semibold text-[15px] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-gold"
          >
            Contact Technical Team
          </InternalLink>
        </div>
      </motion.div>
    </div>
  );
}

// Section 7 - Technical resources. Real destinations: the /resources page
// (product flyers + company profile via /brochure) and the real Product
// List PDF. Data sheets / application guides / packaging guide have no
// real files in the repo (only per-product flyers + one company profile +
// one product list exist under src/assets/Brouchers) and are not
// represented as separate fake downloads.
function TechnicalResourcesSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  return (
    <div id="technical-resources" className="w-full py-[60px] lg:py-[85px] bg-white scroll-mt-[100px] xl:scroll-mt-[120px]">
      <motion.div
        {...fadeUp(reduceMotion, { duration: 0.85, distance: 34 })}
        className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-6"
      >
        <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
          Technical Resources
        </h2>
        <p className="font-body text-[15px] lg:text-[16px] text-surface-500 max-w-2xl m-0">
         Explore our product details, complete product portfolio, and company profile to discover more about our products and capabilities.
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
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-brand-600 text-brand-600 hover:bg-brand-600/6 font-body font-semibold text-[15px] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-gold"
          >
            Download Product Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// Clickable regions over the final frame (frame-201), as % of the image.
const HERO_HOTSPOTS = [
  { route: 'whole_egg_powder', label: 'Whole Egg Powder', x: 22.5, y: 19, w: 17, h: 22 },
  { route: 'egg_yolk_powder', label: 'Egg Yolk Powder', x: 42, y: 19, w: 16.5, h: 22 },
  { route: 'egg_albumen_powder', label: 'Egg Albumen Powder', x: 61.5, y: 22, w: 16.5, h: 19 },
  { route: 'whole_egg_liquid', label: 'Whole Egg Liquid', x: 14.5, y: 38, w: 13, h: 29 },
  { route: 'egg_yolk_liquid', label: 'Egg Yolk Liquid', x: 29.5, y: 38.5, w: 13, h: 29 },
  { route: 'egg_albumen_liquid', label: 'Egg Albumen Liquid', x: 45, y: 41, w: 13, h: 26 },
  { route: 'egg_white_cube', label: 'Egg White Cube', x: 58, y: 44, w: 21, h: 27 },
  { route: 'table_eggs', label: 'Table Eggs', x: 10.5, y: 60.5, w: 28, h: 32 },
  { route: 'egg_yolk_powder_heat_stable', label: 'Egg Yolk Powder – Heat Stable', x: 68, y: 70, w: 22, h: 22 },
];

// Mobile final state - the scroll sequence still plays on mobile, then fades to
// the portrait still life (/products-sequence/mobile-final.webp, 1080x1919).
// Hotspots are % of that image, using the same object-fit: cover math.
const MOBILE_HERO_RATIO = 1080 / 1919;
const MOBILE_HERO_HOTSPOTS = [
  { route: 'whole_egg_powder', label: 'Whole Egg Powder', x: 4, y: 24.5, w: 29, h: 11.5 },
  { route: 'egg_yolk_powder', label: 'Egg Yolk Powder', x: 37, y: 24.5, w: 28, h: 11.5 },
  { route: 'egg_albumen_powder', label: 'Egg Albumen Powder', x: 68, y: 26, w: 28, h: 10.5 },
  { route: 'whole_egg_liquid', label: 'Whole Egg Liquid', x: 8.5, y: 36, w: 21.5, h: 14 },
  { route: 'egg_yolk_liquid', label: 'Egg Yolk Liquid', x: 32.5, y: 36, w: 21, h: 14 },
  { route: 'egg_albumen_liquid', label: 'Egg Albumen Liquid', x: 56, y: 36, w: 20, h: 14.5 },
  { route: 'egg_white_cube', label: 'Egg White Cube', x: 58, y: 49, w: 39, h: 18 },
  { route: 'egg_yolk_powder_heat_stable', label: 'Egg Yolk Powder – Heat Stable', x: 4, y: 51, w: 46, h: 13 },
  { route: 'table_eggs', label: 'Table Eggs', x: 0, y: 65, w: 55, h: 21 },
  { route: 'table_eggs', label: 'Table Eggs', x: 58, y: 68, w: 40, h: 20 },
];

// Scroll-linked layers for the Products hero. They own their useScroll so the
// target ref is already hydrated (the hero wrapper is a parent of these).
const HERO_FINAL_AT = 0.8; // scroll progress at which the last frame lands

// Hero scroll progress that latches at 1 once the last frame is reached, so the
// final state stays locked when scrolling back up (resets on reload).
function useLatchedProgress(containerRef) {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const latched = useMotionValue(0);
  const done = useRef(false);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (done.current) return;
    if (v >= HERO_FINAL_AT) {
      done.current = true;
      latched.set(1);
    } else {
      latched.set(v);
    }
  });
  return latched;
}

function HeroCopyFade({ containerRef, children }) {
  const scrollYProgress = useLatchedProgress(containerRef);
  const opacity = useTransform(scrollYProgress, [HERO_FINAL_AT - 0.12, HERO_FINAL_AT - 0.02], [1, 0]);
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setHidden(v > HERO_FINAL_AT - 0.02));
  return (
    <motion.div style={{ opacity, pointerEvents: hidden ? 'none' : 'auto', visibility: hidden ? 'hidden' : 'visible' }} className="relative z-10">
      {children}
    </motion.div>
  );
}

// Phone view skips the scroll-scrubbed sequence, so the copy stays put.
function HeroCopyWrap({ containerRef, isMobile, children }) {
  if (isMobile) return <div className="relative z-10">{children}</div>;
  return <HeroCopyFade containerRef={containerRef}>{children}</HeroCopyFade>;
}

// Phone view: no scrub, so the all-products still life is shown straight away
// with the "Select a product" heading and its tappable hotspots.
function MobileHeroFinal({ onPageChange }) {
  return (
    <>
      <div className="absolute inset-x-0 top-[84px] z-30 flex flex-col items-center px-4 text-center pointer-events-none">
        <span className="font-body font-bold text-[11px] uppercase tracking-[0.28em] text-brand-600 mb-2">
          Our Egg Products
        </span>
        <p
          className="m-0 font-heading font-extrabold text-[22px] leading-[1.1] tracking-[-0.01em] text-[#3b2a1e]"
          style={{ textShadow: '0 1px 18px rgba(255,248,238,0.85)' }}
        >
          Select a product to <span className="text-brand-600">discover more.</span>
        </p>
        <span className="mt-3 block h-[2px] w-12 rounded-full bg-brand-600" aria-hidden="true" />
      </div>
      <div className="absolute inset-0 z-20 overflow-hidden" style={{ containerType: 'size' }}>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: `max(100cqw, ${MOBILE_HERO_RATIO * 100}cqh)`, height: `max(100cqh, ${100 / MOBILE_HERO_RATIO}cqw)` }}
        >
          {MOBILE_HERO_HOTSPOTS.map((h) => (
            <InternalLink
              key={`${h.route}-${h.x}`}
              route={h.route}
              onPageChange={onPageChange}
              aria-label={h.label}
              className="absolute rounded-[18px] focus:outline-none"
              style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function HeroFinalLayers({ containerRef, onPageChange, isMobile }) {
  const hotspots = isMobile ? MOBILE_HERO_HOTSPOTS : HERO_HOTSPOTS;
  const ratio = isMobile ? MOBILE_HERO_RATIO : 16 / 9;
  const scrollYProgress = useLatchedProgress(containerRef);
  const overlayOpacity = useTransform(scrollYProgress, [HERO_FINAL_AT - 0.12, HERO_FINAL_AT], [1, 0]);
  const hotspotOpacity = useTransform(scrollYProgress, [HERO_FINAL_AT - 0.02, HERO_FINAL_AT + 0.06], [0, 1]);
  const [hotspotsActive, setHotspotsActive] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setHotspotsActive(v > HERO_FINAL_AT + 0.02));

  return (
    <>
      <motion.div className="absolute inset-0 bg-black/15" style={{ opacity: overlayOpacity }} aria-hidden="true" />

      {isMobile && (
        <motion.img
          src="/products-sequence/mobile-final.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-[15] w-full h-full object-cover"
          style={{ opacity: hotspotOpacity }}
        />
      )}

      {/* Final-frame hotspots - fade in once the sequence lands on the
          all-products still life. The inner box mirrors the canvas's
          object-fit: cover math (16:9 image) so percentages line up. */}
      <motion.div
        className="absolute inset-x-0 top-[84px] sm:top-[28px] z-30 flex flex-col items-center px-4 text-center pointer-events-none"
        style={{ opacity: hotspotOpacity }}
        aria-hidden={!hotspotsActive}
      >
        <span className="font-body font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.28em] text-brand-600 mb-2">
          Our Egg Products
        </span>
        <p
          className="m-0 font-heading font-extrabold text-[22px] sm:text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.01em] text-[#3b2a1e]"
          style={{ textShadow: '0 1px 18px rgba(255,248,238,0.85)' }}
        >
          Select a product to <span className="text-brand-600">discover more.</span>
        </p>
        <span className="mt-3 block h-[2px] w-12 rounded-full bg-brand-600" aria-hidden="true" />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-20 overflow-hidden"
        style={{ opacity: hotspotOpacity, pointerEvents: hotspotsActive ? 'auto' : 'none', containerType: 'size' }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: `max(100cqw, ${ratio * 100}cqh)`, height: `max(100cqh, ${100 / ratio}cqw)` }}
        >
          {hotspots.map((h) => (
            <InternalLink
              key={`${h.route}-${h.x}`}
              route={h.route}
              onPageChange={onPageChange}
              aria-label={h.label}
              tabIndex={hotspotsActive ? 0 : -1}
              className="group absolute rounded-[18px] focus:outline-none"
              style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
            >
              <span className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full whitespace-nowrap rounded-full bg-brand-600 px-3 py-1 font-body font-semibold text-[12px] text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none">
                {h.label}
              </span>
            </InternalLink>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default function ProductsHubPage({ onPageChange, prefill }) {
  const reduceMotion = useReducedMotion();
  const heroScrubRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  // Mirrors Home.jsx's mount-aware scroll effect - Home's ProductFamilies
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
      <div className="w-full flex flex-col bg-page">

        {/* Section 1 - Products hero. A premium entrance distinct from Home's
            center-out egg mask: the visual rises into place as a single
            unbroken image (a slow vertical reveal + gentle upward drift,
            like a blind lifting), while a thin gold line trails just above
            the image's leading edge and fades once the reveal settles.
            The background itself is a scroll-scrubbed frame sequence (egg
            transforming into egg powder) pinned for the scroll length of
            the wrapper below - same mechanism as Home's Hero. Copy keeps
            its own independent staggered entrance. */}
        <div ref={heroScrubRef} className={`relative w-full ${isMobile ? '' : 'h-[180vh]'}`}>
        <div className={`${isMobile ? 'relative' : 'sticky top-0'} min-h-screen pt-[110px] pb-[70px] sm:pt-[130px] lg:pt-[100px] lg:pb-[100px] text-center px-4 overflow-hidden`}>
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={reduceMotion ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: reduceMotion ? 0.01 : 1.2, ease: EASE_PREMIUM }}
          >
            {isMobile ? (
              <img src="/products-sequence/mobile-final.webp" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <ScrollFrameSequence containerRef={heroScrubRef} basePath="/products-sequence" frameCount={201} holdEnd={0.2} lockAtEnd />
            )}
          </motion.div>

          {isMobile ? (
            <MobileHeroFinal onPageChange={onPageChange} />
          ) : (
            <HeroFinalLayers containerRef={heroScrubRef} onPageChange={onPageChange} isMobile={isMobile} />
          )}

          {/* Thin gold line - trails the reveal's leading edge, then fades
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

          {/* Soft yolk-gold glow - settles upper-right once the reveal
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

          {isMobile && (
            <h1 className="sr-only">Egg Products Engineered for Performance, Consistency and Safety.</h1>
          )}
          {!isMobile && (
          <HeroCopyWrap containerRef={heroScrubRef} isMobile={isMobile}>
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
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[440px] mt-2"
            >
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white text-white hover:bg-white/20 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-gold"
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white text-white hover:bg-white/20 font-heading font-bold text-[13px] uppercase tracking-[0.04em] hover:-translate-y-[3px] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-0 active:scale-[0.98] cursor-pointer focus:outline-none focus-gold"
              >
                Find by Function
              </button>
            </motion.div>
          </motion.div>
          </HeroCopyWrap>
          )}
        </div>
        </div>

        {/* Section 2 - SKM Product Finder */}
        <ProductFinder onPageChange={onPageChange} />
        <CurvedDivider cards bg="#fff" fill="#fff" className="" />
        <CurvedDivider cards bg="#121212" fill="#121212" className="hidden" />

        {/* Manufacturing lines - Powder Line / Liquid Line */}
        <ManufacturingLinesSection onPageChange={onPageChange} />
        <CurvedDivider cards bg="#fff" fill="#ececec" className="" />
        <CurvedDivider cards bg="#121212" fill="#121212" className="hidden" />

        {/* Section 4 - Browse by functional requirement */}
        <FunctionalRequirementSection onPageChange={onPageChange} />
        <CurvedDivider cards bg="#ececec" fill="#fff" className="" />
        <CurvedDivider cards bg="#121212" fill="#121212" className="hidden" />

        {/* Section 6 - Custom product support */}
        <CustomSupportSection onPageChange={onPageChange} />

        {/* Section 7 - Technical resources */}
        <TechnicalResourcesSection onPageChange={onPageChange} />

      </div>
    </PageWrapper>
  );
}
