import { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import ScrollFrameSequence from '../../components/common/ScrollFrameSequence';
import { getBrochureUrl } from '../../data/brochureUrl';
import { EASE_PREMIUM, DURATION, fadeUp } from '../../utils/motionTokens';

const CompanyProfilePdf = getBrochureUrl('Company Profile - SKM Egg Products Export India Limited.pdf');
import FactoryImage from '../../assets/home/skm-factory.jpeg';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';
import accoladePic3 from '../../assets/ACCOLADES/Picture3.png';
import accoladePic4 from '../../assets/ACCOLADES/Picture4.png';
import accoladePic6 from '../../assets/ACCOLADES/Picture6.png';
import accoladePic8 from '../../assets/ACCOLADES/Picture8.png';
import goldTrophies from '../../assets/home/golden-trophies.png';

// Section 2 - Company overview. Real content verbatim/derived from
// src/pages/AboutUs/sections/OurCompany.jsx (also used on the standalone
// Our Company page): founded 1996, Asia's largest integrated egg
// processing facility, 2M eggs/day, 7,500 MT egg powder annually, ISO
// 22000 certified poultry & feed mill (EU compartmentalization). "View
// Manufacturing Capabilities" routes to the real Manufacturing and Supply
// hub page.
const OVERVIEW_STATS = [
  { value: '2 Million', label: 'Eggs processed per day' },
  { value: '7,500 MT', label: 'Egg powder annually' },
  { value: 'ISO 22000', label: 'Certified poultry & processing facility' },
];

function CompanyOverviewSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] bg-white">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, visible: { transition: { delayChildren: reduceMotion ? 0 : 0.1, staggerChildren: reduceMotion ? 0 : 0.15 } } }}
            className="flex-1 relative w-full"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: reduceMotion ? 0.01 : 0.9, ease: EASE_PREMIUM }}
              className="relative rounded-[24px] overflow-hidden aspect-[16/10] shadow-[0_12px_36px_rgba(0,0,0,0.08)] border border-surface-200/60 group"
            >
              <motion.img
                src={FactoryImage}
                alt="SKM Eggs Factory Facility"
                className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                width={1800}
                height={1199}
                loading="eager"
                decoding="async"
                variants={{ hidden: { scale: reduceMotion ? 1 : 1.25 }, visible: { scale: 1 } }}
                transition={{ duration: reduceMotion ? 0.01 : 1.4, ease: EASE_PREMIUM }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex items-end justify-between gap-4">
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: EASE_PREMIUM }}
                  className="flex flex-col gap-1"
                >
                  <span className="inline-flex items-center gap-2 font-body text-[11px] font-bold uppercase tracking-[0.1em] text-brand-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                    Integrated Feed & Farm Facility
                  </span>
                  <p className="font-body text-[13px] sm:text-[14px] font-medium text-white/90 m-0">
                    Erode, Tamil Nadu, India • Est. 1996
                  </p>
                </motion.div>

                <motion.span
                  variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: EASE_PREMIUM }}
                  className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 font-body text-[12px] font-semibold text-white flex-shrink-0"
                >
                  2M Eggs Processed Daily
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div {...fadeUp(reduceMotion, { distance: 20, delay: 0.1 })} className="flex-1 flex flex-col gap-5">
            <span className="section-label">Company Overview</span>
            <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
              Who We Are
            </h2>
            <p className="font-body text-[15px] text-surface-600 leading-[1.7] m-0">
              Established in 1996, SKM Egg Products began its journey with a clear commitment to excellence in egg processing. Today, we operate as one of Asia's largest integrated egg processing facilities, combining advanced production technology with internationally aligned quality systems.
            </p>
            <p className="font-body text-[15px] text-surface-600 leading-[1.7] m-0">
              Supported by fully integrated back-end farms, our operations process up to 2 million eggs per day, producing approximately 7,500 metric tonnes of egg powder annually - serving food manufacturers across bakery, mayonnaise, meat & fish, and noodles & pasta industries.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {OVERVIEW_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp(reduceMotion, { distance: 14, duration: DURATION.cardHover, delay: i * 0.08 })}
              className="relative p-5 bg-[#fdfbf7] border border-[#eee] rounded-[10px] flex flex-col gap-1.5"
            >
              <span className="relative font-heading font-bold text-[22px] text-brand-600 leading-none">{stat.value}</span>
              <span className="relative font-body text-[13px] text-surface-500">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        <InternalLink
          route="manufacturing_and_supply"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          View Manufacturing Capabilities
        </InternalLink>
      </div>
    </div>
  );
}

// About SKM - new consolidated page. Replaces the 8-item "About SKM" nav
// dropdown (Our Company, Vision & Mission, Core Ideology, Brand Identity,
// CEO's Message, Accolades, Events, Coffee Table Books) with a single page
// telling the whole company story in one place, per the brief: buyers
// shouldn't have to visit 7+ separate pages to understand the company. All
// 8 individual pages stay live at their existing URLs for SEO/direct
// linking (same precedent as the SKM Japan/Europe/Russia branch
// consolidation) - just no longer reachable via the main nav dropdown.
//
// Section 1 - Company hero. "Download Company Profile" downloads the real
// Company Profile PDF (src/assets/Brouchers/Company Profile - SKM Egg
// Products Export India Limited.pdf, the same file used on the Resources
// page). "Explore Our Products" routes to the real Products hub.

