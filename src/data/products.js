// Single source of truth for the product catalogueue - used by the homepage
// product grid, product-page cross-sell, application landing pages, and the
// Get Quote flow's product picker. Route `page` keys match the `case`s in App.jsx.

import WholeEggPowderImg from '../assets/3. PRODUCTS/Egg Powders/Whole Egg Powder/WHOLE EGG POWDER_1000x667px.webp';
import EggYolkPowderImg from '../assets/3. PRODUCTS/Egg Powders/Egg Yolk Powder/EGG YOLK POWDER_1000x667px.webp';
import EggYolkPowderHeatStableImg from '../assets/ai-images/egg-yolk-heat-stable-powder.webp';
import EggAlbumenPowderImg from '../assets/ai-images/egg-albumen-powder.webp';
import WholeEggLiquidImg from '../assets/ai-images/whole-egg-liquid.webp';
import EggYolkLiquidImg from '../assets/3. PRODUCTS/Egg Liquids/Egg Yolk Liquid/EGG YOLK LIQUID_1000x667px.webp';
import EggAlbumenLiquidImg from '../assets/3. PRODUCTS/Egg Liquids/Egg Albumen Liquid/EGG ALBUMEN LIQUID.jpeg';
import SpecialityEggLiquidImg from '../assets/3. PRODUCTS/Speciality products/Egg Liquids/EGG LIQUIDS TETRA PACK_1000x667px.png';
import EggWhiteCubeImg from '../assets/3. PRODUCTS/Speciality products/Egg White Cube/EGG WHITE CUBE_1000x667px.png';
import EggProLifeImg from '../assets/3. PRODUCTS/Speciality products/EggPro/eggpro-life-500g.webp';
import EggProAlbumenImg from '../assets/3. PRODUCTS/Speciality products/EggPro/eggpro-albumen-500g.webp';
import EggProSportsImg from '../assets/3. PRODUCTS/Speciality products/EggPro Sports/vanilla-500g.webp';
import CustomizedMixImg from '../assets/3. PRODUCTS/Customized Mixes/CUSTOMIZED MIX_1000x667px.png';
import CustomizedPackagesImg from '../assets/3. PRODUCTS/Customized Packages/Box Packaging.jpg';

// Only these 3 products have a real dedicated flyer PDF in assets/Brouchers —
// used as the "Download Technical Data Sheet" link on their product pages.
// No fabricated/placeholder PDFs for the other products; the button is
// simply omitted where no real document exists (see BrochurePage.jsx for
// the full document list).
import { getBrochureUrl } from './brochureUrl';

const WholeEggPowderTds = getBrochureUrl('SKM WHOLE EGG POWDER A5 FLYER (F-B).pdf');
const EggYolkPowderTds = getBrochureUrl('SKM EGG YOLK POWDER A5 FLYER (F-B).pdf');
const EggAlbumenPowderTds = getBrochureUrl('SKM EGG ALBUMEN POWDER    A5 FLYER (F-B).pdf');
const WholeEggLiquidTds = getBrochureUrl('SKM_WEL_Liquid_Flyer.pdf');
const EggYolkLiquidTds = getBrochureUrl('SKM_EYL_Liquid_Flyer.pdf');
const EggAlbumenLiquidTds = getBrochureUrl('SKM_EAL_Liquid_Flyer.pdf');
const EggWhiteCubeTds = getBrochureUrl('SKM_Egg_White_Cube_Flyer.pdf');

export const PRODUCT_CATEGORIES = {
  POWDERS: 'Egg Powders',
  LIQUIDS: 'Liquid Eggs',
  SPECIALITY: 'Speciality Products',
  CUSTOMIZED: 'Customised Solutions',
};

// Shared pack-type rule for every egg powder product (and powder mixes).
export const POWDER_PACK_TYPES = [
  { type: 'Kraft paper bag', sizes: ['10kg'] },
  { type: 'Cartons', sizes: ['20kg', '25kg'] },
];

// Shared pack-type rule for every liquid egg product.
export const LIQUID_PACK_TYPES = [
  { type: 'Bag-in-Box', sizes: ['5 L', '10 L', '20 L'] },
  { type: 'Tetra Pack', sizes: ['250 mL', '500 mL', '1000 mL'] },
  { type: 'On request', sizes: ['1000 L'] },
];

