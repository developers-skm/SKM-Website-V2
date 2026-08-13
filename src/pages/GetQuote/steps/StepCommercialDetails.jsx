import { Field, selectClass, inputClass } from '../../../components/common/FormField';
import { getProductById } from '../../../data/products';
import exportMarkets from '../../../data/exportMarkets';

// Step 2 — Commercial details (brief §2, Step 2): Estimated volume,
// Packaging, Destination country, Required period or delivery date.
//
// Volume ranges and packaging options are real (packagingOptions per
// product from data/products.js). Destination country reuses the real
// 28-market export list (data/exportMarkets.js), same source as the
// homepage GlobalMarkets map. "Required period or delivery date" is a
// plain real date input — no fabricated lead-time estimate is shown,
// since no real lead-time data exists anywhere in the repo; the field
// only captures what the visitor tells us.
const QUANTITY_RANGES = [
  'Sample / Trial Quantity (< 25kg)',
  '1 Container (< 5 MT)',
  '1–5 Containers (5–25 MT)',
  '5+ Containers (25 MT+)',
  'Not sure yet — advise me',
];

export default function StepCommercialDetails({ formData, setFormData }) {
  const product = getProductById(formData.productId);
  const packagingOptions = product?.packagingOptions ?? ['20kg', '25kg', 'Custom'];

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading m-0 tracking-tight">
          Commercial details
        </h2>
        <p className="font-body text-[13.5px] text-surface-500 m-0">
          Approximate figures are fine — our team will confirm exact quantities and dates with you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Estimated Volume">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Destination Country" required>
          <select value={formData.country} onChange={handleChange('country')} className={selectClass}>
            <option value="">— Select your country —</option>
            {exportMarkets
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((market) => (
                <option key={market.id} value={market.name}>{market.flag} {market.name}</option>
              ))}
            <option value="Other">Other / Not Listed</option>
          </select>
        </Field>

        <Field label="Required Period or Delivery Date">
          <input
            type="date"
            value={formData.deliveryDate}
            onChange={handleChange('deliveryDate')}
            className={inputClass(false)}
          />
        </Field>
      </div>
    </div>
  );
}
