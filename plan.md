# SKM Egg Products — Content & Navigation Strategy

**Purpose of this document:** define the *thinking* behind page structure and navigation before any Figma work starts. This is not a sitemap dump — it explains *why* Booking.com, Zomato and Amazon convert so well, then translates those mechanics into a plan for a B2B egg-ingredient export business (not a consumer marketplace, which changes what "conversion" even means here).

---

## 1. What SKM actually is (and why this matters for the plan)

Before borrowing UX patterns from consumer apps, it's important to be honest about what SKM sells and to whom — otherwise you end up with a beautiful site that guides users toward the wrong action.

- **Product**: industrial egg ingredients (egg powders, liquid egg, specialty blends) sold in bulk — not a single unit a person clicks "buy" on.
- **Buyer**: a procurement manager, R&D/food technologist, or importer/distributor evaluating a *supplier*, not a shopper comparing prices on a single SKU.
- **The real "conversion"** is not a purchase — it's a **qualified enquiry**: a sample request, a spec-sheet download with contact captured, or an RFQ (request for quote). Everything on the site should be designed to move a stranger toward that action with the least friction and the most confidence.
- **Secondary audiences** exist and must not contaminate the primary flow: investors/shareholders (AGM, financials), media, and job seekers. These need their own clearly separated track, the way Amazon separates "Amazon Business" or "Sell on Amazon" from the main shopping flow.

So the psychology we borrow from Booking/Zomato/Amazon isn't "make people buy faster" — it's **"make a stranger trust an unfamiliar supplier fast enough to hand over their contact details and say what they need."**

---

## 2. The psychology behind the three reference sites

### Booking.com — anxiety reduction + momentum
Booking sells something people are anxious about (spending money on a place they haven't seen, in a city they don't know). Its structure is built entirely around **collapsing anxiety at the exact moment it appears**:

- **One search bar, not a menu.** The homepage asks 3 questions (where, when, how many) instead of presenting 20 links. This works because deciding *what to click* is itself a cost — Booking removes that cost by asking instead of listing.
- **Trust signals live at the point of decision, not on a separate "About" page.** Review scores, cancellation policy, "booked 12 times today" — all appear right where the user is about to commit, because that's when reassurance is actually needed.
- **Scarcity/urgency** ("only 1 room left") converts hesitation into action by making inaction feel like the risky choice.
- **The page never dead-ends.** Every screen has one obvious next step, and a persistent summary bar follows the user so they never lose their place.

**Translation for SKM**: Trust content (certifications, traceability, EU/USDA approval) is currently siloed under `/quality/*` — a destination almost nobody visits proactively. It needs to be *injected* into the product page and the enquiry flow, at the exact moment a buyer is deciding whether to trust an Indian supplier enough to request a sample.

### Zomato/Swiggy — emotion before specification, curation over choice
Food ordering apps know that appetite is emotional before it's rational:

- **Visual-first discovery.** Photos of food drive the click; text/specs come after, not before.
- **Curated carousels, not full listings.** "Top rated near you," "Because you ordered X" — the app pre-filters so the user chooses from 6 good options instead of 600 possible ones. Choice overload kills conversion.
- **Location/context captured first**, and everything downstream is personalized to it.
- **Shortest possible path from browse to commit** — menu → item → cart, one tap each.

**Translation for SKM**: A visitor doesn't think "I want Egg Yolk Powder Y1104." They think "I make mayonnaise" or "I need a protein ingredient for a bakery mix." The site should let people **browse by application/industry** (Bakery, Mayonnaise & Dressings, Meat & Seafood, Confectionery, Sports Nutrition), the same emotional/contextual entry point Zomato uses for cuisine — not by SKM's internal product taxonomy (Powder vs Liquid vs Speciality), which means nothing to a first-time visitor.

### Amazon — the product page is the real homepage, cross-sell keeps momentum
Every Amazon entry point (search, ad, category browse) funnels to one place: **the product detail page**, which is deliberately built to be a self-contained decision-making unit:

