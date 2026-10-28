import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { startCloudTransition } from '../../components/common/CloudPageTransition';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import { fadeUp, EASE_PREMIUM } from '../../utils/motionTokens';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';
import supplyHeroImage from '../../assets/5. INFRASTRUCTURE/Manufacturing Supply/supply.webp';
import farmToPortImage from '../../assets/5. INFRASTRUCTURE/Manufacturing Supply/integrated-farm-to-port-complex.png';

// Manufacturing and Supply - new page, Section 1 (Capabilities hero) only,
// per this task's scope. Replaces the "Capabilities" dropdown in the navbar
// (previously: Capabilities Overview, Egg Processing Plant, Poultry Farm,
// Feed Mill, Laboratory, Our Journey) with a single link to this page.
//
// All 4 capacity statistics are real and already published elsewhere in
// the app (WhySKMPage.jsx infraCards, GlobalReachPage.jsx hero
// description) - reused verbatim here, not recalculated or invented:
// - 2M eggs processed per day (Egg Processing Plant, EU & USDA-compliant)
// - 2.4M layers housed across ISO 22000 certified integrated farms
// - 100% of feed ingredients screened for mycotoxins/pesticides/antibiotics
// - 30+ countries served via dedicated regional branches
//
// "Integrated operating model" describes the same real hatchery → feed
// mill → farm → processing → lab → dispatch chain already documented in
// journeyStages.js / the farm-to-product traceability sections - restated
// here as a one-line summary, not new content.
//
// Buttons: "Explore Our Facilities" routes to the real Capabilities
// Overview page (src/pages/WhySKM/WhySKMPage.jsx, route `why_skm`), which
// links out to each individual facility (Egg Processing Plant, Poultry
// Farm, Feed Mill, Laboratory) - the same real destinations the removed
// dropdown pointed to, just reached one click further in via a real hub
// rather than duplicated as a second facilities index. "Discuss Supply
// Requirements" routes to the real Contact Us page.
//
// Section 2 (Egg processing plant): all 7 requested facts are real,
// verbatim/derived from src/pages/Infra/sections/EggProcessingPlant.jsx —
// processing stages (egg breaking → pasteurisation → drying/filling →
// cold storage, the real processAreaImages sequence), separation lines
// (two dedicated yolk/albumen lines), pasteurisation (pre-pasteurisation +
// pasteurisation stages), spray drying (albumen/yolk dryers), liquid
// processing (liquid filling, cold room, frozen storage), automation
// (fully automated, climate-controlled, CIP system), hygiene zoning
// (red/white/neutral zone protocol). "View Processing Facilities" and
// "Request Facility Information" both route to the real Egg Processing
// Plant page - no separate technology-only or facility-info-only page
// exists, so both point to the one real source that covers each.
// Clickable regions over the farm-to-port hero image, as % of the image box
// (the box keeps the image's 1774x887 ratio, so these stay aligned at any width).
const ZOOM_DURATION = 1.6;
const HERO_IMAGE_RATIO = 1774 / 887;
const HERO_HOTSPOTS = [
  { route: 'feed_mill', label: 'Feed Mill', left: 66, top: 9, width: 30, height: 31 },
  { route: 'poultry_farm', label: 'Poultry Farm', left: 61, top: 40, width: 36, height: 25 },
  { route: 'egg_processing_plant', label: 'Egg Processing Plant', left: 53, top: 66, width: 43, height: 31 },
  { route: 'global_reach', label: 'Export & Dispatch', left: 2, top: 58, width: 44, height: 40 },
  { route: 'csr_sustainability', label: 'Biogas & Sustainability', left: 4, top: 35, width: 30, height: 22 },
];

