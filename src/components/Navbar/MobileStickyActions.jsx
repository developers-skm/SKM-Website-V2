import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import useProductDiscoveryNavigation from './useProductDiscoveryNavigation';
import { getProductIdByPage } from '../../data/products';

// The sole mobile sticky action bar sitewide — replaces the old per-page
// StickyQuoteCTA. Two 44px+ buttons: Find Product / Request Quote. Hidden on
// get-quote (its own destination), while the Contact enquiry modal is open,
// and when the footer intersects the viewport (all via `suppressed`, owned
// by Layout.jsx / App.jsx — this component makes no route-suppression
// decisions of its own beyond the get-quote check).
export default function MobileStickyActions({ activePage, onPageChange, suppressed }) {
  const reduceMotion = useReducedMotion();
  const findProduct = useProductDiscoveryNavigation(onPageChange, activePage);

  const visible = activePage !== 'get-quote' && !suppressed;

  const handleRequestQuote = () => {
    const productId = getProductIdByPage(activePage);
    onPageChange('get-quote', productId ? { productId } : undefined);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: reduceMotion ? 0 : 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduceMotion ? 0 : 60, opacity: 0 }}
          transition={reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 inset-x-0 z-40 md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="flex items-stretch gap-2 bg-white/97 backdrop-blur-md border-t border-surface-200/70 shadow-[0_-4px_20px_rgba(36,30,24,0.08)] px-3 py-2.5">
            <button
              type="button"
              onClick={findProduct}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-surface-50 hover:bg-surface-100 border border-surface-200 text-surface-800 font-heading font-bold text-[13px] uppercase tracking-[0.03em] leading-none min-h-[44px] rounded-[200px] transition-all duration-200 cursor-pointer"
            >
              Find Product
            </button>
            <button
              type="button"
              onClick={handleRequestQuote}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.03em] leading-none min-h-[44px] rounded-[200px] transition-all duration-200 cursor-pointer"
            >
              Request Quote
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
