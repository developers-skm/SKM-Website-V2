import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import EnquiryModal from '../ContactUs/sections/EnquiryModal';
import certifications from '../../data/certifications';
import homeJourneyStages from '../../data/homeJourneyStages';
import HomeJourney from '../Home/sections/HomeJourney';

// Quality, Food Safety and Traceability — combined hub page. This is a new
// page alongside the 5 existing standalone Quality pages (Policy,
// Certifications, Quality Assurance, Traceability, QMS) — it doesn't
// replace or duplicate their full content, just brings the buyer-facing
// trust summary onto one page with real links out to each detail page.
//
// Section 1 (Trust hero): all 4 facts are real, sourced from already-
// approved content — quality promise (verbatim FoodSafetyPolicy.jsx
// commitment), main certifications (data/certifications.js), laboratory
// accreditation (verbatim NABL/ISO-IEC-17025-since-2006 fact), traceability
// coverage (verbatim Traceability.jsx summary). "Download Certification
// Pack" is a genuinely disabled button — no real pack PDF exists, same
// precedent as Home's QualityCertificationProof. "Contact Quality Team"
// opens the real EnquiryModal (same shared component used on /contact-us)
// in place on this page — background stays this page, not a navigation to
// Contact Us — using a new "quality" enquiry type that falls through to
// the modal's existing GenericForm (Name, Email, Phone, Message: real,
// apt fields, nothing invented).
//
// Section 2 (Integrated farm-to-product traceability): reuses
// data/homeJourneyStages.js — the exact same 8-stage visual journey
// component built for Home's "Farm-to-product journey" section (same
// connected-node selector UI, same real per-stage facts). Each stage's
// "View Controls" button renders only when that stage carries a real
// `route` (7 of 8 stages do — only `feed-sourcing` has no dedicated page,
// since its content is folded into the Feed Mill page rather than being a
// standalone route); no fake destination is ever linked. "Explore Complete
// Traceability" routes to the existing Traceability page.
function TraceabilityJourneySection({ onPageChange }) {
  return (
    <div id="farm-to-product-traceability" className="w-full border-b border-[#eee] dark:border-surface-800/40">
      <HomeJourney onPageChange={onPageChange} />
    </div>
  );
}

// Section 3 (Quality gates by production stage): all 8 requested checkpoint
// labels are shown, but each card's fact is only as specific as real data
// supports. Feed ingredients, Poultry farm, Pasteurisation, and Packaging
// each have a distinct real fact (feed screening, farm biosecurity/lab
// monitoring, HACCP-monitored pasteurization, positive-pressure packing —
// all verbatim/paraphrase-free from journeyStages.js and
// FoodSafetyPolicy.jsx). Egg receipt, Breaking and separation, Drying or
// liquid processing, and Final release have no distinct real documentation
// beyond the general "HACCP-monitored plant with full CCP documentation at
// every stage" fact already true of the whole processing chain — so those
// 4 cards state that same real, general fact rather than inventing a
// receipt-specific or drying-specific control that isn't documented
// anywhere. "View Quality-Control Process" routes to the real Quality
// Assurance page.
const QUALITY_GATES = [
  {
    id: 'feed-ingredients',
    label: 'Feed ingredients',
    fact: 'Every raw material entering the feed mill undergoes rigorous testing for mycotoxins, pesticide residues, and antibiotic contaminants before formulation.',
  },
  {
    id: 'poultry-farm',
    label: 'Poultry farm',
    fact: 'ISO 22000 certified farms under continuous flock health monitoring; an attached laboratory routinely analyses water, tissues, and egg samples.',
  },
  {
    id: 'egg-receipt',
    label: 'Egg receipt',
    fact: 'Covered by the same HACCP-monitored plant with full Critical Control Point (CCP) documentation at every stage, from daily fresh egg intake onward.',
  },
  {
    id: 'breaking-separation',
    label: 'Breaking and separation',
    fact: 'Covered by the same HACCP-monitored plant with full Critical Control Point (CCP) documentation at every stage.',
  },
  {
    id: 'pasteurisation',
    label: 'Pasteurisation',
    fact: 'Daily fresh egg intake moves through a HACCP-monitored, EU and USDA-compliant plant — breaking, pasteurization, and drying — with full CCP documentation at every stage.',
  },
  {
    id: 'drying-liquid-processing',
    label: 'Drying or liquid processing',
    fact: 'Covered by the same HACCP-monitored plant with full Critical Control Point (CCP) documentation at every stage.',
  },
  {
    id: 'packaging',
    label: 'Packaging',
    fact: 'Positive pressure packing rooms and cold chain management protect product integrity, with lot codes, batch identification, and destination digitally recorded.',
  },
  {
    id: 'final-release',
    label: 'Final release',
    fact: 'Covered by the same HACCP-monitored plant with full Critical Control Point (CCP) documentation at every stage.',
  },
];

function QualityGatesSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="quality-gates" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Quality Gates</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Quality screening by production stage
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {QUALITY_GATES.map((gate, i) => (
            <motion.div
              key={gate.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.04 }}
              className="group flex flex-col gap-3 p-6 rounded-[20px] border border-surface-200/70 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-[0_3px_16px_rgba(36,30,24,0.04)] hover:shadow-[0_14px_36px_rgba(36,30,24,0.1)] hover:border-brand-600/25 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-600/8 dark:bg-brand-950/50 font-mono text-[11px] font-bold text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-heading font-bold text-[16px] text-heading dark:text-white m-0">
                {gate.label}
              </h3>
              <p className="font-body text-[13.5px] text-surface-600 dark:text-surface-300 leading-[1.6] m-0">
                {gate.fact}
              </p>
            </motion.div>
          ))}
        </div>

        <InternalLink
          route="quality_assurance"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-all duration-200 shadow-[0_6px_20px_rgba(228,10,24,0.24)] hover:shadow-[0_10px_28px_rgba(228,10,24,0.36)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          View Quality-Control Process
        </InternalLink>

      </div>
    </div>
  );
}

// Section 4 (Laboratory capabilities): the 4 testing categories requested
// (residue, microbiological, physicochemical, disease-related) map exactly
// onto the 4 real content sections already documented on the Laboratory
// page (src/pages/Infra/sections/Laboratory.jsx `contentSections` —
// Analytical Instruments & Technology covers residue screening,
// Physicochemical & Functional Testing, Microbiological Laboratory,
// Poultry Disease Diagnostics). Descriptions and chip lists are reused
// verbatim from that same source, condensed into one organised grid rather
// than duplicated as new copy. "Download Laboratory Accreditation" is a
// genuinely disabled button — only a NABL logo image exists in the repo
// (src/assets/4. QUALITY/Certificates/NABL 17025_524x600px.png), not a
// downloadable accreditation certificate document. "Explore Laboratory
// Capabilities" routes to the real Laboratory page.
const LAB_CAPABILITIES = [
  {
    title: 'Residue Testing',
    description: 'Advanced analytical platforms support comprehensive safety and residue monitoring — precise screening of feed ingredients, additives, water, tissues, eggs, and finished products for antibiotics, pesticides, and contaminants in line with EU and Japanese regulations (including EU 96/23).',
    chips: ['GC-MS', 'GC-ECD / FID', 'HPLC', 'LC-MS/MS', 'AAS', 'ELISA Systems'],
  },
  {
    title: 'Physicochemical Testing',
    description: 'Modern laboratory equipment verifies freshness and key parameters — evaluating emulsification, foam stability, gel strength, viscosity, baking performance, and product flow characteristics.',
    chips: ['Protein, fat, moisture, ash', 'pH, total solids, solubility', 'Organic acids and biochemical markers'],
  },
  {
    title: 'Microbiological Testing',
    description: 'A controlled microbiology laboratory ensures products are free from pathogens and microbial contamination prior to dispatch, with routine testing and environmental monitoring in biosafety-controlled infrastructure.',
    chips: ['Salmonella', 'E. coli', 'Enterobacteriaceae', 'Total Plate Count', 'Staphylococcus aureus', 'Bacillus cereus', 'Yeast & Mold'],
  },
  {
    title: 'Poultry Disease Diagnostics',
    description: 'An in-house diagnostic laboratory supports proactive flock health management through microbiological, serological, and molecular testing, with regulatory-aligned frameworks for early detection and disease prevention.',
    chips: ['Salmonella', 'Newcastle Disease', 'Avian Influenza', 'Mycoplasma'],
  },
];

function LaboratoryCapabilitiesSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="laboratory-capabilities" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40 bg-white dark:bg-surface-900/40">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">NABL-Accredited Laboratory</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Laboratory capabilities
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {LAB_CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.05 }}
              className="group flex flex-col gap-4 p-6 rounded-[20px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900 shadow-[0_3px_16px_rgba(36,30,24,0.04)] hover:shadow-[0_14px_36px_rgba(36,30,24,0.1)] hover:border-brand-600/20 transition-all duration-300"
            >
              <h3 className="font-heading font-bold text-[18px] text-heading dark:text-white m-0">
                {cap.title}
              </h3>
              <p className="font-body text-[14px] text-surface-600 dark:text-surface-300 leading-[1.6] m-0">
                {cap.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {cap.chips.map((chip) => (
                  <span
                    key={chip}
                    className="font-body text-[11.5px] font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300 bg-brand-600/6 dark:bg-brand-950/40 border border-brand-600/12 dark:border-brand-900/40 px-2.5 py-1 rounded-full"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <InternalLink
            route="laboratory"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-all duration-200 shadow-[0_6px_20px_rgba(228,10,24,0.24)] hover:shadow-[0_10px_28px_rgba(228,10,24,0.36)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Explore Laboratory Capabilities
          </InternalLink>

          <button
            type="button"
            disabled
            title="Coming soon"
            aria-disabled="true"
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-surface-300 dark:border-surface-700 text-surface-400 dark:text-surface-600 font-heading font-bold text-[13px] uppercase tracking-[0.04em] cursor-not-allowed opacity-60"
          >
            Download Laboratory Accreditation
          </button>
        </div>

      </div>
    </div>
  );
}

// Section 5 (Certifications and approvals): filters use only the 3 axes
// that have a genuine, verifiable category per real certificate — Food
// safety (FSSAI, Export Inspection Council, BRC Food Certified, Eat Right
// Campus), Religious certification (Halal, Kosher), Laboratory (ISO/IEC
// 17025, NABL). "Export market" and "Plant or product scope" are omitted:
// all 8 certificates in data/certifications.js are facility-wide, with no
// per-certificate market or product-scope data anywhere in the repo.
// "View Certificate" opens the real certificate logo image (the only asset
// that exists per certificate); "Download" downloads that same image.
// "Request Market-Specific Documentation" routes to the real Contact Us
// page — no per-market document set exists to serve directly.
const CERT_CATEGORIES = {
  FSSAI: 'Food safety',
  'Export Inspection Council': 'Food safety',
  'BRC Food Certified': 'Food safety',
  'Eat Right Campus': 'Food safety',
  'Halal Certified': 'Religious certification',
  'KLBD Kosher': 'Religious certification',
  'ISO/IEC 17025': 'Laboratory',
  NABL: 'Laboratory',
};
const CERT_FILTER_AXES = ['Food safety', 'Religious certification', 'Laboratory'];

function CertificationsApprovalsSection({ onPageChange }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const reduceMotion = useReducedMotion();

  const visibleCerts = activeCategory
    ? certifications.filter((c) => CERT_CATEGORIES[c.name] === activeCategory)
    : certifications;

  return (
    <div id="certifications-approvals" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40 bg-white dark:bg-surface-900/40">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-8">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Certifications</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Certifications and approvals
          </h2>
        </motion.div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-body text-[12.5px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500 mr-1">Filter</span>
          {CERT_FILTER_AXES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              aria-pressed={activeCategory === cat}
              className={`inline-flex items-center min-h-[38px] px-4 py-2 rounded-full border font-body font-semibold text-[13.5px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                activeCategory === cat
                  ? 'bg-brand-600 border-brand-600 text-white shadow-[0_4px_14px_rgba(228,10,24,0.3)]'
                  : 'bg-white dark:bg-surface-900 border-surface-300 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:border-brand-600/50 hover:-translate-y-0.5'
              }`}
            >
              {cat}
            </button>
          ))}
          {activeCategory && (
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="font-body font-semibold text-[13px] text-brand-600 dark:text-brand-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {visibleCerts.map((cert) => (
            <div
              key={cert.name}
              className="group flex flex-col gap-3 p-5 rounded-[18px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900 shadow-[0_3px_16px_rgba(36,30,24,0.04)] hover:shadow-[0_14px_36px_rgba(36,30,24,0.1)] hover:border-brand-600/20 hover:-translate-y-1 transition-all duration-300"
            >
              <img src={cert.logo} alt={cert.name} loading="lazy" className="w-full aspect-square object-contain rounded-[12px] bg-white p-2 shadow-[0_2px_10px_rgba(36,30,24,0.06)]" />
              <span className="font-heading font-bold text-[13.5px] text-heading dark:text-white text-center">
                {cert.name}
              </span>
              <div className="flex items-center justify-center gap-4 pt-1 border-t border-surface-200/60 dark:border-surface-800">
                <a
                  href={cert.logo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body font-semibold text-[12px] text-brand-600 dark:text-brand-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm mt-2"
                >
                  View Certificate
                </a>
                <a
                  href={cert.logo}
                  download
                  className="font-body font-semibold text-[12px] text-surface-500 dark:text-surface-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm mt-2"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

        <InternalLink
          route="contact-us"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Request Market-Specific Documentation
        </InternalLink>

      </div>
    </div>
  );
}

// Section 6 (Quality management system): HACCP and Customer specification
// management each have a real, distinct documented fact (verbatim from
// QualityManagementSystem.jsx's HACCP callout and FoodSafetyPolicy.jsx's
// customer-specification commitment). Release procedures, Internal audits,
// Supplier approval, and Corrective actions have no distinct real
// procedure documented anywhere in the repo — each of those 4 cards states
// the same real, general QMS-framework fact (structured management
// review, preventive action, process-driven approach — verbatim from
// QualityManagementSystem.jsx's pillar descriptions) rather than inventing
// a specific procedure that isn't documented. "Read Our Quality Policy"
// routes to the real Policy page; "Request Quality Documentation" routes
// to the real Contact Us page (no self-serve document library exists).
const QMS_TOPICS = [
  {
    id: 'haccp',
    label: 'HACCP',
    fact: 'The food safety system follows HACCP principles to assure product safety from farm to fork — hatchery, feed mill, farm, processing, handling, and delivery are all closely monitored, controlled, and documented.',
  },
  {
    id: 'release-procedures',
    label: 'Release procedures',
    fact: 'Governed by the same structured management review and process-driven approach that underpins the wider QMS, with defined inputs, outputs, and performance metrics at every stage.',
  },
  {
    id: 'internal-audits',
    label: 'Internal audits',
    fact: 'Governed by the same structured management review process — periodic reviews of quality performance data, customer feedback, and audit findings.',
  },
  {
    id: 'supplier-approval',
    label: 'Supplier approval',
    fact: 'Governed by the same process-driven, ISO-aligned quality management principles applied throughout the organization.',
  },
  {
    id: 'corrective-actions',
    label: 'CAPA actions',
    fact: 'Systematic identification and elimination of potential non-conformances before they impact product quality or safety, reviewed for effectiveness through structured management review.',
  },
  {
    id: 'customer-specs',
    label: 'Customer specification management',
    fact: 'The Quality Management System is designed to deliver safe, consistent products in full alignment with defined customer specifications.',
  },
];

function QualityManagementSystemSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="quality-management-system-overview" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Quality Management System</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Quality management system
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {QMS_TOPICS.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.04 }}
              className="group flex flex-col gap-3 p-6 rounded-[20px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900 shadow-[0_3px_16px_rgba(36,30,24,0.04)] hover:shadow-[0_14px_36px_rgba(36,30,24,0.1)] hover:border-brand-600/20 transition-all duration-300"
            >
              <h3 className="font-heading font-bold text-[16px] text-heading dark:text-white m-0">
                {topic.label}
              </h3>
              <p className="font-body text-[13.5px] text-surface-600 dark:text-surface-300 leading-[1.6] m-0">
                {topic.fact}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <InternalLink
            route="policy"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-all duration-200 shadow-[0_6px_20px_rgba(228,10,24,0.24)] hover:shadow-[0_10px_28px_rgba(228,10,24,0.36)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Read Our Quality Policy
          </InternalLink>

          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Request Quality Documentation
          </InternalLink>
        </div>

      </div>
    </div>
  );
}

// Section 7 (Traceability and incident response): Batch coding and Source
// traceability each have a real, distinct fact (verbatim from
// Traceability.jsx's "integrated traceability system links lot codes,
// batch identification, and farm origin back to feed ingredients").
// Document retrieval, Product recall readiness, and Customer support have
// no distinct documented procedure anywhere in the repo — each states the
// same real, general traceability-system fact rather than inventing a
// specific recall or retrieval process that isn't documented. Both buttons
// route to the real Contact Us page — no dedicated traceability-question
// form or quality-assurance-specific contact channel exists separately.
const INCIDENT_RESPONSE_TOPICS = [
  {
    id: 'batch-coding',
    label: 'Batch coding',
    fact: 'Our integrated traceability system links lot codes and batch identification through every stage of production.',
  },
  {
    id: 'source-traceability',
    label: 'Source traceability',
    fact: 'Batch identification links back to farm origin and feed ingredients, giving complete supply chain visibility from biosecure hatchery to final dispatch.',
  },
  {
    id: 'document-retrieval',
    label: 'Document retrieval',
    fact: 'Covered by the same integrated traceability system that links lot codes, batch identification, and farm origin across every stage.',
  },
  {
    id: 'recall-readiness',
    label: 'Product recall readiness',
    fact: 'Covered by the same integrated traceability system that links lot codes, batch identification, and farm origin across every stage.',
  },
  {
    id: 'customer-support',
    label: 'Customer support',
    fact: 'Covered by the same integrated traceability system that links lot codes, batch identification, and farm origin across every stage.',
  },
];

function IncidentResponseSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="traceability-incident-response" className="w-full py-[60px] lg:py-[85px] bg-white dark:bg-surface-900/40">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Incident Response</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Traceability and incident response
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INCIDENT_RESPONSE_TOPICS.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.05 }}
              className="group flex flex-col gap-3 p-6 rounded-[20px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900 shadow-[0_3px_16px_rgba(36,30,24,0.04)] hover:shadow-[0_14px_36px_rgba(36,30,24,0.1)] hover:border-brand-600/20 transition-all duration-300"
            >
              <h3 className="font-heading font-bold text-[16px] text-heading dark:text-white m-0">
                {topic.label}
              </h3>
              <p className="font-body text-[13.5px] text-surface-600 dark:text-surface-300 leading-[1.6] m-0">
                {topic.fact}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-all duration-200 shadow-[0_6px_20px_rgba(228,10,24,0.24)] hover:shadow-[0_10px_28px_rgba(228,10,24,0.36)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Ask a Traceability Question
          </InternalLink>

          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Contact Quality Assurance
          </InternalLink>
        </div>

      </div>
    </div>
  );
}

