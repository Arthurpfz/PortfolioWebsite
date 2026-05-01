---
title: "Stop typing into your second brain"
date: 2026-04-27
description: "Every Obsidian + AI tutorial tells you to type captures into a folder. Mine captures itself — voice notes, bookmarks, tweets, YouTube — while I sleep. The architecture, the schema, and what's actually novel about it."
categories: ["Essay"]
tags: ["Obsidian", "Knowledge Management", "Agents", "n8n"]
draft: false
---

Every "Obsidian + AI" guide tells you to type captures into a folder.

Mine captures itself. Voice notes. Bookmarks. Tweets. YouTube. While I sleep.

This is the architecture, the schema, and what's actually novel about it.

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

## Why this beats the local-vault pattern

- **No manual capture.** Bots write directly into the vault. The "INBOX" folder doesn't exist.
- **Runs 24/7 on a VPS.** Laptop closed = system still working. Voice note from a run goes straight in.
- **Read everywhere, edit anywhere.** Syncthing keeps Mac and VPS in sync within ten seconds. No git push.
- **The agent has its own bot.** Ask the vault a question from your phone. It reads everything.

The popular guides assume one person, one machine, one Claude Code session. The minute you close the laptop, the system stops thinking. Mine doesn't.

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

Every piece is open source. The recipe is what's rare.

## Three patterns worth stealing

**One home per fact.**

WHY (decisions, roadmap, learnings) lives in the vault. HOW (operational state) lives in per-project `CLAUDE.md`. About YOU (preferences, env quirks) lives in agent memory. WHAT (code) lives in git. If a fact appears in two files, one of them links to the other. Never copy.

**Bots write, humans browse.**

Capture is automated. Reading is human. The minute capture has any friction — even opening a folder — you stop doing it. Telegram is the lowest-friction surface that exists. Use it.

**Promote weekly.**

Every Sunday, n8n runs a "promote" job: it reads new bookmarks, asks the model to extract entities and concepts and learnings, and writes them as new wiki pages with `[[wikilinks]]` back to sources. The wiki *grows itself* without you opening it.

## The agent loop

The on-VPS agent has two personalities:

- **vault-aware** — read-only. Queries via grep and semantic search. *"What did I save about Karpathy's LLM wiki idea?"*
- **vault-writer** — drafts new pages to a `vault-inbox/` folder. The vault itself stays read-only. You promote drafts manually after review.

The default model is a fast cheap one (Grok 4.1 Fast at the moment, ~15× cheaper than Sonnet for this workload). There's an escape hatch to Sonnet for harder queries.

## What this isn't

This is not a content production system. If you want hooks, briefs, and ranked closers, the JARVIS-in-Obsidian guides cover that. This is a *thinking* system.

It's not turnkey. You'll need a VPS, an n8n instance (cloud or self-hosted), and patience for Syncthing's first sync.

It's not novel pieces. Every component is open source. The recipe is what's rare.

## Take it

If this gets traction I'll open up the workflow JSONs and skills directly. For now there's a [template repo with the architecture, schema, and skill examples](https://github.com/Arthurpfz/vault-system-template). Star it if you're building something similar — that's the signal to ship more.

Follow [@arthurpfz](https://x.com/arthurpfz) for build logs.
