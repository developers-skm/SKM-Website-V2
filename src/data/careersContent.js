// Static content for the Careers landing page. Department names double as
// the filter values used by jobs.js.

export const careerDepartments = [
  'Production',
  'Engineering',
  'Quality Assurance',
  'Laboratory',
  'Sales & Marketing',
  'Logistics',
  'Information Systems / IT',
  'Finance & Accounts',
  'HR & Administration',
  'Procurement',
  'Transport',
  'Farm & Feed Operations',
];

export const whyJoinSkm = [
  { icon: 'growth', title: 'Growth & Learning', text: 'Expand your technical and professional capabilities as part of a expanding global food manufacturing group.' },
  { icon: 'innovation', title: 'Innovation', text: 'Work alongside modern processing equipment, automated systems, and advanced testing technology.' },
  { icon: 'quality', title: 'Quality & Excellence', text: 'Be part of an uncompromised food-safety culture delivering high-grade egg products to global markets.' },
  { icon: 'teamwork', title: 'Collaboration', text: 'Experience a supportive environment where cross-functional teams build lasting manufacturing impact together.' },
];

export const earlyCareerPaths = [
  {
    number: '01',
    icon: 'graduate',
    title: 'Graduate Opportunities',
    text: 'Structured career entry pathways for motivated graduates in engineering, science, food technology, and business management.',
  },
  {
    number: '02',
    icon: 'internship',
    title: 'Internships',
    text: 'Hands-on practical exposure inside our manufacturing plant, quality laboratories, and corporate departments for current students.',
  },
  {
    number: '03',
    icon: 'training',
    title: 'Industrial Training',
    text: 'Immersive industrial apprenticeships designed to bridge academic study with real-world plant operations and process engineering.',
  },
];

export const recruitmentSteps = [
  'Application',
  'Profile Review',
  'HR Discussion',
  'Interview',
  'Offer',
  'Joining',
];

export const careersFaqs = [
  { q: 'How do I apply for a job at SKM?', a: 'Browse our current opportunities, select the role that matches your experience, and click "Apply for This Position". Complete the quick application form and upload your resume.' },
  { q: 'Can freshers apply for roles at SKM?', a: 'Yes. We welcome fresh graduates across multiple entry pathways listed under Early Careers. You can also submit your profile to our Talent Community.' },
  { q: 'Can I apply for more than one position?', a: 'Yes, you can apply for multiple roles that match your background. We recommend submitting a dedicated application for each position.' },
  { q: 'What resume formats are accepted?', a: 'We accept PDF, DOC, and DOCX files up to 5 MB.' },
  { q: 'How will I know the status of my application?', a: 'You will receive an instant reference code upon submission. Our talent acquisition team will review your application and contact shortlisted candidates directly.' },
  { q: 'Will SKM keep my application on file if no suitable role is open?', a: 'Yes. If your profile is submitted to our Talent Community or a specific role, our recruiters keep qualified candidate profiles on file for upcoming vacancies.' },
];

export const lifeAtSkmTiles = [
  { label: 'Manufacturing & Processing', image: '/images/careers/life-production.webp', alt: 'SKM manufacturing and process monitoring operations' },
  { label: 'Quality & Testing Laboratory', image: '/images/careers/life-lab.webp', alt: 'Quality control laboratory testing at SKM Egg Products' },
  { label: 'Engineering & Maintenance', image: '/images/careers/life-engineering.webp', alt: 'Engineering inspection inside SKM processing plant' },
];

// Icon per department tile (names resolve in careerIcons.jsx).
export const departmentIcons = {
  'Production': 'factory',
  'Engineering': 'wrench',
  'Quality Assurance': 'shield',
  'Laboratory': 'flask',
  'Sales & Marketing': 'chart',
  'Logistics': 'truck',
  'Information Systems / IT': 'monitor',
  'Finance & Accounts': 'calculator',
  'HR & Administration': 'department',
  'Procurement': 'cart',
  'Transport': 'truck',
  'Farm & Feed Operations': 'leaf',
};

