import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteFooter";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — ondwariobiko | Logo, Branding, UI/UX, Front-end" },
      { name: "description", content: "Logo design, brand identity systems, UI/UX design and front-end development from ondwariobiko. Working remotely worldwide." },
      { property: "og:title", content: "Services — ondwariobiko" },
      { property: "og:description", content: "Logo design, brand identity, UI/UX and front-end development." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { t: "Logo Design", d: "Marks built on geometry and meaning — memorable at 16px and on a billboard.", items: ["Monograms", "Wordmarks", "Symbols"] },
  { t: "Brand Identity", d: "Complete visual systems: type, colour, voice and the rules that hold them together.", items: ["Guidelines", "Packaging", "Stationery"] },
  { t: "UI/UX Design", d: "Interfaces that feel inevitable — researched, prototyped and tested.", items: ["Web apps", "Mobile", "Design systems"] },
  { t: "Front-end Dev", d: "Pixel-true builds with motion and performance baked in, not bolted on.", items: ["React", "Websites", "Interactions"] },
];

function ServicesPage() {
  return (
    <>
      <PageHero index="03" eyebrow="What I craft" title="Services" outline="& Craft" />
      <section className="px-5 md:px-8 pb-24">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-px bg-white/15 border border-white/15">
          {services.map((s, i) => (
            <div key={s.t} className="group bg-black p-8 md:p-12 min-h-[380px] flex flex-col transition-colors duration-500 hover:bg-neon hover:text-black">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-neon group-hover:text-black">0{i + 1}</span>
                <span className="text-3xl leading-none transition-transform duration-500 group-hover:rotate-90">✺</span>
              </div>
              <h2 className="mt-auto font-display uppercase tracking-tighter text-5xl md:text-6xl leading-[0.9]">{s.t}</h2>
              <p className="mt-4 max-w-md text-white/60 group-hover:text-black/70">{s.d}</p>
              <div className="mt-6 flex gap-2 flex-wrap">
                {s.items.map((x) => (
                  <span key={x} className="font-mono text-[10px] uppercase tracking-widest border border-current rounded-full px-3 py-1">{x}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
