import React, { useId, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  useMapContext,
} from 'react-simple-maps';
import exportMarkets from '../../data/exportMarkets';

const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const EXPORT_MARKETS = exportMarkets;

const HIGHLIGHTED_IDS = new Set(EXPORT_MARKETS.map(m => m.id));

// ISO 3166-1 numeric code for India (world-atlas geo id) — the country of
// origin, called out in gold rather than the export-market red so it reads
// as "home base" on the map, not just another destination.
const INDIA_ID = 356;

// Approximate coordinates for India (origin point for the route line drawn
// to whichever export market is currently hovered/focused).
const INDIA_COORDINATES = [78, 21];

// Arrows per route scale with its length (short 1, medium 2, long 3) at one
// constant speed. Each arrow travels from India to the market, pauses
// briefly, then leaves India again; arrows on one route are evenly spaced.
const ARROW_LENGTH_STEPS_PX = [190, 340];
const ARROW_SPEED_PX_PER_SEC = 34;
const ARROW_PAUSE_SECONDS = 1.6;

// Curved route from India to every export market, drawn as a faint guide
// line plus animated direction chevrons. Each route is a gentle arc bowing
// toward the north so the many routes fan out instead of overlapping on
// the straight line between two points. Lives inside ComposableMap
// because it needs the map's own projection to build the SVG paths.
function RouteArrows({ focusId, animate }) {
  const { projection } = useMapContext();
  const idPrefix = useId();
  const origin = projection(INDIA_COORDINATES);
  return (
    <g className="pointer-events-none">
      {EXPORT_MARKETS.map((market, routeIndex) => {
        const target = projection(market.coordinates);
        if (!origin || !target) return null;
        const dx = target[0] - origin[0];
        const dy = target[1] - origin[1];
        const chord = Math.hypot(dx, dy);
        // Control point: chord midpoint pushed perpendicular to the chord,
        // on whichever side is higher up the map.
        let nx = -dy / chord;
        let ny = dx / chord;
        if (ny > 0) {
          nx = -nx;
          ny = -ny;
        }
        const lift = Math.min(chord * 0.32, 130);
        const cx = (origin[0] + target[0]) / 2 + nx * lift;
        const cy = (origin[1] + target[1]) / 2 + ny * lift;
        const d = `M${origin[0]},${origin[1]} Q${cx},${cy} ${target[0]},${target[1]}`;
        const length = chord * 1.08;
        const arrowCount = 1 + ARROW_LENGTH_STEPS_PX.filter((step) => length > step).length;
        const travel = length / ARROW_SPEED_PX_PER_SEC;
        const cycle = travel + ARROW_PAUSE_SECONDS;
        const moveEnd = (travel / cycle).toFixed(3);
        const isHovered = focusId === market.id;
        // With a country hovered or selected, only its route is drawn.
        if (focusId !== null && !isHovered) return null;
        const pathId = `${idPrefix}-route-${market.id}`;
        return (
          <g key={`route-${market.id}`}>
            <path
              id={pathId}
              d={d}
              fill="none"
              stroke="#F5B700"
              strokeWidth={isHovered ? 1.2 : 0.7}
              strokeOpacity={isHovered ? 0.9 : 0.4}
              strokeLinecap="round"
            />
            {animate &&
              Array.from({ length: arrowCount }, (_, i) => {
                const begin = `${-routeIndex * 0.61 - (i * cycle) / arrowCount}s`;
                return (
              <path
                key={i}
                d="M-3.5,-3.5 L1.5,0 L-3.5,3.5"
                fill="none"
                stroke="#FFD24D"
                strokeWidth={isHovered ? 2.4 : 1.9}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0"
              >
                <animateMotion
                  dur={`${cycle}s`}
                  begin={begin}
                  repeatCount="indefinite"
                  rotate="auto"
                  calcMode="linear"
                  keyPoints="0;1;1"
                  keyTimes={`0;${moveEnd};1`}
                >
                  <mpath href={`#${pathId}`} />
                </animateMotion>
                {/* Visible only while travelling: fades in leaving India and
                    out on arrival, then stays hidden during the pause. */}
                <animate
                  attributeName="opacity"
                  values="0;1;1;0;0"
                  keyTimes={`0;${(moveEnd * 0.12).toFixed(3)};${(moveEnd * 0.85).toFixed(3)};${moveEnd};1`}
                  dur={`${cycle}s`}
                  begin={begin}
                  repeatCount="indefinite"
                />
              </path>
                );
              })}
          </g>
        );
      })}
    </g>
  );
}

