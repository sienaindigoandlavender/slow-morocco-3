# Animations & Interactivity Brief
## Slow Morocco — Dancing with Lions

**Date:** March 2026
**Status:** Active development
**Stack:** Next.js 14, React, Tailwind CSS, SVG, Canvas 2D — zero animation libraries

---

## 1. What We Have Now

### Current Animation Vocabulary

Every interactive story on the site is built from five primitives. No Framer Motion, no GSAP, no external animation libraries. This is intentional — the animations are hand-tuned, lightweight, and ship zero extra JavaScript.

| Primitive | Technique | Example |
|-----------|-----------|---------|
| **Scroll reveal** | IntersectionObserver + CSS `opacity`/`transform` | Every story section fades up on scroll |
| **SVG animate** | Native `<animate>` tags inside SVG | Ramadan Moon — breathing glow, pulsing Qadr rings |
| **Canvas 2D** | `requestAnimationFrame` loop with 2D context | Pulse of the Medina — generative street visualisation |
| **State-driven transitions** | React `useState` + CSS `transition` | Scent Atlas — expandable cards, filter buttons |
| **Stroke reveal** | `stroke-dasharray` / `stroke-dashoffset` | Ramadan Moon — 33-year drift path draws itself |

### Stories Already Animated

| Story | Interactions | Complexity |
|-------|-------------|------------|
| **Ramadan & the Moon** | Breathing moons, star field, auto-play cycle, count-up numbers, drift path draw, staggered reveal | High |
| **Pulse of the Medina** | Canvas generative streets, 24-hour time slider, play/pause, prayer time jumps | High |
| **Scent Atlas** | Radial polar bloom charts, expandable cards, category filters, Mapbox popups | High |
| **Calendar of Light** | City selector, hover tooltips, bar charts, scroll-triggered reveals | Medium |
| **Spice Routes** | Price comparison bars, animated width reveal, expandable details | Medium |
| **Couscous Friday** | Tab navigation, technique steps, variation selector | Medium |
| **Bread of Morocco** | Expandable bread cards, region data | Low-Medium |

### Design Language

- **Palette:** `#0a0a0a` ink, `#f5f5f5` paper, `#fafafa` card, `#FCBF49` gold accent
- **Typography:** Playfair Display (display), Nanum Myeongjo (body), IBM Plex Mono (data labels)
- **Motion philosophy:** Slow, deliberate, eased. Nothing bounces. Nothing overshoots. Cubic-bezier curves with long durations (800ms–1.5s). Things appear like they were always there — you just weren't looking.
- **Scroll behaviour:** One-shot reveals (IntersectionObserver fires once, disconnects). No parallax. No scroll-jacking.

---

## 2. The Griffin & Sabine Concept

### Reference

Nick Bantock's *Griffin & Sabine* trilogy (1991–1993). Interactive epistolary fiction. Every page is a physical artifact — a postcard you flip, a letter you pull from a real envelope glued into the page. Two artists correspond across the world. The reader becomes a voyeur, handling their private mail.

### Why It Works

1. **Voyeuristic intimacy** — you are reading someone else's correspondence
2. **Every page is a different artifact** — postcard, aerogramme, envelope with letter, telegram
3. **Two distinct visual voices** — Griffin's London watercolours vs. Sabine's tropical prints
4. **Physical discovery** — you must pull, flip, unfold to read
5. **Sequential revelation** — the story only advances as you interact
6. **Postal ephemera as design** — stamps, postmarks, addresses, cancellation marks

### The Slow Morocco Translation

**Two correspondents:**

- **J.** — Writing from Marrakech. Cream card stock, seal-brown ink, small Moroccan stamps (zellige motifs, mint tea glass, Koutoubia silhouette). Cultural observations. The medina at dawn. Why couscous is always Friday. The sound of the tannery at noon.

- **The Traveller** — Planning a trip. Airmail paper (blue-and-red striped border), fountain pen blue ink. Questions about Morocco. "What should I know about Ramadan?" "Is it true about the cats?" "How do I not get lost in the Fes medina?"

