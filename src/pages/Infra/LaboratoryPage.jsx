import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Laboratory from './sections/Laboratory';

export default function LaboratoryPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'NABL Accredited Egg Testing Laboratory | ISO/IEC 17025 Certified',
        description: "SKM's NABL-accredited (ISO/IEC 17025) egg testing laboratory operational since 2006. Comprehensive residue analysis (GC-MS, HPLC, LC-MS), microbiological, physicochemical, and poultry disease diagnostics.",
        keywords: 'NABL accredited egg laboratory, ISO 17025 egg testing, egg residue testing lab, GC-MS egg analysis, HPLC egg testing, egg microbiological testing, egg safety laboratory India, egg quality testing laboratory, physicochemical egg testing, poultry disease diagnostics, egg testing lab Tamil Nadu',
        canonical: 'https://www.skmegg.com/laboratory',
      }}
      breadcrumbItems={[{ label: 'Infrastructure' }, { label: 'Laboratory' }]}
      onPageChange={onPageChange}
    >
      <Laboratory />
    </PageWrapper>
  );
}
