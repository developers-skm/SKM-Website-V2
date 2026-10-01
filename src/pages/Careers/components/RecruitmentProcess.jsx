import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import { recruitmentSteps } from '../../../data/careersContent';
import { Container, Section } from './layout';
import SectionHeading from './SectionHeading';

const container = makeContainerVariants(0.08);
const item = makeItemVariants({ y: 14 });

// One continuous connector line behind step markers: horizontal across six columns on lg+, vertical down left on mobile.
export default function RecruitmentProcess() {
  return (
    <Section tone="white" labelledBy="process-title" className="border-b border-[#eae6e0]">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <SectionHeading
          id="process-title"
          label="How We Hire"
          title="Your Journey to SKM"
          text="A clear, transparent recruitment journey designed to ensure mutual alignment and a smooth onboarding experience."
        />
        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative grid grid-cols-1 lg:grid-cols-6 gap-y-10 lg:gap-y-0 list-none m-0 p-0"
        >
          <span
            aria-hidden="true"
            className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-[#e5e1d8] lg:left-[calc(100%/12)] lg:right-[calc(100%/12)] lg:top-[20px] lg:bottom-auto lg:h-[2px] lg:w-auto"
          />
          {recruitmentSteps.map((step, index) => (
            <motion.li
              key={step}
              variants={item}
              className="relative flex lg:flex-col items-center lg:text-center gap-5 lg:gap-5 group"
            >
              <span className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-brand-600 text-brand-650 font-heading font-extrabold text-[13px] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-colors duration-200">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-heading font-bold text-[16px] lg:text-[15px] text-heading leading-snug tracking-tight">
                {step}
              </span>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </Section>
  );
}

