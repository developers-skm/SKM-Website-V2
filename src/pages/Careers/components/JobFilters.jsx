import { inputClass } from '../../../components/common/FormField';
import { SelectField } from './careerFields';
import CareerIcon from './careerIcons';
import { hasActiveFilters } from './filterState';

const chipClass = (active) =>
  `px-4 min-h-[40px] rounded-full border font-body text-[14px] font-semibold transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
    active
      ? 'bg-brand-600 border-brand-600 text-white'
      : 'bg-white border-[#ddd] text-surface-700 hover:border-surface-400'
  }`;

// Wide search, department chips (single-select, "All" clears), and three
// compact dropdowns. Department is driven by the chips.
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
          className={`${inputClass(false)} !pl-12 !py-4 !rounded-xl !text-[15px]`}
        />
      </div>

      <div role="group" aria-label="Department" className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={!filters.department} onClick={() => onChange({ ...filters, department: '' })} className={chipClass(!filters.department)}>
          All
        </button>
        {options.departments.map((department) => (
          <button
            key={department}
            type="button"
            aria-pressed={filters.department === department}
            onClick={() => onChange({ ...filters, department: filters.department === department ? '' : department })}
            className={chipClass(filters.department === department)}
          >
            {department}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
        <SelectField id="filter-location" label="Location" placeholder="All Locations" options={options.locations} value={filters.location} onChange={set('location')} />
        <SelectField id="filter-experience" label="Experience" placeholder="Any Experience" options={options.experiences} value={filters.experience} onChange={set('experience')} />
        <SelectField id="filter-type" label="Employment Type" placeholder="All Types" options={options.employmentTypes} value={filters.employmentType} onChange={set('employmentType')} />
        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters(filters)}
          className="min-h-[44px] px-2 font-heading font-bold text-[14px] text-surface-600 hover:text-brand-650 underline underline-offset-4 disabled:opacity-40 disabled:no-underline disabled:hover:text-surface-600 transition-colors cursor-pointer disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}
