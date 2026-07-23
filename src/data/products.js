// Single source of truth for the product catalogue — used by the homepage
// product grid, product-page cross-sell, application landing pages, and the
// Get Quote flow's product picker. Route `page` keys match the `case`s in App.jsx.

import WholeEggPowderImg from '../assets/3. PRODUCTS/Egg Powders/Whole Egg Powder/WHOLE EGG POWDER_1000x667px.png';
import EggYolkPowderImg from '../assets/3. PRODUCTS/Egg Powders/Egg Yolk Powder/EGG YOLK POWDER_1000x667px.png';
import EggYolkPowderHeatStableImg from '../assets/3. PRODUCTS/Egg Powders/Egg Yolk Powder - Heat Stable/EGG YOLK HEAT STABLE POWDER_1000x667px.png';
import EggAlbumenPowderImg from '../assets/3. PRODUCTS/Egg Powders/Egg Albumen Powder/EGG ALBUMEN POWDER_1000x667px.png';
import WholeEggLiquidImg from '../assets/3. PRODUCTS/Egg Liquids/Whole Egg Liquid/WHOLE EGG LIQUID_1000x667px.png';
import EggYolkLiquidImg from '../assets/3. PRODUCTS/Egg Liquids/Egg Yolk Liquid/EGG YOLK LIQUID_1000x667px.png';
import EggAlbumenLiquidImg from '../assets/3. PRODUCTS/Egg Liquids/Egg Albumen Liquid/EGG ALBUMEN LIQUID_1000x667px.png';
import SpecialityEggLiquidImg from '../assets/3. PRODUCTS/Speciality products/Egg Liquids/EGG LIQUIDS TETRA PACK_1000x667px.png';
import EggWhiteCubeImg from '../assets/3. PRODUCTS/Speciality products/Egg White Cube/EGG WHITE CUBE_1000x667px.png';
import CustomizedMixImg from '../assets/3. PRODUCTS/Customized Mixes/CUSTOMIZED MIX_1000x667px.png';
import CustomizedPackagesImg from '../assets/3. PRODUCTS/Customized Packages/Powder Product primary container - HDPE Bag.jpeg';

// Only these 3 products have a real dedicated flyer PDF in assets/Brouchers —
// used as the "Download Technical Data Sheet" link on their product pages.
// No fabricated/placeholder PDFs for the other products; the button is
// simply omitted where no real document exists (see BrochurePage.jsx for
// the full document list).
import WholeEggPowderTds from '../assets/Brouchers/SKM WHOLE EGG POWDER A5 FLYER (F&B).pdf';
import EggYolkPowderTds from '../assets/Brouchers/SKM EGG YOLK POWDER A5 FLYER (F&B).pdf';
import EggAlbumenPowderTds from '../assets/Brouchers/SKM EGG ALBUMEN POWDER    A5 FLYER (F&B).pdf';

export const PRODUCT_CATEGORIES = {
  POWDERS: 'Egg Powders',
  LIQUIDS: 'Liquid Eggs',
  SPECIALITY: 'Speciality Products',
  CUSTOMIZED: 'Customized Solutions',
};

