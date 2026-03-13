# Technology Stack

**Project:** Portfolio Website Redesign
**Researched:** 2026-03-13

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro | ^6.0.4 | Static site generator | Zero-JS by default, 2-3x faster than Next.js for static content, 100/100 Lighthouse scores without optimization effort. Perfect for content-focused portfolio sites. |
| TypeScript | ^5.x | Type safety | Catches errors during development, improves maintainability, works well with AI tooling. Standard for 2026 portfolios. |
| Node.js | ^22.12.0 | Runtime | Required minimum version for Astro 6. |

**Confidence:** HIGH - Official Astro documentation confirms v6.0.4 is current; benchmarks show consistent performance advantages for static sites.

### Styling & Design System
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | ^4.1 | Utility-first CSS | Redesigned engine (5x faster builds), CSS-native configuration via @theme, automatic content detection. De facto standard for modern portfolios. |
| React | ^19.x | Interactive islands | For shadcn/ui components where interactivity is needed. Astro's island architecture means React only loads where necessary. |
| shadcn/ui | latest | Component primitives | Copy-paste components with zero dependencies beyond Radix and Tailwind. Official Astro integration available. Type-safe, customizable. |

**Confidence:** HIGH - Tailwind v4 stable release Jan 2025, React 19 stable, shadcn/ui has official Astro support.

**Note on shadcn/ui:** With Astro's island architecture, React context is not shared between islands. Solution: Call shadcn/ui components from .tsx files (not .astro files) so the entire component tree becomes one island.

### Design System Extraction
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Dembrandt | ^1.x (npm) | Design token extraction | Extracts colors, typography, spacing, borders, shadows from nousresearch.com into W3C-compliant design tokens. One command: `npx dembrandt nousresearch.com`. Outputs to DTCG format, consumable by Style Dictionary. |

**Confidence:** MEDIUM - Tool exists and is actively maintained (GitHub, npm), but real-world extraction quality varies by site complexity. Requires verification with nousresearch.com specifically.

**Alternative approach:** Manual extraction via browser DevTools + CSS Peeper extension if Dembrandt output needs refinement.

### Content Management
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro Content Collections | (built-in) | Type-safe content | Astro 5.0 Content Layer API with glob() loader. Type-safe frontmatter, 5x faster Markdown builds, 50% less memory. Native validation and IntelliSense. |
| Markdown | (built-in) | Article format | Existing Hugo articles are already Markdown. Direct migration path. |

**Confidence:** HIGH - Astro Content Collections are core feature with strong documentation and performance benchmarks.

## Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @astrojs/react | latest | React integration | Required for shadcn/ui components |
| Radix UI | latest | Headless UI primitives | Dependency of shadcn/ui; handles accessibility |
| Style Dictionary | ^4.x | Token transformation | If Dembrandt tokens need transformation to CSS variables or other formats |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Astro | Next.js | Next.js requires React runtime on every page (~40-80KB gzipped). Slower builds (52s vs 18s for 1000 pages). Better for dynamic apps, overkill for portfolio. |
| Framework | Astro | Hugo | Hugo lacks design system tooling ecosystem. Template language less familiar than JSX/TSX. Current site uses Hugo but redesign goals justify migration. |
| Styling | Tailwind v4 | CSS Modules | Tailwind provides faster iteration with design tokens, better ecosystem for shadcn/ui integration, and superior DX for extracting/applying design systems. |
| Hosting | Cloudflare Pages | Vercel | Cloudflare: <50ms latency globally, $5 at 1M pageviews, zero egress fees. Vercel: better DX but higher cost, Next.js-optimized (not needed here). |
| Hosting | Cloudflare Pages | Netlify | Netlify slowest of three (68s avg builds), reduced free tier (300→100 min), no cost advantage over Cloudflare. |

## Installation

```bash
# Create new Astro project with TypeScript
npm create astro@latest portfolio-website -- --template minimal --typescript strict

cd portfolio-website

# Add React for shadcn/ui
npx astro add react tailwind

# Initialize shadcn/ui (requires manual setup for Astro)
npx shadcn@latest init

# Install design token extraction tool
npm install -g dembrandt
# OR use without installing:
npx dembrandt nousresearch.com --dtcg --save
```

**Post-install setup:**
1. Configure Tailwind v4 @theme in CSS file
2. Set up Astro Content Collections in `src/content.config.ts`
3. Create React wrapper components for shadcn/ui to avoid island context issues
4. Extract design tokens from nousresearch.com using Dembrandt
5. Transform tokens to Tailwind theme configuration

## Migration from Hugo

| Hugo Concept | Astro Equivalent | Migration Strategy |
|--------------|------------------|-------------------|
| `content/` directory | `src/content/` collections | Move Markdown files, add type-safe frontmatter schema |
| `config.toml` | `astro.config.mjs` | Recreate site metadata, base URL in JS config |
| Hugo templates | `.astro` components | Rewrite templates as Astro components with TypeScript |
| Shortcodes | Astro components | Convert to reusable `.astro` or `.tsx` components |
| Static files | `public/` directory | Direct copy (same convention) |

**Preserve:** All article Markdown content (frontmatter may need schema updates)
**Discard:** Hugo theme submodule, TOML config, Hugo-specific template syntax

## Deployment

**Recommended: Cloudflare Pages**

```bash
# Build command
npm run build

# Output directory
dist/

# Build time (estimated)
~15-30 seconds for portfolio-scale site
```

