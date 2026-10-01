import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import { earlyCareerPaths } from '../../../data/careersContent';
import { Container, Section } from './layout';
import SectionHeading from './SectionHeading';
import TextLink from './TextLink';

const container = makeContainerVariants(0.08);
const item = makeItemVariants({ y: 16 });

// Tinted band with three numbered editorial columns (01, 02, 03).
export default function EarlyCareers({ onExplore }) {
  return (
    <Section tone="tint" labelledBy="early-careers-title" className="border-b border-[#eae6e0]">
      <Container className="flex flex-col gap-10 lg:gap-14">
        <SectionHeading
          id="early-careers-title"
          label="Students & Graduates"
          title="Start Your Career With SKM"
          text="Structured entry pathways for students and recent graduates to learn and grow inside a leading global food manufacturing business."
        />
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 list-none m-0 p-0"
        >
          {earlyCareerPaths.map((path) => (
            <motion.li
              key={path.title}
              variants={item}
              className="flex flex-col gap-4 pt-7 border-t-2 border-brand-600/80"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading font-extrabold text-[28px] text-brand-650 tracking-tight opacity-90">
                  {path.number}
                </span>
              </div>
              <h3 className="font-heading font-bold text-[21px] text-heading m-0 tracking-tight">{path.title}</h3>
              <p className="font-body text-[15px] text-surface-600 leading-[1.68] m-0 flex-1">{path.text}</p>
              <TextLink onClick={onExplore} className="self-start pt-2 font-semibold">
                Learn More
              </TextLink>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}

