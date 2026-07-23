import { motion, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import certifications from '../../../data/certifications';
import journeyStages from '../../../data/journeyStages';

// Section 4 — Why manufacturers choose SKM. Exactly 5 proof reasons, in the
// required order. All 3 original approved pillars are preserved verbatim
// (title, description, destination route); the other 2 themes use direct,
// reliable counts of existing repository data — never fabricated numbers.
//
//   1. Integrated supply chain   = original "End-to-End Traceability" pillar
//                                  + 6 = journeyStages.length
//   2. Product consistency       = original "Certified. Controlled. Compliant."
//                                  pillar + the NABL lab's "Since 2006"
//                                  accreditation date (journeyStages[4].stat
//                                  — a quality/lab metric, not a capacity figure)
//   3. International certifications = count = certifications.length, labelled
//                                  "Certification and accreditation records"
//                                  rather than "International Certifications"
//                                  because the dataset mixes domestic bodies
//                                  (FSSAI, Export Inspection Council, Eat
//                                  Right Campus) with lab accreditation
//                                  (ISO/IEC 17025, NABL) and religious
//                                  certifications (Halal, Kosher) — not every
//                                  record is genuinely an international
//                                  certification, so the number's label
//                                  describes the data honestly.
//   4. Application and customisation support = count of the 2 real
//                                  Customized* products — a product count,
//                                  not a service-capability claim.
//   5. Export and logistics experience = original "Global Confidence Since
//                                  1997" pillar + 3 real regional branch
//                                  offices (SKM Japan/Europe/Russia) — not a
//                                  repeat of "30+ Countries Served", which
//                                  already appears in the adjacent TrustBar
//                                  statistics section.
const primaryProofs = [
  {
    theme: 'Integrated supply chain',
    number: String(journeyStages.length),
    unit: 'Documented stages',
    title: 'End-to-End Traceability',
    description: 'Complete control over the supply chain — six documented stages from feed origin to finished product.',
    page: 'journey',
  },
  {
    theme: '',
    number: 'Since 2006',
    unit: 'NABL-accredited laboratory',
    title: 'Certified. Controlled. Compliant.',
    description: 'ISO & BRCGS certified, HACCP-driven hazard management, verified residue control, and consistent functionality.',
    page: 'why_skm',
  },
];

const supportingProofs = [
  {
    theme: 'International certifications',
    number: String(certifications.length),
    unit: 'Certification and accreditation records',
    logosCaption: 'Certified & Accredited By',
    page: 'certifications',
    linkLabel: 'View Certifications',
    showLogos: true,
  },
  {
    theme: 'Application and customisation support',
    number: '2',
    unit: 'Customised product solutions',
    description: 'Customized Mix · Customized Packages',
    page: 'why_skm',
  },
  {
    theme: 'Export and logistics experience',
    number: '3',
    unit: 'Regional operations',
    title: 'Global Confidence Since 1997',
    description: 'Earning the confidence of global customers since 1997, with the capacity to process 2 million eggs per day.',
    page: 'why_skm',
  },
];

export default function WhyUs({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  const fadeProps = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : delay, ease: [0.25, 1, 0.5, 1] },
  });

  return (
    <div className="w-full bg-white dark:bg-surface-950 pt-[96px] pb-[80px] lg:pt-[104px] lg:pb-[88px] border-b border-[#eee] dark:border-surface-800/40">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">

        {/* Full-width heading area — main heading is the new approved
            section title; the previously-approved sentence is preserved
            verbatim as supporting content beneath it, not deleted. */}
        <motion.div {...fadeProps()} className="max-w-3xl mb-9 lg:mb-11">
          <h2 className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[48px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Why manufacturers choose SKM
          </h2>
          <p className="font-body text-[17px] lg:text-[19px] text-surface-500 dark:text-surface-400 m-0 mt-4">
            Uncompromising Standards In Every Single Egg
          </p>
        </motion.div>

        {/* Row 1 — 2 larger primary proofs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 mb-6 lg:mb-7">
          {primaryProofs.map((proof, i) => (
            <motion.article
              key={proof.theme}
              {...fadeProps(i * 0.1)}
              className="lg:col-span-6 flex flex-col gap-4 bg-[#fdfbf7] dark:bg-surface-900 border border-surface-200/70 dark:border-surface-800 rounded-[22px] p-7 lg:p-8"
            >
              <p className="font-body text-[13px] lg:text-[14px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500 m-0">
                {proof.theme}
              </p>

              <div className="flex items-baseline gap-3">
                <strong className="font-heading font-black text-[48px] lg:text-[58px] text-brand-600 dark:text-brand-400 leading-none tabular-nums">
                  {proof.number}
                </strong>
                <span className="font-body text-[15px] lg:text-[17px] font-semibold text-surface-700 dark:text-surface-300">
                  {proof.unit}
                </span>
              </div>

              <h3 className="font-heading font-bold text-[22px] lg:text-[25px] text-heading dark:text-white leading-[1.3] m-0">
                {proof.title}
              </h3>
              <p className="font-body text-[16px] lg:text-[18px] text-surface-600 dark:text-surface-400 leading-[1.6] m-0">
                {proof.description}
              </p>

              <InternalLink
                route={proof.page}
                onPageChange={onPageChange}
                className="group self-start inline-flex items-center gap-2 font-body font-semibold text-[15px] lg:text-[16px] text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 mt-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
              >
                Learn More
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className={reduceMotion ? '' : 'group-hover:translate-x-0.5 transition-transform duration-200'} aria-hidden>
                  <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
                  <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
                </svg>
              </InternalLink>
            </motion.article>
          ))}
        </div>

        {/* Row 2 — 3 supporting proofs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-7">
          {supportingProofs.map((proof, i) => (
            <motion.article
              key={proof.theme}
              {...fadeProps(i * 0.1)}
              className="lg:col-span-4 flex flex-col gap-3.5 border border-surface-200/70 dark:border-surface-800 rounded-[18px] p-6 lg:p-7"
            >
              <p className="font-body text-[13px] lg:text-[14px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500 m-0">
                {proof.theme}
              </p>

              <div className="flex items-baseline gap-2.5">
                <strong className="font-heading font-black text-[34px] lg:text-[40px] text-brand-600 dark:text-brand-400 leading-none tabular-nums">
                  {proof.number}
                </strong>
                <span className="font-body text-[15px] lg:text-[16px] font-semibold text-surface-700 dark:text-surface-300">
                  {proof.unit}
                </span>
              </div>

              {proof.title && (
                <h3 className="font-heading font-bold text-[19px] lg:text-[21px] text-heading dark:text-white leading-[1.3] m-0">
                  {proof.title}
                </h3>
              )}
              {proof.description && (
                <p className="font-body text-[16px] text-surface-600 dark:text-surface-400 leading-[1.6] m-0">
                  {proof.description}
                </p>
              )}

              {proof.showLogos && (
                <div className="flex flex-col gap-3 mt-1">
                  <span className="font-body text-[13px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500">
                    {proof.logosCaption}
                  </span>
                  <div className="flex flex-wrap items-center gap-6">
                    {certifications.map((cert) => (
                      <img
                        key={cert.name}
                        src={cert.logo}
                        alt={cert.name}
                        title={cert.name}
                        loading="lazy"
                        className="h-12 lg:h-14 w-auto object-contain flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>
              )}

              {proof.linkLabel && (
                <InternalLink
                  route={proof.page}
                  onPageChange={onPageChange}
                  className="group self-start inline-flex items-center gap-2 font-body font-semibold text-[15px] text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 mt-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
                >
                  {proof.linkLabel}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className={reduceMotion ? '' : 'group-hover:translate-x-0.5 transition-transform duration-200'} aria-hidden>
                    <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
                    <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
                  </svg>
                </InternalLink>
              )}
            </motion.article>
          ))}
        </div>

        {/* Section-level CTA — secondary to the proof content, min 44px */}
        <motion.div {...fadeProps(0.2)} className="mt-8 lg:mt-9">
          <InternalLink
            route="why_skm"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-surface-300 dark:border-surface-700 font-body font-semibold text-[15px] text-heading dark:text-white hover:border-brand-600 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Why Choose SKM
            <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
              <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
              <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
            </svg>
          </InternalLink>
        </motion.div>

      </div>
    </div>
  );
}
