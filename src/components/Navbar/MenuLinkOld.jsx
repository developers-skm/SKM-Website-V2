import InternalLink from '../common/InternalLink';

// One navigation destination inside a MenuSection (desktop column list or
// mobile accordion body). Active page gets the brand-red treatment via
// activePage, matching the highlighted-state contract carried over from
// the previous PrimaryNav/MobileNavigation implementation.
export default function MenuLink({ route, label, activePage, onNavigate, prefillData }) {
  const isActive = activePage === route;

  return (
    <li>
      <InternalLink
        route={route}
        onPageChange={onNavigate}
        prefillData={prefillData}
        className={`flex items-center min-h-[44px] py-2 font-body text-[16px] font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm ${
          isActive
            ? 'text-brand-600'
            : 'text-surface-800 dark:text-surface-100 hover:text-brand-600 dark:hover:text-brand-400'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {label}
      </InternalLink>
    </li>
  );
}
