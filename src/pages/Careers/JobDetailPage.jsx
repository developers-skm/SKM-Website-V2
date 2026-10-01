import SEO from '../../components/SEO/SEO';
import InternalLink from '../../components/common/InternalLink';
import { formatJobDate, getJobBySlug } from '../../data/jobs';
import CareersPageHeader from './components/CareersPageHeader';
import CareerIcon from './components/careerIcons';

function BulletSection({ title, items }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-heading font-bold text-[22px] text-heading m-0">{title}</h2>
      <ul className="m-0 pl-0 list-none flex flex-col gap-2.5">
        {items.map((entry) => (
          <li key={entry} className="flex gap-3 font-body text-[15px] text-surface-600 leading-[26px]">
            <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-brand-600 flex-shrink-0" aria-hidden="true" />
            {entry}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Fact({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="font-body text-[12px] font-semibold uppercase tracking-wider text-surface-500">{label}</dt>
      <dd className="font-body text-[15px] font-semibold text-heading m-0">{value}</dd>
    </div>
  );
}

export default function JobDetailPage({ slug, onPageChange }) {
  const job = getJobBySlug(slug);

  if (!job) {
    return (
      <div className="w-full flex flex-col">
        <SEO title="Job Not Found | Careers at SKM Egg Products" noindex />
        <CareersPageHeader onPageChange={onPageChange} crumbs={[{ label: 'Careers', route: 'careers' }, { label: 'Job not found' }]} title="This position is no longer available">
          <p className="font-body text-[16px] text-surface-500 m-0 max-w-xl">The role may have been filled or closed. Browse our current opportunities or join the Talent Pool.</p>
          <div className="flex flex-wrap gap-3 mt-2">
            <InternalLink route="careers/jobs" onPageChange={onPageChange} className="btn-primary-red">Browse All Jobs</InternalLink>
            <InternalLink route="careers/apply" onPageChange={onPageChange} className="btn-outline-red">Join Our Talent Pool</InternalLink>
          </div>
        </CareersPageHeader>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <SEO
        title={`${job.title} | Careers at SKM Egg Products`}
        description={`${job.title} — ${job.department}, ${job.location}. ${job.summary}`}
        canonical={`https://www.skmegg.com/careers/jobs/${job.slug}`}
      />
      <CareersPageHeader
        onPageChange={onPageChange}
        crumbs={[{ label: 'Careers', route: 'careers' }, { label: job.department, route: 'careers/jobs', prefill: { department: job.department } }, { label: job.title }]}
        eyebrow={job.department}
        title={job.title}
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 m-0 p-0 list-none font-body text-[15px] text-surface-600">
          <li className="flex items-center gap-1.5"><CareerIcon name="pin" className="w-4 h-4 text-surface-400" />{job.location}</li>
          <li className="flex items-center gap-1.5"><CareerIcon name="briefcase" className="w-4 h-4 text-surface-400" />{job.employmentType}</li>
          <li className="flex items-center gap-1.5"><CareerIcon name="clock" className="w-4 h-4 text-surface-400" />{job.experience}</li>
        </ul>
        <p className="font-body text-[13px] text-surface-500 m-0">Job ID: <span className="font-semibold text-surface-700">{job.id}</span></p>
      </CareersPageHeader>

      <div className="w-full bg-white py-[50px] lg:py-[70px]">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <article className="lg:col-span-8 flex flex-col gap-10">
            <section className="flex flex-col gap-3">
              <h2 className="font-heading font-bold text-[22px] text-heading m-0">About the Role</h2>
              <p className="font-body text-[15px] text-surface-600 leading-[26px] m-0">{job.summary}</p>
            </section>
            <BulletSection title="Responsibilities" items={job.responsibilities} />
            <BulletSection title="Requirements" items={job.requirements} />
            <section className="flex flex-col gap-3">
              <h2 className="font-heading font-bold text-[22px] text-heading m-0">Skills</h2>
              <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
                {job.skills.map((skill) => (
                  <li key={skill} className="px-3.5 py-1.5 rounded-full bg-page border border-[#e5e5e5] font-body text-[13px] font-semibold text-surface-700">{skill}</li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="lg:col-span-4 lg:sticky lg:top-28 rounded-[10px] bg-page border border-[#eee] p-6 flex flex-col gap-6">
            <dl className="grid grid-cols-2 lg:grid-cols-1 gap-5 m-0">
              <Fact label="Qualification" value={job.qualification} />
              <Fact label="Experience" value={job.experience} />
              <Fact label="Location" value={job.location} />
              <Fact label="Employment Type" value={job.employmentType} />
              <Fact label="Posted" value={formatJobDate(job.postedDate)} />
              <Fact label="Closing Date" value={formatJobDate(job.closingDate)} />
            </dl>
            <InternalLink route={`careers/apply/${job.slug}`} onPageChange={onPageChange} className="btn-primary-red min-h-[46px] justify-center">
              Apply for This Position
              <CareerIcon name="arrow" className="w-3.5 h-3.5" />
            </InternalLink>
            <InternalLink route="careers/jobs" onPageChange={onPageChange} className="font-heading font-bold text-[13px] uppercase tracking-wider text-brand-650 hover:text-brand-800 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm py-2">
              ← Back to All Jobs
            </InternalLink>
          </aside>
        </div>
      </div>
    </div>
  );
}
