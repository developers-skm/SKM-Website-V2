const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Job openings storage. Everything that touches persistence lives in this
// file behind five async functions (list / get / create / update / remove), so
// moving to a real database later means re-implementing only these.
//
// Current backend: a JSON file (backend/data/jobs.json, or HR_DATA_DIR). It is
// seeded on first run from src/data/jobs.seed.json. This needs a server with a
// persistent disk - it will NOT persist on Vercel's serverless filesystem.

const DATA_DIR = process.env.HR_DATA_DIR || path.join(__dirname, '..', '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'jobs.json');
const SEED_FILE = path.join(__dirname, '..', 'data', 'jobs.seed.json');

let cache = null;
let writeChain = Promise.resolve();

function load() {
  if (cache) return cache;
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const seed = fs.existsSync(SEED_FILE) ? fs.readFileSync(SEED_FILE, 'utf8') : '[]';
    fs.writeFileSync(DATA_FILE, seed);
  }
  cache = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  return cache;
}

// Serialised, atomic write (temp file + rename) so a crash never corrupts the file.
function persist() {
  const snapshot = JSON.stringify(cache, null, 2);
  writeChain = writeChain.then(() => {
    const tmp = `${DATA_FILE}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, snapshot);
    fs.renameSync(tmp, DATA_FILE);
  });
  return writeChain;
}

const slugify = (text) =>
  String(text).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'job';

function uniqueSlug(title, exceptId) {
  const base = slugify(title);
  const taken = new Set(load().filter((j) => j.id !== exceptId).map((j) => j.slug));
  let slug = base;
  for (let n = 2; taken.has(slug); n += 1) slug = `${base}-${n}`;
  return slug;
}

async function list() {
  return load().map((j) => ({ ...j }));
}

async function get(id) {
  const job = load().find((j) => j.id === id);
  return job ? { ...job } : null;
}

async function create(data) {
  const now = new Date().toISOString();
  const job = {
    ...data,
    id: `SKM-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
    slug: uniqueSlug(data.title),
    postedDate: now.slice(0, 10),
    updatedAt: now,
  };
  load().unshift(job);
  await persist();
  return { ...job };
}

async function update(id, data) {
  const jobs = load();
  const index = jobs.findIndex((j) => j.id === id);
  if (index === -1) return null;
  const prev = jobs[index];
  const job = {
    ...prev,
    ...data,
    id: prev.id,
    slug: data.title && data.title !== prev.title ? uniqueSlug(data.title, id) : prev.slug,
    postedDate: prev.postedDate,
    updatedAt: new Date().toISOString(),
  };
  jobs[index] = job;
  await persist();
  return { ...job };
}

async function remove(id) {
  const jobs = load();
  const index = jobs.findIndex((j) => j.id === id);
  if (index === -1) return false;
  jobs.splice(index, 1);
  await persist();
  return true;
}

module.exports = { list, get, create, update, remove };
