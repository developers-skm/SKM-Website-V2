import React from 'react';
import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';

export default function ContactHero() {
  const containerVariants = makeContainerVariants(0.15, { delayChildren: 0.1 });
  const itemVariants = makeItemVariants({ y: 30, stiffness: 70 });

  return (
    <div className="relative w-full bg-page overflow-hidden pt-[110px] pb-[90px] sm:pt-[130px] sm:pb-[110px] border-b border-[#eee]">
      {/* Background Gradients & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,var(--color-brand-50)_0%,transparent_50%)] pointer-events-none opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_-20%,var(--color-brand-100)_0%,transparent_40%)] pointer-events-none opacity-60" />
      
      {/* Abstract Tech Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6 z-10"
      >
        <motion.span
          variants={itemVariants}
          className="section-label justify-center"
        >
          Get in Touch
        </motion.span>
        
        <motion.h1
          variants={itemVariants}
          className="font-heading font-bold text-[42px] sm:text-[52px] lg:text-[70px] text-heading leading-[1.1] tracking-tight m-0 uppercase"
        >
          Contact <br className="sm:hidden" />
          Our Teams
        </motion.h1>
        
        <motion.div
          variants={itemVariants}
          className="w-16 h-[3px] bg-brand-600 rounded-full"
        />

        <motion.p
          variants={itemVariants}
          className="font-body text-[16px] sm:text-[18px] text-surface-500 max-w-2xl leading-[30px] m-0"
        >
          We are here to support your requirements. Connect with our corporate headquarters, advanced egg processing factory, or division heads.
        </motion.p>
      </motion.div>
    </div>
  );
}
