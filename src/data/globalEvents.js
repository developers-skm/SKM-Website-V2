// ─────────────────────────────────────────────────────────────────────────────
//  EVENTS & EXPOS — the single source of truth for "SKM Events Around the
//  World" (the journey map on /global_reach) and the /events/<slug> pages.
//  Pins, flight routes, the details panel, Previous / Next, the progress
//  count and the event page are all generated from this list.
//
//  TO ADD AN EVENT, add one object below:
//
//    {
//      id: 'fi-asia-2027',
//      slug: 'fi-asia-2027',               // page becomes /events/fi-asia-2027
//      title: 'Fi Asia Thailand 2027',
//      country: 'Thailand',                // must match a country in exportMarkets.js
//      city: 'Bangkok',                    // optional
//      startDate: '2027-09-15',            // YYYY-MM-DD
//      endDate: '2027-09-17',              // optional (omit for one day)
//      venue: 'QSNCC',                     // optional
//      booth: 'Hall 4 · Stand A21',        // optional
//      caption: 'One or two lines about the event.',
//      image: '/gallery/fi-asia-2027.webp',        // photo shown on the map
//      gallery: photos('fi-asia-2027', 5),         // optional: /public/events/<slug>/1.webp …
//      journeyOrder: 9,                    // position in the flight (1 = first stop)
//    }
//
//  OPTIONAL
//    coordinates: [lon, lat]   pin position; defaults to the country's position
//                              from exportMarkets.js (the same as the main map)
//    link: 'events/…' | 'https://…'   where "View Event" goes (default: its own page)
//
//  JOURNEY ORDER
//    The plane starts in India and visits events by ascending `journeyOrder`.
//    Events without one follow, oldest first. The route continues from stop to
//    stop (never back to India in between). An event with no matching country
//    is skipped. Photos for the map: /public/gallery/<name>.webp (run
//    `npm run gallery:images` after adding one).
// ─────────────────────────────────────────────────────────────────────────────

// /public/events/<slug>/1.webp … <count>.webp
const photos = (slug, count) =>
  Array.from({ length: count }, (_, i) => `/events/${slug}/${i + 1}.webp`);

