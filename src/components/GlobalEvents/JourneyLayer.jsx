import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMapContext } from 'react-simple-maps';
import { INDIA, createFlightPath } from './journeyUtils';

const RED = 'var(--color-brand-600)';
const GOLD = '#F5B700';

// Top-down airliner pointing +x, ~23 units long (scaled to a constant on-screen size).
const PLANE_PATH =
  'M12 0 L9 -1.3 L3 -1.3 L-1 -8 L-3.4 -8 L-1.6 -1.3 L-7 -1.3 L-9 -4 L-10.8 -4 L-9.6 0 L-10.8 4 L-9 4 L-7 1.3 L-1.6 1.3 L-3.4 8 L-1 8 L3 1.3 L9 1.3 Z';
const STAR_PATH =
  'M0,-5.5 L1.35,-1.85 L5.23,-1.70 L2.18,0.71 L3.23,4.45 L0,2.2 L-3.23,4.45 L-2.18,0.71 L-5.23,-1.70 L-1.35,-1.85 Z';

function Pin({ loc, state, k, delay, reduce, onSelect, pulseKey }) {
  const label = `${loc.name}${loc.count > 1 ? ` — ${loc.count} events` : ''}. ${
    state === 'active' ? 'Current destination. Open event.' : 'Show event.'
  }`;
  return (
    <g transform={`translate(${loc.pt[0]} ${loc.pt[1]})`}>
      <motion.g
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.25 + delay, type: 'spring', stiffness: 240, damping: 20 }}
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={() => onSelect(loc)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(loc);
          }
        }}
        style={{ cursor: 'pointer', outline: 'none' }}
        className="focus-visible:[&>circle:first-child]:stroke-[#2b2b2b] focus-visible:[&>circle:first-child]:stroke-[1.5]"
      >
        <circle r={15 * k} fill="transparent" stroke="transparent" />

        {state === 'active' ? (
          <>
            {/* one soft pulse on arrival — not continuous */}
            {!reduce && (
              <motion.circle
                key={pulseKey}
                r={9 * k}
                fill="none"
                stroke={RED}
                strokeWidth={1.5 * k}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.6, opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
              />
            )}
            <circle r={13 * k} fill="none" stroke="#fff" strokeOpacity={0.55} strokeWidth={2 * k} />
            <circle r={10.5 * k} fill="#fff" stroke={RED} strokeWidth={2 * k} />
            <path d={STAR_PATH} transform={`scale(${1.15 * k})`} fill={RED} />
          </>
        ) : state === 'visited' ? (
          <circle r={4.2 * k} fill={GOLD} stroke="#fff" strokeWidth={1.4 * k} />
        ) : (
          <circle r={3 * k} fill="#fff" fillOpacity={0.7} />
        )}
      </motion.g>
    </g>
  );
}

