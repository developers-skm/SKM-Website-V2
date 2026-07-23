import React from 'react';
import { Field, selectClass } from '../FormField';
import { getProductById } from '../../../data/products';

const QUANTITY_RANGES = [
  'Sample / Trial Quantity (< 25kg)',
  '1 Container (< 5 MT)',
  '1–5 Containers (5–25 MT)',
  '5+ Containers (25 MT+)',
  'Not sure yet — advise me',
];

export default function StepQuantity({ formData, setFormData }) {
  const product = getProductById(formData.productId);
  const packagingOptions = product?.packagingOptions ?? ['25kg Bag', '50kg Bag', 'Bulk Sack', 'Custom'];

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white m-0 tracking-tight">
          How much do you need, and in what format?
        </h2>
        <p className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 m-0">
          Approximate figures are fine — our team will confirm exact quantities with you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Estimated Quantity">
          <select value={formData.quantity} onChange={handleChange('quantity')} className={selectClass}>
            <option value="">— Select a range —</option>
            {QUANTITY_RANGES.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </Field>

        <Field label="Preferred Packaging">
          <select value={formData.packaging} onChange={handleChange('packaging')} className={selectClass}>
            <option value="">— Select packaging —</option>
            {packagingOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </Field>
      </div>
    </div>
  );
}
