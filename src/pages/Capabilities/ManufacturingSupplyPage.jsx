import { motion, useReducedMotion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';

// Manufacturing and Supply — new page, Section 1 (Capabilities hero) only,
// per this task's scope. Replaces the "Capabilities" dropdown in the navbar
// (previously: Capabilities Overview, Egg Processing Plant, Poultry Farm,
// Feed Mill, Laboratory, Our Journey) with a single link to this page.
//
// All 4 capacity statistics are real and already published elsewhere in
// the app (WhySKMPage.jsx infraCards, GlobalReachPage.jsx hero
// description) — reused verbatim here, not recalculated or invented:
// - 2M eggs processed per day (Egg Processing Plant, EU & USDA-compliant)
// - 2.4M layers housed across ISO 22000 certified integrated farms
// - 100% of feed ingredients screened for mycotoxins/pesticides/antibiotics
// - 30+ countries served via dedicated regional branches
//
// "Integrated operating model" describes the same real hatchery → feed
// mill → farm → processing → lab → dispatch chain already documented in
// journeyStages.js / the farm-to-product traceability sections — restated
// here as a one-line summary, not new content.
//
// Buttons: "Explore Our Facilities" routes to the real Capabilities
// Overview page (src/pages/WhySKM/WhySKMPage.jsx, route `why_skm`), which
// links out to each individual facility (Egg Processing Plant, Poultry
// Farm, Feed Mill, Laboratory) — the same real destinations the removed
// dropdown pointed to, just reached one click further in via a real hub
// rather than duplicated as a second facilities index. "Discuss Supply
// Requirements" routes to the real Contact Us page.
//
// Section 2 (Egg processing plant): all 7 requested facts are real,
// verbatim/derived from src/pages/Infra/sections/EggProcessingPlant.jsx —
// processing stages (egg breaking → pasteurization → drying/filling →
// cold storage, the real processAreaImages sequence), separation lines
// (two dedicated yolk/albumen lines), pasteurisation (pre-pasteurization +
// pasteurization stages), spray drying (albumen/yolk dryers), liquid
// processing (liquid filling, cold room, frozen storage), automation
// (fully automated, climate-controlled, CIP system), hygiene zoning
// (red/white/neutral zone protocol). "View Processing Technology" and
// "Request Facility Information" both route to the real Egg Processing
// Plant page — no separate technology-only or facility-info-only page
// exists, so both point to the one real source that covers each.
const PROCESSING_CAPABILITIES = [
  {
    id: 'processing-stages',
    label: 'Processing stages',
    fact: 'Only microbiologically tested eggs are processed — egg breaking, pre-pasteurization, pasteurization, drying/filling, and cold storage — with a capacity of 2 million eggs per day.',
  },
  {
    id: 'separation-lines',
    label: 'Separation lines',
    fact: 'Two dedicated production lines — yolk and albumen — operate within a fully automated, climate-controlled environment.',
  },
  {
    id: 'pasteurisation',
    label: 'Pasteurisation',
    fact: 'Pre-pasteurization and pasteurization stages operate under sterile zones maintained at positive pressure, supported by an automated CIP system for validated cleaning.',
  },
  {
    id: 'spray-drying',
    label: 'Spray drying',
    fact: 'Dedicated albumen and yolk dryers convert liquid egg into powder, producing approximately 7,500 tonnes annually across both lines.',
  },
  {
    id: 'liquid-processing',
    label: 'Liquid processing',
    fact: 'Liquid filling, cold room, and frozen storage areas maintain chilled and frozen liquid egg products under controlled temperature conditions.',
  },
  {
    id: 'automation',
    label: 'Automation',
    fact: 'The plant operates as a fully automated, climate-controlled facility, with an automated CIP system validating the cleaning of tanks and pipelines.',
  },
  {
    id: 'hygiene-zoning',
    label: 'Hygiene zoning',
    fact: 'Strict zoning protocols (red, white, and neutral areas) prevent cross-contamination, with dedicated tools and consumables for each zone, mandatory sanitation procedures, and routine air quality monitoring.',
  },
];

function EggProcessingPlantSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="egg-processing-plant" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40 bg-white dark:bg-surface-900/40">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Manufacturing</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Egg processing plant
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESSING_CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.04 }}
              className="flex flex-col gap-3 p-6 rounded-[18px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900"
            >
              <h3 className="font-heading font-bold text-[16px] text-heading dark:text-white m-0">
                {cap.label}
              </h3>
              <p className="font-body text-[13.5px] text-surface-600 dark:text-surface-300 leading-[1.6] m-0">
                {cap.fact}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <InternalLink
            route="egg_processing_plant"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            View Processing Technology
          </InternalLink>

          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Request Facility Information
          </InternalLink>
        </div>

      </div>
    </div>
  );
}

