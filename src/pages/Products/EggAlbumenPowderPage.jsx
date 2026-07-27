import ProductPage from '../../components/ProductPage/ProductPage';

import EggAlbumenPowderMainImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Albumen Powder/EGG ALBUMEN POWDER_1000x667px.png';
import EggPastryImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Albumen Powder/Egg pastry 1.png';
import FishProductsImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Albumen Powder/Fish products 2.png';
import HamburgerImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Albumen Powder/Ham burger 1.png';
import MeatProductsImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Albumen Powder/Meat products 1.png';
import SausagesImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Albumen Powder/Sasuages 1.png';
import SurimiImg from '../../assets/3. PRODUCTS/Egg Powders/Egg Albumen Powder/Surumi 1.png';

export const variantsData = [
  {
    code: 'A1301',
    name: 'Egg Albumen Powder - Standard',
    description: 'Standard pasteurized dried hen egg albumen powder with general binding, structure-building, and whipping capacity. Perfect as a multi-functional baking and binding food ingredient.',
    applications: 'Bakery products, confectionery nougats, biscuit coatings, meringue cookies, and standard binders in poultry processing.',
    benefits: 'Highly versatile performance, rapid cold-water solubility, and exceptional shelf-life stability.',
    specifications: { moisture: 'Max 8.0%', protein: 'Min 80.0%', ph: '6.0 - 7.5', character: 'Standard Whipping & Binding Matrix' }
  },
  {
    code: 'A1302',
    name: 'Egg Albumen Powder (High Gel 1000-1100)',
    description: 'High-gelation dried egg white powder. Coagulates upon heating to form a stable, resilient protein gel structure with a gel strength in the range of 1000-1100 g/cm².',
    applications: 'Surimi seafood, processed fish balls, fish cakes, sausages, and general meat products requiring a resilient binding matrix.',
    benefits: 'Improves product texturization, minimizes moisture loss (purge) during cooking, and enhances chewiness and bite firmness.',
    specifications: { moisture: 'Max 8.0%', protein: 'Min 82.0%', ph: '6.5 - 8.0', character: 'Gel Strength: 1000 - 1100 g/cm²' }
  },
  {
    code: 'A1303',
    name: 'Egg Albumen Powder (High Gel 1100-1200)',
    description: 'Premium high-gelling egg white powder offering enhanced cohesive binding strength, showing gel levels in the range of 1100-1200 g/cm².',
    applications: 'High-quality hams, emulsified sausages, restructured surimi seafood, and structured vegetarian meat analogues.',
    benefits: 'Prevents water release, increases mechanical sliceability, and provides excellent elastic chewiness.',
    specifications: { moisture: 'Max 8.0%', protein: 'Min 82.0%', ph: '6.5 - 8.0', character: 'Gel Strength: 1100 - 1200 g/cm²' }
  },
  {
    code: 'A1304',
    name: 'Egg Albumen Powder (High Gel 1200-1300)',
    description: 'Ultra high-gelling egg white powder with superior heat-coagulation strength ranging from 1200 to 1300 g/cm² for specialized texturing tasks.',
    applications: 'Premium restructured meats, high-performance surimi, vegetarian meat alternatives, and structured seafood.',
    benefits: 'Maximizes bite firmness, prevents structural collapse in canned or retort-sterilized meat products.',
    specifications: { moisture: 'Max 7.5%', protein: 'Min 83.0%', ph: '6.5 - 8.0', character: 'Gel Strength: 1200 - 1300 g/cm²' }
  },
  {
    code: 'A1305',
    name: 'Albumen powder Super High Gel',
    description: 'Highest-grade super high-gel egg white powder designed to form extremely firm, elastic heat-coagulating gels exceeding 1300 g/cm².',
    applications: 'Heavy-filled vegetarian sausages, premium crab sticks, restructured fish fillets, and high-tensile sausages.',
    benefits: 'Yields outstanding texture recovery, holds moisture in emulsified meat matrices, and builds optimal chewiness.',
    specifications: { moisture: 'Max 7.5%', protein: 'Min 83.5%', ph: '6.5 - 8.0', character: 'Gel Strength: > 1300 g/cm²' }
  },
  {
    code: 'A1308',
    name: 'Egg Albumen Powder High Whip',
    description: 'Pasteurized spray-dried egg white powder physically modified to achieve exceptional whipping volume, foam height, and foam stability.',
    applications: 'Aerated confectionery, marshmallows, meringues, nougats, kisses, macaroons, and soufflés.',
    benefits: 'Rapid foam overrun, high volume increase, long-lasting bubble stability, and dry aerated structure.',
    specifications: { moisture: 'Max 8.0%', protein: 'Min 80.0%', ph: '6.0 - 7.5', character: 'Whip Volume: Min 150mm foam height' }
  },
  {
    code: 'A1310',
    name: 'Hydrolysed Egg White Protein',
    description: 'Enzymatically hydrolysed egg white protein powder consisting of short-chain peptides for rapid absorption and clean solubility.',
    applications: 'Sports nutrition, nutritional beverages, energy bars, elderly nutrition, and hypoallergenic formulations.',
    benefits: 'Extremely high biological value protein, rapid digestive uptake, highly soluble in liquids, and clean dairy-free taste.',
    specifications: { moisture: 'Max 6.0%', protein: 'Min 85.0%', ph: '5.5 - 7.0', character: 'Degree of Hydrolysis: 8% - 12%' }
  }
];

