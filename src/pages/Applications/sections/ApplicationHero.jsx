import { motion, useReducedMotion } from 'framer-motion';
import { EASE_PREMIUM, DURATION, STAGGER } from '../../../utils/motionTokens';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ApplicationHero({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  const scrollToCategories = () => {
    document.getElementById('application-categories')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          src="https://images.unsplash.com/photo-1713176679770-1ab32be3fb38?fm=jpg&q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0"
          srcSet="https://images.unsplash.com/photo-1713176679770-1ab32be3fb38?fm=jpg&q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0 1200w, https://images.unsplash.com/photo-1713176679770-1ab32be3fb38?fm=jpg&q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0 2400w"
          sizes="100vw"
          alt="Wooden crate filled with white eggs"
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
        style={{ background: 'linear-gradient(90deg, rgba(20,16,10,0.78) 0%, rgba(20,16,10,0.58) 42%, rgba(20,16,10,0.18) 70%, rgba(20,16,10,0.05) 100%)' }}
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
            Applications Hub
          </motion.span>

          {/* Heading matching Home Hero */}
          <motion.h1
            variants={itemVariants}
            transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
            className="font-heading font-bold text-[clamp(38px,5.2vw,62px)] text-white leading-[1.1] tracking-tight m-0"
          >
            What Are We Manufacturing?
          </motion.h1>

          {/* Supporting paragraph matching Home Hero */}
          <motion.p
            variants={itemVariants}
            transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
            className="font-body text-[16px] lg:text-[18px] text-white/90 leading-[1.6] m-0"
          >
            Food manufacturers usually think about the product they're developing before they think about an egg product code. Start with what you're making, and we'll point you to the right ingredient.
          </motion.p>

          {/* Primary + secondary actions matching Home Hero */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: reduceMotion ? 0.01 : DURATION.cardHover, ease: EASE_PREMIUM }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2"
          >
            <button
              onClick={scrollToCategories}
              className="btn-primary-red min-h-[46px] justify-center"
            >
              Select Your Application
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <button
              onClick={() => onPageChange('contact-us')}
              className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 rounded-[10px] border border-white/40 bg-white/10 backdrop-blur-sm text-white font-heading font-bold text-[13px] uppercase tracking-[0.03em] hover:bg-white hover:text-heading hover:border-white transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              Talk to an Application Specialist
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