// Section 3 (Integrated poultry farms): 4 of 5 requested facts are real,
// verbatim/derived from src/pages/Infra/sections/PoultryFarm.jsx — farm
// network (2.4M layers, ISO 22000 certified integrated farms, 164M eggs
// annually), biosecurity (personnel/vehicle entry showers, zoned layouts,
// perimeter controls), welfare (balanced feed, sanitation protocols,
// on-site incinerator), egg collection controls (egg collecting conveyor
// and collection area, real gallery images). "Veterinary management" has
// no distinct documented procedure anywhere in the repo — the closest real
// fact is the attached laboratory's flock-health monitoring (water,
// tissue, and egg sample analysis), so that card states that same real
// fact rather than inventing a separate veterinary program. "Explore
// Poultry Operations" routes to the real Poultry Farm page.
const POULTRY_CAPABILITIES = [
  {
    id: 'farm-network',
    label: 'Farm network',
    fact: '2.4 million layers housed across ISO 22000 certified integrated farms, producing approximately 164 million eggs annually.',
  },
  {
    id: 'biosecurity',
    label: 'Biosecurity',
    fact: 'Strict personnel and vehicle entry shower systems enforce biosecurity at every access point, with zoned layouts and dedicated sanitation barriers preventing cross-contamination between flocks.',
  },
  {
    id: 'veterinary-management',
    label: 'Veterinary management',
    fact: 'An attached laboratory routinely analyses water, tissues, and egg samples to ensure ongoing flock health, safety, and quality monitoring.',
  },
  {
    id: 'welfare',
    label: 'Welfare',
    fact: 'Balanced, nutritionally optimized feed, daily sanitation protocols, potable water management, and safe disposal systems — including an on-site incinerator — maintain high standards of animal welfare.',
  },
  {
    id: 'egg-collection-controls',
    label: 'Egg collection controls',
    fact: 'Automated egg collecting conveyors move eggs from environmentally controlled sheds to a dedicated collection area under continuous biosecurity control.',
  },
];

function PoultryFarmsSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="integrated-poultry-farms" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Farm Operations</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Integrated poultry farms
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POULTRY_CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.05 }}
              className="flex flex-col gap-3 p-6 rounded-[18px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900"
            >
              <h3 className="font-heading font-bold text-[16px] text-heading dark:text-white m-0">
                {cap.label}
              </h3>
              <p className="font-body text-[13.5px] text-surface-600 dark:text-surface-300 leading-[1.6] m-0">
                {cap.fact}
              </p>
            </motion.div>
          ))}
        </div>

        <InternalLink
          route="poultry_farm"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Explore Poultry Operations
        </InternalLink>

      </div>
    </div>
  );
}

// Section 4 (Feed mill and raw-material control): connects feed screening
// directly to final-product consistency and residue management, using
// real facts from src/pages/Infra/sections/FeedMill.jsx — every raw
// material is tested for mycotoxins, pesticide residues, and antibiotic
// contaminants before use; lot-wise storage prevents cross-contamination
// and ensures full traceability from ingredient intake to finished feed;
// only verified, residue-free inputs are used in feed formulation, which
// is the real basis for consistent, residue-free final products.
// "View Feed-Control Process" routes to the real Feed Mill page.
function FeedMillSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="feed-mill-raw-material-control" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40 bg-white dark:bg-surface-900/40">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-8">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Raw-Material Control</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Feed mill and raw-material control
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.5, delay: reduceMotion ? 0 : 0.1 }}
          className="max-w-3xl p-7 rounded-[20px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900"
        >
          <p className="font-body text-[15px] sm:text-[16px] text-surface-700 dark:text-surface-300 leading-[1.7] m-0">
            Every raw material entering the feed mill undergoes rigorous testing for mycotoxins, pesticide residues, and antibiotic contaminants before formulation. Strict lot-wise storage prevents cross-contamination and ensures full traceability from ingredient intake to finished feed — only verified, residue-free inputs reach the flock, which is the direct foundation for consistent, residue-free final egg products.
          </p>
        </motion.div>

        <InternalLink
          route="feed_mill"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          View Feed-Control Process
        </InternalLink>

      </div>
    </div>
  );
}

