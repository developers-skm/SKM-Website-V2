// The 4 real application categories we have photography for - used by the
// homepage Application Finder and the application landing pages. Matched
// product ids reference src/data/products.js.

import BakeryImg from '../assets/1. HOME PAGE/PRODUCT APPLICATIONS AREAS/BAKERY & CONFECTIONERY_800x533px.webp';
import MayonnaiseImg from '../assets/1. HOME PAGE/PRODUCT APPLICATIONS AREAS/MAYONISE & SALAD DRESSING _800x533px.webp';
import MeatFishImg from '../assets/1. HOME PAGE/PRODUCT APPLICATIONS AREAS/MEAT & FISH_800x533px.webp';
import NoodlesPastaImg from '../assets/1. HOME PAGE/PRODUCT APPLICATIONS AREAS/NOODLES & PASTA_800x533px.webp';

// `relevantChallengeIds` (references data/formulationChallenges.js ids)
// curates which formulation challenges genuinely apply to each
// application's own stated problem/intro - NOT simply "any challenge whose
// matchedProductIds overlaps this application's matchedProductIds". That
// overlap-only approach was tried first and produced a real bug: Bakery's
// matched products (whole_egg_powder, egg_albumen_powder) are ALSO matched
// to the "Strengthen Gel Or Binding" challenge because of their unrelated
// use in surimi/sausages, so the surimi/meat-processing description was
// showing up on the bakery page. This list is scoped to what each
// application's own real `problem`/`intro`/`tags` text actually describes.
const applications = [
  {
    id: 'bakery',
    page: 'app_bakery',
    title: 'Bakery & Confectionery',
    image: BakeryImg,
    tags: ['Cakes', 'Pastries', 'Biscuits'],
    problem: 'Whole Egg for volume, structure and golden colour in your cakes and pastries. Egg Albumen for whipping and foaming applications in macarons and meringues.',
    intro: 'From everyday biscuits to premium artisanal brioche, our egg powders deliver the crumb binding, foaming, and natural golden colour that bakery formulations depend on.',
    matchedProductIds: ['whole_egg_powder', 'whole_egg_liquid', 'egg_albumen_powder'],
    hideFormulationChallenges: true,
    // Explicit "Egg Functionality" list for this page - Protein and Consistency
    // are no longer in the shared formulationChallenges list (Applications hub).
    functionalities: [
      { id: 'whipping', label: 'Increase Whipping Volume', description: 'Foam overrun, aeration, and bubble stability for meringues, sponges, and aerated confectionery.' },
      { id: 'protein', label: 'Increase Protein', description: 'High biological-value protein enrichment, including hydrolysed and high-protein variants.' },
      { id: 'consistency', label: 'Improve Product Consistency', description: 'Uniform viscosity and dispersion for reliable batch-to-batch performance.' },
    ],
    relevantChallengeIds: ['emulsification', 'whipping', 'colour', 'binding', 'texture'],
  },
  {
    id: 'mayonnaise',
    page: 'app_mayo',
    title: 'Mayonnaise & Salad Dressing',
    image: MayonnaiseImg,
    tags: ['Emulsification', 'Sauces'],
    problem: 'For stable emulsion that holds up through hot-fill processing.',
    intro: 'Our egg yolk powders and liquids provide the emulsifying backbone mayonnaise and dressing manufacturers rely on - including heat-stable variants for hot-processed sauces.',
    matchedProductIds: ['egg_yolk_powder', 'egg_yolk_powder_heat_stable', 'egg_yolk_liquid'],
    hideFormulationChallenges: true,
    hideProcessingGuidance: true,
    relevantChallengeIds: ['emulsification', 'colour'],
  },
  {
    id: 'meat_fish',
    page: 'app_meat_fish',
    title: 'Meat & Fish',
    image: MeatFishImg,
    tags: ['Binding', 'Gelation'],
    problem: 'Firmer texture and better moisture retention in surimi or sausages.',
    intro: 'High-gel egg albumen and whole egg powders coagulate into a firm, water-retaining protein matrix - improving sliceability and texture in surimi, sausages, and restructured meats.',
    matchedProductIds: ['egg_albumen_powder', 'whole_egg_powder', 'egg_albumen_liquid'],
    recommendedBenefits: {
      egg_albumen_powder: 'Improves product texture, minimizes moisture loss (purge) during cooking, and enhances chewiness and bite firmness.',
      whole_egg_powder: 'Forms a firm, water-retaining protein gel matrix upon heating, enhancing sliceability and moisture retention in the finished product.',
      egg_albumen_liquid: 'Maintains the coagulation strength of fresh eggs, ensures smooth pumpability during processing, and delivers a clean, natural flavour profile.',
    },
    hideFormulationChallenges: true,
    hideProcessingGuidance: true,
    functionalities: [
      { id: 'gelling', label: 'Gel Strength & Firmness', description: 'Firm, water-retaining protein gel matrices for surimi, sausages, and restructured meat or seafood.' },
      { id: 'consistency', label: 'Improve Product Consistency', description: 'Consistent gel and solubility for reliable batch-to-batch performance.' },
    ],
    relevantChallengeIds: ['gelling', 'binding', 'texture'],
  },
  {
    id: 'noodles_pasta',
    page: 'app_noodles_pasta',
    title: 'Noodles & Pasta',
    image: NoodlesPastaImg,
    tags: ['Elasticity', 'Texture'],
    problem: 'For stronger gel & firm bite in your noodles & pasta.',
    intro: 'Whole egg and egg albumen powders strengthen gluten structure, improve cooking integrity, and deliver the firm bite noodle and pasta manufacturers formulate for.',
    matchedProductIds: ['whole_egg_powder', 'egg_albumen_powder', 'egg_albumen_liquid'],
    hideFormulationChallenges: true,
    functionalities: [
      { id: 'gelling', label: 'Gel Strength & Firmness', description: 'Firm, water-retaining protein gel matrices for surimi, sausages, and restructured meat or seafood.' },
      { id: 'whipping', label: 'Increase Whipping Volume', description: 'Foam overrun, aeration, and bubble stability for meringues, sponges, and aerated confectionery.' },
    ],
    recommendedBenefits: {
      whole_egg_powder: 'Forms a firm, water-retaining protein gel matrix upon heating, enhancing sliceability and moisture retention in the finished product.',
      egg_albumen_powder: 'Improves product texture, minimizes moisture loss (purge) during cooking, and enhances chewiness and bite firmness.',
    },
    relevantChallengeIds: ['gelling', 'binding', 'texture'],
  },
];

export default applications;

export function getApplicationById(id) {
  return applications.find((a) => a.id === id);
}
