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
        className={`group w-full h-full text-left rounded-xl border p-5 flex items-center gap-4 bg-white transition-[transform,border-color,box-shadow] duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.05)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
          active ? 'border-brand-600' : 'border-[#e5e5e5] hover:border-surface-400'
        }`}
      >
        <span className="text-surface-500 group-hover:text-brand-600 transition-colors flex-shrink-0">
          <CareerIcon name={departmentIcons[department] || 'department'} className="w-6 h-6" />
        </span>
        <span className="flex flex-col min-w-0 flex-1">
          <span className="font-heading font-bold text-[16px] text-heading leading-snug">{department}</span>
          <span className="font-body text-[13px] text-surface-500">
            {openCount > 0 ? `${openCount} open ${openCount === 1 ? 'role' : 'roles'}` : 'Talent pool'}
          </span>
        </span>
        <CareerIcon name="arrow" className="w-4 h-4 text-brand-600 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none" />
      </button>
    </motion.li>
  );
}
