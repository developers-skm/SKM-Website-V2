import journeyStages from '../data/journeyStages';
import { getTdsUrl } from '../data/products';

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

// Technical / specification questions are never answered by the bot (no
// percentages, grades or lab values) - they are handed to the technical team.
const TECHNICAL_INTENT =
  /\b(tech(nical)?|spec(s|ification|ifications)?|tds|coa|moisture|protein|fat|ph|sugar|salt|gel strength|solubility|viscosity|microbiolog\w*|composition|nutrition(al)?|ingredients?|formulation|dosage|dosing|ppm)\b|%|g\/cm/i;

const TECHNICAL_REPLY = {
  answer:
    'Technical and specification details are best confirmed by our technical team, so that you get accurate values for the exact product and grade you need. Please send them your question and they will get back to you.',
  sources: [],
  actions: [{ label: 'Ask our technical team', page: 'get-quote', prefill: { enquiryIntent: 'general' } }],
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

export async function sendChatMessage(message) {
  // Short messages only, so a real question containing "how are you" still reaches the product answers.
  const isShort = message.trim().split(/\s+/).length <= 6;
  const talk = isShort && SMALL_TALK.find((t) => t.test.test(message));
  if (talk) {
    const { answer } = talk;
    return { answer: Array.isArray(answer) ? answer[Math.floor(Math.random() * answer.length)] : answer, sources: [] };
  }

  if (BROCHURE_INTENT.test(message) && !TECHNICAL_INTENT.test(message)) return brochureReply();
  if (TECHNICAL_INTENT.test(message)) return TECHNICAL_REPLY;

  const variants = await variantAnswer(message);
  if (variants) return variants;

  if (STORAGE_INTENT.test(message)) return storageReply(message);

  const local = LOCAL_ANSWERS.find((a) => a.test.test(message));
  if (local) {
    const answer = typeof local.answer === 'function' ? local.answer() : local.answer;
    return { answer, sources: local.sources };
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
  if (!data.answer || /^\W*i do(n'|n’)?t know\W*$/i.test(data.answer.trim())) return FALLBACK_REPLY;
  return data;
}
