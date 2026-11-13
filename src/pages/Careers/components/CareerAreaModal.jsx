import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { departmentDescriptions, departmentIcons } from '../../../data/careersContent';
import { formatJobDate } from '../../../data/jobs';
import CareerIcon from './careerIcons';

// NOTE: text blocks use <div>/<span> on purpose - the global `p` rule in
// index.css (unlayered) overrides Tailwind size/weight/leading utilities.

const eyebrow = 'font-body text-[11.5px] font-bold uppercase tracking-[0.12em] text-surface-400';

function ModalButton({ onClick, children, full = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-600 hover:bg-brand-650 text-white font-body font-bold text-[14px] tracking-wide px-7 py-3.5 shadow-[0_8px_20px_rgba(228,10,24,0.22)] hover:shadow-[0_12px_26px_rgba(228,10,24,0.3)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        full ? 'w-full' : 'self-start'
      }`}
    >
      {children}
      <CareerIcon name="arrow" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
    </button>
  );
}

// "Today is the last date" / "Tomorrow" / "4 days left" for an ISO closing date.
function deadlineInfo(closingDate) {
  const [y, m, d] = closingDate.split('-').map(Number);
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((new Date(y, m - 1, d) - start) / 86400000);
  if (days <= 0) return { text: 'Today is the last date', urgent: true };
  if (days === 1) return { text: 'Tomorrow is the last date', urgent: true };
  return { text: `${days} days left`, urgent: days <= 3 };
}

function JobCard({ job, onApply }) {
  const facts = [
    ['Department', job.department, 'department'],
    ['Location', job.location, 'pin'],
    ['Qualification', job.qualification, 'graduate'],
    ['Experience', job.experience, 'briefcase'],
    ['Employment', job.employmentType, 'clock'],
    ['Vacancies', job.vacancies ? `${job.vacancies} ${Number(job.vacancies) === 1 ? 'Position' : 'Positions'}` : null, 'teamwork'],
    ['Salary', job.salary, 'chart'],
  ].filter(([, value]) => value);

  return (
    <li className="list-none rounded-2xl border border-[#e8e4dd] bg-white shadow-[0_6px_20px_rgba(0,0,0,0.04)] p-5 sm:p-6 flex flex-col gap-5">
      {/* Title + status */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-heading font-bold text-[20px] sm:text-[22px] text-heading leading-snug tracking-tight">
            {job.title}
          </span>
          {job.id && <span className="font-body text-[13px] text-surface-500">Job Ref: {job.id}</span>}
        </div>
        <span className="flex-shrink-0 mt-1 rounded-full bg-[#dff5e6] px-3 py-1 font-body text-[12px] font-bold text-[#1f7a3d]">
          Open
        </span>
      </div>

      {/* Facts grid */}
      {facts.length > 0 && (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 m-0 font-body">
          {facts.map(([label, value, icon]) => (
            <div key={label} className="flex items-start gap-3 min-w-0">
              <CareerIcon name={icon} className="w-[18px] h-[18px] mt-1 flex-shrink-0 text-surface-500" />
              <div className="flex flex-col min-w-0">
                <dt className="text-[12px] text-surface-500 font-medium">{label}</dt>
                <dd className="m-0 text-[15px] font-bold text-heading leading-snug">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      )}

      <hr className="border-0 border-t border-[#eee9df] m-0" />

      {job.summary && (
        <div className="flex flex-col gap-2">
          <span className="font-heading font-bold text-[16px] text-heading">Job Description</span>
          <div className="font-body text-[14.5px] text-surface-600 leading-[1.7]">{job.summary}</div>
        </div>
      )}


      {job.skills?.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="font-heading font-bold text-[16px] text-heading">Required Skills</span>
          <div className="font-body text-[14.5px] text-surface-600 leading-[1.7]">{job.skills.join(', ')}</div>
        </div>
      )}

      {job.closingDate && (() => {
        const info = deadlineInfo(job.closingDate);
        return (
          <div className="flex items-center justify-between gap-3 rounded-xl bg-[#faf8f5] border border-[#eee9df] px-4 py-3 font-body">
            <div className="flex flex-col gap-0.5">
              <span className="text-[12px] text-surface-500 font-medium">Application Deadline</span>
              <span className="text-[15px] font-bold text-heading">{formatJobDate(job.closingDate)}</span>
            </div>
            <span
              className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold ${
                info.urgent ? 'bg-brand-600/10 text-brand-650' : 'bg-[#f0ede6] text-surface-700'
              }`}
            >
              <CareerIcon name="clock" className="w-3.5 h-3.5" />
              {info.text}
            </span>
          </div>
        );
      })()}

      <ModalButton onClick={() => onApply(job)} full>Apply Now</ModalButton>
    </li>
  );
}

