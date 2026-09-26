import { Field, inputClass } from '../../../components/common/FormField';

const MESSAGE_MAX = 2000;

// Step 3 — Contact details (brief §2, Step 3): Name, Company, Job role,
// Business email, Phone, Message. Adds "Job role" as a new real field on
// top of the previous StepContact.jsx fields (kept for the older flow).
//
// Also carries the export-enquiry brief's remaining required fields that
// belong at "how do we reach you": Message (now required, 20–2000 chars,
// with a live counter) and Privacy Consent. `website` is an invisible
// honeypot — a real bot trap, not a decorative field — kept out of the
// visual layout and off the tab order.
export default function StepContactDetails({ formData, setFormData, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConsentChange = (e) => {
    setFormData((prev) => ({ ...prev, consent: e.target.checked }));
  };

  const messageLength = formData.message.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading m-0 tracking-tight">
          How do we reach you?
        </h2>
        <p className="font-body text-[13.5px] text-surface-500 m-0">
          A member of our export sales team will respond within 24 hours.
        </p>
      </div>

      {/* Honeypot — invisible to sighted and screen-reader users, never focusable */}
      <div className="fixed left-[-9999px] top-[-9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First Name" required error={errors.firstName}>
          <input type="text" name="firstName" autoComplete="given-name" value={formData.firstName} onChange={handleChange} className={inputClass(errors.firstName)} placeholder="First name" />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input type="text" name="lastName" autoComplete="family-name" value={formData.lastName} onChange={handleChange} className={inputClass(errors.lastName)} placeholder="Last name" />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Company Name" required error={errors.company}>
          <input type="text" name="company" autoComplete="organization" value={formData.company} onChange={handleChange} className={inputClass(errors.company)} placeholder="Enter company / business name" />
        </Field>
        <Field label="Job Role">
          <input type="text" name="jobRole" autoComplete="organization-title" value={formData.jobRole} onChange={handleChange} className={inputClass(false)} placeholder="e.g. Procurement Manager" />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Business Email" required error={errors.email}>
          <input type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} className={inputClass(errors.email)} placeholder="name@company.com" />
        </Field>
        <Field label="Phone Number" required error={errors.phone}>
          <input type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className={inputClass(errors.phone)} placeholder="+91 98765 43210" />
        </Field>
      </div>

      <Field label="Tell us about your requirement" required error={errors.message}>
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          maxLength={MESSAGE_MAX}
          className={`${inputClass(errors.message)} resize-none`}
          placeholder="Please provide product requirements, quantity, destination market, application or any other details that can help our team respond to you."
        />
        <span className="font-body text-[11px] text-surface-400 self-end">{messageLength} / {MESSAGE_MAX}</span>
      </Field>

      <label className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleConsentChange}
          aria-invalid={errors.consent ? 'true' : 'false'}
          aria-describedby={errors.consent ? 'consent-error' : undefined}
          className="mt-0.5 w-4 h-4 flex-shrink-0 accent-brand-600 cursor-pointer"
        />
        <span className="font-body text-[12.5px] text-surface-600 leading-snug">
          I agree that SKM Egg Products may use the information provided to respond to my enquiry. *
        </span>
      </label>
      {errors.consent && (
        <span id="consent-error" className="font-body text-[11px] text-red-500 font-semibold -mt-4">{errors.consent}</span>
      )}
    </div>
  );
}
