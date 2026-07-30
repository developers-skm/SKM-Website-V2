// Single source of truth for navigation labels, routes, and grouping.
// Data only — no DOM access, no scrolling, no navigation side effects.
// Consumed by UtilityBar, PrimaryNav, NavDropdown, ProductsMegaMenu, and
// MobileNavigation so labels/routes are never duplicated across components.

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
// single link (see PrimaryNav.jsx/MobileNavigation.jsx) since the real
// /resources page already contains everything the dropdown pointed to
// (Brochures & Downloads and Certifications are both merged into it as
// real sections, per this session's consolidation work). Kept as an empty
// array, not deleted, so NavDropdown's `.map()` call in PrimaryNav.jsx and
// MobileNavigation.jsx doesn't need a conditional guard.
export const mainNavGroups = [];

export const PRODUCT_DISCOVERY_SECTION_ID = 'product-discovery';
export const APPLICATION_SELECTOR_SECTION_ID = 'application-selector';
