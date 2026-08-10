import { motion, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import products, { PRODUCT_CATEGORIES, getProductById } from '../../../data/products';
import CategoryMotif from './CategoryMotif';
import ScrollStack, { ScrollStackItem } from '../../../components/ui/ScrollStack/ScrollStack';

// Section 3 — Product Families. Three large family blocks (not the full SKU
// grid). Every format/benefit/application/storage value below is an exact
// verbatim string copied from approved product-page data (variantsData
// `benefits`, `specifications.storage`, applicationsData `name`, or
// `shortDescription`) — never a newly authored summary. Fields with no
// genuine family-wide approved value are omitted, not fabricated (see the
// per-family notes below).
//
// Each family CTA now navigates directly to its real category transition
// page (src/pages/Products/EggPowdersCategoryPage.jsx,
// LiquidEggCategoryPage.jsx, CustomSpecialtyCategoryPage.jsx) — a more
// precise destination than the /products hub's in-page anchor.
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

function InfoGroup({ label, children }) {
  return (
    <div>
      <dt className="font-body text-[12.5px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500 m-0 mb-1.5">
        {label}
      </dt>
      <dd className="font-body text-[15px] lg:text-[16px] text-surface-700 dark:text-surface-300 leading-[1.55] m-0">
        {children}
      </dd>
    </div>
  );
}

// Two-column product family card — left-side image, right-side content.
// `min-width: 0` on both grid children (via `min-w-0`) is required so the
// description text can't force the grid track wider than its column and
// blow out the card's overall width.
function FamilyBlock({ family, onPageChange }) {
  const reduceMotion = useReducedMotion();

  if (family.comingSoon) {
    return (
      <article className="grid grid-cols-1 md:grid-cols-[52%_48%] lg:grid-cols-[58%_42%] w-full min-h-[420px] md:min-h-[480px] lg:h-[min(560px,68vh)] rounded-[30px] overflow-hidden isolate bg-white dark:bg-surface-900 border border-surface-200/70 dark:border-surface-800 shadow-[0_16px_44px_rgba(36,30,24,0.12)]">
        <div className="relative min-w-0 w-full min-h-[280px] md:min-h-full overflow-hidden" style={{ aspectRatio: '16 / 10' }}>
          {family.comingSoonImage && (
            <img
              src={family.comingSoonImage}
              srcSet={`${family.comingSoonImage.replace('w=1600', 'w=800')} 800w, ${family.comingSoonImage} 1600w`}
              sizes="(min-width: 768px) 55vw, 100vw"
              alt={family.comingSoonImageAlt || ''}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        <div className="min-w-0 flex flex-col justify-center px-6 py-8 sm:px-8 md:px-9 lg:px-10 md:py-[clamp(32px,4vw,56px)]">
          <h3 className="font-heading font-bold text-[24px] lg:text-[28px] text-heading dark:text-white leading-[1.2] m-0 mb-5">
            {family.name}
          </h3>

          <p className="font-body text-[15px] lg:text-[16px] text-surface-500 dark:text-surface-400 leading-[1.55] max-w-[440px] m-0">
            Table eggs are on our roadmap. Get in touch to discuss your requirement ahead of launch.
          </p>
        </div>
      </article>
    );
  }

  const familyProducts = family.productIds.map(getProductById).filter(Boolean);
  const heroImage = familyProducts[0]?.image;
  const motifKind = family.id === 'powders' ? 'powders' : family.id === 'liquids' ? 'liquids' : family.id === 'custom' ? 'custom' : null;

  return (
    <article className="group grid grid-cols-1 md:grid-cols-[52%_48%] lg:grid-cols-[58%_42%] w-full min-h-[420px] md:min-h-[480px] lg:h-[min(560px,68vh)] rounded-[30px] overflow-hidden isolate bg-white dark:bg-surface-900 border border-surface-200/70 dark:border-surface-800 shadow-[0_16px_44px_rgba(36,30,24,0.12)] transition-shadow duration-300 hover:shadow-[0_20px_52px_rgba(36,30,24,0.16)]">
      {heroImage && (
        <div className="relative min-w-0 w-full min-h-[280px] md:min-h-full overflow-hidden" style={{ aspectRatio: '16 / 10' }}>
          <img
            src={heroImage}
            alt={familyProducts[0].title}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover ${reduceMotion ? '' : 'transition-transform duration-500 ease-out group-hover:scale-[1.04]'}`}
          />
          {motifKind && <CategoryMotif kind={motifKind} />}
        </div>
      )}

      <div className="min-w-0 flex flex-col justify-center overflow-hidden px-6 py-8 sm:px-8 md:px-9 lg:px-10 md:py-[clamp(32px,4vw,56px)]">
        <h3 className="font-heading font-bold text-[24px] lg:text-[28px] text-heading dark:text-white leading-[1.2] m-0 mb-5">
          {family.name}
        </h3>

        <dl className="flex flex-col gap-4 max-w-[440px]">
          {family.format && (
            <InfoGroup label="Product format">
              {family.format.join(' · ')}
            </InfoGroup>
          )}

          {family.benefits && (
            <InfoGroup label="Main functional benefits">
              <span className="flex flex-col gap-1.5">
                {family.benefits.map((b) => <span key={b}>{b}</span>)}
              </span>
            </InfoGroup>
          )}

          {family.applications && (
            <InfoGroup label="Typical applications">
              {family.applications.join(' · ')}
            </InfoGroup>
          )}

          {family.storage && (
            <InfoGroup label="Storage or handling advantage">
              {family.storage.join(' · ')}
            </InfoGroup>
          )}
        </dl>

        <div className="mt-8">
          <InternalLink
            route={family.categoryRoute}
            onPageChange={onPageChange}
            className="group/link inline-flex items-center gap-2 font-body font-semibold text-[15px] lg:text-[16px] text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
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
  );
}

// Sticky top offset for the first card, and the per-card increment that
// produces the "stacked edge" reveal (each earlier card peeks out by this
// many px above the current one). Navbar here is a floating logo/menu
// button (see Navbar.jsx — absolute/fixed top-5..top-9, not a full-width
// fixed bar), so a modest top clears it comfortably; this matches the
// section's own existing scroll-mt-[100px] anchor offset. Smaller on
// mobile since cards are shorter there and a large top offset would eat
// too much of the (already-shorter) card's visible height.
const STACK_TOP_PX = { base: 88, md: 110 };
const STACK_EDGE_STEP_PX = { base: 10, md: 14 };

// Gap (as plain margin-bottom, normal flow) between one sticky card and
// the point where the next one starts covering it. Also — critically —
// this is what makes the LAST card release: its own margin-bottom pushes
// the section's closing padding (and therefore the next section) below
// the viewport for long enough that the card scrolls out of its sticky
// position before anything after it can appear. No scroll-math height
// formula, no vh calculation — just normal box-model flow.
const STACK_CARD_GAP_PX = { base: 56, md: 96 };

// Builds a `clamp()` that linearly interpolates between `base` (at a
// 375px-wide viewport) and `md` (at 768px+) — a plain CSS-native
// responsive value, no JS resize listener/media-query state needed.
function responsiveStackPx({ base, md }) {
  return `clamp(${base}px, ${base}px + (${md} - ${base}) * ((100vw - 375px) / (768 - 375)), ${md}px)`;
}

export default function ProductFamilies({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      id="product-discovery"
      className="w-full bg-white dark:bg-surface-900/40 py-[60px] lg:py-[85px] scroll-mt-[100px] xl:scroll-mt-[120px]"
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

        {reduceMotion ? (
          <div className="mx-auto w-full flex flex-col gap-8" style={{ maxWidth: 'min(1180px, calc(100vw - 80px))' }}>
            {families.map((family) => (
              <FamilyBlock key={family.id} family={family} onPageChange={onPageChange} />
            ))}
          </div>
        ) : (
          <ScrollStack className="mx-auto" style={{ maxWidth: 'min(1180px, calc(100vw - 80px))' }}>
            {families.map((family, index) => (
              <ScrollStackItem
                key={family.id}
                index={index}
                topOffset={`calc(${responsiveStackPx(STACK_TOP_PX)} + ${index} * ${responsiveStackPx(STACK_EDGE_STEP_PX)})`}
                bottomSpacing={responsiveStackPx(STACK_CARD_GAP_PX)}
              >
                <FamilyBlock family={family} onPageChange={onPageChange} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        )}
      </div>
    </div>
  );
}