**Each letter links to an existing story.** The correspondence IS the navigation — a whimsical alternative index. Open J.'s envelope about bread → her letter mentions *msemen* with a link to `/stories/bread-of-morocco`. The Traveller asks about spices → link to `/stories/spice-routes`.

---

## 3. The Five Core Interactions

### 3.1 The Envelope

**What:** A sealed envelope on screen. Click/tap the flap. It opens. A letter slides up.

**How:**
- CSS 3D transforms: `perspective(800px)` on container
- Envelope flap: `transform: rotateX(0deg)` → `rotateX(180deg)` on click
- Letter paper: `transform: translateY(0)` → `translateY(-60%)` with spring-like easing
- Two states: `sealed` → `open`
- The flap tucks behind the body using `z-index` swap mid-animation

**Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` — slight overshoot on the letter, like pulling paper from paper. The flap folds back with `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — no overshoot, gravity-like.

**Visual treatment:**
- Envelope: Off-white `#f0ece4` with subtle shadow
- Flap: Slightly darker, with a wax seal or stamp at the point
- Letter paper: White `#fefcf7` with visible fold line (CSS gradient)
- Shadow underneath grows as letter rises

### 3.2 The Postcard

**What:** A photograph of Morocco on the front. Flip it. The back has handwritten text, a stamp, a postmark, and an address.

**How:**
- CSS 3D card flip: two `<div>`s, `position: absolute`, both `backface-visibility: hidden`
- Front: hero image from Supabase, rounded corners, slight shadow
- Back: paper texture background, handwriting font text, SVG stamp, SVG postmark
- Click/tap or hover to flip: `transform: rotateY(180deg)` on container
- Back div has `transform: rotateY(180deg)` by default so it reads correctly when flipped

**Visual treatment:**
- Front: Full-bleed photograph with white border (Polaroid-esque, 4px padding)
- Back: Horizontal dividing line (left = message, right = address + stamp)
- Postmark: SVG circle with "MARRAKECH" and date, rotated 15°, `opacity: 0.6`
- Stamp: 40×50px SVG, perforated edge (dashed border), Moroccan motif

### 3.3 The Handwriting

**What:** Text that writes itself across the page, letter by letter, as if someone is writing it now.

**How (two approaches):**

**A. SVG stroke animation (for decorative/short text):**
- Convert text to SVG paths (or use a script font as SVG)
- `stroke-dasharray: [path length]` + `stroke-dashoffset: [path length]` → `0`
- Same technique as the Ramadan Moon drift path, applied to letterforms
- Duration: ~3s for a sentence

**B. Typewriter reveal (for longer body text):**
- Handwriting font (Caveat or Homemade Apple from Google Fonts)
- `overflow: hidden` container with `width` animating from `0` to `100%` per line
- Or: character-by-character reveal with `useState` index + `setInterval(40ms)`
- Cursor: a thin `|` that blinks at the writing position

**Font addition required:**
```typescript
// app/layout.tsx — add to font imports
import { Caveat } from 'next/font/google'
const caveat = Caveat({ subsets: ['latin'], variable: '--font-handwriting' })
```

### 3.4 The Stamp

**What:** A postage stamp thuds into position on the envelope or postcard corner.

**How:**
- SVG component: 40×50px, perforated edge (repeating semicircle clip-path), Moroccan motif inside
- Entrance: `transform: scale(3) rotate(-15deg)` → `scale(1) rotate(0deg)`
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — the weight of a rubber stamp
- Slight `box-shadow` pulse on land
- Followed 200ms later by the postmark overlay

**Stamp designs (SVG, not images):**
1. Zellige star pattern (geometric, blue + white)
2. Mint tea glass silhouette (green + gold)
3. Koutoubia minaret outline (warm ochre)
4. Atlas cedar tree (deep green)
5. Moroccan door arch (terracotta)

