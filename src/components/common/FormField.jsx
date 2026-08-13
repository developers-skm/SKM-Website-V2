import React from 'react';

// Shared underline-input field styling — used by the Get Quote wizard and
// the Contact Us enquiry modal, previously duplicated verbatim between them.
export function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-body text-[11px] font-semibold uppercase tracking-wider text-surface-500">
        {label}{required && <span className="text-brand-600 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <span className="font-body text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-0.5">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}

export const inputClass = (hasError) =>
  `w-full px-0 py-2 bg-transparent border-0 border-b font-body text-surface-850 text-sm font-medium transition-all focus:outline-none focus:ring-0 ${
    hasError
      ? 'border-red-400 placeholder:text-red-300'
      : 'border-surface-250 focus:border-brand-600 placeholder:text-surface-350'
  }`;

export const selectClass =
  'w-full px-0 py-2 bg-transparent border-0 border-b border-surface-250 font-body text-surface-850 text-sm font-medium focus:outline-none focus:border-brand-600 transition-all cursor-pointer';
