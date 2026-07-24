import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PdfFlipbook from '../../components/PdfFlipbook/PdfFlipbook';
import { itemVariants } from '../../utils/animationVariants';
import eppLogo from '../../assets/2. ABOUT US/Brand Identity/EPP VERTICAL LOGO_585x585px.png';

// Served as a static file from public/documents/coffee-table-book/ so Vite
// doesn't bundle/hash/sourcemap this 11MB PDF into the JS build.
const productListPdf = '/documents/coffee-table-book/SKM%20EGG%20PRODUCTS%20_%20Coffee%20Table%20Book_%20Final.pdf';

const books = [
  {
    title: "Thinking Out of the Shell",
    subtitle: "The SKM Story & Heritage",
    release: "Silver Jubilee Edition",
    pages: "68 Pages",
    desc: "A premium celebratory coffee table book documenting our history since 1996. It details Mr. SKM Shree Shivkumar's visionary leadership, operational scale, and our journey to becoming Asia's largest egg processor.",
    coverGradient: "from-red-650 to-brand-950",
    goldDetails: true,
    pdfUrl: productListPdf,
    coverImage: eppLogo,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function CoffeeTableBooksPage({ onPageChange }) {
  const [flipbook, setFlipbook] = useState(null); // { pdfUrl, title }

  return (
    <PageWrapper
      seo={{
        title: 'Coffee Table Books | SKM Egg Products',
        description: 'Browse the digital archives and virtual coffee table books of SKM Egg Products, chronicling our history, infrastructure, and standards.',
        keywords: 'SKM Coffee Table Books, SKM corporate history, egg processing photography',
      }}
      breadcrumbItems={[{ label: 'About Us' }, { label: 'Coffee Table Books' }]}
      onPageChange={onPageChange}
    >

      <div className="w-full bg-page dark:bg-surface-950 py-[40px] lg:py-[60px] overflow-hidden">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-16"
        >
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-4">
            <motion.span variants={itemVariants} className="section-label justify-center">
              Visual Publications
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0 uppercase"
            >
              Coffee Table{' '}
              Books
            </motion.h2>
            <motion.p variants={itemVariants} className="font-body text-[16px] text-surface-500 dark:text-surface-400 max-w-2xl leading-[30px] m-0">
              Delve into our rich history, state-of-the-art facilities, and bio-security frameworks through our premium digital coffee table books.
            </motion.p>
          </div>

          {/* Book cards */}
          <div className="flex flex-col gap-12 max-w-5xl mx-auto w-full">
            {books.map((book, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`flex flex-col ${
                  idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-10 items-center justify-between bg-surface-50/50 dark:bg-surface-900/20 border border-[#eee] dark:border-surface-800 p-8 sm:p-10 rounded-[10px] shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.14)] transition-shadow duration-300`}
              >
                {/* Book cover thumbnail */}
                <div className="flex-shrink-0 relative flex justify-center items-center group">
                  <div className="absolute w-[80%] h-[80%] bg-brand-600/6 dark:bg-brand-650/5 rounded-full blur-3xl group-hover:bg-[rgba(228, 10, 24,0.10)] transition-all duration-500 -z-10 pointer-events-none" />
                  <div className="w-full max-w-[260px] rounded-[20px] border border-[#eee] dark:border-surface-800 bg-surface-50 dark:bg-surface-900/40 p-5 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.16)] transition-all duration-500 flex flex-col items-center gap-4">
                    <div className="relative bg-page dark:bg-surface-950 p-5 rounded-[16px] border border-[#eee] dark:border-surface-800/80 w-full aspect-square flex items-center justify-center">
                      <motion.img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-[80%] h-[80%] object-contain select-none"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        draggable={false}
                      />
                    </div>
                    <div className="text-center flex flex-col gap-1 select-none">
                      <h4 className="font-heading text-[13px] font-bold text-heading dark:text-white m-0 tracking-wide">
                        {book.subtitle}
                      </h4>
                      <p className="font-body text-[11px] text-surface-400 dark:text-surface-500 m-0">
                        {book.release}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Book details */}
                <div className="flex-grow text-left flex flex-col gap-5 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="font-body text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-600/6 dark:bg-brand-950/70 border border-brand-600/12 dark:border-brand-900/30 px-3 py-1 rounded">
                      {book.release}
                    </span>
                    <span className="font-body text-[12px] text-surface-400 dark:text-surface-500 font-medium uppercase tracking-wider">
                      {book.pages}
                    </span>
                  </div>

                  <h3 className="font-heading text-[22px] sm:text-[26px] font-bold text-surface-800 dark:text-white m-0">
                    {book.title}
                  </h3>
                  <p className="font-body text-[15px] text-surface-500 dark:text-surface-400 leading-[26px] m-0">
                    {book.desc}
                  </p>

                  <div className="flex items-center gap-4 mt-2">
                    <button
                      className="btn-primary-red"
                      disabled={!book.pdfUrl}
                      onClick={() => book.pdfUrl && setFlipbook({ pdfUrl: book.pdfUrl, title: book.title })}
                    >
                      Read Digital Book
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
                        <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
                        <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
                      </svg>
                    </button>
                    {book.pdfUrl && (
                      <a
                        href={book.pdfUrl}
                        download
                        className="btn-outline-red"
                      >
                        Download PDF
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* PDF Flipbook Modal */}
      {flipbook && (
        <PdfFlipbook
          pdfUrl={flipbook.pdfUrl}
          title={flipbook.title}
          onClose={() => setFlipbook(null)}
        />
      )}
    </PageWrapper>
  );
}
