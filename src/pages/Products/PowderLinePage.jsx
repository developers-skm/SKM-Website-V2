import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import TraceabilityLoopJourney from '../../components/Traceability/TraceabilityLoopJourney';

// Powder Line — the manufacturing process that previously sat at the bottom
// of every egg-powder product page, now a single dedicated page reached from
// the Products hub.
export default function PowderLinePage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Powder Line | How SKM Egg Powder Is Made',
        description: 'From biosecure farms to hygienic packaging — see how SKM egg powders are made through a HACCP-monitored breaking, pasteurization and spray-drying line.',
        keywords: 'egg powder manufacturing process, spray dried egg powder, SKM powder line, egg powder plant',
        canonical: 'https://www.skmegg.com/powder_line',
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full bg-[#FAFAF8] pt-[110px] sm:pt-[130px] lg:pt-[110px]">
        <div className="mx-auto max-w-[1360px] w-full px-5 sm:px-8 lg:px-12">
          <InternalLink
            route="products"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2 font-body font-semibold text-[14px] text-surface-500 hover:text-heading transition-colors duration-200 focus:outline-none focus-gold rounded-sm"
          >
            <span aria-hidden="true">←</span>
            Back to Products
          </InternalLink>
        </div>
        <TraceabilityLoopJourney
          title="How Egg Powder Is Made"
          subtitle="Feed-to-Food Traceability — From Biosecure Farms to Hygienic Packaging & Global Dispatch"
          onPageChange={onPageChange}
          showQuality={false}
        />
      </div>
    </PageWrapper>
  );
}
