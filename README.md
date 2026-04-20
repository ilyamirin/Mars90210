# Mars90210

`Mars90210` is an AI-native narrative project by **Ilya G Mirin**: a soft Mars drama about four women living under one dome in the colony `Новая Заря`, working at the `Orbita` pickup point, and slowly realizing how expensive “reliability” can become when a whole world starts measuring people by usefulness.

This repository is not just a website. It is the project itself: canon, world bible, characters, season arc, episodes, visual assets, prompts, continuity notes, and the React/Vite site that turns all of that into a public reading surface.

- Live site: [ilyamirin.github.io/Mars90210](https://ilyamirin.github.io/Mars90210/)
- Creator: [Ilya G Mirin on LinkedIn](https://www.linkedin.com/in/ilyamirin)
- License: [All Rights Reserved](./LICENSE)

![Mars90210 social preview](art/site/social/social-preview.png)

## What This Project Is

Mars90210 sits at the intersection of:

- AI-native storytelling
- literary worldbuilding
- structured visual continuity
- creator tooling and agent-driven production

The repository is `canon-first`: Markdown files are the source of truth, and the site reads directly from that content layer.

## Why It Exists

This project is also a public proof of authorship and process.

It shows what happens when AI is used not as a gimmick or single-shot image button, but as part of a disciplined creative pipeline: canon development, character work, season architecture, episode drafting, editorial passes, visual prompting, site building, QA, and deployment.

In other words, `Mars90210` is both:

- a fictional universe
- a portfolio-grade demonstration of AI-native creation under human direction

## How It Was Made

AI was used here for far more than illustration.

The project uses AI across:

- world bible and canon transfer
- character design and emotional architecture
- season planning and episode generation
- editorial rewrites and consistency passes
- portrait and scene illustration
- site implementation and UX refinement
- browser verification and deployment work

The stack around that process includes:

- [Codex](https://openai.com/codex)
- [Replicate](https://replicate.com/) with `google/nano-banana-2`
- [Playwright](https://playwright.dev/)
- the local editorial contract in [AGENTS.md](./AGENTS.md)

## Human Role

The project is AI-native, but not human-absent.

The human role here is not reduced to pressing “generate”. It includes:

- defining the canon and its boundaries
- deciding what stays true across episodes and images
- rejecting weak or repetitive outputs
- rewriting tone, rhythm, and character voice
- curating continuity across text, world, and visuals
- shipping the final public surface as a coherent authored work

That combination is the point: AI at production depth, human responsibility at the top.

## What’s In The Repo

There are four major layers:

- `canon/` — the source of truth: premise, world, characters, relationships, symbols, season structure
- `episodes/season-01/` — 63 final Markdown episodes for season one
- `art/` — portraits, episode illustrations, world visuals, and sidecar prompt/control files
- `src/` + `site/` — the React/Vite reading surface and supporting presentation content

```text
Mars90210/
├── canon/
│   ├── series-bible.md
│   ├── characters/
│   └── world/
├── episodes/
│   └── season-01/
├── art/
│   ├── portraits/
│   ├── season-01/
│   ├── site/
│   └── world/
├── src/
├── site/
├── AGENTS.md
├── LICENSE
└── package.json
```

## Reading Order

If you want the canonical path into the world:

1. [canon/series-bible.md](./canon/series-bible.md)
2. [canon/world/season-01-outline.md](./canon/world/season-01-outline.md)
3. heroine profiles:
   [lira.md](./canon/characters/lira.md),
   [aigul.md](./canon/characters/aigul.md),
   [marta.md](./canon/characters/marta.md),
   [ruslana.md](./canon/characters/ruslana.md)
4. [episodes/season-01/](./episodes/season-01/)

If you want the production logic behind the tone and generation rules, start with [AGENTS.md](./AGENTS.md).

## Content Principles

The project follows a few hard rules:

- canon outranks contradictory legacy material
- the prose aims for quiet literary Russian, not summary-like AI language
- each heroine must have a distinct voice and emotional logic
- major conflict must pass through small human gestures
- one episode, one core image, one continuity trail
- the world matters, but the human being matters more than the tech setting

The repository is `world-first` in structure and `human-first` in drama.

## Quick Start

Requirements:

- `pnpm`
- a current Node.js version compatible with `Vite`

Install and run:

```bash
pnpm install
pnpm dev
```

Build and test:

```bash
pnpm build
pnpm test
```

The site is built with `Vite + React` and reads Markdown content directly from the repository through local content loaders.

## Current Status

Right now:

- season 1 text is complete
- all `63` episodes exist in `episodes/season-01/`
- canon and season outline are assembled in `canon/`
- the public site is live on GitHub Pages
- illustration coverage is partial: some episodes already have finished art, some still have only sidecar control files

## Public Positioning

If you are landing here from GitHub, the short version is:

`Mars90210` is a public AI-creator project by **Ilya G Mirin** — a creator-engineer building narrative IP, visual systems, and web surfaces through AI agents, prompts, editorial control, and production discipline.

## License

This repository is **not open source**.

Texts, characters, world materials, plots, images, prompts, and related assets in `Mars90210` are not licensed for free reuse, republication, adaptation, or derivative work without written permission from the copyright holder.

See [LICENSE](./LICENSE) for the full legal text.
