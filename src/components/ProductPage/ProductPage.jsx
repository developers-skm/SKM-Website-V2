import SEO from '../SEO/SEO';
import ProductHero from './ProductHero';
import StickyProductBar from './StickyProductBar';
import SpecPanel from './SpecPanel';
import VariantExplorer from './VariantExplorer';
import FunctionalPerformance from './FunctionalPerformance';
import ApplicationGallery from './ApplicationGallery';
import RecommendedApplications from './RecommendedApplications';
import PackagingLogistics from './PackagingLogistics';
import TraceWidget from './TraceWidget';
import ProductDocuments from './ProductDocuments';
import RelatedProducts from './RelatedProducts';
import EnquiryCTABand from '../common/EnquiryCTABand';
import { getRelatedProducts, getTdsUrl, getProductById } from '../../data/products';

// Shared shell for all 11 product detail pages (Whole Egg Powder, Egg Yolk
// Powder, Egg Albumen Liquid, etc.) — composed from focused sub-components.
//
// Each section gets its own warm, deliberately different background (white
// / eggshell / warm-neutral) so the page reads as distinct chapters.
export default function ProductPage({
  seo,
  onPageChange,
  hero,
  variantsData,
  variantsSectionSubtitle,
  applicationsData,
  productName,
  productId,
  codeDisplay,
}) {
  const displayCode = codeDisplay ?? ((code) => code);
  const relatedProducts = productId ? getRelatedProducts(productId, 3) : [];
  const tdsUrl = productId ? getTdsUrl(productId) : null;
  const productRecord = productId ? getProductById(productId) : null;

  return (
    <div className="w-full flex flex-col bg-white font-body text-left">
      <StickyProductBar
        productName={productName}
        tdsUrl={tdsUrl}
        onRequestSample={() => onPageChange('get-quote', { productId })}
        onRequestQuote={() => onPageChange('get-quote', { productId })}
      />
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        jsonLd={seo.jsonLd}
      />

      {/* Hero chapter — warm white, breadcrumb folded into the same visual
          block instead of its own full-width grey bar */}
      <div className="w-full bg-white">
        <ProductHero
          backgroundImage={hero.backgroundImage}
          backgroundAlt={hero.backgroundAlt}
          categoryLabel={hero.categoryLabel}
          titleLine1={hero.titleLine1}
          titleLine2={hero.titleLine2}
          description={hero.description}
          primaryBadge={hero.primaryBadge}
          variantsData={variantsData}
          applicationsData={applicationsData}
          tdsUrl={tdsUrl}
          onRequestQuote={() => onPageChange('get-quote', { productId })}
          onRequestPricing={() => onPageChange('get-quote', { productId })}
        />
      </div>

      {/* At-a-glance specification panel — white chapter, sits directly
          beneath the hero per brief §2 ordering */}
      {productRecord && (
        <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
            <SpecPanel
              productForm={productRecord.category}
              packagingOptions={productRecord.packagingOptions}
              variantsData={variantsData}
              tdsUrl={tdsUrl}
              onAskTechnicalQuestion={() => onPageChange('contact-us')}
            />
          </div>
        </section>
      )}

      {/* Variant specifications — light eggshell chapter */}
      <section className="w-full bg-[#f8f4ee] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
          <VariantExplorer
            variantsData={variantsData}
            variantsSectionSubtitle={variantsSectionSubtitle}
            productName={productName}
            displayCode={displayCode}
            packagingOptions={productRecord?.packagingOptions}
            onPageChange={onPageChange}
          />
        </div>
      </section>

      {/* Functional performance — white chapter */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
          <FunctionalPerformance
            variantsData={variantsData}
            productName={productName}
            tdsUrl={tdsUrl}
            onDiscussPerformance={() => onPageChange('contact-us')}
          />
        </div>
      </section>

      {/* Applications — light eggshell chapter */}
      <section className="w-full bg-[#f8f4ee] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
          <ApplicationGallery applicationsData={applicationsData} productName={productName} />
        </div>
      </section>

      {/* Recommended applications — white chapter */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
          <RecommendedApplications
            applicationsData={applicationsData}
            variantsData={variantsData}
            displayCode={displayCode}
            onPageChange={onPageChange}
          />
        </div>
      </section>

      {/* Packaging and logistics — light eggshell chapter */}
      {productRecord && (
        <section className="w-full bg-[#f8f4ee] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
            <PackagingLogistics
              packagingOptions={productRecord.packagingOptions}
              variantsData={variantsData}
              onViewPackaging={() => onPageChange('customized_packages')}
              onDiscussDelivery={() => onPageChange('contact-us')}
            />
          </div>
        </section>
      )}

      {/* Traceability — warm cream chapter, the major trust section */}
      <section className="w-full bg-[#f6f1e9] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
          <TraceWidget onPageChange={onPageChange} productName={productName} productCategory={productRecord?.category} />
        </div>
      </section>

      {/* Documents — white chapter */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
          <ProductDocuments
            tdsUrl={tdsUrl}
            productName={productName}
            onRequestPack={() => onPageChange('contact-us')}
          />
        </div>
      </section>

      {/* Related products — light eggshell chapter */}
      {relatedProducts.length > 0 && (
        <section className="w-full bg-[#f8f4ee] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
            <RelatedProducts products={relatedProducts} currentCategory={productRecord?.category} onPageChange={onPageChange} />
          </div>
        </section>
      )}

      {/* Final CTA — soft red-tinted chapter, calm handoff into the footer. */}
      <EnquiryCTABand
        eyebrow={hero.categoryLabel}
        heading={productName}
        actions={[
          { label: 'Request Sample / Get Quote', onClick: () => onPageChange('get-quote', { productId }) },
        ]}
      />
    </div>
  );
}
