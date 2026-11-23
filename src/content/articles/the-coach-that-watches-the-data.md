---
title: "A tri-coach on Telegram"
date: 2026-06-07
updated: 2026-07-14
description: "My triathlon coach is a Telegram bot. It grades every workout against my fitness and writes next week's plan every Sunday, on a server I run."
categories: ["Essay"]
tags: ["Triathlon", "n8n", "Agents", "Self-hosting"]
draft: false
---

Every weeknight at 20:10, I get a Telegram message grading the day's workout against my fitness, not against a plan.

Every Sunday night, the same system writes my week ahead: seven sessions, built around my race date. I don't touch it.

## How it fits together

```
                    ┌── Telegram (CroissantTri) ──┐
                    │  /program  → plan now       │
                    │  /refresh  → backfill       │
                    │  /strikes  → week stats     │
                    │  /training → this week      │
                    │  /progress → 4wk trend      │
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

- **Grades every session.** Each weeknight it pulls the day's workout from Intervals.icu, sends the full FIT data to Claude, and replies with a letter grade and three observations backed by the numbers. The grade is about how well I executed for my current fitness, not whether I followed the plan.
- **Writes the plan.** On Sunday night it checks how many weeks I am from my race, works out the training phase and volume, and asks Claude for seven sessions marked KEY or OPTIONAL.
- **Nudges on volume.** It tracks my weekly hours against a minimum, and from midweek on tells me how far off I am.
- **Takes commands.** `/program` plans now, `/refresh` picks up late uploads, `/strikes` shows week stats, `/training` shows this week, `/progress` shows the trend.
- **Answers "am I improving?"** `/progress` compares the last four weeks with the four before, per sport. Efficiency only counts easy Z2 work, so a hard block doesn't look like lost fitness. It also covers swim technique, my longest sessions against race distance, and sleep and HRV, then ends with a one-line verdict.

## The components

| Layer | Tool | What it does |
|---|---|---|
| Orchestration | n8n | webhooks, crons, the six workflows |
| Intelligence | Claude via OpenRouter | grades sessions, drafts plans |
| Training data | Intervals.icu | full FIT metrics from the device |
| Storage | self-hosted SQLite | athletes · plans · sessions, one API |
| Comms | Telegram | plans, feedback, stats, commands |

Apart from the Claude calls, it costs nothing extra to run: the database sits on a VPS I already pay for.

## Three rules

**The plan is a guide, not a contract.**

The daily grade only looks at execution: zones, pacing, cadence, drift. An off-plan two-hour ride that holds Z2 cleanly gets an A. The model sees the plan but is told to mention it only when it matters. A missed session is just a missed session.

**Full FIT data, not Strava's summary.**

It started on Strava, and the feedback was thin: average power, heart rate, moving time. Intervals.icu reads the same FIT files and gives back much more: normalized power, variability, cardiac drift, decoupling, zones, intervals. That switch did more for the feedback than anything else. One catch: Intervals blocks activities that arrive via Strava, so my devices now upload to Intervals directly.

**Never message twice.**

n8n is reliable, not perfect, and re-running a workflow by hand shouldn't send me the same feedback twice. Each workflow checks and sets an "already coached today?" flag before doing anything heavy. A separate workflow catches errors and alerts me on Telegram. Otherwise a failure would just be silence, and I'd never know why.

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

Six lines of plain text. It fits on one phone screen, even on a watch.

## Caveats

- One athlete for now. The daily check-in handles several, but the Sunday planner is wired to me.
- It doesn't plan across a whole training block yet. It reads last week's adherence, fitness trend and morning readiness, but not a full mesocycle.
- It's not plug and play. Six pieces need to talk to each other; expect a weekend of setup.

## Take it

The code is open source: [Arthurpfz/tri-coach](https://github.com/Arthurpfz/tri-coach) for the workflows, and [tricoach-db](https://github.com/Arthurpfz/tricoach-db) if you just want the SQLite API.

I post build logs on X: [@arthurpfz](https://x.com/arthurpfz).

## Update log

- **2026-07-14** — `/progress` command: 4-week vs prior-4-week improvement scoreboard per discipline. Metrics are intensity-honest — Z2-only efficiency, decoupling from long steady rides only, pool and open-water pace never mixed — plus durability vs race demands, swim technique (DPS/SWOLF), recovery (sleep/HRV/RHR), and a one-line LLM verdict.
- **2026-07-12** — Wellness-aware coaching: morning readiness (HRV, sleep, RHR) feeds the daily grade and Sunday plan. Auto-detects FTP/threshold test efforts and updates the athlete profile. Run cadence trend, race-week taper module, monthly review, and a nightly reconciliation cron that catches late uploads.
- **2026-06-07** — Published this writeup. Auto-periodized planning and flex-pool weeks; retired the Strava path — Intervals.icu only.
- **2026-04-25** — Sessions table: every workout now persists ~45 columns of FIT metrics plus Claude's analysis. Backfilled two months. Added the daily Weekly-Stats Telegram with a 🔥 per training hour.
- **2026-04-22** — Replaced Airtable with [tricoach-db](https://github.com/Arthurpfz/tricoach-db), a ~250-line self-hosted SQLite API. Zero recurring cost.
