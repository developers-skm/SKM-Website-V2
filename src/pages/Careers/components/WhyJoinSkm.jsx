import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import { whyJoinSkm } from '../../../data/careersContent';
import { Container, Section } from './layout';
import SectionHeading from './SectionHeading';
import CareerIcon from './careerIcons';

const container = makeContainerVariants(0.07);
const item = makeItemVariants({ y: 16 });

// Plain icon + text columns separated by hairlines — deliberately not cards.
export default function WhyJoinSkm() {
  return (
    <Section labelledBy="why-join-title">
      <Container className="flex flex-col gap-10 lg:gap-12">
        <SectionHeading
          id="why-join-title"
          label="Why SKM"
          title="Why Build Your Career at SKM?"
          text="Build more than a career — grow with a company known for quality and global reach."
        />
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 lg:gap-x-0 list-none m-0 p-0"
        >
          {whyJoinSkm.map((card) => (
            <motion.li
              key={card.title}
              variants={item}
              className="flex flex-col gap-3 pt-6 pb-8 lg:py-1 border-t border-[#e5e5e5] lg:border-t-0 lg:border-l lg:px-8 lg:first:pl-0 lg:first:border-l-0 lg:last:pr-0"
            >
              <span className="text-brand-600"><CareerIcon name={card.icon} className="w-7 h-7" /></span>
              <h3 className="font-heading font-bold text-[19px] text-heading m-0">{card.title}</h3>
              <p className="font-body text-[15px] text-surface-500 leading-[1.65] m-0">{card.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
