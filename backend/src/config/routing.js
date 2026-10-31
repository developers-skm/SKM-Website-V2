// Single source of truth for WHO receives WHICH website enquiry.
// Recipients are decided here, on the server, from validated inputs only -
// the browser never supplies (or sees) a recipient address.

const DEPARTMENTS = {
  HR: 'hrd@skmegg.com',
  QUALITY: 'quality@skmegg.com',
  EXPORT_SALES: 'developer@skmegg.com',
  COMMERCIAL_LIQUIDS: 'commercialbesteggs@skmegg.com',
  CUSTOMER_CARE: 'customercare@skmegg.com',
};

// ── Product catalogue -> routing category ──────────────────────────────────
// Explicit ids (mirrors src/data/products.js). An unknown id is rejected, so a
// new product must be added here on purpose rather than guessed by name.
const PRODUCT_CATEGORY = {
  POWDER: 'powder',
  LIQUID: 'liquid',
  OTHER: 'other',
};

const PRODUCTS = {
  whole_egg_powder: { title: 'Whole Egg Powder', category: PRODUCT_CATEGORY.POWDER },
  egg_yolk_powder: { title: 'Egg Yolk Powder', category: PRODUCT_CATEGORY.POWDER },
  egg_yolk_powder_heat_stable: { title: 'Egg Yolk Powder - Heat Stable', category: PRODUCT_CATEGORY.POWDER },
  egg_albumen_powder: { title: 'Egg Albumen Powder', category: PRODUCT_CATEGORY.POWDER },
  whole_egg_liquid: { title: 'Whole Egg Liquid', category: PRODUCT_CATEGORY.LIQUID },
  egg_yolk_liquid: { title: 'Egg Yolk Liquid', category: PRODUCT_CATEGORY.LIQUID },
  egg_albumen_liquid: { title: 'Egg Albumen Liquid', category: PRODUCT_CATEGORY.LIQUID },
  speciality_egg_liquids: { title: 'Speciality Liquid Blends', category: PRODUCT_CATEGORY.OTHER },
  egg_white_cube: { title: 'Egg White Cube', category: PRODUCT_CATEGORY.OTHER },
  customised_mix: { title: 'Customised Mix', category: PRODUCT_CATEGORY.OTHER },
  customised_packages: { title: 'Customised Packaging', category: PRODUCT_CATEGORY.OTHER },
};

// ── Countries ──────────────────────────────────────────────────────────────
// Mirrors the Get Quote destination dropdown (src/data/exportMarkets.js plus
// India and "Other / Not Listed"). Anything outside this list is rejected.
const DOMESTIC_COUNTRY = 'India';
const OTHER_COUNTRY = 'Other';

const EXPORT_COUNTRIES = [
  'Japan', 'Thailand', 'Vietnam', 'Russia', 'Indonesia', 'Malaysia', 'South Korea', 'UAE',
  'Saudi Arabia', 'Netherlands', 'Germany', 'Philippines', 'Taiwan', 'Nigeria', 'Ghana', 'Sweden',
  'Belgium', 'Colombia', 'Denmark', 'Egypt', 'UK', 'Italy', 'Oman', 'Angola', 'Uganda',
  'Australia', 'Iran', 'Qatar',
];

const VALID_COUNTRIES = new Set([DOMESTIC_COUNTRY, OTHER_COUNTRY, ...EXPORT_COUNTRIES]);

// ── Non-product enquiries (country is irrelevant) ──────────────────────────
// Keys are the `enquiry_type` values sent by the contact / careers forms.
const ENQUIRY_TYPES = {
  job: { label: 'Job Application', to: DEPARTMENTS.HR },
  internship: { label: 'Internship Request', to: DEPARTMENTS.HR },
  talent_pool: { label: 'Talent Pool Profile', to: DEPARTMENTS.HR },
  feedback: { label: 'Feedback & Complaints', to: DEPARTMENTS.HR },
  vendor: { label: 'Vendor Partner', to: DEPARTMENTS.HR },
  service: { label: 'Service Provider', to: DEPARTMENTS.HR },
  general: { label: 'General', to: DEPARTMENTS.HR },
  quality: { label: 'Quality', to: DEPARTMENTS.QUALITY },
  technical: { label: 'Technical', to: DEPARTMENTS.QUALITY },
  product_application: { label: 'Product Application', to: DEPARTMENTS.QUALITY },
};

function isDomestic(country) {
  return country === DOMESTIC_COUNTRY;
}

function isValidCountry(country) {
  return VALID_COUNTRIES.has(country);
}

function getProduct(productId) {
  return Object.prototype.hasOwnProperty.call(PRODUCTS, productId) ? PRODUCTS[productId] : null;
}

// Product enquiries. Returns the recipient for one product + country.
//   outside India -> exportsales (all categories)
//   India         -> powder: exportsales, liquid: commercialbesteggs, other: customercare
function resolveProductRecipient(country, category) {
  if (!isDomestic(country)) return DEPARTMENTS.EXPORT_SALES;
  if (category === PRODUCT_CATEGORY.POWDER) return DEPARTMENTS.EXPORT_SALES;
  if (category === PRODUCT_CATEGORY.LIQUID) return DEPARTMENTS.COMMERCIAL_LIQUIDS;
  return DEPARTMENTS.CUSTOMER_CARE;
}

// Splits a product list into one delivery per recipient, e.g. an Indian
// sample request for [whole_egg_powder, egg_yolk_liquid] becomes
// exportsales (powder) + commercialbesteggs (liquid). Unknown ids throw.
function planProductDeliveries(country, productIds) {
  const byRecipient = new Map();
  for (const id of productIds) {
    const product = getProduct(id);
    if (!product) throw new Error('Unknown product selected.');
    const to = resolveProductRecipient(country, product.category);
    if (!byRecipient.has(to)) byRecipient.set(to, []);
    byRecipient.get(to).push({ id, ...product });
  }
  return Array.from(byRecipient, ([to, products]) => ({ to, products }));
}

// Department enquiries (careers / contact / technical / quality / applications).
function resolveEnquiryRecipient(enquiryType) {
  const entry = Object.prototype.hasOwnProperty.call(ENQUIRY_TYPES, enquiryType) ? ENQUIRY_TYPES[enquiryType] : null;
  return entry ? entry.to : null;
}

function getEnquiryLabel(enquiryType) {
  const entry = Object.prototype.hasOwnProperty.call(ENQUIRY_TYPES, enquiryType) ? ENQUIRY_TYPES[enquiryType] : null;
  return entry ? entry.label : 'General';
}

// Staging/testing safety valve: when set, every email goes to this one address
// instead of the real departments (the intended department is still shown in
// the email body). Leave unset in production.
function applyOverride(recipient) {
  return process.env.MAIL_ROUTING_OVERRIDE_TO || recipient;
}

module.exports = {
  DEPARTMENTS,
  PRODUCTS,
  PRODUCT_CATEGORY,
  DOMESTIC_COUNTRY,
  VALID_COUNTRIES,
  ENQUIRY_TYPES,
  isDomestic,
  isValidCountry,
  getProduct,
  resolveProductRecipient,
  planProductDeliveries,
  resolveEnquiryRecipient,
  getEnquiryLabel,
  applyOverride,
};
