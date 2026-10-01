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
    <motion.figure {...reveal} className={`m-0 flex flex-col gap-2.5 ${className}`}>
      <div className="relative flex-1 min-h-[200px] rounded-2xl overflow-hidden bg-surface-100 border border-[#e8e4dd]">
        <img
          src={tile.image}
          alt={tile.alt}
          loading={priority ? 'eager' : 'lazy'}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <figcaption className="font-body text-[14px] font-semibold text-surface-700">{tile.label}</figcaption>
    </motion.figure>
  );
}

// Editorial layout: one large landscape image + two stacked beside it on
// desktop; stacked on mobile. Captions sit below the images (no overlays).
export default function LifeAtSkm() {
  const [large, ...small] = lifeAtSkmTiles;

  return (
    <Section tone="white" labelledBy="life-title">
      <Container className="flex flex-col gap-10 lg:gap-12">
        <SectionHeading
          id="life-title"
          label="Our Workplace"
          title="Life at SKM"
          text="Work alongside teams across manufacturing, quality, engineering, technology and business operations."
        />
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5 lg:gap-6">
          <Photo tile={large} priority className="min-h-[260px] sm:min-h-[360px] lg:min-h-[560px] [&>div]:min-h-[240px]" />
          <div className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-1 gap-5 lg:gap-6">
            {small.map((tile) => (
              <Photo key={tile.label} tile={tile} className="min-h-[220px]" />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
