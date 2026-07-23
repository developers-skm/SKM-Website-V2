import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import CustomCursor from './components/CustomCursor/CustomCursor';
import PageLoader from './components/PageLoader/PageLoader';
import products from './data/products';

// Every route backed by the shared ProductPage shell (src/components/
// ProductPage/ProductPage.jsx) — that component renders its own
// StickyProductBar (brief §10: name + Request Sample + Download TDS +
// Request Quote), so the generic sitewide MobileStickyActions bottom bar
// (Navbar/MobileStickyActions.jsx) is suppressed on these routes to avoid
// stacking two differently-labelled bars on the same mobile edge.
const PRODUCT_DETAIL_ROUTES = new Set(products.map((p) => p.page));

// Lazy load subpages to reduce initial bundle size and eliminate unused JavaScript
const WholeEggPowderPage = lazy(() => import('./pages/Products/WholeEggPowderPage'));
const EggAlbumenPowderPage = lazy(() => import('./pages/Products/EggAlbumenPowderPage'));
const EggYolkPowderPage = lazy(() => import('./pages/Products/EggYolkPowderPage'));
const EggYolkPowderHeatStablePage = lazy(() => import('./pages/Products/EggYolkPowderHeatStablePage'));
const EggAlbumenLiquidPage = lazy(() => import('./pages/Products/EggAlbumenLiquidPage'));
const EggYolkLiquidPage = lazy(() => import('./pages/Products/EggYolkLiquidPage'));
const WholeEggLiquidPage = lazy(() => import('./pages/Products/WholeEggLiquidPage'));
const CustomizedMixPage = lazy(() => import('./pages/Products/CustomizedMixPage'));
const CustomizedPackagesPage = lazy(() => import('./pages/Products/CustomizedPackagesPage'));
const SpecialityEggLiquidPage = lazy(() => import('./pages/Products/SpecialityEggLiquidPage'));
const EggWhiteCubePage = lazy(() => import('./pages/Products/EggWhiteCubePage'));

const EggProcessingPlantPage = lazy(() => import('./pages/Infra/EggProcessingPlantPage'));
const PoultryFarmPage = lazy(() => import('./pages/Infra/PoultryFarmPage'));
const FeedMillPage = lazy(() => import('./pages/Infra/FeedMillPage'));
const LaboratoryPage = lazy(() => import('./pages/Infra/LaboratoryPage'));

const SkmJapanPage = lazy(() => import('./pages/Branches/SkmJapanPage'));
const SkmEuropePage = lazy(() => import('./pages/Branches/SkmEuropePage'));
const SkmRussiaPage = lazy(() => import('./pages/Branches/SkmRussiaPage'));

const SustainabilityCommunityPage = lazy(() => import('./pages/CSR/SustainabilityCommunityPage'));
const CommunityDevelopmentPage = lazy(() => import('./pages/CSR/CommunityDevelopmentPage'));
const TrustOutreachPage = lazy(() => import('./pages/CSR/TrustOutreachPage'));
const EducationPage = lazy(() => import('./pages/CSR/EducationPage'));
const SustainabilityPage = lazy(() => import('./pages/CSR/SustainabilityPage'));
const MdArticlePage = lazy(() => import('./pages/CSR/MdArticlePage'));

const Investors = lazy(() => import('./pages/Investors/Investors'));
const BrochurePage = lazy(() => import('./pages/Brochure/BrochurePage'));
const ContactUs = lazy(() => import('./pages/ContactUs/ContactUs'));

const JourneyPage = lazy(() => import('./pages/Journey/JourneyPage'));
const GetQuotePage = lazy(() => import('./pages/GetQuote/GetQuotePage'));
const ApplicationLandingPage = lazy(() => import('./pages/Applications/ApplicationLandingPage'));
const ApplicationsHubPage = lazy(() => import('./pages/Applications/ApplicationsHubPage'));
const ProductsHubPage = lazy(() => import('./pages/Products/ProductsHubPage'));
const EggPowdersCategoryPage = lazy(() => import('./pages/Products/EggPowdersCategoryPage'));
const LiquidEggCategoryPage = lazy(() => import('./pages/Products/LiquidEggCategoryPage'));
const CustomSpecialtyCategoryPage = lazy(() => import('./pages/Products/CustomSpecialtyCategoryPage'));
const WhySKMPage = lazy(() => import('./pages/WhySKM/WhySKMPage'));
const ManufacturingSupplyPage = lazy(() => import('./pages/Capabilities/ManufacturingSupplyPage'));
const InnovationCustomSolutionsPage = lazy(() => import('./pages/Innovation/InnovationCustomSolutionsPage'));
const GlobalReachPage = lazy(() => import('./pages/GlobalReach/GlobalReachPage'));
const ResourcesPage = lazy(() => import('./pages/Resources/ResourcesPage'));

// About Us Subpages
const AboutSKMPage = lazy(() => import('./pages/AboutUs/AboutSKMPage'));
const OurCompanyPage = lazy(() => import('./pages/AboutUs/OurCompanyPage'));
const VisionMissionPage = lazy(() => import('./pages/AboutUs/VisionMissionPage'));
const CoreIdeologyPage = lazy(() => import('./pages/AboutUs/CoreIdeologyPage'));
const BrandIdentityPage = lazy(() => import('./pages/AboutUs/BrandIdentityPage'));
const CeoMessagePage = lazy(() => import('./pages/AboutUs/CeoMessagePage'));
const AccoladesPage = lazy(() => import('./pages/AboutUs/AccoladesPage'));
const CoffeeTableBooksPage = lazy(() => import('./pages/AboutUs/CoffeeTableBooksPage'));
const EventsPage = lazy(() => import('./pages/AboutUs/EventsPage'));

