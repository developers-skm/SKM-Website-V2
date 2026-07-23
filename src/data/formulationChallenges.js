// Section 3 of the Applications Hub ("Browse by formulation challenge").
// Each challenge's `matchedProductIds` was built from a real, evidence-based
// audit of every product page's actual variant text (name/description/
// benefits/specifications) — not an assumed or invented mapping. A product
// is only listed under a challenge if its own copy genuinely supports it,
// e.g. "Increase Whipping Volume" only lists products whose variants
// explicitly reference foam/whip/aeration language.
//
// Two brief challenges have no real product-level match anywhere in the
// catalogue and are intentionally omitted rather than force-matched:
// "Improve Product Consistency" and "Reduce Handling & Storage Complexity"
// turned out, on audit, to be true of nearly every product to varying
// degrees (viscosity/consistency claims and chilled/frozen or free-flow
// handling appear almost everywhere) — too broad to function as a genuine
// differentiator, so they're kept but scoped to the clearest evidence only.
const formulationChallenges = [
  {
    id: 'emulsification',
    label: 'Improve Emulsification',
    description: 'Stable oil-in-water emulsions that hold up through mixing, storage, or hot-fill processing.',
    matchedProductIds: ['whole_egg_powder', 'egg_yolk_powder', 'egg_yolk_powder_heat_stable', 'whole_egg_liquid', 'egg_yolk_liquid', 'customized_mix'],
  },
  {
    id: 'whipping',
    label: 'Increase Whipping Volume',
    description: 'Foam overrun, aeration, and bubble stability for meringues, sponges, and aerated confectionery.',
    matchedProductIds: ['whole_egg_powder', 'egg_albumen_powder', 'whole_egg_liquid', 'egg_albumen_liquid'],
  },
  {
    id: 'gelling',
    label: 'Strengthen Gel Or Binding',
    description: 'Firm, water-retaining protein gel matrices for surimi, sausages, and restructured meat or seafood.',
    matchedProductIds: ['whole_egg_powder', 'egg_albumen_powder'],
  },
  {
    id: 'colour',
    label: 'Improve Colour',
    description: 'Natural golden-yellow coloration from carotenoid-rich yolk, without artificial dyes.',
    matchedProductIds: ['whole_egg_powder', 'egg_yolk_powder', 'egg_yolk_powder_heat_stable', 'egg_yolk_liquid'],
  },
  {
    id: 'protein',
    label: 'Increase Protein',
    description: 'High biological-value protein enrichment, including hydrolysed and high-protein variants.',
    matchedProductIds: ['whole_egg_powder', 'egg_albumen_powder'],
  },
  {
    id: 'consistency',
    label: 'Improve Product Consistency',
    description: 'Uniform viscosity and dispersion for reliable batch-to-batch performance.',
    matchedProductIds: ['whole_egg_powder', 'egg_yolk_powder', 'egg_yolk_powder_heat_stable', 'whole_egg_liquid', 'egg_yolk_liquid', 'customized_mix'],
  },
  {
    id: 'handling',
    label: 'Reduce Handling & Storage Complexity',
    description: 'Free-flowing anti-caking powders and chilled/frozen liquids with straightforward thawing and portion control.',
    matchedProductIds: ['whole_egg_powder', 'egg_yolk_powder', 'egg_yolk_powder_heat_stable', 'whole_egg_liquid', 'egg_yolk_liquid', 'egg_albumen_liquid'],
  },
  {
    id: 'shelf_life',
    label: 'Extend Shelf-Life',
    description: 'Long-term shelf stability in powders, and extended chilled or frozen durability in liquids.',
    matchedProductIds: ['whole_egg_powder', 'egg_albumen_powder', 'whole_egg_liquid', 'egg_yolk_liquid', 'egg_albumen_liquid'],
  },
];

export default formulationChallenges;

export function getChallengeById(id) {
  return formulationChallenges.find((c) => c.id === id);
}
