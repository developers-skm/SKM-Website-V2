import { useEffect } from 'react';
import SEO from '../../components/SEO/SEO';
import { scrollToSectionId } from '../../components/Navbar/useProductDiscoveryNavigation';
import Hero from './sections/Hero';
import ApplicationAreas from './sections/ApplicationAreas';
import ProductFamilies from './sections/ProductFamilies';
import CompanyIntro from './sections/CompanyIntro';
import HomeJourney from './sections/HomeJourney';
import WhyUs from './sections/WhyUs';
import QualityCertificationProof from './sections/QualityCertificationProof';
import GlobalMarkets from './sections/GlobalMarkets';
import Sustainability from './sections/Sustainability';
import FinalEnquiry from './sections/FinalEnquiry';

export default function Home({ onPageChange, prefill }) {
  // "Find Your Product"/"Find Product" and the Hero's "Find the Right Egg
  // Product" both navigate here with prefill.scrollTarget set to the target
  // section's id; this mount-aware effect performs the scroll once Home's
  // own DOM has committed — no timeouts.
  useEffect(() => {
    if (prefill?.scrollTarget) {
      scrollToSectionId(prefill.scrollTarget);
    }
  }, [prefill]);

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Egg Powder & Liquid Egg Manufacturer | SKM Egg Products"
        description="Asia's largest integrated egg processing facility since 1996. SKM Egg Products manufactures and exports premium whole egg powder, egg albumen powder, egg yolk powder, and liquid egg products. BRCGS, Halal & Kosher certified. Processing 2 million eggs daily."
        keywords="egg powder manufacturer India, whole egg powder, egg albumen powder, egg yolk powder, spray dried egg powder, dried egg powder, liquid egg products, pasteurized egg, egg white powder, egg powder exporter, egg products manufacturer, egg powder bulk supplier, egg powder food industry, halal egg powder, kosher egg powder, BRCGS egg, SKM egg products"
        canonical="https://www.skmegg.com/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SKM Egg Products",
          "url": "https://www.skmegg.com",
          "description": "Asia's largest integrated egg processing facility since 1996. Manufacturer and exporter of premium egg powder and liquid egg products.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.skmegg.com/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      {/* 1. Hero */}
      <Hero onPageChange={onPageChange} />

      {/* 2. Product families */}
      <ProductFamilies onPageChange={onPageChange} />

      {/* 3. Application Finder — "What are you making?" */}
      <ApplicationAreas onPageChange={onPageChange} />

      {/* 4. Why SKM — key numbers, the rational case */}
      <WhyUs onPageChange={onPageChange} />

      {/* 5. Quality and certification proof */}
      <QualityCertificationProof onPageChange={onPageChange} />

      {/* 6. Farm-to-product traceability journey */}
      <HomeJourney onPageChange={onPageChange} />

      {/* 7. Infrastructure — Asia's largest integrated processing facility */}
      <CompanyIntro onPageChange={onPageChange} />

      {/* 8. Global reach and supply support */}
      <GlobalMarkets onPageChange={onPageChange} />

      {/* 9. Sustainability */}
      <Sustainability onPageChange={onPageChange} />

      {/* 10. Final conversion section */}
      <FinalEnquiry onPageChange={onPageChange} />
    </div>
  );
}
