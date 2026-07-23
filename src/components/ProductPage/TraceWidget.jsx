import { motion, useReducedMotion } from 'framer-motion';
import journeyStages from '../../data/journeyStages';
import { PRODUCT_CATEGORIES } from '../../data/products';
import TraceabilityLoopJourney from '../Traceability/TraceabilityLoopJourney';

const PROCESSING_TEXT_BY_CATEGORY = {
  [PRODUCT_CATEGORIES.POWDERS]: 'Daily fresh egg intake moves through a HACCP-monitored, EU and USDA-compliant plant — breaking, pasteurization, and spray-drying — with full Critical Control Point (CCP) documentation at every stage.',
  [PRODUCT_CATEGORIES.LIQUIDS]: 'Daily fresh egg intake moves through a HACCP-monitored, EU and USDA-compliant plant — breaking and pasteurization, followed by chilled or frozen filling — with full Critical Control Point (CCP) documentation at every stage.',
};

export default function TraceWidget({ onPageChange, productName, productCategory }) {
  const reduceMotion = useReducedMotion();
  const processingOverride = productCategory ? PROCESSING_TEXT_BY_CATEGORY[productCategory] : null;
  const stages = processingOverride
    ? journeyStages.map((stage) => (stage.id === 'processing' ? { ...stage, description: processingOverride } : stage))
    : journeyStages;

  return (
    <div className="flex flex-col gap-10">
      {/* Interactive Loop Journey Showcase */}
      <TraceabilityLoopJourney
        title={productName ? `How ${productName} Is Made` : "How Whole Egg Powder Is Made"}
        subtitle={`Complete 360° Farm-to-Fork Loop — From Biosecure Hatchery to Automated Packaging & Dispatch`}
        onPageChange={onPageChange}
      />
    </div>
  );
}
