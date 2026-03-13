# Codebase Concerns

**Analysis Date:** 2026-03-13

## Configuration Issues

**Missing base URL:**
- Issue: `baseURL` in `config.toml` is empty (line 1)
- Files: `config.toml`
- Impact: The site may not generate correct absolute URLs for feeds, sitemaps, and social sharing. Links could break in production depending on deployment context.
- Fix approach: Set `baseURL = "https://arthurpfz.com"` or the actual production domain to ensure all generated URLs are correct

**Empty logo path:**
- Issue: `logo` parameter in `config.toml` is set to empty string (line 27)
- Files: `config.toml`
- Impact: No logo displays in header. If a logo was intended, `layouts/partials/header.html` checks for this parameter and skips rendering if empty
- Fix approach: Either remove the logo parameter entirely or set it to a valid image path (e.g., `/images/logo.png`)

## Content Issues

**Incomplete TODO items in published content:**
- Issue: Multiple TODO comments embedded in published post content as visible text
- Files: `content/post/hooked.md` (lines 40, 49, 58, 66, 73, 77, 81)
- Impact: These are study prompts/exercises left in the published post, making the content appear unfinished or cluttered. Readers see action items like "TODO: What habits does your business model require?" which are not part of the article narrative
- Fix approach: Either extract these TODOs to a separate study guide section, move them to a companion document, or remove them entirely if they're not relevant to readers

**Inconsistent description capitalization:**
- Issue: Book summary descriptions alternate between "Book summary" and "Book Summary" (capital S)
- Files: Multiple in `content/post/`:
  - `DontMakeMeThink.md`: "Book summary" (lowercase)
  - `GoodBadStrategy.md`: "Book summary" (lowercase)
  - `black_box_thinking.md`: "Book summary" (lowercase)
  - `brainfluence.md`: "Book Summary" (capitalized)
  - `Outcomes_over_outputs.md`: "Book Summary" (capitalized)
  - `hooked.md`: "Book summary" (lowercase)
  - `crackedIt.md`: "Book summary" (lowercase)
  - `sum_lean_product_playbook.md`: "Book summary" (lowercase)
- Impact: Inconsistent metadata degrades content quality perception and may confuse automated systems or users browsing archive pages
- Fix approach: Standardize to one format across all posts (recommend lowercase "Book summary" to match majority)

**Unused/test image file:**
- Issue: `static/image_test.jpg` appears to be a test artifact
- Files: `static/image_test.jpg`
- Impact: Dead asset taking up space. File is not referenced in any content
- Fix approach: Remove if it's a test file, or document its intended use if it should be kept

**Placeholder links in archetype:**
- Issue: Archetype template at `archetypes/default.md` line 18 contains `(LINK)` placeholder that's never meant to be published
- Files: `archetypes/default.md`
- Impact: If a new post is created using this archetype, it will have a broken Amazon link placeholder that needs manual replacement
- Fix approach: Update archetype to include a more obvious placeholder like `[ADD_AMAZON_LINK_HERE]` or provide example of expected format

## Security Considerations

**Unsafe HTML rendering enabled:**
- Risk: `config.toml` line 22 sets `unsafe = true` under `[markup.goldmark.renderer]`
- Files: `config.toml`, potentially any `content/post/*.md` files with HTML
- Current mitigation: This is only safe if content is controlled (personal blog, not user-generated). All content currently appears to be author-created
- Recommendations:
  - Document why this is enabled (likely needed for the theme's special formatting)
  - Review all published content for any embedded scripts or suspicious HTML
  - If ever opening to user submissions, disable this and sanitize inputs

**Outdated Google Analytics tracking:**
- Risk: `googleAnalytics = "UA-161568453-1"` uses Universal Analytics (UA), which is deprecated
- Files: `config.toml` line 15, `layouts/partials/header.html` line 11
- Current mitigation: Google still collects data but provides no support or new features
- Recommendations:
  - Migrate to Google Analytics 4 (GA4) - UA is end-of-life as of July 2023
  - Update tracking ID to new GA4 format (starts with "G-")
  - This will require both config change and potentially theme updates if using template variables

**No privacy/consent notice detected:**
- Risk: Site collects analytics data without apparent user consent notice
- Files: `layouts/partials/header.html` line 11 (Google Analytics included unconditionally)
- Current mitigation: Not detected in provided files
- Recommendations:
  - Add cookie consent banner if in EU/GDPR jurisdiction
  - Consider adding privacy policy page documenting GA tracking
  - Document analytics in `content/about.md` or create dedicated privacy page

## Content Management Issues

**Overly specific git commit messages:**
- Issue: Commit history shows very granular messages like "ok", "polish", "fix the path of the images"
- Files: Git history (use `git log`)
- Impact: Makes it difficult to understand what was actually changed and why. Future maintainers can't quickly identify when features were added or bugs fixed
- Fix approach: Use conventional commit format with descriptive messages (e.g., `fix: correct image paths in hooked post`, `feat: add black box thinking summary`)

**No version control of theme:**
- Issue: Theme is included as git submodule (`themes/hugo-notepadium`) pointing to external repo
- Files: `.gitmodules`, `themes/hugo-notepadium/` directory
- Impact: Theme updates are decoupled from content. If theme repo is deleted/modified, the submodule breaks. No lock to specific theme version
- Fix approach: Either commit theme directly to repo (for stability) or document tested theme version and include submodule initialization in setup instructions

**Limited content organization:**
- Issue: All posts are in single `content/post/` directory with inconsistent naming (CamelCase, snake_case, mixed)
- Files: `content/post/`
- Impact: As content grows beyond 15 posts, navigation and organization becomes unwieldy. Search becomes harder
- Fix approach: Add subdirectories by topic/category or add frontmatter taxonomy that themes can use to organize content

## Performance & Scalability

**No image optimization documented:**
- Issue: Static images in `static/posts/` are referenced directly without optimization
- Files: Multiple PNG and JPG files in `static/posts/`
- Impact: Images may be larger than necessary, slowing page loads
- Fix approach:
  - Document expected image formats and sizes in contributor guide
  - Consider using Hugo image processing with `resources.GetMatch()` for WebP conversion
  - Add image compression to build process

## Missing Critical Features

**No search functionality:**
- Problem: No search feature evident in theme configuration or custom layouts
- Blocks: Users can't search post content; must browse chronologically or by tags/categories
- Recommendation: Implement client-side search (e.g., Lunr.js) or add search endpoint

**No content tagging strategy:**
- Problem: Tags exist in frontmatter but no indication of tag usage standards
- Files: `config.toml` line 44 enables tags
- Blocks: Tag taxonomy could become inconsistent, making tag browsing unreliable
- Recommendation: Create content guide documenting standard tags and categories

## Test Coverage Gaps

**No automated testing infrastructure:**
- What's not tested: Build output, link validity, content quality
- Files: No test configuration or test files found
- Risk: Broken links, missing images, or malformed metadata could go undetected until site is live
- Priority: Medium - Consider adding:
  - Link checker in CI/CD (e.g., htmlproofer)
  - Front matter validation
  - Build verification on commits

**No build validation:**
- What's not tested: Hugo build succeeds without errors/warnings
- Risk: Build could fail in production if dependencies change (theme updates, Hugo version conflicts)
- Priority: Medium - Add `hugo --minify` verification and capture warnings

---

*Concerns audit: 2026-03-13*
