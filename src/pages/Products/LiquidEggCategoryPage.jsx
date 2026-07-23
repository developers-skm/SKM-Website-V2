import CategoryPage from './CategoryPage';

// Facts below are verbatim/derived from already-audited real product data
// (src/data/products.js, ProductFamilies.jsx, and each liquid product
// page's own variantsData `code`/`character` fields and applicationsData
// `name` values — confirmed present across Whole Egg / Egg Yolk / Egg
// Albumen Liquid pages).
const productMeta = {
  whole_egg_liquid: {
    codeRange: 'W1001–W1013',
    functionality: 'Chilled or frozen, standard or sugared variants, plus a salted frozen variant.',
    applications: ['Bakery Products'],
  },
  egg_yolk_liquid: {
    codeRange: 'Y1001–Y1019',
    functionality: 'Chilled or frozen, salted (8–14%) or high-colour variants, plus heat-stabilised salted variants.',
    applications: ['Bakery', 'Cosmetics', 'Ice Cream', 'Mayonnaise'],
  },
  egg_albumen_liquid: {
    codeRange: 'A1001–A1006',
    functionality: 'Chilled or frozen, with high-whip foaming variants.',
    applications: ['Cakes', 'Meringues', 'Confectionery', 'Noodles'],
  },
};

// Functionality tags — each mapped only to the real product ids confirmed
// (by grep against each product page's own variantsData) to carry that
// trait.
const functionalityTags = [
  { label: 'Chilled or frozen', productIds: ['whole_egg_liquid', 'egg_yolk_liquid', 'egg_albumen_liquid'] },
  { label: 'Salted or sugared', productIds: ['whole_egg_liquid', 'egg_yolk_liquid'] },
  { label: 'Standard or stabilised', productIds: ['egg_yolk_liquid'] },
  { label: 'High-whip', productIds: ['egg_albumen_liquid'] },
  { label: 'High-colour', productIds: ['egg_yolk_liquid'] },
];

export default function LiquidEggCategoryPage({ onPageChange }) {
  return (
    <CategoryPage
      seo={{
        title: 'Liquid Egg Products | SKM Egg Products Category Guide',
        description: 'Chilled and frozen pasteurized liquid whole egg, egg yolk, and egg albumen — format, benefits, and typical uses for food manufacturers.',
        keywords: 'liquid egg category, whole egg liquid, egg yolk liquid, egg albumen liquid, pasteurized liquid egg',
        canonical: 'https://www.skmegg.com/category_liquids',
      }}
      breadcrumbLabel="Liquid Egg Products"
      categoryLabel="Product Category"
      title="Liquid Egg Products"
      format="Pasteurized liquid egg — chilled or frozen — supplied as whole egg, egg yolk, or egg albumen blends, ready to dose directly into recipes."
      advantages={[
        'Full nutrient density, easy dosing and handling, eliminates eggshell-breaking hazards in industrial kitchens.',
        'Delivers high cake volume, improves crumb softness, and significantly delays starch staling.',
      ]}
      whoUsesIt="Industrial bakeries and institutional kitchens producing cakes, bakery products, and standardized ready-meal recipes at scale."
      storage="Chilled (0°C to 4°C) or Frozen (≤ -18°C), depending on variant."
      categoryProductIds={['whole_egg_liquid', 'egg_yolk_liquid', 'egg_albumen_liquid']}
      productMeta={productMeta}
      functionalityTags={functionalityTags}
      onPageChange={onPageChange}
    />
  );
}
