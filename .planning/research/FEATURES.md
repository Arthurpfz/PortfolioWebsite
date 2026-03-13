# Feature Landscape

**Domain:** Portfolio Website (Product Manager / Professional)
**Researched:** 2026-03-13

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Mobile responsive design | 50%+ of users browse mobile; broken mobile = immediate exit | Low | CSS frameworks handle this by default |
| Fast page load (<3s) | Slow sites lose 53% of mobile visitors; affects SEO ranking | Low | Optimize images, minimize JS, use CDN if needed |
| Clean navigation | Users abandon confusing sites; portfolio should be effortless to explore | Low | 3-page structure already simple (Archive, Experience, Now) |
| Contact information | No contact = missed opportunities; users won't hunt for ways to reach you | Low | Email link or simple form on every page |
| About/Bio section | Users want to know who you are and your background | Low | Experience page serves this purpose |
| High-quality project showcase | Work is the primary reason visitors come; poor presentation = unprofessional | Medium | Archive page with articles, Now page with current work |
| SSL/HTTPS | Required for credibility; browsers flag non-HTTPS as "not secure" | Low | Standard with modern hosting (Vercel, Netlify, etc.) |
| Accessible design | Screen readers, keyboard navigation expected; legal requirement in many contexts | Medium | Semantic HTML, ARIA labels, color contrast |
| Clear typography | Poor readability = visitors leave; hierarchy guides attention | Low | Design system from Nous Research covers this |
| Professional domain | yourname.com vs username.builder.com signals seriousness | Low | Already have arthurpfz.com |

## Differentiators

Features that set product apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Reverse-chronological "Now" page | Shows current thinking/work; more authentic than static portfolio | Low | Planned in PROJECT.md; differentiates from typical "Latest Work" galleries |
| Self-aware tone | Breaks professional portfolio monotony; memorable personality | Low | Archive intro with PM documentation humor; humanizes the portfolio |
| Minimalist aesthetic | Cuts through portfolio noise; signals confidence (let work speak) | Medium | Nous Research design system; anti-flashy approach |
| Dark/light mode toggle | Visitor preference respected; modern UX pattern | Medium | Popular in 2026; shows attention to detail |
| Contextual project descriptions | Shows process/thinking, not just outputs; PM portfolios especially benefit | Low | Brief context on Archive articles and Now updates |
| No case study bloat | Many portfolios over-explain; tight summaries respect visitor time | Low | Anti-feature of typical PM portfolios |
| Minimal navigation chrome | Focus stays on content; watered-down nav is 2026 trend | Low | Aligns with Nous Research aesthetic |
| Performance metrics in content | Quantifiable impact (where applicable) builds credibility | Low | Include in Archive articles when relevant |
| RSS feed for Now page | Direct content delivery; shows technical chops; alternative to social | Low | Valuable for audience who uses feed readers |
| No analytics tracking | Privacy-first approach; differentiates from surveillance-heavy sites | Low | Skip Google Analytics unless truly needed |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Lengthy case studies | PM portfolios often over-document; visitors skim anyway | Brief project summaries with context/impact |
| Animations/micro-interactions | Trendy but slow; distracts from content; ages poorly | Clean, fast, static design; let content move users |
| Filterable/categorized portfolio | Adds complexity; only 3 pages of content doesn't warrant it | Chronological ordering; simple structure |
| Testimonials section | Feels salesy; LinkedIn already has recommendations | Let work speak; include client names in project context |
| Skills/technology tag clouds | Buzzword soup; doesn't demonstrate actual capability | Show skills through work examples |
| Social media feeds embedded | Slows page load; looks dated when feeds stale | Link to profiles; don't embed dynamic content |
| Newsletter signup | Requires ongoing commitment to send; blog has no posting cadence | Use RSS for Now page instead |
| Contact form with captcha | Friction; spam can be filtered server-side | Direct email link or simple mailto: |
| Detailed role descriptions on Experience | Verbose; LinkedIn already has this; minimalism is the design | Company, title, dates only (per PROJECT.md) |
| Video backgrounds | Bandwidth hog; accessibility nightmare; pure aesthetics | High-quality static imagery if needed |
| Splash page/loader | Adds unnecessary step; users want content immediately | Load straight to Now page (planned redirect) |
| Cookie consent banners | Only needed if tracking users; avoid tracking instead | Privacy-first = no banner needed |

## Feature Dependencies

```
Mobile responsive design ← Fast page load (mobile users most affected by slow loads)
Clean navigation ← Contact information (nav must include contact access)
High-quality project showcase ← Contextual project descriptions (context enhances showcase)
Dark/light mode toggle → Accessible design (mode switch must respect accessibility)
RSS feed for Now page ← Reverse-chronological Now page (feed needs structured content)
```

## MVP Recommendation

