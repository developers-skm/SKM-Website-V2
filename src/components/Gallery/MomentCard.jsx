import { motion, useReducedMotion } from 'framer-motion';
import { imageProps, TYPE_LABEL } from './momentsUtils';

const EASE = [0.22, 1, 0.36, 1];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } };
const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const clip = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.95, ease: EASE } },
};
const settle = {
  hidden: { scale: 1.08 },
  visible: { scale: 1, transition: { duration: 1.4, ease: EASE } },
};

// Editorial placement on desktop (12-col row). Mobile is always a single column.
const PLACEMENT = {
  feature: { box: 'lg:col-start-1 lg:col-span-6', sizes: '(min-width: 1320px) 540px, (min-width: 1024px) 48vw, 100vw' },
  side: { box: 'lg:col-start-7 lg:col-span-5', sizes: '(min-width: 1320px) 450px, (min-width: 1024px) 40vw, 100vw' },
  quiet: { box: 'lg:col-start-2 lg:col-span-5', sizes: '(min-width: 1320px) 450px, (min-width: 1024px) 40vw, 100vw' },
  portrait: { box: 'lg:col-start-5 lg:col-span-4', sizes: '(min-width: 1024px) 32vw, 100vw' },
  // Fills one half of a two-column run (see YearSection) — no empty side space.
  half: { box: '', sizes: '(min-width: 1320px) 620px, (min-width: 1024px) 46vw, 100vw' },
};

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

export function DateMarker({ moment, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-[12px] font-semibold uppercase tracking-[0.16em] ${className}`}>
      <span className="h-[2px] w-8 bg-gold-600" aria-hidden="true" />
      {moment.label && <span className="text-heading">{moment.label}</span>}
      <span className="text-surface-500">{TYPE_LABEL[moment.type] ?? TYPE_LABEL.moment}</span>
    </div>
  );
}

export default function MomentCard({ moment, variant, onOpen }) {
  const reduce = useReducedMotion();
  const img = imageProps(moment.image, 1200);
  const place = PLACEMENT[variant === 'half' ? 'half' : img.ratio < 1 ? 'portrait' : variant];

  return (
    <motion.article
      className="grid grid-cols-12"
      variants={container}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    >
      <div className={`col-span-12 ${place.box}`}>
        <motion.div variants={rise}>
          <DateMarker moment={moment} className="mb-4" />
        </motion.div>

        <motion.button
          type="button"
          variants={clip}
          onClick={(e) => onOpen(moment, e.currentTarget)}
          aria-label={`View moment: ${moment.title}`}
          className="group relative block w-full max-h-[440px] overflow-hidden rounded-[18px] sm:rounded-[22px] border-0 bg-surface-200 p-0 cursor-pointer shadow-[0_2px_24px_rgba(0,0,0,0.07)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-600"
          style={{ aspectRatio: clamp(img.ratio, 0.8, 1.8) }}
        >
          <motion.img
            variants={settle}
            src={img.src}
            srcSet={img.srcSet}
            sizes={place.sizes}
            alt={moment.alt}
            width={img.width}
            height={img.height}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:scale-[1.03]"
          />
          {/* Desktop hover: soft gradient + label */}
          <span className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 lg:block lg:group-hover:opacity-100 group-focus-visible:opacity-100" />
          <span className="pointer-events-none absolute bottom-4 left-5 hidden translate-y-2 font-body text-[11px] font-bold uppercase tracking-[0.18em] text-white opacity-0 transition-all duration-500 lg:block lg:group-hover:translate-y-0 lg:group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            View moment →
          </span>
        </motion.button>

        <motion.div variants={rise} className="mt-5">
          <h3 className="m-0 font-heading font-bold leading-[1.15] tracking-tight text-heading text-[clamp(1.35rem,2.2vw,2rem)]">
            {moment.title}
          </h3>
          {moment.caption && (
            <p className="mt-2 mb-0 max-w-[52ch] font-body text-[15px] leading-[26px] text-surface-500">
              {moment.caption}
            </p>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
}