### 3.5 The Sequential Unlock

**What:** You must open letter 1 before letter 2 appears. The correspondence unfolds in order.

**How:**
- `useState<Set<number>>` tracks which letters are opened
- Each envelope/postcard checks: `previousOpened ? show : hidden`
- New items fade in with the standard scroll reveal pattern
- A subtle "1 of 12" counter at the top
- Optional: progress line connecting opened letters (like a postal route)

**State persistence:**
- `localStorage` saves opened state so returning visitors pick up where they left off
- Or: no persistence — the joy is in re-opening every time

---

## 4. Animation Principles

### The DWL Motion Language

1. **Slow.** Default duration: 800ms minimum. Nothing fast. The site is called Slow Morocco.
2. **Eased, not sprung.** Cubic-bezier curves, not bounce or elastic. Paper doesn't bounce.
3. **One-shot.** Animations play once on scroll entry. No looping (except ambient: breathing moons, twinkling stars).
4. **Staggered.** When multiple items appear, delay each by 50–150ms. Creates a wave, not a wall.
5. **Ambient, not performative.** The best animations feel like the page is breathing, not showing off. The user shouldn't notice them — they should feel them.
6. **Progressive disclosure.** Content reveals itself as you scroll, never all at once. Reward the reader for continuing.
7. **Touch-first.** Every click interaction must also work as a tap. Hover states are bonuses, not requirements.

### Performance Rules

- No animation libraries. CSS transforms and SVG `<animate>` are GPU-accelerated by default.
- Only animate `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, or `margin`.
- IntersectionObserver disconnects after first trigger. No scroll listeners running continuously.
- Canvas animations use `requestAnimationFrame` and stop when off-screen.
- Prefers-reduced-motion: wrap all motion in `@media (prefers-reduced-motion: no-preference)`. Provide static fallback.

---

## 5. File Architecture

```
app/stories/correspondence/
  page.tsx                    ← Metadata, JSON-LD (CreativeWork + BreadcrumbList)
  CorrespondenceContent.tsx   ← Main orchestrator — letter sequence, state management
  components/
    Envelope.tsx              ← CSS 3D flip envelope with letter slide-up
    Postcard.tsx              ← Front/back flip card with photograph
    Letter.tsx                ← Paper texture + handwriting font + fold lines
    Stamp.tsx                 ← SVG postage stamp with thud animation
    Postmark.tsx              ← SVG circular postmark overlay
    ProgressRoute.tsx         ← Visual progress line connecting opened letters
  data.ts                     ← The correspondence content, linked stories, order
  types.ts                    ← TypeScript interfaces for letter/postcard data
```

### Data Shape

```typescript
interface Correspondence {
  id: number
  type: 'letter' | 'postcard' | 'aerogramme'
  from: 'j' | 'traveller'
  date: string                    // "14 March 2026"
  location: string                // "Marrakech" or "London"
  front?: string                  // Postcard: image URL
  body: string                    // Letter text (markdown-ish)
  linkedStory?: string            // Slug: "bread-of-morocco"
  linkedStoryTitle?: string       // "The Bread of Morocco"
  stamp: 'zellige' | 'tea' | 'koutoubia' | 'cedar' | 'door'
  postmark: string                // "MARRAKECH · 14.III.26"
}

