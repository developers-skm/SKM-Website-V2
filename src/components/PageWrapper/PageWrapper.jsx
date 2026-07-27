import React from 'react';
import SEO from '../SEO/SEO';

export default function PageWrapper({ seo, children }) {
  return (
    <div className="w-full flex flex-col">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        jsonLd={seo.jsonLd}
      />
      {children}
    </div>
  );
}
