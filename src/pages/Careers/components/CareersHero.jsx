import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import InternalLink from '../../../components/common/InternalLink';
import { Container } from './layout';
import CareerIcon from './careerIcons';

const container = makeContainerVariants(0.1, { delayChildren: 0.05 });
const item = makeItemVariants({ y: 20, stiffness: 80 });

export default function CareersHero({ onViewPositions, onPageChange }) {
  return (
    <section aria-labelledby="careers-hero-title" className="relative w-full bg-[#fbfaf8] overflow-hidden border-b border-[#eee]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_0%,var(--color-brand-50)_0%,transparent_55%)] pointer-events-none" aria-hidden="true" />
      <Container className="relative pt-[104px] pb-12 sm:pt-[128px] sm:pb-16 lg:pt-[140px] lg:pb-20 grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-14 items-center">
        <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col items-start gap-5 sm:gap-6">
          <motion.span variants={item} className="section-label !mb-0">Careers at SKM</motion.span>
          <motion.h1
            variants={item}
            id="careers-hero-title"
            className="font-heading font-bold text-[38px] sm:text-[48px] lg:text-[60px] text-heading leading-[1.08] tracking-tight m-0 max-w-[16ch]"
          >
            Build a Career That Makes an Impact.
          </motion.h1>
          <motion.p variants={item} className="font-body text-[17px] sm:text-[18px] text-surface-500 max-w-[560px] leading-[1.7] m-0">
            Join a team driven by quality, innovation and continuous growth. Explore opportunities across SKM Egg Products and build a career that creates meaningful impact.
          </motion.p>
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mt-2">
            <button type="button" onClick={onViewPositions} className="btn-primary-red min-h-[48px] justify-center">
              Explore Open Positions
              <CareerIcon name="arrow" className="w-3.5 h-3.5" />
            </button>
            <InternalLink route="careers/apply" onPageChange={onPageChange} className="btn-outline-red min-h-[48px] justify-center">
              Join Our Talent Pool
            </InternalLink>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden border border-[#e8e4dd] aspect-[4/3] lg:aspect-[4/4.4]">
            <img
              src="/images/manufacturing/01-egg-intake.webp"
              alt="Egg inspection and conveying line inside the SKM Egg Products processing plant"
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          </div>
          <p className="absolute left-3 bottom-3 sm:left-5 sm:bottom-5 max-w-[240px] m-0 rounded-xl bg-white/95 border border-[#eee] px-4 py-3 font-body text-[13px] sm:text-[14px] font-semibold text-heading leading-snug border-l-[3px] border-l-brand-600">
            Opportunities across multiple business functions
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