// Quality Subpages
const PolicyPage = lazy(() => import('./pages/Quality/PolicyPage'));
const CertificationsPage = lazy(() => import('./pages/Quality/CertificationsPage'));
const QualityAssurancePage = lazy(() => import('./pages/Quality/QualityAssurancePage'));
const TraceabilityPage = lazy(() => import('./pages/Quality/TraceabilityPage'));
const QualityManagementSystemPage = lazy(() => import('./pages/Quality/QualityManagementSystemPage'));
const QualityFoodSafetyTraceabilityPage = lazy(() => import('./pages/Quality/QualityFoodSafetyTraceabilityPage'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  const getPageFromPath = () => {
    const path = window.location.pathname.replace(/^\//, '');
    return path || 'home';
  };

  const [activePage, setActivePage] = useState(getPageFromPath);
  const [prefill, setPrefill] = useState(() => window.history.state?.prefill ?? null);
  // Owned here (not Layout.jsx) because Layout only receives the already-
  // constructed page element as `children` — it can't reach into ContactUs to
  // add a prop. MobileStickyActions needs to know when the Contact enquiry
  // modal is open so it doesn't float on top of it.
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // `prefillData` carries context across the router — e.g. which product or
  // application a visitor came from, so the Get Quote flow can pre-fill Step 1
  // instead of asking again. Reuses the pushState mechanism already in place.
  const handlePageChange = (page, prefillData = null) => {
    setActivePage(page);
    setPrefill(prefillData);
    const path = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== path || prefillData) {
      window.history.pushState({ page, prefill: prefillData }, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    handlePageChange('home');
  };

  useEffect(() => {
    const handlePopState = (event) => {
      const page = event.state?.page || getPageFromPath();
      setActivePage(page);
      setPrefill(event.state?.prefill ?? null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Derived, not synced via effect: a stale `true` left over from a previous
  // Contact visit is naturally masked once activePage moves away from
  // 'contact-us', so MobileStickyActions can never stay hidden after leaving
  // the page — no separate reset effect needed.
  const suppressMobileActions =
    (isContactModalOpen && activePage === 'contact-us') || PRODUCT_DETAIL_ROUTES.has(activePage);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home onPageChange={handlePageChange} prefill={prefill} />;
      
      // About Us Subpages
      case 'about_skm':
        return <AboutSKMPage onPageChange={handlePageChange} />;
      case 'our_company':
      case 'about-company':
      case 'about-us': // Legacy fallback
        return <OurCompanyPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'vision_mission':
      case 'about-vision-mission':
        return <VisionMissionPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'core_ideology':
      case 'about-core-ideology':
        return <CoreIdeologyPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'brand_identity':
      case 'about-brand-identity':
        return <BrandIdentityPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'ceo_message':
      case 'about-ceo-message':
        return <CeoMessagePage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'accolades':
      case 'about-accolades':
        return <AccoladesPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'coffee_table_books':
      case 'about-coffee-table-books':
        return <CoffeeTableBooksPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'events':
      case 'about-events':
        return <EventsPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
        
      case 'products':
        return <ProductsHubPage onPageChange={handlePageChange} prefill={prefill} />;
      case 'category_powders':
        return <EggPowdersCategoryPage onPageChange={handlePageChange} />;
      case 'category_liquids':
        return <LiquidEggCategoryPage onPageChange={handlePageChange} />;
      case 'category_custom':
        return <CustomSpecialtyCategoryPage onPageChange={handlePageChange} />;
      case 'whole_egg_powder':
        return <WholeEggPowderPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'egg_albumen_powder':
        return <EggAlbumenPowderPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'egg_yolk_powder':
        return <EggYolkPowderPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'egg_yolk_powder_heat_stable':
        return <EggYolkPowderHeatStablePage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'egg_albumen_liquid':
        return <EggAlbumenLiquidPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'egg_yolk_liquid':
        return <EggYolkLiquidPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'whole_egg_liquid':
        return <WholeEggLiquidPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'customized_mix':
        return <CustomizedMixPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'customized_packages':
        return <CustomizedPackagesPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'speciality_egg_liquids':
        return <SpecialityEggLiquidPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'egg_white_cube':
        return <EggWhiteCubePage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      
      // Quality Subpages
      case 'policy':
      case 'quality-policy':
      case 'quality': // Legacy fallback
        return <PolicyPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'certifications':
      case 'quality-certifications':
        return <CertificationsPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'quality_assurance':
      case 'quality-assurance':
        return <QualityAssurancePage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'traceability':
      case 'quality-traceability':
        return <TraceabilityPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
      case 'quality_management_system':
      case 'quality-management-system':
        return <QualityManagementSystemPage onBackHome={navigateToHome} onPageChange={handlePageChange} />;
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
            onBackHome={navigateToHome}
            onPageChange={handlePageChange}
            prefill={prefill}
            onModalVisibilityChange={setIsContactModalOpen}
          />
        );

      case 'journey':
        return <JourneyPage onPageChange={handlePageChange} />;
      case 'get-quote':
        return <GetQuotePage onPageChange={handlePageChange} prefill={prefill} />;

      case 'applications':
        return <ApplicationsHubPage onPageChange={handlePageChange} />;

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

  return (
    <>
      <CustomCursor />
      <Layout activePage={activePage} onPageChange={handlePageChange} suppressMobileActions={suppressMobileActions}>
        <AnimatePresence mode="wait">
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
      </Layout>
    </>
  );
}

export default App;

