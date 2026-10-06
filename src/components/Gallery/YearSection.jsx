import { motion, useReducedMotion } from 'framer-motion';
import MomentCard from './MomentCard';
import AwardMoment from './AwardMoment';

const EASE = [0.22, 1, 0.36, 1];
const PATTERN = ['feature', 'side', 'quiet'];

// One year: a large year anchor, then that year's moments in order. Layout is
// derived from position and type — nothing here is per-item.
export default function YearSection({ group, onOpen }) {
  const reduce = useReducedMotion();
  // Position within its own kind: awards alternate sides, other moments cycle
  // through the editorial pattern.
  const seen = { award: 0, plain: 0 };
  const placed = group.items.map((m) => {
    const kind = m.award ? 'award' : 'plain';
    const n = seen[kind];
    seen[kind] += 1;
    return { m, n };
  });

  return (
    <section id={`year-${group.id}`} aria-label={group.label} className="scroll-mt-[88px] py-12 lg:py-20">
      <motion.header
        className="mb-10 lg:mb-16 flex items-end gap-5 lg:gap-8"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <h2 className="m-0 font-heading font-bold leading-[0.85] tracking-[-0.04em] text-heading text-[clamp(4rem,11vw,9rem)]">
          {group.label}
        </h2>
        <span aria-hidden="true" className="mb-[0.6em] h-[2px] flex-1 bg-gradient-to-r from-gold-500 to-transparent" />
        <span className="mb-3 shrink-0 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-surface-500">
          {group.items.length} {group.items.length === 1 ? 'moment' : 'moments'}
        </span>
      </motion.header>

      <div className="flex flex-col gap-14 lg:gap-24">
        {placed.map(({ m, n }) =>
          m.award ? (
            <AwardMoment key={m.id} moment={m} flip={n % 2 === 1} onOpen={onOpen} />
          ) : (
            <MomentCard key={m.id} moment={m} variant={PATTERN[n % PATTERN.length]} onOpen={onOpen} />
          )
        )}
      </div>
    </section>
  );
}
