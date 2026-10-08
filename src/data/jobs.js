// Temporary, data-driven job openings. There is no jobs API/database yet, so
// the Careers pages read from this list. Replace/extend entries (or swap the
// helpers below for an API call) when real vacancies are available.
// NOTE: the entries are placeholder sample roles - confirm with HR before launch.

export const jobs = [
  {
    id: 'SKM-ENG-001',
    slug: 'maintenance-engineer',
    title: 'Maintenance Engineer',
    department: 'Engineering',
    location: 'Erode, Tamil Nadu',
    employmentType: 'Full Time',
    experience: '2-5 Years',
    qualification: 'BE / Diploma',
    summary: 'Keep our egg processing and spray-drying equipment running reliably through planned and breakdown maintenance.',
    responsibilities: [
      'Carry out preventive and breakdown maintenance of production machinery and utilities.',
      'Maintain equipment history, spares planning and maintenance records.',
      'Support continuous-improvement and energy-saving initiatives.',
      'Follow food-safety, hygiene and workplace-safety procedures at all times.',
    ],
    requirements: [
      'Hands-on experience in maintenance of food or process manufacturing equipment.',
      'Working knowledge of mechanical, electrical or utility systems.',
      'Willingness to work in shifts.',
    ],
    skills: ['Preventive Maintenance', 'Troubleshooting', 'Utilities', 'Safety Practices'],
    postedDate: '2026-09-15',
    closingDate: '2026-12-15',
    active: true,
  },
  {
    id: 'SKM-QA-001',
    slug: 'quality-assurance-executive',
    title: 'Quality Assurance Executive',
    department: 'Quality Assurance',
    location: 'Erode, Tamil Nadu',
    employmentType: 'Full Time',
    experience: '1-3 Years',
    qualification: 'B.Sc / M.Sc (Food Technology, Microbiology)',
    summary: 'Support food-safety systems, in-process checks and documentation across our manufacturing operations.',
    responsibilities: [
      'Perform in-process and finished-product quality checks.',
      'Maintain food-safety and quality documentation for audits.',
      'Coordinate with production on corrective and preventive actions.',
      'Support internal and external audits and certifications.',
    ],
    requirements: [
      'Understanding of food-safety systems such as HACCP and GMP.',
      'Good documentation and communication skills.',
    ],
    skills: ['HACCP', 'GMP', 'Quality Documentation', 'Audit Support'],
    postedDate: '2026-09-18',
    closingDate: '2026-12-10',
    active: true,
  },
  {
    id: 'SKM-LAB-001',
    slug: 'laboratory-analyst',
    title: 'Laboratory Analyst',
    department: 'Laboratory',
    location: 'Erode, Tamil Nadu',
    employmentType: 'Full Time',
    experience: '0-2 Years',
    qualification: 'B.Sc / M.Sc (Chemistry, Microbiology)',
    summary: 'Carry out physico-chemical and microbiological analysis of raw material, in-process and finished products.',
    responsibilities: [
      'Conduct routine laboratory testing as per approved methods.',
      'Calibrate and maintain laboratory instruments.',
      'Record, review and report analytical results accurately.',
    ],
    requirements: [
      'Basic knowledge of analytical or microbiological techniques.',
      'Attention to detail and good record keeping.',
    ],
    skills: ['Analytical Testing', 'Microbiology', 'Instrument Handling'],
    postedDate: '2026-09-20',
    closingDate: '2026-12-05',
    active: true,
  },
  {
    id: 'SKM-PRD-001',
    slug: 'production-supervisor',
    title: 'Production Supervisor',
    department: 'Production',
    location: 'Erode, Tamil Nadu',
    employmentType: 'Full Time',
    experience: '3-6 Years',
    qualification: 'B.Sc / BE / Diploma',
    summary: 'Lead shift teams to deliver safe, efficient and high-quality egg product production.',
    responsibilities: [
      'Plan and supervise shift production activities.',
      'Ensure adherence to hygiene, safety and quality standards.',
      'Track production output, yield and downtime.',
      'Train and guide operators on standard operating procedures.',
    ],
    requirements: [
      'Experience supervising a manufacturing or food-processing shift.',
      'Team-leading skills and willingness to work in rotating shifts.',
    ],
    skills: ['Shift Management', 'SOP Compliance', 'Team Leadership'],
    postedDate: '2026-09-10',
    closingDate: '2026-11-30',
    active: true,
  },
  {
    id: 'SKM-SAL-001',
    slug: 'export-sales-executive',
    title: 'Export Sales Executive',
    department: 'Sales & Marketing',
    location: 'Erode, Tamil Nadu',
    employmentType: 'Full Time',
    experience: '2-5 Years',
    qualification: 'MBA / Any Degree',
    summary: 'Support international customers and the export sales team with enquiries, quotations and order follow-up.',
    responsibilities: [
      'Handle customer enquiries and prepare quotations.',
      'Coordinate orders with production, logistics and documentation teams.',
      'Maintain customer communication and records.',
    ],
    requirements: [
      'Experience in export sales or customer service preferred.',
      'Excellent written and spoken English.',
    ],
    skills: ['Export Documentation', 'Customer Communication', 'MS Office'],
    postedDate: '2026-09-12',
    closingDate: '2026-12-01',
    active: true,
  },
  {
    id: 'SKM-IT-001',
    slug: 'it-support-executive',
    title: 'IT Support Executive',
    department: 'Information Systems / IT',
    location: 'Erode, Tamil Nadu',
    employmentType: 'Full Time',
    experience: '1-3 Years',
    qualification: 'BE / BCA / Diploma (IT)',
    summary: 'Provide day-to-day IT, network and systems support across our offices and plant.',
    responsibilities: [
      'Resolve hardware, software and network issues for users.',
      'Maintain user accounts, backups and asset records.',
      'Support business applications and rollouts.',
    ],
    requirements: [
      'Knowledge of Windows, networking and basic server administration.',
      'Good troubleshooting and communication skills.',
    ],
    skills: ['Windows', 'Networking', 'Helpdesk', 'Backups'],
    postedDate: '2026-09-22',
    closingDate: '2026-12-20',
    active: true,
  },
  {
    id: 'SKM-GRD-001',
    slug: 'graduate-engineer-trainee',
    title: 'Graduate Engineer Trainee',
    department: 'Production',
    location: 'Erode, Tamil Nadu',
    employmentType: 'Trainee',
    experience: 'Fresher',
    qualification: 'BE / B.Tech / B.Sc (Food Technology)',
    summary: 'A structured entry-level programme for fresh graduates to learn egg processing operations hands-on.',
    responsibilities: [
      'Rotate across production, quality and engineering functions.',
      'Assist teams with daily operations and improvement projects.',
      'Document learnings and present project outcomes.',
    ],
    requirements: [
      'Recent graduate with a strong academic record.',
      'Eagerness to learn and work in a plant environment.',
    ],
    skills: ['Willingness to Learn', 'Communication', 'Analytical Thinking'],
    postedDate: '2026-09-25',
    closingDate: '2026-12-31',
    active: true,
  },
  {
    id: 'SKM-INT-001',
    slug: 'industrial-training-intern',
    title: 'Industrial Training Intern',
    department: 'Quality Assurance',
    location: 'Erode, Tamil Nadu',
    employmentType: 'Internship',
    experience: 'Fresher',
    qualification: 'Pursuing B.Sc / BE / B.Tech',
    summary: 'Short-term industrial training and internship exposure to food manufacturing and quality systems.',
    responsibilities: [
      'Observe and assist with quality and production activities.',
      'Complete a guided mini-project under a mentor.',
    ],
    requirements: [
      'Currently enrolled in a relevant degree or diploma programme.',
      'Institute bonafide letter for the training period.',
    ],
    skills: ['Curiosity', 'Documentation', 'Teamwork'],
    postedDate: '2026-09-25',
    closingDate: '2026-12-31',
    active: true,
  },
];

const today = () => new Date().toISOString().slice(0, 10);

export const isJobOpen = (job) => job.active && job.closingDate >= today();

export const getOpenJobs = () => jobs.filter(isJobOpen);

export const getJobBySlug = (slug) => jobs.find((job) => job.slug === slug && isJobOpen(job)) ?? null;

const uniqueSorted = (values) => [...new Set(values)].sort((a, b) => a.localeCompare(b));

export const getFilterOptions = () => {
  const open = getOpenJobs();
  return {
    departments: uniqueSorted(open.map((j) => j.department)),
    locations: uniqueSorted(open.map((j) => j.location)),
    experiences: uniqueSorted(open.map((j) => j.experience)),
    employmentTypes: uniqueSorted(open.map((j) => j.employmentType)),
  };
};

export const formatJobDate = (isoDate) =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
