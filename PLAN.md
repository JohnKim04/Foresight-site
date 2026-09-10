# Foresight public website — deploy-ready plan

## Summary

Create a single-page, static Next.js marketing site in `Foresight-site` for hiring teams and product-minded reviewers. It will present Foresight as a natural-language consequence journal through a calm editorial visual system and a guided, simulated four-step product preview. No visitor data, account system, backend, waitlist, download, or medical claims.

## Implementation

- Initialize a TypeScript Next.js App Router project in the repository root with Tailwind CSS v4, ESLint, and static-first rendering.
- Add only focused UI dependencies:
  - shadcn/ui source-controlled components for buttons, cards, inputs, progress, and accessible dialog/tooltip primitives.
  - `lucide-react` for interface icons.
  - `motion` for brief preview-step and card transitions, with reduced-motion support.
- Build a typography-led Foresight wordmark with a small geometric accent; use an off-white canvas, near-black text, muted sage and indigo accents, generous whitespace, subtle borders, and soft shadows.
- Load a variable display/body font with `next/font`; avoid stock photography and use CSS-rendered product UI as the visual centerpiece.

### Homepage structure

- **Header:** Foresight wordmark; anchor navigation for “How it works,” “Preview,” and “Principles”; compact “MVP in progress” status.
- **Hero:** “Notice what your choices change.” Explain that Foresight converts natural notes into confirmed personal evidence. The only primary CTA is “Explore the preview,” which scrolls to the demo.
- **How it works:** Four concise cards—Capture, Clarify, Check in, Reflect—explaining typed/voice entry, editable AI interpretation, delayed outcomes, and evidence-based pattern discovery.
- **Guided product preview:** A client-side four-step simulator using fixed fictional data:
  1. **Log:** “I almost skipped my workout today, but I did 30 minutes after work. I was low-energy going in and felt calmer afterward.”
  2. **Clarify:** Show proposed, editable-looking fields for activity, duration, starting energy, and outcome; confirmation advances the flow.
  3. **Check in:** Ask how the workout affected the visitor’s evening with a labeled, accessible response scale.
  4. **Patterns:** Reveal: “In 7 of 9 confirmed after-work workouts, you felt calmer later that evening.” Clearly label this as an association from confirmed example data, not causation.
- **Trust and product judgment:** Explain that original words remain visible, AI suggestions are editable, only confirmed records inform patterns, and future nudges are opt-in and explainable.
- **Footer:** Product name, “MVP in progress,” and a concise disclaimer that the preview is simulated and not medical advice.

The preview’s state lives only in the browser during the visit. It supports Back, Restart, keyboard operation, visible focus states, an announced step/status change for screen readers, and reduced-motion behavior. It sends no data anywhere.

### Metadata and deployment readiness

