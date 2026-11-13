import { useState } from 'react';
import SEO from '../../components/SEO/SEO';
import { Container } from './components/layout';
import CareersPageHeader from './components/CareersPageHeader';
import InternshipForm from './components/InternshipForm';
import ApplicationSuccess from './components/ApplicationSuccess';

// /careers/internship → internship application.
export default function InternshipPage({ onPageChange }) {
  const [reference, setReference] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Internship Application | Careers at SKM Egg Products"
        description="Apply for an internship at SKM Egg Products across manufacturing operations, quality laboratories and corporate departments."
        canonical="https://www.skmegg.com/careers/internship"
        noindex
      />
      <CareersPageHeader
        onPageChange={onPageChange}
        crumbs={[{ label: 'Careers', route: 'careers' }, { label: 'Internship Application' }]}
        size="form"
        eyebrow="Students"
        title="Internship Application"
      />
      <div className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <Container size="form">
          {submitted ? (
            <ApplicationSuccess reference={reference} onPageChange={onPageChange} />
          ) : (
            <InternshipForm
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
