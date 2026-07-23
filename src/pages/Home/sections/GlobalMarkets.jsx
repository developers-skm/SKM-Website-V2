import { motion, useReducedMotion } from 'framer-motion';
import ExportMarketsMap from '../../../components/GlobalMap/ExportMarketsMap';
import InternalLink from '../../../components/common/InternalLink';
import exportMarkets from '../../../data/exportMarkets';

// Section 7 — Global Reach & Supply Support. Split layout: content left,
// the real interactive export map right (same ExportMarketsMap component
// used on the Global Reach hub page — not replaced or duplicated). Branch
// cards use each branch's real tagline verbatim (from GlobalReachPage.jsx's
// own `branches` data / the individual SkmJapanPage/SkmEuropePage/
// SkmRussiaPage tagline fields) — no invented card copy. Regional-support
// items are drawn from real branch `activities` entries (warehousing,
// transport coordination, customer interaction), not a fabricated feature
// list. Icons are inline SVGs matching this codebase's existing icon
// pattern — no new icon-library dependency.
const branches = [
  { name: 'SKM Japan', tagline: 'Bridging Indian egg ingredient expertise with the Japanese market.', page: 'skm_japan' },
  { name: 'SKM Europe', tagline: 'Connecting Indian egg-based ingredients with the European food industry.', page: 'skm_europe' },
  { name: 'SKM Russia', tagline: 'Establishing a trusted supply chain for Indian egg ingredients across Russia.', page: 'skm_russia' },
];

// Real activities shared across all 3 branch pages (SkmJapanPage.jsx,
// SkmEuropePage.jsx, SkmRussiaPage.jsx `activities` arrays) — the genuine
// regional-support/logistics functions each branch performs.
const regionalSupport = [
  {
    label: 'Warehousing',
    description: 'Warehousing necessary stock close to your market.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75V19a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
    ),
  },
  {
    label: 'Transport Coordination',
    description: 'Coordination of transport from origin to destination.',
    icon: (
      <>
        <rect x="1" y="9" width="14" height="8" rx="1" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12h4l3 3v2h-7" />
        <circle cx="6" cy="19" r="1.6" />
        <circle cx="17.5" cy="19" r="1.6" />
      </>
    ),
  },
  {
    label: 'Customer Interaction',
    description: 'Direct interaction with customers and sales & marketing support.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.3-3.9A7.9 7.9 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    ),
  },
];

export default function GlobalMarkets({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  const fadeProps = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : delay, ease: [0.25, 1, 0.5, 1] },
  });

  return (
    <div className="w-full bg-white dark:bg-surface-900/40 py-[64px] lg:py-[92px]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">

        {/* Split layout — content left, map right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left — heading, description, branch highlights, CTAs */}
          <motion.div {...fadeProps()} className="lg:col-span-5 flex flex-col gap-7">
            <div className="flex flex-col gap-4">
              <span className="section-label">Global Footprint</span>
              <h2 className="font-heading font-bold text-[34px] sm:text-[42px] lg:text-[46px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
                Our Global Markets Presence
              </h2>
              <p className="font-body text-[16px] lg:text-[17px] text-surface-600 dark:text-surface-400 leading-[1.6] m-0">
                With decades of experience and world-class certifications, SKM reliably exports and distributes premium egg solutions to food producers worldwide.
              </p>
            </div>

            {/* Regional branch highlights — real taglines, real routes */}
            <div className="flex flex-col gap-3">
              {branches.map((branch) => (
                <InternalLink
                  key={branch.page}
                  route={branch.page}
                  onPageChange={onPageChange}
                  className="group flex items-start gap-3 p-4 bg-[#fdfbf7] dark:bg-surface-900 border border-surface-200/70 dark:border-surface-800 hover:border-brand-600/30 rounded-[16px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-600/8 dark:bg-brand-950/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
                    </svg>
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="font-heading font-bold text-[15px] text-heading dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
                      {branch.name}
                    </span>
                    <span className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 leading-[1.4]">
                      {branch.tagline}
                    </span>
                  </span>
                </InternalLink>
              ))}
            </div>

            {/* Regional support — real branch activities */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {regionalSupport.map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-brand-600 dark:text-brand-400" aria-hidden>
                    {item.icon}
                  </svg>
                  <span className="font-body font-semibold text-[13.5px] text-heading dark:text-white leading-tight">
                    {item.label}
                  </span>
                  <span className="font-body text-[12.5px] text-surface-500 dark:text-surface-400 leading-[1.4]">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <InternalLink
                route="global_reach"
                onPageChange={onPageChange}
                className="inline-flex items-center gap-2.5 min-h-[46px] px-6 py-3 rounded-full bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] transition-all duration-200 shadow-[0_4px_20px_rgba(228,10,24,0.2)] hover:shadow-[0_6px_24px_rgba(228,10,24,0.32)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Explore Global Reach
              </InternalLink>
              <InternalLink
                route="contact-us"
                onPageChange={onPageChange}
                className="inline-flex items-center gap-2.5 min-h-[46px] px-6 py-3 rounded-full bg-white dark:bg-surface-900 border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.05em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Contact Regional Sales
              </InternalLink>
            </div>
          </motion.div>

          {/* Right — the real interactive export map, unchanged */}
          <motion.div {...fadeProps(0.15)} className="lg:col-span-7">
            <div className="bg-page dark:bg-surface-950 border border-surface-200/60 dark:border-surface-800 rounded-[28px] p-4 sm:p-6 lg:p-8">
              <ExportMarketsMap />
            </div>
            <p className="font-body text-[13px] text-surface-400 dark:text-surface-500 text-center mt-4">
              {exportMarkets.length} export markets served worldwide
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
