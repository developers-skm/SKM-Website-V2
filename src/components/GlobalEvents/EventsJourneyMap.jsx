import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import JourneyLayer from './JourneyLayer';
import { CompleteSummary, EventSummary, JourneyHeader, MobileEventCard } from './JourneyParts';
import PinSlideshow from './PinSlideshow';
import useJourney from './useJourney';
import useMediaQuery from './useMediaQuery';
import { ACTIVE_PIN_LIFT, INDIA, buildJourney, eventTarget, imageVariant, isExternal, placePopup } from './journeyUtils';
import { globalEvents } from '../../data/globalEvents';
import { EASE_PREMIUM } from '../../utils/motionTokens';

// Same world atlas the main Global Reach map uses.
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const MAP_W = 800; // react-simple-maps' default viewBox (matches the main map)
const MAP_H = 600;

const POPUP = { w: 272, h: 218 };

// "SKM Events Around the World" - the journey view. Everything on screen is
// derived from `globalEvents` (src/data/globalEvents.js).
export default function EventsJourneyMap({ active, onClose, onPageChange }) {
  const reduce = useReducedMotion();
  const desktop = useMediaQuery('(min-width: 1024px)');
  const stops = useMemo(() => buildJourney(globalEvents), []);
  const journey = useJourney({ count: stops.length, active, reduce });
  const { index, phase } = journey;

  const boxRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [geom, setGeom] = useState(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Esc returns to the normal Global Reach map.
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, onClose]);

  // Warm only the current and next event photo.
  useEffect(() => {
    [index, index + 1].forEach((i) => {
      const src = stops[i]?.image;
      if (src) new Image().src = imageVariant(src, 640);
    });
  }, [index, stops]);

  const countryIds = useMemo(() => new Set(stops.map((s) => s.countryId)), [stops]);
  const countryCount = useMemo(() => new Set(stops.map((s) => s.country)).size, [stops]);

  const stop = index >= 0 ? stops[index] : null;
  const arrived = phase === 'showing' || phase === 'done';

  const openEvent = useCallback(
    (ev) => {
      const target = eventTarget(ev);
      if (isExternal(target)) window.open(target, '_blank', 'noopener,noreferrer');
      else onPageChange(target); // unmounting cancels every timer / animation
    },
    [onPageChange]
  );

  // "Show all events" → the /events page (unmounting cancels every timer).
  const showAll = useCallback(() => onPageChange('events'), [onPageChange]);

  // Pin click: current destination → open its page; otherwise fly there.
  const selectLocation = useCallback(
    (loc) => {
      if (stops[index] && loc.stops.includes(index) && (phase === 'showing' || phase === 'done')) {
        openEvent(stops[index]);
        return;
      }
      journey.goTo(loc.stops.find((i) => i > index) ?? loc.stops[0]);
    },
    [stops, index, phase, openEvent, journey]
  );

  // ── Screen geometry (desktop overlays) ────────────────────────────────────
  const s = size.w ? Math.min(size.w / MAP_W, size.h / MAP_H) : 1;
  const k = 1 / Math.max(s, 0.3); // keeps pins / plane a constant size on screen
  const toPx = (pt) => ({ x: (size.w - MAP_W * s) / 2 + pt[0] * s, y: (size.h - MAP_H * s) / 2 + pt[1] * s });

  const tip = desktop && geom && stop && arrived ? toPx(geom.pts[index]) : null;
  const pin = tip && { x: tip.x, y: tip.y - ACTIVE_PIN_LIFT }; // the pin's head: popup anchors here
  const popup = pin ? placePopup({ pin, size: POPUP, container: size }) : null;

  const panelContent =
    phase === 'done' ? (
      <CompleteSummary eventCount={stops.length} countryCount={countryCount} onReplay={journey.replay} onClose={onClose} onShowAll={showAll} />
    ) : stop ? (
      <EventSummary stop={stop} onOpen={openEvent} />
    ) : null;

  const panel = (
    <div className="min-h-[400px]">
      <AnimatePresence mode="wait">
        {arrived && panelContent ? (
          <motion.aside
            key={phase === 'done' ? 'done' : `panel-${index}`}
            className="rounded-[16px] border border-[#eee] bg-white p-5 shadow-[0_12px_40px_rgba(0,72,88,0.08)]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.55, ease: EASE_PREMIUM }}
          >
            {panelContent}
          </motion.aside>
        ) : (
          // Between stops the slot stays empty (same height, so nothing jumps).
          <div key="status" aria-hidden="true" className="min-h-[400px]" />
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.section
      aria-label="SKM Events Around the World"
      className="overflow-hidden rounded-[20px] border border-[#eee] bg-white shadow-[5px_3px_40px_rgba(0,72,88,0.08)]"
      initial={reduce ? false : { opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE_PREMIUM }}
    >
      {/* Screen-reader announcement of the current stop */}
      <p className="sr-only" aria-live="polite">
        {stop && arrived ? `${stop.title}, ${stop.place}${stop.date ? `, ${stop.date.short}` : ''}` : ''}
      </p>

      <div className="lg:grid lg:grid-cols-[380px_minmax(0,1fr)]">
        {/* Desktop: side column - header, full event details, controls */}
        {desktop && (
          <aside className="flex flex-col gap-6 border-r border-[#eee] bg-white p-7">
            <JourneyHeader compact onClose={onClose} onShowAll={showAll} />
            {panel}
          </aside>
        )}

        <div className="flex min-w-0 flex-col">
          {/* Mobile / tablet header */}
          <JourneyHeader onClose={onClose} onShowAll={showAll} className="px-5 pt-6 pb-5 sm:px-7 lg:hidden" />

          {/* ── Map ── */}
          <div ref={boxRef} className="relative aspect-[4/3] w-full bg-[#dde6ef] lg:aspect-auto lg:min-h-[680px] lg:flex-1">
            <ComposableMap
              width={MAP_W}
              height={MAP_H}
              projection="geoNaturalEarth1"
              projectionConfig={{ scale: 158, center: [20, 5] }}
              style={{ width: '100%', height: '100%', display: 'block' }}
              aria-hidden="true"
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const id = Number(geo.id);
                    const isIndia = id === INDIA.id;
                    const isEvent = countryIds.has(id);
                    const isActive = stop && arrived && stop.countryId === id;
                    const style = {
                      fill: isIndia ? '#F5B700' : isActive ? '#8B0000' : isEvent ? 'var(--color-brand-650)' : 'var(--color-brand-600)',
                      stroke: '#fff',
                      strokeWidth: 0.4,
                      outline: 'none',
                      transition: 'fill 0.5s ease',
                    };
                    return (
                      <Geography key={geo.rsmKey} geography={geo} style={{ default: style, hover: style, pressed: style }} />
                    );
                  })
                }
              </Geographies>
              <JourneyLayer
                stops={stops}
                journey={journey}
                k={k}
                reduce={reduce}
                onSelectLocation={selectLocation}
                onGeometry={setGeom}
              />
            </ComposableMap>

            {/* Event image above / beside the active pin (desktop) */}
            {desktop && (
              <AnimatePresence>
                {popup && stop && (
                  <>
                    <motion.div
                      key={`img-${index}`}
                      role="group"
                      aria-label={`${stop.title} photographs`}
                      className="absolute z-20 flex flex-col rounded-[14px] bg-white p-1.5 shadow-[0_14px_40px_rgba(0,0,0,0.22)]"
                      style={{ left: popup.x, top: popup.y, width: POPUP.w, height: POPUP.h }}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                    >
                      <div className="min-h-0 flex-1 overflow-hidden rounded-[9px]">
                        <PinSlideshow stop={stop} paused={journey.paused} reduce={reduce} onOpen={openEvent} />
                      </div>
                      <div className="flex items-baseline justify-between gap-3 px-1.5 pb-0.5 pt-2.5">
                        <span className="truncate font-heading text-[12.5px] font-bold text-heading">{stop.title}</span>
                        {stop.date && (
                          <span className="shrink-0 font-body text-[10px] font-bold uppercase tracking-[0.1em] text-surface-500">
                            {stop.date.short}
                          </span>
                        )}
                      </div>
                      <span
                        aria-hidden="true"
                        className="absolute h-3 w-3 rotate-45 bg-white"
                        style={
                          popup.side === 'top'
                            ? { bottom: -5, left: Math.min(Math.max(pin.x - popup.x - 6, 16), POPUP.w - 28) }
                            : popup.side === 'bottom'
                              ? { top: -5, left: Math.min(Math.max(pin.x - popup.x - 6, 16), POPUP.w - 28) }
                              : popup.side === 'right'
                                ? { left: -5, top: Math.min(Math.max(pin.y - popup.y - 6, 16), POPUP.h - 28) }
                                : { right: -5, top: Math.min(Math.max(pin.y - popup.y - 6, 16), POPUP.h - 28) }
                        }
                      />
                    </motion.div>

                    <motion.span
                      key={`label-${index}`}
                      aria-hidden="true"
                      className="pointer-events-none absolute z-20 -translate-x-1/2 rounded-full bg-white px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-heading shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
                      style={{ left: pin.x, top: popup.side === 'bottom' ? pin.y - 40 : tip.y + 8 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    >
                      {stop.country}
                    </motion.span>
                  </>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Mobile / tablet: controls, then the active event card */}
          {!desktop && (
            <div className="flex flex-col gap-4 bg-[#fbfbfb] px-4 pb-5 pt-4 sm:px-6">
              <div className="min-h-[120px]">
                <AnimatePresence mode="wait">
                  {arrived && stop && phase !== 'done' ? (
                    <motion.div
                      key={`card-${index}`}
                      initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                    >
                      <MobileEventCard stop={stop} onOpen={openEvent} paused={journey.paused} reduce={reduce} />
                    </motion.div>
                  ) : phase === 'done' ? (
                    <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-[16px] border border-[#eee] bg-white p-5">
                      {panelContent}
                    </motion.div>
                  ) : (
                    <div key="flying" aria-hidden="true" />
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
