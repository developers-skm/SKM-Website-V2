import CategoryPage from './CategoryPage';

// Facts below are verbatim/derived from already-audited real product data
// (src/data/products.js, src/pages/Home/sections/ProductFamilies.jsx, and
// each product's own page file — variantsData `code`/`character`/`name`,
// applicationsData `name`). No storage/handling field exists anywhere in
// powder product data — powders are specified by moisture/dryness, not
// temperature — so that field is intentionally omitted, not invented.
//
// codeRange: real min–max SKU code span read from each product page's own
// variantsData array. applications: real applicationsData `name` values
// (deduplicated). functionality: a short real-trait summary drawn from that
// product's own variantsData `character`/description fields.
const productMeta = {
  whole_egg_powder: {
    codeRange: 'W1201–W1260',
    functionality: 'High-gel binding, heat-stable emulsification, colour development, free-flow, and protein-enriched variants.',
    applications: ['Bakery Mix', 'Biscuits', 'Cakes', 'Dressings', 'Omelette', 'Pasta', 'Quiches', 'Sauces'],
  },
  egg_yolk_powder: {
    codeRange: 'Y1101–Y1225',
    functionality: 'Emulsification and natural colour development, with a high-colour variant and a free-flow variant.',
    applications: ['Croissant', 'Ice Cream', 'Mayonnaise', 'Spanish Bread', 'Doughnuts'],
  },
  egg_yolk_powder_heat_stable: {
    codeRange: 'Y1111–Y1227',
    functionality: 'Heat-stable emulsification for hot-processed and retort-sterilized applications.',
    applications: ['Mayonnaise', 'Dressings', 'Sauces', 'Emulsified Products'],
  },
  egg_albumen_powder: {
    codeRange: 'A1301–A1310',
    functionality: 'High-gel binding (up to 1300+ g/cm² gel strength), high-whip foaming, and a hydrolysed high-protein variant.',
    applications: ['Egg Pastry', 'Fish Products', 'Ham Burger', 'Meat Products', 'Sausages', 'Surimi'],
  },
};

// Functionality tags — each mapped only to the real product ids confirmed
// (by grep against each product page's own variantsData) to carry that
// trait. No tag lists a product it wasn't verified against.
const functionalityTags = [
  { label: 'High-whip', productIds: ['egg_albumen_powder'] },
  { label: 'High-gel', productIds: ['whole_egg_powder', 'egg_albumen_powder'] },
  { label: 'Heat-stable emulsification', productIds: ['whole_egg_powder', 'egg_yolk_powder_heat_stable'] },
  { label: 'Colour', productIds: ['whole_egg_powder', 'egg_yolk_powder', 'egg_yolk_powder_heat_stable'] },
  { label: 'Binding', productIds: ['whole_egg_powder', 'egg_albumen_powder'] },
  { label: 'Protein', productIds: ['whole_egg_powder', 'egg_albumen_powder'] },
];

export default function EggPowdersCategoryPage({ onPageChange }) {
  return (
    <CategoryPage
      seo={{
        title: 'Egg Powders | SKM Egg Products Category Guide',
        description: 'Spray-dried whole egg, egg yolk, and egg albumen powders — format, benefits, and typical uses for food manufacturers.',
        keywords: 'egg powder category, whole egg powder, egg yolk powder, egg albumen powder, spray dried egg powder',
        canonical: 'https://www.skmegg.com/category_powders',
      }}
      breadcrumbLabel="Egg Powders"
      categoryLabel="Product Category"
      title="Egg Powders"
      format="Spray-dried, pasteurized egg powder — whole egg, egg yolk, and egg albumen variants, supplied as a shelf-stable dry ingredient."
      advantages={[
        'Long-term shelf stability, simple dosing and weight ratio control, and reliable structural crumb development.',
        'High fat content, rich creamy mouthfeel, natural golden-yellow coloration, and excellent emulsification properties.',
        'Exceptional gelling and whipping performance for surimi, sausages, meringues, and confectionery (egg albumen powder).',
      ]}
      whoUsesIt="Industrial bakeries, confectioners, noodle and pasta manufacturers, and mayonnaise and dressing producers who need a stable, easy-to-dose dry ingredient."
      categoryProductIds={['whole_egg_powder', 'egg_albumen_powder', 'egg_yolk_powder', 'egg_yolk_powder_heat_stable']}
      productMeta={productMeta}
      functionalityTags={functionalityTags}
      onPageChange={onPageChange}
    />
  );
}
