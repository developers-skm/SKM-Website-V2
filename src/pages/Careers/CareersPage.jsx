import { useCallback, useRef, useState } from 'react';
import SEO from '../../components/SEO/SEO';
import CareersHero from './components/CareersHero';
import WhyJoinSkm from './components/WhyJoinSkm';
import CareerAreas from './components/CareerAreas';
import EmployerBrandStrip from './components/EmployerBrandStrip';
import SectionHeading from './components/SectionHeading';
import JobBrowser from './components/JobBrowser';
import { emptyFilters } from './components/filterState';
import { Container, Section } from './components/layout';
import TextLink from './components/TextLink';
import EarlyCareers from './components/EarlyCareers';
import LifeAtSkm from './components/LifeAtSkm';
import RecruitmentProcess from './components/RecruitmentProcess';
import CareersFAQ from './components/CareersFAQ';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';

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
        title="Careers at SKM Egg Products | Build a Career That Makes an Impact"
        description="Explore career opportunities at SKM Egg Products across production, engineering, quality, laboratories, sales, logistics, IT and other business functions."
        canonical="https://www.skmegg.com/careers"
      />
      <CareersHero onViewPositions={scrollToOpenings} onPageChange={onPageChange} />
      <WhyJoinSkm />
      <CurvedDivider bg="#fff" fill="#fff" />
      <CareerAreas activeDepartment={filters.department} onSelectDepartment={showDepartment} />
      <CurvedDivider bg="#fff" fill="#fcfbf9" />
      <EmployerBrandStrip />

      <CurvedDivider bg="#fcfbf9" fill="#fbfaf8" />
      <Section
        id="openings"
        ref={openingsRef}
        tabIndex={-1}
        tone="page"
        labelledBy="openings-title"
        className="scroll-mt-20 focus:outline-none"
      >
        <Container className="flex flex-col gap-10 lg:gap-14">
          <SectionHeading
            id="openings-title"
            label="Openings"
            title="Current Opportunities"
            text="Find your next opportunity within our growing international manufacturing business."
            action={<TextLink route="careers/jobs" onPageChange={onPageChange} className="font-semibold">View All Jobs</TextLink>}
          />
          <JobBrowser filters={filters} onFiltersChange={setFilters} onPageChange={onPageChange} featuredLimit={4} />
        </Container>
      </Section>

      <LifeAtSkm />
      <CurvedDivider bg="#fff" fill="#f4f2ee" />
      <EarlyCareers onExplore={showEarlyCareers} />
      <CurvedDivider bg="#f4f2ee" fill="#fff" />
      <RecruitmentProcess />
      <CurvedDivider bg="#fff" fill="#fff" />
      <CareersFAQ />
    </div>
  );
}
