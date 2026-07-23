import { motion } from 'framer-motion';
import certifications from '../../../data/certifications';
import useCountUp from '../../../utils/useCountUp';

const stats = [
  { value: '2M+', label: 'Eggs Processed Daily' },
  { value: '7,500', label: 'MT Egg Powder Per Year' },
  { value: '30+', label: 'Countries Served' },
  { value: `${new Date().getFullYear() - 1997}+`, label: 'Years Of Industry Excellence' },
];

function StatCounter({ value, label, isLast }) {
  const { ref, display } = useCountUp(value);
  return (
    <div ref={ref} className={`flex flex-col items-center text-center gap-2 px-4 py-2 ${!isLast ? 'sm:border-r sm:border-surface-200/70 dark:sm:border-surface-800' : ''}`}>
      <span className="font-heading font-black text-[34px] sm:text-[40px] text-brand-600 dark:text-brand-400 leading-none tabular-nums">
        {display}
      </span>
      <span className="font-body text-[11px] sm:text-[12px] font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider leading-tight">
        {label}
      </span>
    </div>
  );
}

// Bookends the dark WhyUs panel — light "proof" strip directly beneath it,
// with a bordered stat rail (not plain floating numbers) plus the same
// certification marquee reframed inside a card so it reads as one deliberate
// module rather than the loose stack it was previously.
export default function TrustBar() {
  const doubledCerts = [...certifications, ...certifications];

  return (
    <div className="w-full bg-page dark:bg-surface-950 py-[60px] lg:py-[80px]">
      <div className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col gap-12">

        {/* Stat row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-y-8"
        >
          {stats.map((stat, i) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} isLast={i === stats.length - 1} />
          ))}
        </motion.div>

        {/* Certification marquee — framed as a card */}
        <div className="bg-white dark:bg-surface-900/40 border border-[#eee] dark:border-surface-800 rounded-3xl px-6 sm:px-10 py-8">
          <p className="text-center font-body text-[10.5px] font-bold uppercase tracking-[0.18em] text-surface-400 dark:text-surface-500 mb-6">
            Certified &amp; Accredited By
          </p>
          <div className="marquee-viewport relative w-full overflow-hidden">
            <div className="marquee-loop items-center gap-14 sm:gap-20">
              {doubledCerts.map((cert, i) => (
                <motion.img
                  key={`${cert.name}-${i}`}
                  src={cert.logo}
                  alt={cert.name}
                  title={cert.name}
                  loading="lazy"
                  whileHover={{ scale: 1.15, y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                  className="h-14 sm:h-20 w-auto object-contain flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
