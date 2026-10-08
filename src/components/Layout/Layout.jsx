import { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ScrollToTopButton from '../ScrollToTop/ScrollToTopButton';
import Chatbot from '../Chatbot/Chatbot';
import MobileStickyActions from '../Navbar/MobileStickyActions';
import QuickActionsCart from '../QuickActions/QuickActionsCart';
import { getProductIdByPage, getTdsUrl } from '../../data/products';
import { getBrochureUrl } from '../../data/brochureUrl';

const ProductListPdf = getBrochureUrl('Product List - SKM Egg Products Export India Limited.pdf');

// ACTION_BP (md, 768px) - the mobile sticky-action breakpoint - is
// intentionally independent of Navbar's NAV_BP (xl). A tablet in the
// mobile-nav-drawer state doesn't automatically need a thumb-reachable
// bottom action bar; that's a narrower, phone-shaped affordance.
export default function Layout({ children, activePage, onPageChange, suppressMobileActions }) {
  const footerWrapperRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const isOffline = activePage === 'offline';
  // Product pages get that product's TDS; every other page offers the portfolio.
  const cartProductId = getProductIdByPage(activePage);
  const cartDownload = cartProductId
    ? { url: getTdsUrl(cartProductId), label: 'Download TDS' }
    : { url: ProductListPdf, label: 'Download Product Portfolio' };

  useEffect(() => {
    if (isOffline) return undefined;
    const target = footerWrapperRef.current;
    if (!target) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: '0px 0px 0px 0px' }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [isOffline]);

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-clip bg-page text-surface-800 transition-colors duration-300">
      <Navbar activePage={activePage} onPageChange={onPageChange} />
      <main
        className="flex-grow w-full flex flex-col box-border"
        style={isOffline ? undefined : { paddingBottom: 'var(--mobile-cta-reserve)' }}
      >
        {children}
      </main>
      {!isOffline && (
        <>
          <div ref={footerWrapperRef}>
            <Footer onPageChange={onPageChange} />
          </div>
          {activePage !== 'get-quote' && (
            <QuickActionsCart
              downloadUrl={cartDownload.url}
              downloadLabel={cartDownload.label}
              onRequestSample={() => onPageChange('get-quote', cartProductId ? { productId: cartProductId } : undefined)}
            />
          )}
          <ScrollToTopButton />
          <Chatbot />
          <MobileStickyActions
            activePage={activePage}
            onPageChange={onPageChange}
            suppressed={Boolean(suppressMobileActions) || footerVisible}
          />
        </>
      )}
    </div>
  );
}
