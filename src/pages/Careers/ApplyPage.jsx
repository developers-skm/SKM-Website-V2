import { useState } from 'react';
import SEO from '../../components/SEO/SEO';
import InternalLink from '../../components/common/InternalLink';
import { getJobBySlug } from '../../data/jobs';
import { Container } from './components/layout';
import CareersPageHeader from './components/CareersPageHeader';
import JobApplicationForm from './components/JobApplicationForm';
import ApplicationSuccess from './components/ApplicationSuccess';

// /careers/apply/:slug → vacancy application; /careers/apply → Talent Pool.
export default function ApplyPage({ slug, onPageChange }) {
  const job = slug ? getJobBySlug(slug) : null;
  const [reference, setReference] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (slug && !job) {
    return (
      <div className="w-full flex flex-col">
        <SEO title="Position Not Found | Careers at SKM Egg Products" noindex />
        <CareersPageHeader onPageChange={onPageChange} crumbs={[{ label: 'Careers', route: 'careers' }, { label: 'Apply' }]} title="This position is no longer available">
          <div className="flex flex-wrap gap-3 mt-2">
            <InternalLink route="careers/jobs" onPageChange={onPageChange} className="btn-primary-red">Browse All Jobs</InternalLink>
            <InternalLink route="careers/apply" onPageChange={onPageChange} className="btn-outline-red">Join Our Talent Pool</InternalLink>
          </div>
        </CareersPageHeader>
      </div>
    );
  }

  const isTalentPool = !job;
  const title = isTalentPool ? 'Join Our Talent Pool' : `Apply for ${job.title}`;

  return (
    <div className="w-full flex flex-col">
      <SEO
        title={isTalentPool ? 'Join Our Talent Pool | Careers at SKM Egg Products' : `Apply for ${job.title} | Careers at SKM Egg Products`}
        description={isTalentPool
          ? 'Submit your profile to the SKM Egg Products Talent Pool and be considered for future opportunities.'
          : `Apply for the ${job.title} position at SKM Egg Products, ${job.location}.`}
        canonical={`https://www.skmegg.com/careers/apply${job ? `/${job.slug}` : ''}`}
        noindex
      />
      <CareersPageHeader
        onPageChange={onPageChange}
        crumbs={job
          ? [{ label: 'Careers', route: 'careers' }, { label: job.title, route: `careers/jobs/${job.slug}` }, { label: 'Apply' }]
          : [{ label: 'Careers', route: 'careers' }, { label: 'Talent Pool' }]}
        size="form"
        eyebrow={isTalentPool ? 'Talent Pool' : 'Job Application'}
        title={title}
      >
        {job ? (
          <p className="font-body text-[15px] text-surface-600 m-0">
            Job ID: <span className="font-semibold">{job.id}</span> · {job.department} · {job.location}
          </p>
        ) : (
          <p className="font-body text-[16px] text-surface-500 leading-[28px] m-0 max-w-2xl">
            No specific vacancy needed. Share your profile and our recruitment team can consider you for future opportunities.
          </p>
        )}
      </CareersPageHeader>

      <div className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <Container size="form">
          {submitted ? (
            <ApplicationSuccess reference={reference} isTalentPool={isTalentPool} onPageChange={onPageChange} />
          ) : (
            <JobApplicationForm
              job={job}
              onSuccess={(ref) => {
                setReference(ref);
                setSubmitted(true);
              }}
            />
          )}
        </Container>
      </div>
    </div>
  );
}
