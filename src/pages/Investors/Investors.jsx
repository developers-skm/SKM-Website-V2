import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { scrollToSectionId } from '../../components/Navbar/useProductDiscoveryNavigation';

// Investor documents live as static files in public/documents/investors/
// (not imported as JS modules) so Vite doesn't bundle/hash/sourcemap
// hundreds of MB of PDFs and video into the JS build.
import investorFiles from '../../data/investorFiles.json';

function getFilesFromFolders(folderNames) {
  return investorFiles
    .filter(({ folder }) => folderNames.includes(folder))
    .map(({ folder, name }) => {
      const ext = name.includes('.') ? name.split('.').pop().toLowerCase() : '';
      const url = `/documents/investors/${encodeURIComponent(folder)}/${encodeURIComponent(name)}`;
      return { name, displayName: name.replace(/\.[^.]+$/, ''), url, ext };
    })
    .sort((a, b) => b.name.localeCompare(a.name));
}

const sectionFolders = {
  agm_meeting: ['30th AGM Proceedings', 'AGM Notice'],
  moa_aoa: ['MOA AND AOA'],
  annual_report: ['Annual Reports'],
  quarterly_results: ['Quarterly Results'],
  scrutinizer_reports: ['Scrutinizer Reports'],
  shareholding_pattern: ['Shareholding Pattern'],
  unclaimed_dividend: ['Unclaimed Dividend'],
  board_meeting_notice: ['Board Meeting Notice'],
  corporate_governance: ['Corporate Governance'],
  limited_review_reports: ['Limited Review Reports'],
  code_of_conduct: ['Code of conduct'],
  investor_info: ['Investor information'],
  companies_act: ['The Companies Act, 2013 Compliance'],
  directors: ["Director's Profiles"],
  investor_relations: ['Investor Relations'],
  sebi_kyc: ['SEBI Circulars'],
  financial_report: ['Financial Report'],
  postal_ballot: ['Annual Reports'],
};

// `recommended: true` = the most-used real categories (brief §"most-used
// categories first"), based on which folders hold the most real, current
// documents (Shareholding Pattern 29 files, Corporate Governance 19,
// Board Meeting Notice 15, Annual Reports 10, Scrutinizer Reports 11,
// Quarterly Results 7) plus the two evergreen contact/governance-policy
// entries (Investor Contact, Code of Conduct) that visitors look for most.
// Everything else is real but lower-traffic — kept in the full archive,
// reachable via search/filter rather than shown by default (brief's
// explicit "do not initially display all 25 document categories" rule).
const menuItems = [
  { label: 'Annual Reports', value: 'annual_report', recommended: true },
  { label: 'Quarterly Results', value: 'quarterly_results', recommended: true },
  { label: 'Shareholding Pattern', value: 'shareholding_pattern', recommended: true },
  { label: 'Corporate Governance', value: 'corporate_governance', recommended: true },
  { label: 'Board Meeting Notice', value: 'board_meeting_notice', recommended: true },
  { label: 'Code of Conduct', value: 'code_of_conduct', recommended: true },
  { label: 'Investor Contact', value: 'investor_contact', recommended: true },
  { label: 'Disclosures Under Regulation 46 Of The LODR', value: 'disclosures_lodr' },
  { label: '30th AGM Meeting', value: 'agm_meeting' },
  { label: 'Investor Con. Call', value: 'investor_con_call' },
  { label: 'MOA and AOA', value: 'moa_aoa' },
  { label: 'Financial Report', value: 'financial_report' },
  { label: 'SEBI KYC Format', value: 'sebi_kyc' },
  { label: 'Scrutinizer Reports', value: 'scrutinizer_reports' },
  { label: 'Unclaimed Dividend', value: 'unclaimed_dividend' },
  { label: 'Stock Prices', value: 'stock_prices' },
  { label: 'Board Committee', value: 'board_committee' },
  { label: 'Limited Review Reports', value: 'limited_review_reports' },
  { label: 'Policy / Info', value: 'investor_policy' },
  { label: 'Investor Relations', value: 'investor_relations' },
  { label: 'Code of Practices', value: 'code_of_practices' },
  { label: 'News', value: 'investor_news' },
  { label: 'Investor Information', value: 'investor_info' },
  { label: 'The Companies Act, 2013 Compliance', value: 'companies_act' },
  { label: 'Postal Ballot Notice', value: 'postal_ballot' },
  { label: 'Directors', value: 'directors' },
];

const recommendedItems = menuItems.filter((m) => m.recommended);
const archiveItems = menuItems.filter((m) => !m.recommended);

function SectionHeader({ label }) {
  return (
    <div className="flex flex-col gap-2 pb-6 border-b border-[#eee] dark:border-surface-800">
      <span className="font-body text-[11px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">
        Investors
      </span>
      <h2 className="font-heading font-bold text-[24px] sm:text-[30px] text-heading dark:text-white tracking-tight m-0">
        {label}
      </h2>
    </div>
  );
}

