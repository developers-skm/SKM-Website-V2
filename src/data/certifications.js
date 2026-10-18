// Shared certification logo set - used by TrustBar (homepage) and the
// product page's certifications strip. Footer.jsx keeps its own copy
// (untouched this phase) since it was already established before this pass.

import fssaiLogo from '../assets/1. HOME PAGE/CERTIFICATES LOGO/FSSAI LOGO_585x585px.png';
import eicLogo from '../assets/1. HOME PAGE/CERTIFICATES LOGO/EIC LOGO_585x585px.png';
import brcLogo from '../assets/1. HOME PAGE/CERTIFICATES LOGO/BRC LOGO_585x585px.png';
import isoLogo from '../assets/1. HOME PAGE/CERTIFICATES LOGO/ISO 17025 LOGO_585x585px.png';
import iso22000Logo from '../assets/resources/iso-22000-585.png';
import bpjphLogo from '../assets/resources/bpjph-585.png';
import halalLogo from '../assets/1. HOME PAGE/CERTIFICATES LOGO/HALAL LOGO_585x585px.png';
import kosherLogo from '../assets/1. HOME PAGE/CERTIFICATES LOGO/KOSHER LOGO_585x585px.png';

const certifications = [
  { name: 'FSSAI', logo: fssaiLogo },
  { name: 'Export Inspection Council', logo: eicLogo },
  { name: 'BRC Food Certified', logo: brcLogo },
  { name: 'ISO 22000', logo: iso22000Logo },
  { name: 'ISO/IEC 17025', logo: isoLogo },
  { name: 'Halal BPJPH', logo: bpjphLogo },
  { name: 'Halal JUHF', logo: halalLogo },
  { name: 'KLBD Kosher', logo: kosherLogo },
];

export default certifications;
