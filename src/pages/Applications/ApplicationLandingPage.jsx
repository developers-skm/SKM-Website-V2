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
import ApplicationFinalCTA from './sections/ApplicationFinalCTA';

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
      breadcrumbItems={[{ label: 'Applications' }, { label: application.title }]}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page dark:bg-surface-950">
        <ApplicationDetailHero application={application} productFamilies={productFamilies} onPageChange={onPageChange} />

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

        <ApplicationFinalCTA application={application} onPageChange={onPageChange} />
      </div>
    </PageWrapper>
  );
}
