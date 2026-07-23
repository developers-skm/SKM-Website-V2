import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import JourneyStrip from '../../components/Journey/JourneyStrip';

export default function JourneyPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Our Journey — Farm-to-Product Traceability | SKM Egg Products',
        description: "Follow SKM's egg products from biosecure hatchery to your factory floor — six documented stages of farm-to-fork traceability, backed by ISO 22000, NABL-accredited testing, and full CCP documentation.",
        keywords: 'egg product traceability, farm to fork egg products, egg processing supply chain, SKM traceability, egg powder origin, biosecure poultry farm India',
        canonical: 'https://www.skmegg.com/journey',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'Our Journey — SKM Egg Products',
          url: 'https://www.skmegg.com/journey',
          description: 'The six-stage farm-to-product traceability chain behind every SKM egg product.',
        },
      }}
      breadcrumbItems={[{ label: 'Our Journey' }]}
      onPageChange={onPageChange}
    >
      <JourneyStrip variant="full" onPageChange={onPageChange} />
    </PageWrapper>
  );
}
