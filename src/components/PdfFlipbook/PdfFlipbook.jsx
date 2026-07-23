import React, { useState, useEffect, useRef, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const FlipPage = forwardRef(({ src, idx }, ref) => (
  <div ref={ref} style={{ width: '100%', height: '100%' }} className="overflow-hidden select-none">
    <img
      src={src}
      alt={`Page ${idx + 1}`}
      style={{ width: '100%', height: '100%', objectFit: 'fill', display: 'block' }}
      draggable={false}
      loading="lazy"
    />
  </div>
));
FlipPage.displayName = 'FlipPage';

export default function PdfFlipbook({ pdfUrl, title, onClose }) {
  const [pageImages, setPageImages] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);
  const [pageAspect, setPageAspect] = useState(null); // detected from PDF
  const [dims, setDims] = useState(null);
  const bookRef = useRef(null);

  // Recalculate dimensions whenever page aspect or window size changes
  useEffect(() => {
    if (!pageAspect) return;
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 768;
      if (isMobile) {
        const w = Math.min(vw - 32, 420);
        setDims({ w: Math.round(w), h: Math.round(w / pageAspect), single: true });
      } else {
        // Each page: width=W, height=W/pageAspect
        // Spread occupies 2W × (W/pageAspect)
        // Available: leave 200px for side arrows, 180px for top bar + bottom label
        const availW = (vw - 200) / 2;
        const availH = vh - 180;
        const maxByWidth = availW;
        const maxByHeight = availH * pageAspect;
        const w = Math.min(maxByWidth, maxByHeight, 560);
        setDims({ w: Math.round(Math.max(w, 240)), h: Math.round(Math.max(w, 240) / pageAspect), single: false });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [pageAspect]);

  // Load and render PDF pages
  useEffect(() => {
    let cancelled = false;
    const imgs = [];

    async function load() {
      try {
        const pdf = await pdfjsLib.getDocument({ url: pdfUrl }).promise;
        if (cancelled) return;
        const n = pdf.numPages;
        setTotalPages(n);

        // Detect aspect ratio from first page
        const firstPage = await pdf.getPage(1);
        const vp0 = firstPage.getViewport({ scale: 1 });
        if (!cancelled) setPageAspect(vp0.width / vp0.height);

        for (let i = 1; i <= n; i++) {
          if (cancelled) return;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
          imgs.push(canvas.toDataURL('image/jpeg', 0.82));
          if (!cancelled) setLoadingProgress(Math.round((i / n) * 100));
        }

        if (!cancelled) setPageImages(imgs);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load PDF');
      }
    }

    load();
    return () => { cancelled = true; };
  }, [pdfUrl]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') bookRef.current?.pageFlip().flipNext();
      if (e.key === 'ArrowLeft') bookRef.current?.pageFlip().flipPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const allLoaded = pageImages.length > 0 && pageImages.length === totalPages && dims !== null;
  const isLastPage = dims?.single ? currentPage >= totalPages - 1 : currentPage >= totalPages - 2;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{
        background: [
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 5px)',
          'repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 5px)',
          'linear-gradient(160deg, #8a939e 0%, #5e6875 20%, #8d959f 40%, #636b78 60%, #8a939e 80%, #5e6875 100%)',
        ].join(', '),
      }}
    >
      {/* Top bar */}
      <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3 flex-shrink-0 bg-black/25 border-b border-black/20">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-white/70 hover:text-white font-body text-sm transition-colors flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </button>
          <div className="w-px h-4 bg-white/20 flex-shrink-0" />
          <h2 className="font-heading font-bold text-white text-sm sm:text-base truncate">{title}</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0 ml-3"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Loading */}
      {!allLoaded && !error && (
        <div className="flex flex-col items-center gap-5 mt-24 px-4">
          <div className="w-12 h-12 border-2 border-white/20 border-t-brand-600 rounded-full animate-spin" />
          <div className="text-white font-heading text-lg drop-shadow">Preparing your book…</div>
          <div className="w-56 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all duration-200"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-white/50 font-body text-sm">
            {pageImages.length} of {totalPages || '…'} pages rendered
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-24 flex flex-col items-center gap-3 px-6 text-center">
          <p className="text-red-400 font-heading text-lg">Failed to load PDF</p>
          <p className="text-red-400/60 font-body text-sm max-w-xs">{error}</p>
        </div>
      )}

      {/* Flipbook area */}
      {allLoaded && (
        <div className="flex-1 flex items-center justify-center gap-5 px-4 min-h-0">
          {/* Left nav arrow */}
          <button
            onClick={() => bookRef.current?.pageFlip().flipPrev()}
            disabled={currentPage === 0}
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Book with gold frame */}
          <div className="flex flex-col items-center gap-3">
            <div
              style={{
                background: 'linear-gradient(135deg, #5C3A0A 0%, #B8862A 18%, #7A5010 35%, #E8C547 50%, #7A5010 65%, #B8862A 82%, #5C3A0A 100%)',
                padding: '10px',
                borderRadius: '6px',
                boxShadow: '0 24px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.18)',
              }}
            >
              <div style={{ borderRadius: '3px', overflow: 'hidden', lineHeight: 0, display: 'block' }}>
                <HTMLFlipBook
                  ref={bookRef}
                  width={dims.w}
                  height={dims.h}
                  size="fixed"
                  minWidth={200}
                  maxWidth={600}
                  minHeight={140}
                  maxHeight={850}
                  showCover={true}
                  useMouseEvents
                  flippingTime={700}
                  showPageCorners
                  drawShadow
                  usePortrait={dims.single}
                  singlePage={dims.single}
                  onFlip={(e) => setCurrentPage(e.data)}
                >
                  {pageImages.map((src, idx) => (
                    <FlipPage key={idx} src={src} idx={idx} />
                  ))}
                </HTMLFlipBook>
              </div>
            </div>

            {/* Page counter */}
            <span className="text-white/40 font-body text-xs select-none drop-shadow">
              Page {currentPage + 1}
              {!dims.single && currentPage + 2 <= totalPages ? `–${currentPage + 2}` : ''}
              {' '}/ {totalPages}
              &nbsp;·&nbsp;Drag corners or use arrow keys to flip
            </span>
          </div>

          {/* Right nav arrow */}
          <button
            onClick={() => bookRef.current?.pageFlip().flipNext()}
            disabled={isLastPage}
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
