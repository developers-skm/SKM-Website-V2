import ProductPage from '../../components/ProductPage/ProductPage';

import EggYolkPowderMainImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Yolk Powder/EGG YOLK POWDER_1000x667px.png';
import DoughnutsImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Yolk Powder/39.png';
import CroissantImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Yolk Powder/Croissant 1.png';
import IceCreamImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Yolk Powder/Ice Cream 1.png';
import MayonnaiseImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Yolk Powder/Mayonnaise 1.png';
import SpanishBreadImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Yolk Powder/Spanish bread 1.png';

export const variantsData = [
  {
    code: 'Y1101',
    name: 'Egg Yolk Powder Standard',
    description: 'Standard pasteurized spray-dried hen egg yolk powder with excellent emulsifying, coloring, and texturizing properties. Adds rich taste and structure to bakery and cold emulsions.',
    applications: 'Mayonnaise, salad dressings, culinary sauces, custards, ice cream, sponge cakes, and sweet doughs.',
    benefits: 'High fat content, rich creamy mouthfeel, natural golden-yellow coloration, and excellent emulsification properties.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 56.0%', protein: 'Min 30.0%', ph: '6.0 - 7.0', character: 'Standard Emulsifying & Color Agent' }
  },
  {
    code: 'Y1104',
    name: 'Egg Yolk Powder - 4% Salt',
    description: 'Pasteurized dried hen egg yolk powder containing 4% co-dried salt to enhance the structural stability and thickness of emulsified sauces.',
    applications: 'Salted mayonnaise, salad dressings, hot hollandaise, bearnaise sauces, and savory spreads.',
    benefits: 'Prevents oil-water separation under shear; co-dried salt improves yolk protein solubility and paste stability.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 53.5%', protein: 'Min 28.5%', ph: '5.8 - 6.8', character: 'Salt Content: 4.0% (±0.5%)' }
  },
  {
    code: 'Y1105',
    name: 'Egg Yolk Powder - Standard',
    description: 'Standard-grade spray-dried egg yolk powder optimized for bulk bakery batters, dry premixes, and industrial food applications.',
    applications: 'Industrial cake premixes, cookies, biscuit doughs, instant sauce powders, and bread coatings.',
    benefits: 'Uniform fat dispersion in flour, standardized baking volume, and consistent color indexing in finished goods.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 56.0%', protein: 'Min 30.0%', ph: '6.0 - 7.0', character: 'Standard Industrial Baking Grade' }
  },
  {
    code: 'Y1107',
    name: 'Egg Yolk Powder High Color',
    description: 'Pasteurized spray-dried hen egg yolk powder with deep golden-yellow color values derived from hens fed carotenoid-rich natural diets.',
    applications: 'Premium golden croissants, custard creams, sweet brioche breads, yellow egg noodles, and artisanal cakes.',
    benefits: 'Imparts rich golden visual appeal naturally without artificial colors; enhances appearance premiumness.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 56.0%', protein: 'Min 30.0%', ph: '6.0 - 7.0', character: 'Deep Golden Color Index (Beta-carotene > 40 ppm)' }
  },
  {
    code: 'Y1225',
    name: 'Egg Yolk Powder Free Flow',
    description: 'Pasteurized dried egg yolk powder containing a minor quantity of food-grade free-flow agent to prevent compaction and clumping.',
    applications: 'Vending machines, automated dry blending systems, bulk dry bakery mixes, and dry seasoning formulas.',
    benefits: 'Runs smoothly through automated dispensers and hoppers, prevents lump formation during warehousing.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 55.0%', protein: 'Min 29.5%', ph: '6.2 - 7.2', character: 'Flow Agent (Insoluble Ash) < 1.0%' }
  }
];

const applicationsData = [
  { name: 'Croissant', image: CroissantImg, description: 'Delivers rich golden color, buttery lamination support, and deep egg flavor in premium croissants.' },
  { name: 'Ice Cream', image: IceCreamImg, description: 'Emulsifies fat and water phases to produce smooth, creamy, and stable ice cream textures.' },
  { name: 'Mayonnaise', image: MayonnaiseImg, description: 'Creates stable oil-in-water emulsions with rich mouthfeel and consistent viscosity in mayonnaise.' },
  { name: 'Spanish Bread', image: SpanishBreadImg, description: 'Adds richness, golden crumb color, and soft texture in sweet enriched bread formulations.' },
  { name: 'Doughnuts', image: DoughnutsImg, description: 'Provides golden fry color, soft crumb structure, and rich taste in fried doughnut products.' }
];

export default function EggYolkPowderPage({ onPageChange }) {
  return (
    <ProductPage
      seo={{
        title: 'Egg Yolk Powder | Dried Egg Yolk Manufacturer & Bulk Supplier',
        description: "SKM's premium spray-dried hen egg yolk powder for bakery, mayonnaise & food applications. 5 product variants — high color, standard, low-fat. Pasteurized, BRCGS & Halal certified. Bulk exporter from India.",
        keywords: 'egg yolk powder, dried egg yolk, spray dried yolk, egg yolk powder manufacturer, egg yolk powder supplier India, egg yolk powder bulk, buy egg yolk powder, egg yolk powder mayonnaise, egg yolk powder bakery, pasteurized egg yolk powder, high color egg yolk, egg yolk powder exporter, egg yolk powder food industry',
        canonical: 'https://www.skmegg.com/egg_yolk_powder',
        jsonLd: {
          '@context': 'https://schema.org', '@type': 'Product',
          name: 'Egg Yolk Powder',
          description: 'Premium spray-dried pasteurized hen egg yolk powder for bakery, food, and mayonnaise applications. 5 product variants.',
          brand: { '@type': 'Brand', name: 'SKM Egg Products' },
          manufacturer: { '@type': 'Organization', name: 'SKM Egg Products', url: 'https://www.skmegg.com' },
          category: 'Egg Powders', url: 'https://www.skmegg.com/egg_yolk_powder',
          offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD', seller: { '@type': 'Organization', name: 'SKM Egg Products' } }
        }
      }}
      breadcrumbItems={[{ label: 'Products' }, { label: 'Egg Powders' }, { label: 'Egg Yolk Powder' }]}
      onPageChange={onPageChange}
      hero={{
        backgroundImage: EggYolkPowderMainImg,
        backgroundAlt: 'SKM Egg Yolk Powder background',
        categoryLabel: 'Egg Powders Range',
        titleLine1: 'Egg Yolk',
        titleLine2: 'Powder',
        description: 'Pasteurized Dried Hen Egg Yolk Powder for bakery, food & mayonnaise applications. Rich in lipids to ensure superior emulsifying properties.'
      }}
      variantsData={variantsData}
      applicationsData={applicationsData}
      productName="Egg Yolk Powder"
      productId="egg_yolk_powder"
    />
  );
}
