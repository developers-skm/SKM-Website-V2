import InternalLink from '../common/InternalLink';

// Desktop horizontal nav — Products, Applications, Quality & Traceability,
// Manufacturing and Supply, About SKM, and Resources (single links to
// their own hub pages). No dropdown groups remain: Resources was the last
// one (Resources / Brochures & Downloads / Certifications) — removed
// because the real /resources page now contains everything it pointed to
// (Brochures & Downloads and Certifications are merged into it as real
// sections). Visible at NAV_BP (xl) and up, in lockstep with UtilityBar/
// CTA/mobile menu trigger.
export default function PrimaryNav({ activePage, onPageChange }) {
  return (
    <nav aria-label="Main" className="hidden xl:flex items-center gap-7">
      <InternalLink
        route="products"
        onPageChange={onPageChange}
        className={`font-body text-[15px] font-semibold px-1 py-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm ${
          activePage === 'products' ? 'text-brand-600' : 'text-surface-800 hover:text-brand-600'
        }`}
      >
        Products
      </InternalLink>
      <InternalLink
        route="applications"
        onPageChange={onPageChange}
        className={`font-body text-[15px] font-semibold px-1 py-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm ${
          activePage === 'applications' ? 'text-brand-600' : 'text-surface-800 hover:text-brand-600'
        }`}
      >
        Applications
      </InternalLink>
      <InternalLink
        route="quality_food_safety_traceability"
        onPageChange={onPageChange}
        className={`font-body text-[15px] font-semibold px-1 py-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm ${
          activePage === 'quality_food_safety_traceability' ? 'text-brand-600' : 'text-surface-800 hover:text-brand-600'
        }`}
      >
        Quality &amp; Traceability
      </InternalLink>
      <InternalLink
        route="manufacturing_and_supply"
        onPageChange={onPageChange}
        className={`font-body text-[15px] font-semibold px-1 py-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm ${
          activePage === 'manufacturing_and_supply' ? 'text-brand-600' : 'text-surface-800 hover:text-brand-600'
        }`}
      >
        Manufacturing &amp; Supply
      </InternalLink>
      <InternalLink
        route="about_skm"
        onPageChange={onPageChange}
        className={`font-body text-[15px] font-semibold px-1 py-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm ${
          activePage === 'about_skm' ? 'text-brand-600' : 'text-surface-800 hover:text-brand-600'
        }`}
      >
        About SKM
      </InternalLink>
      <InternalLink
        route="resources"
        onPageChange={onPageChange}
        className={`font-body text-[15px] font-semibold px-1 py-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm ${
          activePage === 'resources' ? 'text-brand-600' : 'text-surface-800 hover:text-brand-600'
        }`}
      >
        Resources
      </InternalLink>
    </nav>
  );
}
