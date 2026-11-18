# akchhya.xyz

My personal site, live at [akchhya.xyz](https://akchhya.xyz) once it's deployed. One person, five rooms: pick the version of me you came for.

## The rooms

- **the technobrat** (`/build`): engineering projects with case studies and live demos
- **the researcher** (`/research`): data, questions, the paper, where I want to go next
- **the product nerd** (`/product`): product and growth work, launches and copy rewrites
- **the creative caterpillar** (`/reading-room`): essays, poems, sketches and paintings
- **the organiser** (`/organiser`): newsletters, communities and getting people in one room

## Stack

Astro and TypeScript, styled with Tailwind, with React islands only where something is interactive.

## Run it locally

```sh
npm install
npm run dev
```

Then open http://localhost:4321. The design tokens and components live at `/styleguide`.

## Structure

```text
src/pages       one file per route
src/components  buttons, cards, nav and the interactive islands
src/styles      design tokens and global styles
src/content     case studies, writing and other content (coming soon)
public          favicons and static files
```

## Licence

The code is MIT licensed. The content (writing, sketches, photos) is mine, all rights reserved.
