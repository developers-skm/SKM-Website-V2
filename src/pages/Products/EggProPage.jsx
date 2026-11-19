import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import useMediaQuery from '../../components/GlobalEvents/useMediaQuery';
import SEO from '../../components/SEO/SEO';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';
import ProductDocuments from '../../components/ProductPage/ProductDocuments';
import RecentlyViewed from '../../components/ProductPage/RecentlyViewed';
import { useRecentlyViewed } from '../../utils/recentlyViewed';
import { containerVariants, itemVariants } from '../../utils/animationVariants';
import LifePack from '../../assets/3. PRODUCTS/Speciality products/EggPro/eggpro-life-500g.webp';
import AlbumenPack from '../../assets/3. PRODUCTS/Speciality products/EggPro/eggpro-albumen-500g.webp';
import VanillaPack500 from '../../assets/3. PRODUCTS/Speciality products/EggPro Sports/vanilla-500g.webp';
import VanillaPack1kg from '../../assets/3. PRODUCTS/Speciality products/EggPro Sports/vanilla-1kg.webp';
import VanillaSachet from '../../assets/3. PRODUCTS/Speciality products/EggPro Sports/vanilla-sachet-box.webp';
import StrawberryPack500 from '../../assets/3. PRODUCTS/Speciality products/EggPro Sports/strawberry-500g.webp';
import StrawberryPack1kg from '../../assets/3. PRODUCTS/Speciality products/EggPro Sports/strawberry-1kg.webp';
import StrawberrySachet from '../../assets/3. PRODUCTS/Speciality products/EggPro Sports/strawberry-sachet-box.webp';

// SPORTS+ pack shots by flavour and pack.
const SPORTS_FLAVOURS = ['Vanilla', 'Strawberry'];
const SPORTS_PACKS = [
  { id: '500g', label: '500 g Jar' },
  { id: '1kg', label: '1 kg Jar' },
  { id: 'sachet', label: '35 g Sachets (Box of 10)' },
];
const SPORTS_IMAGES = {
  Vanilla: { '500g': VanillaPack500, '1kg': VanillaPack1kg, sachet: VanillaSachet },
  Strawberry: { '500g': StrawberryPack500, '1kg': StrawberryPack1kg, sachet: StrawberrySachet },
};

const checkIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const VARIANTS = [
  {
    id: 'life',
    name: 'EGGPRO LIFE',
    tab: 'EGGPRO LIFE',
    badge: { value: '11.4 g', label: 'Protein per 30 g serving' },
    subtitle: 'Egg White Instant Protein Mix',
    headline: 'Everyday Protein Nutrition for an Active Life',
    highlights: '11.4 g Protein Per Serving | Low Fat | Egg White & Milk Protein',
    tagline: 'Everyday Protein. Simple Nutrition.',
    description: [
      'EGGPRO LIFE is a convenient and delicious instant protein drink mix made with a combination of Egg Albumen Powder and Skimmed Milk Powder.',
      'Each 30 g serving provides 11.4 g of protein, helping adults supplement their daily protein intake as part of a balanced diet.',
      'Egg white protein is a complete protein containing all nine essential amino acids. Protein contributes to the growth and maintenance of body tissues and plays an important role in everyday nutrition.',
      'EGGPRO LIFE combines the nutritional value of egg white and milk-derived proteins in an easy-to-prepare drink.',
    ],
    stats: [
      { label: 'Protein / Serving', value: '11.4 g' },
      { label: 'Serving Size', value: '30 g' },
      { label: 'Fat / Serving', value: '0.21 g' },
      { label: 'Amino Acids', value: 'All 9 Essential' },
    ],
    whyTitle: 'Why Choose EGGPRO LIFE?',
    why: [
      { title: '11.4 g Protein Per Serving', text: 'A convenient addition to your daily dietary protein intake.' },
      { title: 'Egg White Protein', text: 'Contains all nine essential amino acids.' },
      { title: 'Egg & Milk Protein Combination', text: 'Made with egg albumen powder and skimmed milk powder.' },
      { title: 'Low Fat', text: 'Contains only 0.21 g fat per 30 g serving.' },
      { title: 'Easy to Prepare', text: 'A convenient instant protein drink mix.' },
      { title: 'Everyday Nutrition', text: 'Helps adults meet their dietary protein requirements as part of a balanced diet.' },
    ],
    recommended: [
      'Adults seeking additional dietary protein.',
      'Individuals following an active lifestyle.',
      'Adults looking for convenient protein supplementation.',
      'Individuals wishing to complement their regular diet with a protein-containing drink.',
    ],
    directions: [
      'Add 30 g of EGGPRO LIFE powder to 90 ml of plain water. Do not use hot water.',
      'Stir thoroughly until the powder is evenly mixed. A shaker or blender may also be used.',
      'Your delicious protein drink is ready to enjoy.',
    ],
    nutritionBasis: 'Per 30 g Serving',
    nutrition: [
      ['Energy', '112 kcal'],
      ['Protein', '11.4 g'],
      ['Carbohydrate', '15.75 g'],
      ['Total Fat', '0.21 g'],
      ['Dietary Fibre', '0.27 g'],
      ['Sodium', '174.3 mg'],
    ],
    ingredients: 'Egg Albumen Powder, Skimmed Milk Powder, Nature-Identical Flavouring Substance and Sugar.',
    allergens: 'Contains Egg and Milk.',
  },
  {
    id: 'sports',
    name: 'EGGPRO SPORTS+',
    tab: 'EGGPRO SPORTS+',
    badge: { value: '22.4 g', label: 'Protein per 35 g serving' },
    subtitle: 'High-Protein Egg White Instant Protein Mix',
    headline: 'Quality Protein for Your Active Lifestyle',
    highlights: '22.4 g Protein per Serving | Low Fat | Three Protein Ingredients',
    tagline: 'Quality Protein for Everyday Fitness.',
    description: [
      'EGGPRO SPORTS+ is a delicious and creamy instant protein drink mix made with a combination of Egg Albumen Powder, Skimmed Milk Powder and Whey Powder.',
      'Each 35 g serving provides 22.4 g of protein, offering a convenient way to supplement your daily dietary protein intake.',
      'Egg white protein contains all nine essential amino acids. Combined with milk-derived proteins, EGGPRO SPORTS+ offers protein nutrition for adults seeking to meet their daily protein requirements as part of a balanced diet.',
      'Whether you enjoy regular exercise, gym workouts or an active lifestyle, EGGPRO SPORTS+ makes adding protein to your daily diet simple and enjoyable.',
    ],
    stats: [
      { label: 'Protein / Serving', value: '22.4 g' },
      { label: 'Serving Size', value: '35 g' },
      { label: 'Fat / Serving', value: '0.6 g' },
      { label: 'Flavours', value: 'Vanilla · Strawberry' },
    ],
    whyTitle: 'Why Choose EGGPRO SPORTS+?',
    why: [
      { title: 'High in Protein', text: 'Provides 22.4 g protein in every 35 g serving.' },
      { title: 'Egg White Protein', text: 'Contains all nine essential amino acids.' },
      { title: 'Three Protein Ingredients', text: 'Egg albumen powder, skimmed milk powder and whey powder.' },
      { title: 'Low in Fat', text: 'Contains just 0.6 g fat per serving.' },
      { title: 'Easy to Prepare', text: 'Convenient instant protein mix.' },
      { title: 'Delicious Flavours', text: 'Available in Vanilla and Strawberry.' },
    ],
    recommended: [
      'Gym & Fitness Enthusiasts – Adults engaged in regular gym workouts and fitness activities.',
      'Strength Training Individuals – Adults seeking to meet their dietary protein requirements.',
      'Sports & Active Lifestyle Individuals – Adults involved in regular physical activity.',
      'Protein-Conscious Adults – Individuals looking to supplement their daily protein intake.',
      'Adults with Increased Dietary Protein Needs – Those requiring additional protein as part of a balanced diet, based on individual nutritional requirements.',
    ],
    directions: [
      'Add 1 scoop (35 g) of EGGPRO SPORTS+ to 175 ml of plain water. Do not use hot water.',
      'Stir thoroughly until the powder is completely mixed. For a smoother consistency, use a shaker or blender.',
      'Your delicious, protein-rich drink is ready to enjoy!',
    ],
    nutritionBasis: null,
    nutrition: null,
    ingredients: 'Egg Albumen Powder, Skimmed Milk Powder, Whey Powder and Nature-Identical Flavouring Substances.',
    allergens: 'Contains Egg and Milk.',
  },
  {
    id: 'albumen',
    name: 'SKM EGG ALBUMEN POWDER',
    tab: 'EGG ALBUMEN POWDER',
    badge: { value: '2 Variants', label: 'High Gel & High Whip' },
    subtitle: 'Dried Egg White Powder | High Gel & High Whip',
    headline: 'Quality Egg White Protein for Food Applications',
    highlights: 'Dried Egg White Powder | High Gel & High Whip',
    tagline: 'Quality Egg Protein for Versatile Food Applications.',
    description: [
      'SKM Egg Albumen Powder is produced from egg whites through controlled processing, drying and heat treatment.',
      'Available in two specialised variants, High Gel and High Whip, the powder is designed for different food-processing applications requiring gelling, binding, foaming or whipping properties.',
      'Egg albumen is a source of complete protein containing all nine essential amino acids. Its functional properties make it a versatile ingredient for food manufacturers, bakeries and confectionery producers.',
    ],
    stats: [
      { label: 'Source', value: 'Egg White' },
      { label: 'Format', value: 'Dried Powder' },
      { label: 'Protein', value: 'Complete' },
      { label: 'Variants', value: 'Gel & Whip' },
    ],
    whyLabel: 'Highlights',
    whyTitle: 'Product Highlights',
    why: [
      { title: 'Made from egg white (albumen).' },
      { title: 'Heat-treated and dried.' },
      { title: 'Contains complete egg protein.' },
      { title: 'Available in High Gel and High Whip variants.' },
      { title: 'Suitable for a range of food-processing applications.' },
      { title: 'Convenient powdered format for storage, handling and formulation.' },
    ],
    variantsTitle: 'Available Variants',
    variants: [
      {
        name: 'Egg Albumen Powder – High Gel',
        text: 'Developed for food applications requiring gelling and binding properties.',
        applications: [
          'Noodles and pasta products',
          'Sausages and processed meat products',
          'Surimi and seafood products',
          'Other food preparations requiring protein binding and gel formation',
        ],
      },
      {
        name: 'Egg Albumen Powder – High Whip',
        text: 'Developed for applications requiring whipping, foaming and aeration properties.',
        applications: [
          'Bakery products',
          'Cakes and meringues',
          'Confectionery products',
          'Whipped desserts and other aerated food preparations',
        ],
      },
    ],
    storage: 'Store in a cool, dry place away from moisture and direct sunlight. Keep the packaging tightly closed after opening and follow the storage instructions printed on the pack.',
    nutrition: null,
    ingredients: 'Egg Albumen Powder (Dried Egg White).',
    allergens: 'Contains Egg.',
  },
];

