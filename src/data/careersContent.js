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
  { icon: 'growth', title: 'Growth & Learning', text: 'Develop technical and professional skills as the business grows.' },
  { icon: 'innovation', title: 'Innovation', text: 'Work with modern manufacturing, quality and technology-driven processes.' },
  { icon: 'quality', title: 'Quality & Excellence', text: 'Be part of a food-safety-first culture that exports worldwide.' },
  { icon: 'teamwork', title: 'Collaboration', text: 'Work across departments and business functions.' },
];

export const earlyCareerPaths = [
  { icon: 'graduate', title: 'Graduate Opportunities', text: 'For fresh graduates looking to start their professional career.' },
  { icon: 'internship', title: 'Internships', text: 'Practical learning opportunities for students.' },
  { icon: 'training', title: 'Industrial Training', text: 'Exposure to manufacturing and business operations.' },
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
  { q: 'How do I apply for a job at SKM?', a: 'Browse the current opportunities, open the role you are interested in and choose "Apply for This Position". Complete the application form and upload your resume.' },
  { q: 'Can freshers apply?', a: 'Yes. Graduate, internship and industrial-training opportunities are listed under Start Your Career With SKM, and freshers can also submit their profile to our Talent Pool.' },
  { q: 'Can I apply for more than one position?', a: 'Yes, you may apply for any position that matches your profile. Please submit a separate application for each role.' },
  { q: 'What resume formats are accepted?', a: 'We accept PDF, DOC and DOCX files up to 5 MB.' },
  { q: 'How will I know the status of my application?', a: 'You receive an application reference when you submit. Our recruitment team will contact shortlisted candidates by email or phone.' },
  { q: 'Will SKM contact every applicant?', a: 'Our team reviews every application. Candidates whose profiles match a current requirement will be contacted; other profiles may be considered for future openings.' },
];

export const lifeAtSkmTiles = [
  { label: 'Manufacturing', image: '/images/manufacturing/04-spray-drying.webp', alt: 'Spray drying equipment at SKM Egg Products' },
  { label: 'Laboratory & Quality', image: '/images/manufacturing/05-quality-testing.webp', alt: 'Laboratory quality testing at SKM Egg Products' },
  { label: 'Packaging & Operations', image: '/images/manufacturing/06-packaging.webp', alt: 'Packaging of SKM egg products' },
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
