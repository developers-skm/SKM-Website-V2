import { motion } from 'framer-motion';
import { makeContainerVariants } from '../../../utils/animationVariants';
import { careerDepartments } from '../../../data/careersContent';
import { getOpenJobs } from '../../../data/jobs';
import SectionHeading from './SectionHeading';
import CareerAreaCard from './CareerAreaCard';

const container = makeContainerVariants(0.05);

export default function CareerAreas({ activeDepartment, onSelectDepartment }) {
  const open = getOpenJobs();
  const countFor = (department) => open.filter((job) => job.department === department).length;

  return (
    <section aria-labelledby="career-areas-title" className="w-full bg-page py-[70px] lg:py-[100px] border-y border-[#eee]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading
          id="career-areas-title"
          label="Departments"
          title="Explore Career Areas"
          text="Select a department to see the current opportunities in that area."
        />
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-0 p-0"
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
      </div>
    </section>
  );
}
