import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import FoodSafetyPolicy from './sections/FoodSafetyPolicy';

export default function PolicyPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Food Safety & Quality Policy | SKM Egg Products',
        description: "Read SKM's Food Safety and Quality Policy — our commitment to HACCP-based hygiene, customer satisfaction, and continuous improvement across all egg processing operations.",
        keywords: 'egg food safety policy, HACCP egg processing policy, egg product quality policy, food safety management egg, egg manufacturer safety commitment, egg processing hygiene policy',
        canonical: 'https://www.skmegg.com/policy',
      }}
      breadcrumbItems={[{ label: 'Quality' }, { label: 'Policy' }]}
      onPageChange={onPageChange}
    >
      <FoodSafetyPolicy />
    </PageWrapper>
  );
}
