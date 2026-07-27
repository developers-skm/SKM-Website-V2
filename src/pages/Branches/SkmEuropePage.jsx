import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import BranchSection from './sections/BranchSection';

const europeData = {
  name: 'SKM Europe',
  region: 'Europe',
  tagline: 'Connecting Indian egg-based ingredients with the European food industry.',
  vision: 'To become the strategic partner in Europe for egg based ingredients primarily sourced from India.',
  activities: [
    'Import egg ingredients in EU',
    'Warehousing necessary stock',
    'Coordination of transport',
    'Coordination with EU veterinary authorities',
    'Interaction with customers',
    'Sales & marketing',
    'New product development',
    'Developing sales networking / partners',
  ],
};

export default function SkmEuropePage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'SKM Europe | Egg Powder & Egg Ingredients Supplier in EU',
        description: 'SKM Europe serves the European Union market with premium Indian egg powder and egg ingredient imports. EU veterinary approved, BRCGS certified. Covering import, warehousing, new product development, and sales across EU.',
        keywords: 'egg powder supplier Europe, egg ingredients EU, Indian egg powder Europe, EU egg powder importer, buy egg powder Europe, egg albumen powder Europe, egg yolk powder EU, egg products European Union, EU approved egg exporter, SKM Europe, egg powder distributor Europe',
        canonical: 'https://www.skmegg.com/skm_europe',
      }}
      onPageChange={onPageChange}
    >
      <BranchSection branch={europeData} />
    </PageWrapper>
  );
}
