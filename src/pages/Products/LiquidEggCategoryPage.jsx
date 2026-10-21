import CategoryPage from './CategoryPage';

// Facts below are verbatim/derived from already-audited real product data
// (src/data/products.js, ProductFamilies.jsx, and each liquid product
// page's own variantsData `code`/`character` fields and applicationsData
// `name` values - confirmed present across Whole Egg / Egg Yolk / Egg
// Albumen Liquid pages).
const productMeta = {
  whole_egg_liquid: {
    codeRange: 'W1001–W1013',
    functionality: 'Chilled or frozen, standard or sugared variants.',
    applications: ['Bakery Products'],
  },
  egg_yolk_liquid: {
    codeRange: 'Y1001–Y1019',
    functionality: 'Chilled or frozen, salted or high-colour variants, plus heat-stabilised salted variants.',
    applications: ['Cosmetics', 'Ice Cream', 'Mayonnaise'],
  },
  egg_albumen_liquid: {
    codeRange: 'A1001–A1006',
    functionality: 'Chilled or frozen, with high-whip foaming variants.',
    applications: ['Cakes', 'Meringues', 'Confectionery', 'Noodles'],
  },
};

// Functionality tags - each mapped only to the real product ids confirmed
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
        description: 'Chilled and frozen pasteurised liquid whole egg, egg yolk, and egg albumen - format, benefits, and typical uses for food manufacturers.',
        keywords: 'liquid egg category, whole egg liquid, egg yolk liquid, egg albumen liquid, pasteurised liquid egg',
        canonical: 'https://www.skmegg.com/category_liquids',
      }}
      categoryLabel="Product Category"
      title="Liquid Egg Products"
      format="Pasteurised liquid egg products are available in chilled or frozen form and supplied as whole egg, egg yolk or egg albumen, ready for direct incorporation into food formulations."
      advantages={[
        'Retains the nutritional benefits of eggs while offering convenient dosing and handling, eliminating the need for manual egg breaking in industrial kitchens.',
        'Enhances cake volume, improves crumb softness and helps delay starch retrogradation, contributing to prolonged product freshness.',
      ]}
      whoUsesIt="Industrial bakeries and institutional kitchens producing cakes, bakery products, and standardised ready-meal recipes at scale."
      storage="Chilled (0°C to 4°C) or Frozen (≤ -18°C), depending on variant."
      categoryProductIds={['whole_egg_liquid', 'egg_yolk_liquid', 'egg_albumen_liquid']}
      productMeta={productMeta}
      functionalityTags={functionalityTags}
      onPageChange={onPageChange}
    />
  );
}
