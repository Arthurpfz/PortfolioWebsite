# Portfolio Website — arthurpfz.com

## Overview
Personal portfolio for Arthur Pfalzgraf. Deployed on Netlify via GitHub (Arthurpfz/PortfolioWebsite). Push to `master` triggers auto-deploy.

## Tech Stack
- **Astro 6** static site generator with file-based routing
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **Content Collections** for articles and feed items
- Hosted on **Netlify**, domain: arthurpfz.com

## Design System — Nous Research Aesthetic
Single source of truth: `src/styles/design-tokens.css`

- **Primary color:** `#1B3A5C` (deep navy)
- **Background:** `#F0F2F5`
- **Body font:** IM Fell English (Google Fonts), serif italic
- **Nav font:** Helvetica Neue, 11px, uppercase, bold, 0.18em tracking
- **Mono font:** Courier New, 10px (metadata, dates)
- **Borders:** Always `1px dashed` — never solid
- **No dark mode** — light-only aesthetic
- **No shadows** — flat design

Use CSS variables (`--border`, `--color-primary`, `--font-mono`, `--space-*`, `--text-meta`) everywhere — never hardcode values in page styles.

## Site Structure

### Pages
| Route | File | Description |
|---|---|---|
| `/` | `index.astro` | Feed homepage — reverse-chronological activity cards |
| `/builds` | `builds.astro` | Curated portfolio of personal projects |
| `/experience` | `experience.astro` | About page — intro + career history |
| `/book-summaries` | `book-summaries.astro` | List of 13 book summaries |
| `/archive/[slug]` | `archive/[slug].astro` | Individual article pages |

### Navigation (`src/components/Navigation.astro`)
Left: `arthurpfz.com` → `/`
Right: Feed, Builds, About, LinkedIn ↗, GitHub ↗, X ↗

Links:
- LinkedIn: https://www.linkedin.com/in/apfalzgraf/
- GitHub: https://github.com/Arthurpfz
- X: https://x.com/arthurpfz

### Content Collections (`src/content.config.ts`)

**articles** — `src/content/articles/*.md`
- Schema: title, date, description, categories, tags, draft, images

**feed** — `src/content/feed/*.md`
- Schema: title, date, description, link (optional), icon (optional)
- To add a feed item: create a new `.md` file in `src/content/feed/`

### Layout
- `BaseLayout.astro` — wraps all pages, imports global.css, loads IM Fell English font, renders Navigation + main slot

## Key Patterns

- **Tailwind v4 specificity:** Scoped Astro `<style>` may need `!important` on `display: grid` to override Tailwind resets
- **Reading time:** Calculated from `entry.body` word count / 200 (not Content.toString())
- **Article metadata:** `PUBLISHED YYYY-MM-DD · CATEGORY · N MIN READ` in Courier New mono
- **Feed cards:** Date (mono) | icon + title + description, clickable if `link` is set

## About Page Content
- Arthur Pfalzgraf — "Ironing things out at MoonPay."
- Roles: Iron by MoonPay (Head of Product, present), Ultimate (Product, acquired by Jupiter Exchange), Trade Republic (Crypto Custodian Builder), HelloFresh (Product Data Scientist → Product Manager)
- Footer: LinkedIn, GitHub, X links

## Dev Server
```bash
cd /Users/arthurpfalzgraf/Desktop/Projects/PortfolioWebsite
npm run dev  # runs on localhost:4321
```

## Deploy
```bash
git push origin master
# Netlify auto-deploys from GitHub
```

### Netlify Notes
- **Node 22 required** — set via `NODE_VERSION = "22"` in `netlify.toml` and `.node-version`
- Netlify defaults to Node 18 which breaks Astro 6
- Branch: `master` (not main)
- Old `/post/*` URLs redirect to `/archive/*` via netlify.toml
