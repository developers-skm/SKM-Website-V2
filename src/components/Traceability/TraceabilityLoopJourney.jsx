import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion';
import manufacturingImages from '../../data/manufacturingImages';

// ─────────────────────────────────────────────
// Easing Tokens
// ─────────────────────────────────────────────
const EASE_PRECISE = [0.22, 1, 0.36, 1];

// ─────────────────────────────────────────────
// QA Checklist & Certifications
// ─────────────────────────────────────────────
const qaChecklist = [
  'FSSC 22000 Certification',
  'ISO 22000 Food Safety System',
  'HACCP Critical Control Point Audit',
  'Halal Quality Certified',
  'Kosher Compliance Verified',
  'Complete Parent Flock & Lot Traceability',
  'Microbiology Testing (Salmonella & E. coli Negative)',
  'Moisture Verification (< 4.0% Standard)',
  'Protein Content Analysis (Min 45.0%)',
  'Rare-Earth Metal Detection & Sifting',
];

const certifications = [
  { name: 'FSSC 22000', label: 'Food Safety Certification' },
  { name: 'ISO 22000', label: 'Safety Management' },
  { name: 'HACCP', label: 'Hazard Analysis Critical Control' },
  { name: 'Halal', label: 'Halal Quality Compliance' },
  { name: 'Kosher', label: 'Kosher Compliance' },
  { name: 'BRCGS', label: 'Global Food Safety Standard' },
];

