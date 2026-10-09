 // Gallery photographs. Pure data (no asset imports) so scripts/build-gallery-images.mjs
// can read it: `source` is a path relative to src/assets, and the optimized
// derivatives are written to public/images/gallery/<slug>-<width>.webp.
// Dimensions of the generated files live in galleryImageMeta.json.

import meta from './galleryImageMeta.json' with { type: 'json' };

export const GALLERY_WIDTHS = [640, 1200, 1920];

export const galleryCategories = [
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'quality', label: 'Quality & Labs' },
  { id: 'farm', label: 'Poultry Farm' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'events', label: 'Events' },
  { id: 'awards', label: 'Awards' },
];

const P = '5. INFRASTRUCTURE/Egg Products/Process areas';
const U = '5. INFRASTRUCTURE/Egg Products/Utility';
const C = '5. INFRASTRUCTURE/Egg Products/Campus';
const L = '5. INFRASTRUCTURE/Laboratory';
const F = '5. INFRASTRUCTURE/Poultry farm';
const E = 'Events - EXPO';

// slug, source, category, title, alt, [caption], [desc], [position]
const raw = [
  // Manufacturing
  ['egg-breaking', `${P}/Egg Breaking.webp`, 'manufacturing', 'Egg Breaking', 'Eggs being broken and separated on the egg breaking line', null, 'Modern processing infrastructure designed around quality, hygiene and consistency.'],
  ['egg-conveyor', `${P}/Egg conveyor.webp`, 'manufacturing', 'Egg Conveyor', 'Rows of white eggs travelling on the processing conveyor'],
  ['albumen-dryer', `${P}/Albumen Dryer.webp`, 'manufacturing', 'Albumen Dryer', 'Stainless steel albumen drying equipment in the process area'],
  ['yolk-dryer', `${P}/Yolk Dryer.webp`, 'manufacturing', 'Yolk Dryer', 'Yolk drying equipment inside the clean process area'],
  ['pasteurization', `${P}/Pasteurization.webp`, 'manufacturing', 'Pasteurization', 'Pasteurization line inside the egg processing plant'],
  ['liquid-filling', `${P}/Liquid filling.webp`, 'manufacturing', 'Liquid Filling', 'Liquid egg filling machinery in the filling hall'],
  ['concentration', `${P}/Concentration.webp`, 'manufacturing', 'Concentration', 'Concentration section with stainless steel tanks and piping'],
  ['hot-room', `${P}/Hot room.webp`, 'manufacturing', 'Hot Room', 'Egg trays stacked inside the hot room'],
  ['egg-storage', `${P}/Egg Storage.webp`, 'manufacturing', 'Egg Storage', 'Stacks of egg crates in the egg storage area'],
  ['pre-pasteurization', `${P}/Pre pasteurization.webp`, 'manufacturing', 'Pre-Pasteurization', 'Stainless steel tanks in the pre-pasteurization area'],

  // Infrastructure
  ['campus-overview', `${C}/Campus overview.webp`, 'infrastructure', 'Campus Overview', 'Aerial view of the SKM campus with landscaped lawns'],
  ['factory-aerial', '2. ABOUT US/Our Company/Factory image.webp', 'infrastructure', 'The Factory', 'Aerial view of the SKM egg products factory'],
  ['security-entrance', `${C}/Security enterance.webp`, 'infrastructure', 'Security Entrance', 'White security entrance building at the SKM campus'],
  ['feed-mill', '5. INFRASTRUCTURE/Feed mill/Feed mill aerial view.webp', 'infrastructure', 'Feed Mill', 'Aerial view of the SKM feed mill and silos'],
  ['utility-overview', `${U}/Utility Overview.webp`, 'infrastructure', 'Utility Block', 'Aerial view of the utility block'],

  // Quality & Labs
  ['lcms', `${L}/LCMS.webp`, 'quality', 'LC-MS Laboratory', 'Analyst working at the LC-MS instrument in the laboratory'],
  ['gc-hplc', `${L}/GC and HPLC.webp`, 'quality', 'GC & HPLC', 'Analyst operating GC and HPLC instruments'],
  ['extraction-room', `${L}/Extraction room.webp`, 'quality', 'Extraction Room', 'Laboratory extraction room with benches and fume equipment'],
  ['laminar-flow', `${L}/Laminar flow.webp`, 'quality', 'Laminar Flow', 'Technician pipetting a sample under laminar flow'],
  ['petri-plate', '4. QUALITY/Quality Assurance/Petriplate and sample.webp', 'quality', 'Microbiology Sampling', 'Gloved hands preparing a petri plate sample'],
  ['conical-flask', '4. QUALITY/Quality Assurance/Conical flask.webp', 'quality', 'Laboratory Analysis', 'Conical flask with pink solution in the laboratory'],
  ['microbiology-lab', '4. QUALITY/Quality Management System/Microbiology Lab.webp', 'quality', 'Microbiology Lab', 'Microbiologist working inside the microbiology laboratory'],
  ['incubators', `${L}/Incubators.webp`, 'quality', 'Incubators', 'Row of laboratory incubators'],
  ['residue-lab', `${L}/Residue lab aerial view.webp`, 'quality', 'Residue Laboratory', 'Aerial view of the residue laboratory building'],

  // Poultry farm
  ['egg-collection', `${F}/Egg collection area.webp`, 'farm', 'Egg Collection', 'Farm team members collecting eggs from the conveyor'],
  ['poultry-shed', `${F}/Hen inside cage.webp`, 'farm', 'Poultry Shed Interior', 'Hens in rows of cages inside a poultry shed'],
  ['egg-collecting-conveyor', `${F}/Egg collecting conveyor.webp`, 'farm', 'Egg Collecting Conveyor', 'Eggs travelling on the farm egg collecting conveyor'],
  ['ec-shed-overview', `${F}/EC shed overview.webp`, 'farm', 'Farm Sheds', 'Aerial view of long poultry sheds with rooftop solar panels'],
  ['open-shed-view', `${F}/Open shed view.webp`, 'farm', 'Farm Overview', 'Aerial view of the poultry farm sheds across the site'],
  ['feed-silo', `${F}/Silo.webp`, 'farm', 'Feed Silo', 'Feed silo at the poultry farm'],
  ['vehicle-entry', `${F}/Vehicle entry shower.webp`, 'farm', 'Vehicle Entry Hygiene', 'Delivery truck passing through the vehicle entry disinfection shower'],

  // Sustainability
  ['biogas', `${U}/Biogas.webp`, 'sustainability', 'Biogas Plant', 'Domed biogas digester at the SKM utility area'],
  ['etp', `${U}/ETP.webp`, 'sustainability', 'Effluent Treatment Plant', 'Aerial view of the effluent treatment plant'],
  ['wtp', `${U}/WTP.webp`, 'sustainability', 'Water Treatment Plant', 'Aerial view of the water treatment plant tanks'],
  ['boiler', `${U}/Boiler.webp`, 'sustainability', 'Boiler House', 'Boiler house and chimney seen from above'],

  // Events
  ['fi-asia-2023', `${E}/FI ASIA THAILAND ( September 20-22-2023/4.webp`, 'events', 'Fi Asia Thailand 2023', 'SKM Egg Products stand at Fi Asia Thailand 2023', 'Sep 20–22, 2023 · Thailand'],
  ['gulfood-2023', `${E}/Gulfood Manufacturing (7-9 nov 2023) Dubai WTC/1.webp`, 'events', 'Gulfood Manufacturing 2023', 'SKM team at Gulfood Manufacturing 2023 in Dubai', 'Nov 7–9, 2023 · Dubai WTC'],
  ['fi-africa-2024', `${E}/Fi Africa 2024 (May26 -28-2024) Egypt/Booth - Stall.webp`, 'events', 'Fi Africa 2024', 'SKM Egg Products booth at Fi Africa 2024', 'May 26–28, 2024 · Egypt'],
  ['fi-vietnam-2024', `${E}/Fi Vietnam 2024 (Oct 9-11-2024) Vietnam/1.webp`, 'events', 'Fi Vietnam 2024', 'SKM Egg Products stand at Fi Vietnam 2024', 'Oct 9–11, 2024 · Vietnam'],
  ['fi-asia-2025', `${E}/Fi Asia Thailand 2025 (Sep 17-19-2025) Thailand/1.webp`, 'events', 'Fi Asia Thailand 2025', 'SKM Egg Products stand at Fi Asia Thailand 2025', 'Sep 17–19, 2025 · Thailand'],
  ['fi-asia-2025-team', `${E}/Fi Asia Thailand 2025 (Sep 17-19-2025) Thailand/3.webp`, 'events', 'Meeting Our Partners', 'SKM team members with visitors at Fi Asia Thailand 2025', 'Sep 17–19, 2025 · Thailand'],
  ['gulfood-2025', `${E}/Gulf food Manufacturing2025(3-5nov)  Dubai/1.webp`, 'events', 'Gulfood Manufacturing 2025', 'SKM Egg Products stand at Gulfood Manufacturing 2025', 'Nov 3–5, 2025 · Dubai'],
  ['fi-vietnam-2026', `${E}/Fi Vietnam 2026 (May13-15) Vietnam/1.webp`, 'events', 'Fi Vietnam 2026', 'SKM Egg Products egg-shaped stand at Fi Vietnam 2026', 'May 13–15, 2026 · Vietnam'],
  ['fi-vietnam-2026-team', `${E}/Fi Vietnam 2026 (May13-15) Vietnam/4.webp`, 'events', 'The SKM Team in Vietnam', 'SKM team and visitors at Fi Vietnam 2026', 'May 13–15, 2026 · Vietnam'],
  ['seoul-food-2026', `${E}/Seoul Food 2026 (June 9-12)/1.webp`, 'events', 'Seoul Food 2026', 'SKM Egg Products stand at Seoul Food 2026', 'Jun 9–12, 2026 · Seoul'],
  ['seoul-food-2026-meeting', `${E}/Seoul Food 2026 (June 9-12)/4.webp`, 'events', 'Seoul Food Handshake', 'SKM representative shaking hands with a visitor at Seoul Food 2026', 'Jun 9–12, 2026 · Seoul'],

  // Awards (same photographs as the Accolades page)
  ['award-power-of-i', 'ACCOLADES/Picture1.png', 'awards', 'The Power of i (India)', 'The Power of i award presented to SKM Egg'],
  ['award-5s-2016', 'ACCOLADES/Picture3.png', 'awards', 'Best 5S Practice Award 2016', 'Best 5S Practice Award 2016 by ABK-AOTS'],
  ['award-apeda-2011', 'ACCOLADES/Picture4.png', 'awards', 'Golden Trophy – APEDA 2011-12', 'APEDA Golden Trophy for 2011-2012'],
  ['award-apeda-2012', 'ACCOLADES/Picture5.png', 'awards', 'Golden Trophy – APEDA 2012-13', 'APEDA Golden Trophy for 2012-2013'],
  ['award-mepz-2013', 'ACCOLADES/Picture6.png', 'awards', 'Export Excellence Award – MEPZ 2013', 'Export Excellence Award at MEPZ Special Economic Zone, Chennai 2013'],
  ['award-padma-shree', 'ACCOLADES/Picture7.png', 'awards', 'Padma Shree Award', 'Shri SKM Maeilanandhan receiving the Padma Shree Award from the President of India'],
];

