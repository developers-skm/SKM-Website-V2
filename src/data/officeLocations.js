// Single source of truth for the Contact Us page and the chatbot's location answers.

import CorporateImg from '../assets/6. CONTACT US/20240719_SKM_EGG PRODUCTS_197_SHA05676 - web.webp';
import FactoryImg from '../assets/6. CONTACT US/SKM AO Picture.webp';

const officeLocations = [
  {
    type: "corporate",
    badge: "Headquarters",
    title: "Corporate Office",
    image: FactoryImg,
    address: "133, 133/1, Gandhiji Road, Erode, TamilNadu-638001.",
    contactLabel: "Contact",
    phone: "0424-2268391",
    phoneLink: "tel:04242268391",
    mapEmbedUrl: "https://maps.google.com/maps?q=11.3305406,77.7265171&t=m&z=17&output=embed",
    directionsLink: "https://www.google.com/maps/dir/?api=1&destination=11.3305406,77.7265171"
  },
  {
    type: "factory",
    badge: "Production Facility",
    title: "Processing Factory",
    image: CorporateImg,
    address: "20th km, Erode - Karur Road, Punjai Kilambadi Village, Cholangapalayam, Kodumudi block, Erode, Tamil Nadu, 638 154.",
    contactLabel: "Call",
    phone: "0424-2351532",
    phoneLink: "tel:04242351532",
    mapEmbedUrl: "https://maps.google.com/maps?q=11.215801788960954,77.8377695740967&t=m&z=16&output=embed",
    directionsLink: "https://maps.google.com/?q=SKM+Egg+Products+Export+ Punjai+Kilambadi"
  }
];

export default officeLocations;
