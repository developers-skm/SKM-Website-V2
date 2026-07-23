import ProductPage from '../../components/ProductPage/ProductPage';
import InternalLink from '../../components/common/InternalLink';

import CustomizedMixMainImg from '../../assets/3. PRODUCTS/Customized Mixes/CUSTOMIZED MIX_1000x667px.png';
import MayonnaiseImg from '../../assets/3. PRODUCTS/Customized Mixes/Mayonnaise 3.png';

export const variantsData = [
  {
    code: 'Y1119',
    name: 'Egg Yolk Powder Heat Stable',
    description: 'A custom-blended, heat-stable egg yolk powder specifically formulated for mayonnaise and bakery applications where emulsification stability under high-temperature conditions is critical. This tailored mix is designed to deliver consistent viscosity, prevent oil-water separation, and produce a smooth, creamy texture in hot-filled or thermally processed food products.',
    applications: 'Hot-filled mayonnaise, heat-processed salad dressings, baked confections, creamy sauces, and emulsion-based condiments.',
    benefits: 'Superior heat-stable emulsification, prevents oil-water breakdown during thermal processing, delivers rich mouthfeel and consistent texture in finished products.',
    specifications: { moisture: 'Max 4.0%', fat: 'Min 52.0%', protein: 'Min 30.0%', ph: '5.5 – 7.0', color: 'Heat-Emulsifying Stability: > 95%' }
  }
];

const applicationsData = [
  {
    name: 'Mayonnaise',
    image: MayonnaiseImg,
    description: 'Custom egg yolk powder blend delivers stable, creamy mayonnaise emulsions that resist oil separation even under thermal processing conditions.'
  }
];

// Real banner above the shared ProductPage shell — not a new prop on
// ProductPage.jsx itself (which would affect all 10 product pages), just
// local content on this one page. This SKU (Y1119) is one real example of
// a broader capability: SKM develops custom egg functionality for a
// customer's specific formulation or processing challenge, not just this
// single blend. Links to the real /innovation_and_custom_solutions page
// built for that broader story.
function InnovationBanner({ onPageChange }) {
  return (
    <div className="w-full bg-[#fdfbf7] dark:bg-surface-900 border-b border-[#eee] dark:border-surface-800/40 py-6 px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px] w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body text-[14.5px] text-surface-700 dark:text-surface-300 leading-[1.6] m-0 text-center sm:text-left">
          This is one example of a custom formulation. SKM develops egg functionality for your specific product and processing challenge.
        </p>
        <InternalLink
          route="innovation_and_custom_solutions"
          onPageChange={onPageChange}
          className="flex-shrink-0 inline-flex items-center gap-2 font-body font-semibold text-[13.5px] text-brand-600 dark:text-brand-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm whitespace-nowrap"
        >
          Explore Custom Development
        </InternalLink>
      </div>
    </div>
  );
}

export default function CustomizedMixPage({ onPageChange }) {
  return (
    <>
      <InnovationBanner onPageChange={onPageChange} />
      <ProductPage
      seo={{
        title: 'Customized Egg Powder Mix | Custom Egg Blends for Food Industry',
        description: "SKM's customized egg powder blends tailored for bakery, mayonnaise & specific food applications. OEM egg powder formulations including heat-stable egg yolk mix Y1119. Bulk manufacturer from India.",
        keywords: 'customized egg powder mix, custom egg blend, egg powder formulation, OEM egg powder, egg powder for bakery, egg powder for mayonnaise, custom egg yolk mix, heat stable egg mix, tailored egg powder, egg powder food manufacturer, private label egg powder, egg powder custom blend India',
        canonical: 'https://www.skmegg.com/customized_mix',
        jsonLd: {
          '@context': 'https://schema.org', '@type': 'Product',
          name: 'Customized Egg Powder Mix',
          description: 'Custom egg powder blends formulated for specific food industry applications including bakery, mayonnaise, and dressings.',
          brand: { '@type': 'Brand', name: 'SKM Egg Products' },
          manufacturer: { '@type': 'Organization', name: 'SKM Egg Products', url: 'https://www.skmegg.com' },
          category: 'Specialty Egg Products', url: 'https://www.skmegg.com/customized_mix',
          offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD', seller: { '@type': 'Organization', name: 'SKM Egg Products' } }
        }
      }}
      breadcrumbItems={[{ label: 'Products' }, { label: 'Customized Mix' }]}
      onPageChange={onPageChange}
      hero={{
        backgroundImage: CustomizedMixMainImg,
        backgroundAlt: 'SKM Customized Mix background',
        categoryLabel: 'Customized Mixes Range',
        titleLine1: 'Customized',
        titleLine2: 'Mix',
        description: 'Bakery & Mayonnaise Mix — Custom blends tailored for specific food applications. Our specialized egg powder formulations are engineered to deliver precision performance in heat-intensive processing environments.'
      }}
        variantsData={variantsData}
        applicationsData={applicationsData}
        productName="Customized Mix"
        productId="customized_mix"
      />
    </>
  );
}
