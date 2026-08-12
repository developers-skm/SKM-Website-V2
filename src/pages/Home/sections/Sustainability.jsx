import { motion, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import SafeImage from '../../../components/common/SafeImage';
import { fadeUp } from '../../../utils/motionTokens';

import Biogas from '../../../assets/5. INFRASTRUCTURE/Egg Products/Utility/Biogas.webp';
import ETP from '../../../assets/5. INFRASTRUCTURE/Egg Products/Utility/ETP.webp';
import UtilityOverview from '../../../assets/5. INFRASTRUCTURE/Egg Products/Utility/Utility Overview.webp';

// Section 10 — Sustainability. New homepage section built from real content
// on src/pages/CSR/SustainabilityPage.jsx (the "Pillars of Sustainability"
// — Carbon Footprint, Wind Energy Generation, Community Welfare — plus the
// 3.5M units/year wind energy figure) — that page has no photography of its
// own, so real plant utility/environmental imagery (biogas facility,
// effluent treatment, utility overview — the site's actual sustainability-
// adjacent infrastructure, also used on the Egg Processing Plant page) is
// used here rather than generic stock. Oversized 01/02/03 editorial anchors,
// asymmetric per-story layout, no green-tech card grid.
const stories = [
  {
    number: '01',
    eyebrow: 'Carbon Footprint',
    title: 'Lowest possible carbon footprint.',
    body: 'Kept at the lowest possible level thanks to the strategic location of the plant, efficient recycling of waste, and energy-efficient processes throughout our operations.',
    image: ETP,
    imageAlt: 'Effluent treatment plant at SKM Egg Products',
  },
  {
    number: '02',
    eyebrow: 'Clean Energy',
    title: '3.5 million units of wind energy, every year.',
    body: 'Our contribution to a clean environment is the installation of a wind mill that generates electricity of 3.5 million units per year — powering our operations with renewable energy.',
    image: Biogas,
    imageAlt: 'Biogas facility at SKM Egg Products',
  },
  {
    number: '03',
    eyebrow: 'Community Welfare',
    title: 'Free healthcare, education, and food for an entire village.',
    body: 'We ensure our corporate social responsibility by providing free medical, educational, and food services to an entire village through the SKM Charitable Trust.',
    image: UtilityOverview,
    imageAlt: 'SKM Egg Products utility infrastructure',
  },
];

function Story({ story, index, reduceMotion }) {
  const isEven = index % 2 === 0;
  const fromX = reduceMotion ? 0 : isEven ? -24 : 24;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-16 lg:py-20 ${index !== 0 ? 'border-t border-surface-200/70 dark:border-surface-800' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: fromX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`relative rounded-[8px] overflow-hidden aspect-[4/3] lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <SafeImage src={story.image} alt={story.imageAlt} loading="lazy" className="w-full h-full object-cover" />
      </motion.div>

      <div className={`relative lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <motion.span
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="block font-heading font-black text-[90px] sm:text-[110px] lg:text-[130px] text-brand-600/[0.07] dark:text-brand-400/[0.08] leading-[0.75] select-none -mb-6"
          aria-hidden
        >
          {story.number}
        </motion.span>
        <motion.div {...fadeUp(reduceMotion, { delay: 0.1 })} className="flex flex-col gap-4">
          <span className="font-body text-[12.5px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {story.eyebrow}
          </span>
          <h3 className="font-heading font-bold text-[28px] sm:text-[34px] lg:text-[38px] text-heading dark:text-white leading-[1.15] tracking-tight m-0 max-w-md">
            {story.title}
          </h3>
          <p className="font-body text-[15.5px] lg:text-[16.5px] text-surface-500 dark:text-surface-400 leading-[1.8] max-w-md m-0">
            {story.body}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function Sustainability({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-white dark:bg-surface-950 py-20 lg:py-28">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">

        <motion.div {...fadeUp(reduceMotion)} className="flex flex-col gap-4 max-w-2xl mb-4">
          <span className="section-label">Sustainability</span>
          <h2 className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[52px] text-heading dark:text-white leading-[1.05] tracking-tight m-0">
            Sustainable &amp; socially responsible.
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {stories.map((story, i) => (
            <Story key={story.eyebrow} story={story} index={i} reduceMotion={reduceMotion} />
          ))}
        </div>

        <motion.div {...fadeUp(reduceMotion, { delay: 0.1 })} className="pt-10 lg:pt-12 border-t border-surface-200/70 dark:border-surface-800">
          <InternalLink
            route="csr_sustainability"
            onPageChange={onPageChange}
            className="group inline-flex items-center gap-2 font-body font-semibold text-[15px] text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
          >
            Explore Our CSR &amp; Sustainability Programs
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className={reduceMotion ? '' : 'group-hover:translate-x-0.5 transition-transform duration-[250ms]'} aria-hidden>
              <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
              <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
            </svg>
          </InternalLink>
        </motion.div>

      </div>
    </div>
  );
}
