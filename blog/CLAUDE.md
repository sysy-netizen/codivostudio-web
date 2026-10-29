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

Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4 (via `@tailwindcss/postcss`, no `tailwind.config`; theme lives in `app/globals.css`), shadcn/ui (`base-nova` style, built on `@base-ui/react`, not Radix) and lucide-react icons. The `@/*` path alias maps to the project root (e.g. `@/components/blog-data`, `@/lib/utils`). Add shadcn components with `pnpm dlx shadcn add <name>`; they land in `components/ui/` per `components.json`.

`next.config.mjs` sets `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`, so **`next build` will not catch type errors**. Run `pnpm exec tsc --noEmit` to check types.

## Architecture

- **Content is hard-coded, no CMS or database.** All articles live in the `articles` array in `components/blog-data.ts` (`Article`: title, excerpt, category, date, readTime, slug). Adding a post means adding an entry there. Dates and read-times are display strings, not parsed values.
- Routes in `app/`: `/` (home), `/articles`, `/articles/[slug]`, `/about`, `/contact`, `/admin`. All pull from `blog-data.ts`.
- `/articles/[slug]` uses `generateStaticParams` over `articles`; `params` is a `Promise` (awaited). The body text is the same placeholder paragraph for every article, since only the metadata is per-article.
- `/admin` is a static mock dashboard. The "새 아티클" button does nothing, the "이번 달" count is hard-coded, and there is no auth. It only displays `articles`.
- `components/article-list.tsx` is the shared list renderer. `app/layout.tsx` sets the Noto Sans KR font (`next/font`) and Vercel Analytics (production only). `SiteHeader` (client component: hamburger on mobile, inline links from `md`) and `SiteFooter` are mounted there. `/admin` is intentionally not in the header nav (marked `noindex`). `Article.content?: string[]` holds body paragraphs; the article page falls back to a placeholder when it is absent.
- UI copy is Korean. Styling is inline Tailwind utilities, with many pages written as long single-line JSX.
- `cn()` in `lib/utils.ts` (clsx + tailwind-merge) is the class-merging helper.

## Conventions

`.rules` (editor/AI rules file) specifies: tabs, single quotes, no semicolons, kebab-case file names, `function` keyword components, Server Components by default (`'use client'` only when needed), and Tailwind + shadcn for UI. Note it also mentions Redux, Zod, next-i18next and Jest, none of which are installed here, and the existing code uses 2-space indentation, so match the surrounding file rather than `.rules` where they disagree.
