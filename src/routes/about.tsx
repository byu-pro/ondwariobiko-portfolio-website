import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteFooter";
import { ConsultButton } from "@/components/ConsultButton";
import logoNeon from "@/assets/jo-logo-neon.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ondwariobiko | Logo & Brand Designer, 10 Years" },
      { name: "description", content: "Meet ondwariobiko: a hand-drawn logo and brand designer, UI/UX designer and front-end developer working remotely worldwide for over ten years." },
      { property: "og:title", content: "About ondwariobiko" },
      { property: "og:description", content: "A decade of hand-drawn logos, brand systems and interfaces — built remotely for clients worldwide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

/* ── data ───────────────────────────────────────────────── */
const pillars = [
  {
    n: "01",
    title: "Hand-drawn, not templated",
    body: "I draw letterforms and symbols manually with the pen tool rather than leaning on existing fonts. Every mark is genuinely custom — built from scratch for your brand alone, not assembled from someone else's shapes.",
  },
  {
    n: "02",
    title: "Designed and built by the same person",
    body: "When I also handle your website, there's no gap between what you approve in design and what actually ships in code. What you see in Figma is what your visitors see live — pixel for pixel.",
  },
  {
    n: "03",
    title: "No AI shortcuts",
    body: "In a market flooded with AI-generated logos, every concept I produce is drawn, considered and refined by hand. Built to hold up under real-world use — not just look good in a preview.",
  },
];

const markers = [
  ["10+", "Years in graphic & web design"],
  ["150+", "Brands launched worldwide"],
  ["4", "Continents served"],
  ["∞", "Ideas still in the tank"],
];

const platforms = [
  { name: "99designs", badge: "Top Rated" },
  { name: "Upwork", badge: "Active" },
  { name: "Fiverr", badge: "Active" },
  { name: "Behance", badge: "Featured" },
];

const tools = ["Figma", "Adobe XD", "Illustrator", "Photoshop", "Pen tool", "React", "CSS", "Framer"];

/* ── page ───────────────────────────────────────────────── */
function AboutPage() {
  return (
    <>
      <PageHero index="04" eyebrow="The designer" title="Designer" outline="Developer" />

      {/* 1 — Opening hook: philosophy, not a bio dump */}
      <section className="px-5 md:px-8 pt-16 md:pt-28 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon mb-8">⟶ The philosophy</p>
          <h2 className="font-display font-black text-[8vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight max-w-[16ch]">
            Every logo I draw starts with a <span className="text-neon">pencil</span>, not a font.
          </h2>
          <p className="mt-10 max-w-[52ch] text-lg sm:text-xl text-white/70 leading-relaxed">
            For over ten years I've built brand identities and websites for clients around the world — combining
            hand-drawn craftsmanship with the technical precision of a front-end developer. No templates, no
            generators, no shortcuts. Just marks made deliberately, built to last.
          </p>
        </div>
      </section>

      {/* 2 + 7 — Who I am, with photo */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* photo placeholder — replace with a real portrait */}
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] bg-neutral-900 border border-white/10 overflow-hidden group">
              <div className="absolute inset-0 grid place-items-center">
                <img
                  src={logoNeon.url}
                  alt="ondwariobiko monogram"
                  width={280}
                  height={280}
                  className="w-2/5 object-contain opacity-80 transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-neon/20" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                  ⟶ Real photo goes here
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon mb-6">⟶ Who I am</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug">
              I'm <span className="text-neon">ondwariobiko</span> — a graphic and web designer based in Kenya,
              working with clients internationally. I specialise in flat vector logo design, mascot illustration
              and full brand identity systems.
            </p>
          </div>
        </div>
      </section>

      {/* The dual-discipline line — the differentiator, said plainly */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto border-t border-white/15 pt-12">
          <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug max-w-[40ch]">
            Unlike most brand designers, I also{" "}
            <span className="text-neon font-display font-black">design and build</span> the websites that bring
            those brands to life — across Figma and XD for design, and front-end development for the build.
          </p>
        </div>
      </section>

      {/* 3 — What makes the work different: craft pillars */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon mb-10">⟶ What makes it different</p>
          <div className="grid md:grid-cols-3 gap-px bg-white/15 border border-white/15">
            {pillars.map((p) => (
              <div
                key={p.n}
                className="group bg-black p-8 md:p-10 min-h-[280px] flex flex-col transition-colors hover:bg-neon hover:text-black"
              >
                <span className="font-display text-5xl text-neon group-hover:text-black transition-colors mb-6">
                  {p.n}
                </span>
                <h3 className="font-display font-bold text-xl mb-4 leading-tight">{p.title}</h3>
                <p className="text-sm text-white/60 group-hover:text-black/80 leading-relaxed transition-colors">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Experience / credibility markers + platform badges */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon mb-10">⟶ Track record</p>

          {/* stat band */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 border-y border-white/15 py-12">
            {markers.map(([n, l]) => (
              <div key={l}>
                <div className="font-display font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter text-neon">
                  {n}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest mt-3 text-white/50">{l}</div>
              </div>
            ))}
          </div>

          {/* platform badges */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {platforms.map((pl) => (
              <div
                key={pl.name}
                className="border border-white/15 p-6 flex items-center justify-between hover:border-neon transition-colors"
              >
                <span className="font-display font-bold text-lg">{pl.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neon border border-neon/40 px-2 py-1 rounded-full">
                  {pl.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Process teaser */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto border-l-2 border-neon pl-8 md:pl-12">
          <p className="text-xl sm:text-2xl md:text-3xl font-light leading-snug max-w-[48ch]">
            I approach every project the same way — understanding the brief deeply, sketching multiple directions
            by hand, and refining until the result feels{" "}
            <span className="text-neon font-display font-black">inevitable</span>, not arbitrary.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 mt-8 font-mono text-xs uppercase tracking-[0.2em] text-neon hover:gap-4 transition-all"
          >
            See my process ⟶
          </Link>
        </div>
      </section>

      {/* tools strip */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6">⟶ Tools of the trade</p>
          <div className="flex flex-wrap gap-3">
            {tools.map((t) => (
              <span
                key={t}
                className="font-mono text-sm border border-white/15 px-4 py-2 rounded-full text-white/70 hover:border-neon hover:text-neon transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Personal touch */}
      <section className="px-5 md:px-8 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon mb-6">⟶ On the detail</p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-light italic leading-snug max-w-[44ch] text-white/80">
            "I care about getting the details right — for me, a good brand isn't just something that looks good,
            it's something that works hard for the business behind it."
          </p>
        </div>
      </section>

      {/* 8 — Closing CTA */}
      <section className="px-5 md:px-8 pb-28 md:pb-40">
        <div className="max-w-[1400px] mx-auto border-t border-white/15 pt-16 text-center">
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight">
            Have a project<br />
            in <span className="text-neon">mind?</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-neon text-black font-mono text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:gap-4 transition-all"
            >
              Let's talk ⟶
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-white/25 text-white font-mono text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:border-neon hover:text-neon transition-all"
            >
              See services
            </Link>
          </div>
        </div>
      </section>

      <ConsultButton />
    </>
  );
}
