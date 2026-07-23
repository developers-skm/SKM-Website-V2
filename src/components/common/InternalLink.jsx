// Real <a href> so links are crawlable, right-clickable, and open correctly in
// a new tab (vercel.json rewrites every path to index.html, so the resulting
// URL genuinely loads). A plain left-click is intercepted for SPA navigation
// via onPageChange; modified clicks fall through to native anchor behavior.
// Neutral/shared: no navigation-specific styling, state, or coupling — safe
// to use from the header nav, Home sections, or anywhere else the app's
// onPageChange(route, prefillData) router is used.
export default function InternalLink({ route, onPageChange, prefillData, className, onClick, children, ...rest }) {
  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      event.preventDefault();
      onPageChange(route, prefillData);
    }
  };

  return (
    <a href={`/${route}`} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
