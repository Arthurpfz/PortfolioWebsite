# Phase 1: Foundation & Design System - Research

**Researched:** 2026-03-13
**Domain:** Modern static site generation, CSS-first design token systems, Astro 6 + Tailwind v4 integration
**Confidence:** HIGH

## Summary

Phase 1 establishes the technical foundation for a portfolio website redesign by setting up Astro 6 with Tailwind CSS v4 and extracting a design system from nousresearch.com. This phase represents a critical inflection point: decisions made here affect all subsequent work, particularly around design token architecture and CSS-first configuration patterns.

The modern approach in 2026 differs significantly from previous years. Tailwind v4 moved from JavaScript configuration to CSS-native @theme directives, making design tokens native CSS custom properties. Astro 6 deprecated its @astrojs/tailwind integration in favor of Tailwind's official Vite plugin. Both changes reflect the ecosystem's shift toward CSS-first, browser-native patterns that reduce build complexity and improve performance.

Design token extraction requires understanding the underlying system logic, not just copying visual values. The recommended approach uses a three-layer hierarchy (primitive → semantic → component tokens) implemented as CSS custom properties. Manual extraction with browser DevTools and CSS Peeper provides higher accuracy than automated tools like Dembrandt, which can struggle with edge cases despite offering W3C-compliant output.

**Primary recommendation:** Establish design tokens manually using browser DevTools to extract nousresearch.com's typography hierarchy, color system, and spacing scale. Implement tokens as CSS custom properties in three layers before writing any component code. Use Astro 6's create CLI with Tailwind v4's Vite plugin, avoiding deprecated @astrojs/tailwind integration.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUN-01 | Configure SSL/HTTPS for arthurpfz.com | Cloudflare Pages provides automatic SSL certificates via Universal SSL when custom domains are added through dashboard |
| FOUN-02 | Preserve professional domain (arthurpfz.com) | Custom domain setup via Cloudflare Pages dashboard with automatic CNAME creation for apex domains |
| DSGN-01 | Extract visual design system from nousresearch.com | Three-layer token hierarchy (primitive/semantic/component), manual extraction with DevTools + CSS Peeper, Dembrandt as optional verification tool |
| DSGN-05 | Implement clear typography hierarchy from Nous Research | Type scale extraction (H1-H6, body text), semantic typography tokens, responsive scaling with clamp() function |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 6.0.4+ | Static site generator with islands architecture | Zero-JS default, 2-3x faster builds than Next.js, 100/100 Lighthouse scores without optimization, islands pattern for 83% less JavaScript |
| Tailwind CSS | v4.1+ (stable) | Utility-first CSS framework | 5x faster builds with Rust engine, CSS-native @theme configuration, eliminates PostCSS chains, de facto standard for modern portfolios |
| Node.js | 22.12.0+ | JavaScript runtime | Minimum requirement for Astro 6, odd-numbered versions unsupported |
| @tailwindcss/vite | Latest | Tailwind v4 Vite plugin | Official integration replacing deprecated @astrojs/tailwind, required for Astro + Tailwind v4 |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Dembrandt | Latest | Design token extraction CLI | Optional automated extraction for verification, confidence-scored output conforming to W3C spec |
| CSS Peeper | Latest (Chrome ext) | Visual design inspection | Manual token extraction, faster than DevTools for design-oriented questions |
| Vitest | Latest | Unit testing framework | If nyquist_validation enabled, native Vite integration, ESM/TypeScript support via esbuild |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Astro 6 | Next.js 15 | Next.js adds React overhead, slower builds, 500kb+ bundles for static content; choose only if need server-side rendering features |
| Tailwind v4 | Vanilla CSS | Losing utility-first workflow, no design token autocomplete, harder to maintain consistency; choose only if team strongly prefers semantic CSS |
| Manual extraction | Dembrandt only | Automated tools miss context (semantic roles), lower accuracy on edge cases (15+ color shades); use Dembrandt for initial pass, validate manually |