export const globalEvents = [
  {
    id: 'fi-asia-2023',
    slug: 'fi-asia-2023',
    title: 'Fi Asia Thailand 2023',
    country: 'Thailand',
    startDate: '2023-09-20',
    endDate: '2023-09-22',
    caption: 'Showcased the full line of egg powder solutions to Asian bakery and noodle makers.',
    image: '/gallery/fi-asia-2023.webp',
    gallery: photos('fi-asia-2023', 5),
    journeyOrder: 1,
  },
  {
    id: 'gulfood-2023',
    slug: 'gulfood-manufacturing-2023',
    title: 'Gulfood Manufacturing 2023',
    country: 'UAE',
    city: 'Dubai',
    startDate: '2023-11-07',
    endDate: '2023-11-09',
    venue: 'Dubai WTC',
    caption: 'Expanded partnerships with major Middle Eastern dairy and mayonnaise brands.',
    image: '/gallery/gulfood-2023.webp',
    gallery: photos('gulfood-2023', 4),
    journeyOrder: 2,
  },
  {
    id: 'fi-africa-2024',
    slug: 'fi-africa-2024',
    title: 'Fi Africa 2024',
    country: 'Egypt',
    city: 'Cairo',
    startDate: '2024-05-26',
    endDate: '2024-05-28',
    caption: 'Introduced customized yolk and whole egg mixes to the African baking sector.',
    image: '/gallery/fi-africa-2024.webp',
    gallery: photos('fi-africa-2024', 5),
    journeyOrder: 3,
  },
  {
    id: 'fi-vietnam-2024',
    slug: 'fi-vietnam-2024',
    title: 'Fi Vietnam 2024',
    country: 'Vietnam',
    city: 'Ho Chi Minh City',
    startDate: '2024-10-09',
    endDate: '2024-10-11',
    venue: 'SECC',
    caption: 'Reinforced supply agreements with key Southeast Asian noodle and sauce processors.',
    image: '/gallery/fi-vietnam-2024.webp',
    gallery: photos('fi-vietnam-2024', 5),
    journeyOrder: 4,
  },
  {
    id: 'fi-asia-2025',
    slug: 'fi-asia-2025',
    title: 'Fi Asia Thailand 2025',
    country: 'Thailand',
    city: 'Bangkok',
    startDate: '2025-09-17',
    endDate: '2025-09-19',
    venue: 'QSNCC',
    caption: 'Displayed enzyme-modified heat-stable yolk powders for high-temperature processing.',
    image: '/gallery/fi-asia-2025.webp',
    gallery: photos('fi-asia-2025', 5),
    journeyOrder: 5,
  },
  {
    id: 'gulfood-2025',
    slug: 'gulfood-manufacturing-2025',
    title: 'Gulfood Manufacturing 2025',
    country: 'UAE',
    city: 'Dubai',
    startDate: '2025-11-03',
    endDate: '2025-11-05',
    venue: 'Dubai WTC',
    caption: 'Established high-volume contracts for liquid pasteurized mixes with GCC partners.',
    image: '/gallery/gulfood-2025.webp',
    gallery: photos('gulfood-2025', 5),
    journeyOrder: 6,
  },
  {
    id: 'fi-vietnam-2026',
    slug: 'fi-vietnam-2026',
    title: 'Fi Vietnam 2026',
    country: 'Vietnam',
    city: 'Ho Chi Minh City',
    startDate: '2026-05-13',
    endDate: '2026-05-15',
    venue: 'SECC',
    caption: 'Presented premium bakery mixes to fast-growing culinary chains across Indochina.',
    image: '/gallery/fi-vietnam-2026.webp',
    gallery: photos('fi-vietnam-2026', 5),
    journeyOrder: 7,
  },
  {
    id: 'seoul-food-2026',
    slug: 'seoul-food-2026',
    title: 'Seoul Food 2026',
    country: 'South Korea',
    startDate: '2026-06-09',
    endDate: '2026-06-12',
    venue: 'KINTEX',
    caption: 'Demonstrated complete traceability compliance for premium egg white cube products.',
    image: '/gallery/seoul-food-2026.webp',
    gallery: photos('seoul-food-2026', 5),
    journeyOrder: 8,
  },
  {
    id: 'flip-tanzania-2026',
    slug: 'flip-tanzania-2026',
    title: 'Future Food, Livestock & Poultry Expo (FLIP 2026)',
    country: 'Tanzania',
    city: 'Dar es Salaam',
    startDate: '2026-09-02',
    endDate: '2026-09-03',
    venue: 'Mwalimu J.K. Nyerere Trade Fair Grounds',
    caption:
      'The 3rd Future Food, Livestock & Poultry Expo (FLIP 2026) took place on September 2–3, 2026, at the Mwalimu J.K. Nyerere Trade Fair Grounds in Dar es Salaam, Tanzania.',
    image: '/gallery/flip-tanzania-2026.webp',
    gallery: photos('flip-tanzania-2026', 5),
    coordinates: [39.27, -6.79],
    journeyOrder: 9,
  },
  {
    id: 'fi-asia-indonesia-2026',
    slug: 'fi-asia-indonesia-2026',
    title: 'Fi Asia Indonesia 2026',
    country: 'Indonesia',
    city: 'Jakarta',
    startDate: '2026-09-16',
    endDate: '2026-09-18',
    venue: 'Jakarta International Expo (JIExpo)',
    caption:
      'Fi Asia Indonesia 2026 took place from September 16 to 18, 2026, at the Jakarta International Expo (JIExpo) in Jakarta, Indonesia.',
    image: '/gallery/fi-asia-indonesia-2026.webp',
    gallery: photos('fi-asia-indonesia-2026', 5),
    coordinates: [106.85, -6.2],
    journeyOrder: 10,
  },
];
