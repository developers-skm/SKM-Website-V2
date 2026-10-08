import { motion } from 'framer-motion';
import { Container } from './layout';

export default function EmployerBrandStrip() {
  return (
    <section className="w-full bg-[#fcfbf9] border-y border-[#eae6e0] py-14 sm:py-20 lg:py-24">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center text-center gap-4 sm:gap-6"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600" aria-hidden="true" />
            <span className="font-heading text-[12px] font-bold uppercase tracking-[0.18em] text-brand-650">
              OUR PEOPLE &amp; CULTURE
            </span>
          </div>

          <h2 className="font-heading font-bold text-[32px] sm:text-[42px] lg:text-[48px] text-heading leading-[1.12] tracking-tight max-w-[22ch] m-0">
            Great products begin with great people.
          </h2>

          <p className="font-body text-[17px] sm:text-[19px] text-surface-600 leading-[1.65] max-w-[680px] m-0">
            At SKM, people across manufacturing, quality, science, engineering and business functions work together toward one standard - excellence.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
