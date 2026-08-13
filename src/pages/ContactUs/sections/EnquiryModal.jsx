import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Field, inputClass, selectClass } from '../../../components/common/FormField';

// ── Shared field components ──────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-650 dark:text-brand-400">
        {children}
      </span>
      <div className="flex-1 h-px bg-surface-200 dark:bg-surface-700/60" />
    </div>
  );
}

// ── Form definitions ─────────────────────────────────────────────────────────

function JobForm({ formData, errors, onChange }) {
  return (
    <>
      <SectionLabel>Personal Information</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First Name" required error={errors.firstName}>
          <input type="text" name="firstName" value={formData.firstName} onChange={onChange} className={inputClass(errors.firstName)} placeholder="First name" />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input type="text" name="lastName" value={formData.lastName} onChange={onChange} className={inputClass(errors.lastName)} placeholder="Last name" />
        </Field>
      </div>

      <Field label="Company / Institute Name">
        <input type="text" name="company" value={formData.company} onChange={onChange} className={inputClass(false)} placeholder="Company or institute name" />
      </Field>

      <Field label="Email" required error={errors.email}>
        <input type="email" name="email" value={formData.email} onChange={onChange} className={inputClass(errors.email)} placeholder="name@company.com" />
      </Field>

      <Field label="Phone Number" required error={errors.phone}>
        <input type="tel" name="phone" value={formData.phone} onChange={onChange} className={inputClass(errors.phone)} placeholder="+91 98765 43210" />
      </Field>

      <Field label="Current Residential Location" required error={errors.location}>
        <input type="text" name="location" value={formData.location} onChange={onChange} className={inputClass(errors.location)} placeholder="City, State" />
      </Field>

      <SectionLabel>Job Details</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Qualification" error={errors.qualification}>
          <input type="text" name="qualification" value={formData.qualification} onChange={onChange} className={inputClass(errors.qualification)} placeholder="e.g. B.Sc, M.Tech" />
        </Field>
        <Field label="Position Applied For" error={errors.position}>
          <input type="text" name="position" value={formData.position} onChange={onChange} className={inputClass(errors.position)} placeholder="e.g. QA Executive" />
        </Field>
      </div>

      <Field label="Job Description">
        <textarea name="jobDescription" rows="3" value={formData.jobDescription} onChange={onChange} className={`${inputClass(false)} resize-none`} placeholder="Brief description of your experience and skills..." />
      </Field>

      <Field label="Upload Resume (.pdf, .doc)" error={errors.resume}>
        <UploadZone file={formData.resume} onFileChange={onChange} error={errors.resume} />
      </Field>
    </>
  );
}

function InternshipForm({ formData, errors, onChange }) {
  return (
    <>
      <SectionLabel>Personal Information</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First Name" required error={errors.firstName}>
          <input type="text" name="firstName" value={formData.firstName} onChange={onChange} className={inputClass(errors.firstName)} placeholder="First name" />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input type="text" name="lastName" value={formData.lastName} onChange={onChange} className={inputClass(errors.lastName)} placeholder="Last name" />
        </Field>
      </div>

      <Field label="Institute Name">
        <input type="text" name="instituteName" value={formData.instituteName} onChange={onChange} className={inputClass(false)} placeholder="Name of your college / institute" />
      </Field>

      <Field label="Email" required error={errors.email}>
        <input type="email" name="email" value={formData.email} onChange={onChange} className={inputClass(errors.email)} placeholder="name@institute.com" />
      </Field>

      <Field label="Phone Number" required error={errors.phone}>
        <input type="tel" name="phone" value={formData.phone} onChange={onChange} className={inputClass(errors.phone)} placeholder="+91 98765 43210" />
      </Field>

      <Field label="Current Residential Location" required error={errors.location}>
        <input type="text" name="location" value={formData.location} onChange={onChange} className={inputClass(errors.location)} placeholder="City, State" />
      </Field>

      <Field label="Application Period" required error={errors.periodFrom}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-semibold text-surface-400 uppercase tracking-widest">From</span>
            <input type="date" name="periodFrom" value={formData.periodFrom} onChange={onChange} className={inputClass(errors.periodFrom)} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-semibold text-surface-400 uppercase tracking-widest">To</span>
            <input type="date" name="periodTo" value={formData.periodTo} onChange={onChange} className={inputClass(false)} />
          </div>
        </div>
      </Field>

      <Field label="Number of Persons Applied">
        <input type="number" name="personsApplied" value={formData.personsApplied} onChange={onChange} min="1" className={inputClass(false)} placeholder="e.g. 2" />
      </Field>

      <Field label="Upload Bonafide (If Available)" error={errors.resume}>
        <UploadZone file={formData.resume} onFileChange={onChange} error={errors.resume} />
      </Field>
    </>
  );
}

