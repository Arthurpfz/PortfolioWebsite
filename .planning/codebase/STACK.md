# Technology Stack

**Analysis Date:** 2026-03-13

## Languages

**Primary:**
- Markdown (content) - Blog posts and page content in `content/` directory
- TOML - Configuration in `config.toml`
- HTML/Template - Hugo template language in `layouts/` directory

**Secondary:**
- CSS - Styling (bundled with theme)

## Runtime

**Environment:**
- Hugo (Static Site Generator) - Site generation and build

**Package Manager:**
- Not applicable - Hugo is self-contained CLI tool

## Frameworks

**Core:**
- Hugo (Static Site Generator) - Static content generation
- hugo-notepadium (Theme) - Theme submodule from https://github.com/cntrump/hugo-notepadium.git

**Markup:**
- Goldmark (Markdown parser) - Configured in `config.toml` with renderer settings

## Key Dependencies

**Theme:**
- hugo-notepadium - Git submodule at `themes/hugo-notepadium/`

**Markup Processing:**
- Chroma (Syntax highlighting) - Built-in, configured with "dracula" theme

## Configuration

**Environment:**
- `config.toml` - Main Hugo configuration file
- Base URL configured as empty string (requires environment-specific override)
- Theme: hugo-notepadium
- Language: zh-cn with CJK support enabled

**Build:**
- Hugo CLI automatically processes:
  - Content in `content/` directory
  - Layouts in `layouts/` directory
  - Static files in `static/` directory
  - Themes in `themes/` directory

**Markup Configuration:**
- Code fence syntax highlighting enabled via Chroma
- Unsafe HTML rendering enabled (allows raw HTML in Markdown)
- Dracula theme for code blocks, xcode-dark for dark mode

## Platform Requirements

**Development:**
- Hugo (any recent version that supports the theme)
- Git (for theme submodule)

**Production:**
- Hugo build output (static HTML/CSS/JS)
- Web server capable of serving static files (any HTTP server)
- No runtime dependencies required for serving built site

---

*Stack analysis: 2026-03-13*
