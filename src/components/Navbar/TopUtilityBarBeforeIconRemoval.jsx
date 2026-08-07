import { Fragment } from 'react';
import { motion } from 'framer-motion';
import SKMLogo from '../../assets/LOGO/Skm-Logo-1536x332.png';
import InternalLink from '../common/InternalLink';
import { MenuIcon, SearchIcon } from './icons';
import { utilityLinks } from './navigationData';

// Persistent slim top bar, visible on every page (not just inside the
// NavOverlay card) — logo left, utility links + Language right on lg and up
// with hairline separators, search/menu circular buttons far right. Desktop
// only: mobile keeps the logo + MobileMenuTrigger row instead (see Navbar.jsx).
export default function TopUtilityBar({ onPageChange, onOpenMenu, onOpenSearch, isMenuOpen, menuButtonRef, logoButtonRef }) {
  const handleLogoClick = () => onPageChange('home');

  return (
    <motion.div
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.8 }}
      className="hidden md:block fixed top-0 inset-x-0 z-40 bg-[#fbfaf8]/95 dark:bg-surface-950/95 backdrop-blur-sm border-b border-surface-200 dark:border-surface-800"
    >
      <div className="mx-auto max-w-[1680px] px-6 lg:px-10 h-[68px] flex items-center gap-4">
        <button
          ref={logoButtonRef}
          onClick={handleLogoClick}
          className="flex-shrink-0 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
          aria-label="SKM Egg Products — Home"
        >
          <img
            src={SKMLogo}
            alt="SKM Egg Products"
            className="w-[140px] lg:w-[160px] h-auto object-contain transition-opacity duration-200 hover:opacity-85"
            loading="eager"
          />
        </button>

        <nav aria-label="Utility" className="hidden lg:flex items-center gap-4 ml-auto">
          {utilityLinks.map((link, index) => (
            <Fragment key={link.label}>
              <InternalLink
                route={link.route}
                onPageChange={onPageChange}
                prefillData={link.careersIntent ? { enquiryType: 'job', intentId: crypto.randomUUID() } : undefined}
                className="font-body text-[14px] font-semibold text-surface-600 dark:text-surface-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-150 whitespace-nowrap"
              >
                {link.label}
              </InternalLink>
              {index < utilityLinks.length - 1 && (
                <span className="w-px h-3 bg-surface-300 dark:bg-surface-700" aria-hidden="true" />
              )}
            </Fragment>
          ))}
          <span className="w-px h-3 bg-surface-300 dark:bg-surface-700" aria-hidden="true" />
          <span className="font-body text-[14px] font-medium text-surface-500 dark:text-surface-400 whitespace-nowrap select-none">
            Language · EN
          </span>
        </nav>

        <div className="flex items-center gap-2 ml-auto lg:ml-4 flex-shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search website"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200 hover:border-brand-600 hover:text-brand-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <SearchIcon className="w-[18px] h-[18px]" />
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={onOpenMenu}
            aria-label="Open navigation"
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation-overlay"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200 hover:border-brand-600 hover:text-brand-600 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <MenuIcon className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
