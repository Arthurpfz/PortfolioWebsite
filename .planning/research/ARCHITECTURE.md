# Architecture Patterns

**Domain:** Portfolio Website with Custom Design System
**Researched:** 2026-03-13

## Recommended Architecture

**Pattern:** Static-First with Islands Architecture (Astro) or Server-First with Client Islands (Next.js)

Portfolio websites in 2026 prioritize performance and minimal JavaScript. The architecture separates static content rendering from selective interactivity:

```
┌─────────────────────────────────────────────┐
│         Design System Foundation            │
│  (Design Tokens → CSS Variables → Theme)    │
└──────────────────┬──────────────────────────┘
                   │
    ┌──────────────┴──────────────┐
    │                             │
┌───▼────────────┐    ┌──────────▼──────────┐
│  Static Pages  │    │  Interactive Islands │
│  (HTML/CSS)    │    │  (Hydrated Components)│
└───┬────────────┘    └──────────┬──────────┘
    │                             │
    └──────────────┬──────────────┘
                   │
         ┌─────────▼─────────┐
         │   Content Layer    │
         │ (Markdown/MDX/CMS) │
         └───────────────────┘
```

### Component Boundaries

| Component | Responsibility | Communicates With | Type |
|-----------|---------------|-------------------|------|
| **Design System** | Token definitions, CSS variables, theme utilities | All presentational components | Foundation |
| **Layout Components** | Page structure (Header, Footer, Navigation) | All page-level components | Static/Shell |
| **Navigation** | Site-wide routing, active states | Layout, Router | Partially Interactive |
| **Page Templates** | Content structure for Archive, Experience, Now pages | Layout, Content Components | Static |
| **Content Components** | Article cards, project items, experience entries | Page Templates, Content Layer | Static |
| **Interactive Islands** | Client-side features (filters, search, animations) | Specific content sections | Hydrated |
| **Content Layer** | Markdown/MDX files with frontmatter metadata | Page Templates, Content Components | Data Source |

### Data Flow

**Build-time (Static Generation):**
```
Content Files (MD/MDX)
  → Frontmatter Parser
  → Page Generator
  → Template Application (with Design Tokens)
  → Static HTML/CSS Output
```

**Runtime (Selective Hydration):**
```
Static HTML loads instantly
  → Client Directive Triggers (viewport/idle/load)
  → Island Hydration (minimal JS)
  → Interactive Features Active
```

**Design System Application:**
```
Extract Design Tokens from Reference (nousresearch.com)
  → Define CSS Variables (:root)
  → Apply to Components via Token References
  → Generate Theme Utilities
```

## Patterns to Follow

### Pattern 1: Islands Architecture (Recommended for Static Portfolios)
**What:** Render pages to static HTML with small "islands" of JavaScript for interactivity

**When:** Portfolio is primarily content-driven (Archive, Experience pages) with selective interactive features

**Benefits:**
- 83% reduction in JavaScript vs traditional SPAs (Astro benchmarks)
- Fast initial load, progressive enhancement
- SEO-friendly, static HTML
- Perfect for content-heavy sites

**Example Structure:**
```typescript
// Archive page - mostly static
---
import ArticleCard from '../components/ArticleCard.astro';
import SearchFilter from '../islands/SearchFilter.jsx';
---

<Layout>
  <h1>Arthur's PM Homework</h1>
  <!-- Static content renders fast -->
  {articles.map(article => <ArticleCard {...article} />)}

  <!-- Interactive island hydrates only when needed -->
  <SearchFilter client:visible articles={articles} />
</Layout>
```

### Pattern 2: Design Token Foundation
**What:** Structure design system as layered tokens (raw → semantic → component)

**When:** Extracting and applying custom design system (Nous Research aesthetic)

**Structure:**
```css
/* Layer 1: Raw tokens (primitives) */
:root {
  --color-gray-50: #f9fafb;
  --color-gray-900: #111827;
  --space-1: 0.25rem;
  --space-4: 1rem;
  --font-sans: -apple-system, sans-serif;
}

/* Layer 2: Semantic tokens (context) */
:root {
  --color-bg-primary: var(--color-gray-50);
  --color-text-primary: var(--color-gray-900);
  --spacing-section: var(--space-4);
}

/* Layer 3: Component tokens (usage) */
.nav {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  padding: var(--spacing-section);
}
```

