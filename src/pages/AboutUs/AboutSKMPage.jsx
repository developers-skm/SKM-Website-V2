import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import CompanyProfilePdf from '../../assets/Brouchers/Company Profile - SKM Egg Products Export India Limited.pdf';
import FactoryImage from '../../assets/2. ABOUT US/Our Company/Factory image.webp';

// Section 2 — Company overview. Real content verbatim/derived from
// src/pages/AboutUs/sections/OurCompany.jsx (also used on the standalone
// Our Company page): founded 1996, Asia's largest integrated egg
// processing facility, 2M eggs/day, 7,500 MT egg powder annually, ISO
// 22000 certified poultry & feed mill (EU compartmentalization). "View
// Manufacturing Capabilities" routes to the real Manufacturing and Supply
// hub page.
const OVERVIEW_STATS = [
  { value: '2 Million', label: 'Eggs processed per day' },
  { value: '7,500 MT', label: 'Egg powder annually' },
  { value: 'ISO 22000', label: 'Certified poultry & feed mill' },
];

function CompanyOverviewSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40 bg-white dark:bg-surface-900/40">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
            className="flex-1 relative w-full overflow-hidden rounded-[24px] aspect-[4/3] sm:aspect-[16/9]"
          >
            <img src={FactoryImage} alt="SKM Eggs Factory Facility" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : 0.1 }}
            className="flex-1 flex flex-col gap-5"
          >
            <span className="section-label">Company Overview</span>
            <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white leading-[1.15] tracking-tight m-0">
              Who We Are
            </h2>
            <p className="font-body text-[15px] text-surface-600 dark:text-surface-300 leading-[1.7] m-0">
              Established in 1996, SKM Egg Products began its journey with a clear commitment to excellence in egg processing. Today, we operate as one of Asia's largest integrated egg processing facilities, combining advanced production technology with internationally aligned quality systems.
            </p>
            <p className="font-body text-[15px] text-surface-600 dark:text-surface-300 leading-[1.7] m-0">
              Supported by fully integrated back-end farms, our operations process up to 2 million eggs per day, producing approximately 7,500 metric tonnes of egg powder annually — serving food manufacturers across bakery, mayonnaise, meat & fish, and noodles & pasta industries.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {OVERVIEW_STATS.map((stat) => (
            <div key={stat.label} className="p-5 bg-[#fdfbf7] dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[10px] flex flex-col gap-1.5">
              <span className="font-heading font-bold text-[22px] text-brand-600 dark:text-brand-400 leading-none">{stat.value}</span>
              <span className="font-body text-[13px] text-surface-500 dark:text-surface-400">{stat.label}</span>
            </div>
          ))}
        </div>

        <InternalLink
          route="manufacturing_and_supply"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          View Manufacturing Capabilities
        </InternalLink>
      </div>
    </div>
  );
}

// About SKM — new consolidated page. Replaces the 8-item "About SKM" nav
// dropdown (Our Company, Vision & Mission, Core Ideology, Brand Identity,
// CEO's Message, Accolades, Events, Coffee Table Books) with a single page
// telling the whole company story in one place, per the brief: buyers
// shouldn't have to visit 7+ separate pages to understand the company. All
// 8 individual pages stay live at their existing URLs for SEO/direct
// linking (same precedent as the SKM Japan/Europe/Russia branch
// consolidation) — just no longer reachable via the main nav dropdown.
//
// Section 1 — Company hero. "Download Company Profile" downloads the real
// Company Profile PDF (src/assets/Brouchers/Company Profile - SKM Egg
// Products Export India Limited.pdf, the same file used on the Resources
// page). "Explore Our Products" routes to the real Products hub.