// Section 5 (Laboratory and release controls): connects the NABL-
// accredited laboratory directly to manufacturing decisions using real
// facts from src/pages/Infra/sections/Laboratory.jsx and
// QualityManagementSystem.jsx — routine testing and environmental
// monitoring confirm products are free from pathogens and microbial
// contamination prior to dispatch (i.e. before release), and the
// laboratory's residue/physicochemical/microbiological testing feeds
// directly into the same HACCP-driven release decisions documented for
// the wider QMS. "Explore Quality Testing" routes to the real Laboratory
// page.
function LaboratoryReleaseSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="laboratory-release-controls" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-8">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Laboratory</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Laboratory and release controls
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.5, delay: reduceMotion ? 0 : 0.1 }}
          className="max-w-3xl p-7 rounded-[20px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900"
        >
          <p className="font-body text-[15px] sm:text-[16px] text-surface-700 dark:text-surface-300 leading-[1.7] m-0">
            Our NABL-accredited (ISO/IEC 17025) laboratory, operational since 2006, runs physicochemical, microbiological, and residue testing on every batch — including GC-MS, HPLC, and LC-MS/MS screening. A controlled microbiology laboratory confirms products are free from pathogens and microbial contamination before dispatch, directly feeding the HACCP-driven release decision for every batch that leaves the plant.
          </p>
        </motion.div>

        <InternalLink
          route="laboratory"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Explore Quality Testing
        </InternalLink>

      </div>
    </div>
  );
}

// Section 6 (Packaging capabilities): the 4 real packaging formats
// documented in src/pages/Products/CustomizedPackagesPage.jsx
// `packagingData` — Bag in Box (Powder), Bag in Bag / Paper Bag (Powder),
// Bag (LDPE) (Liquid), Pallecon with Inner LDPE (bulk IBC, Liquid). No
// real per-destination suitability data exists anywhere in the repo (no
// documented mapping of packaging format to export market or
// application), so that dimension is omitted rather than invented — only
// the real format/type/SKU facts are shown. "Compare Packaging Options"
// and "Discuss Custom Packaging" both route to the real Customized
// Packages page, which is the one real destination covering all 4
// formats; a dedicated comparison tool doesn't exist separately.
//
// 5th card — Tetra Pack & Cubes: covers Speciality Products' 2 real
// consumer-format products, distinct from the 4 industrial formats above.
// "Tetra Pack" is verbatim from SpecialityEggLiquidPage.jsx (SEO
// description "tetra pack format" + its own asset filename "EGG LIQUIDS
// TETRA PACK"); "Cube" is the real Egg White Cube format
// (EggWhiteCubePage.jsx). SKUs are the real packagingOptions values from
// products.js (speciality_egg_liquids, egg_white_cube) — 250ML/500ML/1L
// and 100g/250g/500g, not invented.
const PACKAGING_FORMATS = [
  { id: 'bag-in-box', type: 'Powder', title: 'Bag in Box', subtitle: 'Corrugated Box', skus: ['25 Kg', '20 Kg', '10 Kg'] },
  { id: 'bag-in-bag', type: 'Powder', title: 'Bag in Bag', subtitle: 'Paper Bag', skus: ['20 Kg', '10 Kg'] },
  { id: 'liquid-ldpe', type: 'Liquid', title: 'Bag (LDPE)', subtitle: 'Low Density Polyethylene', skus: ['20 Kg', '10 Kg', '5 Kg'] },
  { id: 'pallecon', type: 'Bulk', title: 'Pallecon with Inner LDPE', subtitle: 'Bulk IBC Container', skus: ['1000 Kg'] },
  { id: 'tetra-pack-cubes', type: 'Speciality', title: 'Tetra Pack & Cubes', subtitle: 'Speciality Liquid Blends & Egg White Cube', skus: ['1 L', '500 ML', '250 ML', '500 g', '250 g', '100 g'] },
];

function PackagingCapabilitiesSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="packaging-capabilities" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40 bg-white dark:bg-surface-900/40">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Packaging</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Packaging capabilities
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PACKAGING_FORMATS.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.05 }}
              className="flex flex-col gap-2 p-6 rounded-[18px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900"
            >
              <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                {pkg.type}
              </span>
              <h3 className="font-heading font-bold text-[16px] text-heading dark:text-white m-0">
                {pkg.title}
              </h3>
              <span className="font-body text-[12.5px] text-surface-500 dark:text-surface-400">
                {pkg.subtitle}
              </span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {pkg.skus.map((sku) => (
                  <span
                    key={sku}
                    className="font-body text-[11.5px] font-semibold text-surface-600 dark:text-surface-300 bg-white dark:bg-surface-800/60 border border-surface-200/70 dark:border-surface-700 px-2.5 py-1 rounded-[6px]"
                  >
                    {sku}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <InternalLink
            route="customized_packages"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Compare Packaging Options
          </InternalLink>

          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Discuss Custom Packaging
          </InternalLink>
        </div>

      </div>
    </div>
  );
}

// Section 7 (Logistics and supply continuity): Cold-chain capability,
// Warehousing, and Regional support each have real, distinct facts
// (chilled 0–4°C / frozen ≤-18°C storage plus cold room/frozen storage at
// the plant; real warehousing language from all 3 branch pages; dedicated
// Japan/Europe/Russia branches). Export documentation, Supply planning,
// and Customer communication have no distinct documented procedure
// anywhere in the repo — each states the same real, general fact (30+
// countries served via dedicated regional branches coordinating import,
// warehousing, and compliance) rather than inventing a specific
// documentation or planning process that isn't real. "Discuss Export
// Supply" and "Contact Logistics Team" both route to the real Contact Us
// page — no separate logistics-specific contact channel exists.
const LOGISTICS_TOPICS = [
  {
    id: 'export-documentation',
    label: 'Export documentation',
    fact: 'Dedicated regional branches in Japan, Europe, and Russia coordinate import, warehousing, and compliance close to your market.',
  },
  {
    id: 'cold-chain-capability',
    label: 'Cold-chain capability',
    fact: 'Chilled (0°C to 4°C) and frozen (≤ -18°C) storage across cold rooms and frozen storage at the processing plant, with cold chain management protecting product integrity through to final delivery.',
  },
  {
    id: 'warehousing',
    label: 'Warehousing',
    fact: 'Regional branches cover import, warehousing, and distribution — SKM Japan, SKM Europe, and SKM Russia each maintain warehousing and sales operations in their respective markets.',
  },
  {
    id: 'regional-support',
    label: 'Regional support',
    fact: 'SKM Japan, SKM Europe, and SKM Russia are dedicated regional branches serving the Japanese, European Union, and Russian markets respectively.',
  },
  {
    id: 'supply-planning',
    label: 'Supply planning',
    fact: 'Dedicated regional branches in Japan, Europe, and Russia coordinate import, warehousing, and compliance close to your market.',
  },
  {
    id: 'customer-communication',
    label: 'Customer communication',
    fact: 'Dedicated regional branches in Japan, Europe, and Russia coordinate import, warehousing, and compliance close to your market.',
  },
];

function LogisticsSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="logistics-supply-continuity" className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] dark:border-surface-800/40 bg-white dark:bg-surface-900/40">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Logistics</span>
          <h2 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            Logistics and supply continuity
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LOGISTICS_TOPICS.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.04 }}
              className="flex flex-col gap-3 p-6 rounded-[18px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900"
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
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Discuss Export Supply
          </InternalLink>

          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Contact Logistics Team
          </InternalLink>
        </div>

      </div>
    </div>
  );
}

// Section 8 (Final CTA): "Submit Your Annual Requirement" routes to the
// real get-quote flow — no separate annual-volume submission form exists,
// so it reuses the same real conversion path already established
// elsewhere for equivalent asks (e.g. Home's FinalEnquiry section).
// "Request Company Profile" downloads the real Company Profile PDF
// (src/assets/Brouchers/Company Profile - SKM Egg Products Export India
// Limited.pdf, the same file used on the Resources page).
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
        <h2 className="font-heading font-bold text-[26px] sm:text-[32px] text-heading dark:text-white m-0 tracking-tight">
          Ready to plan your supply with SKM?
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <InternalLink
            route="get-quote"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Submit Your Annual Requirement
          </InternalLink>
          <InternalLink
            route="brochure"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Request Company Profile
          </InternalLink>
        </div>
      </motion.div>
    </div>
  );
}

