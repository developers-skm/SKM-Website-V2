// Section 5 (Home) — Farm-to-product journey. 8 stages, a data shape that
// does not exist anywhere else in the repo (the shared journeyStages.js has
// 6 differently-named stages, reused by HomeJourney's prior version, the
// full Journey page, and TraceWidget — this file's own stage shape is not
// derived from it). The two files do share a few underlying production
// numbers (layers housed, eggs/year, eggs/day) — those are pulled from
// ./productionFacts.js so they can't drift apart; everything else below is
// an exact sentence quoted directly from the named source file/component,
// not paraphrased or invented. Source is cited per stage for audit purposes.

import FeedMillLabImg from '../assets/5. INFRASTRUCTURE/Feed mill/Feed mill aerial view.webp';
import PoultryFarmImg from '../assets/5. INFRASTRUCTURE/Poultry farm/EC shed overview.webp';
import EggCollectionImg from '../assets/5. INFRASTRUCTURE/Poultry farm/Egg collection area.webp';
import ProcessingImg from '../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Pasteurization.webp';
import LabImg from '../assets/5. INFRASTRUCTURE/Laboratory/GC and HPLC.webp';
import PackagingImg from '../assets/3. PRODUCTS/Customized Packages/Powder Product primary container - HDPE Bag.jpeg';
import { LAYERS_HOUSED, EGGS_PER_YEAR, EGGS_PROCESSED_PER_DAY } from './productionFacts';

const homeJourneyStages = [
  {
    id: 'feed-sourcing',
    label: 'Feed sourcing',
    // Source: src/pages/Infra/sections/FeedMill.jsx ("Ingredient Safety &
    // Screening" info block).
    image: FeedMillLabImg,
    whatHappens: 'Every raw material entering the feed mill undergoes rigorous testing for mycotoxins, pesticide residues, and antibiotic contaminants.',
    whatIsControlled: 'Strict lot-wise storage prevents cross-contamination and ensures full traceability from ingredient intake to finished feed.',
    // No separate "records/quality checks" sentence exists for this stage
    // beyond the control statement above — omitted rather than duplicated
    // or invented.
    recordsAndChecks: null,
    route: null,
    ctaLabel: null,
  },
  {
    id: 'feed-mill',
    label: 'Feed mill',
    // Source: src/pages/Infra/sections/FeedMill.jsx ("Integrated Feed Mill"
    // info block).
    image: FeedMillLabImg,
    whatHappens: 'Our state-of-the-art feed mill, supported by an in-house laboratory, ensures the production of safe, balanced nutrition for our flocks.',
    whatIsControlled: 'All ingredients are stored lot-wise in protected facilities and screened for toxins, pesticides, and antibiotic residues. Only verified, residue-free inputs are used in feed formulation.',
    recordsAndChecks: null,
    route: 'feed_mill',
    ctaLabel: null,
  },
  {
    id: 'poultry-farms',
    label: 'Poultry farms',
    // Source: src/pages/Infra/sections/PoultryFarm.jsx ("Integrated Poultry
    // Farms" and "State-of-the-Art Facilities" info blocks).
    image: PoultryFarmImg,
    whatHappens: 'Our ISO 22000 certified poultry farms ensure the production of clean, residue-free eggs under strict biosecurity controls.',
    whatIsControlled: `With ${LAYERS_HOUSED} layers housed across the farm, the farms produce approximately ${EGGS_PER_YEAR} eggs annually.`,
    recordsAndChecks: 'An attached laboratory routinely analyses water, tissues, and egg samples to ensure ongoing safety and quality monitoring.',
    route: 'poultry_farm',
    ctaLabel: 'View Farm Controls',
  },
  {
    id: 'egg-collection',
    label: 'Egg collection',
    // Source: src/pages/Infra/sections/PoultryFarm.jsx (Farm Gallery
    // description + image assets "Egg Collecting Conveyor" / "Egg Collection
    // Area"). No separate "what is controlled"/"records" sentence exists
    // specifically for the collection step beyond the general farm
    // description — those two fields are omitted rather than invented for
    // this stage.
    image: EggCollectionImg,
    whatHappens: 'A look inside our integrated poultry farm — from environmentally controlled sheds to egg collection, biosecurity entry points, and feed management.',
    whatIsControlled: null,
    recordsAndChecks: null,
    route: 'poultry_farm',
    ctaLabel: 'View Farm Controls',
  },
  {
    id: 'processing',
    label: 'Processing',
    // Source: src/pages/Products/CustomizedPackagesPage.jsx ("Process
    // Excellence" info block) + src/data/journeyStages.js stage 04
    // description (shared data file, read-only, not modified).
    image: ProcessingImg,
    whatHappens: `Only microbiologically tested eggs are processed, with a capacity of ${EGGS_PROCESSED_PER_DAY} eggs per day, producing approximately 7,500 tonnes annually.`,
    whatIsControlled: 'Operations follow cGMP, SSOP, Codex Alimentarius principles, and HACCP guidelines.',
    recordsAndChecks: 'All activities are monitored through the integrated traceability system, ensuring food safety and full traceability.',
    route: 'egg_processing_plant',
    ctaLabel: 'View Processing Facility',
  },
  {
    id: 'laboratory-testing',
    label: 'Laboratory testing',
    // Source: src/pages/Infra/sections/Laboratory.jsx ("Analytical
    // Instruments & Technology" and "Microbiological Laboratory" content
    // sections).
    image: LabImg,
    whatHappens: 'Advanced analytical platforms support comprehensive safety and residue monitoring — precise screening of feed ingredients, additives, water, tissues, eggs, and finished products for antibiotics, pesticides, and contaminants in line with EU and Japanese regulations (including EU 96/23).',
    whatIsControlled: 'A controlled microbiology laboratory ensures products are free from pathogens and microbial contamination prior to dispatch.',
    recordsAndChecks: 'Routine testing and environmental monitoring are conducted using biosafety-controlled infrastructure.',
    route: 'laboratory',
    ctaLabel: 'View Laboratory',
  },
  {
    id: 'packaging',
    label: 'Packaging',
    // Source: src/pages/Products/CustomizedPackagesPage.jsx (packagingData
    // "Bag in Box" entry description) + "Zoning & Hygiene Control" info
    // block from the same page.
    image: PackagingImg,
    whatHappens: 'Primary containment uses a high-density polyethylene (HDPE) inner bag for moisture protection, enclosed within a robust corrugated carton box for safe stacking and transport.',
    whatIsControlled: 'Strict zoning protocols (red, white, and neutral areas) prevent cross-contamination, with dedicated tools and consumables for each zone.',
    recordsAndChecks: 'Personnel hygiene is tightly controlled through mandatory sanitation procedures, protective clothing, environmental swabbing, and routine air quality monitoring.',
    route: 'customized_packages',
    ctaLabel: null,
  },
  {
    id: 'global-delivery',
    label: 'Global delivery',
    // Source: src/pages/GlobalReach/GlobalReachPage.jsx (hero description).
    image: null,
    whatHappens: 'SKM exports to 30+ countries, with dedicated regional branches coordinating import, warehousing, and compliance close to your market.',
    whatIsControlled: null,
    recordsAndChecks: null,
    route: 'global_reach',
    ctaLabel: null,
  },
];

export default homeJourneyStages;
