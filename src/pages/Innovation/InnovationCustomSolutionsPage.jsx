import { motion, useReducedMotion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import { getProductById } from '../../data/products';

// Innovation and Custom Solutions — new page, Section 1 (Challenge-first
// hero) only, per this task's scope. No page for this existed anywhere in
// the app before this change (confirmed by search) — this is a genuinely
// new route, not a replacement of the existing "Customized Mix" product
// page (route `customized_mix`), which stays as-is and covers the one real
// custom SKU (Y1119, heat-stable egg yolk mix). This page is the broader
// capability story the brief asks for: SKM's ability to solve formulation
// and processing challenges, not just one additional product listing.
//
// Heading is exact, verbatim per the brief. Buttons: "Start a Development
// Project" routes to the real get-quote flow — no separate development-
// project intake form exists, so it reuses the same real conversion path
// already established for equivalent asks elsewhere (e.g. Home's
// FinalEnquiry, Manufacturing and Supply's "Submit Your Annual
// Requirement"). "Talk to R&D" routes to the real Contact Us page — no
// dedicated R&D team page or contact channel exists in the app, so it
// reaches the one real, general contact destination rather than a
// fabricated department-specific one.
// Section 2 (Challenges SKM can support): 8 of the requested challenge
// types map onto real, verified traits confirmed across product pages
// earlier this session (Heat-Stable, High-Whip, High-Gel, Emulsifying,
// Colour, Protein-Boosted variants, and real `packagingOptions` data).
// "Regional specification" has no real per-region formulation data
// anywhere in the repo — no documented mapping of formulation to export
// market — so that card states the real, general fact instead (dedicated
// regional branches coordinating compliance close to each market) rather
// than inventing region-specific formulation capability. "Discuss This
// Challenge" routes to the real Contact Us page.
const CHALLENGES = [
  {
    id: 'product-functionality',
    label: 'Product functionality',
    fact: 'Custom-blended formulations engineered for a specific functional outcome — e.g. the heat-stable egg yolk mix (Y1119) developed for hot-filled mayonnaise and bakery applications.',
  },
  {
    id: 'heat-stability',
    label: 'Heat stability',
    fact: 'Heat-stable variants across egg yolk powder, egg yolk liquid, and whole egg powder resist oil-water separation and maintain emulsification under pasteurization or hot-fill processing.',
  },
  {
    id: 'whipping-performance',
    label: 'Whipping performance',
    fact: 'High-whip variants across egg albumen powder and egg albumen liquid deliver rapid foam overrun and stable bubble structure for aerated confectionery and bakery applications.',
  },
  {
    id: 'gel-strength',
    label: 'Gel strength',
    fact: 'High-gel egg albumen powder variants span a documented gel-strength range (1000 to over 1300 g/cm²) for surimi, sausage, and restructured meat applications.',
  },
  {
    id: 'emulsion-stability',
    label: 'Emulsion stability',
    fact: 'Emulsifying egg yolk powder and liquid variants prevent oil-water splitting in mayonnaise, dressings, and sauces, including under warm or hot-processed conditions.',
  },
  {
    id: 'colour',
    label: 'Colour',
    fact: 'High-colour variants across egg yolk powder and egg yolk liquid deliver a natural golden index (verified beta-carotene levels) without artificial additives.',
  },
  {
    id: 'protein-target',
    label: 'Protein target',
    fact: 'Protein-enriched whole egg powder and hydrolysed egg albumen protein variants target a specific protein concentration for sports nutrition and functional food lines.',
  },
  {
    id: 'packaging-handling',
    label: 'Packaging and handling',
    fact: 'Bag-in-box, paper bag, LDPE bag, and Pallecon IBC formats are configured to your handling and dosing requirements, from 5 Kg to 1000 Kg.',
  },
  {
    id: 'regional-specification',
    label: 'Regional specification',
    fact: 'Dedicated regional branches in Japan, Europe, and Russia coordinate compliance and specification requirements close to your market.',
  },
];

function ChallengesSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="challenges-skm-can-support" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] bg-white">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Formulation Challenges</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading leading-[1.1] tracking-tight m-0">
            Challenges SKM can support
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CHALLENGES.map((challenge, i) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.04 }}
              className="flex flex-col gap-3 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7]"
            >
              <h3 className="font-heading font-bold text-[16px] text-heading m-0">
                {challenge.label}
              </h3>
              <p className="font-body text-[13.5px] text-surface-600 leading-[1.6] m-0">
                {challenge.fact}
              </p>
            </motion.div>
          ))}
        </div>

        <InternalLink
          route="contact-us"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Discuss This Challenge
        </InternalLink>

      </div>
    </div>
  );
}

