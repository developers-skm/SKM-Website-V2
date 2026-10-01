import { motion } from 'framer-motion';
import { makeItemVariants } from '../../../utils/animationVariants';
import CareerIcon from './careerIcons';

const item = makeItemVariants({ y: 20 });

// One department tile. Selecting it filters the Current Opportunities list.
export default function CareerAreaCard({ department, openCount, active, onSelect }) {
  return (
    <motion.li variants={item} className="list-none">
      <button
        type="button"
        onClick={() => onSelect(department)}
        aria-pressed={active}
        className={`group w-full h-full text-left rounded-[10px] border p-5 flex items-center gap-4 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-[5px_3px_30px_rgba(0,72,88,0.10)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
          active ? 'bg-white border-brand-600' : 'bg-white border-[#eee] hover:border-brand-600/40'
        }`}
      >
        <span className="w-11 h-11 rounded-[10px] bg-surface-100 text-surface-600 group-hover:bg-brand-600/8 group-hover:text-brand-600 flex items-center justify-center flex-shrink-0 transition-colors">
          <CareerIcon name="department" className="w-5 h-5" />
        </span>
        <span className="flex flex-col min-w-0">
          <span className="font-heading font-bold text-[16px] text-heading leading-snug">{department}</span>
          <span className="font-body text-[13px] text-surface-500">
            {openCount > 0 ? `${openCount} open ${openCount === 1 ? 'role' : 'roles'}` : 'Talent pool'}
          </span>
        </span>
        <CareerIcon name="arrow" className="w-4 h-4 ml-auto text-surface-400 group-hover:text-brand-600 transition-colors flex-shrink-0" />
      </button>
    </motion.li>
  );
}
