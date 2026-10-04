import { seoHead } from "@/lib/seo";
import { LogoShowcase } from "@/components/LogoShowcase";
import { ProjectPreview } from "@/components/ProjectPreview";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { projects } from "@/lib/projects";
import { BudgetField } from "@/components/BudgetField";

export const Route = createFileRoute("/")({
  head: () =>
    seoHead(
      "",
      "John Obiko | Freelance Graphic Designer, Logo Designer & Brand Specialist",
      "Independent graphic designer & custom logo designer John Obiko crafts concept-driven brand identities, vector mascot illustrations, and websites for clients worldwide.",
      "assets/pelicansocial_thumbnail.webp",
      [],
      "graphic designer, logo designer, brand designer, freelance graphic designer, custom logo design, brand identity designer, visual designer"
    ),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 px-5 md:px-8 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
            <span className="text-accent-ink">●</span> Logo · Brand · UI/UX · Front-end — Est. 2016
          </div>
          <h1 className="font-display text-[clamp(2.5rem,13.5vw,14rem)] leading-[0.85] tracking-tighter uppercase mb-10 md:mb-12 break-words">
            <RotatingWord /> <br />
            <span className="text-stroke">Designer</span>
            <span className="text-accent-ink inline-block animate-[spin-slow_8s_linear_infinite]">*</span>
          </h1>
          <div className="flex flex-col gap-16 md:gap-24">
            <LogoShowcase className="logo-gallery--full-width" />
            <div>
              <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight leading-[1.05] max-w-4xl mb-8">
                Graphic design, custom logos and brand identities for <span className="text-accent-ink">businesses ready for their next chapter</span>. Work directly with John Obiko, a freelance graphic and brand designer in Nairobi serving clients worldwide, from first conversation to final delivery.
              </p>
              <Link to="/work" className="inline-flex items-center gap-4 group">
                <span className="size-14 rounded-full bg-neon text-black grid place-items-center transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">↗</span>
                <span className="font-mono text-xs uppercase tracking-[0.25em] group-hover:text-accent-ink transition-colors">See the work</span>
              </Link>
            </div>
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

      <section className="py-24 px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-12 md:mb-16 gap-6 flex-wrap">
            <h2 className="font-display text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-[0.85]">Featured<br /><span className="text-stroke">Work</span></h2>
            <Link to="/work" className="font-mono text-xs uppercase tracking-[0.25em] hover:text-accent-ink">All projects →</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {projects.slice(0, 4).map((p, i) => (
              <Link to="/work/$slug" params={{ slug: p.slug }} key={p.title} className={`group ${i % 2 ? "md:mt-40" : ""}`}>
                <div className="overflow-hidden rounded-xl mb-6">
                  <ProjectPreview project={p} />
                </div>
                <div className="flex justify-between">
                  <h3 className="font-display text-2xl sm:text-3xl uppercase group-hover:text-accent-ink transition-colors">{p.title}</h3>

                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mt-2">{p.tag}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="py-16 md:py-24 px-5 md:px-8 border-y border-ink/10" aria-labelledby="trusted-brands-heading">
        <div className="max-w-[1400px] mx-auto">
          <h2 id="trusted-brands-heading" className="font-mono text-xs uppercase tracking-[0.3em] text-ink/60 text-center mb-10 md:mb-14">
            Worked with Brands and Institutions worldwide
          </h2>
          <div className="brand-loop">
            <div className="brand-loop__track">
              {[0, 1].map((copy) => (
                <ul key={copy} className="brand-loop__group" aria-hidden={copy === 1 ? true : undefined}>
                  {clients.map((client) => (
                    <li key={client.src} className="brand-loop__item" title={client.name}>
                      <img src={client.src} alt={copy === 0 ? client.name : ""} width={160} height={80} loading="lazy" decoding="async" className="client-logo" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — auto-scrolling */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 mb-12 md:mb-16" data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-ink mb-4">Word on the street</p>
          <h2 className="font-display text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-[0.85]">
            Clients<br /><span className="text-stroke">Talk</span>
          </h2>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-surface to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-surface to-transparent z-10" />
          <div className="flex w-max animate-marquee-slow pause-on-hover">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex">
                {testimonials.map((t) => (
                  <figure
                    key={t.name}
                    className="w-[calc(100vw-40px)] max-w-[320px] sm:w-[420px] sm:max-w-none shrink-0 mx-2 sm:mx-3 border border-ink/10 p-6 sm:p-8 flex flex-col gap-6 hover:border-neon/60 hover:bg-ink/[0.02] transition-colors duration-500"
                  >
                    <span className="font-display text-5xl text-accent-ink leading-none select-none">“</span>
                    <blockquote className="text-base md:text-lg font-light leading-snug flex-1">{t.quote}</blockquote>
                    <div className="border-t border-ink/10 pt-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-2">{t.result}</p>
                      <figcaption>
                        <p className="font-display uppercase tracking-tight text-sm">{t.name}</p>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mt-1">{t.role}</p>
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>



      </section>
      <section className="py-24 md:py-32 px-5 md:px-8 border-t border-ink/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 md:mb-16" data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-ink mb-4">How it works</p>
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
                className="group relative border border-ink/10 p-8 hover:border-neon/60 transition-colors duration-500"
              >
                <span className="font-display text-6xl md:text-7xl text-stroke group-hover:text-accent-ink group-hover:[-webkit-text-stroke:0] transition-all duration-500">{p.n}</span>

                <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight mt-6 mb-3">{p.t}</h3>
                <p className="text-sm text-ink/50 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-24 md:py-32 px-5 md:px-8 border-t border-ink/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 items-end" data-reveal>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
            Ten years of craft.<br /><span className="text-stroke">Zero templates.</span>
          </h2>
          <div>
            <p className="text-lg md:text-xl font-light leading-relaxed text-ink/70 mb-8">
              I'm a brand designer and front-end developer with 10 years of practice. I connect the identity your customers recognise with the website they use — with one person responsible for the design from concept to delivery.
            </p>
            <Link to="/about" className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink hover:text-ink transition-colors">More about me →</Link>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="py-24 md:py-32 px-5 md:px-8 border-t border-ink/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-12 md:mb-16 gap-6 flex-wrap" data-reveal>
            <h2 className="font-display text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-[0.85]">What I<br /><span className="text-stroke">Offer</span></h2>
            <Link to="/services" className="font-mono text-xs uppercase tracking-[0.25em] hover:text-accent-ink">Full services →</Link>
          </div>
          <div>
            {offerings.map((o, i) => (
              <Link
                to="/services"
                key={o.t}
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 border-t border-ink/10 last:border-b hover:bg-ink/[0.02] transition-colors duration-300 px-2 md:px-6"
              >
                <div className="flex items-baseline gap-6">

                  <h3 className="font-display text-2xl sm:text-3xl md:text-5xl uppercase tracking-tight group-hover:text-accent-ink transition-colors duration-300">{o.t}</h3>
                </div>
                <p className="text-sm text-ink/50 max-w-sm md:text-right">{o.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Results highlight */}
      <section className="py-24 md:py-32 px-5 md:px-8 border-t border-ink/10 bg-neon text-black">
        <div className="max-w-[1400px] mx-auto" data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] mb-8">The result that matters</p>
          <blockquote className="font-display text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.95] max-w-5xl">
            "Helped launch a fintech brand now serving customers in <span className="text-stroke-black">12 countries</span>."
          </blockquote>
          <Link to="/work" className="inline-block font-mono text-xs uppercase tracking-widest mt-8 text-black/60 hover:text-black transition-colors">Explore selected work →</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 px-5 md:px-8 border-t border-ink/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-ink mb-4">Before you ask</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-[0.85]">
              Frequent<br /><span className="text-stroke">Questions</span>
            </h2>
            <p className="mt-6 text-ink/50 max-w-sm leading-relaxed">
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
              <details key={f.q} className="group border-b border-ink/10">
                <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none font-display text-lg md:text-xl uppercase tracking-tight hover:text-accent-ink transition-colors duration-300 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="font-mono text-accent-ink text-2xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 text-ink/50 leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — short brief form */}
      <section className="py-24 md:py-32 px-5 md:px-8 border-t border-ink/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-ink mb-4">Start a project</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-[0.85]">
              Tell me<br /><span className="text-stroke">The Brief</span>
            </h2>
            <p className="mt-6 text-ink/50 max-w-sm leading-relaxed">
              Three quick answers to start the conversation. I'll reply within 24–48 hours.
            </p>
          </div>
          <BriefForm />
        </div>
      </section>
    </>
  );
}

const offerings = [
  { t: "Custom Design Work", d: "Bespoke artwork, campaign graphics and design solutions tailored to your brief." },
  { t: "Logo Design", d: "Hand-drawn, vector-crafted marks built to outlive trends — full logo suite included." },
  { t: "Brand Identity System", d: "Colour, type, voice and guidelines — a complete world your brand can grow into." },
  { t: "Web Design & Build", d: "Designed and developed by the same hands. Fast, responsive, unmistakably yours." },
  { t: "UI/UX Design", d: "Interfaces that feel inevitable — research-backed, prototype-tested, pixel-obsessed." },
];

function BriefForm() {
  const [type, setType] = useState("Brand Identity");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("Flexible — let's discuss");
  const send = () => {
    const msg = encodeURIComponent(`Hi! I'd like to discuss a project.\n\n• Project: ${type}\n• Budget: ${budget || "To be discussed"}\n• Start: ${timeline}`);
    window.open(`https://wa.me/254702255575?text=${msg}`, "_blank", "noopener,noreferrer");
  };
  const selectCls = "w-full bg-transparent border border-ink/15 px-5 py-4 font-mono text-sm uppercase tracking-widest text-ink focus:border-neon outline-none transition-colors appearance-none cursor-pointer hover:border-ink/40 [&>option]:bg-surface";
  return (
    <div className="flex flex-col gap-6" data-reveal>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">Project type</span>
        <select value={type} onChange={(e) => setType(e.target.value)} className={selectCls}>
          {["Logo Design", "Brand Identity", "Web Design & Build", "UI/UX Design", "Custom Design Work", "Something else"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <BudgetField value={budget} onChange={setBudget} />
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">When would you like to start?</span>
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
  { q: "Do you do logos only, or websites too?", a: "Both. I design brand identities and I also design and code the websites that carry them — so your brand and your site come from the same hands and feel like one thing." },
  { q: "Can you redesign my existing brand or website?", a: "Yes — rebrands and redesigns are some of my favourite briefs. I'll audit what you have, keep what's working, and rebuild what isn't." },
  { q: "How do we communicate during a project?", a: "Email is the main line for briefs, files and approvals. For calls and video walkthroughs we hop on WhatsApp — whatever timezone you're in." },
  { q: "What if I'm not sure what I need yet?", a: "That's exactly what the free 1-hour consultation is for. We'll talk through your goals and I'll tell you honestly what I'd recommend — even if that means starting smaller." },
];

const clients = [
  { name: "The Church of Jesus Christ of Latter-day Saints", src: `${import.meta.env.BASE_URL}assets/The%20Church%20of%20Jesus%20Christ%20Logo.webp`, width: 2172, height: 724 },
  { name: "Bosch", src: `${import.meta.env.BASE_URL}assets/bosch.webp`, width: 2171, height: 724 },
  { name: "PropertyGuru", src: `${import.meta.env.BASE_URL}assets/propertyguru.webp`, width: 2172, height: 724 },
  { name: "99.co", src: `${import.meta.env.BASE_URL}assets/99co.webp`, width: 2170, height: 725 },
  { name: "Far East Organization", src: `${import.meta.env.BASE_URL}assets/fareast.webp`, width: 2172, height: 724 },
  { name: "EdgeProp", src: `${import.meta.env.BASE_URL}assets/edgeprop.webp`, width: 2172, height: 724 },
  { name: "Holland Village Residences", src: `${import.meta.env.BASE_URL}assets/hollandvillage.webp`, width: 1925, height: 817 },
  { name: "Ritter Sport", src: `${import.meta.env.BASE_URL}assets/rittersport.webp`, width: 1536, height: 1024 },
  { name: "Aquapet", src: `${import.meta.env.BASE_URL}assets/aquapet.webp`, width: 1448, height: 1086 },
  { name: "Beyond the Image", src: `${import.meta.env.BASE_URL}assets/beyondtheimage.webp`, width: 1448, height: 1086 },
  { name: "Fast Kat Connects", src: `${import.meta.env.BASE_URL}assets/fastkatconnect.webp`, width: 1254, height: 1254 },
  { name: "hi! hoteles", src: `${import.meta.env.BASE_URL}assets/hihoteles.webp`, width: 1536, height: 1024 },
  { name: "Legibra", src: `${import.meta.env.BASE_URL}assets/legibra.webp`, width: 2172, height: 724 },
  { name: "Ocean-Line Freight Forwarders", src: `${import.meta.env.BASE_URL}assets/oceanline.webp`, width: 2172, height: 724 },
  { name: "Paluxy River Potties", src: `${import.meta.env.BASE_URL}assets/paluxyriver.webp`, width: 1536, height: 1024 },
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
      <span key={words[i]} className="block animate-rise text-accent-ink">
        {words[i]}
      </span>
    </span>
  );
}
