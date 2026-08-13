import { motion } from 'framer-motion';
import InternalLink from '../../../components/common/InternalLink';
import { containerVariants, itemVariants } from '../../../utils/animationVariants';

// Section 4 — Contact details and regional routing (brief §4): Corporate
// office / Factory / Regional offices / Sales enquiries / Quality or
// documentation enquiries / Investor contact.
//
// Corporate office + Factory are already shown in full detail (address,
// phone, map) by OfficeAddresses.jsx directly above this section on the
// same page — this section links to them by scroll rather than repeating
// the same real data a second time.
//
// Sales enquiries: exportsales@skmegg.com — real, verbatim from the site's
// own JSON-LD ContactPoint (index.html / SEO.jsx), contactType "sales".
//
// Quality or documentation enquiries: routes to the real, existing
// /quality_food_safety_traceability page (confirmed in App.jsx's route
// switch) — the genuine home for certifications, food safety policy, and
// traceability documentation on this site.
//
// Regional offices: the 3 real branches (Japan, Europe, Russia), same data
// already used on /global-reach (GlobalReachPage.jsx's `branches` array) —
// reused here rather than re-describing them.
//
// Investor contact: MUFG Intime India Private Limited (Registrar and
// Transfer Agent), real address and email, same data already shown on
// /investors (Investors.jsx's InvestorContactContent).
const branches = [
  { name: 'SKM Japan', page: 'skm_japan' },
  { name: 'SKM Europe', page: 'skm_europe' },
  { name: 'SKM Russia', page: 'skm_russia' },
];

const SALES_EMAIL = 'exportsales@skmegg.com';

export default function RegionalRouting({ onPageChange }) {
  return (
    <div className="w-full bg-page py-[70px] lg:py-[90px] border-b border-[#eee]">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-2 text-center">
          <span className="section-label justify-center">Contact Routing</span>
          <h2 className="font-heading font-bold text-[26px] sm:text-[32px] text-heading m-0 tracking-tight">
            Reach the right team
          </h2>
          <p className="font-body text-[14px] text-surface-500 max-w-xl mx-auto m-0">
            Corporate office and factory details are above — here's who to contact for sales, quality documentation, regional support, or investor matters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Sales enquiries */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 p-6 rounded-[14px] border border-[#eee] bg-white"
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-heading font-bold text-[16px] text-heading m-0">Sales Enquiries</h3>
              <p className="font-body text-[13px] text-surface-500 leading-[21px] m-0">
                Product, pricing, and export sales questions.
              </p>
            </div>
            <a
              href={`mailto:${SALES_EMAIL}`}
              className="mt-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[12px] uppercase tracking-wide px-4 py-2.5 rounded-full transition-colors duration-200"
            >
              Email Sales
            </a>
          </motion.div>

          {/* Quality or documentation enquiries */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 p-6 rounded-[14px] border border-[#eee] bg-white"
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-heading font-bold text-[16px] text-heading m-0">Quality &amp; Documentation</h3>
              <p className="font-body text-[13px] text-surface-500 leading-[21px] m-0">
                Certifications, food safety policy, and traceability documents.
              </p>
            </div>
            <InternalLink
              route="quality_food_safety_traceability"
              onPageChange={onPageChange}
              className="mt-auto inline-flex items-center justify-center gap-2 border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white font-heading font-bold text-[12px] uppercase tracking-wide px-4 py-2.5 rounded-full transition-colors duration-200"
            >
              View Documentation
            </InternalLink>
          </motion.div>

          {/* Investor contact */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 p-6 rounded-[14px] border border-[#eee] bg-white"
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-heading font-bold text-[16px] text-heading m-0">Investor Contact</h3>
              <p className="font-body text-[13px] text-surface-500 leading-[21px] m-0">
                Shareholder services and registrar &amp; transfer agent details.
              </p>
            </div>
            <InternalLink
              route="investors"
              onPageChange={onPageChange}
              className="mt-auto inline-flex items-center justify-center gap-2 border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white font-heading font-bold text-[12px] uppercase tracking-wide px-4 py-2.5 rounded-full transition-colors duration-200"
            >
              View Investor Contact
            </InternalLink>
          </motion.div>
        </div>

        {/* Regional offices */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <h3 className="font-heading font-bold text-[16px] text-heading m-0">Regional Offices</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {branches.map((branch) => (
              <div
                key={branch.page}
                className="flex items-center justify-between gap-4 p-5 rounded-[14px] border border-[#eee] bg-white"
              >
                <span className="font-heading font-bold text-[14px] text-surface-800">{branch.name}</span>
                <InternalLink
                  route={branch.page}
                  onPageChange={onPageChange}
                  className="font-body text-[11.5px] font-bold uppercase tracking-wide text-brand-600 hover:underline whitespace-nowrap"
                >
                  Contact Regional Office →
                </InternalLink>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
