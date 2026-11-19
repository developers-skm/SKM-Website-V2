import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import officeLocations from '../../../data/officeLocations';
import OfficeMap from './OfficeMap';

export default function OfficeAddresses() {
  const locations = officeLocations;
  const [activeType, setActiveType] = useState(locations[0].type);
  const loc = locations.find((l) => l.type === activeType) || locations[0];

  return (
    <div className="w-full bg-white py-[90px] lg:py-[120px] overflow-hidden">
      <section className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10 lg:gap-14">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="SKM locations"
          className="self-center flex gap-1.5 p-1.5 rounded-full border border-[#eee] bg-white shadow-[5px_3px_40px_rgba(0,72,88,0.07)] max-w-full"
        >
          {locations.map((l) => {
            const isActive = l.type === activeType;
            return (
              <button
                key={l.type}
                type="button"
                role="tab"
                id={`tab-${l.type}`}
                aria-selected={isActive}
                aria-controls={`panel-${l.type}`}
                onClick={() => setActiveType(l.type)}
                className={`relative px-4 sm:px-7 py-2.5 rounded-full font-heading font-bold text-[12px] sm:text-[14px] uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white' : 'text-surface-600 hover:text-brand-600'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="office-tab-pill"
                    className="absolute inset-0 rounded-full bg-brand-600"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{l.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        <div
          role="tabpanel"
          id={`panel-${loc.type}`}
          aria-labelledby={`tab-${loc.type}`}
          className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch"
        >
          <AnimatePresence mode="wait">
            {/* Info & Photo Column */}
            <motion.div
              key={loc.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col justify-between gap-6 text-left"
            >
              <div className="flex flex-col gap-5">
                <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-600 bg-brand-600/6 border border-brand-600/12 px-3 py-1 rounded-full self-start">
                  {loc.badge}
                </span>

                <h2 className="font-heading font-bold text-[30px] sm:text-[44px] lg:text-[50px] text-heading leading-[1.1] lg:leading-[1.05] tracking-tight m-0">
                  {loc.title}
                </h2>

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

              <div className="relative rounded-[10px] border border-[#eee] overflow-hidden aspect-[16/9] w-full shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.14)] transition-shadow duration-300">
                <img
                  src={loc.image}
                  alt={loc.title}
                  className="w-full h-full object-cover select-none hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/70 to-transparent pointer-events-none" />
                <span className="absolute bottom-4 left-4 text-xs font-bold text-white uppercase tracking-wider bg-surface-950/50 backdrop-blur-xs px-2.5 py-1 rounded">
                  Exterior View
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

            {/* Map Column (persistent; src changes to move the map) */}
            <div className="flex-1 relative rounded-[10px] border border-[#eee] bg-white/70 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.16)] transition-all duration-300 overflow-hidden min-h-[320px] lg:min-h-[auto] flex flex-col">
              <div className="relative isolate rounded-[8px] overflow-hidden flex-grow w-full min-h-[320px] lg:min-h-[auto] h-full">
                <OfficeMap locations={locations} activeType={activeType} />

                <a
                  href={loc.directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 z-[1000] bg-surface-950/80 hover:bg-brand-600 text-white font-heading font-bold text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-[8px] border border-white/10 hover:border-transparent flex items-center gap-2 transition-all duration-200 shadow-md pointer-events-auto"
                >
                  <span>Get Directions</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}