const LETTERS: Correspondence[] = [
  {
    id: 1,
    type: 'postcard',
    from: 'j',
    date: '3 January 2026',
    location: 'Marrakech',
    front: '/images/correspondence/jemaa-sunrise.jpg',
    body: 'The square empties by 2am. By 5am the first carts arrive — oranges, dates, a man selling snails from a copper pot. The light at that hour is not golden. It is grey-violet. The city has a whole life before the tourists wake.',
    linkedStory: 'pulse-medina',
    linkedStoryTitle: 'Pulse of the Medina',
    stamp: 'koutoubia',
    postmark: 'MARRAKECH · 3.I.26',
  },
  {
    id: 2,
    type: 'letter',
    from: 'traveller',
    date: '11 January 2026',
    location: 'London',
    body: 'I keep thinking about what you said — that Morocco has a whole life before the tourists wake. We are coming in March. My daughter asks: will there be cats? (She has read somewhere that Moroccan cities are full of cats.) Also — it will be Ramadan. Should we change our dates?',
    linkedStory: 'ramadan-moon',
    linkedStoryTitle: 'Ramadan & the Moon',
    stamp: 'zellige',
    postmark: 'LONDON · 11.I.26',
  },
  // ... 10-12 letters total, alternating voices
]
```

---

## 6. Broader Animation Roadmap

Beyond the correspondence piece, here is the animation treatment for the rest of the site.

### Already Done

| Page | Animation | Status |
|------|-----------|--------|
| Ramadan Moon | Breathing moons, star field, auto-play, count-up, drift path, stagger | Done |
| Pulse of the Medina | Canvas generative streets, time slider, play/pause | Done |
| Scent Atlas | Polar bloom charts, expandable cards, filters | Done |
| Calendar of Light | City selector, tooltips, bar charts | Done |

### Next Priority

| Page | Proposed Animation | Effort |
|------|-------------------|--------|
| **Correspondence** (new) | Envelope open, postcard flip, handwriting, stamps, sequential unlock | 2–3 days |
| **Homepage** | Staggered hero reveal, featured stories fade-up, ambient background shift | 1 day |
| **Journey detail pages** | Itinerary timeline with day-by-day reveal, map route line draw | 1 day |
| **Place detail pages** | Hero image Ken Burns (slow zoom), location pin drop | Half day |
| **Glossary** | Term cards stagger in, definition expand with slide-down | Half day |

### Future Explorations

| Concept | Description | Complexity |
|---------|-------------|------------|
| **Scroll-driven map** | As you scroll through a journey, a Mapbox route traces itself | High |
| **Audio layer** | Ambient sound per story — call to prayer, medina hum, ocean waves. Opt-in, muted by default. `<audio>` with Web Audio API gain control | Medium |
| **Parallax depth** | Subtle parallax on hero images — foreground/background layers at different scroll speeds. CSS `transform: translateZ()` with `perspective` | Low |
| **Ink bleed** | Text appears as if ink is bleeding into wet paper. SVG filter with `feTurbulence` + `feDisplacementMap` | Medium |
| **Zellige loading pattern** | A geometric Islamic star pattern that assembles itself tile by tile while content loads | Medium |

---

## 7. Technical Constraints

1. **No new dependencies.** Every animation must be achievable with CSS, SVG, Canvas, and React hooks. The bundle stays light.
2. **No scroll-jacking.** The user controls scroll speed. We respond to scroll position; we never override it.
3. **No autoplay audio.** Sound requires explicit user action (click/tap).
4. **Prefers-reduced-motion.** All motion respects the OS accessibility setting. Static fallback for every animation.
5. **Mobile-first.** Touch targets minimum 44×44px. Envelope flap must be tappable. Postcard flip must work on small screens.
6. **Server components where possible.** Only the interactive content wrapper is `'use client'`. Metadata, data fetching, and layout remain server components.
7. **Performance budget.** No animation should cause layout shift (CLS). No animation should block first paint. Canvas animations must stop when off-screen.

---

## 8. Reference Links

- Nick Bantock, *Griffin & Sabine* (Chronicle Books, 1991)
- Nick Bantock, *Sabine's Notebook* (Chronicle Books, 1992)
- Nick Bantock, *The Golden Mean* (Chronicle Books, 1993)
- CSS 3D Transforms: `perspective`, `rotateX`, `rotateY`, `backface-visibility`
- SVG SMIL Animation: `<animate>`, `<animateTransform>`, `<animateMotion>`
- Web Animations API (future consideration, not currently used)
- Google Fonts: Caveat, Homemade Apple, Kalam (handwriting candidates)
