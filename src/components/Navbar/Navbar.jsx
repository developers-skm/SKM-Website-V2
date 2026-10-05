import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SKMLogo from '../../assets/LOGO/Skm-Logo-1536x332.png';
import MobileMenuTrigger from './MobileMenuTrigger';
import NavOverlay from './NavOverlay';

// Logo and menu button are deliberately NOT one fixed unit. The logo is
// site branding that belongs to the top of the page — it's `absolute`
// inside Layout's relative root (Layout.jsx), positioned near the top and
// left in normal document flow otherwise, so it scrolls away with the page
// like any other content and never floats over later sections. The menu
// button is the actual navigation control users need throughout a scroll,
// so it alone is `fixed` to the viewport. Component API preserved exactly
// — <Navbar activePage onPageChange /> — so App.jsx/Layout.jsx need no
// prop changes (Layout.jsx does need `relative` on its root div, see there).
export default function Navbar({ activePage, onPageChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuIntent, setMenuIntent] = useState('browse');
  const [openKey, setOpenKey] = useState(0);
  const menuButtonRef = useRef(null);
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
      {/* Scrolls away with the page — absolute within Layout's relative
          root, not fixed. Matches Hero.jsx's own left padding exactly so
          the logo and hero copy share one left edge. */}
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.8 }}
        className="absolute top-[22px] left-3 sm:top-[23px] sm:left-5 lg:top-8 lg:left-7 z-30"
      >
        <button
          onClick={handleLogoClick}
          className="flex-shrink-0 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-lg flex items-center p-1 transition-all duration-200 hover:opacity-90"
          aria-label="SKM Egg Products — Home"
        >
          <img
            src={SKMLogo}
            alt="SKM Egg Products"
            className="w-[170px] sm:w-[210px] lg:w-[250px] h-auto object-contain drop-shadow-[0_1px_8px_rgba(255,255,255,0.55)] transition-opacity duration-200 hover:opacity-85"
            loading="eager"
          />
        </button>
      </motion.div>

      {/* Fixed to the viewport — hidden on offline page */}
      {activePage !== 'offline' && (
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.8, delay: 0.05 }}
          className="fixed top-5 right-5 sm:top-[22px] sm:right-8 lg:top-9 lg:right-16 z-40"
          style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}
        >
          <MobileMenuTrigger
            ref={menuButtonRef}
            isOpen={isMenuOpen}
            onClick={() => openMenu('browse', menuButtonRef.current)}
          />
        </motion.div>
      )}

      <NavOverlay
        isOpen={isMenuOpen}
        onClose={closeMenu}
        activePage={activePage}
        onPageChange={onPageChange}
        onContactEmail={handleContactEmail}
        triggerElRef={activeTriggerElRef}
        initialSearchMode={menuIntent === 'search'}
        openKey={openKey}
      />
    </>
  );
}
