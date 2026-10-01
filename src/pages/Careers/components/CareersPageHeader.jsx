import InternalLink from '../../../components/common/InternalLink';
import { Container } from './layout';

// Compact header used by the inner Careers pages (jobs list, job detail,
// apply). `crumbs` = [{ label, route?, prefill? }] — the last crumb is the
// current page. `size` should match the page body below it.
export default function CareersPageHeader({ crumbs, eyebrow, title, onPageChange, size = 'narrow', children }) {
  return (
    <header className="w-full bg-[#fbfaf8] border-b border-[#eee] pt-[104px] pb-10 sm:pt-[128px] sm:pb-12">
      <Container size={size} className="flex flex-col gap-5">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 list-none m-0 p-0 font-body text-[14px] text-surface-500">
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-2">
                  {isLast || !crumb.route ? (
                    <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'font-semibold text-surface-700' : ''}>{crumb.label}</span>
                  ) : (
                    <InternalLink route={crumb.route} onPageChange={onPageChange} prefillData={crumb.prefill} className="hover:text-brand-650 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm">
                      {crumb.label}
                    </InternalLink>
                  )}
                  {!isLast && <span aria-hidden="true">›</span>}
                </li>
              );
            })}
          </ol>
        </nav>
        {eyebrow && <span className="section-label !mb-0">{eyebrow}</span>}
        <h1 className="font-heading font-bold text-[34px] sm:text-[44px] lg:text-[52px] text-heading leading-[1.1] tracking-tight m-0">{title}</h1>
        {children}
      </Container>
    </header>
  );
}