// Department detail dialog. Open roles → their HR-entered details + Apply Now
// (vacancy form). No open roles → "I'm Interested" (general talent-pool form).
export default function CareerAreaModal({ department, jobs, onClose, onPageChange }) {
  const openCount = jobs.length;
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  const handleInterested = () => {
    onClose();
    onPageChange('careers/apply', { department });
  };
  const handleApply = (job) => {
    onClose();
    onPageChange(`careers/apply/${job.slug}`);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-[#1b1b1b]/55 backdrop-blur-[3px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="career-area-modal-title"
        data-lenis-prevent
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="hide-scrollbar relative w-full max-w-[620px] max-h-[92vh] overflow-y-auto overscroll-contain rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
      >
        {/* Header band */}
        <div className="relative px-6 sm:px-9 pt-8 pb-6 bg-gradient-to-b from-[#faf8f5] to-white border-b border-[#efebe4]">
          <span aria-hidden="true" className="absolute top-0 left-0 right-0 h-1 bg-brand-600" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-[#e8e4dd] flex items-center justify-center text-surface-500 hover:text-brand-650 hover:border-brand-600/50 hover:rotate-90 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <span aria-hidden="true" className="text-xl leading-none">&times;</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white border border-[#e8e4dd] shadow-[0_6px_16px_rgba(0,0,0,0.06)] flex items-center justify-center text-brand-650">
              <CareerIcon name={departmentIcons[department] || 'department'} className="w-7 h-7" />
            </div>
            <div className="flex flex-col gap-1 min-w-0 pr-10">
              <span className="font-body text-[11.5px] font-bold uppercase tracking-[0.14em] text-brand-650">
                Department
              </span>
              <h3 id="career-area-modal-title" className="font-heading font-bold text-[24px] sm:text-[28px] text-heading leading-tight tracking-tight m-0">
                {department}
              </h3>
            </div>
          </div>

          {openCount === 0 && (
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#e8e4dd] bg-[#f7f6f2] px-3.5 py-1.5 font-body text-[12.5px] font-semibold text-surface-600">
              <CareerIcon name="clock" className="w-4 h-4" />
              Future opportunities
            </span>
          )}
        </div>

        {/* Body */}
        <div className="px-6 sm:px-9 pt-6 pb-8 flex flex-col gap-6">
          {openCount === 0 && (
          <div className="flex flex-col gap-2">
            <span className={eyebrow}>Role overview</span>
            <div className="font-body text-[15px] text-surface-600 leading-[1.75]">
              {departmentDescriptions[department]}
            </div>
          </div>
          )}

          {openCount > 0 ? (
            <ul className="flex flex-col gap-5 m-0 p-0 list-none">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} onApply={handleApply} />
              ))}
            </ul>
          ) : (
            <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-[#d9d3c7] bg-[#fcfbf9] p-5">
              <div className="font-body text-[14px] text-surface-600 leading-[1.7]">
                There are no open positions in this department right now. Share your profile once and our HR team will contact you when a matching role opens.
              </div>
              <ModalButton onClick={handleInterested}>I&apos;m Interested</ModalButton>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
