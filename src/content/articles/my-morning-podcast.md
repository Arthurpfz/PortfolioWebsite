---
title: "My morning podcast"
date: 2026-11-26
description: "Every morning at 6, two AI hosts brief me on the news, markets and what I saved yesterday. How it's built, and what went wrong."
categories: ["Build"]
tags: ["Podcast", "Agents", "n8n", "Self-hosting"]
draft: false
---

I wanted one morning briefing instead of ten apps. I also wanted to stop scrolling my phone at breakfast.

So every morning at 6, a Telegram bot sends me a 14-minute podcast. Two hosts, Maya and Leo, talk me through the day. I listen on the bike or with my coffee. It costs about 10 cents.

## What's in an episode

- **Markets.** Macro and crypto headlines, Bitcoin, Ethereum and Solana prices, and Polymarket odds: the busiest markets, then the ones that moved most overnight.
- **AI news.** Headlines from the big labs.
- **Hacker News.** The front page, ranked for what I care about, with the best arguments from the comments.
- **Yesterday's bookmarks.** Everything I save (tweets, articles, YouTube videos) gets summarised into my notes. The hosts go through yesterday's.
- **A triathlon tip and a learning nugget.** One of each, picked from my notes, never repeated.

After the audio, a second message lists the links: the top Hacker News threads, the bookmarks, the nugget's source.

## Ask it for tomorrow

If I send the bot a topic, it shows up in the next episode. This week I sent "world model". The next morning the hosts explained what it is in plain words, then what happened in the field recently.

A historical topic only gets the explanation. There is no latest news on the fall of the Berlin Wall.

The research runs on Perplexity, about half a cent per topic.

## How it works

```
Google News · CoinGecko · Polymarket · Hacker News · my notes · topics I sent
                              ↓
               Python script collects the material
                              ↓
               GPT writes the dialogue (3 calls)
                              ↓
         audio model voices each line, ffmpeg makes the MP3
                              ↓
                  Telegram: episode + links
```

At 5:55, n8n starts a Python script on my server. It collects the material from free sources and my notes. No AI at this step.

Then a language model writes the script. One call reliably writes about 900 words, so a 14-minute episode takes three. Each call only sees the material for its own segments.

An audio model reads it out line by line, in two voices. If anything breaks, n8n pings me on Telegram.

## The hard part was honesty

The first versions sounded great and made things up. Give a model a headline and it will happily invent the story behind it.

So the rule is strict: use only the material, never add a fact, a number or a quote. If the material is thin, be shorter. A segment with nothing in it is dropped before the model sees it, because an empty section once came back as a fully invented segment.

I picked the script model with a blind test. Several models wrote the same episode and two judges counted invented facts. The winner had the fewest per dollar.

The side effect is very honest hosts. "We have the headline, not the argument" comes up more than I'd like.

The voice model had its own quirk. Ask it to read "What do you think about that?" and it would answer the question. Now it gets a couple of examples of repeating text word for word. Each line is also checked against what it actually said.

## A long one on Sundays

I save around 30 bookmarks a week and read almost none of them (embarrassing). So on Sundays I get a 50-minute episode on the week's top 15, plus a PDF of every summary. About 35 cents.

## Caveats

- It lives in Telegram, not a podcast app. No resume or speed control yet.
- The voices are good, not great. Better ones would roughly double the cost.
- A source that fails is skipped, not fatal. After Polymarket quietly dropped out for three days, the links message now says what's missing.
