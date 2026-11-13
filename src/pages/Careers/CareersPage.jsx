import { useCallback, useRef } from 'react';
import SEO from '../../components/SEO/SEO';
import CareersHero from './components/CareersHero';
import WhyJoinSkm from './components/WhyJoinSkm';
import CareerAreas from './components/CareerAreas';
import EmployerBrandStrip from './components/EmployerBrandStrip';
import EarlyCareers from './components/EarlyCareers';
import LifeAtSkm from './components/LifeAtSkm';
import RecruitmentProcess from './components/RecruitmentProcess';
import CareersFAQ from './components/CareersFAQ';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';

export default function CareersPage({ onPageChange }) {
  const areasRef = useRef(null);

  const scrollToAreas = useCallback(() => {
    areasRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    areasRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Careers at SKM Egg Products | Build a Career That Makes an Impact"
        description="Explore career opportunities at SKM Egg Products across production, engineering, quality, laboratories, sales, logistics, IT and other business functions."
        canonical="https://www.skmegg.com/careers"
      />
      <CareersHero onViewPositions={scrollToAreas} onPageChange={onPageChange} />
      <WhyJoinSkm />
      <CurvedDivider bg="#fff" fill="#fff" />
      <div ref={areasRef} tabIndex={-1} className="scroll-mt-20 focus:outline-none">
        <CareerAreas onPageChange={onPageChange} />
      </div>
      <CurvedDivider bg="#fff" fill="#fcfbf9" />
      <EmployerBrandStrip />

      <CurvedDivider bg="#fcfbf9" fill="#fbfaf8" />
      <LifeAtSkm />
      <CurvedDivider bg="#fff" fill="#f4f2ee" />
      <EarlyCareers onPageChange={onPageChange} />
      <CurvedDivider bg="#f4f2ee" fill="#fff" />
      <RecruitmentProcess />
      <CurvedDivider bg="#fff" fill="#fff" />
      <CareersFAQ />
    </div>
  );
}
