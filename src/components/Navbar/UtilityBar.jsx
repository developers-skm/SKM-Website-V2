import React from 'react';
import InternalLink from '../common/InternalLink';
import { utilityLinks } from './navigationData';

// Narrow, secondary top bar — normal document flow (not sticky), scrolls
// away with the page. Visually secondary to the main header: smaller type,
// warm-neutral surface, hairline border instead of a heavy rule.
//
// Breakpoint note: this hides below `xl` (NAV_BP, see Navbar.jsx) in lockstep
// with PrimaryNav/desktop CTA/mobile menu trigger/drawer — Tailwind needs a
// literal class per breakpoint (template-literal class names aren't picked up
// by its JIT scanner), so NAV_BP is hardcoded here rather than passed as a prop.
export default function UtilityBar({ onPageChange }) {
  return (
    <div className="hidden xl:block w-full bg-surface-50 border-b border-[#eee]">
      <div className="mx-auto max-w-[1680px] px-6 lg:px-8 xl:px-10 h-9 flex items-center justify-end gap-5">
        {utilityLinks.map((link, index) => (
          <React.Fragment key={link.label}>
            <InternalLink
              route={link.route}
              onPageChange={onPageChange}
              prefillData={link.careersIntent ? { enquiryType: 'job', intentId: crypto.randomUUID() } : undefined}
              className="font-body text-[13px] font-medium text-surface-600 hover:text-brand-600 transition-colors duration-150 whitespace-nowrap"
            >
              {link.label}
            </InternalLink>
            {index < utilityLinks.length - 1 && (
              <span className="w-px h-3 bg-surface-200" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
        <span className="w-px h-3 bg-surface-200" aria-hidden="true" />
        <span className="font-body text-[13px] font-medium text-surface-500 whitespace-nowrap select-none">
          Language · EN
        </span>
      </div>
    </div>
  );
}
