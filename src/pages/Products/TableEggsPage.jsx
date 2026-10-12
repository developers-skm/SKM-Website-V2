import { motion, useReducedMotion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import SafeImage from '../../components/common/SafeImage';
import IconInfoCard from '../../components/common/IconInfoCard';
import EggCollectionArea from '../../assets/5. INFRASTRUCTURE/Poultry farm/Egg collection area.webp';
import EggCollectingConveyor from '../../assets/5. INFRASTRUCTURE/Poultry farm/Egg collecting conveyor.webp';
import ECShedOverview from '../../assets/5. INFRASTRUCTURE/Poultry farm/EC shed overview.webp';

// Table Eggs (shell eggs) product-family page. Copy is rewritten from the
// published SKM poultry farm / quality pages. Deliberately omitted because no
// verified source exists: egg sizes/grades, shell colours, packaging, MOQ,
// shelf life, storage, export markets, pricing, product-specific
// certifications, nutrition/health claims, and current output figures.
// Images are SKM-owned farm photographs already used on the Poultry Farm page.

const iconProps = { className: 'w-5 h-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 };

const strengths = [
  {
    title: 'Integrated Poultry Farming',
    body: 'Our integrated poultry operations provide structured oversight of farming practices, supporting consistent management of bird health and egg quality.',
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: 'Balanced Poultry Nutrition',
    body: 'Birds receive a nutritious diet based primarily on maize and grains, supplemented with essential vitamins and minerals to support their health and egg production.',
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 8c0-2.5-2-4-4.5-4 0 2.5 2 4 4.5 4zm0 5c0-2.5-2-4-4.5-4 0 2.5 2 4 4.5 4zm0-5c0-2.5 2-4 4.5-4 0 2.5-2 4-4.5 4zm0 5c0-2.5 2-4 4.5-4 0 2.5-2 4-4.5 4z" />
      </svg>
    ),
  },
  {
    title: 'Biosecurity & Hygiene',
    body: 'Strict farm biosecurity practices, regular sanitation and disinfection procedures help maintain hygienic environments and support disease prevention.',
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Routine Quality Monitoring',
    body: 'Farm laboratory testing includes the examination of water, bird tissue and shell egg samples to monitor bird health and egg quality.',
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6M10 3v6l-5 9a2 2 0 001.8 3h10.4a2 2 0 001.8-3l-5-9V3M8 15h8" />
      </svg>
    ),
  },
];

const highlights = [
  'Integrated poultry operations',
  'Balanced feed management',
  'Farm biosecurity and sanitation',
  'Routine laboratory monitoring',
  'Quality and food safety systems',
];

const primaryBtn =
  'inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2';
const secondaryBtn =
  'inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 hover:bg-brand-600/6 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2';

// Fixed-ratio frame so the layout never shifts, with a neutral
// "Image Coming Soon" fallback if a source is ever missing.
function ImageFrame({ src, alt, ratio = '4 / 3' }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[20px] border border-surface-200/70 bg-surface-100 shadow-[0_16px_44px_rgba(36,30,24,0.10)]"
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <SafeImage src={src} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div role="img" aria-label="Image coming soon" className="absolute inset-0 flex items-center justify-center font-body text-[14px] font-semibold text-surface-400">
          Image Coming Soon
        </div>
      )}
    </div>
  );
}

