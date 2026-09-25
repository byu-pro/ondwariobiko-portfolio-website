import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
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