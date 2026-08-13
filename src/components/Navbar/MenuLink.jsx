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
        className={`group relative inline-flex items-center min-h-[44px] py-2 font-body text-[16px] font-semibold transition-all duration-200 ease-out hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm ${
          isActive
            ? 'text-brand-600'
            : 'text-[#1a1d29] hover:text-brand-600'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {label}
        <span
          aria-hidden="true"
          className={`absolute left-0 -bottom-0.5 h-[1.5px] bg-brand-600 transition-all duration-200 ease-out ${
            isActive ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
      </InternalLink>
    </li>
  );
}
