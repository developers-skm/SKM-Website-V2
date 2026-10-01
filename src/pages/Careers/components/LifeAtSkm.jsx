import { motion } from 'framer-motion';
import { lifeAtSkmTiles } from '../../../data/careersContent';
import { Container, Section } from './layout';
import SectionHeading from './SectionHeading';

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, ease: 'easeOut' },
};

function Photo({ tile, className = '', priority = false }) {
  return (
    <motion.figure {...reveal} className={`m-0 flex flex-col gap-3 group ${className}`}>
      <div className="relative flex-1 min-h-[220px] rounded-2xl overflow-hidden bg-surface-100 border border-[#e2ded6] shadow-sm">
        <img
          src={tile.image}
          alt={tile.alt}
          loading={priority ? 'eager' : 'lazy'}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <figcaption className="font-body text-[14px] font-bold text-heading flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
        {tile.label}
      </figcaption>
    </motion.figure>
  );
}

// Editorial layout: one large landscape image + two stacked beside it on desktop; stacked on mobile.
export default function LifeAtSkm() {
  const [large, ...small] = lifeAtSkmTiles;

  return (
    <Section tone="white" labelledBy="life-title" className="border-b border-[#eae6e0]">
      <Container className="flex flex-col gap-10 lg:gap-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeading
            id="life-title"
            label="Life at SKM"
            title="Where People, Technology and Purpose Come Together"
            text="Across our processing facilities, testing laboratories, engineering bays, and corporate offices, our people drive excellence every single day."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 lg:gap-8">
          <Photo tile={large} priority className="min-h-[280px] sm:min-h-[380px] lg:min-h-[520px] [&>div]:min-h-[260px]" />
          <div className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-6">
            {small.map((tile) => (
              <Photo key={tile.label} tile={tile} className="min-h-[240px]" />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

