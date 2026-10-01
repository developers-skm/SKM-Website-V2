import { useCallback, useRef, useState } from 'react';
import SEO from '../../components/SEO/SEO';
import CareersHero from './components/CareersHero';
import WhyJoinSkm from './components/WhyJoinSkm';
import CareerAreas from './components/CareerAreas';
import SectionHeading from './components/SectionHeading';
import JobBrowser from './components/JobBrowser';
import { emptyFilters } from './components/filterState';
import EarlyCareers from './components/EarlyCareers';
import LifeAtSkm from './components/LifeAtSkm';
import RecruitmentProcess from './components/RecruitmentProcess';
import TalentPoolCTA from './components/TalentPoolCTA';
import CareersFAQ from './components/CareersFAQ';

export default function CareersPage({ onPageChange }) {
  const [filters, setFilters] = useState(emptyFilters);
  const openingsRef = useRef(null);

  const scrollToOpenings = useCallback(() => {
    openingsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    openingsRef.current?.focus({ preventScroll: true });
  }, []);

  const showDepartment = (department) => {
    setFilters({ ...emptyFilters, department: filters.department === department ? '' : department });
    scrollToOpenings();
  };

  const showEarlyCareers = () => {
    setFilters({ ...emptyFilters, experience: 'Fresher' });
    scrollToOpenings();
  };

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Careers at SKM Egg Products | Job Opportunities"
        description="Explore career opportunities at SKM Egg Products across production, engineering, quality, laboratories, sales, logistics, IT and other business functions."
        canonical="https://www.skmegg.com/careers"
      />
      <CareersHero onViewPositions={scrollToOpenings} onPageChange={onPageChange} />
      <WhyJoinSkm />
      <CareerAreas activeDepartment={filters.department} onSelectDepartment={showDepartment} />

      <section
        id="openings"
        ref={openingsRef}
        tabIndex={-1}
        aria-labelledby="openings-title"
        className="w-full bg-white py-[70px] lg:py-[100px] scroll-mt-24 focus:outline-none"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          <SectionHeading id="openings-title" label="Openings" title="Current Opportunities" />
          <JobBrowser filters={filters} onFiltersChange={setFilters} onPageChange={onPageChange} />
        </div>
      </section>

      <EarlyCareers onExplore={showEarlyCareers} />
      <LifeAtSkm />
      <RecruitmentProcess />
      <TalentPoolCTA onPageChange={onPageChange} />
      <CareersFAQ />
    </div>
  );
}
