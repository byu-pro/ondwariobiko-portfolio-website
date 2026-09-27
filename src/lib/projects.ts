import processSketches from "@/assets/process-sketches.webp";
import brandApps from "@/assets/brand-applications.webp";


export type Project = {
  slug: string;
  n: string;
  title: string;
  tag: string;
  cat: "Brand Identity" | "Logo & Packaging" | "Digital";
  image: string;
  heroBanner?: string;
  logoImage: string;
  alt: string;
  client: string;
  role: string;
  duration: string;
  services: string[];
  headline: string;
  summary: string;
  challenge: string;
  insight: string;
  process: { t: string; d: string }[];
  palette: { name: string; hex: string }[];
  type: { display: string; body: string };
  results: { k: string; v: string }[];
  quote: { text: string; who: string };
  gallery: { src: string; alt: string }[];
};

const brandRole = "Brand Strategist & Identity Designer";
const brandServices = ["Brand Strategy", "Logo Design", "Visual Identity", "Brand Applications"];
const brandProcess = [
  { t: "Discover", d: "Kick-off conversation to understand the business, audience and ambitions behind the brand." },
  { t: "Define", d: "Positioning and creative direction agreed before a single mark is drawn." },
  { t: "Design", d: "Logo concepts explored by hand, refined into a distinctive, ownable identity." },
  { t: "Deliver", d: "A complete identity kit — logos, colour, type and applications, ready to use." },
];
const placeholderResults = (v: string) => [
  { k: "✓", v: "Identity delivered" },
  { k: "✓", v: "Logo system" },
  { k: "✓", v: "Guidelines" },
  { k: "✓", v },
];

