# Hanaoka Design Studio

Marketing site for [Hanaoka Design Studio](https://studio.hanaoka.co), built with Next.js App Router.

## Requirements

- Node.js 20+ (see `.nvmrc`)
- npm with `legacy-peer-deps` enabled (configured in `.npmrc`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Environment

No required environment variables for local development. `.env*.local` files are gitignored.

## Deployment

Deployed to Vercel. Production domain: `studio.hanaoka.co`.

## Third-party services

- **Fathom** — privacy-focused analytics (production only)
- **Cal.com** — booking embed on `/contact`

## Stack

- Next.js 16, React 19, TypeScript, Tailwind CSS 3
- ESLint 9 (flat config) — ESLint 10 blocked until upstream `eslint-plugin-react` compatibility lands; see [UPGRADE_PLAN.md](./UPGRADE_PLAN.md)

## Deferred work

See [UPGRADE_PLAN.md](./UPGRADE_PLAN.md) for planned follow-up improvements (Tailwind 4, `next-themes` cleanup, logo refactors, etc.).
