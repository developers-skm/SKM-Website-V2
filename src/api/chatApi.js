import journeyStages from '../data/journeyStages';
import { siteAnswer, suggestProducts } from './siteKnowledge';
import officeLocations from '../data/officeLocations';
import products, { getTdsUrl, getProductById, PRODUCT_CATEGORIES } from '../data/products';

const SITE = 'https://skmegg.vercel.app';

const STAGE_TESTS = {
  'feed-mill': /\bfeed( ?mill)?\b/i,
  farm: /\b(layer )?farms?\b/i,
  processing: /\bplant\b/i,
  'qa-lab': /\b(qa|lab|laborator(y|ies)|testing)\b/i,
  'packaging-dispatch': /\bdispatch|cold chain\b/i,
  'egg-export': /\begg export|export(ed)? eggs?|date of packing\b/i,
};

// Questions whose answers come straight from what the website displays
// (Get Quote flow, Customised Packages page). Answered locally so they never
// depend on the external worker's retrieval corpus being up to date.
const LOCAL_ANSWERS = [
  {
    test: /\bquot(e|es|ed|ation|ations|ing)\b/i,
    answer:
      "You can contact our sales team through the **Quotation page** - just fill in the Get Quote form with your product, volume and contact details, and the team will reply within 24 hours. You can also call the Corporate Office on 0424-2268391.\n" +
      "[Open the Get Quote form](" + SITE + "/get-quote)",
    sources: [SITE + '/get-quote', SITE + '/contact-us'],
  },
  {
    test: /\b(order|buy|purchase|place an? order|get (a )?quote|price|pricing|quotation|sample)\b/i,
    answer:
      "You can order or request a quote for any SKM product through the **Get Quote** form on our website (also reachable from the Request Sample / Get Quote buttons on each product page). It takes 4 short steps:\n" +
      "• **Requirement** - choose the product or your application, the functional need (heat stability, whipping, gel strength, emulsion stability, colour, protein) and standard or custom product.\n" +
      "• **Commercial Details** - estimated volume, preferred packaging, quantity, destination country and delivery period.\n" +
      "• **Contact Details** - your name, company, business email, phone and a short note.\n" +
      "• **Review** - check and submit.\n" +
      "Our export sales team replies within 24 hours. There is no online checkout - the order is confirmed with the sales team. You can also call the Corporate Office on 0424-2268391 or the Processing Factory on 0424-2351532 (Mon-Sat, 9:00 AM - 6:00 PM IST).\n" +
      "[Open the Get Quote form](" + SITE + "/get-quote)",
    sources: [SITE + '/get-quote', SITE + '/contact-us'],
  },
  {
    test: /\btrace(ability)?\b|\btraceab|farm[- ]to[- ](fork|product)|our journey/i,
    answer: () =>
      'SKM traceability runs through 6 stages, from feed to export:\n' +
      journeyStages.map((s) => `• **${s.step} ${s.label}** - ${s.tagline}`).join('\n') +
      '\nAsk me about any stage (for example the farm or the feed mill) for the full detail.',
    sources: [SITE + '/quality/traceability'],
  },
  // One answer per journey stage, using the exact text the site displays.
  ...journeyStages.map((s) => ({
    test: STAGE_TESTS[s.id],
    answer: () =>
      `**${s.label}** (stage ${s.step} of 6)\n${s.description}\n• **${s.stat.value}** ${s.stat.label.trim()}`,
    sources: [SITE + '/quality/traceability'],
  })),
  {
    test: /\b(pack(ag(e|es|ing))?|bags?|cartons?|pallecon|ibc|pack sizes?)\b/i,
    answer:
      "SKM packaging options:\n" +
      "• **Bag in Box (powder)** - HDPE inner bag in a corrugated carton: 25 Kg, 20 Kg, 10 Kg.\n" +
      "• **Bag in Bag (powder)** - multi-wall paper bag: 20 Kg, 10 Kg.\n" +
      "• **Bag - LDPE (liquid)** - for chilled and frozen liquid egg: 20 Kg, 10 Kg, 5 Kg.\n" +
      "• **Pallecon with inner LDPE (liquid)** - 1000 Kg bulk IBC container.\n" +
      "Packaging can be configured to your handling and dosing needs. Choose your preferred packaging in the Get Quote form.",
    sources: [SITE + '/products/customised-packages'],
    productId: 'customised_packages',
  },
];

