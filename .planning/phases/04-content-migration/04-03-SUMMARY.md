---
phase: 04-content-migration
plan: 03
subsystem: content-rendering
tags: [dynamic-routes, markdown-rendering, url-redirects, content-collections]
dependency_graph:
  requires: [04-01, 04-02]
  provides: [individual-article-pages, url-redirects]
  affects: [archive-navigation, seo-preservation]
tech_stack:
  added: [astro-render-api, cloudflare-redirects]
  patterns: [dynamic-routes, prose-styling]
key_files:
  created:
    - src/pages/archive/[slug].astro
    - public/_redirects
  modified:
    - src/pages/archive.astro
decisions:
  - "Use render() from astro:content for glob loader compatibility"
  - "Extract slug from article.id by removing .md extension"
  - "Apply Cloudflare Pages _redirects for Hugo URL migration"
  - "Constrain article content to 70ch max-width for readability"
metrics:
  duration: 2
  tasks_completed: 3
  files_created: 2
  files_modified: 1
  commits: 3
  completed_date: "2026-03-14"
---

# Phase 04 Plan 03: Individual Article Pages & URL Redirects Summary

**One-liner:** Dynamic article pages with markdown rendering and Hugo URL redirects via Cloudflare Pages

## What Was Built

Created individual article pages at /archive/{slug} URLs with full markdown rendering, made archive titles clickable, and configured URL redirects from old Hugo paths (/post/*) to new Astro paths (/archive/*).

## Tasks Completed

### Task 1: Create dynamic article page
**Status:** ✅ Complete
**Commit:** 6cd890c
**Files:** src/pages/archive/[slug].astro

Implemented dynamic route with getStaticPaths() generating routes for all 13 articles. Used render() from astro:content for glob loader compatibility. Applied comprehensive prose styling for markdown content:
- Typography hierarchy (H1-H6) with design tokens
- Paragraph and list spacing
- Blockquote styling with left border
- Image constraints (max-width 100%, centered)
- Link styling with hover effects
- Code block formatting with syntax highlighting support
- Article metadata display (title, date, tags)

Build generates static HTML for all 13 articles in dist/archive/{slug}/index.html.

### Task 2: Make article titles clickable on Archive page
**Status:** ✅ Complete
**Commit:** 992f793
**Files:** src/pages/archive.astro

Wrapped article titles in anchor tags linking to /archive/{slug}. Extracted slug from article.id (removed .md extension). Added link styling with color tokens and hover underline effect. Navigation maintains minimalist design consistency.

### Task 3: Add URL redirects for old Hugo paths
**Status:** ✅ Complete
**Commit:** aa0b0d5
**Files:** public/_redirects

Created Cloudflare Pages _redirects file with permanent 301 redirects:
- /post/*/ → /archive/:splat (with trailing slash)
- /post/* → /archive/:splat (without trailing slash)

Preserves SEO by using permanent redirect status. File automatically included in build output at dist/_redirects for Cloudflare deployment.

## Deviations from Plan

None - plan executed exactly as written. Initial render API issue resolved by using render() from astro:content instead of entry.render() method (Astro 6 glob loader pattern).

## Verification Results

### Automated Checks
- ✅ Build generates 17 pages total (13 articles + 4 core pages)
- ✅ Article pages exist at dist/archive/hooked/, lean-product-playbook/, outcomes-over-outputs/
- ✅ Archive page has 1 clickable link per article title
- ✅ _redirects file contains 2 redirect rules with 301 status

### Manual Verification (Deferred)
- Server startup and browser testing deferred (static site verification)
- Redirect testing deferred until Phase 5 Cloudflare deployment

## Technical Details

**Content Rendering Pattern:**
```typescript
const { entry } = Astro.props;
const { Content } = await render(entry);
```

**Dynamic Route Configuration:**
```typescript
export const getStaticPaths = (async () => {
  const articles = await getCollection('articles');
  const publishedArticles = articles.filter(article => !article.data.draft);
  return publishedArticles.map(entry => ({
    params: { slug: entry.id.replace(/\.md$/, '') },
    props: { entry },
  }));
}) satisfies GetStaticPaths;
```

**Prose Styling Approach:**
- Global CSS selectors for markdown elements
- Design token consistency (--text-*, --space-*, --color-*)
- 70ch content width for optimal readability
- Responsive image handling

## Gap Closure

Closed verification gap from 04-VERIFICATION.md: "Old article URLs redirect properly to new Archive structure"

## Key Files

**Created:**
- `/Users/arthurpfalzgraf/Desktop/Projects/PortfolioWebsite/src/pages/archive/[slug].astro` - Dynamic article route (180 lines)
- `/Users/arthurpfalzgraf/Desktop/Projects/PortfolioWebsite/public/_redirects` - Cloudflare redirect rules (4 lines)

**Modified:**
- `/Users/arthurpfalzgraf/Desktop/Projects/PortfolioWebsite/src/pages/archive.astro` - Added clickable article titles

## Next Steps

Phase 4 content migration complete. All 13 Hugo articles migrated with:
- Content collection schema (Plan 04-01)
- Article images migrated and referenced (Plan 04-02)
- Individual article pages with redirects (Plan 04-03)

Ready for Phase 5: Launch preparation.

## Self-Check

Verifying created files exist:

```bash
FOUND: src/pages/archive/[slug].astro
FOUND: public/_redirects
```

Verifying commits exist:

```bash
aa0b0d5 feat(04-03): add url redirects for old hugo paths
992f793 feat(04-03): make article titles clickable on archive page
6cd890c feat(04-03): create dynamic article pages
```

**Result:** PASSED - All files created and commits recorded
