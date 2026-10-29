// Answers "explain X" questions from the text the website pages themselves
// display, so the chatbot never says "I don't know" about something that is on
// the site. Page sources are loaded on demand (only when a question reaches
// this fallback) and their long sentences are matched against the question.

import cageFreeImg from '../assets/cage-free/cage-free-1.webp';
import poultryHero from '../assets/page-heroes/poultry-farm.webp';
import feedMillHero from '../assets/page-heroes/feed-mill.webp';
import globalReachHero from '../assets/page-heroes/global-reach-port.webp';
import sustainabilityHero from '../assets/page-heroes/sustainability-biogas.webp';
import factoryImg from '../assets/home/skm-factory.jpeg';
import certificateImg from '../assets/4. QUALITY/Certificates/BRC FOOD_524x600px.png';
import traceabilityImg from '../assets/4. QUALITY/Traceability/Traceability Home Section.webp';
import policyImg from '../assets/4. QUALITY/Food Safety and Quality Policy/LCMS - web.webp';
import qmsImg from '../assets/why-skm/qms-framework.webp';
import companyImg from '../assets/2. ABOUT US/Our Company/Factory image.webp';
import manufacturingImg from '../assets/5. INFRASTRUCTURE/Manufacturing Supply/supply.webp';
import whySkmImg from '../assets/images/why-skm-bg.webp';

const sources = import.meta.glob('../pages/**/*.jsx', { query: '?raw', import: 'default' });

// `file` is the page source whose text is searched, `page` the route the
// "Open page" button goes to. `topicImages` swap the image for a sub-topic.
const PAGES = [
  { file: 'Infra/sections/PoultryFarm.jsx', page: 'poultry_farm', title: 'Poultry Farm', image: poultryHero, topicImages: [{ test: /cage/i, image: cageFreeImg }] },
  { file: 'Infra/sections/FeedMill.jsx', page: 'feed_mill', title: 'Feed Mill', image: feedMillHero },
  { file: 'Infra/sections/EggProcessingPlant.jsx', page: 'egg_processing_plant', title: 'Egg Processing Plant', image: factoryImg },
  { file: 'Quality/sections/Certifications.jsx', page: 'certifications', title: 'Certifications', image: certificateImg },
  { file: 'Quality/QualityFoodSafetyTraceabilityPage.jsx', page: 'quality_food_safety_traceability', title: 'Quality, Food Safety & Traceability', image: traceabilityImg },
  { file: 'Quality/sections/Traceability.jsx', page: 'traceability', title: 'Traceability', image: traceabilityImg },
  { file: 'Quality/sections/FoodSafetyPolicy.jsx', page: 'policy', title: 'Food Safety & Quality Policy', image: policyImg },
  { file: 'Quality/sections/QualityManagementSystem.jsx', page: 'quality_management_system', title: 'Quality Management System', image: qmsImg },
  { file: 'AboutUs/sections/OurCompany.jsx', page: 'our_company', title: 'Our Company', image: companyImg },
  { file: 'AboutUs/sections/VisionMission.jsx', page: 'vision_mission', title: 'Vision & Mission' },
  { file: 'AboutUs/sections/CeoMessage.jsx', page: 'ceo_message', title: "CEO's Message" },
  { file: 'AboutUs/CoreIdeologyPage.jsx', page: 'core_ideology', title: 'Core Ideology' },
  { file: 'AboutUs/sections/BrandPhilosophy.jsx', page: 'brand_identity', title: 'Brand Identity' },
  { file: 'AboutUs/AccoladesPage.jsx', page: 'accolades', title: 'Accolades' },
  { file: 'WhySKM/WhySKMPage.jsx', page: 'why_skm', title: 'Why SKM', image: whySkmImg },
  { file: 'Capabilities/ManufacturingSupplyPage.jsx', page: 'manufacturing_and_supply', title: 'Manufacturing & Supply', image: manufacturingImg },
  { file: 'GlobalReach/GlobalReachPage.jsx', page: 'global_reach', title: 'Global Reach', image: globalReachHero },
  { file: 'CSR/SustainabilityPage.jsx', page: 'csr_sustainability', title: 'Sustainability', image: sustainabilityHero },
  { file: 'CSR/SustainabilityCommunityPage.jsx', page: 'sustainability_and_community', title: 'Sustainability & Community' },
  { file: 'CSR/CommunityDevelopmentPage.jsx', page: 'community_development', title: 'Community Development' },
  { file: 'CSR/EducationPage.jsx', page: 'csr_education', title: 'Education' },
  { file: 'CSR/TrustOutreachPage.jsx', page: 'trust_outreach', title: 'Trust Outreach' },
];

