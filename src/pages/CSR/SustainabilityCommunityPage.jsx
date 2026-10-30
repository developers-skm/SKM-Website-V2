import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';
import SevaiMaiyam2 from '../../assets/trust-images/sevai-maiyam-2.webp';
import Samynathapuram from '../../assets/trust-images/samynathapuram.webp';
import EducationCultural from '../../assets/trust-images/education-cultural.webp';
import EducationPdc from '../../assets/trust-images/education-pdc.webp';
import EducationCoachingCentre from '../../assets/trust-images/education-coaching-centre.webp';
import EducationCoachingStudents from '../../assets/trust-images/education-coaching-students.webp';
import TrustOutreachWaste from '../../assets/trust-images/trust-outreach-waste-collection.webp';
import EducationExtra from '../../assets/trust-images/education-extra.webp';
import Trust2 from '../../assets/trust-images/trust-2.webp';
import Trust3 from '../../assets/trust-images/trust-3.webp';
import Trust4 from '../../assets/trust-images/trust-4.webp';
import Trust5 from '../../assets/trust-images/trust-5.webp';
import CarbonFootprint from '../../assets/home/carbon-footprint.webp';
import OefCommunityActivity from '../../assets/trust-images/oef-community-activity.webp';

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

// Section 4 - Corporate Social Responsibility. Moved here from the
// Resources page: the five CSR programme cards, each routing to its
// detailed page.
const CSR_CARDS = [
  {
    title: 'Community Development',
    page: 'community_development',
    images: [
      { src: SevaiMaiyam2, alt: 'Sevai Maiyam community welfare centre' },
      { src: Samynathapuram, alt: 'Community families supported by the SKM Trust' },
    ],
    points: [
      'Established in 1988, the SKM Health and Mind Welfare Charity Trust is dedicated to uplifting underprivileged communities through education, healthcare, and social welfare initiatives.',
      'Established in 1999, Sevai Maiyam serves as a dedicated community welfare centre, providing essential services and opportunities for holistic social development.',
      'Supporting families in Gandhi Nagar and Rajiv Nagar through integrated initiatives focused on education, healthcare, sanitation, and improved living standards.',
      'Supporting expectant mothers through prenatal and postnatal healthcare, medical consultations and guidance on child health and disease prevention.',
    ],
  },
  {
    title: 'Education',
    page: 'csr_education',
    images: [
      { src: EducationCoachingCentre, alt: 'Coaching centre' },
      { src: EducationCoachingStudents, alt: 'Students at coaching sessions' },
      { src: EducationPdc, alt: 'Computer and PDC classes' },
      { src: EducationCultural, alt: 'Cultural education activities' },
      { src: EducationExtra, alt: 'Children playing and taking part in activities on the trust campus' },
    ],
    points: [
      'Providing free educational support from the age of three through higher education, empowering children to pursue academic achievement and brighter futures.',
      'Removing financial barriers to education by providing school fees, textbooks, uniforms, and essential learning materials to children from disadvantaged families.',
      'Offering structured academic coaching, English language development, and computer education through qualified teachers to enhance learning and future opportunities.',
      'Nurturing young minds through activity-based learning, value-based education, personality development, yoga, meditation, music, and cultural activities.',
      'Supporting students in achieving academic success, completing higher education, and progressing towards meaningful employment and financial independence.',
    ],
  },
  {
    title: 'Trust Outreach',
    page: 'trust_outreach',
    images: [
      { src: TrustOutreachWaste, alt: 'SKM community waste collection in the village street' },
      { src: Trust2, alt: 'Community healthcare support' },
      { src: Trust3, alt: 'Community facilities' },
      { src: Trust4, alt: 'Elder care and welfare' },
      { src: Trust5, alt: 'Neighbourhood sanitation initiatives' },
    ],
    points: [
      'Developing and maintaining essential community facilities, including healthcare centres, educational facilities, hygienic kitchens, dining halls, and wellness spaces.',
      'Extending assistance to families during important life events and challenging circumstances through financial support, essential services, and community welfare initiatives.',
      'Providing free medical consultations, paediatric healthcare, eye examinations, and essential medical support to improve community health and well-being.',
      'Ensuring dignity and well-being for senior citizens through nutritious meals, healthcare assistance, essential supplies, clothing, and personal care services.',
      'Promoting healthier living environments through household sanitation facilities, drainage systems, waste management, tree planting, and neighbourhood cleanliness initiatives.',
    ],
  },
];