**Implementation:**
1. Extract raw values from nousresearch.com using browser DevTools or tools like Dembrandt CLI
2. Define primitives as CSS custom properties
3. Create semantic aliases for context-specific usage
4. Apply tokens to components (never hardcode values)

### Pattern 3: Atomic Component Hierarchy
**What:** Build UI from small reusable pieces to complex compositions

**When:** Creating design system components and page templates

**Hierarchy:**
```
Atoms (primitives)
  → Button, Link, Heading, Text
Molecules (combinations)
  → ArticleCard, NavigationItem, ExperienceEntry
Organisms (sections)
  → Header, ArticleList, ExperienceTimeline
Templates (layouts)
  → ArchivePage, ExperiencePage, NowPage
Pages (instances)
  → /archive, /experience, /now
```

**Build Order:** Bottom-up (atoms → molecules → organisms → templates → pages)

**Dependencies:**
- Molecules depend on atoms
- Organisms depend on molecules and atoms
- Templates compose organisms
- Pages instantiate templates with content

### Pattern 4: Content-Driven Architecture
**What:** Separate content from presentation with frontmatter metadata

**When:** Managing articles, projects, experience entries

**Example:**
```markdown
---
title: "Product Strategy 101"
date: 2026-01-15
category: "PM Homework"
tags: ["strategy", "product"]
draft: false
---

Content here...
```

**Benefits:**
- Easy content migration from Hugo
- Metadata enables filtering, sorting, grouping
- Content edits don't touch code
- Future CMS migration path

### Pattern 5: Server-First with Client Islands (Next.js Alternative)
**What:** Default to Server Components, hydrate only interactive parts

**When:** Need more dynamic features or prefer React ecosystem

