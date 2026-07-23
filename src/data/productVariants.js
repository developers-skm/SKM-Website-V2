// Central lookup from productId -> that product's real `variantsData` array.
// Each product page file already exports its own `variantsData` (added
// specifically so this lookup can exist); this module just re-collects
// them by id rather than duplicating any variant content. Used by the
// application detail page's Recommended Products section (brief §4) to
// genuinely recommend a specific real variant per application instead of
// only a product.
import { variantsData as wholeEggPowder } from '../pages/Products/WholeEggPowderPage';
import { variantsData as wholeEggLiquid } from '../pages/Products/WholeEggLiquidPage';
import { variantsData as eggYolkPowder } from '../pages/Products/EggYolkPowderPage';
import { variantsData as eggYolkPowderHeatStable } from '../pages/Products/EggYolkPowderHeatStablePage';
import { variantsData as eggYolkLiquid } from '../pages/Products/EggYolkLiquidPage';
import { variantsData as eggAlbumenPowder } from '../pages/Products/EggAlbumenPowderPage';
import { variantsData as eggAlbumenLiquid } from '../pages/Products/EggAlbumenLiquidPage';
import { variantsData as customizedMix } from '../pages/Products/CustomizedMixPage';

const productVariants = {
  whole_egg_powder: wholeEggPowder,
  whole_egg_liquid: wholeEggLiquid,
  egg_yolk_powder: eggYolkPowder,
  egg_yolk_powder_heat_stable: eggYolkPowderHeatStable,
  egg_yolk_liquid: eggYolkLiquid,
  egg_albumen_powder: eggAlbumenPowder,
  egg_albumen_liquid: eggAlbumenLiquid,
  customized_mix: customizedMix,
};

export function getVariantsForProduct(productId) {
  return productVariants[productId] ?? [];
}
