import { forwardRef } from 'react';

// One square cell of the desktop floating rail. Label reveals as an
// expanding tooltip to the left on hover/focus — kept in the DOM at all
// times (opacity/width transition only) so it never triggers layout shift
// in the rail's own column, and so keyboard focus users get the same label
// treatment as mouse users without relying on the native title attribute.
const RailButton = forwardRef(function RailButton(
  { icon, label, onClick, href, active, ...rest },
  ref
) {
  const content = (
    <>
      <span aria-hidden="true" className="flex items-center justify-center w-5 h-5 flex-shrink-0">
        {icon}
      </span>
      <span
        role="presentation"
        className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-surface-900 dark:bg-surface-100 px-3 py-1.5 text-[13px] font-semibold text-white dark:text-surface-900 opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
      >
        {label}
      </span>
    </>
  );

  const sharedClassName = `group relative flex items-center justify-center w-full aspect-square min-h-[60px] cursor-pointer border-b border-white/15 last:border-b-0 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white ${
    active
      ? 'bg-brand-700 text-white'
      : 'bg-brand-600 text-white hover:bg-brand-700'
  }`;

  if (href) {
    return (
      <a ref={ref} href={href} className={sharedClassName} aria-label={label} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} type="button" onClick={onClick} className={sharedClassName} aria-label={label} {...rest}>
      {content}
    </button>
  );
});

export default RailButton;
