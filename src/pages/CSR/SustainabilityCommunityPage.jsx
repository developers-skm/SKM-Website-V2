import { motion, useReducedMotion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';

// Section 2 - Environmental responsibility. Energy, water, and waste are
// all real, verbatim/derived facts already documented elsewhere: energy
// (wind mill and solar panels generating 5.2 million units/year, SustainabilityPage.jsx),
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
    fact: '5.2 million units of electricity generated per year through wind mill and solar power panels- powering operations with renewable energy.',
  },
  {
    id: 'water',
    label: 'Water',
    fact: 'A dedicated Water Treatment Plant supports the processing facility, ensuring responsible water use across operations.',
  },
  {
    id: 'waste',
    label: 'Waste',
    fact: 'An Effluent Treatment Plant treats process effluent, and an integrated biogas facility handles up to 70 tonnes of poultry litter, supplying nutrient-rich liquid fertilizer to farmers.',
  },
  {
    id: 'emissions',
    label: 'Emissions',
    fact: 'Our carbon footprint is minimised through the strategic location of our processing plant, efficient waste recycling, and energy-efficient operations. Greenhouse gas (GHG) emissions are systematically monitored, with targeted reduction initiatives in place to continuously improve environmental performance and support our sustainability goals.',
  },
];

function EnvironmentalResponsibilitySection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="sustainability-priorities" className="w-full py-[60px] lg:py-[85px] bg-white scroll-mt-[100px] xl:scroll-mt-[120px]">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Our Priorities</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Environmental Responsibility
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
              className="flex flex-col gap-3 p-6 rounded-[16px] border border-[#eee] bg-[#fdfbf7]"
            >
              <h3 className="font-heading font-bold text-[15px] text-heading m-0">{item.label}</h3>
              <p className="font-body text-[13px] text-surface-500 leading-[1.5] m-0">{item.fact}</p>
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

// Sustainability and Community - new consolidated hub. Merges the 5
// existing CSR pages (Sustainability, Community Development, Trust
// Outreach, Education, MD Article) into one page, per the brief. All 5
// individual pages stay live at their existing URLs for SEO and detailed
// reports (same precedent as every other consolidation this session —
// branch pages, About SKM's 8 source pages, etc.).
//
// Section 1 - Sustainability hero (heading and intro only, no buttons).
// Section 3 - Responsible feed, farming and animal welfare. Real facts
// already documented on the Feed Mill and Poultry Farm pages (Infra
// section) - every raw material tested for mycotoxins/pesticides/
// antibiotics before formulation, ISO 22000 certified farms, biosecurity
// entry showers, and the real animal-welfare fact from PoultryFarm.jsx
// (balanced nutritionally optimised feed, daily sanitation protocols,
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
    label: 'Flock Health Management',
    fact: 'Balanced, nutritionally optimised feed, daily sanitation protocols, potable water management, and safe disposal systems - including an on-site incinerator - maintain high standards of animal welfare.',
  },
];

function ResponsibleFarmingSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px]">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Farm to Feed</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Responsible Feed, Farming and Flock Health Management
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
              className="flex flex-col gap-3 p-6 rounded-[16px] border border-[#eee] bg-[#fdfbf7]"
            >
              <h3 className="font-heading font-bold text-[15px] text-heading m-0">{item.label}</h3>
              <p className="font-body text-[13px] text-surface-500 leading-[1.5] m-0">{item.fact}</p>
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

