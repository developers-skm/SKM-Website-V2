import ProductPage from '../../components/ProductPage/ProductPage';

import EggYolkLiquidMainImg from '../../assets/3. PRODUCTS/Egg Liquids/Egg Yolk Liquid/EGG YOLK LIQUID_1000x667px.png';
import BakeryImg from '../../assets/3. PRODUCTS/Egg Liquids/Egg Yolk Liquid/Bakery 1.png';
import CosmeticsImg from '../../assets/3. PRODUCTS/Egg Liquids/Egg Yolk Liquid/Cosmetics 1.png';
import IceCreamImg from '../../assets/3. PRODUCTS/Egg Liquids/Egg Yolk Liquid/Ice cream 3.png';
import MayonnaiseImg from '../../assets/3. PRODUCTS/Egg Liquids/Egg Yolk Liquid/Mayonnaise 4.png';

export const variantsData = [
  {
    code: 'Y1001',
    name: 'Chilled Egg Yolk Liquid',
    description: 'Pasteurised chilled liquid hen egg yolk with high dry matter and rich natural fats, kept under temperature control to retain fresh functionality.',
    applications: 'Rich salad dressings, standard mayonnaise, premium cakes, custards, and ice cream.',
    benefits: 'Delivers outstanding emulsion capacity, fresh creaminess, and deep golden-yellow coloration.',
    specifications: { moisture: '50.0% - 53.0%', protein: 'Min 15.0%', ph: '6.0 - 7.0', storage: 'Chilled (0°C to 4°C)', character: 'Native Emulsifying & Color Agent' }
  },
  {
    code: 'Y1002',
    name: 'Chilled Egg Yolk Liquid - 11% Salt',
    description: 'Chilled liquid hen egg yolk pasteurised with 11% co-dispersed salt for advanced protection against heat denaturation and long-term shelf stability.',
    applications: 'Mayonnaise, hot sauces, dressings, and savory spreads.',
    benefits: 'Salt stabilizes emulsification properties during processing and high-shear operations.',
    specifications: { moisture: '44.0% - 47.0%', protein: 'Min 13.0%', ph: '5.8 - 6.8', storage: 'Chilled (0°C to 4°C)', character: 'Salt Content: 11.0% (±0.5%)' }
  },
  {
    code: 'Y1003',
    name: 'Chilled Egg Yolk Liquid - 14% Salt',
    description: 'Pasteurised liquid hen egg yolk with 14% salt content, held under chilled storage. Highly stable against microbial growth.',
    applications: 'Bulk savory sauce preparation, highly salted mayonnaise, salad dressings.',
    benefits: 'Extra-long chilled shelf life and enhanced emulsification strength under salty environments.',
    specifications: { moisture: '42.0% - 45.0%', protein: 'Min 12.0%', ph: '5.8 - 6.8', storage: 'Chilled (0°C to 4°C)', character: 'Salt Content: 14.0% (±0.5%)' }
  },
  {
    code: 'Y1004',
    name: 'Chilled Egg Yolk Liquid - 11% Salt - High Colour',
    description: 'Salted chilled liquid yolk sourced from carotenoid-rich hen feed, offering deep golden color parameters.',
    applications: 'Golden yellow mayonnaise, premium rich dressings, brioches, and yellow pastries.',
    benefits: 'Imparts rich natural gold color without artificial dye; stable emulsion under thermal and shear stresses.',
    specifications: { moisture: '44.0% - 47.0%', protein: 'Min 13.0%', ph: '5.8 - 6.8', storage: 'Chilled (0°C to 4°C)', character: 'Salted High Color (Beta-carotene > 35 ppm)' }
  },
  {
    code: 'Y1008',
    name: 'Chilled Egg Yolk Liquid - 11% Salt - Stabilized',
    description: 'Modified chilled liquid yolk, stabilized and co-treated with 11% salt to prevent heat-coagulation during hot filling.',
    applications: 'Thermally pasteurised sauces, hot-filled mayonnaise, bearnaise, and simmered dressings.',
    benefits: 'Resists thermal breakdown; maintains smooth creaminess without oil splitting.',
    specifications: { moisture: '44.0% - 47.0%', protein: 'Min 13.0%', ph: '5.8 - 6.8', storage: 'Chilled (0°C to 4°C)', character: 'Heat-Stable Modified Base' }
  },
  {
    code: 'Y1009',
    name: 'Chilled Egg Yolk Liquid - 8% Salt',
    description: 'Pasteurised chilled liquid egg yolk blended with 8% salt, offering balanced saltiness and active emulsification.',
    applications: 'Standard mayonnaise, creamy salad dressings, dips, and savory sauces.',
    benefits: 'Perfect viscosity development and intermediate salt-flavor balance.',
    specifications: { moisture: '46.0% - 49.0%', protein: 'Min 14.0%', ph: '5.8 - 6.8', storage: 'Chilled (0°C to 4°C)', character: 'Salt Content: 8.0% (±0.5%)' }
  },
  {
    code: 'Y1014',
    name: 'Frozen Egg Yolk Liquid - 14% Salt',
    description: 'Pasteurised liquid egg yolk with 14% salt, blast frozen at -18°C or below to extend durability up to 12 months.',
    applications: 'Commercial mayonnaise production, prepared meals, and industrial savory formulations.',
    benefits: 'Retains active emulsification strength upon thawing; provides convenience for global shipping.',
    specifications: { moisture: '42.0% - 45.0%', protein: 'Min 12.0%', ph: '5.8 - 6.8', storage: 'Frozen (≤ -18°C)', character: 'Frozen Salt Content: 14.0% (±0.5%)' }
  },
  {
    code: 'Y1015',
    name: 'Frozen Egg Yolk Liquid - 11% Salt',
    description: 'Pasteurized liquid egg yolk with 11% salt, blast frozen to lock in emulsifying properties.',
    applications: 'Mayonnaise, salad dressings, and large-scale catering kitchens.',
    benefits: 'Long frozen durability, uniform performance, and easy thawing.',
    specifications: { moisture: '44.0% - 47.0%', protein: 'Min 13.0%', ph: '5.8 - 6.8', storage: 'Frozen (≤ -18°C)', character: 'Frozen Salt Content: 11.0% (±0.5%)' }
  },
  {
    code: 'Y1016',
    name: 'Frozen Egg Yolk Liquid - 10% Salt',
    description: 'Frozen pasteurised liquid yolk with 10% salt, offering excellent creaminess and high lipid density.',
    applications: 'Creamy dressings, hollandaise, and bulk savory sauces.',
    benefits: 'Easy dispersion, high viscosity building, and excellent shelf stability in frozen storage.',
    specifications: { moisture: '44.5% - 47.5%', protein: 'Min 13.5%', ph: '5.8 - 6.8', storage: 'Frozen (≤ -18°C)', character: 'Frozen Salt Content: 10.0% (±0.5%)' }
  },
  {
    code: 'Y1017',
    name: 'Frozen Egg Yolk Liquid - 10% Salt - Dark Colour',
    description: 'Specialty frozen yolk liquid with 10% salt and enhanced dark color profile, offering visual rich appearance.',
    applications: 'Rich golden mayonnaise, gold biscuits, yellow noodle pasta, and specialty baked goods.',
    benefits: 'Premium golden presentation without dyes; excellent emulsion stability.',
    specifications: { moisture: '44.5% - 47.5%', protein: 'Min 13.5%', ph: '5.8 - 6.8', storage: 'Frozen (≤ -18°C)', character: 'Dark Golden Color & 10% Salt' }
  },
  {
    code: 'Y1018',
    name: 'Frozen Egg Yolk Liquid - 10% Salt - Dark Colour - Stabilized',
    description: 'Enzymatically modified frozen yolk liquid containing 10% salt, dark color properties, and enhanced thermal tolerance.',
    applications: 'Hot pasteurized premium mayonnaise, hot-filled dressings, and retorted savory food packages.',
    benefits: 'Highly heat-stable emulsion, dark golden hue, and high water-binding strength.',
    specifications: { moisture: '44.5% - 47.5%', protein: 'Min 13.5%', ph: '5.8 - 6.8', storage: 'Frozen (≤ -18°C)', character: 'Heat-Stable modified base & 10% Salt' }
  },
  {
    code: 'Y1019',
    name: 'Frozen Egg Yolk Liquid',
    description: 'Freshly separated pure liquid egg yolk pasteurized and blast frozen without additives or preservatives.',
    applications: 'Premium ice cream, custards, sweet bakery batters, and natural clean-label food preparations.',
    benefits: '100% natural, clean-label ingredient; provides rich creaminess and smooth body.',
    specifications: { moisture: '50.0% - 53.0%', protein: 'Min 15.0%', ph: '6.0 - 7.0', storage: 'Frozen (≤ -18°C)', character: 'Natural 100% Yolk Liquid Base' }
  }
];

