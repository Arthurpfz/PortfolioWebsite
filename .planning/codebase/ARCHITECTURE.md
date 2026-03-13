# Architecture

**Analysis Date:** 2026-03-13

## Pattern Overview

**Overall:** Static Site Generator (Hugo)

**Key Characteristics:**
- Content-driven, file-based architecture with Markdown frontmatter
- Theme-based separation of content from presentation logic
- Build-time generation producing static HTML/CSS/JS output
- No dynamic backend or server-side rendering required
- Hierarchical content organization by sections (posts, pages, about)

## Layers

**Content Layer:**
- Purpose: Stores structured content as Markdown files with YAML frontmatter
- Location: `content/` directory
- Contains: Markdown files defining posts, pages, and site content
- Depends on: Hugo template system for rendering
- Used by: Hugo build process and theme rendering engine

**Theme/Presentation Layer:**
- Purpose: Hugo theme providing default templates, styling, and layout structure
- Location: `themes/hugo-notepadium/`
- Contains: HTML templates, stylesheets, JavaScript for site appearance
- Depends on: Hugo template language and configuration parameters
- Used by: Hugo renderer to convert content into final pages

**Layout Overrides Layer:**
- Purpose: Custom layout templates that override or extend theme defaults
- Location: `layouts/` directory
- Contains: Partial templates (head.html, header.html, default.md) and archetype templates
- Depends on: Theme base templates and Hugo's partial system
- Used by: Hugo to apply site-specific customizations before theme fallback

**Static Assets Layer:**
- Purpose: Stores pre-built assets served directly without processing
- Location: `static/` directory
- Contains: Images, PDFs, and other binary files referenced in content
- Depends on: Content layer references via relative paths
- Used by: Static HTTP server to serve files as-is

**Configuration Layer:**
- Purpose: Site-wide settings, metadata, navigation, and Hugo build directives
- Location: `config.toml` (root)
- Contains: Base URL, theme selection, language settings, analytics, custom nav items, syntax highlighting
- Depends on: Hugo framework version
- Used by: All layers during build process

## Data Flow

**Content Rendering Pipeline:**

1. Hugo reads configuration from `config.toml`
2. Hugo discovers Markdown files in `content/` with YAML frontmatter
3. Hugo applies layout templates in this precedence: `layouts/` → `themes/hugo-notepadium/layouts/` → default
4. Theme and layout partials (`layouts/partials/`) render HTML structure (head.html, header.html)
5. Content is rendered and integrated with page wrapper
6. Static assets from `static/` are copied directly to output
7. Final HTML pages are written to `public/` directory (build output, not committed)

**State Management:**
- Stateless: No runtime state. All state is in Markdown files with frontmatter metadata (title, date, draft, tags, categories, description)
- Frontmatter acts as content metadata: affects sorting, filtering, rendering logic
- Site-wide state managed through `config.toml` parameters passed to templates

## Key Abstractions

**Content Entity:**
- Purpose: Represents a piece of content (post, page) with metadata
- Examples: `content/post/hooked.md`, `content/about.md`
- Pattern: YAML frontmatter (metadata) followed by Markdown body
- Structure: `title`, `date`, `draft`, `tags`, `categories`, `description` fields

**Page Template:**
- Purpose: Defines HTML structure for rendering content types
- Examples: Single post, list of posts, homepage
- Pattern: Hugo template language with conditional blocks and partial includes
- Inherits from theme or custom layouts

**Partial Template:**
- Purpose: Reusable HTML fragments included by multiple templates
- Examples: `layouts/partials/head.html`, `layouts/partials/header.html`
- Pattern: Small focused templates handling specific page sections
- Prevents duplication across page templates

**Navigation Configuration:**
- Purpose: Defines site navigation menu structure
- Examples: Custom nav items in config (About Arthur, LinkedIn)
- Pattern: TOML array of objects with `title` and `url` fields
- Rendered by theme's navigation template

## Entry Points

**Home Page:**
- Location: Generated from site homepage template (theme-driven)
- Triggers: Hugo build process identifies site index
- Responsibilities: List recent posts, display site name and slogan, provide navigation

**Post List:**
- Location: Auto-generated from `content/post/` directory
- Triggers: Hugo discovers all Markdown files in post section
- Responsibilities: Display paginated or categorized list of posts with metadata

**Individual Post:**
- Location: Generated from `content/post/*.md` files
- Triggers: Each Markdown file generates one page
- Responsibilities: Render full post content, display metadata (date, tags, categories), show navigation

**About Page:**
- Location: Generated from `content/about.md`
- Triggers: Markdown file in root of content directory
- Responsibilities: Display author biography and career history

**Category/Tag Archive:**
- Location: Auto-generated taxonomy pages (theme-dependent)
- Triggers: Extracted from `tags` and `categories` frontmatter fields
- Responsibilities: List all posts with specific tag or category

## Error Handling

**Strategy:** Build-time validation and prevention

**Patterns:**
- Draft mode: Posts with `draft: true` excluded from production builds
- Missing fields: Hugo applies defaults or shows empty values (no runtime errors)
- Bad Markdown: Hugo renders as-is; responsibility on content creator
- Broken references: Image references in content must match paths in `static/`; no validation layer

## Cross-Cutting Concerns

**Logging:** Not applicable (static generation, no runtime)

**Validation:** Frontmatter YAML syntax validation occurs during build; content validation is manual

**Navigation:** Configured globally in `config.toml` under `[params.nav]`; theme renders from configuration and inferred directory structure

**Analytics:** Google Analytics tracking code injected via `layouts/partials/header.html` (UA-161568453-1)

**Language/Localization:** Site configured for Chinese (languageCode = "zh-cn", hasCJKLanguage = true) but content appears in English; language configuration superseded by actual content

---

*Architecture analysis: 2026-03-13*
