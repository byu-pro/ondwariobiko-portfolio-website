import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, projects } from "@/lib/projects";
import { ConsultButton } from "@/components/ConsultButton";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Project not found — ondwariobiko" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.title} Case Study — ondwariobiko` },
        { name: "description", content: p.summary },
        { property: "og:title", content: `${p.title} — Case Study by ondwariobiko` },
        { property: "og:description", content: p.headline },
      ],
    };
  },
  notFoundComponent: () => (
    <section className="pt-44 pb-24 px-5 text-center">
      <h1 className="font-display text-5xl uppercase">Project not found</h1>
      <Link to="/work" className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.25em] text-neon">← All work</Link>
    </section>
  ),
  component: CaseStudy,
});

function CaseStudy() {
  const { project: p } = Route.useLoaderData();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      {/* Hero */}
      <section className="pt-32 md:pt-44 px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap gap-3 justify-between font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-8">
            <Link to="/work" className="hover:text-neon transition-colors">← All work</Link>
            <span><span className="text-neon">{p.n}</span> / {p.tag} / {p.year}</span>
          </div>
          <h1 className="font-display uppercase tracking-tighter leading-[0.85] text-[clamp(3rem,12vw,11rem)]">
            <span className="block overflow-hidden"><span className="block animate-rise">{p.title}</span></span>
          </h1>
          <p className="mt-8 max-w-3xl text-xl sm:text-2xl md:text-4xl font-light leading-tight text-white/80">{p.headline}</p>
        </div>
      </section>

      <section className="mt-12 md:mt-20 px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto overflow-hidden aspect-[4/5] sm:aspect-[16/10]">
          <img src={p.image} alt={p.alt} width={1024} height={1280} fetchPriority="high" decoding="async" className="w-full h-full object-cover scale-110" data-parallax="-0.06" />
        </div>
      </section>

      {/* Meta */}
      <section className="px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-white/15 border border-white/15">
          {[["Client", p.client], ["Role", p.role], ["Timeline", p.duration], ["Year", p.year]].map(([k, v]) => (
            <div key={k} className="bg-black p-5 md:p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon mb-3">{k}</div>
              <div className="text-sm md:text-lg">{v}</div>
            </div>
          ))}
        </div>
        <div className="max-w-[1400px] mx-auto mt-8 flex flex-wrap gap-2">
          {p.services.map((s) => (
            <span key={s} className="font-mono text-[10px] uppercase tracking-widest border border-white/20 rounded-full px-4 py-2 hover:bg-neon hover:text-black hover:border-neon transition-colors">{s}</span>
          ))}
        </div>
      </section>

      {/* Overview + challenge */}
      <section className="px-5 md:px-8 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 md:gap-12">
          <h2 className="md:col-span-4 font-display uppercase text-4xl md:text-6xl tracking-tighter leading-[0.9]">The<br /><span className="text-stroke">Brief</span></h2>
          <div className="md:col-span-8 space-y-10">
            <p className="text-xl md:text-3xl font-light leading-snug">{p.summary}</p>
            <div className="border-l-2 border-neon pl-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon mb-3">The challenge</div>
              <p className="text-white/70 md:text-lg leading-relaxed">{p.challenge}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Insight band */}
      <section className="bg-neon text-black px-5 md:px-8 py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-xs uppercase tracking-[0.25em] mb-6">✺ The insight</div>
          <p className="font-display uppercase tracking-tighter leading-[0.95] text-3xl sm:text-5xl md:text-7xl">{p.insight}</p>
        </div>
      </section>

      {/* Process */}
      <section className="px-5 md:px-8 py-16 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-display uppercase text-5xl md:text-8xl tracking-tighter leading-[0.85] mb-12 md:mb-16">The<br /><span className="text-stroke">Process</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/15 border border-white/15">
            {p.process.map((s, i) => (
              <div key={s.t} className="group bg-black p-6 md:p-8 min-h-[260px] flex flex-col transition-colors duration-500 hover:bg-neon hover:text-black">
                <span className="font-display text-6xl md:text-7xl text-neon group-hover:text-black transition-colors">0{i + 1}</span>
                <h3 className="mt-auto font-display uppercase text-2xl md:text-3xl tracking-tight">{s.t}</h3>
                <p className="mt-3 text-sm text-white/60 group-hover:text-black/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto overflow-hidden aspect-[16/9]">
          <img src={p.gallery[0].src} alt={p.gallery[0].alt} width={1600} height={912} loading="lazy" decoding="async" className="w-full h-full object-cover scale-110" data-parallax="0.06" />
        </div>
      </section>

      {/* Palette + type */}
      <section className="px-5 md:px-8 py-16 md:py-28">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-6"><span className="text-neon">●</span> Colour system</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {p.palette.map((c) => (
                <div key={c.hex} className="group">
                  <div className="aspect-[3/4] border border-white/15 transition-transform duration-500 group-hover:-translate-y-3" style={{ backgroundColor: c.hex }} />
                  <div className="mt-3 text-sm">{c.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">{c.hex}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 border border-white/15 p-6 md:p-10 flex flex-col">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-6"><span className="text-neon">●</span> Typography</div>
            <div className="font-display text-[clamp(5rem,14vw,9rem)] leading-none">Aa</div>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between border-b border-white/15 pb-2"><span className="text-white/50">Display</span><span>{p.type.display}</span></div>
              <div className="flex justify-between border-b border-white/15 pb-2"><span className="text-white/50">Body</span><span>{p.type.body}</span></div>
            </div>
            <p className="mt-6 font-mono text-xs break-all text-white/40">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto overflow-hidden aspect-[16/9]">
          <img src={p.gallery[1].src} alt={p.gallery[1].alt} width={1600} height={912} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
        </div>
      </section>

      {/* Results */}
      <section className="px-5 md:px-8 py-16 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-display uppercase text-5xl md:text-8xl tracking-tighter leading-[0.85] mb-12">The<br /><span className="text-stroke">Impact</span></h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 border-t border-white/15 pt-10">
            {p.results.map((r) => (
              <div key={r.v}>
                <div className="font-display text-5xl md:text-7xl tracking-tighter text-neon">{r.k}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/60">{r.v}</div>
              </div>
            ))}
          </div>
          <blockquote className="mt-20 md:mt-28 max-w-4xl">
            <span className="font-display text-7xl md:text-9xl text-neon leading-none">“</span>
            <p className="text-2xl md:text-4xl font-light leading-tight -mt-6">{p.quote.text}</p>
            <footer className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-white/50">— {p.quote.who}</footer>
          </blockquote>
          <div className="mt-16"><ConsultButton label="Want results like this? Book a free 1-hour consult" /></div>
        </div>
      </section>

      {/* Next */}
      <Link to="/work/$slug" params={{ slug: next.slug }} className="group relative block overflow-hidden border-t border-white/15 px-5 md:px-8 py-16 md:py-24">
        <span className="absolute inset-0 bg-neon translate-y-full transition-transform duration-700 group-hover:translate-y-0" />
        <div className="relative max-w-[1400px] mx-auto group-hover:text-black transition-colors">
          <div className="font-mono text-xs uppercase tracking-[0.25em] mb-4 opacity-60">Next project →</div>
          <div className="font-display uppercase tracking-tighter leading-[0.85] text-[clamp(2.5rem,10vw,9rem)]">{next.title}</div>
        </div>
      </Link>
    </article>
  );
}
