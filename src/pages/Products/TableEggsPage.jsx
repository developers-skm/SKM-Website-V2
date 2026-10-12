import { motion, useReducedMotion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import SafeImage from '../../components/common/SafeImage';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';
import EggCollectionArea from '../../assets/5. INFRASTRUCTURE/Poultry farm/Egg collection area.webp';
import EggCollectingConveyor from '../../assets/5. INFRASTRUCTURE/Poultry farm/Egg collecting conveyor.webp';
import ECShedOverview from '../../assets/5. INFRASTRUCTURE/Poultry farm/EC shed overview.webp';
import FeederView from '../../assets/5. INFRASTRUCTURE/Poultry farm/Feeder view.webp';

// Table Eggs (shell eggs) product-family page. Copy is rewritten from the
// published SKM poultry farm / quality pages. Deliberately omitted because no
// verified source exists: egg sizes/grades, shell colours, packaging, MOQ,
// shelf life, storage, export markets, pricing, product-specific
// certifications, nutrition/health claims, and capacity/output figures.
// Images are SKM-owned farm photographs already used on the Poultry Farm page.

const iconProps = {
  className: 'w-6 h-6',
  fill: 'none',
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const strengths = [
  {
    title: 'Integrated Poultry Farming',
    body: 'Our integrated poultry farming practices prioritize bird health, hygiene, and efficient farm management to ensure consistent production of high-quality shell eggs.',
    icon: (
      <svg {...iconProps}>
        <path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-5h4v5" />
      </svg>
    ),
  },
  {
    title: 'Balanced Poultry Nutrition',
    body: 'Our layer hens receive a balanced maize- and grain-based diet, included with essential vitamins and minerals to support their health and consistent egg production.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 21V8M12 8c0-2.5-2-4-4.5-4 0 2.5 2 4 4.5 4zm0 5c0-2.5-2-4-4.5-4 0 2.5 2 4 4.5 4zm0 5c0-2.5-2-4-4.5-4 0 2.5 2 4 4.5 4zM12 8c0-2.5 2-4 4.5-4 0 2.5-2 4-4.5 4zm0 5c0-2.5 2-4 4.5-4 0 2.5-2 4-4.5 4zm0 5c0-2.5 2-4 4.5-4 0 2.5-2 4-4.5 4z" />
      </svg>
    ),
  },
  {
    title: 'Biosecurity & Hygiene',
    body: 'Farm sanitation and preventive biosecurity measures help maintain hygienic production environments.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3zM9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Routine Quality Monitoring',
    body: 'Regular testing of water, tissues and shell egg samples supports quality monitoring.',
    icon: (
      <svg {...iconProps}>
        <path d="M9 3h6M10 3v6l-5 9.2A2 2 0 006.8 21h10.4a2 2 0 001.8-2.8L14 9V3M8 15h8" />
      </svg>
    ),
  },
];

const qualityPoints = [
  { title: 'Routine sample testing', body: 'Water, bird tissue and shell egg samples are examined in the farm laboratory.' },
  { title: 'Hygiene controls', body: 'Established sanitation and biosecurity procedures support clean farm environments.' },
  { title: 'Structured safety practices', body: 'Documented quality and food safety systems guide day-to-day farm operations.' },
];

const wrap = 'mx-auto max-w-[1440px] w-full px-5 sm:px-8 lg:px-[88px]';
const eyebrow = 'section-label';
const h2Class = 'font-heading font-bold text-[32px] sm:text-[38px] lg:text-[42px] text-heading leading-[1.15]! tracking-tight m-0';
const bodyClass = 'font-body text-[16px] leading-[1.75] text-surface-500 m-0';

const btnBase =
  'inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3 rounded-full font-heading font-bold text-[13px] uppercase tracking-[0.04em] text-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2';
const primaryBtn = `${btnBase} bg-brand-600 hover:bg-brand-700 text-white`;
const secondaryBtn = `${btnBase} border border-brand-600 text-brand-600 bg-white hover:bg-brand-600/6`;

// Fixed-ratio frame so the layout never shifts; `position` sets the focal
// point. Falls back to a neutral "Image Coming Soon" tile if no source.
function ImageFrame({ src, alt, ratio = '4 / 3', position = 'center', priority = false, className = '' }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[20px] border border-surface-200/70 bg-surface-100 shadow-[0_16px_44px_rgba(36,30,24,0.10)] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <SafeImage
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: position }}
        />
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
    viewport: { once: true, margin: '-80px' },
    transition: { duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : delay, ease: [0.25, 1, 0.5, 1] },
  });

  return (
    <PageWrapper
      seo={{
        // SEO.jsx appends " | SKM Egg Products" itself.
        title: 'Table Eggs',
        description: 'Explore SKM Table Eggs and our integrated poultry farming practices, including balanced poultry nutrition, biosecurity and routine quality monitoring.',
        keywords: 'table eggs, shell eggs, integrated poultry farming, poultry biosecurity, egg quality, SKM Egg Products',
        canonical: 'https://www.skmegg.com/table_eggs',
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page overflow-x-clip">

        {/* 1 · Hero */}
        <section className="w-full pt-[110px] pb-[60px] sm:pt-[130px] lg:pt-[140px] lg:pb-[90px] bg-page">
          <div className={`${wrap} grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center`}>
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
              <span className={eyebrow}>Table Eggs</span>
              <h1 className="font-heading font-bold text-[38px] sm:text-[48px] lg:text-[54px] text-heading leading-[1.1]! tracking-tight m-0">
                Farm-Fresh Eggs, Backed by Responsible Farming
              </h1>
              <p className={`${bodyClass} text-[17px] max-w-[52ch]`}>
                Produced through SKM&apos;s integrated poultry operations, our shell eggs reflect careful feed management, farm hygiene and ongoing quality monitoring.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
                <InternalLink route="get-quote" onPageChange={onPageChange} className={primaryBtn}>
                  Enquire About Table Eggs
                </InternalLink>
                <InternalLink route="poultry_farm" onPageChange={onPageChange} className={secondaryBtn}>
                  Explore Our Poultry Farms
                </InternalLink>
              </div>
            </motion.div>
            <motion.div {...fade(0.1)}>
              <ImageFrame
                src={EggCollectionArea}
                alt="SKM poultry farm team handling freshly collected shell eggs at the egg collection area"
                ratio="5 / 4"
                position="45% 50%"
                priority
                className="lg:rounded-[28px]"
              />
            </motion.div>
          </div>
        </section>

        <CurvedDivider bg="#ececec" fill="#fff" />
        {/* 2 · About */}
        <section className="w-full py-[64px] lg:py-[96px] bg-white">
          <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
            <motion.div {...fade()} className="order-2 lg:order-1">
              <ImageFrame
                src={FeederView}
                alt="Feed silo and feed delivery vehicle at an SKM poultry farm"
                ratio="4 / 3"
                position="60% 45%"
              />
            </motion.div>
            <motion.div {...fade(0.1)} className="order-1 lg:order-2 flex flex-col gap-5 max-w-[560px]">
              <span className={eyebrow}>Integrated Poultry Operations</span>
              <h2 className={h2Class}>Quality Begins Long Before Collection</h2>
              <p className={bodyClass}>
                Our integrated approach combines balanced poultry feed, carefully managed farm environments and systematic monitoring. Each aspect of poultry management contributes to bird health and consistent shell egg quality.
              </p>
            </motion.div>
          </div>
        </section>

        <CurvedDivider bg="#fff" fill="#ececec" />
        {/* 3 · Farming strengths */}
        <section className="w-full py-[64px] lg:py-[96px] bg-page">
          <div className={`${wrap} flex flex-col gap-10 lg:gap-12`}>
            <motion.div {...fade()} className="flex flex-col gap-4 max-w-[640px]">
              <span className={eyebrow}>Our Farming Strengths</span>
              <h2 className={h2Class}>Quality Starts at the Farm</h2>
              <p className={bodyClass}>Four essential practices shape our approach to table egg production.</p>
            </motion.div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 list-none m-0 p-0">
              {strengths.map((s, i) => (
                <motion.li key={s.title} {...fade(i * 0.05)} className="flex">
                  <article className="group flex flex-col w-full p-6 sm:p-7 rounded-[18px] bg-white border border-surface-200/70 shadow-[0_8px_28px_rgba(36,30,24,0.06)] transition-[transform,box-shadow,border-color] duration-300 motion-safe:hover:-translate-y-1 hover:border-brand-600/30 hover:shadow-[0_14px_36px_rgba(36,30,24,0.12)]">
                    <div className="flex items-center justify-center w-12 h-12 rounded-[12px] bg-brand-600/8 text-brand-600 mb-5">
                      {s.icon}
                    </div>
                    <h3 className="font-heading font-semibold text-[17px] text-heading leading-[1.3]! tracking-tight m-0 mb-2.5">
                      {s.title}
                    </h3>
                    <p className="font-body text-[15px] leading-[1.6] text-surface-500 m-0">
                      {s.body}
                    </p>
                  </article>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        <CurvedDivider bg="#ececec" fill="#fff" />
        {/* 4 · Quality commitment */}
        <section className="w-full py-[64px] lg:py-[96px] bg-white">
          <div className={`${wrap} grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-center`}>
            <motion.div {...fade()} className="flex flex-col gap-6">
              <div className="flex flex-col gap-5 max-w-[560px]">
                <span className={eyebrow}>Our Quality Commitment</span>
                <h2 className={h2Class}>Carefully Monitored, Every Step of the Way</h2>
                <p className={bodyClass}>
                  Farm-level quality practices include routine monitoring of water, bird health and shell egg samples. Supported by established sanitation and biosecurity procedures, these checks help maintain a systematic approach to egg quality.
                </p>
              </div>
              <ul className="list-none m-0 p-0 flex flex-col max-w-[560px] divide-y divide-surface-200/70 border-y border-surface-200/70">
                {qualityPoints.map((p, i) => (
                  <li key={p.title} className="flex items-start gap-4 py-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-600/8 text-brand-600 font-heading font-bold text-[13px] flex-shrink-0" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-heading font-semibold text-[16px] text-heading m-0 leading-[1.3]!">{p.title}</h3>
                      <p className="font-body text-[14.5px] leading-[1.6] text-surface-500 m-0 mt-1">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fade(0.1)}>
              <ImageFrame
                src={EggCollectingConveyor}
                alt="Shell eggs on a collection conveyor between layer cages inside an SKM poultry shed"
                ratio="4 / 3"
                position="50% 55%"
              />
            </motion.div>
          </div>
        </section>

        <CurvedDivider bg="#fff" fill="#ececec" />
        {/* 5 · Infrastructure - full-width banner, text row beneath */}
        <section className="w-full pt-[64px] lg:pt-[96px] pb-[64px] lg:pb-[96px] bg-page">
          <div className={wrap}>
            <motion.div {...fade()}>
              <ImageFrame
                src={ECShedOverview}
                alt="Aerial view of environmentally controlled layer sheds at an SKM poultry farm"
                ratio="16 / 9"
                position="50% 50%"
                className="sm:aspect-[2/1]! lg:aspect-[21/9]!"
              />
            </motion.div>
            <motion.div
              {...fade(0.1)}
              className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-16 items-start"
            >
              <div className="flex flex-col gap-4">
                <span className={eyebrow}>Our Infrastructure</span>
                <h2 className={h2Class}>An Integrated Approach to Egg Production</h2>
              </div>
              <div className="flex flex-col gap-5 lg:pt-8">
                <p className={bodyClass}>
                  SKM&apos;s poultry farming infrastructure brings together managed poultry facilities, feed practices and routine monitoring to support consistent egg production operations.
                </p>
                <InternalLink
                  route="poultry_farm"
                  onPageChange={onPageChange}
                  className="group/link inline-flex items-center gap-2 w-fit font-body font-semibold text-[15px] text-brand-600 hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
                >
                  Explore our poultry farm
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform duration-200 group-hover/link:translate-x-0.5" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </InternalLink>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 6 · Closing CTA */}
        <section className="w-full pb-[64px] lg:pb-[96px] bg-page">
          <div className={wrap}>
            <motion.div
              {...fade()}
              className="rounded-[24px] bg-[#fdf1f0] border border-brand-600/10 px-6 py-10 sm:px-12 sm:py-12 lg:px-16 lg:py-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
            >
              <div className="flex flex-col gap-3 max-w-[560px]">
                <h2 className={h2Class}>Let&apos;s Talk Table Eggs</h2>
                <p className={bodyClass}>
                  Connect with the SKM team to discuss table egg availability and your business requirements.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <InternalLink route="get-quote" onPageChange={onPageChange} className={primaryBtn}>
                  Enquire Now
                </InternalLink>
                <InternalLink route="contact-us" onPageChange={onPageChange} className={secondaryBtn}>
                  Contact Us
                </InternalLink>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
