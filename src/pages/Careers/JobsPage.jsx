import { useState } from 'react';
import SEO from '../../components/SEO/SEO';
import CareersPageHeader from './components/CareersPageHeader';
import JobBrowser from './components/JobBrowser';
import { Container } from './components/layout';
import { emptyFilters } from './components/filterState';

// /careers/jobs — the full openings list on its own page. An optional
// `department` prefill (from onPageChange('careers/jobs', { department })) seeds the filter.
export default function JobsPage({ onPageChange, prefill }) {
  const [filters, setFilters] = useState({ ...emptyFilters, department: prefill?.department ?? '' });

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Current Job Openings | Careers at SKM Egg Products"
        description="Browse current job openings at SKM Egg Products across production, engineering, quality, laboratory, sales, logistics and IT."
        canonical="https://www.skmegg.com/careers/jobs"
      />
      <CareersPageHeader
        onPageChange={onPageChange}
        crumbs={[{ label: 'Careers', route: 'careers' }, { label: 'Current Opportunities' }]}
        title="Current Opportunities"
      />
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <Container size="narrow">
          <JobBrowser filters={filters} onFiltersChange={setFilters} onPageChange={onPageChange} />
        </Container>
      </section>
    </div>
  );
}
