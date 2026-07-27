import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import QualityManagementSystem from './sections/QualityManagementSystem';

export default function QualityManagementSystemPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Quality Management System | Egg Processing QMS | SKM Egg Products',
        description: "SKM's internationally aligned Quality Management System (QMS) drives continuous improvement across all egg processing operations — from feed to final packed product.",
        keywords: 'egg processing quality management system, QMS egg manufacturer, egg product quality system, ISO egg QMS, continuous improvement egg processing, egg quality standards India',
        canonical: 'https://www.skmegg.com/quality_management_system',
      }}
      onPageChange={onPageChange}
    >
      <QualityManagementSystem />
    </PageWrapper>
  );
}
