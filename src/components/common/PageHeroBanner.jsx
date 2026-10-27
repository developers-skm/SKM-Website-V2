import React from 'react';

// Full-bleed page hero: photo behind, light gradient scrim on the text side so
// the dark heading/body copy stays legible (no dark sections outside the footer).
// `align="center"` centres the copy; default is left-aligned.
export default function PageHeroBanner({ image, alt = '', label, title, description, align = 'left', children }) {
  const centered = align === 'center';

  return (
    <div className="relative w-full overflow-hidden bg-page min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center">
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-center select-none"
        loading="eager"
        decoding="async"
      />
      <div
        className={`absolute inset-0 pointer-events-none ${
          centered
            ? 'bg-[radial-gradient(ellipse_at_center,rgba(253,251,247,0.92)_0%,rgba(253,251,247,0.78)_55%,rgba(253,251,247,0.45)_100%)]'
            : 'bg-gradient-to-r from-[#fdfbf7]/95 via-[#fdfbf7]/80 to-[#fdfbf7]/10'
        }`}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-page to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full pt-[130px] pb-[90px] sm:pt-[150px] lg:pt-[140px]">
        <div
          className={`mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col gap-6 ${
            centered ? 'items-center text-center' : 'items-start'
          }`}
        >
          <span className={`section-label ${centered ? 'justify-center' : ''}`}>{label}</span>
          <h1 className="font-heading font-bold text-[42px] sm:text-[52px] lg:text-[60px] text-heading leading-[1.1] tracking-tight m-0">
            {title}
          </h1>
          <p className={`font-body text-[16px] leading-[30px] text-surface-600 m-0 ${centered ? 'max-w-2xl' : 'max-w-2xl'}`}>
            {description}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
