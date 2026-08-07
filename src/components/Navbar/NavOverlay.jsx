import { useEffect, useRef, useState, Fragment } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SKMLogo from '../../assets/LOGO/Skm-Logo-1536x332.png';
import InternalLink from '../common/InternalLink';
import MenuSection from './MenuSection';
import SearchPanel from './SearchPanel';
import { CloseIcon, SearchIcon, MailIcon, PhoneIcon } from './icons';
import { overlayColumns, utilityLinks } from './navigationData';

const PHONE_NUMBER = '04242268391';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Card slides down from the top and fades in/out — not a full-page
// clip-path reveal, since the card now only covers ~70% of the viewport
// height (mobile goes taller, see className breakpoints below) and the
// original page must stay visible underneath through the backdrop.
const cardVariants = {
  hidden: { y: '-100%', opacity: 0 },
  visible: { y: '0%', opacity: 1 },
  exit: { y: '-100%', opacity: 0 },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

// Card-style navigation dropdown: a rounded, shadowed panel that slides down
// from the top and covers ~70% of the viewport (more on small screens),
// leaving the page visible below it through a semi-transparent backdrop.
// Owns its own focus trap, Escape handling, body-scroll lock, and focus
// restoration to the trigger button.
export default function NavOverlay({ isOpen, onClose, activePage, onPageChange, onContactEmail, triggerElRef, initialSearchMode, openKey }) {
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
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            transition={{ duration: reduceMotion ? 0.15 : 0.35 }}
            className="fixed inset-0 z-[55] bg-surface-950/55 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={overlayRef}
            id="site-navigation-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={reduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } } : cardVariants}
            transition={{ duration: reduceMotion ? 0.15 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 inset-x-0 z-[60] h-[90vh] sm:h-[80vh] lg:h-[70vh] bg-[#fbfaf8] dark:bg-surface-950 rounded-b-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden"
            style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
          >
            <OverlayBody
              key={openKey}
              initialSearchMode={initialSearchMode}
              closeButtonRef={closeButtonRef}
              searchInputRef={searchInputRef}
              activePage={activePage}
              onNavigate={handleNavigate}
              onClose={onClose}
              onContactEmail={onContactEmail}
              openMobileSection={openMobileSection}
              setOpenMobileSection={setOpenMobileSection}
              reduceMotion={reduceMotion}
            />
          </motion.div>
        </>
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
  onContactEmail,
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
      {/* Slim top bar — logo, search/close. Utility links + language now
          live in the footer strip below (see end of this component). */}
      <div className="w-full flex items-center gap-4 px-6 sm:px-10 lg:px-14 py-4 border-b border-surface-200 dark:border-surface-800 flex-shrink-0">
        <img src={SKMLogo} alt="SKM Egg Products" className="w-[120px] sm:w-[140px] h-auto object-contain flex-shrink-0" />

        <div className="flex items-center gap-2 ml-auto flex-shrink-0">
          <button
            type="button"
            onClick={() => setIsSearchMode((prev) => !prev)}
            aria-pressed={isSearchMode}
            aria-label={isSearchMode ? 'Close search' : 'Search website'}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200 hover:border-brand-600 hover:text-brand-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200 hover:border-brand-600 hover:text-brand-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-grow w-full px-6 sm:px-10 lg:px-14 py-8 overflow-y-auto custom-scrollbar flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {isSearchMode ? (
            <SearchPanel key="search" onNavigate={onNavigate} inputRef={searchInputRef} />
          ) : (
            <motion.div
              key="menu"
              variants={reduceMotion ? undefined : listVariants}
              initial="hidden"
              animate="visible"
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-2 max-w-6xl mx-auto"
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

      {/* Footer strip — phone/email quick actions (formerly the vertical
          RailNav) plus the utility links + language label (formerly the
          TopUtilityBar), now reunited here since both bars were removed
          in favour of this single drawer. */}
      {!isSearchMode && (
        <div className="flex-shrink-0 w-full border-t border-surface-200 dark:border-surface-800 px-6 sm:px-10 lg:px-14 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <nav aria-label="Utility" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {utilityLinks.map((link, index) => (
              <Fragment key={link.label}>
                <InternalLink
                  route={link.route}
                  onPageChange={onNavigate}
                  prefillData={link.careersIntent ? { enquiryType: 'job', intentId: crypto.randomUUID() } : undefined}
                  className="font-body text-[13px] font-semibold text-surface-600 dark:text-surface-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-150 whitespace-nowrap"
                >
                  {link.label}
                </InternalLink>
                {index < utilityLinks.length - 1 && (
                  <span className="w-px h-3 bg-surface-300 dark:bg-surface-700" aria-hidden="true" />
                )}
              </Fragment>
            ))}
            <span className="w-px h-3 bg-surface-300 dark:bg-surface-700" aria-hidden="true" />
            <span className="font-body text-[13px] font-medium text-surface-500 dark:text-surface-400 whitespace-nowrap select-none">
              Language · EN
            </span>
          </nav>

          <div className="flex items-center gap-3 sm:ml-auto flex-shrink-0">
            <button
              type="button"
              onClick={onContactEmail}
              className="inline-flex items-center gap-2 font-body text-[13px] font-semibold text-surface-600 dark:text-surface-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
            >
              <MailIcon className="w-4 h-4" aria-hidden="true" />
              Email us
            </button>
            <span className="w-px h-3 bg-surface-300 dark:bg-surface-700" aria-hidden="true" />
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 font-body text-[13px] font-semibold text-surface-600 dark:text-surface-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
            >
              <PhoneIcon className="w-4 h-4" aria-hidden="true" />
              Call us
            </a>
          </div>
        </div>
      )}
    </>
  );
}
