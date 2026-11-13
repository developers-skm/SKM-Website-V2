import { useState } from 'react';
import { motion } from 'framer-motion';
import { makeContainerVariants } from '../../../utils/animationVariants';
import { careerDepartments } from '../../../data/careersContent';
import { getOpenJobs, useJobs } from '../../../data/jobs';
import { Container, Section } from './layout';
import SectionHeading from './SectionHeading';
import CareerAreaCard from './CareerAreaCard';
import CareerAreaModal from './CareerAreaModal';

const container = makeContainerVariants(0.04);

export default function CareerAreas({ onPageChange }) {
  useJobs();
  const [selected, setSelected] = useState(null);
  const open = getOpenJobs();
  const countFor = (department) => open.filter((job) => job.department === department).length;

  return (
    <Section tone="white" labelledBy="career-areas-title">
      <Container className="flex flex-col gap-10 lg:gap-14">
        <SectionHeading
          id="career-areas-title"
          label="Departments"
          title="Explore Career Areas"
          text="Discover opportunities across the teams that power SKM."
        />
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4.5 sm:gap-5 m-0 p-0"
        >
          {careerDepartments.map((department) => (
            <CareerAreaCard
              key={department}
              department={department}
              openCount={countFor(department)}
              onSelect={setSelected}
            />
          ))}
        </motion.ul>
      </Container>
      {selected && (
        <CareerAreaModal
          department={selected}
          jobs={open.filter((job) => job.department === selected)}
          onClose={() => setSelected(null)}
          onPageChange={onPageChange}
        />
      )}
    </Section>
  );
}

