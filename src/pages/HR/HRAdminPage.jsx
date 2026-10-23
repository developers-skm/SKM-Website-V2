import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SEO from '../../components/SEO/SEO';
import SkmLogo from '../../assets/LOGO/Skm-Logo-1536x332.png';
import { careerDepartments } from '../../data/careersContent';

// Private HR portal (/newhr). Not linked from any navigation and noindex'd.
// Security is enforced by the server: the session lives in an httpOnly cookie
// issued by POST /api/v1/hr/login, and every HR endpoint checks it.
const API_URL = import.meta.env.VITE_API_URL || '';
const HR_API = `${API_URL}/api/v1/hr`;

async function hrFetch(path, options = {}) {
  const res = await fetch(`${HR_API}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.message || 'Something went wrong.'), { status: res.status });
  return data;
}

const NAV = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'jobs', label: 'Job Openings' },
  { id: 'form', label: 'Add New Opening' },
];

// Privacy: sign out after 10 minutes without activity, warning at 9 minutes.
const IDLE_LIMIT_MS = 10 * 60 * 1000;
const IDLE_WARN_MS = 9 * 60 * 1000;
const ACTIVITY_EVENTS = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];

// The last-activity time is kept in localStorage so the countdown keeps running
// when HR visits another page or tab and comes back (it does not restart at 10:00).
const ACTIVITY_KEY = 'skm_hr_last_activity';
const readActivity = () => {
  try {
    const v = Number(localStorage.getItem(ACTIVITY_KEY));
    return Number.isFinite(v) && v > 0 ? v : null;
  } catch { return null; }
};
const writeActivity = (t) => { try { localStorage.setItem(ACTIVITY_KEY, String(t)); } catch { /* storage blocked */ } };
const clearActivity = () => { try { localStorage.removeItem(ACTIVITY_KEY); } catch { /* storage blocked */ } };

const JOB_TYPES = ['Full Time', 'Part Time', 'Contract', 'Internship'];
const STATUS_LABEL = { active: 'Active', draft: 'Draft', closed: 'Closed' };
const STATUS_STYLE = {
  active: 'bg-emerald-50 text-emerald-700',
  draft: 'bg-amber-50 text-amber-700',
  closed: 'bg-surface-100 text-surface-600',
};

const inputClass =
  'w-full min-h-[44px] px-4 py-2.5 rounded-[10px] border border-surface-300 bg-white font-body text-[14.5px] text-heading focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20';
const btnPrimary =
  'min-h-[44px] px-6 rounded-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-heading font-bold text-[12.5px] uppercase tracking-[0.04em] border-none cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2';
const btnOutline =
  'min-h-[44px] px-6 rounded-full border border-brand-600 bg-white text-brand-600 hover:bg-brand-600/5 disabled:opacity-60 font-heading font-bold text-[12.5px] uppercase tracking-[0.04em] cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2';

/* ───────────────────────────── Login ───────────────────────────── */

function LoginView({ onLoggedIn, notice }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const { user } = await hrFetch('/login', { method: 'POST', body: JSON.stringify({ username, password }) });
      onLoggedIn(user);
    } catch (err) {
      setError(err.message);
      setPassword('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-page px-4 py-10">
      <form
        onSubmit={submit}
        className="w-full max-w-[420px] bg-white rounded-[20px] border border-[#eee] shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-8 sm:p-10 flex flex-col gap-5"
      >
        <img src={SkmLogo} alt="SKM Egg Products" className="h-[44px] w-auto self-center" />
        <div className="text-center flex flex-col gap-1">
          <h1 className="font-heading font-bold text-[24px] text-heading m-0">HR Administration Portal</h1>
          <p className="font-body text-[14px] text-surface-500 m-0">Authorised HR staff only</p>
        </div>

        <label className="flex flex-col gap-1.5 font-body text-[13px] font-semibold text-heading">
          Username
          <input className={inputClass} type="text" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
        </label>
        <label className="flex flex-col gap-1.5 font-body text-[13px] font-semibold text-heading">
          Password
          <span className="relative block">
            <input
              className={`${inputClass} pr-12`}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-transparent border-none cursor-pointer text-surface-500 hover:text-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
                {showPassword && <path d="M3 3l18 18" />}
              </svg>
            </button>
          </span>
        </label>

        {notice && !error && (
          <p role="status" className="m-0 px-4 py-3 rounded-[10px] bg-amber-50 text-amber-800 font-body text-[13.5px] leading-[1.5]">
            {notice}
          </p>
        )}
        {error && (
          <p role="alert" className="m-0 px-4 py-3 rounded-[10px] bg-brand-600/10 text-brand-700 font-body text-[13.5px]">
            {error}
          </p>
        )}

        <button type="submit" disabled={busy} className={btnPrimary}>
          {busy ? 'Signing in…' : 'Login'}
        </button>
      </form>
    </div>
  );
}

/* ─────────────────────────── Job form ─────────────────────────── */

const emptyForm = {
  title: '', department: '', vacancies: '1', location: 'Erode, Tamil Nadu', employmentType: 'Full Time',
  experienceMin: '', experienceMax: '', salaryMin: '', salaryMax: '', salaryNegotiable: false, showSalary: true,
  qualification: '', summary: '', responsibilities: '', requirements: '', skills: '', benefits: '',
  closingDate: '', applyContact: '', status: 'draft',
};

const fromJob = (job) => ({
  ...emptyForm,
  ...Object.fromEntries(
    Object.entries(job).map(([k, v]) => [k, v === null || v === undefined ? '' : v])
  ),
  vacancies: String(job.vacancies ?? 1),
  responsibilities: (job.responsibilities || []).join('\n'),
  requirements: (job.requirements || []).join('\n'),
  skills: (job.skills || []).join('\n'),
  benefits: (job.benefits || []).join('\n'),
});

// Mirrors the server rules so HR gets instant feedback; the server re-checks everything.
function validate(form, status) {
  if (!form.title.trim()) return 'Job title is required.';
  const n = (v) => (v === '' ? null : Number(v));
  const vac = Number(form.vacancies);
  if (!Number.isInteger(vac) || vac < 1) return 'Vacancies must be a whole number of at least 1.';
  const [eMin, eMax, sMin, sMax] = [n(form.experienceMin), n(form.experienceMax), n(form.salaryMin), n(form.salaryMax)];
  if ([eMin, eMax, sMin, sMax].some((v) => v !== null && (!Number.isFinite(v) || v < 0))) return 'Numbers must be zero or greater.';
  if (eMin !== null && eMax !== null && eMin > eMax) return 'Minimum experience cannot be greater than maximum experience.';
  if (sMin !== null && sMax !== null && sMin > sMax) return 'Minimum salary cannot be greater than maximum salary.';
  if (status !== 'draft') {
    if (!form.department) return 'Department is required to publish an opening.';
    if (!form.location.trim()) return 'Job location is required to publish an opening.';
    if (eMin === null) return 'Minimum experience is required to publish an opening.';
    if (!form.salaryNegotiable && (sMin === null || sMax === null)) return 'Enter the salary range, or mark the salary as negotiable.';
    if (!form.qualification.trim()) return 'Qualification is required to publish an opening.';
    if (!form.summary.trim()) return 'Job description is required to publish an opening.';
  }
  return '';
}

function Field({ label, hint, children, className = '' }) {
  return (
    <label className={`flex flex-col gap-1.5 font-body text-[13px] font-semibold text-heading ${className}`}>
      {label}
      {children}
      {hint && <span className="font-normal text-[12px] text-surface-500">{hint}</span>}
    </label>
  );
}

function JobForm({ job, onSaved, onCancel, registerAutosave }) {
  const [form, setForm] = useState(() => (job ? fromJob(job) : emptyForm));
  const formRef = useRef(form);
  const initialRef = useRef(JSON.stringify(form));
  useEffect(() => { formRef.current = form; }, [form]);

  // Lets the dashboard rescue unsaved edits as a draft when the session times out.
  // A new opening or an existing draft is saved as a draft. Editing an Active or
  // Closed opening saves a separate draft copy so the live posting is untouched.
  useEffect(() => {
    if (!registerAutosave) return undefined;
    registerAutosave(async () => {
      const f = formRef.current;
      if (JSON.stringify(f) === initialRef.current || !f.title.trim()) return null;
      const num = (v) => (v === '' ? null : Number(v));
      const body = { ...f, status: 'draft' };
      // An impossible range would make the server reject the draft - drop the upper bound.
      if (num(f.experienceMin) !== null && num(f.experienceMax) !== null && num(f.experienceMin) > num(f.experienceMax)) body.experienceMax = '';
      if (num(f.salaryMin) !== null && num(f.salaryMax) !== null && num(f.salaryMin) > num(f.salaryMax)) body.salaryMax = '';
      if (!Number.isInteger(Number(f.vacancies)) || Number(f.vacancies) < 1) body.vacancies = '1';
      const asCopy = Boolean(job) && job.status !== 'draft';
      if (asCopy) body.title = `${f.title.trim()} (draft copy)`;
      const payload = JSON.stringify(body);
      const { job: saved } = job && !asCopy
        ? await hrFetch(`/jobs/${job.id}`, { method: 'PUT', body: payload })
        : await hrFetch('/jobs', { method: 'POST', body: payload });
      return saved;
    });
    return () => registerAutosave(null);
  }, [registerAutosave, job]);

  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const save = async (status) => {
    const problem = validate(form, status);
    if (problem) {
      setError(problem);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setError('');
    setBusy(true);
    try {
      const body = JSON.stringify({ ...form, status });
      const { job: saved } = job
        ? await hrFetch(`/jobs/${job.id}`, { method: 'PUT', body })
        : await hrFetch('/jobs', { method: 'POST', body });
      onSaved(saved, status);
    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setBusy(false);
    }
  };

  const primaryStatus = form.status === 'closed' ? 'closed' : 'active';
  const departments = form.department && !careerDepartments.includes(form.department)
    ? [form.department, ...careerDepartments]
    : careerDepartments;

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); save(primaryStatus); }}
      className="bg-white rounded-[16px] border border-[#eee] p-6 sm:p-8 flex flex-col gap-6 max-w-[960px]"
      noValidate
    >
      {error && (
        <p role="alert" className="m-0 px-4 py-3 rounded-[10px] bg-brand-600/10 text-brand-700 font-body text-[13.5px]">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Job Title *" className="md:col-span-2">
          <input className={inputClass} value={form.title} onChange={set('title')} placeholder="e.g. Production Supervisor" />
        </Field>
        <Field label="Department *">
          <select className={inputClass} value={form.department} onChange={set('department')}>
            <option value="">Select department</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Number of Vacancies">
          <input className={inputClass} type="number" min="1" step="1" value={form.vacancies} onChange={set('vacancies')} />
        </Field>
        <Field label="Job Location *">
          <input className={inputClass} value={form.location} onChange={set('location')} />
        </Field>
        <Field label="Job Type">
          <select className={inputClass} value={form.employmentType} onChange={set('employmentType')}>
            {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Minimum Experience (years) *">
          <input className={inputClass} type="number" min="0" step="0.5" value={form.experienceMin} onChange={set('experienceMin')} />
        </Field>
        <Field label="Maximum Experience (years)">
          <input className={inputClass} type="number" min="0" step="0.5" value={form.experienceMax} onChange={set('experienceMax')} />
        </Field>
        <Field label="Minimum Salary (INR per month)">
          <input className={inputClass} type="number" min="0" step="500" value={form.salaryMin} onChange={set('salaryMin')} disabled={form.salaryNegotiable} />
        </Field>
        <Field label="Maximum Salary (INR per month)">
          <input className={inputClass} type="number" min="0" step="500" value={form.salaryMax} onChange={set('salaryMax')} disabled={form.salaryNegotiable} />
        </Field>
        <div className="md:col-span-2 flex flex-wrap gap-x-8 gap-y-3 font-body text-[14px] text-heading">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.salaryNegotiable} onChange={set('salaryNegotiable')} className="w-4 h-4 accent-brand-600" />
            Salary Negotiable
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.showSalary} onChange={set('showSalary')} className="w-4 h-4 accent-brand-600" />
            Show salary on the public Careers page
          </label>
        </div>
        <Field label="Qualification / Education *" className="md:col-span-2">
          <input className={inputClass} value={form.qualification} onChange={set('qualification')} placeholder="e.g. B.Sc / BE / Diploma" />
        </Field>
        <Field label="Job Description *" className="md:col-span-2">
          <textarea className={`${inputClass} min-h-[110px]`} value={form.summary} onChange={set('summary')} />
        </Field>
        <Field label="Roles and Responsibilities" hint="One point per line." className="md:col-span-2">
          <textarea className={`${inputClass} min-h-[120px]`} value={form.responsibilities} onChange={set('responsibilities')} />
        </Field>
        <Field label="Requirements" hint="One point per line." className="md:col-span-2">
          <textarea className={`${inputClass} min-h-[100px]`} value={form.requirements} onChange={set('requirements')} />
        </Field>
        <Field label="Required Skills" hint="One skill per line." className="md:col-span-2">
          <textarea className={`${inputClass} min-h-[90px]`} value={form.skills} onChange={set('skills')} />
        </Field>
        <Field label="Benefits" hint="One benefit per line." className="md:col-span-2">
          <textarea className={`${inputClass} min-h-[90px]`} value={form.benefits} onChange={set('benefits')} />
        </Field>
        <Field label="Application Deadline" hint="Leave empty for no deadline.">
          <input className={inputClass} type="date" value={form.closingDate} onChange={set('closingDate')} />
        </Field>
        <Field label="Application Email or Link" hint="A link opens on Apply Now; otherwise the built-in form is used.">
          <input className={inputClass} value={form.applyContact} onChange={set('applyContact')} placeholder="careers@skmegg.com or https://…" />
        </Field>
        <Field label="Job Status">
          <select className={inputClass} value={form.status} onChange={set('status')}>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </Field>
      </div>

      <div className="flex flex-wrap gap-3 pt-2 border-t border-[#eee]">
        <button type="submit" disabled={busy} className={btnPrimary}>
          {busy ? 'Saving…' : primaryStatus === 'closed' ? 'Save as Closed' : job ? 'Save & Publish' : 'Publish Opening'}
        </button>
        <button type="button" disabled={busy} onClick={() => save('draft')} className={btnOutline}>Save Draft</button>
        <button type="button" disabled={busy} onClick={onCancel} className="min-h-[44px] px-6 rounded-full border-none bg-transparent text-surface-600 hover:text-heading font-heading font-bold text-[12.5px] uppercase tracking-[0.04em] cursor-pointer">
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ────────────────────────── Jobs table ────────────────────────── */

const salaryText = (job) => {
  if (job.salaryNegotiable) return 'Negotiable';
  if (job.salaryMin == null || job.salaryMax == null || job.salaryMin === '') return '-';
  const k = (n) => (n >= 1000 ? `${Math.round(n / 100) / 10}K` : n);
  return `₹${k(job.salaryMin)}-${k(job.salaryMax)}`;
};

function JobsTable({ jobs, onEdit, onDelete, limit, filters = true }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [department, setDepartment] = useState('');

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = jobs.filter(
      (j) =>
        (!status || j.status === status) &&
        (!department || j.department === department) &&
        (!needle || [j.title, j.department, j.location].join(' ').toLowerCase().includes(needle))
    );
    return limit ? list.slice(0, limit) : list;
  }, [jobs, query, status, department, limit]);

  const departments = useMemo(() => [...new Set(jobs.map((j) => j.department).filter(Boolean))].sort(), [jobs]);

  return (
    <div className="flex flex-col gap-4">
      {filters && (
        <div className="flex flex-col sm:flex-row gap-3">
          <input className={`${inputClass} sm:max-w-[320px]`} type="search" placeholder="Search title, department, location" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search openings" />
          <select className={`${inputClass} sm:max-w-[180px]`} value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="closed">Closed</option>
          </select>
          <select className={`${inputClass} sm:max-w-[220px]`} value={department} onChange={(e) => setDepartment(e.target.value)} aria-label="Filter by department">
            <option value="">All departments</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      )}

      <div className="bg-white rounded-[16px] border border-[#eee] overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left font-body text-[14px]">
          <thead>
            <tr className="bg-surface-50 text-surface-500 text-[12px] uppercase tracking-wider">
              {['Job Title', 'Department', 'Location', 'Salary', 'Status', 'Actions'].map((h) => (
                <th key={h} className="px-5 py-3.5 font-bold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-surface-500">No openings found.</td></tr>
            )}
            {rows.map((j) => (
              <tr key={j.id} className="border-t border-[#f0f0f0]">
                <td className="px-5 py-4 font-semibold text-heading">
                  {j.title}
                  <span className="block font-normal text-[12px] text-surface-400">{j.id} · {j.vacancies} vacancy</span>
                </td>
                <td className="px-5 py-4 text-surface-600">{j.department || '-'}</td>
                <td className="px-5 py-4 text-surface-600">{j.location || '-'}</td>
                <td className="px-5 py-4 text-surface-600 whitespace-nowrap">{salaryText(j)}</td>
                <td className="px-5 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-bold ${STATUS_STYLE[j.status]}`}>{STATUS_LABEL[j.status]}</span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <button type="button" onClick={() => onEdit(j)} className="bg-transparent border-none cursor-pointer font-semibold text-brand-600 hover:underline p-0 mr-4">Edit</button>
                  <button type="button" onClick={() => onDelete(j)} className="bg-transparent border-none cursor-pointer font-semibold text-surface-500 hover:text-brand-700 hover:underline p-0">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ───────────────────────── Dashboard shell ───────────────────────── */

function Dashboard({ user, onLogout, onSessionExpired }) {
  const autosaveRef = useRef(null);
  const registerAutosave = useCallback((fn) => { autosaveRef.current = fn; }, []);
  const lastActivityRef = useRef(readActivity() ?? Date.now());
  const [idleLeft, setIdleLeft] = useState(IDLE_LIMIT_MS / 1000); // seconds until auto sign-out
  const idleRemaining = idleLeft <= (IDLE_LIMIT_MS - IDLE_WARN_MS) / 1000 ? idleLeft : null; // set once the warning shows
  const [view, setView] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [notice, setNotice] = useState('');

  const handleError = useCallback((err) => {
    if (err.status === 401) onSessionExpired();
  }, [onSessionExpired]);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const { jobs: list } = await hrFetch('/jobs');
      setJobs(list);
    } catch (err) {
      handleError(err);
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  useEffect(() => { loadJobs(); }, [loadJobs]);

  useEffect(() => {
    if (!notice) return undefined;
    const t = setTimeout(() => setNotice(''), 5000);
    return () => clearTimeout(t);
  }, [notice]);

  const counts = useMemo(() => ({
    total: jobs.length,
    active: jobs.filter((j) => j.status === 'active').length,
    draft: jobs.filter((j) => j.status === 'draft').length,
    closed: jobs.filter((j) => j.status === 'closed').length,
  }), [jobs]);

  // Sign out, first rescuing any unsaved form edits as a draft.
  const endSession = useCallback(async (reason) => {
    let saved = null;
    try { saved = await autosaveRef.current?.(); } catch { /* sign out regardless */ }
    const base = reason === 'idle' ? 'You were signed out after 10 minutes of inactivity.' : 'You have been signed out.';
    onLogout(saved ? `${base} Your unsaved changes to "${saved.title}" were saved as a draft.` : base);
  }, [onLogout]);

  // Idle timer: tracks the last activity; warns at 9 minutes, signs out at 10.
  useEffect(() => {
    let pointer = null;
    const bump = (e) => {
      // Browsers fire synthetic mousemove events when the page layout changes
      // (e.g. the countdown text updating under a resting cursor). Only real
      // movement of a few pixels counts as activity.
      if (e && e.type === 'mousemove') {
        const moved = pointer === null || Math.hypot(e.clientX - pointer.x, e.clientY - pointer.y) >= 4;
        if (moved) pointer = { x: e.clientX, y: e.clientY };
        if (!moved || e.movementX === 0 && e.movementY === 0) return;
      }
      const last = Math.max(lastActivityRef.current, readActivity() ?? 0);
      if (Date.now() - last < IDLE_WARN_MS) {
        lastActivityRef.current = Date.now();
        writeActivity(lastActivityRef.current);
      }
    };
    ACTIVITY_EVENTS.forEach((ev) => window.addEventListener(ev, bump, { passive: true }));
    const tick = setInterval(() => {
      // Activity in another HR tab counts too.
      const idle = Date.now() - Math.max(lastActivityRef.current, readActivity() ?? 0);
      if (idle >= IDLE_LIMIT_MS) {
        clearInterval(tick);
        endSession('idle');
      } else {
        setIdleLeft(Math.ceil((IDLE_LIMIT_MS - idle) / 1000));
      }
    }, 1000);
    return () => {
      clearInterval(tick);
      ACTIVITY_EVENTS.forEach((ev) => window.removeEventListener(ev, bump));
    };
  }, [endSession]);

  const resetIdle = () => {
    lastActivityRef.current = Date.now();
    writeActivity(lastActivityRef.current);
    setIdleLeft(IDLE_LIMIT_MS / 1000);
  };

  const go = (id) => {
    if (id === 'form') setEditing(null);
    setView(id);
    setMenuOpen(false);
  };
  const startEdit = (job) => { setEditing(job); setView('form'); setMenuOpen(false); };

  const onSaved = (saved, status) => {
    setNotice(
      status === 'active' ? `“${saved.title}” is published and live on the Careers page.`
        : status === 'closed' ? `“${saved.title}” was saved as closed.`
        : `“${saved.title}” was saved as a draft.`
    );
    setEditing(null);
    setView('jobs');
    loadJobs();
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await hrFetch(`/jobs/${toDelete.id}`, { method: 'DELETE' });
      setNotice(`“${toDelete.title}” was deleted.`);
      setToDelete(null);
      loadJobs();
    } catch (err) {
      handleError(err);
      setNotice(err.message);
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const title = view === 'form' ? (editing ? 'Edit Opening' : 'Add New Opening') : NAV.find((n) => n.id === view).label;
  const activeNav = view;

  const navButton = (active) =>
    `w-full text-left px-4 py-3 rounded-[10px] font-body text-[15px] font-semibold border-none cursor-pointer transition-colors duration-200 ${
      active ? 'bg-brand-600 text-white' : 'bg-transparent text-heading hover:bg-surface-100'
    }`;

  const cards = [
    ['Total Job Openings', counts.total],
    ['Active Openings', counts.active],
    ['Draft Openings', counts.draft],
    ['Closed Openings', counts.closed],
  ];

  return (
    <div className="min-h-screen w-full bg-page lg:flex">
      <div className="lg:hidden flex items-center justify-between px-4 h-[60px] bg-white border-b border-[#eee]">
        <img src={SkmLogo} alt="SKM Egg Products" className="h-[30px] w-auto" />
        <button type="button" onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen} aria-label="Toggle menu" className="px-4 py-2 rounded-full border border-surface-300 bg-white font-body text-[13px] font-semibold cursor-pointer">
          Menu
        </button>
      </div>

      <aside className={`${menuOpen ? 'flex' : 'hidden'} lg:flex flex-col gap-2 w-full lg:w-[260px] lg:min-h-screen flex-shrink-0 bg-white border-r border-[#eee] p-5`}>
        <img src={SkmLogo} alt="SKM Egg Products" className="hidden lg:block h-[36px] w-auto self-start mb-6" />
        <p className="hidden lg:block m-0 mb-2 px-1 font-body text-[11px] font-bold uppercase tracking-wider text-surface-400">HR Portal</p>
        {NAV.map((n) => (
          <button key={n.id} type="button" onClick={() => go(n.id)} className={navButton(activeNav === n.id)}>{n.label}</button>
        ))}
        <div className="lg:mt-auto pt-4 border-t border-[#eee] flex flex-col gap-2">
          <p className="m-0 px-1 font-body text-[12px] text-surface-500 truncate" title={user.username}>Signed in as {user.username}</p>
          <p className="m-0 px-1 font-body text-[12px] text-surface-500 tabular-nums" aria-live="off">
            Auto logout in{" "}
            <span className={idleLeft <= 60 ? "font-bold text-brand-600" : "font-semibold text-heading"}>
              {Math.floor(idleLeft / 60)}:{String(idleLeft % 60).padStart(2, "0")}
            </span>
          </p>
          <button type="button" onClick={() => onLogout()} className={navButton(false)}>Logout</button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-5 sm:p-8 lg:p-10 flex flex-col gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading font-bold text-[26px] sm:text-[30px] text-heading m-0">{title}</h1>
            <p className="font-body text-[14px] text-surface-500 m-0">Manage the openings shown on the public Careers page.</p>
          </div>
          {view !== 'form' && (
            <button type="button" onClick={() => go('form')} className={btnPrimary}>+ Add New Opening</button>
          )}
        </header>

        {notice && (
          <p role="status" className="m-0 px-4 py-3 rounded-[10px] bg-emerald-50 text-emerald-800 font-body text-[14px]">{notice}</p>
        )}
        {loadError && (
          <p role="alert" className="m-0 px-4 py-3 rounded-[10px] bg-brand-600/10 text-brand-700 font-body text-[14px]">
            {loadError} <button type="button" onClick={loadJobs} className="underline bg-transparent border-none cursor-pointer text-brand-700 font-semibold">Retry</button>
          </p>
        )}

        {view === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {cards.map(([label, value]) => (
                <div key={label} className="bg-white rounded-[16px] border border-[#eee] p-6 flex flex-col gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <span className="font-body text-[12px] font-bold uppercase tracking-wider text-surface-400">{label}</span>
                  <span className="font-heading font-black text-[34px] text-brand-600 leading-none">{loading ? '…' : value}</span>
                </div>
              ))}
            </div>
            <h2 className="font-heading font-bold text-[20px] text-heading m-0">Recent openings</h2>
            {loading ? <p className="font-body text-surface-500 m-0">Loading openings…</p> : (
              <JobsTable jobs={jobs} onEdit={startEdit} onDelete={setToDelete} limit={5} filters={false} />
            )}
          </>
        )}

        {view === 'jobs' && (loading ? <p className="font-body text-surface-500 m-0">Loading openings…</p> : (
          <JobsTable jobs={jobs} onEdit={startEdit} onDelete={setToDelete} />
        ))}

        {view === 'form' && (
          <JobForm key={editing ? editing.id : 'new'} job={editing} registerAutosave={registerAutosave} onSaved={onSaved} onCancel={() => { setEditing(null); setView('jobs'); }} />
        )}
      </main>

      {idleRemaining !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4" role="alertdialog" aria-modal="true" aria-labelledby="idle-title" aria-describedby="idle-desc">
          <div className="w-full max-w-[420px] bg-white rounded-[16px] p-7 flex flex-col gap-4 text-center">
            <h2 id="idle-title" className="font-heading font-bold text-[20px] text-heading m-0">Are you still there?</h2>
            <p id="idle-desc" className="font-body text-[14.5px] text-surface-600 leading-[1.6] m-0">
              For privacy you will be signed out automatically in
            </p>
            <p className="font-heading font-black text-[40px] text-brand-600 leading-none m-0 tabular-nums" aria-live="polite">
              {Math.floor(idleRemaining / 60)}:{String(idleRemaining % 60).padStart(2, '0')}
            </p>
            <p className="font-body text-[13px] text-surface-500 m-0">Any unsaved changes will be saved as a draft.</p>
            <div className="flex gap-3 justify-center pt-1">
              <button type="button" onClick={resetIdle} className={btnPrimary} autoFocus>Reset</button>
              <button type="button" onClick={() => endSession('done')} className={btnOutline}>Done</button>
            </div>
          </div>
        </div>
      )}

      {toDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true" aria-labelledby="delete-title">
          <div className="w-full max-w-[420px] bg-white rounded-[16px] p-7 flex flex-col gap-4">
            <h2 id="delete-title" className="font-heading font-bold text-[20px] text-heading m-0">Delete this opening?</h2>
            <p className="font-body text-[14.5px] text-surface-600 leading-[1.6] m-0">
              “{toDelete.title}” will be permanently removed and will disappear from the Careers page. This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setToDelete(null)} disabled={deleting} className={btnOutline}>Cancel</button>
              <button type="button" onClick={confirmDelete} disabled={deleting} className={btnPrimary}>{deleting ? 'Deleting…' : 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────── Page ───────────────────────────── */

export default function HRAdminPage() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [notice, setNotice] = useState('');

  const logout = useCallback(async (message = '') => {
    try {
      await hrFetch('/logout', { method: 'POST' });
    } finally {
      clearActivity();
      setNotice(typeof message === 'string' ? message : '');
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    hrFetch('/me')
      .then(async ({ user: u }) => {
        if (cancelled) return;
        // Coming back after the idle limit passed (even while away from this page): sign out.
        const last = readActivity();
        if (last && Date.now() - last >= IDLE_LIMIT_MS) {
          await logout('You were signed out after 10 minutes of inactivity.');
        } else {
          if (!last) writeActivity(Date.now());
          setUser(u);
        }
      })
      .catch(() => {})
      .finally(() => !cancelled && setChecking(false));
    return () => { cancelled = true; };
  }, [logout]);

  return (
    <>
      <SEO title="HR Administration Portal" noindex />
      {checking ? (
        <div className="min-h-screen w-full bg-page" aria-busy="true" />
      ) : user ? (
        <Dashboard user={user} onLogout={logout} onSessionExpired={() => { setNotice('Your session has expired. Please sign in again.'); setUser(null); }} />
      ) : (
        <LoginView notice={notice} onLoggedIn={(u) => { setNotice(''); writeActivity(Date.now()); setUser(u); }} />
      )}
    </>
  );
}
