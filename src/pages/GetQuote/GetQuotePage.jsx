import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import StepRequirement from './steps/StepRequirement';
import StepCommercialDetails from './steps/StepCommercialDetails';
import StepContactDetails from './steps/StepContactDetails';
import StepReview from './steps/StepReview';
import ConfirmationScreen from './ConfirmationScreen';
import submitQuote from './submitQuote';

// Section 2 — Guided form (brief §2). 4 steps, progressive disclosure —
// only the current step's fields are shown, matching the brief's explicit
// "do not display every field at once" instruction.
const STEPS = [
  { id: 1, label: 'Requirement' },
  { id: 2, label: 'Commercial Details' },
  { id: 3, label: 'Contact Details' },
  { id: 4, label: 'Review' },
];

// Real, honest per-intent copy — `enquiryIntent` arrives via prefillData
// from EnquiryCategories.jsx's 4 primary intent cards. This only changes
// the page heading/description; the same real fields/steps are used for
// every intent (no fabricated separate flow per intent), since a genuine
// product/commercial/contact enquiry needs the same real information
// regardless of framing.
const INTENT_COPY = {
  'product-recommendation': {
    heading: 'Get a product recommendation',
    description: "Tell us your application and requirement — we'll recommend the right SKM product.",
  },
  'sample-or-documents': {
    heading: 'Request a sample or technical documents',
    description: 'Tell us which product and document type you need — our team will send it over.',
  },
  'price-quotation': {
    heading: 'Request a price quotation',
    description: 'Tell us your product, volume, and destination — our export sales team will quote within 24 hours.',
  },
  general: {
    heading: 'Send us your enquiry',
    description: "Tell us what you need — we'll route it to the right person.",
  },
};

const initialFormData = {
  productId: '',
  applicationId: '',
  sampleProductIds: [],
  functionalRequirement: '',
  productType: '',
  quantity: '',
  packaging: '',
  country: '',
  deliveryDate: '',
  firstName: '',
  lastName: '',
  company: '',
  jobRole: '',
  email: '',
  phone: '',
  message: '',
};