function FileIcon({ ext }) {
  if (['mp4', 'avi', 'mov', 'webm'].includes(ext)) {
    return (
      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    );
  }
  if (['xls', 'xlsx', 'csv'].includes(ext)) {
    return (
      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function DocumentRow({ file }) {
  const isVideo = ['mp4', 'avi', 'mov', 'webm'].includes(file.ext);
  return (
    <a
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 px-4 py-3.5 rounded-[10px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900/50 hover:border-brand-600/30 dark:hover:border-brand-900/60 hover:bg-[rgba(228, 10, 24,0.02)] dark:hover:bg-brand-950/20 transition-all duration-200"
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-[8px] bg-brand-600/6 dark:bg-brand-950/40 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center">
        <FileIcon ext={file.ext} />
      </div>
      <span className="flex-1 font-body text-[13px] font-medium text-surface-700 dark:text-surface-300 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200 min-w-0 truncate">
        {file.displayName}
      </span>
      <div className="flex-shrink-0 flex items-center gap-1.5 text-surface-300 dark:text-surface-600 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
        <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">
          {file.ext}
        </span>
        {isVideo ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        )}
      </div>
    </a>
  );
}

const boardCommittees = [
  {
    title: 'Audit Committee',
    members: [
      { name: 'Mr. G N Jayaram', role: 'Chairperson' },
      { name: 'Mr. T N Thirukumar', role: 'Member' },
      { name: 'Mr. D Venkateswaran', role: 'Member' },
    ],
  },
  {
    title: 'Nomination and Remuneration Committee',
    members: [
      { name: 'Mr. Vikram Ramakrishnan', role: 'Chairperson' },
      { name: 'Mr. G N Jayaram', role: 'Member' },
      { name: 'Mr. D Venkateswaran', role: 'Member' },
    ],
  },
  {
    title: 'Stakeholders Relationship Committee',
    members: [
      { name: 'Mr. T N Thirukumar', role: 'Chairperson' },
      { name: 'Mr. G N Jayaram', role: 'Member' },
      { name: 'Mr. R R Sathiyamurthi', role: 'Member' },
    ],
  },
  {
    title: 'Corporate Social Responsibility Committee',
    members: [
      { name: 'Mr. Ahamed Sheik Mohideen Khader Mohideen', role: 'Chairperson' },
      { name: 'Mrs. S Kumutaavalli', role: 'Member' },
      { name: 'Mr. T N Thirukumar', role: 'Member' },
    ],
  },
];

function CommitteeAccordion({ committee, index }) {
  const [open, setOpen] = useState(index === 0);
  const contentRef = useRef(null);

  return (
    <div className="rounded-[10px] border border-[#eee] dark:border-surface-800 overflow-hidden bg-white dark:bg-surface-900/50">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center justify-between px-5 py-4 gap-4 text-left group transition-colors duration-200 hover:bg-surface-50 dark:hover:bg-surface-800/40"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 rounded-[8px] bg-brand-600/6 dark:bg-brand-950/40 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center">
            <svg className="w-4 h-4 text-brand-600 dark:text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="font-heading font-bold text-[13px] text-surface-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200 truncate">
            {committee.title}
          </span>
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
          <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest text-surface-400 dark:text-surface-500">
            {committee.members.length} members
          </span>
          <svg
            className={`w-4 h-4 text-surface-400 dark:text-surface-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="border-t border-[#eee] dark:border-surface-800 px-5 py-4 flex flex-col gap-2">
              {committee.members.map((member, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 px-4 py-3 rounded-[8px] bg-surface-50/80 dark:bg-surface-800/40 border border-[#eee] dark:border-surface-800"
                >
                  <span className="font-body text-[13px] font-medium text-surface-700 dark:text-surface-300 min-w-0 truncate">
                    {member.name}
                  </span>
                  <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    member.role === 'Chairperson'
                      ? 'bg-brand-600/8 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 border border-brand-600/15 dark:border-brand-900/50'
                      : 'bg-surface-100 dark:bg-surface-700/50 text-surface-500 dark:text-surface-400 border border-[#eee] dark:border-surface-700'
                  }`}>
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InvestorContactContent({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      <SectionHeader label={label} />
      <div className="flex flex-col gap-4">

        {/* Registrar and Transfer Agent */}
        <div className="rounded-[10px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900/50 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#eee] dark:border-surface-800 bg-surface-50/60 dark:bg-surface-800/30">
            <div className="flex-shrink-0 w-7 h-7 rounded-[7px] bg-brand-600/6 dark:bg-brand-950/40 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-brand-600 dark:text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="font-heading font-bold text-[12px] text-surface-800 dark:text-white m-0">
              Registrar and Transfer Agent
            </p>
          </div>
          <div className="px-5 py-4 flex flex-col gap-3">
            <p className="font-body font-bold text-[13px] text-surface-800 dark:text-white m-0">
              MUFG Intime India Private Limited
            </p>
            <p className="font-body text-[12px] text-surface-500 dark:text-surface-400 m-0 leading-relaxed">
              "Surya", 35, Mayflower Avenue, Behind Senthil Nagar<br />
              Sowripalayam Road<br />
              Coimbatore – 641028
            </p>
            <a
              href="mailto:coimbatore@linkintime.co.in"
              className="inline-flex items-center gap-1.5 font-body text-[12px] font-medium text-brand-600 dark:text-brand-400 hover:underline w-fit"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              coimbatore@linkintime.co.in
            </a>
          </div>
        </div>

        {/* Compliance Officer */}
        <div className="rounded-[10px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900/50 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#eee] dark:border-surface-800 bg-surface-50/60 dark:bg-surface-800/30">
            <div className="flex-shrink-0 w-7 h-7 rounded-[7px] bg-brand-600/6 dark:bg-brand-950/40 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-brand-600 dark:text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="font-heading font-bold text-[12px] text-surface-800 dark:text-white m-0">
              Compliance Officer
            </p>
          </div>
          <div className="px-5 py-4 flex flex-col gap-3">
            <div>
              <p className="font-body font-bold text-[13px] text-surface-800 dark:text-white m-0">P. Sekar</p>
              <p className="font-body text-[11px] text-surface-400 dark:text-surface-500 m-0 mt-0.5">Company Secretary</p>
            </div>
            <p className="font-body text-[12px] text-surface-500 dark:text-surface-400 m-0 leading-relaxed">
              133, 133/1, Gandhiji Road<br />
              Erode – 638001
            </p>
            <div className="flex flex-col gap-1.5">
              <a
                href="tel:04242351532"
                className="inline-flex items-center gap-1.5 font-body text-[12px] font-medium text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 w-fit"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0424 - 2351532
              </a>
              <a
                href="tel:9585558325"
                className="inline-flex items-center gap-1.5 font-body text-[12px] font-medium text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 w-fit"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                9585558325
              </a>
              <a
                href="mailto:shares@skmegg.com"
                className="inline-flex items-center gap-1.5 font-body text-[12px] font-medium text-brand-600 dark:text-brand-400 hover:underline w-fit"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                shares@skmegg.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function BoardCommitteeContent({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      <SectionHeader label={label} />
      <div className="flex flex-col gap-3">
        <p className="font-body text-[11px] font-bold uppercase tracking-widest text-surface-400 dark:text-surface-500 m-0 pb-2 border-b border-[#eee] dark:border-surface-800">
          Composition of Board Committees
        </p>
        {boardCommittees.map((committee, i) => (
          <CommitteeAccordion key={i} committee={committee} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

const txt = 'font-body text-[12px] leading-relaxed text-surface-600 dark:text-surface-400 m-0';
const bold = 'font-body text-[12px] leading-relaxed font-semibold text-surface-700 dark:text-surface-300 m-0';

function PolicySection({ roman, title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-2">
        <span className="font-heading font-bold text-[11px] text-brand-600 dark:text-brand-400 uppercase tracking-widest flex-shrink-0">
          {roman}.
        </span>
        <span className="font-heading font-bold text-[12px] text-surface-800 dark:text-white uppercase tracking-wide">
          {title}
        </span>
      </div>
      <div className="flex flex-col gap-2.5 pl-5">
        {children}
      </div>
    </div>
  );
}

function CodeOfConductPolicy() {
  return (
    <div className="rounded-[10px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900/50 overflow-hidden">
      {/* Company header */}
      <div className="px-6 py-5 border-b border-[#eee] dark:border-surface-800 bg-surface-50/60 dark:bg-surface-800/30 text-center flex flex-col gap-1">
        <p className="font-heading font-bold text-[13px] text-heading dark:text-white m-0 uppercase tracking-wide">
          SKM Egg Products Export India Limited
        </p>
        <p className="font-body text-[11px] text-surface-500 dark:text-surface-400 m-0">
          Regd Off: 185, Chennimalai Road, Erode – 638 001 – Tamil Nadu
        </p>
      </div>

      <div className="px-6 py-7 flex flex-col gap-7">

        {/* Title */}
        <p className="font-heading font-bold text-[13px] text-heading dark:text-white uppercase tracking-wide text-center m-0">
          Code of Conduct to Regulate, Monitor and Report Trading by Insiders
        </p>

        {/* I. Introduction */}
        <PolicySection roman="I" title="Introduction">
          <p className={txt}>The Securities Exchange Board of India (SEBI) with an aim to guard the interests of general investors has formulated the SEBI (Prohibition of Insider Trading) Regulations, 2015 (hereinafter referred to as 'the Regulations').</p>
          <p className={txt}>These Regulations come into force effective May 15, 2015 and were made applicable to all Listed Companies. It is mandatory in terms of the Regulations for every listed company to adopt a Code of Conduct for Prohibition of Insider Trading for its employees and other connected persons towards the compliance of the Regulations.</p>
          <p className={txt}>This document manifests the Code of Conduct for Prohibition of Insider Trading adopted by SKM EGG PRODUCTS EXPORT INDIA LIMITED. The Code shall be applicable to employees and other connected persons holding professional or business relationships with the Company, and who may reasonably be expected to have access to unpublished price sensitive information in relation to the Company. Further, the Code also seeks to ensure timely and adequate disclosure of price sensitive information to the investor community, by the Company to enable them to take informed investment decisions with regard to its securities.</p>
          <p className={txt}>Any information that relates directly or indirectly to the Company, which, if published, is likely to materially affect the price of securities of the Company, is considered price sensitive.</p>
        </PolicySection>

        {/* II. Definitions */}
        <PolicySection roman="II" title="Definitions">
          <ol className="flex flex-col gap-3 list-none p-0 m-0">
            {[
              { n: '1.', label: '"Board"', def: 'means the Board of Directors of SKM EGG PRODUCTS EXPORT INDIA LIMITED and shall include any Committees of the Board.' },
              { n: '2.', label: '"Code"', def: 'means this Code of Conduct for Prohibition of Insider Trading, for regulating, monitoring and reporting trading by employees and other connected persons towards compliance of the Regulations and as applicable and modified from time to time.' },
              { n: '3.', label: '"Company"', def: 'means SKM EGG PRODUCTS EXPORT INDIA LIMITED and includes its successors, assigns.' },
              { n: '4.', label: '"Compliance Officer"', def: 'means the Company Secretary of the Company and in his absence such officer as the Board may designate.' },
            ].map(({ n, label, def }) => (
              <li key={n} className="flex gap-2">
                <span className="font-body text-[12px] font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0">{n}</span>
                <p className={txt}><span className="font-semibold text-surface-700 dark:text-surface-300">{label}</span> {def}</p>
              </li>
            ))}

            {/* Definition 5 - Connected Person (has sub-items) */}
            <li className="flex gap-2">
              <span className="font-body text-[12px] font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0">5.</span>
              <div className="flex flex-col gap-2">
                <p className={txt}><span className="font-semibold text-surface-700 dark:text-surface-300">"Connected Person"</span> means</p>
                <div className="flex gap-2">
                  <span className={`${txt} flex-shrink-0`}>a)</span>
                  <p className={txt}>any person who is or has during the six months prior to the concerned act been associated with the Company, directly or indirectly, in any capacity including by reason of frequent communication with its officers or by being in any contractual, fiduciary or employment relationship or by being director, officer or an employee of the Company or holds any position including a professional or business relationship between himself and the Company whether temporary or permanent, that allows such person, directly or indirectly, access to unpublished price sensitive information or is reasonably expected to allow such access.</p>
                </div>
                <div className="flex gap-2">
                  <span className={`${txt} flex-shrink-0`}>b)</span>
                  <div className="flex flex-col gap-1.5">
                    <p className={txt}>without prejudice to the generality of the foregoing, the persons falling within the following categories shall be deemed to be connected persons unless the contrary is established:</p>
                    <ol className="flex flex-col gap-1 list-none p-0 m-0 pl-2">
                      {[
                        'an immediate relative of connected persons specified in clause (i); or',
                        'a holding company or associate company or subsidiary company; or',
                        'an intermediary as specified in Section 12 of the Securities and Exchange Board of India Act, 1992;',
                        'an investment company, trustee company, asset management company or an employee or director thereof; or',
                        'an official of a stock exchange or a clearing house or corporation; or',
                        'a member of board of trustees of a mutual fund or a member of board of directors of the asset management company of a mutual fund or is an employee thereof; or',
                        'a member of the board of directors or an employee of public financial institution as defined in Section 2(72) of the Companies Act, 2013; or',
                        'an official or an employee of a self-regulatory organization recognized or authorized by the Securities and Exchange Board of India; or',
                        'a banker of the Company; or',
                        'a concern, firm, trust, Hindu undivided family, company or association of persons wherein a director of a company or his immediate relative or banker of the company, has more than ten percent of the holding or interest.',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className={`${txt} flex-shrink-0`}>({['i','ii','iii','iv','v','vi','vii','viii','ix','x'][i]})</span>
                          <p className={txt}>{item}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </li>

            {[
              { n: '6.', label: '"Designated Persons"', def: 'means employees and Connected Persons who have access to or likely to have access to or deemed to have access to Unpublished Price Sensitive Information.' },
              { n: '7.', label: '"Director"', def: 'means a member of the Board of Directors of the Company.' },
              { n: '8.', label: '"Generally available information"', def: 'means information that is accessible to the public on non-discriminatory basis.' },
              { n: '9.', label: '"Immediate Relative"', def: 'means a spouse of a person, and includes parent, sibling, and child of such person or of the spouse, any of whom is either dependent financially on such person, or consults such person in taking decisions relating to trading in securities.' },
              { n: '10.', label: '"Insider"', def: 'means any person who is a Connected Person or is in possession of or having access to unpublished price sensitive information.' },
              { n: '11.', label: '"Promoter"', def: 'shall have the meaning assigned to it under the SEBI (Issue of Capital and Disclosure Requirements) Regulations, 2009 or any modification thereof.' },
              { n: '12.', label: '"Insider Trading"', def: 'means dealing by an Insider or a Connected Person in any manner in the Company\'s securities on the basis of "Unpublished Price Sensitive Information (UPSI)" used to make profit or avoid loss in the transactions in securities of the Company.' },
              { n: '13.', label: '"Securities"', def: 'shall have the meaning assigned to it under the Securities Contracts (Regulation) Act, 1956 or any modification thereof except units of a mutual fund.' },
              { n: '14.', label: '"Trading"', def: 'means and includes subscribing, buying, selling, dealing, or agreeing to subscribe, buy, sell, deal in any securities, and "trade" shall be construed accordingly.' },
              { n: '15.', label: '"Trading day"', def: 'means a day on which the recognized stock exchanges are open for trading.' },
              { n: '16.', label: '"Trading Window"', def: 'shall mean that period specified by the Compliance Officer during which Insiders and Designated Persons and their immediate relatives are prohibited from any form of dealing in the Company\'s Securities.' },
            ].map(({ n, label, def }) => (
              <li key={n} className="flex gap-2">
                <span className="font-body text-[12px] font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0">{n}</span>
                <p className={txt}><span className="font-semibold text-surface-700 dark:text-surface-300">{label}</span> {def}</p>
              </li>
            ))}

            {/* Definition 17 - UPSI (has sub-items) */}
            <li className="flex gap-2">
              <span className="font-body text-[12px] font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0">17.</span>
              <div className="flex flex-col gap-1.5">
                <p className={txt}><span className="font-semibold text-surface-700 dark:text-surface-300">"Unpublished Price Sensitive Information" (UPSI)</span> means any information relating the Company or its Securities, directly or indirectly that is not generally available which upon becoming generally available, is likely to materially affect the price of the securities and shall ordinarily include but not restricted to, information relating to the following:</p>
                <ol className="flex flex-col gap-1 list-none p-0 m-0 pl-2">
                  {[
                    'Periodical financial results of the Company (quarterly, half-yearly and annual).',
                    'Intended declarations of dividend (interim and final).',
                    'Change in capital structure.',
                    'Any material events in accordance with listing agreement.',
                    'Amalgamation, mergers, demergers, takeovers, de-listings, disposals and expansion of business and such other transactions.',
                    'Change in key managerial personnel.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className={`${txt} flex-shrink-0`}>{['a)','b)','c)','d)','e)','f)'][i]}</span>
                      <p className={txt}>{item}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          </ol>
        </PolicySection>

        {/* III. Compliance Officer */}
        <PolicySection roman="III" title="Compliance Officer">
          {[
            'The Company Secretary shall be the Compliance Officer and shall be the Chief of Investor Relations to ensure compliance and effective implementation of the Regulations and also the Code across the Company. The Compliance Officer shall hold the position so long as he/she is in the employment of the Company. In the absence of Company Secretary, the Board shall designate a key managerial person who will function as Compliance Officer and Chief of Investor Relations.',
            'The Compliance Officer shall act as a focal point for dealings with SEBI, in connection with all matters relating to the compliance and effective implementation of the Regulations and this Code.',
            'The Compliance Officer is empowered to regulate the closing and opening of trading windows and also accessing and sharing of UPSI by Insiders, employees and Connected Persons. The Compliance Officer shall formulate Chinese walls for the sake of avoiding access to and sharing of UPSI prior to it becoming Generally Available Information.',
            'The Compliance Officer shall maintain list of Designated Persons and other employees who can be Insiders or Connected Persons and are subject to compliance of Chinese wall provisions and trade related embargo as informed by the Compliance Officer from time to time.',
            'The Compliance Officer shall report to the Board and in particular, shall provide reports to the Chairman of the Audit Committee, if any, or to the Chairman of the Board at such frequency as may be stipulated by the Board.',
            'The Compliance Officer shall maintain a record of the Insiders, Connected Persons and Designated Persons and any changes made in the list thereto.',
            'The Compliance Officer shall assist all the employees in addressing any clarifications regarding the Securities and Exchange Board of India (Prohibition of Insider Trading) Regulations, 2015 and the Code adopted by the Company.',
          ].map((para, i) => <p key={i} className={txt}>{para}</p>)}
        </PolicySection>

        {/* IV. Restriction on Communication and Trading */}
        <PolicySection roman="IV" title="Restriction on Communication and Trading by Insiders">
          <ol className="flex flex-col gap-3 list-none p-0 m-0">
            {[
              'Insider Trading at any time by an Insider or a Connected Person or Designated Person on the basis of UPSI or while in possession of UPSI is prohibited.',
              'Insiders, Connected Persons and Designated Persons are prohibited at all times from counseling or procuring any person (including a body corporate) to deal in the Company\'s securities on the basis of UPSI.',
              'Insiders, Connected Persons and Designated Persons are prohibited at all times from directly or indirectly communicating UPSI to any person including a body corporate unless in furtherance of legitimate purposes or in performance of duties or discharge of legal obligations.',
              'All information shall be handled within the Company on a need-to-know basis and no UPSI shall be communicated to any person except in furtherance of Insider\'s legitimate purposes, performance of duties or discharge of his or her obligations.',
              'The Compliance Officer shall maintain list of Designated Persons based on their functional role in the Company to be covered by this Code. Such Designated Persons shall execute trades subject to this Code and subject to Regulations. The Compliance Officer shall regulate the closing and opening of trading window and accordingly communicate the same to Designated Persons who are duty bound to comply the same as regards trading. Designated Persons and their immediate relatives are prohibited from trading when the trading window is closed. Such Designated Persons shall also include auditors, consultants, law firms, advisors, analysts etc who are assisting or advising the Company.',
              'The Compliance Officer shall determine the closing and re-opening of the trading window after taking into account various factors including the UPSI to be considered by Board / Committee of the Board, UPSI becoming Generally Available Information for being assimilation by the market, which shall not be a period earlier than 48 hours from the time UPSI becomes a Generally Available Information.',
              'The Compliance Officer shall put in place Chinese Walls procedures and processes for permitting or prohibiting any Designated Person to cross the Wall.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-body text-[12px] font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0">{i + 1}.</span>
                <p className={txt}>{item}</p>
              </li>
            ))}

            {/* Item 8 with subsections a, b, c, d */}
            <li className="flex gap-2">
              <span className="font-body text-[12px] font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0">8.</span>
              <div className="flex flex-col gap-3">
                <p className={txt}>The Compliance Officer shall also require Insiders, Connected Persons or Designated Persons to report in prescribed format their holding and trading in securities from time to time.</p>

                {/* 8a */}
                <div className="flex gap-2">
                  <span className={`${txt} font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0`}>a)</span>
                  <div className="flex flex-col gap-2">
                    <p className={bold}>Reporting requirements for transactions &amp; securities</p>
                    <p className={txt}>Every promoter, key managerial person, director shall disclose to the Compliance Officer in writing, the details of the securities held by him / her, the date from which securities are held, the number of securities held at the time of implementation of the Code of Conduct for prevention of the Insider Trading or joining the Company or becoming the Director of the Company and such other information relating to the Securities as the Compliance Officer may require.</p>
                    <ol className="flex flex-col gap-1.5 list-none p-0 m-0 pl-2">
                      {[
                        'Every person on appointment as a key managerial person or a director of the Company or upon becoming Promoter shall disclose his or her holdings of Securities of the Company as on the date of appointment as key managerial person or a director of the Company or upon becoming Promoter within seven days of such appointment or becoming Promoter.',
                        'Every Promoter, director of the company shall furnish a statement of any transaction in securities (either acquisition or disposal) by them within two trading days whether in one transaction or in a series of transactions over a calendar quarter, aggregates a traded value in excess of five lakh rupees.',
                        'Insiders and Designated Persons shall disclose bi-annually their holding and or trading, if any, in the Company\'s securities.',
                        'The Compliance Officer shall maintain records of all disclosures made by the Insiders and Designated Persons.',
                        'The Compliance Officer shall place before the Managing Director on a monthly basis all the details of the dealing in the Securities by Insiders and Designated Persons and the accompanying documents that such persons had executed under the pre-dealing procedure as envisaged in this code.',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className={`${txt} flex-shrink-0`}>({['i','ii','iii','iv','v'][i]})</span>
                          <p className={txt}>{item}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* 8b */}
                <div className="flex gap-2">
                  <span className={`${txt} font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0`}>b)</span>
                  <div className="flex flex-col gap-2">
                    <p className={bold}>Pre-clearance of trades and trading plans</p>
                    <ol className="flex flex-col gap-1.5 list-none p-0 m-0">
                      {[
                        'Insiders and Designated Persons are required to formulate a Trading Plan detailing the number of securities to be traded, nature of trade and intervals thereof, dates for effecting the trade.',
                        'Trading Plans shall be submitted to the Compliance Officer for approval and for further public disclosure.',
                        'Trading as per the Trading Plan shall be commenced only after the expiry of six months from public disclosure.',
                        'Trading Plan so submitted shall be for a period not less than 12 months commencing from the expiry of six months from the date of its publication in order to avoid frequent announcement of trading plans.',
                        'No overlap of trading plans shall be permitted.',
                        'Trading for a period between 20th day prior to last day of any financial period in respect of which results are to be announced and the second trading day after the results are announced shall not be permitted.',
                        'Submission and publication of Trading Plan does not enable trading as per Plan without pre-clearance by the Compliance Officer. Pre-clearance for trading as per Trading Plan is compulsory and any trading of securities without such pre-clearance will amount to violation of this Code and the Regulations.',
                        'Any pre-cleared trade shall be executed within 7 trading days thereof, failing which the pre-clearance granted will lapse and a fresh pre-clearance shall be required to execute trades.',
                        'An Insider or Designated Person who is permitted to trade shall not execute a contra trade within a period of 6 months from the execution of the first trade. The Compliance Officer is empowered to grant relaxation against strict application of this restriction for reasons recorded in writing provided such relaxation does not violate the Code or the Regulations. Should a contra trade be executed inadvertently or otherwise in violation of the said restriction, the profits from such trade shall be liable to be disgorged for remittance to SEBI for credit of Investor Protection and Education Fund administered by SEBI.',
                        'The Compliance Officer shall stipulate such formats as Board deems necessary for pre-clearance, reporting of trades, reporting of decisions not to trade after pre-clearance, recording reasons for such decisions and all other process and procedures as may be necessary for monitoring compliance with the Regulations.',
                        'The Compliance Officer shall be required to review the Trading Plan, assess whether the same is in compliance of the Regulations, take an undertaking that the Insider or the Designated Person is either not in possession of any UPSI or makes it public prior to commencement of trade, approve and monitor the implementation of the Plan.',
                        'Trading Plans once approved becomes irrevocable and the Insider or the Designated Person, as the case may be, shall mandatorily implement the same without any deviation.',
                        'Trading Plan shall not be commenced without making UPSI in the possession of the Insider a Generally Available Information and the Compliance Officer shall be entitled to defer the commencement of the Trading Plan till such time UPSI becomes a Generally Available Information.',
                        'Compliance Officer shall be required to notify the stock exchanges where the shares of the Company are listed upon approval of the Trading Plan.',
                        'The procedure contained herein intends to give an option to persons who may be perpetually in possession of unpublished price sensitive information for enabling them to trade in securities in a compliant manner. The procedure would enable the formulation of a Trading Plan by an insider to enable him to plan for trades to be executed in future.',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className={`${txt} flex-shrink-0`}>({['i','ii','iii','iv','v','vi','vii','viii','ix','x','xi','xii','xiii','xiv','xv'][i]})</span>
                          <p className={txt}>{item}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* 8c */}
                <div className="flex gap-2">
                  <span className={`${txt} font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0`}>c)</span>
                  <div className="flex flex-col gap-1.5">
                    <p className={bold}>Trading Window</p>
                    <p className={txt}>Trading Window shall be closed 20 days prior to any matter related or concerning UPSI is to be considered by the Board / Committee of the Board. During the period when the Trading Window is closed, the Insiders and their Dependant Family Members and Designated Persons shall be prohibited from Trading. The exact dates of each closure of the Trading Window shall be intimated to Designated Persons and it is the responsibility of each Designated Person to ensure compliance with this Code and by each of Insider's Dependant Family Members. The Trading Window shall open after the expiry of 48 hours from the time of publication of UPSI.</p>
                  </div>
                </div>

                {/* 8d */}
                <div className="flex gap-2">
                  <span className={`${txt} font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0`}>d)</span>
                  <div className="flex flex-col gap-1.5">
                    <p className={bold}>Chinese Wall</p>
                    <p className={txt}>The Compliance Officer is empowered to apply Chinese Wall in respect of matters relating to UPSI. Any agenda concerning UPSI in the Board / Committee Notice and Agenda can be shared prior to commencement of the Board Meeting / Committee Meeting in order to limit access to and sharing of UPSI. Any Insider or Connected Person or Designated Person shall not access or share UPSI to any person excepting sharing such UPSI in compliance of a statutory requirement without the prior written approval of the Compliance Officer.</p>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </PolicySection>

        {/* V. Investigation */}
        <PolicySection roman="V" title="Investigation">
          <ol className="flex flex-col gap-2 list-none p-0 m-0">
            {[
              'The Compliance Officer shall have the power to investigate suspected contraventions of this Code.',
              'The Compliance Officer shall submit a report of his findings to the Managing Director within 7 days of commencement of investigation or such extended time period as the Managing Director may approve.',
              'Based on the report of the Compliance Officer, the Managing Director shall be entitled to appoint any person to investigate a suspected contravention of this Code.',
              'The Managing Director shall have the power to delegate to a person so appointed, all the powers including powers to call for information, examination, interrogation, recording evidence, etc.',
              'In any investigation of suspected contravention of this Code the onus to prove that there is no violation of this Code, shall be on the concerned Insiders or their Dependant Family Members.',
              'The Company\'s investigating officer shall, within 7 working days from the conclusion of the investigation, submit a report to the Chairman and/or the Managing Director.',
              'The Managing Director after consideration of the investigation report shall communicate the findings to the person being investigated and accord him an opportunity of being heard before taking any action as contemplated in these rules.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-body text-[12px] font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0">{i + 1}.</span>
                <p className={txt}>{item}</p>
              </li>
            ))}
          </ol>
        </PolicySection>

        {/* VI. Penalty */}
        <PolicySection roman="VI" title="Penalty for Contravention of the Code">
          <ol className="flex flex-col gap-3 list-none p-0 m-0">
            {[
              'Every Insider shall be individually responsible for compliance with the provisions of this Code.',
              'Any employee / officer / director / promoter who trades in securities or communicates any information for trading in securities in contravention of the Code may be penalised and appropriate action may be taken by the Company.',
              'Employees / officers / directors / promoters of the Company who violate the code shall also be subject to disciplinary action by the Company, which may include wage freeze, suspension, ineligible for future participation in employee stock option plans, etc.',
              'The action by the Company shall not preclude SEBI from taking any action in case of violation of the Regulations.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-body text-[12px] font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0">{i + 1}.</span>
                <p className={txt}>{item}</p>
              </li>
            ))}

            <li className="flex gap-2">
              <span className="font-body text-[12px] font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0">5.</span>
              <div className="flex flex-col gap-2">
                <p className={txt}>The Managing Director shall upon receipt of the report as above and based on the finding contained therein be entitled to take action against the person found guilty for violation of this Code as he may in his absolute discretion deem fit including but not restricted to:</p>
                <div className="flex gap-2">
                  <span className={`${txt} flex-shrink-0`}>a)</span>
                  <p className={txt}>Issue letter of warning stating that consequence of contravention / non-adherence would result in dismissal from services.</p>
                </div>
                <div className="flex gap-2">
                  <span className={`${txt} flex-shrink-0`}>b)</span>
                  <p className={txt}>Any other suitable action, to facilitate the implementation of the spirit of the Code.</p>
                </div>
              </div>
            </li>

            <li className="flex gap-2">
              <span className="font-body text-[12px] font-semibold text-surface-700 dark:text-surface-300 flex-shrink-0">6.</span>
              <div className="flex flex-col gap-2">
                <p className={txt}>Under Section 15G of the SEBI Act, any Insider who indulges in insider trading in contravention of Regulation 3 is liable to a maximum penalty of Rs.25 crore or three times the amount of profits made out of insider trading, whichever is higher. Under Section 24 of the SEBI Act, any one who contravenes the Regulations is punishable with imprisonment for a maximum period of ten years or with fine which may extend to Rs.25 crore or with both.</p>
                <p className={`${bold}`}>Information to SEBI in case of violation of SEBI (Prohibition of Insider Trading) Regulations, 2015</p>
                <p className={txt}>In case it is observed by the Company/Compliance Officer that there has been a violation of the Regulations or this Code, SEBI shall be informed by the Company.</p>
              </div>
            </li>
          </ol>
        </PolicySection>

        {/* VII. Amendments */}
        <PolicySection roman="VII" title="Amendments to this Code">
          <p className={txt}>The Board reserves the right to amend this Code as and when it deems appropriate.</p>
        </PolicySection>

        {/* Signature block */}
        <div className="flex flex-col gap-1 pt-4 border-t border-[#eee] dark:border-surface-800">
          <p className={txt}>For &amp; on Behalf of the Board of Directors of</p>
          <p className={`${txt} font-semibold text-surface-700 dark:text-surface-300`}>SKM EGG PRODUCTS EXPORT INDIA LIMITED</p>
          <div className="mt-4 flex flex-col gap-0.5">
            <p className={txt}>Sd/-</p>
            <p className={`${txt} font-semibold text-surface-700 dark:text-surface-300`}>Shree Shivkumar S K M</p>
            <p className={txt}>Managing Director</p>
          </div>
        </div>

      </div>
    </div>
  );
}

function ComingSoonContent({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      <SectionHeader label={label} />
      <div className="flex flex-col items-center justify-center py-24 gap-5 rounded-[10px] border border-dashed border-[#eee] dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900/20">
        <div className="w-14 h-14 rounded-[10px] bg-brand-600/6 dark:bg-brand-950/40 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center">
          <svg className="w-6 h-6 text-brand-600 dark:text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <div className="text-center flex flex-col gap-1.5">
          <p className="text-sm font-bold text-surface-700 dark:text-surface-300 m-0">Content coming soon</p>
          <p className="text-xs text-surface-400 dark:text-surface-500 m-0 max-w-xs">
            This section is being prepared. Please check back shortly.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SectionContent({ value, label }) {
  if (value === 'board_committee') {
    return <BoardCommitteeContent label={label} />;
  }
  if (value === 'investor_contact') {
    return <InvestorContactContent label={label} />;
  }

  const folders = sectionFolders[value];
  const files = folders ? getFilesFromFolders(folders) : [];

  if (!folders || files.length === 0) {
    return <ComingSoonContent label={label} />;
  }

  const videos = files.filter(f => ['mp4', 'avi', 'mov', 'webm'].includes(f.ext));
  const docs = files.filter(f => !['mp4', 'avi', 'mov', 'webm'].includes(f.ext));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      <SectionHeader label={label} />

      {videos.map((video, i) => (
        <div key={i} className="rounded-[12px] overflow-hidden border border-[#eee] dark:border-surface-800 bg-black">
          <video controls className="w-full max-h-[480px] object-contain" src={video.url}>
            Your browser does not support the video tag.
          </video>
        </div>
      ))}

      {docs.length > 0 && (
        <div className="flex flex-col gap-2">
          {docs.map((file, idx) => (
            <DocumentRow key={idx} file={file} />
          ))}
        </div>
      )}

      {value === 'code_of_conduct' && <CodeOfConductPolicy />}
    </motion.div>
  );
}

// Investor Relations hero (brief §1). Buttons: View Latest Results,
// Download Annual Report, Search Disclosures, Contact Investor Relations —
// all 4 are real actions against the same real document data this page
// already renders (no separate/duplicated content).
function InvestorHero({ onSelect, onDownloadAnnualReport }) {
  return (
    <div className="relative w-full bg-page dark:bg-surface-950 overflow-hidden py-[70px] sm:py-[90px] border-b border-[#eee] dark:border-surface-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,var(--color-brand-50)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_120%,var(--color-brand-950)_0%,transparent_50%)] pointer-events-none opacity-100 dark:opacity-80" />
      <div className="relative mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-6 z-10">
        <span className="section-label justify-center">Investor Relations</span>
        <h1 className="font-heading font-bold text-[36px] sm:text-[46px] lg:text-[56px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
          Investor Relations
        </h1>
        <p className="font-body text-[15px] sm:text-[16px] text-surface-500 dark:text-surface-350 max-w-2xl leading-[27px] m-0">
          Financial results, annual reports, stock-exchange disclosures, shareholding information, and corporate governance for SKM Egg Products Export India Limited.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <button
            onClick={() => onSelect('quarterly_results')}
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[12.5px] uppercase tracking-[0.05em] leading-none px-6 py-[13px] rounded-[200px] transition-all duration-300 shadow-[0_4px_20px_rgba(228,10,24,0.25)] hover:shadow-[0_6px_28px_rgba(228,10,24,0.4)] cursor-pointer"
          >
            View Latest Results
          </button>
          <button
            onClick={onDownloadAnnualReport}
            className="inline-flex items-center gap-2 bg-transparent hover:bg-brand-600/6 dark:hover:bg-brand-950/30 text-surface-900 dark:text-surface-100 border border-surface-250 dark:border-surface-700 font-heading font-bold text-[12.5px] uppercase tracking-[0.05em] leading-none px-6 py-[13px] rounded-[200px] transition-all duration-300 cursor-pointer"
          >
            Download Annual Report
          </button>
          <button
            onClick={() => onSelect('disclosures_lodr')}
            className="inline-flex items-center gap-2 bg-transparent hover:bg-brand-600/6 dark:hover:bg-brand-950/30 text-surface-900 dark:text-surface-100 border border-surface-250 dark:border-surface-700 font-heading font-bold text-[12.5px] uppercase tracking-[0.05em] leading-none px-6 py-[13px] rounded-[200px] transition-all duration-300 cursor-pointer"
          >
            Search Disclosures
          </button>
          <button
            onClick={() => onSelect('investor_contact')}
            className="inline-flex items-center gap-2 bg-transparent hover:bg-brand-600/6 dark:hover:bg-brand-950/30 text-surface-900 dark:text-surface-100 border border-surface-250 dark:border-surface-700 font-heading font-bold text-[12.5px] uppercase tracking-[0.05em] leading-none px-6 py-[13px] rounded-[200px] transition-all duration-300 cursor-pointer"
          >
            Contact Investor Relations
          </button>
        </div>
      </div>
    </div>
  );
}

const MENU_SECTION_ID = 'investor-document-browser';

export default function Investors({ onPageChange }) {
  const [activeItem, setActiveItem] = useState(menuItems[0].value);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [archiveSearch, setArchiveSearch] = useState('');

  const activeLabel = menuItems.find(m => m.value === activeItem)?.label ?? '';

  const filteredArchiveItems = useMemo(() => {
    const q = archiveSearch.trim().toLowerCase();
    if (!q) return archiveItems;
    return archiveItems.filter((item) => item.label.toLowerCase().includes(q));
  }, [archiveSearch]);

  const handleSelect = (value) => {
    setActiveItem(value);
    setMobileMenuOpen(false);
    scrollToSectionId(MENU_SECTION_ID);
  };

  const handleDownloadAnnualReport = () => {
    setActiveItem('annual_report');
    scrollToSectionId(MENU_SECTION_ID);
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-page dark:bg-surface-950">
      <SEO
        title="Investors | SKM Egg Products"
        description="Investor relations for SKM Egg Products — disclosures, annual reports, board information, corporate governance, shareholding patterns, and more."
        keywords="SKM investors, annual report, LODR disclosures, corporate governance, shareholding pattern, board committee"
      />
      <Breadcrumb
        items={[{ label: 'Investors' }]}
        onPageChange={onPageChange}
      />

      <InvestorHero onSelect={handleSelect} onDownloadAnnualReport={handleDownloadAnnualReport} />

      <div id={MENU_SECTION_ID} className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 flex flex-col lg:flex-row gap-8 flex-1 scroll-mt-[100px] xl:scroll-mt-[120px]">

        {/* Mobile: dropdown selector */}
        <div className="lg:hidden w-full flex flex-col gap-3">
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="w-full flex items-center justify-between px-5 py-3.5 rounded-[10px] bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800 font-heading font-bold text-[13px] text-surface-800 dark:text-white focus:outline-none"
          >
            <span className="truncate pr-2 text-left text-xs">{activeLabel}</span>
            <svg
              className={`w-4 h-4 text-surface-400 flex-shrink-0 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="rounded-[10px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900 overflow-hidden shadow-[5px_3px_40px_rgba(0,72,88,0.1)] flex flex-col">
                  <p className="font-body text-[10px] font-bold uppercase tracking-widest text-surface-400 dark:text-surface-500 px-5 pt-3 pb-2">
                    Most Used
                  </p>
                  {recommendedItems.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => handleSelect(item.value)}
                      className={`w-full text-left px-5 py-3 font-body text-[12px] font-medium border-b border-[#eee] dark:border-surface-800 last:border-0 transition-colors duration-200 ${
                        activeItem === item.value
                          ? 'text-brand-600 dark:text-brand-400 bg-brand-600/5 dark:bg-brand-950/30'
                          : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800/50 hover:text-brand-600 dark:hover:text-brand-400'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}

                  <button
                    onClick={() => setShowArchive((prev) => !prev)}
                    className="w-full text-left px-5 py-3 font-body text-[11.5px] font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400 border-t border-b border-[#eee] dark:border-surface-800 bg-surface-50/60 dark:bg-surface-800/30"
                  >
                    {showArchive ? 'Hide' : 'View'} All Categories ({archiveItems.length})
                  </button>

                  {showArchive && archiveItems.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => handleSelect(item.value)}
                      className={`w-full text-left px-5 py-3 font-body text-[12px] font-medium border-b border-[#eee] dark:border-surface-800 last:border-0 transition-colors duration-200 ${
                        activeItem === item.value
                          ? 'text-brand-600 dark:text-brand-400 bg-brand-600/5 dark:bg-brand-950/30'
                          : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800/50 hover:text-brand-600 dark:hover:text-brand-400'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop: sticky sidebar */}
        <aside className="hidden lg:flex flex-col w-72 xl:w-80 flex-shrink-0">
          <div className="sticky top-24 flex flex-col gap-0.5 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 custom-scrollbar">
            <p className="font-body text-[10px] font-bold uppercase tracking-widest text-surface-400 dark:text-surface-500 px-3 pb-3 mb-1 border-b border-[#eee] dark:border-surface-800">
              Most Used
            </p>
            {recommendedItems.map((item) => {
              const isActive = activeItem === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => handleSelect(item.value)}
                  className={`w-full text-left px-4 py-2.5 rounded-[8px] font-body text-[12px] font-medium leading-snug transition-all duration-200 cursor-pointer focus:outline-none relative ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-600/5 dark:bg-brand-950/40 border border-brand-600/12 dark:border-brand-900/50'
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-900/50 hover:text-brand-600 dark:hover:text-brand-400 border border-transparent'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="investorSidebarIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-brand-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={isActive ? 'pl-2.5' : ''}>{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => setShowArchive((prev) => !prev)}
              aria-expanded={showArchive}
              className="w-full flex items-center justify-between gap-2 text-left px-4 py-2.5 mt-2 rounded-[8px] font-body text-[11px] font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400 bg-brand-600/5 dark:bg-brand-950/30 border border-brand-600/12 dark:border-brand-900/40 cursor-pointer focus:outline-none"
            >
              <span>All Categories ({archiveItems.length})</span>
              <svg
                className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${showArchive ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence initial={false}>
              {showArchive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden flex flex-col gap-0.5"
                >
                  <div className="pt-2 pb-1">
                    <input
                      type="text"
                      value={archiveSearch}
                      onChange={(e) => setArchiveSearch(e.target.value)}
                      placeholder="Search all categories…"
                      className="w-full px-3 py-2 rounded-[7px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900 font-body text-[12px] text-surface-700 dark:text-surface-300 placeholder:text-surface-350 dark:placeholder:text-surface-600 focus:outline-none focus:border-brand-600/50"
                    />
                  </div>
                  {filteredArchiveItems.map((item) => {
                    const isActive = activeItem === item.value;
                    return (
                      <button
                        key={item.value}
                        onClick={() => handleSelect(item.value)}
                        className={`w-full text-left px-4 py-2.5 rounded-[8px] font-body text-[12px] font-medium leading-snug transition-all duration-200 cursor-pointer focus:outline-none relative ${
                          isActive
                            ? 'text-brand-600 dark:text-brand-400 bg-brand-600/5 dark:bg-brand-950/40 border border-brand-600/12 dark:border-brand-900/50'
                            : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-900/50 hover:text-brand-600 dark:hover:text-brand-400 border border-transparent'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                  {filteredArchiveItems.length === 0 && (
                    <p className="font-body text-[11.5px] text-surface-400 dark:text-surface-500 px-4 py-2">
                      No categories match "{archiveSearch}".
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>

        {/* Content area */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <SectionContent key={activeItem} value={activeItem} label={activeLabel} />
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}
