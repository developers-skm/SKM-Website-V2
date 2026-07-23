import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Traceability from './sections/Traceability';

export default function TraceabilityPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Egg Traceability | Farm-to-Fork Egg Supply Chain Transparency',
        description: "SKM's complete farm-to-fork egg traceability system — from in-house feed mill and poultry farm to egg processing and final delivery. 100% backward integrated for full supply chain visibility.",
        keywords: 'egg traceability, farm-to-fork egg, egg supply chain transparency, backward integrated egg, egg product tracking, egg processing traceability, poultry farm traceability, egg food safety traceability, traceable egg products India, egg origin tracking',
        canonical: 'https://www.skmegg.com/traceability',
      }}
      breadcrumbItems={[{ label: 'Quality' }, { label: 'Traceability' }]}
      onPageChange={onPageChange}
    >
      <Traceability />
    </PageWrapper>
  );
}
