import { useId } from 'react';
import { motion } from 'framer-motion';
import MenuLink from './MenuLink';
import { ChevronDownIcon } from './icons';

const columnVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

// One navigation group. Renders as a plain column on tablet/desktop (sm and
// up, matching the card's sm:grid-cols-2 / lg:grid-cols-4 layout) and as an
// accordion section on mobile, controlled by the parent overlay's
// openMobileSection state so only one section's links are mounted-visible
// at a time on small screens.
export default function MenuSection({ title, links, activePage, onNavigate, isMobileOpen, onToggleMobile }) {
  const bodyId = useId();

  return (
    <motion.div variants={columnVariants} className="border-b border-surface-200 sm:border-none py-2 sm:py-0">
      <h3 className="hidden sm:block font-heading font-bold text-[13px] uppercase tracking-[0.1em] text-brand-600 m-0">
        {title}
      </h3>

      <button
        type="button"
        onClick={onToggleMobile}
        aria-expanded={isMobileOpen}
        aria-controls={bodyId}
        className="sm:hidden w-full flex items-center justify-between gap-2 py-3 min-h-[44px] text-left cursor-pointer"
      >
        <span className="font-heading font-bold text-[13px] uppercase tracking-[0.1em] text-brand-600">
          {title}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 text-surface-400 transition-transform duration-200 ${isMobileOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <ul
        id={bodyId}
        className={`list-none m-0 p-0 flex-col gap-0.5 sm:mt-4 sm:flex ${isMobileOpen ? 'flex pb-2' : 'hidden'}`}
      >
        {links.map((link) => (
          <MenuLink
            key={`${link.route}-${link.label}`}
            route={link.route}
            label={link.label}
            activePage={activePage}
            onNavigate={onNavigate}
            prefillData={link.careersIntent ? { enquiryType: 'job', intentId: crypto.randomUUID() } : undefined}
          />
        ))}
      </ul>
    </motion.div>
  );
}
