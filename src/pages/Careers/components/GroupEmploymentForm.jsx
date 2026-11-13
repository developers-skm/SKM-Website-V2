import { useRef, useState } from 'react';
import { FormSection, TextAreaField, TextField } from './careerFields';
import newSubmissionId from '../../../utils/submissionId';

const API_URL = import.meta.env.VITE_API_URL || '';

const EMAIL_PATTERN = /\S+@\S+\.\S+/;
const PHONE_PATTERN = /^\+?[\d\s-]{10,15}$/;

const emptyForm = {
  agencyName: '', agencyExperience: '', manpowerMin: '', manpowerMax: '',
  location: '', email: '', phone: '',
};

const isWholeNumber = (value) => /^\d+$/.test(String(value).trim()) && Number(value) >= 1;

const validate = (form) => {
  const errors = {};
  if (!form.agencyName.trim()) errors.agencyName = 'Name of agency is required.';
  if (!form.agencyExperience.trim()) errors.agencyExperience = 'Agency experience is required.';
  if (!isWholeNumber(form.manpowerMin)) errors.manpowerMin = 'Enter the minimum manpower (whole number, at least 1).';
  if (!isWholeNumber(form.manpowerMax)) errors.manpowerMax = 'Enter the maximum manpower (whole number, at least 1).';
  else if (!errors.manpowerMin && Number(form.manpowerMax) < Number(form.manpowerMin)) {
    errors.manpowerMax = 'Maximum cannot be less than the minimum.';
  }
  if (!form.location.trim()) errors.location = 'Location is required.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_PATTERN.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.phone.trim()) errors.phone = 'Mobile number is required.';
  else if (!PHONE_PATTERN.test(form.phone.trim())) errors.phone = 'Enter a valid mobile number.';
  return errors;
};

// Group employment (contract manpower) enquiry from agencies.
// Calls onSuccess(reference) with the server reference.
export default function GroupEmploymentForm({ onSuccess }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorSummaryRef = useRef(null);
  const submissionIdRef = useRef(newSubmissionId());

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };
  const bind = (name) => ({ id: name, value: form[name], onChange: handleChange, error: errors[name] });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    const found = validate(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch(`${API_URL}/api/v1/careers/group-employment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          submission_id: submissionIdRef.current,
          agency_name: form.agencyName.trim(),
          agency_experience: form.agencyExperience.trim(),
          manpower_min: form.manpowerMin.trim(),
          manpower_max: form.manpowerMax.trim(),
          location: form.location.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      onSuccess(data.reference);
    } catch (err) {
      console.error('Group employment enquiry error:', err);
      setSubmitError(err.message && err.message !== 'Failed to fetch'
        ? err.message
        : 'We could not submit your details. Please try again or contact us directly.');
      errorSummaryRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10 font-body">
      <FormSection title="Agency Details">
        <div className="sm:col-span-2">
          <TextField {...bind('agencyName')} label="Name of Agency" required autoComplete="organization" />
        </div>
        <div className="sm:col-span-2">
          <TextAreaField
            {...bind('agencyExperience')}
            label="Agency Experience"
            required
            placeholder="Years in business, industries served, notable clients"
          />
        </div>
        <TextField {...bind('location')} label="Location" required autoComplete="address-level2" placeholder="City, State" />
      </FormSection>

      <FormSection title="Manpower That Can Be Supplied">
        <TextField {...bind('manpowerMin')} label="Minimum" type="number" min="1" inputMode="numeric" required />
        <TextField {...bind('manpowerMax')} label="Maximum" type="number" min="1" inputMode="numeric" required />
      </FormSection>

      <FormSection title="Contact Details">
        <TextField {...bind('email')} label="Mail" type="email" required autoComplete="email" />
        <TextField {...bind('phone')} label="Mobile" type="tel" required autoComplete="tel" placeholder="+91 98765 43210" />
      </FormSection>

      {submitError && (
        <div ref={errorSummaryRef} tabIndex={-1} role="alert" className="font-body text-sm text-red-700 font-medium bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {submitError}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary-red min-h-[48px] justify-center self-start disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Details'}
        </button>
        <p className="font-body text-[12px] text-surface-500 m-0">
          Fields marked <span className="text-brand-650 font-bold">*</span> are required. Your details are used only for manpower sourcing.
        </p>
      </div>
    </form>
  );
}
