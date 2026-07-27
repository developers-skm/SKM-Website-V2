# SKM Website V4 — Cleanup & Production-Readiness Plan

_Generated 2026-07-27. Scope: frontend only (React 19 + Vite 8 + Tailwind 4 SPA, ~90 routes, no backend). Based on a full-codebase audit (dead code, structural uniformity, duplication, production-readiness). All findings below were verified against the actual source (grep/read), not assumed._

**How to use this doc:** work top to bottom. Phase 0–1 are safe, mechanical, low-risk and should land first. Phase 2 is component extraction (medium risk, needs visual QA). Phase 3 is hardening. Phase 4 is one big architectural call (routing) that should be a deliberate decision, not a side-effect of a cleanup pass — read its trade-offs before committing to it.

---

## Phase 0 — Delete dead code (no behavior change, do first)

These files have **zero importers** anywhere in `src/` — confirmed via grep, not guessed. Deleting them is safe.

- [ ] `src/components/Breadcrumb/Breadcrumb.jsx` — removed from all call sites in commit `c50fbc8`, now fully orphaned (134 lines).
- [ ] `src/components/ComingSoon.jsx` — unused; `Investors.jsx:723` has its own local `ComingSoonContent` instead.
- [ ] `src/components/SectionContainer/SectionContainer.jsx` and `src/components/SectionContainer/PageContent.jsx` — never imported anywhere (only `CurvedDivider.jsx` in that folder is actually used). See Phase 2.2 — these were clearly *meant* to be the shared container but the codebase never adopted them.
- [ ] `src/components/Navbar/NavDropdown.jsx` — unused; only mentioned in a comment.
- [ ] `src/pages/AboutUs/sections/AboutHero.jsx` — unused (not imported by `AboutSKMPage.jsx`).
- [ ] `src/pages/AboutUs/sections/FuturePreviews.jsx` — unused.
- [ ] `src/pages/Home/sections/OurProducts.jsx` — unused (superseded by `ProductFamilies.jsx`).
- [ ] `src/pages/Home/sections/TrustBar.jsx` — unused (`Home.jsx` never renders it). Note: this is the **only** consumer of `src/utils/useCountUp.js` — decide in Phase 2.3 whether to revive the count-up pattern via the new `StatCard` or delete the hook too.
- [ ] `src/pages/Quality/sections/QualityHero.jsx` — unused.
- [ ] `src/pages/GetQuote/steps/StepContact.jsx`, `StepDestination.jsx`, `StepProduct.jsx`, `StepQuantity.jsx` — 4 of the 8 files in `GetQuote/steps/` are leftovers from an earlier wizard design. `GetQuotePage.jsx:4-7` only imports `StepRequirement`, `StepCommercialDetails`, `StepContactDetails`, `StepReview`. Verify no in-progress work depends on these before deleting.

**Also remove:**
- [ ] `@emailjs/browser` from `package.json` — listed as a dependency but never imported anywhere in `src/`. Dead weight in `node_modules`/install time.
- [ ] `__q2.cjs` (repo root) — a leftover Playwright scratch script from a prior debugging session; paths inside it point to an unrelated temp scratchpad. Not referenced by anything.
- [ ] Confirm `knowledge.json` (repo root) — it's a retrieval corpus for the external chatbot worker (`chatbot-worker.meowlovessyou.workers.dev`, wired via `src/api/chatApi.js`), not consumed by the frontend build. Keep if the chatbot still needs it, but consider moving it out of the repo root (e.g. into `scripts/` or the worker's own repo) since it's not app source.

## Phase 1 — Fix dead/no-op props and small correctness bugs