const applicationsData = [
  { name: 'Bakery', image: BakeryImg, description: 'Provides rich emulsification, golden color, and creamy mouthfeel across bakery applications.' },
  { name: 'Cosmetics', image: CosmeticsImg, description: 'Natural lecithin-rich yolk liquid used as an emulsifier and conditioning agent in cosmetic formulations.' },
  { name: 'Ice Cream', image: IceCreamImg, description: 'Delivers smooth, creamy body and stable fat emulsification in premium ice cream production.' },
  { name: 'Mayonnaise', image: MayonnaiseImg, description: 'Creates stable, rich oil-in-water emulsions with consistent viscosity and golden color in mayonnaise.' }
];

export default function EggYolkLiquidPage({ onPageChange }) {
  return (
    <ProductPage
      seo={{
        title: 'Liquid Egg Yolk | Pasteurized Egg Yolk Liquid Manufacturer',
        description: "SKM's premium pasteurized chilled & frozen liquid egg yolk for mayonnaise, dressings, bakery & cosmetics. 12 product variants including salted, sugared, frozen yolk. BRCGS & Halal certified bulk exporter from India.",
        keywords: 'liquid egg yolk, egg yolk liquid, pasteurized liquid egg yolk, frozen egg yolk liquid, chilled egg yolk liquid, liquid egg yolk supplier, egg yolk liquid manufacturer India, salted egg yolk liquid, sugared egg yolk liquid, buy liquid egg yolk, egg yolk liquid bulk, liquid egg yolk mayonnaise, egg yolk liquid exporter',
        canonical: 'https://www.skmegg.com/egg_yolk_liquid',
        jsonLd: {
          '@context': 'https://schema.org', '@type': 'Product',
          name: 'Egg Yolk Liquid',
          description: 'Premium pasteurized chilled and frozen liquid egg yolk for mayonnaise, dressings, bakery, and cosmetics. 12 product variants.',
          brand: { '@type': 'Brand', name: 'SKM Egg Products' },
          manufacturer: { '@type': 'Organization', name: 'SKM Egg Products', url: 'https://www.skmegg.com' },
          category: 'Liquid Egg Products', url: 'https://www.skmegg.com/egg_yolk_liquid',
          offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD', seller: { '@type': 'Organization', name: 'SKM Egg Products' } }
        }
      }}
      breadcrumbItems={[{ label: 'Products' }, { label: 'Egg Liquids' }, { label: 'Egg Yolk Liquid' }]}
      onPageChange={onPageChange}
      hero={{
        backgroundImage: EggYolkLiquidMainImg,
        backgroundAlt: 'SKM Egg Yolk Liquid background',
        categoryLabel: 'Egg Liquids Range',
        titleLine1: 'Egg Yolk',
        titleLine2: 'Liquid',
        description: 'We offer a wide range of Egg Yolk Liquids. Salted yolk, heat stable egg yolk are best suited for mayonnaise and sauces preparation.'
      }}
      variantsData={variantsData}
      applicationsData={applicationsData}
      productName="Egg Yolk Liquid"
      productId="egg_yolk_liquid"
    />
  );
}
