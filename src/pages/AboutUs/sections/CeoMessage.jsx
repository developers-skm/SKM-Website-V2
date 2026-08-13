import React from 'react';
import { motion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';

const containerVariants = makeContainerVariants(0.12);
const itemVariants = makeItemVariants({ y: 25 });

export default function CeoMessage() {
  return (
    <div className="w-full bg-page pt-[110px] pb-[40px] sm:pt-[130px] lg:pt-[60px] lg:pb-[60px] border-b border-[#eee] overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-brand-500)_0%,transparent_100%)] pointer-events-none opacity-[0.02]" />

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-12"
      >
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="section-label justify-center">Leadership Message</span>
          <h2 className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading leading-[1.1] tracking-tight m-0">
            CEO's Message
          </h2>
          <p className="font-body text-[16px] text-surface-500 max-w-2xl leading-[30px] m-0">
            A message from our executive leadership on our core values, growth trajectory, and vision for the future.
          </p>
        </div>

        {/* Quote card — preview testimonial border-l pattern */}
        <motion.div
          variants={itemVariants}
          className="relative max-w-4xl w-full bg-white border border-[#eee] rounded-[10px] p-8 sm:p-12 md:p-16 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.16)] transition-all duration-300 flex flex-col items-center gap-8 group"
        >
          {/* Watermark quotes */}
          <div className="absolute top-6 left-8 text-surface-100 text-8xl md:text-9xl font-serif font-black select-none pointer-events-none leading-none -translate-y-2 opacity-50">"</div>
          <div className="absolute bottom-12 right-8 text-surface-100 text-8xl md:text-9xl font-serif font-black select-none pointer-events-none leading-none translate-y-6 opacity-50">"</div>

          {/* Quote — preview blockquote with left red border */}
          <div className="relative z-10 w-full border-l-4 border-brand-600 pl-8 py-4 bg-[rgba(228, 10, 24,0.02)] rounded-r-[10px]">
            <p className="font-body text-[17px] sm:text-[19px] font-medium leading-[30px] text-surface-700 m-0 italic">
              "SKM EGG Products is a finest example of how a strong value system and drive for excellence can keep you ahead in a competitive environment. Thinking out of the shell was a mantra we adopted consciously not just to give ourselves the edge but also to keep pushing ourselves to innovate. Today, we are one of the Asia's biggest egg processing plant, the future looks both exciting and promising to us."
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-[3px] bg-brand-600 rounded-full z-10" />

          {/* CEO sign-off */}
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-brand-600/6 border border-brand-600/12 flex items-center justify-center text-brand-600 font-heading font-bold text-[14px] tracking-wider shadow-xs">
              SKMS
            </div>
            <div className="flex flex-col gap-0.5 select-none">
              <h4 className="font-heading text-[18px] font-bold text-heading m-0 tracking-wide">
                Mr. SKM Shree Shivkumar
              </h4>
              <p className="font-body text-[12px] font-bold text-brand-600 m-0 uppercase tracking-widest">
                Chief Executive Officer
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
