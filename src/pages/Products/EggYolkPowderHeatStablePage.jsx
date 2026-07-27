import ProductPage from '../../components/ProductPage/ProductPage';

import EggYolkHeatStablePowderMainImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Yolk Powder - Heat Stable/EGG YOLK HEAT STABLE POWDER_1000x667px.png';
import DressingsImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Yolk Powder - Heat Stable/Dressings 2.png';
import EmulsifiedProductsImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Yolk Powder - Heat Stable/Emulsified products 1.png';
import MayonnaiseImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Yolk Powder - Heat Stable/Mayonnaise 2.png';
import SaucesImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Yolk Powder - Heat Stable/Sauces 1.png';

export const variantsData = [
  {
    code: 'Y1111',
    name: 'Egg Yolk Powder Heat Stable',
    description: 'Pasteurized spray-dried hen egg yolk powder enzymatically modified with phospholipase to ensure excellent thermal stability and emulsifying properties under pasteurization temperatures.',
    applications: 'Mayonnaise, hot sauces, salad dressings, and liquid egg yolk formulations.',
    benefits: 'High emulsion stability under high heat pasteurization; prevents phase separation of oil and water in sauces.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 54.0%', protein: 'Min 29.0%', ph: '6.0 - 7.0', character: 'Modified Heat-Stable Emulsifier' }
  },
  {
    code: 'Y1115',
    name: 'Egg Yolk Powder Heat Stable',
    description: 'Heat-stable modified egg yolk powder designed for industrial hot emulsification sauce processes and high-shear operations.',
    applications: 'Sterilized culinary sauces, hollandaise, bearnaise, salad dressings, and retort-pouched gravies.',
    benefits: 'Resists high heat processing and high-temperature storage without degradation of texture or viscosity.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 54.0%', protein: 'Min 29.0%', ph: '6.0 - 7.0', character: 'Retort Stable & High Heat Emulsifier' }
  },
  {
    code: 'Y1117',
    name: 'Egg Yolk Powder Heat Stable',
    description: 'Phospholipase-modified dried yolk powder offering deep golden color and enhanced viscosity under heat application.',
    applications: 'Premium high-end mayonnaise, hollandaise sauces, and heat-treated dessert custards.',
    benefits: 'Natural coloring and creamy thick texture; maintains active emulsion properties under pasteurizing temperatures.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 54.0%', protein: 'Min 29.0%', ph: '6.0 - 7.0', character: 'Deep Golden Color Index (Beta-carotene > 35 ppm)' }
  },
  {
    code: 'Y1125',
    name: 'Egg Yolk Powder Heat Stable',
    description: 'Emulsifying heat-stable egg yolk powder with co-dried anti-caking agent for bulk packaging and vending processes.',
    applications: 'Industrial dry mixes, instant sauce mixes, gravy blends, and automated soup dispensers.',
    benefits: 'Flows smoothly, runs cleanly without clumping in automated dosing hoppers, and maintains active emulsion under heat.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 53.0%', protein: 'Min 28.5%', ph: '6.2 - 7.2', character: 'Flow Agent (Insoluble Ash) < 1.0%' }
  },
  {
    code: 'Y1227',
    name: 'Egg Yolk Powder Heat Stable',
    description: 'High-performance modified egg yolk powder with exceptional water-binding and oil-emulsifying capacity.',
    applications: 'Reduced-fat mayonnaise, low-calorie salad dressings, and high-water-absorption bakery batters.',
    benefits: 'Helps maintain rich mouthfeel and viscosity even in low-fat emulsified products.',
    specifications: { moisture: 'Max 3.8%', fat: 'Min 52.0%', protein: 'Min 30.0%', ph: '6.2 - 7.2', character: 'Enhanced Low-Fat Emulsion Stability' }
  }
];

const applicationsData = [
  { name: 'Mayonnaise', image: MayonnaiseImg, description: 'Delivers heat-stable emulsification to prevent oil-water separation in pasteurized mayonnaise production.' },
  { name: 'Dressings', image: DressingsImg, description: 'Maintains stable creamy emulsions in salad dressings even under high-shear and thermal processing.' },
  { name: 'Sauces', image: SaucesImg, description: 'Provides consistent viscosity and smooth texture in hot-filled and retort-sterilized culinary sauces.' },
  { name: 'Emulsified Products', image: EmulsifiedProductsImg, description: 'Ensures phase stability across a wide range of hot-processed emulsified food formulations.' }
];

export default function EggYolkPowderHeatStablePage({ onPageChange }) {
  return (
    <ProductPage
      seo={{
        title: 'Heat Stable Egg Yolk Powder | Mayonnaise Emulsifier Supplier',
        description: "SKM's heat-stable egg yolk powder retains emulsification at high temperatures — ideal for mayonnaise, dressings & processed foods. Pasteurized, BRCGS & Halal certified. Bulk manufacturer & exporter from India.",
        keywords: 'heat stable egg yolk powder, heat resistant egg yolk powder, egg yolk powder mayonnaise, egg yolk emulsifier powder, heat stable egg powder, egg yolk powder for dressings, mayonnaise egg powder supplier, heat stable yolk manufacturer, egg yolk powder bulk exporter, pasteurized egg yolk powder heat stable',
        canonical: 'https://www.skmegg.com/egg_yolk_powder_heat_stable',
        jsonLd: {
          '@context': 'https://schema.org', '@type': 'Product',
          name: 'Egg Yolk Powder - Heat Stable',
          description: 'Premium heat-stable spray-dried pasteurized egg yolk powder for mayonnaise, dressings and processed food applications. Maintains emulsification at high temperatures.',
          brand: { '@type': 'Brand', name: 'SKM Egg Products' },
          manufacturer: { '@type': 'Organization', name: 'SKM Egg Products', url: 'https://www.skmegg.com' },
          category: 'Egg Powders', url: 'https://www.skmegg.com/egg_yolk_powder_heat_stable',
          offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD', seller: { '@type': 'Organization', name: 'SKM Egg Products' } }
        }
      }}
      onPageChange={onPageChange}
      hero={{
        backgroundImage: EggYolkHeatStablePowderMainImg,
        backgroundAlt: 'SKM Egg Yolk Powder Heat Stable background',
        categoryLabel: 'Egg Powders Range',
        titleLine1: 'Egg Yolk Powder',
        titleLine2: '- Heat Stable',
        description: 'Pasteurized Dried Hen Egg Yolk Powder for mayonnaise & food applications. Stabilized for oil emulsification during heat application.',
        primaryBadge: 'Modified Hen Egg Yolk Product'
      }}
      variantsData={variantsData}
      applicationsData={applicationsData}
      productName="Egg Yolk Powder Heat Stable"
      productId="egg_yolk_powder_heat_stable"
    />
  );
}
