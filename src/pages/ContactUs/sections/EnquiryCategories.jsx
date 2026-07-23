import { motion } from 'framer-motion';

// Section 1 — Enquiry-intent selector (brief §1). Exact 4 large choices;
// each card itself is the selection button (no separate button element).
// All 4 route into the real, enhanced get-quote flow with a distinct
// `enquiryIntent` carried via prefillData — the same real prefill
// mechanism already used sitewide (App.jsx's handlePageChange) — so
// GetQuotePage.jsx's Step 1 can adapt its copy/fields per intent without
// this being four separate duplicated flows.
//
// Job/Internship/Feedback/Vendor/Service enquiries are real and still
// fully functional — they've moved to the smaller "Other enquiries" row
// below the 4 primary cards (still open the same real EnquiryModal.jsx
// forms), since they're not one of this page's 4 primary intents per the
// brief.
const primaryIntents = [
  {
    id: 'product-recommendation',
    title: 'Request Product Recommendation',
    desc: "Not sure which egg powder or liquid fits your application? Tell us your requirement and we'll recommend the right product.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'sample-or-documents',
    title: 'Request Sample or Technical Documents',
    desc: 'Request a physical sample, technical data sheet, or product documentation for evaluation.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'price-quotation',
    title: 'Request Price Quotation',
    desc: 'Get a commercial quote for a specific product, volume, and destination.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3v-6m-3 6v-1m-2 4h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'general',
    title: 'General Enquiry',
    desc: "Have a different question? Reach our team and we'll route it to the right department.",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

const otherEnquiries = [
  {
    id: 'careers',
    title: 'Job / Internship',
    buttons: [
      { label: 'Job Enquiry', type: 'job' },
      { label: 'Internship Enquiry', type: 'internship' },
    ],
  },
  {
    id: 'feedback',
    title: 'Feedback / Complaint',
    buttons: [{ label: 'Tell Us', type: 'feedback' }],
  },
  {
    id: 'partners',
    title: 'Service / Vendor Partners',
    buttons: [
      { label: 'Vendor Enquiry', type: 'vendor' },
      { label: 'Service Enquiry', type: 'service' },
    ],
  },
];

export default function EnquiryCategories({ onOpenEnquiry, onPageChange }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 15 } },
  };

  const handleSelectIntent = (intentId) => {
    onPageChange('get-quote', { enquiryIntent: intentId });
  };

  return (
    <div className="w-full bg-page dark:bg-surface-900/40 py-[90px] lg:py-[120px] overflow-hidden relative border-b border-[#eee] dark:border-surface-800/40">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-16"
      >
        {/* Heading */}
        <div className="text-center flex flex-col items-center gap-4 select-none">
          <span className="section-label justify-center">How Can We Help?</span>
          <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            What brings you here today?
          </h2>
          <p className="font-body text-[15px] text-surface-500 dark:text-surface-400 max-w-2xl leading-[26px] m-0">
            Select the option that matches your intent — we'll only ask what's relevant to it.
          </p>
        </div>

        {/* Section 1 — 4 primary intent cards, each card is the button */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {primaryIntents.map((intent) => (
            <motion.button
              key={intent.id}
              type="button"
              variants={itemVariants}
              whileHover={{ y: -4 }}
              onClick={() => handleSelectIntent(intent.id)}
              className="relative overflow-hidden rounded-[10px] bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 p-6 sm:p-8 flex items-start gap-5 text-left transition-all duration-300 shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.14)] hover:border-brand-600/30 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-[10px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-105 transition-transform duration-300">
                <div className="w-6 h-6">{intent.icon}</div>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-heading font-bold text-[19px] text-heading dark:text-white m-0">{intent.title}</h3>
                <p className="text-sm sm:text-base text-surface-500 dark:text-surface-400 leading-relaxed m-0">{intent.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Other enquiries — real, functional, secondary to the 4 primary intents */}
        <motion.div variants={itemVariants} className="flex flex-col gap-5 pt-6 border-t border-[#eee] dark:border-surface-800">
          <span className="font-body text-[12px] font-semibold uppercase tracking-widest text-surface-400 dark:text-surface-500">
            Other Enquiries
          </span>
          <div className="flex flex-wrap gap-4">
            {otherEnquiries.map((cat) => (
              <div key={cat.id} className="flex items-center gap-3 flex-wrap">
                <span className="font-body text-[13px] font-semibold text-surface-600 dark:text-surface-300">{cat.title}:</span>
                {cat.buttons.map((btn) => (
                  <button
                    key={btn.type}
                    type="button"
                    onClick={() => onOpenEnquiry(btn.type)}
                    className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border shadow-xs bg-white dark:bg-surface-900 text-surface-800 dark:text-surface-200 border-surface-250 dark:border-surface-700 hover:border-brand-600 dark:hover:border-brand-500 hover:text-brand-650 dark:hover:text-brand-400"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
