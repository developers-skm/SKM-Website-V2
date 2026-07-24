import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import ImageSlider from '../../components/ImageSlider/ImageSlider';

// Past Exhibitions assets
import fia23_1 from '../../assets/Events - EXPO/FI ASIA THAILAND ( September 20-22-2023/1.webp';
import fia23_2 from '../../assets/Events - EXPO/FI ASIA THAILAND ( September 20-22-2023/2.webp';
import fia23_3 from '../../assets/Events - EXPO/FI ASIA THAILAND ( September 20-22-2023/3.webp';
import fia23_4 from '../../assets/Events - EXPO/FI ASIA THAILAND ( September 20-22-2023/4.webp';
import fia23_5 from '../../assets/Events - EXPO/FI ASIA THAILAND ( September 20-22-2023/5.webp';

import gfm23_1 from '../../assets/Events - EXPO/Gulfood Manufacturing (7-9 nov 2023) Dubai WTC/1.webp';
import gfm23_2 from '../../assets/Events - EXPO/Gulfood Manufacturing (7-9 nov 2023) Dubai WTC/2.webp';
import gfm23_3 from '../../assets/Events - EXPO/Gulfood Manufacturing (7-9 nov 2023) Dubai WTC/3.webp';
import gfm23_4 from '../../assets/Events - EXPO/Gulfood Manufacturing (7-9 nov 2023) Dubai WTC/4.webp';

import fia24_booth from '../../assets/Events - EXPO/Fi Africa 2024 (May26 -28-2024) Egypt/Booth - Stall.webp';
import fia24_disc from '../../assets/Events - EXPO/Fi Africa 2024 (May26 -28-2024) Egypt/discussion with customers.webp';
import fia24_2 from '../../assets/Events - EXPO/Fi Africa 2024 (May26 -28-2024) Egypt/2.webp';
import fia24_4 from '../../assets/Events - EXPO/Fi Africa 2024 (May26 -28-2024) Egypt/4.webp';
import fia24_5 from '../../assets/Events - EXPO/Fi Africa 2024 (May26 -28-2024) Egypt/5.webp';

import fivn24_1 from '../../assets/Events - EXPO/Fi Vietnam 2024 (Oct 9-11-2024) Vietnam/1.webp';
import fivn24_2 from '../../assets/Events - EXPO/Fi Vietnam 2024 (Oct 9-11-2024) Vietnam/2.webp';
import fivn24_3 from '../../assets/Events - EXPO/Fi Vietnam 2024 (Oct 9-11-2024) Vietnam/3.webp';
import fivn24_4 from '../../assets/Events - EXPO/Fi Vietnam 2024 (Oct 9-11-2024) Vietnam/4.webp';
import fivn24_5 from '../../assets/Events - EXPO/Fi Vietnam 2024 (Oct 9-11-2024) Vietnam/5.webp';

import fia25_1 from '../../assets/Events - EXPO/Fi Asia Thailand 2025 (Sep 17-19-2025) Thailand/1.webp';
import fia25_2 from '../../assets/Events - EXPO/Fi Asia Thailand 2025 (Sep 17-19-2025) Thailand/2.webp';
import fia25_3 from '../../assets/Events - EXPO/Fi Asia Thailand 2025 (Sep 17-19-2025) Thailand/3.webp';
import fia25_4 from '../../assets/Events - EXPO/Fi Asia Thailand 2025 (Sep 17-19-2025) Thailand/4.webp';
import fia25_5 from '../../assets/Events - EXPO/Fi Asia Thailand 2025 (Sep 17-19-2025) Thailand/5.webp';

import gfm25_1 from '../../assets/Events - EXPO/Gulf food Manufacturing2025(3-5nov)  Dubai/1.webp';
import gfm25_2 from '../../assets/Events - EXPO/Gulf food Manufacturing2025(3-5nov)  Dubai/2.webp';
import gfm25_3 from '../../assets/Events - EXPO/Gulf food Manufacturing2025(3-5nov)  Dubai/3.webp';
import gfm25_4 from '../../assets/Events - EXPO/Gulf food Manufacturing2025(3-5nov)  Dubai/4.webp';
import gfm25_5 from '../../assets/Events - EXPO/Gulf food Manufacturing2025(3-5nov)  Dubai/5.webp';

import fivn26_1 from '../../assets/Events - EXPO/Fi Vietnam 2026 (May13-15) Vietnam/1.webp';
import fivn26_2 from '../../assets/Events - EXPO/Fi Vietnam 2026 (May13-15) Vietnam/2.webp';
import fivn26_3 from '../../assets/Events - EXPO/Fi Vietnam 2026 (May13-15) Vietnam/3.webp';
import fivn26_4 from '../../assets/Events - EXPO/Fi Vietnam 2026 (May13-15) Vietnam/4.webp';
import fivn26_5 from '../../assets/Events - EXPO/Fi Vietnam 2026 (May13-15) Vietnam/5.webp';

import seoul26_1 from '../../assets/Events - EXPO/Seoul Food 2026 (June 9-12)/1.webp';
import seoul26_2 from '../../assets/Events - EXPO/Seoul Food 2026 (June 9-12)/2.webp';
import seoul26_3 from '../../assets/Events - EXPO/Seoul Food 2026 (June 9-12)/3.webp';
import seoul26_4 from '../../assets/Events - EXPO/Seoul Food 2026 (June 9-12)/4.webp';
import seoul26_5 from '../../assets/Events - EXPO/Seoul Food 2026 (June 9-12)/5.webp';

