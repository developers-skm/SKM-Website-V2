import { motion } from 'framer-motion';
import FactoryImage from '../../../assets/2. ABOUT US/Our Company/Factory image.webp';

const stats = [
  { value: "2 Million",  label: "Eggs processed per day" },
  { value: "7,500 MT",   label: "Egg powder annually" },
  { value: "ISO 22000",  label: "Certified poultry & feed mill" },
];

// Asymmetric, overlapping composition — image bleeds to the container edge
// with a floating stat card breaking its corner, and the heading runs as an
// oversized pull-quote beside it. Deliberately not a symmetric 50/50 split
// (that was the previous CompanyIntro's construction): the offset grid and
// overlap are what read as "editorial" rather than "template card row."
export default function CompanyIntro({ onPageChange }) {
  return (
    <div className="w-full bg-white dark:bg-surface-900/40 pt-10 pb-[60px] lg:pt-14 lg:pb-[85px] overflow-hidden">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-8 items-center">

          {/* Image — offset into columns 1–7, overflows upward past the grid row */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="relative lg:col-span-7 lg:row-start-1"
          >
            <div className="relative rounded-tl-[64px] rounded-br-[64px] rounded-tr-2xl rounded-bl-2xl overflow-hidden aspect-[16/11] shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <motion.img
                src={FactoryImage}
                alt="SKM Egg Products factory facility"
                loading="lazy"
                className="w-full h-full object-cover select-none"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              />
            </div>

            {/* Floating stat card — breaks the image's bottom-right corner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="absolute -bottom-8 -right-4 sm:right-6 lg:-right-8 bg-brand-600 rounded-3xl px-7 py-6 shadow-[0_16px_40px_rgba(228,10,24,0.35)] flex flex-col gap-0.5"
            >
              <span className="font-heading font-black text-[30px] text-white leading-none">1996</span>
              <span className="font-body text-[10.5px] font-semibold text-white/80 uppercase tracking-wider">Established</span>
            </motion.div>
          </motion.div>

          {/* Copy — offset into columns 8–12, oversized heading treatment */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 lg:col-start-8 flex flex-col gap-7 lg:pl-4"
          >
            <span className="font-heading font-black text-[100px] lg:text-[130px] text-brand-600/[0.08] dark:text-brand-400/[0.08] leading-[0.75] select-none -mb-4">
              01
            </span>
            <h2 className="font-heading font-bold text-[30px] sm:text-[36px] text-heading dark:text-white leading-[1.15] tracking-tight m-0 -mt-8">
              Asia's Largest Integrated Egg Processing Facility
            </h2>
            <p className="font-body text-[15.5px] text-surface-500 dark:text-surface-400 leading-[28px] m-0">
              Established in 1996, SKM Egg Products began its journey with a clear commitment to excellence in egg processing. Today, we combine advanced production technology with internationally aligned quality systems — supported by fully integrated back-end farms and our own feed mill.
            </p>
            <p className="font-body text-[15.5px] text-surface-500 dark:text-surface-400 leading-[28px] m-0">
              Our poultry farm is ISO 22000 certified and registered under compartmentalization as per European Union norms — ensuring quality and safety are built in from the raw material, not inspected in afterward.
            </p>

            <button
              onClick={() => onPageChange?.('our_company')}
              className="group self-start inline-flex items-center gap-2.5 font-body font-semibold text-[13px] uppercase tracking-[0.05em] text-brand-600 hover:text-brand-700 dark:hover:text-brand-400 bg-transparent border-none p-0 cursor-pointer mt-1"
            >
              More About SKM
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden>
                <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
                <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Stat strip — sits below the split, full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-surface-200/60 dark:bg-surface-800 rounded-2xl overflow-hidden mt-12 lg:mt-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-surface-900 px-7 py-6 flex flex-col gap-1.5">
              <span className="font-heading font-bold text-[22px] text-brand-600 dark:text-brand-400 leading-none">
                {stat.value}
              </span>
              <span className="font-body text-[13px] text-surface-500 dark:text-surface-400 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
