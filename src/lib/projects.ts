import heroIdentity from "@/assets/hero-identity.jpg";
import projectAura from "@/assets/project-aura-finance.jpg";
import projectMara from "@/assets/project-mara-sands.jpg";
import projectKilele from "@/assets/project-kilele-coffee.jpg";
import projectSavanna from "@/assets/project-savanna-os.jpg";
import processSketches from "@/assets/process-sketches.jpg";
import brandApps from "@/assets/brand-applications.jpg";

export const heroImage = heroIdentity;

export type Project = {
  slug: string;
  n: string;
  title: string;
  tag: string;
  year: string;
  image: string;
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

export const projects: Project[] = [
  {
    slug: "aura-finance",
    n: "01",
    title: "Aura Finance",
    tag: "UI/UX • Front-end",
    year: "2023",
    image: projectAura,
    alt: "Aura Finance fintech app interface with dark mode and lime accents",
    client: "Aura Finance",
    role: "Lead UI/UX Designer & Front-end Developer",
    duration: "14 weeks",
    services: ["Product Strategy", "UX Research", "UI Design", "Design System", "React Front-end"],
    headline: "Making money feel calm, fast and a little bit electric.",
    summary: "A mobile-first banking experience for freelancers who get paid in multiple currencies — rebuilt from a cluttered legacy dashboard into a focused, glanceable product.",
    challenge: "Users were abandoning the app after the first week. Balances were buried, transfers took seven taps, and the interface looked like every other bank — nothing about it earned trust or delight.",
    insight: "Freelancers don't check their bank to explore — they check it to answer one question: 'Can I relax this month?' Every screen had to answer that in under two seconds.",
    process: [
      { t: "Discover", d: "24 user interviews across 6 countries, heatmap audits and a full teardown of 9 competitor apps." },
      { t: "Define", d: "Mapped 3 core jobs-to-be-done and cut the navigation from 11 items to 4." },
      { t: "Design", d: "Built a 140-component dark-first design system with a single lime signal colour for 'money in'." },
      { t: "Develop", d: "Shipped the front-end in React with motion tuned to 60fps on low-end Android devices." },
    ],
    palette: [
      { name: "Void", hex: "#0A0A0A" },
      { name: "Graphite", hex: "#1C1C1C" },
      { name: "Signal Lime", hex: "#A6FF00" },
      { name: "Paper", hex: "#F5F5F0" },
    ],
    type: { display: "Syne ExtraBold", body: "Inter Regular" },
    results: [
      { k: "+62%", v: "Week-4 retention" },
      { k: "7→2", v: "Taps to send money" },
      { k: "4.8★", v: "App store rating" },
      { k: "1.2s", v: "Time to first insight" },
    ],
    quote: { text: "ondwariobiko didn't just redesign our app — he redesigned how our users feel about money.", who: "Head of Product, Aura Finance" },
    gallery: [
      { src: processSketches, alt: "Wireframes and design system exploration" },
      { src: projectSavanna, alt: "Aura dashboard on laptop and mobile" },
    ],
  },
  {
    slug: "mara-sands",
    n: "02",
    title: "Mara Sands",
    tag: "Identity • Brand Strategy",
    year: "2024",
    image: projectMara,
    alt: "Mara Sands luxury hotel brand identity on linen paper",
    client: "Mara Sands Retreat",
    role: "Brand Strategist & Identity Designer",
    duration: "10 weeks",
    services: ["Brand Strategy", "Naming Support", "Logo Design", "Visual Identity", "Stationery & Signage"],
    headline: "A luxury retreat identity drawn from the horizon line.",
    summary: "A complete brand identity for a boutique coastal retreat — from positioning and logo to linen stationery, signage and a guest experience that feels quietly expensive.",
    challenge: "The retreat was competing with global luxury chains yet looked like a family guesthouse. It needed to command premium rates without losing its warmth and sense of place.",
    insight: "True luxury whispers. We stripped everything back to one idea — the calm line where sand meets sea — and let generous space and material quality do the talking.",
    process: [
      { t: "Position", d: "Brand workshops with owners and guests defined the promise: 'Slow is the new luxury.'" },
      { t: "Mark", d: "Over 80 logo sketches refined into a horizon monogram built on a strict geometric grid." },
      { t: "System", d: "Typography, a sand-toned palette, photography direction and a tactile print language." },
      { t: "Apply", d: "Key cards, menus, towels, signage and a 60-page brand book for consistent roll-out." },
    ],
    palette: [
      { name: "Night Tide", hex: "#0F0F0F" },
      { name: "Driftwood", hex: "#8C7B6B" },
      { name: "Sand", hex: "#E8DFD0" },
      { name: "Signal Lime", hex: "#A6FF00" },
    ],
    type: { display: "Syne Bold", body: "Inter Light" },
    results: [
      { k: "+38%", v: "Average nightly rate" },
      { k: "2×", v: "Direct bookings" },
      { k: "60pp", v: "Brand guidelines" },
      { k: "12", v: "Touchpoints designed" },
    ],
    quote: { text: "Guests now photograph our key cards. That's when we knew the brand was working.", who: "Founder, Mara Sands" },
    gallery: [
      { src: heroIdentity, alt: "Premium stationery with embossed monogram" },
      { src: brandApps, alt: "Brand applied to signage and merchandise" },
    ],
  },
  {
    slug: "kilele-coffee",
    n: "03",
    title: "Kilele Coffee",
    tag: "Logo • Packaging",
    year: "2025",
    image: projectKilele,
    alt: "Matte black specialty coffee bags with lime peak logo",
    client: "Kilele Coffee Roasters",
    role: "Logo & Packaging Designer",
    duration: "8 weeks",
    services: ["Logo Design", "Packaging System", "Label Design", "Retail Displays"],
    headline: "Peak-grown coffee, packaged like it's worth the climb.",
    summary: "A bold logo and modular packaging system for a specialty roaster exporting high-altitude single origins to cafés and shelves worldwide.",
    challenge: "Great beans, forgettable bags. On crowded shelves the product disappeared among kraft paper and cliché illustrations of coffee cherries.",
    insight: "Altitude is the story — higher grown means slower ripening and richer flavour. The mark became a sharp, confident peak that reads from three metres away.",
    process: [
      { t: "Audit", d: "Shelf studies in 14 specialty stores to find what everyone else was doing — then avoided it." },
      { t: "Mark", d: "A single-stroke mountain peak that doubles as an upward arrow of quality." },
      { t: "Pack", d: "Matte black bags, lime gussets and a colour-coded origin label system." },
      { t: "Launch", d: "Retail displays, café menus and social launch templates." },
    ],
    palette: [
      { name: "Roast Black", hex: "#0B0B0B" },
      { name: "Ash", hex: "#3A3A3A" },
      { name: "Peak Lime", hex: "#A6FF00" },
      { name: "Crema", hex: "#EFE7DA" },
    ],
    type: { display: "Syne ExtraBold", body: "Space Grotesk" },
    results: [
      { k: "+140%", v: "Retail sell-through" },
      { k: "9", v: "New export markets" },
      { k: "3m", v: "Shelf legibility" },
      { k: "1", v: "System, infinite origins" },
    ],
    quote: { text: "Our bags finally look as good as the coffee tastes.", who: "Co-founder, Kilele Coffee" },
    gallery: [
      { src: processSketches, alt: "Logo construction sketches" },
      { src: brandApps, alt: "Brand applications in the wild" },
    ],
  },
  {
    slug: "savanna-os",
    n: "04",
    title: "Savanna OS",
    tag: "Product Design • Web",
    year: "2026",
    image: projectSavanna,
    alt: "Savanna OS dark dashboard on laptop and phone",
    client: "Savanna OS",
    role: "Product Designer & Front-end Developer",
    duration: "16 weeks",
    services: ["Product Design", "Design System", "Marketing Website", "Front-end Build"],
    headline: "An operating system for small businesses that grow fast.",
    summary: "End-to-end product design and a high-converting marketing site for a SaaS platform that brings invoicing, analytics and customers into one calm dashboard.",
    challenge: "Owners were juggling five tools and a spreadsheet. Early prototypes tried to show everything at once and overwhelmed the very people they were meant to help.",
    insight: "Show the one number that matters today — then let depth unfold on demand. Progressive disclosure became the product's design principle.",
    process: [
      { t: "Research", d: "Shadowed 12 business owners for a day to understand real workflows." },
      { t: "Architect", d: "Information architecture rebuilt around 'Today', 'Money' and 'People'." },
      { t: "Design", d: "Dark, data-dense UI with lime used only for growth and positive action." },
      { t: "Build", d: "Responsive marketing site and component library shipped in React + Tailwind." },
    ],
    palette: [
      { name: "Night", hex: "#070707" },
      { name: "Panel", hex: "#161616" },
      { name: "Growth Lime", hex: "#A6FF00" },
      { name: "Mist", hex: "#BDBDBD" },
    ],
    type: { display: "Syne Bold", body: "Inter Medium" },
    results: [
      { k: "+3.1×", v: "Trial sign-ups" },
      { k: "−45%", v: "Support tickets" },
      { k: "98", v: "Lighthouse score" },
      { k: "5→1", v: "Tools replaced" },
    ],
    quote: { text: "He thinks like a founder, designs like an artist and ships like an engineer.", who: "CEO, Savanna OS" },
    gallery: [
      { src: projectAura, alt: "Mobile interface exploration" },
      { src: processSketches, alt: "Design system foundations" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
