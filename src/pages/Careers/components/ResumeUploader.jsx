import { useRef, useState } from 'react';
import CareerIcon from './careerIcons';
import { FieldShell } from './careerFields';
import { ACCEPTED_EXTENSIONS, validateResumeFile } from './resumeRules';

const formatFileSize = (bytes) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export default function ResumeUploader({ id = 'resume', file, error, onChange, onError }) {
  const inputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const applyFile = (selected) => {
    if (!selected) return;
    const problem = validateResumeFile(selected);
    if (problem) {
      if (inputRef.current) inputRef.current.value = '';
      onError(problem);
      return;
    }
    onChange(selected);
  };

  const clearFile = () => {
    if (inputRef.current) inputRef.current.value = '';
    onChange(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    applyFile(event.dataTransfer.files?.[0]);
  };

  return (
    <FieldShell id={id} label="Resume" required error={error} hint="PDF, DOC or DOCX — up to 5MB">
      <input
        ref={inputRef}
        id={id}
        name={id}
        type="file"
        accept={ACCEPTED_EXTENSIONS.join(',')}
        onChange={(event) => applyFile(event.target.files?.[0])}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : `${id}-hint`}
        className="sr-only peer"
      />
      {file ? (
        <div className="w-full border border-surface-300 rounded-lg p-4 bg-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0">
            <CareerIcon name="file" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-body text-sm font-semibold text-surface-800 truncate">{file.name}</span>
            <span className="font-body text-xs text-surface-500">{formatFileSize(file.size)}</span>
          </div>
          <button
            type="button"
            onClick={clearFile}
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-surface-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            aria-label={`Remove ${file.name}`}
          >
            <CareerIcon name="close" className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          onDragOver={(event) => { event.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`w-full border border-dashed rounded-lg px-4 py-8 flex flex-col items-center gap-2 text-center cursor-pointer transition-colors select-none peer-focus-visible:ring-2 peer-focus-visible:ring-brand-600 ${
            isDragOver
              ? 'border-brand-600 bg-brand-50/50'
              : error
              ? 'border-red-400 bg-red-50/40'
              : 'border-surface-300 bg-white hover:border-brand-600 hover:bg-brand-50/30'
          }`}
        >
          <span className="w-11 h-11 rounded-full bg-surface-100 text-surface-500 flex items-center justify-center">
            <CareerIcon name="upload" className="w-5 h-5" />
          </span>
          <span className="font-body text-sm font-semibold text-surface-800">Drag &amp; drop your resume here</span>
          <span className="font-body text-xs text-surface-500">
            or <span className="text-brand-650 font-bold underline">Browse File</span>
          </span>
        </label>
      )}
    </FieldShell>
  );
}