// Product pages whose "Variant specification" list the chatbot reads. The page
// modules are loaded on demand, so the answer is always the list the page shows.
const VARIANT_PRODUCTS = [
  { test: /heat[- ]?stable/i, slug: 'egg-yolk-powder-heat-stable', load: () => import('../pages/Products/EggYolkPowderHeatStablePage') },
  { test: /(yolk|yellow).*liquid|liquid.*(yolk|yellow)/i, slug: 'egg-yolk-liquid', load: () => import('../pages/Products/EggYolkLiquidPage') },
  { test: /(albumen|egg white|white).*liquid|liquid.*(albumen|egg white)/i, slug: 'egg-albumen-liquid', load: () => import('../pages/Products/EggAlbumenLiquidPage') },
  { test: /whole.*liquid|liquid.*whole/i, slug: 'whole-egg-liquid', load: () => import('../pages/Products/WholeEggLiquidPage') },
  { test: /custom(i[sz]ed)? mix/i, slug: 'customised-mix', load: () => import('../pages/Products/CustomizedMixPage') },
  { test: /yolk|yellow/i, slug: 'egg-yolk-powder', load: () => import('../pages/Products/EggYolkPowderPage'), note: 'Heat Stable Egg Yolk Powder has its own product page.' },
  { test: /albumen|egg white/i, slug: 'egg-albumen-powder', load: () => import('../pages/Products/EggAlbumenPowderPage') },
  { test: /whole/i, slug: 'whole-egg-powder', load: () => import('../pages/Products/WholeEggPowderPage') },
];
const VARIANT_INTENT = /\b(variants?|varients?|varieties|types?|grades?)\b/i;