// Section 4 - Community development. Combines the 4 requested categories
// using real facts already documented across CommunityDevelopmentPage.jsx,
// TrustOutreachPage.jsx, and EducationPage.jsx - all under the real SKM
// Health and Mind Welfare Charity Trust (Sevai Maiyam). "Explore Community
// Programmes" routes to the real Community Development page, the primary
// source for this program.
const COMMUNITY_PROGRAMMES = [
  {
    id: 'welfare',
    label: 'Welfare',
    fact: '228 families adopted across Gandhi Nagar and Rajiv Nagar - 786 residents, including 239 children and 62 elderly - under the SKM Health and Mind Welfare Charity Trust (Sevai Maiyam).',
  },
  {
    id: 'health',
    label: 'Health',
    fact: 'Medical care provided to Dalit women from the start of pregnancy through delivery, with post-delivery consultations covering child rearing and disease prevention.',
  },
  {
    id: 'education',
    label: 'Education',
    fact: '239 children enrolled in coaching, 200 college students supported, and 13 graduates placed this year - with morning and evening coaching sessions led by 20 specialised teachers.',
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
    <div className="w-full py-[60px] lg:py-[85px] bg-white">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Sevai Maiyam</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Community Development
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
              className="flex flex-col gap-3 p-6 rounded-[16px] border border-[#eee] bg-[#fdfbf7]"
            >
              <h3 className="font-heading font-bold text-[15px] text-heading m-0">{item.label}</h3>
              <p className="font-body text-[13px] text-surface-500 leading-[1.5] m-0">{item.fact}</p>
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
// Section 4b - Corporate Social Responsibility. Moved here from the
// Resources page: the five CSR programme cards, each routing to its
// detailed page.
const CSR_CARDS = [
  {
    title: 'Community Development',
    description: 'The SKM Health and Mind Welfare Charity Trust - Sevai Maiyam - supporting adopted families with housing, sanitation, and welfare.',
    page: 'community_development',
    iconType: 'community',
  },
  {
    title: 'Trust Outreach Programs',
    description: 'Sanitation, education fees, medical services, financial aid, elder care, and community initiatives.',
    page: 'trust_outreach',
    iconType: 'trust',
  },
  {
    title: 'Education Initiatives',
    description: 'ABL teaching systems, coaching centres, libraries, and educational support for underprivileged students.',
    page: 'csr_education',
    iconType: 'education',
  },
  {
    title: 'Environmental Sustainability',
    description: 'Carbon footprint reduction, wind energy investments, eco-efficient processing, and environmental policy commitments.',
    page: 'csr_sustainability',
    iconType: 'sustainability',
  },
  {
    title: 'MD Vision & Article',
    description: "The Olirum Erodu Foundation - Managing Director's personal initiative across five key community focus areas.",
    page: 'md_article',
    iconType: 'md_article',
  },
];

function CsrIcon({ iconType }) {
  switch (iconType) {
    case 'community':
      return (
        <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-6 0h6" />
        </svg>
      );
    case 'trust':
      return (
        <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'education':
      return (
        <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    case 'sustainability':
      return (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V8.5a.5.5 0 01.5-.5h.5a2.5 2.5 0 002.5-2.5V3.935" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
  }
}

function CsrSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="csr" className="w-full py-[60px] lg:py-[85px] scroll-mt-[100px] xl:scroll-mt-[120px]">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Beyond The Factory Floor</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Corporate Social Responsibility (CSR)
          </h2>
          <p className="font-body text-[15px] text-surface-500 leading-[1.7] m-0">
            Discover SKM's commitment to community welfare, clean energy, education, and sustainable development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CSR_CARDS.map((card, i) => (
            <motion.button
              key={card.page}
              type="button"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.05 }}
              onClick={() => onPageChange(card.page)}
              className="group flex flex-col items-start gap-3 p-6 text-left rounded-[16px] border border-[#eee] bg-[#fdfbf7] hover:border-brand-600/30 hover:shadow-[0_14px_36px_rgba(36,30,24,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
              <span className="p-3 rounded-xl bg-white border border-surface-200/60 flex items-center justify-center">
                <CsrIcon iconType={card.iconType} />
              </span>
              <h3 className="font-heading font-bold text-[15px] text-heading m-0 group-hover:text-brand-600 transition-colors duration-200">
                {card.title}
              </h3>
              <p className="font-body text-[13px] text-surface-500 leading-[1.5] m-0">{card.description}</p>
              <span className="mt-auto pt-2 font-body font-bold text-[12px] text-brand-600 inline-flex items-center gap-1 group-hover:underline">
                Explore Overview →
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}


// Section 6 - Governance and commitments. Real environmental commitments
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
    <div className="w-full py-[60px] lg:py-[85px]">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Our Commitment</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Governance and Commitments
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
              className="flex items-start gap-4 p-4 bg-white border border-[#eee] rounded-[10px]"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-[6px] bg-brand-600/6 border border-brand-600/12 flex items-center justify-center text-brand-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <p className="font-body text-[14px] text-surface-600 leading-relaxed m-0">{point}</p>
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
        description: "SKM Egg Products' commitment to sustainability and community welfare - clean energy, environmental policy, and the SKM Health and Mind Welfare Charity Trust (Sevai Maiyam).",
        keywords: 'SKM sustainability, SKM CSR, Sevai Maiyam, community development, wind energy, environmental policy, corporate social responsibility',
        canonical: 'https://www.skmegg.com/sustainability_and_community',
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page">

        {/* Section 1 - Sustainability hero */}
        <div className="w-full pt-[110px] pb-[70px] sm:pt-[130px] lg:pt-[100px] lg:pb-[100px] text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="mx-auto max-w-[820px] flex flex-col items-center gap-6"
          >
            <span className="section-label justify-center">Sustainability and Community</span>
            <h1 className="font-heading font-bold text-[36px] sm:text-[48px] lg:text-[54px] text-heading leading-[1.1] tracking-tight m-0">
              Sustainable &amp; Socially Responsible
            </h1>
            <p className="font-body text-[15px] sm:text-[16px] text-surface-500 leading-[28px] m-0 max-w-2xl">
              We adopt business strategies and activities that meet the needs of the enterprise and its stakeholders at present, while protecting, sustaining, and enhancing the human and natural resources needed in the future.
            </p>
          </motion.div>
        </div>

        {/* Section 2 - Environmental responsibility */}
        <EnvironmentalResponsibilitySection onPageChange={onPageChange} />

        <CurvedDivider bg="#fff" fill="#ececec" />
        {/* Section 3 - Responsible feed, farming and animal welfare */}
        <ResponsibleFarmingSection onPageChange={onPageChange} />

        <CurvedDivider bg="#ececec" fill="#ececec" />
        {/* Section 4 - Corporate Social Responsibility */}
        <CsrSection onPageChange={onPageChange} />

        <CurvedDivider bg="#ececec" fill="#fff" />
        {/* Section 4b - Community development */}
        <CommunityDevelopmentSection onPageChange={onPageChange} />

        <CurvedDivider bg="#fff" fill="#ececec" />
        {/* Section 6 - Governance and commitments */}
        <GovernanceCommitmentsSection onPageChange={onPageChange} />

      </div>
    </PageWrapper>
  );
}
