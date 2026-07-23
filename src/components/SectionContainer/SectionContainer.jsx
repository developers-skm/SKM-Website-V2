import React from 'react';

export default function SectionContainer({ children, className = '' }) {
  return (
    <div className={`w-full py-[60px] lg:py-[80px] bg-page dark:bg-surface-950 border-b border-[#eee] dark:border-surface-900/60 ${className}`}>
      {children}
    </div>
  );
}
