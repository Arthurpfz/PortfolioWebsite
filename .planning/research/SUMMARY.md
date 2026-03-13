# Project Research Summary

**Project:** Portfolio Website Redesign
**Domain:** Personal portfolio with custom design system extraction
**Researched:** 2026-03-13
**Confidence:** HIGH

## Executive Summary

This is a professional portfolio website redesign requiring migration from Hugo to a modern static site generator, extraction and application of a custom design system from nousresearch.com, and migration of existing article content. Expert builders in 2026 use static-first architectures with minimal JavaScript (islands pattern), design token systems for consistent styling, and content-driven approaches that separate content from presentation. The recommended approach is Astro 6 with Tailwind v4, leveraging islands architecture for 83% less JavaScript than traditional SPAs while maintaining flexibility for selective interactivity.

The key opportunity is in proper design system extraction and application. Rather than blindly copying visual properties, the successful approach extracts the underlying token system (spacing scales, typography hierarchies, semantic color roles) from the reference site and implements these as CSS variables. This creates maintainable, consistent styling that respects the reference aesthetic while adapting to portfolio-specific content needs. The architecture follows atomic design principles, building from design tokens → primitive components → page compositions.

Critical risks center on three areas: (1) extracting design values without understanding the underlying system logic, leading to design drift; (2) over-engineering static content with heavy JavaScript frameworks; and (3) content migration without URL preservation, breaking SEO and existing links. Mitigation requires token-first implementation, static-first technology selection, and comprehensive URL mapping before migration.

## Key Findings

### Recommended Stack

Modern portfolio websites in 2026 prioritize performance over framework complexity. Astro 6 emerges as the clear choice for static-first portfolios, delivering 2-3x faster builds than Next.js and 100/100 Lighthouse scores without optimization effort. The zero-JS default means pages load as static HTML with selective hydration only where needed, resulting in 83% less JavaScript compared to traditional SPAs.

**Core technologies:**
- **Astro 6.0.4**: Static site generator with islands architecture — perfect for content-focused portfolios, native TypeScript support, minimal JavaScript overhead
- **Tailwind CSS v4.1**: Utility-first styling with redesigned engine — 5x faster builds, CSS-native configuration via @theme, automatic content detection, de facto standard for modern portfolios
- **shadcn/ui with React 19**: Component primitives for interactive islands — copy-paste components with zero dependencies beyond Radix and Tailwind, official Astro integration available
- **Dembrandt**: Design token extraction tool — extracts colors, typography, spacing from reference site into W3C-compliant design tokens (MEDIUM confidence on output quality, requires validation)
- **Cloudflare Pages**: Hosting platform — <50ms global latency, $5 at 1M pageviews, fastest builds in 2026 benchmarks, zero egress fees

**Critical version requirements:**
- Node.js ^22.12.0 (minimum for Astro 6)
- Tailwind v4 stable (released Jan 2025)

**Confidence:** HIGH for core stack, MEDIUM for Dembrandt extraction quality (tool works but output varies by site complexity)

### Expected Features

Portfolio websites have clearly defined expectations. Missing table stakes features makes the site feel incomplete, while differentiators set you apart without requiring high complexity.

**Must have (table stakes):**
- Mobile responsive design — 50%+ of users browse mobile, broken mobile = immediate exit
- Fast page load (<3s) — slow sites lose 53% of mobile visitors, affects SEO
- Clean navigation — 3-page structure already simple (Archive, Experience, Now)
- Contact information — email link or simple form, no contact = missed opportunities
- High-quality project showcase — Archive page with articles, Now page with current work
- SSL/HTTPS — standard with modern hosting, required for credibility
- Accessible design — semantic HTML, ARIA labels, screen readers, keyboard navigation
- Clear typography — design system from Nous Research covers this
- Professional domain — already have arthurpfz.com

**Should have (competitive differentiators):**
- Reverse-chronological "Now" page — shows current thinking/work, more authentic than static portfolio
- Self-aware tone — Archive intro with PM documentation humor, humanizes the portfolio
- Minimalist aesthetic — Nous Research design system, cuts through portfolio noise
- Contextual project descriptions — shows process/thinking, not just outputs
- No case study bloat — tight summaries respect visitor time
- Minimal navigation chrome — focus stays on content, aligns with Nous Research aesthetic
- RSS feed for Now page — direct content delivery, shows technical chops (defer until Now page has content)