export const projects: Project[] = [
  {
    slug: "pelican-social-bar-and-grill",
    heroBanner: `${import.meta.env.BASE_URL}assets/pelicansocial_casestudybanner.webp`,
    n: "01",
    title: "Pelican Social Bar & Grill",
    tag: "Identity • Brand Strategy",
    cat: "Brand Identity",
    image: `${import.meta.env.BASE_URL}assets/pelicansocial_thumbnail.webp`,
    logoImage: `${import.meta.env.BASE_URL}assets/pelicansocial_logo.webp`,
    alt: "Pelican Social Bar and Grill brand identity",
    client: "Pelican Social Bar & Grill",
    role: brandRole,
    duration: "Scoped per project",
    services: brandServices,
    headline: "Full brand and logo identity for a social bar & grill.",
    summary: "A complete brand and logo identity for a social bar & grill — built to feel welcoming after dark and distinctive on the street.",
    challenge: "Full case study details coming soon — this section will tell the real story of the brief and the challenge.",
    insight: "Case study insight coming soon.",
    process: brandProcess,
    palette: [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Charcoal", hex: "#2A2A2A" },
      { name: "Accent", hex: "#A6FF00" },
      { name: "Paper", hex: "#F5F5F0" },
    ],
    type: { display: "Syne ExtraBold", body: "Inter Regular" },
    results: placeholderResults("Applications"),
    quote: { text: "Client testimonial coming soon.", who: "Client, Pelican Social Bar & Grill" },
    gallery: [
      { src: processSketches, alt: "Logo sketches and identity exploration" },
      { src: brandApps, alt: "Brand applications" },
    ],
  },
  {
    slug: "ikon-trailers",
    heroBanner: `${import.meta.env.BASE_URL}assets/ikontrailers_herobanner.webp`,
    n: "02",
    title: "Ikon Trailers",
    tag: "Identity • Brand Strategy",
    cat: "Brand Identity",
    image: `${import.meta.env.BASE_URL}assets/ikontrailerscom_thumbnail.webp`,
    logoImage: `${import.meta.env.BASE_URL}assets/ikontrailers_logo.webp`,
    alt: "Ikon Trailers brand identity",
    client: "Ikon Trailers.com",
    role: brandRole,
    duration: "Scoped per project",
    services: brandServices,
    headline: "Full brand and logo identity for a trailers business.",
    summary: "A complete brand and logo identity for Ikon Trailers.com — a mark built to be recognised at highway speed and trusted at the point of sale.",
    challenge: "Full case study details coming soon — this section will tell the real story of the brief and the challenge.",
    insight: "Case study insight coming soon.",
    process: brandProcess,
    palette: [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Steel", hex: "#3A3A3A" },
      { name: "Accent", hex: "#A6FF00" },
      { name: "Paper", hex: "#F5F5F0" },
    ],
    type: { display: "Syne ExtraBold", body: "Inter Regular" },
    results: placeholderResults("Applications"),
    quote: { text: "Client testimonial coming soon.", who: "Client, Ikon Trailers" },
    gallery: [
      { src: processSketches, alt: "Logo sketches and identity exploration" },
      { src: brandApps, alt: "Brand applications" },
    ],
  },
  {
    slug: "iron-acre-land-co",
    heroBanner: `${import.meta.env.BASE_URL}assets/ironacrelandco_herobanner.webp`,
    n: "03",
    title: "Iron Acre Land Co",
    tag: "Identity • Brand Strategy",
    cat: "Brand Identity",
    image: `${import.meta.env.BASE_URL}assets/ironacreco_thumbnail.webp`,
    logoImage: `${import.meta.env.BASE_URL}assets/ironacrelandco_logo.webp`,
    alt: "Iron Acre Land Co brand identity",
    client: "Iron Acre Land Co",
    role: brandRole,
    duration: "Scoped per project",
    services: brandServices,
    headline: "Full brand and logo identity for a land company.",
    summary: "A complete brand and logo identity for Iron Acre Land Co — an identity with the weight and permanence the name promises.",
    challenge: "Full case study details coming soon — this section will tell the real story of the brief and the challenge.",
    insight: "Case study insight coming soon.",
    process: brandProcess,
    palette: [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Earth", hex: "#4A4038" },
      { name: "Accent", hex: "#A6FF00" },
      { name: "Paper", hex: "#F5F5F0" },
    ],
    type: { display: "Syne ExtraBold", body: "Inter Regular" },
    results: placeholderResults("Applications"),
    quote: { text: "Client testimonial coming soon.", who: "Client, Iron Acre Land Co" },
    gallery: [
      { src: processSketches, alt: "Logo sketches and identity exploration" },
      { src: brandApps, alt: "Brand applications" },
    ],
  },
  {
    slug: "friends-of-unionville",
    heroBanner: `${import.meta.env.BASE_URL}assets/friendsofunionville_herobanner.webp`,
    n: "04",
    title: "Friends of Unionville",
    tag: "Identity • Brand Strategy",
    cat: "Brand Identity",
    image: `${import.meta.env.BASE_URL}assets/friendsofunionville_thumbnail.webp`,
    logoImage: `${import.meta.env.BASE_URL}assets/friendsofunionvillecolor_logo.webp`,
    alt: "Friends of Unionville brand identity",
    client: "Friends of Unionville",
    role: brandRole,
    duration: "Scoped per project",
    services: brandServices,
    headline: "Full brand and logo identity for a community organisation.",
    summary: "A complete brand and logo identity for Friends of Unionville — a warm, credible identity for a community-driven organisation.",
    challenge: "Full case study details coming soon — this section will tell the real story of the brief and the challenge.",
    insight: "Case study insight coming soon.",
    process: brandProcess,
    palette: [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Slate", hex: "#33363B" },
      { name: "Accent", hex: "#A6FF00" },
      { name: "Paper", hex: "#F5F5F0" },
    ],
    type: { display: "Syne ExtraBold", body: "Inter Regular" },
    results: placeholderResults("Applications"),
    quote: { text: "Client testimonial coming soon.", who: "Client, Friends of Unionville" },
    gallery: [
      { src: processSketches, alt: "Logo sketches and identity exploration" },
      { src: brandApps, alt: "Brand applications" },
    ],
  },
  {
    slug: "sound-curves",
    heroBanner: `${import.meta.env.BASE_URL}assets/soundcurves_herobanner.webp`,
    n: "05",
    title: "Sound Curves",
    tag: "UI/UX • Web",
    cat: "Digital",
    image: `${import.meta.env.BASE_URL}assets/soundcurves_thumbnail.webp`,
    logoImage: `${import.meta.env.BASE_URL}assets/soundcurves_website.webp`,
    alt: "Sound Curves website design",
    client: "Sound Curves",
    role: "UI/UX Designer & Web Developer",
    duration: "Scoped per project",
    services: ["UX Design", "UI Design", "Web Design", "Front-end Development"],
    headline: "A website with rhythm built into every scroll.",
    summary: "Website design and build for Sound Curves — an interface shaped around the brand's audio-visual character.",
    challenge: "Full case study details coming soon — this section will tell the real story of the brief and the challenge.",
    insight: "Case study insight coming soon.",
    process: [
      { t: "Discover", d: "Understanding the audience, content and goals for the site." },
      { t: "Architect", d: "Sitemap and page structure mapped before any pixels." },
      { t: "Design", d: "High-fidelity screens with motion and interaction designed in." },
      { t: "Build", d: "Responsive front-end developed and shipped." },
    ],
    palette: [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Graphite", hex: "#1C1C1C" },
      { name: "Accent", hex: "#A6FF00" },
      { name: "Paper", hex: "#F5F5F0" },
    ],
    type: { display: "Syne Bold", body: "Inter Regular" },
    results: placeholderResults("Launch"),
    quote: { text: "Client testimonial coming soon.", who: "Client, Sound Curves" },
    gallery: [
      { src: processSketches, alt: "Wireframes and design exploration" },
      { src: brandApps, alt: "Website screens" },
    ],
  },
  {
    slug: "moods-n-meds",
    heroBanner: `${import.meta.env.BASE_URL}assets/moodnmeds_herobanner.webp`,
    n: "06",
    title: "Moods n Meds",
    tag: "UI/UX • Web",
    cat: "Digital",
    image: `${import.meta.env.BASE_URL}assets/moodnmeds_thumbnail.webp`,
    logoImage: `${import.meta.env.BASE_URL}assets/moodsnmeds_website.webp`,
    alt: "Moods n Meds website design",
    client: "Moods n Meds",
    role: "UI/UX Designer & Web Developer",
    duration: "Scoped per project",
    services: ["UX Design", "UI Design", "Web Design", "Front-end Development"],
    headline: "A website with as much personality as its name.",
    summary: "Website design and build for Moods n Meds — playful, characterful and built to convert visitors into fans.",
    challenge: "Full case study details coming soon — this section will tell the real story of the brief and the challenge.",
    insight: "Case study insight coming soon.",
    process: [
      { t: "Discover", d: "Understanding the audience, content and goals for the site." },
      { t: "Architect", d: "Sitemap and page structure mapped before any pixels." },
      { t: "Design", d: "High-fidelity screens with motion and interaction designed in." },
      { t: "Build", d: "Responsive front-end developed and shipped." },
    ],
    palette: [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Graphite", hex: "#1C1C1C" },
      { name: "Accent", hex: "#A6FF00" },
      { name: "Paper", hex: "#F5F5F0" },
    ],
    type: { display: "Syne Bold", body: "Inter Regular" },
    results: placeholderResults("Launch"),
    quote: { text: "Client testimonial coming soon.", who: "Client, Moods n Meds" },
    gallery: [
      { src: processSketches, alt: "Wireframes and design exploration" },
      { src: brandApps, alt: "Website screens" },
    ],
  },
  {
    slug: "yellow-dot-energy",
    heroBanner: `${import.meta.env.BASE_URL}assets/yellowdot_herobanner.webp`,
    n: "07",
    title: "Yellow Dot Energy",
    tag: "UI/UX • Mobile App",
    cat: "Digital",
    image: `${import.meta.env.BASE_URL}assets/yellowdot_thumbnail.webp`,
    logoImage: `${import.meta.env.BASE_URL}assets/yellowdot_app.webp`,
    alt: "Yellow Dot Energy mobile app design",
    client: "Yellow Dot Energy",
    role: "UI/UX Designer",
    duration: "Scoped per project",
    services: ["Product Strategy", "UX Design", "UI Design", "Design System"],
    headline: "A mobile app that makes energy feel effortless.",
    summary: "Mobile app design for Yellow Dot Energy — clean, glanceable interfaces that put the right information one tap away.",
    challenge: "Full case study details coming soon — this section will tell the real story of the brief and the challenge.",
    insight: "Case study insight coming soon.",
    process: [
      { t: "Discover", d: "User research and a clear map of the core jobs-to-be-done." },
      { t: "Flows", d: "User journeys and wireframes for every key task." },
      { t: "Design", d: "A polished, accessible UI with a reusable component set." },
      { t: "Handoff", d: "Developer-ready specs and a living design system." },
    ],
    palette: [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Graphite", hex: "#1C1C1C" },
      { name: "Accent", hex: "#A6FF00" },
      { name: "Paper", hex: "#F5F5F0" },
    ],
    type: { display: "Syne Bold", body: "Inter Regular" },
    results: placeholderResults("Handoff"),
    quote: { text: "Client testimonial coming soon.", who: "Client, Yellow Dot Energy" },
    gallery: [
      { src: processSketches, alt: "App wireframes and flows" },
      { src: brandApps, alt: "App interface screens" },
    ],
  },
  {
    slug: "green-essential-turf-and-mosquito",
    heroBanner: `${import.meta.env.BASE_URL}assets/greenessentials_herobanner.webp`,
    n: "08",
    title: "Green Essential Turf & Mosquito",
    tag: "Logo Design",
    cat: "Logo & Packaging",
    image: `${import.meta.env.BASE_URL}assets/greenessentials_thumbnail.webp`,
    logoImage: `${import.meta.env.BASE_URL}assets/greenessentials_logo.webp`,
    alt: "Green Essential Turf and Mosquito logo design",
    client: "Green Essential Turf & Mosquito",
    role: "Logo Designer",
    duration: "Scoped per project",
    services: ["Logo Design", "Mark Refinement", "File Delivery"],
    headline: "A logo that makes lawn care look sharp.",
    summary: "Logo design for Green Essential Turf & Mosquito — a distinctive mark for a lawn and pest-care business that needed to stand out on trucks, tees and door hangers.",
    challenge: "Full case study details coming soon — this section will tell the real story of the brief and the challenge.",
    insight: "Case study insight coming soon.",
    process: [
      { t: "Discover", d: "Understanding the business, its customers and where the mark will live." },
      { t: "Sketch", d: "Concept directions explored by hand before refinement." },
      { t: "Refine", d: "The chosen direction polished into a versatile final mark." },
      { t: "Deliver", d: "Full file kit for print, vehicles and digital use." },
    ],
    palette: [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Turf", hex: "#2E4A2A" },
      { name: "Accent", hex: "#A6FF00" },
      { name: "Paper", hex: "#F5F5F0" },
    ],
    type: { display: "Syne ExtraBold", body: "Inter Regular" },
    results: placeholderResults("File kit"),
    quote: { text: "Client testimonial coming soon.", who: "Client, Green Essential Turf & Mosquito" },
    gallery: [
      { src: processSketches, alt: "Logo sketches and exploration" },
      { src: brandApps, alt: "Logo applications" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
