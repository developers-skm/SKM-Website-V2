// ─────────────────────────────────────────────────────────────────────────────
//  SKM GALLERY - MOMENTS & MILESTONES
//
//  This file is the ONLY place you edit to change the Gallery page.
//  Order in this list does not matter: the page sorts by `date` (newest first),
//  groups by year, picks the layout, and feeds the full-screen viewer itself.
//
//  TO ADD A MOMENT
//    1. Put the photo in  public/gallery/   (any size; jpg / png / webp)
//    2. Run               npm run gallery:images   (makes the small, fast versions)
//    3. Add an object below:
//
//       {
//         id: 'annual-day-2026',                  // unique, any text
//         image: '/gallery/annual-day-2026.jpg',  // file name from step 1
//         date: '2026-09-18',                     // YYYY-MM-DD  (or YYYY-MM, or YYYY)
//         title: 'Annual Day Celebration',
//         caption: 'A memorable celebration with the SKM family.',   // keep to 1–2 lines
//         type: 'event',
//       },
//
//  TO MAKE IT AN AWARD / HIGHLIGHT
//    type: 'award'     → "Honour & Recognition" treatment (wide, gold accent)
//    highlight: true   → same treatment for any other type
//
//  OPTIONAL FIELDS
//    dateLabel: '20–22 Sep 2023'   text shown instead of the formatted date
//    alt: '…'                      image description (defaults to the title)
//    hero: true                    use this photo in the page's top collage
//                                  (if none are flagged, the newest 3 are used)
//
//  `date` is optional: items without one are shown last, under "Honours".
//
//  TYPES:  event · award · milestone · celebration · visit · moment
// ─────────────────────────────────────────────────────────────────────────────

export const moments = [
  // ── Events ────────────────────────────────────────────────────────────────
  {
    id: 'seoul-food-2026',
    image: '/gallery/seoul-food-2026.webp',
    date: '2026-06-09',
    dateLabel: '9–12 Jun 2026',
    title: 'Seoul Food 2026',
    caption: 'Demonstrated complete traceability compliance for premium egg white cube products.',
    type: 'event',
    hero: true,
  },
  {
    id: 'fi-vietnam-2026',
    image: '/gallery/fi-vietnam-2026.webp',
    date: '2026-05-13',
    dateLabel: '13–15 May 2026',
    title: 'Fi Vietnam 2026',
    caption: 'Presented premium bakery mixes to fast-growing culinary chains across Indochina.',
    type: 'event',
  },
  {
    id: 'fi-vietnam-2026-team',
    image: '/gallery/fi-vietnam-2026-team.webp',
    date: '2026-05-14',
    title: 'The SKM Team in Vietnam',
    caption: 'SKM team and visitors at the stand.',
    type: 'moment',
  },
  {
    id: 'gulfood-2025',
    image: '/gallery/gulfood-2025.webp',
    date: '2025-11-03',
    dateLabel: '3–5 Nov 2025',
    title: 'Gulfood Manufacturing 2025',
    caption: 'Established high-volume contracts for liquid pasteurized mixes with GCC partners.',
    type: 'event',
  },
  {
    id: 'fi-asia-2025',
    image: '/gallery/fi-asia-2025.webp',
    date: '2025-09-17',
    dateLabel: '17–19 Sep 2025',
    title: 'Fi Asia Thailand 2025',
    caption: 'Displayed enzyme-modified heat-stable yolk powders for high-temperature processing.',
    type: 'event',
    hero: true,
  },
  {
    id: 'fi-asia-2025-team',
    image: '/gallery/fi-asia-2025-team.webp',
    date: '2025-09-18',
    title: 'Meeting Our Partners',
    caption: 'SKM team members with visitors in Bangkok.',
    type: 'moment',
  },
  {
    id: 'fi-vietnam-2024',
    image: '/gallery/fi-vietnam-2024.webp',
    date: '2024-10-09',
    dateLabel: '9–11 Oct 2024',
    title: 'Fi Vietnam 2024',
    caption: 'Reinforced supply agreements with key Southeast Asian noodle and sauce processors.',
    type: 'event',
  },
  {
    id: 'fi-africa-2024',
    image: '/gallery/fi-africa-2024.webp',
    date: '2024-05-26',
    dateLabel: '26–28 May 2024',
    title: 'Fi Africa 2024',
    caption: 'Introduced customized yolk and whole egg mixes to the African baking sector.',
    type: 'event',
  },
  {
    id: 'gulfood-2023',
    image: '/gallery/gulfood-2023.webp',
    date: '2023-11-07',
    dateLabel: '7–9 Nov 2023',
    title: 'Gulfood Manufacturing 2023',
    caption: 'Expanded partnerships with major Middle Eastern dairy and mayonnaise brands.',
    type: 'event',
  },
  {
    id: 'fi-asia-2023',
    image: '/gallery/fi-asia-2023.webp',
    date: '2023-09-20',
    dateLabel: '20–22 Sep 2023',
    title: 'Fi Asia Thailand 2023',
    caption: 'Showcased the full line of egg powder solutions to Asian bakery and noodle makers.',
    type: 'event',
  },

  // ── Honours & awards (only the year is known for these) ──────────────────
  {
    id: 'award-5s-2016',
    image: '/gallery/award-5s-2016.webp',
    date: '2016',
    title: 'Best 5S Practice Award',
    caption: 'Best 5S Practice Award in 2016, provided by M/S ABK-AOTS.',
    type: 'award',
  },
  {
    id: 'award-mepz-2013',
    image: '/gallery/award-mepz-2013.webp',
    date: '2013',
    title: 'Export Excellence Award',
    caption: 'Export Excellence Award at MEPZ, Special Economic Zone – Chennai.',
    type: 'award',
  },
  {
    id: 'award-apeda-2012',
    image: '/gallery/award-apeda-2012.webp',
    date: '2012',
    dateLabel: '2012–13',
    title: 'Golden Trophy – APEDA',
    caption: '"Golden Trophy" from APEDA, Ministry of Commerce, Government of India.',
    type: 'award',
  },
  {
    id: 'award-apeda-2011',
    image: '/gallery/award-apeda-2011.webp',
    date: '2011',
    dateLabel: '2011–12',
    title: 'Golden Trophy – APEDA',
    caption: '"Golden Trophy" from APEDA, Ministry of Commerce, Government of India.',
    type: 'award',
  },

  // ── No date on record → shown last, under "Honours" ──────────────────────
  {
    id: 'award-padma-shree',
    image: '/gallery/award-padma-shree.webp',
    title: 'Padma Shree Award',
    caption: 'Shri SKM Maeilanandhan receiving the Padma Shree from the President of India.',
    type: 'award',
    hero: true,
  },
  {
    id: 'award-power-of-i',
    image: '/gallery/award-power-of-i.webp',
    title: 'The Power of i (India)',
    caption: 'Recognising Shree Shivkumar for making SKM a category leader in key export markets.',
    type: 'award',
  },
];
