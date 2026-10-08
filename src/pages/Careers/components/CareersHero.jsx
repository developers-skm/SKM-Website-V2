import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import { Container } from './layout';
import CareerIcon from './careerIcons';

const container = makeContainerVariants(0.1, { delayChildren: 0.05 });
const item = makeItemVariants({ y: 20, stiffness: 80 });

export default function CareersHero({ onViewPositions }) {
  return (
    <section aria-labelledby="careers-hero-title" className="relative w-full bg-[#fbfaf8] overflow-hidden border-b border-[#eae6e0]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,var(--color-brand-50)_0%,transparent_50%)] pointer-events-none" aria-hidden="true" />
      <Container className="relative pt-[108px] pb-14 sm:pt-[132px] sm:pb-20 lg:pt-[148px] lg:pb-24 grid grid-cols-1 lg:grid-cols-[50fr_50fr] gap-10 lg:gap-14 items-center min-h-[680px] lg:min-h-[720px]">
        <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col items-start gap-5 sm:gap-6">
          <motion.div variants={item} className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" aria-hidden="true" />
            <span className="font-heading text-[13px] font-bold uppercase tracking-[0.16em] text-brand-650">
              CAREERS AT SKM
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            id="careers-hero-title"
            className="font-heading font-bold text-[38px] sm:text-[48px] lg:text-[62px] text-heading leading-[1.05] tracking-tight m-0 max-w-[16ch]"
          >
            Build a Career That Makes an Impact.
          </motion.h1>

          <motion.p variants={item} className="font-body text-[17px] sm:text-[18px] text-surface-600 max-w-[560px] leading-[1.7] m-0">
            Join a team driven by quality, innovation and continuous improvement. Explore opportunities across SKM and build a career where your work contributes to real manufacturing excellence.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto mt-2">
            <button type="button" onClick={onViewPositions} className="btn-primary-red min-h-[50px] px-7 justify-center text-[15px]">
              Explore Open Positions
              <CareerIcon name="arrow" className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
          className="relative w-full"
        >
          <div className="rounded-2xl overflow-hidden border border-[#e2ded6] aspect-[16/10] sm:aspect-[4/3] shadow-[0_12px_36px_rgba(0,0,0,0.06)] bg-surface-100">
            <img
              src="/images/careers/careers-hero.webp"
              alt="SKM manufacturing professionals collaborating inside modern food processing plant"
              className="w-full h-full object-cover object-center"
              fetchPriority="high"
            />
          </div>

          <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 max-w-[280px] rounded-xl bg-white/95 backdrop-blur-sm border border-[#e5e5e5] px-4 py-3 font-body text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-heading flex items-center gap-2.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-brand-600 flex-shrink-0" />
            <span>MANUFACTURING • QUALITY • INNOVATION</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

