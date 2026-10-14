import { motion, useReducedMotion } from 'framer-motion';
import { imageProps, TYPE_LABEL } from './momentsUtils';
import { EASE, shutterImg, useParallax } from './motionKit';
import { MaskText, ShutterBar } from './MotionParts';

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } };
const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const medal = {
  hidden: { opacity: 0, scale: 0.3, rotate: -50 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 220, damping: 13, delay: 0.5 } },
};
const topBar = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: EASE } },
};
const shimmer = {
  hidden: { x: '-130%' },
  visible: { x: '230%', transition: { duration: 1.4, delay: 1.1, ease: [0.4, 0, 0.2, 1] } },
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
  const { ref: frameRef, y: parY } = useParallax(reduce, 4);

  return (
    <motion.article
      variants={container}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      className="relative overflow-hidden rounded-[24px] border border-gold-500/40 bg-white shadow-[0_10px_50px_rgba(0,72,88,0.08)]"
    >
      <motion.span variants={topBar} className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gold-500" aria-hidden="true" />

      <div className="grid lg:grid-cols-12 items-center">
        {/* Photograph - never upscaled past its natural width */}
        <div className={`lg:col-span-6 p-5 sm:p-8 lg:p-10 ${flip ? 'lg:order-2' : ''}`}>
          <motion.button
            type="button"
            ref={frameRef}
            onClick={(e) => onOpen(moment, e.currentTarget)}
            aria-label={`View moment: ${moment.title}`}
            className="group relative mx-auto block w-full overflow-hidden rounded-[14px] border-0 bg-surface-100 p-0 cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-600"
            style={{ aspectRatio: img.ratio, maxWidth: img.width ? Math.min(Math.max(img.width, 400), 480) : undefined }}
          >
            <ShutterBar />
            <motion.img
              variants={shutterImg}
              style={{ y: parY }}
              src={img.src}
              srcSet={img.srcSet}
              sizes="(min-width: 1024px) 600px, 100vw"
              alt={moment.alt}
              width={img.width}
              height={img.height}
              loading="lazy"
              decoding="async"
              className="absolute inset-x-0 -top-[5%] h-[110%] w-full max-w-none object-cover"
            />
            <motion.span
              aria-hidden="true"
              variants={shimmer}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent"
            />
            <span className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 lg:block lg:group-hover:opacity-100" />
            <span className="pointer-events-none absolute bottom-4 left-5 hidden translate-y-2 font-body text-[11px] font-bold uppercase tracking-[0.18em] text-white opacity-0 transition-all duration-500 lg:block lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
              View moment →
            </span>
          </motion.button>
        </div>

        {/* Text */}
        <motion.div variants={rise} className="lg:col-span-6 px-6 pb-8 sm:px-10 sm:pb-12 lg:px-12 lg:py-12">
          <motion.div variants={medal} className="inline-block text-gold-600"><MedalIcon /></motion.div>
          <span className="mt-4 block font-body text-[12px] font-bold uppercase tracking-[0.2em] text-gold-600">
            {TYPE_LABEL.award}
          </span>
          <h3 aria-label={moment.title} className="mt-3 mb-0 font-heading font-bold leading-[1.1] tracking-tight text-heading text-[clamp(1.75rem,3vw,2.75rem)]">
            <MaskText text={moment.title} />
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