- [ ] **`breadcrumbItems` is a no-op prop.** `PageWrapper.jsx:4` and `ProductPage.jsx:23` both destructure `breadcrumbItems` but never use it (leftover from the breadcrumb removal). **44 page files** still pass it in, silently discarded. Remove the prop from the two shell components' signatures and strip `breadcrumbItems={...}` from all 44 call sites (mechanical find/replace).
- [ ] **`onBackHome` is dropped at ~17 of ~20 call sites.** `App.jsx` passes `onBackHome={navigateToHome}` to ~20 pages (all 8 About Us subpages, 8 of 11 Product detail pages, 5 Quality subpages) but only 3 components actually use it (`CustomizedPackagesPage.jsx`, `EggWhiteCubePage.jsx`, `SpecialityEggLiquidPage.jsx`, via `ComingSoon` — which is now itself dead, Phase 0). Decide: either wire a real "back" affordance into the ~17 pages that silently ignore it, or stop passing the prop from `App.jsx` for pages that don't use it.
- [ ] **`NotFound.jsx` has no `<SEO>` / meta tags at all** — the 404 page inherits whatever `<title>`/meta was last set by the previous page. Add an `SEO` block with `noindex`.
- [ ] **Soft-404s are indexable.** `vercel.json`'s catch-all rewrite (`"source": "/(.*)"` → `/index.html`) means unknown URLs return HTTP 200. Combined with the missing `NotFound` SEO tag above, typo'd/legacy URLs can get indexed as low-quality duplicate pages. Fix together with the item above.
- [ ] **`submitQuote.js` doesn't submit anywhere.** `src/pages/GetQuote/submitQuote.js:8-18` — the real `fetch()` call is commented out; it currently just resolves via `setTimeout` after a fake delay. Confirm this is intentional pre-launch scaffolding and track it as a **known blocker** before go-live (the Get Quote flow currently has no working backend target — out of scope for this frontend-only pass, but must not be forgotten).
- [ ] Replace `alert('Please fill in Name, Email, and Company.')` in `src/pages/AboutUs/EventsPage.jsx:248` with the same inline-error UI pattern used elsewhere (`GetQuotePage.jsx`, `EnquiryModal.jsx`).
- [ ] `src/components/ImageSlider/ImageSlider.jsx:33` exposes an `onImageClick` prop that no caller (`PoultryFarm.jsx`, `EggProcessingPlant.jsx`, `Laboratory.jsx`, `EventsPage.jsx`) ever passes — `yet-another-react-lightbox` is a dependency but is **never imported anywhere in `src/`**. Either wire it up for click-to-enlarge galleries (it's already installed) or drop the prop and the dependency.

## Phase 2 — Extract shared components (fixes both "duplicate code" and "page uniformity")

These are the biggest wins for consistency. Each item lists the files to merge and where the new component should live.

- [ ] **`<SectionHero>`** — merges 3 byte-identical hero blocks: `AboutHero.jsx`, `QualityHero.jsx`, `ContactHero.jsx` (badge + heading + subtitle + identical gradient-glow background + identical local `containerVariants`/`itemVariants`). Note: `AboutHero`/`QualityHero` are already dead (Phase 0) — extracting this component is really about giving `ContactHero.jsx` and any *new* section pages a shared implementation instead of the pattern recurring a 4th time. Place in `src/components/common/SectionHero.jsx`.
- [ ] **`<ImageHero>`** — merges `Applications/sections/ApplicationHero.jsx` and `ApplicationDetailHero.jsx` (full-bleed image + gradient overlay + identical primary/secondary CTA button classNames). Props: `image, alt, eyebrow, title, subtitle, primaryCta, secondaryCta`.
- [ ] **`<IconInfoCard>` / `<IconInfoCardGrid>`** — byte-identical card markup (icon chip + title + body) duplicated across `Infra/sections/{PoultryFarm,FeedMill,EggProcessingPlant,Laboratory}.jsx`, `Quality/sections/QualityAssurance.jsx` (used twice), `CSR/{SustainabilityPage,TrustOutreachPage,EducationPage}.jsx` — 8 files total share the icon-chip style, 5 share the full card. Place in `src/components/common/`.
- [ ] **`<StatCard>` / `<StatGrid>`** — byte-identical "big number + label" card in `Infra/sections/{PoultryFarm,EggProcessingPlant,FeedMill,Laboratory}.jsx` (4 files, static numbers). Wire `src/utils/useCountUp.js` into it (currently only used by the now-dead `TrustBar.jsx`) so all stat grids animate consistently — either always-on or via an `animated` prop.
- [ ] **Merge `FinalEnquiryCTA` and `ApplicationFinalCTA`** — `src/components/ProductPage/FinalEnquiryCTA.jsx` and `src/pages/Applications/sections/ApplicationFinalCTA.jsx` are near-identical (same background, container, button classes). Consolidate into one `<EnquiryCTABand eyebrow heading primaryLabel onPrimary secondaryLabel? onSecondary? />` in `src/components/`. (`Home/sections/FinalEnquiry.jsx` is a genuinely different richer design — leave it alone.)
- [ ] **De-duplicate `Field`/`inputClass`/`selectClass`.** `src/pages/GetQuote/FormField.jsx` and `src/pages/ContactUs/sections/EnquiryModal.jsx:17-44` independently define the identical form-field component. Move it to `src/components/common/FormField.jsx` and import from both features.
- [ ] **Switch ~30 files from inline animation variants to the shared util.** `src/utils/animationVariants.js` exports `containerVariants`/`itemVariants`, but ~30 files redeclare near-identical versions locally (only stagger/stiffness numbers differ) vs. 11 files that already import it correctly. Mechanical pass: import the shared versions everywhere; if a couple of files need genuinely different timing, add named variant presets to the util rather than re-inlining.
- [ ] **Adopt `<PageContent>` (Phase 0 flagged it dead) as the real shared container**, replacing the 64 files that hand-roll `mx-auto max-w-[Npx] px-… ` wrappers with **21 different one-off max-width values** (`1440px` ×86 occurrences, `1680px` ×37, plus one-offs like 1400/1360/1200/900/820/760/720px). Rather than reviving the exact old `PageContent.jsx`, redesign it to accept a `width` prop (`default | wide | narrow`, mapped to the 3 real widths actually needed) and migrate pages incrementally.
- [ ] **Reconcile `journeyStages.js` and `homeJourneyStages.js`.** Both describe the same real-world production pipeline with hand-copied overlapping facts (e.g. "2.4 million layers / 164 million eggs annually" appears independently in both). Pull shared numeric facts into one constants module both import, so they can't drift out of sync.

## Phase 3 — Standardize page-level conventions

The uniformity audit found **3 competing SEO-wiring conventions**. Pick one and migrate everything to it.

- [ ] Standardize SEO wiring: most pages go through `PageWrapper` → `SEO` (~65 pages, the intended pattern). But `ContactUs.jsx`, `Home.jsx`, `Investors.jsx`, `BrochurePage.jsx`, and 5 CSR pages call `<SEO>` directly without `PageWrapper`, and `ProductPage.jsx` (shared product-detail shell) has its own third variant. Converge on one: either every page uses `PageWrapper`, or `PageWrapper` becomes just a thin `SEO` re-export and pages call `SEO` directly and consistently — pick one, not three.
- [ ] Break up the monolithic single-file pages that never adopted the "thin page + `sections/` folder" pattern used by AboutUs/Home/Quality/ContactUs/Infra/Applications: `Investors/Investors.jsx` (1051 lines), `Capabilities/ManufacturingSupplyPage.jsx` (717 lines), `Resources/ResourcesPage.jsx` (616 lines), `Innovation/InnovationCustomSolutionsPage.jsx` (500 lines), `GlobalReach/GlobalReachPage.jsx` (491 lines). Split each into a page shell + `sections/*.jsx`, consistent with the rest of the codebase — improves readability and makes Phase 2's shared components easier to drop in.
- [ ] Verify the hardcoded contact info that's duplicated across files stays in sync in the meantime, and centralize it: `04242351532` appears independently in `OfficeAddresses.jsx` and `Investors.jsx`; `exportsales@skmegg.com` appears in `SEO.jsx` and separately in `RegionalRouting.jsx`. Create `src/config/contact.js` exporting these as constants, consumed everywhere.

## Phase 4 — Production hardening (do regardless of the routing decision below)

- [ ] **Add a top-level `ErrorBoundary`.** There is currently none anywhere in the app (`grep -r "ErrorBoundary"` → 0 matches). `App.jsx`'s `<Suspense>` only covers the chunk-loading state, not render-time exceptions — if any lazy page throws, the whole SPA white-screens with no fallback. Wrap `<Suspense>` in `App.jsx:296-309` with an `ErrorBoundary` (hand-written or `react-error-boundary`) rendering a "Something went wrong — Back to Home" fallback.
- [ ] **Fix scroll-restore inconsistency.** `App.jsx:108`'s `handlePageChange` calls `window.scrollTo({ top: 0, behavior: 'smooth' })` on forward navigation, but the `popstate` handler (`App.jsx:115-123`) does not — pressing Back leaves scroll position wherever it was.
- [ ] **Chain `prerender` into the build.** `package.json`'s `"build"` script is just `vite build`; `prerender` is a separate script nobody calls automatically. A naive CI `npm run build` ships with no prerendered SEO snapshots. Either add `"build": "vite build && node scripts/prerender.mjs"` or make the deploy pipeline explicitly run both.
- [ ] **`sitemap.xml` only covers ~59 of ~90 routes** (including legacy aliases). Since `prerender.mjs` drives itself entirely off the sitemap, ~30 routes never get prerendered and fall back to the generic `index.html` shell for crawlers. Generate the sitemap from the same route list `App.jsx` uses (single source of truth) instead of hand-maintaining it.
- [ ] **Accessibility: associate labels with inputs.** `grep -r "htmlFor"` across `src/` returns 0 matches — no `<label>` is programmatically linked to its `<input>`/`<select>` anywhere, including the shared `FormField.jsx` component (fix once there after Phase 2's de-dup, it covers both GetQuote and ContactUs). Add `id`/`htmlFor` pairing.
- [ ] **Images: add intrinsic sizing.** 49 `<img>` tags in `src/`, zero with explicit `width`/`height` — no native CLS protection outside CSS aspect-ratio wrappers (which aren't applied everywhere, e.g. `ProductHero.jsx`, `Navbar.jsx`). Add `width`/`height` or wrap consistently in `aspect-[...]` containers.
- [ ] **Images: standardize next-gen formats.** Manufacturing gallery already uses `.webp`; several hero images pull raw JPGs from Unsplash (`ApplicationHero.jsx`, `ProductsHubPage.jsx`) even though Unsplash's URL API supports `fm=avif`/`fm=webp` for free. Standardize.
- [ ] **Lazy-load the home page's map section.** `react-simple-maps` (+ its `d3-geo`/topojson chain) is pulled into the **initial bundle** because `Home.jsx` is statically imported in `App.jsx` (not lazy, correctly, since it's the default route) and it statically imports `GlobalMarkets` → `ExportMarketsMap`. Wrap just that section in its own `React.lazy` + `Suspense` (or mount on scroll-into-view) so the map library doesn't block first paint for every visitor, most of whom won't scroll to it immediately. (`pdfjs-dist`/`react-pageflip` are already correctly isolated behind `CoffeeTableBooksPage`'s lazy import — good pattern, replicate it here.)
- [ ] **Throttle `CustomCursor`'s per-frame hit-testing.** `CustomCursor.jsx:47-51` calls `document.elementFromPoint()` + `window.getComputedStyle()` on every rAF-batched mousemove frame — both force layout/style recalculation. Switch to event-delegated `mouseover`/`mouseout` checks on interactive elements instead of polling every frame.
- [ ] **Add `prefers-reduced-motion` handling.** No guard found anywhere (`CustomCursor`, slide transitions, `NotFound.jsx`'s always-on tilt effect on `mousemove`). Respect the media query for users who've opted out of motion.
- [ ] Gate or route `console.error` calls (`EnquiryModal.jsx:567`, `GetQuotePage.jsx:149`) through a real lightweight error-monitoring hook before launch, or at minimum wrap in `import.meta.env.DEV`.

## Phase 5 — Package additions worth their weight

| Package | Replaces | Effort | Notes |
|---|---|---|---|
| `clsx` | ~dozens of hand-built ternary className strings (`GetQuotePage.jsx`, `StepProduct.jsx`, `ImageSlider.jsx`, etc.) | trivial | ~300B, pure readability/correctness win |
| `tailwind-merge` (pair with `clsx`) | risk of conflicting Tailwind classes applied conditionally in the same element (seen in `GetQuotePage.jsx`) | trivial | optional but cheap insurance |
| `react-error-boundary` | hand-written class-based error boundary | trivial | see Phase 4 |
| `embla-carousel-react` (or `keen-slider`) | `src/components/ImageSlider/ImageSlider.jsx` (193 lines of hand-rolled breakpoints, autoplay, dot pagination, **no touch/swipe support at all**) | medium | real UX gap today — mobile users can't swipe the carousel, only tap small arrow buttons |
| `react-hook-form` + `zod` | ~150 combined lines of hand-written `useState`-based form state + manual `validateStep`/`validate` if-chains in `GetQuotePage.jsx` and `EnquiryModal.jsx`, including a hand-copied duplicate email regex in both files | medium-large | biggest code-reduction opportunity outside routing; do after Phase 2's `FormField` consolidation |
| `vite-imagetools` (or manual `<picture>`/`srcSet`) | raw JPG hero images with no AVIF/WebP variants | small-medium | pairs with Phase 4's image-format item |
| bundle analyzer (`rollup-plugin-visualizer`) | no current visibility into chunk sizes | trivial, dev-only | use once to confirm the `react-simple-maps` bundle-size claim in Phase 4 and catch future regressions |

## Phase 6 — The big architectural call: routing (decide separately, don't bundle into this cleanup)

This is the single largest structural issue in the codebase but is a genuinely large, higher-risk migration — **surface it as a decision, not a task to execute silently.**

`src/App.jsx` is a hand-rolled router: a 90-case `switch` on a plain `activePage` string state, manually wired to `window.history.pushState`/`popstate`. Concretely, this costs:
- No URL query-string/param parsing at all — prefill context only survives via `history.state`, so it's lost on refresh/shared links.
- Every one of ~90 pages gets `onPageChange` (and often `onBackHome`, `prefill`) prop-drilled by hand from `App.jsx` — this is *why* Phase 1's `onBackHome`/`breadcrumbItems` dead-prop bugs exist in the first place; a router context eliminates the whole class of bug.
- No nested routes — hierarchy (e.g. Products → Product Detail) exists only in filenames, not in the route config.
- Inconsistent scroll-restore between forward nav and Back button (Phase 4 patches the symptom; a real router fixes the cause).
- No trailing-slash/case normalization — typo'd paths silently 404.

**Recommendation:** migrate to `react-router-dom` (or `wouter` for a lighter footprint) once Phases 0–5 are done and stable. Doing it last means the shared components/props are already cleaned up, so the migration touches less surface area. This is a multi-day effort touching every page file's prop signature — scope and schedule it as its own project, not a line item.

---

## Suggested order of work

1. **Phase 0** (delete dead files) — same day, zero risk.
2. **Phase 1** (dead props, small bugs) — 1-2 days, mostly mechanical.
3. **Phase 2** (shared component extraction) — the bulk of the effort; do incrementally, one shared component at a time, with visual QA after each.
4. **Phase 3** (page convention standardization) — pairs naturally with Phase 2 since you're already touching these files.
5. **Phase 4** (production hardening) — can run in parallel with Phase 2/3, different files mostly.
6. **Phase 5** (package additions) — pull in `clsx`/`react-error-boundary` early (cheap), `react-hook-form`/`zod` and `embla-carousel` after Phase 2's `FormField`/`ImageSlider` consolidation.
7. **Phase 6** (routing migration) — separate decision, separate timeline, do last.