// ─────────────────────────────────────────────
// Process Chapters Data
// ─────────────────────────────────────────────
const processChapters = [
  {
    step: '01',
    category: 'CHAPTER 01 • RAW INGREDIENT INTAKE',
    title: 'Fresh Egg Collection & Sanitization',
    narrative:
      'Whole shell eggs are harvested daily from certified integrated layer farms and transported to the facility in climate-controlled vehicles. Shell eggs pass through continuous candling systems, optical visual inspections, and multi-stage sanitization washes before entering the production intake.',
    highlights: ['100% Certified Layer Farm Origin', 'Automated Optical Candling Inspection', 'Multi-Stage Shell Surface Sanitization'],
    illustrationSide: 'left', // left: image, center: node, right: content
    image: manufacturingImages.intake,
    altText: 'Automated egg intake, candling inspection and sanitization line',
  },
  {
    step: '02',
    category: 'CHAPTER 02 • MECHANICAL SEPARATION',
    title: 'Automated Breaking & Multi-Stage Filtration',
    narrative:
      'High-speed rotary breaking machines automatically crack shell eggs and separate raw liquid egg from shell fragments. Liquid whole egg passes through duplex stainless steel mesh sifters and centrifugal filters to eliminate micro-shell particles and natural membrane threads.',
    highlights: ['Automated Rotary Breaking Knife System', 'Duplex Stainless Steel Fine Mesh Filters', 'Continuous Mechanical Shell Separation'],
    illustrationSide: 'right', // left: content, center: node, right: image
    image: manufacturingImages.breaking,
    altText: 'High-speed rotary egg breaking machine and duplex stainless steel filtration system',
  },
  {
    step: '03',
    category: 'CHAPTER 03 • THERMAL PROCESSING',
    title: 'HTST Pasteurization & Homogenization',
    narrative:
      'Filtered liquid whole egg undergoes continuous High-Temperature Short-Time (HTST) pasteurization in plate heat exchangers. Precise thermal profiles eliminate pathogenic bacteria including Salmonella and Listeria while holding native protein functional matrices completely intact.',
    highlights: ['Stainless Steel Plate Heat Exchanger', 'HTST Thermal Sterilization Profile', 'HACCP Critical Control Point (CCP) Monitored'],
    illustrationSide: 'left',
    image: manufacturingImages.pasteurization,
    altText: 'Stainless steel HTST plate heat exchanger pasteurization processing unit',
  },
  {
    step: '04',
    category: 'CHAPTER 04 • ATOMIZATION & DRYING',
    title: 'Multi-Stage Tall-Form Spray Drying Tower',
    narrative:
      'Pasteurized liquid whole egg is atomized through high-pressure nozzles at the top of tall-form spray drying towers. Micro-droplets mix with sterile filtered hot air, evaporating water instantaneously into uniform, free-flowing Whole Egg Powder with under 4.0% moisture content.',
    powderDetail:
      'Gentle thermal evaporation retains native protein solubility, high emulsification capacity, and rich golden yolk color without heat scorching or caramelization off-flavors.',
    highlights: ['High-Pressure Atomization Nozzles', 'Filtered Hot Air Evaporation Tower', '< 4.0% Final Moisture Retention'],
    illustrationSide: 'right',
    image: manufacturingImages.sprayDrying,
    altText: 'Tall stainless steel multi-stage tall-form spray drying tower chamber and cyclone separators',
  },
  {
    step: '05',
    category: 'CHAPTER 05 • QUALITY VERIFICATION',
    title: 'NABL Analytical & Residue Testing',
    narrative:
      'Every production batch undergoes comprehensive analytical, chemical, and microbiological testing in an NABL-accredited (ISO/IEC 17025) laboratory before Certificate of Analysis (COA) issuance, verifying protein content, fat, solubility, and pathogen-free compliance.',
    highlights: ['LC-MS/MS & GC-MS Residue Screening', 'Microbiological Salmonella & E. coli Assays', 'Protein (Min 45%) & Fat (Min 40%) Verification'],
    illustrationSide: 'left',
    image: manufacturingImages.qualityLab,
    altText: 'NABL food testing laboratory with analytical instruments and egg powder sample testing',
  },
  {
    step: '06',
    category: 'CHAPTER 06 • HERMETIC SEALING',
    title: 'HEPA Cleanroom Packaging & QR Traceability',
    narrative:
      'Finished powder is sifted through rare-earth magnet traps into positive-pressure HEPA Class 100,000 cleanrooms. It is weighed and heat-sealed in 25kg multi-ply poly-lined Kraft bags, stamped with unique QR lot codes for complete backward supply chain traceability.',
    highlights: ['HEPA Class 100,000 Positive-Pressure Cleanroom', 'Rare-Earth Magnet Trap Sifting', 'Digital QR Barcode Lot Traceability'],
    illustrationSide: 'right',
    image: manufacturingImages.packaging,
    altText: 'Automated HEPA cleanroom bag filling and packaging conveyor for 25kg egg powder bags',
  },
];

