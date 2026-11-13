import { useState } from 'react';
import SEO from '../../components/SEO/SEO';
import InternalLink from '../../components/common/InternalLink';
import { getJobBySlug, useJobs } from '../../data/jobs';
import { Container } from './components/layout';
import CareersPageHeader from './components/CareersPageHeader';
import JobApplicationForm from './components/JobApplicationForm';
import ApplicationSuccess from './components/ApplicationSuccess';

// /careers/apply/:slug → vacancy application.
export default function ApplyPage({ slug, onPageChange, prefill }) {
  const { loading } = useJobs();
  const job = slug ? getJobBySlug(slug) : null;
  const [reference, setReference] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (slug && loading) return <div className="w-full min-h-[60vh]" aria-busy="true" />;

  if (slug && !job) {
    return (
      <div className="w-full flex flex-col">
        <SEO title="Position Not Found | Careers at SKM Egg Products" noindex />
        <CareersPageHeader onPageChange={onPageChange} crumbs={[{ label: 'Careers', route: 'careers' }, { label: 'Apply' }]} title="This position is no longer available">
          <div className="flex flex-wrap gap-3 mt-2">
            <InternalLink route="careers/jobs" onPageChange={onPageChange} className="btn-primary-red">Browse All Jobs</InternalLink>
          </div>
        </CareersPageHeader>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="w-full flex flex-col">
        <SEO title="General Application | Careers at SKM Egg Products" noindex />
        <CareersPageHeader
          onPageChange={onPageChange}
          crumbs={[{ label: 'Careers', route: 'careers' }, { label: 'General Application' }]}
          size="form"
          eyebrow="Talent Pool"
          title="General Application"
        >
          <p className="font-body text-[15px] text-surface-600 m-0">
            Share your profile and we will reach out when a suitable role opens.
          </p>
        </CareersPageHeader>
        <div className="w-full bg-white py-12 sm:py-16 lg:py-20">
          <Container size="form">
            {submitted ? (
              <ApplicationSuccess reference={reference} onPageChange={onPageChange} />
            ) : (
              <JobApplicationForm
                initialDepartment={prefill?.department}
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

  const title = `Apply for ${job.title}`;

  return (
    <div className="w-full flex flex-col">
      <SEO
        title={`Apply for ${job.title} | Careers at SKM Egg Products`}
        description={`Apply for the ${job.title} position at SKM Egg Products, ${job.location}.`}
        canonical={`https://www.skmegg.com/careers/apply/${job.slug}`}
        noindex
      />
      <CareersPageHeader
        onPageChange={onPageChange}
        crumbs={[{ label: 'Careers', route: 'careers' }, { label: job.title, route: `careers/jobs/${job.slug}` }, { label: 'Apply' }]}
        size="form"
        eyebrow="Job Application"
        title={title}
      >
        <p className="font-body text-[15px] text-surface-600 m-0">
          Job ID: <span className="font-semibold">{job.id}</span> · {job.department} · {job.location}
        </p>
      </CareersPageHeader>

      <div className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <Container size="form">
          {submitted ? (
            <ApplicationSuccess reference={reference} onPageChange={onPageChange} />
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
