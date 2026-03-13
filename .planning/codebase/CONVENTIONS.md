# Coding Conventions

**Analysis Date:** 2026-03-13

## Naming Patterns

**Files:**
- Content files: `lowercase-with-hyphens.md` (e.g., `black_box_thinking.md`, `DontMakeMeThink.md`)
- Actual convention: Mixed pattern observed. Most use lowercase-with-hyphens, but some use PascalCase (e.g., `DontMakeMeThink.md`, `GoodBadStrategy.md`)
- Layout files: `descriptive-name.html` (e.g., `head.html`, `header.html`)
- Archetype files: `default.md` for templates

**Directories:**
- Content organization: `content/post/`, `content/about.md`
- Layout organization: `layouts/partials/`, `layouts/archetypes/`
- Static assets: `static/posts/[post-name]/` for images grouped by post topic
- Theme files: `themes/[theme-name]/`

**Front Matter Variables:**
- camelCase for YAML keys: `title`, `date`, `draft`, `description`, `tags`, `categories`
- Variables are wrapped in array syntax for tags and categories: `tags: [ ]`, `categories: [ ]`
- Strings in arrays: Double-quoted strings in arrays

**Markdown Content:**
- Hugo template variables use: `{{ site.Title }}`, `{{ .Title }}`, `{{ .Name }}`
- Hugo blocks: `{{- define "blockname" -}}`, `{{- block "blockname" . -}}`
- Conditionals: `{{- if condition -}}`, `{{- with variable -}}`, `{{- else -}}`
- Piping and filters: `{{ .Name | title }}`, `{{ value | safeHTML }}`

## Code Style

**Markdown Front Matter:**
- Triple dashes on separate lines: `---`
- YAML-style front matter (TOML not used for content)
- One blank line after closing `---` before content

**Hugo Templates:**
- Whitespace control: `{{-` and `-}}` used to trim surrounding whitespace
- HTML comments for content breaks: `<!--more-->` to separate excerpt from full post
- Class naming: Hyphenated classes like `site header`, `header wrap`, `header left-side`

**Content Structure:**
- Blockquotes for attributions: `> I own this book and took these notes...`
- Section headers: `##` and `###` for H2 and H3 (full markdown hierarchy)
- Bullet points: `*` for list items
- Bullet lists not nested, flat structure used primarily

**Hugo Configuration:**
- TOML format for `config.toml`
- Sections organized by brackets: `[markup.highlight]`, `[params]`, `[[params.nav.custom]]`
- Array of objects uses double brackets: `[[params.nav.custom]]`

## Import Organization

**Not applicable** - This is a static site generator project using Hugo templates, not a programming language codebase.

**Hugo Partials:**
- Included via: `{{- partial "partial-name.html" . -}}`
- Data passed to partials: `.` context available
- Template blocks: `{{- block "blockname" . -}}...{{- end -}}`

## Error Handling

**No explicit error handling patterns observed.** Hugo handles missing partials/templates gracefully by skipping them.

## Logging

**No logging framework used.** This is a static site - logging occurs during build time via Hugo CLI output.

## Comments

**Minimal commenting observed:**
- Commented-out configuration: `#disqusShortname = "XXX"` in config.toml
- No inline code comments in HTML/template files
- Comments use TOML syntax in config: Lines starting with `#`

**When to Comment:**
- Comments used only for disabled features or configuration options
- Template logic is minimal and self-evident

## Function/Template Design

**Hugo Functions:**
- Built-in filters applied inline: `{{ .Name | title }}`, `{{ value | safeHTML }}`
- Conditional blocks keep logic simple: Single condition checks
- Partial includes have minimal parameters (usually just context `.`)

**Data Flow:**
- Context passing uses `.` (current context)
- Site-wide config accessed via `site.Params`
- Page-specific data: `.Title`, `.Date`, `.Name`

## Module Design

**Not applicable** - Hugo uses partials and templates, not traditional modules.

**File Organization:**
- `layouts/partials/` - Reusable template components
- `layouts/archetypes/` - Content templates/blueprints
- `content/` - Actual content organized by type
- Each post/page is independent Markdown file with YAML front matter

**Barrel Files:**
- Not used. Each partial/layout is included explicitly by name

---

*Convention analysis: 2026-03-13*