// ─────────────────────────────────────────────
// Process Image Component
// ─────────────────────────────────────────────
function ProcessImage({ chapter }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="w-full aspect-[4/3] relative overflow-hidden rounded-[20px] border border-[#ECECEC] bg-[#F7F7F5] shadow-xs flex items-center justify-center group">
      {imgFailed ? (
        <div className="w-full h-full flex items-center justify-center text-[#888888] font-mono text-[13px] p-6 text-center" aria-hidden="true">
          <span>Manufacturing image unavailable</span>
        </div>
      ) : (
        <>
          <img
            src={chapter.image}
            alt={chapter.altText}
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.015]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-40 pointer-events-none" />
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Process Content Block
// ─────────────────────────────────────────────
function ProcessContent({ chapter, entered }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-5 justify-center">
      {/* Step Number + Category */}
      <div className="flex items-baseline gap-4">
        <span
          className="font-mono text-[48px] sm:text-[56px] font-extralight leading-none select-none tabular-nums"
          style={{ color: '#E0E0E0', opacity: entered ? 0.18 : 0 }}
        >
          {chapter.step}
        </span>
        <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#999999]">
          {chapter.category}
        </span>
      </div>

      {/* Title with hover underline */}
      <div className="relative self-start group/title">
        <h3 className="font-heading font-semibold text-[22px] sm:text-[26px] lg:text-[28px] text-[#111111] leading-[1.25] m-0 transition-colors duration-200 group-hover/title:text-[#2a2a2a]">
          {chapter.title}
        </h3>
        <span className="absolute left-0 -bottom-0.5 w-full h-[1.5px] bg-[#E40A18] scale-x-0 group-hover/title:scale-x-100 origin-left transition-transform duration-300" />
      </div>

      {/* Narrative */}
      <p className="font-body text-[15px] sm:text-[15.5px] text-[#666666] leading-[1.85] m-0">
        {chapter.narrative}
      </p>

      {/* Powder Detail Quote */}
      {chapter.powderDetail && (
        <p className="font-body text-[14px] sm:text-[14.5px] text-[#555555] leading-[1.8] border-l-[2px] border-[#E40A18] pl-4 italic m-0">
          {chapter.powderDetail}
        </p>
      )}

      {/* Technical Highlights */}
      <div className="flex flex-col gap-2 pt-1">
        {chapter.highlights.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 text-[13.5px] sm:text-[14px] text-[#444444] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E40A18] flex-shrink-0" aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Timeline Node Center Circle Component
// ─────────────────────────────────────────────
function NodeCircle({ step, isActive, isCompleted }) {
  return (
    <div
      className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono text-[13px] font-semibold transition-all duration-300 bg-white relative z-10 shadow-xs ${
        isActive
          ? 'border-[#E40A18] text-[#111111]'
          : isCompleted
          ? 'border-[#E40A18] text-[#E40A18]'
          : 'border-[#D6D6D6] text-[#999999]'
      }`}
    >
      {isActive ? (
        <span className="relative flex items-center justify-center w-full h-full">
          <span className="text-[12px] font-medium text-[#999999] opacity-35 select-none">{step}</span>
          <span className="absolute w-2.5 h-2.5 rounded-full bg-[#E40A18]" />
        </span>
      ) : isCompleted ? (
        <span className="text-[13px] font-bold text-[#E40A18]">✓</span>
      ) : (
        step
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Desktop Row Component (3-Column Grid)
// Left (Image/Content) | Center Node (80px) | Right (Content/Image)
// ─────────────────────────────────────────────
function DesktopRow({ chapter, index, isActive, isCompleted, onVisible, reducedMotion }) {
  const rowRef = useRef(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!entered) setEntered(true);
          onVisible(index);
        }
      },
      {
        threshold: 0,
        rootMargin: '-40% 0px -40% 0px',
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [entered, index, onVisible]);

  const isImageLeft = chapter.illustrationSide === 'left';
  const leftX = reducedMotion ? 0 : -20;
  const rightX = reducedMotion ? 0 : 20;

  const leftTransition = { duration: 0.65, ease: EASE_PRECISE, delay: 0 };
  const rightTransition = { duration: 0.65, ease: EASE_PRECISE, delay: reducedMotion ? 0 : 0.08 };

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-[1fr_80px_1fr] gap-8 items-center py-10 lg:py-12 relative"
    >
      {/* Left Column */}
      <motion.div
        initial={{ opacity: 0, x: leftX }}
        animate={entered ? { opacity: 1, x: 0 } : {}}
        transition={leftTransition}
      >
        {isImageLeft ? (
          <ProcessImage chapter={chapter} />
        ) : (
          <ProcessContent chapter={chapter} entered={entered} />
        )}
      </motion.div>

      {/* Center Column — Timeline Node */}
      <div className="flex flex-col items-center justify-center relative h-full">
        <NodeCircle step={chapter.step} isActive={isActive} isCompleted={isCompleted} />
      </div>

      {/* Right Column */}
      <motion.div
        initial={{ opacity: 0, x: rightX }}
        animate={entered ? { opacity: 1, x: 0 } : {}}
        transition={rightTransition}
      >
        {isImageLeft ? (
          <ProcessContent chapter={chapter} entered={entered} />
        ) : (
          <ProcessImage chapter={chapter} />
        )}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Mobile Stage Component (< lg Breakpoint)
// Node + Title -> Image -> Content stacked
// ─────────────────────────────────────────────
function MobileStage({ chapter, index, isActive, isCompleted, onVisible, reducedMotion }) {
  const stageRef = useRef(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!entered) setEntered(true);
          onVisible(index);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [entered, index, onVisible]);

  return (
    <div ref={stageRef} className="flex gap-4 relative py-6 border-b border-[#F0F0F0] last:border-none">
      {/* Left Timeline Node & Line */}
      <div className="flex flex-col items-center flex-shrink-0 w-10 relative">
        <NodeCircle step={chapter.step} isActive={isActive} isCompleted={isCompleted} />
        {index < processChapters.length - 1 && (
          <div className="w-[1.5px] bg-[#E2E2E2] flex-1 my-2" />
        )}
      </div>

      {/* Right Content */}
      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
        animate={entered ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_PRECISE }}
        className="flex-1 flex flex-col gap-4"
      >
        <ProcessImage chapter={chapter} />
        <ProcessContent chapter={chapter} entered={entered} />
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// QA Section
// ─────────────────────────────────────────────
function QASection({ reducedMotion }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const group1 = qaChecklist.slice(0, 5);
  const group2 = qaChecklist.slice(5);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE_PRECISE }}
      className="flex flex-col gap-8 pt-16 border-t border-[#ECECEC] relative z-10"
    >
      <motion.div
        className="flex flex-col gap-3 max-w-2xl"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_PRECISE, delay: reducedMotion ? 0 : 0.04 }}
      >
        <div className="flex items-center gap-3">
          <span className="w-5 h-[2px] bg-[#E40A18]" aria-hidden="true" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#888888]">
            Quality Assurance
          </span>
        </div>

        <h3 className="font-heading font-semibold text-[28px] sm:text-[34px] text-[#111111] leading-[1.2] m-0">
          Tested Against Global Food Safety Standards
        </h3>

        <p className="font-body text-[15.5px] text-[#666666] leading-[1.9] m-0">
          Every production batch is released only after meeting internal quality standards and international food safety requirements.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
        {group1.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex items-center gap-3 py-3 border-b border-[#F0F0F0] text-[14.5px] font-medium text-[#333333]"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: EASE_PRECISE, delay: reducedMotion ? 0 : 0.1 + idx * 0.045 }}
          >
            <span className="text-[#E40A18] font-bold flex-shrink-0 text-[13px]" aria-label="Verified">✓</span>
            <span className="leading-snug">{item}</span>
          </motion.div>
        ))}
        {group2.map((item, idx) => (
          <motion.div
            key={idx + 5}
            className="flex items-center gap-3 py-3 border-b border-[#F0F0F0] text-[14.5px] font-medium text-[#333333]"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: EASE_PRECISE, delay: reducedMotion ? 0 : 0.18 + idx * 0.045 }}
          >
            <span className="text-[#E40A18] font-bold flex-shrink-0 text-[13px]" aria-label="Verified">✓</span>
            <span className="leading-snug">{item}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main Export — Center Vertical Timeline Layout
// ─────────────────────────────────────────────
export default function TraceabilityLoopJourney({ title, subtitle, onPageChange }) {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeStage, setActiveStage] = useState(0);

  const headerRef = useRef(null);
  const [headerEntered, setHeaderEntered] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Continuous vertical progress line linking Stage 01 to Stage 06
  const journeyContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: journeyContainerRef,
    offset: ['start 60%', 'end 60%'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const handleVisible = useCallback((index) => {
    setActiveStage(prev => (index > prev ? index : prev));
  }, []);

  const headerTransition = reducedMotion
    ? { duration: 0.15 }
    : { duration: 0.55, ease: EASE_PRECISE };

  return (
    <section
      className="w-full bg-[#FAFAF8] text-[#111111] py-20 sm:py-28 lg:py-32 border-y border-[#ECECEC] font-body transition-colors relative overflow-hidden"
    >
      <div className="mx-auto max-w-[1360px] w-full px-5 sm:px-8 lg:px-12 flex flex-col gap-14 sm:gap-18 relative">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col gap-4 max-w-3xl relative z-10">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            animate={headerEntered ? { opacity: 1, y: 0 } : {}}
            transition={{ ...headerTransition, delay: 0 }}
          >
            <span className="w-5 h-[2px] bg-[#E40A18]" aria-hidden="true" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#888888]">
              Manufacturing Process
            </span>
          </motion.div>

          <motion.h2
            className="font-heading font-semibold text-[34px] sm:text-[44px] lg:text-[50px] text-[#111111] leading-[1.1] tracking-tight m-0"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            animate={headerEntered ? { opacity: 1, y: 0 } : {}}
            transition={{ ...headerTransition, delay: reducedMotion ? 0 : 0.08 }}
          >
            {title || 'How Whole Egg Powder Is Made'}
          </motion.h2>

          <motion.p
            className="font-body text-[16px] sm:text-[17px] text-[#666666] leading-[1.9] m-0 max-w-xl"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            animate={headerEntered ? { opacity: 1, y: 0 } : {}}
            transition={{ ...headerTransition, delay: reducedMotion ? 0 : 0.16 }}
          >
            {subtitle || 'Fresh eggs are transformed into high-quality spray-dried egg products through a carefully controlled manufacturing process that combines food safety, precision engineering, and rigorous quality assurance at every stage.'}
          </motion.p>
        </div>

        {/* Manufacturing Journey — Center Vertical Timeline Layout */}
        <div ref={journeyContainerRef} className="relative z-10">
          {/* Desktop 3-Column Layout (lg breakpoint) */}
          <div className="hidden lg:block relative">
            {/* Center Vertical Connecting Base Line */}
            <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-[1px] bg-[#DDDDDD] z-0 pointer-events-none" />

            {/* Scroll-Linked Red Progress Line */}
            {!reducedMotion && (
              <motion.div
                style={{ scaleY: lineScaleY }}
                className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-[2px] bg-[#E40A18] origin-top z-0 pointer-events-none"
              />
            )}

            {/* 6 Stage Rows */}
            <div className="flex flex-col">
              {processChapters.map((chapter, index) => (
                <DesktopRow
                  key={chapter.step}
                  chapter={chapter}
                  index={index}
                  isActive={index === activeStage}
                  isCompleted={index < activeStage}
                  onVisible={handleVisible}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>

          {/* Mobile Layout (< lg breakpoint) */}
          <div className="lg:hidden flex flex-col gap-2">
            {processChapters.map((chapter, index) => (
              <MobileStage
                key={chapter.step}
                chapter={chapter}
                index={index}
                isActive={index === activeStage}
                isCompleted={index < activeStage}
                onVisible={handleVisible}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>

        {/* Quality Assurance */}
        <QASection reducedMotion={reducedMotion} />

        {/* Certifications Strip */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE_PRECISE }}
          className="flex flex-col gap-6 pt-10 border-t border-[#ECECEC] relative z-10"
        >
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#AAAAAA]">
            International Food Safety Certifications
          </span>

          <div className="flex flex-wrap items-start gap-x-10 gap-y-5">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                title={cert.label}
                className="flex flex-col gap-0.5 group cursor-default transition-opacity duration-200 opacity-70 hover:opacity-100"
              >
                <div className="relative inline-block">
                  <span className="font-heading font-semibold text-[18px] sm:text-[20px] text-[#555555] group-hover:text-[#111111] transition-colors duration-200">
                    {cert.name}
                  </span>
                  <span className="absolute left-0 -bottom-0.5 w-full h-[1px] bg-[#E40A18] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </div>
                <span className="font-mono text-[10px] text-[#AAAAAA] tracking-wider uppercase">
                  {cert.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
