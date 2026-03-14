---
phase: 05-performance-launch
plan: 01b
type: execute
wave: 2
depends_on: [05-01]
files_modified:
  - src/components/Navigation.astro
  - vitest.config.ts
  - src/__tests__/theme.test.ts
autonomous: true
requirements: [DSGN-08]

must_haves:
  truths:
    - All pages display theme toggle button
    - Theme toggle is visible and accessible on all pages
  artifacts:
    - path: "src/components/Navigation.astro"
      provides: "Navigation with ThemeToggle integrated"
      contains: "ThemeToggle"
    - path: "vitest.config.ts"
      provides: "Test configuration"
      contains: "vitest"
    - path: "src/__tests__/theme.test.ts"
      provides: "Theme toggle tests"
      min_lines: 20
  key_links:
    - from: "src/components/Navigation.astro"
      to: "src/components/ThemeToggle.astro"
      via: "import and render"
      pattern: "import.*ThemeToggle"
---

<objective>
Integrate ThemeToggle component into Navigation and create automated tests for theme functionality.

Purpose: Complete DSGN-08 implementation by making theme toggle accessible on all pages and ensuring functionality via automated tests.

Output: Theme toggle visible in navigation on all pages, passing unit tests confirming localStorage and theme switching behavior.
</objective>

<execution_context>
@/Users/arthurpfalzgraf/.claude/get-shit-done/workflows/execute-plan.md
@/Users/arthurpfalzgraf/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@/Users/arthurpfalzgraf/Desktop/Projects/PortfolioWebsite/.planning/PROJECT.md
@/Users/arthurpfalzgraf/Desktop/Projects/PortfolioWebsite/.planning/ROADMAP.md
@/Users/arthurpfalzgraf/Desktop/Projects/PortfolioWebsite/.planning/STATE.md
@/Users/arthurpfalzgraf/Desktop/Projects/PortfolioWebsite/.planning/phases/05-performance-launch/05-01-SUMMARY.md
@/Users/arthurpfalzgraf/Desktop/Projects/PortfolioWebsite/src/components/Navigation.astro
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add ThemeToggle to Navigation component</name>
  <files>src/components/Navigation.astro</files>
  <action>
Import and render ThemeToggle component in Navigation.astro. Position toggle button after email link in navigation layout. Use existing navigation flexbox structure with margin-left: auto pattern already established.

Pattern:
```astro
---
import ThemeToggle from './ThemeToggle.astro';
---
<nav>
  <!-- existing nav links -->
  <a href="mailto:...">email</a>
  <ThemeToggle />
</nav>
```

Ensure toggle button follows same spacing and visual weight as existing navigation elements. No additional wrapper divs needed if flexbox layout already handles alignment.</action>
  <verify>
    <automated>grep -q "ThemeToggle" src/components/Navigation.astro</automated>
  </verify>
  <done>Navigation component includes ThemeToggle, visible on all pages</done>
</task>

<task type="auto">
  <name>Task 2: Test theme toggle functionality</name>
  <files>vitest.config.ts, src/__tests__/theme.test.ts</files>
  <action>
Create smoke test for theme toggle functionality:

1. Create vitest.config.ts if it doesn't exist (use happy-dom environment already in package.json):
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
  },
});
```

2. Create src/__tests__/theme.test.ts with tests for:
   - localStorage.getItem('theme') returns stored value after toggle
   - data-theme attribute changes when toggle clicked
   - System preference respected when no localStorage value

Use happy-dom for DOM testing (already in devDependencies). Keep tests simple - verify localStorage interaction and attribute setting, not full visual rendering.

Example test structure:
```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('Theme Toggle', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores theme preference in localStorage', () => {
    // Test localStorage interaction
  });

  it('respects system preference when no stored value', () => {
    // Test matchMedia fallback
  });
});
```</action>
  <verify>
    <automated>npm run test:unit -- theme.test.ts</automated>
  </verify>
  <done>Theme toggle tests pass, confirming localStorage persistence and attribute updates</done>
</task>

</tasks>

<verification>
**Manual verification steps:**
1. Run dev server: `npm run dev`
2. Visit http://localhost:4321
3. Click theme toggle button in navigation
4. Verify background and text colors change
5. Refresh page - theme persists
6. Open DevTools > Application > Local Storage - verify 'theme' key exists
7. Clear localStorage, refresh - system preference applies
8. Test on all pages (Archive, Experience, Now)

**Automated checks:**
- `npm run build` succeeds
- `npm run test:unit` passes
- No console errors related to theme
- Theme toggle visible in navigation
</verification>

<success_criteria>
- User can toggle theme via button on all pages
- Theme choice persists across browser sessions
- Tests confirm localStorage and attribute functionality
- No console errors
</success_criteria>

<output>
After completion, create `.planning/phases/05-performance-launch/05-01b-SUMMARY.md`
</output>
