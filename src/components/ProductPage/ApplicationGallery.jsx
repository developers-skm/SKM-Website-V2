import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Editorial featured + supporting layout - the first application image
// becomes a large 2-row feature tile (spans 6 of 12 columns, full height of
// the first two supporting rows), the rest fill smaller supporting cells.
// Replaces the previous equal-weight grid, which read as a generic stock
// photo gallery. Hover is restrained (scale 1.02, subtle shadow) per brief.
export default function ApplicationGallery({ applicationsData, productName }) {
  const reduceMotion = useReducedMotion();
  const [featured, ...supporting] = applicationsData;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 max-w-2xl">
        <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600">
          <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
          Applications Gallery
        </span>
        <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading tracking-tight m-0 leading-[1.1]">
          Culinary Applications
        </h2>
        <p className="font-body text-[17px] text-surface-600 m-0 leading-[1.7]">
          {productName} delivers consistent functional performance across a wide range of food categories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {featured && (
          <ApplicationTile
            app={featured}
            reduceMotion={reduceMotion}
            className={supporting.length === 0
              ? "sm:col-span-2 lg:col-span-2 aspect-[16/9]"
              : "sm:col-span-2 lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto"}
          />
        )}
        {supporting.map((app, index) => (
          <ApplicationTile
            key={index}
            app={app}
            reduceMotion={reduceMotion}
            className="aspect-[4/3]"
          />
        ))}
      </div>
    </div>
  );
}

// Descriptions are clamped to two lines. The "View" button only appears when
// the text is actually cut off (measured, so it follows the tile width) and
// opens the full text over the image.
function ApplicationTile({ app, reduceMotion, className }) {
  const [open, setOpen] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return undefined;
    // Compare the clamped height against the natural (unclamped) height by
    // briefly lifting the clamp - scrollHeight alone is unreliable on
    // -webkit-line-clamp boxes across browsers.
    const measure = () => {
      const clamped = el.getBoundingClientRect().height;
      const prev = el.style.cssText;
      el.style.cssText = `${prev};display:block;-webkit-line-clamp:unset;overflow:visible`;
      const full = el.getBoundingClientRect().height;
      el.style.cssText = prev;
      setIsLong(full > clamped + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [app.description]);

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-[22px] border border-surface-200/60 group transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(36,30,24,0.1)] ${className}`}
    >
      <img
        src={app.image}
        alt={`${app.name} application`}
        className={`absolute inset-0 w-full h-full object-cover ${reduceMotion ? '' : 'transition-transform duration-500 group-hover:scale-[1.02]'}`}
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.8) 100%)' }}
      />
      <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col gap-1.5 ${open ? 'invisible' : ''}`}>
        <h3 className="font-heading font-bold text-[16px] sm:text-[19px] text-white m-0 leading-tight">
          {app.name}
        </h3>
        {app.description && (
          <p ref={textRef} className="font-body text-[12.5px] sm:text-[13.5px] text-white/90 leading-[1.5] m-0 line-clamp-2">
            {app.description}
          </p>
        )}
        {isLong && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="self-start font-body font-bold text-[11.5px] uppercase tracking-[0.05em] text-white underline underline-offset-4 decoration-white/50 hover:decoration-white cursor-pointer bg-transparent border-none p-0"
          >
            View
          </button>
        )}
      </div>
      {open && (
        <div className="absolute inset-0 z-10 bg-black/85 p-4 sm:p-5 flex flex-col gap-3 overflow-y-auto" data-lenis-prevent>
          <h3 className="font-heading font-bold text-[16px] sm:text-[19px] text-white m-0 leading-tight">
            {app.name}
          </h3>
          <p className="font-body text-[13.5px] text-white/90 leading-[1.6] m-0">
            {app.description}
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="self-start mt-auto font-body font-bold text-[11.5px] uppercase tracking-[0.05em] text-white underline underline-offset-4 decoration-white/50 hover:decoration-white cursor-pointer bg-transparent border-none p-0"
          >
            Close
          </button>
        </div>
      )}
    </motion.div>
  );
}
