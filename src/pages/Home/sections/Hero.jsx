import { motion, useReducedMotion } from 'framer-motion';
import GoldenEggImg from '../../../assets/Golden Egg Picture.webp';
import ProductListPdf from '../../../assets/Brouchers/Product List - SKM Egg Products Export India Limited.pdf';
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

  return (
    <section className="relative w-full h-[640px] sm:h-[720px] lg:h-[820px] overflow-hidden flex items-center">
      <motion.img
        src={GoldenEggImg}
        alt="A cracked egg revealing a rich golden yolk"
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: reduceMotion ? 1 : 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0.01 : 1.1, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* Scrim — left-weighted so the copy stays legible while the right
          side of the photo (the yolk itself) stays clear */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(20,16,10,0.72) 0%, rgba(20,16,10,0.5) 42%, rgba(20,16,10,0.15) 68%, rgba(20,16,10,0.05) 100%)' }}
      />
      <div
        className="absolute inset-0 sm:hidden"
        style={{ background: 'linear-gradient(180deg, rgba(20,16,10,0.5) 0%, rgba(20,16,10,0.75) 100%)' }}
      />

      <div className="relative z-10 w-full mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col gap-5 max-w-[620px]"
        >
          {/* Exact approved heading — user-specified, verbatim */}
          <h1 className="font-heading font-bold text-[clamp(38px,5.2vw,62px)] text-white leading-[1.1] tracking-tight m-0">
            Reliable Egg Ingredients for Food Manufacturers Worldwide.
          </h1>

          {/* Supporting message — verbatim, src/pages/Brochure/BrochurePage.jsx:21 */}
          <p className="font-body text-[16px] lg:text-[18px] text-white/90 leading-[1.6] m-0">
            Complete catalog of all SKM egg products — powders, liquids, customized mixes and specialty solutions available for global food producers.
          </p>

          {/* Export-capability proof — verbatim, src/pages/Home/sections/TrustBar.jsx:8 */}
          <p className="font-body text-[15px] lg:text-[16px] font-semibold text-white/95 m-0">
            30+ Countries Served
          </p>

          {/* Trust statement — two verbatim existing fragments, not merged
              into a new sentence. "Asia's largest integrated egg processing
              facility since 1996." and "BRCGS, Halal & Kosher certified."
              both already appear together in src/components/SEO/SEO.jsx's
              DEFAULT_DESCRIPTION and src/pages/Home/Home.jsx's own SEO
              description. */}
          <p className="font-body text-[14px] lg:text-[15px] text-white/75 leading-[1.6] m-0">
            Asia's largest integrated egg processing facility since 1996. BRCGS, Halal &amp; Kosher certified.
          </p>

          {/* Primary + secondary actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
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
            className="inline-flex items-center gap-2 mt-1 font-body font-semibold text-[14px] lg:text-[15px] text-white hover:text-white/80 underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded-sm w-fit"
          >
            Download Product Portfolio
          </a>
        </motion.div>
      </div>
    </section>
  );
}
