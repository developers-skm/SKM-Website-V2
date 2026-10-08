import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import { whyJoinSkm } from '../../../data/careersContent';
import { Container, Section } from './layout';
import SectionHeading from './SectionHeading';
import CareerIcon from './careerIcons';

const container = makeContainerVariants(0.07);
const item = makeItemVariants({ y: 16 });

// Minimal blocks separated by thin vertical dividers - calm and executive.
export default function WhyJoinSkm() {
  return (
    <Section tone="white" labelledBy="why-join-title" className="border-b border-[#eae6e0]">
      <Container className="flex flex-col gap-10 lg:gap-14">
        <SectionHeading
          id="why-join-title"
          label="Why SKM"
          title="Build More Than a Career"
          text="Join a global manufacturing leader committed to quality, continuous innovation, and building long-term career growth."
        />
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-y-0 list-none m-0 p-0"
        >
          {whyJoinSkm.map((card) => (
            <motion.li
              key={card.title}
              variants={item}
              className="flex flex-col gap-3.5 pt-6 pb-6 lg:py-2 border-t border-[#eee] lg:border-t-0 lg:border-l lg:border-[#eae6e0] lg:px-8 lg:first:pl-0 lg:first:border-l-0 lg:last:pr-0"
            >
              <div className="w-11 h-11 rounded-xl bg-[#faf8f5] border border-[#e8e4dd] flex items-center justify-center text-heading">
                <CareerIcon name={card.icon} className="w-5.5 h-5.5 text-heading" />
              </div>
              <h3 className="font-heading font-bold text-[19px] sm:text-[20px] text-heading m-0 tracking-tight">{card.title}</h3>
              <p className="font-body text-[15px] text-surface-600 leading-[1.65] m-0">{card.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}

