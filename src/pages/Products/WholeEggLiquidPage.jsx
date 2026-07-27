import ProductPage from '../../components/ProductPage/ProductPage';

import WholeEggLiquidMainImg from '../../assets/3. PRODUCTS/Egg Liquids/Whole Egg Liquid/WHOLE EGG LIQUID_1000x667px.png';
import BakeryProductsImg from '../../assets/3. PRODUCTS/Egg Liquids/Whole Egg Liquid/Bakery products.png';
import CakeImg from '../../assets/3. PRODUCTS/Egg Liquids/Whole Egg Liquid/Cake 3.png';
import CupCakesImg from '../../assets/3. PRODUCTS/Egg Liquids/Whole Egg Liquid/Cup Cakes 1.png';
import EggPastryImg from '../../assets/3. PRODUCTS/Egg Liquids/Whole Egg Liquid/Egg pastry 3.png';

export const variantsData = [
  {
    code: 'W1001',
    name: 'Chilled Whole Egg Liquid',
    description: 'Pasteurised liquid hen egg whole content containing yolk and white in natural proportions, chilled to protect fresh structure and coagulation strength.',
    applications: 'Standard sponge cakes, biscuits, cookies, pasta, noodles, salad dressings, and general food processing.',
    benefits: 'Full nutrient density, easy dosing and handling, eliminates eggshell-breaking hazards in industrial kitchens.',
    specifications: { moisture: '75.0% - 77.0% (Solids Min 23.5%)', fat: 'Min 9.5%', protein: 'Min 11.5%', ph: '7.0 - 7.8', storage: 'Chilled (0°C to 4°C)', character: 'Natural 100% Whole Egg Proportion' }
  },
  {
    code: 'W1009',
    name: 'Chilled Whole Egg Liquid',
    description: 'Chilled pasteurized liquid whole egg optimized for uniform viscosity and consistent crumb binding performance in automated baking.',
    applications: 'Institutional kitchen scrambled eggs, industrial batters, cakes, muffins, and quick-bread dry mixes.',
    benefits: 'Homogeneous texture dispersion, standardized moisture content, and excellent water-binding capacity.',
    specifications: { moisture: '75.0% - 77.0% (Solids Min 23.5%)', fat: 'Min 9.5%', protein: 'Min 11.5%', ph: '7.0 - 7.8', storage: 'Chilled (0°C to 4°C)', character: 'Optimized Viscosity Baking Grade' }
  },
  {
    code: 'W1013_Chilled',
    name: 'Chilled Whole Egg Liquid - 30% Sugar',
    description: 'Chilled liquid whole egg pasteurised with 30% added sucrose to protect protein structures, enhance foam density, and extend crumb freshness.',
    applications: 'Sweet sponge cakes, Swiss rolls, pound cakes, waffles, and sweet confectionery items.',
    benefits: 'Delivers high cake volume, improves crumb softness, and significantly delays starch staling.',
    specifications: { moisture: '53.0% - 55.0% (Solids Min 46.0%)', fat: 'Min 6.5%', protein: 'Min 8.0%', ph: '6.5 - 7.5', storage: 'Chilled (0°C to 4°C)', character: 'Sucrose Content: 30.0% (±1.0%)' }
  },
  {
    code: 'W1008',
    name: 'Frozen Whole Egg Liquid - 10% Salt',
    description: 'Pasteurised liquid whole egg co-treated with 10% salt, blast frozen to prevent yolk protein gelation during sub-zero storage.',
    applications: 'Prepared savory entrees, dressings, processed meats, egg drop soups, and mayonnaise.',
    benefits: 'Maintains active yolk emulsifying strength after thawing, with extended storage stability up to 12 months.',
    specifications: { moisture: '68.0% - 70.0% (Solids Min 31.0%)', fat: 'Min 8.5%', protein: 'Min 10.0%', ph: '6.5 - 7.5', storage: 'Frozen (≤ -18°C)', character: 'Salt Content: 10.0% (±0.5%)' }
  },
  {
    code: 'W1013_Frozen',
    name: 'Frozen Whole Egg Liquid',
    description: 'Pure liquid whole hen egg, pasteurised and blast frozen without additives or salt, protecting natural fresh performance and nutritional value.',
    applications: 'Omelettes, scrambled eggs, general baking, pasta doughs, and clean-label bakery formulas.',
    benefits: '100% natural clean label ingredient, long frozen durability, simple thawing, and portion control.',
    specifications: { moisture: '75.0% - 77.0% (Solids Min 23.5%)', fat: 'Min 9.5%', protein: 'Min 11.5%', ph: '7.0 - 7.8', storage: 'Frozen (≤ -18°C)', character: 'Natural Unmodified Frozen Yolk/White Mix' }
  }
];

const applicationsData = [
  { name: 'Bakery Products', image: BakeryProductsImg, description: 'Provides consistent binding, volume, and crumb structure across a full range of industrial bakery products.' },
  { name: 'Cakes', image: CakeImg, description: 'Delivers aeration, moisture retention, and rich egg flavor in premium layer cakes and sponges.' },
  { name: 'Cup Cakes', image: CupCakesImg, description: 'Ensures consistent rise, tender crumb, and uniform texture in portion-controlled cupcake production.' },
  { name: 'Egg Pastry', image: EggPastryImg, description: 'Adds structure, binding, and a golden finish to glazed and filled egg pastry products.' }
];

const stripSuffix = (code) => code.replace('_Chilled', '').replace('_Frozen', '');

export default function WholeEggLiquidPage({ onPageChange }) {
  return (
    <ProductPage
      seo={{
        title: 'Liquid Whole Egg | Pasteurized Whole Egg Liquid Supplier',
        description: "SKM's premium pasteurized chilled & frozen whole egg liquid for cakes, pastries, pasta & bakery. 5 product variants including sugared and frozen. BRCGS & Halal certified bulk exporter from India.",
        keywords: 'liquid whole egg, whole egg liquid, pasteurized whole egg liquid, frozen whole egg liquid, chilled whole egg liquid, whole egg liquid supplier, liquid whole egg manufacturer India, whole egg liquid bulk, sugared whole egg liquid, buy liquid whole egg, whole egg liquid bakery, pasteurized liquid egg, whole egg liquid exporter',
        canonical: 'https://www.skmegg.com/whole_egg_liquid',
        jsonLd: {
          '@context': 'https://schema.org', '@type': 'Product',
          name: 'Whole Egg Liquid',
          description: 'Premium pasteurized chilled and frozen whole egg liquid for cakes, pastries, pasta, and bakery products. 5 product variants.',
          brand: { '@type': 'Brand', name: 'SKM Egg Products' },
          manufacturer: { '@type': 'Organization', name: 'SKM Egg Products', url: 'https://www.skmegg.com' },
          category: 'Liquid Egg Products', url: 'https://www.skmegg.com/whole_egg_liquid',
          offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD', seller: { '@type': 'Organization', name: 'SKM Egg Products' } }
        }
      }}
      onPageChange={onPageChange}
      hero={{
        backgroundImage: WholeEggLiquidMainImg,
        backgroundAlt: 'SKM Whole Egg Liquid background',
        categoryLabel: 'Egg Liquids Range',
        titleLine1: 'Whole Egg',
        titleLine2: 'Liquid',
        description: 'Sugared whole egg liquid is best suited for bakery applications where the texture and cake height are important. Pasteurized and held under strict temperature controls.'
      }}
      variantsData={variantsData}
      applicationsData={applicationsData}
      productName="Whole Egg Liquid"
      productId="whole_egg_liquid"
      codeDisplay={stripSuffix}
    />
  );
}