const CSR_FOCUS_AREAS = ['Education', 'Community Development', 'Trust Outreach', 'Health'];

const CSR_SLIDER_IMAGES = CSR_CARDS.flatMap((card) => card.images.slice(0, 2));

const CSR_SUMMARY_CARDS = [
  {
    title: 'Environmental Sustainability',
    description: 'Carbon footprint reduction, wind energy investments, eco-efficient processing, and environmental policy commitments.',
    page: 'csr_sustainability',
    image: CarbonFootprint,
    alt: 'SKM biogas dome supporting a lower carbon footprint',
  },
  {
    title: 'MD Vision & Article',
    description: "The Olirum Erodu Foundation - Managing Director's personal initiative across five key community focus areas.",
    page: 'md_article',
    image: OefCommunityActivity,
    alt: 'Olirum Erodu Foundation community activity',
  },
];

const CSR_SLIDE_INTERVAL_MS = 4500;

function CsrImageSlider({ images, offset, reduceMotion }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || images.length < 2) return undefined;
    let timer;
    const start = setTimeout(() => {
      timer = setInterval(() => setIndex((i) => (i + 1) % images.length), CSR_SLIDE_INTERVAL_MS);
    }, offset);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [images.length, offset, reduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={images[index].src}
          alt={images[index].alt}
          loading="lazy"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.9, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((img, i) => (
            <button
              key={img.alt}
              type="button"
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/80'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
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

        <motion.article
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.4 }}
          className="flex flex-col lg:flex-row overflow-hidden rounded-[16px] border border-[#eee] bg-[#fdfbf7] hover:border-brand-600/30 hover:shadow-[0_14px_36px_rgba(36,30,24,0.1)] transition-all duration-300"
        >
          <div className="flex flex-col justify-center gap-6 p-6 sm:p-8 lg:p-10 lg:w-[50%]">
            <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading m-0 leading-tight">
              Our CSR Focus Areas
            </h3>
            <ul className="flex flex-col m-0 p-0 list-none">
              {CSR_FOCUS_AREAS.map((title) => (
                <li key={title} className="flex items-center gap-3 py-4 border-b border-[#eee] last:border-b-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600 shrink-0" aria-hidden="true" />
                  <span className="font-heading font-bold text-[17px] sm:text-[19px] text-heading">{title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative w-full h-[240px] sm:h-[320px] lg:h-auto lg:min-h-[380px] lg:flex-1">
            <CsrImageSlider images={CSR_SLIDER_IMAGES} offset={0} reduceMotion={reduceMotion} />
          </div>
        </motion.article>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CSR_SUMMARY_CARDS.map((card, i) => (
            <motion.article
              key={card.page}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.08 }}
              className="group flex flex-col overflow-hidden rounded-[16px] border border-[#eee] bg-[#fdfbf7] hover:border-brand-600/30 hover:shadow-[0_14px_36px_rgba(36,30,24,0.1)] transition-all duration-300"
            >
              <div className="relative w-full h-[220px] sm:h-[260px] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 gap-3 p-6 sm:p-8">
                <h3 className="font-heading font-bold text-[20px] sm:text-[24px] text-heading m-0 leading-tight">
                  {card.title}
                </h3>
                <p className="font-body text-[14px] sm:text-[15px] text-surface-500 leading-[1.6] m-0">{card.description}</p>
                <button
                  type="button"
                  onClick={() => onPageChange(card.page)}
                  className="mt-auto pt-2 self-start font-body font-bold text-[13px] text-brand-600 inline-flex items-center gap-1 hover:underline cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded"
                >
                  Explore Overview →
                </button>
              </div>
            </motion.article>
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

        <CurvedDivider bg="#ececec" fill="#ececec" />
        {/* Section 6 - Governance and commitments */}
        <GovernanceCommitmentsSection onPageChange={onPageChange} />

      </div>
    </PageWrapper>
  );
}
