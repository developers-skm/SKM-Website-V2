import { motion } from 'framer-motion';
import { makeContainerVariants } from '../../../utils/animationVariants';
import { careerDepartments } from '../../../data/careersContent';
import { getOpenJobs } from '../../../data/jobs';
import { Container, Section } from './layout';
import SectionHeading from './SectionHeading';
import CareerAreaCard from './CareerAreaCard';

const container = makeContainerVariants(0.04);

export default function CareerAreas({ activeDepartment, onSelectDepartment }) {
  const open = getOpenJobs();
  const countFor = (department) => open.filter((job) => job.department === department).length;

  return (
    <Section tone="page" labelledBy="career-areas-title" className="border-y border-[#eee]">
      <Container className="flex flex-col gap-10 lg:gap-12">
        <SectionHeading
          id="career-areas-title"
          label="Departments"
          title="Explore Career Areas"
          text="Choose a department to see the roles open in that area."
        />
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 m-0 p-0"
        >
          {careerDepartments.map((department) => (
            <CareerAreaCard
              key={department}
              department={department}
              openCount={countFor(department)}
              active={activeDepartment === department}
              onSelect={onSelectDepartment}
            />
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