const applicationsData = [
  { name: 'Egg Pastry', image: EggPastryImg, description: 'Provides structure and binding in delicate pastry shells and egg-glazed confections.' },
  { name: 'Fish Products', image: FishProductsImg, description: 'Delivers firm, cohesive gel binding in fish cakes, fish balls, and seafood products.' },
  { name: 'Ham Burger', image: HamburgerImg, description: 'Binds meat proteins for improved texture retention and moisture in burger patties.' },
  { name: 'Meat Products', image: MeatProductsImg, description: 'Improves sliceability, bite firmness, and moisture retention in processed meat formulations.' },
  { name: 'Sausages', image: SausagesImg, description: 'Creates elastic, resilient gel matrices in emulsified and restructured sausage products.' },
  { name: 'Surimi', image: SurimiImg, description: 'Achieves high-gel strength binding essential for authentic surimi seafood texture.' }
];

export default function EggAlbumenPowderPage({ onPageChange }) {
  return (
    <ProductPage
      seo={{
        title: 'Egg Albumen Powder | Egg White Powder Manufacturer & Exporter',
        description: "SKM's premium spray-dried hen egg albumen (egg white) powder for meat binding, bakery & confectionery. 7 product variants — high gel, high whip, standard. Pasteurized, BRCGS & Halal certified bulk exporter from India.",
        keywords: 'egg albumen powder, egg white powder, dried egg white, spray dried albumen, egg albumen powder manufacturer, egg white powder supplier, high gel albumen powder, high whip egg white powder, meat binding egg powder, egg albumen powder bulk, buy egg albumen powder, pasteurized egg white powder, egg albumen powder exporter India',
        canonical: 'https://www.skmegg.com/egg_albumen_powder',
        jsonLd: {
          '@context': 'https://schema.org', '@type': 'Product',
          name: 'Egg Albumen Powder',
          description: 'Premium spray-dried pasteurized hen egg albumen (egg white) powder for meat binding, bakery, and confectionery. 7 product variants including high gel and high whip.',
          brand: { '@type': 'Brand', name: 'SKM Egg Products' },
          manufacturer: { '@type': 'Organization', name: 'SKM Egg Products', url: 'https://www.skmegg.com' },
          category: 'Egg Powders', url: 'https://www.skmegg.com/egg_albumen_powder',
          offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD', seller: { '@type': 'Organization', name: 'SKM Egg Products' } }
        }
      }}
      onPageChange={onPageChange}
      hero={{
        backgroundImage: EggAlbumenPowderMainImg,
        backgroundAlt: 'SKM Egg Albumen Powder background',
        categoryLabel: 'Egg Powders Range',
        titleLine1: 'Egg Albumen',
        titleLine2: 'Powder',
        description: 'Dried Hen Egg Albumen Powder used in meat & fish processing, bakery & confectionery. Specifically processed to yield exceptional gelling and whipping parameters.'
      }}
      variantsData={variantsData}
      applicationsData={applicationsData}
      productName="Egg Albumen Powder"
      productId="egg_albumen_powder"
    />
  );
}