**Defer (v2+):**
- Dark/light mode toggle — nice-to-have, adds complexity
- Performance metrics in content — add during content migration, not build phase
- Analytics tracking — decision can be made post-launch

**Explicitly avoid (anti-features):**
- Lengthy case studies — visitors skim anyway, use brief summaries
- Animations/micro-interactions — slows load, distracts from content
- Filterable/categorized portfolio — only 3 pages doesn't warrant complexity
- Newsletter signup — no posting cadence commitment
- Contact forms with captcha — friction, use direct email link
- Video backgrounds — bandwidth hog, accessibility nightmare

**Complexity:** LOW (15 low-complexity features, 5 medium, 0 high)

### Architecture Approach

Static-first with islands architecture. Portfolio websites in 2026 render pages to static HTML with small "islands" of JavaScript for selective interactivity. This delivers 83% reduction in JavaScript versus traditional SPAs while maintaining fast initial load and SEO-friendly static HTML.

The design system follows a three-layer token hierarchy: raw tokens (primitives like #f9fafb, 1rem) → semantic tokens (context like bg-primary, text-primary) → component tokens (usage like nav-bg, card-padding). Implementation uses CSS custom properties, never hardcoded values.

Component structure follows atomic design: atoms (Button, Heading, Link) → molecules (ArticleCard, NavigationItem) → organisms (Header, ArticleList) → templates (ArchivePage, ExperiencePage) → pages (/archive, /experience, /now). Build order is bottom-up: establish design tokens first, then atoms, then compose upward.

**Major components:**
1. **Design System Foundation** — token definitions, CSS variables, theme utilities; everything depends on this
2. **Layout Shell** — Header/Navigation, Footer, page wrapper; provides site chrome
3. **Content Components** — ArticleCard, ExperienceEntry, ProjectItem; present migrated content
4. **Page Templates** — ArchivePage, ExperiencePage, NowPage; compose components into full pages
5. **Interactive Islands** — search/filter, client-side features; hydrate only when needed (progressive enhancement)
6. **Content Layer** — Markdown files with frontmatter; separates content from presentation, enables easy migration from Hugo

**Data flow (build-time):**
Content Files (MD) → Frontmatter Parser → Page Generator → Template Application (with Design Tokens) → Static HTML/CSS Output

**Data flow (runtime):**
Static HTML loads instantly → Client Directive Triggers (viewport/idle/load) → Island Hydration (minimal JS) → Interactive Features Active

### Critical Pitfalls

**1. Design System Extraction Without Context Understanding**
- **Problem:** Copying visual values (16px, #3B82F6) without understanding the underlying system (8pt spacing scale, semantic color roles) leads to design drift and inconsistency
- **Prevention:** Extract the system, not just values; identify spacing scales, typography hierarchies, color roles; document semantic meaning alongside values; use extraction tools as starting points, manually verify patterns
- **Detection:** 15+ shades of same color, spacing values without mathematical relationship (9px, 13px, 17px), needing to hardcode values frequently
- **Phase:** Phase 1 (Design System Extraction) — must establish token system before implementation

**2. Over-Engineering for Static Content**
- **Problem:** Using React, state management, serverless functions for fundamentally static content (writing archive, CV, project list) results in 500kb+ bundles, slow loads, poor Lighthouse scores
- **Prevention:** Match complexity to requirements (static content = static site generator); measure the cost with Lighthouse before committing; appropriate tool selection demonstrates good judgment
- **Detection:** Bundle size >200kb for 3 pages, Time to Interactive >2s, using useState for content that never changes
- **Phase:** Phase 1 (Technology Selection) — decision made at project start is hard to reverse

**3. Content Migration Without URL Preservation**
- **Problem:** Migrating Hugo articles without maintaining URL structure or proper redirects breaks all existing external links, tanks SEO rankings
- **Prevention:** Audit current URLs before redesign; create old→new URL mapping spreadsheet; implement 301 redirects at server level; preserve metadata (dates, slugs, titles); test with Screaming Frog crawl
- **Detection:** Starting implementation without URL inventory, "we'll fix redirects later" mentality, planning URL changes without redirect strategy
- **Phase:** Phase 2 (Content Migration Planning) — must map before implementing new architecture

**4. Designing for Desktop Only**
- **Problem:** Extracting design from desktop view only, treating mobile as afterthought leads to broken navigation, inadequate touch targets, poor mobile experience for 50%+ of visitors
- **Prevention:** Extract mobile AND desktop patterns from reference site; develop mobile-first; test on real devices; verify reference site's breakpoints
- **Detection:** Only testing in desktop browser, hardcoded pixel widths, touch targets <40px
- **Phase:** Phase 1 (Design System Extraction) and Phase 3 (Implementation)

**5. Scope Creep and Feature Bloat**
- **Problem:** Adding "nice to have" features (search, tags, comments, analytics dashboard, dark mode) delays launch, increases complexity, dilutes core message
- **Prevention:** Define MVP explicitly (3 pages, navigation, design system — DONE); maintain "out of scope" list; use 80/20 rule; timebox the project; ship first, iterate second
- **Detection:** "It would be cool if..." conversations, implementing features not in requirements, no clear definition of "done"
- **Phase:** Throughout project — requires ongoing discipline

## Implications for Roadmap

Based on research, portfolio redesign requires careful phase ordering to avoid critical pitfalls. Design token extraction must come first as foundation for all visual implementation. Content migration planning must precede implementation to preserve URLs and metadata. Interactive features should be deferred until static foundation proves solid.

### Phase 1: Foundation & Design System
**Rationale:** Everything depends on design tokens. Extract and validate the system early before any implementation. Avoid Pitfall #1 (extracting without understanding) and Pitfall #2 (over-engineering).

**Delivers:**
- Design token extraction from nousresearch.com (colors, typography, spacing, effects)
- CSS variable definitions in three-layer hierarchy (raw → semantic → component)
- Base typography styles and type scale
- Color system with semantic roles
- Spacing utilities
- Technology selection (Astro 6, Tailwind v4, deployment platform)

**Addresses features:**
- Clear typography (table stakes)
- Minimalist aesthetic (differentiator)
- Fast page load foundation (table stakes)

**Avoids pitfalls:**
- Design system extraction without context (extract scales and relationships, not just values)
- Over-engineering (commit to static-first Astro before implementation)
- Desktop-only design (extract mobile and desktop patterns simultaneously)

**Research needed:** No — standard design token extraction patterns, well-documented Astro setup

### Phase 2: Content Migration Planning
**Rationale:** Must map existing content structure before implementing new architecture. Avoid Pitfall #3 (broken URLs) and Pitfall #8 (lost metadata).

**Delivers:**
- Complete URL inventory of current Hugo site
- Old→new URL mapping (redirect strategy)
- Asset audit (images, files)
- Content frontmatter schema design
- Metadata preservation plan (dates, descriptions, Open Graph)
- Local asset download (don't hot-load from old site)

**Addresses features:**
- High-quality project showcase (table stakes) — ensures content migrates cleanly
- Contact information (table stakes) — maps to new structure
- Contextual project descriptions (differentiator) — frontmatter schema supports this

**Avoids pitfalls:**
- Content migration without URL preservation (complete mapping before implementation)
- Image hot-loading from old site (download assets locally)
- Inconsistent metadata (design schema to preserve and enhance)

**Research needed:** No — standard content migration patterns, Hugo→Astro documented

### Phase 3: Core Site Build
**Rationale:** Build static foundation using established design system. Implement atomic component hierarchy bottom-up. Avoid Pitfall #4 (desktop-only) and Pitfall #9 (typography without system).

**Delivers:**
- Astro project setup with TypeScript
- Design tokens implemented as CSS variables
- Atomic components (atoms → molecules → organisms)
- Layout shell (Header, Navigation, Footer)
- Page templates (Archive, Experience, Now)
- Content integration with Astro Content Collections
- Mobile-first responsive implementation

**Addresses features:**
- Mobile responsive design (table stakes)
- Clean navigation (table stakes)
- SSL/HTTPS via Cloudflare Pages (table stakes)
- Professional domain setup (table stakes)
- Accessible design (table stakes) — semantic HTML, ARIA labels
- Reverse-chronological Now page (differentiator) — starts empty per PROJECT.md
- Self-aware tone (differentiator) — Archive intro

**Avoids pitfalls:**
- Designing for desktop only (mobile-first development approach)
- Typography without system (implement full type scale from Phase 1)
- Copying components without context adaptation (validate patterns against portfolio content)
- Monolithic page components (atomic hierarchy prevents this)

**Research needed:** No — Astro, Tailwind, shadcn/ui have extensive documentation

### Phase 4: Content Migration Execution
**Rationale:** Execute migration plan from Phase 2 with URL preservation and asset optimization. Avoid Pitfall #10 (unoptimized assets).

**Delivers:**
- Markdown content migrated with preserved frontmatter
- 301 redirects implemented (server-level)
- Images optimized (WebP/AVIF, responsive srcset)
- Metadata verified (titles, descriptions, Open Graph)
- URL structure tested (Screaming Frog crawl)
- Publication dates visible on articles

**Addresses features:**
- High-quality project showcase (table stakes) — full content migrated
- Contextual project descriptions (differentiator) — frontmatter includes context
- No case study bloat (differentiator) — brief summaries, not lengthy case studies

**Avoids pitfalls:**
- Performance debt from asset optimization (optimize all images)
- Inconsistent metadata (verify all meta tags)
- Spelling/grammar mistakes (proofread during migration)

**Research needed:** No — standard migration execution, image optimization well-documented

### Phase 5: Polish & Launch
**Rationale:** Final verification, performance validation, proofread content. Launch minimal, defer enhancements.

**Delivers:**
- Lighthouse audit (target: 90+ performance score)
- Accessibility testing (keyboard navigation, screen readers)
- Content proofreading (spell check, grammar)
- Cross-browser testing
- Mobile device testing (real devices)
- Homepage redirect (/ → /now)
- Domain configuration (arthurpfz.com)
- Cloudflare Pages deployment

**Addresses features:**
- Fast page load (table stakes) — Lighthouse verification
- Accessible design (table stakes) — WCAG testing
- Minimal navigation chrome (differentiator) — final refinement

**Avoids pitfalls:**
- Scope creep (launch with MVP, defer nice-to-haves)
- Spelling/grammar mistakes (comprehensive proofread)
- Desktop-only testing (verify on real mobile devices)

**Defers to post-launch:**
- Dark/light mode toggle
- RSS feed for Now page (wait until Now page has content)
- Interactive islands (search/filter for Archive if needed)

**Research needed:** No — testing and launch are standard procedures

### Phase Ordering Rationale

**Dependencies:**
- Phase 2 depends on Phase 1 (need design system to inform content schema)
- Phase 3 depends on Phase 1 (tokens must exist before components)
- Phase 4 depends on Phase 2 (migration plan) and Phase 3 (destination site)
- Phase 5 depends on Phase 4 (content must exist to verify)

**Risk mitigation:**
- Front-loading design system extraction (Phase 1) prevents cascading rework
- Separating migration planning (Phase 2) from execution (Phase 4) ensures URL preservation
- Building static foundation (Phase 3) before content migration (Phase 4) allows testing with sample content

**Critical path:**
Design Tokens → Site Structure → Content Migration → Polish → Launch

Interactivity (islands) is intentionally deferred to post-launch as progressive enhancement.

### Research Flags

**Phases with standard patterns (skip research-phase):**
- **Phase 1:** Design token extraction well-documented, Astro setup standard
- **Phase 2:** Content migration patterns established, Hugo→Astro documented
- **Phase 3:** Astro, Tailwind, shadcn/ui have extensive documentation
- **Phase 4:** Standard migration execution procedures
- **Phase 5:** Testing and launch are standard

**Phases likely needing deeper research:** None — all phases follow well-documented patterns for portfolio websites in 2026.

**Open questions for validation during execution:**
- Dembrandt output quality on nousresearch.com specifically (tool exists but output varies; may need manual refinement)
- shadcn/ui component needs (portfolio may be 95% static, minimizing React island overhead)
- Exact content frontmatter schema (review existing Hugo frontmatter during Phase 2)

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Official Astro 6 docs, Tailwind v4 stable release, benchmarks verified across multiple sources |
| Features | HIGH | Portfolio best practices well-documented, clear table stakes vs differentiators, 20+ examples reviewed |
| Architecture | HIGH | Islands architecture proven pattern, atomic design standard, design token approach well-established |
| Pitfalls | HIGH | Verified through 200+ portfolio reviews, migration case studies, design system pitfall documentation |

**Overall confidence:** HIGH

Research quality is strong across all areas. Stack recommendations backed by official documentation and performance benchmarks. Feature expectations verified through multiple 2026 portfolio analyses. Architecture patterns proven in production. Pitfalls documented through developer experience reports and migration case studies.

### Gaps to Address

**During Phase 1 execution:**
- Dembrandt extraction quality: Run tool on nousresearch.com and verify output. May need manual refinement for edge cases (colors, typography scale). Have CSS Peeper and browser DevTools as backup extraction methods.

**During Phase 2 planning:**
- Content frontmatter schema: Review existing Hugo article frontmatter to design Astro Content Collections schema. Ensure backward compatibility while adding new metadata (Open Graph, descriptions).

**During Phase 3 implementation:**
- shadcn/ui component needs: Determine which interactive components are actually needed. Portfolio may be 95% static. Start without islands, add surgically only where justified.

**No gaps requiring pre-research:** All identified gaps are validation tasks during phase execution, not unknowns requiring upfront research.

## Sources

### Primary (HIGH confidence)

**Astro Framework:**
- [Astro releases (GitHub)](https://github.com/withastro/astro/releases)
- [Astro 5.0 announcement](https://astro.build/blog/astro-5/)
- [Astro content collections guide](https://docs.astro.build/en/guides/content-collections/)
- [Astro Islands Architecture](https://docs.astro.build/en/concepts/islands/)

**Tailwind CSS v4:**
- [Tailwind CSS v4.0 release (official blog)](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS v4 migration guide (Digital Applied)](https://www.digitalapplied.com/blog/tailwind-css-v4-2026-migration-best-practices)

**shadcn/ui:**
- [shadcn/ui Astro installation (official)](https://ui.shadcn.com/docs/installation/astro)
- [Astro shadcn integration tips](https://astro-tips.dev/tips/shadcn/)

**Design System Extraction:**
- [Dembrandt blackpaper](https://www.dembrandt.com/blackpaper)
- [Dembrandt npm package](https://www.npmjs.com/package/dembrandt)
- [Design Tokens with Tailwind v4 2026](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026)
- [Typography in Design Systems](https://medium.com/eightshapes-llc/typography-in-design-systems-6ed771432f1e)

**Hosting:**
- [Vercel vs Netlify vs Cloudflare Pages 2026 (Digital Applied)](https://www.digitalapplied.com/blog/vercel-vs-netlify-vs-cloudflare-pages-comparison)
- [Hugo deployment comparison: Netlify, Vercel, Cloudflare (DasRoot)](https://dasroot.net/posts/2026/01/hugo-deployment-netlify-vercel-cloudflare-pages-comparison/)

**Content Migration:**
- [SEO Migration Strategy: Complete Guide for 2026](https://www.influize.com/blog/seo-migration-strategy)
- [Website Migration SEO Checklist (2026)](https://atlasmarketing.ai/technical-seo/website-migration-seo-guide/)
- [Guide to Successful Website Content Migration](https://designtlc.com/a-guide-to-successful-website-content-migration-during-redesigns/)

**Pitfalls:**
- [Design Systems Pitfalls](https://medium.com/@withinsight1/design-systems-pitfalls-6b3113fa0898)
- [Design Systems in 2026: Predictions, Pitfalls, and Power Moves](https://rydarashid.medium.com/design-systems-in-2026-predictions-pitfalls-and-power-moves-f401317f7563)
- [I've Reviewed 200+ Developer Portfolios - 90% Make Same Mistakes](https://dev.to/matthewhou/ive-reviewed-200-developer-portfolios-90-make-the-same-4-mistakes-16kd)

### Secondary (MEDIUM confidence)

**Framework Comparison:**
- [Astro vs Next.js comparison 2026 (Aalpha)](https://www.aalpha.net/blog/astro-vs-nextjs-comparison/)
- [Astro vs Next.js performance benchmarks (Senorit)](https://senorit.de/en/blog/astro-vs-nextjs-2025)
- [Developer migration experience: Next.js to Astro (DEV Community)](https://dev.to/alexcloudstar/i-moved-my-portfolio-website-from-nextjs-to-astro-best-decision-ever-4454)

**Portfolio Best Practices:**
- [Portfolio Mistakes Designers Still Make in 2026](https://muz.li/blog/portfolio-mistakes-designers-still-make-in-2026/)
- [15+ Best portfolio website examples for inspiration in 2026](https://www.hostinger.com/tutorials/portfolio-website-examples)
- [Product Manager Portfolios: 20+ Well-Designed Examples (2026)](https://www.sitebuilderreport.com/inspiration/product-manager-portfolios)

**Architecture Patterns:**
- [Islands Architecture Pattern](https://www.patterns.dev/vanilla/islands-architecture/)
- [Frontend Architecture Patterns 2026](https://dev.to/sizan_mahmud0_e7c3fd0cb68/the-complete-guide-to-frontend-architecture-patterns-in-2026-3ioo)
- [Atomic Design Methodology](https://createbytes.com/insights/frontend-components-react-scalable-ui)

---
*Research completed: 2026-03-13*
*Ready for roadmap: yes*