**Why Cloudflare Pages:**
- <50ms global latency (300+ edge locations)
- Free tier: unlimited bandwidth, 500 builds/month
- $5/month at 1M pageviews (vs Vercel's higher tier pricing)
- Fastest Hugo/Astro builds in benchmarks (49s avg vs Netlify 68s)
- Docker container support (2026) for any custom build needs

**Setup:**
1. Connect GitHub repo to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure custom domain (arthurpfz.com)
5. Enable automatic deployments on push to main

## Design System Workflow

1. **Extract from nousresearch.com:**
   ```bash
   npx dembrandt nousresearch.com --dtcg --save --output design-tokens.json
   ```

2. **Review extracted tokens:**
   - Colors (semantic palette, CSS variables)
   - Typography (font families, sizes, weights)
   - Spacing scale (margin/padding)
   - Borders (radius, widths)
   - Shadows

3. **Transform to Tailwind theme:**
   - Use Style Dictionary to convert DTCG JSON to Tailwind config
   - OR manually map tokens to Tailwind v4 @theme CSS

4. **Apply via shadcn/ui:**
   - Configure shadcn/ui theme with extracted colors
   - Use design tokens for custom components
   - Maintain consistency with Nous Research aesthetic

5. **Validation:**
   - Visual comparison with nousresearch.com
   - Lighthouse score verification (target: 100/100)
   - Manual refinement of spacing/typography if needed

## Stack Confidence Summary

| Area | Confidence | Notes |
|------|------------|-------|
| Astro as framework | HIGH | Official docs, active development, proven performance benchmarks |
| Tailwind v4 | HIGH | Stable release Jan 2025, widespread adoption |
| shadcn/ui integration | MEDIUM-HIGH | Official Astro support exists, requires island architecture awareness |
| Dembrandt extraction | MEDIUM | Tool works but output quality varies by site; needs validation |
| TypeScript setup | HIGH | Standard practice for Astro projects in 2026 |
| Cloudflare Pages hosting | HIGH | Benchmarked performance data, clear pricing, Docker support in 2026 |

## Open Questions / Validation Needed

1. **Dembrandt output quality:** Run extraction on nousresearch.com to verify token accuracy. May need manual refinement for edge cases.
2. **shadcn/ui component needs:** Determine which interactive components are actually needed. Portfolio may be 95% static, minimizing React island overhead.
3. **Content frontmatter schema:** Review existing Hugo article frontmatter to design Astro content collection schema.

## Sources

**Framework Comparison:**
- [Astro vs Next.js comparison 2026 (Aalpha)](https://www.aalpha.net/blog/astro-vs-nextjs-comparison/)
- [Astro vs Next.js performance benchmarks (Senorit)](https://senorit.de/en/blog/astro-vs-nextjs-2025)
- [Developer migration experience: Next.js to Astro (DEV Community)](https://dev.to/alexcloudstar/i-moved-my-portfolio-website-from-nextjs-to-astro-best-decision-ever-4454)
- [Astro vs Next.js static sites (Pagepro)](https://pagepro.co/blog/astro-nextjs/)

**Astro Current Version:**
- [Astro releases (GitHub)](https://github.com/withastro/astro/releases)
- [Astro 5.0 announcement](https://astro.build/blog/astro-5/)

**Design System Extraction:**
- [Dembrandt blackpaper](https://www.dembrandt.com/blackpaper)
- [Dembrandt npm package](https://www.npmjs.com/package/dembrandt)
- [Dembrandt GitHub](https://github.com/dembrandt/dembrandt)
- [Superposition design system extraction](https://superposition.design/)

**Tailwind CSS v4:**
- [Tailwind CSS v4.0 release (official blog)](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS v4 migration guide (Digital Applied)](https://www.digitalapplied.com/blog/tailwind-css-v4-2026-migration-best-practices)

**shadcn/ui & Astro:**
- [shadcn/ui Astro installation (official)](https://ui.shadcn.com/docs/installation/astro)
- [Astro shadcn integration tips](https://astro-tips.dev/tips/shadcn/)
- [shadcn/ui portfolio templates](https://www.shadcn.io/template/category/portfolio)

**Content Collections:**
- [Astro content collections guide](https://docs.astro.build/en/guides/content-collections/)
- [Astro content collections 2026 guide (InHaq)](https://inhaq.com/blog/getting-started-with-astro-content-collections.html)

**Hosting Comparison:**
- [Vercel vs Netlify vs Cloudflare Pages 2026 (Digital Applied)](https://www.digitalapplied.com/blog/vercel-vs-netlify-vs-cloudflare-pages-comparison)
- [Hugo deployment comparison: Netlify, Vercel, Cloudflare (DasRoot)](https://dasroot.net/posts/2026/01/hugo-deployment-netlify-vercel-cloudflare-pages-comparison/)
- [Cloudflare vs Vercel vs Netlify edge performance 2026 (DEV)](https://dev.to/dataformathub/cloudflare-vs-vercel-vs-netlify-the-truth-about-edge-performance-2026-50h0)
- [Hosting platforms comparison 2026 (GitHub)](https://github.com/Wasserpuncher/hosting-platforms-comparison-2026)

**TypeScript Benefits:**
- [TypeScript fundamentals 2026 (Nucamp)](https://www.nucamp.co/blog/typescript-fundamentals-in-2026-why-every-full-stack-developer-needs-type-safety)
- [TypeScript best practices 2026 (Bacancy)](https://www.bacancytechnology.com/blog/typescript-best-practices)
