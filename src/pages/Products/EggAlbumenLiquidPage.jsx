import ProductPage from '../../components/ProductPage/ProductPage';

import EggAlbumenLiquidMainImg from '../../assets/3. PRODUCTS/Egg Liquids/Egg Albumen Liquid/EGG ALBUMEN LIQUID_1000x667px.png';
import CakesImg from '../../assets/3. PRODUCTS/Egg Liquids/Egg Albumen Liquid/Cakes 2.png';
import Meringues1Img from '../../assets/3. PRODUCTS/Egg Liquids/Egg Albumen Liquid/Meringues 1.png';
import Meringues2Img from '../../assets/3. PRODUCTS/Egg Liquids/Egg Albumen Liquid/Meringues 2.png';
import NoodlesImg from '../../assets/3. PRODUCTS/Egg Liquids/Egg Albumen Liquid/Noodles 1.png';

export const variantsData = [
  {
    code: 'A1001',
    name: 'Chilled Egg Albumen Liquid',
    description: 'Freshly separated hen egg white liquid, pasteurized and maintained under strict chilled conditions to preserve the native protein structure and natural binding strength.',
    applications: 'Egg noodles, bakery crust glazing, surimi seafood, and structural binders in processed meat/fish products.',
    benefits: 'Uncompromised fresh coagulating strength, smooth pumpable handling, and absolutely clean flavor profile.',
    specifications: { moisture: '87.0% - 89.0%', protein: 'Min 10.0%', ph: '8.5 - 9.5', storage: 'Chilled (0°C to 4°C)', character: 'Native Unmodified Binding Matrix' }
  },
  {
    code: 'A1002',
    name: 'Chilled Egg Albumen Liquid - Whip',
    description: 'Chilled pasteurized egg white liquid optimized with whipping enhancers to produce maximum foam expansion and stability for aerated food formulations.',
    applications: 'Meringues, soufflés, sponge cakes, macaroons, nougats, and aerated confectionery.',
    benefits: 'Rapid foam overrun, excellent bubble strength under heat, and consistent whipping volume.',
    specifications: { moisture: '87.0% - 89.0%', protein: 'Min 10.0%', ph: '8.5 - 9.5', storage: 'Chilled (0°C to 4°C)', character: 'Enhanced Whipping & Foam Volume' }
  },
  {
    code: 'A1006',
    name: 'Frozen Egg Albumen Liquid - Whip',
    description: 'Pasteurized egg white liquid containing whipping aids, blast frozen at -18°C or below to preserve structural functionality for long-term storage.',
    applications: 'Industrial bakery batters, large-scale dessert manufacturing, frozen confectionery, and aerated spreads.',
    benefits: 'Long shelf stability (up to 12 months frozen), easy thawing, and retains full whipping overrun performance.',
    specifications: { moisture: '87.0% - 89.0%', protein: 'Min 10.0%', ph: '8.5 - 9.5', storage: 'Frozen (≤ -18°C)', character: 'Frozen Stable High-Whip Base' }
  }
];

const applicationsData = [
  { name: 'Cakes', image: CakesImg, description: 'Provides aeration, volume, and stable foam structure in light sponge and layer cakes.' },
  { name: 'Meringues', image: Meringues1Img, description: 'Creates stable, glossy meringue peaks with excellent heat resistance and volume.' },
  { name: 'Confectionery', image: Meringues2Img, description: 'Delivers consistent aerated texture in nougats, marshmallows, and confectionery foams.' },
  { name: 'Noodles', image: NoodlesImg, description: 'Strengthens gluten networks and improves elasticity in egg noodle formulations.' }
];

export default function EggAlbumenLiquidPage({ onPageChange }) {
  return (
    <ProductPage
      seo={{
        title: 'Liquid Egg White | Pasteurized Egg Albumen Liquid Supplier',
        description: "SKM's premium pasteurized chilled & frozen liquid egg white (egg albumen) for confectionery, bakery & food processing. 3 product variants including high whip. BRCGS & Halal certified bulk exporter from India.",
        keywords: 'liquid egg white, egg albumen liquid, pasteurized liquid egg white, egg white liquid bulk, liquid egg albumen supplier, frozen egg white, chilled egg albumen, high whip liquid albumen, liquid egg white manufacturer India, buy liquid egg white, liquid egg white food industry, pasteurized egg white liquid exporter',
        canonical: 'https://www.skmegg.com/egg_albumen_liquid',
        jsonLd: {
          '@context': 'https://schema.org', '@type': 'Product',
          name: 'Egg Albumen Liquid',
          description: 'Premium pasteurized chilled and frozen liquid egg albumen (egg white) for confectionery, bakery, and food processing. 3 product variants.',
          brand: { '@type': 'Brand', name: 'SKM Egg Products' },
          manufacturer: { '@type': 'Organization', name: 'SKM Egg Products', url: 'https://www.skmegg.com' },
          category: 'Liquid Egg Products', url: 'https://www.skmegg.com/egg_albumen_liquid',
          offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD', seller: { '@type': 'Organization', name: 'SKM Egg Products' } }
        }
      }}
      onPageChange={onPageChange}
      hero={{
        backgroundImage: EggAlbumenLiquidMainImg,
        backgroundAlt: 'SKM Egg Albumen Liquid background',
        categoryLabel: 'Egg Liquids Range',
        titleLine1: 'Egg Albumen',
        titleLine2: 'Liquid',
        description: 'Egg Albumen Liquid is widely used in applications where foaming properties are important. Pasteurised and maintained under strict temperature control to deliver fresh performance.'
      }}
      variantsData={variantsData}
      applicationsData={applicationsData}
      productName="Egg Albumen Liquid"
      productId="egg_albumen_liquid"
    />
  );
}
