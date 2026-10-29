// Section 3 of the Applications Hub ("Browse by formulation challenge").
// Each challenge maps to the egg product family that delivers it: yolk
// (EYP/EYL) for emulsification and colour, albumen (EAP/EAL) for whipping
// and gel strength & foaming, whole egg (WEP/WEL) for binding and texture.
// Binding and Texture copy is taken from the matching product-page
// variants (Whole Egg Powder W1214, Whole Egg Liquid W1009).
const formulationChallenges = [
  {
    id: 'emulsification',
    label: 'Improve Emulsification',
    description: 'Stable oil-in-water emulsions that hold up through mixing, storage, or hot-fill processing.',
    matchedProductIds: ['egg_yolk_powder', 'egg_yolk_powder_heat_stable', 'egg_yolk_liquid'],
  },
  {
    id: 'colour',
    label: 'Improve Colour',
    description: 'Natural golden-yellow colouration from carotenoid-rich yolk, without artificial dyes.',
    matchedProductIds: ['egg_yolk_powder', 'egg_yolk_liquid'],
  },
  {
    id: 'whipping',
    label: 'Increase Whipping Volume',
    description: 'Foam overrun, aeration, and bubble stability for meringues, sponges, and aerated confectionery.',
    matchedProductIds: ['egg_albumen_powder', 'egg_albumen_liquid'],
  },
  {
    id: 'gelling',
    label: 'Gel Strength & Firmness',
    description: 'Firm, water-retaining protein gel matrices for surimi, sausages, and restructured meat or seafood.',
    matchedProductIds: ['egg_albumen_powder', 'egg_albumen_liquid'],
  },
  {
    id: 'binding',
    label: 'Improve Binding',
    description: 'Coagulates into a firm, water-retaining protein gel matrix upon heating, improving sliceability and moisture retention.',
    matchedProductIds: ['whole_egg_powder', 'whole_egg_liquid'],
  },
  {
    id: 'texture',
    label: 'Improve Texture',
    description: 'Homogeneous texture dispersion, standardised moisture content, and excellent water-binding capacity.',
    matchedProductIds: ['whole_egg_powder', 'whole_egg_liquid'],
  },
];

export default formulationChallenges;

export function getChallengeById(id) {
  return formulationChallenges.find((c) => c.id === id);
}
