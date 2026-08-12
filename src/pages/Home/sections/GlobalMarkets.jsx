import { motion, useReducedMotion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import HomeExportMap from './HomeExportMap';
import exportMarkets from '../../../data/exportMarkets';
import marketsByRegion from '../../../data/exportMarketRegions';
import useCountUp from '../../../utils/useCountUp';
import { fadeUp, EASE_PREMIUM } from '../../../utils/motionTokens';

// Section 9 — Global Presence. Editorial redesign: replaces the dashboard-
// style map card + sidebar legend with an oversized "30+" typographic
// statement (left, ~4/12) beside a large map that sits directly in the
// page with no card framing (right, ~8/12, pulled left via negative margin
// so the two blocks read as one composition instead of two disconnected
// components), then a plain 4-column regional index underneath (comma-
// separated country names per region — Asia / Middle East / Europe /
// Africa / Americas / Oceania, real continents of the real 28
// `exportMarkets`, not invented). Map implementation itself lives in the
// Home-scoped HomeExportMap.jsx (same react-simple-maps + real data as the
// shared ExportMarketsMap.jsx, not modified — see that file's own header
// for why it's a separate component instead of an edit to the shared one).
const branches = [
  { name: 'SKM Japan', tagline: 'Bridging Indian egg ingredient expertise with the Japanese market.', page: 'skm_japan' },
  { name: 'SKM Europe', tagline: 'Connecting Indian egg-based ingredients with the European food industry.', page: 'skm_europe' },
  { name: 'SKM Russia', tagline: 'Establishing a trusted supply chain for Indian egg ingredients across Russia.', page: 'skm_russia' },
];

function CountBig({ value }) {
  const { ref, display } = useCountUp(value, { duration: 1.3 });
  return (
    <strong ref={ref} className="block font-heading font-black text-brand-600 dark:text-brand-400 leading-[0.85] tracking-tight tabular-nums text-[26vw] sm:text-[110px] lg:text-[132px] m-0">
      {display}
    </strong>
  );
}

export default function GlobalMarkets({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-white dark:bg-surface-900/40 py-[110px] lg:py-[140px]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">

        {/* Split — typography left (~36%), large map right (~64%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-14 lg:mb-16">

          <motion.div {...fadeUp(reduceMotion)} className="lg:col-span-4 flex flex-col gap-5 lg:relative lg:z-10">
            <span className="section-label">Global Presence</span>
            <h2 className="font-heading font-bold text-[36px] sm:text-[44px] lg:text-[48px] text-heading dark:text-white leading-[1.05] tracking-tight m-0">
              Exporting to
            </h2>
            <CountBig value="30+" />
            <p className="font-heading font-bold text-[24px] sm:text-[30px] lg:text-[34px] text-heading dark:text-white leading-[1.1] tracking-tight -mt-4 m-0">
              countries.
            </p>
            <p className="font-body text-[15px] lg:text-[16px] text-surface-600 dark:text-surface-400 leading-[1.7] max-w-xs mt-2 m-0">
              With decades of experience and world-class certifications, SKM reliably exports and distributes premium egg solutions to food producers worldwide.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <InternalLink
                route="global_reach"
                onPageChange={onPageChange}
                className="inline-flex items-center gap-2.5 min-h-[46px] px-6 py-3 rounded-full bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] transition-all duration-[250ms] shadow-[0_4px_20px_rgba(228,10,24,0.2)] hover:shadow-[0_6px_24px_rgba(228,10,24,0.32)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Explore Global Reach
              </InternalLink>
              <InternalLink
                route="contact-us"
                onPageChange={onPageChange}
                className="group inline-flex items-center gap-2 font-body font-semibold text-[15px] text-heading dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-[250ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
              >
                Contact Regional Sales
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className={reduceMotion ? '' : 'group-hover:translate-x-0.5 transition-transform duration-[250ms]'} aria-hidden>
                  <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
                  <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
                </svg>
              </InternalLink>
            </div>
          </motion.div>

          {/* Map — large, no card framing, allowed to bleed slightly toward
              the typography block so the two read as one composition. */}
          <div className="lg:col-span-8 lg:-ml-8 xl:-ml-16">
            <HomeExportMap />
          </div>
        </div>

        {/* Regional index — max 4 columns, real continents of the real
            export markets, thin rules, no legend sidebar, no country pills */}
        <motion.div {...fadeUp(reduceMotion, { delay: 0.1 })} className="border-t border-surface-200/70 dark:border-surface-800 pt-10 lg:pt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-9">
            <span className="font-body text-[13px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500">
              Our Markets
            </span>
            <span className="font-body text-[13px] text-surface-400 dark:text-surface-500">
              {exportMarkets.length} export markets served worldwide
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
            {marketsByRegion.map((group, i) => (
              <motion.div
                key={group.region}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : i * 0.08, ease: EASE_PREMIUM }}
                className="flex flex-col gap-3"
              >
                <h4 className="font-heading font-bold text-[13px] uppercase tracking-wide text-brand-600 dark:text-brand-400 m-0">
                  {group.region}
                </h4>
                <p className="font-body text-[15px] lg:text-[16px] text-surface-600 dark:text-surface-400 leading-[1.75] m-0">
                  {group.markets.map((m) => m.name).join(', ')}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Regional branch highlights — real taglines, real routes */}
        <motion.div {...fadeUp(reduceMotion, { delay: 0.15 })} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 lg:mt-14 pt-10 lg:pt-12 border-t border-surface-200/70 dark:border-surface-800">
          {branches.map((branch) => (
            <InternalLink
              key={branch.page}
              route={branch.page}
              onPageChange={onPageChange}
              className="group flex flex-col gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
            >
              <span className="font-heading font-bold text-[16px] text-heading dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-[250ms]">
                {branch.name}
              </span>
              <span className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 leading-[1.5]">
                {branch.tagline}
              </span>
            </InternalLink>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
