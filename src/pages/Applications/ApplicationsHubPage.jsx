import PageWrapper from '../../components/PageWrapper/PageWrapper';
import ApplicationHero from './sections/ApplicationHero';
import ApplicationCategories from './sections/ApplicationCategories';
import FormulationChallenges from './sections/FormulationChallenges';
import ApplicationProductMatrix from './sections/ApplicationProductMatrix';
import TechnicalSupport from './sections/TechnicalSupport';

// Applications overview / hub — lists every real application category
// (the same 4 records in src/data/applications.js used by Home's
// ApplicationAreas section and by the individual ApplicationLandingPage
// routes). Exists so Section 2's "View All Applications" button has a real
// destination instead of nowhere to go.
export default function ApplicationsHubPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Applications Hub | Egg Products by Food Manufacturing Industry',
        description: 'Explore SKM egg powder and liquid egg solutions by application — bakery, mayonnaise, noodles & pasta, and meat & fish manufacturing.',
        keywords: 'egg products by application, bakery egg powder, mayonnaise egg yolk, noodles egg powder, meat processing egg albumen',
        canonical: 'https://www.skmegg.com/applications',
      }}
      breadcrumbItems={[{ label: 'Applications' }]}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page dark:bg-surface-950">

        <ApplicationHero onPageChange={onPageChange} />

        <ApplicationCategories onPageChange={onPageChange} />

        <FormulationChallenges onPageChange={onPageChange} />

        <ApplicationProductMatrix onPageChange={onPageChange} />

        <TechnicalSupport
          onDiscussFormulation={() => onPageChange('contact-us')}
          onRequestTrial={() => onPageChange('get-quote')}
        />

      </div>
    </PageWrapper>
  );
}