**Phase 1 - Core Foundation:**
1. Mobile responsive design
2. Fast page load
3. Clean navigation (3 pages)
4. SSL/HTTPS
5. Professional domain setup
6. Clear typography (Nous Research design system)

**Phase 2 - Content:**
1. High-quality project showcase (Archive migration)
2. About/Bio section (Experience page)
3. Contact information
4. Reverse-chronological Now page (empty placeholder initially)

**Phase 3 - Polish:**
1. Accessible design (semantic HTML, ARIA)
2. Self-aware tone (Archive intro)
3. Contextual project descriptions
4. Minimalist aesthetic refinement

**Defer:**
- Dark/light mode toggle (nice-to-have; adds complexity)
- RSS feed for Now page (wait until Now page has content)
- Performance metrics in content (add during content migration, not build phase)
- No analytics tracking (decision can be made post-launch)

**Rationale:**
- Get content live fast; polish iteratively
- Minimalist design reduces feature creep
- "Now" page starts empty per PROJECT.md, so RSS/content features can wait
- Archive migration is priority (existing content needs home)

## Complexity Analysis

| Category | Low | Medium | High |
|----------|-----|--------|------|
| Table Stakes | 8 features | 2 features | 0 features |
| Differentiators | 7 features | 3 features | 0 features |
| **Total** | **15 features** | **5 features** | **0 features** |

**Overall complexity: LOW**
- No high-complexity features required
- Medium-complexity items (responsive design, accessibility, dark mode, minimalist aesthetic) have mature tooling
- Tech stack flexibility (per PROJECT.md) allows choosing frameworks that handle complexity

## Sources

### Portfolio Website Features (2026)
- [5 Best Portfolio Website Builders Creators Are Using in 2026](https://emergent.sh/learn/best-portfolio-website-builders)
- [Land That Dream Job: Your 2026 Guide to a Killer Portfolio Website](https://elementor.com/blog/land-that-dream-job/)
- [7 Best Web Portfolio Template Ideas for 2026](https://www.gola.supply/blog/web-portfolio-template)
- [21 Best Developer Portfolios (Examples) 2026](https://colorlib.com/wp/developer-portfolios/)
- [15+ Best portfolio website examples for inspiration in 2026](https://www.hostinger.com/tutorials/portfolio-website-examples)

### Best Practices (2026)
- [23 portfolio website examples, plus best practices](https://webflow.com/blog/design-portfolio-examples)
- [19 Best Portfolio Design Trends (In 2026)](https://colorlib.com/wp/portfolio-design-trends/)
- [15 Best Portfolio Website Examples That Win Clients In 2026](https://www.digitalsilk.com/digital-trends/best-portfolio-website-examples/)

### Common Mistakes
- [The 8 Biggest Mistakes on Your Portfolio](https://www.format.com/magazine/resources/photography/8-mistakes-build-portfolio-website-photography)
- [Common mistakes when creating a portfolio](https://www.wix.com/blog/common-portfolio-mistakes)
- [5 Common Mistakes in Portfolio Website Content](https://www.strikingly.com/blog/posts/5-common-mistakes-portfolio-website-content)
- [12 Things You Should Remove From Your Portfolio Website Immediately](https://mattolpinski.com/articles/fix-your-portfolio/)

### Product Manager Portfolios
- [Product Manager Portfolios: 20+ Well-Designed Examples (2026)](https://www.sitebuilderreport.com/inspiration/product-manager-portfolios)
- [The Ultimate Guide to Product Manager Portfolios](https://www.joinleland.com/library/a/product-manager-portfolio)
- [9 Great Product Manager Portfolio Examples: A 2025 Guide](https://careerfoundry.com/en/blog/product-management/product-manager-portfolio/)

### Minimalist Design
- [14 Minimalist Portfolio Website Designs We Simply Loved](https://htmlburger.com/blog/minimalist-portfolio-website/)
- [30 Minimalist Portfolio Website Designs for Inspiration](https://www.webfx.com/blog/web-design/minimalist-portfolio-website/)
- [18 Best Minimalist Website Examples 2026](https://colorlib.com/wp/minimalist-website-examples/)

### Case Studies
- [How To Write A Case Study For Your Design Portfolio](https://www.format.com/magazine/resources/design/how-to-write-design-case-study)
- [Portfolio vs Case Study: Which One Does Your Business Need?](https://evielutions.com/portfolio-vs-case-study-which-one-does-your-business-need/)

### Analytics & RSS
- [A Beginners Guide to Portfolio Analytics](https://www.journoportfolio.com/blog/a-beginners-guide-to-portfolio-analytics/)
- [Why RSS Feeds Still Matter in 2026](https://geobarta.com/en/blog/why-rss-feeds-still-matter-2026-open-web-vs-algorithms)
