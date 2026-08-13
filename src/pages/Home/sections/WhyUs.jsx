import { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import certifications from '../../../data/certifications';
import journeyStages from '../../../data/journeyStages';
import useCountUp from '../../../utils/useCountUp';
import { fadeUp, EASE_PREMIUM } from '../../../utils/motionTokens';

// Section 5 — Why SKM / Key Numbers. Editorial credibility statement, not a
// stat list: 4/8 desktop grid (compact sticky intro left, large metric rows
// right), first metric given more visual weight, "Since 2006" treated as a
// typographic milestone (never counted 0→2006), thin scroll-drawn dividers
// between rows, and a subtle opacity dim on inactive rows tied to which row
// is nearest the viewport center. Same 5 real proof reasons/numbers/labels/
// routes as before — presentation only, no content invented.
const proofs = [
  {
    number: String(journeyStages.length),
    label: 'Documented supply-chain stages',
    title: 'End-to-End Traceability',
    description: 'Complete control over the supply chain — six documented stages from feed origin to finished product.',
    page: 'journey',
    featured: true,
  },
  {
    milestone: true,
    prefix: 'Since',
    number: '2006',
    label: 'NABL-accredited laboratory',
    title: 'Certified. Controlled. Compliant.',
    description: 'ISO & BRCGS certified, HACCP-driven hazard management, verified residue control, and consistent functionality.',
    page: 'why_skm',
  },
  {
    number: String(certifications.length),
    label: 'Certification & accreditation records',
    title: 'Recognised Worldwide',
    description: 'FSSAI, BRCGS, ISO 22000, NABL, Halal, and Kosher — accreditation across regulatory, laboratory, and food-safety domains.',
    page: 'certifications',
  },
  {
    number: '2',
    label: 'Customised product solutions',
    title: 'Application & Customisation Support',
    description: 'Customized Mix · Customized Packages — formulated to the specifications a production line actually needs.',
    page: 'why_skm',
  },
  {
    number: '3',
    label: 'Regional operations',
    title: 'Global Confidence Since 1997',
    description: 'Earning the confidence of global customers since 1997, with the capacity to process 2 million eggs per day.',
    page: 'why_skm',
  },
];

function StatNumber({ value, featured }) {
  const { ref, display } = useCountUp(value, { duration: featured ? 1.4 : 1.1 });
  return (
    <strong
      ref={ref}
      className={`block font-heading font-black text-brand-600 leading-[0.85] tracking-tight tabular-nums m-0 ${
        featured
          ? 'text-[22vw] sm:text-[100px] lg:text-[128px]'
          : 'text-[16vw] sm:text-[68px] lg:text-[84px]'
      }`}
    >
      {display}
    </strong>
  );
}

function MilestoneNumber({ prefix, number }) {
  return (
    <div className="flex flex-col">
      <span className="font-body text-[13px] sm:text-[15px] font-bold uppercase tracking-[0.2em] text-surface-400 mb-1">
        {prefix}
      </span>
      <strong className="block font-heading font-black text-[16vw] sm:text-[68px] lg:text-[84px] text-brand-600 leading-[0.85] tracking-tight tabular-nums m-0">
        {number}
      </strong>
    </div>
  );
}

function ProofRow({ proof, index, onPageChange, reduceMotion, isDimmed, onFocusRow }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: reduceMotion ? 0.01 : 0.7, delay: reduceMotion ? 0 : index * 0.1, ease: EASE_PREMIUM }}
      onViewportEnter={() => onFocusRow(index)}
      className={`group grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-start transition-opacity duration-500 ${
        proof.featured ? 'py-10 lg:py-12' : 'py-8 lg:py-10'
      } ${reduceMotion ? '' : isDimmed ? 'lg:opacity-55' : 'lg:opacity-100'}`}
    >
      <div className="sm:col-span-4 flex flex-col gap-1.5">
        {proof.milestone ? (
          <MilestoneNumber prefix={proof.prefix} number={proof.number} />
        ) : (
          <StatNumber value={proof.number} featured={proof.featured} />
        )}
        <span className="font-body text-[12.5px] sm:text-[13.5px] font-semibold uppercase tracking-wide text-surface-400 mt-1">
          {proof.label}
        </span>
      </div>

      <div className={`sm:col-span-8 flex flex-col gap-2.5 ${proof.featured ? 'sm:pt-4 lg:pt-6' : 'sm:pt-2'}`}>
        <h3 className={`font-heading font-bold text-heading leading-[1.25] m-0 transition-transform duration-300 group-hover:translate-x-1 ${proof.featured ? 'text-[24px] lg:text-[30px]' : 'text-[21px] lg:text-[25px]'}`}>
          {proof.title}
        </h3>
        <p className="font-body text-[15.5px] lg:text-[17px] text-surface-600 leading-[1.7] max-w-xl m-0">
          {proof.description}
        </p>
        <InternalLink
          route={proof.page}
          onPageChange={onPageChange}
          className="group/link self-start inline-flex items-center gap-2 font-body font-semibold text-[14.5px] text-brand-600 hover:text-brand-700 mt-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
        >
          Learn More
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className={reduceMotion ? '' : 'group-hover/link:translate-x-0.5 transition-transform duration-200'} aria-hidden>
            <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
            <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
          </svg>
        </InternalLink>
      </div>

      {/* Divider — draws left to right on entry */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: reduceMotion ? 0.01 : 0.8, delay: reduceMotion ? 0 : index * 0.1 + 0.15, ease: EASE_PREMIUM }}
        className={`sm:col-span-12 h-px origin-left mt-2 transition-colors duration-300 ${
          isDimmed ? 'bg-surface-200/80' : 'bg-brand-600/40'
        }`}
      />
    </motion.div>
  );
}

export default function WhyUs({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleFocusRow = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="w-full bg-white pt-[110px] pb-[100px] lg:pt-[136px] lg:pb-[128px]">
      <div className="mx-auto max-w-[1560px] w-full px-6 sm:px-10 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* Left — compact sticky intro, ~4/12 */}
          <div className="lg:col-span-4">
            <motion.div {...fadeUp(reduceMotion)} className="lg:sticky lg:top-32 flex flex-col gap-4 max-w-sm">
              <span className="section-label">Why SKM</span>
              <h2 className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[52px] text-heading leading-[1.05] tracking-tight m-0">
                Why manufacturers choose SKM
              </h2>
              <p className="font-body text-[15.5px] lg:text-[16.5px] text-surface-500 leading-[1.7] m-0">
                Uncompromising standards in every single egg.
              </p>
              <InternalLink
                route="why_skm"
                onPageChange={onPageChange}
                className="mt-3 inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-surface-300 font-body font-semibold text-[15px] text-heading hover:border-brand-600 hover:text-brand-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 self-start"
              >
                Why Choose SKM
                <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
                  <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
                  <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
                </svg>
              </InternalLink>
            </motion.div>
          </div>

          {/* Right — large editorial metric rows, ~8/12 */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.9, ease: EASE_PREMIUM }}
              className="h-px bg-surface-200/80 origin-left"
            />
            <div className="flex flex-col">
              {proofs.map((proof, i) => (
                <ProofRow
                  key={proof.title}
                  proof={proof}
                  index={i}
                  onPageChange={onPageChange}
                  reduceMotion={reduceMotion}
                  isDimmed={activeIndex !== i}
                  onFocusRow={handleFocusRow}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
