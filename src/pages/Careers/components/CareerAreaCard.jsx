import { motion } from 'framer-motion';
import { makeItemVariants } from '../../../utils/animationVariants';
import { departmentIcons } from '../../../data/careersContent';
import CareerIcon from './careerIcons';

const item = makeItemVariants({ y: 14 });

// One department tile. Selecting it filters the Current Opportunities list.
export default function CareerAreaCard({ department, openCount, active, onSelect }) {
  return (
    <motion.li variants={item} className="list-none">
      <button
        type="button"
        onClick={() => onSelect(department)}
        aria-pressed={active}
        className={`group w-full h-full text-left rounded-2xl border p-6 flex flex-col justify-between gap-6 bg-white transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
          active
            ? 'border-brand-600 ring-1 ring-brand-600 bg-[#faf8f5]'
            : 'border-[#e8e4dd] hover:border-brand-600/60'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="w-10 h-10 rounded-xl bg-[#f7f6f2] border border-[#e8e4dd] flex items-center justify-center text-heading group-hover:text-brand-650 group-hover:border-brand-200 transition-colors">
            <CareerIcon name={departmentIcons[department] || 'department'} className="w-5 h-5" />
          </div>
          <CareerIcon
            name="arrow"
            className="w-4 h-4 text-surface-400 group-hover:text-brand-650 transition-all duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </div>

        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-heading font-bold text-[17px] sm:text-[18px] text-heading leading-snug tracking-tight group-hover:text-brand-650 transition-colors">
            {department}
          </span>
          {openCount > 0 && (
            <span className="font-body text-[13px] text-surface-500 font-medium">
              {`${openCount} open ${openCount === 1 ? 'role' : 'roles'}`}
            </span>
          )}
        </div>
      </button>
    </motion.li>
  );
}