**Installation:**
```bash
# Create Astro project
npm create astro@latest
# Choose: "Empty" template, Yes to TypeScript (strict)

# Install Tailwind v4 via Vite plugin (NOT @astrojs/tailwind)
npm install -D @tailwindcss/vite

# Optional: Design token extraction
npm install -g dembrandt

# Optional: Testing infrastructure (if nyquist_validation enabled)
npm install -D vitest @testing-library/react @testing-library/jest-dom happy-dom
```

## Architecture Patterns

### Recommended Project Structure
```
portfolio-website/
├── src/
│   ├── styles/
│   │   ├── tokens/           # Design token layers
│   │   │   ├── primitives.css   # Raw values (--color-blue-500, --spacing-4)
│   │   │   ├── semantic.css     # Purpose tokens (--color-background, --space-content)
│   │   │   └── components.css   # Component-specific (--button-radius, --card-padding)
│   │   └── global.css        # @import "tailwindcss" + @theme directive
│   ├── components/           # Future: Astro/React components
│   ├── layouts/              # Future: Page layouts
│   └── pages/
│       └── index.astro       # Homepage placeholder
├── public/                   # Static assets
├── astro.config.mjs          # Astro config with Tailwind Vite plugin
├── tsconfig.json             # TypeScript config
└── package.json
```

### Pattern 1: Three-Layer Token Hierarchy

**What:** Design tokens organized in primitive → semantic → component layers, each layer referencing the layer below via CSS custom properties.

**When to use:** Always. This is the foundation pattern for Phase 1.

**Example:**
```css
/* src/styles/tokens/primitives.css */
/* Layer 1: Raw values with no semantic meaning */
@layer primitives {
  :root {
    --color-blue-500: oklch(60% 0.16 250);
    --color-gray-50: #f9fafb;
    --spacing-4: 1rem;
    --spacing-6: 1.5rem;
    --radius-md: 0.5rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --line-height-normal: 1.5;
  }
}

/* src/styles/tokens/semantic.css */
/* Layer 2: Purpose-driven tokens expressing intent */
@layer semantic {
  :root {
    --color-background: var(--color-gray-50);
    --color-action-primary: var(--color-blue-600);
    --space-content: var(--spacing-4);
    --text-body: var(--font-size-base);
    --text-heading-2: var(--font-size-2xl);
  }
}

/* src/styles/tokens/components.css */
/* Layer 3: Component-specific variants */
@layer components {
  :root {
    --button-radius: var(--radius-md);
    --card-padding: var(--spacing-6);
    --nav-height: 4rem;
  }
}
```

**Source:** [Mavik Labs: Design Tokens That Scale in 2026](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026)

### Pattern 2: Tailwind v4 @theme Configuration

**What:** CSS-native theme configuration using @theme directive instead of JavaScript config files. Theme variables create both CSS custom properties AND Tailwind utility classes.

**When to use:** Defining design tokens that should have corresponding Tailwind utilities (colors, spacing, typography scales).

**Example:**
```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* These become BOTH --color-brand-500 CSS variables
     AND bg-brand-500 / text-brand-500 utilities */
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;

  /* Spacing scale */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
}

/* Use :root for CSS variables WITHOUT utility classes */
:root {
  --nav-height: 4rem; /* No need for h-nav-height utility */
}
```

**Key insight:** @theme creates utility classes automatically. Use :root for values that don't need utilities.

**Source:** [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/theme)

### Pattern 3: Typography Hierarchy Extraction

**What:** Extract H1-H6 hierarchy from reference site by inspecting computed styles, capturing font-size, line-height, font-weight, and letter-spacing as semantic tokens.

**When to use:** Design token extraction phase (DSGN-01, DSGN-05 requirements).

**Example:**
```css
/* Extract from nousresearch.com via DevTools */
/* Inspect H1 → Computed → font properties */

@theme {
  /* Type scale - extracted values */
  --font-size-xs: 0.75rem;      /* 12px */
  --font-size-sm: 0.875rem;     /* 14px */
  --font-size-base: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;     /* 18px */
  --font-size-xl: 1.25rem;      /* 20px */
  --font-size-2xl: 1.5rem;      /* 24px */
  --font-size-3xl: 1.875rem;    /* 30px */
  --font-size-4xl: 2.25rem;     /* 36px */

  /* Line heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}

/* Semantic typography tokens */
:root {
  --text-h1: var(--font-size-4xl);
  --text-h1-line-height: var(--line-height-tight);
  --text-h2: var(--font-size-3xl);
  --text-h2-line-height: var(--line-height-tight);
  --text-h3: var(--font-size-2xl);
  --text-body: var(--font-size-base);
  --text-body-line-height: var(--line-height-normal);
}
```

