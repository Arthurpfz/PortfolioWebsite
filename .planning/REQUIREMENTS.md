# Requirements: Portfolio Website Redesign

**Defined:** 2026-03-13
**Core Value:** A portfolio that showcases work and thinking without over-engineering — clean structure, minimal friction, self-aware tone

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Design System

- [x] **DSGN-01**: Extract visual design system from nousresearch.com (colors, typography, layout, spacing)
- [x] **DSGN-02**: Apply extracted design system to portfolio site
- [ ] **DSGN-03**: Implement mobile responsive design
- [ ] **DSGN-04**: Achieve fast page load (<3s)
- [x] **DSGN-05**: Implement clear typography hierarchy from Nous Research design
- [ ] **DSGN-06**: Apply minimalist aesthetic consistently across all pages
- [ ] **DSGN-07**: Implement accessible design (semantic HTML, ARIA labels, keyboard navigation)
- [ ] **DSGN-08**: Implement dark/light mode toggle

### Pages & Content

- [ ] **PAGE-01**: Create Archive page with "Arthur's PM Homework" header and self-deprecating intro
- [ ] **PAGE-02**: Migrate all existing Hugo articles to Archive page
- [ ] **PAGE-03**: Create Experience page with LinkedIn work history (company, title, dates only)
- [ ] **PAGE-04**: Create Now/Thoughts/Projects page (reverse-chronological list, empty placeholder initially)
- [ ] **PAGE-05**: Include performance metrics in Archive articles where relevant

### Navigation & Structure

- [x] **NAV-01**: Implement clean navigation across all three pages
- [ ] **NAV-02**: Configure homepage to redirect to Now/Thoughts page
- [x] **NAV-03**: Add contact information (email link) visible on all pages

### Foundation

- [ ] **FOUN-01**: Configure SSL/HTTPS for arthurpfz.com
- [ ] **FOUN-02**: Preserve professional domain (arthurpfz.com)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Features

- **ENH-01**: RSS feed for Now/Thoughts page (wait until page has regular content)
- **ENH-02**: Interactive islands/components if needed (evaluate during execution)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Hugo framework preservation | Tech stack is flexible — design and content matter more than framework |
| Analytics tracking | Privacy-first approach — no user surveillance |
| Lengthy case studies | Anti-feature: PM portfolios over-document; visitors skim anyway |
| Animations/micro-interactions | Anti-feature: distracts from content, slows page, ages poorly |
| Filterable/categorized portfolio | Anti-feature: unnecessary complexity for 3-page structure |
| Testimonials section | Anti-feature: feels salesy, LinkedIn has recommendations |
| Skills/technology tag clouds | Anti-feature: buzzword soup doesn't demonstrate capability |
| Social media feed embeds | Anti-feature: slows load, looks dated when feeds stale |
| Newsletter signup | Anti-feature: requires posting cadence commitment |
| Contact form with captcha | Anti-feature: adds friction, simple email link preferred |
| Detailed role descriptions | Anti-feature: verbose, LinkedIn already provides this |
| Video backgrounds | Anti-feature: bandwidth hog, accessibility nightmare |
| Splash page/loader | Anti-feature: unnecessary step before content |
| Cookie consent banners | Not needed with privacy-first (no tracking) approach |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DSGN-01 | Phase 1 | Complete |
| DSGN-02 | Phase 2 | Complete |
| DSGN-03 | Phase 3 | Pending |
| DSGN-04 | Phase 5 | Pending |
| DSGN-05 | Phase 1 | Complete |
| DSGN-06 | Phase 2 | Pending |
| DSGN-07 | Phase 3 | Pending |
| DSGN-08 | Phase 5 | Pending |
| PAGE-01 | Phase 2 | Pending |
| PAGE-02 | Phase 4 | Pending |
| PAGE-03 | Phase 2 | Pending |
| PAGE-04 | Phase 2 | Pending |
| PAGE-05 | Phase 4 | Pending |
| NAV-01 | Phase 2 | Complete |
| NAV-02 | Phase 2 | Pending |
| NAV-03 | Phase 2 | Complete |
| FOUN-01 | Phase 1 | Pending |
| FOUN-02 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-13*
*Last updated: 2026-03-13 after roadmap creation*