- All decision-relevant info lives on *one* page: specs, reviews, Q&A, "customers also bought," return policy, price. The user never has to leave and hunt for reassurance elsewhere.
- **Recommendation loops** ("frequently bought together," "customers also viewed") prevent dead ends — there's always a next product to consider.
- **Breadcrumbs and persistent search** mean the user always knows where they are and can back out without feeling lost.
- Checkout is reduced to the fewest possible steps once intent is established.

**Translation for SKM**: The **product page** (e.g. Whole Egg Powder) should become the richest page on the site — spec table, applications, relevant certifications, downloadable TDS, related case studies, cross-sell to complementary products ("manufacturers using this also use Egg Yolk Powder Y1101 for emulsification") — with a sticky "Request Sample / Get Quote" CTA that follows the user, the same way Amazon's Buy Box stays anchored.

### The common thread across all three
1. **Progressive narrowing, not a flat menu** — ask a question, then narrow, rather than presenting every link at once.
2. **Decision-relevant info co-located at the point of decision** — don't force users to hunt across pages for reassurance.
3. **One primary CTA per screen**, always visible.
4. **Trust/social proof injected at the moment of anxiety**, not parked on a page nobody visits.
5. **Segment early** ("who are you / what do you want") so everything downstream is personalized.
6. **Visual/emotional hook before the spec dump.**
7. **No dead ends** — every page offers a next step or a related option.

This is the lens for every decision below.

---

## 3. The farm-to-product story — a narrative layer running parallel to the funnel

