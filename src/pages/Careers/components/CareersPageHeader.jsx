import InternalLink from '../../../components/common/InternalLink';

// Compact header used by the inner Careers pages (jobs list, job detail,
// apply). `crumbs` = [{ label, route? }] — the last crumb is the current page.
export default function CareersPageHeader({ crumbs, eyebrow, title, onPageChange, children }) {
  return (
    <header className="w-full bg-page border-b border-[#eee] pt-[110px] pb-10 sm:pt-[130px] sm:pb-12">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 flex flex-col gap-5">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 list-none m-0 p-0 font-body text-[13px] text-surface-500">
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
        {eyebrow && <span className="section-label">{eyebrow}</span>}
        <h1 className="font-heading font-bold text-[32px] sm:text-[44px] text-heading leading-[1.12] tracking-tight m-0">{title}</h1>
        {children}
      </div>
    </header>
  );
}
