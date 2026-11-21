export type NavItem = { href: string; label: string; description: string };

export const nav: { title: string; items: NavItem[] }[] = [
  {
    title: "Fondations",
    items: [
      { href: "/", label: "Introduction", description: "Ce que contient le design system et comment l'utiliser." },
      { href: "/couleurs", label: "Couleurs", description: "Tokens oklch, mode clair et mode sombre." },
      { href: "/typographie", label: "Typographie", description: "Geist et Geist Mono, échelle responsive." },
      { href: "/grille", label: "Grille", description: "8 colonnes, contenu centré, déclinaisons responsive." },
      { href: "/fond-anime", label: "Fond animé", description: "Mesh sombre et clair, état coloré au survol." },
    ],
  },
  {
    title: "Composants",
    items: [
      { href: "/header-footer", label: "Header et Footer", description: "Squelette commun, contenu depuis Keystatic." },
      { href: "/boutons", label: "Boutons", description: "Pilule pleine largeur, overlay, compacte." },
      { href: "/badges", label: "Badges", description: "Tag mono en capitales." },
      { href: "/images", label: "Images", description: "Image large, image carrée, légende, lien, visionneuse." },
      { href: "/sections", label: "Sections", description: "En-tête, image large, grille d'images." },
      { href: "/carrousel", label: "Carrousel", description: "Slides qui débordent de la grille." },
    ],
  },
];

export const pages = nav.flatMap((group) => group.items);
