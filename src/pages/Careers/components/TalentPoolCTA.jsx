import InternalLink from '../../../components/common/InternalLink';
import { Container, Section } from './layout';
import CareerIcon from './careerIcons';

// The page's single strong CTA band, in the real SKM brand red.
export default function TalentPoolCTA({ onPageChange }) {
  return (
    <Section tone="white" labelledBy="talent-pool-title" className="!pt-0">
      <Container>
        <div className="rounded-2xl bg-brand-600 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-[72px] flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
          <div className="flex flex-col gap-4 flex-1">
            <h2 id="talent-pool-title" className="font-heading font-bold text-[30px] sm:text-[38px] lg:text-[42px] text-white leading-[1.12] tracking-tight m-0 max-w-[18ch]">
              Can&apos;t Find the Right Opportunity?
            </h2>
            <p className="font-body text-[16px] sm:text-[17px] text-white/90 leading-[1.65] m-0 max-w-[560px]">
              Submit your profile to our Talent Pool and our recruitment team can consider you for future opportunities.
            </p>
          </div>
          <InternalLink route="careers/apply" onPageChange={onPageChange} className="btn-primary-red white-bg min-h-[52px] justify-center self-stretch sm:self-start lg:self-auto">
            Submit Your Resume
            <CareerIcon name="arrow" className="w-3.5 h-3.5" />
          </InternalLink>
        </div>
      </Container>
    </Section>
  );
}
