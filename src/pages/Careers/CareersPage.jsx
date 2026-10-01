import { useCallback, useRef, useState } from 'react';
import SEO from '../../components/SEO/SEO';
import CareersHero from './components/CareersHero';
import WhyJoinSkm from './components/WhyJoinSkm';
import CareerAreas from './components/CareerAreas';
import SectionHeading from './components/SectionHeading';
import JobBrowser from './components/JobBrowser';
import { emptyFilters } from './components/filterState';
import { Container, Section } from './components/layout';
import TextLink from './components/TextLink';
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

      <Section
        id="openings"
        ref={openingsRef}
        tabIndex={-1}
        labelledBy="openings-title"
        className="scroll-mt-20 focus:outline-none"
      >
        <Container className="flex flex-col gap-10">
          <SectionHeading
            id="openings-title"
            label="Openings"
            title="Current Opportunities"
            action={<TextLink route="careers/jobs" onPageChange={onPageChange}>View All Jobs</TextLink>}
          />
          <JobBrowser filters={filters} onFiltersChange={setFilters} onPageChange={onPageChange} featuredLimit={4} />
        </Container>
      </Section>

      <LifeAtSkm />
      <EarlyCareers onExplore={showEarlyCareers} />
      <RecruitmentProcess />
      <TalentPoolCTA onPageChange={onPageChange} />
      <CareersFAQ />
    </div>
  );
}
