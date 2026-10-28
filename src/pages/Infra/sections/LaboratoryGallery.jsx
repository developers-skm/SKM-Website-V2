import React from 'react';
import { motion } from 'framer-motion';
import ImageSlider from '../../../components/ImageSlider/ImageSlider';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';

// Laboratory photos: web-sized copies - the originals are up to ~7000x4600 and froze the
// page while the browser decoded them. Slider = 1000x750 copies.
import ResidueLabAerialWeb from '../../../assets/5. INFRASTRUCTURE/Laboratory/Residue lab aerial view - web.webp';
import ResidueLabFront from '../../../assets/5. INFRASTRUCTURE/Laboratory/Residue lab front view - web.webp';
import GCandHPLC from '../../../assets/5. INFRASTRUCTURE/Laboratory/GC and HPLC.webp';
import LCMS from '../../../assets/5. INFRASTRUCTURE/Laboratory/LCMS - web.webp';
import ExtractionRoom from '../../../assets/5. INFRASTRUCTURE/Laboratory/Extraction room - web.webp';
import PhysicochemicalView from '../../../assets/5. INFRASTRUCTURE/Laboratory/Physicochemical view - web.webp';
import LaminarFlow from '../../../assets/5. INFRASTRUCTURE/Laboratory/Laminar flow - web.webp';
import Incubators from '../../../assets/5. INFRASTRUCTURE/Laboratory/Incubators - web.webp';
import MediaStorage from '../../../assets/5. INFRASTRUCTURE/Laboratory/Media Storage - web.webp';
import ChemicalStorage from '../../../assets/5. INFRASTRUCTURE/Laboratory/Chemical Storage - web.webp';
import Autoclave from '../../../assets/5. INFRASTRUCTURE/Laboratory/Autoclave - web.webp';
import ShelfLifeStorage from '../../../assets/5. INFRASTRUCTURE/Laboratory/Shelf life storage - web.webp';

// Quality Assurance lab photos (web-sized 900x1200 copies)
import QaConicalFlask from '../../../assets/4. QUALITY/Quality Assurance/Conical flask - web.webp';
import QaExtractionRoom from '../../../assets/4. QUALITY/Quality Assurance/Extraction room - web.webp';
import QaPetriPlate from '../../../assets/4. QUALITY/Quality Assurance/Petriplate and sample - web.webp';
import QaProtein from '../../../assets/4. QUALITY/Quality Assurance/Protein - web.webp';

const labImages = [
  { src: ResidueLabAerialWeb, label: 'Residue Lab – Aerial View' },
  { src: ResidueLabFront, label: 'Residue Lab – Front View' },
  { src: GCandHPLC, label: 'GC & HPLC' },
  { src: LCMS, label: 'LC-MS/MS' },
  { src: ExtractionRoom, label: 'Extraction Room' },
  { src: PhysicochemicalView, label: 'Physicochemical Lab' },
  { src: LaminarFlow, label: 'Laminar Airflow' },
  { src: Incubators, label: 'Incubators' },
  { src: MediaStorage, label: 'Media Storage' },
  { src: ChemicalStorage, label: 'Chemical Storage' },
  { src: Autoclave, label: 'Autoclave' },
  { src: ShelfLifeStorage, label: 'Shelf Life Storage' },
  { src: QaConicalFlask, label: 'Physicochemical Testing' },
  { src: QaExtractionRoom, label: 'Extraction Room' },
  { src: QaPetriPlate, label: 'Microbiological Testing' },
  { src: QaProtein, label: 'Protein Analysis' },
];

const containerVariants = makeContainerVariants(0.1);
const itemVariants = makeItemVariants({ y: 25, stiffness: 80 });

// Lab Facilities / Laboratory Gallery. Shared by the Laboratory page and the
// Quality, Food Safety & Traceability hub page. `className` controls the
// inner container width/padding so each page can supply its own.
export default function LaboratoryGallery({ className = '' }) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`w-full flex flex-col gap-10 ${className}`}
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600">Lab Facilities</span>
        <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
          Laboratory Gallery
        </h2>
        <p className="font-body text-[15px] text-surface-500 max-w-2xl m-0 leading-[26px]">
          A dedicated Quality Assurance team oversees systematic monitoring, validation, and documentation across all production stages.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <ImageSlider images={labImages} />
      </motion.div>
    </motion.section>
  );
}
