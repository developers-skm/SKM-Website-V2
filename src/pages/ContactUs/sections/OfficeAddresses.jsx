import React from 'react';
import { motion } from 'framer-motion';

// Import images
import CorporateImg from '../../../assets/6. CONTACT US/20240719_SKM_EGG PRODUCTS_197_SHA05676.webp';
import FactoryImg from '../../../assets/6. CONTACT US/SKM AO Picture.jpg';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';

export default function OfficeAddresses() {
  const containerVariants = makeContainerVariants(0.15);
  const itemVariants = makeItemVariants({ y: 30, stiffness: 80 });

  const locations = [
    {
      type: "corporate",
      badge: "Headquarters",
      title: "Corporate Office",
      image: FactoryImg,
      address: "133, 133/1, Gandhiji Road, Erode, TamilNadu-638001.",
      contactLabel: "Cell",
      phone: "0424-2268391",
      phoneLink: "tel:04242268391",
      mapEmbedUrl: "https://maps.google.com/maps?q=11.33330368885138,77.72408507409881&t=m&z=16&output=embed",
      directionsLink: "https://maps.google.com/?q=SKM+SHREE+GROUP+Erode"
    },
    {
      type: "factory",
      badge: "Production Facility",
      title: "Processing Factory",
      image: CorporateImg,
      address: "20th km, Erode - Karur Road, Punjai Kilambadi Village, Cholangapalayam, Modakuruchi block, Erode, Tamil Nadu, 638 154.",
      contactLabel: "Call",
      phone: "0424-2351532",
      phoneLink: "tel:04242351532",
      mapEmbedUrl: "https://maps.google.com/maps?q=11.215801788960954,77.8377695740967&t=m&z=16&output=embed",
      directionsLink: "https://maps.google.com/?q=SKM+Egg+Products+Export+ Punjai+Kilambadi"
    }
  ];

  return (
    <div className="w-full bg-page py-[90px] lg:py-[120px] border-b border-[#eee] overflow-hidden">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-24 sm:gap-32"
      >
        {locations.map((loc, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={loc.type}
              variants={itemVariants}
              className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Info & Photo Column */}
              <div className="flex-1 flex flex-col justify-between gap-6 text-left">
                <div className="flex flex-col gap-5">
                  {/* Badge */}
                  <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600 bg-brand-600/6 border border-brand-600/12 px-3 py-1 rounded-full self-start">
                    {loc.badge}
                  </span>
                  
                  {/* Title */}
                  <h2 className="font-heading font-bold text-[26px] sm:text-[34px] lg:text-[42px] text-heading leading-[1.1] tracking-tight m-0 uppercase">
                    {loc.title}
                  </h2>
                  
                  {/* Address List */}
                  <div className="flex flex-col gap-4 font-body text-[15px] text-surface-600 leading-[26px]">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 text-brand-600 mt-1">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="m-0 select-text font-medium">{loc.address}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 text-brand-600">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <p className="m-0 select-text font-bold">
                        {loc.contactLabel}: <a href={loc.phoneLink} className="hover:text-brand-600 transition-colors duration-250">{loc.phone}</a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Local Photo Showcase */}
                <div className="relative rounded-[10px] border border-[#eee] overflow-hidden aspect-[16/9] w-full shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.14)] transition-shadow duration-300">
                  <img
                    src={loc.image}
                    alt={loc.title}
                    className="w-full h-full object-cover select-none hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-950/70 to-transparent pointer-events-none" />
                  <span className="absolute bottom-4 left-4 text-xs font-bold text-white uppercase tracking-wider bg-surface-950/50 backdrop-blur-xs px-2.5 py-1 rounded">
                    Exterior View
                  </span>
                </div>
              </div>

              {/* Map Iframe Column */}
              <div className="flex-1 relative rounded-[10px] border border-[#eee] bg-white/70 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.16)] transition-all duration-300 overflow-hidden min-h-[300px] lg:min-h-[auto] flex flex-col">
                <div className="relative rounded-[8px] overflow-hidden flex-grow w-full min-h-[300px] lg:min-h-[auto] h-full">
                  <iframe
                    src={loc.mapEmbedUrl}
                    className="absolute inset-0 w-full h-full border-0 rounded-2xl select-none"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${loc.title} Google Map`}
                  />
                  
                  {/* Action overlays */}
                  <a
                    href={loc.directionsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 bg-surface-950/80 hover:bg-brand-600 text-white font-heading font-bold text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-[8px] border border-white/10 hover:border-transparent flex items-center gap-2 transition-all duration-200 shadow-md pointer-events-auto"
                  >
                    <span>Get Directions</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.section>
    </div>
  );
}
