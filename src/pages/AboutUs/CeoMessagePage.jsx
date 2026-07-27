import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import CeoMessage from './sections/CeoMessage';

export default function CeoMessagePage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: "CEO's Message | SKM Egg Products",
        description: "Read the leadership message from Mr. SKM Shree Shivkumar, highlighting SKM's journey of trust, safety, and continuous growth.",
        keywords: 'SKM Shree Shivkumar, CEO message SKM, egg products leadership',
      }}
      onPageChange={onPageChange}
    >
      <CeoMessage />
    </PageWrapper>
  );
}
