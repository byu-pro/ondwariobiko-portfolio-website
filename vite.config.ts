import { automaticImages } from "./scripts/automatic-images";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env["GITHUB_PAGES"] === "true" ? "/ondwariobiko-portfolio-website/" : "/",
  server: { host: "::", port: 8080 },
  css: { transformer: "lightningcss" },
  plugins: [
    automaticImages(process.cwd()),
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
      server: {
        entry: "server",
      },

      prerender: {
        enabled: true,
        crawlLinks: true,
        // Full-size artwork links are static files, not application routes.
        filter: (page: { path: string }) => !page.path.includes("/assets/"),
      },
    }),
    react(),
  ],
});