// Brochure files served as static PDFs from public/documents/brochures/.
import { getBrochureUrl } from '../../data/brochureUrl';

// Section 3 — Upcoming Exhibitions Data. SKM has genuinely exhibited at
// each of these recurring international food-ingredient fairs before (see
// Participated Events above), so the fair name and country are real — but
// the next edition's exact dates, venue, and booth/stand number are not
// yet announced/assigned. Rather than reuse a past edition's photos next
// to an unconfirmed date (misleading — implies that edition is upcoming),
// each card shows an honest "Coming Soon" placeholder instead of an image.
// No startDateRaw/endDateRaw here — the "Add to Calendar" action requires
// a real confirmed date and is disabled until one exists.
const upcomingExhibitions = [
  { id: 'fia26', title: 'Food Ingredients Asia (Fi Asia)', country: 'Thailand', date: 'Dates to be confirmed' },
  { id: 'gfm26', title: 'Gulfood Manufacturing', country: 'UAE', date: 'Dates to be confirmed' },
  { id: 'fia27egypt', title: 'Food Ingredients Africa (Fi Africa)', country: 'Egypt', date: 'Dates to be confirmed' },
  { id: 'fivn28', title: 'Food Ingredients Vietnam (Fi Vietnam)', country: 'Vietnam', date: 'Dates to be confirmed' },
  { id: 'sf27', title: 'Seoul Food & Hotel', country: 'South Korea', date: 'Dates to be confirmed' },
];

// Past Exhibitions Data
const pastExhibitions = [
  { title: 'FI Asia Thailand 2023', tag: 'Food Ingredients Asia', location: 'Thailand', country: 'Thailand', dateRange: 'Sep 20–22, 2023', year: '2023', desc: 'SKM showcased its full line of egg powder solutions to Asian bakery and noodle manufacturers.', images: [fia23_1, fia23_2, fia23_3, fia23_4, fia23_5] },
  { title: 'Gulfood Manufacturing 2023', tag: 'Gulfood Manufacturing', location: 'Dubai WTC, Dubai', country: 'UAE', dateRange: 'Nov 7–9, 2023', year: '2023', desc: 'SKM expanded commercial partnerships with major Middle Eastern dairy and mayonnaise brands.', images: [gfm23_1, gfm23_2, gfm23_3, gfm23_4] },
  { title: 'Fi Africa 2024', tag: 'Food Ingredients Africa', location: 'Cairo, Egypt', country: 'Egypt', dateRange: 'May 26–28, 2024', year: '2024', desc: 'SKM introduced customized yolk and whole egg mixes to the African baking sector.', images: [fia24_booth, fia24_disc, fia24_2, fia24_4, fia24_5] },
  { title: 'Fi Vietnam 2024', tag: 'Food Ingredients Vietnam', location: 'SECC, Ho Chi Minh City', country: 'Vietnam', dateRange: 'Oct 9–11, 2024', year: '2024', desc: 'SKM reinforced its supply agreements with key Southeast Asian noodle and sauce processors.', images: [fivn24_1, fivn24_2, fivn24_3, fivn24_4, fivn24_5] },
  { title: 'FI Asia Thailand 2025', tag: 'Food Ingredients Asia', location: 'QSNCC, Bangkok', country: 'Thailand', dateRange: 'Sep 17–19, 2025', year: '2025', desc: 'SKM displayed enzyme-modified heat-stable yolk powders for high-temp processing.', images: [fia25_1, fia25_2, fia25_3, fia25_4, fia25_5] },
  { title: 'Gulfood Manufacturing 2025', tag: 'Gulfood Manufacturing', location: 'Dubai WTC, Dubai', country: 'UAE', dateRange: 'Nov 3–5, 2025', year: '2025', desc: 'SKM established high-volume contracts for liquid pasteurized mixes with GCC partners.', images: [gfm25_1, gfm25_2, gfm25_3, gfm25_4, gfm25_5] },
  { title: 'Fi Vietnam 2026', tag: 'Food Ingredients Vietnam', location: 'SECC, Ho Chi Minh City', country: 'Vietnam', dateRange: 'May 13–15, 2026', year: '2026', desc: 'Presented premium bakery mixes to fast-growing culinary chains across Indochina.', images: [fivn26_1, fivn26_2, fivn26_3, fivn26_4, fivn26_5] },
  { title: 'Seoul Food 2026', tag: 'Seoul Food & Hotel', location: 'KINTEX, South Korea', country: 'South Korea', dateRange: 'Jun 9–12, 2026', year: '2026', desc: 'Demonstrated complete traceability compliance for premium egg white cube products.', images: [seoul26_1, seoul26_2, seoul26_3, seoul26_4, seoul26_5] }
];

