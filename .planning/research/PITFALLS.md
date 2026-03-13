# Domain Pitfalls: Portfolio Website Redesign

**Domain:** Personal portfolio website with design system extraction
**Researched:** 2026-03-13
**Overall Confidence:** HIGH (verified through multiple 2026 sources, developer experience reports)

## Critical Pitfalls

Mistakes that cause rewrites, major performance issues, or complete redesigns.

### Pitfall 1: Design System Extraction Without Context Understanding
**What goes wrong:** Blindly copying visual elements (colors, spacing, typography) without understanding the underlying system logic leads to inconsistent implementation and design drift.

**Why it happens:** Extraction tools can pull computed CSS values, but they don't capture the semantic relationships, naming conventions, or the "why" behind design decisions. Developers see "16px padding" without understanding it's part of an 8pt spacing scale.

**Consequences:**
- Inconsistent spacing across pages (some use 12px, some 16px, no systematic relationship)
- Typography hierarchy breaks down (line heights don't align, sizes feel arbitrary)
- Colors multiply uncontrollably (extracting "#3B82F6" and "#3B83F6" as separate colors)
- Future changes require touching every component instead of updating tokens
- Design drift accelerates as the system loses coherence

**Prevention:**
1. **Extract the system, not just values**: Identify spacing scales (4pt, 8pt systems), typography scales (modular scale ratios), color roles (primary, accent, surface)
2. **Document semantic meaning**: Don't just save "20px" - document "spacing-lg" or "space-5"
3. **Verify the pattern across multiple pages**: Check if 16px padding appears consistently in similar contexts on the reference site
4. **Use extraction tools as starting points, not final answers**: Tools like Dembrandt, Design Token Extractor provide hypotheses - manually verify and group into coherent systems
5. **Create a token-first implementation**: Define CSS variables/design tokens before writing component styles

**Detection (Warning Signs):**
- Finding 15+ different shades of the same color
- Spacing values that don't follow any mathematical relationship (9px, 13px, 17px, 22px)
- Typography sizes that feel arbitrary (13px, 15px, 18px, 23px)
- Needing to hardcode values frequently instead of using predefined tokens
- Components looking "off" when placed together despite individually matching the reference

**Phase to Address:** Phase 1 (Design System Extraction) - Must establish token system before any implementation

**Source Confidence:** HIGH
- [Dembrandt: Automated Design Token Extraction](https://www.dembrandt.com/blackpaper)
- [Design Systems Pitfalls](https://medium.com/@withinsight1/design-systems-pitfalls-6b3113fa0898)
- [Design Systems in 2026: Predictions, Pitfalls, and Power Moves](https://rydarashid.medium.com/design-systems-in-2026-predictions-pitfalls-and-power-moves-f401317f7563)

---

### Pitfall 2: Over-Engineering for Static Content
**What goes wrong:** Using React, complex state management, serverless functions, and dozens of dependencies to render what is fundamentally static content (writing archive, CV, project list).

**Why it happens:**
- Desire to showcase technical skills through framework complexity
- Assumption that "modern" = "framework-heavy"
- Following tutorials that assume complex requirements
- Not recognizing that simplicity signals confidence, not lack of skill

**Consequences:**
- 500kb+ JavaScript bundles for pages that could be 50kb total
- Slow initial load (2-4 seconds vs. sub-second for static)
- Increased attack surface and security vulnerabilities
- Complex deployment requirements
- Poor lighthouse scores (defeats the purpose of showcasing skills)
- Maintenance burden from keeping dependencies updated
- The portfolio itself demonstrates poor architectural judgment

**Prevention:**
1. **Match complexity to requirements**: Static content = static site generator (Hugo, 11ty, Astro with zero JS)
2. **Add complexity only when needed**: If you need dynamic features later, add them surgically
3. **Measure the cost**: Run Lighthouse on reference implementations before committing
4. **Remember the audience**: Hiring managers value appropriate tool selection over maximum complexity
5. **Use the "no framework" test**: Try building with vanilla HTML/CSS first - if it works, that's the right complexity level

**Detection (Warning Signs):**
- Bundle size > 200kb for portfolio with 3 pages
- Time to Interactive > 2 seconds on fast connection
- Needing a build step for content updates
- Using useState/useEffect for content that never changes
- Dependencies list > 20 packages

**Phase to Address:** Phase 1 (Technology Selection) - Decision made at project start is hard to reverse

**Source Confidence:** HIGH
- [I Built a Portfolio Website That's (Almost) Unhackable](https://infosecwriteups.com/i-built-a-portfolio-website-thats-almost-unhackable-here-is-how-33351d7d56f7)
- [Portfolio Mistakes Designers Still Make in 2026](https://muz.li/blog/portfolio-mistakes-designers-still-make-in-2026/)

---

### Pitfall 3: Content Migration Without URL Preservation
**What goes wrong:** Migrating existing articles from Hugo site to new architecture without maintaining URL structure, proper redirects, or content metadata (dates, slugs).

**Why it happens:**
- Assuming "redesign" means starting fresh with URLs
- Not auditing existing content structure before migration
- Changing frameworks without URL mapping plan
- Forgetting that old URLs might be bookmarked/shared

**Consequences:**
- All existing external links become 404s (broken backlinks)
- Google Search Console shows massive 404 spike, rankings drop
- Lost SEO value accumulated over time
- Professional embarrassment (broken links in own portfolio)
- Lost traffic from people with bookmarks/referrals

**Prevention:**
1. **Audit BEFORE redesign**: Export all current URLs with content
2. **Map old → new**: Create spreadsheet mapping every old URL to new location
3. **Implement 301 redirects**: Server-level redirects (not JavaScript)
4. **Preserve metadata**: Article dates, slugs, titles must transfer
5. **Test comprehensively**: Crawl old URLs after migration to verify redirects
6. **Use proper tools**: Screaming Frog for pre/post-migration audits

**Detection (Warning Signs):**
- Starting implementation without URL inventory
- "We'll fix redirects later" mentality
- Not knowing how many pages currently exist
- Planning to change URL structure without redirect strategy
- Missing original publication dates in migration plan

**Phase to Address:** Phase 2 (Content Migration Planning) - Must map before implementing new architecture

**Source Confidence:** HIGH
- [SEO Migration Strategy: Complete Guide for 2026](https://www.influize.com/blog/seo-migration-strategy)
- [Website Migration SEO Checklist (2026)](https://atlasmarketing.ai/technical-seo/website-migration-seo-guide/)
- [Guide to Successful Website Content Migration](https://designtlc.com/a-guide-to-successful-website-content-migration-during-redesigns/)

---

## Moderate Pitfalls

Fixable but time-consuming mistakes that impact quality or timeline.

### Pitfall 4: Designing for Desktop Only
**What goes wrong:** Extracting design system from desktop view of reference site, implementing components in desktop context, treating mobile as afterthought.

**Why it happens:**
- Extracting design from desktop browser DevTools
- Developing on large monitor
- Not checking reference site's mobile behavior
- Assuming "responsive = add media queries at the end"

**Consequences:**
- Typography too large/small on mobile
- Touch targets inadequate (< 44px)
- Navigation breaks on small screens
- Horizontal scrolling issues
- Poor mobile lighthouse scores
- 50%+ of visitors have degraded experience

**Prevention:**
1. **Extract mobile AND desktop patterns** from reference site
2. **Develop mobile-first**: Start with mobile layout, expand to desktop
3. **Test on real devices**: Simulator ≠ actual phone
4. **Check touch target sizes**: 44x44px minimum
5. **Verify reference site's breakpoints**: Don't guess, inspect their media queries

**Detection (Warning Signs):**
- Only testing in desktop browser
- Forgetting to toggle device mode in DevTools
- Hardcoded pixel widths without responsive units
- Not extracting mobile navigation patterns
- Touch targets < 40px

**Phase to Address:** Phase 1 (Design System Extraction) and Phase 3 (Implementation)

**Source Confidence:** MEDIUM
- [Portfolio Mistakes Designers Still Make in 2026](https://muz.li/blog/portfolio-mistakes-designers-still-make-in-2026/)
- [Developer Portfolio Performance Mistakes](https://dev.to/matthewhou/ive-reviewed-200-developer-portfolios-90-make-the-same-4-mistakes-16kd)

---

### Pitfall 5: Image Hot-Loading from Old Site
**What goes wrong:** Migrating content but leaving image src attributes pointing to old hosting, then decommissioning old site and breaking all images.

**Why it happens:**
- Content migration grabs Markdown with existing image URLs
- Assuming images will "just work"
- Not auditing asset dependencies
- Turning off old hosting before verifying new site

**Consequences:**
- All images break simultaneously when old hosting ends
- Broken image icons across portfolio
- Emergency scramble to recover and re-upload assets
- Lost images if old hosting data is deleted

**Prevention:**
1. **Audit all asset URLs** during content migration
2. **Download assets locally** before migration
3. **Update references** to point to new hosting
4. **Verify in staging** before decommissioning old site
5. **Keep old site running** for overlap period

**Detection (Warning Signs):**
- Image URLs pointing to different domain
- Not downloading media files locally
- Planning to turn off old hosting immediately
- No asset inventory in migration checklist

**Phase to Address:** Phase 2 (Content Migration) - Before decommissioning old site

**Source Confidence:** MEDIUM
- [Migration Gotchas](https://www.spectralwebservices.com/blog/migration-gotchas/)
- [Website Content Migration Guide](https://www.lingoapp.com/glossary/website-content-migration)

---

### Pitfall 6: Scope Creep and Feature Bloat
**What goes wrong:** Starting with 3 simple pages, progressively adding "nice to have" features (search, tags, RSS, comments, analytics dashboard, dark mode toggle, reading time, related posts), ending with delayed launch and over-engineered site.

**Why it happens:**
- Excitement about possibilities
- Seeing features on reference sites or other portfolios
- No clear MVP definition
- "While I'm at it..." mentality
- Confusing portfolio with product

**Consequences:**
- Launch delays (weeks → months)
- Increased complexity and bugs
- Maintenance burden
- Lost focus on core value (showcasing work)
- Paradox of choice (too many features dilute message)

**Prevention:**
1. **Define MVP explicitly**: 3 pages, navigation, design system applied - DONE
2. **Maintain "out of scope" list**: Write down deferred features
3. **Use 80/20 rule**: Core features serve 80% of goals
4. **Timebox the project**: Set hard deadline
5. **Ship first, iterate second**: Launch minimal, add features based on actual need

**Detection (Warning Signs):**
- "It would be cool if..." conversations
- Implementing features not in original requirements
- Comparing to feature-rich sites instead of reference design
- Researching frameworks for features not in scope
- No clear definition of "done"

**Phase to Address:** Throughout project - Requires ongoing discipline

**Source Confidence:** MEDIUM
- [What Is Feature Creep and How to Avoid It](https://www.strikingly.com/content/blog/feature-creep/)
- [Feature Creep, the Bane of Our Existence](https://www.interaction-design.org/literature/article/feature-creep-the-bane-of-our-existence)

---

### Pitfall 7: Copying Components Without Adapting Context
**What goes wrong:** Seeing a component pattern on reference site (e.g., card layout for research papers), copying it directly for different content type (blog articles), not considering if pattern suits the new context.

**Why it happens:**
- Design system extraction focuses on components as visual units
- Not understanding the "why" behind component choices
- Treating design patterns as universally applicable
- Skipping user-centered design thinking

**Consequences:**
- Components that look right but feel wrong
- Cognitive load for visitors (unexpected patterns)
- Content doesn't fit component constraints
- Forced adaptation of content to match component instead of vice versa

**Prevention:**
1. **Extract pattern intent, not just appearance**: Why did reference site use this pattern?
2. **Adapt to content needs**: Portfolio writing ≠ research papers
3. **Test with real content**: Don't use Lorem Ipsum
4. **Validate component fit**: Does this pattern serve the user goal?

**Detection (Warning Signs):**
- Content feels cramped or awkwardly spaced in components
- Adding dummy content to fill component structure
- Components requiring content to fit specific lengths
- Pattern feels arbitrary for the content type

**Phase to Address:** Phase 3 (Component Implementation) - During adaptation phase

**Source Confidence:** MEDIUM
- [When in Design Process Should I Use Components](https://jlzych.com/2021/05/22/when-in-the-design-process-should-i-use-components-in-my-design-system/)
- [Why Copying Your Competitor's App Will Kill Your Product](https://medium.com/design-bootcamp/why-copying-your-competitors-app-will-kill-your-product-05af1370114c)

---

## Minor Pitfalls

Small issues that are easy to fix but commonly overlooked.

### Pitfall 8: Inconsistent or Missing Metadata
**What goes wrong:** Migrating articles without preserving or adding proper metadata (page titles, descriptions, Open Graph tags, publication dates, author info).

**Why it happens:**
- Focus on visual design over technical SEO
- Not considering social sharing
- Migration scripts don't preserve metadata
- Assuming basic HTML is enough

**Consequences:**
- Poor Google search result previews
- Ugly/missing social media cards when shared
- Lost context for article publication dates
- Harder for visitors to evaluate content freshness

**Prevention:**
1. **Preserve existing metadata** during migration
2. **Add standard meta tags**: title, description, og:image, twitter:card
3. **Show publication dates** on articles
4. **Use semantic HTML**: `<time>`, `<article>`, proper heading hierarchy

**Detection (Warning Signs):**
- No `<meta>` tags beyond viewport
- Missing dates on archived articles
- No Open Graph preview when sharing
- Generic page titles ("Home - Portfolio")

**Phase to Address:** Phase 2 (Content Migration) and Phase 3 (Implementation)

**Source Confidence:** MEDIUM
- [Ultimate Website Migration Checklist for 2026](https://www.eclicksoftwares.com/public/blog/ultimate-website-migration-checklist-for-2026-beyond)

---

### Pitfall 9: Typography Without System
**What goes wrong:** Copying font families and individual sizes from reference site without understanding the underlying typographic scale or vertical rhythm.

**Why it happens:**
- Extracting font-size values individually (14px, 16px, 20px, 24px)
- Not recognizing modular scale relationships (1.25x, 1.5x ratios)
- Missing the baseline grid system
- Focusing on desktop sizes without responsive scaling

**Consequences:**
- Typography feels inconsistent across pages
- Line heights don't create vertical rhythm
- Spacing between text elements feels arbitrary
- Responsive typography breaks down (too large on mobile, too small on desktop)

**Prevention:**
1. **Identify the scale system**: Is it modular (1.2x ratio), linear (4px increments), or custom?
2. **Extract line-height patterns**: Usually divisible by 4 or 8
3. **Document type hierarchy**: Display, Heading 1-6, Body, Caption with semantic names
4. **Check responsive behavior**: How do sizes scale across breakpoints?
5. **Use CSS custom properties**: Define scale as variables, not hardcoded values

**Detection (Warning Signs):**
- Long list of font-size values with no clear relationship
- Line heights that don't align to grid
- Needing to manually adjust spacing around text constantly
- Text elements don't have consistent visual rhythm

**Phase to Address:** Phase 1 (Design System Extraction)

**Source Confidence:** HIGH
- [Typography in Design Systems](https://medium.com/eightshapes-llc/typography-in-design-systems-6ed771432f1e)
- [Mastering Typography in Design Systems with Semantic Tokens](https://uxdesign.cc/mastering-typography-in-design-systems-with-semantic-tokens-and-responsive-scaling-6ccd598d9f21)
- [My Attempt to Reverse Engineer Medium](https://medium.com/@dmitri145/my-attempt-to-reverse-engineer-mediums-design-part-1-font-size-line-height-and-baseline-e5035b91cd57)

---

### Pitfall 10: Performance Debt from Asset Optimization
**What goes wrong:** Using extracted design assets (logos, images) at their original large sizes without optimization, leading to slow load times.

**Why it happens:**
- Downloading assets from reference site at high resolution
- Not running through optimization pipeline
- Assuming modern browsers/connections handle large files fine
- Forgetting that portfolio is a performance demonstration

**Consequences:**
- Slow page loads (especially on mobile networks)
- Poor Lighthouse scores
- First Contentful Paint > 2 seconds
- Wasted bandwidth
- Portfolio demonstrates poor web performance knowledge

**Prevention:**
1. **Optimize all images**: WebP/AVIF formats, appropriate dimensions
2. **Use responsive images**: srcset for different screen sizes
3. **Lazy load below-fold images**
4. **Inline critical SVGs**, external load others
5. **Run Lighthouse audits** and hit 90+ performance score

**Detection (Warning Signs):**
- Image files > 500KB
- Using PNG where JPG/WebP would work
- No responsive image strategy
- Lighthouse performance score < 80

**Phase to Address:** Phase 3 (Implementation) and Phase 4 (Testing)

**Source Confidence:** HIGH
- [Developer Portfolio Performance Mistakes](https://dev.to/matthewhou/ive-reviewed-200-developer-portfolios-90-make-the-same-4-mistakes-16kd)
- [5 Mistakes Developers Make in Portfolio Websites](https://www.devportfoliotemplates.com/blog/5-mistakes-developers-make-in-their-portfolio-websites)

---

### Pitfall 11: Breaking Hugo Without Replacement Plan
**What goes wrong:** Deciding "Hugo doesn't fit the design" and abandoning it mid-project without clear replacement, losing time to framework evaluation and setup.

**Why it happens:**
- Discovering Hugo theme constraints during implementation
- Getting excited about other frameworks
- Underestimating migration effort
- No framework evaluation in Phase 1

**Consequences:**
- Lost implementation time
- Scope creep (evaluating frameworks)
- Risk of choosing overly complex replacement
- Content migration complexity increases

**Prevention:**
1. **Evaluate Hugo fit BEFORE implementation starts**
2. **Test design system application** in Hugo quickly (proof of concept)
3. **If switching, decide in Phase 1** (Technology Selection)
4. **Choose replacement deliberately**: Match complexity to needs (11ty, Astro for static, not Next.js)
5. **Consider Hugo's strengths**: Extremely fast builds, simple deployment, content-focused

**Detection (Warning Signs):**
- Mid-implementation framework doubts
- Researching alternatives after starting
- Fighting Hugo's structure instead of working with it
- No framework decision in planning docs

**Phase to Address:** Phase 1 (Technology Selection) - Decision point before implementation

**Source Confidence:** HIGH
- [Hugo vs Jekyll vs 11ty: Complete SSG Comparison 2026](https://dasroot.net/posts/2026/03/hugo-vs-jekyll-vs-11ty-static-site-generator-comparison-2026/)
- [JeffGeerling.com Migrated to Hugo](https://www.jeffgeerling.com/blog/2026/migrated-to-hugo/)
- [Migrating from WordPress to Hugo: Complete Guide](https://dasroot.net/posts/2026/02/migrating-wordpress-to-hugo-complete-guide/)

---

### Pitfall 12: Spelling and Grammar Mistakes
**What goes wrong:** Typos and grammar errors in content, especially visible in headings or navigation.

**Why it happens:**
- Focus on design/code over content quality
- No review process
- Writing quickly without proofreading
- Treating content as secondary

**Consequences:**
- Unprofessional appearance
- Undermines credibility
- Embarrassing in professional portfolio
- First impression damage

**Prevention:**
1. **Proofread all content** before committing
2. **Use spell check tools**: Grammarly, VSCode extensions
3. **Read content out loud**
4. **Have someone else review**
5. **Check navigation/headings extra carefully** (most visible)

**Detection (Warning Signs):**
- No review process
- Writing and publishing immediately
- Not using spell check
- Skipping content in testing focus

**Phase to Address:** Phase 2 (Content Migration) and Phase 4 (Content Review)

**Source Confidence:** HIGH
- [Portfolio Mistakes Designers Still Make in 2026](https://muz.li/blog/portfolio-mistakes-designers-still-make-in-2026/)
- [12 Things to Remove From Your Portfolio Immediately](https://mattolpinski.com/articles/fix-your-portfolio/)

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Design System Extraction | Extracting values without system logic | Document scales, ratios, and semantic meaning alongside values |
| Design System Extraction | Missing mobile design patterns | Extract from both mobile and desktop views of reference site |
| Technology Selection | Over-engineering with React/frameworks | Default to static site generator for static content |
| Technology Selection | Hugo abandonment mid-project | Evaluate framework fit BEFORE implementation with PoC |
| Content Migration | URL structure changes without redirects | Create old→new URL mapping before migration |
| Content Migration | Image hot-loading from old site | Download all assets locally, update references |
| Content Migration | Lost metadata (dates, descriptions) | Preserve all frontmatter and add missing SEO tags |
| Implementation | Copying components without context adaptation | Validate component patterns against actual content needs |
| Implementation | Scope creep (adding "nice to have" features) | Define MVP explicitly, defer features to post-launch |
| Implementation | Desktop-only development | Develop mobile-first, test on real devices |
| Testing | Large unoptimized images | Run image optimization, check Lighthouse performance |
| Testing | Broken links after migration | Use Screaming Frog to crawl all URLs |
| Content Review | Spelling/grammar mistakes | Proofread, use spell check, get external review |

---

## Sources

### Critical Pitfalls (HIGH Confidence)
- [Dembrandt: Automated Design Token Extraction from Websites](https://www.dembrandt.com/blackpaper)
- [Design Systems Pitfalls](https://medium.com/@withinsight1/design-systems-pitfalls-6b3113fa0898)
- [Design Systems in 2026: Predictions, Pitfalls, and Power Moves](https://rydarashid.medium.com/design-systems-in-2026-predictions-pitfalls-and-power-moves-f401317f7563)
- [I Built a Portfolio Website That's (Almost) Unhackable](https://infosecwriteups.com/i-built-a-portfolio-website-thats-almost-unhackable-here-is-how-33351d7d56f7)
- [Portfolio Mistakes Designers Still Make in 2026](https://muz.li/blog/portfolio-mistakes-designers-still-make-in-2026/)
- [SEO Migration Strategy: Complete Guide for 2026](https://www.influize.com/blog/seo-migration-strategy)
- [Website Migration SEO Checklist (2026)](https://atlasmarketing.ai/technical-seo/website-migration-seo-guide/)
- [Guide to Successful Website Content Migration](https://designtlc.com/a-guide-to-successful-website-content-migration-during-redesigns/)

### Moderate Pitfalls (MEDIUM Confidence)
- [I've Reviewed 200+ Developer Portfolios - 90% Make Same Mistakes](https://dev.to/matthewhou/ive-reviewed-200-developer-portfolios-90-make-the-same-4-mistakes-16kd)
- [Migration Gotchas](https://www.spectralwebservices.com/blog/migration-gotchas/)
- [Website Content Migration Guide](https://www.lingoapp.com/glossary/website-content-migration)
- [What Is Feature Creep and How to Avoid It](https://www.strikingly.com/content/blog/feature-creep/)
- [Feature Creep, the Bane of Our Existence](https://www.interaction-design.org/literature/article/feature-creep-the-bane-of-our-existence)
- [When in Design Process Should I Use Components](https://jlzych.com/2021/05/22/when-in-the-design-process-should-i-use-components-in-my-design-system/)
- [Why Copying Your Competitor's App Will Kill Your Product](https://medium.com/design-bootcamp/why-copying-your-competitors-app-will-kill-your-product-05af1370114c)

### Minor Pitfalls (HIGH Confidence)
- [Typography in Design Systems](https://medium.com/eightshapes-llc/typography-in-design-systems-6ed771432f1e)
- [Mastering Typography in Design Systems with Semantic Tokens](https://uxdesign.cc/mastering-typography-in-design-systems-with-semantic-tokens-and-responsive-scaling-6ccd598d9f21)
- [My Attempt to Reverse Engineer Medium](https://medium.com/@dmitri145/my-attempt-to-reverse-engineer-mediums-design-part-1-font-size-line-height-and-baseline-e5035b91cd57)
- [5 Mistakes Developers Make in Portfolio Websites](https://www.devportfoliotemplates.com/blog/5-mistakes-developers-make-in-their-portfolio-websites)
- [Hugo vs Jekyll vs 11ty: Complete SSG Comparison 2026](https://dasroot.net/posts/2026/03/hugo-vs-jekyll-vs-11ty-static-site-generator-comparison-2026/)
- [JeffGeerling.com Migrated to Hugo](https://www.jeffgeerling.com/blog/2026/migrated-to-hugo/)
- [Migrating from WordPress to Hugo: Complete Guide](https://dasroot.net/posts/2026/02/migrating-wordpress-to-hugo-complete-guide/)
- [12 Things to Remove From Your Portfolio Immediately](https://mattolpinski.com/articles/fix-your-portfolio/)
- [Ultimate Website Migration Checklist for 2026](https://www.eclicksoftwares.com/public/blog/ultimate-website-migration-checklist-for-2026-beyond)

### Additional References
- [Design System Pitfalls and Best Practices](https://www.neue.world/learn/design-system/design-system-pitfalls-and-best-practices)
- [8 Software Developer Portfolio Website Mistakes](https://coachfullstack.com/posts/8-software-developer-portfolio-website-mistakes/)
- [Common Web Developer Portfolio Mistakes](https://v1.scrimba.com/articles/web-developer-portfolio-mistakes/)
- [How to Handle Scope Creep in Web Design](https://speckyboy.com/scope-creep-web-design/)
