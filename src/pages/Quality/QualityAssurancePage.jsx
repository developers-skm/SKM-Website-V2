import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import QualityAssurance from './sections/QualityAssurance';

export default function QualityAssurancePage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Quality Assurance | HACCP Egg Quality Testing & Residue Analysis',
        description: "SKM's rigorous HACCP-based quality assurance covers every stage from feed to final product. Advanced residue analysis (GC-MS, HPLC), microbiological testing, and physicochemical controls for premium egg products.",
        keywords: 'egg quality assurance, HACCP egg processing, egg residue testing, egg safety testing, egg product quality control, microbiological egg testing, physicochemical egg testing, HPLC egg analysis, GC-MS egg residue, egg product compliance, egg powder quality',
        canonical: 'https://www.skmegg.com/quality_assurance',
      }}
      onPageChange={onPageChange}
    >
      <QualityAssurance />
    </PageWrapper>
  );
}
