import { useState, useEffect, useRef, Suspense } from 'react';
import lazyWithRetry, { preloadRoutes } from './utils/lazyWithRetry';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import PageLoader from './components/PageLoader/PageLoader';
import CloudPageTransition from './components/common/CloudPageTransition';
import products from './data/products';
import OfflinePage from './pages/Offline/OfflinePage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

// Every route backed by the shared ProductPage shell (src/components/
// ProductPage/ProductPage.jsx) - the generic sitewide MobileStickyActions
// bottom bar (Navbar/MobileStickyActions.jsx) is suppressed on these routes.
const PRODUCT_DETAIL_ROUTES = new Set(products.map((p) => p.page));

// Lazy load subpages to reduce initial bundle size and eliminate unused JavaScript
const WholeEggPowderPage = lazyWithRetry(() => import('./pages/Products/WholeEggPowderPage'));
const EggAlbumenPowderPage = lazyWithRetry(() => import('./pages/Products/EggAlbumenPowderPage'));
const EggYolkPowderPage = lazyWithRetry(() => import('./pages/Products/EggYolkPowderPage'));
const EggYolkPowderHeatStablePage = lazyWithRetry(() => import('./pages/Products/EggYolkPowderHeatStablePage'));
const EggAlbumenLiquidPage = lazyWithRetry(() => import('./pages/Products/EggAlbumenLiquidPage'));
const EggYolkLiquidPage = lazyWithRetry(() => import('./pages/Products/EggYolkLiquidPage'));
const WholeEggLiquidPage = lazyWithRetry(() => import('./pages/Products/WholeEggLiquidPage'));
const CustomizedMixPage = lazyWithRetry(() => import('./pages/Products/CustomizedMixPage'));
const CustomizedPackagesPage = lazyWithRetry(() => import('./pages/Products/CustomizedPackagesPage'));
const SpecialityEggLiquidPage = lazyWithRetry(() => import('./pages/Products/SpecialityEggLiquidPage'));
const EggWhiteCubePage = lazyWithRetry(() => import('./pages/Products/EggWhiteCubePage'));

const EggProcessingPlantPage = lazyWithRetry(() => import('./pages/Infra/EggProcessingPlantPage'));
const PoultryFarmPage = lazyWithRetry(() => import('./pages/Infra/PoultryFarmPage'));
const FeedMillPage = lazyWithRetry(() => import('./pages/Infra/FeedMillPage'));
const LaboratoryPage = lazyWithRetry(() => import('./pages/Infra/LaboratoryPage'));

const SkmJapanPage = lazyWithRetry(() => import('./pages/Branches/SkmJapanPage'));
const SkmEuropePage = lazyWithRetry(() => import('./pages/Branches/SkmEuropePage'));
const SkmRussiaPage = lazyWithRetry(() => import('./pages/Branches/SkmRussiaPage'));

const SustainabilityCommunityPage = lazyWithRetry(() => import('./pages/CSR/SustainabilityCommunityPage'));
const CommunityDevelopmentPage = lazyWithRetry(() => import('./pages/CSR/CommunityDevelopmentPage'));
const TrustOutreachPage = lazyWithRetry(() => import('./pages/CSR/TrustOutreachPage'));
const EducationPage = lazyWithRetry(() => import('./pages/CSR/EducationPage'));
const SustainabilityPage = lazyWithRetry(() => import('./pages/CSR/SustainabilityPage'));
const MdArticlePage = lazyWithRetry(() => import('./pages/CSR/MdArticlePage'));

const Investors = lazyWithRetry(() => import('./pages/Investors/Investors'));
const BrochurePage = lazyWithRetry(() => import('./pages/Brochure/BrochurePage'));
const ContactUs = lazyWithRetry(() => import('./pages/ContactUs/ContactUs'));
const CareersRoute = lazyWithRetry(() => import('./pages/Careers/CareersRoute'));
// Private HR portal - rendered outside the public Layout, never linked from nav.
const HRAdminPage = lazyWithRetry(() => import('./pages/HR/HRAdminPage'));

