import InternalLink from '../../../components/common/InternalLink';
import CareerIcon from './careerIcons';

export default function JobCard({ job, onPageChange }) {
  return (
    <article className="rounded-[10px] bg-white border border-[#eee] p-6 sm:p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.10)]">
      <div className="flex flex-col gap-1.5">
        <span className="font-body text-[12px] font-bold uppercase tracking-widest text-brand-650">{job.department}</span>
        <h3 className="font-heading font-bold text-[21px] text-heading leading-snug m-0">{job.title}</h3>
      </div>

      <ul className="flex flex-wrap gap-x-5 gap-y-2 m-0 p-0 list-none font-body text-[14px] text-surface-600">
        <li className="flex items-center gap-1.5"><CareerIcon name="pin" className="w-4 h-4 text-surface-400" />{job.location}</li>
        <li className="flex items-center gap-1.5"><CareerIcon name="briefcase" className="w-4 h-4 text-surface-400" />{job.employmentType}</li>
        <li className="flex items-center gap-1.5"><CareerIcon name="clock" className="w-4 h-4 text-surface-400" />{job.experience}</li>
      </ul>

      <p className="font-body text-[14px] text-surface-500 m-0">
        <span className="font-semibold text-surface-700">Qualification:</span> {job.qualification}
      </p>
      <p className="font-body text-[15px] text-surface-500 leading-relaxed m-0 flex-1">{job.summary}</p>

      <InternalLink
        route={`careers/jobs/${job.slug}`}
        onPageChange={onPageChange}
        aria-label={`View job: ${job.title}`}
        className="self-start inline-flex items-center gap-2 min-h-[44px] font-heading font-bold text-[13px] uppercase tracking-wider text-brand-650 hover:text-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
      >
        View Job
        <CareerIcon name="arrow" className="w-4 h-4" />
      </InternalLink>
    </article>
  );
}