function FeedbackForm({ formData, errors, onChange }) {
  return (
    <>
      <SectionLabel>Basic Information</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First Name" required error={errors.firstName}>
          <input type="text" name="firstName" value={formData.firstName} onChange={onChange} className={inputClass(errors.firstName)} placeholder="First name" />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input type="text" name="lastName" value={formData.lastName} onChange={onChange} className={inputClass(errors.lastName)} placeholder="Last name" />
        </Field>
      </div>

      <Field label="Email" required error={errors.email}>
        <input type="email" name="email" value={formData.email} onChange={onChange} className={inputClass(errors.email)} placeholder="name@company.com" />
      </Field>

      <Field label="Phone Number" required error={errors.phone}>
        <input type="tel" name="phone" value={formData.phone} onChange={onChange} className={inputClass(errors.phone)} placeholder="+91 98765 43210" />
      </Field>

      <SectionLabel>Feedback Details</SectionLabel>

      <Field label="Product Name / Category">
        <select name="product" value={formData.product} onChange={onChange} className={selectClass}>
          <option value="">— Select a category —</option>
          <option value="Egg Powders">Egg Powders</option>
          <option value="Egg Liquids">Egg Liquids</option>
          <option value="Frozen Egg Liquids">Frozen Egg Liquids</option>
          <option value="Speciality Products">Speciality Products</option>
          <option value="Customized Mixes">Customized Mixes</option>
          <option value="Others">Others if any</option>
        </select>
      </Field>

      <Field label="Batch Number">
        <input type="text" name="batchNumber" value={formData.batchNumber} onChange={onChange} className={inputClass(false)} placeholder="e.g. BN-2024-001" />
      </Field>

      <Field label="Description of the Feedback" required error={errors.message}>
        <textarea name="message" rows="5" value={formData.message} onChange={onChange} className={`${inputClass(errors.message)} resize-none`} placeholder="Describe your feedback or complaint in detail..." />
      </Field>
    </>
  );
}

function VendorForm({ formData, errors, onChange }) {
  return (
    <>
      <SectionLabel>Basic Information</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First Name" required error={errors.firstName}>
          <input type="text" name="firstName" value={formData.firstName} onChange={onChange} className={inputClass(errors.firstName)} placeholder="First name" />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input type="text" name="lastName" value={formData.lastName} onChange={onChange} className={inputClass(errors.lastName)} placeholder="Last name" />
        </Field>
      </div>

      <Field label="Company / Institute Name">
        <input type="text" name="company" value={formData.company} onChange={onChange} className={inputClass(false)} placeholder="Company or institute name" />
      </Field>

      <Field label="Email" required error={errors.email}>
        <input type="email" name="email" value={formData.email} onChange={onChange} className={inputClass(errors.email)} placeholder="name@company.com" />
      </Field>

      <Field label="Phone Number" required error={errors.phone}>
        <input type="tel" name="phone" value={formData.phone} onChange={onChange} className={inputClass(errors.phone)} placeholder="+91 98765 43210" />
      </Field>

      <Field label="Manufacturing Location">
        <input type="text" name="manufacturingLocation" value={formData.manufacturingLocation} onChange={onChange} className={inputClass(false)} placeholder="City, State / Country" />
      </Field>

      <Field label="Website Details">
        <input type="url" name="website" value={formData.website} onChange={onChange} className={inputClass(false)} placeholder="https://www.example.com" />
      </Field>

      <SectionLabel>Product Details</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Products Manufactured">
          <input type="text" name="productsManufactured" value={formData.productsManufactured} onChange={onChange} className={inputClass(false)} placeholder="e.g. Packaging, Feed ingredients" />
        </Field>
        <Field label="Year of Experience">
          <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={onChange} min="0" className={inputClass(false)} placeholder="e.g. 10" />
        </Field>
      </div>

      <Field label="Description of the Product" required error={errors.message}>
        <textarea name="message" rows="5" value={formData.message} onChange={onChange} className={`${inputClass(errors.message)} resize-none`} placeholder="Describe the products you manufacture or supply..." />
      </Field>

      <Field label="Upload Brochure / Catalogue (.pdf, .doc)" error={errors.resume}>
        <UploadZone file={formData.resume} onFileChange={onChange} error={errors.resume} />
      </Field>
    </>
  );
}

