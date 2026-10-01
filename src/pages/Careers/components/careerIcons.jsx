// Simple line icons (24px grid, 1.75 stroke) shared across the Careers pages.
const paths = {
  growth: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  innovation: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  teamwork: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-2.13a4 4 0 100-8 4 4 0 000 8zm6 0a3 3 0 100-6M3 11a3 3 0 106 0',
  impact: 'M12 3l2.6 5.3 5.9.9-4.25 4.1 1 5.8L12 16.3 6.75 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z',
  graduate: 'M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6-8.5V16c0 1.1 2.7 2 6 2s6-.9 6-2v-4.5',
  internship: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  training: 'M19 21V8a1 1 0 00-1-1h-5V3H6a1 1 0 00-1 1v17m14 0H5m4-14h2m-2 4h2m-2 4h2',
  arrow: 'M5 12h14m-7-7l7 7-7 7',
  search: 'M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z',
  pin: 'M12 21s7-5.686 7-11a7 7 0 10-14 0c0 5.314 7 11 7 11zm0-8a3 3 0 100-6 3 3 0 000 6z',
  briefcase: 'M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2',
  check: 'M5 13l4 4L19 7',
  upload: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
  file: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  close: 'M6 18L18 6M6 6l12 12',
  chevron: 'M19 9l-7 7-7-7',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  department: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6',
};

export default function CareerIcon({ name, className = 'w-5 h-5' }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
