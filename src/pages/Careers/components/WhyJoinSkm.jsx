import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import { whyJoinSkm } from '../../../data/careersContent';
import SectionHeading from './SectionHeading';
import CareerIcon from './careerIcons';

const container = makeContainerVariants(0.08);
const item = makeItemVariants({ y: 24 });

export default function WhyJoinSkm() {
  return (
    <section aria-labelledby="why-join-title" className="w-full bg-white py-[70px] lg:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading id="why-join-title" label="Why SKM" title="Why Build Your Career at SKM?" />
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 list-none m-0 p-0"
        >
          {whyJoinSkm.map((card) => (
            <motion.li
              key={card.title}
              variants={item}
              whileHover={{ y: -4 }}
              className="rounded-[10px] bg-page border border-[#eee] p-7 flex flex-col gap-4 transition-shadow duration-300 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.10)]"
            >
              <span className="w-12 h-12 rounded-[10px] bg-brand-600/6 border border-brand-600/12 flex items-center justify-center text-brand-600">
                <CareerIcon name={card.icon} className="w-6 h-6" />
              </span>
              <h3 className="font-heading font-bold text-[19px] text-heading m-0">{card.title}</h3>
              <p className="font-body text-[15px] text-surface-500 leading-relaxed m-0">{card.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
