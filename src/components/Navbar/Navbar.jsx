import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SKMLogo from '../../assets/LOGO/Skm-Logo-1536x332.png';
import RailNav from './RailNav';
import MobileMenuTrigger from './MobileMenuTrigger';
import NavOverlay from './NavOverlay';
import TopUtilityBar from './TopUtilityBar';

// Premium fixed navigation shell: a persistent slim TopUtilityBar (logo +
// utility links) on md and up, a floating vertical action rail further
// right on desktop (RailNav: menu/search/email/phone — the sole desktop
// menu/search entry point), and a compact logo + MobileMenuTrigger row on
// mobile. Component API preserved exactly — <Navbar activePage
// onPageChange /> — so App.jsx/Layout.jsx need no changes.
export default function Navbar({ activePage, onPageChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuIntent, setMenuIntent] = useState('browse');
  const [openKey, setOpenKey] = useState(0);
  const menuButtonRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const activeTriggerElRef = useRef(null);

  const openMenu = (intent = 'browse', triggerEl = menuButtonRef.current) => {
    setMenuIntent(intent);
    setOpenKey((prev) => prev + 1);
    setIsMenuOpen(true);
    activeTriggerElRef.current = triggerEl;
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogoClick = () => {
    onPageChange('home');
    closeMenu();
  };

  const handleContactEmail = () => {
    onPageChange('contact-us');
  };

  return (
    <>
      {/* Mobile only — TopUtilityBar (below) takes over on md and up */}
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.8 }}
        className="md:hidden fixed top-0 left-0 z-40 px-5 pt-4"
        style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 1rem)' }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogoClick}
            className="flex-shrink-0 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm bg-white/90 dark:bg-surface-900/90 backdrop-blur-sm px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            aria-label="SKM Egg Products — Home"
          >
            <img
              src={SKMLogo}
              alt="SKM Egg Products"
              className="w-[130px] h-auto object-contain transition-opacity duration-200 hover:opacity-85"
              loading="eager"
            />
          </button>

          <MobileMenuTrigger
            ref={mobileMenuButtonRef}
            isOpen={isMenuOpen}
            onClick={() => openMenu('browse', mobileMenuButtonRef.current)}
          />
        </div>
      </motion.div>

      <TopUtilityBar onPageChange={onPageChange} />

      <RailNav
        isMenuOpen={isMenuOpen}
        onOpenMenu={() => openMenu('browse', menuButtonRef.current)}
        onOpenSearch={() => openMenu('search', menuButtonRef.current)}
        onContactEmail={handleContactEmail}
        menuButtonRef={menuButtonRef}
      />

      <NavOverlay
        isOpen={isMenuOpen}
        onClose={closeMenu}
        activePage={activePage}
        onPageChange={onPageChange}
        triggerElRef={activeTriggerElRef}
        initialSearchMode={menuIntent === 'search'}
        openKey={openKey}
      />
    </>
  );
}
