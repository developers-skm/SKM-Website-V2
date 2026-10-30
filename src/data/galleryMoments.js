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

// Photo series: one moment per photograph. Numbered ids follow the folder order
// (public/gallery/<slug>-01.webp, -02, …). `each[i]` overrides fields for photo i.
const series = (slug, count, { each = [], omit = [], ...base }) =>
  Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return { id: `${slug}-${n}`, image: `/gallery/${slug}-${n}.webp`, ...base, ...each[i] };
  }).filter((_, i) => !omit.includes(i + 1));

export const moments = [
  // ── Events & celebrations ─────────────────────────────────────────────────
  ...series('family-fest-2022', 9, {
    date: '2022-04-12', dateLabel: '12 Apr 2022', title: 'Family Fest 2022',
    caption: 'The SKM family coming together to celebrate.', type: 'celebration',
    each: [{}, {}, {}, {}, { hero: true }],
    omit: [1, 2, 3, 4, 7, 8, 9], // only photos 05 (hall) and 06 (stage) are kept
  }),
  ...series('lmi-training-2021', 5, {
    date: '2021-02-12', dateLabel: '12 Feb 2021', title: 'Leadership Management International (LMI) Training',
    caption: 'Leadership development training for the SKM team.', type: 'event',
    each: [{}, {}, {}, {}, { hero: true }],
    omit: [1, 2, 3, 4], // only the last photo is kept
  }),
  ...series('agm-2019', 3, {
    date: '2019', title: 'Shareholders Meeting 2019',
    caption: 'Annual general meeting with SKM shareholders.', type: 'event',
    omit: [2, 3], // only photo 01 is kept
  }),
  ...series('family-fest-2019', 4, {
    date: '2019-05-03', dateLabel: '3 May 2019', title: 'Family Fest 2019',
    caption: 'The SKM family coming together to celebrate.', type: 'celebration',
    omit: [1, 3, 4], // only photo 02 is kept
  }),
  ...series('independence-day-2016', 2, {
    date: '2016-08-15', dateLabel: '15 Aug 2016', title: 'Independence Day 2016',
    caption: 'Independence Day celebration at SKM.', type: 'celebration',
    omit: [1], // first photo removed
  }),
  ...series('agm-2014', 4, {
    date: '2014-09-10', dateLabel: '10 Sep 2014', title: 'Shareholders Meeting 2014',
    caption: 'Annual general meeting with SKM shareholders.', type: 'event',
    omit: [1, 2, 4], // only photo 03 is kept
    order: 3, // shown last in 2014
  }),
  ...series('family-fest-2014', 4, {
    date: '2014-01-12', dateLabel: '12 Jan 2014', title: 'Family Fest 2014',
    caption: 'The SKM family coming together to celebrate.', type: 'celebration',
    each: [{}, {}, { order: 2 }, { order: 1 }], // photo 04 leads, then 03
    omit: [1, 2], // only photos 03 and 04 are kept
  }),
  ...series('agm-2013', 3, {
    date: '2013-09-30', dateLabel: '30 Sep 2013', title: 'Shareholders Meeting 2013',
    caption: 'Annual general meeting with SKM shareholders.', type: 'event',
    omit: [1, 2], // only photo 03 is kept
  }),
  ...series('agm-2012', 1, {
    date: '2012-09-29', dateLabel: '29 Sep 2012', title: 'Shareholders Meeting 2012',
    caption: 'Annual general meeting with SKM shareholders.', type: 'event',
  }),
  ...series('agm-2011', 1, {
    date: '2011-09-30', dateLabel: '30 Sep 2011', title: 'Shareholders Meeting 2011',
    caption: 'Annual general meeting with SKM shareholders.', type: 'event',
  }),

  // No date on record → shown last, under "Archive"
  ...series('sathabishegam', 3, {
    title: 'Sathabishegam', caption: 'A sacred ceremony celebrated with the SKM family.', type: 'celebration',
    omit: [2, 3], // only photo 01 is kept
  }),
  {
    id: 'archive-family-gathering',
    image: '/gallery/archive-family-gathering.png',
    title: 'A Proud Moment of Honour and Recognition for Our Esteemed Chairman',
    caption: 'Leaders and team members together on a memorable occasion.',
    type: 'celebration',
  },

  // ── Honours & awards (only the year is known for these) ──────────────────
  {
    id: 'award-padma-bhushan-2026',
    image: '/gallery/award-padma-bhushan-2026.jpg',
    dateLabel: '2026', // no `date` → listed under Honours (first, ahead of Padma Shree)
    title: 'Padma Bhushan',
    caption: 'Shri SKM Maeilanandhan receiving the Padma Bhushan award from the President of India.',
    type: 'award',
    hero: true,
  },
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
