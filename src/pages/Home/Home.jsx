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
import FinalEnquiry from './sections/FinalEnquiry';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';

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

      {/* 4. Why SKM, condensed — the rational case */}
      <WhyUs onPageChange={onPageChange} />
      <CurvedDivider bg="#fff" fill="#ececec" className="dark:hidden" />
      <CurvedDivider bg="#121212" fill="#121212" className="hidden dark:block" />

      {/* 5. Farm-to-product journey */}
      <HomeJourney onPageChange={onPageChange} />
      <CurvedDivider bg="#ececec" fill="#fff" className="dark:hidden" />
      <CurvedDivider bg="#121212" fill="#121212" className="hidden dark:block" />

      {/* 6. Quality and certification proof — also folds in TrustBar's
          former certification-marquee content, which previously interrupted
          the Section 5 -> 7 sequence at its own top-level render position. */}
      <QualityCertificationProof onPageChange={onPageChange} />
      <CurvedDivider bg="#fff" fill="#ececec" className="dark:hidden" />
      <CurvedDivider bg="#121212" fill="#121212" className="hidden dark:block" />

      {/* 7. Global reach and supply support */}
      <GlobalMarkets onPageChange={onPageChange} />

      {/* 8. Final conversion section */}
      <FinalEnquiry onPageChange={onPageChange} />

      {/* Legacy section — not yet mapped to its final PDF slot; left in
          place, unmodified, per this task's explicit scope. Moved out of
          the Section 5 -> 7 sequence since it is neither Section 6 nor 7. */}
      <CompanyIntro onPageChange={onPageChange} />
    </div>
  );
}
