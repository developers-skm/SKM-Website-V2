import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import { Container } from './layout';
import CareerIcon from './careerIcons';

const container = makeContainerVariants(0.1, { delayChildren: 0.05 });
const item = makeItemVariants({ y: 20, stiffness: 80 });

export default function CareersHero({ onViewPositions }) {
  return (
    <section aria-labelledby="careers-hero-title" className="relative w-full bg-[#fbfaf8] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,var(--color-brand-50)_0%,transparent_50%)] pointer-events-none" aria-hidden="true" />
      <Container className="relative pt-[108px] pb-14 sm:pt-[132px] sm:pb-20 lg:pt-[140px] lg:pb-24 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center lg:min-h-[720px]">
        <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col items-start gap-5 sm:gap-6">
          <motion.div variants={item} className="inline-flex items-center gap-2.5 rounded-full bg-white border border-[#ece7de] px-4 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
            <span className="font-heading text-[12px] font-bold uppercase tracking-[0.16em] text-brand-650">
              Careers at SKM
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            id="careers-hero-title"
            className="font-heading font-bold text-[40px] sm:text-[52px] lg:text-[64px] text-heading leading-[1.04] tracking-tight m-0 max-w-[14ch]"
          >
            Build a Career That Makes an <span className="text-brand-650">Impact.</span>
          </motion.h1>

          <motion.p variants={item} className="font-body text-[17px] sm:text-[18px] text-surface-600 max-w-[540px] leading-[1.7] m-0">
            Join a team driven by quality, innovation and continuous improvement. Explore opportunities across SKM and build a career where your work contributes to real manufacturing excellence.
          </motion.p>

          <motion.div variants={item} className="mt-2">
            <button
              type="button"
              onClick={onViewPositions}
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-brand-600 hover:bg-brand-650 text-white font-body font-bold text-[15px] tracking-wide px-8 py-4 shadow-[0_10px_26px_rgba(228,10,24,0.24)] hover:shadow-[0_14px_32px_rgba(228,10,24,0.32)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Explore Open Positions
              <CareerIcon name="arrow" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
          className="relative w-full max-w-[460px] sm:max-w-[520px] mx-auto lg:max-w-none lg:ml-auto lg:mr-0"
        >
          {/* Offset accent frame */}
          <span aria-hidden="true" className="absolute -right-3 -bottom-3 sm:-right-4 sm:-bottom-4 w-full h-full rounded-3xl border-2 border-brand-600/30" />

          {/* The source photo has a blank band on its left (~27%), so it is
              pinned right and cropped by this portrait frame. */}
          <div className="relative rounded-3xl overflow-hidden aspect-[7/10] shadow-[0_20px_48px_rgba(0,0,0,0.12)] bg-surface-100">
            <img
              src="/images/careers/careers-hero.webp"
              alt="SKM manufacturing professionals collaborating inside modern food processing plant"
              className="absolute inset-0 w-full h-full object-cover object-[100%_70%]"
              fetchPriority="high"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" aria-hidden="true" />
          </div>

          <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 rounded-xl bg-white/95 backdrop-blur-sm border border-[#e5e5e5] px-4 py-3 font-body text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-wider text-heading flex items-center gap-2.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-brand-600 flex-shrink-0" aria-hidden="true" />
            <span>Manufacturing • Quality • Innovation</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
