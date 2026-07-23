// Shared certification logo set — used by TrustBar (homepage) and the
// product page's certifications strip. Footer.jsx keeps its own copy
// (untouched this phase) since it was already established before this pass.

import fssaiLogo from '../assets/1. HOME PAGE/CERTIFICATES LOGO/FSSAI LOGO_585x585px.png';
import eicLogo from '../assets/1. HOME PAGE/CERTIFICATES LOGO/EIC LOGO_585x585px.png';
import brcLogo from '../assets/1. HOME PAGE/CERTIFICATES LOGO/BRC LOGO_585x585px.png';
import isoLogo from '../assets/1. HOME PAGE/CERTIFICATES LOGO/ISO 17025 LOGO_585x585px.png';
import nablLogo from '../assets/1. HOME PAGE/CERTIFICATES LOGO/NABL LOGO_585x585px.png';
import ercLogo from '../assets/1. HOME PAGE/CERTIFICATES LOGO/ERC LOGO_585x585px.png';
import halalLogo from '../assets/1. HOME PAGE/CERTIFICATES LOGO/HALAL LOGO_585x585px.png';
import kosherLogo from '../assets/1. HOME PAGE/CERTIFICATES LOGO/KOSHER LOGO_585x585px.png';

const certifications = [
  { name: 'FSSAI', logo: fssaiLogo },
  { name: 'Export Inspection Council', logo: eicLogo },
  { name: 'BRC Food Certified', logo: brcLogo },
  { name: 'ISO/IEC 17025', logo: isoLogo },
  { name: 'NABL', logo: nablLogo },
  { name: 'Eat Right Campus', logo: ercLogo },
  { name: 'Halal Certified', logo: halalLogo },
  { name: 'KLBD Kosher', logo: kosherLogo },
];

export default certifications;
