import exportMarkets from '../../data/exportMarkets';

// SKM's home base — the same point the main Global Reach map routes from.
export const INDIA = { id: 356, name: 'India', coordinates: [78, 21] };

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const parseDate = (iso) => {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

// Pieces for display: days "17 — 19", month "SEP", year "2025", short "17–19 SEP 2025".
export function describeDate(ev) {
  const start = parseDate(ev.startDate);
  if (!start) return null;
  const end = parseDate(ev.endDate) ?? start;
  const d1 = String(start.getDate()).padStart(2, '0');
  const d2 = String(end.getDate()).padStart(2, '0');
  const m1 = MONTHS[start.getMonth()];
  const m2 = MONTHS[end.getMonth()];
  const year = String(end.getFullYear());
  const single = start.getTime() === end.getTime();
  const sameMonth = start.getMonth() === end.getMonth();
  return {
    days: single ? d1 : `${d1} — ${d2}`,
    month: single || sameMonth ? m1 : `${m1} — ${m2}`,
    year,
    short: single
      ? `${d1} ${m1} ${year}`
      : sameMonth
        ? `${d1}–${d2} ${m1} ${year}`
        : `${d1} ${m1} – ${d2} ${m2} ${year}`,
  };
}

export const locationText = (ev) => [ev.city, ev.country].filter(Boolean).join(', ');

// Where "View Event" goes: explicit link, else the event's own page.
export const eventTarget = (ev) => ev.link || `events/${ev.slug}`;
export const isExternal = (link) => /^https?:\/\//i.test(link || '');

// /gallery/name.webp → its generated width variant (see npm run gallery:images)
export const imageVariant = (src, width) =>
  src ? src.replace(/\.(webp|jpe?g|png)$/i, `-${width}.webp`) : '';

/**
 * Turns the events data into ordered journey stops.
 * Order: ascending `journeyOrder`; events without one follow, oldest first.
 * Coordinates: event.coordinates, else the country's position from exportMarkets.
 */
export function buildJourney(events) {
  const byCountry = new Map(exportMarkets.map((m) => [m.name, m]));
  return events
    .map((ev) => {
      const market = byCountry.get(ev.country);
      const coordinates = ev.coordinates ?? market?.coordinates;
      if (!coordinates) return null;
      return {
        ...ev,
        coordinates,
        countryId: market?.id ?? null,
        code: market?.code ?? null,
        locKey: coordinates.join(','),
        date: describeDate(ev),
        place: locationText(ev),
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      const oa = a.journeyOrder ?? Infinity;
      const ob = b.journeyOrder ?? Infinity;
      if (oa !== ob) return oa - ob;
      return String(a.startDate).localeCompare(String(b.startDate));
    });
}

/**
 * Curved flight route between two projected points (SVG cubic bezier).
 * Bows toward the north like the main map's routes, scaled by distance, so
 * short hops get a gentle arc and long hauls a wider one.
 */
export function createFlightPath(a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const chord = Math.hypot(dx, dy) || 1;
  let nx = -dy / chord;
  let ny = dx / chord;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const lift = Math.min(chord * 0.2, 70);
  const c1 = [a[0] + dx * 0.25 + nx * lift, a[1] + dy * 0.25 + ny * lift];
  const c2 = [a[0] + dx * 0.75 + nx * lift, a[1] + dy * 0.75 + ny * lift];
  return `M${a[0]},${a[1]} C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${b[0]},${b[1]}`;
}

const overlaps = (a, b) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

/**
 * Collision-aware placement of the event image around a pin.
 * Tries above, below, right, left (in that order); the first that stays inside
 * the map and clear of `avoid` (header + details panel rectangles) wins. The other axis is
 * clamped into the container so the image never leaves the map.
 */
export function placePopup({ pin, size, container, avoid = [], gap = 24, margin = 12 }) {
  const blocked = (o) => [].concat(avoid).some((r) => r && overlaps(o, r));
  const { w, h } = size;
  const clampX = (x) => Math.min(Math.max(x, margin), container.w - w - margin);
  const clampY = (y) => Math.min(Math.max(y, margin), container.h - h - margin);

  const options = [
    { side: 'top', x: clampX(pin.x - w / 2), y: pin.y - gap - h },
    { side: 'bottom', x: clampX(pin.x - w / 2), y: pin.y + gap + 22 },
    { side: 'right', x: pin.x + gap, y: clampY(pin.y - h / 2) },
    { side: 'left', x: pin.x - gap - w, y: clampY(pin.y - h / 2) },
  ].map((o) => ({ ...o, w, h }));

  const fits = (o) =>
    o.x >= margin &&
    o.y >= margin &&
    o.x + w <= container.w - margin &&
    o.y + h <= container.h - margin &&
    !blocked(o);

  return options.find(fits) ?? options.find((o) => !blocked(o)) ?? options[1];
}