const GetQuotePage = lazyWithRetry(() => import('./pages/GetQuote/GetQuotePage'));
const ApplicationLandingPage = lazyWithRetry(() => import('./pages/Applications/ApplicationLandingPage'));
const ApplicationsHubPage = lazyWithRetry(() => import('./pages/Applications/ApplicationsHubPage'));
const ProductsHubPage = lazyWithRetry(() => import('./pages/Products/ProductsHubPage'));
const PowderLinePage = lazyWithRetry(() => import('./pages/Products/PowderLinePage'));
const LiquidLinePage = lazyWithRetry(() => import('./pages/Products/LiquidLinePage'));
const EggPowdersCategoryPage = lazyWithRetry(() => import('./pages/Products/EggPowdersCategoryPage'));
const LiquidEggCategoryPage = lazyWithRetry(() => import('./pages/Products/LiquidEggCategoryPage'));
const CustomSpecialtyCategoryPage = lazyWithRetry(() => import('./pages/Products/CustomSpecialtyCategoryPage'));
const TableEggsPage = lazyWithRetry(() => import('./pages/Products/TableEggsPage'));
const WhySKMPage = lazyWithRetry(() => import('./pages/WhySKM/WhySKMPage'));
const ManufacturingSupplyPage = lazyWithRetry(() => import('./pages/Capabilities/ManufacturingSupplyPage'));
const InnovationCustomSolutionsPage = lazyWithRetry(() => import('./pages/Innovation/InnovationCustomSolutionsPage'));
const GlobalReachPage = lazyWithRetry(() => import('./pages/GlobalReach/GlobalReachPage'));
const ResourcesPage = lazyWithRetry(() => import('./pages/Resources/ResourcesPage'));

// About Us Subpages
const AboutSKMPage = lazyWithRetry(() => import('./pages/AboutUs/AboutSKMPage'));
const OurCompanyPage = lazyWithRetry(() => import('./pages/AboutUs/OurCompanyPage'));
const VisionMissionPage = lazyWithRetry(() => import('./pages/AboutUs/VisionMissionPage'));
const CoreIdeologyPage = lazyWithRetry(() => import('./pages/AboutUs/CoreIdeologyPage'));
const BrandIdentityPage = lazyWithRetry(() => import('./pages/AboutUs/BrandIdentityPage'));
const CeoMessagePage = lazyWithRetry(() => import('./pages/AboutUs/CeoMessagePage'));
const AccoladesPage = lazyWithRetry(() => import('./pages/AboutUs/AccoladesPage'));
const GalleryPage = lazyWithRetry(() => import('./pages/AboutUs/GalleryPage'));
const CoffeeTableBooksPage = lazyWithRetry(() => import('./pages/AboutUs/CoffeeTableBooksPage'));
const EventsPage = lazyWithRetry(() => import('./pages/AboutUs/EventsPage'));
const EventDetailPage = lazyWithRetry(() => import('./pages/Events/EventDetailPage'));

// Quality Subpages
const PolicyPage = lazyWithRetry(() => import('./pages/Quality/PolicyPage'));
const CertificationsPage = lazyWithRetry(() => import('./pages/Quality/CertificationsPage'));
const QualityAssurancePage = lazyWithRetry(() => import('./pages/Quality/QualityAssurancePage'));
const TraceabilityPage = lazyWithRetry(() => import('./pages/Quality/TraceabilityPage'));
const QualityManagementSystemPage = lazyWithRetry(() => import('./pages/Quality/QualityManagementSystemPage'));
const QualityFoodSafetyTraceabilityPage = lazyWithRetry(() => import('./pages/Quality/QualityFoodSafetyTraceabilityPage'));
const NotFound = lazyWithRetry(() => import('./pages/NotFound/NotFound'));

// Instant (not smooth) reset: a smooth window.scrollTo fights Lenis's own
// easing and the changing page height during the route transition, which
// left the new page stranded part-way down.
const scrollToTopInstant = () => {
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
};

