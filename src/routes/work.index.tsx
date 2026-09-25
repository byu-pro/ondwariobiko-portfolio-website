import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/SiteFooter";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/work/")({
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

const filters = ["All", "Brand Identity", "Logo & Packaging", "Digital"] as const;

function WorkPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = projects.filter((p) => filter === "All" || p.cat === filter);

  return (
    <>
      <PageHero index="02" eyebrow="Selected projects" title="Selected" outline="Works" />

      {/* Intro line */}
      <section className="px-5 md:px-8 pb-12">
        <div className="max-w-[1400px] mx-auto" data-reveal>
          <p className="text-lg md:text-2xl font-light leading-relaxed text-white/70 max-w-3xl">
            A selection of brand identities, logo systems and digital products for clients across
            fintech, hospitality, coffee and SaaS — each one a full story, not just a pretty picture.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="px-5 md:px-8 pb-12 md:pb-16 sticky top-[72px] z-30">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex flex-wrap gap-1 bg-black/60 backdrop-blur-xl border border-white/10 p-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] px-4 md:px-6 py-3 transition-colors duration-300 cursor-pointer ${
                  filter === f ? "bg-neon text-black" : "text-white/50 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project grid — consistent thumbnails */}
      <section className="px-5 md:px-8 pb-24">
        <div className="max-w-[1400px] mx-auto grid sm:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
          {shown.map((p, i) => (
            <Link
              to="/work/$slug"
              params={{ slug: p.slug }}
              key={p.title}
              data-reveal
              style={{ transitionDelay: `${(i % 2) * 120}ms` }}
              className={`group ${i % 2 ? "sm:mt-24" : ""}`}
            >
              <div className="overflow-hidden mb-6 border border-white/10 group-hover:border-neon/50 transition-colors duration-500">
                <img
                  src={p.image}
                  alt={p.alt}
                  width={1200}
                  height={1500}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-baseline gap-4">
                <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight group-hover:text-neon transition-colors duration-300">
                  {p.title}
                </h2>
                <span className="font-mono text-xs text-white/40 shrink-0">{p.year} ↗</span>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-white/50 mt-2">
                {p.client} — {p.tag}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto border border-white/10 p-10 md:p-20 text-center" data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-6">Have a similar project in mind?</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-[0.85] mb-10">
            Let's <span className="text-stroke">Talk</span>
          </h2>
          <Link
            to="/consultation"
            className="inline-flex items-center gap-3 bg-neon text-black font-mono text-xs uppercase tracking-[0.2em] px-10 py-5 hover:bg-white transition-colors duration-300"
          >
            Free 1-hr consult ↗
          </Link>
        </div>
      </section>
    </>
  );
}