async function variantAnswer(message) {
  if (!VARIANT_INTENT.test(message)) return null;
  const product = VARIANT_PRODUCTS.find((p) => p.test.test(message));
  if (!product) return null;
  const { variantNamesTable } = await product.load();
  if (!variantNamesTable?.length) return null;
  const title = variantNamesTable[0].replace(/\s*[-(].*$/, '').trim() || 'This product';
  return {
    answer:
      `**${title}** has ${variantNamesTable.length} variants:\n` +
      variantNamesTable.map((n) => `• ${n}`).join('\n') +
      (product.note ? `\n${product.note}` : '') +
      '\nOpen the product page for each variant\'s specification.',
    sources: [`${SITE}/products/${product.slug}`],
  };
}

// "Which products are high in protein?" is a product-list question, answered with
// the protein-rich product cards. Questions asking for values (content, %, spec)
// still go to the technical team.
const PROTEIN_INTENT = /protein/i;
const PROTEIN_VALUE_INTENT = /\b(content|percent(age)?|how much|value|spec(s|ification|ifications)?|tds|coa|g\/100|amount|level|analysis)\b|%/i;
const PROTEIN_PRODUCT_IDS = ['egg_albumen_powder', 'egg_albumen_liquid', 'egg_white_cube'];

function productCardsReply(items, answer) {
  return {
    answer,
    sources: [],
    products: items.map((p) => ({
      id: p.id,
      page: p.page,
      title: p.title,
      image: p.image,
      description: p.shortDescription,
    })),
    actions: [{ label: 'View all products', page: 'products' }],
  };
}

function proteinReply() {
  return productCardsReply(
    PROTEIN_PRODUCT_IDS.map(getProductById).filter(Boolean),
    'Yes, we have protein-rich products! Our egg white (albumen) range is the best fit for high-protein needs. Tap a product below to open its page.',
  );
}

// "What are the types of egg powder?" / "which liquid products do you have?" -
// answered with that category's product cards. A specific product (yolk,
// albumen, whole...) is left to the variant and knowledge-base answers.
const CATEGORY_LISTS = [
  { test: /\bpowders?\b/i, category: PRODUCT_CATEGORIES.POWDERS, intro: 'We offer these egg powders. Tap a product to open its page.' },
  { test: /\bliquids?\b/i, category: PRODUCT_CATEGORIES.LIQUIDS, intro: 'We offer these liquid egg products, in chilled and frozen formats. Tap a product to open its page.' },
  { test: /\bspecial(i)?ty\b|\bcubes?\b/i, category: PRODUCT_CATEGORIES.SPECIALITY, intro: 'These are our speciality products. Tap a product to open its page.' },
  { test: /\bcustomi[sz]ed\b/i, category: PRODUCT_CATEGORIES.CUSTOMIZED, intro: 'These are our customised solutions. Tap a product to open its page.' },
];
const LIST_INTENT = /\b(types?|kinds?|range|list|products?|available|offer|have|varieties|show)\b/i;
const SPECIFIC_PRODUCT = /yolk|yellow|albumen|egg white|whole|heat[- ]?stable|mix\b/i;
const ALL_PRODUCTS_INTENT = /\b(all|your|what|which|show)\b.*\bproducts?\b|\bproduct (list|range|catalou?gue)\b/i;

function productListReply(message) {
  // A bare category ("egg liquids ?", "powders") is a list request too.
  const bareCategory = message.trim().split(/\s+/).length <= 4;
  if (!(LIST_INTENT.test(message) || bareCategory) || SPECIFIC_PRODUCT.test(message)) return null;
  const match = CATEGORY_LISTS.find((c) => c.test.test(message));
  if (match) return productCardsReply(products.filter((p) => p.category === match.category), match.intro);
  if (ALL_PRODUCTS_INTENT.test(message)) {
    return productCardsReply(products.filter((p) => p.id !== 'customised_packages'), 'Here are our products. Tap one to open its page.');
  }
  return null;
}

// "Where is the factory / office?" - addresses straight from the Contact Us data.
const LOCATION_INTENT = /\bwhere\b.*\b(factory|plant|office|located|location|you|skm|head ?quarters|hq)\b|\b(address|location|locate|directions?|head ?office|headquarters)\b/i;

function locationReply(message) {
  const wantsFactory = /\b(factory|plant|production|processing)\b/i.test(message);
  const wantsOffice = /\b(corporate|head ?office|head ?quarters|hq|office)\b/i.test(message);
  const items = officeLocations.filter((l) =>
    wantsFactory === wantsOffice ? true : wantsFactory ? l.type === 'factory' : l.type === 'corporate',
  );
  return {
    answer: items.length === 1 ? `Here is where to find our ${items[0].title}.` : 'Here are our locations.',
    sources: [SITE + '/contact-us'],
    locations: items.map((l) => ({
      id: l.type,
      title: l.title,
      badge: l.badge,
      image: l.image,
      address: l.address,
      phone: l.phone,
      phoneLink: l.phoneLink,
      directionsLink: l.directionsLink.replace(/\s+/g, ''),
    })),
  };
}

// Functionality -> recommended product (SKM's functionality table). Asking for
// a function ("fat", "gelling", "emulsification"...) shows the product that
// delivers it. Questions asking for values still go to the technical team.
const FUNCTION_RULES = [
  { test: /\bfat\b/i, label: 'fat', id: 'egg_yolk_powder' },
  { test: /\bgel(l?ing)?\b/i, label: 'gelling', id: 'egg_albumen_powder' },
  { test: /\bwhip(ping|ped)?\b/i, label: 'whipping', id: 'egg_albumen_powder' },
  { test: /\bfoam(ing|y)?\b/i, label: 'foaming', id: 'egg_albumen_powder', note: 'The High Whip variant is the one for foaming.' },
  { test: /\bemulsi(fication|fier|fying|fy|on)\b/i, label: 'emulsification', id: 'egg_yolk_powder_heat_stable' },
  { test: /\bbind(ing|er)?\b/i, label: 'binding', id: 'whole_egg_powder' },
  { test: /\btexture\b/i, label: 'texture', id: 'whole_egg_powder' },
  { test: /\byellow\b|\bcolou?r(ing)?\b/i, label: 'yellow colour', id: 'egg_yolk_powder' },
];
const FUNCTION_VALUE_INTENT = /\b(content|percent(age)?|how much|values?|spec(s|ification|ifications)?|tds|coa|amount|levels?|analysis|strength|range|min|max)\b|%/i;

function functionReply(message) {
  if (FUNCTION_VALUE_INTENT.test(message)) return null;
  const rules = FUNCTION_RULES.filter((r) => r.test.test(message));
  if (!rules.length) return null;
  const items = [...new Set(rules.map((r) => r.id))].map(getProductById).filter(Boolean);
  const card = (p) => ({ id: p.id, page: p.page, title: p.title, image: p.image, description: p.shortDescription });
  const notes = rules.filter((r) => r.note).map((r) => r.note);
  if (items.length === 1) {
    const [p] = items;
    const labels = rules.map((r) => r.label).join(' and ');
    return {
      answer: [`For **${labels}**, our recommended product is **${p.title}**.`, p.shortDescription, ...notes].join('\n'),
      sources: [],
      products: [card(p)],
      productsFirst: true,
      actions: [{ label: `Open ${p.title} page`, page: p.page }],
    };
  }
  return {
    answer: ['Here are the recommended products for what you asked. Tap one to open its page.', ...rules.map((r) => `• **${r.label}** - ${getProductById(r.id)?.title}`), ...notes].join('\n'),
    sources: [],
    products: items.map(card),
    actions: [{ label: 'Ask our technical team', page: 'get-quote', prefill: { enquiryIntent: 'general' } }],
  };
}

// "I want to make macaroons - which product is suitable?" - matched against the
// application text on each product page (see suggestProducts).
const SUITABLE_INTENT = /\b(products? (for|in)|(ideal|good|best|used?) for|for making|what can i use|suitable|suit|suits|best|recommend\w*|suggest\w*|which product|what product|use for|used for|make|making|prepare|preparing|want|need|looking for)\b/i;

// "Anything easy to use?" - the ready-to-use speciality products.
const EASY_USE_INTENT = /\b(easy|easier|ease|simple|convenient|convenience|quick|ready)([- ]to[- ](use|cook|eat|prepare))?\b.*\b(use|using|products?|options?|cook\w*|eat|prepare)\b|\b(ready[- ]to[- ](use|cook|eat)|easy[- ]to[- ]use|hassle[- ]free)\b/i;
const EASY_USE_PRODUCT_IDS = ['speciality_egg_liquids', 'egg_white_cube'];

function easyUseReply() {
  return productCardsReply(
    EASY_USE_PRODUCT_IDS.map(getProductById).filter(Boolean),
    'Yes! Our speciality products are made for convenience and ease of use: Speciality Liquid Blends and the ready-to-use Egg White Cube. Tap a product to open its page.',
  );
}

// Technical / specification questions are never answered by the bot (no
// percentages, grades or lab values) - they are handed to the technical team.
const TECHNICAL_INTENT =
  /\b(tech(nical)?|spec(s|ification|ifications)?|tds|coa|moisture|protein|fat|ph|sugar|salt|gel( strength| values?| range)?|(the )?values? of|solubility|viscosity|microbiolog\w*|composition|nutrition(al)?|ingredients?|formulation|dosage|dosing|ppm)\b|%|g\/cm/i;

const TECHNICAL_ACTIONS = [{ label: 'Ask our technical team', page: 'get-quote', prefill: { enquiryIntent: 'general' } }];

const GEL_REPLY = {
  answer:
    'We have multiple variants of albumen powder with different gel ranges. For the right gel range, you can contact our technical team and they can direct you based on the intended end use of your product.',
  sources: [SITE + '/products/egg-albumen-powder'],
  actions: TECHNICAL_ACTIONS,
};

const TECHNICAL_REPLY = {
  answer:
    'We have multiple variants of this product with different specification ranges. For accurate values, you can contact our technical team and they can direct you based on the intended end use of your product.',
  sources: [],
  actions: TECHNICAL_ACTIONS,
};

// Brochures, flyers, pamphlets and catalogues are all the site's "Product Detail" documents.
const BROCHURE_INTENT = /\b(bro?u?ch?e?re?s?|brochures?|brouch\w*|flyers?|pamphlets?|catalou?gu?es?|leaflets?|product details?)\b/i;

function brochureReply() {
  const docs = [
    ['whole_egg_powder', 'Whole Egg Powder'],
    ['egg_yolk_powder', 'Egg Yolk Powder'],
    ['egg_albumen_powder', 'Egg Albumen Powder'],
  ];
  const actions = docs
    .map(([id, name]) => ({ label: `${name} - Product Detail`, href: getTdsUrl(id) }))
    .filter((a) => a.href);
  actions.push({ label: 'Request other product details', page: 'get-quote', prefill: { enquiryIntent: 'sample-or-documents' } });
  return {
    answer: 'Yes, product details are available! Which product would you like? You can download the details for our egg powders below, or request them for any other product.',
    sources: [],
    actions,
  };
}

// Storage conditions as shown on the Global Reach page. Shelf-life durations
// are not published anywhere on the site, so they go to the technical team.
const STORAGE_INTENT = /\b(stor(e|ed|age|ing)|shelf[- ]?life|expiry|expire|how long|frozen|chilled|freez\w*)\b/i;
const SHELF_LIFE_INTENT = /shelf[- ]?life|expiry|expire|how long/i;

function storageReply(message) {
  const facts =
    '• **Chilled** liquid egg products are stored and transported at 0°C to 4°C.\n' +
    '• **Frozen** liquid egg products are stored and transported at -18°C or below, with extended shelf stability for long-distance export.';
  const asksShelfLife = SHELF_LIFE_INTENT.test(message);
  return {
    answer: asksShelfLife
      ? `Storage conditions for our liquid egg products:\n${facts}\nShelf-life duration depends on the product and grade, so please confirm it with our technical team.`
      : `Storage conditions for our liquid egg products:\n${facts}`,
    sources: [SITE + '/global-reach'],
    actions: asksShelfLife
      ? [{ label: 'Ask our technical team', page: 'get-quote', prefill: { enquiryIntent: 'general' } }]
      : undefined,
  };
}

const HELP_ACTIONS = [
  { label: 'Contact SKM', page: 'contact-us' },
  { label: 'Get a Quote', page: 'get-quote' },
];

const HELP_TOPICS =
  'I can help with our egg powders and liquids, variants, packaging, how to order, product details and our quality and traceability.';

const HOW_ARE_YOU = /\bhow are (you|u)\b|\bhow r u\b|\bhow'?s it going\b|\bhow do you do\b|\bwhat'?s up\b/i;

const HOW_ARE_YOU_REPLIES = [
  "That's so kind of you to ask! I'm doing wonderful, thank you. How has your day been so far? 😊",
  "I'm doing great, and it's even nicer now that we're chatting! How about you?",
  "Thank you for checking in! Everything's going smoothly here. I hope your day is treating you well too!",
  "I'm doing lovely, thanks for asking! Is there anything I can help make easier for you today?",
  "All good on my side! It's always a pleasure to have a friendly conversation. How are things with you?",
  "That's thoughtful of you! I'm doing well and ready to help whenever you need me. 😊",
  "I'm doing fantastic! Thanks for taking a moment to ask. I hope you're having a beautiful day!",
  "Everything's going great here! What about you? Anything exciting happening today?",
  "I'm doing just fine, thank you! I hope everything is going wonderfully on your end too.",
  "How sweet of you to ask! I'm doing great. It's always nice to start a conversation with a little kindness.",
  "I'm doing well, and I'm happy you're here! What can I help you explore today?",
  "Pretty great, actually! Thanks for asking. I hope your day is filled with good things!",
  "All is well here! I appreciate you asking. How can I brighten your day with a little help?",
  "I'm doing wonderfully! It's a pleasure connecting with you. How's your day going?",
  "Thank you for asking! I'm doing great and looking forward to helping you with whatever brings you here today.",
];

// General conversation. Anchored so product questions are never swallowed.
const SMALL_TALK = [
  {
    test: /^\s*(hi+|hello+|hey+|hii+|good\s*(morning|afternoon|evening)|greetings|namaste|vanakkam)\b[\s!.,]*$/i,
    answer: `Hello! I am EGGXA, your SKM Egg Products assistant. ${HELP_TOPICS} What would you like to know?`,
  },
  {
    test: HOW_ARE_YOU,
    answer: HOW_ARE_YOU_REPLIES,
  },
  {
    test: /\b(who are you|what('?s| is) your name|your name|are you (a )?(bot|human|robot|ai))\b/i,
    answer: 'I am EGGXA, the virtual assistant of SKM Egg Products. I answer questions about our egg products and company, and can point you to the right team when you need more.',
  },
  {
    test: /\b(what can you (do|help)|how can you help|help me|what do you know|what can i ask)\b/i,
    answer: `${HELP_TOPICS} Try asking "what variants are available in egg yolk powder?" or "how to place an order".`,
  },
  {
    test: /^\s*(thanks|thank you|thank u|thx|ty|many thanks|thanks a lot|great|awesome|nice|cool|ok(ay)?|fine|got it|alright)\b[\s!.,]*(a lot|so much|very much)?[\s!.]*$/i,
    answer: 'You are welcome! Let me know if you need anything else about SKM egg products.',
  },
  {
    test: /^\s*(bye+|goodbye|good ?night|see you|see ya|take care|ok bye)\b[\s!.,]*$/i,
    answer: 'Goodbye! Thank you for visiting SKM Egg Products. Have a great day!',
  },
  {
    test: /\b(are you there|can you hear me|hello\?+)\b/i,
    answer: 'Yes, I am here! How can I help you with SKM egg products?',
  },
];

const FALLBACK_REPLY = {
  answer: `I am not able to answer that one here. ${HELP_TOPICS} For anything else, our team will be happy to help directly.`,
  sources: [],
  actions: HELP_ACTIONS,
};

// The worker sometimes says "According to the provided context," - customers
// should never see that wording, so it is rephrased.
const CONTEXT_PHRASE =
  /\b(according to|based on|from|as per|per)\s+(the\s+)?(provided|given|available|above|supplied)\s+(context|information|text|data|documents?|content)\b/gi;

function hideContextWording(text) {
  return text
    .replace(CONTEXT_PHRASE, (_, lead) => (/^(according|as|per)/i.test(lead) ? 'According to my knowledge' : 'Based on my knowledge'))
    .replace(/\b(in|within)\s+the\s+(provided|given)\s+context\b/gi, 'in my knowledge')
    .replace(/^(\W*)([a-z])/, (_, pre, c) => pre + c.toUpperCase());
}

// Specification values (percentages, g/cm2, ppm, "max of"/"min of") are never
// shown by the bot - sentences containing them are removed and the reader is
// pointed to the technical team instead.
const SPEC_VALUE = /\d\s*(%|percent\b)|\b(max|min|maximum|minimum)\.?\s+(of\s+)?\d|\d\s*(g\/cm|ppm|ppb|cfu|mg\/|kcal)|>\s*\d{3,}/i;

const BULLET = /^\s*(?:[•\-*]|\d+\.)\s+/;

function hideSpecValues(text) {
  let removed = false;
  const lines = text.split('\n').map((line) => {
    const sentences = line.split(/(?<=[.!?])\s+/);
    const ok = sentences.filter((s) => !SPEC_VALUE.test(s));
    if (ok.length === sentences.length) return { text: line, dropped: false };
    removed = true;
    if (ok.length) return { text: ok.join(' '), dropped: false };
    // A list item that was only a value ("• Egg Yolk Powder - moisture max 4%"):
    // keep the product name in front of the value, if there is one.
    const head = BULLET.test(line) ? line.split(/\s[-–]\s|:\s/)[0].trim() : '';
    const keepHead = head && !SPEC_VALUE.test(head) && head.replace(BULLET, '').split(/\s+/).length >= 2;
    return { text: keepHead ? head : '', dropped: !keepHead, bullet: BULLET.test(line) };
  });

  // "... the following products:" must not introduce a list that lost its items.
  lines.forEach((l, i) => {
    if (!/:\s*$/.test(l.text) || l.dropped) return;
    let total = 0;
    let left = 0;
    for (let j = i + 1; j < lines.length && (BULLET.test(lines[j].text) || lines[j].bullet); j++) {
      total++;
      if (!lines[j].dropped) left++;
    }
    if (total > left && left < 2) l.text = '';
  });

  const kept = lines
    .map((l) => l.text)
    .filter((line, i, all) => line.trim() || (i > 0 && all[i - 1].trim()))
    .join('\n')
    .trim();
  if (!removed) return { text, removed };
  const note = 'For specification values, please contact our technical team.';
  return { text: kept ? `${kept}\n${note}` : note, removed };
}

function withoutSpecValues(reply) {
  const { text, removed } = hideSpecValues(reply.answer);
  if (!removed) return reply;
  return { ...reply, answer: text, actions: [...(reply.actions ?? []), ...TECHNICAL_ACTIONS] };
}

// Products an answer names, by their site titles ("Egg White Cube" also matches
// "SKM Egg White Cubes"). The longest titles are checked first so "Egg Yolk Powder -
// Heat Stable" is not also reported as plain "Egg Yolk Powder"; at most 3 are shown.
function productsMentioned(text) {
  const found = [];
  const lower = text.toLowerCase();
  let rest = lower;
  const byLength = [...products].filter((p) => p.id !== 'customised_packages').sort((a, b) => b.title.length - a.title.length);
  for (const p of byLength) {
    const base = p.title.toLowerCase().replace(/\s*-\s*/g, '[ -]*').replace(/\s+/g, '\\s+');
    const re = new RegExp(`${base}s?`, 'i');
    if (re.test(rest)) {
      found.push({ p, at: lower.search(re) });
      rest = rest.replace(new RegExp(`${base}s?`, 'gi'), ' ');
    }
  }
  return found.sort((a, b) => a.at - b.at).slice(0, 3).map((f) => f.p);
}

export async function sendChatMessage(message) {
  // Short messages only, so a real question containing "how are you" still reaches the product answers.
  const isShort = message.trim().split(/\s+/).length <= 6;
  const talk = isShort && SMALL_TALK.find((t) => t.test.test(message));
  if (talk) {
    const { answer } = talk;
    return { answer: Array.isArray(answer) ? answer[Math.floor(Math.random() * answer.length)] : answer, sources: [] };
  }

  if (LOCATION_INTENT.test(message)) return locationReply(message);
  if (PROTEIN_INTENT.test(message) && !PROTEIN_VALUE_INTENT.test(message)) return proteinReply();
  if (EASY_USE_INTENT.test(message) && !TECHNICAL_INTENT.test(message)) return easyUseReply();
  const byFunction = functionReply(message);
  if (byFunction) return byFunction;
  if (SUITABLE_INTENT.test(message) && !TECHNICAL_INTENT.test(message) && !VARIANT_PRODUCTS.some((p) => p.test.test(message))) {
    const found = await suggestProducts(message);
    if (found) {
      const items = found.ids.map(getProductById).filter(Boolean);
      const forWhat = found.terms.length ? `**${found.terms.join(' and ')}**` : 'your application';
      const bakery = /cake|bread|bakery|muffin|cookie|biscuit|pastr|sponge|dough|bun/i.test(found.terms.join(' '));
      const intro = bakery
        ? `Yes, we offer a range of egg products suitable for ${forWhat} and other bakery applications, helping improve texture, softness, volume, moisture retention, and overall product quality.`
        : `Yes, we offer ${items.length > 1 ? 'egg products' : 'an egg product'} suitable for ${forWhat}.`;
      return productCardsReply(items, `${intro} Tap a product below to open its page.`);
    }
  }
  if (!TECHNICAL_INTENT.test(message) && !BROCHURE_INTENT.test(message)) {
    const list = productListReply(message);
    if (list) return list;
  }
  if (BROCHURE_INTENT.test(message) && !TECHNICAL_INTENT.test(message)) return brochureReply();
  if (TECHNICAL_INTENT.test(message)) return /\bgel\b/i.test(message) ? GEL_REPLY : TECHNICAL_REPLY;

  const variants = await variantAnswer(message);
  if (variants) return variants;

  if (STORAGE_INTENT.test(message)) return storageReply(message);

  // "Cage free farm" has its own section on the Poultry Farm page - not the generic farm stage.
  if (/cage[- ]?free|free[- ]?range|animal welfare/i.test(message)) {
    const site = await siteAnswer(message);
    if (site) return withoutSpecValues(site);
  }

  const local = LOCAL_ANSWERS.find((a) => a.test.test(message));
  if (local) {
    const answer = typeof local.answer === 'function' ? local.answer() : local.answer;
    const p = local.productId && getProductById(local.productId);
    return {
      answer,
      sources: local.sources,
      products: p ? [{ id: p.id, page: p.page, title: p.title, image: p.image, description: p.shortDescription }] : undefined,
      productsFirst: Boolean(p),
    };
  }

  const res = await fetch('https://chatbot-worker.meowlovessyou.workers.dev/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error('Failed to get chatbot response');
  }

  const data = await res.json();
  // The worker answers "I don't know" when it has nothing; show a helpful reply instead.
  // (Also "I do not know" / "I don't have information"). Before giving up, look
  // for the answer in the text the website pages display.
  // The worker often continues after "I don't know" ("The provided context does not mention..."),
  // so a reply that opens that way, or says the context lacks the topic, counts as no answer.
  if (!data.answer || /^\W*i (do(n'|n’)?t|do not|dont|cannot|can't|can’t) (know|find|have)\b|\b(context|information|text) (does not|doesn't|doesn’t|do not) (specifically )?(mention|contain|include|provide|have)/i.test(data.answer.trim())) {
    const site = await siteAnswer(message);
    return site ? withoutSpecValues(site) : FALLBACK_REPLY;
  }
  // Show the image card of the product the question is about - or, when the question
  // does not name one, the product(s) the answer talks about.
  const named = VARIANT_PRODUCTS.find((p) => p.test.test(message));
  const asked = named && getProductById(named.slug.replace(/-/g, '_'));
  const answer = hideContextWording(data.answer);
  const shown = asked ? [asked] : productsMentioned(answer);
  return withoutSpecValues({
    ...data,
    answer,
    products: shown.length
      ? shown.map((p) => ({ id: p.id, page: p.page, title: p.title, image: p.image, description: p.shortDescription }))
      : data.products,
    productsFirst: shown.length === 1,
  });
}
