# Roadmap: Portfolio Website Redesign

**Project:** Portfolio Website Redesign
**Created:** 2026-03-13
**Depth:** Coarse (5 phases)
**Coverage:** 18/18 v1 requirements mapped

## Phases

- [ ] **Phase 1: Foundation & Design System** - Set up tech stack and extract Nous Research design tokens
- [x] **Phase 2: Core Pages & Navigation** - Build all three pages with design system applied (completed 2026-03-14)
- [x] **Phase 3: Responsive & Accessible Design** - Ensure mobile responsiveness and accessibility compliance (completed 2026-03-14)
- [ ] **Phase 4: Content Migration** - Migrate existing Hugo articles to Archive page
- [ ] **Phase 5: Performance & Launch** - Optimize, polish, and deploy to production

## Phase Details

### Phase 1: Foundation & Design System
**Goal**: Technology foundation is established and design system tokens are extracted and implemented

**Depends on**: Nothing (first phase)

**Requirements**: FOUN-01, FOUN-02, DSGN-01, DSGN-05

**Success Criteria** (what must be TRUE):
1. User can access arthurpfz.com over HTTPS with valid SSL certificate
2. Design tokens extracted from nousresearch.com are documented (colors, typography scales, spacing system, effects)
3. Typography hierarchy from Nous Research is visible in base styles (headings, body text, sizing relationships)
4. CSS variables are defined for all design tokens (raw → semantic → component layers)

**Plans**: 3 plans in 2 waves

Plans:
- [ ] 01-01-PLAN.md — Astro + Tailwind Setup (Wave 1, autonomous)
- [ ] 01-02-PLAN.md — Design Token Extraction (Wave 1, autonomous)
- [ ] 01-03-PLAN.md — Cloudflare Pages Deployment (Wave 2, has checkpoint)

---

### Phase 2: Core Pages & Navigation
**Goal**: All three pages exist with design system applied and navigation works across the site

**Depends on**: Phase 1 (design tokens must exist before pages can use them)

**Requirements**: PAGE-01, PAGE-03, PAGE-04, NAV-01, NAV-02, NAV-03, DSGN-02, DSGN-06

**Success Criteria** (what must be TRUE):
1. User can navigate between Archive, Experience, and Now pages via clean navigation
2. Archive page displays "Arthur's PM Homework" header with self-deprecating intro about PM documentation
3. Experience page shows work history from LinkedIn (company, title, dates only)
4. Now/Thoughts page exists as empty placeholder with reverse-chronological structure ready
5. Homepage (/) redirects to Now/Thoughts page automatically
6. Contact email link is visible on all pages
7. Minimalist aesthetic from Nous Research is consistently applied across all pages

**Plans**: 3 plans in 2 waves

Plans:
- [x] 02-01-PLAN.md — Navigation Component & Base Layout (Wave 1, autonomous)
- [x] 02-02-PLAN.md — Archive & Experience Pages (Wave 2, autonomous)
- [x] 02-03-PLAN.md — Now Page & Homepage Redirect (Wave 2, autonomous)

---

### Phase 3: Responsive & Accessible Design
**Goal**: Site works flawlessly on mobile devices and meets accessibility standards

**Depends on**: Phase 2 (pages must exist before making them responsive)

**Requirements**: DSGN-03, DSGN-07

**Success Criteria** (what must be TRUE):
1. User can navigate and read content comfortably on mobile devices (phone and tablet)
2. Touch targets are appropriately sized (minimum 44px) on mobile
3. User can navigate entire site using keyboard only (no mouse required)
4. Screen reader announces page structure correctly (headings, navigation, content regions)
5. All interactive elements have appropriate ARIA labels

**Plans**: 3 plans in 1 wave

Plans:
- [x] 03-01-PLAN.md — Mobile Responsive Design (Wave 1, has checkpoint)
- [x] 03-02-PLAN.md — Accessibility Compliance (Wave 1, autonomous)
- [ ] 03-03-PLAN.md — Fix Heading Hierarchy Gap (Wave 1, autonomous, gap closure)

---

### Phase 4: Content Migration
**Goal**: All existing Hugo articles are migrated to Archive page with URLs preserved

**Depends on**: Phase 2 (Archive page must exist), Phase 3 (responsive structure ready for content)

**Requirements**: PAGE-02, PAGE-05

**Success Criteria** (what must be TRUE):
1. User can view all previously published articles on the Archive page
2. Old article URLs redirect properly to new Archive structure (no broken links)
3. Article metadata is preserved (publication dates, titles, descriptions)
4. Performance metrics are included in relevant articles where applicable
5. Images and assets from Hugo site are migrated and optimized

**Plans**: TBD

---

### Phase 5: Performance & Launch
**Goal**: Site achieves excellent performance scores and is deployed to production

**Depends on**: Phase 4 (content must be migrated before final optimization)

**Requirements**: DSGN-04, DSGN-08

**Success Criteria** (what must be TRUE):
1. User experiences page load in under 3 seconds on 3G connection
2. Lighthouse performance score is 90+ on all pages
3. User can toggle between dark and light mode
4. Dark/light mode preference persists across browser sessions
5. Site is live at arthurpfz.com with all pages accessible

**Plans**: TBD

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Design System | 2/3 | In Progress|  |
| 2. Core Pages & Navigation | 3/3 | Complete    | 2026-03-14 |
| 3. Responsive & Accessible Design | 2/3 | Complete    | 2026-03-14 |
| 4. Content Migration | 0/TBD | Not started | - |
| 5. Performance & Launch | 0/TBD | Not started | - |

---

## Version History

| Date | Phase | Event | Notes |
|------|-------|-------|-------|
| 2026-03-13 | - | Roadmap created | 5 phases, 18 requirements mapped |
| 2026-03-13 | 1 | Phase 1 planning complete | 3 plans in 2 waves created |
| 2026-03-14 | 2 | Phase 2 planning complete | 3 plans in 2 waves created |
| 2026-03-14 | 3 | Phase 3 planning complete | 2 plans in 2 waves created |
| 2026-03-14 | 3 | Phase 3 gap closure plan added | 1 plan for heading hierarchy fix |

---

*Last updated: 2026-03-14*