const STOPWORDS = new Set((
  'the and for are was were you your our about what whats who how why when where which does did can could would should will ' +
  'tell give show explain describe details detail information info please know more any there their its this that these those with from into ' +
  'choose choice select pick buy get order find like would thing things one type types prefer preferred go going try trying ' +
  'want wants make making made suitable suit suits best good need needs recommend suggest product products use using used ' +
  'initiative initiatives effort efforts practice practices activity activities program programs programme programmes measures ' +
  'have has had been being not yes skm eggs egg me us we they them is it of to in on at an as or be by a i'
).split(/\s+/));

const stem = (w) => w.replace(/(ies)$/, 'y').replace(/(ing|es|s)$/, '');
// A stopword, including a one-letter typo of one ("sutable" for "suitable").
const isStopword = (w) => STOPWORDS.has(w) || (w.length >= 6 && [...STOPWORDS].some((s) => s.length >= 6 && sameWord(w, s)));
const tokenize = (text) =>
  (text.toLowerCase().match(/[a-z0-9]+/g) || []).filter((w) => w.length >= 3 && !isStopword(w)).map(stem);

// A sentence a visitor reads on the page: long enough, ends like a sentence.
// Tailwind class lists, keyword lists, paths, SVG data and code are rejected.
const CLASS_LIKE = /\b(flex|grid|absolute|relative|w-full|items-center|justify-|rounded|gap-\d|px-\d|py-\d|bg-|text-\[|border-|hover:|sm:|lg:|md:)/;
const isReadable = (s) =>
  s.length >= 60 &&
  s.split(' ').length >= 9 &&
  /[.!?]$/.test(s) &&
  !/[{}<>=]|\$\{|\/\/|^M\d/.test(s) &&
  !CLASS_LIKE.test(s) &&
  /[a-z]{3}/.test(s);

function extractUnits(raw) {
  const units = [];
  const literal = /'((?:[^'\\\n]|\\.)+)'|"((?:[^"\\\n]|\\.)+)"|`((?:[^`\\])+)`/g;
  let m;
  while ((m = literal.exec(raw))) {
    const s = (m[1] ?? m[2] ?? m[3]).replace(/\\'/g, "'").replace(/\s+/g, ' ').trim();
    if (isReadable(s)) units.push(s);
  }
  // JSX text lines such as <p>Some sentence here.</p>
  const jsxText = />([^<>{}\n]{60,})</g;
  while ((m = jsxText.exec(raw))) {
    const s = m[1].replace(/\s+/g, ' ').trim();
    if (isReadable(s)) units.push(s);
  }
  return [...new Set(units)];
}

const cache = new Map();
async function loadUnits(file) {
  if (cache.has(file)) return cache.get(file);
  const key = Object.keys(sources).find((k) => k.endsWith(`/pages/${file}`));
  const units = key ? extractUnits(await sources[key]()).map((text) => ({ text, tokens: new Set(tokenize(text)) })) : [];
  cache.set(file, units);
  return units;
}

// ── Product suggestions: "which product is suitable for macaroons?" ────────
// Searches what each product page displays (application tags, applications,
// descriptions) so the suggestion always matches the page itself.
const PRODUCT_FILES = {
  whole_egg_powder: 'Products/WholeEggPowderPage.jsx',
  egg_yolk_powder: 'Products/EggYolkPowderPage.jsx',
  egg_yolk_powder_heat_stable: 'Products/EggYolkPowderHeatStablePage.jsx',
  egg_albumen_powder: 'Products/EggAlbumenPowderPage.jsx',
  whole_egg_liquid: 'Products/WholeEggLiquidPage.jsx',
  egg_yolk_liquid: 'Products/EggYolkLiquidPage.jsx',
  egg_albumen_liquid: 'Products/EggAlbumenLiquidPage.jsx',
  customised_mix: 'Products/CustomizedMixPage.jsx',
};

