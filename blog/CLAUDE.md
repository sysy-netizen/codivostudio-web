# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Scope

`blog/` is a self-contained Next.js app ("Code+Vivo studio blog"), a v0.app-generated project. It is a **separate project from its parent directory** (`../`), which is the main CODIVO STUDIO v2 site (Next.js 14, static export, npm, `src/` layout, Vercel rewrites for Naver/Google site-verification files). Don't mix the two: `blog/` has its own `package.json`, lockfile and config, and no `src/` directory. The parent's root `tsconfig.json` lists `blog` in `exclude`; without that the main site's `next build` type-checks `blog/` files against its own `@/*` alias and fails.

**Deployment:** `blog/` is its own Vercel project (Root Directory `blog`, Production at `https://blog.codivostudio.com`, DNS on Cloudflare as a CNAME). It needs `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` set in Vercel. The main site links to it from its nav (`src/data/site.ts`, opens in a new tab). The Supabase project is on the free plan and gets paused after inactivity; a paused project shows up as `fetch failed` / "Non-existent domain" for the project URL until it is resumed in the dashboard.

Workspace-wide rules (confirm before acting, verify files are up to date first) are in `C:\codivo_studio\CLAUDE.md`.

## Commands

`package.json` pins `pnpm` (`packageManager`, `pnpm-lock.yaml`), but pnpm is not installed on the usual dev machine and a `package-lock.json` is committed too, so `npm` is what has actually been used locally. Either works; after pulling changes to `package.json`, reinstall (new deps such as `react-markdown` otherwise break the article page).

```
npm install   # or pnpm install
npm run dev   # next dev  (http://localhost:3000)
npm run build # next build
npm start     # next start
```

There is no lint script and no test framework configured, so there are no test commands.

## Stack

Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4 (via `@tailwindcss/postcss`, no `tailwind.config`; theme lives in `app/globals.css`), shadcn/ui (`base-nova` style, built on `@base-ui/react`, not Radix) and lucide-react icons. The `@/*` path alias maps to the project root (e.g. `@/lib/articles`, `@/lib/utils`). Add shadcn components with `pnpm dlx shadcn add <name>`; they land in `components/ui/` per `components.json`.

`next.config.mjs` sets `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`, so **`next build` will not catch type errors**. Run `pnpm exec tsc --noEmit` to check types.

## Architecture

- **Articles live in the Supabase `articles` table** (slug, title, excerpt, category, `content text[]`, `read_minutes`, `status` draft/published, `published_at`). RLS lets anonymous visitors read only published rows with `published_at <= now()`; signed-in users can read and write everything. `lib/articles.ts` has the queries and maps rows to the display `Article` type (`date` is formatted in Asia/Seoul, `readTime` is `N분 읽기`). Public pages use the cookie-less client in `lib/supabase/public.ts` and `revalidate = 60`; `/admin` uses the session client to include drafts. There is no schema file in the repo: the table and policies were created by SQL run in the Supabase dashboard.
- Routes in `app/`: `/` (home, latest 3), `/articles`, `/articles/[slug]`, `/about` (includes contact info), `/login`, `/admin`, `/admin/new`, `/admin/edit/[slug]`, `/admin/preview/[slug]`. Article routes pull from `lib/articles.ts`.
- `/articles/[slug]` uses `generateStaticParams` over published articles; `params` is a `Promise` (awaited). The body is `content` rendered as Markdown (`components/markdown-content.tsx`: `react-markdown` + `remark-gfm`, links open in a new tab with `nofollow`); a placeholder is shown only when `content` is empty.
- `/admin` lists all articles (drafts marked "초안") with live counts and has create, edit, delete and preview (drafts included). The writes are server actions in `app/admin/actions.ts` (`createArticle`, `updateArticle`, `deleteArticle`); each re-checks `getUser()` and calls `revalidatePath` for `/admin`, `/articles`, `/` and the article page. The body is saved as a single Markdown string in `content[0]` so lists and code blocks keep their line breaks. The slug is auto-generated from the title in the new-article form (Hangul allowed; letters, numbers and hyphens only, unique, a duplicate returns "이미 사용 중인 슬러그입니다") and can be edited by hand; `published_at` is set when a draft is first published. Access is gated by Supabase Auth (email + password, `@supabase/ssr`): `proxy.ts` redirects unauthenticated `/admin/*` requests to `/login` (session check and cookie refresh live in `lib/supabase/proxy.ts`), and the page re-checks with `getUser()` itself. `lib/supabase/server.ts` builds the server client; `app/login/actions.ts` holds the login/logout server actions. Accounts are created by hand in the Supabase dashboard (public sign-ups are disabled there), so any signed-in user counts as admin; add a role check if sign-ups are ever opened. Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local` (see `.env.example`); login fails closed if either is missing.
- `components/article-list.tsx` is the shared list renderer. `app/layout.tsx` sets the Noto Sans KR font (`next/font`) and Vercel Analytics (production only). `SiteHeader` (client component: hamburger on mobile, inline links from `md`) and `SiteFooter` are mounted there. `/admin` is linked in the header nav (marked `noindex`). `Article.content` holds body paragraphs; the article page falls back to a placeholder when it is empty.
- **AdSense ads are built in but switched off by default.** `lib/ad-slots.ts` exports `ADS_ENABLED` (true only when `NEXT_PUBLIC_ADS_ENABLED=true` at build time, so changing it needs a redeploy) and the slot ids in `AD_SLOTS`. When on, `app/layout.tsx` loads `adsbygoogle.js` (production only) and `components/ad-slot.tsx` (client component, pushes once per slot) renders one slot after the 2nd item on `/articles` (`adAfter={2}`) and one below the body on `/articles/[slug]`; the home list has none. When off, neither the script nor the slot wrappers render. Keep the slot ids in `lib/ad-slots.ts`, not in `ad-slot.tsx`: that file is `'use client'`, so server components importing a constant from it would get a client reference instead of the value. `ads.txt` (publisher line) is in `public/` here and in the main site. The AdSense application was withdrawn for now; turn ads on only after re-applying and being approved.
- UI copy is Korean. Styling is inline Tailwind utilities, with many pages written as long single-line JSX.
- `cn()` in `lib/utils.ts` (clsx + tailwind-merge) is the class-merging helper.

## Conventions

`.rules` (editor/AI rules file) specifies: tabs, single quotes, no semicolons, kebab-case file names, `function` keyword components, Server Components by default (`'use client'` only when needed), and Tailwind + shadcn for UI. Note it also mentions Redux, Zod, next-i18next and Jest, none of which are installed here, and the existing code uses 2-space indentation, so match the surrounding file rather than `.rules` where they disagree.
