import { motion } from 'framer-motion';
import products, { PRODUCT_CATEGORIES } from '../../../data/products';
import { getApplicationById } from '../../../data/applications';
import { Field, selectClass } from '../../../components/common/FormField';
import { containerVariants, itemVariants } from '../../../utils/animationVariants';

// Step 1 — Requirement (brief §2, Step 1): Product or application,
// Functional requirement, Standard or custom product.
//
// "Functional requirement" options are the real, verified traits already
// established across this session (heat stability, whipping performance,
// gel strength, emulsion stability, colour, protein target — same list
// used on the Innovation and Custom Solutions page's "Challenges SKM can
// support" section) — not per-product filterable data, just a real
// free-text-equivalent classification the visitor selects to tell sales
// what they need, carried through as-is to the enquiry.
//
// "Standard or custom product" is real: PRODUCT_CATEGORIES.CUSTOMIZED
// exists as a genuine category distinct from the 3 standard catalogue
// categories (Powders, Liquids, Speciality).
//
// Section 3 (Sample request route): when `enquiryIntent` is
// 'sample-or-documents', this step switches to a real multi-select "sample
// cart" — buyers select one or more products and submit them together —
// same real multi-select interaction pattern already used for "Add to
// Comparison" on /products and the category pages, applied here to
// `formData.sampleProductIds` instead of a single `productId`. Every other
// intent keeps the original single-product picker, since a
// recommendation/quote/general enquiry genuinely centers on one product.
const FUNCTIONAL_REQUIREMENTS = [
  'Heat stability',
  'Whipping performance',
  'Gel strength',
  'Emulsion stability',
  'Colour',
  'Protein target',
  'Not sure yet',
];

export default function StepRequirement({ formData, setFormData, enquiryIntent }) {
  const application = formData.applicationId ? getApplicationById(formData.applicationId) : null;
  const recommendedIds = new Set(application?.matchedProductIds ?? []);
  const isSampleCart = enquiryIntent === 'sample-or-documents';

  const handleFunctionalChange = (e) => {
    setFormData((prev) => ({ ...prev, functionalRequirement: e.target.value }));
  };

  const handleProductTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, productType: value }));
  };

  const toggleSampleProduct = (productId) => {
    setFormData((prev) => {
      const current = prev.sampleProductIds ?? [];
      const next = current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId];
      return { ...prev, sampleProductIds: next };
    });
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white m-0 tracking-tight">
          {isSampleCart ? 'Which products do you need samples or documents for?' : 'What do you need?'}
        </h2>
        <p className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 m-0">
          {isSampleCart
            ? 'Select one or more products — we\'ll send samples and technical documents for everything you pick.'
            : application
              ? `Recommended for ${application.title.toLowerCase()} — or pick a different product below.`
              : 'Select a product to continue. You can refine quantity and delivery next.'}
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {products.map((product) => {
          const isSelected = isSampleCart
            ? (formData.sampleProductIds ?? []).includes(product.id)
            : formData.productId === product.id;
          const isRecommended = recommendedIds.has(product.id);
          return (
            <motion.button
              key={product.id}
              variants={itemVariants}
              type="button"
              onClick={() =>
                isSampleCart
                  ? toggleSampleProduct(product.id)
                  : setFormData((prev) => ({ ...prev, productId: product.id }))
              }
              aria-pressed={isSampleCart ? isSelected : undefined}
              className={`group relative flex items-center gap-3 text-left p-3 rounded-[12px] border transition-all duration-200 cursor-pointer focus:outline-none ${
                isSelected
                  ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/30 shadow-[0_4px_20px_rgba(228,10,24,0.12)]'
                  : 'border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900 hover:border-brand-300 dark:hover:border-brand-800'
              }`}
            >
              <div className="relative w-14 h-14 rounded-[8px] overflow-hidden flex-shrink-0">
                <img src={product.image} alt={product.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                {isRecommended && (
                  <span className="font-body text-[9.5px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    Recommended
                  </span>
                )}
                <span className="font-heading font-bold text-[13px] text-surface-800 dark:text-white leading-tight truncate">
                  {product.title}
                </span>
                <span className="font-body text-[10.5px] text-surface-400 dark:text-surface-500 truncate">
                  {product.category}
                </span>
              </div>
              {isSelected && (
                <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {isSampleCart && (
        <p className="font-body text-[13px] text-surface-500 dark:text-surface-400 m-0" aria-live="polite">
          {(formData.sampleProductIds ?? []).length} product{(formData.sampleProductIds ?? []).length === 1 ? '' : 's'} selected
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Functional Requirement">
          <select value={formData.functionalRequirement} onChange={handleFunctionalChange} className={selectClass}>
            <option value="">— Select if relevant —</option>
            {FUNCTIONAL_REQUIREMENTS.map((req) => (
              <option key={req} value={req}>{req}</option>
            ))}
          </select>
        </Field>

        <Field label="Standard or Custom Product">
          <div className="flex items-center gap-2 pt-1">
            {[
              { value: 'standard', label: 'Standard' },
              { value: PRODUCT_CATEGORIES.CUSTOMIZED, label: 'Custom' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleProductTypeChange(opt.value)}
                aria-pressed={formData.productType === opt.value}
                className={`flex-1 min-h-[38px] px-3 py-2 rounded-full border font-body text-[12.5px] font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                  formData.productType === opt.value
                    ? 'bg-brand-600 border-brand-600 text-white'
                    : 'bg-white dark:bg-surface-900 border-surface-300 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:border-brand-600/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Field>
      </div>
    </div>
  );
}
