import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';
import { lifeAtSkmTiles } from '../../../data/careersContent';
import SectionHeading from './SectionHeading';

const container = makeContainerVariants(0.1);
const item = makeItemVariants({ y: 20 });

// Real SKM plant imagery only — no invented testimonials.
export default function LifeAtSkm() {
  return (
    <section aria-labelledby="life-title" className="w-full bg-page py-[70px] lg:py-[100px] border-y border-[#eee]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <SectionHeading id="life-title" label="Our Workplace" title="Life at SKM" text="From egg intake to packing, quality laboratories to engineering — the work that goes into every SKM product." />
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 sm:gap-5 list-none m-0 p-0 md:h-[560px]"
        >
          {lifeAtSkmTiles.map((tile) => (
            <motion.li
              key={tile.label}
              variants={item}
              className={`group relative overflow-hidden rounded-[10px] border border-[#eee] bg-surface-100 min-h-[220px] ${
                tile.large ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={tile.image}
                alt={tile.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute left-0 bottom-0 m-4 px-4 py-2 rounded-[8px] bg-white font-heading font-bold text-[13px] uppercase tracking-wider text-heading border-l-[3px] border-brand-600">
                {tile.label}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
