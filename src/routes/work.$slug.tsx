import { CraftIcon } from "@/components/CraftIcon";
import { creativeWorkSchema, seoHead } from "@/lib/seo";
import { CaseStudyWordmark } from "@/components/CaseStudyWordmark";
import { ProjectPreview } from "@/components/ProjectPreview";
import { BrandMockupTiles } from "@/components/BrandMockupTiles";
import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { getProject, projects } from "@/lib/projects";
import { ConsultButton } from "@/components/ConsultButton";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    if (params.slug === "moods-and-nerds") throw redirect({ to: "/work/$slug", params: { slug: "moods-n-meds" }, statusCode: 301 });
    if (params.slug === "green-essential-turf-and-mosquito") throw redirect({ to: "/work/$slug", params: { slug: "green-essentials-turf-and-mosquito" }, statusCode: 301 });
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.project;
    return seoHead(
      `work/${p.slug}`,
      `${p.title} — ${p.cat === "Digital" ? "Web & UI/UX Design" : "Logo & Brand Design Case Study"} | John Obiko Graphic Designer`,
      p.summary,
      p.image,
      [creativeWorkSchema(p.title, p.summary, p.image, p.slug, p.cat)],
      p.cat === "Digital"
        ? `${p.title} website design, ${p.client} UI/UX design, ${p.tag}, digital design case study`
        : `${p.title} logo design, ${p.client} brand identity, ${p.tag}, graphic design case study`
    );
  },
  notFoundComponent: () => (
    <section className="pt-44 pb-24 px-5 text-center">
      <h1 className="font-display text-5xl uppercase">Project not found</h1>
      <Link to="/work" className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.25em] text-accent-ink">← All work</Link>
    </section>
  ),
  component: CaseStudy,
});

