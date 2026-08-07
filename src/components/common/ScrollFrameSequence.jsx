import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

// Draws a pre-rendered frame sequence to a canvas, one frame per
// scroll-progress tick through the pinned container (containerRef). Frames
// are preloaded up front for smooth scrubbing.
export default function ScrollFrameSequence({ containerRef, basePath, frameCount }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesReady, setImagesReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

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
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      if (imagesReady) drawFrame(Math.round(scrollYProgress.get() * (frameCount - 1)));
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesReady]);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!imagesReady) return;
    const index = Math.min(frameCount - 1, Math.max(0, Math.round(progress * (frameCount - 1))));
    drawFrame(index);
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
    />
  );
}