const scrollToInstant = (y) => {
  if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo(0, y);
};

// Back/forward restore: the new page mounts lazily and its height grows as
// content/images settle, so keep re-applying the saved offset until the page
// is tall enough (and briefly after, for layout shift). Any user input cancels.
let cancelRestore = null;
const restoreScrollPosition = (y, onDone) => {
  if (cancelRestore) cancelRestore();
  const start = performance.now();
  let rafId;
  const finish = () => {
    cancelAnimationFrame(rafId);
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach((e) => window.removeEventListener(e, finish));
    cancelRestore = null;
    onDone();
  };
  ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach((e) =>
    window.addEventListener(e, finish, { passive: true }),
  );
  cancelRestore = finish;
  const tick = () => {
    window.__lenis?.resize();
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollToInstant(Math.max(0, Math.min(y, max)));
    const elapsed = performance.now() - start;
    if ((max >= y - 1 && elapsed > 1000) || elapsed > 3500) finish();
    else rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
};

function App() {
  const pendingScrollRef = useRef(null);
  const getPageFromPath = () => {
    const path = window.location.pathname.replace(/^\//, '');
    return path || 'home';
  };

  const [activePage, setActivePage] = useState(getPageFromPath);
  const activePageRef = useRef(activePage);
  activePageRef.current = activePage;
  const [prefill, setPrefill] = useState(() => window.history.state?.prefill ?? null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(() => (typeof navigator !== 'undefined' ? navigator.onLine : true));
  const [lastOnlinePage, setLastOnlinePage] = useState(() => (getPageFromPath() !== 'offline' ? getPageFromPath() : 'home'));

  useEffect(() => {
    const start = () => preloadRoutes();
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 2500);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handlePageChange = (page, prefillData = null) => {
    setActivePage(page);
    if (page !== 'offline') {
      setLastOnlinePage(page);
    }
    setPrefill(prefillData);
    const path = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== path || prefillData) {
      // Remember where the user was on the page they're leaving so Back returns there.
      saveScroll();
      window.history.pushState({ page, prefill: prefillData }, '', path);
    }
    if (cancelRestore) cancelRestore();
    pendingScrollRef.current = null;
    scrollToTopInstant();
  };

  // Persist the scroll offset into the current history entry (debounced) so
  // popstate can restore it. Skipped while a restore is in flight.
  const saveScroll = () => {
    if (pendingScrollRef.current !== null) return;
    window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, '');
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    let timer;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(saveScroll, 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      const page = event.state?.page || getPageFromPath();
      const y = event.state?.scrollY ?? 0;
      pendingScrollRef.current = y;
      // Same page (no exit transition to hook into): restore straight away.
      if (page === activePageRef.current) {
        restoreScrollPosition(y, () => { pendingScrollRef.current = null; });
      }
      setActivePage(page);
      if (page !== 'offline') {
        setLastOnlinePage(page);
      }
      setPrefill(event.state?.prefill ?? null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleExitComplete = () => {
    if (pendingScrollRef.current === null) {
      scrollToTopInstant();
      return;
    }
    restoreScrollPosition(pendingScrollRef.current, () => { pendingScrollRef.current = null; });
  };

  const suppressMobileActions =
    (isContactModalOpen && activePage === 'contact-us') || PRODUCT_DETAIL_ROUTES.has(activePage);

  const renderPage = () => {
    if (!isOnline || activePage === 'offline') {
      return <OfflinePage onPageChange={handlePageChange} targetPage={lastOnlinePage} />;
    }

    // Event pages: events/<slug> (data in src/data/globalEvents.js)
    if (activePage.startsWith('events/')) {
      return <EventDetailPage slug={activePage.slice('events/'.length)} onPageChange={handlePageChange} />;
    }

    // Careers has nested URLs (careers/jobs/:slug, careers/apply/:slug) - resolved by CareersRoute.
    if (activePage === 'careers' || activePage.startsWith('careers/')) {
      return <CareersRoute path={activePage} onPageChange={handlePageChange} prefill={prefill} />;
    }

    switch (activePage) {
      case 'offline':
        return <OfflinePage onPageChange={handlePageChange} targetPage={lastOnlinePage} />;
      case 'home':
        return <Home onPageChange={handlePageChange} prefill={prefill} />;
      
      // About Us Subpages
      case 'about_skm':
        return <AboutSKMPage onPageChange={handlePageChange} />;
      case 'our_company':
      case 'about-company':
      case 'about-us': // Legacy fallback
        return <OurCompanyPage onPageChange={handlePageChange} />;
      case 'vision_mission':
      case 'about-vision-mission':
        return <VisionMissionPage onPageChange={handlePageChange} />;
      case 'core_ideology':
      case 'about-core-ideology':
        return <CoreIdeologyPage onPageChange={handlePageChange} />;
      case 'brand_identity':
      case 'about-brand-identity':
        return <BrandIdentityPage onPageChange={handlePageChange} />;
      case 'ceo_message':
      case 'about-ceo-message':
        return <CeoMessagePage onPageChange={handlePageChange} />;
      case 'accolades':
      case 'about-accolades':
        return <AccoladesPage onPageChange={handlePageChange} />;
      case 'gallery':
        return <GalleryPage onPageChange={handlePageChange} />;
      case 'coffee_table_books':
      case 'about-coffee-table-books':
        return <CoffeeTableBooksPage onPageChange={handlePageChange} />;
      case 'events':
      case 'about-events':
        return <EventsPage onPageChange={handlePageChange} />;
        
      case 'products':
        return <ProductsHubPage onPageChange={handlePageChange} prefill={prefill} />;
      case 'powder_line':
        return <PowderLinePage onPageChange={handlePageChange} />;
      case 'liquid_line':
        return <LiquidLinePage onPageChange={handlePageChange} />;
      case 'category_powders':
        return <EggPowdersCategoryPage onPageChange={handlePageChange} />;
      case 'category_liquids':
        return <LiquidEggCategoryPage onPageChange={handlePageChange} />;
      case 'category_custom':
        return <CustomSpecialtyCategoryPage onPageChange={handlePageChange} />;
      case 'table_eggs':
        return <TableEggsPage onPageChange={handlePageChange} />;
      case 'whole_egg_powder':
        return <WholeEggPowderPage onPageChange={handlePageChange} />;
      case 'egg_albumen_powder':
        return <EggAlbumenPowderPage onPageChange={handlePageChange} />;
      case 'egg_yolk_powder':
        return <EggYolkPowderPage onPageChange={handlePageChange} />;
      case 'egg_yolk_powder_heat_stable':
        return <EggYolkPowderHeatStablePage onPageChange={handlePageChange} />;
      case 'egg_albumen_liquid':
        return <EggAlbumenLiquidPage onPageChange={handlePageChange} />;
      case 'egg_yolk_liquid':
        return <EggYolkLiquidPage onPageChange={handlePageChange} />;
      case 'whole_egg_liquid':
        return <WholeEggLiquidPage onPageChange={handlePageChange} />;
      case 'customised_mix':
        return <CustomizedMixPage onPageChange={handlePageChange} />;
      case 'customised_packages':
        return <CustomizedPackagesPage onPageChange={handlePageChange} />;
      case 'speciality_egg_liquids':
        return <SpecialityEggLiquidPage onPageChange={handlePageChange} />;
      case 'egg_white_cube':
        return <EggWhiteCubePage onPageChange={handlePageChange} />;
      
      // Quality Subpages
      case 'policy':
      case 'quality-policy':
      case 'quality': // Legacy fallback
        return <PolicyPage onPageChange={handlePageChange} />;
      case 'certifications':
      case 'quality-certifications':
        return <CertificationsPage onPageChange={handlePageChange} />;
      case 'quality_assurance':
      case 'quality-assurance':
        return <QualityAssurancePage onPageChange={handlePageChange} />;
      case 'traceability':
      case 'quality-traceability':
        return <TraceabilityPage onPageChange={handlePageChange} />;
      case 'quality_management_system':
      case 'quality-management-system':
        return <QualityManagementSystemPage onPageChange={handlePageChange} />;
      case 'quality_food_safety_traceability':
        return <QualityFoodSafetyTraceabilityPage onPageChange={handlePageChange} />;
        
      case 'egg_processing_plant':
        return <EggProcessingPlantPage onPageChange={handlePageChange} />;
      case 'poultry_farm':
        return <PoultryFarmPage onPageChange={handlePageChange} />;
      case 'feed_mill':
        return <FeedMillPage onPageChange={handlePageChange} />;
      case 'laboratory':
        return <LaboratoryPage onPageChange={handlePageChange} />;
      case 'sustainability_and_community':
        return <SustainabilityCommunityPage onPageChange={handlePageChange} />;
      case 'community_development':
        return <CommunityDevelopmentPage onPageChange={handlePageChange} />;
      case 'trust_outreach':
        return <TrustOutreachPage onPageChange={handlePageChange} />;
      case 'csr_education':
        return <EducationPage onPageChange={handlePageChange} />;
      case 'csr_sustainability':
        return <SustainabilityPage onPageChange={handlePageChange} />;
      case 'md_article':
        return <MdArticlePage onPageChange={handlePageChange} />;
      case 'investors':
        return <Investors onPageChange={handlePageChange} />;
      case 'brochure':
        return <BrochurePage onPageChange={handlePageChange} />;

      case 'skm_japan':
        return <SkmJapanPage onPageChange={handlePageChange} />;
      case 'skm_europe':
        return <SkmEuropePage onPageChange={handlePageChange} />;
      case 'skm_russia':
        return <SkmRussiaPage onPageChange={handlePageChange} />;
      case 'contact-us':
        return (
          <ContactUs
            onPageChange={handlePageChange}
            prefill={prefill}
            onModalVisibilityChange={setIsContactModalOpen}
          />
        );

      case 'get-quote':
        return <GetQuotePage onPageChange={handlePageChange} prefill={prefill} />;

      case 'applications':
        return <ApplicationsHubPage onPageChange={handlePageChange} prefill={prefill} />;

      // Application landing pages (plan.md §5)
      case 'app_bakery':
        return <ApplicationLandingPage applicationId="bakery" onPageChange={handlePageChange} />;
      case 'app_mayo':
        return <ApplicationLandingPage applicationId="mayonnaise" onPageChange={handlePageChange} />;
      case 'app_meat_fish':
        return <ApplicationLandingPage applicationId="meat_fish" onPageChange={handlePageChange} />;
      case 'app_noodles_pasta':
        return <ApplicationLandingPage applicationId="noodles_pasta" onPageChange={handlePageChange} />;

      case 'why_skm':
        return <WhySKMPage onPageChange={handlePageChange} />;
      case 'manufacturing_and_supply':
        return <ManufacturingSupplyPage onPageChange={handlePageChange} />;
      case 'innovation_and_custom_solutions':
        return <InnovationCustomSolutionsPage onPageChange={handlePageChange} />;
      case 'global_reach':
        return <GlobalReachPage onPageChange={handlePageChange} />;
      case 'resources':
        return <ResourcesPage onPageChange={handlePageChange} />;

      default:
        return <NotFound onPageChange={handlePageChange} />;
    }
  };

  if (activePage === 'newhr') {
    return (
      <Suspense fallback={<PageLoader />}>
        <HRAdminPage />
      </Suspense>
    );
  }

  return (
    <Layout activePage={activePage} onPageChange={handlePageChange} suppressMobileActions={suppressMobileActions}>
      <ErrorBoundary>
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full flex-grow flex flex-col"
          >
            <Suspense fallback={<PageLoader />}>
              {renderPage()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </ErrorBoundary>
      <CloudPageTransition />
    </Layout>
  );
}

export default App;

