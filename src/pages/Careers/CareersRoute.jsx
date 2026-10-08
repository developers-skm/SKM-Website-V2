import { MotionConfig } from 'framer-motion';
import CareersPage from './CareersPage';
import JobsPage from './JobsPage';
import JobDetailPage from './JobDetailPage';
import ApplyPage from './ApplyPage';
import NotFound from '../NotFound/NotFound';

// The app's router (App.jsx) is a flat `activePage` string, so nested Careers
// URLs arrive as "careers/jobs/maintenance-engineer" etc. and are resolved here.
//   careers                 → landing
//   careers/jobs            → full openings list
//   careers/jobs/:slug      → job details
//   careers/apply/:slug     → application for a vacancy
function resolve({ path, onPageChange, prefill }) {
  const [, section, slug] = path.replace(/\/+$/, '').split('/');
  // `key` resets form/filter state when moving between different jobs.
  const key = path;

  if (!section) return <CareersPage key={key} onPageChange={onPageChange} />;
  if (section === 'jobs' && !slug) return <JobsPage key={key} onPageChange={onPageChange} prefill={prefill} />;
  if (section === 'jobs') return <JobDetailPage key={key} slug={slug} onPageChange={onPageChange} />;
  if (section === 'apply' && slug) return <ApplyPage key={key} slug={slug} onPageChange={onPageChange} />;
  return <NotFound onPageChange={onPageChange} />;
}

// reducedMotion="user" makes every Careers framer-motion animation respect prefers-reduced-motion.
export default function CareersRoute(props) {
  return <MotionConfig reducedMotion="user">{resolve(props)}</MotionConfig>;
}