// The interactive export-markets map + legend, extracted from the homepage's
// GlobalMarkets section (Phase 1) so it can also anchor the "Global Reach"
// hub page (Phase 2) — same map, two places, one implementation.
export default function ExportMarketsMap() {
  const [hoveredId, setHoveredId] = useState(null);
  // A clicked country stays focused (only its route shows) until clicked again.
  const [selectedId, setSelectedId] = useState(null);
  const focusId = hoveredId ?? selectedId;
  const toggleSelected = (id) => setSelectedId((prev) => (prev === id ? null : id));
  const [tooltip, setTooltip] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const mapRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const handleMarkerEnter = (market, e) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltip({
        ...market,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        containerWidth: rect.width
      });
    }
    setHoveredId(market.id);
  };

  const handleMarkerLeave = () => {
    setTooltip(null);
    setHoveredId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, margin: '-100px' }}
      transition={reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 90, damping: 15 }}
      className="relative rounded-[20px] border border-[#eee] bg-white overflow-hidden shadow-[5px_3px_40px_rgba(0,72,88,0.08)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.16)] transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row lg:h-[820px]">

        {/* ── Legend ──────────────────────────────────────────────── */}
        <div className="order-2 lg:order-1 lg:w-[188px] xl:w-[208px] shrink-0 border-t lg:border-t-0 lg:border-r border-[#eee]">
          <div className="p-4 lg:p-5 h-full flex flex-col">
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.1em] text-surface-400 mb-3 shrink-0">
              Export Markets · 30+ Countries
            </p>
            <div data-lenis-prevent className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-0.5 lg:overflow-y-auto lg:overscroll-contain lg:flex-1 lg:min-h-0">
              {EXPORT_MARKETS.map(market => (
                <div
                  key={market.id}
                  className={`flex items-center gap-2 px-2 py-[7px] rounded-lg transition-all duration-150 cursor-pointer select-none ${focusId === market.id
                    ? 'bg-red-50'
                    : 'hover:bg-surface-50'
                    }`}
                  onMouseEnter={() => setHoveredId(market.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => toggleSelected(market.id)}
                >
                  <img
                    src={`https://flagcdn.com/20x15/${market.code}.png`}
                    srcSet={`https://flagcdn.com/40x30/${market.code}.png 2x`}
                    width="20"
                    height="15"
                    alt={market.name}
                    className="rounded-[2px] shrink-0 object-cover"
                    style={{ boxShadow: '0 0 0 0.5px rgba(0,0,0,0.15)' }}
                  />
                  <span className="text-[11px] font-medium text-surface-700 whitespace-nowrap overflow-hidden text-ellipsis">
                    {market.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Map ─────────────────────────────────────────────────── */}
        <div
          ref={mapRef}
          className="order-1 lg:order-2 flex-1 relative bg-[#dde6ef] min-h-[220px] sm:min-h-[300px]"
        >
          {/* Subtle brand-red gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/4 to-transparent pointer-events-none z-10" />

          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{ scale: 158, center: [20, 5] }}
            style={{ width: '100%', height: '100%', minHeight: '220px', display: 'block' }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const geoId = Number(geo.id);
                  const isIndia = geoId === INDIA_ID;
                  const isMarket = HIGHLIGHTED_IDS.has(geoId);
                  const isActive = focusId !== null && focusId === geoId;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => isMarket && setHoveredId(geoId)}
                      onMouseLeave={() => isMarket && setHoveredId(null)}
                      onClick={() => isMarket && toggleSelected(geoId)}
                      style={{
                        default: {
                          fill: isIndia ? '#F5B700' : isActive ? '#a80000' : 'var(--color-brand-600)',
                          stroke: '#fff',
                          strokeWidth: 0.4,
                          outline: 'none',
                        },
                        hover: {
                          fill: isIndia ? '#F5B700' : '#a80000',
                          stroke: '#fff',
                          strokeWidth: 0.4,
                          outline: 'none',
                          cursor: isMarket ? 'pointer' : 'default',
                        },
                        pressed: {
                          fill: isIndia ? '#F5B700' : '#8B0000',
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* ── Route arrows — India to every export market ── */}
            <RouteArrows focusId={focusId} animate={!reduceMotion} />

            {/* ── Pin markers ──────────────────────────────────────── */}
            {EXPORT_MARKETS.map((market, i) => (
              <Marker
                key={market.id}
                coordinates={market.coordinates}
                onMouseEnter={e => handleMarkerEnter(market, e)}
                onMouseLeave={handleMarkerLeave}
                onClick={() => toggleSelected(market.id)}
              >
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={reduceMotion
                    ? { duration: 0.01 }
                    : { delay: 0.3 + i * 0.025, type: 'spring', stiffness: 260, damping: 18 }}
                  whileHover={reduceMotion ? undefined : { scale: 1.4 }}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Drop shadow beneath the tip */}
                  <ellipse cx="0" cy="2" rx="4.5" ry="1.5" fill="rgba(0,0,0,0.20)" />

                  {/* ① Grey teardrop body — tip at (0,0), bulb centred at (0,-13) r=9.5 */}
                  <path
                    d="M0,0 C-5.5,-2 -9.5,-8.5 -9.5,-13 A9.5,9.5,0,0,1,9.5,-13 C9.5,-8.5 5.5,-2 0,0Z"
                    fill={focusId === market.id ? '#8898A8' : '#A8B8C8'}
                    stroke="#6B7A8A"
                    strokeWidth="0.5"
                  />

                  {/* ② White inner circle — gives the "badge" look from the reference image */}
                  <circle cx="0" cy="-13" r="7" fill="#FFFFFF" />

                  {/* ③ Red star outline centred in the white circle
                       Outer R=5.5, inner r=2.2 — fits snugly in r=7 white circle
                       Polar-computed 5-point star at origin, shifted to bulb centre via translate(0,-13)
                       outer pts: (0,-5.5)(5.23,-1.70)(3.23,4.45)(-3.23,4.45)(-5.23,-1.70)
                       inner pts: (1.35,-1.85)(2.18,0.71)(0,2.2)(-2.18,0.71)(-1.35,-1.85) */}
                  <path
                    d="M0,-5.5 L1.35,-1.85 L5.23,-1.70 L2.18,0.71 L3.23,4.45
                       L0,2.2 L-3.23,4.45 L-2.18,0.71 L-5.23,-1.70 L-1.35,-1.85 Z"
                    transform="translate(0,-13)"
                    fill="none"
                    stroke="var(--color-brand-600)"
                    strokeWidth="1.0"
                    strokeLinejoin="round"
                  />
                </motion.g>
              </Marker>
            ))}
          </ComposableMap>

          {/* ── Tooltip ──────────────────────────────────────────── */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                key="map-tooltip"
                initial={{ opacity: 0, scale: 0.88, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: -4 }}
                transition={{ duration: 0.14 }}
                className="absolute pointer-events-none z-20 bg-white border border-[#e5e5e5] rounded-xl px-3 py-2 shadow-xl flex items-center gap-2"
                style={{
                  left: Math.min(
                    tooltip.x + 14,
                    (tooltip.containerWidth ?? 500) - 170
                  ),
                  top: Math.max(tooltip.y - 46, 8),
                }}
              >
                <img
                  src={`https://flagcdn.com/20x15/${tooltip.code}.png`}
                  srcSet={`https://flagcdn.com/40x30/${tooltip.code}.png 2x`}
                  width="20"
                  height="15"
                  alt={tooltip.name}
                  className="rounded-[2px] shrink-0 object-cover"
                  style={{ boxShadow: '0 0 0 0.5px rgba(0,0,0,0.15)' }}
                />
                <span className="text-[12px] font-semibold text-surface-800 whitespace-nowrap">
                  {tooltip.name}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
