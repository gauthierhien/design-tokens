---
version: "alpha"
name: Hien
description: Brand identity for Gauthier Hien — Design Engineer / Product Designer, Paris.
colors:
  background: "oklch(98.5% 0 0)"
  background-muted: "oklch(96% 0 0)"
  foreground: "oklch(20.5% 0 0)"
  foreground-muted: "oklch(70.8% 0 0)"
  accent: "oklch(0.9402 0.205 113.88)"
  accent-hover: "oklch(0.5541 0.1539 40.04)"
  border: "oklch(92.2% 0 0)"
  dark-background: "oklch(14.5% 0 0)"
  dark-background-muted: "oklch(20.5% 0 0)"
  dark-foreground: "oklch(97% 0 0)"
  dark-foreground-muted: "oklch(43.9% 0 0)"
  dark-border: "oklch(26.9% 0 0)"
typography:
  sans:
    fontFamily: Geist Variable
  mono:
    fontFamily: Geist Mono Variable
  h1:
    fontFamily: Geist Variable
    fontSize: 2.25rem
    fontWeight: 500
    letterSpacing: -0.05em
  body:
    fontFamily: Geist Variable
    fontSize: 1rem
    fontWeight: 400
  label:
    fontFamily: Geist Mono Variable
    fontSize: 0.75rem
    fontWeight: 300
rounded:
  full: 9999px
  none: 0px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    rounded: "{rounded.full}"
    padding: 12px 24px
  button-secondary:
    backgroundColor: "{colors.background-muted}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: 12px 24px
  tag:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    typography: "{typography.label}"
---

## Overview

Minimal, technical, precise — the visual identity of a Paris-based Design Engineer.
Surfaces stay cool and neutral (never warm cream, never purple/indigo gradients).
A vivid lime/chartreuse accent pairs with a terracotta/orange hover. All colors are
expressed exclusively in `oklch`. There is no site-wide dark mode: `.theme-dark` is
applied locally (e.g. a footer band), not as a global theme toggle.

## Colors

Neutral light surfaces with a high-contrast foreground. The accent is the only
chromatic signal; muted foreground handles captions and secondary copy.

- **background** — Near-white canvas.
- **background-muted** — Subtle alternate surface (secondary buttons, soft bands).
- **foreground** — Primary ink for text and solid CTAs.
- **foreground-muted** — Secondary copy, captions.
- **accent** — Lime/chartreuse for emphasis, selection, interactive highlights.
- **accent-hover** — Terracotta/orange for hover/active on accent moments.
- **border** — Fine hairline separation; prefer borders over shadows.
- **dark-*** — Local inverted surfaces only (`.theme-dark`), not a global mode.

## Typography

Geist Variable for body and headings. Geist Mono Variable for labels, metadata,
tags, and times. Headings use `font-medium` and tight tracking (`tracking-tighter`)
with an aggressive responsive scale. Strong convention: `<span>` means mono + small
size (labels) — do not use `<span>` for body copy. Consuming apps must load fonts
themselves (`@fontsource-variable/geist` and the mono package).

## Layout

Utility-first Tailwind. Prefer an 8-column mental grid with centered content when
relevant. Major sections get generous vertical air. No decorative cards: no
multi-layer shadows, no pill clusters, no glow effects.

## Elevation & Depth

Nearly flat. Separate elements with fine `border` / outline, not drop shadows.
CSS selection: background `accent`, text `foreground`.

## Shapes

CTAs and buttons: `rounded-full`. Editorial content and grids: square corners or
minimal radius. Lucide icons: `stroke-width={1}`, colors via CSS vars
(`foreground` / `background`).

## Components

Guidance only — component CSS lives in each app, not in this package.

- **Primary button** — `foreground` fill on `background` text; hover via opacity.
- **Secondary button** — `background-muted` fill.
- **Tag** — Mono uppercase; `foreground` on `background`.
- Do not bake portfolio Header/Footer/Modules into the brand — those are app patterns.

## Do's and Don'ts

**Do**

- Consume tokens via Tailwind classes (`bg-background`, `text-accent`, `border-border`, `font-sans`, `font-mono`).
- Keep `oklch` values; do not convert to hex “for simplicity.”
- Version this package (semver + git tags) and bump the dependency in each app.

**Don't**

- Invent a purple/indigo palette, generic cream + terracotta look, or dense broadsheet layout.
- Ship global dark mode, glows, multi-shadows, or UI emojis.
- Put content images in this package.
- Hardcode duplicate tokens in apps once this package is wired.
