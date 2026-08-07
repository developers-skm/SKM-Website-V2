import { forwardRef } from 'react';
import { MenuIcon } from './icons';

// Sole menu entry point sitewide, at every breakpoint — sits top-right,
// paired with the floating logo (Navbar.jsx). Circular, SKM red, sized
// within the 48–56px range this design calls for.
const MobileMenuTrigger = forwardRef(function MobileMenuTrigger({ isOpen, onClick }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="site-navigation-overlay"
      aria-label="Open navigation"
      className="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-[54px] sm:h-[54px] min-w-[44px] min-h-[44px] rounded-full bg-brand-600 hover:bg-brand-700 text-white transition-colors duration-200 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
    >
      <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
});

export default MobileMenuTrigger;