export default function EggProPage({ variant = 'life', onPageChange }) {
  const variantId = variant;
  const v = VARIANTS.find((x) => x.id === variantId) ?? VARIANTS[0];
  const productId = `eggpro_${v.id}`;
  const [flavour, setFlavour] = useState('Vanilla');
  const [pack, setPack] = useState('500g');
  let heroImage;
  let heroAlt;
  if (v.id === 'sports') {
    heroImage = SPORTS_IMAGES[flavour][pack];
    heroAlt = `EGGPRO SPORTS+ ${flavour} ${SPORTS_PACKS.find((p) => p.id === pack).label}`;
  } else if (v.id === 'life') {
    heroImage = LifePack;
    heroAlt = 'EGGPRO LIFE Vanilla 500 g jar';
  } else {
    heroImage = AlbumenPack;
    heroAlt = 'SKM Egg Albumen Powder 500 g jar';
  }
  const recentProducts = useRecentlyViewed(productId);
  const goQuote = () => onPageChange('get-quote', { productId });

  // Scroll-linked pack image: on desktop one image travels from the hero slot
  // down into the product-description card as the page scrolls. Below desktop
  // (or with reduced motion) each slot simply shows its own static image.
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduceMotion = useReducedMotion();
  const floating = isDesktop && !reduceMotion;
  const rootRef = useRef(null);
  const heroSlotRef = useRef(null);
  const cardSlotRef = useRef(null);
  const geom = useRef(null);
  const [ready, setReady] = useState(false);
  const { scrollY } = useScroll();
  const fLeft = useMotionValue(0);
  const fTop = useMotionValue(0);
  const fWidth = useMotionValue(0);
  const fHeight = useMotionValue(0);

  const applyScroll = useCallback(() => {
    const g = geom.current;
    if (!g) return;
    const raw = (scrollY.get() - g.s0) / (g.s1 - g.s0);
    const p = Math.min(1, Math.max(0, raw));
    const e = p * p * (3 - 2 * p);
    const lerp = (a, b, t) => a + (b - a) * t;
    const top = lerp(g.H.y, g.C.y, e);
    // One smooth diagonal glide from the hero (right) into the card (left).
    // Page copy sits above the image (z-30), so it passes behind the text.
    fLeft.set(lerp(g.H.x, g.C.x, e));
    fTop.set(top);
    fWidth.set(lerp(g.H.w, g.C.w, e));
    fHeight.set(lerp(g.H.h, g.C.h, e));
  }, [scrollY, fLeft, fTop, fWidth, fHeight]);

  useLayoutEffect(() => {
    if (!floating) {
      setReady(false);
      return undefined;
    }
    const measure = () => {
      const root = rootRef.current;
      const a = heroSlotRef.current;
      const b = cardSlotRef.current;
      if (!root || !a || !b) return;
      const rr = root.getBoundingClientRect();
      const rect = (el, pad) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - rr.left + pad, y: r.top - rr.top + pad, w: r.width - pad * 2, h: r.height - pad * 2 };
      };
      const H = rect(a, 16);
      const C = rect(b, 20);
      const rootTop = rr.top + window.scrollY;
      geom.current = { H, C, s0: 0, s1: Math.max(1, rootTop + C.y - window.innerHeight * 0.18) };
      applyScroll();
      setReady(true);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rootRef.current);
    window.addEventListener('resize', measure);
    const t = window.setTimeout(measure, 800);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.clearTimeout(t);
    };
  }, [floating, v.id, applyScroll]);

  useMotionValueEvent(scrollY, 'change', applyScroll);

  const chips = v.highlights.split('|').map((s) => s.trim());
  const pills = 'min-h-[40px] px-4 py-1.5 rounded-full font-body font-semibold text-[13px] border transition-all duration-200 focus:outline-none focus-gold';
  const pillOn = 'bg-gold-500 border-transparent text-heading shadow-[0_2px_10px_rgba(232,182,74,0.35)]';
  const pillOff = 'bg-white border-surface-200 text-surface-600 hover:border-gold-500/50';
  const h2 = 'font-heading font-bold text-[30px] sm:text-[40px] lg:text-[46px] text-heading leading-[1.1] tracking-tight m-0';

  return (
    <div ref={rootRef} className="relative w-full flex flex-col bg-page font-body text-left">
      <SEO
        title={`${v.name} | ${v.subtitle} | SKM EggPro`}
        description={`${v.name} - ${v.subtitle}. ${v.highlights}. ${v.tagline}`}
        keywords={`eggpro, ${v.name}, egg white protein mix, instant protein drink mix, egg albumen protein powder, egg and milk protein, SKM egg products`}
        canonical={`https://www.skmegg.com/${productId}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: `${v.name} ${v.subtitle}`,
          description: v.description[0],
          brand: { '@type': 'Brand', name: 'SKM Egg Products' },
          manufacturer: { '@type': 'Organization', name: 'SKM Egg Products', url: 'https://www.skmegg.com' },
          category: 'Speciality Egg Products',
          url: `https://www.skmegg.com/${productId}`,
        }}
      />

      {/* Hero */}
      <div
        className="relative w-full overflow-hidden"
        style={{ background: 'radial-gradient(90% 100% at 85% 20%, rgba(232,182,74,0.18) 0%, rgba(232,182,74,0) 60%), #fdfbf7' }}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-[110px] pb-14 lg:pt-[130px] lg:pb-20 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
          <motion.div
            key={`copy-${v.id}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30 flex flex-col gap-6"
          >
            <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 self-start">
              <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
              Speciality Products · EggPro
            </span>

            <div className="flex flex-col gap-3">
              <h1 className="font-heading font-bold text-[40px] sm:text-[54px] lg:text-[64px] text-heading leading-[1.02] tracking-tight m-0">
                {v.name}
              </h1>
              <p className="font-heading font-semibold text-[18px] sm:text-[20px] text-surface-600 m-0">{v.subtitle}</p>
            </div>

            <p className="font-body text-[17px] sm:text-[18px] text-surface-600 leading-[1.7] m-0 max-w-[52ch]">{v.headline}</p>

            <ul className="flex flex-wrap gap-2 m-0 p-0 list-none">
              {chips.map((c) => (
                <li key={c} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gold-500/40 font-body font-semibold text-[13px] text-heading">
                  <span className="text-brand-600">{checkIcon}</span>
                  {c}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-1">
              <button
                onClick={goQuote}
                className="inline-flex items-center justify-center min-h-[48px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13.5px] uppercase tracking-[0.05em] leading-none px-8 py-[18px] rounded-[200px] transition-all duration-200 hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(228,10,24,0.35)] cursor-pointer focus:outline-none focus-gold"
              >
                Request a Sample
              </button>
              <button
                onClick={goQuote}
                className="font-body font-semibold text-[14px] text-heading underline underline-offset-4 decoration-surface-300 hover:decoration-heading bg-transparent border-none p-0 cursor-pointer focus:outline-none focus-gold"
              >
                Request Pricing
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-5 mt-1 border-t border-surface-200/70">
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-surface-400">EggPro range</span>
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="EggPro variants">
                {VARIANTS.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    role="tab"
                    aria-selected={variantId === x.id}
                    onClick={() => variantId !== x.id && onPageChange(`eggpro_${x.id}`)}
                    className={`${pills} min-h-[44px] px-5 text-[14px] ${variantId === x.id ? pillOn : pillOff}`}
                  >
                    {x.tab}
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              key={`stats-${v.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-4 w-full rounded-[14px] bg-white border border-surface-200 overflow-hidden shadow-[0_1px_2px_rgba(20,16,12,0.04),0_14px_32px_-18px_rgba(20,16,12,0.14)]"
            >
              {v.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col gap-1 px-4 py-4 border-surface-200 ${i % 2 === 1 ? 'border-l' : ''} ${i > 1 ? 'border-t sm:border-t-0' : ''} ${i > 0 ? 'sm:border-l' : ''}`}
                >
                  <span className="font-heading font-black text-[19px] sm:text-[20px] leading-tight text-brand-600">{s.value}</span>
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-surface-400">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="flex flex-col items-center gap-6">
            <div ref={heroSlotRef} className="relative w-full max-w-[520px] aspect-square flex items-center justify-center">
              <div
                className="absolute inset-[6%] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(232,182,74,0.38) 0%, rgba(232,182,74,0.10) 55%, rgba(232,182,74,0) 72%)' }}
                aria-hidden="true"
              />
              {!floating && (
                <motion.img
                  key={heroImage}
                  src={heroImage}
                  alt={heroAlt}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full select-none object-contain p-4"
                  fetchPriority="high"
                />
              )}
            </div>

            {v.id === 'sports' && (
              <div className="relative z-30 w-full max-w-[520px] flex flex-col gap-4 p-5 rounded-[18px] bg-white border border-surface-200/70 shadow-[0_1px_2px_rgba(20,16,12,0.04),0_16px_40px_-16px_rgba(20,16,12,0.10)]">
                <div className="flex flex-col gap-2">
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-surface-400">Flavour</span>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Flavour">
                    {SPORTS_FLAVOURS.map((f) => (
                      <button key={f} type="button" aria-pressed={flavour === f} onClick={() => setFlavour(f)} className={`${pills} ${flavour === f ? pillOn : pillOff}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-surface-400">Pack</span>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Pack size">
                    {SPORTS_PACKS.map((p) => (
                      <button key={p.id} type="button" aria-pressed={pack === p.id} onClick={() => setPack(p.id)} className={`${pills} ${pack === p.id ? pillOn : pillOff}`}>
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="w-full bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-12 lg:gap-20 items-start">
          <motion.div
            key={`about-${v.id}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="relative z-30 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <span className="section-label">Product Description</span>
              <h2 className="font-heading font-bold text-[28px] sm:text-[36px] lg:text-[42px] text-heading leading-[1.12] tracking-tight m-0">
                {v.headline}
              </h2>
              <p className="m-0 text-[18px] leading-[1.75] text-surface-600 max-w-[58ch]">{v.description[0]}</p>
            </div>

            <ul className="flex flex-col m-0 p-0 list-none border-t border-surface-200/80">
              {v.description.slice(1).map((p) => (
                <li key={p} className="flex items-start gap-4 py-5 border-b border-surface-200/80">
                  <span className="mt-0.5 w-8 h-8 rounded-full bg-gold-500/20 text-brand-600 flex items-center justify-center flex-shrink-0">
                    {checkIcon}
                  </span>
                  <p className="m-0 text-[15.5px] leading-[1.75] text-surface-600 max-w-[62ch]">{p}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <aside className="lg:order-first overflow-hidden rounded-[22px] bg-white border border-surface-200/70 shadow-[0_1px_2px_rgba(20,16,12,0.04),0_24px_50px_-24px_rgba(20,16,12,0.18)]">
            <div
              ref={cardSlotRef}
              className="relative flex items-center justify-center aspect-[4/3] border-b border-surface-200/70"
              style={{ background: 'radial-gradient(70% 70% at 50% 55%, rgba(232,182,74,0.28) 0%, rgba(232,182,74,0) 72%), #fdfbf7' }}
            >
              {!floating && (
                <img src={heroImage} alt={heroAlt} loading="lazy" className="w-full h-full object-contain p-5 select-none" />
              )}
            </div>
            <div
              className="flex flex-col items-center gap-1 px-6 py-9 text-center border-b border-gold-500/30"
              style={{ background: 'radial-gradient(90% 120% at 50% 0%, rgba(232,182,74,0.28) 0%, rgba(232,182,74,0.06) 70%), #fdfbf7' }}
            >
              <span className={`font-heading font-black leading-none text-brand-600 ${v.badge.value.length > 7 ? 'text-[40px] sm:text-[46px]' : 'text-[56px] sm:text-[64px]'}`}>{v.badge.value}</span>
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-heading">{v.badge.label}</span>
              <span className="mt-2 text-[13px] text-surface-500">{v.name}</span>
            </div>

            <div className="flex flex-col gap-6 p-6 sm:p-8">
              <div className="flex flex-col gap-2">
                <h3 className="font-heading font-bold text-[12px] uppercase tracking-[0.12em] text-surface-400 m-0">Ingredients</h3>
                <p className="text-[14.5px] text-heading leading-[1.7] m-0">{v.ingredients}</p>
              </div>
              <div className="flex flex-col gap-2 pt-6 border-t border-surface-200/70">
                <h3 className="font-heading font-bold text-[12px] uppercase tracking-[0.12em] text-surface-400 m-0">Allergen Information</h3>
                <span className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-600/10 border border-brand-600/30 font-body font-semibold text-[13.5px] text-brand-700">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.3 3.9L2.4 18a2 2 0 001.7 3h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
                  </svg>
                  {v.allergens}
                </span>
              </div>
              <p className="font-heading font-bold text-[15px] text-brand-600 m-0 pt-6 border-t border-surface-200/70">{v.tagline}</p>
            </div>
          </aside>
        </div>
      </div>

      <CurvedDivider cards bg="#fff" fill="#ececec" />

      {/* Benefits */}
      <div className="w-full py-14 lg:py-20 bg-page">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="section-label">{v.whyLabel ?? 'Key Benefits'}</span>
            <h2 className={h2}>{v.whyTitle}</h2>
          </div>
          <motion.div
            key={`why-${v.id}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {v.why.map((item, i) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="relative flex flex-col gap-2 bg-white border border-surface-200/70 rounded-[16px] p-6 overflow-hidden hover:border-gold-500/50 hover:shadow-[0_22px_44px_-20px_rgba(20,16,12,0.18)] transition-[border-color,box-shadow] duration-300"
              >
                <span className="font-heading font-black text-[44px] leading-none text-gold-500/60" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-heading font-bold text-[16px] text-heading m-0">{item.title}</h3>
                {item.text && <p className="text-[14px] text-surface-500 leading-[1.65] m-0">{item.text}</p>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <CurvedDivider cards bg="#ececec" fill="#fff" />

      {/* Available variants (albumen powder) */}
      {v.variants && (
        <>
          <div className="w-full bg-white py-14 lg:py-20">
            <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <span className="section-label">Choose Your Function</span>
                <h2 className={h2}>{v.variantsTitle}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {v.variants.map((variantItem, i) => (
                  <div key={variantItem.name} className="flex flex-col gap-5 p-6 sm:p-8 rounded-[20px] bg-[#fdfbf7] border border-gold-500/30 hover:border-gold-500/60 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                      <span className="w-11 h-11 rounded-full bg-gold-500 text-heading font-heading font-black text-[18px] flex items-center justify-center shadow-[0_4px_14px_rgba(232,182,74,0.4)] flex-shrink-0">
                        {i + 1}
                      </span>
                      <h3 className="font-heading font-bold text-[20px] text-heading leading-tight m-0">{variantItem.name}</h3>
                    </div>
                    <p className="text-[15px] text-surface-600 leading-[1.7] m-0">{variantItem.text}</p>
                    <div className="flex flex-col gap-3 pt-5 border-t border-surface-200/70">
                      <span className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-surface-400">Suitable applications include</span>
                      <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
                        {variantItem.applications.map((a) => (
                          <li key={a} className="flex items-start gap-3 text-[14.5px] text-heading leading-[1.55]">
                            <span className="mt-0.5 text-brand-600 flex-shrink-0">{checkIcon}</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <CurvedDivider cards bg="#fff" fill="#ececec" />
        </>
      )}

      {/* How to use */}
      {v.directions && (
      <>
      <div className="w-full bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="section-label">Easy to Prepare</span>
            <h2 className={h2}>Directions for Use</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {v.directions.map((d, i) => (
              <div key={d} className="flex flex-col gap-4 p-6 rounded-[16px] bg-[#fdfbf7] border border-surface-200/70">
                <span className="w-11 h-11 rounded-full bg-gold-500 text-heading font-heading font-black text-[18px] flex items-center justify-center shadow-[0_4px_14px_rgba(232,182,74,0.4)]">
                  {i + 1}
                </span>
                <p className="text-[15px] text-surface-600 leading-[1.7] m-0">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CurvedDivider cards bg="#fff" fill="#ececec" />
      </>
      )}

      {/* Storage (albumen powder) */}
      {v.storage && (
        <div className="w-full py-14 lg:py-20 bg-page">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-7 p-6 sm:p-8 rounded-[20px] bg-white border border-surface-200/70">
              <span className="w-12 h-12 rounded-full bg-gold-500/20 text-brand-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9-4 9 4v10l-9 4-9-4V7zm9 4v10M3 7l9 4 9-4" />
                </svg>
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading font-bold text-[22px] text-heading m-0">Storage Instructions</h3>
                <p className="text-[15px] text-surface-600 leading-[1.75] m-0 max-w-[80ch]">{v.storage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended for + nutrition */}
      {v.recommended && (
      <div className="w-full py-14 lg:py-20 bg-page">
        <div className={`mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 grid grid-cols-1 gap-10 lg:gap-14 ${v.nutrition ? 'lg:grid-cols-[1.3fr_1fr]' : ''}`}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="section-label">Who It Is For</span>
              <h2 className={h2}>Recommended For</h2>
            </div>
            <div className={`grid grid-cols-1 gap-4 ${v.nutrition ? '' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
              {v.recommended.map((r) => {
                const [lead, rest] = r.includes(' – ') ? r.split(' – ') : [null, r];
                return (
                  <div key={r} className="flex items-start gap-4 bg-white border border-surface-200/70 rounded-[16px] p-5 hover:border-gold-500/50 transition-colors duration-300">
                    <span className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-600/20">{checkIcon}</span>
                    <div className="flex flex-col gap-1">
                      {lead && <h3 className="font-heading font-bold text-[15px] text-heading m-0">{lead}</h3>}
                      <p className="text-[14px] text-surface-500 leading-[1.6] m-0">{rest}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {v.nutrition && (
            <div className="flex flex-col gap-4 self-start p-6 sm:p-8 rounded-[20px] bg-white border border-surface-200/70 shadow-[0_1px_2px_rgba(20,16,12,0.04),0_16px_40px_-16px_rgba(20,16,12,0.10)]">
              <div className="flex flex-col gap-1">
                <h3 className="font-heading font-bold text-[22px] text-heading m-0">Nutritional Information</h3>
                <span className="text-[12px] font-semibold uppercase tracking-widest text-surface-400">{v.nutritionBasis}</span>
              </div>
              <table className="w-full text-[14.5px] border-collapse">
                <thead>
                  <tr className="text-left text-surface-400 text-[11.5px] uppercase tracking-wider">
                    <th className="py-2 px-2 font-semibold">Nutrient</th>
                    <th className="py-2 px-2 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {v.nutrition.map(([k, val]) => (
                    <tr key={k} className={`border-t border-surface-200/70 ${k === 'Protein' ? 'bg-gold-500/15' : ''}`}>
                      <td className={`py-3 px-2 ${k === 'Protein' ? 'font-bold text-heading' : 'text-heading'}`}>{k}</td>
                      <td className={`py-3 px-2 text-right font-semibold ${k === 'Protein' ? 'text-brand-600' : 'text-heading'}`}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      )}

      {/* Closing call to action */}
      <div className="w-full bg-white pt-14 lg:pt-20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-8 sm:p-12 rounded-[24px] border border-gold-500/40"
            style={{ background: 'radial-gradient(80% 140% at 0% 0%, rgba(232,182,74,0.22) 0%, rgba(232,182,74,0) 60%), #fdfbf7' }}
          >
            <div className="flex flex-col gap-3 max-w-xl">
              <span className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600">{v.name}</span>
              <h2 className="font-heading font-bold text-[28px] sm:text-[36px] leading-[1.1] text-heading tracking-tight m-0">{v.tagline}</h2>
              <p className="text-[15px] text-surface-600 leading-[1.7] m-0">Talk to our team about samples, pricing and availability.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={goQuote}
                className="inline-flex items-center justify-center min-h-[48px] bg-brand-600 hover:bg-[#a80000] text-white font-heading font-bold text-[13.5px] uppercase tracking-[0.05em] leading-none px-8 py-[18px] rounded-[200px] transition-all duration-200 hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(228,10,24,0.35)] cursor-pointer focus:outline-none focus-gold"
              >
                Request a Sample
              </button>
              <button
                onClick={() => onPageChange('contact-us')}
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-[18px] rounded-[200px] border border-brand-600 text-brand-600 hover:bg-brand-600/5 font-heading font-bold text-[13.5px] uppercase tracking-[0.05em] leading-none transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-gold"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
          <ProductDocuments
            tdsUrl={null}
            productName={v.name}
            onRequestPack={() => onPageChange('contact-us')}
          />
        </div>
      </section>

      {recentProducts.length > 0 && (
        <section className="w-full bg-[#f8f4ee] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
            <RecentlyViewed products={recentProducts} onPageChange={onPageChange} />
          </div>
        </section>
      )}

      {floating && ready && (
        <motion.img
          key={heroImage}
          src={heroImage}
          alt={heroAlt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ left: fLeft, top: fTop, width: fWidth, height: fHeight }}
          className="absolute z-20 object-contain select-none pointer-events-none"
          fetchPriority="high"
        />
      )}
    </div>
  );
}
