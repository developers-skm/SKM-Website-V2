import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ScrollFrameSequence from '../../../components/common/ScrollFrameSequence';
import { getBrochureUrl } from '../../../data/brochureUrl';
import { EASE_PREMIUM } from '../../../utils/motionTokens';

const ProductListPdf = getBrochureUrl('Product List - SKM Egg Products Export India Limited.pdf');
import useApplicationSelectorNavigation from '../../../components/Navbar/useApplicationSelectorNavigation';

// Full-bleed hero — the food-application photo fills the entire section,
// copy sits on top of it with a left-weighted gradient scrim for
// legibility (not a full-hero dark overlay — the right side of the photo
// stays clear). Every piece of copy below is either the exact
// user-approved heading or an exact verbatim fragment reused from existing
// approved repository content (see the source note on each block).
export default function Hero({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  const scrollToApplicationSelector = useApplicationSelectorNavigation();
  const scrubContainerRef = useRef(null);

  return (
    <section
      ref={scrubContainerRef}
      className="relative w-full h-[150vh]"
    >
      <div className="sticky top-0 h-[640px] sm:h-[720px] lg:h-[820px] w-full overflow-hidden">
        {/* Signature entrance — a soft curved (egg-inspired) mask sweeps open
            from center to reveal the hero visual, instead of a plain fade.
            Heading/CTA (below) animate on their own, independent timeline so
            they're never gated behind this. Max ~1.4s, runs once. */}
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? false : { clipPath: 'inset(0% 42% 0% 42% round 50%)' }}
          animate={reduceMotion ? undefined : { clipPath: 'inset(0% 0% 0% 0% round 0%)' }}
          transition={{ duration: reduceMotion ? 0.01 : 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Egg-cracking frame sequence — scrubbed by scroll position
              through the tall wrapper section above at every viewport
              width (same mechanism as product page section 1): frame 1
              (whole egg) at the top of the hero, frame 200 (cracked,
              spilled) once the user has scrolled through it. */}
          <ScrollFrameSequence containerRef={scrubContainerRef} basePath="/hero-sequence" frameCount={200} />
        </motion.div>

        {/* Subtle yolk-gold light gradient — low-opacity, upper-right, echoes
            the golden yolk in the visual without competing with the scrim */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{ background: 'radial-gradient(60% 55% at 82% 18%, rgba(232,182,74,0.5) 0%, rgba(232,182,74,0) 70%)' }}
        />

        {/* Once-only warm light sweep — a soft diagonal gradient band drifts
            slowly across the visual after the mask reveal settles, echoing the
            yolk's warmth in motion. Plain gradient only, no shapes/icons, so
            it never reads as a decorative symbol sitting on the photo. */}
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

        {/* Scrim — left-weighted so the copy stays legible while the right
            side of the visual stays clear */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(20,16,10,0.72) 0%, rgba(20,16,10,0.5) 42%, rgba(20,16,10,0.15) 68%, rgba(20,16,10,0.05) 100%)' }}
        />
        <div
          className="absolute inset-0 sm:hidden"
          style={{ background: 'linear-gradient(180deg, rgba(20,16,10,0.5) 0%, rgba(20,16,10,0.75) 100%)' }}
        />

        {/* Hero content container — left padding matches the logo's own
            left offset (Navbar.jsx: left-5 sm:left-8 lg:left-16) so the
            logo, headline, and everything below share one left edge. Top
            padding is this section's own responsibility (Layout's <main>
            reserves none, so the hero's background/image still starts at
            y=0) — clears the logo+menu row (~60-70px tall) plus breathing
            room before the heading. */}
        <div className="relative z-10 w-full h-full mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-16 pt-[100px] sm:pt-[145px] lg:pt-[160px] flex items-start sm:items-center">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col gap-3 sm:gap-5 max-w-[620px]"
          >
            {/* Exact approved heading — user-specified, verbatim */}
            <h1 className="font-heading font-bold text-[clamp(32px,8vw,62px)] leading-[1.15] sm:leading-[1.1] text-white tracking-tight m-0">
              Reliable Egg Ingredients for Food Manufacturers Worldwide.
            </h1>

            {/* Supporting message — verbatim, src/pages/Brochure/BrochurePage.jsx:21 */}
            <p className="font-body text-[15px] sm:text-[16px] lg:text-[18px] text-white/90 leading-[1.5] sm:leading-[1.6] m-0">
              Complete catalog of all SKM egg products — powders, liquids, customized mixes and specialty solutions available for global food producers.
            </p>

            <p className="font-body text-[14px] sm:text-[15px] lg:text-[16px] font-semibold text-white/95 m-0">
              30+ Countries Served
            </p>

            {/* Trust statement — two verbatim existing fragments, not merged
                into a new sentence. "Asia's largest integrated egg processing
                facility since 1996." and "BRCGS, Halal & Kosher certified."
                both already appear together in src/components/SEO/SEO.jsx's
                DEFAULT_DESCRIPTION and src/pages/Home/Home.jsx's own SEO
                description. */}
            <p className="font-body text-[13px] sm:text-[14px] lg:text-[15px] text-white/75 leading-[1.5] sm:leading-[1.6] m-0">
              Asia's largest integrated egg processing facility since 1996. BRCGS, Halal &amp; Kosher certified.
            </p>

            {/* Primary + secondary actions */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 mt-1 sm:mt-2">
              <button
                onClick={scrollToApplicationSelector}
                className="btn-primary-red min-h-[46px] justify-center"
              >
                Find the Right Egg Product
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button
                onClick={() => onPageChange('get-quote')}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 rounded-[10px] border border-white/40 bg-white/10 backdrop-blur-sm text-white font-heading font-bold text-[13px] uppercase tracking-[0.03em] hover:bg-white hover:text-heading hover:border-white transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                Request a Quote
              </button>
            </div>

            {/* Download Product Portfolio — real existing PDF asset */}
            <a
              href={ProductListPdf}
              download
              className="flex sm:inline-flex items-center justify-center sm:justify-start gap-2 mt-1 sm:mt-2 font-body font-semibold text-[13px] lg:text-[14px] uppercase tracking-[0.03em] text-white/90 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded-sm w-full sm:w-fit"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12" />
                <polyline points="7 10 12 15 17 10" />
                <path d="M5 19h14" />
              </svg>
              <span className="underline underline-offset-4 decoration-white/40 hover:decoration-white/80">
                Download Product Portfolio
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
