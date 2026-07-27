import ProductPage from '../../components/ProductPage/ProductPage';

import WholeEggPowderMainImg from '../../assets/3. PRODUCTS/Egg Powders/Whole Egg Powder/WHOLE EGG POWDER_1000x667px.png';
import BakeryMixImg from '../../assets/3. PRODUCTS/Egg Powders/Whole Egg Powder/Bakery mix 1.png';
import BiscuitsImg from '../../assets/3. PRODUCTS/Egg Powders/Whole Egg Powder/Biscuits 1.png';
import CakesImg from '../../assets/3. PRODUCTS/Egg Powders/Whole Egg Powder/Cakes 1.png';
import DressingsImg from '../../assets/3. PRODUCTS/Egg Powders/Whole Egg Powder/Dressings 1.png';
import OmeletteImg from '../../assets/3. PRODUCTS/Egg Powders/Whole Egg Powder/Omlette 1.png';
import PastaImg from '../../assets/3. PRODUCTS/Egg Powders/Whole Egg Powder/Pasta 1.png';
import QuichesImg from '../../assets/3. PRODUCTS/Egg Powders/Whole Egg Powder/Quinchies 1.png';
import SaucesImg from '../../assets/3. PRODUCTS/Egg Powders/Whole Egg Powder/Sauces 2.png';

