import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import EggProcessingPlant from './sections/EggProcessingPlant';

export default function EggProcessingPlantPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Egg Processing Plant | EU & USDA Approved Egg Processing Facility',
        description: "SKM's EU & USDA-approved egg processing plant in Erode, Tamil Nadu. Capacity: 2 million eggs/day. Fully automated spray dryers, pasteurizers, and albumen/yolk separation lines. HACCP & BRCGS certified.",
        keywords: 'egg processing plant India, EU approved egg plant, USDA approved egg facility, egg processing factory, spray dryer egg powder, automated egg processing, egg powder plant Erode, egg processing capacity India, egg processing technology, pasteurized egg plant, egg product manufacturing unit',
        canonical: 'https://www.skmegg.com/egg_processing_plant',
      }}
      onPageChange={onPageChange}
    >
      <EggProcessingPlant />
    </PageWrapper>
  );
}
