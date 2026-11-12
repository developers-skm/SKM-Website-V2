import { motion, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import SafeImage from '../../../components/common/SafeImage';
import { fadeUp } from '../../../utils/motionTokens';
import LabImage from '../../../assets/4. QUALITY/Food Safety and Quality Policy/LCMS - web.webp';

// Section 6 - Quality & Certifications. Composition: large dominant lab
// photograph (7/12 columns) beside heading/copy (5/12), image mask-reveals
// first, heading/paragraph follow after - then the "View All Certifications"
// CTA. (The certification-logo row was removed per direct request.)
export default function QualityCertificationProof({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">

        <motion.div {...fadeUp(reduceMotion)} className="flex flex-col gap-4 mb-8 lg:mb-10">
          <span className="section-label">Quality &amp; Certifications</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Quality, Verified at Every Step.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-stretch">

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative rounded-[8px] overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[430px]"
          >
            <SafeImage
              src={LabImage}
              alt="SKM in-house quality testing laboratory"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          <motion.div {...fadeUp(reduceMotion, { delay: 0.3 })} className="lg:col-span-5 flex flex-col justify-center gap-3 lg:gap-5">
            <p className="font-body text-[15px] lg:text-[16.5px] text-surface-600 leading-[1.65] lg:leading-[1.7] max-w-xl m-0">
              Every production batch is governed by a documented Food Safety and Quality Policy, supported by HACCP-based hazard identification and control, verified residue testing, stringent quality assurance procedures and internationally aligned food safety management systems. These comprehensive measures are implemented throughout the production process, from raw material intake and processing to final product testing and release, ensuring consistent product quality, safety and compliance with established standards.
            </p>
            <InternalLink
              route="quality_food_safety_traceability"
              onPageChange={onPageChange}
              className="group self-start inline-flex items-center gap-2 font-body font-semibold text-[15px] text-brand-600 hover:text-brand-700 mt-1 lg:mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
            >
              Explore Quality Assurance
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className={reduceMotion ? '' : 'group-hover:translate-x-0.5 transition-transform duration-[250ms]'} aria-hidden>
                <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
                <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
              </svg>
            </InternalLink>
            <InternalLink
              route="certifications"
              onPageChange={onPageChange}
              className="self-start inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 mt-2 lg:mt-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[15px] transition-colors duration-[250ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
              View All Certifications
            </InternalLink>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
