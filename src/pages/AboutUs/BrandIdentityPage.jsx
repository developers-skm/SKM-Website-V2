import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import BrandPhilosophy from './sections/BrandPhilosophy';

export default function BrandIdentityPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Brand Identity | SKM Egg Products',
        description: "Thinking Out of the Shell — discover the spirit, values, and visual symbols that represent SKM's progressive corporate identity.",
        keywords: 'SKM Egg Products Brand Identity, Thinking Out of the Shell, logo philosophy',
      }}
      breadcrumbItems={[{ label: 'About Us' }, { label: 'Brand Identity' }]}
      onPageChange={onPageChange}
    >
      <BrandPhilosophy />
    </PageWrapper>
  );
}
