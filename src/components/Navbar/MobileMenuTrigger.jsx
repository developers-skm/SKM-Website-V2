import { forwardRef } from 'react';
import { MenuIcon } from './icons';

// Compact fixed menu button replacing the desktop rail on mobile/tablet
// (below md). Bottom-right would collide with Chatbot/ScrollToTop's shared
// stack, so this sits top-right instead, alongside the logo row.
const MobileMenuTrigger = forwardRef(function MobileMenuTrigger({ isOpen, onClick }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="site-navigation-overlay"
      aria-label="Open navigation"
      className="md:hidden flex items-center justify-center w-12 h-12 min-w-[44px] min-h-[44px] rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
    >
      <MenuIcon className="w-5 h-5" />
    </button>
  );
});

export default MobileMenuTrigger;
