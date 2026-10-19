// Single source of truth for the farm-to-product story (plan.md §3). Used by
// both the compact homepage strip and the full "Our Journey" scrollytelling
// page, and by the per-product TraceWidget - so the 6 stages never drift
// apart across the site. Facts sourced from the traceability content already
// authored in src/pages/Quality/sections/Traceability.jsx.

import FeedMillImg from '../assets/5. INFRASTRUCTURE/Feed mill/Feed mill aerial view.webp';
import FarmImg from '../assets/5. INFRASTRUCTURE/Poultry farm/EC shed overview.webp';
import ProcessingImg from '../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Pasteurization.webp';
import LabImg from '../assets/5. INFRASTRUCTURE/Laboratory/GC and HPLC.webp';
import DispatchImg from '../assets/5. INFRASTRUCTURE/Egg Products/Process areas/Cold room.webp';
import EggExportImg from '../assets/ai-images/table-eggs-collection.webp';
import HomeFarmImg from '../assets/home/journey-farm.webp';
import HomeQaImg from '../assets/home/journey-qa.webp';
import HomePackagingImg from '../assets/home/journey-packaging.webp';
import { LAYERS_HOUSED, EGGS_PER_YEAR_SHORT, EGGS_PROCESSED_PER_DAY_SHORT } from './productionFacts';

const journeyStages = [
  {
    step: '01',
    id: 'feed-mill',
    label: 'Feed Mill',
    image: FeedMillImg,
    tagline: 'What the hens eat is tested before they eat it.',
    description: 'Our in-house feed mill screens every ingredient to stringent quality screening for mycotoxins, pesticide residues, and antibiotic contamination before formulations. Nutritionally balanced feed formulations tailored to each stage of poultry growth, from chicks and growers to laying hens.',
    stat: { value: '100%', label: 'Ingredients lot-tested before use' },
  },
  {
    step: '02',
    id: 'farm',
    label: 'Farm',
    image: FarmImg,
    homeImage: HomeFarmImg,
    tagline: `${LAYERS_HOUSED} layers, continuously monitored.`,
    description: `Every visit to our layer farms begins at a controlled entry point, with vehicle and personnel sanitation, biosecurity barriers and perimeter management. Our ISO 22000-certified integrated farms house ${LAYERS_HOUSED} layers in environmentally controlled sheds, supported by automated feeding, watering, and egg collection systems, and operate in accordance with OIE compartmentalization requirements.`,
    stat: { value: EGGS_PER_YEAR_SHORT, label: 'Eggs produced annually on our own farms' },
  },
  {
    step: '03',
    id: 'processing',
    label: 'Plant',
    image: ProcessingImg,
    tagline: 'Fresh eggs, processed the same day.',
    description: 'Daily fresh egg intake moves through our European Union (EU) compliant processing facility, covering breaking, pasteurisation, and drying, with CCP documentation maintained at every stage.',
    stat: { value: EGGS_PROCESSED_PER_DAY_SHORT, label: 'Eggs processed per day' },
  },
  {
    step: '04',
    id: 'qa-lab',
    label: 'QA & Lab Testing',
    image: LabImg,
    homeImage: HomeQaImg,
    tagline: 'Every batch, tested before it ships.',
    description: 'Our ISO 17025-accredited laboratory since 2006, conducts physicochemical, microbiological, and residue analyses, including GC-ECD/FID, HPLC, and LC-MS/MS screening for antibiotics and pesticides, in accordance with applicable European Union (EU) and Japanese regulations.',
    stat: { value: 'Since 2006', label: 'ISO 17025-accredited laboratory' },
  },
  {
    step: '05',
    id: 'packaging-dispatch',
    label: 'Packaging & Dispatch',
    image: DispatchImg,
    homeImage: HomePackagingImg,
    tagline: 'Cold chain, sealed and documented, to your door.',
    description: 'Positive-pressure packing rooms and robust cold-chain management protect product integrity through final delivery. Lot codes, batch identification, and destination details are digitally recorded, ensuring complete supply chain transparency and traceability.',
    stat: { value: '30+', label: 'Countries served ' },
  },
  {
    step: '06',
    id: 'egg-export',
    label: 'Egg Export',
    image: EggExportImg,
    tagline: 'Graded, marked and shipped fresh.',
    description: 'Premium-quality eggs are precisely graded and individually printed with the company seal and Date of Packing (DoP) to ensure quality and traceability. These eggs are then carefully collected, packed and distributed to global markets through a temperature-controlled cold chain dispatch system, ensuring freshness and quality throughout the supply chain.',
    stat: { value: 'DoP', label: 'Printed on every egg' },
  },
];

export default journeyStages;
