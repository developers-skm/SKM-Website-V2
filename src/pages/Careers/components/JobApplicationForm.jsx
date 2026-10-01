import { useRef, useState } from 'react';
import { FormSection, SelectField, TextField, FieldShell } from './careerFields';
import ResumeUploader from './ResumeUploader';
import { careerDepartments } from '../../../data/careersContent';

const API_URL = import.meta.env.VITE_API_URL || '';

const REFERRAL_SOURCES = ['LinkedIn', 'Employee Referral', 'Website', 'Job Portal', 'College', 'Other'];

const emptyForm = {
  firstName: '', lastName: '', email: '', phone: '', currentLocation: '',
  currentCompany: '', currentDesignation: '', highestQualification: '', specialization: '',
  totalExperience: '', relevantExperience: '', currentCtc: '', expectedCtc: '', noticePeriod: '',
  willingToRelocate: '', referralSource: '',
  preferredDepartment: '', preferredRole: '', linkedinUrl: '',
  resume: null,
};

// Same rule the old Contact modal used (kept so behaviour is unchanged).
const EMAIL_PATTERN = /\S+@\S+\.\S+/;

const validate = (form, isTalentPool) => {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = 'First name is required.';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_PATTERN.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.phone.trim()) errors.phone = 'Phone number is required.';
  if (!form.highestQualification.trim()) errors.highestQualification = 'Highest qualification is required.';
  if (isTalentPool && !form.preferredDepartment) errors.preferredDepartment = 'Select a preferred department.';
  if (!form.resume) errors.resume = 'Please upload your resume.';
  return errors;
};

// Builds the multipart body for POST /api/v1/careers/apply.
const buildFormData = (form, job) => {
  const data = new FormData();
  const fields = {
    application_type: job ? 'job' : 'talent_pool',
    job_id: job?.id,
    job_title: job?.title,
    job_department: job?.department,
    job_location: job?.location,
    first_name: form.firstName,
    last_name: form.lastName,
    email: form.email,
    phone: form.phone,
    current_location: form.currentLocation,
    current_company: form.currentCompany,
    current_designation: form.currentDesignation,
    highest_qualification: form.highestQualification,
    specialization: form.specialization,
    total_experience: form.totalExperience,
    relevant_experience: form.relevantExperience,
    current_ctc: form.currentCtc,
    expected_ctc: form.expectedCtc,
    notice_period: form.noticePeriod,
    willing_to_relocate: form.willingToRelocate,
    referral_source: form.referralSource,
    preferred_department: form.preferredDepartment,
    preferred_role: form.preferredRole,
    linkedin_url: form.linkedinUrl,
  };
  Object.entries(fields).forEach(([key, value]) => {
    if (value && String(value).trim()) data.append(key, String(value).trim());
  });
  data.append('resume', form.resume);
  return data;
};

// Full-page application form. `job` set → vacancy application; omitted →
// general Talent Pool profile. Calls onSuccess(reference) with the reference
// ID returned by the server.
export default function JobApplicationForm({ job, onSuccess }) {
  const isTalentPool = !job;
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorSummaryRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const bind = (name) => ({ id: name, value: form[name], onChange: handleChange, error: errors[name] });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate(form, isTalentPool);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first invalid control.
      const first = Object.keys(found)[0];
      document.getElementById(first === 'resume' ? 'resume' : first)?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch(`${API_URL}/api/v1/careers/apply`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: buildFormData(form, job),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      onSuccess(data.reference);
    } catch (err) {
      console.error('Career application error:', err);
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
      <FormSection title="Personal Information">
        <TextField {...bind('firstName')} label="First Name" required autoComplete="given-name" />
        <TextField {...bind('lastName')} label="Last Name" required autoComplete="family-name" />
        <TextField {...bind('email')} label="Email" type="email" required autoComplete="email" />
        <TextField {...bind('phone')} label="Phone Number" type="tel" required autoComplete="tel" placeholder="+91 98765 43210" />
        <TextField {...bind('currentLocation')} label="Current Location" placeholder="City, State" autoComplete="address-level2" />
        {isTalentPool && <TextField {...bind('linkedinUrl')} label="LinkedIn Profile" type="url" placeholder="https://www.linkedin.com/in/…" hint="Optional" />}
      </FormSection>

      {isTalentPool ? (
        <FormSection title="Professional Information">
          <SelectField {...bind('preferredDepartment')} label="Preferred Department" required options={careerDepartments} />
          <TextField {...bind('preferredRole')} label="Preferred Role / Area of Interest" />
          <TextField {...bind('highestQualification')} label="Highest Qualification" required />
          <TextField {...bind('totalExperience')} label="Total Experience" placeholder="e.g. 3 years" />
          <TextField {...bind('currentCompany')} label="Current Company / Institute" />
        </FormSection>
      ) : (
        <>
          <FormSection title="Professional Information">
            <TextField {...bind('currentCompany')} label="Current Company / Institute" />
            <TextField {...bind('currentDesignation')} label="Current Designation" />
            <TextField {...bind('highestQualification')} label="Highest Qualification" required />
            <TextField {...bind('specialization')} label="Specialization" />
            <TextField {...bind('totalExperience')} label="Total Experience" placeholder="e.g. 3 years" />
            <TextField {...bind('relevantExperience')} label="Relevant Experience" placeholder="e.g. 2 years" />
            <TextField {...bind('currentCtc')} label="Current CTC" />
            <TextField {...bind('expectedCtc')} label="Expected CTC" />
            <TextField {...bind('noticePeriod')} label="Notice Period" placeholder="e.g. 30 days" />
          </FormSection>

          <FormSection title="Additional Information">
            <FieldShell id="willingToRelocate-yes" label="Willing to relocate?">
              <div role="radiogroup" aria-label="Willing to relocate" className="flex gap-6 min-h-[44px] items-center">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center gap-2 font-body text-[15px] text-surface-700 cursor-pointer">
                    <input
                      id={`willingToRelocate-${option.toLowerCase()}`}
                      type="radio"
                      name="willingToRelocate"
                      value={option}
                      checked={form.willingToRelocate === option}
                      onChange={handleChange}
                      className="w-4 h-4 accent-[var(--color-brand-600)]"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </FieldShell>
            <SelectField {...bind('referralSource')} label="How did you hear about this opportunity?" options={REFERRAL_SOURCES} />
          </FormSection>
        </>
      )}

      <FormSection title="Resume">
        <div className="sm:col-span-2">
          <ResumeUploader
            file={form.resume}
            error={errors.resume}
            onChange={(file) => {
              setForm((prev) => ({ ...prev, resume: file }));
              setErrors((prev) => ({ ...prev, resume: null }));
            }}
            onError={(message) => setErrors((prev) => ({ ...prev, resume: message }))}
          />
        </div>
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
          {isSubmitting ? 'Submitting…' : isTalentPool ? 'Submit Profile' : 'Submit Application'}
        </button>
        <p className="font-body text-[12px] text-surface-500 m-0">
          Fields marked <span className="text-brand-650 font-bold">*</span> are required. Your details are used only for recruitment purposes.
        </p>
      </div>
    </form>
  );
}
