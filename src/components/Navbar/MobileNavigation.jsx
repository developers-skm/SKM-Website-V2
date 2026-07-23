import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InternalLink from '../common/InternalLink';
import { utilityLinks } from './navigationData';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// The one genuine modal in this system — full focus trap, body-scroll lock,
// Escape closes, focus restored to the toggle button, background content
// inert while open. Desktop dropdowns get none of this.
//
// No accordion groups remain — every former dropdown (Products,
// Applications, Quality & Traceability, Manufacturing & Supply, About SKM,
// Resources) is now a single top-level link to its own consolidated hub
// page, so this drawer is a flat list.
export default function MobileNavigation({ isOpen, onClose, activePage, onPageChange, triggerRef }) {
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);

  const handleNavigate = (route, data) => {
    onPageChange(route, data);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const triggerEl = triggerRef?.current;

    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.setAttribute('inert', '');
      mainEl.setAttribute('aria-hidden', 'true');
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !drawerRef.current) return;
      const focusable = Array.from(drawerRef.current.querySelectorAll(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKeyDown);
      if (mainEl) {
        mainEl.removeAttribute('inert');
        mainEl.removeAttribute('aria-hidden');
      }
      triggerEl?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-surface-900/30 backdrop-blur-sm xl:hidden"
            onClick={onClose}
          />

          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            id="mobile-navigation"
            initial={{ x: '100%', opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.85 }}
            className="fixed top-0 right-0 z-50 h-screen w-[85vw] max-w-sm bg-white border-l border-[#eee] flex flex-col p-6 pt-4 gap-3 shadow-[5px_3px_40px_rgba(0,72,88,0.15)] xl:hidden overflow-y-auto custom-scrollbar"
          >
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <span className="font-heading font-bold text-[15px] uppercase tracking-[0.4px] text-surface-800">
                Menu
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="group flex items-center justify-center w-9 h-9 rounded-full bg-surface-100 hover:bg-brand-600 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 transition-all duration-200"
                aria-label="Close navigation"
              >
                <svg className="w-[13px] h-[13px] text-surface-500 group-hover:text-white transition-colors duration-200" viewBox="0 0 13 13" fill="none">
                  <path d="M1.5 1.5L11.5 11.5M11.5 1.5L1.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <ul className="flex flex-col gap-0.5 list-none m-0 p-0">
              <li className="w-full flex flex-col">
                <InternalLink
                  route="products"
                  onPageChange={handleNavigate}
                  className={`w-full flex items-center font-heading font-bold text-[17px] px-4 py-3 min-h-[44px] rounded-xl transition-colors duration-300 ${
                    activePage === 'products' ? 'text-brand-600 bg-brand-600/6' : 'text-surface-800 hover:text-brand-600'
                  }`}
                >
                  Products
                </InternalLink>
              </li>
              <li className="w-full flex flex-col">
                <InternalLink
                  route="applications"
                  onPageChange={handleNavigate}
                  className={`w-full flex items-center font-heading font-bold text-[17px] px-4 py-3 min-h-[44px] rounded-xl transition-colors duration-300 ${
                    activePage === 'applications' ? 'text-brand-600 bg-brand-600/6' : 'text-surface-800 hover:text-brand-600'
                  }`}
                >
                  Applications
                </InternalLink>
              </li>
              <li className="w-full flex flex-col">
                <InternalLink
                  route="quality_food_safety_traceability"
                  onPageChange={handleNavigate}
                  className={`w-full flex items-center font-heading font-bold text-[17px] px-4 py-3 min-h-[44px] rounded-xl transition-colors duration-300 ${
                    activePage === 'quality_food_safety_traceability' ? 'text-brand-600 bg-brand-600/6' : 'text-surface-800 hover:text-brand-600'
                  }`}
                >
                  Quality &amp; Traceability
                </InternalLink>
              </li>
              <li className="w-full flex flex-col">
                <InternalLink
                  route="manufacturing_and_supply"
                  onPageChange={handleNavigate}
                  className={`w-full flex items-center font-heading font-bold text-[17px] px-4 py-3 min-h-[44px] rounded-xl transition-colors duration-300 ${
                    activePage === 'manufacturing_and_supply' ? 'text-brand-600 bg-brand-600/6' : 'text-surface-800 hover:text-brand-600'
                  }`}
                >
                  Manufacturing &amp; Supply
                </InternalLink>
              </li>
              <li className="w-full flex flex-col">
                <InternalLink
                  route="about_skm"
                  onPageChange={handleNavigate}
                  className={`w-full flex items-center font-heading font-bold text-[17px] px-4 py-3 min-h-[44px] rounded-xl transition-colors duration-300 ${
                    activePage === 'about_skm' ? 'text-brand-600 bg-brand-600/6' : 'text-surface-800 hover:text-brand-600'
                  }`}
                >
                  About SKM
                </InternalLink>
              </li>
              <li className="w-full flex flex-col">
                <InternalLink
                  route="resources"
                  onPageChange={handleNavigate}
                  className={`w-full flex items-center font-heading font-bold text-[17px] px-4 py-3 min-h-[44px] rounded-xl transition-colors duration-300 ${
                    activePage === 'resources' ? 'text-brand-600 bg-brand-600/6' : 'text-surface-800 hover:text-brand-600'
                  }`}
                >
                  Resources
                </InternalLink>
              </li>
            </ul>

            <div className="mt-2 pt-4 border-t border-[#eee] flex flex-col gap-0.5">
              {utilityLinks.map((link) => (
                <InternalLink
                  key={link.label}
                  route={link.route}
                  onPageChange={handleNavigate}
                  prefillData={link.careersIntent ? { enquiryType: 'job', intentId: crypto.randomUUID() } : undefined}
                  className="font-body text-[14px] font-medium text-surface-500 hover:text-brand-600 px-4 py-2.5 min-h-[44px] flex items-center transition-colors duration-200"
                >
                  {link.label}
                </InternalLink>
              ))}
              <span className="font-body text-[13px] font-medium text-surface-400 px-4 py-2 select-none">
                Language · EN
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-[#eee] flex-shrink-0">
              <InternalLink
                route="get-quote"
                onPageChange={handleNavigate}
                className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[14px] uppercase tracking-[0.03em] leading-none px-5 py-[14px] min-h-[44px] rounded-[200px] transition-all duration-300 cursor-pointer"
              >
                Request a Quote
              </InternalLink>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
