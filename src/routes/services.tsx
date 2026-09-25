import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteFooter";
import { ConsultButton } from "@/components/ConsultButton";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — ondwariobiko | Logo, Branding, UI/UX, Front-end" },
      { name: "description", content: "Logo systems, brand identity packages, mascot design and front-end builds from ondwariobiko. Clear scope, individually quoted, working remotely worldwide." },
      { property: "og:title", content: "Services — ondwariobiko" },
      { property: "og:description", content: "Logo systems, brand identity packages, mascot design and front-end builds. Clear scope, quoted around your project and budget." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

/* ---------- data ---------- */

const packages = [
  {
    n: "01",
    t: "Logo System",
    blurb: "Not just a mark — a proper system. Primary, secondary, icon and favicon versions, built to hold up at 16px and on a billboard.",
    includes: [
      "3 initial concepts, hand-drawn then vector",
      "2 rounds of revisions",
      "Primary, secondary & icon/favicon versions",
      "AI, EPS, SVG, PNG + PDF mini-guide",
    ],
    turnaround: "2–3 weeks",
    ideal: "Best for startups launching their first brand",
  },
  {
    n: "02",
    t: "Brand Identity Package",
    blurb: "The full world your brand grows into — logo system plus colour, typography, voice and the rules that hold it all together.",
    includes: [
      "Everything in the Logo System",
      "Colour palette + typography system",
      "Visual language & art direction",
      "30–40 page brand guidelines PDF",
    ],
    turnaround: "4–6 weeks",
    ideal: "Best for established businesses rebranding",
  },
  {
    n: "03",
    t: "Mascot Design",
    blurb: "A signature character — a specialty of mine, not a generic illustration line. Built as a flexible system with expressions and poses.",
    includes: [
      "2 character concept directions",
      "2 revision rounds",
      "3 pose / expression variations",
      "AI, EPS, SVG, PNG delivery",
    ],
    turnaround: "3–4 weeks",
    ideal: "Best for brands wanting a memorable personality",
  },
  {
    n: "04",
    t: "Web Design & Build",
    blurb: "Designed and developed by the same hands — no handoff losses. Fast, responsive, with motion and performance baked in.",
    includes: [
      "Custom design, no templates",
      "Up to 5 pages",
      "Responsive build + animations",
      "1 round of post-launch tweaks",
    ],
    turnaround: "4–8 weeks",
    ideal: "Best for founders who want one person owning it all",
  },
  {
    n: "05",
    t: "Brand Guidelines",
    blurb: "The full usage rulebook for clients who already have a logo but need the system documented so any team can apply it correctly.",
    includes: [
      "Logo usage, spacing & misuse",
      "Colour, type & imagery rules",
      "Application examples",
      "30–50 page PDF guide",
    ],
    turnaround: "2–3 weeks",
    ideal: "Best for teams scaling beyond the founder",
  },
  {
    n: "06",
    t: "Packaging & Collateral",
    blurb: "Labels, boxes, business cards, stationery — identity work extended into the physical world and the files your printer needs.",
    includes: [
      "Up to 5 collateral pieces",
      "Print-ready, dieline-aware files",
      "2 revision rounds",
      "Source + PDF delivery",
    ],
    turnaround: "2–4 weeks",
    ideal: "Best for product brands ready to ship",
  },
];

const addons = [
  "Business Card Design",
  "Social Media Kit",
  "Packaging Mockups",
  "Stationery Suite",
  "Favicon & App Icon Set",
  "Pitch Deck Template",
];

const serviceFaqs = [
  {
    q: "How long does a project take?",
    a: "Logo systems land in 2–3 weeks, full brand identities in 4–6 weeks, and websites in 4–8 weeks depending on scope. You'll get a fixed timeline in your quote before we start.",
  },
  {
    q: "How much does a project cost?",
    a: "Every project is scoped and quoted individually — no fixed price lists. We discuss your goals, scope and budget, and I put together a quote that fits what your brand actually needs. You approve everything before we start.",
  },
  {
    q: "How many revisions are included?",
    a: "Every package includes 2 rounds of revisions. If we need more, we agree on it together upfront — so scope creep never sneaks up on you.",
  },
  {
    q: "Do you offer rush delivery?",
    a: "Yes, when my schedule allows. Let me know your deadline and I'll confirm exactly what's possible before you commit to anything.",
  },
  {
    q: "What if I don't like any of the concepts?",
    a: "I present concepts with full rationale and we refine from there. If after the first round we're genuinely not aligned, you can walk away owing only the discovery deposit — no lock-in.",
  },
  {
    q: "What file formats do I receive?",
    a: "Vector source (AI, EPS, SVG), web-ready (PNG, SVG), and a PDF guide where applicable. Everything you need to hand off to a printer, developer or in-house team.",
  },
  {
    q: "Do you work with clients anywhere?",
    a: "Yes — I work remotely worldwide. Calls happen over WhatsApp or Zoom in your timezone, and async updates keep everything moving regardless of distance.",
  },
];

/* ---------- page ---------- */

function ServicesPage() {
  return (
    <>
      <PageHero index="03" eyebrow="What I craft" title="Services" outline="& Craft" />

      {/* Opening framing line */}
      <section className="px-5 md:px-8 pb-10 md:pb-16">
        <div className="max-w-[1400px] mx-auto">
          <p data-reveal className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight text-white/80 max-w-3xl">
            Custom brand identities and logo systems for founders who want something <span className="text-neon">built to last, not templated.</span> Hand-drawn, concept-driven, no AI shortcuts — and the same hands that design it build it.
          </p>
        </div>
      </section>

      {/* Core service packages */}
      <section className="px-5 md:px-8 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/15 border border-white/15">
            {packages.map((p) => (
              <div
                key={p.t}
                data-reveal
                className="group bg-black p-6 sm:p-8 flex flex-col transition-colors duration-500 hover:bg-neon hover:text-black min-h-[460px]"
              >
                <div className="flex justify-between items-start font-mono text-xs">
                  <span className="text-neon group-hover:text-black">{p.n}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-black/60">{p.turnaround}</span>
                </div>

                <h3 className="mt-6 font-display uppercase tracking-tighter text-3xl sm:text-4xl leading-[0.9] transition-transform duration-500 group-hover:-translate-y-1">
                  {p.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60 group-hover:text-black/70">{p.blurb}</p>

                <ul className="mt-5 flex flex-col gap-2">
                  {p.includes.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm text-white/70 group-hover:text-black/80">
                      <span className="text-neon group-hover:text-black mt-1 shrink-0">→</span>
                      {x}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 border-t border-white/10 group-hover:border-black/15">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon group-hover:text-black">
                    {p.ideal}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included / process reassurance band */}
      <section className="px-5 md:px-8 py-20 md:py-28 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
          <div data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-4">No surprises</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9]">
              What you<br /><span className="text-stroke">always get</span>
            </h2>
          </div>
          <div data-reveal className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {[
              { k: "Concepts with rationale", v: "Every direction is presented with the thinking behind it — never guesswork." },
              { k: "Fixed scope & quote", v: "You approve a clear, fixed quote before we start. No open-ended hourly billing." },
              { k: "2 revision rounds", v: "Baked into every package. Extra rounds are stated upfront at a fixed rate." },
              { k: "All source files", v: "AI, EPS, SVG, PNG and a PDF guide. Yours to keep and hand off freely." },
              { k: "One person, end to end", v: "The hands that design it build it — no handoff losses, no 'that's not what we designed.'" },
              { k: "Support after launch", v: "You leave with a brand or site you can actually use, and a partner on call." },
            ].map((x) => (
              <div key={x.k}>
                <h4 className="font-display text-lg uppercase tracking-tight text-neon">{x.k}</h4>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div data-reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-3">Optional extras</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9]">Add-ons</h2>
            </div>
            <p className="text-white/50 max-w-sm text-sm leading-relaxed">
              Stack any of these onto a package — quoted together with your project so everything fits your budget.
            </p>
          </div>
          <div data-reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/15 border border-white/15">
            {addons.map((a) => (
              <div key={a} className="bg-black p-5 flex items-center justify-between group hover:bg-white/[0.04] transition-colors duration-300">
                <span className="font-display text-lg sm:text-xl uppercase tracking-tight">{a}</span>
                <span className="font-mono text-neon text-xl leading-none transition-transform duration-300 group-hover:rotate-45">+</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ block */}
      <section className="px-5 md:px-8 py-20 md:py-28 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-4">Before you ask</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.85]">
              Service<br /><span className="text-stroke">Questions</span>
            </h2>
            <p className="mt-6 text-white/50 max-w-sm leading-relaxed">
              The exact questions that otherwise stall a quote request for days — answered up front.
            </p>
          </div>
          <div data-reveal>
            {serviceFaqs.map((f) => (
              <details key={f.q} className="group border-b border-white/10">
                <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none font-display text-base md:text-lg uppercase tracking-tight hover:text-neon transition-colors duration-300 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="font-mono text-neon text-2xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 text-white/50 leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA — tailored project inquiry form */}
      <section className="py-24 md:py-32 px-5 md:px-8 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-4">Request a quote</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-[0.85]">
              Tell me<br /><span className="text-stroke">What you need</span>
            </h2>
            <p className="mt-6 text-white/50 max-w-sm leading-relaxed">
              Pick a package, set a budget, name a timeline. Your answers open a WhatsApp chat with the brief already typed — I'll reply with a fixed quote within 24 hours.
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-3 mt-8 text-white/60 hover:text-neon transition-colors duration-300 font-mono text-xs uppercase tracking-[0.2em]"
            >
              Or book a free 1-hr consult ↗
            </Link>
          </div>
          <InquiryForm />
        </div>
      </section>

      <ConsultButton />
    </>
  );
}

/* ---------- inquiry form ---------- */

function InquiryForm() {
  const [pkg, setPkg] = useState("Brand Identity Package");
  const [budget, setBudget] = useState("$3k – $10k");
  const [timeline, setTimeline] = useState("1–3 months");
  const [scope, setScope] = useState("");

  const send = () => {
    const msg = encodeURIComponent(
      `Hi! I'd like a quote.\n\n• Service: ${pkg}\n• Budget: ${budget}\n• Timeline: ${timeline}${scope ? `\n• Scope notes: ${scope}` : ""}`,
    );
    window.open(`https://wa.me/254702255575?text=${msg}`, "_blank");
  };

  const selectCls =
    "w-full bg-transparent border border-white/15 px-5 py-4 font-mono text-sm uppercase tracking-widest text-white focus:border-neon outline-none transition-colors appearance-none cursor-pointer hover:border-white/40 [&>option]:bg-black";

  return (
    <div className="flex flex-col gap-6" data-reveal>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Which service?</span>
        <select value={pkg} onChange={(e) => setPkg(e.target.value)} className={selectCls}>
          {packages.map((p) => <option key={p.t}>{p.t}</option>)}
          <option>Something else</option>
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Budget range</span>
        <select value={budget} onChange={(e) => setBudget(e.target.value)} className={selectCls}>
          {["Under $1k", "$1k – $3k", "$3k – $10k", "$10k+"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Timeline</span>
        <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className={selectCls}>
          {["ASAP", "Within a month", "1–3 months", "Flexible"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Anything else? (optional)</span>
        <textarea
          value={scope}
          onChange={(e) => setScope(e.target.value)}
          rows={3}
          placeholder="A line about your project, audience, or references…"
          className="w-full bg-transparent border border-white/15 px-5 py-4 font-sans text-sm text-white placeholder:text-white/25 focus:border-neon outline-none transition-colors resize-none"
        />
      </label>
      <button
        onClick={send}
        className="mt-2 bg-neon text-black font-mono text-xs uppercase tracking-[0.2em] px-8 py-5 hover:bg-white transition-colors duration-300 cursor-pointer"
      >
        Get my quote via WhatsApp ↗
      </button>
    </div>
  );
}
