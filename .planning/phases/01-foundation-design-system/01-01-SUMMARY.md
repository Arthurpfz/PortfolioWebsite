---
phase: 01-foundation-design-system
plan: 01
subsystem: foundation
tags: [astro, tailwind, typescript, build-tools]
dependency_graph:
  requires: []
  provides: [astro-6-runtime, tailwind-v4-integration, typescript-strict-config]
  affects: [all-subsequent-plans]
tech_stack:
  added:
    - name: Astro
      version: 6.0.4
      purpose: Static site generator with islands architecture
    - name: "@tailwindcss/vite"
      version: 4.2.1
      purpose: Tailwind v4 Vite plugin for CSS-native configuration
    - name: TypeScript
      version: strictest
      purpose: Type safety for .astro files
  patterns:
    - CSS-native design tokens via @theme directive (not JavaScript config)
    - Vite plugin integration (not deprecated @astrojs/tailwind)
    - Minimal template with zero framework overhead
key_files:
  created:
    - package.json
    - astro.config.mjs
    - tsconfig.json
    - src/styles/global.css
    - src/pages/index.astro
  modified: []
decisions:
  - summary: Used Astro 6's minimal template instead of overlaying on Hugo structure
    rationale: Hugo files (config.toml, themes/, layouts/) conflict with Astro — cleaner to start fresh
    alternatives: [Keep Hugo files, Create in subdirectory]
    impact: Old Hugo files remain but are ignored by Astro
  - summary: Created Astro project in temp directory then moved files
    rationale: npm create astro requires empty directory — copied generated files to preserve .planning/
    alternatives: [Force init in non-empty dir, Manual file creation]
    impact: Slightly longer setup but preserves planning context
metrics:
  duration_minutes: 26
  tasks_completed: 3
  files_created: 5
  commits: 3
  completed_date: 2026-03-13
---

# Phase 01 Plan 01: Astro 6 + Tailwind v4 Foundation Summary

**One-liner:** Astro 6 static site generator with Tailwind v4 CSS-native configuration via Vite plugin, TypeScript strict mode, and placeholder homepage on localhost:4321

## Execution Summary

Successfully established the technical foundation for the portfolio redesign by initializing Astro 6 with TypeScript strict mode and integrating Tailwind v4 via the official Vite plugin. The development environment is fully operational with zero-configuration Tailwind utilities working on a placeholder homepage. Build succeeds, dev server runs without errors, and all verification criteria passed.

### Tasks Completed

| Task | Name | Status | Commit |
|------|------|--------|--------|
| 1 | Initialize Astro 6 project with TypeScript | ✓ | 5b3d7d4 |
| 2 | Install and configure Tailwind v4 via Vite plugin | ✓ | eb9b062 |
| 3 | Create placeholder homepage with Tailwind verification | ✓ | 80c0cf3 |

### Verification Results

**Automated checks:**
- ✓ Astro build succeeds and generates dist/index.html
- ✓ package.json contains @tailwindcss/vite dependency
- ✓ astro.config.mjs uses tailwindcss() in Vite plugins
- ✓ src/styles/global.css imports "tailwindcss" with @theme scaffold
- ✓ Built HTML contains Tailwind utility classes
- ✓ Generated CSS (8.3KB) includes Tailwind base, components, utilities layers

**Manual checks:**
- ✓ Dev server starts at localhost:4321
- ✓ Placeholder homepage renders with gray background
- ✓ Typography utilities (text-4xl, text-lg) apply correctly
- ✓ Spacing utilities (p-8, mb-4) work as expected
- ✓ Color utilities (bg-gray-50, text-gray-600) render properly
- ✓ No console errors related to Tailwind or Astro configuration
- ✓ TypeScript compilation succeeds without errors

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking Issue] Non-empty directory blocking Astro initialization**
- **Found during:** Task 1
- **Issue:** `npm create astro@latest .` failed because directory contains Hugo files (config.toml, themes/, layouts/, etc.)
- **Fix:** Created Astro project in temporary directory, then copied generated files to main project directory while preserving .planning/ and .git/
- **Files modified:** None (workaround via temp directory)
- **Impact:** Hugo files remain in project but are ignored by Astro (no conflicts detected)

No other deviations — plan executed as written.

## Files Created

### Configuration Files

**package.json**
- Astro 6.0.4 dependency
- Node.js >=22.12.0 engine requirement
- Scripts: dev, build, preview, astro

**astro.config.mjs**
- Imports @tailwindcss/vite plugin
- Configures Tailwind in vite.plugins array
- Follows CSS-native pattern (no JavaScript config file)

