import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Vitrine statique du design system : `pnpm dev` en local, `dist/` sur Vercel.
export default defineConfig({
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
