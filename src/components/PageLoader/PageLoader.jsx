import React from 'react';
import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-[3px] border-brand-600/12" />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-brand-600 animate-spin" />
          <div className="absolute inset-[5px] rounded-full border-[2px] border-brand-600/6" />
          <div className="absolute inset-[5px] rounded-full border-[2px] border-transparent border-b-brand-600/40 animate-spin" style={{ animationDuration: '1.4s', animationDirection: 'reverse' }} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="font-heading font-bold text-[11px] tracking-[0.25em] uppercase text-heading m-0">
            SKM
          </p>
          <p className="font-body text-[10px] tracking-widest text-surface-400 m-0">
            Loading…
          </p>
        </div>
      </div>
    </motion.div>
  );
}
