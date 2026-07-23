import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.skmegg.com';
const SITE_NAME = 'SKM Egg Products';
const DEFAULT_OG_IMAGE = `${SITE_URL}/android-chrome-512x512.png`;
const DEFAULT_DESCRIPTION = "Asia's largest integrated egg processing facility since 1996. Manufacturer & exporter of premium egg powder, liquid eggs, egg albumen, egg yolk. BRCGS, Halal & Kosher certified.";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SKM Egg Products",
  "alternateName": "SKM Egg Products Export India",
  "url": SITE_URL,
  "logo": `${SITE_URL}/android-chrome-512x512.png`,
  "description": "Asia's largest integrated egg processing facility, processing 2 million eggs daily since 1996.",
  "foundingDate": "1996",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressLocality": "Erode",
    "addressRegion": "Tamil Nadu"
  },
  "contactPoint": [
    { "@type": "ContactPoint", "contactType": "sales", "email": "exportsales@skmegg.com" }
  ]
};

export default function SEO({ title, description, keywords, canonical, image, jsonLd }) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Egg Powder & Liquid Egg Manufacturer`;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : SITE_URL);
  const ogImage = image || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Organization schema on every page */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Page-specific schema */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