- Add complete title, description, canonical-ready metadata, favicon, `robots.txt`, and a one-page sitemap.
- Generate a route-level Open Graph image featuring the wordmark and a simplified pattern card so shared links render well; Next.js supports route metadata and OG image file conventions directly. [Next.js metadata docs](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- Provide standard scripts: `dev`, `build`, `start`, `lint`, `test`, and `test:e2e`.
- Keep secrets and environment variables out of the project because the first release needs none.
- Commit the initialized site to `main`, confirm the configured GitHub remote is usable, and import `JohnKim04/Foresight-site` into Vercel with the repository root as the project root and Next.js as the framework preset.
- Use `main` as the production branch; all other branches produce preview deployments, while pushes to `main` produce production deployments. [Vercel Git deployments](https://vercel.com/docs/git)
- Use the Vercel-generated domain for launch; do not add analytics or a custom domain in this release.

## Public interfaces and behavior

- Public route: `/` only.
- No API routes, forms, persistence, analytics, authentication, or third-party data collection.
- Navigation and CTA use in-page anchors; the preview is the sole interactive product surface.

## Test plan

- Unit-test preview state transitions, Back/Restart behavior, and the fixed evidence copy.
- Add a Playwright smoke test covering the full four-step flow, keyboard navigation, and reduced-motion mode.
- Run lint and production build with no warnings/errors.
- Manually verify desktop and mobile layouts, anchor navigation, focus visibility, text contrast, and that no unsupported claims or nonfunctional CTAs appear.
- Validate the Vercel preview URL, production URL, page title/description, favicon, robots/sitemap, and social-card output after deployment.

## Assumptions

- The existing `Foresight-site` repository remains the deployment repository and will receive its first commit.
- The launch audience is job applications and product review, not consumer acquisition.
- The exercise example is workout recovery; the preview remains explicitly fictional.
- The initial release uses no custom domain, no analytics, no contact collection, and no external media assets.

## Staged implementation

### Stage 1 — Project foundation and design tokens

- Initialize the Next.js App Router project with TypeScript, Tailwind CSS v4, ESLint, and a static-friendly configuration. Keep the app to a single `app/page.tsx` route and establish the global shell in `app/layout.tsx`.
- Define the visual system in `app/globals.css`: CSS custom properties for canvas, ink, sage, indigo, border, and shadow values; base typography; responsive spacing; `:focus-visible` treatment; and a `prefers-reduced-motion` fallback.
- Configure `next/font` in the root layout and expose font variables/classes so display and body type remain consistent without externally hosted font requests.
- Add the minimal component primitives required by the page and keep them source-controlled under `components/ui`. Establish a small set of reusable page-level components such as `SiteHeader`, `SectionHeading`, `PreviewShell`, and `SiteFooter`.

### Stage 2 — Static page composition

- Build the header, hero, four-card “How it works” section, trust/principles section, and footer from semantic HTML landmarks and headings. Use stable section IDs (`how-it-works`, `preview`, and `principles`) for in-page navigation.
- Implement the editorial layout with responsive Tailwind utilities: single-column mobile flow, constrained reading widths, breakpoint-based multi-column cards, and a sticky or compact header only if it does not obscure anchor destinations.
- Keep the wordmark and product illustrations code-native: compose the geometric accent and preview ornamentation from CSS/SVG rather than importing stock assets.
- Ensure all text that makes product, privacy, or health-related statements exactly reflects the approved plan copy; include the fictional-preview and non-medical disclaimer in the footer and preview context.

### Stage 3 — Guided preview state machine

- Implement the simulator as a client component, for example `components/preview/GuidedPreview.tsx`, with an explicit discriminated step model (`log`, `clarify`, `check-in`, `patterns`) and local React state only.
- Store the fixed fictional journal entry, proposed fields, response-scale labels, and pattern statement in a typed data module. Do not derive or persist claims from visitor input; editable-looking controls may update temporary client state solely to make confirmation feel tangible.
- Define transitions centrally: Continue advances one step, Back returns to the previous valid step, Restart resets all preview-local values and returns to Log, and the final pattern is available only after the check-in transition.
- Add an `aria-live="polite"` status region that announces the current step and meaningful completion changes. Use native buttons/inputs with explicit labels, logical tab order, and keyboard-operable scale controls.
- Use `motion` only for small enter/exit transitions, gated by the user’s reduced-motion preference. Render equivalent static state changes when motion is disabled.

### Stage 4 — Metadata and share assets

- Populate `metadata` in `app/layout.tsx` with the production-ready title, description, icons, and canonical-ready `metadataBase`/alternate structure; leave the actual canonical origin configurable at deployment time only if a domain is later introduced.
- Add `app/robots.ts` and `app/sitemap.ts` using Next.js metadata routes, with the single `/` route and no disallowed private paths because none exist.
- Create `app/opengraph-image.tsx` as a route-level generated image. Reuse the wordmark palette and render a simplified fictional pattern card; keep its text large enough for social-card readability.
- Verify the generated metadata routes locally and confirm that the favicon, Open Graph image, robots output, and sitemap resolve in the production build.

### Stage 5 — Tests, quality checks, and deployment

- Unit-test the preview reducer/state helpers: forward transitions, prevented invalid transitions, Back behavior, Restart reset, and the exact association/non-causation copy. Keep test data separate from rendering so it can be asserted without DOM coupling.
- Add Playwright coverage that opens `/`, follows the full preview, checks the final pattern disclaimer, verifies keyboard operation and focus visibility, and runs a reduced-motion assertion or emulation.
- Add and validate `test` and `test:e2e` scripts alongside standard Next.js `dev`, `build`, `start`, and `lint` scripts. Run lint, unit tests, end-to-end tests, and a production build before release.
- Review desktop and narrow-mobile rendering manually, including anchor offsets, heading hierarchy, contrast, responsive overflow, and absence of network requests for analytics, forms, or visitor-data services.
- Commit the completed site to `main`, connect the repository to Vercel using the Next.js preset and repository root, then verify both a branch preview deployment and the `main` production deployment before sharing the Vercel-generated URL.
