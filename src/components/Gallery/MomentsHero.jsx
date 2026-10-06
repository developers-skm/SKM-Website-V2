import { motion, useReducedMotion } from 'framer-motion';
import { imageProps } from './momentsUtils';

const EASE = [0.22, 1, 0.36, 1];

function Panel({ moment, className, delay, priority, reduce }) {
  const img = imageProps(moment.image, 1200);
  return (
    <motion.div
      className={`absolute overflow-hidden rounded-[18px] sm:rounded-[22px] bg-surface-200 ring-[5px] sm:ring-[7px] ring-page ${className}`}
      initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      <motion.img
        src={img.src}
        srcSet={img.srcSet}
        sizes="(min-width: 1024px) 560px, 80vw"
        alt={moment.alt}
        width={img.width}
        height={img.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: reduce ? 1 : 1.03 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, delay, ease: EASE }}
      />
    </motion.div>
  );
}

const reveal = (reduce, delay) => ({
  initial: reduce ? false : { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export default function MomentsHero({ photos }) {
  const reduce = useReducedMotion();
  const [a, b, c] = photos;

  return (
    <section
      aria-labelledby="gallery-title"
      className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8 pt-[104px] sm:pt-[124px] lg:pt-[108px] pb-10 lg:pb-14"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
        <div className="flex flex-col items-start">
          <motion.span className="section-label" {...reveal(reduce, 0.05)}>
            SKM Gallery
          </motion.span>
          <motion.h1
            id="gallery-title"
            className="m-0 font-heading font-bold leading-[1.02] tracking-[-0.03em] text-heading text-[clamp(2.5rem,5.2vw,4.75rem)]"
            {...reveal(reduce, 0.15)}
          >
            Moments That Define Our Journey
          </motion.h1>
          <motion.p
            className="mt-5 mb-0 max-w-[460px] font-body text-[16px] leading-[28px] text-surface-500"
            {...reveal(reduce, 0.35)}
          >
            A collection of milestones, celebrations, recognitions and memorable moments from the
            SKM journey.
          </motion.p>
          <motion.span
            aria-hidden="true"
            className="mt-8 h-[2px] w-16 origin-left bg-gold-500"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          />
        </div>

        <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[min(430px,52vh)]">
          {a && <Panel moment={a} priority reduce={reduce} delay={0.2} className="right-0 top-0 h-[80%] w-[82%]" />}
          {b && <Panel moment={b} reduce={reduce} delay={0.5} className="bottom-0 left-0 h-[46%] w-[46%]" />}
          {c && <Panel moment={c} reduce={reduce} delay={0.75} className="right-[6%] bottom-0 hidden h-[34%] w-[30%] sm:block" />}
        </div>
      </div>
    </section>
  );
}
