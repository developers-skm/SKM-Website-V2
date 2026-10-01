import InternalLink from '../../../components/common/InternalLink';
import { Container, Section } from './layout';
import CareerIcon from './careerIcons';

// Premium dark anchor CTA band in deep charcoal neutral with subtle red accent.
export default function TalentPoolCTA({ onPageChange }) {
  return (
    <Section tone="white" labelledBy="talent-pool-title" className="!pt-6 !pb-14 sm:!pb-20">
      <Container>
        <div className="relative rounded-2xl bg-[#161616] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-14 overflow-hidden shadow-2xl border border-white/5">
          {/* Subtle background industrial geometric grid accent */}
          <div
            aria-hidden="true"
            className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-brand-600/10 blur-3xl pointer-events-none"
          />

          <div className="flex flex-col gap-4 flex-1 relative z-10">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-brand-600" aria-hidden="true" />
              <span className="font-heading text-[12px] font-bold uppercase tracking-[0.18em] text-brand-400">
                CAN&apos;T FIND THE RIGHT ROLE?
              </span>
            </div>

            <h2
              id="talent-pool-title"
              className="font-heading font-bold text-[30px] sm:text-[38px] lg:text-[44px] text-white leading-[1.1] tracking-tight m-0 max-w-[20ch]"
            >
              Join Our Talent Community
            </h2>

            <p className="font-body text-[16px] sm:text-[17px] text-neutral-300 leading-[1.65] m-0 max-w-[560px]">
              Submit your profile and let our recruitment team consider you for suitable future opportunities across SKM.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <InternalLink
              route="careers/apply"
              onPageChange={onPageChange}
              className="btn-primary-red min-h-[52px] px-8 justify-center self-stretch sm:self-start lg:self-auto text-[15px]"
            >
              Submit Your Resume
              <CareerIcon name="arrow" className="w-3.5 h-3.5" />
            </InternalLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