**Extraction process:**
1. Open nousresearch.com in Chrome
2. Install CSS Peeper extension
3. Use CSS Peeper to extract typography scale (faster than DevTools)
4. Inspect H1-H6 elements with DevTools → Computed tab
5. Record font-size, line-height, font-weight, letter-spacing
6. Identify mathematical relationships (modular scale ratio)
7. Document as primitive tokens, then create semantic mappings

**Source:** [CSS Peeper Workflow for Web Designers 2026](https://thelinuxcode.com/css-peeper-a-practical-css-viewer-workflow-for-web-designers-2026/)

### Pattern 4: Astro + Tailwind v4 Integration (2026)

**What:** Integration setup using Tailwind's official Vite plugin, not the deprecated @astrojs/tailwind integration.

**When to use:** Initial Astro project setup with Tailwind v4.

**Example:**
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* Your design tokens here */
}
```

```astro
---
// src/pages/index.astro
import '../styles/global.css';
---
<html>
  <head>
    <title>Portfolio</title>
  </head>
  <body class="bg-background text-foreground">
    <h1 class="text-4xl font-bold">Hello World</h1>
  </body>
</html>
```

**Critical:** The @astrojs/tailwind integration is deprecated for Tailwind v4. Using it will cause configuration conflicts and missing features.

**Source:** [Astro + Tailwind v4 Setup: 2026 Quick Guide](https://tailkits.com/blog/astro-tailwind-setup/)

### Anti-Patterns to Avoid

- **Copying values without understanding system:** Extracting 15+ shades of blue without recognizing it's a single hue with a systematic scale leads to design drift and inconsistency. Always identify the underlying scale logic.
- **Using deprecated @astrojs/tailwind with v4:** The integration doesn't support @theme directives and conflicts with Tailwind's Vite plugin. Use @tailwindcss/vite instead.
- **Mixing @theme and :root without intent:** @theme creates utility classes; :root doesn't. Accidentally using :root for color tokens means no bg-* or text-* utilities exist.
- **Skipping semantic layer:** Components referencing primitive tokens directly (--color-blue-500) can't be themed. Always use semantic tokens (--color-action-primary).
- **Automated extraction without validation:** Dembrandt and similar tools miss semantic meaning and produce low-confidence results for edge cases. Use as initial pass, validate manually.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Static site generation | Custom webpack + React setup | Astro 6 | 2-3x faster builds, zero-JS default, islands architecture proven at scale, extensive documentation and ecosystem |
| Utility CSS system | Custom utility class generator | Tailwind CSS v4 | 35x faster builds with Rust engine, autocomplete support, battle-tested at millions of sites, automatic unused class purging |
| Design token extraction | Manual pixel-hunting | CSS Peeper + DevTools + Dembrandt | Browser tools provide exact computed values, CSS Peeper optimized for design questions, Dembrandt provides W3C-compliant export format |
| SSL certificate management | Manual cert provisioning | Cloudflare Pages Universal SSL | Automatic issuance and renewal, globally distributed certificates, zero configuration beyond DNS setup |
| Typography scale generation | Ad-hoc font sizes | Modular scale with clamp() | Mathematical consistency ensures visual harmony, clamp() provides responsive scaling with fixed limits, accessibility tested |

**Key insight:** Modern tooling in 2026 has solved these problems with better performance and reliability than custom solutions. Focus effort on design extraction quality and token architecture, not rebuilding solved infrastructure.

## Common Pitfalls

### Pitfall 1: Design System Extraction Without Context Understanding
**What goes wrong:** Copying visual values (16px, #3B82F6) from nousresearch.com without understanding the underlying system (8pt spacing scale, semantic color roles) leads to design drift. Future styling decisions lack guidance, resulting in 15+ shades of similar colors and spacing values like 9px, 13px, 17px that have no mathematical relationship.

**Why it happens:** Automated extraction tools and manual pixel-hunting focus on "what" (the computed value) not "why" (the design decision). Designers use systematic scales; extracting without recognizing the scale loses this structure.

**How to avoid:**
- Extract the system, not just values
- Identify spacing scales (look for multiples: 4px, 8px, 16px, 24px = 4px base)
- Recognize typography hierarchies (ratio between H1/H2/H3 reveals scale type)
- Document semantic meaning alongside values (--color-blue-600 → --color-action-primary)
- Use extraction tools as starting points, manually verify patterns

**Warning signs:**
- 15+ shades of same color without clear roles
- Spacing values without mathematical relationship (9px, 13px, 17px)
- Needing to hardcode values frequently instead of using tokens
- Asking "which blue should I use?" instead of "what's the semantic role?"

### Pitfall 2: Using Deprecated @astrojs/tailwind Integration
**What goes wrong:** Installing @astrojs/tailwind with Tailwind v4 causes configuration conflicts. The @theme directive isn't recognized, CSS variables don't generate utility classes, and build errors occur due to PostCSS chain mismatches.

**Why it happens:** The integration was standard practice for Astro + Tailwind v3, so documentation and tutorials reference it. Developers following older guides or autocomplete suggestions install the deprecated package.

**How to avoid:**
- Use @tailwindcss/vite plugin instead of @astrojs/tailwind
- Follow Tailwind's official Astro guide, not third-party tutorials from pre-2026
- Add Tailwind via astro.config.mjs Vite plugins, not integrations array
- Import "tailwindcss" directly in CSS, not @tailwindcss/base

**Warning signs:**
- Build errors mentioning "unexpected @theme directive"
- Tailwind utilities not generating despite @theme definitions
- PostCSS warnings about plugin conflicts
- Documentation references @astrojs/tailwind package

### Pitfall 3: Skipping Semantic Token Layer
**What goes wrong:** Components reference primitive tokens directly (background-color: var(--color-blue-500)) instead of semantic tokens (var(--color-background)). Theming becomes impossible without editing every component. Color meaning is lost (why is this blue-500 vs blue-600?).

**Why it happens:** Semantic layer feels like extra work without immediate benefit. Primitive tokens are "right there" and work fine initially. The pain appears later during theming or maintenance.

**How to avoid:**
- Never reference primitive tokens in components
- Create semantic tokens for every use case (backgrounds, actions, text, borders)
- Name semantically, not descriptively (--color-action-primary, not --color-blue-button)
- Document semantic roles: "primary actions use --color-action-primary"
- Enforce via code review: flag any var(--color-blue-*) in component code

**Warning signs:**
- Component CSS contains var(--color-blue-500)
- Changing brand color requires editing 50+ files
- Team asks "which primitive should I use for X?"
- No documentation of color roles and purposes

### Pitfall 4: Mixing @theme and :root Without Understanding
**What goes wrong:** Developer defines --color-brand: #3b82f6 in :root, then wonders why bg-brand utility doesn't exist. Or defines --nav-height in @theme, creating useless h-nav-height utility that's never used, bloating CSS output.

**Why it happens:** The difference between @theme (creates utilities) and :root (CSS vars only) is subtle. Documentation examples mix both without explaining when to use each.

**How to avoid:**
- Use @theme for values that need Tailwind utilities (colors, spacing, typography)
- Use :root for component-specific values without utilities (--nav-height, --card-shadow)
- Ask: "Do I want bg-X or text-X utilities for this?" → Yes = @theme, No = :root
- Review generated CSS periodically: unused utilities indicate misuse

**Warning signs:**
- Utilities missing despite defining in CSS
- CSS output contains utilities never used in markup
- Confusion about why some values work with Tailwind classes and others don't

### Pitfall 5: Node.js Version Mismatch
**What goes wrong:** Installing Astro 6 on Node.js v20 or v23 (odd-numbered) causes cryptic build errors or runtime failures. Error messages don't clearly indicate version mismatch.

**Why it happens:** Astro 6 requires Node.js 22.12.0+, but developers use whatever version their machine has. Odd-numbered versions (v23) are explicitly unsupported but installation doesn't fail.

**How to avoid:**
- Check Node version BEFORE creating project: node --version
- Use nvm or volta to manage Node versions
- Set .nvmrc file: echo "22.12.0" > .nvmrc
- Document version requirement in README during setup
- CI/CD should fail on wrong Node version

**Warning signs:**
- Build succeeds locally but fails in CI
- Cryptic errors mentioning "unsupported syntax" or "unexpected token"
- Different behavior between team members' machines
- Errors referencing Node.js internals

## Code Examples

Verified patterns from official sources:

### Astro 6 Project Initialization
```bash
# Create Astro project with CLI wizard
npm create astro@latest

