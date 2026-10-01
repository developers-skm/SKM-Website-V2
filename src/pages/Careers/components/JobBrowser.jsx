import { useMemo } from 'react';
import { getFilterOptions, getOpenJobs } from '../../../data/jobs';
import JobFilters from './JobFilters';
import { emptyFilters } from './filterState';
import JobCard from './JobCard';
import InternalLink from '../../../components/common/InternalLink';

const matchesQuery = (job, query) => {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [job.title, job.department, job.location, job.qualification, job.summary, ...job.skills]
    .join(' ')
    .toLowerCase()
    .includes(needle);
};

// Searchable / filterable list of current openings. Filter state is owned by
// the parent so department tiles and early-career CTAs can drive it.
export default function JobBrowser({ filters, onFiltersChange, onPageChange }) {
  const options = useMemo(() => getFilterOptions(), []);
  const results = useMemo(
    () =>
      getOpenJobs().filter(
        (job) =>
          matchesQuery(job, filters.query) &&
          (!filters.department || job.department === filters.department) &&
          (!filters.location || job.location === filters.location) &&
          (!filters.experience || job.experience === filters.experience) &&
          (!filters.employmentType || job.employmentType === filters.employmentType)
      ),
    [filters]
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-[10px] bg-white border border-[#eee] p-5 sm:p-6">
        <JobFilters filters={filters} options={options} onChange={onFiltersChange} onReset={() => onFiltersChange(emptyFilters)} />
      </div>

      <p className="font-body text-[14px] text-surface-500 m-0" role="status" aria-live="polite">
        Showing {results.length} {results.length === 1 ? 'opportunity' : 'opportunities'}
      </p>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {results.map((job) => (
            <JobCard key={job.id} job={job} onPageChange={onPageChange} />
          ))}
        </div>
      ) : (
        <div className="rounded-[10px] bg-white border border-dashed border-surface-300 p-10 text-center flex flex-col items-center gap-3">
          <h3 className="font-heading font-bold text-[20px] text-heading m-0">No matching opportunities</h3>
          <p className="font-body text-[15px] text-surface-500 max-w-md m-0">
            Try adjusting your search or filters, or submit your profile to our Talent Pool for future openings.
          </p>
          <InternalLink route="careers/apply" onPageChange={onPageChange} className="btn-outline-red mt-2">
            Join Our Talent Pool
          </InternalLink>
        </div>
      )}
    </div>
  );
}
