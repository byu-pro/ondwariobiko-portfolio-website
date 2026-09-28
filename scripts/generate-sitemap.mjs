import { readFileSync, writeFileSync } from "node:fs";
const site = JSON.parse(readFileSync(new URL("../src/lib/site-config.json", import.meta.url), "utf8"));
const projects = readFileSync(new URL("../src/lib/projects.ts", import.meta.url), "utf8");
const paths = ["", "work", "services", "about", "contact", "consultation", "faq", "journal", "privacy", "terms",
  ...[...projects.matchAll(/slug: "([^"]+)"/g)].map((match) => `work/${match[1]}`)];
const urls = paths.map(path => new URL(path ? `${path}/` : "", site.url).href);
writeFileSync(new URL("../public/sitemap.xml", import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`);
writeFileSync(new URL("../public/robots.txt", import.meta.url), `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap.xml", site.url).href}\n`);
console.log(`Generated sitemap with ${urls.length} canonical URLs.`);