const PROCESSING_CAPABILITIES = [
  {
    id: 'processing-stages',
    label: 'Processing stages',
    fact: 'Only QA cleared eggs are processed - egg breaking, pasteurisation, drying/filling, and cold storage - with a capacity of 2 million eggs per day.',
  },
  {
    id: 'separation-lines',
    label: 'Separation lines',
    fact: 'Two dedicated production lines - yolk and albumen - operate in a climate-controlled environment. A dedicated line for liquid products processing and distinguished blending facility for customised mixes preparations.',
  },
  {
    id: 'pasteurisation',
    label: 'Pasteurisation',
    fact: 'Pasteurisation process carried out to eliminate the pathogens and entire loop cleanliness is supported by an automated CIP system for validated cleaning.',
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
    id: 'hygiene-zoning',
    label: 'Hygiene zoning',
    fact: 'Strict zoning protocols, high risk and high care area separation, including colour-coded identification, dedicated tools for each zone, mandatory sanitation procedures, and routine air-quality monitoring, help prevent cross-contamination. Pathogen Environment Monitoring (PEM) is in place for ensuring Salmonella-free processing facility.',
  },
];

// Shared card treatment: soft hover elevation + refined border transition,
// applied uniformly across every capability/topic/packaging card on the page.
const CARD_INTERACTIVE = 'transition-[transform,box-shadow,border-color] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:shadow-[0_10px_28px_-14px_rgba(0,0,0,0.18)] hover:border-brand-600/30 focus-within:-translate-y-[3px] focus-within:shadow-[0_10px_28px_-14px_rgba(0,0,0,0.18)]';

// Shared button micro-interaction: 2px lift + controlled shadow + refined
// background transition, applied uniformly across every CTA on the page.
const BTN_TRANSITION = 'transition-[transform,box-shadow,background-color,border-color] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] active:translate-y-0 active:duration-100';
const BTN_PRIMARY = `inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 hover:shadow-[0_8px_20px_-8px_rgba(190,30,45,0.45)] text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] ${BTN_TRANSITION} focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2`;
const BTN_SECONDARY = `inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 hover:bg-brand-600/6 font-heading font-bold text-[13px] uppercase tracking-[0.04em] ${BTN_TRANSITION} focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2`;

function EggProcessingPlantSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="egg-processing-plant" className="w-full py-[60px] lg:py-[85px] bg-white">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Egg processing plant</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Egg Processing Plant
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
              className={`flex flex-col gap-3 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7] ${CARD_INTERACTIVE}`}
            >
              <h3 className="font-heading font-bold text-[16px] text-heading m-0">
                {cap.label}
              </h3>
              <p className="font-body text-[13.5px] text-surface-600 leading-[1.6] m-0">
                {cap.fact}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <InternalLink
            route="egg_processing_plant"
            onPageChange={onPageChange}
            className={BTN_PRIMARY}
          >
            View Processing Facilities
          </InternalLink>

          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className={BTN_SECONDARY}
          >
            Request Facility Information
          </InternalLink>
        </div>

      </div>
    </div>
  );
}

// Section 3 (Integrated poultry farms): 4 of 5 requested facts are real,
// verbatim/derived from src/pages/Infra/sections/PoultryFarm.jsx - farm
// network (2.4M layers, ISO 22000 certified integrated farms, 164M eggs
// annually), biosecurity (personnel/vehicle entry showers, zoned layouts,
// perimeter controls), welfare (balanced feed, sanitation protocols,
// on-site incinerator), egg collection controls (egg collecting conveyor
// and collection area, real gallery images). "Veterinary management" has
// no distinct documented procedure anywhere in the repo - the closest real
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
    label: 'Flock Health Management',
    fact: 'An attached laboratory routinely analyses water, tissues, and egg samples to ensure ongoing flock health, safety, and quality monitoring.',
  },
  {
    id: 'welfare',
    label: 'Welfare',
    fact: 'Balanced, nutritionally optimised feed, daily sanitation protocols, potable water management, and safe disposal systems - including an on-site incinerator - maintain high standards of animal welfare.',
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
    <div id="integrated-poultry-farms" className="w-full py-[60px] lg:py-[85px]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Farm Operations</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Integrated Poultry Farms
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
              className={`flex flex-col gap-3 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7] ${CARD_INTERACTIVE}`}
            >
              <h3 className="font-heading font-bold text-[16px] text-heading m-0">
                {cap.label}
              </h3>
              <p className="font-body text-[13.5px] text-surface-600 leading-[1.6] m-0">
                {cap.fact}
              </p>
            </motion.div>
          ))}
        </div>

        <InternalLink
          route="poultry_farm"
          onPageChange={onPageChange}
          className={`self-start ${BTN_PRIMARY}`}
        >
          Explore Poultry Operations
        </InternalLink>

      </div>
    </div>
  );
}

