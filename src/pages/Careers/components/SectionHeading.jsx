import { motion } from 'framer-motion';
import { makeItemVariants } from '../../../utils/animationVariants';

const variants = makeItemVariants({ y: 20 });

// Shared eyebrow + heading + intro used by every Careers landing section.
export default function SectionHeading({ label, title, text, align = 'center', id }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`flex flex-col gap-3 ${alignment}`}
    >
      <span className={`section-label ${align === 'center' ? 'justify-center' : ''}`}>{label}</span>
      <h2 id={id} className="font-heading font-bold text-[30px] sm:text-[38px] text-heading leading-[1.15] tracking-tight m-0">
        {title}
      </h2>
      {text && <p className="font-body text-[15px] sm:text-[16px] text-surface-500 max-w-2xl leading-[26px] m-0">{text}</p>}
    </motion.div>
  );
}