const products = [
  {
    id: 'whole_egg_powder',
    page: 'whole_egg_powder',
    title: 'Whole Egg Powder',
    image: WholeEggPowderImg,
    category: PRODUCT_CATEGORIES.POWDERS,
    shortDescription: 'Pasteurized spray-dried whole hen egg powder for bakery, confectionery, noodles, and mayonnaise — 13 variants.',
    packagingOptions: ['20kg', '25kg', 'Bag-in-Box'],
    tdsUrl: WholeEggPowderTds,
  },
  {
    id: 'egg_yolk_powder',
    page: 'egg_yolk_powder',
    title: 'Egg Yolk Powder',
    image: EggYolkPowderImg,
    category: PRODUCT_CATEGORIES.POWDERS,
    shortDescription: 'Spray-dried pasteurized egg yolk with rich emulsifying power and natural golden colour for mayonnaise, dressings, and bakery.',
    packagingOptions: ['20kg', '25kg', 'Bag-in-Box'],
    tdsUrl: EggYolkPowderTds,
  },
  {
    id: 'egg_yolk_powder_heat_stable',
    page: 'egg_yolk_powder_heat_stable',
    title: 'Egg Yolk Powder — Heat Stable',
    image: EggYolkPowderHeatStableImg,
    category: PRODUCT_CATEGORIES.POWDERS,
    shortDescription: 'Modified egg yolk powder engineered to hold its emulsifying stability under hot-process mayonnaise and pasteurized sauces.',
    packagingOptions: ['20kg', '25kg', 'Bag-in-Box'],
  },
  {
    id: 'egg_albumen_powder',
    page: 'egg_albumen_powder',
    title: 'Egg Albumen Powder',
    image: EggAlbumenPowderImg,
    category: PRODUCT_CATEGORIES.POWDERS,
    shortDescription: 'Dried egg white powder with exceptional gelling and whipping performance for surimi, sausages, meringues, and confectionery.',
    packagingOptions: ['20kg', '25kg', 'Bag-in-Box'],
    tdsUrl: EggAlbumenPowderTds,
  },
  {
    id: 'whole_egg_liquid',
    page: 'whole_egg_liquid',
    title: 'Whole Egg Liquid',
    image: WholeEggLiquidImg,
    category: PRODUCT_CATEGORIES.LIQUIDS,
    shortDescription: 'Pasteurized liquid blend of yolk and white for industrial bakeries and standardized ready-meal recipes. Chilled.',
    packagingOptions: ['1kg', '5kg', '20kg'],
  },
  {
    id: 'egg_yolk_liquid',
    page: 'egg_yolk_liquid',
    title: 'Egg Yolk Liquid',
    image: EggYolkLiquidImg,
    category: PRODUCT_CATEGORIES.LIQUIDS,
    shortDescription: 'Chilled pasteurized liquid egg yolk — plain and salted variants — for mayonnaise, dressings, and hot-filled sauces.',
    packagingOptions: ['1kg', '5kg', '20kg'],
  },
  {
    id: 'egg_albumen_liquid',
    page: 'egg_albumen_liquid',
    title: 'Egg Albumen Liquid',
    image: EggAlbumenLiquidImg,
    category: PRODUCT_CATEGORIES.LIQUIDS,
    shortDescription: 'Pasteurized liquid egg white for health foods, sports nutrition, beverages, and bakery — chilled or frozen.',
    packagingOptions: ['1kg', '5kg', '20kg'],
  },
  {
    id: 'speciality_egg_liquids',
    page: 'speciality_egg_liquids',
    title: 'Speciality Liquid Blends',
    image: SpecialityEggLiquidImg,
    category: PRODUCT_CATEGORIES.SPECIALITY,
    shortDescription: 'Custom liquid egg blends with tailored salt, sugar, or other ingredient additions to match a specific recipe.',
    packagingOptions: ['250ML', '500ML', '1L'],
  },
  {
    id: 'egg_white_cube',
    page: 'egg_white_cube',
    title: 'Egg White Cube',
    image: EggWhiteCubeImg,
    category: PRODUCT_CATEGORIES.SPECIALITY,
    shortDescription: 'Fully cooked, diced egg white — zero cholesterol, high protein — for salads, meal prep, and ready-to-eat foods.',
    packagingOptions: ['100g', '250g', '500g'],
  },
  {
    id: 'customized_mix',
    page: 'customized_mix',
    title: 'Customized Mix',
    image: CustomizedMixImg,
    category: PRODUCT_CATEGORIES.CUSTOMIZED,
    shortDescription: 'Egg powder formulations blended with salt, sugar, or flour to match your exact recipe specification.',
    packagingOptions: ['Custom'],
  },
  {
    id: 'customized_packages',
    page: 'customized_packages',
    title: 'Customized Packages',
    image: CustomizedPackagesImg,
    category: PRODUCT_CATEGORIES.CUSTOMIZED,
    shortDescription: 'Industrial bags, tanker deliveries, cartons, or retail packaging configured to your requirements.',
    packagingOptions: ['Custom'],
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
