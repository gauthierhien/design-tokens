# @hien/design-tokens

Brand design tokens for [Gauthier Hien](https://github.com/gauthierhien) projects. Shared visual source of truth for CSS/Tailwind v4 apps — no build step, runtime tokens only.

## Install

Via Git tag (recommended until npm publish):

```bash
pnpm add github:gauthierhien/design-tokens#v1.2.0
```

## Usage (Tailwind v4)

```css
@import "@hien/design-tokens/theme.css";
@import "tailwindcss";
```

Load **Geist** and **Geist Mono** in the consuming app (e.g. `@fontsource-variable/geist` + mono). Fonts are not bundled here.

Then use token-backed utilities: `bg-background`, `text-foreground`, `text-accent`, `border-border`, `bg-status`, `font-sans`, `font-mono`, plus the type scale (`text-h1` … `text-h4`, `text-body`, `text-body-prose`, `text-lead`, `text-label`). For local inverted surfaces, wrap with `.theme-dark`.

## Agents

See [DESIGN.md](./DESIGN.md) for machine-readable tokens and brand rationale ([design.md format](https://github.com/google-labs-code/design.md)).

## Versioning

1. Bump `version` in `package.json`.
2. Commit, push `main`.
3. Tag and push: `git tag vX.Y.Z && git push origin vX.Y.Z`
4. Point apps at the new tag: `pnpm add github:gauthierhien/design-tokens#vX.Y.Z`
