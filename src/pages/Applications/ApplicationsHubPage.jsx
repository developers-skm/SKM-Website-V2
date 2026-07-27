import PageWrapper from '../../components/PageWrapper/PageWrapper';
import ApplicationHero from './sections/ApplicationHero';
import ApplicationCategories from './sections/ApplicationCategories';
import FormulationChallenges from './sections/FormulationChallenges';
import ApplicationProductMatrix from './sections/ApplicationProductMatrix';
import TechnicalSupport from './sections/TechnicalSupport';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';

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
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page dark:bg-surface-950">

        <ApplicationHero onPageChange={onPageChange} />
        <CurvedDivider bg="transparent" fill="#ececec" className="-mt-[36px] sm:-mt-[52px] lg:-mt-[64px] dark:hidden" />
        <CurvedDivider bg="transparent" fill="#121212" className="-mt-[36px] sm:-mt-[52px] lg:-mt-[64px] hidden dark:block" />

        <ApplicationCategories onPageChange={onPageChange} />
        <CurvedDivider bg="#ececec" fill="#f8f4ee" className="dark:hidden" />
        <CurvedDivider bg="#121212" fill="#121212" className="hidden dark:block" />

        <FormulationChallenges onPageChange={onPageChange} />
        <CurvedDivider bg="#f8f4ee" fill="#fff" className="dark:hidden" />
        <CurvedDivider bg="#121212" fill="#121212" className="hidden dark:block" />

        <ApplicationProductMatrix onPageChange={onPageChange} />
        <CurvedDivider bg="#fff" fill="#fdf1f0" className="dark:hidden" />
        <CurvedDivider bg="#121212" fill="#121212" className="hidden dark:block" />

        <TechnicalSupport
          onDiscussFormulation={() => onPageChange('contact-us')}
          onRequestTrial={() => onPageChange('get-quote')}
        />

      </div>
    </PageWrapper>
  );
}
