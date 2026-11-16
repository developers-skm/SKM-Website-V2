import products from '../data/products';

// "Open whole egg page", "go to contact us", "quality policy page" ... -> the
// real page to open. Returns:
//   { type: 'page', page, label }        - exactly one target, open it
//   { type: 'choices', items: [product] } - several products fit, let the user pick
//   null                                 - not a navigation request
//
// A message counts as navigation when it starts with an explicit "open / go to /
// take me to / visit ..." verb, or mentions "page" (e.g. "whole egg page").
// Plain questions ("what is whole egg powder?") are left to the normal chat flow.

const STRONG_VERB = /^\s*(?:(?:please|pls|kindly)\s+)?(?:(?:can|could|would|will)\s+you\s+(?:please\s+)?)?(?:open|go\s*to|goto|take\s+me\s+to|navigate\s+to|visit|launch|redirect\s+me\s+to|move\s+to|bring\s+up|show\s+me|show)\b/i;
const MENTIONS_PAGE = /\bpages?\b/i;

const FILLER = new Set([
  'open', 'go', 'to', 'goto', 'take', 'me', 'navigate', 'visit', 'launch', 'redirect', 'move', 'bring', 'up',
  'show', 'the', 'a', 'an', 'page', 'pages', 'link', 'section', 'tab', 'screen', 'please', 'pls', 'kindly',
  'can', 'could', 'would', 'will', 'you', 'now', 'of', 'for', 'skm', 'website', 'site', 'i', 'want', 'need',
  'on', 'in', 'into', 'this', 'that', 'it', 'with', 'details', 'detail', 'info', 'information',
]);

// Site pages. `test` runs against the cleaned target phrase (filler removed).
const SITE_PAGES = [
  { test: /^(home|home ?page|main|landing)$/, page: 'home', label: 'Home' },
  { test: /^(products?|all products?|product list|product range|egg products?|our products?)$/, page: 'products', label: 'Products' },
  { test: /^(about|about us|about skm|company|our company|about company)$/, page: 'about_skm', label: 'About SKM' },
  { test: /^(vision|mission|vision (and|&) mission|vision mission)$/, page: 'vision_mission', label: 'Vision & Mission' },
  { test: /^(ceo|ceo message|ceo s message)$/, page: 'ceo_message', label: 'CEO Message' },
  { test: /^(core ideology|ideology|core values|values)$/, page: 'core_ideology', label: 'Core Ideology' },
  { test: /^(brand|brand identity|brand philosophy)$/, page: 'brand_identity', label: 'Brand Identity' },
  { test: /^(accolades?|awards?|recognitions?)$/, page: 'accolades', label: 'Accolades' },
  { test: /^(gallery|photos?|pictures?)$/, page: 'gallery', label: 'Gallery' },
  { test: /^(events?|news|exhibitions?)$/, page: 'events', label: 'Events' },
  { test: /^(coffee table books?)$/, page: 'coffee_table_books', label: 'Coffee Table Books' },
  { test: /^(quality|quality (and|&) food safety|food safety|quality food safety traceability)$/, page: 'quality_food_safety_traceability', label: 'Quality & Food Safety' },
  { test: /^(quality policy|food safety policy|policy|policies)$/, page: 'policy', label: 'Food Safety Policy' },
  { test: /^(certifications?|certificates?|certified)$/, page: 'certifications', label: 'Certifications' },
  { test: /^(traceability|traceable)$/, page: 'traceability', label: 'Traceability' },
  { test: /^(quality management( system)?|qms)$/, page: 'quality_management_system', label: 'Quality Management System' },
  { test: /^(egg processing( plant)?|processing plant|plant|factory)$/, page: 'egg_processing_plant', label: 'Egg Processing Plant' },
  { test: /^(poultry farm|poultry|farm|cage free( farm)?)$/, page: 'poultry_farm', label: 'Poultry Farm' },
  { test: /^(feed mill|feed|mill)$/, page: 'feed_mill', label: 'Feed Mill' },
  { test: /^(sustainability|sustainable|csr|community|sustainability (and|&) community)$/, page: 'sustainability_and_community', label: 'Sustainability & Community' },
  { test: /^(investors?|investor relations)$/, page: 'investors', label: 'Investors' },
  { test: /^(brochures?|catalou?gu?es?|downloads?|flyers?)$/, page: 'brochure', label: 'Brochures' },
  { test: /^(japan|skm japan)$/, page: 'skm_japan', label: 'SKM Japan' },
  { test: /^(europe|skm europe)$/, page: 'skm_europe', label: 'SKM Europe' },
  { test: /^(russia|skm russia)$/, page: 'skm_russia', label: 'SKM Russia' },
  { test: /^(contact|contact us|contacts|enquiry|inquiry|reach us)$/, page: 'contact-us', label: 'Contact Us' },
  { test: /^(quote|get quote|get a quote|request quote|request a quote|price|pricing|enquiry form)$/, page: 'get-quote', label: 'Get Quote' },
  { test: /^(applications?|uses|use cases)$/, page: 'applications', label: 'Applications' },
  { test: /^(bakery|bakery application|bakery applications)$/, page: 'app_bakery', label: 'Bakery Applications' },
  { test: /^(mayo|mayonnaise|mayonnaise application|dressings?)$/, page: 'app_mayo', label: 'Mayonnaise Applications' },
  { test: /^(meat|fish|meat (and|&) fish|meat fish|surimi)$/, page: 'app_meat_fish', label: 'Meat & Fish Applications' },
  { test: /^(noodles?|pasta|noodles (and|&) pasta|noodles pasta)$/, page: 'app_noodles_pasta', label: 'Noodles & Pasta Applications' },
  { test: /^(why skm|why us|why choose skm|why choose us)$/, page: 'why_skm', label: 'Why SKM' },
  { test: /^(manufacturing|supply|manufacturing (and|&) supply|capabilities)$/, page: 'manufacturing_and_supply', label: 'Manufacturing & Supply' },
  { test: /^(innovation|custom solutions?|customi[sz]ed solutions?|innovation (and|&) custom solutions?)$/, page: 'innovation_and_custom_solutions', label: 'Innovation & Custom Solutions' },
  { test: /^(global reach|global presence|global markets?|export|exports|branches|worldwide)$/, page: 'global_reach', label: 'Global Reach' },
  { test: /^(resources?|documents?)$/, page: 'resources', label: 'Resources' },
  { test: /^(careers?|jobs?|job openings?|vacanc(y|ies)|hiring)$/, page: 'careers', label: 'Careers' },
  { test: /^(table eggs?)$/, page: 'table_eggs', label: 'Table Eggs' },
];

