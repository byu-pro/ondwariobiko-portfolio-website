import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteFooter";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — ondwariobiko | Logos, Brands & Interfaces" },
      { name: "description", content: "Selected logo, brand identity, UI/UX and front-end projects by ondwariobiko." },
      { property: "og:title", content: "Selected Work — ondwariobiko" },
      { property: "og:description", content: "Logos, brand systems and digital products designed remotely worldwide." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <>
      <PageHero index="02" eyebrow="Selected projects" title="Selected" outline="Works" />
      <section className="px-5 md:px-8 pb-24">
        <div className="max-w-[1400px] mx-auto border-t border-white/15">
          {projects.map((p) => (
            <article key={p.title} className="group relative border-b border-white/15 py-8 md:py-10 grid grid-cols-12 items-center gap-4 cursor-pointer">
              <span className="col-span-2 md:col-span-1 font-mono text-xs text-neon">{p.n}</span>
              <h2 className="col-span-10 md:col-span-6 font-display uppercase tracking-tighter text-3xl sm:text-5xl md:text-7xl break-words leading-none transition-all duration-500 group-hover:translate-x-4 group-hover:text-neon">{p.title}</h2>
              <span className="col-span-8 md:col-span-3 font-mono text-xs uppercase tracking-widest text-white/50">{p.tag}</span>
              <span className="col-span-4 md:col-span-2 text-right font-mono text-xs">{p.year} ↗</span>
              <img src={p.image} alt={p.alt} width={400} height={500} loading="lazy" className="pointer-events-none hidden md:block absolute right-40 top-1/2 -translate-y-1/2 w-56 aspect-[4/5] object-cover opacity-0 scale-75 rotate-6 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 z-10" />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
