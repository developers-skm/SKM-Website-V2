import { useEffect, useRef, useState } from 'react';

// Mobile counterpart to ScrollFrameSequence — same pre-rendered frame
// sequence, but played once automatically (not tied to scroll position).
// Used where a tall scroll-scrub wrapper would leave dead scroll space on
// short mobile viewports (see Hero.jsx).
export default function PlayOnceFrameSequence({ basePath, frameCount, durationMs = 1800, reduceMotion }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const images = new Array(frameCount);
    let loaded = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `${basePath}/frame-${String(i + 1).padStart(3, '0')}.webp`;
      img.onload = () => {
        loaded += 1;
        if (loaded === frameCount && !cancelled) setImagesReady(true);
      };
      images[i] = img;
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, [basePath, frameCount]);

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const { width, height } = canvas;
    const canvasRatio = width / height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawWidth, drawHeight, offsetX, offsetY;
    if (imgRatio > canvasRatio) {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (!imagesReady) return undefined;

    if (reduceMotion) {
      drawFrame(frameCount - 1);
      return undefined;
    }

    let rafId;
    let start = null;

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / durationMs);
      const index = Math.min(frameCount - 1, Math.round(progress * (frameCount - 1)));
      drawFrame(index);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesReady, reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
    />
  );
}
