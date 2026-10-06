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

function MedalIcon() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="19" r="10" />
      <path d="m24 14 1.8 3.7 4 .6-2.9 2.8.7 4L24 23.2 20.4 25l.7-4-2.9-2.8 4-.6L24 14Z" />
      <path d="m17 27-4 15 11-5 11 5-4-15" />
    </svg>
  );
}

// Honour & recognition: a wider, quieter, more prestigious layout than a normal
// moment. `flip` alternates which side the photograph sits on (desktop).
export default function AwardMoment({ moment, flip, onOpen }) {
  const reduce = useReducedMotion();
  const img = imageProps(moment.image, 1200);

  return (
    <motion.article
      variants={container}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      className="relative overflow-hidden rounded-[24px] border border-gold-500/40 bg-white shadow-[0_10px_50px_rgba(0,72,88,0.08)]"
    >
      <span className="absolute inset-x-0 top-0 h-[3px] bg-gold-500" aria-hidden="true" />

      <div className="grid lg:grid-cols-12 items-center">
        {/* Photograph — never upscaled past its natural width */}
        <div className={`lg:col-span-7 p-5 sm:p-8 lg:p-12 ${flip ? 'lg:order-2' : ''}`}>
          <motion.button
            type="button"
            variants={clip}
            onClick={(e) => onOpen(moment, e.currentTarget)}
            aria-label={`View moment: ${moment.title}`}
            className="group relative mx-auto block w-full overflow-hidden rounded-[14px] border-0 bg-surface-100 p-0 cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-600"
            style={{ aspectRatio: img.ratio, maxWidth: img.width ? Math.max(img.width, 560) : undefined }}
          >
            <img
              src={img.src}
              srcSet={img.srcSet}
              sizes="(min-width: 1024px) 600px, 100vw"
              alt={moment.alt}
              width={img.width}
              height={img.height}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 lg:block lg:group-hover:opacity-100" />
            <span className="pointer-events-none absolute bottom-4 left-5 hidden translate-y-2 font-body text-[11px] font-bold uppercase tracking-[0.18em] text-white opacity-0 transition-all duration-500 lg:block lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
              View moment →
            </span>
          </motion.button>
        </div>

        {/* Text */}
        <motion.div variants={rise} className="lg:col-span-5 px-6 pb-8 sm:px-10 sm:pb-12 lg:px-12 lg:py-12">
          <div className="text-gold-600"><MedalIcon /></div>
          <span className="mt-4 block font-body text-[12px] font-bold uppercase tracking-[0.2em] text-gold-600">
            {TYPE_LABEL.award}
          </span>
          <h3 className="mt-3 mb-0 font-heading font-bold leading-[1.1] tracking-tight text-heading text-[clamp(1.75rem,3vw,2.75rem)]">
            {moment.title}
          </h3>
          {moment.caption && (
            <p className="mt-4 mb-0 max-w-[40ch] font-body text-[15px] leading-[26px] text-surface-500">
              {moment.caption}
            </p>
          )}
          {moment.label && (
            <div className="mt-6 flex items-center gap-3 font-heading text-[18px] font-bold tabular-nums text-heading">
              <span className="h-[2px] w-8 bg-gold-600" aria-hidden="true" />
              {moment.label}
            </div>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
}
