import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import BranchSection from './sections/BranchSection';
import russiaImage from '../../assets/branches/skm-russia.jpg';

const russiaData = {
  name: 'SKM Russia',
  image: russiaImage,
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
  contact: {
    company: 'SKM EGG PRODUCTS EXPORT (INDIA) LIMITED',
    addressLines: ['Leninsky Prospect, House No.148, Flat.126,', 'Entrance-3, Floor No.3,', 'Russia, Moscow - 119571'],
    tel: '+7 (495) 434 42 63',
    fax: '+7 (495) 434 42 63',
    mobile: '+7 916 705 99 55',
  },
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
