import React, { useState } from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { getApplicationById } from '../../data/applications';
import { getProductById } from '../../data/products';
import ApplicationDetailHero from './sections/ApplicationDetailHero';
import ApplicationFormulationChallenges from './sections/ApplicationFormulationChallenges';
import RequiredFunctionalities from './sections/RequiredFunctionalities';
import RecommendedProducts from './sections/RecommendedProducts';
import ProductComparison from './sections/ProductComparison';
import ProcessingGuidance from './sections/ProcessingGuidance';
import RelatedResources from './sections/RelatedResources';
import EnquiryCTABand from '../../components/common/EnquiryCTABand';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';

// Generic template driven by src/data/applications.js — one component instead
// of 4 near-duplicate files. Problem-first copy, matched products, single CTA
// into Get Quote. No certifications or journey content here (plan.md §9 —
// that's not the anxiety at this stage).
export default function ApplicationLandingPage({ applicationId, onPageChange }) {
  const application = getApplicationById(applicationId);
  const [comparisonIds, setComparisonIds] = useState([]);
  if (!application) return null;

  const matchedProducts = application.matchedProductIds
    .map((id) => getProductById(id))
    .filter(Boolean);
  const productFamilies = Array.from(new Set(matchedProducts.map((p) => p.category)));

  const toggleComparison = (productId) => {
    setComparisonIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  return (
    <PageWrapper
      seo={{
        title: `Egg Products For ${application.title} | SKM Egg Products`,
        description: `${application.problem} SKM's egg powders and liquid egg products for ${application.title.toLowerCase()} manufacturing — pasteurized, BRCGS, Halal & Kosher certified.`,
        keywords: `egg products for ${application.title.toLowerCase()}, ${application.tags.join(', ').toLowerCase()}, egg powder application`,
        canonical: `https://www.skmegg.com/${application.page}`,
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page dark:bg-surface-950">
        <ApplicationDetailHero application={application} productFamilies={productFamilies} onPageChange={onPageChange} />
        <CurvedDivider bg="transparent" fill="#f8f4ee" className="-mt-[36px] sm:-mt-[52px] lg:-mt-[64px] dark:hidden" />
        <CurvedDivider bg="transparent" fill="#121212" className="-mt-[36px] sm:-mt-[52px] lg:-mt-[64px] hidden dark:block" />

        <ApplicationFormulationChallenges application={application} onPageChange={onPageChange} />

        <RequiredFunctionalities application={application} />

        <RecommendedProducts
          application={application}
          matchedProducts={matchedProducts}
          onPageChange={onPageChange}
          onAddToComparison={toggleComparison}
          comparisonIds={comparisonIds}
        />

        <ProductComparison
          application={application}
          comparisonIds={comparisonIds}
          matchedProducts={matchedProducts}
          onPageChange={onPageChange}
        />

        <ProcessingGuidance
          application={application}
          matchedProducts={matchedProducts}
          onDownloadGuide={() => onPageChange('brochure')}
          onContactSupport={() => onPageChange('contact-us')}
        />

        <RelatedResources matchedProducts={matchedProducts} onPageChange={onPageChange} />
        <CurvedDivider bg="#f8f4ee" fill="#fdf1f0" className="dark:hidden" />
        <CurvedDivider bg="#121212" fill="#121212" className="hidden dark:block" />

        <EnquiryCTABand
          eyebrow={application.title}
          heading="Share Your Target Formulation With Our Team"
          actions={[
            { label: 'Request Technical Consultation', onClick: () => onPageChange('contact-us') },
            { label: 'Request a Sample', variant: 'link', onClick: () => onPageChange('get-quote', { applicationId: application.id }) },
          ]}
        />
      </div>
    </PageWrapper>
  );
}
