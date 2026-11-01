# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Scope

`blog/` is a self-contained Next.js app ("Code+Vivo studio blog"), a v0.app-generated project. It is a **separate project from its parent directory** (`../`), which is the main CODIVO STUDIO v2 site (Next.js 14, static export, npm, `src/` layout, Vercel rewrites for Naver/Google site-verification files). Don't mix the two: `blog/` has its own `package.json`, lockfile and config, and no `src/` directory.

## Commands

Uses **pnpm** (`packageManager` pinned in `package.json`; `pnpm-lock.yaml`), not npm.

```
pnpm install
pnpm dev      # next dev
pnpm build    # next build
pnpm start    # next start
```

There is no lint script and no test framework configured, so there are no test commands.

## Stack

Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4 (via `@tailwindcss/postcss`, no `tailwind.config`; theme lives in `app/globals.css`), shadcn/ui (`base-nova` style, built on `@base-ui/react`, not Radix) and lucide-react icons. The `@/*` path alias maps to the project root (e.g. `@/lib/articles`, `@/lib/utils`). Add shadcn components with `pnpm dlx shadcn add <name>`; they land in `components/ui/` per `components.json`.

`next.config.mjs` sets `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`, so **`next build` will not catch type errors**. Run `pnpm exec tsc --noEmit` to check types.

## Architecture

- **Articles live in the Supabase `articles` table** (slug, title, excerpt, category, `content text[]`, `read_minutes`, `status` draft/published, `published_at`). RLS lets anonymous visitors read only published rows with `published_at <= now()`; signed-in users can read and write everything. `lib/articles.ts` has the queries and maps rows to the display `Article` type (`date` is formatted in Asia/Seoul, `readTime` is `N분 읽기`). Public pages use the cookie-less client in `lib/supabase/public.ts` and `revalidate = 60`; `/admin` uses the session client to include drafts. There is no schema file in the repo: the table and policies were created by SQL run in the Supabase dashboard.
- Routes in `app/`: `/` (home, latest 3), `/articles`, `/articles/[slug]`, `/about` (includes contact info), `/login`, `/admin`. Article routes pull from `lib/articles.ts`.
- `/articles/[slug]` uses `generateStaticParams` over `articles`; `params` is a `Promise` (awaited). The body text is the same placeholder paragraph for every article, since only the metadata is per-article.
- `/admin` is a read-only dashboard: it lists all articles (drafts marked "초안") and shows live counts, but the "새 아티클" button does nothing yet. Access is gated by Supabase Auth (email + password, `@supabase/ssr`): `proxy.ts` redirects unauthenticated `/admin/*` requests to `/login` (session check and cookie refresh live in `lib/supabase/proxy.ts`), and the page re-checks with `getUser()` itself. `lib/supabase/server.ts` builds the server client; `app/login/actions.ts` holds the login/logout server actions. Accounts are created by hand in the Supabase dashboard (public sign-ups are disabled there), so any signed-in user counts as admin; add a role check if sign-ups are ever opened. Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local` (see `.env.example`); login fails closed if either is missing.
- `components/article-list.tsx` is the shared list renderer. `app/layout.tsx` sets the Noto Sans KR font (`next/font`) and Vercel Analytics (production only). `SiteHeader` (client component: hamburger on mobile, inline links from `md`) and `SiteFooter` are mounted there. `/admin` is linked in the header nav (marked `noindex`). `Article.content` holds body paragraphs; the article page falls back to a placeholder when it is empty.
- UI copy is Korean. Styling is inline Tailwind utilities, with many pages written as long single-line JSX.
- `cn()` in `lib/utils.ts` (clsx + tailwind-merge) is the class-merging helper.

## Conventions

`.rules` (editor/AI rules file) specifies: tabs, single quotes, no semicolons, kebab-case file names, `function` keyword components, Server Components by default (`'use client'` only when needed), and Tailwind + shadcn for UI. Note it also mentions Redux, Zod, next-i18next and Jest, none of which are installed here, and the existing code uses 2-space indentation, so match the surrounding file rather than `.rules` where they disagree.