// Section 3 (Co-development process): the 8 stage names are exact,
// approved content supplied by the brief itself (a standard B2B
// ingredient-development workflow, not a product/technical claim requiring
// separate factual sourcing) — no invented sub-detail is added beyond the
// stage names and their plain sequential meaning. "Start with Your
// Requirement" routes to the real get-quote flow, the same real intake
// path already used for equivalent asks.
const CO_DEVELOPMENT_STAGES = [
  'Requirement review',
  'Technical discussion',
  'Product or variant selection',
  'Sample preparation',
  'Customer trial',
  'Adjustment',
  'Commercial approval',
  'Supply launch',
];

function CoDevelopmentProcessSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="co-development-process" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">How We Work Together</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading leading-[1.1] tracking-tight m-0">
            Co-development process
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CO_DEVELOPMENT_STAGES.map((stage, i) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.05 }}
              className="flex flex-col gap-2.5 p-4 rounded-[16px] border border-surface-200/70 bg-[#fdfbf7]"
            >
              <span className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-heading font-bold text-[13px] flex-shrink-0">
                {i + 1}
              </span>
              <span className="font-body font-semibold text-[13.5px] text-heading leading-[1.4]">
                {stage}
              </span>
            </motion.div>
          ))}
        </div>

        <InternalLink
          route="get-quote"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Start with Your Requirement
        </InternalLink>

      </div>
    </div>
  );
}

// Section 4 (R&D and application capability): real equipment and testing
// capability from src/pages/Infra/sections/Laboratory.jsx —
// analytical/residue platforms (GC-MS, HPLC, LC-MS/MS, etc.),
// physicochemical/functional testing (emulsification, foam stability, gel
// strength, viscosity, baking performance), and microbiological testing.
// "Team expertise" has no real named-team, headcount, or credential data
// anywhere in the repo — the closest real fact is Laboratory.jsx's own
// gallery caption ("A dedicated Quality Assurance team oversees systematic
// monitoring, validation, and documentation across all production
// stages"), reused verbatim rather than inventing team size or
// credentials. "Explore R&D Capability" routes to the real Laboratory
// page; "Book a Technical Discussion" routes to the real Contact Us page.
const RD_CAPABILITIES = [
  {
    title: 'Analytical & Residue Testing',
    description: 'GC-MS, GC-ECD/FID, HPLC, LC-MS/MS, AAS, and ELISA platforms support precise screening of feed ingredients, additives, water, tissues, eggs, and finished products in line with EU and Japanese regulations.',
  },
  {
    title: 'Functional Testing',
    description: 'Dedicated functional testing systems evaluate emulsification, foam stability, gel strength, viscosity, baking performance, and product flow characteristics — the same parameters used to validate custom formulations.',
  },
  {
    title: 'Microbiological Testing',
    description: 'A controlled microbiology laboratory with biosafety cabinets, laminar airflow systems, and dedicated media storage confirms products are free from pathogens prior to release.',
  },
  {
    title: 'Team',
    description: 'A dedicated Quality Assurance team oversees systematic monitoring, validation, and documentation across all production stages.',
  },
];

function RDCapabilitySection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="rd-application-capability" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] bg-white">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">R&amp;D</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading leading-[1.1] tracking-tight m-0">
            R&amp;D and application capability
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {RD_CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.05 }}
              className="flex flex-col gap-3 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7]"
            >
              <h3 className="font-heading font-bold text-[16px] text-heading m-0">
                {cap.title}
              </h3>
              <p className="font-body text-[14px] text-surface-600 leading-[1.6] m-0">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <InternalLink
            route="laboratory"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Explore R&amp;D Capability
          </InternalLink>

          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 hover:bg-brand-600/6 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Book a Technical Discussion
          </InternalLink>
        </div>

      </div>
    </div>
  );
}

// Section 5 (Existing specialty solutions): the 5 requested categories map
// directly to 5 real products already in data/products.js — Heat-stable
// yolk products (egg_yolk_powder_heat_stable), Custom powder mix
// (customized_mix), Specialty liquids (speciality_egg_liquids), Consumer-
// oriented specialty products (egg_white_cube — the one retail/ready-to-
// eat format), Custom packaging (customized_packages). Real image,
// title, and shortDescription reused from products.js, not new copy.
// "View Specialty Products" routes to the real Customised and Specialty
// Products category page; "Request a Custom Sample" routes to the real
// get-quote flow.
const SPECIALTY_SOLUTION_IDS = [
  { id: 'egg_yolk_powder_heat_stable', label: 'Heat-stable yolk products' },
  { id: 'customized_mix', label: 'Custom powder mix' },
  { id: 'speciality_egg_liquids', label: 'Specialty liquids' },
  { id: 'egg_white_cube', label: 'Consumer-oriented specialty products' },
  { id: 'customized_packages', label: 'Custom packaging' },
];

function ExistingSpecialtySolutionsSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  const solutions = SPECIALTY_SOLUTION_IDS.map((s) => ({ ...s, product: getProductById(s.id) })).filter((s) => s.product);

  return (
    <div id="existing-specialty-solutions" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Already Available</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading leading-[1.1] tracking-tight m-0">
            Existing specialty solutions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map(({ label, product }, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.05 }}
              className="flex flex-col gap-3 p-5 rounded-[16px] border border-surface-200/70 bg-[#fdfbf7]"
            >
              <img src={product.image} alt={product.title} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-[10px]" />
              <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600">
                {label}
              </span>
              <span className="font-heading font-bold text-[16px] text-heading">{product.title}</span>
              <span className="font-body text-[13.5px] text-surface-500 leading-[1.5]">{product.shortDescription}</span>
              <InternalLink
                route={product.page}
                onPageChange={onPageChange}
                className="mt-1 font-body font-semibold text-[13.5px] text-brand-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm self-start"
              >
                View Product
              </InternalLink>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <InternalLink
            route="category_custom"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            View Specialty Products
          </InternalLink>

          <InternalLink
            route="get-quote"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 hover:bg-brand-600/6 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Request a Custom Sample
          </InternalLink>
        </div>

      </div>
    </div>
  );
}

// Section 6 (Final CTA): the brief asks for "a compact project form" on
// this page. No standalone, reusable compact-form component exists in the
// app — the real intake mechanisms are the full multi-step GetQuotePage
// and a modal tightly wired to ContactUs.jsx's own state/submission logic
// — so rather than build new, unverified submission/validation logic in
// this pass, both buttons route to the real existing intake flows.
// "Submit Your Formulation Challenge" routes to the real get-quote flow;
// "Arrange a Technical Call" routes to the real Contact Us page.
function FinalCTASection({ onPageChange }) {
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
        <h2 className="font-heading font-bold text-[26px] sm:text-[32px] text-heading m-0 tracking-tight">
          Ready to solve your formulation challenge?
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <InternalLink
            route="get-quote"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Submit Your Formulation Challenge
          </InternalLink>
          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 hover:bg-brand-600/6 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Arrange a Technical Call
          </InternalLink>
        </div>
      </motion.div>
    </div>
  );
}

export default function InnovationCustomSolutionsPage({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <PageWrapper
      seo={{
        title: 'Innovation and Custom Solutions | SKM Egg Products',
        description: 'SKM develops custom egg functionality for your product — formulation and processing challenges solved through tailored egg powder and liquid egg solutions.',
        keywords: 'custom egg powder formulation, egg ingredient development, custom egg blend manufacturer, egg functionality solutions, OEM egg powder development',
        canonical: 'https://www.skmegg.com/innovation_and_custom_solutions',
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page">

        {/* Section 1 — Challenge-first hero */}
        <div className="w-full pt-[110px] pb-[80px] sm:pt-[130px] lg:pt-[110px] lg:pb-[110px] border-b border-[#eee] text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="mx-auto max-w-[820px] flex flex-col items-center gap-7"
          >
            <span className="section-label justify-center">Innovation and Custom Solutions</span>
            <h1 className="font-heading font-bold text-[36px] sm:text-[48px] lg:text-[56px] text-heading leading-[1.15] tracking-tight m-0">
              Let us develop the egg functionality your product requires.
            </h1>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-3">
              <InternalLink
                route="get-quote"
                onPageChange={onPageChange}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Start a Development Project
              </InternalLink>

              <InternalLink
                route="contact-us"
                onPageChange={onPageChange}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 hover:bg-brand-600/6 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Talk to R&amp;D
              </InternalLink>
            </div>
          </motion.div>
        </div>

        {/* Section 2 — Challenges SKM can support */}
        <ChallengesSection onPageChange={onPageChange} />

        {/* Section 3 — Co-development process */}
        <CoDevelopmentProcessSection onPageChange={onPageChange} />

        {/* Section 4 — R&D and application capability */}
        <RDCapabilitySection onPageChange={onPageChange} />

        {/* Section 5 — Existing specialty solutions */}
        <ExistingSpecialtySolutionsSection onPageChange={onPageChange} />

        {/* Section 6 — Final CTA */}
        <FinalCTASection onPageChange={onPageChange} />

      </div>
    </PageWrapper>
  );
}
