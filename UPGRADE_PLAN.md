# Deferred upgrade plan

Items intentionally deferred during the June 2026 modernization (Phases 1–2 + Next/React/ESLint upgrade). Tackle these when resuming active development.

## Phase 3 — Framework & dependency cleanup

### Tailwind CSS 4 migration

- **Current:** Tailwind 3.4 with `tailwind.config.ts` and PostCSS
- **Target:** Tailwind 4 with CSS-first config
- **Why deferred:** Larger migration with styling risk; site works fine on Tailwind 3
- **Steps:**
  1. Follow the [Tailwind v4 upgrade guide](https://tailwindcss.com/docs/upgrade-guide)
  2. Migrate `tailwind.config.ts` theme tokens (merino, neutral palettes, custom screens)
  3. Update `postcss.config.mjs` for `@tailwindcss/postcss`
  4. Visual regression check on `/` and `/contact`

### `next-themes` evaluation

- **Current:** Bumped to `0.4.6` for React 19 peer-dep compatibility; used only in `src/components/ui/sonner.tsx` for toast theming
- **Still to decide:**
  - Remove `next-themes` and hardcode `theme="light"` (site has no dark mode today)
  - Or add a proper `ThemeProvider` in `layout.tsx` if dark mode is planned
- **Why deferred:** No user-facing dark mode; removing requires deciding on toast styling

### ESLint 10 upgrade

- **Current:** ESLint 9.39.4 with `eslint-config-next` flat config
- **Blocked by:** `eslint-plugin-react@7.37.5` (dependency of `eslint-config-next`) is not compatible with ESLint 10's removed `context.getFilename()` API. See [jsx-eslint/eslint-plugin-react#3977](https://github.com/jsx-eslint/eslint-plugin-react/issues/3977).
- **When ready:** Bump to ESLint 10 once `eslint-plugin-react` releases compatible version, or switch to a custom flat config using only `@next/eslint-plugin-next`

### Dead code cleanup

- `src/components/logo-alt.tsx` — alternate logo experiment, not imported
- `src/components/ui/contact.tsx` — has stale `// TODO add fathom events` comment (events are wired)
- `tailwind.config.ts` — references `./src/pages/**` but project uses App Router only
- Evaluate whether `@radix-ui/react-toast` is needed alongside `sonner`

### ESLint / React 19 hook rule cleanup

New stricter `react-hooks/*` rules (set-state-in-effect, refs, immutability, purity) are downgraded to warnings for now. Files needing refactors:

- `src/components/logo.tsx` — ref access during render, setState in effect
- `src/components/logo-alt.tsx` — dead experiment, currently eslint-ignored
- `src/components/principle-card.tsx` — ref cleanup in effect
- `src/components/service-card.tsx` — ref cleanup in effect

Fix by stabilizing callbacks/refs and moving animation state out of render, not by blanket `eslint-disable`.

### `@calcom/embed-react` update

- Check for a newer embed package version after Next 16 upgrade
- Re-test booking flow and CSP compatibility on `/contact`

## Phase 4 — Optional improvements

### Analytics hardening

- Consider migrating Fathom to [`@next/third-parties`](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries) for optimized script loading
- Verify pageview events in Fathom dashboard after App Router analytics fix

### Content Security Policy tuning

- Current CSP in `next.config.mjs` is a baseline for Fathom + Cal.com
- If embeds break after deploy, check browser console for CSP violations and add required domains
- Consider `Content-Security-Policy-Report-Only` during tuning

### CI enhancements

- Add smoke test that fetches `/` and `/contact` after build
- Validate `public/og-image.png` exists and meets OG dimensions (1200×630)
- Pin Node version in CI to match `.nvmrc` exactly

### Middleware (only if needed)

- No middleware today; add only for redirects or geo rules
- Not required for current static site

### README / docs

- Add contribution guidelines if opening to collaborators
- Document Fathom site ID and Cal.com namespace if rotating credentials

## Completed (June 2026)

- [x] Next.js 14.2.7 → 16.2.7
- [x] React 18 → 19.2.7
- [x] ESLint 8 → 9.39.4 (flat config; ESLint 10 blocked upstream — see above)
- [x] `@calcom/embed-react` 1.5.0 → 1.5.3 (React 19 support)
- [x] `sonner` 1.5.0 → 2.0.7
- [x] `next-themes` 0.3.0 → 0.4.6 (peer-dep fix only)
- [x] Security headers (HSTS, CSP, X-Frame-Options, etc.)
- [x] Fathom analytics fixed for App Router (`usePathname`)
- [x] GitHub Actions CI (lint, build, audit)
- [x] Dependabot for npm + GitHub Actions
- [x] `.nvmrc` and `engines` field
- [x] Removed dead `events` import in navbar
- [x] Updated README
