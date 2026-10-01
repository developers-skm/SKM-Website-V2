import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import InternalLink from '../../../components/common/InternalLink';
import CampusImg from '../../../assets/6. CONTACT US/20240719_SKM_EGG PRODUCTS_197_SHA05676.webp';
import CareerIcon from './careerIcons';

export default function CareersHero({ onViewPositions, onPageChange }) {
  const container = makeContainerVariants(0.12, { delayChildren: 0.05 });
  const item = makeItemVariants({ y: 24, stiffness: 70 });

  return (
    <section aria-labelledby="careers-hero-title" className="relative w-full bg-page overflow-hidden border-b border-[#eee]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_-10%,var(--color-brand-50)_0%,transparent_50%)] pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-[110px] pb-[70px] sm:pt-[130px] sm:pb-[90px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div variants={container} initial="hidden" animate="visible" className="lg:col-span-7 flex flex-col items-start gap-6">
          <motion.span variants={item} className="section-label">Careers at SKM</motion.span>
          <motion.h1
            variants={item}
            id="careers-hero-title"
            className="font-heading font-bold text-[40px] sm:text-[52px] lg:text-[64px] text-heading leading-[1.08] tracking-tight m-0"
          >
            Build Your Future With SKM
          </motion.h1>
          <motion.div variants={item} className="w-16 h-[3px] bg-brand-600 rounded-full" />
          <motion.p variants={item} className="font-body text-[16px] sm:text-[18px] text-surface-500 max-w-xl leading-[30px] m-0">
            Join a team driven by quality, innovation and continuous growth. Explore opportunities across SKM Egg Products and build a career that makes an impact.
          </motion.p>
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
            <button type="button" onClick={onViewPositions} className="btn-primary-red min-h-[46px] justify-center">
              View Open Positions
              <CareerIcon name="arrow" className="w-3.5 h-3.5" />
            </button>
            <InternalLink route="careers/apply" onPageChange={onPageChange} className="btn-outline-red min-h-[46px] justify-center">
              Join Our Talent Pool
            </InternalLink>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-5"
        >
          <div className="relative rounded-[10px] overflow-hidden border border-[#eee] shadow-[5px_3px_40px_rgba(0,72,88,0.10)] aspect-[4/3] lg:aspect-[4/5]">
            <img
              src={CampusImg}
              alt="SKM Egg Products corporate administration block in Erode, Tamil Nadu"
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute bottom-0 left-0 h-1.5 w-24 bg-brand-600" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
