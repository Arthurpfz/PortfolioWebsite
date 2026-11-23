---
name: portfolio-tone
description: >
  Arthur's writing voice for arthurpfz.com. Use before writing or editing any site copy: new
  build write-ups or essays in src/content/articles, feed cards in src/content/feed, Builds
  taglines in src/pages/builds.astro, update-log entries, page descriptions. Also use when
  asked "does this sound AI?", "make it less verbose", or to review a draft's tone.
---

# Portfolio tone

The site should read like Arthur wrote it: a product person explaining a side project to a
friend. Short, plain, first person, a bit of humour. Not a launch post or a product spec.

**Reference pieces (match these):** `src/content/articles/croissant-ride.md` (opens with why he
built it, "Yes, there is a cosmic map"), the About page (`src/pages/experience.astro`), the
2020 book summaries.

## Rules

1. **Start with why.** First line = the itch or the reason ("I was unsatisfied with…", "I
   wanted one briefing instead of ten apps"). Not a dramatic hook.
2. **First person, about me.** "my fitness", "I get a message". Never "your coach" for a tool
   built for himself.
3. **Plain words.** Say "copies", not "mirrors in lockstep". Say "tidy up", not "self-maintaining".
   If a non-technical friend wouldn't say it, rewrite it.
4. **One idea per sentence, under ~20 words.** Lists are fine; a bullet is one or two sentences.
5. **Say it once.** Feed card, Builds tagline, and article description each get their own
   wording. Don't repeat the bullets in a table and again in prose.
6. **Numbers over adjectives.** "14 minutes, 10 cents" beats "cheap and quick".
7. **Personality is welcome, once per piece.** A joke or honest aside ("I run a croissant
   studio!", "embarrassing") is what makes it his. Don't manufacture one.
8. **Be honest about limits** in one short Caveats list, but don't pad it to three.

## Banned patterns (AI tells)

- Stock phrases: "how the pieces fit together", "the three patterns that hold it together",
  "the recipe is what's rare", "where it should", "genuine", "inflection point", "seamless",
  "robust", "leverage", "in lockstep", "middleman", "nervous system", "game-changer".
- Fragments for drama: "Voice notes. Bookmarks. Tweets." / "Nobody touches it." / "No moralizing."
- Lists of three "no"s: "No account, no backend, no subscription." Pick the one that matters.
- "Not X. Not Y. Not Z." sections, and "It's not X, it's Y" contrasts.
- Slogan closers: "Capture once, reuse everywhere."
- Em dashes. Use a comma, colon, full stop or brackets. Max one per piece. (Fine inside code
  blocks, bot sample output, and the `**date** —` update-log format.)
- Spec dumps: more than ~4 items crammed into one sentence. Cut to the ones a reader cares about.
- The same skeleton for every article. Vary headings and order to fit the piece.
- Unsupported claims ("zero recurring cost" when an API is paid). Check facts against memory and
  the project's CLAUDE.md before publishing.

## Length targets

| Surface | Target |
|---|---|
| Feed card `description` | 1–2 sentences, ≤ 40 words |
| Builds `tagline` | 1–3 sentences, ≤ 40 words; stack goes in `stack`, not the tagline |
| Article `description` | 1 sentence, ≤ 30 words |
| Build write-up | 300–1100 words; diagrams and code blocks don't count |
| Update-log entry | 1–2 sentences, what changed and why |

## Before / after

- ❌ "An AI triathlon coach that grades every workout against your fitness, writes next week's
  plan on its own, and lives entirely on infrastructure I control. The architecture, the
  components, and the three patterns that hold it together."
  ✅ "My triathlon coach is a Telegram bot. Every evening it grades the day's workout against my
  fitness, and every Sunday it writes next week's plan."
- ❌ "Telegram is the lowest-friction surface available — share-sheet on phone, hold-to-record
  for voice."
  ✅ "Telegram is the quickest thing on my phone: share a link, or hold to record."
- ❌ "Not novel pieces. Every component is off the shelf. The recipe is what's rare."
  ✅ "None of the parts are new. The work is in how they connect."

## Final check

Before handing over a draft, reread it and fix: any banned pattern above, any sentence over ~25
words, any em dash, any "you/your" that should be "I/my", and any fact you haven't verified.
Then count: if it could be cut by a third without losing a fact, cut it.
