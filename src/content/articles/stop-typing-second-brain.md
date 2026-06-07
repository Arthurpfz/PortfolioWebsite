---
title: "A vault that ingests itself"
date: 2026-04-27
description: "Voice notes, bookmarks, tweets, YouTube — captured automatically, filed in markdown, queryable from anywhere. The architecture, the schema, and the three patterns that hold it together."
categories: ["Essay"]
tags: ["Obsidian", "Knowledge Management", "Agents", "n8n"]
draft: false
---

Voice notes. Bookmarks. Tweets. YouTube transcripts. All captured automatically, filed as plain markdown, queryable from anywhere.

This is how the pieces fit together.

## The architecture

```
                    ┌── Telegram bots ──────────────┐
                    │  URL bot      ← bookmarks,    │
                    │                 articles,     │
                    │                 YouTube       │
                    │  Voice bot    ← voice memos   │
                    │  Agent bot    ← queries       │
                    └───────────────┬───────────────┘
                                    ↓
                          ┌──────── n8n ────────┐
                          │  Bookmark Summary   │
                          │  Voice Notes → Vault│   ← nervous system
                          │  Vault Writer       │
                          │  Weekly Promote     │
                          └──────────┬──────────┘
                                     ↓
                          ┌─── Vault on VPS ────┐
                          │  wiki/sources/      │   ← source of truth
                          │  wiki/entities/     │      plain markdown
                          │  wiki/concepts/     │
                          │  wiki/learnings/    │
                          └──────────┬──────────┘
                                     ↕  Syncthing (~10s)
                          ┌──────────┴──────────┐
                          │  Mac vault          │   ← Obsidian opens here
                          └──────────┬──────────┘
                                     ↑
                          ┌──────────┴──────────┐
                          │  Agent (read-only)  │   ← answers
                          │  vault-aware │ writer│      via Telegram
                          └─────────────────────┘
```

## What it does

- **Capture is automated.** Three Telegram bots cover all input. Share-sheet a URL, hold-to-record a voice memo, ask the agent a question — the right workflow handles it.
- **The vault lives on a VPS.** Plain markdown on disk. Source of truth is the server, so write workflows don't depend on the laptop being open.
- **Sync is real-time.** Syncthing mirrors VPS ↔ Mac in about ten seconds. Open Obsidian on the Mac, see what got captured five minutes ago.
- **The agent reads the whole thing.** From the same phone that captures notes, you can query them. The agent is read-only by default; drafts go to a separate inbox folder for manual review.
- **The wiki grows itself.** A Sunday cron job reads the week's captures, extracts entities and concepts and learnings, and writes new wiki pages with `[[wikilinks]]` back to sources.

## The vault schema

```
vault/
├── wiki/
│   ├── index.md          ← topic-led entry point
│   ├── log.md            ← every wiki op
│   ├── decisions.md      ← dated decision log
│   ├── roadmap.md        ← open work
│   ├── sources/
│   │   ├── bookmarks/    ← URL bot writes here
│   │   └── voice-notes/  ← voice bot writes here
│   ├── entities/         ← people, companies, products
│   ├── concepts/         ← ideas, frameworks
│   ├── learnings/        ← takeaways
│   └── lists/            ← /todos /projects /other
└── raw/                  ← immutable source dumps
```

One home per fact. No duplicates.

## The components

| Layer | Tool | What it does |
|---|---|---|
| Capture (URLs) | Telegram bot | tweet · article · YouTube → markdown |
| Capture (voice) | Telegram bot | voice → Whisper → categorized markdown |
| Routing | n8n | webhooks, schedules, transforms |
| Storage | VPS | plain markdown, schema-enforced |
| Sync | Syncthing | VPS ↔ Mac, ~10s |
| Search | QMD | semantic search inside agent container |
| Agent | NousResearch Hermes | read-only vault, drafts via inbox |
| Promotion | weekly cron | bookmarks → entities/concepts |

Every piece is open source.

## Three patterns

**One home per fact.**

WHY (decisions, roadmap, learnings) lives in the vault. HOW (operational state) lives in per-project `CLAUDE.md`. About YOU (preferences, env quirks) lives in agent memory. WHAT (code) lives in git. If a fact appears in two files, one of them links to the other. Never copy.

**Bots write, humans browse.**

Capture is automated. Reading is human. Telegram is the lowest-friction surface available — share-sheet on phone, hold-to-record for voice. The bot replies with a confirmation and a delete button so a wrong capture is one tap to remove. Reading still happens in Obsidian, where it should.

**Promote weekly.**

Every Sunday, n8n runs a "promote" job: it reads new bookmarks, asks the model to extract entities and concepts and learnings, and writes them as new wiki pages with `[[wikilinks]]` back to sources. The wiki *grows itself* without anyone opening it.

## The agent loop

The on-VPS agent has two personalities:

- **vault-aware** — read-only. Queries via grep and semantic search. *"What did I save about Karpathy's LLM wiki idea?"*
- **vault-writer** — drafts new pages to a `vault-inbox/` folder. The vault itself stays read-only. Drafts get promoted manually after review.

The default model is a fast cheap one (Grok 4.1 Fast at the moment, ~15× cheaper than Sonnet for this workload). There's an escape hatch to Sonnet for harder queries.

## What this isn't

- Not a content production system. This is for thinking.
- Not turnkey. Six pieces have to talk to each other; getting them aligned takes a weekend.
- Not novel pieces. Every component is open source. The recipe is what's rare.

## Take it

There's a [template repo with the architecture, schema, and skill examples](https://github.com/Arthurpfz/vault-system-template). Star it if you're building something similar — that's the signal to ship more (workflow JSONs, bot code, deploy templates).

Follow [@arthurpfz](https://x.com/arthurpfz) for build logs.

## Update log

- **2026-04-27** — Published this writeup: the architecture, the schema, and the three patterns that hold it together.
- **2026-04-10** — Vault foundation in place. Obsidian on the read side, Claude on the write side, QMD for full-text search, Syncthing mirroring Mac ↔ VPS with no cloud middleman.