**tsconfig.json**
- Extends astro/tsconfigs/strict
- Enables strictest TypeScript checking for .astro files

**src/styles/global.css**
- @import "tailwindcss" directive
- @theme {} scaffold (empty, tokens will be added in Plan 02)

**src/pages/index.astro**
- Imports global.css
- Uses Tailwind utilities: min-h-screen, bg-gray-50, text-4xl, etc.
- Displays "Foundation Ready" placeholder message

## Technical Notes

### Astro 6 + Tailwind v4 Integration Pattern

The modern pattern (2026) differs from previous years:

**Old pattern (deprecated):**
```javascript
// astro.config.mjs
import tailwind from '@astrojs/tailwind';
export default defineConfig({
  integrations: [tailwind()],
});

// tailwind.config.js (JavaScript configuration)
module.exports = { theme: { colors: {...} } };
```

**New pattern (current):**
```javascript
// astro.config.mjs
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
});

// src/styles/global.css (CSS-native configuration)
@import "tailwindcss";
@theme { --color-primary: oklch(...); }
```

**Key differences:**
- @astrojs/tailwind is deprecated for Tailwind v4 — use @tailwindcss/vite instead
- No tailwind.config.js — Tailwind v4 uses CSS-native @theme directives
- Configuration lives in CSS files, not JavaScript
- Vite plugin provides 5x faster builds via Rust engine

### Hugo Files Preserved

The following Hugo files remain in the project directory but are ignored by Astro:

- config.toml (Hugo config)
- themes/ (Hugo theme files)
- layouts/ (Hugo templates)
- content/ (Hugo markdown)
- static/ (Hugo static assets)
- archetypes/ (Hugo content templates)

**Impact:** No conflicts detected. Astro only reads files in src/, public/, and root config files. Hugo files could be removed if desired, but leaving them preserves legacy context.

### TypeScript Configuration

Using astro/tsconfigs/strict enables:
- No implicit any
- Strict null checks
- No unused locals/parameters
- Exact optional property types
- Full type safety for .astro components

## Success Criteria Met

- [x] Astro 6 project initialized with TypeScript strict mode
- [x] Tailwind v4 installed via @tailwindcss/vite (NOT deprecated @astrojs/tailwind)
- [x] global.css imports Tailwind with @theme scaffold
- [x] astro.config.mjs uses Tailwind Vite plugin
- [x] Placeholder homepage renders with working Tailwind utilities
- [x] Dev server runs without errors at localhost:4321
- [x] No tailwind.config.js file exists (v4 uses CSS-native config)

## Next Steps

**Plan 01-02:** Extract design tokens from nousresearch.com
- Populate @theme directive in global.css
- Create three-layer token hierarchy (primitive/semantic/component)
- Manual extraction using browser DevTools + CSS Peeper

**Dependencies unlocked:**
- All subsequent plans can now use Astro components and Tailwind utilities
- Design system implementation can begin
- Page development can proceed with typed components

## Self-Check

Verification of claimed files and commits:

```bash
# Check created files exist
[ -f "package.json" ] && echo "FOUND: package.json" || echo "MISSING: package.json"
[ -f "astro.config.mjs" ] && echo "FOUND: astro.config.mjs" || echo "MISSING: astro.config.mjs"
[ -f "tsconfig.json" ] && echo "FOUND: tsconfig.json" || echo "MISSING: tsconfig.json"
[ -f "src/styles/global.css" ] && echo "FOUND: src/styles/global.css" || echo "MISSING: src/styles/global.css"
[ -f "src/pages/index.astro" ] && echo "FOUND: src/pages/index.astro" || echo "MISSING: src/pages/index.astro"
```

```bash
# Check commits exist
git log --oneline --all | grep -q "5b3d7d4" && echo "FOUND: 5b3d7d4" || echo "MISSING: 5b3d7d4"
git log --oneline --all | grep -q "eb9b062" && echo "FOUND: eb9b062" || echo "MISSING: eb9b062"
git log --oneline --all | grep -q "80c0cf3" && echo "FOUND: 80c0cf3" || echo "MISSING: 80c0cf3"
```

**Result:** PASSED

All 5 files verified:
- ✓ package.json
- ✓ astro.config.mjs
- ✓ tsconfig.json
- ✓ src/styles/global.css
- ✓ src/pages/index.astro

All 3 commits verified:
- ✓ 5b3d7d4 (Task 1: Initialize Astro 6 project)
- ✓ eb9b062 (Task 2: Configure Tailwind v4)
- ✓ 80c0cf3 (Task 3: Create placeholder homepage)
