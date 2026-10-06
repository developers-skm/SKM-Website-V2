import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

// Full-width white bar docked to the top of the viewport once the hero has
// scrolled away. Years come from the data (never empty); the type filter is
// secondary and only lists types that exist. A thin red line tracks progress
// through the timeline.
export default function YearNav({ groups, filters, filter, onFilter, trackRef }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(groups[0]?.id);
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef(null);
  const listRef = useRef(null);
  const pillRefs = useRef({});

  // Progress through the timeline (springy so it feels smooth, not jittery).
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 85%', 'end 30%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  // Know when the bar is actually docked, to add the shadow.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => setStuck(!e.isIntersecting && e.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Highlight the year currently in the reading zone.
  useEffect(() => {
    const els = groups.map((g) => document.getElementById(`year-${g.id}`)).filter(Boolean);
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id.replace('year-', '')));
      },
      { rootMargin: '-20% 0px -65% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [groups]);

  // Keep the active year visible when the row scrolls sideways (mobile).
  useEffect(() => {
    const list = listRef.current;
    const pill = pillRefs.current[active];
    if (!list || !pill) return;
    list.scrollTo({
      left: pill.offsetLeft - list.clientWidth / 2 + pill.clientWidth / 2,
      behavior: reduce ? 'auto' : 'smooth',
    });
  }, [active, reduce]);

  const jump = (id) => {
    document
      .getElementById(`year-${id}`)
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  const slide = reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 };
  const pill =
    'relative shrink-0 rounded-full border-0 bg-transparent px-4 py-2 font-body text-[13px] font-semibold tracking-wide cursor-pointer transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600';

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="-mb-px h-px" />

      <div
        className={`sticky top-0 z-30 w-full border-b bg-white/95 backdrop-blur-md transition-shadow duration-500 pr-[84px] pl-4 sm:pr-[100px] sm:pl-6 lg:pr-[140px] lg:pl-8 min-[1500px]:px-8 ${
          stuck ? 'border-transparent shadow-[0_6px_30px_rgba(0,0,0,0.08)]' : 'border-surface-200'
        }`}
      >
        <div className="mx-auto flex h-[64px] max-w-[1320px] items-center justify-between gap-4">
          {/* Years */}
          <nav
            ref={listRef}
            aria-label="Jump to year"
            className="flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,#000_16px,#000_calc(100%-16px),transparent)]"
          >
            <span className="mr-2 hidden shrink-0 font-body text-[11px] font-bold uppercase tracking-[0.18em] text-surface-400 sm:block">
              Timeline
            </span>
            {groups.map((g) => {
              const on = g.id === active;
              return (
                <button
                  key={g.id}
                  ref={(el) => {
                    pillRefs.current[g.id] = el;
                  }}
                  type="button"
                  onClick={() => jump(g.id)}
                  aria-current={on ? 'true' : undefined}
                  className={`${pill} tabular-nums ${on ? 'text-white' : 'text-surface-600 hover:text-brand-600'}`}
                >
                  {on && (
                    <motion.span
                      layoutId="year-pill"
                      transition={slide}
                      className="absolute inset-0 rounded-full bg-brand-600 shadow-[0_4px_14px_rgba(228,10,24,0.35)]"
                    />
                  )}
                  <span className="relative">{g.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Secondary filter */}
          {filters.length > 1 && (
            <div
              role="group"
              aria-label="Filter moments"
              className="hidden shrink-0 items-center gap-1 border-l border-surface-200 pl-4 md:flex"
            >
              {filters.map((f) => {
                const on = f.id === filter;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => onFilter(f.id)}
                    className={`${pill} text-[12px] ${on ? 'text-brand-600' : 'text-surface-500 hover:text-heading'}`}
                  >
                    {on && (
                      <motion.span
                        layoutId="filter-pill"
                        transition={slide}
                        className="absolute inset-0 rounded-full bg-brand-50 ring-1 ring-brand-200"
                      />
                    )}
                    <span className="relative">{f.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Timeline progress */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[-1px] h-[3px] origin-left bg-brand-600"
          style={{ scaleX: reduce ? scrollYProgress : progress }}
          initial={false}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </div>

      {/* Filters on small screens: a compact second row (hidden on md+) */}
      {filters.length > 1 && (
        <div className="md:hidden">
          <div
            role="group"
            aria-label="Filter moments"
            className="mx-auto flex max-w-[1320px] items-center gap-1 overflow-x-auto px-4 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6"
          >
            {filters.map((f) => {
              const on = f.id === filter;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onFilter(f.id)}
                  className={`${pill} border border-surface-200 bg-white text-[12px] ${on ? '!border-brand-600 text-brand-600' : 'text-surface-500'}`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
