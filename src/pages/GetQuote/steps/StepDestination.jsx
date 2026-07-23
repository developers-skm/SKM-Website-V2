import React from 'react';
import { Field, selectClass } from '../FormField';
import exportMarkets from '../../../data/exportMarkets';

// Reuses the same 28-market list the homepage GlobalMarkets map is built
// from (src/data/exportMarkets.js) rather than re-typing a country list.
export default function StepDestination({ formData, setFormData }) {
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, country: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white m-0 tracking-tight">
          Where should we ship to?
        </h2>
        <p className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 m-0">
          SKM exports to 30+ countries under EU, USDA, Halal, and Kosher compliance — we'll confirm what applies to your market.
        </p>
      </div>

      <Field label="Destination Country" required>
        <select value={formData.country} onChange={handleChange} className={selectClass}>
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
    </div>
  );
}
