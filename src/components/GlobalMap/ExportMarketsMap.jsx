import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
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

// The interactive export-markets map + legend, extracted from the homepage's
// GlobalMarkets section (Phase 1) so it can also anchor the "Global Reach"
// hub page (Phase 2) — same map, two places, one implementation.
export default function ExportMarketsMap() {
  const [hoveredId, setHoveredId] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const mapRef = useRef(null);

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
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 15 }}
      className="relative rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white dark:bg-surface-900/20 overflow-hidden shadow-[5px_3px_40px_rgba(0,72,88,0.08)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.16)] transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row lg:h-[820px]">

        {/* ── Legend ──────────────────────────────────────────────── */}
        <div className="order-2 lg:order-1 lg:w-[188px] xl:w-[208px] shrink-0 border-t lg:border-t-0 lg:border-r border-[#eee] dark:border-surface-800">
          <div className="p-4 lg:p-5 h-full flex flex-col">
            <p className="text-[10px] font-heading font-bold uppercase tracking-[0.1em] text-surface-400 dark:text-surface-500 mb-3 shrink-0">
              Export Markets · {EXPORT_MARKETS.length} Countries
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-0.5 lg:overflow-y-auto lg:flex-1 lg:min-h-0">
              {EXPORT_MARKETS.map(market => (
                <div
                  key={market.id}
                  className={`flex items-center gap-2 px-2 py-[7px] rounded-lg transition-all duration-150 cursor-default select-none ${hoveredId === market.id
                    ? 'bg-red-50 dark:bg-red-900/20'
                    : 'hover:bg-surface-50 dark:hover:bg-surface-800/50'
                    }`}
                  onMouseEnter={() => setHoveredId(market.id)}
                  onMouseLeave={() => setHoveredId(null)}
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
                  <span className="text-[11px] font-medium text-surface-700 dark:text-surface-300 whitespace-nowrap overflow-hidden text-ellipsis">
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
          className="order-1 lg:order-2 flex-1 relative bg-[#dde6ef] dark:bg-surface-800/40 min-h-[220px] sm:min-h-[300px]"
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
                  const isActive = hoveredId !== null && hoveredId === geoId;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => isMarket && setHoveredId(geoId)}
                      onMouseLeave={() => isMarket && setHoveredId(null)}
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

            {/* ── Pin markers ──────────────────────────────────────── */}
            {EXPORT_MARKETS.map((market, i) => (
              <Marker
                key={market.id}
                coordinates={market.coordinates}
                onMouseEnter={e => handleMarkerEnter(market, e)}
                onMouseLeave={handleMarkerLeave}
              >
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 0.3 + i * 0.025, type: 'spring', stiffness: 260, damping: 18 }}
                  whileHover={{ scale: 1.4 }}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Drop shadow beneath the tip */}
                  <ellipse cx="0" cy="2" rx="4.5" ry="1.5" fill="rgba(0,0,0,0.20)" />

                  {/* ① Grey teardrop body — tip at (0,0), bulb centred at (0,-13) r=9.5 */}
                  <path
                    d="M0,0 C-5.5,-2 -9.5,-8.5 -9.5,-13 A9.5,9.5,0,0,1,9.5,-13 C9.5,-8.5 5.5,-2 0,0Z"
                    fill={hoveredId === market.id ? '#8898A8' : '#A8B8C8'}
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
                className="absolute pointer-events-none z-20 bg-white dark:bg-surface-800 border border-[#e5e5e5] dark:border-surface-700 rounded-xl px-3 py-2 shadow-xl flex items-center gap-2"
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
                <span className="text-[12px] font-semibold text-surface-800 dark:text-white whitespace-nowrap">
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
