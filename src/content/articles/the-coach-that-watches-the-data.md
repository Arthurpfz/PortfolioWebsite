---
title: "A tri-coach on Telegram"
date: 2026-06-07
description: "An AI triathlon coach that grades every workout against your fitness, writes next week's plan on its own, and lives entirely on infrastructure I control. The architecture, the components, and the three patterns that hold it together."
categories: ["Essay"]
tags: ["Triathlon", "n8n", "Agents", "Self-hosting"]
draft: false
---

Every weeknight at 20:10, a Telegram message grades the day's workout — against my fitness, not against a plan.

Every Sunday night, the same system writes the week ahead: seven sessions, periodized to my race date.

Nobody touches it. This is how the pieces fit together.

## The architecture

```
                    ┌── Telegram (CroissantTri) ──┐
                    │  /program  → plan now       │
                    │  /refresh  → backfill       │
                    │  /strikes  → week stats     │
                    │  /training → this week      │
                    └──────────────┬──────────────┘
                                   ↓
              ┌──────── Intervals.icu ───────┐
              │  full FIT data: NP, VI,      │  ← training data
              │  drift, decoupling, zones    │
              └──────────────┬───────────────┘
                             ↓
                   ┌──────── n8n ────────┐
                   │  Sunday Planner     │
                   │  Daily Checkin      │   ← nervous system
                   │  Weekly Stats       │      6 workflows
                   │  Backfill · Errors  │
                   └──────────┬──────────┘
                              ↓
                   ┌─ tricoach-db (VPS) ─┐
                   │  SQLite REST API    │   ← source of truth
                   │  athletes · plans   │      self-hosted
                   │  · sessions         │
                   └──────────┬──────────┘
                              ↓
                   ┌──────────┴──────────┐
                   │  Claude (OpenRouter)│   ← grades the session
                   │  → Telegram reply   │      sends feedback
                   └─────────────────────┘
```

## What it does

- **It grades every session.** Each weeknight it pulls the day's workout from Intervals.icu, runs the full FIT file through Claude, and replies with a letter grade and three data-backed observations. The grade measures *execution against your fitness* — not whether you followed the plan.
- **It writes the plan.** Sunday night it reads your race date, computes how many weeks out you are, derives the training phase and volume target, and asks Claude for seven sessions labelled KEY or OPTIONAL.
- **It nudges on volume.** A daily running tally tracks the week against an hours floor, and from midweek on tells you exactly how far you are from it.
- **It takes commands.** A single Telegram router handles `/program`, `/refresh`, `/strikes`, and `/training` — plan on demand, backfill late uploads, pull stats, see the week.

## The components

| Layer | Tool | What it does |
|---|---|---|
| Orchestration | n8n | webhooks, crons, the six workflows |
| Intelligence | Claude via OpenRouter | grades sessions, drafts plans |
| Training data | Intervals.icu | full FIT metrics from the device |
| Storage | self-hosted SQLite | athletes · plans · sessions, one API |
| Comms | Telegram | plans, feedback, stats, commands |

Every recurring cost on this stack is zero. The database runs on a VPS I already pay for.

## Three patterns

**The plan is a guide, not a contract.**

The daily grade reflects execution against your fitness profile — zones held, pacing, cadence, drift — and nothing else. An off-plan two-hour ride that holds Z2 cleanly is an A. The plan is shown to the model as soft context, with explicit instructions to stay quiet about it unless it adds genuine color. A missed session is just a missed session. No moralizing.

**Full FIT data, not Strava's summary.**

This started on Strava and the feedback was thin — average power, heart rate, moving time. Intervals.icu ingests the same FIT files and returns everything: normalized power, variability index, cardiac drift, decoupling, zone distribution, interval structure. Swapping the data source was the single inflection point for feedback quality. The catch: Intervals blocks activities that arrive via Strava, so the upload chain had to flip from device → Strava → Intervals to device → Intervals, direct.

**Idempotency over retries.**

n8n is reliable, not perfect, and a manual re-run shouldn't double-message you. Every workflow writes an "already coached today?" date gate *before* the heavy lifting, so even a downstream failure leaves the gate honest. A separate error-handler workflow catches anything that throws and sends a Telegram alert — because a silent failure means you simply don't hear from your coach that night, and never know why.

## The daily message

```
🚴 Ride · 90min · 38.5km · 152bpm · TSS 78
Grade: A — clean Z2 with disciplined cadence

• 245W avg / 258W NP / VI 1.05 — textbook steady pacing
• Cadence held 90–94rpm, <3% variation across 90min
• Last 20min: 8W power drop while HR held — fuelling

Tomorrow: easy spin 45min Z2, or rest
Watch: late-ride power decay vs fuelling
```

Six lines. No markdown. It fits on one phone screen — readable on a watch, even.

## What this isn't

- Not multi-athlete yet. The daily loop iterates over everyone; the Sunday planner is still wired to one athlete.
- Not adaptive across weeks. The planner has one week of memory — it doesn't yet factor last week's adherence or fatigue.
- Not turnkey. Six pieces have to talk to each other. The recipe is the work; getting them aligned takes a weekend.

## Take it

The code is open source: [Arthurpfz/tri-coach](https://github.com/Arthurpfz/tri-coach) for the workflows, and [tricoach-db](https://github.com/Arthurpfz/tricoach-db) for the standalone SQLite API if you just want the storage layer.

Follow [@arthurpfz](https://x.com/arthurpfz) for build logs.
