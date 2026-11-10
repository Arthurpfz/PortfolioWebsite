---
title: "Croissant Ride"
date: 2026-11-02
description: "My own indoor training app, cut to the essentials. Runs in the browser, open source."
categories: ["Build"]
tags: ["Cycling", "Web Bluetooth", "Three.js", "Open source"]
draft: false
---

<video src="/croissant-ride/night-draft.mp4" poster="/croissant-ride/night-draft.jpg" preload="none" muted loop playsinline controls></video>

I was unsatisfied with my indoor training app. I don't need all the paid features, the social side, the avatars. I just want to ride my session.

So I built my own and cut it to the essentials, with a slicker design, so I can actually enjoy the ride and focus on what matters most.

Open [croissantride.com](https://croissantride.com) in Chrome, pair, ride. Yes, there is a cosmic map.

<video src="/croissant-ride/cosmic-circuit.mp4" poster="/croissant-ride/cosmic-circuit.jpg" preload="none" muted loop playsinline controls></video>

## What it does

- **Pairs over Bluetooth, from the browser.** Smart trainer (FTMS), heart-rate strap, optional cadence sensor. Nothing to install.
- **Structured workouts in ERG.** The trainer holds the target watts for every step. Nudge targets ±10 W, or drop ERG for a step and ride it on feel. It releases resistance if your cadence collapses, so you never grind to a halt.
- **Bring your coach's sessions.** Import any Zwift `.zwo` file; coach notes show up during the step.
- **Switchable worlds.** Three looks, switchable mid-ride: Default Valley, Cosmic Circuit, and Night Draft (above). Worlds are data-only packs, so anyone can make one.
- **Never lose a ride.** Recording is saved every 5 seconds and recovered after a crash.
- **Post anywhere.** A `.FIT` with laps and HRV for Intervals.icu, Strava, Garmin Connect or TrainingPeaks. Strava gets a ready-made caption.

## Open source

Croissant Ride is open source under Apache-2.0. Use the hosted version, self-host it (it's a static site), or improve it. A new trainer is one driver file, a new world is one JSON file.

[github.com/Arthurpfz/croissant-ride](https://github.com/Arthurpfz/croissant-ride)
