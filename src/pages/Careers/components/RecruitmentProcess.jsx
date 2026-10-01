import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import { recruitmentSteps } from '../../../data/careersContent';
import SectionHeading from './SectionHeading';

const container = makeContainerVariants(0.07);
const item = makeItemVariants({ y: 20 });

// Vertical timeline on mobile, horizontal 7-column track from lg up.
export default function RecruitmentProcess() {
  return (
    <section aria-labelledby="process-title" className="w-full bg-white py-[70px] lg:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col gap-14">
        <SectionHeading id="process-title" label="How We Hire" title="Our Recruitment Process" />
        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative grid grid-cols-1 lg:grid-cols-7 gap-0 lg:gap-4 list-none m-0 p-0"
        >
          {recruitmentSteps.map((step, index) => {
            const isLast = index === recruitmentSteps.length - 1;
            return (
              <motion.li key={step} variants={item} className="relative flex lg:flex-col items-start gap-4 lg:gap-5 pb-8 lg:pb-0">
                {/* connector: vertical on mobile, horizontal on desktop */}
                {!isLast && (
                  <>
                    <span aria-hidden="true" className="lg:hidden absolute left-[21px] top-11 bottom-0 w-px bg-surface-200" />
                    <span aria-hidden="true" className="hidden lg:block absolute top-[21px] left-11 right-[-1rem] h-px bg-surface-200" />
                  </>
                )}
                <span className="relative z-10 w-[44px] h-[44px] rounded-full bg-white border-2 border-brand-600 text-brand-650 font-heading font-bold text-[14px] flex items-center justify-center flex-shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-heading font-bold text-[16px] text-heading leading-snug pt-2.5 lg:pt-0">{step}</span>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
