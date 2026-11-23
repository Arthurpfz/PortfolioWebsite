---
title: "A vault that ingests itself"
date: 2026-04-27
updated: 2026-11-22
description: "How my notes file themselves: Telegram bots capture, plain markdown on a VPS stores, Obsidian reads, scheduled jobs tidy up."
categories: ["Essay"]
tags: ["Obsidian", "Knowledge Management", "Agents", "n8n"]
draft: false
---

I don't want to file notes by hand, so I don't. I send a link or a voice memo to a Telegram bot, and it ends up as a markdown page in my vault. Jobs on my server tidy it up overnight. I just read it in Obsidian.

## How it fits together

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

- **Capture.** Two Telegram bots: share a link from my phone, or hold to record a voice memo.
- **Storage.** The vault is plain markdown on a VPS, so the bots can write even when my laptop is closed.
- **Sync.** Syncthing copies it to my Mac in about ten seconds, where I read it in Obsidian.
- **Questions.** I ask Claude Code, which runs on the same VPS and is reachable from my phone. It searches the markdown with grep, so there is no search index to maintain.
- **Upkeep.** Scheduled jobs turn captures into wiki pages, fix links every night and send me a weekly digest. Anything that needs my call lands on a review page.

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

Pages sit in one flat folder. A page's kind is a frontmatter field, so reclassifying a page is a one-line edit and no link breaks.

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

## Three rules

**One home per fact.**

Why I decided something goes in the vault. How a project runs goes in its `CLAUDE.md`. What the agent should know about me goes in its memory. Code goes in git. If two files need the same fact, one links to the other.

**Bots write, I read.**

Telegram is the quickest thing on my phone: share a link, or hold to record. The bot confirms and offers a delete button, so a bad capture takes one tap to undo. Reading happens in Obsidian.

**Jobs maintain, I review.**

Three jobs keep the wiki in shape without me opening it:

- **Promote (weekly).** Reads new bookmarks, pulls out people, ideas and learnings, and writes them as wiki pages linked back to their sources. A subject only gets its own page once a second source mentions it, so one-off names don't pile up as empty stubs. When the model is unsure, the item waits on a review page.
- **Dream (nightly).** Fixes broken links, keeps the index and overview current, finds orphan pages, fills in stubs that several sources mention, and flags contradictions.
- **Digest (weekly).** A short summary of what changed and what needs a decision.

The same vault feeds my daily podcast and a Monday digest that resurfaces one page.

## Caveats

- It's for thinking, not for producing content.
- It's not plug and play. Several services need to talk to each other; expect a weekend of wiring.
- None of the parts are new. Everything is off the shelf. The work is in how they connect.

## Take it

There's a [template repo with the architecture, schema and skill examples](https://github.com/Arthurpfz/vault-system-template). If you're building something similar, star it and I'll publish more: workflow JSONs, bot code, deploy templates.

I post build logs on X: [@arthurpfz](https://x.com/arthurpfz).

## Update log

- **2026-11-22** — Rewrote this page for the current setup: two capture bots, flat page layout, nightly cleanup and weekly digest next to the promote job, Claude Code for questions.
- **2026-11-10** — Promote now waits for a second mention before creating a page. Vault Writer requires a token.
- **2026-11-09** — Flattened the wiki: entity and concept folders gone, a page's kind is its `type:` field. Hub-only index. Uncertain extractions go to a review page.
- **2026-11-08** — Retired the on-VPS agent (Hermes) and QMD. It had ended up only running fixed scripts on a schedule, which n8n does better. Questions over the vault now go to Claude Code running on the VPS, with plain grep over the markdown.
- **2026-04-27** — Published this write-up.
- **2026-04-10** — Vault foundation in place. Obsidian on the read side, Claude on the write side, QMD for full-text search, Syncthing mirroring Mac ↔ VPS with no cloud middleman.
