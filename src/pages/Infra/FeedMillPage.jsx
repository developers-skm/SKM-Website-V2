import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import FeedMill from './sections/FeedMill';

export default function FeedMillPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'In-house Poultry Feed Mill | Residue-Free Egg Production',
        description: "SKM's integrated in-house poultry feed mill ensures residue-free, balanced nutrition for chicks, growers & layers — the foundation of safe egg products. Ingredient screening laboratory on-site for quality assurance.",
        keywords: 'poultry feed mill, in-house feed mill, residue-free poultry feed, integrated poultry feed, feed formulation poultry, poultry nutrition India, backward integration feed mill, egg product feed safety, poultry feed laboratory, animal feed quality',
        canonical: 'https://www.skmegg.com/feed_mill',
      }}
      breadcrumbItems={[{ label: 'Infrastructure' }, { label: 'Feed Mill' }]}
      onPageChange={onPageChange}
    >
      <FeedMill />
    </PageWrapper>
  );
}
