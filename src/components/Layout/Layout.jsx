import { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ScrollToTopButton from '../ScrollToTop/ScrollToTopButton';
import Chatbot from '../Chatbot/Chatbot';
import MobileStickyActions from '../Navbar/MobileStickyActions';

// ACTION_BP (md, 768px) — the mobile sticky-action breakpoint — is
// intentionally independent of Navbar's NAV_BP (xl). A tablet in the
// mobile-nav-drawer state doesn't automatically need a thumb-reachable
// bottom action bar; that's a narrower, phone-shaped affordance.
export default function Layout({ children, activePage, onPageChange, suppressMobileActions }) {
  const footerWrapperRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const target = footerWrapperRef.current;
    if (!target) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: '0px 0px 0px 0px' }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-page dark:bg-surface-950 text-surface-800 dark:text-surface-100 transition-colors duration-300">
      {/* Navbar's logo is `absolute` (scrolls away with the page) — this
          wrapper is its positioning context. Its menu button is `fixed`
          (stays put through scroll) and ignores this positioning entirely. */}
      <Navbar activePage={activePage} onPageChange={onPageChange} />
      {/* No top padding here — the logo/menu float over whatever the first
          section renders (its background must reach y=0, e.g. Hero.jsx's
          full-bleed image). Each page's own first section is responsible
          for reserving its own top clearance so its heading doesn't sit
          under the logo/menu; see Hero.jsx for the homepage's version. */}
      <main className="flex-grow w-full flex flex-col box-border pb-[76px] md:pb-0">
        {children}
      </main>
      <div ref={footerWrapperRef}>
        <Footer onPageChange={onPageChange} />
      </div>
      <ScrollToTopButton />
      <Chatbot />
      <MobileStickyActions
        activePage={activePage}
        onPageChange={onPageChange}
        suppressed={Boolean(suppressMobileActions) || footerVisible}
      />
    </div>
  );
}
