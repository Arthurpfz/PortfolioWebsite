---
title: "A vault that ingests itself"
date: 2026-04-27
updated: 2026-11-22
description: "Voice notes, bookmarks, tweets, YouTube — captured automatically, filed in markdown, maintained by scheduled jobs. The architecture, the schema, and the three patterns that hold it together."
categories: ["Essay"]
tags: ["Obsidian", "Knowledge Management", "Agents", "n8n"]
draft: false
---

Voice notes. Bookmarks. Tweets. YouTube transcripts. All captured automatically, filed as plain markdown, kept tidy by jobs that run while I sleep.

This is how the pieces fit together.

## The architecture

```
                    ┌── Telegram bots ──────────────┐
                    │  URL bot      ← bookmarks,    │
                    │                 articles,     │
                    │                 YouTube       │
                    │  Voice bot    ← voice memos   │
                    └───────────────┬───────────────┘
                                    ↓
                          ┌──────── n8n ────────┐
                          │  Bookmark Summary   │
                          │  Voice Notes → Vault│   ← nervous system
                          │  Vault Writer       │
                          │  Promote · Dream ·  │
                          │  Digest · Podcast   │
                          └──────────┬──────────┘
                                     ↓
                          ┌─── Vault on VPS ────┐
                          │  wiki/<page>.md     │   ← source of truth
                          │  wiki/sources/      │      plain markdown
                          │  wiki/learnings/    │
                          └──────────┬──────────┘
                                     ↕  Syncthing (~10s)
                          ┌──────────┴──────────┐
                          │  Mac vault          │   ← Obsidian opens here
                          └─────────────────────┘

                          ┌─────────────────────┐
                          │  Claude Code on VPS │   ← questions, from
                          │  (grep over vault)  │      the phone
                          └─────────────────────┘
```

## What it does

- **Capture is automated.** Two Telegram bots cover all input. Share-sheet a URL, or hold-to-record a voice memo. The right workflow handles it.
- **The vault lives on a VPS.** Plain markdown on disk. Source of truth is the server, so write workflows don't depend on the laptop being open.
- **Sync is real-time.** Syncthing mirrors VPS ↔ Mac in about ten seconds. Open Obsidian on the Mac, see what got captured five minutes ago.
- **Questions go to Claude Code.** It runs on the same VPS, reachable from the phone. It greps the markdown and answers. No embeddings, no index to keep fresh.
- **The wiki grows and cleans itself.** Scheduled jobs turn captures into wiki pages, fix links every night, and send a weekly digest. Anything that needs a human lands on a review page.

## The vault schema

```
vault/
├── wiki/
│   ├── index.md          ← hubs only: topics, projects
│   ├── overview.md       ← state of the whole wiki
│   ├── log.md            ← every wiki op
│   ├── decisions.md      ← dated decision log
│   ├── roadmap.md        ← open work
│   ├── <page>.md         ← every entity / concept / project,
│   │                        flat; kind is the `type:` field
│   ├── sources/
│   │   ├── bookmarks/    ← URL bot writes here
│   │   └── voice-notes/  ← voice bot writes here
│   ├── learnings/        ← takeaways, one file per topic
│   ├── lists/            ← todos, project ideas, other
│   └── outputs/          ← review pages, filed analyses
└── raw/                  ← immutable source dumps
```

Pages sit flat. A page's kind is a frontmatter field, not a folder, so reclassifying a page is a one-line edit and no link breaks. One home per fact. No duplicates.

## The components

| Layer | Tool | What it does |
|---|---|---|
| Capture (URLs) | Telegram bot | tweet · article · YouTube → markdown |
| Capture (voice) | Telegram bot | voice → Whisper → categorized markdown |
| Routing | n8n (self-hosted) | webhooks, schedules, transforms |
| Storage | VPS | plain markdown, schema-enforced |
| Writes | Vault Writer webhook | the only write path for agents, token-protected |
| Sync | Syncthing | VPS ↔ Mac, ~10s |
| Questions | Claude Code on the VPS | grep over the markdown |
| Upkeep | scheduled jobs | promote, nightly cleanup, weekly digest |
| Models | OpenRouter | one key, swap models per job |

## Three patterns

**One home per fact.**

WHY (decisions, roadmap, learnings) lives in the vault. HOW (operational state) lives in per-project `CLAUDE.md`. About YOU (preferences, env quirks) lives in agent memory. WHAT (code) lives in git. If a fact appears in two files, one of them links to the other. Never copy.

**Bots write, humans browse.**

Capture is automated. Reading is human. Telegram is the lowest-friction surface available — share-sheet on phone, hold-to-record for voice. The bot replies with a confirmation and a delete button so a wrong capture is one tap to remove. Reading still happens in Obsidian, where it should.

**Jobs maintain, humans review.**

Three jobs keep the wiki alive without anyone opening it:

- **Promote (weekly).** Reads new bookmarks, extracts entities, concepts and learnings, and writes them as wiki pages with `[[wikilinks]]` back to sources. A subject gets its own page only once a second source mentions it, so one-off names don't pile up as stubs. Anything the model is unsure about waits on a review page instead of going in.
- **Dream (nightly).** Fixes broken links, keeps the hub index and overview current, finds orphan pages, fills in stubs that several sources mention, and flags contradictions.
- **Digest (weekly).** Sends a short summary of what changed and what needs a decision.

The same vault also feeds a daily two-host podcast and a Monday digest that resurfaces one page. Capture once, reuse everywhere.

## What this isn't

- Not a content production system. This is for thinking.
- Not turnkey. Several pieces have to talk to each other; getting them aligned takes a weekend.
- Not novel pieces. Every component is off the shelf. The recipe is what's rare.

## Take it

There's a [template repo with the architecture, schema, and skill examples](https://github.com/Arthurpfz/vault-system-template). Star it if you're building something similar — that's the signal to ship more (workflow JSONs, bot code, deploy templates).

Follow [@arthurpfz](https://x.com/arthurpfz) for build logs.

## Update log

- **2026-11-22** — Rewrote this page for the current setup: two capture bots, flat page layout, nightly cleanup and weekly digest next to the promote job, Claude Code for questions.
- **2026-11-10** — Promote now waits for a second mention before creating a page. Vault Writer requires a token.
- **2026-11-09** — Flattened the wiki: entity and concept folders gone, a page's kind is its `type:` field. Hub-only index. Uncertain extractions go to a review page.
- **2026-11-08** — Retired the on-VPS agent (Hermes) and QMD. It had ended up only running fixed scripts on a schedule, which n8n does better. Questions over the vault now go to Claude Code running on the VPS, with plain grep over the markdown.
- **2026-04-27** — Published this writeup: the architecture, the schema, and the three patterns that hold it together.
- **2026-04-10** — Vault foundation in place. Obsidian on the read side, Claude on the write side, QMD for full-text search, Syncthing mirroring Mac ↔ VPS with no cloud middleman.
