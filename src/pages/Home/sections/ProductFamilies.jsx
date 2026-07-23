import { motion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import products, { PRODUCT_CATEGORIES, getProductById } from '../../../data/products';

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
    // No table/shell egg product exists in the catalogue yet — shown as an
    // honest "Coming soon" placeholder rather than fabricated product data,
    // matching the ComingSoon pattern used elsewhere in the app.
    id: 'table-eggs',
    name: 'Table Eggs',
    comingSoon: true,
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

function FamilyBlock({ family, onPageChange }) {
  if (family.comingSoon) {
    return (
      <article className="flex flex-col h-full rounded-[22px] overflow-hidden bg-[#fdfbf7] dark:bg-surface-900 border border-surface-200/70 dark:border-surface-800">
        <div className="relative w-full aspect-[4/3] overflow-hidden flex items-center justify-center bg-surface-100 dark:bg-surface-800/60">
          <span className="font-body text-[11px] font-bold uppercase tracking-widest text-surface-400 dark:text-surface-500 border border-surface-300 dark:border-surface-700 rounded-full px-4 py-1.5">
            Coming Soon
          </span>
        </div>

        <div className="flex flex-col flex-1 px-7 pt-6 pb-7">
          <h3 className="font-heading font-bold text-[24px] lg:text-[26px] text-heading dark:text-white leading-[1.2] m-0">
            {family.name}
          </h3>

          <p className="font-body text-[15px] lg:text-[16px] text-surface-500 dark:text-surface-400 leading-[1.55] mt-5 mb-0">
            This product family is not yet available. Check back soon, or get in touch to discuss your requirement.
          </p>
        </div>
      </article>
    );
  }

  const familyProducts = family.productIds.map(getProductById).filter(Boolean);
  const heroImage = familyProducts[0]?.image;

  return (
    <article className="flex flex-col h-full rounded-[22px] overflow-hidden bg-[#fdfbf7] dark:bg-surface-900 border border-surface-200/70 dark:border-surface-800">
      {heroImage && (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img
            src={heroImage}
            alt={familyProducts[0].title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 px-7 pt-6 pb-7">
        <h3 className="font-heading font-bold text-[24px] lg:text-[26px] text-heading dark:text-white leading-[1.2] m-0">
          {family.name}
        </h3>

        <dl className="flex flex-col gap-4 mt-5">
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

        <div className="mt-auto pt-6">
          <InternalLink
            route={family.categoryRoute}
            onPageChange={onPageChange}
            className="group inline-flex items-center gap-2 font-body font-semibold text-[15px] lg:text-[16px] text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
          >
            {family.ctaLabel}
            <svg
              width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              className="group-hover:translate-x-0.5 transition-transform duration-200"
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

export default function ProductFamilies({ onPageChange }) {
  return (
    <div
      id="product-discovery"
      className="w-full bg-white dark:bg-surface-900/40 py-[60px] lg:py-[85px] scroll-mt-[100px] xl:scroll-mt-[120px]"
    >
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10 lg:gap-12">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="font-heading font-bold text-[34px] sm:text-[42px] lg:text-[48px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
        >
          Product families
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 xl:gap-7">
          {families.map((family) => (
            <FamilyBlock key={family.id} family={family} onPageChange={onPageChange} />
          ))}
        </div>
      </div>
    </div>
  );
}
