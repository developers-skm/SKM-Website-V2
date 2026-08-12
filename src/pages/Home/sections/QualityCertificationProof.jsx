import { motion, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import SafeImage from '../../../components/common/SafeImage';
import { fadeUp } from '../../../utils/motionTokens';
import LabImage from '../../../assets/4. QUALITY/Food Safety and Quality Policy/LCMS.webp';

// Section 6 — Quality & Certifications. Composition: large dominant lab
// photograph (7/12 columns) beside heading/copy (5/12), image mask-reveals
// first, heading/paragraph follow after — then the "View All Certifications"
// CTA. (The certification-logo row was removed per direct request.)
export default function QualityCertificationProof({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-white dark:bg-surface-950 pt-[100px] pb-[96px] lg:pt-[128px] lg:pb-[120px]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative rounded-[8px] overflow-hidden aspect-[4/3] lg:aspect-[16/12]"
          >
            <SafeImage
              src={LabImage}
              alt="SKM in-house quality testing laboratory"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div {...fadeUp(reduceMotion, { delay: 0.3 })} className="lg:col-span-5 flex flex-col gap-6">
            <span className="section-label">Quality &amp; Certifications</span>
            <h2 className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[50px] text-heading dark:text-white leading-[1.05] tracking-tight m-0">
              Precision, verified at every step.
            </h2>
            <p className="font-body text-[16px] lg:text-[18px] text-surface-600 dark:text-surface-400 leading-[1.75] max-w-lg m-0">
              Every batch is governed by a documented Food Safety &amp; Quality Policy — HACCP-based hazard control, verified residue testing, and internationally aligned management systems, from raw material intake to finished product release.
            </p>
            <InternalLink
              route="quality_assurance"
              onPageChange={onPageChange}
              className="group self-start inline-flex items-center gap-2 font-body font-semibold text-[15px] text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
            >
              Explore Quality Assurance
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className={reduceMotion ? '' : 'group-hover:translate-x-0.5 transition-transform duration-[250ms]'} aria-hidden>
                <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
                <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
              </svg>
            </InternalLink>
          </motion.div>
        </div>

        <motion.div {...fadeUp(reduceMotion)} className="flex flex-wrap items-center gap-4 pt-10 lg:pt-12 border-t border-surface-200/70 dark:border-surface-800">
          <InternalLink
            route="certifications"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[15px] transition-colors duration-[250ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            View All Certifications
          </InternalLink>
        </motion.div>

      </div>
    </div>
  );
}