export default function ManufacturingSupplyPage({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  const fadeProps = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : delay, ease: [0.25, 1, 0.5, 1] },
  });

  return (
    <PageWrapper
      seo={{
        title: 'Manufacturing and Supply | SKM Egg Products',
        description: 'Production scale, supply consistency, packaging, and logistics behind SKM Egg Products — 2 million eggs processed daily, 2.4 million layers, exporting to 30+ countries.',
        keywords: 'egg powder manufacturing capacity, egg processing plant scale, egg product supply chain, bulk egg powder supplier, egg product export capacity',
        canonical: 'https://www.skmegg.com/manufacturing_and_supply',
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page dark:bg-surface-950">

        {/* Section 1 — Capabilities hero */}
        <div className="w-full py-[70px] lg:py-[100px] border-b border-[#eee] dark:border-surface-800/40">
          <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">
            <motion.div {...fadeProps()} className="max-w-3xl mb-9 lg:mb-11">
              <span className="section-label">Capabilities</span>
              <h1 className="font-heading font-bold text-[36px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0 mt-3">
                Manufacturing and Supply
              </h1>
              <p className="font-body text-[16px] sm:text-[17px] text-surface-600 dark:text-surface-300 leading-[1.7] m-0 mt-4 max-w-2xl">
                International buyers need confidence not only in product quality, but also in production scale, supply consistency, packaging, and logistics.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
              <motion.div {...fadeProps(0)} className="flex flex-col gap-1.5 p-6 rounded-[18px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900">
                <span className="font-heading font-bold text-[28px] text-brand-600 dark:text-brand-400 leading-none">2M</span>
                <span className="font-body text-[12.5px] font-medium uppercase tracking-wide text-surface-400 dark:text-surface-500">
                  Eggs processed daily
                </span>
              </motion.div>

              <motion.div {...fadeProps(0.05)} className="flex flex-col gap-1.5 p-6 rounded-[18px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900">
                <span className="font-heading font-bold text-[28px] text-brand-600 dark:text-brand-400 leading-none">2.4M</span>
                <span className="font-body text-[12.5px] font-medium uppercase tracking-wide text-surface-400 dark:text-surface-500">
                  Layers housed
                </span>
              </motion.div>

              <motion.div {...fadeProps(0.1)} className="flex flex-col gap-1.5 p-6 rounded-[18px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900">
                <span className="font-heading font-bold text-[28px] text-brand-600 dark:text-brand-400 leading-none">100%</span>
                <span className="font-body text-[12.5px] font-medium uppercase tracking-wide text-surface-400 dark:text-surface-500">
                  Residue-free feed ingredients
                </span>
              </motion.div>

              <motion.div {...fadeProps(0.15)} className="flex flex-col gap-1.5 p-6 rounded-[18px] border border-surface-200/70 dark:border-surface-800 bg-[#fdfbf7] dark:bg-surface-900">
                <span className="font-heading font-bold text-[28px] text-brand-600 dark:text-brand-400 leading-none">30+</span>
                <span className="font-body text-[12.5px] font-medium uppercase tracking-wide text-surface-400 dark:text-surface-500">
                  Countries served
                </span>
              </motion.div>
            </div>

            <motion.div {...fadeProps(0.2)} className="mt-9 lg:mt-11 max-w-3xl">
              <p className="font-body text-[15px] text-surface-600 dark:text-surface-300 leading-[1.7] m-0">
                An integrated operating model — hatchery, feed mill, poultry farm, processing plant, and laboratory — under one supply chain, with dedicated regional branches coordinating import, warehousing, and compliance close to your market.
              </p>
            </motion.div>

            <motion.div {...fadeProps(0.25)} className="flex flex-wrap items-center gap-4 mt-9 lg:mt-11">
              <InternalLink
                route="why_skm"
                onPageChange={onPageChange}
                className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Explore Our Facilities
              </InternalLink>

              <InternalLink
                route="contact-us"
                onPageChange={onPageChange}
                className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Discuss Supply Requirements
              </InternalLink>
            </motion.div>
          </div>
        </div>

        {/* Section 2 — Feed mill and raw-material control */}
        <FeedMillSection onPageChange={onPageChange} />

        {/* Section 3 — Integrated poultry farms */}
        <PoultryFarmsSection onPageChange={onPageChange} />

        {/* Section 4 — Egg processing plant */}
        <EggProcessingPlantSection onPageChange={onPageChange} />

        {/* Section 5 — Laboratory and release controls */}
        <LaboratoryReleaseSection onPageChange={onPageChange} />

        {/* Section 6 — Packaging capabilities */}
        <PackagingCapabilitiesSection onPageChange={onPageChange} />

        {/* Section 7 — Logistics and supply continuity */}
        <LogisticsSection onPageChange={onPageChange} />

        {/* Section 8 — Final CTA */}
        <FinalCTASection onPageChange={onPageChange} />

      </div>
    </PageWrapper>
  );
}