// Section 3 — Company journey. The only real dated facts anywhere in the
// repo are the 1996 founding and the award years documented on
// AccoladesPage.jsx — no narrative growth/expansion milestones exist
// (e.g. "opened a new plant in X year"), so this timeline is built only
// from those real, verbatim-dated facts rather than an invented growth
// story. "Explore Our History" routes to the real Accolades page, which
// has the full award list and imagery.
const JOURNEY_MILESTONES = [
  { year: '1996', label: 'Founded', desc: "SKM Egg Products established, beginning its journey with a commitment to excellence in egg processing." },
  { year: '2001', label: 'APEDA Silver Trophy', desc: 'Recognized by APEDA as a leading exporter from India, awarded annually since 2001.' },
  { year: '2005–06', label: 'Best Export Performance Award', desc: '100% EOU category, awarded by MEPZ (Madras Export Processing Zone).' },
  { year: '2006', label: 'Manufacturing Excellence Silver Award', desc: 'Awarded by Frost & Sullivan.' },
  { year: '2007', label: 'State Safety Award', desc: 'Awarded by the Government of Tamil Nadu.' },
  { year: '2007–08', label: 'Manufacturing Excellence Gold Award', desc: 'Awarded by Frost & Sullivan, two years running.' },
  { year: '2011–13', label: 'APEDA Golden Trophy', desc: 'Golden Trophy awarded by APEDA, Ministry of Commerce, Government of India, for 2011–2012 and 2012–2013.' },
  { year: '2013', label: 'Export Excellence Award', desc: 'Awarded at MEPZ, Special Economic Zone – Chennai.' },
  { year: '2016', label: 'Best 5S Practice Award', desc: 'Awarded by M/S ABK-AOTS.' },
];

function CompanyJourneySection({ onPageChange }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const milestone = JOURNEY_MILESTONES[selectedIndex];

  return (
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Our History</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white leading-[1.15] tracking-tight m-0">
            Company journey
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-[19px] h-px bg-surface-300 dark:bg-surface-700" aria-hidden="true" />
          <div role="tablist" aria-label="Company journey milestones" className="relative grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-x-2 gap-y-6">
            {JOURNEY_MILESTONES.map((m, i) => {
              const isSelected = i === selectedIndex;
              return (
                <button
                  key={m.year}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedIndex(i)}
                  className="group flex flex-col items-center gap-2 bg-transparent border-none p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-lg"
                >
                  <span
                    className={`relative z-10 w-[38px] h-[38px] rounded-full flex items-center justify-center font-heading font-bold text-[10px] transition-colors duration-200 ${
                      isSelected ? 'bg-brand-600 text-white' : 'bg-white dark:bg-surface-900 border border-surface-300 dark:border-surface-700 text-surface-500 dark:text-surface-400 group-hover:border-brand-600/50'
                    }`}
                  >
                    {m.year.slice(0, 4)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={milestone.year}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.3 }}
          className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900 p-7 sm:p-9 flex flex-col gap-3"
        >
          <span className="font-heading font-black text-[28px] text-brand-600 dark:text-brand-400 leading-none">{milestone.year}</span>
          <h3 className="font-heading font-bold text-[20px] text-heading dark:text-white m-0">{milestone.label}</h3>
          <p className="font-body text-[15px] text-surface-600 dark:text-surface-300 leading-[1.6] m-0">{milestone.desc}</p>
        </motion.div>

        <InternalLink
          route="accolades"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Explore Our History
        </InternalLink>
      </div>
    </div>
  );
}

// Section 4 — Leadership message. The CEO message is included directly on
// this page rather than as a separate main-nav item, per the brief. Quote
// and sign-off are verbatim from src/pages/AboutUs/sections/CeoMessage.jsx
// (also used on the standalone CEO's Message page). "Read Full Leadership
// Message" is included (real destination, the standalone page) rather than
// omitted, since the full real quote is already shown here in full — the
// button is a real cross-link, not a workaround for truncated content.
function LeadershipMessageSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40 bg-white dark:bg-surface-900/40">
      <div className="mx-auto max-w-[1000px] w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="section-label justify-center">Leadership Message</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white leading-[1.15] tracking-tight m-0">
            A Message From Our CEO
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.5 }}
          className="w-full bg-[#fdfbf7] dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[20px] p-8 sm:p-12 flex flex-col items-center gap-7"
        >
          <div className="w-full border-l-4 border-brand-600 pl-7 py-2">
            <p className="font-body text-[16px] sm:text-[18px] font-medium leading-[1.7] text-surface-700 dark:text-surface-200 m-0 italic">
              "SKM EGG Products is a finest example of how a strong value system and drive for excellence can keep you ahead in a competitive environment. Thinking out of the shell was a mantra we adopted consciously not just to give ourselves the edge but also to keep pushing ourselves to innovate. Today, we are one of the Asia's biggest egg processing plant, the future looks both exciting and promising to us."
            </p>
          </div>
          <div className="w-14 h-[3px] bg-brand-600 rounded-full" />
          <div className="flex flex-col items-center gap-1 text-center">
            <h4 className="font-heading text-[17px] font-bold text-heading dark:text-white m-0">Mr. SKM Shree Shivkumar</h4>
            <p className="font-body text-[12px] font-bold text-brand-600 dark:text-brand-400 m-0 uppercase tracking-widest">Chief Executive Officer</p>
          </div>
        </motion.div>

        <InternalLink
          route="ceo_message"
          onPageChange={onPageChange}
          className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Read Full Leadership Message
        </InternalLink>
      </div>
    </div>
  );
}

