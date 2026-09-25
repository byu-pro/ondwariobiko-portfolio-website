import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteFooter";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Reviews — ondwariobiko" },
      { name: "description", content: "What clients say about working with ondwariobiko — real projects, real results, in their own words." },
      { property: "og:title", content: "Client Reviews — ondwariobiko" },
      { property: "og:description", content: "What clients say about working with ondwariobiko — real projects, real results, in their own words." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TestimonialsPage,
});

const reviews = [
  {
    quote: "He didn't just design a logo — he rebuilt how we see ourselves. Investors noticed before our customers did.",
    result: "+38% investor meetings after rebrand",
    name: "Amara N.",
    role: "CEO, Aura Finance",
    project: "Brand Identity",
  },
  {
    quote: "The identity system works everywhere: a coffee bag, a billboard, an app icon. Nothing ever looks off-brand.",
    result: "3 new retail partnerships in 6 months",
    name: "David K.",
    role: "Founder, Kilele Coffee",
    project: "Logo & Packaging",
  },
  {
    quote: "Design and code from one brain. Our site shipped faster than our last agency's first draft.",
    result: "2.1× conversion on the new platform",
    name: "Lena M.",
    role: "Product Lead, Savanna OS",
    project: "Web Design & Build",
  },
  {
    quote: "Every concept came with a reason, not just a pretty picture. Choosing between them was the hardest part.",
    result: "Full rebrand delivered on schedule",
    name: "Sofia R.",
    role: "Director, Mara Sands Retreat",
    project: "Brand Identity",
  },
  {
    quote: "Working across a 9-hour time difference and it never felt like it. Clear updates, honest timelines, zero surprises.",
    result: "Launched in 12 countries",
    name: "James O.",
    role: "Co-founder, Fintech Startup",
    project: "Brand + Website",
  },
  {
    quote: "We came for a logo and left with a whole brand language. The guidelines alone saved us months of guesswork.",
    result: "Brand guidelines adopted company-wide",
    name: "Priya S.",
    role: "Marketing Lead, SaaS Platform",
    project: "Brand Guidelines",
  },
];

function TestimonialsPage() {
  return (
    <main className="page-enter">
      <PageHero index="07" eyebrow="In their own words" title="Client" outline="Reviews" />

      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="max-w-2xl text-white/60 font-light leading-relaxed mb-14 md:mb-20" data-reveal>
            Every project ends with a debrief — here's what clients say after the dust settles. Results are theirs; the words are theirs too.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <figure
                key={r.name}
                className="border border-white/10 p-8 flex flex-col gap-6 hover:border-neon/60 hover:bg-white/[0.02] transition-colors duration-500"
                data-reveal
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-5xl text-neon leading-none select-none">“</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 border border-white/10 px-3 py-1.5">{r.project}</span>
                </div>
                <blockquote className="text-base md:text-lg font-light leading-snug flex-1">{r.quote}</blockquote>
                <div className="border-t border-white/10 pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon mb-2">{r.result}</p>
                  <figcaption>
                    <p className="font-display uppercase tracking-tight text-sm">{r.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-1">{r.role}</p>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto border border-neon/40 bg-neon/[0.03] p-8 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8" data-reveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-3">Your story next?</p>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">Let's make something<br />worth talking about.</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/consultation" className="px-8 py-4 bg-neon text-black font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300">Free 1-hr consult</Link>
            <Link to="/work" className="px-8 py-4 border border-white/20 font-mono text-xs uppercase tracking-widest hover:border-neon hover:text-neon transition-colors duration-300">See the work</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
