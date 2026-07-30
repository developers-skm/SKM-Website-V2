import { motion, useReducedMotion } from 'framer-motion';
import { EASE_PREMIUM, DURATION, STAGGER } from '../../../utils/motionTokens';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ApplicationDetailHero({ application, productFamilies, onPageChange }) {
  const reduceMotion = useReducedMotion();

  const scrollToProducts = () => {
    document.getElementById('recommended-products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative w-full h-[640px] sm:h-[720px] lg:h-[820px] overflow-hidden flex items-center">
      {/* Signature entrance — curved mask sweeps open from center matching Home Hero */}
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { clipPath: 'inset(0% 42% 0% 42% round 50%)' }}
        animate={reduceMotion ? undefined : { clipPath: 'inset(0% 0% 0% 0% round 0%)' }}
        transition={{ duration: reduceMotion ? 0.01 : 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={application.image}
          alt={application.title}
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover select-none"
          initial={{ scale: reduceMotion ? 1 : 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduceMotion ? 0.01 : 8, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* Subtle yolk-gold light gradient — upper-right, echoes Home Hero */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{ background: 'radial-gradient(60% 55% at 82% 18%, rgba(232,182,74,0.5) 0%, rgba(232,182,74,0) 70%)' }}
      />

      {/* Once-only warm light sweep — soft diagonal gradient band drifts slowly */}
      {!reduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{
            background: 'linear-gradient(115deg, rgba(255,255,255,0) 42%, rgba(243,201,105,0.22) 50%, rgba(255,255,255,0) 58%)',
            backgroundSize: '260% 260%',
          }}
          initial={{ backgroundPosition: '120% 0%', opacity: 0 }}
          animate={{ backgroundPosition: '-20% 0%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.2, delay: 1.4, ease: EASE_PREMIUM, times: [0, 0.15, 0.75, 1] }}
        />
      )}

      {/* Scrim — left-weighted so copy stays legible while right side of photo stays clear */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(20,16,10,0.82) 0%, rgba(20,16,10,0.65) 42%, rgba(20,16,10,0.18) 70%, rgba(20,16,10,0.05) 100%)' }}
      />
      <div
        className="absolute inset-0 sm:hidden"
        style={{ background: 'linear-gradient(180deg, rgba(20,16,10,0.5) 0%, rgba(20,16,10,0.78) 100%)' }}
      />

      <div className="relative z-10 w-full mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : STAGGER } } }}
          className="flex flex-col gap-5 max-w-[640px]"
        >
          {/* Eyebrow Label matching ProductHero */}
          <motion.span
            variants={itemVariants}
            transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
            className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-white/90 self-start"
          >
            <span className="w-5 h-px bg-white/70" aria-hidden="true" />
            Application Solutions — {application.title}
          </motion.span>

          {/* Heading matching Home Hero */}
          <motion.h1
            variants={itemVariants}
            transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
            className="font-heading font-bold text-[clamp(36px,4.8vw,58px)] text-white leading-[1.05] tracking-tight m-0"
          >
            {application.problem}
          </motion.h1>

          {/* Intro Description */}
          <motion.p
            variants={itemVariants}
            transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
            className="font-body text-[16px] lg:text-[18px] text-white/90 leading-[1.6] m-0"
          >
            {application.intro}
          </motion.p>

          {/* Tags matching ProductHero style */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
            className="flex flex-wrap items-center gap-2"
          >
            {application.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 font-body text-[12.5px] font-semibold text-white"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Relevant Product Families Tags matching ProductHero */}
          {productFamilies.length > 0 && (
            <motion.div
              variants={itemVariants}
              transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
              className="flex flex-col gap-2"
            >
              <span className="font-body text-[11.5px] font-semibold uppercase tracking-wide text-white/60">
                Relevant Product Families
              </span>
              <div className="flex flex-wrap gap-2">
                {productFamilies.map((family) => (
                  <span
                    key={family}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-600/25 backdrop-blur-sm border border-brand-400/40 font-body text-[12.5px] font-semibold text-white"
                  >
                    {family}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Primary + secondary actions matching Home Hero */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2"
          >
            <button
              onClick={scrollToProducts}
              className="btn-primary-red min-h-[46px] justify-center"
            >
              Find The Recommended Product
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <button
              onClick={() => onPageChange('contact-us')}
              className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 rounded-[10px] border border-white/40 bg-white/10 backdrop-blur-sm text-white font-heading font-bold text-[13px] uppercase tracking-[0.03em] hover:bg-white hover:text-heading hover:border-white transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              Talk to an Application Specialist
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
