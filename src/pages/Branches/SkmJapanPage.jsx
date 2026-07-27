import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import BranchSection from './sections/BranchSection';

const japanData = {
  name: 'SKM Japan',
  region: 'Japan',
  tagline: 'Bridging Indian egg ingredient expertise with the Japanese market.',
  vision: 'To become the strategic partner in Japan for egg powder from India.',
  activities: [
    'Import egg ingredients in Japan',
    'Warehousing necessary stock',
    'Coordination of transport',
    'Coordination with Japanese veterinary authorities',
    'Interaction with customers',
    'Sales & marketing',
    'Developing sales networking / partners',
  ],
};

export default function SkmJapanPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'SKM Japan | Egg Powder Supplier in Japan',
        description: 'SKM Japan is the dedicated arm of SKM Egg Products serving the Japanese market. Specializing in import, warehousing, and distribution of premium Indian egg powder and egg ingredients in Japan.',
        keywords: 'egg powder supplier Japan, egg ingredients Japan, Indian egg powder Japan, buy egg powder Japan, egg albumen powder Japan, egg yolk powder Japan, egg product importer Japan, SKM Japan, egg powder distributor Japan',
        canonical: 'https://www.skmegg.com/skm_japan',
      }}
      onPageChange={onPageChange}
    >
      <BranchSection branch={japanData} />
    </PageWrapper>
  );
}