// Section 3 - Company journey. Pinned scroll-driven "Excellence Journey": a
// winding path climbs from the first trophy (2001) to the latest, and each
// scroll step reveals the next trophy in sequence. Order and wording follow
// the Excellence Journey graphic supplied by SKM.
const JOURNEY_MILESTONES = [
  { title: 'Silver Trophy - 2001', by: 'by APEDA [Govt. of India]', color: '#E40A18' },
  { title: 'Best Export Performance Awards 2005-06', by: 'by MEPZ (Madras Export Processing Zone)', color: '#E40A18' },
  { title: 'State Safety Award - 2007', by: 'by Government of Tamil Nadu', color: '#E40A18' },
  { title: 'Manufacturing Excellence Silver 2006 & Gold 2007 & 08', by: 'by Frost & Sullivan', color: '#E40A18' },
  { title: 'Shri SKM Maeilanandhan receiving Padma Shree', by: 'by Honourable President of India, Shri Pranab Mukherjee', color: '#E40A18', image: accoladePic8, crop: [544, 24, 12, 498, 310] },
  { title: 'Export Excellence Award - 2012 & 13', by: 'at MEPZ, by Special Economic Zone - Chennai', color: '#E40A18', image: accoladePic6, crop: [675, 14, 6, 648, 346] },
  { title: 'Golden Trophy 2011-2012 and 2012-2013', by: '"APEDA" Ministry of Commerce, Government of India', color: '#E40A18', image: accoladePic4, crop: [544, 14, 8, 508, 296] },
  { title: 'Hidden Gem Award 2014-15', by: 'by TiECON at Chennai', color: '#E40A18' },
  { title: '5 S Platinum Award 2015-16 & 2016-17', by: 'by ABK AOTS - Tamil Nadu', color: '#E40A18', image: accoladePic3, crop: [665, 16, 8, 622, 392] },
  { title: 'CII Award 2016-17 on Food Safety', by: 'by CII', color: '#E40A18' },
  { title: 'Mondelez Quality and Food Safety Culture Awards 2021-2022', by: 'by Mondelez', color: '#E40A18' },
  { title: 'National Client of the Year 2022', by: 'Awarded by LMI Carpe Diem', color: '#E40A18' },
  { title: 'Shri SKM Maeilanandhan receiving Padma Bhushan - 2026', by: 'by Honourable President of India, Smt. Droupadi Murmu', color: '#E40A18', image: '/gallery/award-padma-bhushan-2026.jpg' },
]
  // `n` = the milestone's slot in the (oldest-first) trophy sprite sheet; shown newest-first.
  .map((m, n) => ({ ...m, n }))
  .reverse();

// Golden cut-out of milestone i's own trophy (see GOLD_BOXES), scaled to `height`.
function Trophy({ i, height = 100 }) {
  const { w, h } = goldBox(i);
  return <div aria-hidden="true" style={{ height, aspectRatio: `${w} / ${h}`, ...goldTrophyStyle(i) }} />;
}

function CompanyJourneySection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <MobileJourneyTimeline onPageChange={onPageChange} isReducedMotion />;
  }

  return (
    <>
      <div className="hidden lg:block">
        <DesktopJourneyTimeline onPageChange={onPageChange} />
      </div>
      <div className="lg:hidden">
        <MobileJourneyTimeline onPageChange={onPageChange} />
      </div>
    </>
  );
}

// Golden trophy collection (cut-out of "Golden Gallery of Distinctive Trophies",
// transparent background). Boxes are each trophy's [x0, y0, x1, y1] in source
// px, in the same order as JOURNEY_MILESTONES.
const GOLD_SRC = { w: 2048, h: 768 };
const GOLD_BOXES = [
  [9, 305, 190, 534],
  [209, 241, 305, 535],
  [330, 340, 459, 534],
  [475, 269, 616, 534],
  [627, 308, 746, 534],
  [750, 271, 929, 535],
  [933, 271, 1114, 536],
  [1141, 303, 1247, 535],
  [1285, 226, 1385, 535],
  [1410, 298, 1555, 536],
  [1583, 296, 1694, 539],
  [1732, 218, 1847, 537],
  [1868, 134, 2035, 537],
];
const GOLD_ROW = { y0: 100, vw: GOLD_SRC.w, vh: 520 }; // source-px window shown in the gallery row
const TROPHY_SHORT = [
  'Silver Trophy', 'Best Export', 'State Safety', 'Manufacturing', 'Padma Shree', 'Export Excellence', 'APEDA Golden',
  'Hidden Gem', '5 S Platinum', 'CII Food Safety', 'Mondelez', 'Client of the Year', 'Padma Bhushan',
];

const goldBox = (i) => {
  const [a, b, c, d] = GOLD_BOXES[i];
  const x0 = a - 4;
  const y0 = b - 6;
  return { x0, y0, w: c + 4 - x0, h: d + 10 - y0 };
};

// Background styling that shows only trophy i of the cut-out sheet inside a box
// whose aspect ratio is the trophy's own, so it can be any size.
const goldTrophyStyle = (i) => {
  const { x0, y0, w, h } = goldBox(i);
  return {
    backgroundImage: `url(${goldTrophies})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${(GOLD_SRC.w / w) * 100}% ${(GOLD_SRC.h / h) * 100}%`,
    backgroundPosition: `${(x0 / (GOLD_SRC.w - w)) * 100}% ${(y0 / (GOLD_SRC.h - h)) * 100}%`,
    filter: 'drop-shadow(0 10px 14px rgba(120, 80, 0, 0.28))',
  };
};

