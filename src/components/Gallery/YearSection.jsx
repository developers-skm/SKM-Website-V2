import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import MomentCard from './MomentCard';
import AwardMoment from './AwardMoment';
import { EASE } from './motionKit';
import { MaskText } from './MotionParts';

// One year: a large year anchor, then that year's moments in order. Layout is
// derived from position and type - nothing here is per-item.
export default function YearSection({ group, onOpen }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const driftX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-36, 36]);
  // Position within its own kind: awards alternate sides, other moments cycle
  // through the editorial pattern.
  const seen = { award: 0, plain: 0 };
  const placed = group.items.map((m) => {
    const kind = m.award ? 'award' : 'plain';
    const n = seen[kind];
    seen[kind] += 1;
    return { m, n };
  });

  // Consecutive plain moments are grouped into one run; awards stay full-width.
  const blocks = [];
  placed.forEach(({ m, n }) => {
    const last = blocks[blocks.length - 1];
    if (m.award) blocks.push({ award: true, m, n });
    else if (last && !last.award) last.items.push(m);
    else blocks.push({ items: [m] });
  });

  return (
    <section ref={sectionRef} id={`year-${group.id}`} aria-label={group.label} className="scroll-mt-[88px] py-12 lg:py-20">
      <motion.header
        className="mb-10 lg:mb-16 flex items-end gap-5 lg:gap-8"
        initial={reduce ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.h2 style={{ x: driftX }} aria-label={group.label} className="m-0 font-heading font-bold leading-[0.85] tracking-[-0.04em] text-heading text-[clamp(4rem,11vw,9rem)]">
          <MaskText text={group.label} by="char" stagger={0.09} duration={1} />
        </motion.h2>
        <motion.span
          aria-hidden="true"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.3, ease: EASE } } }}
          className="mb-[0.6em] h-[2px] flex-1 origin-left bg-gradient-to-r from-gold-500 to-transparent"
        />
        <motion.span
          variants={{ hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } } }}
          className="mb-3 shrink-0 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-surface-500">
          {group.items.length} {group.items.length === 1 ? 'moment' : 'moments'}
        </motion.span>
      </motion.header>

      <div className="flex flex-col gap-14 lg:gap-24">
        {blocks.map((b) =>
          b.award ? (
            <AwardMoment key={b.m.id} moment={b.m} flip={b.n % 2 === 1} onOpen={onOpen} />
          ) : b.items.length === 1 ? (
            // A lone photo (no neighbour to fill the other column): image on one side, text fills the rest.
            <MomentCard key={b.items[0].id} moment={b.items[0]} variant="split" flip={Number(group.id) % 2 === 1} onOpen={onOpen} />
          ) : (
            // Plain moments flow in two columns so the next one fills the side
            // space; the right column is dropped for a staggered rhythm. An odd
            // one out at the end would leave an empty side, so it gets the split
            // layout instead (image left, text on the right).
            <div key={b.items[0].id} className="flex flex-col gap-14 lg:gap-24">
              <div className="grid items-start gap-x-10 gap-y-14 lg:grid-cols-2 xl:gap-x-14">
                {(b.items.length % 2 ? b.items.slice(0, -1) : b.items).map((m, i) => (
                  <div key={m.id} className={i % 2 === 1 ? 'lg:mt-24' : ''}>
                    <MomentCard moment={m} variant="half" onOpen={onOpen} />
                  </div>
                ))}
              </div>
              {b.items.length % 2 === 1 && (
                <MomentCard moment={b.items[b.items.length - 1]} variant="split" onOpen={onOpen} />
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
}
