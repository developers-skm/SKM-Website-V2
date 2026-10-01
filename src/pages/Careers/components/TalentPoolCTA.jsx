import InternalLink from '../../../components/common/InternalLink';
import CareerIcon from './careerIcons';

export default function TalentPoolCTA({ onPageChange }) {
  return (
    <section aria-labelledby="talent-pool-title" className="w-full bg-page py-[70px] lg:py-[90px] border-y border-[#eee]">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-[10px] bg-white border border-[#eee] border-l-4 border-l-brand-600 p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center gap-8 shadow-[5px_3px_40px_rgba(0,72,88,0.06)]">
          <div className="flex flex-col gap-3 flex-1">
            <h2 id="talent-pool-title" className="font-heading font-bold text-[28px] sm:text-[34px] text-heading leading-[1.15] tracking-tight m-0">
              Can&apos;t Find the Right Opportunity?
            </h2>
            <p className="font-body text-[15px] sm:text-[16px] text-surface-500 leading-[26px] m-0 max-w-xl">
              Submit your profile to our Talent Pool and our recruitment team can consider you for future opportunities.
            </p>
          </div>
          <InternalLink route="careers/apply" onPageChange={onPageChange} className="btn-primary-red min-h-[46px] justify-center self-start lg:self-auto">
            Submit Your Resume
            <CareerIcon name="arrow" className="w-3.5 h-3.5" />
          </InternalLink>
        </div>
      </div>
    </section>
  );
}
