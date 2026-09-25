import { createFileRoute } from "@tanstack/react-router";
import heroIdentity from "@/assets/hero-identity.jpg";
import projectAura from "@/assets/project-aura-finance.jpg";
import projectMara from "@/assets/project-mara-sands.jpg";
import logoBlack from "@/assets/jo-logo-black.png.asset.json";
import logoWhite from "@/assets/jo-logo-white.png.asset.json";
import logoNeon from "@/assets/jo-logo-neon.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "John Obiko — Creative Director & Brand Designer | Nairobi" },
      {
        name: "description",
        content:
          "John Obiko is a Nairobi-based multi-disciplinary designer crafting premium brand identities, digital products, and UI/UX experiences. 10 years of practice.",
      },
      { property: "og:title", content: "John Obiko — Creative Director & Brand Designer" },
      {
        property: "og:description",
        content:
          "Nairobi-based multi-disciplinary designer crafting premium brand identities and digital experiences.",
      },
    ],
  }),
  component: Index,
});

const projects = [
  {
    title: "Aura Finance",
    tag: "UI/UX • Front-end Development",
    year: "2023",
    image: projectAura,
    alt: "Aura Finance fintech mobile app interface with dark mode and neon accents",
    offset: false,
  },
  {
    title: "Mara Sands",
    tag: "Identity • Brand Strategy",
    year: "2024",
    image: projectMara,
    alt: "Mara Sands luxury hotel brand identity mockup on linen paper",
    offset: true,
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-neon selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference px-6 py-8 flex justify-between items-center text-white">
        <img
          src={logoWhite.url}
          alt="John Obiko monogram"
          width={32}
          height={32}
          className="size-7 object-contain"
        />
        <div className="hidden md:flex gap-12 font-mono text-xs uppercase tracking-[0.2em]">
          <a href="#work" className="hover:text-neon transition-colors">
            Selected Work
          </a>
          <a href="#about" className="hover:text-neon transition-colors">
            Profile
          </a>
          <a href="#contact" className="hover:text-neon transition-colors">
            Contact
          </a>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full">
          Nairobi / 1.28° S
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="font-display text-[clamp(4rem,15vw,14rem)] leading-[0.85] tracking-tighter uppercase mb-12">
            Creative <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px black" }}
            >
              Director
            </span>
          </h1>

          <div className="flex flex-col md:flex-row gap-12 items-end">
            <div className="md:w-1/2">
              <p className="text-2xl md:text-3xl font-light leading-tight max-w-xl mb-8">
                John Obiko is a designer & developer crafting premium digital
                identities and brand experiences from the heart of Nairobi.
              </p>
              <div className="flex gap-4">
                <div className="size-12 rounded-full border border-black grid place-items-center hover:bg-neon transition-colors cursor-pointer">
                  <span className="text-xs font-mono">↓</span>
                </div>
                <span className="font-mono text-xs uppercase self-center tracking-widest">
                  Scroll to Explore Work
                </span>
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <img
                src={heroIdentity}
                alt="Premium textured business cards with neon green edges and JO monogram"
                width={800}
                height={1008}
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logo Showcase Section */}
      <section className="bg-black py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {/* Black on White */}
            <div className="aspect-square bg-white flex flex-col items-center justify-center p-12">
              <img
                src={logoBlack.url}
                alt="JO monogram in black on white"
                width={128}
                height={128}
                className="w-32 h-32 object-contain"
              />
              <span className="mt-8 font-mono text-[10px] uppercase tracking-widest text-black/40">
                Primary Monogram
              </span>
            </div>
            {/* White on Black */}
            <div className="aspect-square bg-black border border-white/10 flex flex-col items-center justify-center p-12">
              <img
                src={logoWhite.url}
                alt="JO monogram in white on black"
                width={128}
                height={128}
                className="w-32 h-32 object-contain"
              />
              <span className="mt-8 font-mono text-[10px] uppercase tracking-widest text-white/40">
                Inverse Treatment
              </span>
            </div>
            {/* Black on Neon */}
            <div className="aspect-square bg-neon flex flex-col items-center justify-center p-12">
              <img
                src={logoNeon.url}
                alt="JO monogram in black on neon yellow-green"
                width={128}
                height={128}
                className="w-32 h-32 object-contain"
              />
              <span className="mt-8 font-mono text-[10px] uppercase tracking-widest text-black/40">
                Signature Accent
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="work" className="py-32 px-6 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="font-display text-7xl uppercase tracking-tighter">
              Selected
              <br />
              Works
            </h2>
            <div className="font-mono text-xs uppercase tracking-widest text-black/50 mb-4">
              01 — 02 / Projects
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
            {projects.map((project) => (
              <div
                key={project.title}
                className={`group cursor-pointer ${project.offset ? "md:mt-40" : ""}`}
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  width={1200}
                  height={1504}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover mb-6 transition-all duration-500 group-hover:opacity-90"
                />
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold uppercase mb-2">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-widest text-black/50">
                      {project.tag}
                    </p>
                  </div>
                  <span className="font-mono text-xs">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Info Section */}
      <section id="about" className="bg-neon text-black py-24 px-6 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="text-5xl font-display mb-2 tracking-tighter">
              10+
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest">
              Years Experience
            </div>
          </div>
          <div>
            <div className="text-5xl font-display mb-2 tracking-tighter">
              150+
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest">
              Brands Launched
            </div>
          </div>
          <div>
            <div className="text-5xl font-display mb-2 tracking-tighter">
              NBO
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest">
              Based in Kenya
            </div>
          </div>
          <div>
            <div className="text-5xl font-display mb-2 tracking-tighter">∞</div>
            <div className="font-mono text-[10px] uppercase tracking-widest">
              Ideas Generated
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer id="contact" className="py-40 px-6 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-widest mb-8 text-black/50">
            Have a vision?
          </p>
          <a
            href="mailto:hello@johnobiko.studio"
            className="font-display text-[clamp(2.5rem,8vw,8rem)] uppercase leading-none tracking-tighter hover:text-neon transition-colors block mb-20"
          >
            Let's build
            <br />
            something new
          </a>
          <div className="flex flex-col md:flex-row justify-between items-center pt-20 border-t border-black/10 gap-8">
            <div className="font-mono text-xs text-black/40">
              © 2026 John Obiko Studio
            </div>
            <div className="flex gap-8 font-mono text-xs uppercase tracking-widest">
              <a href="#" className="hover:text-neon">
                Instagram
              </a>
              <a href="#" className="hover:text-neon">
                LinkedIn
              </a>
              <a href="#" className="hover:text-neon">
                Dribbble
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