// The Accolades photo for a milestone. The PNGs ship with a pale frame baked
// in, so `crop` = [fullWidth, x, y, w, h] (source px) trims it off. Milestones
// with no photo show a large faint step number (path view) or nothing.
function JourneyPhoto({ m, i, alignLeft = true, maxH, showPlaceholder = true }) {
  if (!m.image) {
    if (!showPlaceholder) return null;
    return (
      <span
        className={`block font-heading font-bold leading-none select-none ${alignLeft ? 'text-left' : 'text-right'}`}
        style={{ color: m.color, opacity: 0.14, fontSize: 160 }}
        aria-hidden="true"
      >
        {String(i + 1).padStart(2, '0')}
      </span>
    );
  }
  const ratio = m.crop ? m.crop[3] / m.crop[4] : 544 / 340;
  return (
    <div
      className="w-full overflow-hidden rounded-2xl shadow-[0_14px_40px_rgba(0,0,0,0.18)]"
      style={{ aspectRatio: String(ratio), ...(maxH ? { width: `min(100%, ${Math.round(maxH * ratio)}px)` } : null) }}
    >
      <img
        src={m.image}
        alt={m.title}
        className="block object-cover"
        style={
          m.crop
            ? {
                width: `${(m.crop[0] / m.crop[3]) * 100}%`,
                maxWidth: 'none',
                marginLeft: `${(-m.crop[1] / m.crop[3]) * 100}%`,
                marginTop: `${(-m.crop[2] / m.crop[3]) * 100}%`,
              }
            : { width: '100%', height: '100%' }
        }
      />
    </div>
  );
}

// Desktop / large-viewport - pinned scroll-driven timeline. One long winding
// "S" path links every trophy; the camera follows the path and holds on each
// trophy for one scroll step, showing its trophy, text and Accolades photo at
// full size. After the last trophy the view crossfades to a wide horizontal
// overview of all of them. Hidden below lg so mobile never gets a forced
// sticky layout (same pattern as JourneyScrollSection/HomeJourney).
const SCENES_END = 0.86; // scroll progress where the path reaches the last trophy

