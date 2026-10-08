import meta from '../../data/galleryImageMeta.json';

export const UNDATED_ID = 'honours';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const TYPE_LABEL = {
  event: 'Event',
  award: 'Honour & Recognition',
  milestone: 'Milestone',
  celebration: 'Celebration',
  visit: 'Special Visit',
  moment: 'Special Moment',
};

// Filters shown (only when the data actually contains them).
export const FILTERS = [
  { id: 'all', label: 'All Moments', test: () => true },
  { id: 'events', label: 'Events', test: (m) => ['event', 'visit', 'celebration', 'moment'].includes(m.type) && !isAward(m) },
  { id: 'awards', label: 'Honours & Awards', test: (m) => isAward(m) },
  { id: 'milestones', label: 'Milestones', test: (m) => m.type === 'milestone' && !isAward(m) },
];

export const isAward = (m) => m.type === 'award' || m.highlight === true;

// '2026-09-18' | '2026-09' | '2026'  →  { y, m, d } (m / d are 0 when unknown)
function parseDate(date) {
  if (!date) return null;
  const [y, m = '0', d = '0'] = String(date).split('-');
  const year = Number(y);
  if (!Number.isFinite(year) || year < 1900) return null;
  return { y: year, m: Number(m) || 0, d: Number(d) || 0 };
}

function formatDate(p) {
  if (!p) return '';
  const parts = [];
  if (p.d) parts.push(String(p.d).padStart(2, '0'));
  if (p.m) parts.push(MONTHS[p.m - 1]);
  parts.push(p.y);
  return parts.join(' ');
}

// Sort key: newest first. Unknown month/day sort after known ones of that year.
const sortKey = (p) => p.y * 10000 + p.m * 100 + p.d;

/** Normalises, sorts (newest first) and groups moments by year. */
export function buildTimeline(moments, filterId = 'all') {
  const filter = FILTERS.find((f) => f.id === filterId) ?? FILTERS[0];
  const dated = [];
  const undated = [];

  moments
    .filter(filter.test)
    .forEach((m) => {
      const p = parseDate(m.date);
      const item = {
        ...m,
        alt: m.alt || m.title,
        award: isAward(m),
        label: m.dateLabel || formatDate(p),
        year: p ? String(p.y) : null,
        _key: p ? sortKey(p) : 0,
      };
      (p ? dated : undated).push(item);
    });

  dated.sort((a, b) => b._key - a._key || String(a.id).localeCompare(String(b.id)));

  const groups = [];
  dated.forEach((item) => {
    const last = groups[groups.length - 1];
    if (last && last.id === item.year) last.items.push(item);
    else groups.push({ id: item.year, label: item.year, items: [item] });
  });
  if (undated.length) groups.push({ id: UNDATED_ID, label: 'Honours', undated: true, items: undated });

  // Flat chronological order - drives the viewer's previous / next.
  const flat = groups.flatMap((g) => g.items);
  return { groups, flat };
}

/** Filters that actually have content, with counts. */
export function availableFilters(moments) {
  return FILTERS.map((f) => ({ ...f, count: moments.filter(f.test).length })).filter(
    (f) => f.id === 'all' || (f.count > 0 && f.count < moments.length)
  );
}

// Responsive image attributes from the generated metadata (see
// scripts/build-gallery-images.mjs). Falls back to the plain file if the
// script has not been run for this image yet.
export function imageProps(src, preferred = 1200) {
  const info = meta[src];
  if (!info) return { src, ratio: 4 / 3, srcSet: undefined, width: undefined, height: undefined, full: src };
  const base = src.replace(/\.[^.]+$/, '');
  const variants = info.v.map((w) => ({ w, url: `${base}-${w}.webp` }));
  const all = [...variants, { w: info.w, url: src }];
  const pick = all.find((x) => x.w >= preferred) ?? all[all.length - 1];
  return {
    src: pick.url,
    srcSet: all.map((x) => `${x.url} ${x.w}w`).join(', '),
    width: info.w,
    height: info.h,
    ratio: info.w / info.h,
    full: all[all.length - 1].url,
  };
}