// Section 4 — Company News Data
const companyNews = [
  {
    id: 'news1',
    category: 'Capacity & Expansion',
    title: 'SKM Expands Liquid Processing Capacity by 30% to Meet Growing Demand',
    date: 'July 12, 2026',
    excerpt: 'SKM has installed state-of-the-art cold-separation lines and automated pasteurizers to ramp up liquid whole egg, yolk, and albumen production at our Erode facility.',
    readTime: '3 min read',
    content: 'SKM Egg Products is pleased to announce a significant capacity expansion at our main processing facility in Erode, Tamil Nadu. By installing new high-speed cold-separation lines and automated thermal pasteurizers, our processing capacity for liquid egg products has increased by 30% to support growing demand from industrial bakeries and sauce manufacturers across Southeast Asia and the Middle East.\n\nThis expansion incorporates advanced clean-in-place (CIP) technologies and double-pasteurization parameters to ensure maximum microbiological safety and longer shelf-life while preserving the natural foaming and emulsification properties of the eggs. The new separation lines will also feed our customized mixing plant, enabling faster lead times for pre-blended products.'
  },
  {
    id: 'news2',
    category: 'Sustainability',
    title: 'SKM Achieves Carbon-Neutral Milestone at Erode Plant via Wind Energy Investment',
    date: 'June 28, 2026',
    excerpt: 'Over 3.5 million units of clean energy generated annually via captive wind farms, powering 85% of SKM\'s egg processing and biosecurity operations.',
    readTime: '4 min read',
    content: 'As part of our commitment to sustainable food manufacturing, SKM Egg Products has achieved a major environmental milestone. In the past fiscal year, our captive wind turbine farms generated over 3.5 million units of electricity, directly powering 85% of the energy requirements at our processing plant and NABL-accredited laboratory.\n\nBy transitioning our thermal and electrical systems toward renewable sources, we have reduced our annual carbon emissions by approximately 2,800 metric tons. This carbon-neutral electricity sourcing aligns with our global customers\' sustainable supply chain policies and ensures our egg powders and liquids carry one of the lowest carbon footprints in the B2B egg ingredients industry.'
  },
  {
    id: 'news3',
    category: 'Certifications & Compliance',
    title: 'New Export Certification Earned for Premium Customized Blends',
    date: 'May 15, 2026',
    excerpt: 'Expanding global reach with key compliance approvals for specialized bakery and confectionery liquid mixes in Southeast Asian markets.',
    readTime: '3 min read',
    content: 'SKM has successfully secured new compliance certifications for our customized egg mixes from international regulatory authorities. These certifications validate our rigorous processing controls and backward-integrated supply chain transparency.\n\nThe new certifications cover customized liquid yolk and whole egg blends containing sugar, salt, and food-grade stabilizers designed for the automated industrial baking sector. Achieving these standards opens up direct export pathways to several new premium confectionery manufacturers in Japan and South Korea who require absolute traceability and zero-residue guarantees.'
  }
];

// Section 5 — Technical Insights Data
const technicalInsights = [
  {
    id: 'insight1',
    topic: 'Egg functionality',
    title: 'Unlocking Gel Strength: How Temperature Affects Egg Albumen Powders',
    excerpt: 'Dive deep into how high-gel vs. medium-gel albumen powder performs under different temperatures in meat processing and confectionery.',
    readTime: '5 min read',
    flyerName: 'SKM EGG ALBUMEN POWDER    A5 FLYER (F&B).pdf',
    content: 'Egg albumen contains key proteins (ovalbumin, conalbumin, ovomucoid) that denature at specific temperatures to form a firm, three-dimensional gel network. In meat processing, high-gel albumen powder is critical for achieving optimal water-binding capacity and mechanical sliceability. We recommend a heating phase of at least 74°C for 20 minutes to complete the gelation process, preventing syneresis (water release) and ensuring a clean bite. For confectionery (marshmallows and nougats), whipping properties can be optimized by maintaining a pH of 6.5 to 7.0 and whipping at room temperature before adding hot sugar syrup.'
  },
  {
    id: 'insight2',
    topic: 'Product handling',
    title: 'Optimal Storage Protocols for Frozen vs. Chilled Liquid Eggs',
    excerpt: 'Best practices for thawing frozen yolk mixes and managing shelf-life for chilled liquid eggs to preserve foaming capacity.',
    readTime: '4 min read',
    flyerName: 'SKM EGG YOLK POWDER A5 FLYER (F&B).pdf',
    content: 'Liquid egg ingredients are highly sensitive to thermal fluctuations. Chilled liquid eggs must be stored strictly between 0°C and 4°C and used within their specified shelf life to avoid protein breakdown. For frozen liquid eggs (stored at ≤ -18°C), the thawing process is critical. Rapid thawing at room temperature or using warm water causes local hot spots that denature proteins and destroy emulsification capabilities. Thawing must occur slowly under refrigeration (between 2°C and 6°C) over 24 to 48 hours, followed by gentle agitation before introducing the liquid into batch mixers.'
  },
  {
    id: 'insight3',
    topic: 'Application challenges',
    title: 'Preventing Oil-Water Separation in Industrial Mayonnaise Emulsions',
    excerpt: 'Why heat-stable yolk powder is essential for retorted dressings and how to calibrate shear rates during production.',
    readTime: '6 min read',
    flyerName: 'SKM BAKERY MIX A5 FLYER (F&B).pdf',
    content: 'Mayonnaise is a high-oil emulsion stabilized by the lecithin-lipoprotein complexes in egg yolk. In retorted or pasteurized dressings, standard egg yolk fails because heat denatures the proteins, breaking the emulsion and causing oil separation. SKM\'s Heat-Stable Egg Yolk Powder is enzyme-modified to increase thermal tolerance, preventing emulsion breakdown even under high-temperature pasteurization. When preparing the emulsion, the oil addition rate must be carefully calibrated against high-shear mixing speeds to maintain drop size consistency between 2 and 5 microns.'
  },
  {
    id: 'insight4',
    topic: 'Quality and traceability',
    title: 'From Feed to Fork: Mitigating Residues in B2B Exports',
    excerpt: 'A technical review of SKM\'s captive feed screening methods and GC-MS testing procedures that guarantee zero residue.',
    readTime: '5 min read',
    flyerName: 'SKM WHOLE EGG POWDER A5 FLYER (F&B).pdf',
    content: 'Guaranteeing zero pesticide, antibiotic, and heavy metal residues in bulk egg exports requires complete control over the hen\'s diet. At SKM, our in-house feed mill screens all incoming grains using advanced High-Performance Liquid Chromatography (HPLC) and Gas Chromatography-Mass Spectrometry (GC-MS). This ensures that no contaminated feed enters our layer farms. Furthermore, each finished egg batch is tested in our NABL-accredited laboratory (ISO/IEC 17025) before processing, providing absolute traceability back to the feed batch and layer house for each shipment.'
  },
  {
    id: 'insight5',
    topic: 'Market information',
    title: 'Global Egg Ingredient Trends: The Shift Towards Functional Custom Mixes',
    excerpt: 'An analytical view on why bakeries are replacing shell eggs with customized mixes containing pre-dosed salt, sugar, and stabilizers.',
    readTime: '4 min read',
    flyerName: 'SKM BAKERY MIX A5 FLYER (F&B).pdf',
    content: 'Industrial bakeries globally are shifting away from shell egg cracking and plain egg powders toward pre-blended functional mixes. This shift is driven by three main factors: consistency, labor costs, and food safety. Custom mixes pre-blended with salt, sugar, or specialty texturizers allow bakeries to bypass ingredient scaling steps, eliminating human error on the factory floor. Additionally, these custom blends are pasteurized as a compound, ensuring a much lower microbiological profile compared to manual shell egg additions.'
  }
];