function ServiceForm({ formData, errors, onChange }) {
  return (
    <>
      <SectionLabel>Basic Information</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First Name" required error={errors.firstName}>
          <input type="text" name="firstName" value={formData.firstName} onChange={onChange} className={inputClass(errors.firstName)} placeholder="First name" />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input type="text" name="lastName" value={formData.lastName} onChange={onChange} className={inputClass(errors.lastName)} placeholder="Last name" />
        </Field>
      </div>

      <Field label="Company / Institute Name">
        <input type="text" name="company" value={formData.company} onChange={onChange} className={inputClass(false)} placeholder="Company or institute name" />
      </Field>

      <Field label="Email" required error={errors.email}>
        <input type="email" name="email" value={formData.email} onChange={onChange} className={inputClass(errors.email)} placeholder="name@company.com" />
      </Field>

      <Field label="Phone Number" required error={errors.phone}>
        <input type="tel" name="phone" value={formData.phone} onChange={onChange} className={inputClass(errors.phone)} placeholder="+91 98765 43210" />
      </Field>

      <Field label="Location">
        <input type="text" name="location" value={formData.location} onChange={onChange} className={inputClass(false)} placeholder="City, State" />
      </Field>

      <Field label="Website">
        <input type="url" name="website" value={formData.website} onChange={onChange} className={inputClass(false)} placeholder="https://www.example.com" />
      </Field>

      <SectionLabel>Service Details</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nature of Service">
          <input type="text" name="natureOfService" value={formData.natureOfService} onChange={onChange} className={inputClass(false)} placeholder="e.g. Logistics, IT, Engineering" />
        </Field>
        <Field label="Year of Experience">
          <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={onChange} min="0" className={inputClass(false)} placeholder="e.g. 5" />
        </Field>
      </div>

      <Field label="Description of the Service" required error={errors.message}>
        <textarea name="message" rows="5" value={formData.message} onChange={onChange} className={`${inputClass(errors.message)} resize-none`} placeholder="Describe the services you offer..." />
      </Field>

      <Field label="Upload Brochure / Catalogue (.pdf, .doc)" error={errors.resume}>
        <UploadZone file={formData.resume} onFileChange={onChange} error={errors.resume} />
      </Field>
    </>
  );
}

