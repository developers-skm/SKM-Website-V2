import { inputClass } from '../../../components/common/FormField';
import { SelectField } from './careerFields';
import CareerIcon from './careerIcons';
import { hasActiveFilters } from './filterState';

export default function JobFilters({ filters, options, onChange, onReset }) {
  const set = (name) => (event) => onChange({ ...filters, [name]: event.target.value });

  return (
    <form role="search" aria-label="Filter job openings" onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-5">
      <div className="relative">
        <label htmlFor="job-search" className="sr-only">Search by job title, skill or keyword</label>
        <CareerIcon name="search" className="w-5 h-5 text-surface-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          id="job-search"
          type="search"
          value={filters.query}
          onChange={set('query')}
          placeholder="Search by job title, skill or keyword"
          className={`${inputClass(false)} !pl-12 !py-3.5`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <SelectField id="filter-department" label="Department" placeholder="All Departments" options={options.departments} value={filters.department} onChange={set('department')} />
        <SelectField id="filter-location" label="Location" placeholder="All Locations" options={options.locations} value={filters.location} onChange={set('location')} />
        <SelectField id="filter-experience" label="Experience" placeholder="Any Experience" options={options.experiences} value={filters.experience} onChange={set('experience')} />
        <SelectField id="filter-type" label="Employment Type" placeholder="All Types" options={options.employmentTypes} value={filters.employmentType} onChange={set('employmentType')} />
        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters(filters)}
          className="min-h-[44px] px-4 rounded-lg border border-surface-250 bg-white font-heading font-bold text-[12px] uppercase tracking-wider text-surface-600 hover:border-brand-600 hover:text-brand-650 disabled:opacity-40 disabled:hover:border-surface-250 disabled:hover:text-surface-600 transition-colors cursor-pointer disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
        >
          Clear Filters
        </button>
      </div>
    </form>
  );
}
