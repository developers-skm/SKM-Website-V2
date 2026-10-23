// Validation and public/derived views of a job opening.

const EMPLOYMENT_TYPES = ['Full Time', 'Part Time', 'Contract', 'Internship'];
const STATUSES = ['draft', 'active', 'closed'];

const text = (v) => (typeof v === 'string' ? v.trim() : '');
const lines = (v) => {
  const arr = Array.isArray(v) ? v : String(v || '').split('\n');
  return arr.map((s) => String(s).trim()).filter(Boolean);
};
const num = (v) => (v === '' || v === null || v === undefined ? null : Number(v));

// Returns { data } or { error }. A draft only needs a title; anything that is
// (or becomes) active/closed must be a complete, valid opening.
function validateJob(input) {
  const status = STATUSES.includes(input.status) ? input.status : 'draft';
  const data = {
    title: text(input.title),
    department: text(input.department),
    vacancies: num(input.vacancies) ?? 1,
    location: text(input.location),
    employmentType: text(input.employmentType) || 'Full Time',
    experienceMin: num(input.experienceMin),
    experienceMax: num(input.experienceMax),
    salaryMin: num(input.salaryMin),
    salaryMax: num(input.salaryMax),
    salaryNegotiable: Boolean(input.salaryNegotiable),
    showSalary: Boolean(input.showSalary),
    qualification: text(input.qualification),
    summary: text(input.summary),
    responsibilities: lines(input.responsibilities),
    requirements: lines(input.requirements),
    skills: lines(input.skills),
    benefits: lines(input.benefits),
    closingDate: text(input.closingDate),
    applyContact: text(input.applyContact),
    status,
  };

  if (!data.title) return { error: 'Job title is required.' };
  if (!EMPLOYMENT_TYPES.includes(data.employmentType)) return { error: 'Choose a valid job type.' };

  const numbers = ['vacancies', 'experienceMin', 'experienceMax', 'salaryMin', 'salaryMax'];
  for (const key of numbers) {
    if (data[key] !== null && (!Number.isFinite(data[key]) || data[key] < 0)) {
      return { error: 'Numbers must be zero or greater.' };
    }
  }
  if (!Number.isInteger(data.vacancies) || data.vacancies < 1) return { error: 'Vacancies must be a whole number of at least 1.' };
  if (data.experienceMin !== null && data.experienceMax !== null && data.experienceMin > data.experienceMax) {
    return { error: 'Minimum experience cannot be greater than maximum experience.' };
  }
  if (data.salaryMin !== null && data.salaryMax !== null && data.salaryMin > data.salaryMax) {
    return { error: 'Minimum salary cannot be greater than maximum salary.' };
  }
  if (data.closingDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.closingDate)) return { error: 'Application deadline must be a valid date.' };
  if (data.applyContact && !/^https?:\/\/\S+$/i.test(data.applyContact) && !/^\S+@\S+\.\S+$/.test(data.applyContact)) {
    return { error: 'Application contact must be an email address or a link starting with http(s)://.' };
  }

  if (status !== 'draft') {
    const required = [
      ['department', 'Department'], ['location', 'Job location'], ['qualification', 'Qualification'],
      ['summary', 'Job description'],
    ];
    for (const [key, label] of required) {
      if (!data[key]) return { error: `${label} is required to publish an opening.` };
    }
    if (data.experienceMin === null) return { error: 'Minimum experience is required to publish an opening.' };
    if (!data.salaryNegotiable && (data.salaryMin === null || data.salaryMax === null)) {
      return { error: 'Enter the salary range, or mark the salary as negotiable.' };
    }
  }
  return { data };
}

function experienceLabel(job) {
  const { experienceMin: min, experienceMax: max } = job;
  if (min === null || min === undefined) return 'Not specified';
  if (min === 0 && (max === 0 || max === null || max === undefined)) return 'Freshers';
  if (max === null || max === undefined) return `${min}+ Years`;
  return min === max ? `${min} Years` : `${min}-${max} Years`;
}

function salaryLabel(job) {
  if (!job.showSalary) return null;
  if (job.salaryNegotiable) return 'Negotiable';
  if (job.salaryMin === null || job.salaryMax === null) return null;
  const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
  return `${fmt(job.salaryMin)} - ${fmt(job.salaryMax)} per month`;
}

const today = () => new Date().toISOString().slice(0, 10);
const isPublic = (job) => job.status === 'active' && (!job.closingDate || job.closingDate >= today());

// Only what visitors may see: active jobs, no internal fields.
function toPublic(job) {
  return {
    id: job.id,
    slug: job.slug,
    title: job.title,
    department: job.department,
    location: job.location,
    employmentType: job.employmentType,
    experience: experienceLabel(job),
    salary: salaryLabel(job),
    vacancies: job.vacancies,
    qualification: job.qualification,
    summary: job.summary,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    skills: job.skills,
    benefits: job.benefits || [],
    postedDate: job.postedDate,
    closingDate: job.closingDate || '',
    applyLink: /^https?:\/\//i.test(job.applyContact || '') ? job.applyContact : '',
    active: true,
  };
}

module.exports = { validateJob, toPublic, isPublic, EMPLOYMENT_TYPES, STATUSES };
