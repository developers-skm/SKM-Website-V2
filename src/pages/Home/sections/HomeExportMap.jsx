import { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import exportMarkets from '../../../data/exportMarkets';
import { EASE_PREMIUM } from '../../../utils/motionTokens';

// Home-scoped export map — a quieter, editorial re-presentation of the same
// real `exportMarkets` data and `react-simple-maps` implementation as the
// shared components/GlobalMap/ExportMarketsMap.jsx (also used by the Global
// Reach hub page). Built as a separate component rather than editing the
// shared one, per this project's standing rule: shared components get a
// phase/section-scoped variant instead of a direct edit. No dashboard
// legend sidebar, no card framing — the map sits directly in the page, with
// destinations organized into a plain regional index beneath it instead.
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const HIGHLIGHTED_IDS = new Set(exportMarkets.map((m) => m.id));
const INDIA_ID = 356;
const INDIA_COORDINATES = [78, 21];

// Wrapped so the plain `<path>` react-simple-maps' Line renders (it
// forwards refs and spreads unrecognized props, including `pathLength`,
// straight onto the SVG element) gets Framer Motion's animate/initial —
// this is what makes the route-draw a real, verified-working animation
// primitive instead of a hand-rolled CSS keyframe + stroke-dashoffset hack.
const MotionLine = motion(Line);

export default function HomeExportMap() {
  const reduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [played, setPlayed] = useState(false);
  const mapRef = useRef(null);

  const handleMarkerEnter = (market, e) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltip({ ...market, x: e.clientX - rect.left, y: e.clientY - rect.top, containerWidth: rect.width });
    }
    setHoveredId(market.id);
  };
  const handleMarkerLeave = () => {
    setTooltip(null);
    setHoveredId(null);
  };

  return (
    <motion.div
      ref={mapRef}
      initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.025 }}
      whileInView={{ opacity: 1, scale: 1 }}
      onViewportEnter={() => setPlayed(true)}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: reduceMotion ? 0.01 : 1.1, ease: EASE_PREMIUM }}
      className="relative w-full aspect-[16/10] sm:aspect-[16/8.2] lg:aspect-[16/9]"
    >
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 185, center: [30, 8] }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const geoId = Number(geo.id);
              const isIndia = geoId === INDIA_ID;
              const isMarket = HIGHLIGHTED_IDS.has(geoId);
              const isActive = hoveredId !== null && hoveredId === geoId;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => isMarket && setHoveredId(geoId)}
                  onMouseLeave={() => isMarket && setHoveredId(null)}
                  style={{
                    default: {
                      fill: isIndia ? 'var(--color-gold-500)' : isActive ? 'var(--color-brand-700)' : isMarket ? 'var(--color-brand-600)' : '#E5E2DC',
                      stroke: '#fff',
                      strokeWidth: 0.4,
                      outline: 'none',
                    },
                    hover: {
                      fill: isIndia ? 'var(--color-gold-500)' : 'var(--color-brand-700)',
                      stroke: '#fff',
                      strokeWidth: 0.4,
                      outline: 'none',
                      cursor: isMarket ? 'pointer' : 'default',
                    },
                    pressed: {
                      fill: isIndia ? 'var(--color-gold-500)' : 'var(--color-brand-800)',
                      outline: 'none',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Route line — draws once from India to each market on entry, then
            settles; hovering a destination temporarily strengthens its line. */}
        {!reduceMotion &&
          exportMarkets.map((market, i) => (
            <MotionLine
              key={market.id}
              from={INDIA_COORDINATES}
              to={market.coordinates}
              stroke={hoveredId === market.id ? 'var(--color-brand-600)' : 'var(--color-gold-500)'}
              strokeWidth={hoveredId === market.id ? 1.1 : 0.6}
              strokeLinecap="round"
              pathLength={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={played ? { pathLength: 1, opacity: hoveredId === null || hoveredId === market.id ? 0.55 : 0.18 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { duration: 0.9, delay: 0.15 + i * 0.02, ease: EASE_PREMIUM },
                opacity: { duration: 0.3 },
              }}
              className="pointer-events-none"
            />
          ))
        }

        {/* Destination markers — small, quiet, appear once with stagger, no pulse */}
        {exportMarkets.map((market, i) => (
          <Marker key={market.id} coordinates={market.coordinates} onMouseEnter={(e) => handleMarkerEnter(market, e)} onMouseLeave={handleMarkerLeave}>
            <motion.circle
              r="2.6"
              fill="var(--color-brand-600)"
              stroke="#fff"
              strokeWidth="0.8"
              initial={{ scale: 0, opacity: 0 }}
              animate={played ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={reduceMotion ? { duration: 0.01 } : { delay: 0.55 + i * 0.03, type: 'spring', stiffness: 320, damping: 20 }}
              whileHover={reduceMotion ? undefined : { scale: 1.8 }}
              style={{ cursor: 'pointer' }}
            />
          </Marker>
        ))}

        {/* India origin marker — deliberately the strongest single element on
            the map: larger radius, an outer ring, and a single settle-once
            pulse (never repeating) so it reads as the clear point of origin
            rather than just another highlighted destination. */}
        <Marker coordinates={INDIA_COORDINATES}>
          <motion.g
            initial={{ scale: 0.85, opacity: 0 }}
            animate={played ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.55, delay: reduceMotion ? 0 : 0.35, ease: EASE_PREMIUM }}
          >
            {!reduceMotion && (
              <motion.circle
                r="8"
                fill="none"
                stroke="var(--color-gold-500)"
                strokeWidth="1"
                initial={{ scale: 0.6, opacity: 0.6 }}
                animate={played ? { scale: 2.1, opacity: 0 } : { scale: 0.6, opacity: 0.6 }}
                transition={{ duration: 1.1, delay: 0.55, ease: EASE_PREMIUM }}
              />
            )}
            <circle r="7.5" fill="var(--color-gold-500)" stroke="#fff" strokeWidth="1.75" />
          </motion.g>
        </Marker>
      </ComposableMap>

      <AnimatePresence>
        {tooltip && (
          <motion.div
            key="map-tooltip"
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute pointer-events-none z-20 bg-white dark:bg-surface-800 border border-surface-200/70 dark:border-surface-700 rounded-lg px-3 py-1.5 shadow-md"
            style={{
              left: Math.min(tooltip.x + 12, (tooltip.containerWidth ?? 500) - 140),
              top: Math.max(tooltip.y - 40, 8),
            }}
          >
            <span className="text-[12px] font-semibold text-surface-800 dark:text-white whitespace-nowrap">
              {tooltip.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
