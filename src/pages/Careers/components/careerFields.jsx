import { inputClass, selectClass } from '../../../components/common/FormField';

// Accessible form controls for the Careers forms. The shared Field in
// components/common/FormField.jsx has no htmlFor/aria wiring, so these wrap the
// same input styling with a real <label for>, aria-invalid and
// aria-describedby pointing at the error message.

export function FieldShell({ id, label, required, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-body text-[12px] font-semibold uppercase tracking-wider text-surface-600">
        {label}
        {required && (
          <>
            <span className="text-brand-650 ml-0.5" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {children}
      {hint && !error && <span id={`${id}-hint`} className="font-body text-[12px] text-surface-500">{hint}</span>}
      {error && (
        <span id={`${id}-error`} role="alert" className="font-body text-[12px] text-red-600 font-semibold">
          {error}
        </span>
      )}
    </div>
  );
}

const describedBy = (id, error, hint) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function TextField({ id, label, required, error, hint, className = '', ...inputProps }) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint}>
      <input
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${inputClass(Boolean(error))} ${className}`}
        {...inputProps}
      />
    </FieldShell>
  );
}

export function SelectField({ id, label, required, error, hint, options, placeholder = 'Select', ...selectProps }) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint}>
      <select
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={selectClass}
        {...selectProps}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </FieldShell>
  );
}

export function FormSection({ title, children }) {
  return (
    <fieldset className="m-0 p-0 border-0 min-w-0">
      <legend className="w-full flex items-center gap-3 mb-5 p-0">
        <span className="font-heading text-[13px] font-bold uppercase tracking-widest text-brand-650 whitespace-nowrap">{title}</span>
        <span className="flex-1 h-px bg-surface-200" aria-hidden="true" />
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{children}</div>
    </fieldset>
  );
}
