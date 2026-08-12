import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import SmoothScrollProvider from './components/common/SmoothScrollProvider.jsx'

// index.html carries a static baseline title/description/canonical/OG/
// Twitter/JSON-LD as a fallback for the sliver of clients that never run
// JavaScript at all. Every page in this app renders its own <SEO> (see
// src/components/SEO/SEO.jsx) via react-helmet-async, which only manages
// tags it renders itself — it has no way to know the static baseline tags
// already in the document should be removed, so every route (including the
// homepage) would otherwise end up with two conflicting <title>/
// <link rel="canonical"> tags once React mounts. Google's own guidance is
// that multiple canonical tags on one page can make it ignore all of them —
// silently recreating the "every page looks like the homepage" problem.
// Removing the static baseline once, synchronously, before the first render
// means every page always ends up with exactly one correct set of tags.
function removeStaticSeoBaseline() {
  const selectors = [
    'title',
    'meta[name="description"]',
    'meta[name="keywords"]',
    'meta[name="robots"]',
    'link[rel="canonical"]',
    'meta[property^="og:"]',
    'meta[name^="twitter:"]',
    'script[type="application/ld+json"]',
  ];
  selectors.forEach((selector) => {
    document.head.querySelectorAll(selector).forEach((el) => el.remove());
  });
}
removeStaticSeoBaseline();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <SmoothScrollProvider>
        <App />
      </SmoothScrollProvider>
    </HelmetProvider>
  </StrictMode>,
)
