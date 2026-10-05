import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import TraceabilityLoopJourney from '../../components/Traceability/TraceabilityLoopJourney';

// Liquid Line — same journey as the Powder Line, minus the spray-drying
// chapter (liquid egg is not dried), so five chapters instead of six.
export default function LiquidLinePage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Liquid Line | How SKM Liquid Egg Is Made',
        description: 'From biosecure farms to hygienic packaging — see how SKM liquid egg products are made through a HACCP-monitored breaking and pasteurization line.',
        keywords: 'liquid egg manufacturing process, pasteurized liquid egg, SKM liquid line, egg processing plant',
        canonical: 'https://www.skmegg.com/liquid_line',
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
          title="How Liquid Egg Is Made"
          subtitle="360° Farm-to-Fork Traceability — From Biosecure Farms to Hygienic Packaging & Global Dispatch"
          onPageChange={onPageChange}
          showQuality={false}
          line="liquid"
        />
      </div>
    </PageWrapper>
  );
}
