import { motion } from 'framer-motion';
import { makeItemVariants } from '../../../utils/animationVariants';
import TextLink from './TextLink';
import CareerIcon from './careerIcons';

const item = makeItemVariants({ y: 14 });

// Horizontal corporate job listing row (stacks on mobile).
export default function JobCard({ job, onPageChange }) {
  return (
    <motion.article
      variants={item}
      className="group rounded-2xl bg-white border border-[#e5e1d8] p-6 sm:p-7 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-10 gap-y-5 transition-all duration-200 hover:border-brand-600/50 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:-translate-y-0.5"
    >
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading font-bold text-[22px] sm:text-[25px] text-heading leading-snug tracking-tight m-0 group-hover:text-brand-650 transition-colors">
              {job.title}
            </h3>
            <p className="font-body text-[14px] font-bold uppercase tracking-wider text-brand-650 m-0">
              {job.department}
            </p>
          </div>
          <span className="md:hidden flex-shrink-0 px-3 py-1 rounded-full bg-[#f4f2ee] font-body text-[12px] font-bold uppercase tracking-wider text-surface-700">
            {job.employmentType}
          </span>
        </div>

        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 m-0 p-0 list-none font-body text-[14px] text-surface-600 font-medium">
          <li className="flex items-center gap-1.5">
            <CareerIcon name="pin" className="w-4 h-4 text-surface-400" />
            {job.location}
          </li>
          <li aria-hidden="true" className="hidden sm:block text-surface-300">•</li>
          <li className="flex items-center gap-1.5">
            <CareerIcon name="clock" className="w-4 h-4 text-surface-400" />
            {job.experience}
          </li>
          <li aria-hidden="true" className="hidden sm:block text-surface-300">•</li>
          <li className="flex items-center gap-1.5">
            <CareerIcon name="graduate" className="w-4 h-4 text-surface-400" />
            {job.qualification}
          </li>
        </ul>

        <p className="font-body text-[15px] text-surface-600 leading-[1.65] m-0 max-w-[65ch]">
          {job.summary}
        </p>
      </div>

      <div className="flex md:flex-col md:items-end justify-between md:justify-between gap-4 md:min-w-[160px] pt-2 md:pt-0 border-t md:border-t-0 border-[#eee]">
        <span className="hidden md:inline-block px-3 py-1 rounded-full bg-[#f4f2ee] font-body text-[12px] font-bold uppercase tracking-wider text-surface-700">
          {job.employmentType}
        </span>
        <TextLink route={`careers/jobs/${job.slug}`} onPageChange={onPageChange} aria-label={`View job: ${job.title}`} className="font-semibold">
          View Position
        </TextLink>
      </div>
    </motion.article>
  );
}

