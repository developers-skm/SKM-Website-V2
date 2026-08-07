// Single source of truth for navigation labels, routes, and grouping.
// Data only — no DOM access, no scrolling, no navigation side effects.
// Consumed by RailNav, NavOverlay, MenuSection and SearchPanel so labels/
// routes are never duplicated across components.

export const utilityLinks = [
  { label: 'Home', route: 'home' },
  { label: 'Global Presence', route: 'global_reach' },
  { label: 'Sustainability', route: 'sustainability_and_community' },
  { label: 'Investors', route: 'investors' },
  { label: 'Careers', route: 'contact-us', careersIntent: true },
  { label: 'Contact', route: 'contact-us' },
];

export const productsMegaMenu = {
  label: 'Products',
  columns: [
    {
      title: 'Egg Powders',
      links: [
        { label: 'Whole Egg Powder', route: 'whole_egg_powder' },
        { label: 'Egg Albumen Powder', route: 'egg_albumen_powder' },
        { label: 'Egg Yolk Powder', route: 'egg_yolk_powder' },
        { label: 'Egg Yolk Powder – Heat Stable', route: 'egg_yolk_powder_heat_stable' },
      ],
    },
    {
      title: 'Liquid Egg Products',
      links: [
        { label: 'Egg Albumen Liquid', route: 'egg_albumen_liquid' },
        { label: 'Egg Yolk Liquid', route: 'egg_yolk_liquid' },
        { label: 'Whole Egg Liquid', route: 'whole_egg_liquid' },
      ],
    },
    {
      title: 'Custom & Specialty Solutions',
      links: [
        { label: 'Customized Mix', route: 'customized_mix' },
        { label: 'Speciality Egg Liquids', route: 'speciality_egg_liquids' },
        { label: 'Egg White Cube', route: 'egg_white_cube' },
      ],
    },
    {
      title: 'Packaging',
      links: [
        { label: 'Customized Packages', route: 'customized_packages' },
      ],
    },
  ],
};

// No dropdown groups remain — Resources was the last one, and it's now a
// single link (see NavOverlay.jsx) since the real /resources page already
// contains everything the dropdown pointed to (Brochures & Downloads and
// Certifications are both merged into it as real sections). Kept as an
// empty array, not deleted, so any remaining `.map()` calls don't need a
// conditional guard.
export const mainNavGroups = [];

export const PRODUCT_DISCOVERY_SECTION_ID = 'product-discovery';
export const APPLICATION_SELECTOR_SECTION_ID = 'application-selector';

// Column layout for the full-screen navigation overlay (RailNav → NavOverlay).
// Mirrors the site's current live IA (consolidated hub pages), not the
// older, more granular per-page navigation the site moved away from.
export const overlayColumns = [
  {
    title: 'Main',
    links: [
      { label: 'Home', route: 'home' },
      { label: 'Products', route: 'products' },
      { label: 'Applications', route: 'applications' },
      { label: 'Resources', route: 'resources' },
    ],
  },
  {
    title: 'Company & Quality',
    links: [
      { label: 'About SKM', route: 'about_skm' },
      { label: 'Quality & Traceability', route: 'quality_food_safety_traceability' },
      { label: 'Manufacturing & Supply', route: 'manufacturing_and_supply' },
      { label: 'Global Presence', route: 'global_reach' },
    ],
  },
  {
    title: 'CSR & Investors',
    links: [
      { label: 'Sustainability', route: 'sustainability_and_community' },
      { label: 'Investors', route: 'investors' },
    ],
  },
  {
    title: 'Get in Touch',
    links: [
      { label: 'Careers', route: 'contact-us', careersIntent: true },
      { label: 'Contact', route: 'contact-us' },
      { label: 'Request a Quote', route: 'get-quote' },
    ],
  },
];

// Flat list for the SearchPanel's client-side filter — every distinct
// destination in the overlay, deduplicated by route+label combination.
export const searchableNavItems = overlayColumns
  .flatMap((column) => column.links)
  .filter((link, index, all) => all.findIndex((l) => l.route === link.route && l.label === link.label) === index);