const labelFor = Object.fromEntries(galleryCategories.map((c) => [c.id, c.label]));

const items = raw.map(([slug, source, category, title, alt, caption, desc]) => ({
  slug,
  source,
  category,
  categoryLabel: labelFor[category],
  title,
  alt,
  caption: caption || null,
  desc: desc || null,
  width: meta[slug]?.w,
  height: meta[slug]?.h,
}));

// "All" interleaves the categories so the first screen is varied, instead of
// showing every manufacturing photo before any other category.
function interleave(list) {
  const buckets = galleryCategories.map((c) => list.filter((i) => i.category === c.id));
  const out = [];
  for (let n = 0; out.length < list.length; n += 1) {
    buckets.forEach((b) => b[n] && out.push(b[n]));
  }
  return out;
}

export const galleryItems = interleave(items);

export const heroItems = {
  main: items.find((i) => i.slug === 'campus-overview'),
  second: items.find((i) => i.slug === 'egg-breaking'),
  third: items.find((i) => i.slug === 'laminar-flow'),
};

export const imageUrl = (slug, width) => `/images/gallery/${slug}-${width}.webp`;
export const imageSrcSet = (slug) =>
  GALLERY_WIDTHS.map((w) => `${imageUrl(slug, w)} ${w}w`).join(', ');
