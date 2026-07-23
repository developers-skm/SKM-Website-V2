import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SKMLogo from '../../assets/LOGO/Skm-Logo-1536x332.png';
import UtilityBar from './UtilityBar';
import PrimaryNav from './PrimaryNav';
import MobileNavigation from './MobileNavigation';
import InternalLink from '../common/InternalLink';

// Coordinating shell: UtilityBar (normal flow, desktop only) sits above a
// single sticky <header> containing the logo, PrimaryNav, the one desktop
// Request a Quote CTA, and the mobile menu trigger. UtilityBar/PrimaryNav/
// desktop CTA/mobile trigger/mobile drawer all collapse at the same NAV_BP
// (xl — see PrimaryNav.jsx / UtilityBar.jsx for why it's hardcoded rather
// than passed as a prop: Tailwind's JIT scanner needs literal class names).
export default function Navbar({ activePage, onPageChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled((prev) => {
        if (!prev && window.scrollY > 68) return true;
        if (prev && window.scrollY < 52) return false;
        return prev;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogoClick = () => {
    onPageChange('home');
    setIsMenuOpen(false);
  };

  return (
    <>
      <UtilityBar onPageChange={onPageChange} />

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.8 }}
        className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
          isScrolled ? 'shadow-[5px_3px_40px_rgba(0,72,88,0.1)]' : 'border-b border-[#eee]'
        }`}
      >
        <div className="mx-auto max-w-[1680px] px-5 lg:px-8 xl:px-10 flex justify-between items-center h-[68px] xl:h-[80px]">
          <button
            onClick={handleLogoClick}
            className="flex-shrink-0 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
            aria-label="SKM Egg Products — Home"
          >
            <img
              src={SKMLogo}
              alt="SKM Egg Products"
              className="w-[150px] xl:w-[200px] h-auto object-contain transition-opacity duration-200 hover:opacity-85"
              loading="eager"
            />
          </button>

          <PrimaryNav activePage={activePage} onPageChange={onPageChange} />

          <div className="flex-shrink-0 flex items-center gap-3">
            <InternalLink
              route="get-quote"
              onPageChange={onPageChange}
              className="hidden xl:inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[15px] leading-none px-6 py-[13px] min-h-[44px] rounded-[200px] transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              Request a Quote
            </InternalLink>

            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="xl:hidden flex items-center justify-center w-11 h-11 rounded-[10px] border border-[#eee] bg-transparent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 transition-colors duration-200 hover:border-brand-600/30"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5 text-surface-700 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-surface-700 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileNavigation
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activePage={activePage}
        onPageChange={onPageChange}
        triggerRef={menuButtonRef}
      />
    </>
  );
}