// Plain text a visitor reads: quoted strings, minus import paths and class lists.
function extractWords(raw) {
  const out = [];
  const literal = /'((?:[^'\\\n]|\\.)+)'|"((?:[^"\\\n]|\\.)+)"|`((?:[^`\\])+)`/g;
  let m;
  while ((m = literal.exec(raw))) {
    const s = m[1] ?? m[2] ?? m[3];
    if (s.length >= 3 && !/[/{}<>=]|\$\{/.test(s) && !CLASS_LIKE.test(s)) out.push(s);
  }
  return out;
}

// "macaroons" must also find the page's own spelling "Macroons".
function sameWord(a, b) {
  if (a === b) return true;
  if (a.length < 5 || b.length < 5 || Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  const restA = a.slice(i);
  const restB = b.slice(i);
  return restA.slice(1) === restB || restA === restB.slice(1) || restA.slice(1) === restB.slice(1);
}

const productTokens = new Map();
async function loadProductTokens(id) {
  if (productTokens.has(id)) return productTokens.get(id);
  const key = Object.keys(sources).find((k) => k.endsWith(`/pages/${PRODUCT_FILES[id]}`));
  const tokens = key ? [...new Set(tokenize(extractWords(await sources[key]()).join(' ')))] : [];
  productTokens.set(id, tokens);
  return tokens;
}

export async function suggestProducts(message) {
  const query = [...new Set(tokenize(message))];
  if (!query.length) return null;
  // One matching topic word is enough - leftover filler words must not veto a suggestion;
  // the best-matching products are the ones that share the most words.
  const needed = 1;
  const ranked = [];
  for (const id of Object.keys(PRODUCT_FILES)) {
    const tokens = await loadProductTokens(id);
    const matched = query.filter((q) => tokens.some((t) => sameWord(q, t)));
    if (matched.length >= needed) ranked.push({ id, hits: matched.length, matched });
  }
  if (!ranked.length) return null;
  ranked.sort((a, b) => b.hits - a.hits);
  const top = ranked.filter((r) => r.hits === ranked[0].hits).slice(0, 3);
  const words = (message.toLowerCase().match(/[a-z0-9]+/g) || []).filter((w) => top[0].matched.includes(stem(w)) && !isStopword(w));
  return { ids: top.map((r) => r.id), terms: [...new Set(words)] };
}

const MAX_CHARS = 750;

export async function siteAnswer(message) {
  const query = [...new Set(tokenize(message))];
  if (!query.length) return null;
  const needed = Math.max(1, Math.ceil(query.length * 0.6));

  let best = null;
  for (const entry of PAGES) {
    const units = await loadUnits(entry.file);
    const titleTokens = new Set(tokenize(entry.title));
    // The question is only about this page's topic ("sustainability initiatives"
    // -> Sustainability page): answer with the page's opening text.
    if (units.length && query.every((q) => titleTokens.has(q))) {
      const score = 100 + query.length - titleTokens.size * 0.1;
      if (!best || score > best.score) best = { entry, top: [{ ...units[0], order: 0 }], score, units };
      continue;
    }
    const scored = units
      .map((u, order) => ({ ...u, order, hits: query.filter((q) => u.tokens.has(q)).length }))
      .filter((u) => u.hits >= needed);
    if (!scored.length) continue;
    const top = [...scored].sort((a, b) => b.hits - a.hits || a.order - b.order).slice(0, 3);
    const titleBonus = query.filter((q) => titleTokens.has(q)).length;
    const score = top.reduce((sum, u) => sum + u.hits, 0) + titleBonus;
    if (!best || score > best.score) best = { entry, top, score, units };
  }
  if (!best) return null;

  // Lead with the best match, then the paragraphs that follow it on the page
  // (an explanation usually runs over a few paragraphs).
  const lead = best.top[0];
  const picked = [lead, ...best.units.slice(lead.order + 1, lead.order + 3)];
  let text = '';
  for (const u of picked) {
    if (text && text.length + u.text.length > MAX_CHARS) break;
    text += (text ? '\n' : '') + u.text;
  }
  const { entry } = best;
  const image = entry.topicImages?.find((t) => t.test.test(message))?.image ?? entry.image;
  return {
    answer: text,
    sources: [],
    products: image ? [{ id: entry.page, page: entry.page, title: entry.title, image }] : undefined,
    productsFirst: Boolean(image),
    actions: [{ label: `Open ${entry.title} page`, page: entry.page }],
  };
}
