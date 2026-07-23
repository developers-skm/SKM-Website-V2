import { useCallback } from 'react';
import { PRODUCT_DISCOVERY_SECTION_ID } from './navigationData';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
}

function scrollToSectionId(id) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

function scrollToProductDiscovery() {
  scrollToSectionId(PRODUCT_DISCOVERY_SECTION_ID);
}

// "Find Your Product" / "Find Product" — the one real destination for
// product discovery: the Home page's "Our Product Offerings" section.
// If already on Home, scrolls directly. Otherwise navigates home and lets
// Home's own mount-aware effect (driven by prefill.scrollTarget) perform the
// scroll once its DOM has committed — no timeouts.
export default function useProductDiscoveryNavigation(onPageChange, activePage) {
  return useCallback(() => {
    if (activePage === 'home') {
      scrollToProductDiscovery();
    } else {
      onPageChange('home', { scrollTarget: PRODUCT_DISCOVERY_SECTION_ID });
    }
  }, [onPageChange, activePage]);
}

export { scrollToProductDiscovery, scrollToSectionId, prefersReducedMotion };