**Structure:**
```typescript
// app/archive/page.tsx - Server Component by default
import ArticleList from '@/components/ArticleList';
import SearchFilter from '@/islands/SearchFilter';

export default async function ArchivePage() {
  const articles = await getArticles(); // Fetched on server

  return (
    <>
      <h1>Arthur's PM Homework</h1>
      <ArticleList articles={articles} /> {/* Static */}
      <SearchFilter articles={articles} /> {/* "use client" island */}
    </>
  );
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Full Single-Page Application (SPA)
**What:** Loading entire framework for static content

**Why bad:**
- Unnecessary JavaScript overhead (100KB+ baseline)
- Slower initial render
- SEO complications
- Over-engineering for content-focused portfolio

**Instead:** Use islands architecture or SSG with selective hydration

### Anti-Pattern 2: Design Token Hardcoding
**What:** Writing color values, spacing, font sizes directly in components

**Why bad:**
- Design changes require finding/replacing across codebase
- Inconsistencies emerge over time
- Difficult to maintain design system fidelity
- Can't easily switch themes or update from reference site

**Instead:** Extract tokens first, reference via CSS variables

### Anti-Pattern 3: Monolithic Page Components
**What:** Building entire pages as single large components

**Why bad:**
- Can't reuse sections across pages
- Hard to test individual pieces
- Difficult to update portions independently
- Mixing concerns (layout + content + interactivity)

**Instead:** Compose pages from smaller, focused components

### Anti-Pattern 4: Over-Abstraction Early
**What:** Creating complex component APIs before patterns emerge

**Why bad:**
- Premature complexity
- Harder to iterate on design
- Abstractions based on assumptions, not usage

**Instead:** Start with simple components, abstract when duplication emerges (3+ similar instances)

### Anti-Pattern 5: Tight Content-Code Coupling
**What:** Embedding content directly in component files

**Why bad:**
- Content changes require code deployments
- Can't update articles without touching components
- Migration from Hugo becomes difficult
- Content versioning mixed with code versioning

**Instead:** Keep content in Markdown/MDX with frontmatter, components consume via props

## Scalability Considerations

| Concern | Current Need | At 50+ Articles | Future Expansion |
|---------|--------------|-----------------|------------------|
| **Build Time** | <5s for 10-15 articles | Consider incremental builds, caching | Move to on-demand ISR |
| **Search/Filter** | Client-side JS filter | Index with Pagefind or similar | Server-side search API |
| **Content Organization** | Flat file structure | Nested directories by category/year | Headless CMS (Sanity, Contentful) |
| **Asset Management** | Co-located images | Image optimization pipeline | CDN with transforms (Cloudinary) |
| **Navigation** | Static config | Auto-generate from content structure | Dynamic nav with sections |
| **Interactive Features** | Minimal islands | Consider code-splitting strategies | Lazy load with route-based chunks |

## Suggested Build Order (Dependencies)

### Phase 1: Foundation (Build First)
**Components:**
- Design token extraction from nousresearch.com
- CSS variable definitions (:root)
- Base typography styles
- Color system
- Spacing utilities

**Why First:** Everything depends on design tokens. Lock this early.

**Deliverable:** `tokens.css` or `design-system.css`

### Phase 2: Atoms (Primitives)
**Components:**
- Typography components (Heading, Text, Link)
- Button (if needed)
- Basic layout primitives (Container, Stack, Grid)

**Depends On:** Design tokens

**Deliverable:** Reusable primitive components

### Phase 3: Layout Shell
**Components:**
- Header/Navigation
- Footer
- Page layout wrapper
- Navigation logic

**Depends On:** Atoms, design tokens

**Deliverable:** Site chrome that wraps all pages

### Phase 4: Content Components (Molecules)
**Components:**
- ArticleCard (for Archive page)
- ExperienceEntry (for Experience page)
- ProjectItem (for Now page)

**Depends On:** Atoms, design tokens

**Deliverable:** Content presentation components

### Phase 5: Page Templates (Organisms)
**Components:**
- ArchivePage template
- ExperiencePage template
- NowPage template (empty state)

**Depends On:** Layout shell, content components

**Deliverable:** Complete page structures

### Phase 6: Content Integration
**Tasks:**
- Content migration from Hugo
- Frontmatter standardization
- Article routing
- Static generation configuration

**Depends On:** Page templates

**Deliverable:** Full site with migrated content

### Phase 7: Interactive Islands (Optional Enhancement)
**Components:**
- Search/filter for Archive
- Animations/transitions
- Any client-side features

**Depends On:** Static pages working

**Deliverable:** Progressive enhancements

### Phase 8: Homepage Redirect
**Tasks:**
- Configure / → /now redirect
- 301 redirect setup

**Depends On:** Now page exists

**Deliverable:** Homepage behavior

## Design System Extraction/Application Approach

### Step 1: Analyze Reference Site (nousresearch.com)
**Tools:**
- Browser DevTools (Inspect computed styles)
- Dembrandt CLI (`dembrandt nousresearch.com`) - automated extraction
- CSS Peeper browser extension
- Project Wallace CSS analyzer

**Extract:**
- Color palette (backgrounds, text, accents, borders)
- Typography scale (font families, sizes, weights, line heights)
- Spacing scale (margins, padding, gaps)
- Layout patterns (max-width, grid structures)
- Border radius, shadows, transitions
- Overall aesthetic feel (minimal, spacious, clean)

**Output:** JSON or CSS file with raw token values

### Step 2: Organize as Design Tokens
**Structure:** Three-layer hierarchy

```
Raw Tokens (primitives)
  ├─ Colors: gray-50 through gray-900, accent colors
  ├─ Typography: font families, size scale, weights
  ├─ Spacing: 0.25rem increments (1-16)
  └─ Effects: shadows, borders, transitions

Semantic Tokens (context)
  ├─ Backgrounds: bg-primary, bg-secondary, bg-accent
  ├─ Text: text-primary, text-secondary, text-muted
  ├─ Spacing: section-gap, item-gap, inline-gap
  └─ Interactive: hover-transition, focus-ring

Component Tokens (usage)
  ├─ Navigation: nav-bg, nav-text, nav-spacing
  ├─ Article: card-bg, card-border, card-padding
  └─ Layout: max-width-prose, max-width-wide
```

### Step 3: Implement as CSS Variables
**File:** `src/styles/tokens.css` or `app/globals.css`

```css
:root {
  /* Raw tokens */
  --gray-50: #f9fafb;
  --gray-900: #111827;
  --space-4: 1rem;

  /* Semantic tokens */
  --color-bg-primary: var(--gray-50);
  --color-text-primary: var(--gray-900);

  /* Component tokens */
  --nav-bg: var(--color-bg-primary);
}
```

### Step 4: Apply to Components
**Never hardcode values:**
```tsx
// Bad
<div style={{ color: '#111827', padding: '1rem' }}>

