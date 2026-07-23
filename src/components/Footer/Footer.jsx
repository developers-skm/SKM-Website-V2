import React from 'react';
import SKMLogo from '../../assets/LOGO/logo1.png';

// Certificate Logos
import fssaiLogo from '../../assets/1. HOME PAGE/CERTIFICATES LOGO/FSSAI LOGO_585x585px.png';
import eicLogo from '../../assets/1. HOME PAGE/CERTIFICATES LOGO/EIC LOGO_585x585px.png';
import brcLogo from '../../assets/1. HOME PAGE/CERTIFICATES LOGO/BRC LOGO_585x585px.png';
import isoLogo from '../../assets/1. HOME PAGE/CERTIFICATES LOGO/ISO 17025 LOGO_585x585px.png';
import nablLogo from '../../assets/1. HOME PAGE/CERTIFICATES LOGO/NABL LOGO_585x585px.png';
import ercLogo from '../../assets/1. HOME PAGE/CERTIFICATES LOGO/ERC LOGO_585x585px.png';
import halalLogo from '../../assets/1. HOME PAGE/CERTIFICATES LOGO/HALAL LOGO_585x585px.png';
import kosherLogo from '../../assets/1. HOME PAGE/CERTIFICATES LOGO/KOSHER LOGO_585x585px.png';

const certificates = [
  { name: 'FSSAI', logo: fssaiLogo },
  { name: 'Export Inspection Council', logo: eicLogo },
  { name: 'BRC Food Certified', logo: brcLogo },
  { name: 'ISO/IEC 17025', logo: isoLogo },
  { name: 'NABL', logo: nablLogo },
  { name: 'Eat Right Campus', logo: ercLogo },
  { name: 'Jamiat Ulama Halal Foundation', logo: halalLogo },
  { name: 'KLBD Kosher', logo: kosherLogo },
];

const mainNavLinks = [
  { label: 'Home',         value: 'home' },
  { label: 'About SKM',    value: 'our_company' },
  { label: 'Products',     value: 'whole_egg_powder' },
  { label: 'Why SKM',      value: 'why_skm' },
  { label: 'Resources',    value: 'resources' },
  { label: 'News & Events', value: 'events' },
  { label: 'Investors',    value: 'investors' },
  { label: 'Global Reach', value: 'global_reach' },
];

export default function Footer({ onPageChange }) {
  const handleLinkClick = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white font-body select-none mt-auto relative overflow-hidden border-t border-[#eee]">

      {/* Decorative corner arrow */}
      <svg
        className="absolute top-0 right-0 pointer-events-none"
        width="220"
        height="220"
        viewBox="0 0 147 147"
        fill="rgba(228,10,24,0.05)"
        aria-hidden
      >
        <path d="M0.727728 0H147.001V27.3823L27.6537 147L0 119.617L81.5055 38.9117L0.727728 39.6323V0Z" />
        <path d="M147.002 146.999V54.7637L107.705 93.6754V146.999H147.002Z" />
      </svg>

      {/* Main content */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-8 relative z-10">

        {/* Logo + nav row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">

          {/* Logo */}
          <button onClick={() => handleLinkClick('home')} className="focus:outline-none flex-shrink-0 self-start">
            <div className="rounded-lg px-3 py-2">
              <img
                src={SKMLogo}
                alt="SKM Egg Products"
                className="h-16 w-auto max-w-[160px] object-contain"
              />
            </div>
          </button>

          {/* Nav links with | separators */}
          <div className="flex flex-wrap items-center gap-y-3 justify-evenly sm:flex-1">
            {mainNavLinks.map((link, index) => (
              <React.Fragment key={link.value}>
                <button
                  onClick={() => handleLinkClick(link.value)}
                  className="font-heading font-bold text-[15px] uppercase tracking-[0.05em] text-surface-700 hover:text-brand-600 transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </button>
                {index < mainNavLinks.length - 1 && (
                  <span className="text-surface-300 select-none text-[18px] font-light leading-none">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-8 pt-8 border-t border-[#eee]">
          <p className="font-body text-center text-[12px] font-bold uppercase tracking-widest text-surface-600 mb-5">
            Our Certifications &amp; Quality Accreditations
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 justify-items-center items-center">
            {certificates.map((cert) => (
              <div
                key={cert.name}
                title={cert.name}
                className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-[10px] hover:rounded-none overflow-hidden border border-[#eee] bg-surface-50 hover:border-brand-600/30 hover:bg-white flex items-center justify-center p-2.5 transition-all duration-500 group"
              >
                <img
                  src={cert.logo}
                  alt={cert.name}
                  className="w-full h-full object-contain group-hover:scale-[1.6] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#eee] bg-surface-50 relative z-10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-[#eee] bg-white flex items-center justify-center text-surface-500 hover:text-brand-600 hover:border-brand-600/30 hover:bg-brand-600/6 hover:-translate-y-0.5 transition-all duration-200">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"
              className="w-9 h-9 rounded-full border border-[#eee] bg-white flex items-center justify-center text-surface-500 hover:text-brand-600 hover:border-brand-600/30 hover:bg-brand-600/6 hover:-translate-y-0.5 transition-all duration-200">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-[#eee] bg-white flex items-center justify-center text-surface-500 hover:text-brand-600 hover:border-brand-600/30 hover:bg-brand-600/6 hover:-translate-y-0.5 transition-all duration-200">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border border-[#eee] bg-white flex items-center justify-center text-surface-500 hover:text-brand-600 hover:border-brand-600/30 hover:bg-brand-600/6 hover:-translate-y-0.5 transition-all duration-200">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
              className="w-9 h-9 rounded-full border border-[#eee] bg-white flex items-center justify-center text-surface-500 hover:text-brand-600 hover:border-brand-600/30 hover:bg-brand-600/6 hover:-translate-y-0.5 transition-all duration-200">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.003 3.003 0 00-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 002.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.003 3.003 0 002.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          <p className="font-body text-[12px] text-surface-500 tracking-wider uppercase text-center sm:text-right">
            <span className="block sm:inline">SKM Egg Products &copy; 2026.</span>
            <span className="block sm:inline"> All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
