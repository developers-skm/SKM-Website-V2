import { motion } from 'framer-motion';
import RailButton from './RailButton';
import { MenuIcon, SearchIcon, MailIcon, PhoneIcon } from './icons';

const PHONE_NUMBER = '04242268391';

// Floating vertical rail, desktop only (md and up — mobile gets a compact
// single trigger, see MobileMenuTrigger). Fixed to the right edge, vertically
// centered so it clears the bottom-right Chatbot/ScrollToTop stack (both
// anchored to bottom-right, see Chatbot.jsx / ScrollToTopButton.jsx).
export default function RailNav({ isMenuOpen, onOpenMenu, onOpenSearch, onContactEmail, menuButtonRef }) {
  return (
    <motion.nav
      aria-label="Quick actions"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.8, delay: 0.15 }}
      className="hidden md:flex fixed top-1/2 -translate-y-1/2 right-5 lg:right-7 z-40 flex-col w-[64px] lg:w-[72px] rounded-xl overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.16)]"
    >
      <RailButton
        ref={menuButtonRef}
        icon={<MenuIcon className="w-5 h-5" />}
        label="Open navigation"
        onClick={onOpenMenu}
        active={isMenuOpen}
        aria-expanded={isMenuOpen}
        aria-controls="site-navigation-overlay"
      />
      <RailButton icon={<SearchIcon className="w-5 h-5" />} label="Search website" onClick={onOpenSearch} />
      <RailButton icon={<MailIcon className="w-5 h-5" />} label="Contact SKM Egg Products" onClick={onContactEmail} />
      <RailButton icon={<PhoneIcon className="w-5 h-5" />} label="Call SKM Egg Products" href={`tel:${PHONE_NUMBER}`} />
    </motion.nav>
  );
}