export default function TableEggsPage({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : delay, ease: [0.25, 1, 0.5, 1] },
  });
  const wrap = 'mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8';
  const h2 = 'font-heading font-bold text-[30px] sm:text-[38px] lg:text-[42px] text-heading leading-[1.1] tracking-tight m-0';

  return (
    <PageWrapper
      seo={{
        title: 'Table Eggs | SKM Egg Products',
        description: 'Explore SKM Table Eggs and our integrated poultry farming practices, including balanced poultry nutrition, biosecurity and routine quality monitoring.',
        keywords: 'table eggs, shell eggs, integrated poultry farming, poultry biosecurity, egg quality, SKM Egg Products',
        canonical: 'https://www.skmegg.com/table_eggs',
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page overflow-hidden">

        {/* Hero */}
        <section className="w-full pt-[110px] pb-[60px] sm:pt-[130px] lg:pb-[85px] border-b border-[#eee]">
          <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center`}>
            <motion.div {...fade()} className="flex flex-col gap-6 items-start">
              <nav aria-label="Breadcrumb" className="font-body text-[13px] text-surface-500">
                <ol className="flex flex-wrap items-center gap-2 list-none m-0 p-0">
                  <li>
                    <InternalLink route="products" onPageChange={onPageChange} className="hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm">
                      Products
                    </InternalLink>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-heading font-semibold">Table Eggs</li>
                </ol>
              </nav>
              <span className="section-label">Table Eggs</span>
              <h1 className="font-heading font-bold text-[38px] sm:text-[48px] lg:text-[54px] text-heading leading-[1.1] tracking-tight m-0">
                Farm-Fresh Eggs. Quality You Can Trust.
              </h1>
              <p className="font-body text-[16px] leading-[30px] text-surface-500 max-w-xl m-0">
                SKM&apos;s integrated poultry operations focus on producing quality shell eggs through carefully managed farming practices. With balanced poultry nutrition, strict biosecurity measures and routine quality monitoring, we maintain a strong commitment to egg quality and food safety.
              </p>
              <InternalLink route="get-quote" onPageChange={onPageChange} className={primaryBtn}>
                Enquire Now
              </InternalLink>
            </motion.div>
            <motion.div {...fade(0.1)}>
              <ImageFrame src={EggCollectionArea} alt="SKM poultry farm team handling freshly collected shell eggs at the egg collection area" />
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section className="w-full py-[60px] lg:py-[85px] bg-white border-b border-[#eee]">
          <div className={`${wrap} max-w-[1000px] flex flex-col gap-6`}>
            <motion.div {...fade()} className="flex flex-col gap-3">
              <span className="section-label">About Our Table Eggs</span>
              <h2 className={h2}>Quality Begins at the Farm</h2>
            </motion.div>
            <motion.div {...fade(0.05)} className="flex flex-col gap-4 font-body text-[16px] leading-[30px] text-surface-500">
              <p className="m-0">
                At SKM, egg quality begins with responsible poultry farming. Our integrated operations bring together carefully formulated feed, hygienic farm environments and systematic monitoring practices to support the production of quality shell eggs.
              </p>
              <p className="m-0">
                From bird nutrition and farm sanitation to routine laboratory examinations, each stage receives careful attention to maintain consistent quality.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Strengths */}
        <section className="w-full py-[60px] lg:py-[85px] border-b border-[#eee]">
          <div className={`${wrap} flex flex-col gap-10`}>
            <motion.div {...fade()} className="flex flex-col gap-3">
              <span className="section-label">Our Farming Strengths</span>
              <h2 className={h2}>Our Approach to Quality Egg Production</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {strengths.map((s, i) => (
                <motion.div key={s.title} {...fade(i * 0.05)}>
                  <IconInfoCard icon={s.icon} title={s.title} body={s.body} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality & food safety */}
        <section className="w-full py-[60px] lg:py-[85px] bg-white border-b border-[#eee]">
          <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center`}>
            <motion.div {...fade()} className="order-2 lg:order-1">
              <ImageFrame src={EggCollectingConveyor} alt="Shell eggs on an egg collection conveyor inside an SKM layer shed" />
            </motion.div>
            <motion.div {...fade(0.1)} className="order-1 lg:order-2 flex flex-col gap-5">
              <span className="section-label">Quality &amp; Food Safety</span>
              <h2 className={h2}>Committed to Egg Quality and Safety</h2>
              <p className="font-body text-[16px] leading-[30px] text-surface-500 m-0">
                Quality assurance is central to SKM&apos;s integrated operations. Our documented systems include farm-level monitoring, laboratory analysis, hygiene controls and structured food safety practices.
              </p>
              <p className="font-body text-[16px] leading-[30px] text-surface-500 m-0">
                By combining poultry management with quality monitoring, SKM maintains a systematic approach to supporting the safety and consistency of egg production.
              </p>
              <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 font-body text-[15px] text-surface-700">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="w-full py-[60px] lg:py-[85px] border-b border-[#eee]">
          <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center`}>
            <motion.div {...fade()} className="flex flex-col gap-5">
              <span className="section-label">Farming Infrastructure</span>
              <h2 className={h2}>Supported by Integrated Farming Infrastructure</h2>
              <p className="font-body text-[16px] leading-[30px] text-surface-500 m-0">
                SKM&apos;s poultry farming infrastructure forms part of its backward-integrated egg operations. Dedicated poultry facilities, coordinated feed management and established farm monitoring practices help support consistent production and quality control.
              </p>
              <InternalLink route="poultry_farm" onPageChange={onPageChange} className="font-body font-semibold text-[15px] text-brand-600 hover:text-brand-700 underline underline-offset-4 decoration-brand-600/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm w-fit">
                Explore our poultry farm
              </InternalLink>
            </motion.div>
            <motion.div {...fade(0.1)}>
              <ImageFrame src={ECShedOverview} alt="Aerial view of environmentally controlled layer sheds at an SKM poultry farm" />
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-[#fdf1f0] py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[900px] w-full px-5 sm:px-8 flex flex-col items-center text-center gap-5">
            <h2 className="font-heading font-bold text-[28px] sm:text-[36px] text-heading m-0 tracking-tight leading-[1.15]">
              Looking for Quality Table Eggs?
            </h2>
            <p className="font-body text-[16px] leading-[28px] text-surface-500 max-w-xl m-0">
              Connect with the SKM team to learn more about our table egg operations, product availability and supply requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <InternalLink route="get-quote" onPageChange={onPageChange} className={primaryBtn}>
                Enquire Now
              </InternalLink>
              <InternalLink route="contact-us" onPageChange={onPageChange} className={secondaryBtn}>
                Contact Us
              </InternalLink>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