function DesktopJourneyTimeline({ onPageChange }) {
  const [count, setCount] = useState(1);
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const total = JOURNEY_MILESTONES.length;

  // Stage geometry (px). STEP matches the visible height so exactly one
  // trophy fills the view at a time.
  const AREA_OFFSET = 150; // header height reserved above the stage
  const [viewH] = useState(() => Math.max(420, (typeof window === 'undefined' ? 700 : window.innerHeight) - AREA_OFFSET));
  const W = 1200;
  const STEP = viewH;
  const PAD = viewH / 2;
  const H = PAD * 2 + (total - 1) * STEP;
  const SWAY = 100; // how far each trophy sits left/right of centre (the S)
  const TEXT_W = 400;
  const PHOTO_W = Math.min(600, Math.round((viewH - 40) * (544 / 340))); // as large as the view allows

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const nodeY = (i) => H - PAD - i * STEP;
  const nodeX = (i) => W / 2 + (i % 2 === 0 ? -SWAY : SWAY);

  // One trophy per scroll step: each segment glides to the next trophy, then holds on it.
  const rawDrawn = useTransform(scrollYProgress, [0, SCENES_END], [0, 1], { clamp: true });
  const drawn = useTransform(rawDrawn, (v) => {
    const t = v * (total - 1);
    const k = Math.min(Math.floor(t + 1e-6), total - 2);
    const s = Math.min(1, Math.max(0, (t - k - 0.15) / 0.5));
    const eased = s * s * (3 - 2 * s);
    return v >= 1 ? 1 : (k + eased) / (total - 1);
  });
  const dashOffset = useTransform(drawn, (v) => 1 - v);

  // Keep the path front in the middle of the visible area.
  const cameraY = useTransform(drawn, (v) => viewH * 0.5 + 20 - nodeY(v * (total - 1)));

  // Trophy i is revealed as the path front arrives at it.
  useMotionValueEvent(drawn, 'change', (v) => {
    setCount(Math.min(total, Math.floor(v * (total - 1) + 0.08) + 1));
  });

  const pathD = JOURNEY_MILESTONES.reduce((d, _, i) => {
    if (i === 0) return `M${nodeX(0)} ${nodeY(0)}`;
    return `${d} C${nodeX(i - 1)} ${nodeY(i - 1) - STEP / 2} ${nodeX(i)} ${nodeY(i) + STEP / 2} ${nodeX(i)} ${nodeY(i)}`;
  }, '');

  // Crossfade from the path to the horizontal overview at the end.
  const overview = useTransform(scrollYProgress, [SCENES_END + 0.02, 0.99], [0, 1], { clamp: true });
  const stageOpacity = useTransform(overview, [0, 0.4], [1, 0]);
  const overviewOpacity = useTransform(overview, [0.4, 1], [0, 1]);
  const overviewPointer = useTransform(overview, (o) => (o > 0.5 ? 'auto' : 'none'));

  // Golden trophy collection: reset the selection when scrolling back up out of it.
  useMotionValueEvent(overview, 'change', (o) => {
    if (o < 0.3) setSelected(null);
  });

  return (
    <section ref={containerRef} className="relative w-full h-[1300vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center bg-page overflow-hidden py-6">
        <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
          <div className="flex items-end gap-6 lg:gap-8">
            <div className="flex flex-col gap-2">
              <span className="section-label">Our History</span>
              <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
                Company Journey
              </h2>
            </div>
            <InternalLink
              route="accolades"
              onPageChange={onPageChange}
              className="inline-flex items-center gap-2.5 min-h-[42px] px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[12.5px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 flex-shrink-0"
            >
              Explore Our History
            </InternalLink>
          </div>

          <div
            className="relative w-full overflow-hidden"
            style={{
              height: viewH,
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)',
              maskImage: 'linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)',
            }}
          >
            <motion.div className="absolute inset-0" style={{ opacity: stageOpacity }}>
              <motion.div
                className="absolute top-0"
                style={{ width: W, height: H, left: `calc(50% - ${W / 2}px)`, y: cameraY }}
              >
                <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0" aria-hidden="true">
                  <defs>
                    <mask id="journey-path-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
                      <motion.path
                        d={pathD}
                        pathLength="1"
                        stroke="#fff"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray="1"
                        style={{ strokeDashoffset: dashOffset }}
                      />
                    </mask>
                  </defs>
                  <path d={pathD} fill="none" stroke="#cfcfcf" strokeWidth="2.5" strokeDasharray="10 10" opacity="0.6" />
                  <path d={pathD} fill="none" stroke="#e40a18" strokeWidth="3.5" strokeDasharray="10 10" mask="url(#journey-path-mask)" />
                </svg>

                {JOURNEY_MILESTONES.map((m, i) => {
                  const x = nodeX(i);
                  const y = nodeY(i);
                  const visible = i < count;
                  const left = i % 2 === 0; // text on the left, photo on the right, then alternate
                  const cy = y - 20; // text/photo centre line
                  return (
                    <div key={m.title}>
                      <motion.div
                        className="absolute flex flex-col items-center"
                        style={{ left: x - 48, top: y - 123, width: 96 }}
                        initial={false}
                        animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.4, y: 16 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                      >
                        <Trophy i={m.n} height={112} />
                        <span
                          className="block w-[22px] h-[22px] rounded-full bg-white mt-1.5"
                          style={{ border: `4px solid ${m.color}` }}
                        />
                      </motion.div>

                      <motion.div
                        className={`absolute ${left ? 'text-right' : 'text-left'}`}
                        style={{
                          top: cy,
                          width: TEXT_W,
                          y: '-50%',
                          ...(left ? { left: x - 80 - TEXT_W } : { left: x + 80 }),
                        }}
                        initial={false}
                        animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: reduceMotion ? 0 : left ? 30 : -30 }}
                        transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: EASE_PREMIUM }}
                      >
                        <p className="font-heading font-bold text-[32px] leading-[1.2] m-0" style={{ color: m.color }}>
                          {m.title}
                        </p>
                        <p className="font-body text-[19px] text-surface-500 leading-[1.45] m-0 mt-3">{m.by}</p>
                      </motion.div>

                      <motion.div
                        className="absolute"
                        style={{
                          top: cy,
                          width: PHOTO_W,
                          y: '-50%',
                          ...(left ? { left: x + 90 } : { left: x - 90 - PHOTO_W }),
                        }}
                        initial={false}
                        animate={visible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: reduceMotion ? 0 : left ? -30 : 30, scale: 0.94 }}
                        transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: EASE_PREMIUM }}
                      >
                        <JourneyPhoto m={m} i={i} alignLeft={left} />
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Final view - the golden trophy collection. Click a trophy: it flies to the left
                and its Accolades photo + details appear on the right. */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: overviewOpacity, pointerEvents: overviewPointer }}
            >
              {selected === null ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <p className="font-body text-[14px] text-surface-500 m-0">Click a trophy to see its award</p>
                  <div
                    className="relative w-full"
                    style={{
                      maxWidth: Math.round((viewH - 70) * (GOLD_ROW.vw / GOLD_ROW.vh)),
                      aspectRatio: `${GOLD_ROW.vw} / ${GOLD_ROW.vh}`,
                    }}
                  >
                    {JOURNEY_MILESTONES.map((m, i) => {
                      const { x0, y0, w, h } = goldBox(m.n);
                      return (
                        <div key={m.title}>
                          <motion.button
                            type="button"
                            layoutId={`gold-trophy-${m.n}`}
                            onClick={() => setSelected(i)}
                            aria-label={m.title}
                            title={m.title}
                            whileHover={reduceMotion ? undefined : { y: -8, scale: 1.05 }}
                            className="absolute p-0 border-0 bg-transparent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-md"
                            style={{
                              left: `${(x0 / GOLD_ROW.vw) * 100}%`,
                              top: `${((y0 - GOLD_ROW.y0) / GOLD_ROW.vh) * 100}%`,
                              width: `${(w / GOLD_ROW.vw) * 100}%`,
                              height: `${(h / GOLD_ROW.vh) * 100}%`,
                              ...goldTrophyStyle(m.n),
                            }}
                          />
                          <span
                            className="absolute text-center font-heading font-bold pointer-events-none"
                            style={{
                              left: `${((x0 + w / 2) / GOLD_ROW.vw) * 100}%`,
                              top: `${((y0 + h + 6 - GOLD_ROW.y0) / GOLD_ROW.vh) * 100}%`,
                              transform: 'translateX(-50%)',
                              width: 96,
                              fontSize: 11,
                              lineHeight: 1.25,
                              color: m.color,
                            }}
                          >
                            {TROPHY_SHORT[m.n]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center gap-10 lg:gap-16 px-6">
                  <motion.div
                    layoutId={`gold-trophy-${JOURNEY_MILESTONES[selected].n}`}
                    className="flex-none"
                    style={{
                      height: Math.min(380, viewH - 70),
                      aspectRatio: `${goldBox(JOURNEY_MILESTONES[selected].n).w} / ${goldBox(JOURNEY_MILESTONES[selected].n).h}`,
                      ...goldTrophyStyle(JOURNEY_MILESTONES[selected].n),
                    }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: EASE_PREMIUM }}
                  />
                  <motion.div
                    key={selected}
                    className="flex flex-col gap-4 flex-1 max-w-[640px] min-w-0"
                    initial={{ opacity: 0, x: reduceMotion ? 0 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: EASE_PREMIUM, delay: reduceMotion ? 0 : 0.3 }}
                  >
                    <JourneyPhoto
                      m={JOURNEY_MILESTONES[selected]}
                      i={selected}
                      maxH={viewH - 190}
                      showPlaceholder={false}
                    />
                    <div>
                      <p className="font-heading font-bold text-[28px] leading-[1.2] m-0" style={{ color: JOURNEY_MILESTONES[selected].color }}>
                        {JOURNEY_MILESTONES[selected].title}
                      </p>
                      <p className="font-body text-[17px] text-surface-500 leading-[1.45] m-0 mt-2">
                        {JOURNEY_MILESTONES[selected].by}
                      </p>
                    </div>
                  </motion.div>

                  <div className="absolute top-1 right-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelected((selected + total - 1) % total)}
                      aria-label="Previous trophy"
                      className="w-10 h-10 rounded-full bg-white border border-surface-200 text-heading font-bold cursor-pointer hover:bg-surface-100 transition-colors"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelected((selected + 1) % total)}
                      aria-label="Next trophy"
                      className="w-10 h-10 rounded-full bg-white border border-surface-200 text-heading font-bold cursor-pointer hover:bg-surface-100 transition-colors"
                    >
                      ›
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="h-10 px-5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[12.5px] uppercase tracking-[0.04em] cursor-pointer transition-colors"
                    >
                      All trophies
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            <span className="absolute left-2 bottom-3 font-body text-[13px] font-bold text-surface-400 tabular-nums">
              {String(count).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


// Mobile / tablet (< lg) and reduced-motion fallback - plain stacked
// milestone list, reveal-on-scroll (whileInView) per card instead of a
// pinned/scroll-scrubbed timeline. No sticky container, no 320vh scroll
// track - those don't translate to short, narrow touch viewports.
function MobileJourneyTimeline({ onPageChange, isReducedMotion = false }) {
  return (
    <section className="relative w-full bg-page py-[52px]">
      <div className="mx-auto max-w-[720px] w-full px-4 sm:px-6 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="section-label">Our History</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Company Journey
          </h2>
          <p className="font-body text-[14px] sm:text-[15px] text-surface-500 leading-[1.6] m-0">
            SKM's history from founding in 1996 through two decades of honours.
          </p>
          <InternalLink
            route="accolades"
            onPageChange={onPageChange}
            className="self-start inline-flex items-center gap-2.5 min-h-[42px] px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[12.5px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 mt-1"
          >
            Explore Our History
          </InternalLink>
        </div>

        <div className="relative flex flex-col">
          <div className="absolute left-[20px] top-2 bottom-2 w-[2px] bg-surface-200" aria-hidden="true" />

          {JOURNEY_MILESTONES.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: isReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: isReducedMotion ? 0.01 : 0.5, ease: EASE_PREMIUM, delay: isReducedMotion ? 0 : 0.05 }}
              className="relative flex gap-5 pb-8 last:pb-0"
            >
              <span className="relative z-10 flex-shrink-0 w-[42px] h-[42px] rounded-full flex items-center justify-center bg-white border-2" style={{ borderColor: m.color }}>
                <Trophy i={m.n} height={28} />
              </span>

              <div className="flex flex-col gap-1.5 pt-1.5">
                <h3 className="font-heading font-bold text-[17px] leading-[1.25] m-0" style={{ color: m.color }}>
                  {m.title}
                </h3>
                <p className="font-body text-[14px] text-surface-500 leading-[1.6] m-0">
                  {m.by}
                </p>
                {m.image && (
                  <img
                    src={m.image}
                    alt={m.title}
                    loading="lazy"
                    className="mt-2 w-full max-w-[320px] rounded-xl object-cover border-4 border-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section 4 - Leadership message. The CEO message is included directly on
// this page rather than as a separate main-nav item, per the brief. Quote
// and sign-off are verbatim from src/pages/AboutUs/sections/CeoMessage.jsx
// (also used on the standalone CEO's Message page). "Read Full Leadership
// Message" is included (real destination, the standalone page) rather than
// omitted, since the full real quote is already shown here in full - the
// button is a real cross-link, not a workaround for truncated content.
function LeadershipMessageSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] bg-white">
      <div className="mx-auto max-w-[1000px] w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="section-label justify-center">Leadership Message</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            A Message from Our CMD
          </h2>
        </div>

        <motion.div
          {...fadeUp(reduceMotion, { distance: 16, duration: DURATION.sectionEntrance })}
          className="w-full bg-[#fdfbf7] border border-[#eee] rounded-[20px] p-8 sm:p-12 flex flex-col items-center gap-7"
        >
          <div className="w-full relative border-l-4 border-brand-600 pl-7 py-2">
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.25 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: EASE_PREMIUM }}
              className="absolute -left-1 -top-2 font-heading font-black text-[48px] leading-none select-none text-brand-600"
            >
              "
            </motion.span>
            <p className="font-body text-[16px] sm:text-[18px] font-medium leading-[1.7] text-surface-700 m-0 italic">
              "SKM EGG Products is a finest example of how a strong value system and drive for excellence can keep you ahead in a competitive environment. Thinking out of the shell was a mantra we adopted consciously not just to give ourselves the edge but also to keep pushing ourselves to innovate. Today, we are one of the Asia's biggest egg processing plant, the future looks both exciting and promising to us."
            </p>
          </div>
          <div className="w-14 h-[3px] rounded-full bg-brand-600" />
          <div className="flex flex-col items-center gap-1 text-center">
            <h4 className="font-heading text-[17px] font-bold text-heading m-0">Mr. SKM Shree Shivkumar</h4>
            <p className="font-body text-[12px] font-bold text-brand-600 m-0 uppercase tracking-widest">Chairman & Managing Director</p>
          </div>
        </motion.div>

        <InternalLink
          route="ceo_message"
          onPageChange={onPageChange}
          className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 hover:bg-brand-600/6 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Read Full Leadership Message
        </InternalLink>
      </div>
    </div>
  );
}

// Section 5 - Vision, mission and values. Presented as concise principles
// (short lines/tags), not the long separate cards used on the standalone
// Vision & Mission / Core Ideology pages. Vision quote, mission items, and
// core values are all real and verbatim from
// src/pages/AboutUs/sections/VisionMission.jsx and CoreIdeologyPage.jsx.
// No button, per the brief - a full corporate profile PDF is available,
// but its download button already exists in Section 1, so it isn't
// duplicated here.
const MISSION_ITEMS = ['Innovate and excel in what we do.', 'Maximize value for stakeholders.', 'Sustain integrity and honesty.', 'Contribute to social needs.'];
const CORE_VALUES = [
  'Evaluate and establish benchmarks periodically',
  'Develop and improve products and processes',
  'Deliver at a competitive price',
  'Returns by way of dividend and wealth creation',
  'Compensate and motivate employees and partners',
  'Compliance to statutory regulations',
  'Support for social causes',
];

function VisionMissionValuesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px]">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Purpose &amp; Direction</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Vision, Mission and Values
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            {...fadeUp(reduceMotion, { distance: 16, duration: DURATION.sectionEntrance })}
            className="relative flex flex-col gap-3 p-6 rounded-[18px] border border-[#eee] bg-[#fdfbf7] overflow-hidden"
          >
            <span aria-hidden="true" className="absolute top-0 left-6 right-6 h-[2px] bg-brand-600" />
            <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600">Vision</span>
            <p className="font-body text-[16px] font-medium leading-[1.6] text-surface-700 m-0 italic">
              "To be the leader in the sectors we operate with the responsibility of building a healthy society."
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(reduceMotion, { distance: 16, duration: DURATION.sectionEntrance, delay: 0.06 })}
            className="relative flex flex-col gap-3 p-6 rounded-[18px] border border-[#eee] bg-[#fdfbf7] overflow-hidden"
          >
            <span aria-hidden="true" className="absolute top-0 left-6 right-6 h-[2px] bg-brand-600" />
            <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600">Mission</span>
            <ul className="flex flex-col gap-1.5 list-none m-0 p-0">
              {MISSION_ITEMS.map((item) => (
                <li key={item} className="font-body text-[13.5px] text-surface-600 leading-[1.5] pl-4 relative">
                  <span aria-hidden="true" className="absolute left-0 text-brand-600">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...fadeUp(reduceMotion, { distance: 16, duration: DURATION.sectionEntrance, delay: 0.12 })}
            className="relative flex flex-col gap-3 p-6 rounded-[18px] border border-[#eee] bg-[#fdfbf7] overflow-hidden"
          >
            <span aria-hidden="true" className="absolute top-0 left-6 right-6 h-[2px] bg-brand-600" />
            <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600">Values</span>
            <div className="flex flex-wrap gap-1.5">
              {CORE_VALUES.map((value, i) => (
                <motion.span
                  key={value}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: EASE_PREMIUM, delay: reduceMotion ? 0 : 0.12 + i * 0.06 }}
                  className="font-body text-[11.5px] font-medium text-surface-600 bg-white border border-surface-200/70 px-2.5 py-1 rounded-[6px]"
                >
                  {value}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Section 5 - Integrated business model. Connects feed, farm, plant,
// laboratory, and export operations using real facts already established
// this session (Feed Mill / Poultry Farm / Egg Processing Plant /
// Laboratory pages, and GlobalReachPage's real export/branch facts). "See
// How We Control the Supply Chain" routes to the real Manufacturing and
// Supply hub page.
const BUSINESS_MODEL_STAGES = [
  { label: 'Feed', fact: 'In-house feed mill screens every ingredient for mycotoxins, pesticides, and antibiotic residues before formulation.' },
  { label: 'Farm', fact: '2.4 million layers housed across ISO 22000 certified integrated farms, producing approximately 164 million eggs annually.' },
  { label: 'Plant', fact: 'European Union (EU) - Directive compliance processing plant handling up to 2 million eggs per day across dedicated yolk and albumen lines.' },
  { label: 'Branded Eggs', fact: 'Premium-quality eggs are precisely graded and individually printed with the company seal and Date of Packing (DoP) to ensure quality and traceability.' },
  // Real, verbatim-sourced facts from EggProcessingPlant.jsx / SustainabilityCommunityPage.jsx:
  // integrated biogas facility, 70-tonne poultry litter handling capacity,
  // nutrient-rich liquid fertilizer supplied to farmers at no cost.
  { label: 'Bio-Gas', fact: 'Integrated biogas facility with 70-tonne poultry litter handling capacity, supplying nutrient-rich liquid fertilizer for farmers.' },
];

function IntegratedBusinessModelSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] bg-white">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">One Supply Chain</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Integrated Business Model
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 top-[19px] h-px bg-surface-300" aria-hidden="true" />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {BUSINESS_MODEL_STAGES.map((stage, i) => {
              const delay = i * 0.12;
              return (
                <motion.div
                  key={stage.label}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : delay }}
                  className="flex flex-col gap-3"
                >
                  <span className="relative z-10 w-[38px] h-[38px] rounded-full bg-brand-600 text-white flex items-center justify-center font-heading font-bold text-[13px]">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-2 p-6 rounded-[16px] border border-[#eee] bg-[#fdfbf7] flex-1">
                    <h3 className="font-heading font-bold text-[18px] text-heading m-0">{stage.label}</h3>
                    <p className="font-body text-[15px] text-surface-500 leading-[1.6] m-0">{stage.fact}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <InternalLink
          route="manufacturing_and_supply"
          onPageChange={onPageChange}
          className="self-start inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          See How We Control the Supply Chain
        </InternalLink>
      </div>
    </div>
  );
}

// Section 7 - Awards and recognitions. Selected major awards (Padma Shree,
// APEDA Golden Trophy, Export Excellence) show initially; the rest of the
// real award list (verbatim from AccoladesPage.jsx `otherAwards`) sits
// behind a real progressive-disclosure toggle, same pattern used elsewhere
// this session. "View All Awards" routes to the real Accolades page. Also
// cross-links "Coffee Table Books" here (its real content - "a premium
// visual archive showcasing our history" - fits this section), since that
// page is no longer reachable from the main nav dropdown.
const MAJOR_AWARDS = [
   { name: 'Padma Bhushan Award', desc: 'Shri SKM Maeilanandhan received the Padma Bhushan Award from the Honourable President of India, Droupadi Murmu.' },
  { name: 'Padma Shree Award', desc: 'Shri S. K. M. Maeilanandhan was honoured with the prestigious Padma Shri Award, presented by the then President of India, Shri Pranab Mukherjee, in 2013.' },
  { name: 'APEDA Golden Trophy', desc: '"Golden Trophy" awarded by APEDA, Ministry of Commerce, Government of India, for 2011–2012 and 2012–2013.' },
  { name: 'Export Excellence Award', desc: 'Awarded at MEPZ, Special Economic Zone – Chennai, 2013.' },
];

const OTHER_AWARDS = [
  'Manufacturing Excellence Silver Award in 2006 and Manufacturing Excellence Gold Award in 2007 & 2008 by Frost & Sullivan.',
  'State Safety Award for the year 2007 by Government of Tamil Nadu.',
  'Best Export Performance Awards in 100% EOU category by MEPZ (Madras Export Processing Zone) for the year 2005-06.',
  'APEDA Silver Trophy since 2001 onwards, recognizing SKM as a leading exporter from India.',
];

function AwardsRecognitionSection({ onPageChange }) {
  const [showAll, setShowAll] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] bg-white">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Awards and recognitions</span>
          <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading tracking-tight m-0">
            Awards and Recognitions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MAJOR_AWARDS.map((award, i) => (
            <motion.div
              key={award.name}
              {...fadeUp(reduceMotion, { distance: 16, duration: DURATION.cardHover, delay: i * 0.1 })}
              className="flex flex-col gap-3 p-6 rounded-[16px] border border-[#eee] bg-[#fdfbf7]"
            >
              <h3 className="font-heading font-bold text-[15px] text-heading m-0">{award.name}</h3>
              <p className="font-body text-[13px] text-surface-500 leading-[1.5] m-0">{award.desc}</p>
            </motion.div>
          ))}
        </div>

        <button
          type="button"
          aria-expanded={showAll}
          onClick={() => setShowAll((prev) => !prev)}
          className="self-start inline-flex items-center gap-2 font-body font-semibold text-[14px] text-brand-600 hover:text-brand-700 bg-transparent border-none p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-sm"
        >
          {showAll ? 'Show Fewer Awards' : 'Show More Awards'}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`} aria-hidden>
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence initial={false}>
        {showAll && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.4, ease: EASE_PREMIUM }}
            className="flex flex-col gap-4 list-none m-0 p-0 overflow-hidden"
          >
            {OTHER_AWARDS.map((award, i) => (
              <motion.li
                key={award}
                initial={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: EASE_PREMIUM, delay: reduceMotion ? 0 : i * 0.06 }}
                className="flex items-start gap-3"
              >
                <span className="mt-[9px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-600" />
                <p className="font-body text-[14px] text-surface-500 leading-[1.6] m-0">{award}</p>
              </motion.li>
            ))}
          </motion.ul>
        )}
        </AnimatePresence>

        <div className="flex flex-wrap items-center gap-4">
          <InternalLink
            route="accolades"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            View All Awards
          </InternalLink>
          <InternalLink
            route="coffee_table_books"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2 font-body font-semibold text-[14px] text-brand-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
          >
            See Our Coffee Table Books
          </InternalLink>
        </div>
      </div>
    </div>
  );
}

// Section 8 - Locations and global operations (closing section). "View
// Global Presence" routes to the real Global Reach page (export markets +
// regional offices). "Contact SKM" routes to the real Contact Us page.
function LocationsSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] text-center px-4">
      <motion.div
        {...fadeUp(reduceMotion, { distance: 18, duration: DURATION.sectionEntrance })}
        className="mx-auto max-w-[600px] flex flex-col items-center gap-5"
      >
        <span className="section-label justify-center">Global Operations</span>
        <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] leading-[1.1] lg:leading-[1.05] text-heading m-0 tracking-tight">
          Exporting to 30+ Countries, with Regional Branches in Europe and Russia.
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <InternalLink
            route="global_reach"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            View Global Presence
          </InternalLink>
          <InternalLink
            route="contact-us"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-brand-600 text-brand-600 hover:bg-brand-600/6 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Contact SKM
          </InternalLink>
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutSKMPage({ onPageChange }) {
  const reduceMotion = useReducedMotion();
  const heroScrubRef = useRef(null);

  return (
    <PageWrapper
      seo={{
        title: 'About SKM | Company Overview, History & Leadership',
        description: "SKM Egg Products - Asia's largest integrated egg processing facility since 1996. Company overview, history, leadership message, values, and global operations in one place.",
        keywords: 'SKM Egg Products company, about SKM, egg powder manufacturer history, SKM CEO, SKM vision mission, SKM Egg Products India',
        canonical: 'https://www.skmegg.com/about_skm',
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About SKM",
          "url": "https://www.skmegg.com/about_skm",
          "description": "Asia's largest integrated egg processing facility since 1996. Company overview, history, leadership message, values, and global operations in one place.",
          "mainEntity": {
            "@type": "Organization",
            "name": "SKM Egg Products",
            "foundingDate": "1996",
            "founder": { "@type": "Person", "name": "Mr. SKM Shree Shivkumar" },
            "url": "https://www.skmegg.com",
          },
        },
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full flex flex-col bg-page">

        {/* Section 1 - Company hero. Background is a scroll-scrubbed frame
            sequence (200 UHD frames of the facility, public/about-skm-sequence),
            pinned via a sticky viewport inside a tall wrapper - same
            scroll-scrub pattern as the Home hero (Home/sections/Hero.jsx). */}
        <section ref={heroScrubRef} className="relative w-full h-[220vh]">
          <div className="sticky top-0 h-[560px] sm:h-[620px] lg:h-[680px] w-full overflow-hidden">
            <ScrollFrameSequence containerRef={heroScrubRef} basePath="/about-skm-sequence" frameCount={200} />

            {/* Left-weighted scrim - copy sits fully clear on the left,
                right/center stays open so the globe footage still reads */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, rgba(6,8,14,0.92) 0%, rgba(6,8,14,0.8) 32%, rgba(6,8,14,0.35) 58%, rgba(6,8,14,0.05) 78%, rgba(6,8,14,0) 100%)' }}
            />
            <div
              className="absolute inset-0 sm:hidden pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(6,8,14,0.55) 0%, rgba(6,8,14,0.85) 100%)' }}
            />

            <div className="relative z-10 w-full h-full mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16 flex items-center text-left">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } } }}
                className="relative flex flex-col items-start gap-6 max-w-[640px]"
              >
                <motion.span
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: EASE_PREMIUM }}
                  className="section-label"
                >
                  About SKM
                </motion.span>
                <motion.h1
                  variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: EASE_PREMIUM }}
                  className="font-heading font-bold text-[34px] sm:text-[44px] lg:text-[52px] text-white leading-[1.12] tracking-tight m-0"
                >
                  Asia's Largest Integrated Egg Processing Facility.
                </motion.h1>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 16 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: EASE_PREMIUM }}
                  className="font-body text-[16px] sm:text-[17px] text-white/85 leading-[1.7] m-0"
                >
                  Vision, mission, leadership, and values - everything a buyer needs to understand SKM, in one place.
                </motion.p>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 16 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: EASE_PREMIUM }}
                  className="flex flex-col sm:flex-row items-start gap-4 mt-3"
                >
                  <a
                    href={CompanyProfilePdf}
                    download
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                  >
                    Download Company Profile
                  </a>

                  <InternalLink
                    route="products"
                    onPageChange={onPageChange}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full border border-white/70 text-white hover:bg-white/10 font-heading font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                  >
                    Explore Our Products
                  </InternalLink>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2 - Company overview */}
        <CompanyOverviewSection onPageChange={onPageChange} />

        <CurvedDivider bg="#fff" fill="#ececec" />
        {/* Section 3 - Company journey */}
        <CompanyJourneySection onPageChange={onPageChange} />

        <CurvedDivider bg="#ececec" fill="#fff" />
        {/* Section 4 - Leadership message */}
        <LeadershipMessageSection onPageChange={onPageChange} />

        <CurvedDivider bg="#fff" fill="#ececec" />
        {/* Section 5 - Vision, mission and values */}
        <VisionMissionValuesSection />

        <CurvedDivider bg="#ececec" fill="#fff" />
        {/* Section 6 - Integrated business model */}
        <IntegratedBusinessModelSection onPageChange={onPageChange} />

        <CurvedDivider bg="#fff" fill="#fff" />
        {/* Section 7 - Awards and recognitions */}
        <AwardsRecognitionSection onPageChange={onPageChange} />

        <CurvedDivider bg="#fff" fill="#ececec" />
        {/* Section 8 - Locations and global operations */}
        <LocationsSection onPageChange={onPageChange} />

      </div>
    </PageWrapper>
  );
}
