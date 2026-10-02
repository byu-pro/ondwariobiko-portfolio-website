import { readFileSync, writeFileSync } from "node:fs";

const site = JSON.parse(readFileSync(new URL("../src/lib/site-config.json", import.meta.url), "utf8"));
const projectsRaw = readFileSync(new URL("../src/lib/projects.ts", import.meta.url), "utf8");

const today = new Date().toISOString().split("T")[0];

const staticRoutes = [
  { path: "", priority: "1.0", changefreq: "weekly" },
  { path: "services", priority: "0.9", changefreq: "weekly" },
  { path: "work", priority: "0.9", changefreq: "weekly" },
  { path: "about", priority: "0.8", changefreq: "monthly" },
  { path: "contact", priority: "0.8", changefreq: "monthly" },
  { path: "consultation", priority: "0.8", changefreq: "monthly" },
  { path: "faq", priority: "0.8", changefreq: "monthly" },
  { path: "privacy", priority: "0.3", changefreq: "yearly" },
  { path: "terms", priority: "0.3", changefreq: "yearly" },
];

const caseStudySlugs = [...projectsRaw.matchAll(/slug: "([^"]+)"/g)].map((m) => `work/${m[1]}`);
const caseStudyRoutes = caseStudySlugs.map((path) => ({
  path,
  priority: "0.8",
  changefreq: "monthly",
}));

const allRoutes = [...staticRoutes, ...caseStudyRoutes];

const xmlEntries = allRoutes
  .map((r) => {
    const loc = new URL(r.path ? `${r.path}/` : "", site.url).href;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`;
  })
  .join("\n");

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>\n`;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${new URL("sitemap.xml", site.url).href}
`;

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), sitemapXml);
writeFileSync(new URL("../public/robots.txt", import.meta.url), robotsTxt);

console.log(`Generated sitemap with ${allRoutes.length} canonical URLs.`);
