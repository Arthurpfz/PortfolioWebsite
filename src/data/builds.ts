// Shared by /builds and the Pile theme (ThemePile.astro).
export type Build = {
  name: string;
  tagline: string;
  stack: string;
  status: 'shipped' | 'in use' | 'paused';
  links?: { label: string; href: string; external?: boolean }[];
};

export const builds: Build[] = [
  {
    name: 'Croissant Ride',
    tagline: "My own indoor training app, in the browser. Pair a smart trainer over Bluetooth, ride ERG workouts (or your coach's Zwift files) through 3D worlds, then post the ride to Strava or Intervals.icu. Free, open source, nothing to sign up for.",
    stack: 'TypeScript · Three.js · Web Bluetooth · FTMS · Garmin FIT SDK',
    status: 'in use',
    links: [
      { label: 'Article', href: '/archive/croissant-ride/' },
      { label: 'Live', href: 'https://croissantride.com', external: true },
      { label: 'GitHub', href: 'https://github.com/Arthurpfz/croissant-ride', external: true },
    ],
  },
  {
    name: 'Croissant tri-coach',
    tagline: "My triathlon coach, on Telegram. It grades every workout against my fitness and plans next week every Sunday. Data lives in tricoach-db, a ~250-line SQLite API I wrote to replace Airtable.",
    stack: 'n8n · Claude · Intervals.icu API · Telegram · SQLite · Docker',
    status: 'in use',
    links: [
      { label: 'Article', href: '/archive/the-coach-that-watches-the-data/' },
      { label: 'GitHub', href: 'https://github.com/Arthurpfz/tri-coach', external: true },
      { label: 'tricoach-db', href: 'https://github.com/Arthurpfz/tricoach-db', external: true },
    ],
  },
  {
    name: 'Daily Podcast',
    tagline: "Every morning at 6, two AI hosts talk me through the news, markets, Polymarket odds, Hacker News and yesterday's bookmarks. If I send the bot a topic, it's explained in the next episode. About 14 minutes, 10 cents.",
    stack: 'Python · GPT · gpt-audio-mini · Perplexity · OpenRouter · ffmpeg · n8n · Telegram',
    status: 'in use',
    links: [{ label: 'Article', href: '/archive/my-morning-podcast/' }],
  },
  {
    name: 'Croissant Bird (Telegram capture bots)',
    tagline: 'Two Telegram bots. One turns links (tweets, articles, YouTube) into markdown notes in my vault, the other transcribes voice memos and files them.',
    stack: 'n8n · LLM · Telegram · Markdown',
    status: 'in use',
  },
  {
    name: "Vault (Arthur's 2nd Brain)",
    tagline: "My second brain. Plain markdown on a VPS, read in Obsidian on my Mac, synced by Syncthing. Bots capture, scheduled jobs keep it tidy, Claude answers questions over it. The architecture and schema are public.",
    stack: 'Obsidian · Claude · Syncthing · Markdown',
    status: 'in use',
    links: [
      { label: 'Article', href: '/archive/stop-typing-second-brain/' },
      { label: 'GitHub', href: 'https://github.com/Arthurpfz/vault-system-template', external: true },
    ],
  },
  {
    name: 'Brain Digest',
    tagline: "Every Monday, one recently updated vault page comes back to me on Telegram as ~150 words on one tension or surprising fact. If it could have been written a month ago, it failed. One n8n workflow.",
    stack: 'n8n · Claude Haiku · OpenRouter · Telegram',
    status: 'paused',
  },
  {
    name: 'Voice Notes',
    tagline: 'Send a voice memo on Telegram. It gets transcribed, sorted into idea, todo or other, and saved to my vault, with an undo button. One n8n workflow.',
    stack: 'n8n · Groq Whisper · Claude · Telegram',
    status: 'in use',
  },
  {
    name: 'Relay',
    tagline: 'A webhook so Claude on my phone (or me, on a train) can restart a container, tail logs or redeploy on my VPS. Only allow-listed commands.',
    stack: 'n8n · webhook · SSH · Telegram',
    status: 'in use',
  },
];
