import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import BranchSection from './sections/BranchSection';

const russiaData = {
  name: 'SKM Russia',
  region: 'Russia',
  tagline: 'Establishing a trusted supply chain for Indian egg ingredients across Russia.',
  vision: 'To become the strategic partner in Russia for egg based ingredients primarily sourced from India.',
  activities: [
    'Import egg ingredients in Russia',
    'Warehousing necessary stock',
    'Coordination of transport',
    'Interaction with customers',
    'Sales & marketing',
    'Developing sales networking / partners',
  ],
};

export default function SkmRussiaPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'SKM Russia | Egg Powder & Egg Ingredients Supplier in Russia',
        description: 'SKM Russia serves the Russian market with premium Indian egg powder and egg ingredient imports. Covering import, warehousing, transport, and sales across Russia.',
        keywords: 'egg powder supplier Russia, egg ingredients Russia, Indian egg powder Russia, buy egg powder Russia, egg albumen powder Russia, egg yolk powder Russia, egg product importer Russia, SKM Russia, egg powder distributor Russia, egg powder export Russia',
        canonical: 'https://www.skmegg.com/skm_russia',
      }}
      onPageChange={onPageChange}
    >
      <BranchSection branch={russiaData} />
    </PageWrapper>
  );
}
