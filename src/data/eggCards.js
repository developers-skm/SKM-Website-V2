import { eggFacts } from './eggFacts';

import img01 from '../assets/images/egg-cards/egg-card-01.webp';
import img02 from '../assets/images/egg-cards/egg-card-02.webp';
import img03 from '../assets/images/egg-cards/egg-card-03.webp';
import img04 from '../assets/images/egg-cards/egg-card-04.webp';
import img05 from '../assets/images/egg-cards/egg-card-05.webp';
import img06 from '../assets/images/egg-cards/egg-card-06.webp';
import img07 from '../assets/images/egg-cards/egg-card-07.webp';
import img08 from '../assets/images/egg-cards/egg-card-08.webp';
import img09 from '../assets/images/egg-cards/egg-card-09.webp';
import img10 from '../assets/images/egg-cards/egg-card-10.webp';
import img11 from '../assets/images/egg-cards/egg-card-11.webp';

// Product-page version of the rolling-egg click: each existing statement is
// paired with the banner image that fits its subject.
const imageByTitle = {
  'Excellence in Every Egg': img01,
  'A Complete Egg Ingredient Portfolio': img02,
  'Globally Trusted Quality': img03,
  'Designed for Diverse Applications': img04,
  'Quality from Farm to Finish': img05,
  'Superior Functional Performance': img06,
  'Consistency at Industrial Scale': img07,
  'Precision in Every Batch': img08,
  'Performance You Can Depend On': img09,
  'Customized for Your Business': img10,
  'The SKM Advantage': img11,
};

export const eggCards = eggFacts
  .filter((f) => imageByTitle[f.title])
  .map((f) => ({ ...f, image: imageByTitle[f.title] }));
