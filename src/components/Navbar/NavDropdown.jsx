import { motion, AnimatePresence } from 'framer-motion';
import InternalLink from '../common/InternalLink';
import useDisclosure from './useDisclosure';

// Generic single-column desktop nav disclosure — a navigation panel of
// ordinary links, not an ARIA menu. No focus trap: Tab flows naturally
// through the links and onward into the page. Escape closes and returns
// focus to the trigger; focus/mouse leaving the trigger+panel pair closes it.
export default function NavDropdown({ group, activePage, onPageChange }) {
  const { isOpen, toggle, closeAndReturnFocus, triggerRef, panelRef, handleFocusOut, handleMouseEnter, handleMouseLeave } = useDisclosure();
  const panelId = `nav-panel-${group.label.replace(/\s+/g, '-').toLowerCase()}`;
  const isGroupActive = group.links.some((l) => l.route === activePage);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
        onBlur={handleFocusOut}
        className={`flex items-center gap-1.5 font-body text-[15px] font-semibold px-1 py-2 transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm ${
          isGroupActive ? 'text-brand-600' : 'text-surface-800 hover:text-brand-600'
        }`}
      >
        {group.label}
        <svg
          className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            ref={panelRef}
            role="group"
            aria-label={group.label}
            onBlur={handleFocusOut}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 min-w-[240px] bg-white border border-[#eee] rounded-[10px] shadow-[0_12px_32px_rgba(36,30,24,0.1)] py-2 z-50"
          >
            <ul className="flex flex-col list-none m-0 p-0">
              {group.links.map((link) => (
                <li key={link.route}>
                  <InternalLink
                    route={link.route}
                    onPageChange={(route, data) => { onPageChange(route, data); closeAndReturnFocus(); }}
                    className={`block px-4 py-2.5 font-body text-[14px] transition-colors duration-150 ${
                      activePage === link.route ? 'text-brand-600 font-semibold' : 'text-surface-700 hover:text-brand-600 hover:bg-surface-50'
                    }`}
                  >
                    {link.label}
                  </InternalLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
