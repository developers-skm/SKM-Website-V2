import { useState } from 'react';
import SEO from '../../components/SEO/SEO';
import { Container } from './components/layout';
import CareersPageHeader from './components/CareersPageHeader';
import GroupEmploymentForm from './components/GroupEmploymentForm';
import ApplicationSuccess from './components/ApplicationSuccess';

// /careers/group-employment → contract manpower agency enquiry.
export default function GroupEmploymentPage({ onPageChange }) {
  const [reference, setReference] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Group Employment | Careers at SKM Egg Products"
        description="Manpower agencies can share their details to supply skilled and unskilled contract workers to SKM Egg Products."
        canonical="https://www.skmegg.com/careers/group-employment"
        noindex
      />
      <CareersPageHeader
        onPageChange={onPageChange}
        crumbs={[{ label: 'Careers', route: 'careers' }, { label: 'Group Employment' }]}
        size="form"
        eyebrow="Contract Workforce"
        title="Group Employment"
      >
        <p className="font-body text-[15px] text-surface-600 m-0">
          Share your agency details and our HR team will get in touch.
        </p>
      </CareersPageHeader>
      <div className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <Container size="form">
          {submitted ? (
            <ApplicationSuccess reference={reference} onPageChange={onPageChange} />
          ) : (
            <GroupEmploymentForm
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
