import React from 'react';
import { motion } from 'framer-motion';
import products from '../../../data/products';
import { getApplicationById } from '../../../data/applications';
import { containerVariants, itemVariants } from '../../../utils/animationVariants';

// Step 1 — pre-filled if the visitor arrived from a product or application
// page (see App.jsx's prefill mechanism); otherwise a full picker.
export default function StepProduct({ formData, setFormData }) {
  const application = formData.applicationId ? getApplicationById(formData.applicationId) : null;
  const recommendedIds = new Set(application?.matchedProductIds ?? []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white m-0 tracking-tight">
          Which product are you interested in?
        </h2>
        <p className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 m-0">
          {application
            ? `Recommended for ${application.title.toLowerCase()} — or pick a different product below.`
            : 'Select a product to continue. You can refine quantity and packaging next.'}
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {products.map((product) => {
          const isSelected = formData.productId === product.id;
          const isRecommended = recommendedIds.has(product.id);
          return (
            <motion.button
              key={product.id}
              variants={itemVariants}
              onClick={() => setFormData((prev) => ({ ...prev, productId: product.id }))}
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
    </div>
  );
}