// Section 4 (Feed mill and raw-material control): connects feed screening
// directly to final-product consistency and residue management, using
// real facts from src/pages/Infra/sections/FeedMill.jsx - every raw
// material is tested for mycotoxins, pesticide residues, and antibiotic
// contaminants before use; lot-wise storage prevents cross-contamination
// and ensures full traceability from ingredient intake to finished feed;
// only verified, residue-free inputs are used in feed formulation, which
// is the real basis for consistent, residue-free final products.
// "View Feed-Control Process" routes to the real Feed Mill page.
function FeedMillSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="feed-mill-raw-material-control" className="w-full py-[60px] lg:py-[85px] bg-white">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-8">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Raw-Material Control</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Feed Mill and Raw-Material Control
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.5, delay: reduceMotion ? 0 : 0.1 }}
          className={`max-w-3xl p-7 rounded-[20px] border border-surface-200/70 bg-[#fdfbf7] ${CARD_INTERACTIVE}`}
        >
          <p className="font-body text-[15px] sm:text-[16px] text-surface-700 leading-[1.7] m-0">
            Every raw material entering the feed mill undergoes rigorous testing for mycotoxins, pesticide residues, and antibiotic contaminants before formulation. Strict lot-wise storage prevents cross-contamination and ensures full traceability from ingredient intake to finished feed - only verified, residue-free inputs reach the flock, which is the direct foundation for consistent, residue-free final egg products.
          </p>
        </motion.div>

        <InternalLink
          route="feed_mill"
          onPageChange={onPageChange}
          className={`self-start ${BTN_PRIMARY}`}
        >
          View Feed-Control Process
        </InternalLink>

      </div>
    </div>
  );
}

// Section 5 (Laboratory and release controls): connects the NABL-
// accredited laboratory directly to manufacturing decisions using real
// facts from src/pages/Infra/sections/LaboratoryAnalytical.jsx and
// QualityManagementSystem.jsx - routine testing and environmental
// monitoring confirm products are free from pathogens and microbial
// contamination prior to dispatch (i.e. before release), and the
// laboratory's residue/physicochemical/microbiological testing feeds
// directly into the same HACCP-driven release decisions documented for
// the wider QMS. "Explore Quality Testing" routes to the real Laboratory
// page.
function LaboratoryReleaseSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="laboratory-release-controls" className="w-full py-[60px] lg:py-[85px]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-8">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Laboratory and release controls</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Laboratory and Release Controls
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.5, delay: reduceMotion ? 0 : 0.1 }}
          className={`max-w-3xl p-7 rounded-[20px] border border-surface-200/70 bg-[#fdfbf7] ${CARD_INTERACTIVE}`}
        >
          <p className="font-body text-[15px] sm:text-[16px] text-surface-700 leading-[1.7] m-0">
            Our NABL-accredited (ISO/IEC 17025) laboratory, operational since 2006, runs physicochemical, microbiological, and residue testing on every batch - including GC-ECD / FID, HPLC, and LC-MS/MS screening.
          </p>
        </motion.div>

        <InternalLink
          route="quality_food_safety_traceability"
          onPageChange={onPageChange}
          className={`self-start ${BTN_PRIMARY}`}
        >
          Explore Quality Testing
        </InternalLink>

      </div>
    </div>
  );
}

