import InternalLink from '../../../components/common/InternalLink';
import CareerIcon from './careerIcons';

const classes =
  'group/link inline-flex items-center gap-2 min-h-[44px] font-heading font-bold text-[14px] text-brand-650 hover:text-brand-800 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm';

const arrow = (
  <CareerIcon name="arrow" className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-[3px] motion-reduce:transition-none motion-reduce:group-hover/link:translate-x-0" />
);

// The single "text link →" style used across Careers (View Job, Learn More,
// View All Jobs, …). Pass `route` for navigation or `onClick` for an action.
export default function TextLink({ route, onPageChange, prefillData, onClick, children, className = '', ...rest }) {
  if (route) {
    return (
      <InternalLink route={route} onPageChange={onPageChange} prefillData={prefillData} className={`${classes} ${className}`} {...rest}>
        {children}
        {arrow}
      </InternalLink>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`${classes} ${className}`} {...rest}>
      {children}
      {arrow}
    </button>
  );
}
