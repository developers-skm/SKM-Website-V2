import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import OurCompany from './sections/OurCompany';

export default function OurCompanyPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'About SKM Egg Products | Asia\'s Largest Egg Processing Company',
        description: 'Established in 1996, SKM Egg Products is one of Asia\'s largest fully integrated egg processing facilities. Processing 2 million eggs daily with 100% backward integration from feed mill to farm to factory. BRCGS & Halal certified.',
        keywords: 'SKM Egg Products company, egg processing company India, Asia largest egg processor, egg products manufacturer India, integrated egg processing, backward integration poultry, egg processing facility Erode, egg company Tamil Nadu, egg powder company India, egg exporter India',
        canonical: 'https://www.skmegg.com/our_company',
      }}
      onPageChange={onPageChange}
    >
      <OurCompany />
    </PageWrapper>
  );
}
