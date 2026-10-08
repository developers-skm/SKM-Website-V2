import { motion } from 'framer-motion';
import { EASE_PREMIUM } from '../../utils/motionTokens';
import PinSlideshow from './PinSlideshow';

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2';

const group = { hidden: {}, visible: { transition: { delayChildren: 0.1, staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_PREMIUM } },
};

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function JourneyHeader({ onClose, onShowAll, compact = false, className = '' }) {
  return (
    <div className={className}>
      <span className="section-label">Events &amp; Expos</span>
      <h2 className={`m-0 font-heading font-bold leading-[1.1] tracking-tight text-heading ${compact ? 'whitespace-nowrap text-[26px]' : 'text-[clamp(1.5rem,2.4vw,2.1rem)]'}`}>
        SKM Around the World
      </h2>
      <p className={`mt-2 mb-0 font-body text-[13.5px] leading-[22px] text-surface-500 ${compact ? 'max-w-[36ch]' : 'max-w-[34ch]'}`}>
        Follow our journey across international exhibitions and industry events.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className={`group inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[#e2e2e2] bg-white px-4 font-body text-[12.5px] font-semibold text-heading cursor-pointer transition-colors hover:border-brand-600 hover:text-brand-600 ${focusRing}`}
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">←</span>
          Back to Global Reach
        </button>
        {onShowAll && (
          <button
            type="button"
            onClick={onShowAll}
            className={`group inline-flex min-h-[40px] items-center gap-2 rounded-full border-0 bg-brand-600 px-4 font-body text-[12.5px] font-semibold text-white cursor-pointer transition-colors hover:bg-brand-700 ${focusRing}`}
          >
            Show all events
            <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ── Current-destination details (used by the desktop panel and the mobile card)
export function EventSummary({ stop, onOpen }) {
  const d = stop.date;
  return (
    <motion.div variants={group} initial="hidden" animate="visible" className="flex flex-col">
      <motion.span variants={item} className="flex items-center gap-2 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
        Current destination
      </motion.span>

      {d && (
        <motion.div variants={item} className="mt-4 flex items-end gap-3">
          <span className="font-heading text-[clamp(2.3rem,3.4vw,3rem)] font-bold leading-[0.9] tracking-[-0.03em] text-heading tabular-nums">
            {d.days}
          </span>
          <span className="pb-1 font-body text-[12px] font-bold uppercase leading-[1.35] tracking-[0.14em] text-surface-500">
            {d.month}
            <br />
            {d.year}
          </span>
        </motion.div>
      )}

      <motion.h3 variants={item} className="mt-4 mb-0 font-heading text-[20px] font-bold leading-[1.2] tracking-tight text-heading sm:text-[22px]">
        <button type="button" onClick={() => onOpen(stop)} className={`border-0 bg-transparent p-0 text-left font-[inherit] text-[inherit] leading-[inherit] text-heading cursor-pointer transition-colors hover:text-brand-600 ${focusRing} rounded-sm`}>
          {stop.title}
        </button>
      </motion.h3>

      <motion.p variants={item} className="mt-2 mb-0 flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-surface-600">
        {stop.code ? (
          <img
            src={`https://flagcdn.com/24x18/${stop.code}.png`}
            srcSet={`https://flagcdn.com/48x36/${stop.code}.png 2x`}
            width="20"
            height="15"
            alt=""
            className="shrink-0 rounded-[2px] object-cover"
            style={{ boxShadow: '0 0 0 0.5px rgba(0,0,0,0.2)' }}
          />
        ) : (
          <PinIcon />
        )}
        {stop.place}
      </motion.p>

      {(stop.venue || stop.booth) && (
        <motion.p variants={item} className="mt-1 mb-0 font-body text-[12px] font-semibold uppercase tracking-[0.1em] text-surface-500">
          {[stop.venue, stop.booth].filter(Boolean).join(' · ')}
        </motion.p>
      )}

      {stop.caption && (
        <motion.p variants={item} className="mt-3 mb-0 font-body text-[13.5px] leading-[22px] text-surface-500">
          {stop.caption}
        </motion.p>
      )}

      <motion.div variants={item}>
        <button
          type="button"
          onClick={() => onOpen(stop)}
          className={`group mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand-600 px-6 font-heading text-[12px] font-bold uppercase tracking-[0.06em] text-white cursor-pointer border-0 transition-colors duration-200 hover:bg-brand-700 ${focusRing}`}
        >
          View Event
          <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
        </button>
      </motion.div>
    </motion.div>
  );
}

export function CompleteSummary({ eventCount, countryCount, onReplay, onClose, onShowAll }) {
  return (
    <motion.div variants={group} initial="hidden" animate="visible" className="flex flex-col">
      <motion.span variants={item} className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
        Journey complete
      </motion.span>
      <motion.h3 variants={item} className="mt-3 mb-0 font-heading text-[22px] font-bold leading-[1.2] tracking-tight text-heading">
        {eventCount} events across {countryCount} {countryCount === 1 ? 'country' : 'countries'}
      </motion.h3>
      <motion.p variants={item} className="mt-2 mb-0 font-body text-[13.5px] leading-[22px] text-surface-500">
        From India to the world - thank you for following along.
      </motion.p>
      <motion.div variants={item} className="mt-5 flex flex-wrap items-center gap-3">
        <button type="button" onClick={onReplay} className={`group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand-600 px-6 font-heading text-[12px] font-bold uppercase tracking-[0.06em] text-white cursor-pointer border-0 transition-colors hover:bg-brand-700 ${focusRing}`}>
          Replay Journey
          <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
        </button>
        <button type="button" onClick={onClose} className={`min-h-[44px] rounded-full border border-[#e2e2e2] bg-white px-5 font-body text-[12.5px] font-semibold text-heading cursor-pointer transition-colors hover:border-brand-600 hover:text-brand-600 ${focusRing}`}>
          Back to Global Reach
        </button>
        {onShowAll && (
          <button type="button" onClick={onShowAll} className={`min-h-[44px] rounded-full border border-[#e2e2e2] bg-white px-5 font-body text-[12.5px] font-semibold text-heading cursor-pointer transition-colors hover:border-brand-600 hover:text-brand-600 ${focusRing}`}>
            Show all events
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Mobile / tablet: the active event as a card under the map ──────────────
export function MobileEventCard({ stop, onOpen, paused, reduce }) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-[#eee] bg-white shadow-[5px_3px_40px_rgba(0,72,88,0.08)]">
      {stop.image && (
        <div className="aspect-[16/10] w-full overflow-hidden">
          <PinSlideshow stop={stop} paused={paused} reduce={reduce} onOpen={onOpen} />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <EventSummary stop={stop} onOpen={onOpen} />
      </div>
    </div>
  );
}
