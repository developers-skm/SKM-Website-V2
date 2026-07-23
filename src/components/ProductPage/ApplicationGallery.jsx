import { motion, useReducedMotion } from 'framer-motion';

// Editorial featured + supporting layout — the first application image
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
        <span className="inline-flex items-center gap-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
          <span className="w-5 h-px bg-brand-500" aria-hidden="true" />
          Applications Gallery
        </span>
        <h2 className="font-heading font-bold text-[34px] sm:text-[42px] text-heading dark:text-white tracking-tight m-0 leading-[1.1]">
          Culinary Applications
        </h2>
        <p className="font-body text-[17px] text-surface-600 dark:text-surface-400 m-0 leading-[1.7]">
          {productName} delivers consistent functional performance across a wide range of food categories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {featured && (
          <ApplicationTile
            app={featured}
            reduceMotion={reduceMotion}
            className="sm:col-span-2 lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto"
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

function ApplicationTile({ app, reduceMotion, className }) {
  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-[22px] border border-surface-200/60 dark:border-surface-800 group transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(36,30,24,0.1)] ${className}`}
    >
      <img
        src={app.image}
        alt={`${app.name} application`}
        className={`absolute inset-0 w-full h-full object-cover ${reduceMotion ? '' : 'transition-transform duration-500 group-hover:scale-[1.02]'}`}
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.72) 100%)' }}
      />
      <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-5 ${reduceMotion ? '' : 'transition-transform duration-300 group-hover:-translate-y-0.5'}`}>
        <h3 className="font-heading font-bold text-[16px] sm:text-[19px] text-white m-0 leading-tight">
          {app.name}
        </h3>
      </div>
    </motion.div>
  );
}
