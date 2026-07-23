import React from 'react';
import { Field, inputClass } from '../FormField';

export default function StepContact({ formData, setFormData, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white m-0 tracking-tight">
          Last step — how do we reach you?
        </h2>
        <p className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 m-0">
          A member of our export sales team will respond within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First Name" required error={errors.firstName}>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass(errors.firstName)} placeholder="First name" />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass(errors.lastName)} placeholder="Last name" />
        </Field>
      </div>

      <Field label="Company Name" required error={errors.company}>
        <input type="text" name="company" value={formData.company} onChange={handleChange} className={inputClass(errors.company)} placeholder="Enter company / business name" />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Email" required error={errors.email}>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass(errors.email)} placeholder="name@company.com" />
        </Field>
        <Field label="Phone Number" required error={errors.phone}>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass(errors.phone)} placeholder="+91 98765 43210" />
        </Field>
      </div>

      <Field label="Anything else we should know?">
        <textarea name="message" rows="3" value={formData.message} onChange={handleChange} className={`${inputClass(false)} resize-none`} placeholder="Formulation details, target launch date, certifications you need..." />
      </Field>
    </div>
  );
}