// Section 5 — Vision, mission and values. Presented as concise principles
// (short lines/tags), not the long separate cards used on the standalone
// Vision & Mission / Core Ideology pages. Vision quote, mission items, and
// core values are all real and verbatim from
// src/pages/AboutUs/sections/VisionMission.jsx and CoreIdeologyPage.jsx.
// No button, per the brief — a full corporate profile PDF is available,
// but its download button already exists in Section 1, so it isn't
// duplicated here.
const MISSION_ITEMS = ['Innovate and excel in what we do.', 'Maximize value for stakeholders.', 'Sustain integrity and honesty.', 'Contribute to social needs.'];
const CORE_VALUES = [
  'Evaluate and establish benchmarks periodically',
  'Develop and improve products and processes',
  'Deliver at a competitive price',
  'Returns by way of dividend and wealth creation',
  'Compensate and motivate employees and partners',
  'Compliance to statutory regulations',
  'Support for social causes',
];

function VisionMissionValuesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Purpose &amp; Direction</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white leading-[1.15] tracking-tight m-0">
            Vision, mission and values
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: reduceMotion ? 0.01 : 0.5 }}
            className="flex flex-col gap-3 p-6 rounded-[18px] border border-[#eee] dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900"
          >
            <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Vision</span>
            <p className="font-body text-[16px] font-medium leading-[1.6] text-surface-700 dark:text-surface-200 m-0 italic">
              "To be the leader in the sectors we operate with the responsibility of building a healthy society."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: reduceMotion ? 0.01 : 0.5, delay: reduceMotion ? 0 : 0.05 }}
            className="flex flex-col gap-3 p-6 rounded-[18px] border border-[#eee] dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900"
          >
            <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Mission</span>
            <ul className="flex flex-col gap-1.5 list-none m-0 p-0">
              {MISSION_ITEMS.map((item) => (
                <li key={item} className="font-body text-[13.5px] text-surface-600 dark:text-surface-300 leading-[1.5] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-brand-600">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: reduceMotion ? 0.01 : 0.5, delay: reduceMotion ? 0 : 0.1 }}
            className="flex flex-col gap-3 p-6 rounded-[18px] border border-[#eee] dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900"
          >
            <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Values</span>
            <div className="flex flex-wrap gap-1.5">
              {CORE_VALUES.map((value) => (
                <span key={value} className="font-body text-[11.5px] font-medium text-surface-600 dark:text-surface-300 bg-white dark:bg-surface-800/60 border border-surface-200/70 dark:border-surface-700 px-2.5 py-1 rounded-[6px]">
                  {value}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Section 6 — Integrated business model. Connects feed, farm, plant,
// laboratory, and export operations using real facts already established
// this session (Feed Mill / Poultry Farm / Egg Processing Plant /
// Laboratory pages, and GlobalReachPage's real export/branch facts). "See
// How We Control the Supply Chain" routes to the real Manufacturing and
// Supply hub page.
const BUSINESS_MODEL_STAGES = [
  { label: 'Feed', fact: 'In-house feed mill screens every ingredient for mycotoxins, pesticides, and antibiotic residues before formulation.' },
  { label: 'Farm', fact: '2.4 million layers housed across ISO 22000 certified integrated farms, producing approximately 164 million eggs annually.' },
  { label: 'Plant', fact: 'EU and USDA-compliant processing plant handling up to 2 million eggs per day across dedicated yolk and albumen lines.' },
  { label: 'Laboratory', fact: 'NABL-accredited (ISO/IEC 17025) laboratory, operational since 2006, tests every batch before release.' },
  { label: 'Egg Export', fact: 'Exports to 30+ countries, with dedicated regional branches in Japan, Europe, and Russia.' },
  // Real, verbatim-sourced facts from EggProcessingPlant.jsx / SustainabilityCommunityPage.jsx:
  // integrated biogas facility, 70-tonne poultry litter handling capacity,
  // nutrient-rich liquid fertilizer supplied to farmers at no cost.
  { label: 'Bio-Gas', fact: 'Integrated biogas facility with 70-tonne poultry litter handling capacity, supplying nutrient-rich liquid fertilizer to farmers at no cost.' },
];

function IntegratedBusinessModelSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40 bg-white dark:bg-surface-900/40">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">One Supply Chain</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white leading-[1.15] tracking-tight m-0">
            Integrated business model
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 top-[19px] h-px bg-surface-300 dark:bg-surface-700" aria-hidden="true" />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {BUSINESS_MODEL_STAGES.map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.06 }}
                className="flex flex-col gap-3"
              >
                <span className="relative z-10 w-[38px] h-[38px] rounded-full bg-brand-600 text-white flex items-center justify-center font-heading font-bold text-[13px]">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1.5 p-5 rounded-[16px] border border-[#eee] dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900 flex-1">
                  <h3 className="font-heading font-bold text-[15px] text-heading dark:text-white m-0">{stage.label}</h3>
                  <p className="font-body text-[12.5px] text-surface-500 dark:text-surface-400 leading-[1.5] m-0">{stage.fact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <InternalLink
          route="manufacturing_and_supply"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          See How We Control the Supply Chain
        </InternalLink>
      </div>
    </div>
  );
}

// Section 7 — Awards and recognitions. Selected major awards (Padma Shree,
// APEDA Golden Trophy, Export Excellence) show initially; the rest of the
// real award list (verbatim from AccoladesPage.jsx `otherAwards`) sits
// behind a real progressive-disclosure toggle, same pattern used elsewhere
// this session. "View All Awards" routes to the real Accolades page. Also
// cross-links "Coffee Table Books" here (its real content — "a premium
// visual archive showcasing our history" — fits this section), since that
// page is no longer reachable from the main nav dropdown.
const MAJOR_AWARDS = [
  { name: 'Padma Shree Award', desc: 'Shri SKM Maeilanandhan received the Padma Shree Award from the Honourable President of India, Shri Pranab Mukherjee.' },
  { name: 'APEDA Golden Trophy', desc: '"Golden Trophy" awarded by APEDA, Ministry of Commerce, Government of India, for 2011–2012 and 2012–2013.' },
  { name: 'Export Excellence Award', desc: 'Awarded at MEPZ, Special Economic Zone – Chennai, 2013.' },
];

const OTHER_AWARDS = [
  'Manufacturing Excellence Silver Award in 2006 and Manufacturing Excellence Gold Award in 2007 & 2008 by Frost & Sullivan.',
  'State Safety Award for the year 2007 by Government of Tamil Nadu.',
  'Best Export Performance Awards in 100% EOU category by MEPZ (Madras Export Processing Zone) for the year 2005-06.',
  'APEDA Silver Trophy since 2001 onwards, recognizing SKM as a leading exporter from India.',
];

function AwardsRecognitionSection({ onPageChange }) {
  const [showAll, setShowAll] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40 bg-white dark:bg-surface-900/40">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Honors &amp; Recognitions</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white leading-[1.15] tracking-tight m-0">
            Awards and recognitions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {MAJOR_AWARDS.map((award) => (
            <div key={award.name} className="flex flex-col gap-2 p-6 rounded-[16px] border border-[#eee] dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900">
              <h3 className="font-heading font-bold text-[15px] text-heading dark:text-white m-0">{award.name}</h3>
              <p className="font-body text-[13px] text-surface-500 dark:text-surface-400 leading-[1.5] m-0">{award.desc}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-expanded={showAll}
          onClick={() => setShowAll((prev) => !prev)}
          className="self-start inline-flex items-center gap-2 font-body font-semibold text-[14px] text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 bg-transparent border-none p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
        >
          {showAll ? 'Show Fewer Awards' : 'Show More Awards'}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`} aria-hidden>
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showAll && (
          <motion.ul
            initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.3 }}
            className="flex flex-col gap-4 list-none m-0 p-0"
          >
            {OTHER_AWARDS.map((award) => (
              <li key={award} className="flex items-start gap-3">
                <span className="mt-[9px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-600" />
                <p className="font-body text-[14px] text-surface-500 dark:text-surface-400 leading-[1.6] m-0">{award}</p>
              </li>
            ))}
          </motion.ul>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <InternalLink
            route="accolades"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            View All Awards
          </InternalLink>
          <InternalLink
            route="coffee_table_books"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2 font-body font-semibold text-[14px] text-brand-600 dark:text-brand-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
          >
            See Our Coffee Table Books
          </InternalLink>
        </div>
      </div>
    </div>
  );
}

// Section 8 — Locations and global operations (closing section). "View
// Global Presence" routes to the real Global Reach page (export markets +
// regional offices). "Contact SKM" routes to the real Contact Us page.
function LocationsSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
        className="mx-auto max-w-[600px] flex flex-col items-center gap-5"
      >
        <span className="section-label justify-center">Global Operations</span>
        <h2 className="font-heading font-bold text-[26px] sm:text-[32px] text-heading dark:text-white m-0 tracking-tight">
          Exporting to 30+ countries, with regional branches in Japan, Europe, and Russia.
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <InternalLink
            route="global_reach"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            View Global Presence
          </InternalLink>
          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Contact SKM
          </InternalLink>
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutSKMPage({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <PageWrapper
      seo={{
        title: 'About SKM | Company Overview, History & Leadership',
        description: "SKM Egg Products — Asia's largest integrated egg processing facility since 1996. Company overview, history, leadership message, values, and global operations in one place.",
        keywords: 'SKM Egg Products company, about SKM, egg powder manufacturer history, SKM CEO, SKM vision mission, SKM Egg Products India',
        canonical: 'https://www.skmegg.com/about_skm',
      }}
      breadcrumbItems={[{ label: 'About SKM' }]}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page dark:bg-surface-950">

        {/* Section 1 — Company hero */}
        <div className="w-full py-[70px] lg:py-[100px] border-b border-[#eee] dark:border-surface-800/40 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="mx-auto max-w-[820px] flex flex-col items-center gap-6"
          >
            <span className="section-label justify-center">About SKM</span>
            <h1 className="font-heading font-bold text-[36px] sm:text-[48px] lg:text-[56px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
              Asia's Largest Integrated Egg Processing Facility Since 1996.
            </h1>
            <p className="font-body text-[16px] sm:text-[17px] text-surface-600 dark:text-surface-300 leading-[1.7] m-0 max-w-2xl">
              Vision, mission, leadership, and values — everything a buyer needs to understand SKM, in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-3">
              <a
                href={CompanyProfilePdf}
                download
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Download Company Profile
              </a>

              <InternalLink
                route="products"
                onPageChange={onPageChange}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Explore Our Products
              </InternalLink>
            </div>
          </motion.div>
        </div>

        {/* Section 2 — Company overview */}
        <CompanyOverviewSection onPageChange={onPageChange} />

        {/* Section 3 — Company journey */}
        <CompanyJourneySection onPageChange={onPageChange} />

        {/* Section 4 — Leadership message */}
        <LeadershipMessageSection onPageChange={onPageChange} />

        {/* Section 5 — Vision, mission and values */}
        <VisionMissionValuesSection />

        {/* Section 6 — Integrated business model */}
        <IntegratedBusinessModelSection onPageChange={onPageChange} />

        {/* Section 7 — Awards and recognitions */}
        <AwardsRecognitionSection onPageChange={onPageChange} />

        {/* Section 8 — Locations and global operations */}
        <LocationsSection onPageChange={onPageChange} />

      </div>
    </PageWrapper>
  );
}