function GenericForm({ formData, errors, onChange, enquiryType }) {
  const showCompany = ['vendor', 'service'].includes(enquiryType);
  const showDept = ['job', 'internship'].includes(enquiryType);
  const showFeedbackType = enquiryType === 'feedback';
  const showPartnerCategory = ['vendor', 'service'].includes(enquiryType);

  return (
    <>
      <SectionLabel>Basic Information</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="First Name" required error={errors.firstName}>
          <input type="text" name="firstName" value={formData.firstName} onChange={onChange} className={inputClass(errors.firstName)} placeholder="First name" />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input type="text" name="lastName" value={formData.lastName} onChange={onChange} className={inputClass(errors.lastName)} placeholder="Last name" />
        </Field>
      </div>

      {showCompany && (
        <Field label="Company Name">
          <input type="text" name="company" value={formData.company} onChange={onChange} className={inputClass(false)} placeholder="Enter company / business name" />
        </Field>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Email" required error={errors.email}>
          <input type="email" name="email" value={formData.email} onChange={onChange} className={inputClass(errors.email)} placeholder="name@company.com" />
        </Field>
        <Field label="Phone Number" required error={errors.phone}>
          <input type="tel" name="phone" value={formData.phone} onChange={onChange} className={inputClass(errors.phone)} placeholder="+91 98765 43210" />
        </Field>
      </div>

      {showDept && (
        <>
          <SectionLabel>Preferences</SectionLabel>
          <Field label="Preferred Department">
            <select name="interest" value={formData.interest} onChange={onChange} className={selectClass}>
              <option value="Production & Operations">Production & Operations</option>
              <option value="Quality Assurance & QA">Quality Assurance & QA</option>
              <option value="Research & Development">Research & Development</option>
              <option value="Sales & Marketing">Sales & Marketing</option>
              <option value="Supply Chain & Logistics">Supply Chain & Logistics</option>
              <option value="Administration & HR">Administration & HR</option>
            </select>
          </Field>
        </>
      )}

      {showFeedbackType && (
        <>
          <SectionLabel>Enquiry Type</SectionLabel>
          <Field label="Category">
            <select name="feedbackType" value={formData.feedbackType} onChange={onChange} className={selectClass}>
              <option value="Feedback">Feedback / Review</option>
              <option value="Complaint">Complaint / Concern</option>
              <option value="Suggestion">General Suggestion</option>
              <option value="Other">Other</option>
            </select>
          </Field>
        </>
      )}

      {showPartnerCategory && (
        <>
          <SectionLabel>Partnership Details</SectionLabel>
          <Field label="Partnership Category">
            <select name="partnerCategory" value={formData.partnerCategory} onChange={onChange} className={selectClass}>
              <option value="Packaging Materials">Packaging Materials</option>
              <option value="Poultry / Feed Raw Materials">Poultry / Feed Raw Materials</option>
              <option value="Logistics & Freight Services">Logistics & Freight Services</option>
              <option value="Plant Spares & Engineering">Plant Spares & Engineering</option>
              <option value="IT Services & Digital Support">IT Services & Digital Support</option>
              <option value="Other Services">Other Services</option>
            </select>
          </Field>
        </>
      )}

      <SectionLabel>Message</SectionLabel>
      <Field label="Enquiry Details / Message" required error={errors.message}>
        <textarea name="message" rows="4" value={formData.message} onChange={onChange} className={`${inputClass(errors.message)} resize-none`} placeholder="Provide details of your request..." />
      </Field>

      {(enquiryType === 'job' || enquiryType === 'internship') && (
        <Field label="Upload Resume / CV (.pdf, .doc)" error={errors.resume}>
          <UploadZone file={formData.resume} onFileChange={onChange} error={errors.resume} />
        </Field>
      )}
    </>
  );
}

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ACCEPTED_UPLOAD_EXTENSIONS = ['.pdf', '.doc', '.docx'];

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadZone({ file, onFileChange, error }) {
  const inputRef = React.useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const applyFile = (selected) => {
    if (!selected) return;
    const extension = `.${selected.name.split('.').pop().toLowerCase()}`;
    if (!ACCEPTED_UPLOAD_EXTENSIONS.includes(extension)) {
      onFileChange({ target: { name: 'resume', value: null, type: 'file-error', fileError: 'Only PDF or DOC/DOCX files are accepted.' } });
      return;
    }
    if (selected.size > MAX_UPLOAD_BYTES) {
      onFileChange({ target: { name: 'resume', value: null, type: 'file-error', fileError: 'File is larger than 5MB.' } });
      return;
    }
    onFileChange({ target: { name: 'resume', value: selected, type: 'file' } });
  };

  const handleInputChange = (e) => applyFile(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    applyFile(e.dataTransfer.files?.[0]);
  };

  const clearFile = (e) => {
    e.stopPropagation();
    if (inputRef.current) inputRef.current.value = '';
    onFileChange({ target: { name: 'resume', value: null, type: 'file' } });
  };

  if (file) {
    return (
      <div className="mt-1 w-full border border-surface-300 dark:border-surface-700 rounded-lg p-4 bg-surface-50/50 dark:bg-surface-900/20 flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-body text-xs font-semibold text-surface-700 dark:text-surface-300 truncate">{file.name}</span>
          <span className="font-body text-[11px] text-surface-400 dark:text-surface-600">{formatFileSize(file.size)}</span>
        </div>
        <button
          type="button"
          onClick={clearFile}
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-surface-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
          aria-label="Remove file"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={`mt-1 w-full border border-dashed rounded-lg p-4 flex items-center gap-3 cursor-pointer transition-all select-none group ${
        isDragOver
          ? 'border-brand-500 bg-brand-50/30 dark:bg-brand-950/20'
          : error
          ? 'border-red-400 bg-red-50/30 dark:bg-red-950/10'
          : 'border-surface-300 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-900/20 hover:border-brand-500 hover:bg-brand-50/30 dark:hover:bg-brand-950/20'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_UPLOAD_EXTENSIONS.join(',')}
        onChange={handleInputChange}
        className="hidden"
      />
      <div className="w-8 h-8 rounded-md bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-surface-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex-shrink-0">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-body text-xs font-semibold text-surface-600 dark:text-surface-400 group-hover:text-brand-650 dark:group-hover:text-brand-400 transition-colors">Click to browse or drag & drop</span>
        <span className="font-body text-[11px] text-surface-400 dark:text-surface-600">PDF, DOC up to 5MB</span>
      </div>
    </div>
  );
}

// ── Modal config ─────────────────────────────────────────────────────────────

const defaultFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  state: '',
  product: '',
  location: '',
  qualification: '',
  position: '',
  jobDescription: '',
  instituteName: '',
  periodFrom: '',
  periodTo: '',
  personsApplied: '',
  batchNumber: '',
  website: '',
  natureOfService: '',
  yearsOfExperience: '',
  manufacturingLocation: '',
  productsManufactured: '',
  interest: 'Production & Operations',
  feedbackType: 'Feedback',
  partnerCategory: 'Packaging Materials',
  message: '',
  resume: null,
};

const modalConfig = {
  job:           { title: 'Job Application',         badge: 'Human Resources — Careers',   icon: '✦' },
  internship:    { title: 'Internship Request',      badge: 'Human Resources — Training',  icon: '✦' },
  feedback:      { title: 'Feedback & Complaints',   badge: 'Customer Relations',           icon: '✦' },
  vendor:        { title: 'Vendor Partner',          badge: 'Procurement Department',       icon: '✦' },
  service:       { title: 'Service Provider',        badge: 'Operations / Logistics',       icon: '✦' },
  quality:       { title: 'Contact Quality Team',    badge: 'Quality Assurance',            icon: '✦' },
  general:       { title: 'General Enquiry',         badge: 'Corporate Desk',               icon: '✦' },
};

const API_URL = import.meta.env.VITE_API_URL;

export default function EnquiryModal({ isOpen, onClose, enquiryType }) {
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFormData(defaultFormData);
      setErrors({});
      setIsSubmitting(false);
      setIsSuccess(false);
      setSubmitError('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, enquiryType]);

  if (!isOpen) return null;

  const config = modalConfig[enquiryType] ?? modalConfig.general;

  const handleChange = (e) => {
    const { name, value, type, fileError } = e.target;
    if (type === 'file-error') {
      setErrors(prev => ({ ...prev, resume: fileError }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = 'First name is required.';
    if (!formData.lastName.trim())  e.lastName  = 'Last name is required.';
    if (!formData.email.trim()) {
      e.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      e.email = 'Enter a valid email address.';
    }
    if (!formData.phone.trim()) e.phone = 'Phone number is required.';
    if (enquiryType === 'job' && !formData.location.trim()) e.location = 'Location is required.';
    if (enquiryType === 'internship' && !formData.location.trim()) e.location = 'Location is required.';
    if (enquiryType === 'internship' && !formData.periodFrom.trim()) e.periodFrom = 'Start date is required.';
    if (enquiryType === 'feedback' && !formData.message.trim()) e.message = 'Please describe your feedback.';
    if (enquiryType === 'service' && !formData.message.trim()) e.message = 'Please describe your service.';
    if (enquiryType === 'vendor' && !formData.message.trim()) e.message = 'Please describe your product.';
    if (!['job', 'internship', 'feedback', 'service', 'vendor'].includes(enquiryType) && !formData.message.trim()) {
      e.message = 'Message is required.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const payload = {
      enquiry_type:            enquiryType,
      first_name:              formData.firstName,
      last_name:               formData.lastName,
      email:                   formData.email,
      phone:                   formData.phone,
      company:                 formData.company                || null,
      location:                formData.location               || null,
      product:                 formData.product                || null,
      position:                formData.position               || null,
      qualification:           formData.qualification          || null,
      job_description:         formData.jobDescription         || null,
      institute_name:          formData.instituteName          || null,
      period_from:             formData.periodFrom             || null,
      period_to:               formData.periodTo               || null,
      persons_applied:         formData.personsApplied         || null,
      batch_number:            formData.batchNumber            || null,
      website:                 formData.website                || null,
      nature_of_service:       formData.natureOfService        || null,
      years_of_experience:     formData.yearsOfExperience      || null,
      manufacturing_location:  formData.manufacturingLocation  || null,
      products_manufactured:   formData.productsManufactured   || null,
      interest:                formData.interest               || null,
      feedback_type:           formData.feedbackType           || null,
      partner_category:        formData.partnerCategory        || null,
      message:                 formData.message                || null,
    };

    try {
      let body;
      let headers;
      if (formData.resume) {
        const form = new FormData();
        Object.entries(payload).forEach(([key, val]) => {
          if (val !== null) form.append(key, val);
        });
        form.append('resume', formData.resume);
        body = form;
        headers = { Accept: 'application/json' };
      } else {
        body = JSON.stringify(payload);
        headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
      }

      const res = await fetch(`${API_URL}/api/v1/contact/submit`, {
        method:  'POST',
        headers,
        body,
      });
      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setSubmitError('Failed to send your enquiry. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    if (enquiryType === 'job')           return <JobForm           formData={formData} errors={errors} onChange={handleChange} />;
    if (enquiryType === 'internship')   return <InternshipForm    formData={formData} errors={errors} onChange={handleChange} />;
    if (enquiryType === 'feedback')     return <FeedbackForm      formData={formData} errors={errors} onChange={handleChange} />;
    if (enquiryType === 'service')      return <ServiceForm       formData={formData} errors={errors} onChange={handleChange} />;
    if (enquiryType === 'vendor')       return <VendorForm        formData={formData} errors={errors} onChange={handleChange} />;
    return <GenericForm formData={formData} errors={errors} onChange={handleChange} enquiryType={enquiryType} />;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="absolute inset-0 bg-surface-950/70 backdrop-blur-[3px] cursor-pointer"
        />

        {/* Paper modal */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          className="relative max-w-lg w-full z-10 max-h-[92vh] flex flex-col"
          style={{
            filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.22)) drop-shadow(0 8px 16px rgba(0,0,0,0.14))',
          }}
        >
          {/* Red letterhead strip */}
          <div className="h-1.5 w-full bg-brand-600 rounded-t-2xl flex-shrink-0" />

          {/* Paper body */}
          <div className="bg-[#FDFAF5] dark:bg-[#1C1812] rounded-b-2xl overflow-hidden flex flex-col max-h-[calc(92vh-6px)]">

            {/* Letterhead header */}
            <div className="flex-shrink-0 px-6 sm:px-8 pt-6 pb-5 border-b border-[#E8E2D8] dark:border-surface-700/60 bg-[#FAF7F0] dark:bg-[#201D14] relative select-none">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-7 h-7 rounded-full bg-surface-200/70 hover:bg-surface-300/80 dark:bg-surface-700/60 dark:hover:bg-surface-600/80 flex items-center justify-center text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-white transition-all duration-150 cursor-pointer active:scale-90"
                aria-label="Close modal"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header content */}
              <div className="flex items-start justify-between gap-4 pr-8">
                <div className="flex flex-col gap-2">
                  {/* Department badge */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-600 flex-shrink-0" />
                    <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-650 dark:text-brand-400">
                      {config.badge}
                    </span>
                  </div>
                  {/* Form title */}
                  <h3 className="font-heading text-[22px] sm:text-[26px] font-bold text-heading dark:text-white m-0 leading-tight tracking-tight">
                    {config.title}
                  </h3>
                  <p className="font-body text-[12px] text-surface-400 dark:text-surface-500 m-0 font-medium">
                    SKM Egg Products — Enquiry Form
                  </p>
                </div>

                {/* Decorative document icon */}
                <div className="flex-shrink-0 mt-0.5 w-10 h-12 rounded border border-[#E0D9CF] dark:border-surface-700/70 bg-white dark:bg-surface-800/40 flex flex-col items-center justify-center gap-1 opacity-60">
                  <div className="w-5 h-0.5 bg-surface-300 dark:bg-surface-600 rounded-full" />
                  <div className="w-5 h-0.5 bg-surface-300 dark:bg-surface-600 rounded-full" />
                  <div className="w-3 h-0.5 bg-surface-300 dark:bg-surface-600 rounded-full" />
                </div>
              </div>
            </div>

            {/* Scrollable form area */}
            <div className="overflow-y-auto flex-1 px-6 sm:px-8 py-6 custom-scrollbar">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left font-body">
                  {renderForm()}

                  {submitError && (
                    <div className="flex items-start gap-2.5 font-body text-xs text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-lg px-4 py-3">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {submitError}
                    </div>
                  )}

                  {/* Submit row */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-heading font-bold uppercase tracking-wider text-[11px] sm:text-xs transition-all duration-150 cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed select-none rounded-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                          <span className="font-heading">Submitting…</span>
                        </>
                      ) : (
                        <>
                          <span className="font-heading">Send Enquiry</span>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="font-body text-[11px] text-surface-400 dark:text-surface-600 text-center m-0 leading-relaxed select-none">
                    By submitting, you agree that your information will be used to respond to your enquiry.
                  </p>
                </form>
              ) : (
                /* Success — stamped letter feel */
                <div className="flex flex-col items-center justify-center text-center py-10 gap-6 select-none font-sans">
                  {/* Stamp circle */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-[3px] border-dashed border-emerald-400 dark:border-emerald-600 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 max-w-[260px]">
                    <h3 className="font-heading text-xl font-bold text-surface-850 dark:text-white m-0 tracking-tight">Enquiry Received</h3>
                    <p className="font-body text-sm text-surface-500 dark:text-surface-400 leading-relaxed m-0 font-medium">
                      Thank you for reaching out. A representative will get back to you shortly.
                    </p>
                  </div>

                  {/* Decorative ruled lines */}
                  <div className="w-full max-w-[200px] flex flex-col gap-2 opacity-25">
                    <div className="h-px bg-surface-400 dark:bg-surface-600" />
                    <div className="h-px bg-surface-400 dark:bg-surface-600" />
                    <div className="h-px bg-surface-400 dark:bg-surface-600 w-3/4 mx-auto" />
                  </div>

                  <button
                    onClick={onClose}
                    className="px-7 py-2.5 rounded-xl bg-surface-900 hover:bg-surface-800 dark:bg-white dark:hover:bg-surface-100 text-white dark:text-surface-950 font-heading font-bold uppercase tracking-wider text-[11px] transition-all duration-150 cursor-pointer active:scale-95 select-none"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
