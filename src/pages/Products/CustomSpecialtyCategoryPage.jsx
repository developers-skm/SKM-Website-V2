import CategoryPage from './CategoryPage';

// This family (Customized Mix, Customized Packages, Speciality Liquid
// Blends, Egg White Cube) has no genuinely shared benefits, applications,
// or storage value across all 4 products — confirmed in
// src/pages/Home/sections/ProductFamilies.jsx's own audit note. Only
// `format: ['Custom']` (verbatim `packagingOptions` from products.js) is
// real and shared, so "Main operational advantages" and "Storage and
// supply considerations" are intentionally omitted here rather than merged
// into a fabricated family-wide claim.
//
// productMeta: only customized_mix has real per-SKU code/applications data
// (variantsData in CustomizedMixPage.jsx — single variant, code Y1119).
// customized_packages, speciality_egg_liquids, and egg_white_cube are
// feature-card pages with no variantsData/applicationsData structure at
// all, so their codeRange/functionality/applications fields are
// intentionally omitted rather than invented.
//
// No functionalityTags for this category — the brief only specifies
// functionality tag sets for Egg Powders and Liquids, and no real trait
// taxonomy exists across this family's 4 dissimilar products.
const productMeta = {
  customized_mix: {
    codeRange: 'Y1119',
    functionality: 'Heat-stable emulsification for hot-filled mayonnaise and thermally processed sauces.',
    applications: ['Mayonnaise'],
  },
};

export default function CustomSpecialtyCategoryPage({ onPageChange }) {
  return (
    <CategoryPage
      seo={{
        title: 'Customised and Specialty Products | SKM Egg Products Category Guide',
        description: 'Custom egg powder blends, specialty liquid blends, egg white cube, and customised packaging — configured to your exact recipe and format.',
        keywords: 'customized egg products, custom egg powder blend, speciality egg liquid, egg white cube, customized packaging',
        canonical: 'https://www.skmegg.com/category_custom',
      }}
      categoryLabel="Product Category"
      title="Customised and Specialty Products"
      format="Custom-configured egg powder blends, speciality liquid blends, cooked egg white cube, and customised packaging — built to your exact specification rather than a fixed catalogue format."
      whoUsesIt="Food manufacturers with a specific recipe, packaging, or formulation requirement not met by a standard catalogue product — for example hot-fill mayonnaise producers needing a heat-stable custom blend."
      categoryProductIds={['customized_mix', 'customized_packages', 'speciality_egg_liquids', 'egg_white_cube']}
      productMeta={productMeta}
      onPageChange={onPageChange}
    />
  );
}