export const variantsData = [
  {
    code: 'W1201',
    name: 'Whole Egg Powder - High Colour',
    description: 'Pasteurized Dried Whole Hen Egg Powder with enhanced natural yellow coloration parameters, specifically produced to deliver a rich, appealing golden appearance in finished baked foods.',
    applications: 'Premium yellow cakes, egg noodles, sweet pastries, custards, and gold-hued premium biscuits.',
    benefits: 'Enhances food aesthetic value naturally, supports excellent crumb binding, and maintains rich dairy-egg taste.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 40.0%', protein: 'Min 45.0%', ph: '7.0 - 8.5', color: 'Enhanced Yellow Index (Beta-carotene > 15 ppm)' }
  },
  {
    code: 'W1202',
    name: 'Whole Egg Powder Standard',
    description: 'Standard pasteurized spray-dried whole hen egg powder with excellent solubility, balanced structural binding, and reliable coagulation properties.',
    applications: 'Everyday bakery items, cookies, general biscuits, waffle and pancake dry mixes, and bulk flour recipes.',
    benefits: 'Long-term shelf stability, simple dosing and weight ratio control, and reliable structural crumb development.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 40.0%', protein: 'Min 45.0%', ph: '7.5 - 9.0', color: 'Standard Natural Yellow' }
  },
  {
    code: 'W1203',
    name: 'Whole Egg Powder - 4% Sugar',
    description: 'Pasteurized dried whole egg powder containing 4% co-dried sugar to protect proteins during drying, support yeast activity, and delay crumb staling.',
    applications: 'Sweet yeast-raised doughs, sponge cakes, sweet biscuits, wafers, and confectionery items.',
    benefits: 'Prevents protein denaturation, increases baked product volume, and improves freshness retention/moisture levels.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 38.0%', protein: 'Min 43.5%', ph: '7.0 - 8.5', color: 'Sucrose Content: 4.0% (±0.5%)' }
  },
  {
    code: 'W1204',
    name: 'De-Sugared Whole Egg Powder',
    description: 'Pasteurized dried whole egg powder from which natural glucose has been enzymatically removed prior to drying to eliminate Maillard browning during shelf life.',
    applications: 'Mayonnaise, salad dressings, dehydrated savory soup packets, and long-life military rations.',
    benefits: 'Prevents brown discoloration and flavor deterioration under hot/humid storage conditions; preserves clean profile.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 41.5%', protein: 'Min 46.5%', ph: '6.5 - 8.0', color: 'Residual Glucose < 0.1%' }
  },
  {
    code: 'W1205',
    name: 'Whole Egg Powder Standard',
    description: 'Consistent, spray-dried whole egg powder optimized for large-scale industrial batters, showing excellent emulsification capacity.',
    applications: 'Industrial cakes, muffin mixes, bread coatings, standard dry mixes, and institutional food preparations.',
    benefits: 'High volume whipping stabilization, excellent water binding, and trouble-free dosing in automated lines.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 40.0%', protein: 'Min 45.0%', ph: '7.5 - 9.0', color: 'Standard Natural Yellow' }
  },
  {
    code: 'W1206',
    name: 'De-Sugared Whole Egg Powder',
    description: 'Premium glucose-free dried whole egg powder designed to maintain chemical stability and functional performance in sterilization processes.',
    applications: 'Canned savory spreads, retort pouches, infant formulations, instant noodle blocks, and emergency rations.',
    benefits: 'Zero risk of Maillard reaction or caramelization off-flavors; stable emulsifying and binding matrix.',
    specifications: { moisture: 'Max 3.5%', fat: 'Min 41.5%', protein: 'Min 46.5%', ph: '6.5 - 8.0', color: 'Residual Glucose < 0.05%' }
  },
  {
    code: 'W1207',
    name: 'Whole Egg Powder - High Color',
    description: 'Deep yellow dried whole hen egg powder sourced from dedicated layer farms fed with natural carotenoids, yielding exceptional baked color.',
    applications: 'Artisanal brioche, high-end pastries, premium ramen egg noodles, yellow cake sheets, and custard bases.',
    benefits: 'Vibrant golden yellow visual color without additives; high natural emulsifying activity and excellent mouthfeel.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 40.0%', protein: 'Min 45.0%', ph: '7.0 - 8.5', color: 'Deep Golden Color Index (Beta-carotene > 18 ppm)' }
  },
  {
    code: 'W1225',
    name: 'Whole Egg Powder Free Flow',
    description: 'Pasteurized dried whole egg powder containing a food-grade anti-caking agent to deliver superior flow properties and minimize compaction.',
    applications: 'Automated dry-mix vending systems, automated ingredient hoppers, seasoning blends, and bulk packaging lines.',
    benefits: 'Avoids bridging and clumping in automated bulk feeders, ensuring high process accuracy and less downtime.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 39.5%', protein: 'Min 44.5%', ph: '7.2 - 8.8', color: 'Flow Agent (Insoluble Ash) < 1.0%' }
  },
  {
    code: 'W1228',
    name: 'Whole Egg Powder - Enriched',
    description: 'Nutritionally enhanced whole egg powder containing concentrated essential nutrients and lipids, ideal for functional health lines.',
    applications: 'Sports nutrition supplements, fortified protein mixes, meal replacement bars, and specialty health bakery lines.',
    benefits: 'High biological value protein, rich essential amino acid profile, and healthy dietary fat content.',
    specifications: { moisture: 'Max 3.8%', fat: 'Min 41.0%', protein: 'Min 46.0%', ph: '7.2 - 8.5', color: 'Vitamin/Mineral Fortified Base' }
  },
  {
    code: 'W1259',
    name: 'Whole Egg Powder - Sugared',
    description: 'Sweetened whole egg powder co-dried with sugar (sucrose) to preserve protein structure, enhance foaming rate, and build texture stability.',
    applications: 'Chiffon cakes, sponge cakes, rolls, sweet confectionery creams, and aeration-driven batters.',
    benefits: 'Accelerates foam overrun, stabilizes bubbles in baking heat, and yields an ultra-fine cake crumb.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 36.0%', protein: 'Min 41.0%', ph: '7.0 - 8.2', color: 'Sucrose Content: 8.0% - 10.0%' }
  },
  {
    code: 'W1260',
    name: 'Whole Egg Powder - High Protein',
    description: 'High-performance whole egg powder optimized with an increased protein ratio, blending yolk richness with strong egg white gelling properties.',
    applications: 'High-protein snacks, sports bars, nutritional pastas, gluten-free baking, and functional keto food lines.',
    benefits: 'Supports clean labels with high protein claims, provides moistness, and ensures strong heat-gel coagulation.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 35.0%', protein: 'Min 52.0%', ph: '7.2 - 8.5', color: 'Protein-Boosted Profile' }
  },
  {
    code: 'W1215',
    name: 'Whole Egg Powder - Heat Stable',
    description: 'Modified whole egg powder treated to preserve active emulsifying properties under pasteurization temperatures or hot culinary processing.',
    applications: 'Hot-filled salad dressings, heat-sterilized mayonnaise, simmer sauces, and high-temperature emulsified gravies.',
    benefits: 'Prevents oil-water splitting in warm emulsion states; maintains excellent creaminess and thickness throughout heat cycles.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 40.0%', protein: 'Min 44.0%', ph: '7.2 - 8.5', color: 'Heat-Emulsifying Stability: > 95%' }
  },
  {
    code: 'W1214',
    name: 'Whole Egg Powder - High Gel',
    description: 'Specialty spray-dried whole egg powder engineered to provide superior heat-induced gelation and binding matrix strength.',
    applications: 'Surimi products, processed seafood, binding matrices in sausage, meat replacements, and structured Asian noodles.',
    benefits: 'Coagulates into a firm, water-retaining protein gel matrix upon heating, improving sliceability and moisture retention.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 38.0%', protein: 'Min 47.0%', ph: '7.5 - 9.0', color: 'Gel Strength: > 200 g/cm²' }
  }
];

