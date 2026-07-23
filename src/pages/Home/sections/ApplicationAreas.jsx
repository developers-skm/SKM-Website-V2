import { motion } from 'framer-motion';
import applications from '../../../data/applications';
import ApplicationCard from './ApplicationCard';
import InternalLink from '../../../components/common/InternalLink';
import { containerVariants, itemVariants } from '../../../utils/animationVariants';

// Application Finder / product-finding tool. Only 4 of the 6 approved
// category labels (Bakery and confectionery / Mayonnaise, sauces and
// dressings / Noodles and pasta / Meat, fish and surimi) have complete
// approved data, images, routes, and product mappings in
// src/data/applications.js. Protein and nutrition / Other industrial
// applications have none of that yet — no image, no technical-need text,
// no product mapping, no route — so per the missing-category rule they are
// not rendered (no invented content, no reused image, no fake destination).
// 2x2 grid for the 4 real categories, in their approved relative order.
//
// "View All Applications" now links to the real /applications hub route
// (src/pages/Applications/ApplicationsHubPage.jsx), added specifically so
// this button has a genuine destination instead of nowhere to go.
export default function ApplicationAreas({ onPageChange }) {
  return (
    <div id="application-selector" className="w-full bg-white dark:bg-surface-900/40 pt-16 pb-10 lg:pt-24 lg:pb-16 xl:pt-28 xl:pb-20 scroll-mt-[100px] xl:scroll-mt-[120px]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1680px] w-full px-6 sm:px-10 lg:px-16 flex flex-col"
      >
        <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto mb-7 lg:mb-9">
          <h2 className="font-heading font-bold text-[34px] sm:text-[40px] lg:text-[44px] text-heading dark:text-white leading-[1.1] tracking-tight m-0">
            What we are Applied?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 lg:gap-8 max-w-5xl mx-auto w-full">
          {applications.map((app) => (
            <motion.div key={app.id} variants={itemVariants}>
              <ApplicationCard app={app} onPageChange={onPageChange} />
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="flex justify-center mt-10 lg:mt-12">
          <InternalLink
            route="applications"
            onPageChange={onPageChange}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-white dark:bg-surface-900 border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-600/6 dark:hover:bg-brand-950/30 font-heading font-bold text-[13px] uppercase tracking-[0.05em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            View All Applications
          </InternalLink>
        </motion.div>
      </motion.div>
    </div>
  );
}