# Prompts:
# - Where should we create your new project? → ./portfolio-website
# - How would you like to start? → Empty
# - Install dependencies? → Yes
# - TypeScript? → Yes (strict)
# - Initialize git repository? → Yes

cd portfolio-website
```
**Source:** [Astro Installation Guide](https://docs.astro.build/en/install-and-setup/)

### Tailwind v4 Installation and Configuration
```bash
# Install Tailwind v4 Vite plugin
npm install -D @tailwindcss/vite
```

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-brand-500: #3b82f6;
  --spacing-4: 1rem;
}
```

```astro
---
// src/pages/index.astro
import '../styles/global.css';
---
<html>
  <body class="bg-brand-500 p-4">
    <h1>Configured!</h1>
  </body>
</html>
```
**Source:** [Tailwind CSS v4 2026 Migration Best Practices](https://www.digitalapplied.com/blog/tailwind-css-v4-2026-migration-best-practices)

### Design Token Extraction with Dembrandt
```bash
# Install Dembrandt globally
npm install -g dembrandt

# Extract design tokens from nousresearch.com
dembrandt nousresearch.com --output ./design-tokens.json

# View high-confidence colors only
dembrandt nousresearch.com

# View all confidence levels
dembrandt nousresearch.com --verbose-colors
```

**Output format (W3C Design Tokens spec):**
```json
{
  "colors": {
    "primary-500": {
      "value": "#3b82f6",
      "confidence": "high",
      "usage_count": 47
    },
    "neutral-50": {
      "value": "#f9fafb",
      "confidence": "medium",
      "usage_count": 12
    }
  },
  "spacing": {
    "4": { "value": "1rem", "confidence": "high" }
  }
}
```
**Source:** [Dembrandt GitHub](https://github.com/dembrandt/dembrandt)

### Manual Typography Extraction with CSS Peeper
```
1. Install CSS Peeper Chrome extension
2. Navigate to nousresearch.com
3. Click CSS Peeper icon
4. Select "Typography" tab
5. Document extracted values:
   - H1: 36px / 40px (font-size / line-height)
   - H2: 30px / 36px
   - H3: 24px / 32px
   - Body: 16px / 24px
6. Calculate scale ratio: 36/30 ≈ 1.2 (minor third scale)
```

**Convert to tokens:**
```css
@theme {
  /* Extracted scale */
  --font-size-base: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;     /* 18px */
  --font-size-xl: 1.25rem;      /* 20px */
  --font-size-2xl: 1.5rem;      /* 24px */
  --font-size-3xl: 1.875rem;    /* 30px */
  --font-size-4xl: 2.25rem;     /* 36px */
}

/* Semantic typography */
:root {
  --text-h1: var(--font-size-4xl);
  --text-h2: var(--font-size-3xl);
  --text-h3: var(--font-size-2xl);
  --text-body: var(--font-size-base);
}
```
**Source:** [CSS Peeper Workflow Guide](https://thelinuxcode.com/css-peeper-a-practical-css-viewer-workflow-for-web-designers-2026/)

### Cloudflare Pages Custom Domain Setup
```bash
# Process (via Cloudflare Dashboard, not CLI):
# 1. Navigate to Workers & Pages → Your Project → Custom domains
# 2. Click "Set up a domain"
# 3. Enter: arthurpfz.com
# 4. For apex domain: Site must be Cloudflare zone
#    - Configure nameservers to point to Cloudflare
#    - Cloudflare auto-creates CNAME record
# 5. SSL certificate issues automatically via Universal SSL
# 6. If certificate fails, add CAA record:
#    - Type: CAA
#    - Name: @
#    - Tag: issue
#    - Value: letsencrypt.org
```

**Verification:**
```bash
# Check SSL certificate
curl -vI https://arthurpfz.com 2>&1 | grep "SSL certificate"

# Verify CNAME resolution
dig arthurpfz.com CNAME
```
**Source:** [Cloudflare Pages Custom Domains Documentation](https://developers.cloudflare.com/pages/configuration/custom-domains/)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JavaScript config files (tailwind.config.js) | CSS-native @theme directives | Tailwind v4 (Jan 2025) | 35x faster builds, CSS variables accessible across all styling contexts, runtime theme switching without rebuilds |
| @astrojs/tailwind integration | @tailwindcss/vite plugin | Astro 5.2+ with Tailwind v4 (Feb 2026) | Eliminates PostCSS chain complexity, direct Vite integration, native v4 feature support |
| Manual design token pixel-hunting | Automated extraction with confidence scoring (Dembrandt) | 2025-2026 | Reduces extraction time from 3 hours to 5 minutes, W3C-compliant output, but requires manual validation for semantic meaning |
| Static font sizes | Responsive typography with clamp() | 2024-2026 | Fluid scaling across viewports with min/max bounds, eliminates breakpoint-specific font sizes |
| Separate primitive/semantic token files | Three-layer hierarchy in single system | 2025-2026 | Better traceability, easier theming, clearer component dependencies |

**Deprecated/outdated:**
- **@astrojs/tailwind package:** Deprecated for Tailwind v4, remains only for v3/legacy projects. Using it causes configuration conflicts and missing @theme support.
- **tailwind.config.js theme extension:** Replaced by @theme directive in CSS. Config files still used for plugins and content paths, but theme belongs in CSS now.
- **PostCSS plugin chains:** Tailwind v4's Vite plugin eliminates need for separate postcss.config.js and autoprefixer setup.

## Open Questions

1. **Dembrandt output quality on nousresearch.com specifically**
   - What we know: Tool extracts with confidence scoring, conforms to W3C spec, works well for standard sites
   - What's unclear: How it handles nousresearch.com's specific design patterns, whether confidence scores are reliable for this site
   - Recommendation: Run Dembrandt extraction as initial pass, manually validate all medium/low confidence results, use CSS Peeper for typography verification

2. **Exact semantic color roles in Nous Research design**
   - What we know: Site uses systematic color palette, likely has primary/secondary/neutral hierarchies
   - What's unclear: Specific semantic meanings (action colors vs informational vs decorative)
   - Recommendation: Extract primitives first, infer semantic roles from usage context (buttons, links, backgrounds), document assumptions for user validation

3. **Spacing scale mathematical base**
   - What we know: Modern design systems use 4px or 8px base grids
   - What's unclear: Which base nousresearch.com uses, whether it's consistent
   - Recommendation: Extract 10-15 spacing values, identify greatest common divisor, verify multiples align (4px base: 4, 8, 12, 16, 24, 32)

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest + @testing-library/react (latest stable) |
| Config file | `vitest.config.ts` (to be created in Wave 0) |
| Quick run command | `npm run test:unit` |
| Full suite command | `npm run test` |
| Estimated runtime | ~5 seconds (Phase 1 has minimal logic to test) |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUN-01 | HTTPS accessible at arthurpfz.com | manual | Visual verification in browser after deployment | N/A - deployment validation |
| FOUN-02 | Domain arthurpfz.com resolves correctly | manual | `curl -I https://arthurpfz.com` after DNS config | N/A - infrastructure validation |
| DSGN-01 | Design tokens extracted and documented | manual | Review `.planning/phases/01-foundation-design-system/design-tokens.json` | ❌ Wave 0 gap |
| DSGN-05 | Typography hierarchy visible in base styles | smoke | `npm run test:smoke -- typography.spec.ts` | ❌ Wave 0 gap |

### Nyquist Sampling Rate
- **Minimum sample interval:** After every committed task → run: `npm run test:unit` (~5 seconds)
- **Full suite trigger:** Before merging final task of any plan wave
- **Phase-complete gate:** Full suite green + manual DNS/SSL verification before `/gsd:verify-work` runs
- **Estimated feedback latency per task:** ~5 seconds (minimal logic in Phase 1)

### Wave 0 Gaps (must be created before implementation)
- [ ] `vitest.config.ts` — Configure Vitest with Astro's getViteConfig() helper
- [ ] `src/test/setup.ts` — Testing utilities and global setup
- [ ] `src/styles/tokens/__tests__/typography.spec.ts` — Smoke test verifying typography tokens are defined and accessible
- [ ] Framework install: `npm install -D vitest @testing-library/react @testing-library/jest-dom happy-dom @vitejs/plugin-react`
- [ ] Package.json scripts: `"test": "vitest"`, `"test:unit": "vitest run"`, `"test:smoke": "vitest run --testNamePattern=smoke"`

**Note:** FOUN-01 and FOUN-02 are infrastructure validations (SSL, DNS) that cannot be meaningfully automated in unit tests. These are verified manually post-deployment.

## Sources

### Primary (HIGH confidence)
- [Astro 6.0 Blog Post](https://astro.build/blog/astro-6/) - Release announcement
- [Astro Installation Guide](https://docs.astro.build/en/install-and-setup/) - Official setup documentation
- [Astro Upgrade to v6 Guide](https://docs.astro.build/en/guides/upgrade-to/v6/) - Migration instructions
- [Tailwind CSS v4 Theme Documentation](https://tailwindcss.com/docs/theme) - @theme directive usage
- [Tailwind CSS v4 2026 Migration Best Practices](https://www.digitalapplied.com/blog/tailwind-css-v4-2026-migration-best-practices) - Configuration differences v3 vs v4
- [Cloudflare Pages Custom Domains](https://developers.cloudflare.com/pages/configuration/custom-domains/) - SSL and domain setup
- [Astro + Tailwind v4 Setup: 2026 Quick Guide](https://tailkits.com/blog/astro-tailwind-setup/) - Integration pattern
- [Design Tokens That Scale in 2026 (Mavik Labs)](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026) - Three-layer token hierarchy

### Secondary (MEDIUM confidence)
- [Dembrandt Blackpaper](https://www.dembrandt.com/blackpaper) - Automated token extraction
- [Dembrandt GitHub](https://github.com/dembrandt/dembrandt) - CLI tool documentation
- [CSS Peeper: A Practical CSS Viewer Workflow (2026)](https://thelinuxcode.com/css-peeper-a-practical-css-viewer-workflow-for-web-designers-2026/) - Manual extraction methods
- [Mastering Typography in Design Systems (UX Collective)](https://uxdesign.cc/mastering-typography-in-design-systems-with-semantic-tokens-and-responsive-scaling-6ccd598d9f21) - Typography token structure
- [Typography in Design Systems (EightShapes)](https://medium.com/eightshapes-llc/typography-in-design-systems-6ed771432f1e) - Type scale hierarchies
- [Contentful: Design Token System Explained](https://www.contentful.com/blog/design-token-system/) - Three-layer hierarchy
- [Astro Testing Guide](https://docs.astro.build/en/guides/testing/) - Vitest setup
- [CSS Variables Gone Wrong: Pitfalls to Watch Out For](https://blog.pixelfreestudio.com/css-variables-gone-wrong-pitfalls-to-watch-out-for/) - Implementation pitfalls

### Tertiary (LOW confidence - flagged for validation)
- [Dembrandt Design Token Explorer](https://www.dembrandt.com/explorer) - Example outputs (site-specific quality unknown)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Astro 6 and Tailwind v4 documentation verified, benchmarks cross-referenced, integration patterns confirmed
- Architecture: HIGH - Three-layer token hierarchy is established pattern, Astro + Tailwind v4 integration verified via official sources, CSS Peeper workflow documented
- Pitfalls: HIGH - Design system extraction pitfalls verified through multiple design system documentation sources, @astrojs/tailwind deprecation confirmed via official Astro releases, Node.js version requirements verified in Astro 6 docs
- Validation architecture: MEDIUM - Vitest patterns documented for Astro, but Phase 1 has minimal testable logic (mostly static configuration)

**Research date:** 2026-03-13
**Valid until:** 2026-04-13 (30 days - stable technologies with well-documented patterns)