// Section 6 (Packaging capabilities): the 4 real packaging formats
// documented in src/pages/Products/CustomizedPackagesPage.jsx
// `packagingData` - Bag in Box (Powder), Bag in Bag / Paper Bag (Powder),
// Bag (LDPE) (Liquid), Pallecon with Inner LDPE (bulk IBC, Liquid). No
// real per-destination suitability data exists anywhere in the repo (no
// documented mapping of packaging format to export market or
// application), so that dimension is omitted rather than invented - only
// the real format/type/SKU facts are shown. "Compare Packaging Options"
// and "Discuss Custom Packaging" both route to the real Customised
// Packages page, which is the one real destination covering all 4
// formats; a dedicated comparison tool doesn't exist separately.
//
// 5th card - Tetra Pack & Cubes: covers Speciality Products' 2 real
// consumer-format products, distinct from the 4 industrial formats above.
// "Tetra Pack" is verbatim from SpecialityEggLiquidPage.jsx (SEO
// description "tetra pack format" + its own asset filename "EGG LIQUIDS
// TETRA PACK"); "Cube" is the real Egg White Cube format
// (EggWhiteCubePage.jsx). SKUs are the real packagingOptions values from
// products.js (speciality_egg_liquids, egg_white_cube) - 250ml/500ml/1L
// and 100g/200g/500g, not invented.
const PACKAGING_FORMATS = [
  { id: 'bag-in-box', type: 'Powder', title: 'Bag in Box', subtitle: 'Corrugated Box', skus: ['25 Kg', '20 Kg', '10 Kg'] },
  { id: 'bag-in-bag', type: 'Powder', title: 'Bag in Bag', subtitle: 'Paper Bag', skus: ['20 Kg', '10 Kg'] },
  { id: 'liquid-ldpe', type: 'Liquid', title: 'Bag (LDPE)', subtitle: 'Low Density Polyethylene', skus: ['20 Kg', '10 Kg', '5 Kg'] },
  { id: 'pallecon', type: 'Bulk', title: 'Pallecon with Inner LDPE', subtitle: 'Bulk IBC Container', skus: ['1000 Kg'] },
  { id: 'tetra-pack-cubes', type: 'Speciality', title: 'Tetra Pack & Thermo pack', subtitle: 'Speciality Liquid Blends & Thermo pack', skus: ['1 L', '500 ML', '250 ML'] },
];

function PackagingCapabilitiesSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="packaging-capabilities" className="w-full py-[60px] lg:py-[85px] bg-white">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Packaging capabilities</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Packaging Capabilities
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
              className={`flex flex-col gap-2 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7] ${CARD_INTERACTIVE}`}
            >
              <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600">
                {pkg.type}
              </span>
              <h3 className="font-heading font-bold text-[16px] text-heading m-0">
                {pkg.title}
              </h3>
              <span className="font-body text-[12.5px] text-surface-500">
                {pkg.subtitle}
              </span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {pkg.skus.map((sku) => (
                  <span
                    key={sku}
                    className="font-body text-[11.5px] font-semibold text-surface-600 bg-white border border-surface-200/70 px-2.5 py-1 rounded-[6px]"
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
            route="customised_packages"
            onPageChange={onPageChange}
            className={BTN_PRIMARY}
          >
            Compare Packaging Options
          </InternalLink>

          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className={BTN_SECONDARY}
          >
            Discuss Custom Packaging
          </InternalLink>
        </div>

      </div>
    </div>
  );
}

// Section 7 (Dispatch and supply continuity): Cold-chain capability,
// Warehousing, and Regional support each have real, distinct facts
// (chilled 0–4°C / frozen ≤-18°C storage plus cold room/frozen storage at
// the plant; real warehousing language from all 3 branch pages; dedicated
// Japan/Europe/Russia branches). Export documentation, Supply planning,
// and Customer communication have no distinct documented procedure
// anywhere in the repo - each states the same real, general fact (30+
// countries served via dedicated regional branches coordinating import,
// warehousing, and compliance) rather than inventing a specific
// documentation or planning process that isn't real. "Discuss Export
// Supply" and "Contact Dispatch Team" both route to the real Contact Us
// page - no separate logistics-specific contact channel exists.
const LOGISTICS_TOPICS = [
  {
    id: 'export-documentation',
    label: 'Export documentation',
    fact: 'Our dedicated dispatch team efficiently manages export documentation and coordinates end-to-end supply chain operations to ensure seamless and timely deliveries to our global customers.',
  },
  {
    id: 'cold-chain-capability',
    label: 'Cold-chain capability',
    fact: 'Chilled storage (0°C to 4°C) and frozen storage (≤ −18°C) are maintained in dedicated temperature-controlled facilities at the processing plant, with continuous cold chain management ensuring product integrity, safety, and quality throughout storage, transportation, and final delivery.',
  },
  {
    id: 'warehousing',
    label: 'Warehousing',
    fact: 'SKM’s regional operations in Europe and Russia manage import activities, warehousing, sales, and distribution, ensuring efficient supply chain management and reliable product availability in their respective markets.',
  },
];

function LogisticsSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div id="logistics-supply-continuity" className="w-full py-[60px] lg:py-[85px] bg-white">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-10">

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6 }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="section-label">Dispatch and supply continuity</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Dispatch and Supply Continuity
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
              className={`flex flex-col gap-3 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7] ${CARD_INTERACTIVE}`}
            >
              <h3 className="font-heading font-bold text-[16px] text-heading m-0">
                {topic.label}
              </h3>
              <p className="font-body text-[13.5px] text-surface-600 leading-[1.6] m-0">
                {topic.fact}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className={BTN_PRIMARY}
          >
            Discuss Export Supply
          </InternalLink>

          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className={BTN_SECONDARY}
          >
            Contact Dispatch Team
          </InternalLink>
        </div>

      </div>
    </div>
  );
}

