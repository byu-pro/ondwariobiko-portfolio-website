import site from "./site-config.json";

export const siteUrl = (path = "") => new URL(path.replace(/^\/+/, ""), site.url).href;

export function seoHead(path: string, title: string, description: string, image = "assets/pelicansocial_thumbnail.webp") {
  const url = siteUrl(path ? `${path.replace(/^\/+|\/+$/g, "")}/` : "");
  const imageUrl = siteUrl(image.startsWith(import.meta.env.BASE_URL) ? image.slice(import.meta.env.BASE_URL.length) : image);
  return {
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "John Obiko — ondwariobiko" },
      { property: "og:image", content: imageUrl },
      { property: "og:image:alt", content: title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      { name: "robots", content: "index, follow, max-image-preview:large" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "WebPage", "@id": url,
      url, name: title, description, inLanguage: "en",
      isPartOf: { "@id": siteUrl("#website") },
      about: { "@id": siteUrl("#person") },
      ...(path ? { breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: title.split(" | ")[0], item: url },
      ] } } : {}),
    }).replace(/</g, "\\u003c") }],
  };
}

export const identitySchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": siteUrl("#website"), url: site.url, name: "ondwariobiko", alternateName: "John Obiko", inLanguage: "en", publisher: { "@id": siteUrl("#person") } },
    { "@type": "Person", "@id": siteUrl("#person"), name: "John Obiko", alternateName: "ondwariobiko", url: site.url,
      jobTitle: "Graphic Designer, Logo Designer & Brand Designer",
      knowsAbout: ["Graphic design", "Logo design", "Brand identity", "Web design", "UI/UX design"],
      sameAs: ["https://www.linkedin.com/in/ondwariobiko/", "https://www.behance.net/johnobiko"],
    },
  ],
};
