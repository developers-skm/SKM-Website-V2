import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { makeContainerVariants } from '../../../utils/animationVariants';
import { getFilterOptions, getOpenJobs } from '../../../data/jobs';
import JobFilters from './JobFilters';
import { emptyFilters, hasActiveFilters } from './filterState';
import JobCard from './JobCard';
import InternalLink from '../../../components/common/InternalLink';

const listVariants = makeContainerVariants(0.06);

const matchesQuery = (job, query) => {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [job.title, job.department, job.location, job.qualification, job.summary, ...job.skills]
    .join(' ')
    .toLowerCase()
    .includes(needle);
};

// Searchable / filterable list of current openings. Filter state is owned by
// the parent so department tiles and early-career links can drive it.
// `featuredLimit` caps the list while no filter is active (landing page);
// as soon as the user searches or filters, every match is shown.
export default function JobBrowser({ filters, onFiltersChange, onPageChange, featuredLimit }) {
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

  const visible = featuredLimit && !hasActiveFilters(filters) ? results.slice(0, featuredLimit) : results;

  return (
    <div className="flex flex-col gap-8">
      <JobFilters filters={filters} options={options} onChange={onFiltersChange} onReset={() => onFiltersChange(emptyFilters)} />

      <p className="font-body text-[14px] text-surface-500 m-0" role="status" aria-live="polite">
        {visible.length < results.length
          ? `Showing ${visible.length} of ${results.length} opportunities`
          : `${results.length} ${results.length === 1 ? 'opportunity' : 'opportunities'}`}
      </p>

      {visible.length > 0 ? (
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          {visible.map((job) => (
            <JobCard key={job.id} job={job} onPageChange={onPageChange} />
          ))}
        </motion.div>
      ) : (
        <div className="rounded-xl bg-white border border-dashed border-surface-300 p-10 text-center flex flex-col items-center gap-3">
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