// Section 8 (Final CTA): "Submit Your Annual Requirement" routes to the
// real get-quote flow - no separate annual-volume submission form exists,
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
        <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading m-0 tracking-tight">
          We Are Ready to Fulfil Your Orders.
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <InternalLink
            route="get-quote"
            onPageChange={onPageChange}
            className={BTN_PRIMARY}
          >
            Submit Your Annual Requirement
          </InternalLink>
          <InternalLink
            route="brochure"
            onPageChange={onPageChange}
            className={BTN_SECONDARY}
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
  const heroRef = useRef(null);
  const [zoom, setZoom] = useState(null);

  // Hotspot click: zoom the screen into the clicked area, bring the cloud
  // gates in over the zoom, and only change route once they fully close.
  const handleHotspotClick = (event, hotspot) => {
    if (reduceMotion || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    event.stopPropagation();
    if (zoom || !heroRef.current) return;
    const hero = heroRef.current.getBoundingClientRect();
    const box = event.currentTarget.getBoundingClientRect();
    const ox = box.left + box.width / 2 - hero.left;
    const oy = box.top + box.height / 2 - hero.top;
    const scale = Math.min(4, Math.max(2.4, Math.min(hero.width / box.width, hero.height / box.height) * 0.85));
    // Pull the clicked point to the screen centre, clamped so the image edge never shows.
    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    const x = clamp(hero.width / 2 - ox, -(hero.width - ox) * (scale - 1), ox * (scale - 1));
    const y = clamp(hero.height / 2 - oy, -(hero.height - oy) * (scale - 1), oy * (scale - 1));
    setZoom({ ox, oy, scale, x, y });
    startCloudTransition({ delay: ZOOM_DURATION * 1000 * 0.45, onClosed: () => onPageChange(hotspot.route) });
  };

  const fadeProps = (delay = 0) => fadeUp(reduceMotion, { delay });

  return (
    <PageWrapper
      seo={{
        title: 'Manufacturing and Supply | SKM Egg Products',
        description: 'Production scale, supply consistency, packaging, and dispatch behind SKM Egg Products - 2 million eggs processed daily, 2.4 million layers, exporting to 30+ countries.',
        keywords: 'egg powder manufacturing capacity, egg processing plant scale, egg product supply chain, bulk egg powder supplier, egg product export capacity',
        canonical: 'https://www.skmegg.com/manufacturing_and_supply',
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page">

        {/* Section 1 - Integrated Farm-to-Port hero. Modelled on the Products
            hub hero: full-screen image revealed with a slow vertical clip, a
            "select to discover more" heading, and hover-only hotspot labels.
            The hotspot layer mirrors the image's object-fit: cover math, so
            the percentages line up at any viewport size. */}
        <div ref={heroRef} className="relative w-full min-h-screen overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={zoom ? { scale: zoom.scale, x: zoom.x, y: zoom.y } : { scale: 1, x: 0, y: 0 }}
            transition={{ duration: ZOOM_DURATION, ease: [0.5, 0, 0.2, 1] }}
            style={{ transformOrigin: zoom ? `${zoom.ox}px ${zoom.oy}px` : "50% 50%" }}
          >
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={reduceMotion ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: reduceMotion ? 0.01 : 1.2, ease: EASE_PREMIUM }}
          >
            <img
              src={farmToPortImage}
              alt="Integrated Farm-to-Port Agriculture Complex - farmland, feed mill, poultry houses, processing plant and container port"
              className="absolute inset-0 w-full h-full object-cover object-center select-none"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </motion.div>
          </motion.div>

          {/* Soft cream scrim behind the heading */}
          <div
            className="absolute inset-x-0 top-0 h-[220px] pointer-events-none bg-gradient-to-b from-[#fdfbf7]/70 to-transparent"
            aria-hidden="true"
          />

          {/* Thin gold line trailing the reveal's leading edge */}
          {!reduceMotion && (
            <motion.div
              className="absolute inset-x-0 h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, rgba(243,201,105,0) 0%, rgba(243,201,105,0.85) 50%, rgba(243,201,105,0) 100%)' }}
              initial={{ top: '100%', opacity: 1 }}
              animate={{ top: '0%', opacity: 0 }}
              transition={{
                top: { duration: 1.2, ease: EASE_PREMIUM },
                opacity: { duration: 1.5, delay: 0.3, ease: EASE_PREMIUM },
              }}
            />
          )}

          <motion.div
            className="absolute inset-x-0 top-[84px] sm:top-[28px] z-30 flex flex-col items-center px-4 text-center pointer-events-none"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: zoom ? 0 : 1, y: 0 }}
            transition={zoom ? { duration: 0.4 } : { duration: reduceMotion ? 0.01 : 0.9, delay: reduceMotion ? 0 : 0.75, ease: EASE_PREMIUM }}
          >
            <span className="font-body font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.28em] text-brand-600 mb-2">
              Our Facilities
            </span>
            <p
              className="m-0 font-heading font-extrabold text-[22px] sm:text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.01em] text-[#3b2a1e]"
              style={{ textShadow: '0 1px 18px rgba(255,248,238,0.85)' }}
            >
              Select a facility to <span className="text-brand-600">discover more.</span>
            </p>
            <span className="mt-3 block h-[2px] w-12 rounded-full bg-brand-600" aria-hidden="true" />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-20"
            animate={zoom ? { scale: zoom.scale, x: zoom.x, y: zoom.y } : { scale: 1, x: 0, y: 0 }}
            transition={{ duration: ZOOM_DURATION, ease: [0.5, 0, 0.2, 1] }}
            style={{ transformOrigin: zoom ? `${zoom.ox}px ${zoom.oy}px` : "50% 50%" }}
          >
          <div className="absolute inset-0 overflow-hidden" style={{ containerType: 'size' }}>
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: `max(100cqw, ${HERO_IMAGE_RATIO * 100}cqh)`, height: `max(100cqh, ${100 / HERO_IMAGE_RATIO}cqw)` }}
            >
              {HERO_HOTSPOTS.map((h) => (
                <InternalLink
                  key={h.route}
                  route={h.route}
                  onPageChange={onPageChange}
                  onClick={(e) => handleHotspotClick(e, h)}
                  aria-label={h.label}
                  className="group absolute rounded-[18px] focus:outline-none"
                  style={{ left: `${h.left}%`, top: `${h.top}%`, width: `${h.width}%`, height: `${h.height}%` }}
                >
                  <span className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full whitespace-nowrap rounded-full bg-brand-600 px-3 py-1 font-body font-semibold text-[12px] text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none" hidden={!!zoom}>
                    {h.label}
                  </span>
                </InternalLink>
              ))}
            </div>
          </div>
          </motion.div>
        </div>

        {/* Section 2 - Capabilities hero */}
        <div className="relative w-full pt-[40px] pb-[70px] sm:pt-[50px] lg:pt-[60px] lg:pb-[100px] overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-[0.18]"
            style={{ backgroundImage: `url(${supplyHeroImage})` }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">
            <motion.div {...fadeProps()} className="max-w-3xl mb-9 lg:mb-11">
              <span className="section-label">Capabilities</span>
              <h1 className="font-heading font-bold text-[36px] sm:text-[46px] lg:text-[52px] text-heading leading-[1.1] tracking-tight m-0 mt-3">
                Manufacturing and Supply
              </h1>
              <p className="font-body text-[16px] sm:text-[17px] text-surface-600 leading-[1.7] m-0 mt-4 max-w-2xl">
                International buyers need confidence not only in product quality, but also in production scale, supply consistency, packaging, and dispatch.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
              <motion.div {...fadeProps(0)} className={`flex flex-col gap-1.5 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7] ${CARD_INTERACTIVE}`}>
                <span className="font-heading font-bold text-[28px] text-brand-600 leading-none">2M</span>
                <span className="font-body text-[12.5px] font-medium uppercase tracking-wide text-surface-400">
                  Eggs processed daily
                </span>
              </motion.div>

              <motion.div {...fadeProps(0.05)} className={`flex flex-col gap-1.5 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7] ${CARD_INTERACTIVE}`}>
                <span className="font-heading font-bold text-[28px] text-brand-600 leading-none">2.4M</span>
                <span className="font-body text-[12.5px] font-medium uppercase tracking-wide text-surface-400">
                  Layers housed
                </span>
              </motion.div>

              <motion.div {...fadeProps(0.1)} className={`flex flex-col gap-1.5 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7] ${CARD_INTERACTIVE}`}>
                <span className="font-heading font-bold text-[28px] text-brand-600 leading-none">100%</span>
                <span className="font-body text-[12.5px] font-medium uppercase tracking-wide text-surface-400">
                  Residue-free feed ingredients
                </span>
              </motion.div>

              <motion.div {...fadeProps(0.15)} className={`flex flex-col gap-1.5 p-6 rounded-[18px] border border-surface-200/70 bg-[#fdfbf7] ${CARD_INTERACTIVE}`}>
                <span className="font-heading font-bold text-[28px] text-brand-600 leading-none">30+</span>
                <span className="font-body text-[12.5px] font-medium uppercase tracking-wide text-surface-400">
                  Countries served
                </span>
              </motion.div>
            </div>

            <motion.div {...fadeProps(0.2)} className="mt-9 lg:mt-11 max-w-3xl">
              <p className="font-body text-[15px] text-surface-600 leading-[1.7] m-0">
                An integrated operating model - Feed mill, poultry farm, processing plant, and laboratory - under one supply chain, with dedicated regional branches coordinating import, warehousing, and compliance close to your market.
              </p>
            </motion.div>

            <motion.div {...fadeProps(0.25)} className="flex flex-wrap items-center gap-4 mt-9 lg:mt-11">
              <InternalLink
                route="why_skm"
                onPageChange={onPageChange}
                className={BTN_PRIMARY}
              >
                Explore Our Facilities
              </InternalLink>

              <InternalLink
                route="contact-us"
                onPageChange={onPageChange}
                className={BTN_SECONDARY}
              >
                Discuss Supply Requirements
              </InternalLink>
            </motion.div>
          </div>
        </div>


        {/* Section 2 - Feed mill and raw-material control */}
        <FeedMillSection onPageChange={onPageChange} />
        <CurvedDivider bg="#fff" fill="#ececec" />

        {/* Section 3 - Integrated poultry farms */}
        <PoultryFarmsSection onPageChange={onPageChange} />
        <CurvedDivider bg="#ececec" fill="#fff" />

        {/* Section 4 - Egg processing plant */}
        <EggProcessingPlantSection onPageChange={onPageChange} />
        <CurvedDivider bg="#fff" fill="#ececec" />

        {/* Section 5 - Laboratory and release controls */}
        <LaboratoryReleaseSection onPageChange={onPageChange} />
        <CurvedDivider bg="#ececec" fill="#fff" />

        {/* Section 6 - Packaging capabilities */}
        <PackagingCapabilitiesSection onPageChange={onPageChange} />
        <CurvedDivider bg="#fff" fill="#fff" />

        {/* Section 7 - Dispatch and supply continuity */}
        <LogisticsSection onPageChange={onPageChange} />
        <CurvedDivider bg="#fff" fill="#ececec" />

        {/* Section 8 - Final CTA */}
        <FinalCTASection onPageChange={onPageChange} />

      </div>
    </PageWrapper>
  );
}