Booking, Zomato and Amazon all sell something the user already understands (a room, a meal, a product they've seen before). SKM is selling something almost no buyer has ever thought about: how a fresh egg, laid on a farm in Erode, becomes a stable, food-safe industrial ingredient that a factory on the other side of the world will trust without ever sending someone to inspect it. That gap — the buyer's inability to physically verify an overseas supplier — is exactly what a **farm-to-product origin story** is for.

This isn't a fourth pattern borrowed from Booking/Zomato/Amazon. It's closer to how premium provenance brands (specialty coffee, wine, single-origin ingredients) sell trust to a buyer who can't visit the source: they replace the factory visit the buyer can't make with a transparent, visual, step-by-step journey. It works on the same underlying psychology as Section 2's "trust at the moment of anxiety" — just delivered as narrative rather than as a badge or a stat.

SKM already has the raw material for this. The 6-step traceability chain — **Hatchery → Feed Mill → Farm → Processing → QA & Lab → Packaging & Dispatch** — currently exists as a paragraph on a Traceability subpage almost nobody navigates to unprompted. The story is real, specific, and differentiating (most competitors can't show this level of chain-of-custody). It's just trapped in the wrong information architecture.

### The key structural decision

The farm-to-product story should **not** be one destination page competing for a nav slot. It should be a thread that resurfaces at multiple points along the functional buyer journey from Section 2, each time in a form scaled to how much attention that moment has actually earned:

| Where it appears | Form | Job it does |
|---|---|---|
| **Homepage**, right after the trust bar | A condensed, visual scroll strip — the 6 stages, one photo + one line each, "Hatchery → Feed Mill → Farm → Processing → Lab → Dispatch" | Plants the idea "this company is transparent about its whole process" before the visitor has invested any real time — like Booking front-loading trust signals before the pitch |
| **Dedicated "Our Journey" page** (own nav item, full scrollytelling long-form) | Immersive narrative: photography/video, stats and a human quote at each of the 6 stages, ending with "this is how every batch reaches you" | For buyers doing real due diligence — importers, auditors, anyone who needs the closest substitute for an in-person factory audit |
| **Product detail page** | A compact "trace this product" widget showing only the stages relevant to *that* SKU (which farms, which processing line, which lab tests apply) | Reinforces trust at the exact point of decision — reusing Amazon's product-page pattern from Section 2, but for provenance instead of specs |
| **Quote confirmation / nurture step** | Offered as "explore our farm-to-fork journey while you wait for our team" | Fills the anxious silence after an enquiry is submitted with something that builds confidence instead of a blank waiting screen |

The story and the application-first funnel are not competing navigation systems — they're two registers running in parallel: the **functional layer** (Section 5 onward) gets a buyer to the right product and a quote as fast as possible; the **narrative layer** builds the emotional trust that makes an unfamiliar overseas supplier feel safe to commit to. A buyer who only wants a spec sheet should never be forced through the story. A buyer who's hesitant should be able to reach it within one click from almost anywhere on the site.

---

## 4. Current state vs. target model

| | Current SKM site | Target model |
|---|---|---|
| Nav | Flat corporate menu: Home / About / Products / Quality / Infrastructure / Branches / Contact / Investors | Task-oriented: guided entry points that ask "what are you here for" and narrow from there |
| Entry point | Generic hero banner + link grid | An "Application Finder" — the equivalent of Booking's search bar |
| Trust content | Isolated under Quality/Infrastructure, rarely seen unless proactively browsed | Distributed inline, appearing exactly when the buyer is evaluating credibility |
| Origin/traceability story | One paragraph on a Traceability subpage nobody finds unprompted | A narrative thread woven into homepage, a dedicated "Our Journey" page, product pages, and the post-enquiry wait (see Section 3) |
| Product discovery | Organized by SKM's internal taxonomy (Powder/Liquid/Speciality) | Organized by buyer's problem (application/industry), with taxonomy as a secondary filter |
| Conversion path | Single generic Contact Us form | A short, segmented enquiry/quote flow that pre-fills context and sets expectations afterward |
| Investors/CSR/Jobs | Mixed into the same nav as buyers | Clearly separated track so it never competes with the primary buyer journey |

---

## 5. Who actually lands on this site (segment first, like Booking asks "where are you going")

| Segment | What they want | Primary next action |
|---|---|---|
| **Procurement / R&D at a food manufacturer** (bakery, mayo, meat, confectionery, sports nutrition) | "Does SKM make an ingredient that solves my formulation problem, and can I trust them?" | Request sample / spec sheet / quote |
| **Importer / Distributor** | Export capability, countries served, packaging & logistics, regional contact | Partner enquiry, contact regional branch |
| **Auditor / Regulatory / Media** | Certifications, compliance documentation, food safety policy, traceability proof | Download certificates, view compliance detail, read "Our Journey" |
| **Investor / Shareholder** | Financials, AGM notices, governance | Investor Relations hub (fully separate track) |
| **Job seeker / general public** | Careers, CSR | Minor path, footer-level |

The homepage's job is to identify which of these five a visitor is, in the first 5 seconds — exactly like Booking's search bar identifies traveler intent before showing any content.

---

## 6. Site architecture (task-oriented, not department-oriented)

```
Home
├── Find Your Product          ← mega-menu organized by APPLICATION, not product type
│   ├── Bakery
│   ├── Mayonnaise & Dressings
│   ├── Meat, Fish & Seafood
│   ├── Confectionery
│   ├── Sports Nutrition & Health
│   └── Custom Blends & Packaging
│         └── [each links into filtered Product Listing → Product Detail]
├── Our Journey                 ← the farm-to-product story (Section 3), own nav slot
│   └── Hatchery → Feed Mill → Farm → Processing → QA & Lab → Packaging & Dispatch
├── Why SKM (Trust Hub)        ← Quality + Certifications + Infrastructure, merged
│   ├── Certifications (BRC, ISO 22000, HALAL, KOSHER, EU/USDA...)
│   ├── Quality Assurance & Lab
│   └── Infrastructure (Farms, Feed Mill, Processing Plant, Lab)
├── Global Reach                ← Branches + export map merged
│   ├── Interactive "we ship to your country" map
│   ├── SKM Japan / SKM Europe / SKM Russia
│   └── Events & Expos
├── Resources                   ← Brochures, case studies, TDS downloads, CSR
├── Get a Quote / Request Sample  ← persistent header CTA, always one click away
├── About SKM (company story, CEO message, vision — for those who want depth)
├── Investors (fully separate track — AGM, financials, governance)
└── Contact / Careers
```

Two structural decisions worth calling out:
- **Traceability moves out of the Trust Hub and becomes "Our Journey,"** its own first-class nav item — because it's the emotional/narrative asset from Section 3, not another compliance document to file alongside certifications.
- **Certifications + Quality Assurance + Infrastructure stay merged as "Why SKM,"** because to a buyer they answer the same rational question ("can I trust this factory on paper?"), distinct from "Our Journey," which answers the emotional one ("can I picture and trust this process?"). Investors stays completely separate — different audience, different psychology, should never appear in the buyer's mega-menu.

---

## 7. Homepage — page-by-page anatomy (this is the "search bar" of the site)

1. **Hero: the Application Finder.** Not a slogan banner — a visual, clickable set of 5–6 industry cards (Bakery / Mayo / Meat & Seafood / Confectionery / Sports Nutrition / Custom), each with an appetite-driving photo, mirroring Zomato's cuisine tiles. This is the single highest-leverage element on the site: it segments the visitor immediately and personalizes everything downstream.
2. **Trust bar, immediately below the fold.** 2M eggs/day, 7,500 MT/year, 30+ countries, since 1996, certification logos in a single row. This is Booking's review-score-badge equivalent — credibility signaled before any pitch is made.
3. **"Shop by application" results** — once a user picks (or hovers) a category, show the 3–4 relevant products with one-line "solves this problem" copy, not full spec dumps.
4. **The farm-to-product story strip** — the condensed 6-stage scroll teaser from Section 3, linking out to the full "Our Journey" page. Placed here deliberately: right after the buyer has seen *what* SKM can make for them, this answers the next unspoken question, "but can I trust where it comes from?"
5. **Why SKM, condensed** — 3–4 trust pillars (certifications, EU/USDA approval, in-house lab, audits) each linking deeper into the Trust Hub, reinforcing the rational case right after the story made the emotional one.
6. **Global presence** — a lightweight "select your region" prompt that routes to the relevant branch (Japan/Europe/Russia/Direct export) — this is the Amazon "deliver to your country" pattern, reassuring international buyers before they've had to ask.
7. **Cross-sell / recommendation carousel** — "Manufacturers in [category] also use..." — keeps momentum instead of dead-ending at the trust content.
8. **Persistent header CTA**: "Request Sample / Get Quote" — sticky, always visible, the equivalent of Booking's sticky search summary.

---

## 8. Sample end-to-end flow (the core deliverable)

```mermaid
flowchart TD
  A[Homepage: Application Finder] -->|selects "Mayonnaise & Dressings"| B[Application Landing Page]
  B -->|shows 3-4 matched products + why each fits| C[Product Detail Page: Egg Yolk Powder Y1104]
  C -->|specs, applications, certifications, TDS download, cross-sell| D{Sticky CTA:\nRequest Sample / Get Quote}
  C -->|"Trace this product" widget| S3[Mini journey: which farm, which line, which lab tests]
  S3 --> C
  D --> E[Step 1: Confirm product + application\n(pre-filled from context)]
  E --> F[Step 2: Quantity & packaging format]
  F --> G[Step 3: Destination country\n(auto-surfaces relevant certs + branch contact)]
  G --> H[Step 4: Contact details]
  H --> I[Confirmation Page:\nsets expectation - "Our team replies within 24h"\n+ offers "Our Journey" story / brochure while they wait]
  I --> J[Nurture: related products, resources, newsletter]

  A -->|clicks "Our Journey"| S[Farm-to-Product Story:\nHatchery -> Feed Mill -> Farm -> Processing -> Lab -> Dispatch]
  S -->|"See the products this process makes"| B

  A -->|clicks "Why SKM"| K[Trust Hub: Certifications / Infra / QA]
  K -->|"See products backed by these certifications"| B

  A -->|clicks Global Reach| L[Country selector]
  L --> M[Branch page: Japan / Europe / Russia / Direct]
  M -->|CTA pre-filled with country| E
```

**Why this shape works:**
- The buyer never has to choose from a flat 8-item menu — every step is a narrowing question, exactly like Booking's search funnel.
- Trust content (certifications, the origin story) is reachable from the homepage but also **re-injected inline** at the product page and quote flow, not siloed.
- The story layer (Section 3) has its own entry point ("Our Journey") for buyers actively seeking it, *and* a compact version threaded into the product page and the post-enquiry wait for buyers who didn't go looking but will still see it.
- The quote flow is short (4 steps), each step pre-fills from prior context (application already known from step A, country already known if they came via Global Reach) — this mirrors Amazon's reduction of checkout friction once intent is established.
- The confirmation page does real psychological work: it names a concrete response time (reduces anxiety, like Booking's "you'll get a confirmation email") and offers the origin story to explore instead of a dead end.
- Every terminal-feeling page (Story, Trust Hub, Branch page) routes back into the product funnel instead of dead-ending — no page is an island.

---

## 9. Content rules for each page type (what goes where)

- **Application landing pages** (Bakery, Mayo, etc.): problem-first copy ("Need volume and golden color in your sponge cake?"), 3–4 matched products, one customer-style use case, single CTA into product pages. No certification lists or origin story here — that's not the anxiety at this stage.
- **Product detail pages**: spec table, applications it solves, *relevant* certifications only (not the full list — just the ones that matter for that SKU/market), a compact "trace this product" widget, downloadable TDS, cross-sell to complementary products, sticky quote CTA. This is the Amazon product-page pattern — the single richest, most self-contained page on the site.
- **"Our Journey" (story) page**: written to be felt, not skimmed — real photography over stock imagery, one concrete detail per stage (a number, a certification, a named safeguard) rather than generic claims, and it should end with a CTA back into products ("this is the process behind [Whole Egg Powder] — see it") so it never dead-ends as pure brand content.
- **Trust Hub pages**: written for the skeptical buyer, not for SEO padding — lead with what a buyer needs to verify (accreditation numbers, audit frequency, lab capabilities) and end with a CTA back into products, never a dead end.
- **Branch/Global Reach pages**: country-specific — show only the certifications and contacts relevant to that market (EU buyer sees EU approval prominently; doesn't need Kosher front and center).
- **Quote/Enquiry flow**: never ask for information the context already gave you. If they arrived from a product page, the product is pre-filled. If from a country page, the country is pre-filled.
- **Investors/Careers/CSR**: kept structurally outside the buyer journey — different header treatment or a clearly separate section, so it never dilutes the primary funnel the way an "Investor Relations" link sitting next to "Request Sample" would.

---

## 10. What to take into Figma

1. Wireframe the homepage in the order of Section 7 — the Application Finder is the highest-priority component to get right; everything else, including the story strip, is secondary.
2. Design the Product Detail Page as the richest template in the system (treat it like Amazon's product page) — this template will be reused most often and does the most conversion work.
3. Design the "Our Journey" page as a scrollytelling template distinct from every other page — it should feel like editorial/documentary content, not a corporate subpage, since its whole job is emotional trust-building.
4. Design the 4-step Quote/Enquiry flow as its own mini-flow, with a visible progress indicator (like Booking's booking steps) and a confirmation screen that sets expectations and offers the story.
5. Design the sticky header CTA and sticky product-page CTA as persistent components, not one-off buttons.
6. Design the mega-menu around applications, with Our Journey, Trust Hub, Global Reach, and Investors as clearly secondary/tertiary nav weight.
