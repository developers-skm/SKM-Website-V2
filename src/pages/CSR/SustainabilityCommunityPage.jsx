import { motion, useReducedMotion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import { scrollToSectionId } from '../../components/Navbar/useProductDiscoveryNavigation';

// Section 2 — Environmental responsibility. Energy, water, and waste are
// all real, verbatim/derived facts already documented elsewhere: energy
// (on-site wind mill generating 3.5 million units/year, SustainabilityPage.jsx),
// water (real Water Treatment Plant, EggProcessingPlant.jsx utility
// gallery), waste (real Effluent Treatment Plant + Biogas facility, 70-
// tonne poultry litter handling capacity, free liquid fertilizer by-
// product supplied to farmers). "Emissions" has no distinct documented
// program beyond the general carbon-footprint statement already used in
// Section 1's own mission text ("kept at the lowest possible level...
// energy-efficient processes"), so that card states the same real fact
// rather than inventing a separate emissions program. "Explore
// Environmental Initiatives" routes to the real standalone Sustainability
// page, which has the fuller environmental policy and objectives.
const ENVIRONMENTAL_INITIATIVES = [
  {
    id: 'energy',
    label: 'Energy',
    fact: 'An on-site wind mill generates 3.5 million units of electricity per year — powering operations with renewable energy.',
  },
  {
    id: 'water',
    label: 'Water',
    fact: 'A dedicated Water Treatment Plant supports the processing facility, ensuring responsible water use across operations.',
  },
  {
    id: 'waste',
    label: 'Waste',
    fact: 'An Effluent Treatment Plant treats process effluent, and an integrated biogas facility handles up to 70 tonnes of poultry litter, supplying nutrient-rich liquid fertilizer to farmers at no cost.',
  },
  {
    id: 'emissions',
    label: 'Emissions',
    fact: 'Carbon footprint is kept at the lowest possible level through the strategic location of the plant, efficient recycling of wastes, and energy-efficient processes.',
  },
];

function EnvironmentalResponsibilitySection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="sustainability-priorities" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40 bg-white dark:bg-surface-900/40 scroll-mt-[100px] xl:scroll-mt-[120px]">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Our Priorities</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white leading-[1.15] tracking-tight m-0">
            Environmental responsibility
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ENVIRONMENTAL_INITIATIVES.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.05 }}
              className="flex flex-col gap-3 p-6 rounded-[16px] border border-[#eee] dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900"
            >
              <h3 className="font-heading font-bold text-[15px] text-heading dark:text-white m-0">{item.label}</h3>
              <p className="font-body text-[13px] text-surface-500 dark:text-surface-400 leading-[1.5] m-0">{item.fact}</p>
            </motion.div>
          ))}
        </div>

        <InternalLink
          route="csr_sustainability"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Explore Environmental Initiatives
        </InternalLink>
      </div>
    </div>
  );
}

// Sustainability and Community — new consolidated hub. Merges the 5
// existing CSR pages (Sustainability, Community Development, Trust
// Outreach, Education, MD Article) into one page, per the brief. All 5
// individual pages stay live at their existing URLs for SEO and detailed
// reports (same precedent as every other consolidation this session —
// branch pages, About SKM's 8 source pages, etc.).
//
// Section 1 — Sustainability hero. "View Sustainability Priorities"
// scrolls to the real priorities section (built from
// SustainabilityPage.jsx's own real pillars: Carbon Footprint, Clean
// Energy, Community Welfare). "Download Sustainability Information" has
// no real PDF anywhere in the repo (confirmed by search — only a
// Sustainability *page*, no downloadable document), so it's a genuinely
// disabled button rather than a fake download.
// Section 3 — Responsible feed, farming and animal welfare. Real facts
// already documented on the Feed Mill and Poultry Farm pages (Infra
// section) — every raw material tested for mycotoxins/pesticides/
// antibiotics before formulation, ISO 22000 certified farms, biosecurity
// entry showers, and the real animal-welfare fact from PoultryFarm.jsx
// (balanced nutritionally optimized feed, daily sanitation protocols,
// on-site incinerator). "View Responsible Farming Practices" routes to
// the real Poultry Farm page.
const FARMING_PRACTICES = [
  {
    id: 'feed-screening',
    label: 'Responsible feed',
    fact: 'Every raw material entering the feed mill undergoes rigorous testing for mycotoxins, pesticide residues, and antibiotic contaminants before formulation.',
  },
  {
    id: 'biosecure-farming',
    label: 'Biosecure farming',
    fact: 'ISO 22000 certified integrated farms with strict personnel and vehicle entry shower systems, zoned layouts, and dedicated sanitation barriers.',
  },
  {
    id: 'animal-welfare',
    label: 'Animal welfare',
    fact: 'Balanced, nutritionally optimized feed, daily sanitation protocols, potable water management, and safe disposal systems — including an on-site incinerator — maintain high standards of animal welfare.',
  },
];

function ResponsibleFarmingSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Farm to Feed</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white leading-[1.15] tracking-tight m-0">
            Responsible feed, farming and animal welfare
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {FARMING_PRACTICES.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.06 }}
              className="flex flex-col gap-3 p-6 rounded-[16px] border border-[#eee] dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900"
            >
              <h3 className="font-heading font-bold text-[15px] text-heading dark:text-white m-0">{item.label}</h3>
              <p className="font-body text-[13px] text-surface-500 dark:text-surface-400 leading-[1.5] m-0">{item.fact}</p>
            </motion.div>
          ))}
        </div>

        <InternalLink
          route="poultry_farm"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          View Responsible Farming Practices
        </InternalLink>
      </div>
    </div>
  );
}

// Section 4 — Community development. Combines the 4 requested categories
// using real facts already documented across CommunityDevelopmentPage.jsx,
// TrustOutreachPage.jsx, and EducationPage.jsx — all under the real SKM
// Health and Mind Welfare Charity Trust (Sevai Maiyam). "Explore Community
// Programmes" routes to the real Community Development page, the primary
// source for this program.
const COMMUNITY_PROGRAMMES = [
  {
    id: 'welfare',
    label: 'Welfare',
    fact: '228 families adopted across Gandhi Nagar and Rajiv Nagar — 786 residents, including 239 children and 62 elderly — under the SKM Health and Mind Welfare Charity Trust (Sevai Maiyam).',
  },
  {
    id: 'health',
    label: 'Health',
    fact: 'Medical care provided to Dalit women from the start of pregnancy through delivery, with post-delivery consultations covering child rearing and disease prevention.',
  },
  {
    id: 'education',
    label: 'Education',
    fact: '239 children enrolled in coaching, 200 college students supported, and 13 graduates placed this year — with morning and evening coaching sessions led by 20 specialized teachers.',
  },
  {
    id: 'outreach',
    label: 'Outreach',
    fact: 'Individual toilets with proper drainage, streets kept clean with maintained trees, weekly garbage collection, and electrical lighting installed and maintained in every street.',
  },
];

function CommunityDevelopmentSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40 bg-white dark:bg-surface-900/40">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Sevai Maiyam</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white leading-[1.15] tracking-tight m-0">
            Community development
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COMMUNITY_PROGRAMMES.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.05 }}
              className="flex flex-col gap-3 p-6 rounded-[16px] border border-[#eee] dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900"
            >
              <h3 className="font-heading font-bold text-[15px] text-heading dark:text-white m-0">{item.label}</h3>
              <p className="font-body text-[13px] text-surface-500 dark:text-surface-400 leading-[1.5] m-0">{item.fact}</p>
            </motion.div>
          ))}
        </div>

        <InternalLink
          route="community_development"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Explore Community Programmes
        </InternalLink>
      </div>
    </div>
  );
}

// Section 5 — Performance indicators. All figures are real and already
// used elsewhere on this page/site (wind energy, biogas capacity,
// community reach, education outcomes). None of these figures carry a
// published reporting period (fiscal year, audit date, etc.) anywhere in
// the repo — they're documented as current, standing facts, not annually-
// reported metrics — so no invented reporting period is attached; each
// figure is labeled with only the real qualifier that exists (e.g. "per
// year" for the wind energy figure, "this year" for graduate placements,
// verbatim from EducationPage.jsx). "View Detailed Performance" routes to
// the real Sustainability page, which has the fuller environmental
// policy context for these figures.
const PERFORMANCE_INDICATORS = [
  { value: '3.5M', label: 'Units of clean electricity generated per year', source: 'On-site wind mill' },
  { value: '70T', label: 'Poultry litter handling capacity', source: 'Biogas facility' },
  { value: '228', label: 'Families adopted', source: 'Gandhi Nagar & Rajiv Nagar' },
  { value: '786', label: 'Residents supported', source: 'Community welfare program' },
  { value: '239', label: 'Children enrolled in coaching', source: 'Education program' },
  { value: '13', label: 'Graduates placed this year', source: 'Education program' },
];

function PerformanceIndicatorsSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40 bg-white dark:bg-surface-900/40">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">By The Numbers</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white leading-[1.15] tracking-tight m-0">
            Performance indicators
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {PERFORMANCE_INDICATORS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.04 }}
              className="p-5 bg-brand-600/4 dark:bg-brand-950/20 border border-[rgba(228, 10, 24,0.10)] dark:border-brand-900/30 rounded-[10px] flex flex-col gap-1.5"
            >
              <span className="font-heading font-bold text-[24px] sm:text-[26px] text-brand-600 dark:text-brand-400 leading-tight">{stat.value}</span>
              <span className="font-body text-[12px] font-medium text-surface-700 dark:text-surface-300 leading-tight">{stat.label}</span>
              <span className="font-body text-[10.5px] text-surface-400 dark:text-surface-500 uppercase tracking-wide">{stat.source}</span>
            </motion.div>
          ))}
        </div>

        <InternalLink
          route="csr_sustainability"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          View Detailed Performance
        </InternalLink>
      </div>
    </div>
  );
}

// Section 6 — Governance and commitments. Real environmental commitments
// (verbatim from SustainabilityPage.jsx's own environmental objectives)
// plus the real Food Safety & Quality Policy commitments already
// established across this session (HACCP, ISO 22000, BRCGS). "View
// Policies and Commitments" routes to the real Policy page, the primary
// source for the full commitment.
const GOVERNANCE_COMMITMENTS = [
  'Set sound environmental objectives and targets.',
  'Install, maintain and operate facilities to comply with applicable environmental laws and other regulations.',
  'Minimise process waste and promote recovery and recycling of materials.',
  'Continually improve the awareness of the workforce.',
  'Deliver safe and high functional products, built on HACCP, ISO 22000, and BRCGS global standards.',
];

function GovernanceCommitmentsSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Our Commitment</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white leading-[1.15] tracking-tight m-0">
            Governance and commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GOVERNANCE_COMMITMENTS.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.05 }}
              className="flex items-start gap-4 p-4 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px]"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-[6px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <p className="font-body text-[14px] text-surface-600 dark:text-surface-400 leading-relaxed m-0">{point}</p>
            </motion.div>
          ))}
        </div>

        <InternalLink
          route="policy"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          View Policies and Commitments
        </InternalLink>
      </div>
    </div>
  );
}

export default function SustainabilityCommunityPage({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <PageWrapper
      seo={{
        title: 'Sustainability and Community | SKM Egg Products',
        description: "SKM Egg Products' commitment to sustainability and community welfare — clean energy, environmental policy, and the SKM Health and Mind Welfare Charity Trust (Sevai Maiyam).",
        keywords: 'SKM sustainability, SKM CSR, Sevai Maiyam, community development, wind energy, environmental policy, corporate social responsibility',
        canonical: 'https://www.skmegg.com/sustainability_and_community',
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page dark:bg-surface-950">

        {/* Section 1 — Sustainability hero */}
        <div className="w-full py-[70px] lg:py-[100px] border-b border-[#eee] dark:border-surface-800/40 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="mx-auto max-w-[820px] flex flex-col items-center gap-6"
          >
            <span className="section-label justify-center">Sustainability and Community</span>
            <h1 className="font-heading font-bold text-[36px] sm:text-[48px] lg:text-[54px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
              Sustainable &amp; Socially Responsible
            </h1>
            <p className="font-body text-[15px] sm:text-[16px] text-surface-500 dark:text-surface-400 leading-[28px] m-0 max-w-2xl">
              We adopt business strategies and activities that meet the needs of the enterprise and its stakeholders at present, while protecting, sustaining, and enhancing the human and natural resources needed in the future.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <button
                type="button"
                onClick={() => scrollToSectionId('sustainability-priorities')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                View Sustainability Priorities
              </button>

              <button
                type="button"
                disabled
                title="Coming soon"
                aria-disabled="true"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-surface-300 dark:border-surface-700 text-surface-400 dark:text-surface-600 font-heading font-bold text-[13px] uppercase tracking-[0.04em] cursor-not-allowed opacity-60"
              >
                Download Sustainability Information
              </button>
            </div>
          </motion.div>
        </div>

        {/* Section 2 — Environmental responsibility */}
        <EnvironmentalResponsibilitySection onPageChange={onPageChange} />

        {/* Section 3 — Responsible feed, farming and animal welfare */}
        <ResponsibleFarmingSection onPageChange={onPageChange} />

        {/* Section 4 — Community development */}
        <CommunityDevelopmentSection onPageChange={onPageChange} />

        {/* Section 5 — Performance indicators */}
        <PerformanceIndicatorsSection onPageChange={onPageChange} />

        {/* Section 6 — Governance and commitments */}
        <GovernanceCommitmentsSection onPageChange={onPageChange} />

      </div>
    </PageWrapper>
  );
}