// Good
<div className="text-primary p-4">
// or
<div style={{
  color: 'var(--color-text-primary)',
  padding: 'var(--space-4)'
}}>
```

### Step 5: Document and Validate
**Create:** Design system reference page (optional, future)
- Show all tokens visually
- Usage examples
- Do's and don'ts

**Validate:** Compare rendered pages to nousresearch.com
- Color accuracy
- Typography matching
- Spacing consistency
- Overall aesthetic feel

## Technology Stack Implications

### Astro (Recommended for Static Portfolio)
**Pros:**
- Islands architecture native
- 83% less JavaScript than Next.js/Nuxt
- Excellent for content-heavy sites
- Simple mental model (mostly static + islands)
- Supports React/Vue/Svelte components if needed

**Cons:**
- Less mature ecosystem than Next.js
- Fewer ready-made portfolio templates
- Learning curve if unfamiliar

**Best For:** This project (primarily static with minimal interactivity)

### Next.js (Alternative)
**Pros:**
- Server Components reduce JavaScript
- Huge ecosystem and community
- Vercel deployment optimized
- More templates/examples available

**Cons:**
- More complex (App Router, Server/Client components)
- Higher baseline JavaScript
- Potential over-engineering for simple portfolio

**Best For:** If planning dynamic features or prefer React ecosystem

### Hugo (Current, Not Recommended)
**Pros:**
- Already in use, content exists
- Very fast builds
- Simple for basic sites

**Cons:**
- Go templating less flexible than JSX/components
- Design system extraction harder (no component reuse)
- Limited interactivity options
- Theme-based approach constrains custom design

**Recommendation:** Migrate away, preserve content only

## Sources

**Architecture Patterns:**
- [Astro Islands Architecture](https://docs.astro.build/en/concepts/islands/)
- [Islands Architecture Pattern](https://www.patterns.dev/vanilla/islands-architecture/)
- [Next.js Architecture (2026)](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)
- [Frontend Architecture Patterns 2026](https://dev.to/sizan_mahmud0_e7c3fd0cb68/the-complete-guide-to-frontend-architecture-patterns-in-2026-3ioo)

**Component Hierarchy:**
- [Component Architecture Strategies](https://medium.com/@ertugrulyaman99/component-architecture-in-frontend-projects-fundamentals-and-structuring-strategies-cac16b1e4082)
- [Atomic Design Methodology](https://createbytes.com/insights/frontend-components-react-scalable-ui)
- [React Architecture Best Practices 2026](https://www.bacancytechnology.com/blog/react-architecture-patterns-and-best-practices)

**Design Systems:**
- [Building Design Systems 2026](https://medium.com/@padmacnu/building-the-ultimate-design-system-a-complete-architecture-guide-for-2026-6dfcab0e9999)
- [Design Tokens Architecture](https://feature-sliced.design/blog/design-tokens-architecture)
- [Design Tokens with Tailwind v4 2026](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026)
- [Design Tokens Guide](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/)

**Design Token Extraction:**
- [Dembrandt - Automated Token Extraction](https://www.dembrandt.com/blackpaper)
- [Superposition - Design System Extraction](https://superposition.design/)
- [CSS Design Tokens Analyzer](https://www.projectwallace.com/design-tokens)

**Portfolio Best Practices:**
- [Portfolio Engineering 2026](https://medium.com/@imamutheen2804/portfolio-engineering-design-standards-and-implementation-0c03e03ce169)
- [Portfolio Website Examples 2026](https://emergent.sh/learn/best-portfolio-website-builders)
- [Architecture Portfolio Examples](https://popwave.ai/blog/best-architecture-portfolio-websites)

**Performance & Static Sites:**
- [Static Site Architecture 2026](https://feature-sliced.design/blog/ssg-jamstack-architecture)
- [Astro Framework Guide 2026](https://alexbobes.com/programming/a-deep-dive-into-astro-build/)
- [Top Static Site Generators 2026](https://hygraph.com/blog/top-12-ssgs)

---

*Architecture research: 2026-03-13*
*Confidence: HIGH for patterns and component structure, MEDIUM for specific token values (pending extraction from nousresearch.com)*
