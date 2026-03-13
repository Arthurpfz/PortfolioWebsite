---
phase: 1
slug: foundation-design-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-13
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + @testing-library/react (latest stable) |
| **Config file** | `vitest.config.ts` (none — Wave 0 installs) |
| **Quick run command** | `npm run test:unit` |
| **Full suite command** | `npm run test` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run test:unit`
- **After every plan wave:** Run `npm run test`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 0 | DSGN-01 | smoke | `npm run test:smoke -- typography.spec.ts` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.ts` — Configure Vitest with Astro's getViteConfig() helper
- [ ] `src/test/setup.ts` — Testing utilities and global setup
- [ ] `src/styles/tokens/__tests__/typography.spec.ts` — Smoke test verifying typography tokens are defined and accessible
- [ ] Framework install: `npm install -D vitest @testing-library/react @testing-library/jest-dom happy-dom @vitejs/plugin-react`
- [ ] Package.json scripts: `"test": "vitest"`, `"test:unit": "vitest run"`, `"test:smoke": "vitest run --testNamePattern=smoke"`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| HTTPS accessible at arthurpfz.com | FOUN-01 | Infrastructure validation post-deployment | Open https://arthurpfz.com in browser, verify SSL certificate is valid and page loads |
| Domain arthurpfz.com resolves correctly | FOUN-02 | DNS configuration validation | Run `curl -I https://arthurpfz.com` after DNS configured, verify 200 response |
| Design tokens extracted and documented | DSGN-01 | Manual extraction validation | Review `.planning/phases/01-foundation-design-system/design-tokens.json` for completeness |
| Typography hierarchy visible in base styles | DSGN-05 | Visual design validation | Inspect base styles in browser DevTools, verify H1-H6 hierarchy matches Nous Research |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
