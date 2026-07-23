import React from 'react';

export default function PageContent({ children, className = '' }) {
  return (
    <div className={`mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
