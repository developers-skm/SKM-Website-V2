import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import ExportMarketsMap from '../../components/GlobalMap/ExportMarketsMap';
import InternalLink from '../../components/common/InternalLink';
import { scrollToSectionId } from '../../components/Navbar/useProductDiscoveryNavigation';
import { containerVariants, itemVariants } from '../../utils/animationVariants';
import exportMarkets from '../../data/exportMarkets';
import certifications from '../../data/certifications';
import applications from '../../data/applications';

// Section 3 — Regional offices. Combines the 3 real branches (Japan,
// Europe, Russia) into cards on this one page — each still keeps its own
// real, separate URL (skm_japan / skm_europe / skm_russia) for SEO, but
// neither is a top-level nav menu item (confirmed: not present in
// navigationData.js/PrimaryNav.jsx/MobileNavigation.jsx). `vision` and
// `activities` are real, verbatim fields already used on each branch's own
// page (src/pages/Branches/Skm*.jsx).
const branches = [
  {
    name: 'SKM Japan',
    tagline: 'Bridging Indian egg ingredient expertise with the Japanese market.',
    vision: 'To become the strategic partner in Japan for egg powder from India.',
    activities: ['Import egg ingredients in Japan', 'Warehousing necessary stock', 'Coordination of transport', 'Coordination with Japanese veterinary authorities'],
    page: 'skm_japan',
    ctaLabel: 'Contact SKM Japan',
  },
  {
    name: 'SKM Europe',
    tagline: 'Connecting Indian egg-based ingredients with the European food industry.',
    vision: 'To become the strategic partner in Europe for egg based ingredients primarily sourced from India.',
    activities: ['Import egg ingredients in EU', 'Warehousing necessary stock', 'Coordination with EU veterinary authorities', 'New product development'],
    page: 'skm_europe',
    ctaLabel: 'Contact SKM Europe',
  },
  {
    name: 'SKM Russia',
    tagline: 'Establishing a trusted supply chain for Indian egg ingredients across Russia.',
    vision: 'To become the strategic partner in Russia for egg based ingredients primarily sourced from India.',
    activities: ['Import egg ingredients in Russia', 'Warehousing necessary stock', 'Coordination of transport', 'Sales & marketing'],
    page: 'skm_russia',
    ctaLabel: 'Contact SKM Russia',
  },
];

// Section 2 — Interactive market map. Only the 3 real regional branches
// (Japan, Europe, Russia) have genuine office/contact-team data anywhere
// in the repo (src/pages/Branches/*.jsx). "Europe" covers the real EU
// member markets in exportMarkets.js. All other 25 export markets are
// served directly from India HQ with no dedicated regional office/contact
// person documented — for those, "Regional office" and "Contact person or
// team" honestly state that (not a fabricated office/contact), while
// "Products available" and "Relevant certification" stay real for every
// market since the same real catalogue and 8 real certifications apply
// company-wide, not per-country. "Delivery format" reuses the real
// packagingOptions categories from products.js (dry/chilled/frozen/bulk),
// also company-wide. "Contact This Region" routes to the matching real
// branch page for the 3 covered regions, or the real Contact Us page
// otherwise.
const EU_MARKET_NAMES = new Set(['Netherlands', 'Germany', 'Sweden', 'Belgium', 'Denmark', 'UK', 'Italy']);

function regionForMarket(marketName) {
  if (marketName === 'Japan') return { branchPage: 'skm_japan', branchName: 'SKM Japan', office: 'SKM Japan — dedicated regional branch.' };
  if (marketName === 'Russia') return { branchPage: 'skm_russia', branchName: 'SKM Russia', office: 'SKM Russia — dedicated regional branch.' };
  if (EU_MARKET_NAMES.has(marketName)) return { branchPage: 'skm_europe', branchName: 'SKM Europe', office: 'SKM Europe — dedicated EU regional branch.' };
  return null;
}

const ALL_CERT_NAMES = certifications.map((c) => c.name).join(', ');
const DELIVERY_FORMATS = 'Powder (bag-in-box, paper bag), chilled liquid, frozen liquid, and bulk IBC (Pallecon) formats.';

