import { useRef, useState } from 'react';
import { FormSection, SelectField, TextField } from './careerFields';
import newSubmissionId from '../../../utils/submissionId';

const API_URL = import.meta.env.VITE_API_URL || '';

const COURSE_YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'Final Year'];
const EMAIL_PATTERN = /\S+@\S+\.\S+/;
const PHONE_PATTERN = /^\+?[\d\s-]{10,15}$/;
const todayIso = () => new Date().toISOString().slice(0, 10);

const emptyForm = {
  name: '', institute: '', course: '', currentYear: '',
  periodFrom: '', periodTo: '', email: '', phone: '',
};

const validate = (form) => {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.institute.trim()) errors.institute = 'Institute is required.';
  if (!form.course.trim()) errors.course = 'Course is required.';
  if (!form.currentYear) errors.currentYear = 'Select your current year of course.';
  if (!form.periodFrom) errors.periodFrom = 'Start date is required.';
  else if (form.periodFrom < todayIso()) errors.periodFrom = 'Start date cannot be in the past.';
  if (!form.periodTo) errors.periodTo = 'End date is required.';
  else if (form.periodFrom && form.periodTo < form.periodFrom) errors.periodTo = 'End date cannot be before the start date.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_PATTERN.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.phone.trim()) errors.phone = 'Mobile number is required.';
  else if (!PHONE_PATTERN.test(form.phone.trim())) errors.phone = 'Enter a valid mobile number.';
  return errors;
};

// Internship application. Calls onSuccess(reference) with the server reference.
export default function InternshipForm({ onSuccess }) {
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
      const res = await fetch(`${API_URL}/api/v1/careers/internship`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          submission_id: submissionIdRef.current,
          name: form.name.trim(),
          institute: form.institute.trim(),
          course: form.course.trim(),
          current_year: form.currentYear,
          period_from: form.periodFrom,
          period_to: form.periodTo,
          email: form.email.trim(),
          phone: form.phone.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      onSuccess(data.reference);
    } catch (err) {
      console.error('Internship application error:', err);
      setSubmitError(err.message && err.message !== 'Failed to fetch'
        ? err.message
        : 'We could not submit your application. Please try again or contact us directly.');
      errorSummaryRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10 font-body">
      <FormSection title="Student Details">
        <div className="sm:col-span-2">
          <TextField {...bind('name')} label="Name" required autoComplete="name" />
        </div>
        <TextField {...bind('institute')} label="Institute" required />
        <TextField {...bind('course')} label="Course" required placeholder="e.g. B.Tech Food Technology" />
        <SelectField {...bind('currentYear')} label="Current Year of Course" required options={COURSE_YEARS} />
      </FormSection>

      <FormSection title="Period of Internship Applied">
        <TextField {...bind('periodFrom')} label="From" type="date" required min={todayIso()} />
        <TextField {...bind('periodTo')} label="To" type="date" required min={form.periodFrom || todayIso()} />
      </FormSection>

      <FormSection title="Contact Details">
        <TextField {...bind('email')} label="Email ID" type="email" required autoComplete="email" />
        <TextField {...bind('phone')} label="Mobile No" type="tel" required autoComplete="tel" placeholder="+91 98765 43210" />
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
          {isSubmitting ? 'Submitting...' : 'Submit Internship Application'}
        </button>
        <p className="font-body text-[12px] text-surface-500 m-0">
          Fields marked <span className="text-brand-650 font-bold">*</span> are required. Your details are used only for internship coordination.
        </p>
      </div>
    </form>
  );
}
