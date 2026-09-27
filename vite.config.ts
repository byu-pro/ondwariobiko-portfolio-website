import { automaticImages } from "./scripts/automatic-images";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    plugins: [automaticImages(process.cwd())],
    base:
      process.env["GITHUB_PAGES"] === "true"
        ? "/ondwariobiko-portfolio-website/"
        : "/",
  },

  tanstackStart: {
    server: {
      entry: "server",
    },

    prerender: {
      enabled: true,
      crawlLinks: true,
    },
  },
});