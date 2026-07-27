// Single source of truth for the farm-to-product story (plan.md §3). Used by
// both the compact homepage strip and the full "Our Journey" scrollytelling
// page, and by the per-product TraceWidget — so the 6 stages never drift
// apart across the site. Facts sourced from the traceability content already
// authored in src/pages/Quality/sections/Traceability.jsx.

import HatcheryImg from '../assets/5. INFRASTRUCTURE/Poultry farm/Vehicle entry shower.webp';
import FeedMillImg from '../assets/5. INFRASTRUCTURE/Feed mill/Feed mill aerial view.webp';
import FarmImg from '../assets/5. INFRASTRUCTURE/Poultry farm/EC shed overview.webp';
import ProcessingImg from '../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Pasteurization.webp';
import LabImg from '../assets/5. INFRASTRUCTURE/Laboratory/GC and HPLC.webp';
import DispatchImg from '../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Cold room.webp';
import { LAYERS_HOUSED, EGGS_PER_YEAR_SHORT, EGGS_PROCESSED_PER_DAY_SHORT } from './productionFacts';

const journeyStages = [
  {
    step: '01',
    id: 'hatchery',
    label: 'Hatchery',
    image: HatcheryImg,
    tagline: 'It starts behind a biosecurity shower.',
    description: 'Every visit to our layer farms begins at a controlled entry point — vehicle and personnel showers, sanitation barriers, and perimeter management, per EU Directive 2008/798. Certified hatcheries with strict biosecurity protocols form the foundation of the traceability chain.',
    stat: { value: '2008/798', label: 'EU biosecurity registration' },
  },
  {
    step: '02',
    id: 'feed-mill',
    label: 'Feed Mill',
    image: FeedMillImg,
    tagline: 'What the hens eat is tested before they eat it.',
    description: 'Our in-house feed mill screens every ingredient for mycotoxins, pesticide residues, and antibiotic contamination before it is formulated into balanced, residue-free feed — from chick to grower to layer.',
    stat: { value: '100%', label: 'Ingredients lot-tested before use' },
  },
  {
    step: '03',
    id: 'farm',
    label: 'Farm',
    image: FarmImg,
    tagline: `${LAYERS_HOUSED} layers, continuously monitored.`,
    description: `Our ISO 22000 certified integrated farms house ${LAYERS_HOUSED} layers in environmentally controlled sheds with automated feeding, watering, and egg collection — registered under EU compartmentalization norms with continuous flock health monitoring.`,
    stat: { value: EGGS_PER_YEAR_SHORT, label: 'Eggs produced annually on our own farms' },
  },
  {
    step: '04',
    id: 'processing',
    label: 'Processing',
    image: ProcessingImg,
    tagline: 'Fresh eggs, processed the same day.',
    description: 'Daily fresh egg intake moves through a HACCP-monitored, EU and USDA-compliant plant — breaking, pasteurization, and drying — with full Critical Control Point (CCP) documentation at every stage.',
    stat: { value: EGGS_PROCESSED_PER_DAY_SHORT, label: 'Eggs processed per day' },
  },
  {
    step: '05',
    id: 'qa-lab',
    label: 'QA & Lab Testing',
    image: LabImg,
    tagline: 'Every batch, tested before it ships.',
    description: 'Our NABL-accredited (ISO/IEC 17025) laboratory, operational since 2006, runs physicochemical, microbiological, and residue testing — including GC-MS, HPLC, and LC-MS/MS screening for antibiotics and pesticides per EU Directive 96/23.',
    stat: { value: 'Since 2006', label: 'NABL-accredited laboratory' },
  },
  {
    step: '06',
    id: 'packaging-dispatch',
    label: 'Packaging & Dispatch',
    image: DispatchImg,
    tagline: 'Cold chain, sealed and documented, to your door.',
    description: 'Positive pressure packing rooms and cold chain management protect product integrity through to final delivery — with lot codes, batch identification, and destination digitally recorded for complete supply chain transparency.',
    stat: { value: '30+', label: 'Countries reached through this chain' },
  },
];

export default journeyStages;
