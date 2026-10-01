import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import { earlyCareerPaths } from '../../../data/careersContent';
import SectionHeading from './SectionHeading';
import CareerIcon from './careerIcons';

const container = makeContainerVariants(0.08);
const item = makeItemVariants({ y: 24 });

export default function EarlyCareers({ onExplore }) {
  return (
    <section aria-labelledby="early-careers-title" className="w-full bg-white py-[70px] lg:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading id="early-careers-title" label="Freshers & Interns" title="Start Your Career With SKM" />
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none m-0 p-0"
        >
          {earlyCareerPaths.map((path) => (
            <motion.li key={path.title} variants={item} className="rounded-[10px] bg-page border border-[#eee] p-7 flex flex-col gap-4">
              <span className="w-12 h-12 rounded-[10px] bg-white border border-[#eee] flex items-center justify-center text-brand-600">
                <CareerIcon name={path.icon} className="w-6 h-6" />
              </span>
              <h3 className="font-heading font-bold text-[19px] text-heading m-0">{path.title}</h3>
              <p className="font-body text-[15px] text-surface-500 leading-relaxed m-0">{path.text}</p>
            </motion.li>
          ))}
        </motion.ul>
        <div className="flex justify-center">
          <button type="button" onClick={onExplore} className="btn-primary-red min-h-[46px] justify-center">
            Explore Opportunities
            <CareerIcon name="arrow" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
