import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import VisionMission from './sections/VisionMission';

export default function VisionMissionPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Vision & Mission | SKM Egg Products',
        description: "Explore SKM's vision to remain a global leader in egg processing and our mission to deliver safe, high-functional products through sustainable practices.",
        keywords: "SKM Egg Products vision, egg company mission, global egg processing leader, egg food safety mission, egg manufacturer values, SKM egg vision",
        canonical: 'https://www.skmegg.com/vision_mission',
      }}
      breadcrumbItems={[{ label: 'About Us' }, { label: 'Vision & Mission' }]}
      onPageChange={onPageChange}
    >
      <VisionMission />
    </PageWrapper>
  );
}