const stem = (w) => {
  if (w === 'packages' || w === 'package') return 'packaging';
  if (w === 'mixes') return 'mix';
  return w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w;
};

const titleWords = (p) =>
  p.title.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(Boolean).map(stem);

function cleanTarget(message) {
  return message
    .toLowerCase()
    .replace(/['’]s\b/g, ' s')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !FILLER.has(w))
    .join(' ')
    .trim();
}

export function resolveNavigation(message) {
  const text = message.trim();
  if (!text) return null;
  const hasVerb = STRONG_VERB.test(text);
  if (!hasVerb && !MENTIONS_PAGE.test(text)) return null;
  // Long sentences are questions, not commands.
  if (text.split(/\s+/).length > 9) return null;

  const target = cleanTarget(text);
  if (!target) return null;

  // "show ..." alone is a content request ("show powders"); it needs "page" to navigate.
  if (/^\s*(?:please\s+)?show\b/i.test(text) && !MENTIONS_PAGE.test(text)) return null;

  const site = SITE_PAGES.find((s) => s.test.test(target));
  if (site) return { type: 'page', page: site.page, label: site.label };

  const words = target.split(/\s+/).map(stem);
  const candidates = products.filter((p) => {
    const tw = titleWords(p);
    return words.every((w) => tw.includes(w));
  });
  if (candidates.length === 0) return null;

  const exact = candidates.find((p) => titleWords(p).join(' ') === words.join(' '));
  if (exact) return { type: 'page', page: exact.page, label: exact.title };
  if (candidates.length === 1) return { type: 'page', page: candidates[0].page, label: candidates[0].title };
  if (candidates.length <= 4) return { type: 'choices', items: candidates };
  return null;
}
