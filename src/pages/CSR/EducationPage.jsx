import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';

function ImagePlaceholder({ label, aspectClass = 'aspect-[4/3]' }) {
  return (
    <div className={`relative w-full ${aspectClass} rounded-2xl bg-surface-100 dark:bg-surface-800/60 border-2 border-dashed border-surface-200 dark:border-surface-700 flex flex-col items-center justify-center gap-3 overflow-hidden`}>
      <svg className="w-10 h-10 text-surface-300 dark:text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-surface-400 dark:text-surface-500 m-0 text-center px-4">{label}</p>
    </div>
  );
}

const educationStats = [
  { value: '239', label: 'Children Enrolled', sub: 'Gandhi Nagar & Rajiv Nagar' },
  { value: '210', label: 'Total Beneficiaries' },
  { value: '200', label: 'College Students', sub: '5 boys · 15 girls' },
  { value: '13', label: 'Graduates Placed', sub: 'This year' },
];

const coachingHighlights = [
  'Morning sessions: 7:00 – 8:30 am at Vivekanandhar Education Centre.',
  'Evening sessions: 5:30 – 8:30 pm with expert teachers.',
  'Computer and English courses via specialized instructors.',
  '20 specialized teachers appointed in the coaching centre.',
  '2 teachers appointed to teach at Mettur and Saminathapuram elementary schools.',
  'Dalit children in 10th & 12th standards have scored centum results in public exams.',
];

