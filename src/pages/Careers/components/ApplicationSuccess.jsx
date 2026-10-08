import { useEffect, useRef } from 'react';
import InternalLink from '../../../components/common/InternalLink';
import CareerIcon from './careerIcons';

export default function ApplicationSuccess({ reference, onPageChange }) {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-6 py-6">
      <span className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
        <CareerIcon name="check" className="w-8 h-8" />
      </span>
      <h2 ref={headingRef} tabIndex={-1} className="font-heading font-bold text-[30px] text-heading m-0 focus:outline-none">
        Application Submitted Successfully
      </h2>
      <p className="font-body text-[16px] text-surface-500 leading-[28px] m-0">
        Thank you for applying to SKM Egg Products. Our recruitment team will review your profile.
      </p>
      {reference && (
        <div className="rounded-[10px] bg-page border border-[#eee] px-8 py-4 flex flex-col gap-1">
          <span className="font-body text-[12px] font-semibold uppercase tracking-wider text-surface-500">Application Reference</span>
          <span className="font-heading font-bold text-[22px] text-heading tracking-wide">{reference}</span>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <InternalLink route="careers/jobs" onPageChange={onPageChange} className="btn-primary-red justify-center">Browse More Jobs</InternalLink>
        <InternalLink route="careers" onPageChange={onPageChange} className="btn-outline-red justify-center">Back to Careers</InternalLink>
      </div>
    </div>
  );
}
