import site from "./site-config.json";

export const siteUrl = (path = "") => new URL(path.replace(/^\/+/, ""), site.url).href;

export const defaultKeywords = [
  "Graphic Designer",
  "Logo Designer",
  "Brand Designer",
  "Freelance Graphic Designer",
  "Custom Logo Design",
  "Brand Identity Designer",
  "Visual Identity System",
  "Brand Strategist",
  "Logo Design Services",
  "Mascot Logo Designer",
  "UI UX Designer",
  "Web Designer",
  "Nairobi Graphic Designer",
  "Remote Brand Designer",
].join(", ");

export function seoHead(
  path: string,
  title: string,
  description: string,
  image = "assets/pelicansocial_thumbnail.webp",
  extraSchemas: Record<string, unknown>[] = [],
  keywords?: string,
) {
  const url = siteUrl(path ? `${path.replace(/^\/+|\/+$/g, "")}/` : "");
  const imageUrl = siteUrl(image.startsWith(import.meta.env.BASE_URL) ? image.slice(import.meta.env.BASE_URL.length) : image);
  const kw = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": siteUrl("#website") },
    about: { "@id": siteUrl("#person") },
    author: { "@id": siteUrl("#person") },
    publisher: { "@id": siteUrl("#business") },
    ...(path
      ? {
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: title.split(" | ")[0]!.trim(), item: url },
            ],
          },
        }
      : {}),
  };

  const allSchemas = [pageSchema, ...extraSchemas];

  return {
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: kw },
      { name: "author", content: "John Obiko (ondwariobiko)" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "John Obiko — Graphic, Logo & Brand Designer" },
      { property: "og:type", content: path.startsWith("work/") ? "article" : "website" },
      { property: "og:image", content: imageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:creator", content: "@ondwariobiko" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "geo.region", content: "KE-110" },
      { name: "geo.placename", content: "Nairobi" },
    ],
    scripts: allSchemas.map((schema) => ({
      type: "application/ld+json",
      children: JSON.stringify(schema).replace(/</g, "\\u003c"),
    })),
  };
}

export const identitySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": siteUrl("#website"),
      url: site.url,
      name: "John Obiko | Freelance Graphic Designer, Logo Designer & Brand Specialist",
      alternateName: ["ondwariobiko", "Obiko Graphic Design"],
      inLanguage: "en",
      publisher: { "@id": siteUrl("#person") },
    },
    {
      "@type": "Person",
      "@id": siteUrl("#person"),
      name: "John Obiko",
      alternateName: ["ondwariobiko", "Obiko"],
      url: site.url,
      jobTitle: "Freelance Graphic Designer, Custom Logo Designer & Brand Identity Specialist",
      description: "Independent graphic designer, custom logo designer, and brand identity specialist crafting concept-driven visual identities, vector mascot illustrations, and websites worldwide.",
      image: siteUrl("assets/johnobiko_profilepic.webp"),
      knowsAbout: [
        "Graphic Design",
        "Logo Design",
        "Custom Logo Creation",
        "Brand Identity Systems",
        "Brand Strategy",
        "Visual Identity",
        "Typography",
        "Mascot Illustration",
        "UI/UX Design",
        "Web Design & Development",
        "Packaging Design",
      ],
      sameAs: [
        "https://www.linkedin.com/in/ondwariobiko/",
        "https://www.behance.net/johnobiko",
        "https://dribbble.com/ondwariobiko",
        "https://instagram.com/ondwariobiko",
        "https://github.com/byu-pro",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
    },
    {
      "@type": ["ProfessionalService", "GraphicDesigner"],
      "@id": siteUrl("#business"),
      name: "John Obiko — Graphic Design & Brand Identity Studio",
      alternateName: "ondwariobiko Graphic Design",
      url: site.url,
      logo: siteUrl("assets/logoblack.webp"),
      image: siteUrl("assets/pelicansocial_thumbnail.webp"),
      description: "Full-service freelance graphic design studio specializing in custom logo design, brand identity systems, visual guidelines, mascot design, and website design for startups and established businesses globally.",
      priceRange: "$$",
      telephone: "+254702255575",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Worldwide" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "Kenya" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Graphic Design & Brand Identity Services",
        itemListElement: [
          {
            "@type": "OfferCatalog",
            name: "Custom Logo Design",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Custom Logo Design & Vector Mark System",
                  description: "Hand-drawn, concept-driven logo design including primary mark, secondary layouts, submarks, favicons, and vector files.",
                },
              },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "Brand Identity Systems",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Complete Brand Identity System",
                  description: "Full brand identity packages containing logos, typography hierarchy, color palettes, visual language rules, and comprehensive brand guidelines PDF.",
                },
              },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "Mascot & Character Illustration",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Custom Vector Mascot Design",
                  description: "Bespoke character mascot illustration system with custom poses, expressions, and brand integration.",
                },
              },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "Web Design & Development",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Web Design & Front-end Build",
                  description: "Custom-designed and coded high-performance websites built to reflect your brand identity pixel-for-pixel.",
                },
              },
            ],
          },
        ],
      },
    },
  ],
};

export function faqSchema(qaList: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qaList.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function creativeWorkSchema(title: string, description: string, image: string, slug: string, category: string) {
  const url = siteUrl(`work/${slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": url,
    url,
    name: title,
    headline: title,
    description,
    genre: category,
    image: siteUrl(image),
    author: { "@id": siteUrl("#person") },
    creator: { "@id": siteUrl("#person") },
    publisher: { "@id": siteUrl("#business") },
  };
}
