import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PoultryFarm from './sections/PoultryFarm';

export default function PoultryFarmPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Integrated Poultry Farm | 2.4 Million Layers | SKM Egg Products',
        description: "SKM's ISO 22000 certified integrated layer poultry farms house 2.4 million birds producing 164 million eggs annually. Environmentally controlled sheds with strict biosecurity and animal welfare protocols.",
        keywords: 'integrated poultry farm India, ISO 22000 layer farm, layer poultry farm, egg production farm India, poultry biosecurity, environmentally controlled poultry shed, commercial layer farm India, egg laying farm capacity, poultry farm Tamil Nadu, large scale egg production',
        canonical: 'https://www.skmegg.com/poultry_farm',
      }}
      onPageChange={onPageChange}
    >
      <PoultryFarm />
    </PageWrapper>
  );
}