// Everything the journey draws on top of the world map. Lives inside
// ComposableMap so it can use the map's own projection (same one the main
// Global Reach map uses).
export default function JourneyLayer({ stops, journey, k, reduce, onSelectLocation, onGeometry }) {
  const { projection } = useMapContext();
  const routeRef = useRef(null);
  const planeRef = useRef(null);
  const { travel, leg, phase, visited, index } = journey;

  const geometry = useMemo(
    () => ({
      origin: projection(INDIA.coordinates),
      pts: stops.map((s) => projection(s.coordinates)),
    }),
    [projection, stops]
  );

  useEffect(() => {
    onGeometry(geometry);
  }, [geometry, onGeometry]);

  // One pin per distinct place (e.g. two Thailand events share a pin).
  const locations = useMemo(() => {
    const map = new Map();
    stops.forEach((s, i) => {
      const entry = map.get(s.locKey) ?? { key: s.locKey, name: s.country, pt: geometry.pts[i], stops: [] };
      entry.stops.push(i);
      map.set(s.locKey, entry);
    });
    return [...map.values()].map((l) => ({ ...l, count: l.stops.length }));
  }, [stops, geometry]);

  const pointOf = (i) => (i < 0 ? geometry.origin : geometry.pts[i]);
  const legId = leg?.id;
  const activeD = leg && !reduce ? createFlightPath(pointOf(leg.from), pointOf(leg.to)) : null;

  // Trail + plane follow the motion value directly (no re-render per frame).
  useLayoutEffect(() => {
    const path = routeRef.current;
    if (!path || !activeD) return undefined;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    const setDraw = (v) => {
      path.style.strokeDashoffset = `${len * (1 - v)}`;
    };
    const place = (t) => {
      const p = path.getPointAtLength(len * t);
      const a = path.getPointAtLength(Math.max(0, len * t - 1.5));
      const b = path.getPointAtLength(Math.min(len, len * t + 1.5));
      const deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      planeRef.current?.setAttribute(
        'transform',
        `translate(${p.x} ${p.y}) rotate(${deg}) scale(${0.72 * k})`
      );
    };
    const update = (t) => {
      setDraw(t);
      place(t);
    };
    update(travel.get());
    const unsub = travel.on('change', update);
    return unsub;
  }, [activeD, legId, travel, k]);

  const arrived = phase === 'showing' || phase === 'done';
  const activeLoc = index >= 0 && arrived ? stops[index].locKey : null;
  const visitedKeys = new Set(visited.map((i) => stops[i].locKey));

  return (
    <g>
      {/* The route being flown: a thin trail behind the plane that fades once it lands */}
      {activeD && (
        <path
          key={leg.id}
          ref={routeRef}
          d={activeD}
          fill="none"
          stroke={GOLD}
          strokeWidth={1.4 * k}
          strokeLinecap="round"
          style={{ opacity: phase === 'flying' ? 0.95 : 0, transition: 'opacity 0.9s ease' }}
        />
      )}

      {/* India — origin */}
      <g transform={`translate(${geometry.origin[0]} ${geometry.origin[1]})`} className="pointer-events-none">
        {!reduce && (
          <motion.circle
            r={6 * k}
            fill="none"
            stroke="#2b2b2b"
            strokeWidth={1.5 * k}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
          />
        )}
        {/* Location pin — tip sits exactly on the origin coordinate */}
        <ellipse rx={4.5 * k} ry={1.8 * k} fill="#000" opacity="0.25" />
        <g transform={`scale(${k})`}>
          <path
            d="M0 0 C-5 -7 -9 -11 -9 -16 A9 9 0 1 1 9 -16 C9 -11 5 -7 0 0 Z"
            fill="#2b2b2b"
            stroke="#fff"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cy="-16" r="3.4" fill="#fff" />
        </g>
        <text
          y={14 * k}
          textAnchor="middle"
          fontSize={9.5 * k}
          fontWeight="800"
          letterSpacing={0.6 * k}
          fill="#2b2b2b"
          stroke="#fff"
          strokeWidth={3 * k}
          paintOrder="stroke"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <tspan x="0">SKM</tspan>
          <tspan x="0" dy={10.5 * k}>INDIA</tspan>
        </text>
      </g>

      {/* Event pins */}
      {locations.map((loc, i) => {
        const state = loc.key === activeLoc ? 'active' : visitedKeys.has(loc.key) ? 'visited' : 'idle';
        return (
          <Pin
            key={loc.key}
            pulseKey={index}
            loc={loc}
            state={state}
            k={k}
            delay={i * 0.07}
            reduce={reduce}
            onSelect={onSelectLocation}
          />
        );
      })}

      {/* Plane */}
      {activeD && (
        <g
          ref={planeRef}
          className="pointer-events-none"
          style={{ opacity: phase === 'flying' ? 1 : 0, transition: 'opacity 0.35s ease' }}
        >
          <path d={PLANE_PATH} fill="#fff" stroke={RED} strokeWidth={1.4} strokeLinejoin="round" />
        </g>
      )}
    </g>
  );
}
