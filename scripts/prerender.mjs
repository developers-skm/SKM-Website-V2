// Build-time prerendering for SEO. Runs after `vite build` (see package.json's
// "build" script). Visits every URL listed in public/sitemap.xml against a
// local preview of the freshly built dist/, captures the fully-rendered HTML
// (title/meta/canonical/JSON-LD injected client-side by react-helmet-async —
// see src/components/SEO/SEO.jsx), and writes it to dist/<route>/index.html.
//
// This does NOT change how the app behaves for real visitors — main.jsx uses
// createRoot().render() (not hydrateRoot), so the client bundle simply
// re-renders on top of this prerendered HTML once it loads. Only the first
// raw HTML byte served for a fresh/direct load of each URL changes, which is
// what search engines and non-JS link-preview bots actually see.
import { preview } from 'vite';
import { chromium } from 'playwright';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const distDir = path.join(rootDir, 'dist');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');

async function getRoutesFromSitemap() {
  const xml = await readFile(sitemapPath, 'utf-8');
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
  return locs.map((loc) => new URL(loc).pathname);
}

function outputPathFor(route) {
  if (route === '/' || route === '') {
    return path.join(distDir, 'index.html');
  }
  return path.join(distDir, route.replace(/^\//, ''), 'index.html');
}

// Jump to the bottom and back so every Framer Motion `whileInView` section
// (most sections on this site) fires its IntersectionObserver before we
// capture the DOM — otherwise below-the-fold content gets frozen mid-animation
// (opacity: 0) in the static snapshot.
async function triggerInViewAnimations(page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
}

async function main() {
  const routes = await getRoutesFromSitemap();
  console.log(`Prerendering ${routes.length} routes from public/sitemap.xml...`);

  const server = await preview({
    root: rootDir,
    preview: { port: 4319, strictPort: true },
  });
  const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Capture everything into memory first, write to disk only after the loop
  // finishes. Critical: the preview server falls back to dist/index.html for
  // every unmatched route. If we wrote each route's output to disk as we
  // went, the very first route (`/`, home) would overwrite dist/index.html
  // with home's fully-rendered snapshot — and every subsequent route would
  // then be served THAT as its fallback shell instead of the pristine build
  // output, stacking home's Helmet tags underneath its own on every other
  // page. Deferring all writes keeps the fallback shell untouched throughout.
  const captured = [];
  const failures = [];

  try {
    for (const route of routes) {
      const url = `${baseUrl}${route}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        await triggerInViewAnimations(page);
        const html = await page.content();
        captured.push({ route, html });
        console.log(`  captured  ${route || '/'}`);
      } catch (err) {
        failures.push({ route, error: err.message });
        console.error(`  FAIL      ${route || '/'} — ${err.message}`);
      }
    }
  } finally {
    await page.close();
    await browser.close();
    await server.close();
  }

  for (const { route, html } of captured) {
    const outPath = outputPathFor(route);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf-8');
  }

  if (failures.length > 0) {
    console.error(`\nPrerender finished with ${failures.length} failure(s).`);
    process.exitCode = 1;
  } else {
    console.log(`\nPrerendered all ${routes.length} routes successfully.`);
  }
}

main().catch((err) => {
  console.error('Prerender script crashed:', err);
  process.exitCode = 1;
});