// The guided quote/sample-request flow — the equivalent of Booking's booking
// funnel and the primary conversion target of the whole site (plan.md §1/§7).
// `prefill` (routed in via App.jsx's handlePageChange) carries context from
// wherever the visitor came from, so Step 1 doesn't ask again — including
// `enquiryIntent` from the Section 1 intent selector on /contact-us.
export default function GetQuotePage({ onPageChange, prefill }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => ({
    ...initialFormData,
    productId: prefill?.productId ?? '',
    applicationId: prefill?.applicationId ?? '',
  }));
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const intentCopy = INTENT_COPY[prefill?.enquiryIntent] ?? null;
  const isSampleCart = prefill?.enquiryIntent === 'sample-or-documents';

  const validateStep = (targetStep) => {
    const e = {};
    if (targetStep === 1 && isSampleCart && !(formData.sampleProductIds?.length > 0)) {
      e.productId = 'Select at least one product to continue.';
    }
    if (targetStep === 1 && !isSampleCart && !formData.productId) {
      e.productId = 'Select a product to continue.';
    }
    if (targetStep === 2 && !formData.country) {
      e.country = 'Select your destination country.';
    }
    if (targetStep === 3) {
      if (!formData.firstName.trim()) e.firstName = 'First name is required.';
      if (!formData.lastName.trim()) e.lastName = 'Last name is required.';
      if (!formData.company.trim()) e.company = 'Company name is required.';
      if (!formData.email.trim()) {
        e.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        e.email = 'Enter a valid email address.';
      }
      if (!formData.phone.trim()) e.phone = 'Phone number is required.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const goToStep = (targetStep) => {
    if (targetStep < step) setStep(targetStep);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await submitQuote({
        enquiry_type: 'quote_request',
        enquiry_intent: prefill?.enquiryIntent ?? null,
        product_id: formData.productId || null,
        sample_product_ids: formData.sampleProductIds?.length ? formData.sampleProductIds : null,
        application_id: formData.applicationId || null,
        functional_requirement: formData.functionalRequirement || null,
        product_type: formData.productType || null,
        quantity: formData.quantity || null,
        packaging: formData.packaging || null,
        destination_country: formData.country || null,
        delivery_date: formData.deliveryDate || null,
        first_name: formData.firstName,
        last_name: formData.lastName,
        company: formData.company,
        job_role: formData.jobRole || null,
        email: formData.email,
        phone: formData.phone,
        message: formData.message || null,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Quote submit error:', err);
      setSubmitError('Something went wrong sending your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper
      seo={{
        title: 'Request A Quote | SKM Egg Products',
        description: 'Request a sample or quote for SKM egg powders and liquid egg products — tell us your application, quantity, and destination and our export sales team will respond within 24 hours.',
        keywords: 'egg powder quote, egg products sample request, egg powder RFQ, bulk egg powder pricing, egg products export enquiry',
        canonical: 'https://www.skmegg.com/get-quote',
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full bg-page">
        {isSubmitted ? (
          <ConfirmationScreen formData={formData} onPageChange={onPageChange} />
        ) : (
          <div className="mx-auto max-w-[760px] w-full px-4 sm:px-6 lg:px-8 pt-[110px] pb-[50px] sm:pt-[130px] lg:pt-[70px] lg:pb-[70px] flex flex-col gap-10">

            {intentCopy && (
              <div className="flex flex-col gap-1.5">
                <h1 className="font-heading font-bold text-[26px] sm:text-[30px] text-heading m-0 tracking-tight">
                  {intentCopy.heading}
                </h1>
                <p className="font-body text-[14px] text-surface-500 m-0">
                  {intentCopy.description}
                </p>
              </div>
            )}

            {/* Progress indicator */}
            <div className="flex items-center gap-2 sm:gap-3">
              {STEPS.map((s, i) => {
                const isActive = s.id === step;
                const isDone = s.id < step;
                return (
                  <React.Fragment key={s.id}>
                    <button
                      onClick={() => goToStep(s.id)}
                      disabled={s.id >= step}
                      className={`flex items-center gap-2 group ${s.id < step ? 'cursor-pointer' : 'cursor-default'} focus:outline-none`}
                    >
                      <span
                        className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-heading font-bold text-[12px] flex-shrink-0 transition-colors duration-200 ${
                          isActive
                            ? 'bg-brand-600 text-white'
                            : isDone
                              ? 'bg-brand-50 text-brand-600 border border-brand-300'
                              : 'bg-surface-100 text-surface-400'
                        }`}
                      >
                        {isDone ? (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : s.id}
                      </span>
                      <span className={`hidden sm:inline font-body text-[11.5px] font-semibold uppercase tracking-wide ${isActive ? 'text-surface-800' : 'text-surface-400'}`}>
                        {s.label}
                      </span>
                    </button>
                    {i < STEPS.length - 1 && (
                      <span className={`flex-1 h-px ${s.id < step ? 'bg-brand-300' : 'bg-surface-200'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              >
                {step === 1 && <StepRequirement formData={formData} setFormData={setFormData} enquiryIntent={prefill?.enquiryIntent} />}
                {step === 2 && <StepCommercialDetails formData={formData} setFormData={setFormData} />}
                {step === 3 && <StepContactDetails formData={formData} setFormData={setFormData} errors={errors} />}
                {step === 4 && <StepReview formData={formData} />}

                {step === 1 && errors.productId && (
                  <p className="font-body text-[11px] text-red-500 font-semibold mt-3">{errors.productId}</p>
                )}
              </motion.div>
            </AnimatePresence>

            {submitError && (
              <div className="flex items-start gap-2.5 font-body text-xs text-red-600 font-medium bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {submitError}
              </div>
            )}

            {/* Nav buttons */}
            <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#eee]">
              <button
                onClick={goBack}
                disabled={step === 1}
                className="font-body font-semibold text-[12.5px] uppercase tracking-wide text-surface-500 hover:text-surface-800 disabled:opacity-0 disabled:pointer-events-none transition-colors duration-200 cursor-pointer bg-transparent border-none py-3"
              >
                ← Back
              </button>

              {step < STEPS.length ? (
                <button
                  onClick={goNext}
                  className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-7 py-[15px] rounded-[200px] transition-all duration-300 shadow-[0_4px_20px_rgba(228,10,24,0.25)] hover:shadow-[0_6px_28px_rgba(228,10,24,0.4)] cursor-pointer"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] leading-none px-7 py-[15px] rounded-[200px] transition-all duration-300 shadow-[0_4px_20px_rgba(228,10,24,0.25)] hover:shadow-[0_6px_28px_rgba(228,10,24,0.4)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Submitting…
                    </>
                  ) : isSampleCart ? 'Submit Sample Request' : 'Submit Enquiry'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
