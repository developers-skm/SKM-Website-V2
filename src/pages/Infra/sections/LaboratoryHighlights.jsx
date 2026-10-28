import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '../../../components/common/StatCard';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import ResidueLabAerial from '../../../assets/5. INFRASTRUCTURE/Laboratory/Residue lab aerial view - hero.webp';

const statsData = [
  { value: 'NABL', label: 'ISO/IEC 17025 Accredited' },
  { value: 'Since 2006', label: 'Operational Excellence' },
  { value: 'EU & Japan', label: 'Regulatory Compliance' },
  { value: 'HACCP', label: 'Quality Framework' },
];

const containerVariants = makeContainerVariants(0.1);
const itemVariants = makeItemVariants({ y: 25, stiffness: 80 });

// Stats row + featured residue-lab image. Shared by the Laboratory page and
// the Quality, Food Safety & Traceability hub page. `className` controls the
// outer wrapper so each page can supply its own container width/padding.
export default function LaboratoryHighlights({ className = '', showStats = true }) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`w-full flex flex-col gap-10 ${className}`}
    >
      {showStats && (
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} />
          ))}
        </motion.div>
      )}

      <motion.div
        variants={itemVariants}
        className="relative rounded-[20px] overflow-hidden border border-[#eee] shadow-[5px_3px_40px_rgba(0,72,88,0.08)] group aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/7]"
      >
        <img
          src={ResidueLabAerial}
          alt="SKM Laboratory – Residue Lab Aerial View"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <p className="text-xs font-bold text-white/80 uppercase tracking-widest m-0">SKM Laboratory - Residue Analysis Lab</p>
        </div>
      </motion.div>
    </motion.section>
  );
}