export default function EducationPage({ onPageChange }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } },
  };

  return (
    <div className="w-full flex flex-col">
      <SEO
        title="Education | CSR | SKM Egg Products"
        description="SKM Health and Mind Welfare Charity Trust – Sevai Maiyam. Discover how SKM's education initiative is transforming lives of 239 children in Dalit colonies through schooling, coaching, cultural programs and more."
        keywords="SKM CSR, education, Sevai Maiyam, SKM trust, dalit children, coaching centre, ABL system, Gandhi Nagar, Rajiv Nagar"
      />
      <div className="w-full bg-page dark:bg-surface-950 py-[40px] lg:py-[60px] overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-20"
        >

          {/* ── Section Header ── */}
          <div className="text-center flex flex-col items-center gap-4">
            <motion.span variants={itemVariants} className="section-label justify-center">
              CSR — Education
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
            >
              SKM Health &amp; Mind{' '}
              Welfare Charity Trust
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg font-semibold text-surface-500 dark:text-surface-400 m-0 uppercase tracking-widest"
            >
              Sevai Maiyam
            </motion.p>
          </div>

          {/* ── Intro ── */}
          <motion.div
            variants={itemVariants}
            className="border-l-4 border-brand-600 pl-8 py-6 bg-[rgba(228, 10, 24,0.02)] dark:bg-brand-950/15 rounded-r-[10px]"
          >
            <p className="font-body text-[15px] text-surface-600 dark:text-surface-350 leading-[26px] m-0">
              All educational expenses required for <strong className="text-surface-850 dark:text-white">239 children</strong> residing in Dalit colonies of <strong className="text-surface-850 dark:text-white">Gandhi Nagar</strong> and <strong className="text-surface-850 dark:text-white">Rajiv Nagar</strong> are being taken care of by the Trust. On the basis of <strong className="text-brand-600 dark:text-brand-400">"Education for All"</strong>, children above the age of 3 are being educated through the Sevai Maiyam Trust. Totally <strong className="text-surface-850 dark:text-white">210 children</strong> are being benefited — boys account for 92, girls 118, and students studying in colleges are 200 in number (boys — 5 and girls — 15).
            </p>
          </motion.div>

          {/* ── Stats ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">At a Glance</span>
              <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white tracking-tight m-0">Education by the Numbers</h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {educationStats.map((stat, i) => (
                <div key={i} className="p-5 bg-brand-600/4 dark:bg-brand-950/20 border border-[rgba(228, 10, 24,0.10)] dark:border-brand-900/30 rounded-[10px] flex flex-col gap-1.5">
                  <span className="font-heading font-bold text-[26px] sm:text-[30px] text-brand-600 dark:text-brand-400 leading-tight">{stat.value}</span>
                  <span className="text-[11px] font-bold text-surface-700 dark:text-surface-300 leading-tight">{stat.label}</span>
                  {stat.sub && <span className="text-[10px] text-surface-400 dark:text-surface-500 leading-tight">{stat.sub}</span>}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── ABL System ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Primary Education</span>
              <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white tracking-tight m-0">Activities Based Learning</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-5 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] flex flex-col gap-3">
                <h4 className="font-heading font-bold text-[12px] text-heading dark:text-white uppercase tracking-wider m-0">ABL — Seyal Vazhi Kattral</h4>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">
                  For children studying from <strong className="text-surface-700 dark:text-surface-300">1st to 4th standard</strong>, the Activities Based Learning (ABL) system — locally known as <em>Seyal Vazhi Kattral</em> — is followed at the school, with teachers specially trained in this method.
                </p>
              </div>
              <div className="p-5 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] flex flex-col gap-3">
                <h4 className="font-heading font-bold text-[12px] text-heading dark:text-white uppercase tracking-wider m-0">Graduate Achievements</h4>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">
                  This year, <strong className="text-brand-600 dark:text-brand-400">13 students</strong> educated through Sevai Maiyam have completed their graduation and are placed in good jobs — a testament to the transformative power of the programme.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Cultural Education ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Values &amp; Character</span>
              <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white tracking-tight m-0">Cultural Education</h3>
            </div>
            <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400 leading-relaxed m-0">
              Value-based cultural education is taught for children starting from the age of 4 and 5 residing in the two Dalit colonies. In order to inspire and develop students between <strong className="text-surface-700 dark:text-surface-300">6th and 12th standard</strong>, value-based <strong className="text-surface-700 dark:text-surface-300">Personality Development Course (PDC)</strong> classes are conducted regularly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] overflow-hidden">
                <ImagePlaceholder label="Cultural education — image coming soon" aspectClass="aspect-[4/3]" />
              </div>
              <div className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] overflow-hidden">
                <ImagePlaceholder label="PDC classes — image coming soon" aspectClass="aspect-[4/3]" />
              </div>
            </div>
          </motion.div>

          {/* ── Coaching Centre ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Academic Support</span>
              <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white tracking-tight m-0">Coaching Centre</h3>
            </div>
            <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400 leading-relaxed m-0">
              At the <strong className="text-surface-700 dark:text-surface-300">Vivekanandhar Education Centre</strong>, coaching classes are conducted in the morning (7:00 – 8:30 am) and evening (5:30 – 8:30 pm) with the aid of expert teachers. Computer and English courses are also conducted through specialised teachers. The dalit children studying in 10th and 12th standard have scored <strong className="text-brand-600 dark:text-brand-400">centum results</strong> in public exams.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coachingHighlights.map((point, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.07)] transition-all duration-300 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-[6px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">{point}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] overflow-hidden">
                <ImagePlaceholder label="Coaching centre — image coming soon" aspectClass="aspect-[4/3]" />
              </div>
              <div className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] overflow-hidden">
                <ImagePlaceholder label="Students at coaching centre — image coming soon" aspectClass="aspect-[4/3]" />
              </div>
            </div>
          </motion.div>

          {/* ── Library + Meditation + Cultural + Awards grid ── */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Library */}
            <div className="flex flex-col gap-4 p-6 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.08)] transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-[8px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-[14px] text-heading dark:text-white m-0 tracking-tight leading-snug pt-2">Library</h3>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">
                A library with various categories of books for education and extra-curricular activity functions within Sevai Maiyam. It helps children gather knowledge on nature, philosophy, political science and the world.
              </p>
            </div>

            {/* Meditation & Yoga */}
            <div className="flex flex-col gap-4 p-6 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.08)] transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-[8px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-[14px] text-heading dark:text-white m-0 tracking-tight leading-snug pt-2">Meditation &amp; Yoga</h3>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">
                A dedicated meditation hall constructed at Sevai Maiyam serves exclusively for meditation and yoga for children of the Dalit colonies, guided by specialised yoga masters.
              </p>
            </div>

            {/* Cultural Activities */}
            <div className="flex flex-col gap-4 p-6 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.08)] transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-[8px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-[14px] text-heading dark:text-white m-0 tracking-tight leading-snug pt-2">Cultural Activities</h3>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">
                Specialised teachers appointed by the Trust teach music and dance to the Dalit children. Gandhi Jayanthi is celebrated every year on <strong className="text-surface-700 dark:text-surface-300">October 2nd</strong>, with children performing dance and music depicting freedom and patriotism.
              </p>
            </div>

            {/* Awards */}
            <div className="flex flex-col gap-4 p-6 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.08)] transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-[8px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-[14px] text-heading dark:text-white m-0 tracking-tight leading-snug pt-2">Awards</h3>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">
                <strong className="text-surface-700 dark:text-surface-300">10 schools</strong> including government schools in Erode are chosen every year, and school toppers in 10th and 12th standards are awarded <strong className="text-surface-700 dark:text-surface-300">certificates and cash prizes</strong> by the Trust.
              </p>
            </div>

          </motion.div>

          {/* ── Tagline Banner ── */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-[10px] bg-brand-600 p-8 sm:p-10 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
            <p className="font-heading font-bold relative text-[17px] sm:text-[19px] text-white tracking-tight m-0 uppercase">
              Education for All — Building a brighter future for every child.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
