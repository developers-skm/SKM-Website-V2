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

export const departmentDescriptions = {
  'Production': 'Responsible for managing egg processing operations, ensuring efficient production, product quality, process hygiene, optimum resource utilisation and compliance with food safety standards to achieve production targets.',
  'Engineering': 'Responsible for maintaining plant machinery, utilities and equipment through preventive maintenance, troubleshooting and continuous improvement to ensure operational efficiency, equipment reliability and minimum downtime.',
  'Quality Assurance': 'Responsible for implementing food safety and quality management systems, monitoring process compliance, conducting audits and ensuring products meet customer specifications, regulatory requirements and international food safety standards.',
  'Laboratory': 'Responsible for conducting physicochemical, microbiological and product quality testing of raw materials, in-process samples and finished egg products to ensure product safety, consistency and compliance with established specifications.',
  'Sales & Marketing': 'Responsible for promoting egg-based ingredients, developing customer relationships, identifying domestic and international market opportunities and supporting business growth through effective sales and marketing strategies.',
  'Logistics': 'Responsible for coordinating domestic and international shipments, export documentation, inventory movement and supply chain activities to ensure timely product delivery, cost efficiency and compliance with logistics requirements.',
  'Information Systems / IT': 'Responsible for maintaining IT infrastructure, ERP systems, network security and digital applications while providing technical support, ensuring data integrity and driving process automation across business operations.',
  'Finance & Accounts': 'Responsible for managing financial transactions, accounting records, budgeting, taxation, cost analysis and financial reporting to ensure regulatory compliance, financial accuracy and effective business decision-making.',
  'HR & Administration': 'Responsible for recruitment, employee engagement, training, performance management, statutory compliance and administrative activities to support workforce development and smooth organisational operations.',
  'Procurement': 'Responsible for sourcing raw materials, ingredients, packaging materials, equipment and services through supplier evaluation, negotiation, cost optimisation and inventory coordination to ensure uninterrupted plant operations.',
  'Transport': 'Responsible for managing vehicle operations, transportation schedules, fleet maintenance and material movement to ensure safe, timely and cost-effective transportation of raw materials and finished products.',
  'Farm & Feed Operations': 'Responsible for managing poultry farm and feed mill operations, including flock health, biosecurity, feed quality, nutrition, egg production and operational efficiency to ensure a consistent supply of high-quality eggs.',
};

export const whyJoinSkm = [
  { icon: 'growth', title: 'Growth & Learning', text: 'Expand your technical and professional capabilities as part of a expanding global food manufacturing group.' },
  { icon: 'innovation', title: 'Innovation', text: 'Work alongside modern processing equipment, automated systems, and advanced testing technology.' },
  { icon: 'quality', title: 'Quality & Excellence', text: 'Be part of an uncompromised food-safety culture delivering high-grade egg products to global markets.' },
  { icon: 'teamwork', title: 'Collaboration', text: 'Experience a supportive environment where cross-functional teams build lasting manufacturing impact together.' },
];

export const earlyCareerPaths = [
  {
    number: '01',
    icon: 'training',
    title: 'Industrial Visit',
    text: 'We welcome students and academic institutions to explore our egg processing operations through organised industrial visits. These visits provide practical exposure to modern food processing technologies, quality assurance systems, food safety practices and sustainable manufacturing processes, bridging the gap between academic learning and industrial experience.',
    cta: 'Request a Visit',
    route: 'contact-us',
  },
  {
    number: '02',
    icon: 'internship',
    title: 'Internship',
    text: 'Internship programmes are available for students with hands-on practical experience across manufacturing operations, quality laboratories and corporate departments, bridging academic learning with real-world industrial practices, process engineering, and professional development.',
    cta: 'Apply for Internship',
    route: 'careers/internship',
  },
  {
    number: '03',
    icon: 'teamwork',
    title: 'Group Employment',
    text: 'Employment opportunities for contract workers across various departments, supporting workforce requirements through skilled and unskilled manpower.',
    cta: 'Share Agency Details',
    route: 'careers/group-employment',
  },
];

export const recruitmentSteps = [
  'Application',
  'Profile Review',
  'HR Discussion',
  'Interview',
  'Offer',
  'Onboarding',
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