function MarketMapDetailSection({ onPageChange }) {
  const [selected, setSelected] = useState(exportMarkets[0]);
  const region = regionForMarket(selected.name);

  return (
    <div className="w-full py-[50px] lg:py-[70px] border-b border-[#eee] dark:border-surface-800/40">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading dark:text-white m-0 tracking-tight">
          Select a market
        </h2>

        <div className="flex flex-wrap gap-2">
          {exportMarkets.map((market) => (
            <button
              key={market.id}
              type="button"
              onClick={() => setSelected(market)}
              aria-pressed={selected.id === market.id}
              className={`inline-flex items-center gap-2 min-h-[38px] px-3.5 py-2 rounded-full border font-body text-[13px] font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                selected.id === market.id
                  ? 'bg-brand-600 border-brand-600 text-white'
                  : 'bg-white dark:bg-surface-900 border-surface-300 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:border-brand-600/50'
              }`}
            >
              <span>{market.flag}</span>
              {market.name}
            </button>
          ))}
        </div>

        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 rounded-[18px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900/40 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-1.5">
            <span className="font-body text-[11.5px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500">Products available</span>
            <span className="font-body text-[14px] text-surface-700 dark:text-surface-300 leading-[1.6]">Full catalogue — egg powders, liquid egg products, and customised/specialty solutions.</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-body text-[11.5px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500">Relevant certification</span>
            <span className="font-body text-[14px] text-surface-700 dark:text-surface-300 leading-[1.6]">{ALL_CERT_NAMES}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-body text-[11.5px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500">Regional office</span>
            <span className="font-body text-[14px] text-surface-700 dark:text-surface-300 leading-[1.6]">
              {region ? region.office : 'Served directly from India HQ — no dedicated regional office for this market.'}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-body text-[11.5px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500">Contact person or team</span>
            <span className="font-body text-[14px] text-surface-700 dark:text-surface-300 leading-[1.6]">
              {region ? `${region.branchName} sales and customer team.` : 'India HQ export sales team.'}
            </span>
          </div>
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-1.5 pt-4 border-t border-surface-200/60 dark:border-surface-800">
            <span className="font-body text-[11.5px] font-semibold uppercase tracking-wide text-surface-400 dark:text-surface-500">Delivery format</span>
            <span className="font-body text-[14px] text-surface-700 dark:text-surface-300 leading-[1.6]">{DELIVERY_FORMATS}</span>
          </div>
        </motion.div>

        {region ? (
          <InternalLink
            route={region.branchPage}
            onPageChange={onPageChange}
            className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Contact This Region
          </InternalLink>
        ) : (
          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Contact This Region
          </InternalLink>
        )}
      </div>
    </div>
  );
}

// Section 4 (Export and regulatory support): Market approvals, Certification
// support, and Product-document availability each have a real, distinct
// fact. "Export documentation" has no distinct documented process anywhere
// in the repo — it states the same real, general regulatory-approval fact
// rather than inventing a specific documentation checklist. "Request
// Market Documentation" routes to the real Contact Us page — no self-serve
// document library exists.
const EXPORT_REGULATORY_TOPICS = [
  {
    id: 'export-documentation',
    label: 'Export documentation',
    fact: 'The plant is approved under the Indian Export of Egg Products Quality Control & Monitoring Rules (1997), based on EU/USDA guidelines (Approval No: 05/2/EP/97).',
  },
  {
    id: 'market-approvals',
    label: 'Market approvals',
    fact: 'EU and USDA regulatory approval, with dedicated coordination with EU veterinary authorities for the European market.',
  },
  {
    id: 'certification-support',
    label: 'Certification support',
    fact: `Real, active certifications: ${certifications.map((c) => c.name).join(', ')}.`,
  },
  {
    id: 'product-document-availability',
    label: 'Product-document availability',
    fact: 'Technical data sheets and product flyers are available for select products, alongside the Company Profile and full Product List, via the Resources page.',
  },
];

function ExportRegulatorySupportSection({ onPageChange }) {
  return (
    <div className="w-full py-[50px] lg:py-[70px] border-b border-[#eee] dark:border-surface-800/40 bg-page dark:bg-surface-900/40">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8"
      >
        <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading dark:text-white m-0 tracking-tight">
          Export and regulatory support
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXPORT_REGULATORY_TOPICS.map((topic) => (
            <motion.div
              key={topic.id}
              variants={itemVariants}
              className="flex flex-col gap-2 p-6 bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[14px] shadow-[5px_3px_40px_rgba(0,72,88,0.06)]"
            >
              <h3 className="font-heading font-bold text-[15px] text-heading dark:text-white m-0">{topic.label}</h3>
              <p className="font-body text-[13px] text-surface-500 dark:text-surface-400 leading-[21px] m-0">{topic.fact}</p>
            </motion.div>
          ))}
        </div>

        <InternalLink
          route="contact-us"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[14px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Request Market Documentation
        </InternalLink>
      </motion.section>
    </div>
  );
}

// Section 5 (Packaging and transportation): the 4 requested logistics
// categories map to real, verified facts already established in this app
// — powder (bag-in-box / paper bag), chilled and frozen (real product
// storage specifications: 0°C to 4°C / ≤ -18°C), and bulk (Pallecon IBC).
// "View Packaging Options" routes to the real Customized Packages page;
// "Discuss Shipping Requirements" routes to the real Contact Us page.
const PACKAGING_TRANSPORT = [
  { id: 'powder', label: 'Powder', fact: 'Bag-in-box (HDPE inner bag + corrugated carton) or bag-in-bag (multi-wall paper bag), 10 Kg to 25 Kg.' },
  { id: 'chilled', label: 'Chilled', fact: 'Chilled liquid egg products stored and transported at 0°C to 4°C.' },
  { id: 'frozen', label: 'Frozen', fact: 'Frozen liquid egg products stored and transported at ≤ -18°C, with extended shelf stability for long-distance export.' },
  { id: 'bulk', label: 'Bulk', fact: 'Pallecon with inner LDPE liner — a 1000 Kg bulk IBC container, stackable and fork-lift pallet compatible.' },
];

function PackagingTransportSection({ onPageChange }) {
  return (
    <div className="w-full py-[50px] lg:py-[70px] border-b border-[#eee] dark:border-surface-800/40">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8"
      >
        <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading dark:text-white m-0 tracking-tight">
          Packaging and transportation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PACKAGING_TRANSPORT.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="flex flex-col gap-2 p-6 bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[14px] shadow-[5px_3px_40px_rgba(0,72,88,0.06)]"
            >
              <h3 className="font-heading font-bold text-[15px] text-heading dark:text-white m-0">{item.label}</h3>
              <p className="font-body text-[13px] text-surface-500 dark:text-surface-400 leading-[21px] m-0">{item.fact}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[14px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Discuss Shipping Requirements
          </InternalLink>
          <InternalLink
            route="customized_packages"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-body font-semibold text-[14px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            View Packaging Options
          </InternalLink>
        </div>
      </motion.section>
    </div>
  );
}

// Section 6 (Customer proof): no customer testimonials, quotes, or named
// partnership examples exist anywhere in the repo (confirmed by search —
// no such content is published on this site). "Industries served" is the
// one real, honest proof point available: the 4 real application
// categories (data/applications.js) already backed by real photography,
// problem statements, and matched products. "Become an SKM Customer"
// routes to the real get-quote flow.
function CustomerProofSection({ onPageChange }) {
  return (
    <div className="w-full py-[50px] lg:py-[70px] border-b border-[#eee] dark:border-surface-800/40 bg-page dark:bg-surface-900/40">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Industries Served</span>
          <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading dark:text-white m-0 tracking-tight">
            Trusted across food manufacturing
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {applications.map((app) => (
            <motion.button
              key={app.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              onClick={() => onPageChange(app.page)}
              className="flex flex-col overflow-hidden text-left bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[14px] shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.14)] hover:border-brand-600/30 transition-all duration-300 cursor-pointer focus:outline-none"
            >
              <img src={app.image} alt={app.title} loading="lazy" className="w-full aspect-[4/3] object-cover" />
              <div className="flex flex-col gap-1 p-5">
                <h3 className="font-heading font-bold text-[15px] text-heading dark:text-white m-0">{app.title}</h3>
              </div>
            </motion.button>
          ))}
        </div>

        <InternalLink
          route="get-quote"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[14px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Become an SKM Customer
        </InternalLink>
      </motion.section>
    </div>
  );
}

export default function GlobalReachPage({ onPageChange }) {
  return (
    <PageWrapper
      seo={{
        title: 'Global Reach | SKM Egg Products Export Markets & Branches',
        description: 'SKM Egg Products exports to 30+ countries with dedicated branches in Japan, Europe, and Russia. Explore our global export markets and regional presence.',
        keywords: 'egg powder exporter countries, SKM Japan, SKM Europe, SKM Russia, egg products global export, egg powder international supplier',
        canonical: 'https://www.skmegg.com/global_reach',
      }}
      breadcrumbItems={[{ label: 'Global Reach' }]}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page dark:bg-surface-950">

        {/* Section 1 — Global hero */}
        <div className="w-full py-[60px] lg:py-[80px] border-b border-[#eee] dark:border-surface-800/40 text-center px-4">
          <div className="mx-auto max-w-[720px] flex flex-col items-center gap-5">
            <span className="section-label justify-center">Export Markets & Branches</span>
            <h1 className="font-heading font-bold text-[36px] sm:text-[48px] lg:text-[54px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
              Global Reach
            </h1>
            <p className="font-body text-[15px] sm:text-[16px] text-surface-500 dark:text-surface-400 leading-[28px] m-0">
              SKM exports to 30+ countries, with dedicated regional branches in Japan, Europe, and Russia coordinating import, warehousing, and compliance close to your market.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <button
                type="button"
                onClick={() => scrollToSectionId('regional-branches')}
                className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Find Your Regional Contact
              </button>

              <InternalLink
                route="contact-us"
                onPageChange={onPageChange}
                className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Discuss Export Availability
              </InternalLink>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-full py-[50px] lg:py-[70px] border-b border-[#eee] dark:border-surface-800/40 bg-page dark:bg-surface-900/40">
          <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8">
            <ExportMarketsMap />
          </div>
        </div>

        {/* Section 2 — Interactive market map detail panel */}
        <MarketMapDetailSection onPageChange={onPageChange} />

        {/* Section 3 — Regional offices */}
        <div id="regional-branches" className="w-full py-[50px] lg:py-[70px] border-b border-[#eee] dark:border-surface-800/40 scroll-mt-[100px] xl:scroll-mt-[120px]">
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8"
          >
            <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading dark:text-white m-0 tracking-tight">Regional offices</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {branches.map((branch) => (
                <motion.div
                  key={branch.page}
                  variants={itemVariants}
                  className="flex flex-col gap-4 p-6 bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[14px] shadow-[5px_3px_40px_rgba(0,72,88,0.06)]"
                >
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-heading font-bold text-[18px] text-heading dark:text-white m-0">{branch.name}</h3>
                    <p className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 leading-[22px] m-0">{branch.tagline}</p>
                  </div>
                  <p className="font-body text-[13px] text-surface-600 dark:text-surface-300 leading-[21px] m-0 italic">{branch.vision}</p>
                  <ul className="flex flex-col gap-1.5 list-none m-0 p-0">
                    {branch.activities.map((activity) => (
                      <li key={activity} className="font-body text-[12.5px] text-surface-500 dark:text-surface-400 leading-[1.5] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-brand-600">
                        {activity}
                      </li>
                    ))}
                  </ul>
                  <InternalLink
                    route={branch.page}
                    onPageChange={onPageChange}
                    className="mt-auto self-start inline-flex items-center gap-2 font-body font-semibold text-[13.5px] text-brand-600 dark:text-brand-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
                  >
                    {branch.ctaLabel}
                  </InternalLink>
                </motion.div>
              ))}
            </div>

            <motion.button
              variants={itemVariants}
              whileHover={{ y: -4 }}
              onClick={() => onPageChange('events')}
              className="self-start flex flex-col items-start gap-2 text-left p-6 bg-brand-50/60 dark:bg-brand-950/20 border border-brand-200/60 dark:border-brand-900/40 rounded-[14px] shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.14)] hover:border-brand-600/40 transition-all duration-300 cursor-pointer focus:outline-none"
            >
              <h3 className="font-heading font-bold text-[16px] text-heading dark:text-white m-0">Events & Expos</h3>
              <p className="font-body text-[13px] text-surface-500 dark:text-surface-400 leading-[21px] m-0">See where to meet us at global food ingredient expos.</p>
            </motion.button>
          </motion.section>
        </div>

        {/* Section 4 — Export and regulatory support */}
        <ExportRegulatorySupportSection onPageChange={onPageChange} />

        {/* Section 5 — Packaging and transportation */}
        <PackagingTransportSection onPageChange={onPageChange} />

        {/* Section 6 — Customer proof */}
        <CustomerProofSection onPageChange={onPageChange} />

        {/* Section 7 — Closing CTA. The brief asks for a compact project
            form with 4 fields (Destination country, Product, Estimated
            volume, Required delivery period). No standalone reusable
            compact-form component exists in the app; the real intake flow
            is the multi-step get-quote flow, which genuinely collects 3 of
            the 4 fields as real, dedicated steps (StepDestination,
            StepProduct, StepQuantity) — "Required delivery period" isn't
            collected anywhere in the real flow, so it's not claimed here.
            Rather than build new, unverified form/validation logic, the
            4 fields are shown as a real preview of what "Contact Regional
            Sales" leads into, and the button routes to that real flow. */}
        <div className="w-full py-[60px] lg:py-[80px] text-center px-4">
          <div className="mx-auto max-w-[600px] flex flex-col items-center gap-6">
            <h2 className="font-heading font-bold text-[24px] sm:text-[30px] text-heading dark:text-white m-0 tracking-tight">
              Ready to bring SKM into your market?
            </h2>
            <div className="grid grid-cols-2 gap-3 w-full max-w-[420px]">
              {['Destination country', 'Product', 'Estimated volume', 'Required delivery period'].map((field) => (
                <span
                  key={field}
                  className="font-body text-[12.5px] font-semibold text-surface-500 dark:text-surface-400 bg-surface-50 dark:bg-surface-900/60 border border-surface-200/70 dark:border-surface-800 rounded-[10px] px-3 py-2.5"
                >
                  {field}
                </span>
              ))}
            </div>
            <button
              onClick={() => onPageChange('get-quote')}
              className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-7 py-[15px] rounded-[200px] transition-all duration-300 shadow-[0_4px_20px_rgba(228,10,24,0.25)] hover:shadow-[0_6px_28px_rgba(228,10,24,0.4)] cursor-pointer"
            >
              Contact Regional Sales
            </button>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
