import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GAP = 20;

const slideVariants = {
  enter:  (d) => ({ x: d > 0 ? '6%' : '-6%', opacity: 0 }),
  center: {      x: 0, opacity: 1, transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] } },
  exit:   (d) => ({ x: d > 0 ? '-6%' : '6%', opacity: 0, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }),
};

function useBreakpointSPV(max = 3) {
  const [spv, setSpv] = useState(() => {
    if (typeof window === 'undefined') return Math.min(3, max);
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return Math.min(2, max);
    return max;
  });

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setSpv(1);
      else if (window.innerWidth < 1024) setSpv(Math.min(2, max));
      else setSpv(max);
    };
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [max]);

  return spv;
}

export default function ImageSlider({ images, aspectRatio = '4/3', onImageClick, autoPlay = 0, slidesPerView = 3 }) {
  const spv = useBreakpointSPV(slidesPerView);
  const totalPages = Math.ceil(images.length / spv);
  const maxIdx = Math.max(0, images.length - spv);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const hoveredRef = useRef(false);

  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  useEffect(() => {
    if (!autoPlay || totalPages <= 1) return;
    const id = setInterval(() => {
      if (!hoveredRef.current) {
        setDirection(1);
        setPage((p) => (p + 1) % totalPages);
      }
    }, autoPlay);
    return () => clearInterval(id);
  }, [autoPlay, totalPages]);

  const idx = Math.min(page * spv, maxIdx);

  const prev = () => { setDirection(-1); setPage((p) => Math.max(0, p - 1)); };
  const next = () => { setDirection(1);  setPage((p) => Math.min(totalPages - 1, p + 1)); };
  const goTo = (i) => { setDirection(i > page ? 1 : -1); setPage(i); };

  return (
    <div
      onMouseEnter={() => { hoveredRef.current = true; }}
      onMouseLeave={() => { hoveredRef.current = false; }}
    >
      {/* ── Track ── */}
      <div className="overflow-hidden w-full relative">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex w-full"
            style={{ gap: `${GAP}px` }}
          >
            {images.slice(idx, idx + spv).map((img, i) => (
              <div
                key={img.label ?? i}
                style={{
                  flexShrink: 0,
                  width: `calc((100% - ${(spv - 1) * GAP}px) / ${spv})`,
                }}
              >
                <div
                  className={`project-card-skm rounded-[20px] overflow-hidden ${onImageClick ? 'cursor-pointer' : 'cursor-default'}`}
                  onClick={() => onImageClick?.(idx + i)}
                >
                  <div className="relative" style={{ aspectRatio }}>
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 z-[2]"
                      style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 24.28%, rgba(0,0,0,0.8) 91.5%)' }}
                    />
                    <div className="absolute inset-0 z-[4] flex items-end p-[30px]">
                      <span className="font-body text-[13px] font-medium text-white/70 leading-none tracking-[0.02em] block">
                        {img.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center justify-between mt-[30px]">

        <button
          onClick={prev}
          disabled={page === 0}
          aria-label="Previous slides"
          style={{ minWidth: 45, maxWidth: 45, height: 45, border: '1px solid rgba(0,0,0,0.3)' }}
          className="flex-shrink-0 flex items-center justify-center rounded-full bg-transparent transition-all duration-500 hover:bg-brand-600 hover:!border-brand-600 disabled:opacity-50 disabled:cursor-not-allowed group dark:!border-white/30"
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"
            style={{ color: 'rgba(0,0,0,0.3)' }}
            className="group-hover:!text-white transition-colors duration-500 dark:!text-white/50"
          >
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
        </button>

        {totalPages > 1 && (() => {
          const MAX_DOTS = 7;
          let start = 0;
          let end = totalPages;
          if (totalPages > MAX_DOTS) {
            start = Math.max(0, page - Math.floor(MAX_DOTS / 2));
            end = start + MAX_DOTS;
            if (end > totalPages) { end = totalPages; start = Math.max(0, end - MAX_DOTS); }
          }
          return (
            <div className="flex items-center gap-[8px] flex-wrap justify-center px-3">
              {Array.from({ length: end - start }).map((_, j) => {
                const i = start + j;
                return (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide group ${i + 1}`}
                    className="relative rounded-full bg-transparent flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={
                      i === page
                        ? { width: 16, height: 16, border: '1px solid #1a1a1a' }
                        : { width: 12, height: 12, border: '1px solid rgba(63,68,75,0.6)' }
                    }
                  >
                    <span
                      className="rounded-full block transition-all duration-300"
                      style={
                        i === page
                          ? { width: 8, height: 8, backgroundColor: '#1a1a1a' }
                          : { width: 6, height: 6, backgroundColor: 'rgba(0,0,0,0.4)' }
                      }
                    />
                  </button>
                );
              })}
            </div>
          );
        })()}

        <button
          onClick={next}
          disabled={page === totalPages - 1}
          aria-label="Next slides"
          style={{ minWidth: 45, maxWidth: 45, height: 45, border: '1px solid rgba(0,0,0,0.3)' }}
          className="flex-shrink-0 flex items-center justify-center rounded-full bg-transparent transition-all duration-500 hover:bg-brand-600 hover:!border-brand-600 disabled:opacity-50 disabled:cursor-not-allowed group dark:!border-white/30"
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"
            style={{ color: 'rgba(0,0,0,0.3)' }}
            className="group-hover:!text-white transition-colors duration-500 dark:!text-white/50"
          >
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg>
        </button>

      </div>
    </div>
  );
}
