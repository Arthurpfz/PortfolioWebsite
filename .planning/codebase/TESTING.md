# Testing Patterns

**Analysis Date:** 2026-03-13

## Test Framework

**Runner:**
- Not detected - No test runner configured (Jest, Vitest, etc.)
- Hugo has built-in testing capabilities but not configured in this project

**Assertion Library:**
- Not applicable - No testing framework present

**Run Commands:**
```bash
hugo server              # Local development server (builds and serves site)
hugo                     # Build production-ready static site
hugo new post/name.md   # Generate new content file
```

## Test File Organization

**Location:**
- Not applicable - No test files present

**Naming:**
- Not applicable - No test files present

## Test Structure

**Not applicable.** This is a static site generator project without automated tests.

Hugo validates:
- Markdown syntax at build time
- Template syntax during compilation
- Broken links (with optional plugin, not configured)

## Mocking

**Not applicable** - No testing framework or mock setup in this project.

## Fixtures and Factories

**Not applicable** - No test data fixtures configured.

**Content Testing Approach:**
- Content is validated implicitly during `hugo build` if templates reference missing fields
- Content examples serve as fixtures: `content/post/` files demonstrate expected structure

**Archetype as Template:**
- `layouts/archetypes/default.md` serves as the blueprint for new content
- Defines expected front matter structure:
  ```yaml
  ---
  title: "{{ replace .Name "-" " " | title }}"
  date: {{ .Date }}
  draft: false
  description: "Book summary"
  tags: [
      "Behavioral Science & Design"
  ]
  categories: [
      "Book Summary"
  ]
  ---
  ```

## Coverage

**Requirements:** Not enforced - No testing framework

**View Coverage:**
- Not applicable

## Test Types

**No automated tests configured.**

**Manual Testing Approach:**
- Local preview: `hugo server` spins up development server on `localhost:1313`
- Visual inspection of rendered output
- Build verification: `hugo` command completes without errors

## Build-Time Validation

Hugo performs implicit validation:
- Template syntax errors prevent build
- Missing partial files cause warnings/errors during build
- YAML front matter parsing must succeed for content to be included
- Draft posts excluded from production build via `draft: false` flag

## Content Validation Patterns

**Front Matter Requirements (implicit):**
- All posts follow archetype structure from `layouts/archetypes/default.md`
- Required fields: `title`, `date`, `draft`
- Optional fields: `description`, `tags`, `categories`
- Array fields use bracket syntax with quoted strings

**Template Validation:**
- Layout files in `layouts/partials/` must have valid Go template syntax
- Missing partials referenced in `head.html` or `header.html` will error on build
- Context variables (`.Title`, `.Name`, `site.Params`) must exist or conditionals guard access with `{{ if }}` or `{{ with }}`

## Common Patterns

**Conditional Rendering:**
```html
{{- if $logo -}}
<img class="site logo" src="{{- $logo | relURL -}}" alt />
{{- end -}}
```
Pattern: Check variable existence before rendering

**Safe Output Handling:**
```html
{{- $title | safeHTML -}}
```
Pattern: Use `safeHTML` filter for user-supplied content (front matter)

**Config Access:**
```html
{{- site.Title | safeHTML -}}
{{- site.Params.slogan -}}
```
Pattern: Nested access with dot notation

**Empty/Missing Checks:**
```html
{{- if and (ne $title "") (ne $title site.Title) -}}
```
Pattern: Explicit non-empty checks using `ne` (not equal) comparisons

---

*Testing analysis: 2026-03-13*
