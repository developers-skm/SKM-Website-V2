import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ScrollToTopButton from '../ScrollToTop/ScrollToTopButton';
import Chatbot from '../Chatbot/Chatbot';
import QuickActionsCart from '../QuickActions/QuickActionsCart';
import { getProductIdByPage, getTdsUrl } from '../../data/products';
import { getBrochureUrl } from '../../data/brochureUrl';

const ProductListPdf = getBrochureUrl('Product List - SKM Egg Products Export India Limited.pdf');

export default function Layout({ children, activePage, onPageChange }) {
  const isOffline = activePage === 'offline';
  // Product pages get that product's TDS; every other page offers the portfolio.
  const cartProductId = getProductIdByPage(activePage);
  const cartDownload = cartProductId
    ? { url: getTdsUrl(cartProductId), label: 'Download Product Detail' }
    : { url: ProductListPdf, label: 'Download Product Portfolio' };

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
          <Footer onPageChange={onPageChange} />
          {activePage !== 'get-quote' && (
            <QuickActionsCart
              downloadUrl={cartDownload.url}
              downloadLabel={cartDownload.label}
              onRequestSample={() => onPageChange('get-quote', cartProductId ? { productId: cartProductId } : undefined)}
            />
          )}
          <ScrollToTopButton />
          <Chatbot onPageChange={onPageChange} />
        </>
      )}
    </div>
  );
}
