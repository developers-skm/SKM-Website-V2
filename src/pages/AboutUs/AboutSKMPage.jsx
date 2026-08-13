import { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import ScrollFrameSequence from '../../components/common/ScrollFrameSequence';
import { getBrochureUrl } from '../../data/brochureUrl';
import { EASE_PREMIUM, DURATION, fadeUp } from '../../utils/motionTokens';

const CompanyProfilePdf = getBrochureUrl('Company Profile - SKM Egg Products Export India Limited.pdf');
import FactoryImage from '../../assets/2. ABOUT US/Our Company/Factory image.webp';

// Section 2 — Company overview. Real content verbatim/derived from
// src/pages/AboutUs/sections/OurCompany.jsx (also used on the standalone
// Our Company page): founded 1996, Asia's largest integrated egg
// processing facility, 2M eggs/day, 7,500 MT egg powder annually, ISO
// 22000 certified poultry & feed mill (EU compartmentalization). "View
// Manufacturing Capabilities" routes to the real Manufacturing and Supply
// hub page.
const OVERVIEW_STATS = [
  { value: '2 Million', label: 'Eggs processed per day' },
  { value: '7,500 MT', label: 'Egg powder annually' },
  { value: 'ISO 22000', label: 'Certified poultry & feed mill' },
];

function CompanyOverviewSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] bg-white">
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
            <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading leading-[1.15] tracking-tight m-0">
              Who We Are
            </h2>
            <p className="font-body text-[15px] text-surface-600 leading-[1.7] m-0">
              Established in 1996, SKM Egg Products began its journey with a clear commitment to excellence in egg processing. Today, we operate as one of Asia's largest integrated egg processing facilities, combining advanced production technology with internationally aligned quality systems.
            </p>
            <p className="font-body text-[15px] text-surface-600 leading-[1.7] m-0">
              Supported by fully integrated back-end farms, our operations process up to 2 million eggs per day, producing approximately 7,500 metric tonnes of egg powder annually — serving food manufacturers across bakery, mayonnaise, meat & fish, and noodles & pasta industries.
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

// About SKM — new consolidated page. Replaces the 8-item "About SKM" nav
// dropdown (Our Company, Vision & Mission, Core Ideology, Brand Identity,
// CEO's Message, Accolades, Events, Coffee Table Books) with a single page
// telling the whole company story in one place, per the brief: buyers
// shouldn't have to visit 7+ separate pages to understand the company. All
// 8 individual pages stay live at their existing URLs for SEO/direct
// linking (same precedent as the SKM Japan/Europe/Russia branch
// consolidation) — just no longer reachable via the main nav dropdown.
//
// Section 1 — Company hero. "Download Company Profile" downloads the real
// Company Profile PDF (src/assets/Brouchers/Company Profile - SKM Egg
// Products Export India Limited.pdf, the same file used on the Resources
// page). "Explore Our Products" routes to the real Products hub.

// Section 3 — Company journey. Pinned scroll-driven timeline from 1996 to 2016.
// As the user scrolls down, the timeline advances year by year (1996 -> 2001 ->
// 2005-06 -> 2006 -> 2007 -> 2007-08 -> 2011-13 -> 2013 -> 2016) with smooth animations,
// real-time red progress line filling, and clickable year tabs for direct jump.
const JOURNEY_MILESTONES = [
  { year: '1996', label: 'Founded', desc: "SKM Egg Products established, beginning its journey with a commitment to excellence in egg processing.", tag: 'Foundation' },
  { year: '2001', label: 'APEDA Silver Trophy', desc: 'Recognized by APEDA as a leading exporter from India, awarded annually since 2001.', tag: 'Export Leader' },
  { year: '2005–06', label: 'Best Export Performance Award', desc: '100% EOU category, awarded by MEPZ (Madras Export Processing Zone).', tag: 'EOU Recognition' },
  { year: '2006', label: 'Manufacturing Excellence Silver Award', desc: 'Awarded by Frost & Sullivan.', tag: 'Quality Standards' },
  { year: '2007', label: 'State Safety Award', desc: 'Awarded by the Government of Tamil Nadu.', tag: 'Workplace Safety' },
  { year: '2007–08', label: 'Manufacturing Excellence Gold Award', desc: 'Awarded by Frost & Sullivan, two years running.', tag: 'Gold Benchmark' },
  { year: '2011–13', label: 'APEDA Golden Trophy', desc: 'Golden Trophy awarded by APEDA, Ministry of Commerce, Government of India, for 2011–2012 and 2012–2013.', tag: 'National Trophy' },
  { year: '2013', label: 'Export Excellence Award', desc: 'Awarded at MEPZ, Special Economic Zone – Chennai.', tag: 'SEZ Excellence' },
  { year: '2016', label: 'Best 5S Practice Award', desc: 'Awarded by M/S ABK-AOTS.', tag: 'Lean Operations' },
];

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

