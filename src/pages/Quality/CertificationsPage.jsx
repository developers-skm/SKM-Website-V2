import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Certifications from './sections/Certifications';

export default function CertificationsPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Certifications | BRCGS, Halal, Kosher & FSSAI Certified Egg Products',
        description: 'SKM Egg Products holds BRCGS AA Grade, Halal, Kosher, FSSAI, EU & USDA approvals. NABL-accredited (ISO/IEC 17025) laboratory. Internationally certified egg powder and liquid egg manufacturer.',
        keywords: 'BRCGS certified egg powder, Halal egg powder, Kosher egg products, FSSAI certified egg, EU approved egg manufacturer, USDA egg facility, NABL accredited egg laboratory, ISO 22000 egg, certified egg exporter India, BRC egg food safety, Halal certified egg India, Kosher egg powder supplier',
        canonical: 'https://www.skmegg.com/certifications',
      }}
      onPageChange={onPageChange}
    >
      <Certifications />
    </PageWrapper>
  );
}