// Flat size list ("10kg", "5L", "250mL") derived from the pack types above, so
// filters, spec panels and the quote form always match the Pack Types card.
const flatSizes = (types) => types.flatMap((t) => t.sizes.map((s) => s.replace(/\s+/g, '')));
const POWDER_SIZES = flatSizes(POWDER_PACK_TYPES);
const LIQUID_SIZES = flatSizes(LIQUID_PACK_TYPES);

// Display-only filter labels for product pages, e.g. "Kraft paper bag: 10 kg".
const packLabels = (types) => types.map((t) => `${t.type}: ${t.sizes.join(', ')}`);
export const POWDER_PACK_LABELS = packLabels(POWDER_PACK_TYPES);
export const LIQUID_PACK_LABELS = packLabels(LIQUID_PACK_TYPES);

const products = [
  {
    id: 'whole_egg_powder',
    page: 'whole_egg_powder',
    title: 'Whole Egg Powder',
    image: WholeEggPowderImg,
    category: PRODUCT_CATEGORIES.POWDERS,
    shortDescription: 'Pasteurised spray-dried whole egg powder for bakery, noodles and mayonnaise applications.',
    packagingOptions: POWDER_SIZES,
    tdsUrl: WholeEggPowderTds,
  },
  {
    id: 'egg_yolk_powder',
    page: 'egg_yolk_powder',
    title: 'Egg Yolk Powder',
    image: EggYolkPowderImg,
    category: PRODUCT_CATEGORIES.POWDERS,
    shortDescription: 'Pasteurised spray-dried egg yolk powder with excellent emulsifying properties and natural colour, ideal for mayonnaise, dressings, and desert applications.',
    packagingOptions: POWDER_SIZES,
    tdsUrl: EggYolkPowderTds,
  },
  {
    id: 'egg_yolk_powder_heat_stable',
    page: 'egg_yolk_powder_heat_stable',
    title: 'Egg Yolk Powder - Heat Stable',
    image: EggYolkPowderHeatStableImg,
    category: PRODUCT_CATEGORIES.POWDERS,
    shortDescription: 'Modified egg yolk powder formulated to maintain its emulsifying stability under hot-process mayonnaise and sauce applications.',
    packagingOptions: POWDER_SIZES,
  },
  {
    id: 'egg_albumen_powder',
    page: 'egg_albumen_powder',
    title: 'Egg Albumen Powder',
    image: EggAlbumenPowderImg,
    category: PRODUCT_CATEGORIES.POWDERS,
    shortDescription: 'Dried egg white powder with exceptional gelling and whipping performance for surimi, sausages, meringues, and confectionery.',
    packagingOptions: POWDER_SIZES,
    tdsUrl: EggAlbumenPowderTds,
  },
  {
    id: 'whole_egg_liquid',
    page: 'whole_egg_liquid',
    title: 'Whole Egg Liquid',
    image: WholeEggLiquidImg,
    category: PRODUCT_CATEGORIES.LIQUIDS,
    shortDescription: 'Pasteurised liquid blend of egg yolk and egg white, formulated for industrial bakeries and standardised ready-meal recipes. Available in both chilled and frozen formats.',
    packagingOptions: LIQUID_SIZES,
    tdsUrl: WholeEggLiquidTds,
  },
  {
    id: 'egg_yolk_liquid',
    page: 'egg_yolk_liquid',
    title: 'Egg Yolk Liquid',
    image: EggYolkLiquidImg,
    category: PRODUCT_CATEGORIES.LIQUIDS,
    shortDescription: 'Chilled pasteurised liquid egg yolk available in plain and salted variants, formulated for mayonnaise, dressings, and hot-filled sauces. Available in chilled and frozen formats.',
    packagingOptions: LIQUID_SIZES,
    tdsUrl: EggYolkLiquidTds,
  },
  {
    id: 'egg_albumen_liquid',
    page: 'egg_albumen_liquid',
    title: 'Egg Albumen Liquid',
    image: EggAlbumenLiquidImg,
    category: PRODUCT_CATEGORIES.LIQUIDS,
    shortDescription: 'Pasteurised liquid egg white for health foods, sports nutrition, beverages, and bakery applications, available in chilled and frozen formats.',
    packagingOptions: LIQUID_SIZES,
    tdsUrl: EggAlbumenLiquidTds,
  },
  {
    id: 'speciality_egg_liquids',
    page: 'speciality_egg_liquids',
    title: 'Speciality Liquid Blends',
    image: SpecialityEggLiquidImg,
    category: PRODUCT_CATEGORIES.SPECIALITY,
    shortDescription: 'Custom liquid egg blends with tailored salt, sugar, or other ingredient additions, formulated to meet specific recipe requirements and provide consumers with greater convenience and ease of use.',
    packagingOptions: ['250mL', '500mL', '1000mL'],
  },
  {
    id: 'egg_white_cube',
    page: 'egg_white_cube',
    title: 'Egg White Cube',
    image: EggWhiteCubeImg,
    category: PRODUCT_CATEGORIES.SPECIALITY,
    shortDescription: 'Cooked, diced egg white with zero cholesterol and high protein content, suitable for a wide range of applications, including salads, patties, cooked dishes, and ready-to-eat foods.',
    packagingOptions: ['100g', '200g', '500g'],
    tdsUrl: EggWhiteCubeTds,
  },
  {
    id: 'eggpro_life',
    page: 'eggpro_life',
    group: 'EggPro',
    imageFit: 'contain',
    title: 'EggPro LIFE',
    image: EggProLifeImg,
    category: PRODUCT_CATEGORIES.SPECIALITY,
    shortDescription: 'EGGPRO LIFE is a convenient and delicious instant protein drink mix made with a combination of Egg Albumen Powder and Skimmed Milk Powder.',
    packagingOptions: [],
  },
  {
    id: 'eggpro_sports',
    page: 'eggpro_sports',
    group: 'EggPro',
    imageFit: 'contain',
    title: 'EggPro SPORTS+',
    image: EggProSportsImg,
    category: PRODUCT_CATEGORIES.SPECIALITY,
    shortDescription: 'EGGPRO SPORTS+ is a delicious and creamy instant protein drink mix made with a combination of Egg Albumen Powder, Skimmed Milk Powder and Whey Powder.',
    packagingOptions: ['35g', '500g', '1kg'],
  },
  {
    id: 'eggpro_albumen',
    page: 'eggpro_albumen',
    group: 'EggPro',
    imageFit: 'contain',
    title: 'SKM Egg Albumen Powder',
    image: EggProAlbumenImg,
    category: PRODUCT_CATEGORIES.SPECIALITY,
    shortDescription: 'SKM Egg Albumen Powder is produced from egg whites through controlled processing, drying and heat treatment.',
    packagingOptions: ['500g'],
  },
  {
    id: 'customised_mix',
    page: 'customised_mix',
    title: 'Customised Mix',
    image: CustomizedMixImg,
    category: PRODUCT_CATEGORIES.CUSTOMIZED,
    shortDescription: 'Egg powder formulations blended with salt, sugar, and other ingredients to match your exact recipe specifications, customised at our end for seamless handling and convenient use at your facility.',
    packagingOptions: POWDER_SIZES,
  },
  {
    id: 'customised_packages',
    page: 'customised_packages',
    title: 'Customised Packaging',
    image: CustomizedPackagesImg,
    category: PRODUCT_CATEGORIES.CUSTOMIZED,
    shortDescription: 'Packaging options including corrugated bag-in-box, kraft paper bag-in-bag, liquid pouches, and Tetra Pack formats, configured to meet your specific packaging and application requirements.',
    packagingOptions: POWDER_SIZES,
  },
];

export default products;

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(id, count = 3) {
  const current = getProductById(id);
  if (!current) return [];
  return products
    .filter((p) => p.id !== id && p.category === current.category)
    .slice(0, count);
}

export function getProductIdByPage(page) {
  return products.find((p) => p.page === page)?.id ?? null;
}

export function getTdsUrl(id) {
  return getProductById(id)?.tdsUrl ?? null;
}
