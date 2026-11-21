# hien-design-tokens (`@hien/design-tokens`)

Brand design tokens for [Gauthier Hien](https://github.com/gauthierhien) projects. Shared visual source of truth for the hien.design sites: runtime tokens for Tailwind v4, plus the shared Astro Header and Footer. No build step.

## Install

Via Git tag (recommended until npm publish):

```bash
pnpm add github:gauthierhien/hien-design-tokens#v1.3.0
```

## Usage (Tailwind v4)

```css
@import "@hien/design-tokens/theme.css";
@import "tailwindcss";
```

Load **Geist** and **Geist Mono** in the consuming app (e.g. `@fontsource-variable/geist` + mono). Fonts are not bundled here.

Then use token-backed utilities: `bg-background`, `text-foreground`, `text-accent`, `border-border`, `bg-status`, `font-sans`, `font-mono`, plus the type scale (`text-h1` … `text-h4`, `text-body`, `text-body-prose`, `text-lead`, `text-label`). For local inverted surfaces, wrap with `.theme-dark`.

## Composants partagés (Astro)

Le squelette vit ici, le contenu vit dans le Keystatic de chaque site.

```ts
// keystatic.config.ts
import { footerSingleton, headerSingleton } from "@hien/design-tokens/keystatic";
// singletons: { header: headerSingleton, footer: footerSingleton, ... }
```

```astro
---
import { getEntry } from "astro:content";
import Header from "@hien/design-tokens/Header.astro";
import Footer from "@hien/design-tokens/Footer.astro";
const header = await getEntry("header-data", "index");
const footer = await getEntry("footer-data", "index");
---
<Header currentSite="feed" tagline={header?.data?.tagline} />
<Footer currentSite="feed" {...footer?.data} />
```

- `currentSite` (`home`, `feed`, `cv`) : le logo et la navigation entre sites pointent en relatif vers le site courant, en absolu vers les autres (`@hien/design-tokens/sites`).
- Header : `tagline`, `logoSrc` (défaut `/gauthier-hien-logo.svg`, servi par le site), `logoAlt`.
- Footer : `availabilityLabel`, `isAvailable` (décoché : ligne masquée), `heading`, `ctaLabel`, `ctaEmail`, `navLinks`, `credit`.
- Peer dependencies côté site : `astro`, `@keystatic/core`, `@lucide/astro`, `@paper-design/shaders`.
- `theme.css` déclare `@source "./components"` : Tailwind génère les classes des composants sans config.

## Vitrine

`showcase/` est un petit site Astro statique qui rend les couleurs, l'échelle typographique, le Header et le Footer :

```bash
cd showcase && pnpm install && pnpm dev   # http://localhost:4330
```

## Agents

See [DESIGN.md](./DESIGN.md) for machine-readable tokens and brand rationale ([design.md format](https://github.com/google-labs-code/design.md)).

## Versioning

1. Bump `version` in `package.json`.
2. Commit, push `main`.
3. Tag and push: `git tag vX.Y.Z && git push origin vX.Y.Z`
4. Point apps at the new tag: `pnpm add github:gauthierhien/hien-design-tokens#vX.Y.Z`
