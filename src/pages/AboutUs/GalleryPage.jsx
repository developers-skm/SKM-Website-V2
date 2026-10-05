import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { itemVariants } from '../../utils/animationVariants';
import { timelineEvents, landmarkHonours } from '../../data/accolades';

const headerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const firstYear = timelineEvents[0].year;
const lastYear = timelineEvents[timelineEvents.length - 1].year;

function TrophyIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 8h24v14a12 12 0 0 1-24 0V8Z" />
      <path d="M20 12H10v4a10 10 0 0 0 10 10M44 12h10v4a10 10 0 0 1-10 10" />
      <path d="M32 34v10M22 56h20M26 44h12v12H26z" />
    </svg>
  );
}

/* One achievement on the right-hand track. */
function Milestone({ event, index, total, onOpen, register }) {
  const hasImage = Boolean(event.image);
  return (
    <motion.article
      ref={register}
      data-index={index}
      className="scroll-mt-[120px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="group relative bg-white border border-[#eee] rounded-[16px] overflow-hidden shadow-[5px_3px_40px_rgba(0,72,88,0.06)] transition-shadow duration-300 hover:shadow-[5px_8px_50px_rgba(0,72,88,0.14)]">
        {hasImage ? (
          <button
            type="button"
            onClick={() => onOpen(event)}
            className="relative block w-full aspect-[16/9] overflow-hidden bg-surface-50 cursor-zoom-in border-0 p-0"
            aria-label={`View ${event.title}`}
          >
            <img
              src={event.image}
              alt={event.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
            <span className="absolute bottom-3 right-3 text-[11px] font-body font-semibold tracking-wide uppercase bg-white/90 text-heading rounded-full px-3 py-1">
              View photo
            </span>
          </button>
        ) : (
          <div className="relative h-[120px] sm:h-[140px] bg-gradient-to-br from-brand-600/10 via-brand-600/5 to-transparent overflow-hidden">
            <TrophyIcon className="absolute right-6 -bottom-2 w-[120px] h-[120px] text-brand-600/20" />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 font-heading font-bold text-[56px] sm:text-[72px] leading-none text-brand-600/90">
              {event.year}
            </span>
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center rounded-full bg-brand-600 text-white font-heading font-bold text-[12px] tracking-wider px-3 py-1">
              {event.year}
            </span>
            <span className="font-body text-[12px] uppercase tracking-[0.14em] text-surface-500">
              Milestone {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
          <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading leading-[1.2] m-0 mb-3">
            {event.title}
          </h3>
          <p className="font-body text-[15px] text-surface-500 leading-[27px] m-0">{event.description}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function GalleryPage({ onPageChange }) {
  const [lightbox, setLightbox] = useState(null);
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  // Track which milestone is in the reading zone → drives the sticky year rail.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const jumpTo = (i) => refs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const progress = timelineEvents.length > 1 ? active / (timelineEvents.length - 1) : 0;

  return (
    <PageWrapper
      seo={{
        title: 'Gallery | Awards & Achievements Timeline | SKM Egg Products',
        description:
          "A timeline of SKM Egg Products' awards and achievements — APEDA trophies, MEPZ export excellence, Frost & Sullivan manufacturing excellence and the Padma Shree.",
        keywords:
          'SKM Egg Products gallery, SKM awards timeline, APEDA golden trophy, MEPZ export excellence, Padma Shree egg company',
        canonical: 'https://www.skmegg.com/gallery',
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full bg-page pt-[110px] pb-[40px] sm:pt-[130px] lg:pt-[60px] lg:pb-[100px]">
        <div className="mx-auto max-w-[1240px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-16 lg:gap-24">
          {/* ── Header ── */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center flex flex-col items-center gap-4"
          >
            <motion.span variants={itemVariants} className="section-label justify-center">
              Gallery
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[56px] text-heading leading-[1.1] tracking-tight m-0 uppercase"
            >
              Our Journey of <span className="text-brand-600">Achievements</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="font-body text-[16px] text-surface-500 max-w-2xl leading-[30px] m-0"
            >
              Two decades of national export awards, manufacturing excellence and recognition —
              in the order they were earned.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-4 grid grid-cols-3 divide-x divide-[#e5e5e5] bg-white border border-[#eee] rounded-[16px] shadow-[5px_3px_40px_rgba(0,72,88,0.06)] w-full max-w-[640px]"
            >
              {[
                { value: String(firstYear), label: 'First APEDA trophy' },
                { value: String(timelineEvents.length), label: 'Milestones' },
                { value: String(lastYear), label: 'Latest on record' },
              ].map((s) => (
                <div key={s.label} className="py-5 px-2">
                  <div className="font-heading font-bold text-[26px] sm:text-[34px] text-brand-600 leading-none">
                    {s.value}
                  </div>
                  <div className="font-body text-[11px] sm:text-[12px] uppercase tracking-[0.12em] text-surface-500 mt-2">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Timeline: sticky year rail + scrolling milestones ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-16">
            {/* Rail (desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-[120px] flex gap-8">
                {/* Progress track */}
                <div className="relative w-[2px] bg-brand-600/15 rounded-full self-stretch my-2">
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-brand-600 rounded-full origin-top"
                    animate={{ height: `${progress * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>

                <div className="flex flex-col gap-6 min-w-0">
                  {/* Big year */}
                  <div className="relative h-[96px] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={timelineEvents[active].year}
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -60, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="font-heading font-bold text-[76px] leading-none text-brand-600 tracking-tight"
                      >
                        {timelineEvents[active].year}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Year index */}
                  <ul className="m-0 p-0 list-none flex flex-col gap-1">
                    {timelineEvents.map((ev, i) => (
                      <li key={`${ev.year}-${ev.title}`}>
                        <button
                          type="button"
                          onClick={() => jumpTo(i)}
                          className={`flex items-center gap-3 w-full text-left bg-transparent border-0 py-1.5 cursor-pointer font-heading text-[14px] transition-all duration-300 ${
                            i === active ? 'text-brand-600 font-bold translate-x-1' : 'text-surface-500 hover:text-heading'
                          }`}
                        >
                          <span
                            className={`h-[2px] transition-all duration-300 ${
                              i === active ? 'w-8 bg-brand-600' : 'w-4 bg-surface-500/40'
                            }`}
                          />
                          {ev.year}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Milestones */}
            <div className="flex flex-col gap-8 lg:gap-14 min-w-0">
              {timelineEvents.map((event, i) => (
                <Milestone
                  key={`${event.year}-${event.title}`}
                  event={event}
                  index={i}
                  total={timelineEvents.length}
                  onOpen={setLightbox}
                  register={(el) => (refs.current[i] = el)}
                />
              ))}
            </div>
          </div>

          {/* ── Landmark honours (no year stated in source copy) ── */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col gap-10"
          >
            <div className="text-center flex flex-col items-center gap-3">
              <motion.span variants={itemVariants} className="section-label justify-center">
                Landmark Honours
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="font-heading font-bold text-[28px] sm:text-[36px] text-heading m-0 uppercase"
              >
                Recognition at the Highest Level
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {landmarkHonours.map((h) => (
                <motion.button
                  key={h.name}
                  type="button"
                  variants={itemVariants}
                  onClick={() => setLightbox({ image: h.image, title: h.name })}
                  className="group relative block text-left p-0 border-0 rounded-[16px] overflow-hidden aspect-[4/3] cursor-zoom-in shadow-[5px_3px_40px_rgba(0,72,88,0.1)]"
                >
                  <img
                    src={h.image}
                    alt={h.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.78) 100%)' }}
                  >
                    <h3 className="font-heading font-bold text-[20px] sm:text-[24px] text-white uppercase tracking-wide m-0 mb-2 leading-[1.2]">
                      {h.name}
                    </h3>
                    <p className="font-body text-white/80 text-[13px] leading-relaxed m-0 line-clamp-2">
                      {h.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
          >
            <img
              src={lightbox.image}
              alt={lightbox.title}
              className="max-w-full max-h-[88vh] object-contain rounded-[10px]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
