# External Integrations

**Analysis Date:** 2026-03-13

## APIs & External Services

**Analytics:**
- Google Analytics - Tracking and analytics
  - Tracking ID: UA-161568453-1
  - Implementation: Hugo internal template `_internal/google_analytics_async.html` (referenced in `layouts/partials/header.html`)
  - Configuration: `googleAnalytics` parameter in `config.toml`

## Data Storage

**Databases:**
- Not applicable - Static site only

**File Storage:**
- Local filesystem only - Static files in `static/` directory

**Caching:**
- None configured

## Authentication & Identity

**Auth Provider:**
- Not applicable - Public static site

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- None configured

## CI/CD & Deployment

**Hosting:**
- Not detected in codebase (requires external hosting configuration)

**CI Pipeline:**
- Not detected in codebase

## Environment Configuration

**Required env vars:**
- None detected in codebase

**Base URL:**
- `baseURL` in `config.toml` currently empty - requires environment-specific value

**Secrets location:**
- None detected

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Third-Party Features

**Comments:**
- Disqus integration disabled (`enable = false` in `config.toml`)
- Can be enabled via `disqusShortname` parameter if needed

**Math Rendering:**
- KaTeX configured but disabled globally (`enable = false`)
- Alternative: MathJax available if needed

**Navigation:**
- LinkedIn link hardcoded: https://www.linkedin.com/in/apfalzgraf/
- Social integration limited to outbound link only

---

*Integration audit: 2026-03-13*
