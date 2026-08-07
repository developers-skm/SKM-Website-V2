import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SKMLogo from '../../assets/LOGO/Skm-Logo-1536x332.png';
import MenuSection from './MenuSection';
import SearchPanel from './SearchPanel';
import { CloseIcon, SearchIcon } from './icons';
import { overlayColumns } from './navigationData';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

const panelVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)' },
  exit: { clipPath: 'inset(0 0 100% 0)' },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

// The full-screen navigation overlay: SKM logo, close button, search toggle,
// and four columns of grouped links (plain columns on desktop, accordion
// sections on mobile — see MenuSection). Owns its own focus trap, Escape
// handling, body-scroll lock, and focus restoration to the trigger button.
export default function NavOverlay({ isOpen, onClose, activePage, onPageChange, triggerElRef, initialSearchMode, openKey }) {
  const reduceMotion = useReducedMotion();
  const overlayRef = useRef(null);
  const closeButtonRef = useRef(null);
  const searchInputRef = useRef(null);
  const [openMobileSection, setOpenMobileSection] = useState(0);

  const handleNavigate = (route, prefillData) => {
    onPageChange(route, prefillData);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const triggerEl = triggerElRef?.current;

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
      if (event.key !== 'Tab' || !overlayRef.current) return;
      const focusable = Array.from(overlayRef.current.querySelectorAll(FOCUSABLE_SELECTOR));
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
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      if (mainEl) {
        mainEl.removeAttribute('inert');
        mainEl.removeAttribute('aria-hidden');
      }
      triggerEl?.focus();
    };
  }, [isOpen, onClose, triggerElRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          id="site-navigation-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={reduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } } : panelVariants}
          transition={{ duration: reduceMotion ? 0.15 : 0.55, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[60] bg-[#fbfaf8] dark:bg-surface-950 flex flex-col overflow-y-auto custom-scrollbar"
          style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <OverlayBody
            key={openKey}
            initialSearchMode={initialSearchMode}
            closeButtonRef={closeButtonRef}
            searchInputRef={searchInputRef}
            activePage={activePage}
            onNavigate={handleNavigate}
            onClose={onClose}
            openMobileSection={openMobileSection}
            setOpenMobileSection={setOpenMobileSection}
            reduceMotion={reduceMotion}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Keyed by openKey in the parent so each open of the overlay gets a fresh
// isSearchMode initial value straight from the prop (no prop→state effect
// sync, which cascades renders) — a remount naturally re-runs useState's
// initializer.
function OverlayBody({
  initialSearchMode,
  closeButtonRef,
  searchInputRef,
  activePage,
  onNavigate,
  onClose,
  openMobileSection,
  setOpenMobileSection,
  reduceMotion,
}) {
  const [isSearchMode, setIsSearchMode] = useState(Boolean(initialSearchMode));

  useEffect(() => {
    if (isSearchMode) searchInputRef.current?.focus();
  }, [isSearchMode, searchInputRef]);

  return (
    <>
      <div className="w-full flex items-center justify-between px-6 sm:px-10 lg:px-20 pt-6 pb-4 flex-shrink-0">
        <img src={SKMLogo} alt="SKM Egg Products" className="w-[140px] sm:w-[170px] h-auto object-contain" />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSearchMode((prev) => !prev)}
            aria-pressed={isSearchMode}
            aria-label={isSearchMode ? 'Close search' : 'Search website'}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200 hover:border-brand-600 hover:text-brand-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200 hover:border-brand-600 hover:text-brand-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-grow w-full px-6 sm:px-10 lg:px-20 pb-16 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {isSearchMode ? (
            <SearchPanel key="search" onNavigate={onNavigate} inputRef={searchInputRef} />
          ) : (
            <motion.div
              key="menu"
              variants={reduceMotion ? undefined : listVariants}
              initial="hidden"
              animate="visible"
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-2 max-w-6xl mx-auto"
            >
              {overlayColumns.map((column, index) => (
                <MenuSection
                  key={column.title}
                  title={column.title}
                  links={column.links}
                  activePage={activePage}
                  onNavigate={onNavigate}
                  isMobileOpen={openMobileSection === index}
                  onToggleMobile={() => setOpenMobileSection((prev) => (prev === index ? -1 : index))}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
