import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import { earlyCareerPaths } from '../../../data/careersContent';
import { Container, Section } from './layout';
import SectionHeading from './SectionHeading';
import TextLink from './TextLink';
import CareerIcon from './careerIcons';

const container = makeContainerVariants(0.08);
const item = makeItemVariants({ y: 16 });

// Tinted band with three open columns (icon, title, copy, text link).
export default function EarlyCareers({ onExplore }) {
  return (
    <Section tone="tint" labelledBy="early-careers-title">
      <Container className="flex flex-col gap-10 lg:gap-12">
        <SectionHeading
          id="early-careers-title"
          label="Students & Graduates"
          title="Start Your Career With SKM"
          text="Structured ways for students and recent graduates to learn inside a working food manufacturing business."
        />
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8 list-none m-0 p-0"
        >
          {earlyCareerPaths.map((path) => (
            <motion.li key={path.title} variants={item} className="flex flex-col gap-3 pt-6 border-t border-[#d8d4cc]">
              <span className="text-brand-600"><CareerIcon name={path.icon} className="w-7 h-7" /></span>
              <h3 className="font-heading font-bold text-[20px] text-heading m-0">{path.title}</h3>
              <p className="font-body text-[15px] text-surface-600 leading-[1.65] m-0">{path.text}</p>
              <TextLink onClick={onExplore} className="self-start">Learn More</TextLink>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