// Topic list for Section 5 tabs
const topics = [
  'Egg functionality',
  'Product handling',
  'Application challenges',
  'Quality and traceability',
  'Market information'
];

export default function EventsPage({ onPageChange }) {
  // Modal / Form States
  const [activeMeetingEvent, setActiveMeetingEvent] = useState(null);
  const [meetingForm, setMeetingForm] = useState({ name: '', email: '', company: '', date: '', message: '' });
  const [meetingSubmitted, setMeetingSubmitted] = useState(false);

  const [activeArticle, setActiveArticle] = useState(null);
  const [activeInsight, setActiveInsight] = useState(null);

  // Technical Insight filter state
  const [selectedTopic, setSelectedTopic] = useState('Egg functionality');

  // Newsletter Subscribe state
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeError, setSubscribeError] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  // Locks background scroll while any of the 3 modals is open — previously
  // the page could still scroll behind an open modal.
  const isAnyModalOpen = Boolean(activeMeetingEvent || activeArticle || activeInsight);
  useEffect(() => {
    if (!isAnyModalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isAnyModalOpen]);

  // Smooth scroll handler
  const handleScrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // .ics File Generator
  const downloadIcs = useCallback((event) => {
    const cleanTitle = event.title.replace(/,/g, '\\,');
    const cleanLocation = `${event.boothInfo}, ${event.country}`.replace(/,/g, '\\,');

    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SKM Egg Products//Exhibitions//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${cleanTitle}`,
      `DTSTART;VALUE=DATE:${event.startDateRaw}`,
      `DTEND;VALUE=DATE:${event.endDateRaw}`,
      `LOCATION:${cleanLocation}`,
      `DESCRIPTION:Exhibition: ${event.title}\\nBooth info: ${event.boothInfo}\\nCountry: ${event.country}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'DESCRIPTION:Reminder for ' + cleanTitle,
      'ACTION:DISPLAY',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  // Booking Meeting Submit Handler
  const handleBookMeeting = (e) => {
    e.preventDefault();
    if (!meetingForm.name || !meetingForm.email || !meetingForm.company) {
      alert('Please fill in Name, Email, and Company.');
      return;
    }
    setMeetingSubmitted(true);
    setTimeout(() => {
      setMeetingForm({ name: '', email: '', company: '', date: '', message: '' });
      setActiveMeetingEvent(null);
      setMeetingSubmitted(false);
    }, 2500);
  };

  // Subscribe Submit Handler
  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribeError('');
    if (!subscribeEmail) {
      setSubscribeError('Email address is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscribeEmail)) {
      setSubscribeError('Please enter a valid email address.');
      return;
    }
    setSubscribeSuccess(true);
    setSubscribeEmail('');
  };

  // Filtered technical insights for Section 5
  const filteredInsights = useMemo(() => {
    return technicalInsights.filter(insight => insight.topic === selectedTopic);
  }, [selectedTopic]);

  const activeInsightBrochureUrl = useMemo(
    () => (activeInsight ? getBrochureUrl(activeInsight.flyerName) : null),
    [activeInsight]
  );

  return (
    <PageWrapper
      seo={{
        title: 'News, Insights & Events | SKM Egg Products',
        description: 'Explore the trade exhibitions, latest corporate news, and technical food-science insights from SKM Egg Products.',
        keywords: 'SKM Events, B2B egg powder insights, food expo, Gulfood manufacturing, Fi Asia, egg processing news',
      }}
      breadcrumbItems={[{ label: 'About Us' }, { label: 'News & Events' }]}
      onPageChange={onPageChange}
    >
      <div className="w-full bg-page dark:bg-surface-950 overflow-hidden text-surface-800 dark:text-surface-200">
        
        {/* Section 1 — Hero */}
        <div className="relative w-full py-[80px] lg:py-[120px] bg-gradient-to-b from-brand-600/5 via-transparent to-transparent border-b border-[#eee] dark:border-surface-800/40 text-center px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,var(--color-brand-100/10)_0%,transparent_50%)] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-[850px] flex flex-col items-center gap-6 relative z-10"
          >
            <span className="section-label justify-center bg-brand-600/10 text-brand-600 dark:text-brand-400 font-semibold px-3 py-1 rounded-full text-[12px] uppercase tracking-wider">
              Corporate Feed
            </span>
            <h1 className="font-heading font-bold text-[38px] sm:text-[50px] lg:text-[62px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
              News, Insights &amp; Events
            </h1>
            <p className="font-body text-[16px] sm:text-[18px] text-surface-500 dark:text-surface-400 max-w-2xl leading-[1.6] m-0">
              Combine trade exhibitions, company news and technical insights.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <button
                type="button"
                onClick={() => handleScrollTo('upcoming-exhibitions')}
                className="inline-flex items-center justify-center min-h-[46px] px-7 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[14px] uppercase tracking-[0.05em] transition-all duration-200 shadow-lg shadow-brand-600/15 cursor-pointer"
              >
                View Upcoming Events
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo('technical-insights')}
                className="inline-flex items-center justify-center min-h-[46px] px-7 rounded-full border border-surface-300 dark:border-surface-700 hover:border-brand-600 hover:text-brand-600 dark:hover:text-brand-400 font-heading font-bold text-[14px] uppercase tracking-[0.05em] transition-all duration-200 cursor-pointer bg-white dark:bg-surface-900"
              >
                Read Latest Insights
              </button>
            </div>
          </motion.div>
        </div>

        {/* Section 2 — Upcoming Exhibitions */}
        <section id="upcoming-exhibitions" className="w-full py-[60px] lg:py-[90px] border-b border-[#eee] dark:border-surface-800/40">
          <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
            <div className="flex flex-col gap-2 max-w-3xl">
              <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white m-0 tracking-tight">
                Upcoming Exhibitions
              </h2>
              <p className="font-body text-[14.5px] text-surface-500 dark:text-surface-400 leading-[1.6]">
                Meet our export trade representatives in person at the world’s leading food ingredient expositions. Secure a direct B2B consultation slot.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {upcomingExhibitions.map((expo) => (
                <div
                  key={expo.id}
                  className="flex flex-col bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[16px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-brand-600/30 group"
                >
                  <div className="relative h-[160px] w-full overflow-hidden bg-surface-100 dark:bg-surface-800 flex flex-col items-center justify-center gap-1.5">
                    <svg className="w-6 h-6 text-brand-600/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-body text-[11px] font-bold uppercase tracking-widest text-surface-400 dark:text-surface-500">
                      Coming Soon
                    </span>
                    <div className="absolute top-3 left-3 bg-brand-600 text-white font-body text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
                      {expo.country}
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="font-body text-[11px] font-bold text-surface-400 dark:text-surface-500 uppercase tracking-wide">
                        {expo.date}
                      </span>
                      <h3 className="font-heading text-[17px] font-bold text-heading dark:text-white m-0 group-hover:text-brand-600 transition-colors">
                        {expo.title}
                      </h3>
                      <p className="font-body text-[13px] text-surface-500 dark:text-surface-400 leading-snug">
                        SKM has exhibited at this fair before and plans to attend again — full schedule details will be published once confirmed.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 pt-2 border-t border-[#f3f3f3] dark:border-surface-800">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMeetingEvent(expo);
                          setMeetingForm(prev => ({ ...prev, date: '' }));
                        }}
                        className="w-full inline-flex items-center justify-center min-h-[38px] rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-bold text-[12.5px] transition-colors cursor-pointer"
                      >
                        Book a Meeting at This Event
                      </button>
                      {expo.startDateRaw ? (
                        <button
                          type="button"
                          onClick={() => downloadIcs(expo)}
                          className="w-full inline-flex items-center justify-center min-h-[38px] rounded-full border border-surface-200 dark:border-surface-700 hover:border-brand-600 dark:hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 text-surface-600 dark:text-surface-300 font-body font-semibold text-[12.5px] transition-colors cursor-pointer bg-transparent"
                        >
                          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                          Add to Calendar
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          title="Dates not yet confirmed for this event"
                          aria-disabled="true"
                          className="w-full inline-flex items-center justify-center min-h-[38px] rounded-full border border-surface-200 dark:border-surface-700 text-surface-350 dark:text-surface-600 font-body font-semibold text-[12.5px] cursor-not-allowed opacity-60 bg-transparent"
                        >
                          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                          Add to Calendar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3 — Participated Events */}
        <section id="participated-events" className="w-full py-[60px] lg:py-[90px] border-b border-[#eee] dark:border-surface-800/40">
          <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
            <div className="flex flex-col gap-2 max-w-3xl">
              <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white m-0 tracking-tight">
                Participated Events
              </h2>
              <p className="font-body text-[14.5px] text-surface-500 dark:text-surface-400 leading-[1.6]">
                A look back at the international food ingredient expositions where SKM has exhibited in person, 2023–2026.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pastExhibitions.map((past) => (
                <div
                  key={past.title}
                  className="flex flex-col bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[16px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-brand-600/30 group"
                >
                  <div className="relative h-[160px] w-full overflow-hidden bg-surface-100 dark:bg-surface-800">
                    {past.images && past.images.length > 0 ? (
                      <div className="[&>div:first-child>div:last-child]:hidden [&_.project-card-skm]:!rounded-none h-full w-full">
                        <ImageSlider
                          images={past.images.map(img => ({ src: img, label: '' }))}
                          aspectRatio="16/9"
                          slidesPerView={1}
                          autoPlay={4500}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-600/10 to-brand-600/5 text-brand-600">
                        No Image
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-brand-600 text-white font-body text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
                      {past.country}
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col gap-2">
                    <span className="font-body text-[11px] font-bold text-surface-400 dark:text-surface-500 uppercase tracking-wide">
                      {past.dateRange}
                    </span>
                    <h3 className="font-heading text-[17px] font-bold text-heading dark:text-white m-0 group-hover:text-brand-600 transition-colors">
                      {past.title}
                    </h3>
                    <p className="font-body text-[13px] text-surface-500 dark:text-surface-400 leading-snug m-0">
                      {past.desc}
                    </p>
                    <span className="font-body text-[11.5px] text-surface-400 dark:text-surface-500 font-medium mt-1">
                      {past.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 — Company News */}
        <section id="company-news" className="w-full py-[60px] lg:py-[90px] bg-surface-50/50 dark:bg-surface-900/20 border-b border-[#eee] dark:border-surface-800/40">
          <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
            <div className="flex flex-col gap-2 max-w-3xl">
              <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white m-0 tracking-tight">
                Company News
              </h2>
              <p className="font-body text-[14.5px] text-surface-500 dark:text-surface-400 leading-[1.6]">
                Stay informed with the latest organizational announcements, operations milestones, and sustainability expansion news from SKM.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {companyNews.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col justify-between bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[16px] p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative group hover:border-brand-600/30"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-brand-600/8 border border-brand-600/15 text-brand-600 dark:text-brand-400 text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                        {article.category}
                      </span>
                      <span className="font-body text-[12px] text-surface-400 dark:text-surface-500">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="font-heading text-[18px] font-bold text-heading dark:text-white m-0 leading-tight group-hover:text-brand-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 leading-[1.6] m-0">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#f5f5f5] dark:border-surface-800/80 flex items-center justify-between">
                    <span className="font-body text-[12px] text-surface-450 dark:text-surface-500">
                      {article.readTime}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveArticle(article)}
                      className="inline-flex items-center gap-1 font-body font-bold text-[12.5px] uppercase tracking-wider text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors bg-transparent border-none p-0 cursor-pointer"
                    >
                      Read Article
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5 — Technical Insights */}
        <section id="technical-insights" className="w-full py-[60px] lg:py-[90px] border-b border-[#eee] dark:border-surface-800/40">
          <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
            <div className="flex flex-col gap-2 max-w-3xl">
              <h2 className="font-heading font-bold text-[28px] sm:text-[34px] text-heading dark:text-white m-0 tracking-tight">
                Technical Insights
              </h2>
              <p className="font-body text-[14.5px] text-surface-500 dark:text-surface-400 leading-[1.6]">
                Scientific analysis, product parameters, and application guidelines from our R&amp;D food technologies and NABL lab managers.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#eee] dark:border-surface-800">
              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  aria-pressed={selectedTopic === topic}
                  className={`inline-flex items-center min-h-[38px] px-5 py-1.5 rounded-full border font-body text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                    selectedTopic === topic
                      ? 'bg-brand-600 border-brand-600 text-white shadow-md'
                      : 'bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-800 text-surface-600 dark:text-surface-300 hover:border-brand-600/50 hover:bg-brand-600/5'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Filtered Insights Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[220px]">
              <AnimatePresence mode="wait">
                {filteredInsights.map((insight) => {
                  const brochureUrl = getBrochureUrl(insight.flyerName);
                  return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col justify-between bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[16px] p-6 shadow-sm hover:shadow-md transition-all hover:border-brand-600/25"
                  >
                    <div className="flex flex-col gap-3">
                      <span className="font-body text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                        Topic: {insight.topic}
                      </span>
                      <h3 className="font-heading text-[18px] font-bold text-heading dark:text-white m-0 leading-snug">
                        {insight.title}
                      </h3>
                      <p className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 leading-[1.6] m-0">
                        {insight.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#f5f5f5] dark:border-surface-800/80 flex flex-wrap items-center justify-between gap-3">
                      <span className="font-body text-[12px] text-surface-400 dark:text-surface-500">
                        {insight.readTime}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveInsight(insight)}
                          className="inline-flex items-center min-h-[34px] px-4 rounded-full border border-surface-200 dark:border-surface-700 hover:border-brand-600 dark:hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 font-body font-bold text-[12px] uppercase tracking-wider text-surface-600 dark:text-surface-300 transition-colors cursor-pointer bg-transparent"
                        >
                          Read Insight
                        </button>
                        {brochureUrl ? (
                          <a
                            href={brochureUrl}
                            download
                            className="inline-flex items-center min-h-[34px] px-4 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-bold text-[12px] uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Download Guide
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="inline-flex items-center min-h-[34px] px-4 rounded-full bg-surface-200 dark:bg-surface-800 text-surface-400 dark:text-surface-600 font-body font-bold text-[12px] uppercase tracking-wider cursor-not-allowed"
                            title="Guide document coming soon"
                          >
                            Download Guide
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Section 6 — Subscribe */}
        <section id="subscribe" className="w-full py-[80px] lg:py-[100px] bg-gradient-to-t from-brand-600/5 via-transparent to-transparent text-center px-4">
          <div className="mx-auto max-w-[650px] bg-white dark:bg-surface-900 border border-[#eee] dark:border-surface-800 rounded-[24px] p-8 sm:p-10 shadow-lg flex flex-col items-center gap-6 relative">
            <div className="w-12 h-12 rounded-full bg-brand-600/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
              </svg>
            </div>

            <div className="flex flex-col gap-1.5">
              <h2 className="font-heading font-bold text-[24px] sm:text-[28px] text-heading dark:text-white m-0 tracking-tight">
                Subscribe to SKM Updates
              </h2>
              <p className="font-body text-[14px] text-surface-500 dark:text-surface-400 max-w-md mx-auto leading-relaxed">
                Stay updated on upcoming exhibitions, new corporate news releases, and industrial egg ingredient guidelines.
              </p>
            </div>

            {subscribeSuccess ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 p-5 rounded-xl flex flex-col items-center gap-2"
              >
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="font-heading font-bold text-[15px] text-green-800 dark:text-green-400 m-0">Subscription Successful!</h4>
                <p className="font-body text-[13px] text-green-700 dark:text-green-550 m-0">Thank you for subscribing to SKM Updates.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                  <input
                    type="email"
                    value={subscribeEmail}
                    onChange={(e) => {
                      setSubscribeEmail(e.target.value);
                      if (subscribeError) setSubscribeError('');
                    }}
                    placeholder="Enter your professional email address"
                    aria-label="Email address for subscription"
                    className="flex-grow min-h-[46px] px-4 rounded-full border border-surface-250 dark:border-surface-800 bg-white dark:bg-surface-900 font-body text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-surface-400"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-heading font-bold text-[13px] uppercase tracking-[0.05em] transition-colors cursor-pointer"
                  >
                    Subscribe to SKM Updates
                  </button>
                </div>
                {subscribeError && (
                  <p className="font-body text-[12px] text-[#e40a18] text-left px-3 m-0">{subscribeError}</p>
                )}
              </form>
            )}
          </div>
        </section>

        {/* MODAL 1 — Book a Meeting Form */}
        <AnimatePresence>
          {activeMeetingEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4"
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                className="relative w-full max-w-[520px] bg-white dark:bg-surface-900 rounded-[20px] shadow-2xl overflow-hidden border border-[#eee] dark:border-surface-800"
              >
                <div className="bg-brand-600 text-white px-6 py-5 flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-body text-[10px] font-bold uppercase tracking-wider text-brand-200">B2B Meeting Request</span>
                    <h3 className="font-heading font-bold text-[17px] m-0 truncate max-w-[360px]">
                      {activeMeetingEvent.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMeetingEvent(null);
                      setMeetingSubmitted(false);
                    }}
                    className="text-white/80 hover:text-white cursor-pointer bg-transparent border-none p-1 rounded hover:bg-white/10"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6">
                  {meetingSubmitted ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center gap-3 py-8 text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                        </svg>
                      </div>
                      <h4 className="font-heading font-bold text-[18px] text-green-800 dark:text-green-400 m-0">Meeting Slot Requested!</h4>
                      <p className="font-body text-[13.5px] text-surface-500 dark:text-surface-400 max-w-sm">
                        Thank you for scheduling a meeting at <strong>{activeMeetingEvent.country}</strong>. Our export team will verify availability and contact you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleBookMeeting} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-[12px] font-bold text-surface-500 uppercase tracking-wide">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={meetingForm.name}
                          onChange={(e) => setMeetingForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Your Name"
                          className="min-h-[40px] px-3.5 rounded-lg border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 font-body text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-[12px] font-bold text-surface-500 uppercase tracking-wide">Professional Email *</label>
                        <input
                          type="email"
                          required
                          value={meetingForm.email}
                          onChange={(e) => setMeetingForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="you@company.com"
                          className="min-h-[40px] px-3.5 rounded-lg border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 font-body text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-[12px] font-bold text-surface-500 uppercase tracking-wide">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={meetingForm.company}
                          onChange={(e) => setMeetingForm(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="Your Company Ltd"
                          className="min-h-[40px] px-3.5 rounded-lg border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 font-body text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-[12px] font-bold text-surface-500 uppercase tracking-wide">Preferred Time slot / Date</label>
                        <input
                          type="text"
                          value={meetingForm.date}
                          onChange={(e) => setMeetingForm(prev => ({ ...prev, date: e.target.value }))}
                          placeholder={activeMeetingEvent.date}
                          className="min-h-[40px] px-3.5 rounded-lg border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 font-body text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-[12px] font-bold text-surface-500 uppercase tracking-wide">Enquiry details / Message</label>
                        <textarea
                          rows={3}
                          value={meetingForm.message}
                          onChange={(e) => setMeetingForm(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Please let us know which egg product specifications you are interested in."
                          className="p-3 rounded-lg border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 font-body text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="mt-2 w-full inline-flex items-center justify-center min-h-[42px] rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-bold text-[13.5px] transition-colors cursor-pointer"
                      >
                        Submit Meeting Request
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL 2 — Company News Article Reader */}
        <AnimatePresence>
          {activeArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4"
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                className="relative w-full max-w-[650px] bg-white dark:bg-surface-900 rounded-[20px] shadow-2xl overflow-hidden border border-[#eee] dark:border-surface-800"
              >
                <div className="p-6 border-b border-[#eee] dark:border-surface-800 flex items-center justify-between bg-surface-50 dark:bg-surface-900/60">
                  <div className="flex items-center gap-3">
                    <span className="bg-brand-600/8 border border-brand-600/15 text-brand-600 dark:text-brand-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {activeArticle.category}
                    </span>
                    <span className="font-body text-[12px] text-surface-400 dark:text-surface-500">
                      {activeArticle.date}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveArticle(null)}
                    className="text-surface-400 hover:text-surface-700 dark:hover:text-white cursor-pointer bg-transparent border-none p-1 rounded hover:bg-surface-200 dark:hover:bg-surface-800"
                    aria-label="Close article"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <h2 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white m-0 leading-tight mb-4">
                    {activeArticle.title}
                  </h2>
                  <div className="font-body text-[14.5px] text-surface-600 dark:text-surface-300 leading-relaxed space-y-4 whitespace-pre-line">
                    {activeArticle.content}
                  </div>
                </div>

                <div className="p-6 border-t border-[#eee] dark:border-surface-800 flex justify-between items-center bg-surface-50 dark:bg-surface-900/60">
                  <span className="font-body text-[12px] text-surface-450 dark:text-surface-500">
                    Estimated read time: {activeArticle.readTime}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveArticle(null)}
                    className="inline-flex items-center justify-center min-h-[36px] px-5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[13px] transition-colors cursor-pointer"
                  >
                    Close Article
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL 3 — Technical Insight Reader */}
        <AnimatePresence>
          {activeInsight && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4"
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                className="relative w-full max-w-[680px] bg-white dark:bg-surface-900 rounded-[20px] shadow-2xl overflow-hidden border border-[#eee] dark:border-surface-800"
              >
                <div className="p-6 border-b border-[#eee] dark:border-surface-800 flex items-center justify-between bg-surface-50 dark:bg-surface-900/60">
                  <div className="flex items-center gap-3">
                    <span className="bg-brand-600/8 border border-brand-600/15 text-brand-600 dark:text-brand-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      Technical Insight
                    </span>
                    <span className="font-body text-[12px] text-surface-400 dark:text-surface-500 uppercase tracking-widest font-semibold">
                      {activeInsight.topic}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveInsight(null)}
                    className="text-surface-400 hover:text-surface-700 dark:hover:text-white cursor-pointer bg-transparent border-none p-1 rounded hover:bg-surface-200 dark:hover:bg-surface-800"
                    aria-label="Close insight"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <h2 className="font-heading font-bold text-[22px] sm:text-[25px] text-heading dark:text-white m-0 leading-tight mb-4">
                    {activeInsight.title}
                  </h2>
                  <div className="font-body text-[14.5px] text-surface-600 dark:text-surface-300 leading-relaxed whitespace-pre-line bg-surface-50 dark:bg-surface-950 p-4 rounded-xl mb-4 border border-[#eee] dark:border-surface-850">
                    <strong>Summary:</strong> {activeInsight.excerpt}
                  </div>
                  <div className="font-body text-[14.5px] text-surface-600 dark:text-surface-300 leading-relaxed space-y-4 whitespace-pre-line">
                    {activeInsight.content}
                  </div>
                </div>

                <div className="p-6 border-t border-[#eee] dark:border-surface-800 flex justify-between items-center bg-surface-50 dark:bg-surface-900/60">
                  <span className="font-body text-[12px] text-surface-400 dark:text-surface-500">
                    {activeInsight.readTime}
                  </span>
                  <div className="flex gap-2.5">
                    {activeInsightBrochureUrl && (
                      <a
                        href={activeInsightBrochureUrl}
                        download
                        className="inline-flex items-center min-h-[36px] px-5 rounded-full border border-surface-250 dark:border-surface-700 hover:border-brand-600 hover:text-brand-600 text-surface-600 dark:text-surface-300 font-body font-semibold text-[13px] transition-colors cursor-pointer bg-white dark:bg-surface-900"
                      >
                        Download PDF Guide
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveInsight(null)}
                      className="inline-flex items-center justify-center min-h-[36px] px-5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-semibold text-[13px] transition-colors cursor-pointer"
                    >
                      Close Insight
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageWrapper>
  );
}
