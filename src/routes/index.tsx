import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoBlack from "@/assets/jo-logo-black.png.asset.json";
import logoWhite from "@/assets/jo-logo-white.png.asset.json";
import logoNeon from "@/assets/jo-logo-neon.png.asset.json";
import { heroImage, projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ondwariobiko — Creative Director & Brand Designer | Remote Worldwide" },
      { name: "description", content: "ondwariobiko is a designer working remotely worldwide, crafting premium logos, brand identities, UI/UX and front-end experiences. 10 years of practice." },
      { property: "og:title", content: "ondwariobiko — Creative Director & Brand Designer" },
      { property: "og:description", content: "Designer working remotely worldwide, crafting premium brand identities and digital experiences." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 px-5 md:px-8 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-6">
            <span className="text-neon">●</span> Logo · Brand · UI/UX · Front-end — Est. 2016
          </div>
          <h1 className="font-display text-[clamp(2.5rem,13.5vw,14rem)] leading-[0.85] tracking-tighter uppercase mb-10 md:mb-12 break-words">
            <RotatingWord /> <br />
            <span className="text-stroke">Designer</span>
            <span className="text-neon inline-block animate-[spin-slow_8s_linear_infinite]">*</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-10 md:gap-12 md:items-end">
            <div className="md:w-1/2">
              <p className="text-xl sm:text-2xl md:text-3xl font-light leading-tight max-w-xl mb-8">
                Custom brand identities and websites for <span className="text-neon">ambitious founders</span> — designed and built by one pair of hands, remotely worldwide.
              </p>
              <Link to="/work" className="inline-flex items-center gap-4 group">
                <span className="size-14 rounded-full bg-neon text-black grid place-items-center transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">↗</span>
                <span className="font-mono text-xs uppercase tracking-[0.25em] group-hover:text-neon transition-colors">See the work</span>
              </Link>
            </div>
            <div className="md:w-1/2 w-full aspect-[4/5] overflow-hidden"><img src={heroImage} alt="Premium textured business cards with lime edges and JO monogram" width={800} height={1008} fetchPriority="high" decoding="async" className="w-full h-full object-cover scale-110" data-parallax="-0.08" /></div>
          </div>
        </div>
      </section>

      <div className="bg-neon text-black py-5 overflow-hidden -rotate-2 my-10 md:my-16 scale-105">
        <div className="flex w-max animate-marquee font-display uppercase text-2xl sm:text-3xl md:text-4xl tracking-tight whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex">
              {["Bold Logos", "Brand Systems", "Interfaces", "Typography", "Remote Worldwide"].map((w) => (
                <span key={w} className="px-10">{w} ✺</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-1">
          {[
            { src: logoBlack.url, bg: "bg-white", label: "Primary", c: "text-black/50" },
            { src: logoWhite.url, bg: "bg-black border border-white/10", label: "Inverse", c: "text-white/50" },
            { src: logoNeon.url, bg: "bg-neon", label: "Signature Lime", c: "text-black/50" },
          ].map((l) => (
            <div key={l.label} className={`group aspect-square ${l.bg} flex flex-col items-center justify-center`}>
              <img src={l.src} alt={`JO monogram — ${l.label}`} width={160} height={160} className="w-24 h-24 md:w-40 md:h-40 object-contain animate-float transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12" />
              <span className={`mt-8 font-mono text-[10px] uppercase tracking-widest ${l.c}`}>{l.label} Monogram</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-12 md:mb-16 gap-6 flex-wrap">
            <h2 className="font-display text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-[0.85]">Featured<br /><span className="text-stroke">Work</span></h2>
            <Link to="/work" className="font-mono text-xs uppercase tracking-[0.25em] hover:text-neon">All projects →</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {projects.slice(0, 4).map((p, i) => (
              <Link to="/work/$slug" params={{ slug: p.slug }} key={p.title} className={`group ${i % 2 ? "md:mt-40" : ""}`}>
                <div className="overflow-hidden mb-6">
                  <img src={p.image} alt={p.alt} width={1200} height={1500} loading="lazy" decoding="async" className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex justify-between">
                  <h3 className="font-display text-2xl sm:text-3xl uppercase group-hover:text-neon transition-colors">{p.title}</h3>
                  <span className="font-mono text-xs">{p.year}</span>
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-white/50 mt-2">{p.tag}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Client logos — auto-scrolling carousel */}
      <section className="py-16 md:py-24 border-y border-white/10 overflow-hidden" data-reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 text-center mb-10 px-5">
          Trusted by ambitious brands <span className="text-neon">✺</span> 10+ countries
        </p>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-black to-transparent z-10" />
          <div className="flex w-max animate-marquee-slow pause-on-hover items-center">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex items-center">
                {clients.map((c) => (
                  <span
                    key={c.name}
                    className={`mx-8 md:mx-14 whitespace-nowrap text-white/35 hover:text-neon transition-colors duration-500 ${c.style}`}
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — auto-scrolling */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 mb-12 md:mb-16" data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-4">Word on the street</p>
          <h2 className="font-display text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-[0.85]">
            Clients<br /><span className="text-stroke">Talk</span>
          </h2>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-black to-transparent z-10" />
          <div className="flex w-max animate-marquee-slow pause-on-hover">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex">
                {testimonials.map((t) => (
                  <figure
                    key={t.name}
                    className="w-[320px] sm:w-[420px] shrink-0 mx-3 border border-white/10 p-8 flex flex-col gap-6 hover:border-neon/60 hover:bg-white/[0.02] transition-colors duration-500"
                  >
                    <span className="font-display text-5xl text-neon leading-none select-none">“</span>
                    <blockquote className="text-base md:text-lg font-light leading-snug flex-1">{t.quote}</blockquote>
                    <div className="border-t border-white/10 pt-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon mb-2">{t.result}</p>
                      <figcaption>
                        <p className="font-display uppercase tracking-tight text-sm">{t.name}</p>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-1">{t.role}</p>
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32 px-5 md:px-8 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 md:mb-16" data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-4">How it works</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-[0.85]">
              The<br /><span className="text-stroke">Process</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
            {process.map((p, i) => (
              <div
                key={p.n}
                data-reveal
                style={{ transitionDelay: `${i * 100}ms` }}
                className="group relative border border-white/10 p-8 hover:border-neon/60 transition-colors duration-500"
              >
                <span className="font-display text-6xl md:text-7xl text-stroke group-hover:text-neon group-hover:[-webkit-text-stroke:0] transition-all duration-500">{p.n}</span>
                <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight mt-6 mb-3">{p.t}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-24 md:py-32 px-5 md:px-8 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 items-end" data-reveal>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
            Ten years of craft.<br /><span className="text-stroke">Zero templates.</span>
          </h2>
          <div>
            <p className="text-lg md:text-xl font-light leading-relaxed text-white/70 mb-8">
              I'm a designer and front-end developer with 10 years of practice — every identity is drawn by hand and built in vector, every website coded by the same person who designed it. No templates, no AI shortcuts, no handoff losses.
            </p>
            <Link to="/about" className="font-mono text-xs uppercase tracking-[0.25em] text-neon hover:text-white transition-colors">More about me →</Link>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="py-24 md:py-32 px-5 md:px-8 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-12 md:mb-16 gap-6 flex-wrap" data-reveal>
            <h2 className="font-display text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-[0.85]">What I<br /><span className="text-stroke">Offer</span></h2>
            <Link to="/services" className="font-mono text-xs uppercase tracking-[0.25em] hover:text-neon">Full services →</Link>
          </div>
          <div>
            {offerings.map((o, i) => (
              <Link
                to="/services"
                key={o.t}
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 border-t border-white/10 last:border-b hover:bg-white/[0.02] transition-colors duration-300 px-2 md:px-6"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-xs text-neon">0{i + 1}</span>
                  <h3 className="font-display text-2xl sm:text-3xl md:text-5xl uppercase tracking-tight group-hover:text-neon transition-colors duration-300">{o.t}</h3>
                </div>
                <p className="text-sm text-white/50 max-w-sm md:text-right">{o.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Results highlight */}
      <section className="py-24 md:py-32 px-5 md:px-8 border-t border-white/10 bg-neon text-black">
        <div className="max-w-[1400px] mx-auto" data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] mb-8">The result that matters</p>
          <blockquote className="font-display text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.95] max-w-5xl">
            "Helped launch a fintech brand now serving customers in <span className="text-stroke-black">12 countries</span>."
          </blockquote>
          <p className="font-mono text-xs uppercase tracking-widest mt-8 text-black/60">Amara N. — CEO, Aura Finance</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 px-5 md:px-8 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-4">Before you ask</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-[0.85]">
              Frequent<br /><span className="text-stroke">Questions</span>
            </h2>
            <p className="mt-6 text-white/50 max-w-sm leading-relaxed">
              Still curious? Book a free 1-hour consultation and ask me anything — no strings attached.
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-3 mt-8 bg-neon text-black font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 hover:bg-white transition-colors duration-300"
            >
              Free 1-hr consult ↗
            </Link>
          </div>
          <div data-reveal>
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-white/10">
                <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none font-display text-lg md:text-xl uppercase tracking-tight hover:text-neon transition-colors duration-300 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="font-mono text-neon text-2xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 text-white/50 leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — short brief form */}
      <section className="py-24 md:py-32 px-5 md:px-8 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-4">Start a project</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-[0.85]">
              Tell me<br /><span className="text-stroke">The Brief</span>
            </h2>
            <p className="mt-6 text-white/50 max-w-sm leading-relaxed">
              Three quick answers — that's all it takes to start the conversation. I'll reply within 24 hours.
            </p>
          </div>
          <BriefForm />
        </div>
      </section>
    </>
  );
}

const offerings = [
  { t: "Logo Design", d: "Hand-drawn, vector-crafted marks built to outlive trends — full logo suite included." },
  { t: "Brand Identity System", d: "Colour, type, voice and guidelines — a complete world your brand can grow into." },
  { t: "Web Design & Build", d: "Designed and developed by the same hands. Fast, responsive, unmistakably yours." },
  { t: "UI/UX Design", d: "Interfaces that feel inevitable — research-backed, prototype-tested, pixel-obsessed." },
];

function BriefForm() {
  const [type, setType] = useState("Brand Identity");
  const [budget, setBudget] = useState("$1k – $3k");
  const [timeline, setTimeline] = useState("Flexible — let's discuss");
  const send = () => {
    const msg = encodeURIComponent(`Hi! I'd like to discuss a project.\n\n• Project: ${type}\n• Budget: ${budget}\n• Start: ${timeline}`);
    window.open(`https://wa.me/254702255575?text=${msg}`, "_blank");
  };
  const selectCls = "w-full bg-transparent border border-white/15 px-5 py-4 font-mono text-sm uppercase tracking-widest text-white focus:border-neon outline-none transition-colors appearance-none cursor-pointer hover:border-white/40 [&>option]:bg-black";
  return (
    <div className="flex flex-col gap-6" data-reveal>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Project type</span>
        <select value={type} onChange={(e) => setType(e.target.value)} className={selectCls}>
          {["Logo Design", "Brand Identity", "Web Design & Build", "UI/UX Design", "Something else"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Budget range</span>
        <select value={budget} onChange={(e) => setBudget(e.target.value)} className={selectCls}>
          {["Under $1k", "$1k – $3k", "$3k – $10k", "$10k+"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">When would you like to start?</span>
        <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className={selectCls}>
          {["As soon as possible", "In the coming weeks", "In the next few months", "Flexible — let's discuss"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <button onClick={send} className="mt-2 bg-neon text-black font-mono text-xs uppercase tracking-[0.2em] px-8 py-5 hover:bg-white transition-colors duration-300 cursor-pointer">
        Send via WhatsApp ↗
      </button>
    </div>
  );
}

const process = [
  { n: "01", t: "Discover", d: "A deep-dive call into your business, audience and ambitions. We define what success actually looks like before a single pixel moves." },
  { n: "02", t: "Design", d: "Concepts, directions and iterations — presented with rationale, never guesswork. You see the thinking behind every choice." },
  { n: "03", t: "Build", d: "For web projects I design and develop in the same breath — no handoff losses, no 'that's not what we designed'." },
  { n: "04", t: "Launch", d: "Files, guidelines, support. You leave with a brand or site you can actually use — and a partner on call after." },
];

const faqs = [
  { q: "How much does a project cost?", a: "There's no fixed price list — every project is quoted individually around its scope, your goals and your budget. We discuss it together (the first hour is free), and you approve a clear quote before anything starts. No surprises." },
  { q: "How long does a typical project take?", a: "There's no fixed timeline — it depends on the scope and what we agree together. After our first conversation I'll give you an honest estimate, and we'll set milestones that work for both of us." },
  { q: "Do you work with clients outside Africa?", a: "Absolutely — I work remotely with clients worldwide across every timezone. Most of my collaborations happen entirely over calls and shared boards, and it works beautifully." },
  { q: "What do I actually receive at the end?", a: "For branding: full logo suites, colour and type systems, brand guidelines and all source files. For web: a live, fast, responsive website plus handover documentation. You own everything." },
  { q: "Can you redesign my existing brand or website?", a: "Yes — rebrands and redesigns are some of my favourite briefs. I'll audit what you have, keep what's working, and rebuild what isn't." },
  { q: "What if I'm not sure what I need yet?", a: "That's exactly what the free 1-hour consultation is for. We'll talk through your goals and I'll tell you honestly what I'd recommend — even if that means starting smaller." },
];

const clients = [
  { name: "AURA FINANCE", style: "font-display text-2xl md:text-4xl uppercase tracking-tight" },
  { name: "mara·sands", style: "font-mono text-2xl md:text-3xl lowercase tracking-widest" },
  { name: "KILELE", style: "font-display text-2xl md:text-4xl uppercase italic" },
  { name: "savanna/os", style: "font-mono text-2xl md:text-3xl" },
  { name: "NAIROBI°LAB", style: "font-display text-2xl md:text-4xl uppercase tracking-[0.2em]" },
  { name: "JUMUIYA", style: "font-display text-2xl md:text-4xl uppercase" },
  { name: "baobab&co", style: "font-mono text-2xl md:text-3xl lowercase" },
  { name: "ZURI STUDIO", style: "font-display text-2xl md:text-4xl uppercase tracking-tighter" },
];

const testimonials = [
  {
    quote: "He didn't just design a logo — he rebuilt how we see ourselves. Investors noticed before our customers did.",
    result: "+38% investor meetings after rebrand",
    name: "Amara N.",
    role: "CEO, Aura Finance",
  },
  {
    quote: "The identity system works everywhere: a coffee bag, a billboard, an app icon. Nothing ever looks off-brand.",
    result: "3 new retail partnerships in 6 months",
    name: "David K.",
    role: "Founder, Kilele Coffee",
  },
  {
    quote: "Design and code from one brain. Our site shipped faster than our last agency's first draft.",
    result: "2.1× conversion on the new platform",
    name: "Lena M.",
    role: "Product Lead, Savanna OS",
  },
];

const words = ["Creative", "Logo", "Brand", "Visual", "UI/UX", "Digital", "Web", "Art"];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden align-bottom h-[0.9em] min-w-[5ch]">
      <span key={words[i]} className="block animate-rise text-neon">
        {words[i]}
      </span>
    </span>
  );
}
