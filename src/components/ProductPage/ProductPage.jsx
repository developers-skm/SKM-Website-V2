import SEO from '../SEO/SEO';
import ProductHero from './ProductHero';
import VariantExplorer from './VariantExplorer';
import FunctionalPerformance from './FunctionalPerformance';
import ApplicationGallery from './ApplicationGallery';
import PackagingLogistics from './PackagingLogistics';
import { ProductQualityAssurance } from '../Traceability/TraceabilityLoopJourney';
import ProductDocuments from './ProductDocuments';
import RelatedProducts from './RelatedProducts';
import EnquiryCTABand from '../common/EnquiryCTABand';
import CurvedDivider from '../SectionContainer/CurvedDivider';
import { getRelatedProducts, getTdsUrl, getProductById } from '../../data/products';

// Shared shell for all 11 product detail pages (Whole Egg Powder, Egg Yolk
// Powder, Egg Albumen Liquid, etc.) - composed from focused sub-components.
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
  variantNamesTable,
  variantStaticFilters,
  packTypesText,
  extraDocuments,
  visibleTraits,
}) {
  const displayCode = codeDisplay ?? ((code) => code);
  const relatedProducts = productId ? getRelatedProducts(productId, 3) : [];
  const tdsUrl = productId ? getTdsUrl(productId) : null;
  const productRecord = productId ? getProductById(productId) : null;

  return (
    <div className="w-full flex flex-col bg-white font-body text-left">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        jsonLd={seo.jsonLd}
      />

      {/* Hero chapter - warm white, breadcrumb folded into the same visual
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
          applicationTags={hero.applicationTags}
          tdsUrl={tdsUrl}
          onRequestQuote={() => onPageChange('get-quote', { productId })}
          onRequestPricing={() => onPageChange('get-quote', { productId })}
        />
      </div>


      {/* Variant specifications - light eggshell chapter */}
      <section className="w-full bg-[#f8f4ee] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
          <VariantExplorer
            variantsData={variantsData}
            variantNamesTable={variantNamesTable}
            variantStaticFilters={variantStaticFilters}
            variantsSectionSubtitle={variantsSectionSubtitle}
            productName={productName}
            displayCode={displayCode}
            packagingOptions={productRecord?.packagingOptions}
            onPageChange={onPageChange}
          />
        </div>
      </section>

      <CurvedDivider cards bg="#f8f4ee" fill="#fff" />

      {/* Functional performance - white chapter */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
          <FunctionalPerformance
            variantsData={variantsData}
            productName={productName}
            visibleTraits={visibleTraits}
            tdsUrl={tdsUrl}
            onDiscussPerformance={() => onPageChange('contact-us')}
          />
        </div>
      </section>

      <CurvedDivider cards bg="#fff" fill="#f8f4ee" />

      {/* Applications - light eggshell chapter */}
      <section className="w-full bg-[#f8f4ee] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
          <ApplicationGallery applicationsData={applicationsData} productName={productName} />
        </div>
      </section>

      {/* Packaging and dispatch - white chapter */}
      {productRecord ? (
        <>
        <CurvedDivider cards bg="#f8f4ee" fill="#fff" />
        <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
            <PackagingLogistics
              packagingOptions={productRecord.packagingOptions}
              packTypesText={packTypesText}
              variantsData={variantsData}
              onViewPackaging={() => onPageChange('customised_packages')}
              onDiscussDelivery={() => onPageChange('contact-us')}
            />
          </div>
        </section>
        <CurvedDivider cards bg="#fff" fill="#FAFAF8" />
        </>
      ) : (
        <CurvedDivider cards bg="#f8f4ee" fill="#FAFAF8" />
      )}

      {/* Quality Assurance + certifications - cream chapter */}
      <ProductQualityAssurance />

      <CurvedDivider cards bg="#FAFAF8" fill="#fff" />

      {/* Documents - white chapter */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
          <ProductDocuments
            tdsUrl={tdsUrl}
            productName={productName}
            extraDocuments={extraDocuments}
            onRequestPack={() => onPageChange('contact-us')}
          />
        </div>
      </section>

      {/* Related products - light eggshell chapter */}
      {relatedProducts.length > 0 ? (
        <>
        <CurvedDivider cards bg="#fff" fill="#f8f4ee" />
        <section className="w-full bg-[#f8f4ee] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
            <RelatedProducts products={relatedProducts} currentCategory={productRecord?.category} onPageChange={onPageChange} />
          </div>
        </section>
        <CurvedDivider cards bg="#f8f4ee" fill="#fdf1f0" />
        </>
      ) : (
        <CurvedDivider cards bg="#fff" fill="#fdf1f0" />
      )}

      {/* Final CTA - soft red-tinted chapter, calm handoff into the footer. */}
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
