import { useRef } from 'react';
import { motion, useSpring, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import SafeImage from '../../../components/common/SafeImage';
import products, { PRODUCT_CATEGORIES, getProductById } from '../../../data/products';
import CategoryMotif from './CategoryMotif';

// Section 3 — Product Families. Four family cards in a 2x2 grid. Every
// format/benefit/application/storage value below is an exact verbatim
// string copied from approved product-page data (variantsData `benefits`,
// `specifications.storage`, applicationsData `name`, or `shortDescription`)
// — never a newly authored summary. Fields with no genuine family-wide
// approved value are omitted, not fabricated (see the per-family notes
// below). Grid cards only surface format + the first benefit line — full
// detail (applications, storage) still lives on each family's category
// page, reached via the card CTA.
//
// Each family CTA navigates directly to its real category transition page
// (src/pages/Products/EggPowdersCategoryPage.jsx, LiquidEggCategoryPage.jsx,
// CustomSpecialtyCategoryPage.jsx) — a more precise destination than the
// /products hub's in-page anchor.
const families = [
  {
    id: 'powders',
    name: 'Egg Powders',
    // Verbatim: whole_egg_powder's shortDescription in products.js.
    format: ['Powder', 'Spray-dried'],
    // Verbatim benefits fields from WholeEggPowderPage.jsx / EggYolkPowderPage.jsx
    // variantsData — a representative selection, not a merged claim.
    benefits: [
      'Long-term shelf stability, simple dosing and weight ratio control, and reliable structural crumb development.',
      'High fat content, rich creamy mouthfeel, natural golden-yellow coloration, and excellent emulsification properties.',
    ],
    // No storage/handling field exists anywhere in powder product data
    // (powders are specified by moisture/dryness, not temperature/storage)
    // — omitted per the missing-data rule, not invented.
    productIds: products.filter((p) => p.category === PRODUCT_CATEGORIES.POWDERS).map((p) => p.id),
    ctaLabel: 'Explore Egg Powders',
    categoryRoute: 'category_powders',
  },
  {
    id: 'liquids',
    name: 'Liquid Egg Products',
    // Verbatim: specifications.storage values confirmed present across all
    // 3 liquid product pages (Whole Egg / Egg Yolk / Egg Albumen Liquid).
    format: ['Chilled liquid', 'Frozen liquid'],
    benefits: [
      'Full nutrient density, easy dosing and handling, eliminates eggshell-breaking hazards in industrial kitchens.',
      'Delivers high cake volume, improves crumb softness, and significantly delays starch staling.',
    ],
    // Verbatim application names, recurring across the liquid family's
    // applicationsData (WholeEggLiquidPage.jsx, EggAlbumenLiquidPage.jsx).
    applications: ['Bakery Products', 'Cakes'],
    // Verbatim: specifications.storage exact values.
    storage: ['Chilled (0°C to 4°C)', 'Frozen (≤ -18°C)'],
    productIds: products.filter((p) => p.category === PRODUCT_CATEGORIES.LIQUIDS).map((p) => p.id),
    ctaLabel: 'Explore Liquid Eggs',
    categoryRoute: 'category_liquids',
  },
  {
    id: 'custom',
    name: 'Customised and Specialty Solutions',
    // Verbatim: packagingOptions value shared by both Customized Mix and
    // Customized Packages in products.js.
    format: ['Custom'],
    // No benefits/applications/storage field is genuinely shared across
    // this family (only 1 of its 4 products has any applicationsData; none
    // have a storage field; benefits are single-product, not family-wide)
    // — all three omitted per the missing-data rule, not merged into a
    // fabricated family summary.
    productIds: products
      .filter((p) => p.category === PRODUCT_CATEGORIES.CUSTOMIZED || p.category === PRODUCT_CATEGORIES.SPECIALITY)
      .map((p) => p.id),
    ctaLabel: 'Explore Custom Solutions',
    categoryRoute: 'category_custom',
  },
  {
    // No table/shell egg product exists in the catalogue yet — the copy
    // below is honest that it's not launched. Image is a representative
    // stock photo served from Unsplash's CDN (not a local asset), used
    // only as a visual placeholder — no product data implied.
    id: 'table-eggs',
    name: 'Table Eggs',
    comingSoon: true,
    comingSoonImage: 'https://images.unsplash.com/photo-1586802990181-a5771596eaea?auto=format&fit=crop&w=1600&q=85',
    comingSoonImageAlt: 'Brown egg on a white paper towel',
  },
];

// Pointer-tracked 3D tilt for the entire family card — adapted from the
// TiltedCard pattern (see src/components/ui/TiltedCard). The whole card
// (image + text + CTA) rotates together as one rigid plane, so the effect
// reads as "the card itself" tilting toward the cursor rather than just its
// image.
const TILT_SPRING = { damping: 30, stiffness: 100, mass: 2 };
const TILT_ROTATE_AMPLITUDE = 8;
const TILT_SCALE_ON_HOVER = 1.02;

function TiltCard({ children, reduceMotion, className = '' }) {
  const ref = useRef(null);
  const rotateX = useSpring(0, TILT_SPRING);
  const rotateY = useSpring(0, TILT_SPRING);
  const scale = useSpring(1, TILT_SPRING);

  function handleMouseMove(e) {
    if (!ref.current || reduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -TILT_ROTATE_AMPLITUDE);
    rotateY.set((offsetX / (rect.width / 2)) * TILT_ROTATE_AMPLITUDE);
  }

  function handleMouseEnter() {
    if (reduceMotion) return;
    scale.set(TILT_SCALE_ON_HOVER);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d', transformPerspective: 1000 }}
      className={`h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Vertical family card — tilt image on top, condensed content below (name,
// product format, and the family's first listed benefit line only; full
// detail lives on the category page behind the CTA).
function FamilyCard({ family, onPageChange }) {
  const reduceMotion = useReducedMotion();

  if (family.comingSoon) {
    return (
      <TiltCard reduceMotion={reduceMotion}>
        <article className="group flex flex-col h-full rounded-[24px] overflow-hidden isolate bg-white dark:bg-surface-900 border border-surface-200/70 dark:border-surface-800 shadow-[0_16px_44px_rgba(36,30,24,0.12)]">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
            {family.comingSoonImage && (
              <SafeImage
                src={family.comingSoonImage}
                srcSet={`${family.comingSoonImage.replace('w=1600', 'w=800')} 800w, ${family.comingSoonImage} 1600w`}
                sizes="(min-width: 768px) 45vw, 100vw"
                alt={family.comingSoonImageAlt || ''}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>

          <div className="flex flex-col flex-1 px-6 py-6 sm:px-7 sm:py-7">
            <h3 className="font-heading font-bold text-[20px] lg:text-[22px] text-heading dark:text-white leading-[1.2] m-0 mb-3">
              {family.name}
            </h3>
            <p className="font-body text-[14px] lg:text-[15px] text-surface-500 dark:text-surface-400 leading-[1.55] m-0">
              Table eggs are on our roadmap. Get in touch to discuss your requirement ahead of launch.
            </p>
          </div>
        </article>
      </TiltCard>
    );
  }

  const familyProducts = family.productIds.map(getProductById).filter(Boolean);
  const heroImage = familyProducts[0]?.image;
  const motifKind = family.id === 'powders' ? 'powders' : family.id === 'liquids' ? 'liquids' : family.id === 'custom' ? 'custom' : null;
  const firstBenefit = family.benefits?.[0];

  return (
    <TiltCard reduceMotion={reduceMotion}>
      <article className="group flex flex-col h-full rounded-[24px] overflow-hidden isolate bg-white dark:bg-surface-900 border border-surface-200/70 dark:border-surface-800 shadow-[0_16px_44px_rgba(36,30,24,0.12)] transition-shadow duration-300 hover:shadow-[0_20px_52px_rgba(36,30,24,0.16)]">
        {heroImage && (
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
            <SafeImage
              src={heroImage}
              alt={familyProducts[0].title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {motifKind && <CategoryMotif kind={motifKind} />}
          </div>
        )}

        <div className="flex flex-col flex-1 px-6 py-6 sm:px-7 sm:py-7">
          <h3 className="font-heading font-bold text-[20px] lg:text-[22px] text-heading dark:text-white leading-[1.2] m-0 mb-3">
            {family.name}
          </h3>

          {family.format && (
            <p className="font-body text-[12.5px] font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400 m-0 mb-3">
              {family.format.join(' · ')}
            </p>
          )}

          {firstBenefit && (
            <p className="font-body text-[14px] lg:text-[15px] text-surface-600 dark:text-surface-400 leading-[1.55] m-0 line-clamp-3">
              {firstBenefit}
            </p>
          )}

          <div className="mt-auto pt-5">
            <InternalLink
              route={family.categoryRoute}
              onPageChange={onPageChange}
              className="group/link inline-flex items-center gap-2 font-body font-semibold text-[14px] lg:text-[15px] text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
            >
              {family.ctaLabel}
              <svg
                width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                className="group-hover/link:translate-x-0.5 transition-transform duration-200"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </InternalLink>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

export default function ProductFamilies({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      id="product-discovery"
      className="w-full overflow-x-hidden bg-white dark:bg-surface-900/40 py-[60px] lg:py-[85px] scroll-mt-[100px] xl:scroll-mt-[120px]"
    >
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10 lg:gap-12">

        <motion.h2
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold text-[34px] sm:text-[42px] lg:text-[48px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
        >
          Product families
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {families.map((family, i) => {
            const isLeftColumn = i % 2 === 0;
            return (
              <motion.div
                key={family.id}
                initial={{ opacity: 0, x: reduceMotion ? 0 : (isLeftColumn ? -60 : 60) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : (i % 2) * 0.06 }}
              >
                <FamilyCard family={family} onPageChange={onPageChange} />
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