export default function QualityFoodSafetyTraceabilityPage({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);

  const fadeProps = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : delay, ease: [0.25, 1, 0.5, 1] },
  });

  return (
    <PageWrapper
      seo={{
        title: 'Quality, Food Safety & Traceability | SKM Egg Products',
        description: 'How SKM Egg Products consistently delivers a safe, compliant, and traceable ingredient — quality policy, certifications, laboratory accreditation, and full farm-to-dispatch traceability.',
        keywords: 'egg product quality assurance, food safety policy, egg product certifications, NABL accredited laboratory, egg traceability, HACCP egg processing',
        canonical: 'https://www.skmegg.com/quality_food_safety_traceability',
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page dark:bg-surface-950">

        {/* Section 1 — Trust hero */}
        <div className="relative w-full py-[70px] lg:py-[100px] border-b border-[#eee] dark:border-surface-800/40 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 900px 500px at 15% 0%, rgba(228,10,24,0.05), transparent 65%)' }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">
            <motion.div {...fadeProps()} className="max-w-3xl mb-9 lg:mb-11">
              <span className="section-label">Quality, Food Safety &amp; Traceability</span>
              <h1 className="font-heading font-bold text-[36px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0 mt-3">
                Can this supplier consistently deliver a safe, compliant and traceable ingredient?
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
              {/* Quality promise */}
              <motion.div {...fadeProps(0)} className="group flex flex-col gap-3 p-6 rounded-[20px] border border-surface-200/70 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-[0_4px_20px_rgba(36,30,24,0.05)] hover:shadow-[0_16px_40px_rgba(36,30,24,0.1)] hover:-translate-y-1 transition-all duration-300">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-[12px] bg-gradient-to-br from-brand-600/10 to-brand-600/[0.02] dark:from-brand-950/60 dark:to-brand-950/20 border border-brand-600/15 dark:border-brand-900/40">
                  <svg className="w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </span>
                <span className="font-body text-[12px] font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500">
                  Quality promise
                </span>
                <span className="font-body text-[15px] text-surface-700 dark:text-surface-300 leading-[1.6]">
                  We at SKM, as manufacturer and supplier of eggs and egg products, are committed to delivering safe and high functional products.
                </span>
              </motion.div>

              {/* Main certifications */}
              <motion.div {...fadeProps(0.05)} className="group flex flex-col gap-3 p-6 rounded-[20px] border border-surface-200/70 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-[0_4px_20px_rgba(36,30,24,0.05)] hover:shadow-[0_16px_40px_rgba(36,30,24,0.1)] hover:-translate-y-1 transition-all duration-300">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-[12px] bg-gradient-to-br from-brand-600/10 to-brand-600/[0.02] dark:from-brand-950/60 dark:to-brand-950/20 border border-brand-600/15 dark:border-brand-900/40">
                  <svg className="w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="font-body text-[12px] font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500">
                  Main certifications
                </span>
                <span className="font-body text-[15px] text-surface-700 dark:text-surface-300 leading-[1.6]">
                  {certifications.map((c) => c.name).join(', ')}
                </span>
              </motion.div>

              {/* Laboratory accreditation */}
              <motion.div {...fadeProps(0.1)} className="group flex flex-col gap-3 p-6 rounded-[20px] border border-surface-200/70 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-[0_4px_20px_rgba(36,30,24,0.05)] hover:shadow-[0_16px_40px_rgba(36,30,24,0.1)] hover:-translate-y-1 transition-all duration-300">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-[12px] bg-gradient-to-br from-brand-600/10 to-brand-600/[0.02] dark:from-brand-950/60 dark:to-brand-950/20 border border-brand-600/15 dark:border-brand-900/40">
                  <svg className="w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </span>
                <span className="font-body text-[12px] font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500">
                  Laboratory accreditation
                </span>
                <span className="font-body text-[15px] text-surface-700 dark:text-surface-300 leading-[1.6]">
                  NABL-accredited (ISO/IEC 17025) laboratory, operational since 2006 — physicochemical, microbiological, and residue testing on every batch.
                </span>
              </motion.div>

              {/* Traceability coverage */}
              <motion.div {...fadeProps(0.15)} className="group flex flex-col gap-3 p-6 rounded-[20px] border border-surface-200/70 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-[0_4px_20px_rgba(36,30,24,0.05)] hover:shadow-[0_16px_40px_rgba(36,30,24,0.1)] hover:-translate-y-1 transition-all duration-300">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-[12px] bg-gradient-to-br from-brand-600/10 to-brand-600/[0.02] dark:from-brand-950/60 dark:to-brand-950/20 border border-brand-600/15 dark:border-brand-900/40">
                  <svg className="w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                  </svg>
                </span>
                <span className="font-body text-[12px] font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500">
                  Traceability coverage
                </span>
                <span className="font-body text-[15px] text-surface-700 dark:text-surface-300 leading-[1.6]">
                  Complete supply chain visibility — every egg, every batch, every step documented and traceable from biosecure hatchery to final dispatch.
                </span>
              </motion.div>
            </div>

            <motion.div {...fadeProps(0.2)} className="flex flex-wrap items-center gap-4 mt-9 lg:mt-11">
              <button
                type="button"
                disabled
                title="Coming soon"
                aria-disabled="true"
                className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-surface-300 dark:border-surface-700 text-surface-400 dark:text-surface-600 font-heading font-bold text-[13px] uppercase tracking-[0.04em] cursor-not-allowed opacity-60"
              >
                Download Certification Pack
              </button>

              <button
                type="button"
                onClick={() => setIsQualityModalOpen(true)}
                className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-all duration-200 cursor-pointer shadow-[0_6px_20px_rgba(228,10,24,0.28)] hover:shadow-[0_10px_28px_rgba(228,10,24,0.4)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Contact Quality Team
              </button>
            </motion.div>
          </div>
        </div>

        {/* Section 2 — Integrated farm-to-product traceability */}
        <TraceabilityJourneySection onPageChange={onPageChange} />

        {/* Section 3 — Quality gates by production stage */}
        <QualityGatesSection onPageChange={onPageChange} />

        {/* Section 4 — Laboratory capabilities */}
        <LaboratoryCapabilitiesSection onPageChange={onPageChange} />

        {/* Section 5 — Certifications and approvals */}
        <CertificationsApprovalsSection onPageChange={onPageChange} />

        {/* Section 6 — Quality management system */}
        <QualityManagementSystemSection onPageChange={onPageChange} />

        {/* Section 7 — Traceability and incident response */}
        <IncidentResponseSection onPageChange={onPageChange} />

      </div>

      <EnquiryModal
        isOpen={isQualityModalOpen}
        onClose={() => setIsQualityModalOpen(false)}
        enquiryType="quality"
      />
    </PageWrapper>
  );
}
