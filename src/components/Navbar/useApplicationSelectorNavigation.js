import { useCallback } from 'react';
import { APPLICATION_SELECTOR_SECTION_ID } from './navigationData';
import { scrollToSectionId } from './useProductDiscoveryNavigation';

// Hero's "Find the Right Egg Product" CTA — scrolls to the Home page's
// Application Selector section (Section 2, "Application Areas"). This hook
// is only ever used from within Home itself (the Hero), so it's always
// already on the 'home' page when called — a direct scroll, no navigation
// branch needed (unlike the header's cross-page useProductDiscoveryNavigation,
// which can be triggered from any page).
export default function useApplicationSelectorNavigation() {
  return useCallback(() => {
    scrollToSectionId(APPLICATION_SELECTOR_SECTION_ID);
  }, []);
}
