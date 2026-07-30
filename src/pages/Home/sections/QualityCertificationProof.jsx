import { motion, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';

// Certificate images — reused directly from the real Quality/Certifications
// page dataset (src/pages/Quality/sections/Certifications.jsx), which has
// exact per-certification explanations that src/data/certifications.js
// (logo + name only) doesn't. Not duplicated as new content — same images,
// same exact description strings, copied here because that page's local
// `certificates` array isn't exported for reuse.
import BRC from '../../../assets/4. QUALITY/Certificates/BRC FOOD_524x600px.png';
import EIC from '../../../assets/4. QUALITY/Certificates/EIC_524x600px.png';
import ERC from '../../../assets/4. QUALITY/Certificates/ERC_524x600px.png';
import FSSAI from '../../../assets/4. QUALITY/Certificates/FSSAI_524x600px.png';
import HALAL from '../../../assets/4. QUALITY/Certificates/HALAL_524x600px.png';
import ISO22000 from '../../../assets/4. QUALITY/Certificates/ISO 22000_524x600px.png';
import KOSHER from '../../../assets/4. QUALITY/Certificates/KOSHER_524x600px.png';
import NABL from '../../../assets/4. QUALITY/Certificates/NABL 17025_524x600px.png';

// All 8 real certifications — exact names/descriptions verbatim from
// Quality/sections/Certifications.jsx.
const allCertificates = [
  { id: 'fssai', name: 'FSSAI', image: FSSAI, description: 'Food Safety and Standards Authority of India certification ensuring compliance with Indian food safety laws and hygiene standards.' },
  { id: 'eic', name: 'EIC', image: EIC, description: 'Export Inspection Council certification confirming compliance with Indian export standards and international food safety requirements for egg products.' },
  { id: 'erc', name: 'ERC', image: ERC, description: 'European Registration Compliance – confirming our establishment meets European Union norms for egg processing and export.' },
  { id: 'brc', name: 'BRC Food', image: BRC, description: 'BRC Global Standard for Food Safety – ensuring highest food safety and quality management practices globally recognized by retailers and manufacturers.' },
  { id: 'iso22000', name: 'ISO 22000', image: ISO22000, description: 'ISO 22000 Food Safety Management System certification – internationally recognized standard for food safety management across the entire food supply chain.' },
  { id: 'nabl', name: 'NABL ISO/IEC 17025', image: NABL, description: "National Accreditation Board for Testing and Calibration Laboratories accreditation per ISO/IEC 17025 – confirming our laboratory's technical competence and testing accuracy since 2006." },
  { id: 'halal', name: 'HALAL', image: HALAL, description: 'Halal certification confirming our products meet strict Islamic dietary laws and hygiene requirements, enabling access to global Halal markets.' },
  { id: 'kosher', name: 'KOSHER', image: KOSHER, description: 'Kosher certification ensuring our egg products meet Jewish dietary laws, enabling export to global Kosher-certified markets and distributors.' },
];

// Regulatory approvals — records that genuinely represent a food/export
// authority approval (FSSAI, EIC, ERC). Not laboratory accreditation, not
// a food-safety management system, not a religious certification.
const regulatoryApprovalIds = ['fssai', 'eic', 'erc'];

// Laboratory accreditation — NABL / ISO/IEC 17025 only.
const labAccreditationIds = ['nabl'];

// Food-safety systems — BRC Food, ISO 22000 (management-system standards,
// not single-authority approvals or lab accreditation).
const foodSafetySystemIds = ['brc', 'iso22000'];

function byIds(ids) {
  return allCertificates.filter((c) => ids.includes(c.id));
}

function ProofPanel({ title, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-4 bg-[#fdfbf7] dark:bg-surface-900 border border-surface-200/70 dark:border-surface-800 rounded-[22px] p-7 lg:p-8 transition-all duration-300 hover:border-brand-600/25 hover:shadow-[0_10px_26px_rgba(36,30,24,0.08)] ${className}`}>
      <h3 className="font-heading font-bold text-[21px] lg:text-[23px] text-heading dark:text-white leading-[1.2] m-0">
        {title}
      </h3>
      {children}
    </div>
  );
}

function CertList({ items }) {
  return (
    <ul className="flex flex-col gap-4 list-none m-0 p-0">
      {items.map((cert) => (
        <li key={cert.id} className="group flex items-start gap-4">
          <img
            src={cert.image}
            alt={cert.name}
            loading="lazy"
            className="w-12 h-12 object-contain flex-shrink-0 rounded-md border border-surface-200/70 dark:border-surface-800 bg-white p-1 transition-all duration-300 group-hover:border-[#e8b64a]/60 group-hover:-translate-y-0.5"
          />
          <div className="flex flex-col gap-1">
            <span className="font-body font-semibold text-[15px] lg:text-[16px] text-heading dark:text-white">
              {cert.name}
            </span>
            <span className="font-body text-[14px] lg:text-[15px] text-surface-500 dark:text-surface-400 leading-[1.5]">
              {cert.description}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function QualityCertificationProof({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  const fadeProps = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : delay, ease: [0.25, 1, 0.5, 1] },
  });

  return (
    <div className="w-full bg-white dark:bg-surface-950 pt-[92px] pb-[80px] lg:pt-[100px] lg:pb-[88px]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">

        <motion.div {...fadeProps()} className="max-w-3xl mb-9 lg:mb-11">
          <h2 className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[48px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Quality and certification proof
          </h2>
          {/* Existing approved supporting statement, preserved verbatim
              (src/pages/Quality/sections/FoodSafetyPolicy.jsx heading pair). */}
          <p className="font-body text-[17px] lg:text-[19px] text-surface-500 dark:text-surface-400 m-0 mt-4">
            Food Safety & Quality Policy
          </p>
        </motion.div>

        {/* Proof grid — Regulatory approvals / Laboratory accreditation /
            Food-safety systems, then a full-width certification + traceability row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 mb-6 lg:mb-7">
          <motion.div {...fadeProps(0)}>
            <ProofPanel title="Regulatory approvals">
              <CertList items={byIds(regulatoryApprovalIds)} />
            </ProofPanel>
          </motion.div>

          <motion.div {...fadeProps(0.1)}>
            <ProofPanel title="Laboratory accreditation">
              <CertList items={byIds(labAccreditationIds)} />
            </ProofPanel>
          </motion.div>

          <motion.div {...fadeProps(0.2)}>
            <ProofPanel title="Food-safety systems">
              <CertList items={byIds(foodSafetySystemIds)} />
            </ProofPanel>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:gap-7 mb-8 lg:mb-9">
          {/* Certification logos — full set, static wrap, with context per
              logo (never shown alone). */}
          <motion.div {...fadeProps(0.1)}>
            <ProofPanel title="Certification logos">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {allCertificates.map((cert) => (
                  <div key={cert.id} className="group flex items-start gap-3">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      loading="lazy"
                      className="w-11 h-11 object-contain flex-shrink-0 rounded-md border border-surface-200/70 dark:border-surface-800 bg-white p-1 transition-all duration-300 group-hover:border-[#e8b64a]/60 group-hover:-translate-y-0.5"
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-body font-semibold text-[15px] text-heading dark:text-white">
                        {cert.name}
                      </span>
                      <span className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 leading-[1.4]">
                        {cert.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ProofPanel>
          </motion.div>
        </div>

        {/* CTA row — primary, secondary, plus Download Certification Pack
            as a genuinely disabled button (not a fake link/href="#"): no
            approved certification-pack asset exists in the repository yet
            (only individual product flyers and a company profile PDF, none
            of which is a certification pack). Wire this up to a real file
            once one is provided. */}
        <motion.div {...fadeProps(0.3)} className="flex flex-wrap items-center gap-4">
          <InternalLink
            route="certifications"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[15px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            View All Certifications
          </InternalLink>

          <button
            type="button"
            disabled
            title="Coming soon"
            aria-disabled="true"
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-surface-300 dark:border-surface-700 text-surface-400 dark:text-surface-600 font-body font-semibold text-[15px] cursor-not-allowed opacity-60"
          >
            Download Certification Pack
          </button>

          <InternalLink
            route="quality_assurance"
            onPageChange={onPageChange}
            className="group inline-flex items-center gap-2 min-h-[44px] px-2 font-body font-semibold text-[15px] text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
          >
            Explore Quality Assurance
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className={reduceMotion ? '' : 'group-hover:translate-x-0.5 transition-transform duration-200'} aria-hidden>
              <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
              <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
            </svg>
          </InternalLink>
        </motion.div>

      </div>
    </div>
  );
}
