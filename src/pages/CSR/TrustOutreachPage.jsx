import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

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

function ServiceCard({ icon, title, children }) {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px] hover:border-brand-600/30 hover:shadow-[5px_3px_40px_rgba(0,72,88,0.08)] transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-[8px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="font-heading font-bold text-[14px] text-heading dark:text-white m-0 tracking-tight leading-snug pt-2">{title}</h3>
      </div>
      <div className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
}

const icons = {
  sanitation: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  fees: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  festivities: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-1.5-.454M9 6l3 3m0 0l3-3m-3 3V2m0 16.5l-3 3m3-3l3 3" />
    </svg>
  ),
  medical: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  financial: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  aged: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  marriage: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  rituals: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  office: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
};

export default function TrustOutreachPage({ onPageChange }) {
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
        title="Trust Outreach Programs | CSR | SKM Egg Products"
        description="Sevai Maiyam's comprehensive outreach programs covering sanitation, education, medical services, financial aid, elder care, and community welfare for adopted Dalit colonies."
        keywords="SKM CSR, trust outreach, Sevai Maiyam, social welfare, dalit colonies, education aid, medical services"
      />
      <Breadcrumb
        items={[
          { label: 'CSR' },
          { label: 'Trust Outreach Programs' },
        ]}
        onPageChange={onPageChange}
      />

      <div className="w-full bg-page dark:bg-surface-950 py-[40px] lg:py-[60px] overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-16"
        >

          {/* ── Section Header ── */}
          <div className="text-center flex flex-col items-center gap-4">
            <motion.span
              variants={itemVariants}
              className="section-label justify-center"
            >
              CSR — Sevai Maiyam
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading dark:text-white leading-[1.1] tracking-tight m-0"
            >
              Trust{' '}
              Outreach Programs
            </motion.h2>
          </div>

          {/* ── Main Aim ── */}
          <motion.div
            variants={itemVariants}
            className="border-l-4 border-brand-600 pl-8 py-6 bg-[rgba(228, 10, 24,0.02)] dark:bg-brand-950/15 rounded-r-[10px]"
          >
            <p className="font-body text-[15px] text-surface-600 dark:text-surface-350 leading-[26px] m-0">
              The main aim of <strong className="text-surface-850 dark:text-white">"Sevai Maiyam"</strong> is that the children of the 2 Dalit colonies must be given a minimum Graduation Degree as basic education, completely free of cost. Sevai Maiyam serves to provide all basic necessities for the children of these two colonies in order to improve their standard of living. This trust volunteers many services by adopting the 2 Dalit colonies. In order to uplift the standard of living of poverty-stricken and backward people, it offers all basic necessities. Hence there is a certain amount of change in the people living there, and the future of the children living here is optimized to be bright.
            </p>
          </motion.div>

          {/* ── Sanitation ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Hygiene</span>
              <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white tracking-tight m-0">Sanitation</h3>
            </div>
            <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400 leading-relaxed m-0">
              In order to maintain proper sanitation for the children, washing soap, bathing soap, shikakai powder, tooth powder, and coconut oil are provided. A haircut is done for boys once every month. A separate saloon has been constructed for this purpose at Gandhi Nagar.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] overflow-hidden">
                <ImagePlaceholder label="Sanitation — image coming soon" aspectClass="aspect-[4/3]" />
              </div>
              <div className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] overflow-hidden">
                <ImagePlaceholder label="Saloon at Gandhi Nagar — image coming soon" aspectClass="aspect-[4/3]" />
              </div>
            </div>
          </motion.div>

          {/* ── Fees & Uniforms + Festivities ── */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ServiceCard icon={icons.fees} title="Fees & Uniforms">
              <p className="m-0">School fees and school books are provided free of cost by Sevai Maiyam every year. Further, all children are given uniforms <strong className="text-surface-700 dark:text-surface-300">twice a year</strong>.</p>
            </ServiceCard>
            <ServiceCard icon={icons.festivities} title="Festivities">
              <p className="m-0">During Diwali, children are given sweets and crackers. New clothes are given <strong className="text-surface-700 dark:text-surface-300">thrice a year</strong> during festival celebrations.</p>
            </ServiceCard>
          </motion.div>

          {/* ── Medical Services ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-body text-[12px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">Healthcare</span>
              <h3 className="font-heading font-bold text-[22px] sm:text-[26px] text-heading dark:text-white tracking-tight m-0">Medical Services</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px]">
                <div className="flex-shrink-0 w-8 h-8 rounded-[6px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">A public hospital inside Sevai Maiyam functions daily in the evenings with Dr. P. Gurumurthi B.Sc. MD (General Physician) and a Nurse.</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px]">
                <div className="flex-shrink-0 w-8 h-8 rounded-[6px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">A Child Specialist (Paediatrician) visits regularly to check the health of the children.</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-surface-900/50 border border-[#eee] dark:border-surface-800/60 rounded-[10px]">
                <div className="flex-shrink-0 w-8 h-8 rounded-[6px] bg-brand-600/6 dark:bg-brand-950/60 border border-brand-600/12 dark:border-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed m-0">Eye camps are conducted for Dalit children. All children are issued individual medical identity cards. All services are completely <strong className="text-surface-700 dark:text-surface-300">free of cost</strong>.</p>
              </div>
            </div>

            {/* Medical images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] overflow-hidden">
                <ImagePlaceholder label="Medical services — image coming soon" aspectClass="aspect-[4/3]" />
              </div>
              <div className="rounded-[20px] border border-[#eee] dark:border-surface-800 bg-white/70 dark:bg-surface-900/40 p-3 shadow-[5px_3px_40px_rgba(0,72,88,0.07)] overflow-hidden">
                <ImagePlaceholder label="Eye camp — image coming soon" aspectClass="aspect-[4/3]" />
              </div>
            </div>
          </motion.div>

          {/* ── Financial Aid + Services to the Aged ── */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ServiceCard icon={icons.financial} title="Financial Aid">
              <p className="m-0">Poor children from nearby villages beyond the 2 Dalit colonies are given complete financial aid for their education. <strong className="text-surface-700 dark:text-surface-300">22 students</strong> have benefited and are now placed in reputed firms and organisations.</p>
            </ServiceCard>
            <ServiceCard icon={icons.aged} title="Services to the Aged">
              <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
                {[
                  'All necessities provided for persons above 60 years of age who are unable to earn.',
                  'Nutritious food and tea served daily.',
                  'Clothes given 3 times a year; soap, tooth powder and oil every month.',
                  'New dresses and sweets distributed during Diwali.',
                  'Pocket money of ₹50/- per month.',
                  'Eye camps, surgeries and spectacles provided as needed.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-brand-600 dark:bg-brand-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ServiceCard>
          </motion.div>

          {/* ── Marriage Aid + Last Rituals ── */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ServiceCard icon={icons.marriage} title="Marriage Aid">
              <p className="m-0">
                During the marriage of residents of Gandhi Nagar and Rajiv Nagar colonies, the couple is gifted a <strong className="text-surface-700 dark:text-surface-300">silk saree, silk dhoti and a towel</strong>, along with a <strong className="text-surface-700 dark:text-surface-300">Mangalsutra ornament (¼ sovereign)</strong> — amounting to a total value of <strong className="text-brand-600 dark:text-brand-400">₹3,000/-</strong>.
              </p>
            </ServiceCard>
            <ServiceCard icon={icons.rituals} title="Last Rituals">
              <p className="m-0">
                When a resident of the colony passes away, a <strong className="text-surface-700 dark:text-surface-300">vehicle is provided</strong> to carry the body for cremation, and a wholesome amount of <strong className="text-brand-600 dark:text-brand-400">₹1,000/-</strong> is given to the family to assist with the last rites.
              </p>
            </ServiceCard>
          </motion.div>

          {/* ── Office & Infrastructure ── */}
          <motion.div variants={itemVariants}>
            <ServiceCard icon={icons.office} title="Office & Infrastructure">
              <p className="m-0">
                The Trust has a <strong className="text-surface-700 dark:text-surface-300">modern kitchen</strong> with a clean dining hall, a <strong className="text-surface-700 dark:text-surface-300">private hospital</strong>, a <strong className="text-surface-700 dark:text-surface-300">spiritual centre</strong> for children to practice meditation and yoga, and a <strong className="text-surface-700 dark:text-surface-300">coaching centre</strong>. All buildings are constructed with modern facilities and well-maintained.
              </p>
            </ServiceCard>
          </motion.div>

          {/* ── Tagline Banner ── */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-[10px] bg-brand-600 p-8 sm:p-10 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
            <p className="font-heading font-bold relative text-[17px] sm:text-[19px] text-white tracking-tight m-0 uppercase">
              Every service, every life — completely free of cost.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
