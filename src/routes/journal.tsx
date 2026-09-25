import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteFooter";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — ondwariobiko" },
      { name: "description", content: "Notes on brand strategy, logo design craft, and the process behind the work — from the desk of ondwariobiko." },
      { property: "og:title", content: "Journal — ondwariobiko" },
      { property: "og:description", content: "Notes on brand strategy, logo design craft, and the process behind the work — from the desk of ondwariobiko." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: JournalPage,
});

const posts = [
  {
    tag: "Process",
    title: "Why every logo I draw starts with a pencil, not a font",
    excerpt: "Sketching first isn't nostalgia — it's how you escape the same twelve geometric sans-serifs every template reaches for.",
    date: "Coming soon",
  },
  {
    tag: "Brand Strategy",
    title: "A logo is not a brand: what you're actually paying for",
    excerpt: "The difference between a mark and a system — and why the system is what makes a small business look like a serious one.",
    date: "Coming soon",
  },
  {
    tag: "Case Study",
    title: "Rebranding a fintech: from trust problem to investor magnet",
    excerpt: "A breakdown of the Aura Finance identity — the brief, the wrong turns, and the decision that changed everything.",
    date: "Coming soon",
  },
  {
    tag: "Craft",
    title: "Design and code from one brain: the case against handoffs",
    excerpt: "What happens when the person who designs your site also builds it — and why the details survive the journey.",
    date: "Coming soon",
  },
];

function JournalPage() {
  return (
    <main className="page-enter">
      <PageHero index="08" eyebrow="Notes & thinking" title="The" outline="Journal" />

      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="max-w-2xl text-white/60 font-light leading-relaxed mb-14 md:mb-20" data-reveal>
            Occasional writing on brand strategy, design craft and the thinking behind the work. First pieces are in the sketchbook — check back soon, or find me on <a href="https://www.linkedin.com/in/ondwariobiko/" target="_blank" rel="noopener noreferrer" className="text-neon hover:underline">LinkedIn</a> where the shorter thoughts land first.
          </p>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {posts.map((p, i) => (
              <article key={p.title} className="group py-8 md:py-12 grid md:grid-cols-12 gap-4 md:gap-8 items-start" data-reveal>
                <p className="md:col-span-1 font-mono text-xs text-neon tracking-widest">0{i + 1}</p>
                <div className="md:col-span-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 mb-3">{p.tag}</p>
                  <h2 className="font-display text-2xl md:text-4xl uppercase tracking-tighter leading-[0.95] group-hover:text-neon transition-colors duration-300">{p.title}</h2>
                  <p className="mt-4 max-w-2xl text-white/50 font-light leading-relaxed">{p.excerpt}</p>
                </div>
                <p className="md:col-span-3 md:text-right font-mono text-[10px] uppercase tracking-[0.25em] text-neon border border-neon/30 px-3 py-1.5 w-fit md:ml-auto">{p.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto border border-white/10 p-8 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8" data-reveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-3">Rather see than read?</p>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">The work says it<br />better anyway.</h2>
          </div>
          <Link to="/work" className="px-8 py-4 bg-neon text-black font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300 w-fit">See the work</Link>
        </div>
      </section>
    </main>
  );
}
