import themeCss from "@hien/design-tokens/theme.css?raw";

export const colors = [
  { token: "background", utility: "bg-background", note: "Canvas" },
  { token: "background-muted", utility: "bg-background-muted", note: "Surface douce, bouton secondaire" },
  { token: "foreground", utility: "bg-foreground", note: "Encre, CTA plein" },
  { token: "foreground-muted", utility: "bg-muted", note: "Légendes, texte secondaire" },
  { token: "accent", utility: "bg-accent", note: "Emphase, sélection" },
  { token: "accent-hover", utility: "bg-accent-hover", note: "Survol des moments accent" },
  { token: "border", utility: "bg-border", note: "Filets, séparation" },
  { token: "status", utility: "bg-status", note: "LED de disponibilité" },
];

// Valeurs lues dans theme.css : la vitrine ne peut pas diverger du package.
const block = (selector: string) => {
  const start = themeCss.indexOf(selector);
  const body = themeCss.slice(themeCss.indexOf("{", start) + 1, themeCss.indexOf("}", start));
  return Object.fromEntries(
    [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]),
  ) as Record<string, string>;
};
export const light = block(":root {");
export const dark = block(':root[data-theme="dark"] {');

export const type = [
  { name: "h1", sample: "Design Engineer", el: "h1" },
  { name: "h2", sample: "What will we ship together?", el: "h2" },
  { name: "h3", sample: "Selected work", el: "h3" },
  { name: "h4", sample: "Get in touch", el: "h4" },
  { name: "lead", sample: "Interfaces précises, du Figma au code.", el: "p", cls: "text-lead" },
  { name: "body", sample: "Freelance Design Engineer basé à Paris, je conçois et je code des produits numériques.", el: "p" },
  { name: "label", sample: "Available for freelance work", el: "span" },
];