function CaseStudy() {
  const { project: p } = Route.useLoaderData();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length]!;
  const [g1, g2] = [p.gallery[0]!, p.gallery[1]!];

  return (
    <article>
      {/* Hero */}
      <section className="pt-32 md:pt-44 px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap gap-3 justify-between font-mono text-xs uppercase tracking-[0.25em] text-ink/50 mb-8 animate-page-in">
            <Link to="/work" className="hover:text-accent-ink transition-colors">← All work</Link>
            <span><span className="text-accent-ink">{p.n}</span> / {p.tag}</span>
          </div>
          {p.wordmarkImage ? (
            <CaseStudyWordmark key={p.slug} src={p.wordmarkImage} title={p.title} slug={p.slug} />
          ) : (
            <h1 className="font-display uppercase tracking-tighter leading-[0.85] text-[clamp(2.15rem,12vw,11rem)] text-center">
              <span className="block overflow-hidden"><span className="block animate-rise">{p.title}</span></span>
            </h1>
          )}
          <p className="mt-8 max-w-3xl font-display uppercase tracking-tight text-xl sm:text-2xl md:text-4xl font-bold leading-tight text-accent-ink text-center mx-auto animate-headline-glide">
            {p.headline}
          </p>
        </div>
      </section>

      <section className={`mt-12 md:mt-20 ${p.cat === "Digital" ? "px-5 md:px-8" : ""}`} data-case-study-hero>
        <div className={`${p.cat === "Digital" ? "max-w-[1400px] mx-auto" : "w-full"} overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-ink/[0.03]`}>
          <ProjectPreview key={p.slug} project={p} detail />
        </div>
      </section>

      {/* Meta */}
      <section className="px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15 border border-ink/15">
          <div className="bg-surface p-5 md:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-3">Client</div>
            <div className="text-sm md:text-lg font-medium">{p.client}</div>
          </div>
          <div className="bg-surface p-5 md:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-3">{p.audience ? "Audience" : "Location"}</div>
            <div className="text-sm md:text-lg">{p.audience || p.location || "Worldwide"}</div>
          </div>
          <div className="bg-surface p-5 md:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-3">{p.duration ? "Role & Timeline" : "Role"}</div>
            <div className="text-sm md:text-lg">{p.role} {p.duration && <span className="text-ink/50 text-xs block mt-1">({p.duration})</span>}</div>
          </div>
          <div className="bg-surface p-5 md:p-8 flex flex-col justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-3">Status / Website</div>
            <div>
              {p.liveUrl ? (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-neon text-black px-4 py-2 font-semibold hover:bg-neon/80 transition-colors"
                >
                  Visit Live Site ↗
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink/60 border border-ink/20 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  {p.status || "In Development"}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-8 flex flex-wrap gap-2">
          {p.services.map((s) => (
            <span key={s} className="font-mono text-[10px] uppercase tracking-widest border border-ink/20 rounded-full px-4 py-2 hover:bg-neon hover:text-black hover:border-neon transition-colors">{s}</span>
          ))}
        </div>
      </section>

      {/* Overview + challenge */}
      <section className="px-5 md:px-8 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 md:gap-12">
          <h2 className="md:col-span-4 font-display uppercase text-4xl md:text-6xl tracking-tighter leading-[0.9]"><span className="block mb-5"><CraftIcon name="brief" /></span>The<br /><span className="text-stroke">Brief</span></h2>
          <div className="md:col-span-8 space-y-10">
            <p className="text-xl md:text-3xl font-light leading-snug">{p.summary}</p>
            <div className="border-l-2 border-neon pl-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-3">The challenge</div>
              <p className="text-ink/70 md:text-lg leading-relaxed">{p.challenge}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand scene */}
      {p.cat !== "Digital" && (
        <section className="px-5 md:px-8 pb-16 md:pb-24" aria-label="Brand in context">
          <BrandMockupTiles placement="intro" images={p.mockups} />
        </section>
      )}

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/15 border border-ink/15">
            {p.process.map((s, i) => (
              <div key={s.t} className="group bg-surface p-6 md:p-8 min-h-[260px] flex flex-col transition-colors duration-500 hover:bg-neon hover:text-black">
                <span className="font-display text-6xl md:text-7xl text-accent-ink group-hover:text-black transition-colors">0{i + 1}</span>
                <CraftIcon name={s.t} className="mb-5" />
                <h3 className="mt-auto font-display uppercase text-2xl md:text-3xl tracking-tight">{s.t}</h3>
                <p className="mt-3 text-sm text-ink/60 group-hover:text-black/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8">
        {p.processImage ? (
          <figure className="max-w-[1400px] mx-auto">
            <figcaption className="flex flex-wrap items-end justify-between gap-4 border-t border-ink/15 pt-6 mb-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-2">Behind the mark</p>
                <h3 className="font-display uppercase text-2xl md:text-4xl tracking-tight">From sketch to signature.</h3>
              </div>
            </figcaption>
            <img src={p.processImage} alt={`${p.title} logo development: original pencil sketch, refined vector outline and final black logo, shown side by side.`} width={1920} height={1200} loading="lazy" decoding="async" className="block w-full h-auto bg-white" />
          </figure>
        ) : (
        <figure className="max-w-[1400px] mx-auto">
          <div className="overflow-hidden aspect-[16/9]">
            <img src={g1.src} alt={g1.alt} width={1600} height={900} loading="lazy" decoding="async" className={`w-full h-full object-cover ${g1.caption ? "" : "scale-110"}`} data-parallax={g1.caption ? undefined : "0.06"} />
          </div>
          {g1.caption && <figcaption className="mt-4 text-sm leading-relaxed text-ink/60">{g1.caption}</figcaption>}
        </figure>
        )}
      </section>

      {/* Palette + type */}
      <section className="px-5 md:px-8 py-16 md:py-28">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50 mb-6"><span className="text-accent-ink">●</span> Colour system</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {p.palette.map((c) => (
                <div key={c.hex} className="group">
                  <div className="aspect-[3/4] border border-ink/15 transition-transform duration-500 group-hover:-translate-y-3" style={{ backgroundColor: c.hex }} />
                  <div className="mt-3 text-sm">{c.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ink/50">{c.hex}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 border border-ink/15 p-6 md:p-10 flex flex-col">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50 mb-6"><span className="text-accent-ink">●</span> Typography</div>
            <div className="font-display text-[clamp(5rem,14vw,9rem)] leading-none">Aa</div>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between border-b border-ink/15 pb-2"><span className="text-ink/50">Display</span><span>{p.type.display}</span></div>
              <div className="flex justify-between border-b border-ink/15 pb-2"><span className="text-ink/50">Body</span><span>{p.type.body}</span></div>
            </div>
            <p className="mt-6 font-mono text-xs break-all text-ink/40">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8">
        {p.cat !== "Digital" ? (
          <BrandMockupTiles placement="applications" images={p.mockups} />
        ) : (
        <figure className="max-w-[1400px] mx-auto">
          <div className="overflow-hidden aspect-[16/9]">
            <img src={g2.src} alt={g2.alt} width={1600} height={900} loading="lazy" decoding="async" className={`w-full h-full object-cover ${g2.caption ? "" : "transition-transform duration-1000 hover:scale-105"}`} />
          </div>
          {g2.caption && <figcaption className="mt-4 text-sm leading-relaxed text-ink/60">{g2.caption}</figcaption>}
        </figure>
        )}
      </section>

      {p.cat !== "Digital" && (
        <section className="mt-16 md:mt-28" aria-label="Full-width brand application">
          <BrandMockupTiles placement="full-width" images={p.mockups} />
        </section>
      )}

      {/* Results */}
      <section className="px-5 md:px-8 py-16 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-display uppercase text-5xl md:text-8xl tracking-tighter leading-[0.85] mb-12">The<br /><span className="text-stroke">{p.resultsHeading || "Impact"}</span></h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 border-t border-ink/15 pt-10">
            {p.results.map((r) => (
              <div key={r.v}>
                <div className="font-display text-5xl md:text-7xl tracking-tighter text-accent-ink">{r.k}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink/60">{r.v}</div>
              </div>
            ))}
          </div>
          {p.quote && <blockquote className="mt-20 md:mt-28 max-w-4xl">
            <span className="font-display text-7xl md:text-9xl text-accent-ink leading-none">“</span>
            <p className="text-2xl md:text-4xl font-light leading-tight -mt-6">{p.quote.text}</p>
            <footer className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-ink/50">— {p.quote.who}</footer>
          </blockquote>}
          <div className="mt-16"><ConsultButton label={p.resultsHeading === "Scope" ? "Have a similar project? Book a free 1-hour consult" : "Want results like this? Book a free 1-hour consult"} /></div>
        </div>
      </section>

      {/* Next */}
      <Link to="/work/$slug" params={{ slug: next.slug }} className="group relative block overflow-hidden border-t border-ink/15 px-5 md:px-8 py-16 md:py-24">
        <span className="absolute inset-0 bg-neon translate-y-full transition-transform duration-700 group-hover:translate-y-0" />
        <div className="relative max-w-[1400px] mx-auto group-hover:text-black transition-colors">
          <div className="font-mono text-xs uppercase tracking-[0.25em] mb-4 opacity-60">Next project →</div>
          <div className="font-display uppercase tracking-tighter leading-[0.85] text-[clamp(2.5rem,10vw,9rem)]">{next.title}</div>
        </div>
      </Link>
    </article>
  );
}
