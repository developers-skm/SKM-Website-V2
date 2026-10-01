import { motion } from 'framer-motion';
import { makeItemVariants } from '../../../utils/animationVariants';

const variants = makeItemVariants({ y: 16 });

// One heading rhythm for every section: eyebrow → H2 → supporting sentence.
// Left-aligned by default; pass align="center" for CTA-style sections.
// `action` renders on the right of the heading row (desktop).
export default function SectionHeading({ label, title, text, align = 'left', id, action }) {
  const centered = align === 'center';
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-8 ${centered ? 'items-center text-center sm:justify-center' : ''}`}
    >
      <div className={`flex flex-col gap-3 ${centered ? 'items-center' : 'items-start'}`}>
        <span className="section-label !mb-0">{label}</span>
        <h2 id={id} className="font-heading font-bold text-[32px] sm:text-[38px] lg:text-[42px] text-heading leading-[1.12] tracking-tight m-0 max-w-[22ch] sm:max-w-none">
          {title}
        </h2>
        {text && <p className="font-body text-[16px] sm:text-[17px] text-surface-500 max-w-[600px] leading-[1.65] m-0">{text}</p>}
      </div>
      {action}
    </motion.div>
  );
}