// Desktop / large-viewport — pinned scroll-driven timeline (320vh scroll
// track, sticky panel, scroll-scrubbed year progression). Hidden below lg
// so mobile never receives a forced sticky layout or scroll-jacked height
// (same pattern as JourneyScrollSection/HomeJourney/TraceabilityLoopJourney
// — pinned sticky sections don't translate to short/narrow touch
// viewports).
function DesktopJourneyTimeline({ onPageChange }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const total = JOURNEY_MILESTONES.length;
  const milestone = JOURNEY_MILESTONES[selectedIndex];

  // Drive timeline index via scroll through sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const progressFill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Map scroll progress (0 to 1) across the total number of milestones
    const idx = Math.min(total - 1, Math.max(0, Math.floor(latest * total)));
    setSelectedIndex(idx);
  });

  const handleYearClick = (index) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrollTop;
    const sectionHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = sectionTop + (index / (total - 1)) * sectionHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative w-full h-[320vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center border-b border-[#eee] bg-page overflow-hidden py-6">
        <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8 lg:gap-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-3 max-w-2xl">
              <span className="section-label">Our History</span>
              <h2 className="font-heading font-bold text-[28px] sm:text-[36px] lg:text-[40px] text-heading leading-[1.15] tracking-tight m-0">
                Company journey
              </h2>
              <p className="font-body text-[14px] sm:text-[15px] text-surface-500 leading-[1.6] m-0">
                Scroll down to travel through SKM's history from founding in 1996 through two decades of honors.
              </p>
            </div>

            <InternalLink
              route="accolades"
              onPageChange={onPageChange}
              className="self-start md:self-auto inline-flex items-center gap-2.5 min-h-[42px] px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[12.5px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 flex-shrink-0"
            >
              Explore Our History
            </InternalLink>
          </div>

          {/* Timeline Controls & Horizontal Progress Line */}
          <div className="relative pt-[7px]">
            <div className="absolute left-0 right-0 top-[22px] h-[3px] rounded-full bg-surface-200" aria-hidden="true" />
            <motion.div
              className="absolute left-0 top-[22px] h-[3px] rounded-full bg-brand-600 origin-left"
              style={{ width: progressFill }}
              aria-hidden="true"
            />

            <div role="tablist" aria-label="Company journey milestones" className="relative grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-x-2 gap-y-6">
              {JOURNEY_MILESTONES.map((m, i) => {
                const isSelected = i === selectedIndex;
                const isPassed = i < selectedIndex;
                return (
                  <button
                    key={m.year}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleYearClick(i)}
                    className="group flex flex-col items-center gap-2.5 bg-transparent border-none p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-lg"
                  >
                    <motion.span
                      animate={{ scale: isSelected && !reduceMotion ? 1.15 : 1 }}
                      transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                      className={`relative z-10 w-[42px] h-[42px] rounded-full flex items-center justify-center font-heading font-bold text-[10.5px] border-2 transition-colors duration-200 ${
                        isSelected
                          ? 'bg-brand-600 border-brand-600 text-white ring-4 ring-brand-600/25 shadow-[0_0_16px_rgba(228,10,24,0.35)]'
                          : isPassed
                            ? 'bg-brand-600 border-brand-600 text-white'
                            : 'bg-white border-surface-300 text-surface-500 group-hover:border-brand-600/60'
                      }`}
                    >
                      {m.year.slice(0, 4)}
                    </motion.span>
                    <span
                      className={`font-body text-[11px] font-semibold uppercase tracking-wide transition-colors duration-200 hidden sm:block text-center leading-tight max-w-[90px] ${
                        isSelected ? 'text-brand-600 font-bold' : 'text-surface-400'
                      }`}
                    >
                      {m.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animated Detail Card */}
          <div className="relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -16, scale: reduceMotion ? 1 : 0.98 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: EASE_PREMIUM }}
                className="relative rounded-[24px] border border-[#eee] bg-[#fdfbf7] p-8 sm:p-10 flex flex-col gap-4 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
              >
                {/* Background Watermark Year */}
                <span
                  aria-hidden="true"
                  className="absolute right-4 -bottom-6 font-heading font-black text-[100px] sm:text-[140px] text-surface-900/[0.04] select-none pointer-events-none leading-none tabular-nums"
                >
                  {milestone.year}
                </span>

                <span aria-hidden="true" className="absolute top-0 left-0 right-0 h-[3px] bg-brand-600" />

                <div className="flex items-center justify-between gap-4 relative z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-600/10 font-body text-[11px] font-bold uppercase tracking-wider text-brand-600">
                    {milestone.tag}
                  </span>
                  <span className="font-body text-[12px] font-bold text-surface-400 tabular-nums flex-shrink-0">
                    {String(selectedIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex flex-col gap-2 relative z-10">
                  <span className="font-heading font-black text-[32px] sm:text-[42px] text-brand-600 leading-none tabular-nums">
                    {milestone.year}
                  </span>
                  <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading m-0">
                    {milestone.label}
                  </h3>
                </div>

                <p className="font-body text-[15px] sm:text-[16px] text-surface-600 leading-[1.7] m-0 max-w-[65ch] relative z-10">
                  {milestone.desc}
                </p>

                <div className="flex items-center gap-2 pt-2 text-[12px] font-body text-surface-400 relative z-10">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                  <span>Scroll down to travel to {selectedIndex < total - 1 ? JOURNEY_MILESTONES[selectedIndex + 1].year : 'the next section'}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mobile / tablet (< lg) and reduced-motion fallback — plain stacked
// milestone list, reveal-on-scroll (whileInView) per card instead of a
// pinned/scroll-scrubbed timeline. No sticky container, no 320vh scroll
// track — those don't translate to short, narrow touch viewports.
function MobileJourneyTimeline({ onPageChange, isReducedMotion = false }) {
  return (
    <section className="relative w-full border-b border-[#eee] bg-page py-[52px]">
      <div className="mx-auto max-w-[720px] w-full px-4 sm:px-6 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="section-label">Our History</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading leading-[1.15] tracking-tight m-0">
            Company journey
          </h2>
          <p className="font-body text-[14px] sm:text-[15px] text-surface-500 leading-[1.6] m-0">
            SKM's history from founding in 1996 through two decades of honors.
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

          {JOURNEY_MILESTONES.map((m) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: isReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: isReducedMotion ? 0.01 : 0.5, ease: EASE_PREMIUM, delay: isReducedMotion ? 0 : 0.05 }}
              className="relative flex gap-5 pb-8 last:pb-0"
            >
              <span className="relative z-10 flex-shrink-0 w-[42px] h-[42px] rounded-full flex items-center justify-center font-heading font-bold text-[10px] border-2 bg-brand-600 border-brand-600 text-white">
                {m.year.slice(0, 4)}
              </span>

              <div className="flex flex-col gap-1.5 pt-1.5">
                <span className="inline-flex items-center w-fit px-3 py-1 rounded-full bg-brand-600/10 font-body text-[11px] font-bold uppercase tracking-wider text-brand-600">
                  {m.tag}
                </span>
                <h3 className="font-heading font-bold text-[19px] text-heading leading-[1.25] m-0">
                  {m.year} — {m.label}
                </h3>
                <p className="font-body text-[14px] text-surface-500 leading-[1.6] m-0">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section 4 — Leadership message. The CEO message is included directly on
// this page rather than as a separate main-nav item, per the brief. Quote
// and sign-off are verbatim from src/pages/AboutUs/sections/CeoMessage.jsx
// (also used on the standalone CEO's Message page). "Read Full Leadership
// Message" is included (real destination, the standalone page) rather than
// omitted, since the full real quote is already shown here in full — the
// button is a real cross-link, not a workaround for truncated content.
function LeadershipMessageSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] bg-white">
      <div className="mx-auto max-w-[1000px] w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="section-label justify-center">Leadership Message</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading leading-[1.15] tracking-tight m-0">
            A Message From Our CEO
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
            <p className="font-body text-[12px] font-bold text-brand-600 m-0 uppercase tracking-widest">Chief Executive Officer</p>
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

// Section 5 — Vision, mission and values. Presented as concise principles
// (short lines/tags), not the long separate cards used on the standalone
// Vision & Mission / Core Ideology pages. Vision quote, mission items, and
// core values are all real and verbatim from
// src/pages/AboutUs/sections/VisionMission.jsx and CoreIdeologyPage.jsx.
// No button, per the brief — a full corporate profile PDF is available,
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
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee]">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Purpose &amp; Direction</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading leading-[1.15] tracking-tight m-0">
            Vision, mission and values
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

// Section 6 — Integrated business model. Connects feed, farm, plant,
// laboratory, and export operations using real facts already established
// this session (Feed Mill / Poultry Farm / Egg Processing Plant /
// Laboratory pages, and GlobalReachPage's real export/branch facts). "See
// How We Control the Supply Chain" routes to the real Manufacturing and
// Supply hub page.
const BUSINESS_MODEL_STAGES = [
  { label: 'Feed', fact: 'In-house feed mill screens every ingredient for mycotoxins, pesticides, and antibiotic residues before formulation.' },
  { label: 'Farm', fact: '2.4 million layers housed across ISO 22000 certified integrated farms, producing approximately 164 million eggs annually.' },
  { label: 'Plant', fact: 'EU and USDA-compliant processing plant handling up to 2 million eggs per day across dedicated yolk and albumen lines.' },
  { label: 'Laboratory', fact: 'NABL-accredited (ISO/IEC 17025) laboratory, operational since 2006, tests every batch before release.' },
  { label: 'Egg Export', fact: 'Exports to 30+ countries, with dedicated regional branches in Japan, Europe, and Russia.' },
  // Real, verbatim-sourced facts from EggProcessingPlant.jsx / SustainabilityCommunityPage.jsx:
  // integrated biogas facility, 70-tonne poultry litter handling capacity,
  // nutrient-rich liquid fertilizer supplied to farmers at no cost.
  { label: 'Bio-Gas', fact: 'Integrated biogas facility with 70-tonne poultry litter handling capacity, supplying nutrient-rich liquid fertilizer to farmers at no cost.' },
];

function IntegratedBusinessModelSection({ onPageChange }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] bg-white">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">One Supply Chain</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading leading-[1.15] tracking-tight m-0">
            Integrated business model
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 top-[19px] h-px bg-surface-300" aria-hidden="true" />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
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
                  <div className="flex flex-col gap-1.5 p-5 rounded-[16px] border border-[#eee] bg-[#fdfbf7] flex-1">
                    <h3 className="font-heading font-bold text-[15px] text-heading m-0">{stage.label}</h3>
                    <p className="font-body text-[12.5px] text-surface-500 leading-[1.5] m-0">{stage.fact}</p>
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

// Section 7 — Awards and recognitions. Selected major awards (Padma Shree,
// APEDA Golden Trophy, Export Excellence) show initially; the rest of the
// real award list (verbatim from AccoladesPage.jsx `otherAwards`) sits
// behind a real progressive-disclosure toggle, same pattern used elsewhere
// this session. "View All Awards" routes to the real Accolades page. Also
// cross-links "Coffee Table Books" here (its real content — "a premium
// visual archive showcasing our history" — fits this section), since that
// page is no longer reachable from the main nav dropdown.
const MAJOR_AWARDS = [
  { name: 'Padma Shree Award', desc: 'Shri SKM Maeilanandhan received the Padma Shree Award from the Honourable President of India, Shri Pranab Mukherjee.' },
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
    <div className="w-full py-[60px] lg:py-[85px] border-b border-[#eee] bg-white">
      <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="section-label">Honors &amp; Recognitions</span>
          <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading leading-[1.15] tracking-tight m-0">
            Awards and recognitions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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

// Section 8 — Locations and global operations (closing section). "View
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
        <h2 className="font-heading font-bold text-[26px] sm:text-[32px] text-heading m-0 tracking-tight">
          Exporting to 30+ countries, with regional branches in Japan, Europe, and Russia.
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
        description: "SKM Egg Products — Asia's largest integrated egg processing facility since 1996. Company overview, history, leadership message, values, and global operations in one place.",
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

        {/* Section 1 — Company hero. Background is a scroll-scrubbed frame
            sequence (200 UHD frames of the facility, public/about-skm-sequence),
            pinned via a sticky viewport inside a tall wrapper — same
            scroll-scrub pattern as the Home hero (Home/sections/Hero.jsx). */}
        <section ref={heroScrubRef} className="relative w-full h-[220vh]">
          <div className="sticky top-0 h-[560px] sm:h-[620px] lg:h-[680px] w-full overflow-hidden border-b border-[#eee]">
            <ScrollFrameSequence containerRef={heroScrubRef} basePath="/about-skm-sequence" frameCount={200} />

            {/* Left-weighted scrim — copy sits fully clear on the left,
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
                  Asia's Largest Integrated Egg Processing Facility Since 1996.
                </motion.h1>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 16 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: EASE_PREMIUM }}
                  className="font-body text-[16px] sm:text-[17px] text-white/85 leading-[1.7] m-0"
                >
                  Vision, mission, leadership, and values — everything a buyer needs to understand SKM, in one place.
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

        {/* Section 2 — Company overview */}
        <CompanyOverviewSection onPageChange={onPageChange} />

        {/* Section 3 — Company journey */}
        <CompanyJourneySection onPageChange={onPageChange} />

        {/* Section 4 — Leadership message */}
        <LeadershipMessageSection onPageChange={onPageChange} />

        {/* Section 5 — Vision, mission and values */}
        <VisionMissionValuesSection />

        {/* Section 6 — Integrated business model */}
        <IntegratedBusinessModelSection onPageChange={onPageChange} />

        {/* Section 7 — Awards and recognitions */}
        <AwardsRecognitionSection onPageChange={onPageChange} />

        {/* Section 8 — Locations and global operations */}
        <LocationsSection onPageChange={onPageChange} />

      </div>
    </PageWrapper>
  );
}
