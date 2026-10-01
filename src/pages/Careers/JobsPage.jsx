import { useState } from 'react';
import SEO from '../../components/SEO/SEO';
import CareersPageHeader from './components/CareersPageHeader';
import JobBrowser from './components/JobBrowser';
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
      <section className="w-full bg-white py-[50px] lg:py-[70px]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <JobBrowser filters={filters} onFiltersChange={setFilters} onPageChange={onPageChange} />
        </div>
      </section>
    </div>
  );
}