const applicationsData = [
  { name: 'Bakery Mix', image: BakeryMixImg, description: 'Provides consistent volume, structure, and crumb binding in standardized industrial premixes.' },
  { name: 'Biscuits', image: BiscuitsImg, description: 'Enhances crispy textures, dough handling, and naturally imparts a golden, oven-baked surface color.' },
  { name: 'Cakes', image: CakesImg, description: 'Acts as a natural foaming agent to produce high volume, airy sponge texture, and moist mouthfeel.' },
  { name: 'Dressings', image: DressingsImg, description: 'Emulsifies water and oil molecules to prevent layer separation in mayonnaise and salad dressings.' },
  { name: 'Omelette', image: OmeletteImg, description: 'Offers rapid preparation, easy handling, and absolute flavor uniformity in convenience kitchens.' },
  { name: 'Pasta', image: PastaImg, description: 'Strengthens gluten structures, improves cooking integrity, and yields a firm bite (al dente) texture.' },
  { name: 'Quiches', image: QuichesImg, description: 'Provides a resilient, custard-like binding matrix to support heavy fillings in savory tarts and quiches.' },
  { name: 'Sauces', image: SaucesImg, description: 'Builds stable, creamy emulsions with smooth mouthfeel and consistent thickness across temperature ranges.' }
];

export default function WholeEggPowderPage({ onPageChange }) {
  return (
    <ProductPage
      seo={{
        title: 'Whole Egg Powder | Spray Dried Egg Powder Manufacturer',
        description: "SKM's premium spray-dried whole hen egg powder for bakery, confectionery & food processing. 13 product variants available. Pasteurized, BRCGS & Halal certified. Bulk manufacturer & exporter from India.",
        keywords: 'whole egg powder, dried whole egg powder, spray dried egg powder, whole egg powder bulk, whole egg powder manufacturer, whole egg powder supplier India, pasteurized whole egg powder, whole egg powder bakery, egg powder food industry, buy whole egg powder, whole egg powder exporter, dried egg powder wholesale',
        canonical: 'https://www.skmegg.com/whole_egg_powder',
        jsonLd: {
          '@context': 'https://schema.org', '@type': 'Product',
          name: 'Whole Egg Powder',
          description: 'Premium spray-dried pasteurized whole hen egg powder for bakery, confectionery, and food processing. 13 product variants.',
          brand: { '@type': 'Brand', name: 'SKM Egg Products' },
          manufacturer: { '@type': 'Organization', name: 'SKM Egg Products', url: 'https://www.skmegg.com' },
          category: 'Egg Powders', url: 'https://www.skmegg.com/whole_egg_powder',
          offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD', seller: { '@type': 'Organization', name: 'SKM Egg Products' } }
        }
      }}
      onPageChange={onPageChange}
      hero={{
        backgroundImage: WholeEggPowderMainImg,
        backgroundAlt: 'SKM Whole Egg Powder background',
        categoryLabel: 'Egg Powders Range',
        titleLine1: 'Whole Egg',
        titleLine2: 'Powder',
        description: 'Pasteurized Dried Whole Hen Egg Powder optimized for commercial bakery, confectionery, noodles, mayonnaise, and general food formulations. Prepared to offer the highest functional stability and rigorous safety standards for large-scale industrial manufacturing.'
      }}
      variantsData={variantsData}
      applicationsData={applicationsData}
      productName="Whole Egg Powder"
      productId="whole_egg_powder"
    />
  );
}
