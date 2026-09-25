import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteFooter";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — ondwariobiko" },
      { name: "description", content: "Answers to the questions clients ask most — pricing, process, timelines, files, and working together remotely." },
      { property: "og:title", content: "FAQ — ondwariobiko" },
      { property: "og:description", content: "Answers to the questions clients ask most — pricing, process, timelines, files, and working together remotely." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FaqPage,
});

const groups = [
  {
    title: "Pricing & Scope",
    items: [
      { q: "How much does a project cost?", a: "Every project is quoted individually. No two brands need the same thing, so I scope and price around your goals, timeline and budget — you only pay for what your brand actually needs. Share your brief and I'll come back with a tailored quote." },
      { q: "Do you have packages or fixed prices?", a: "No fixed price lists. The service packages on the Services page describe what's included, but the investment is always agreed together after we discuss scope." },
      { q: "How does payment work?", a: "Typically a deposit before work begins, with the balance on completion before final files are delivered. Exact terms are agreed in writing before we start — see the Terms page for the full picture." },
      { q: "What if my budget is small?", a: "Tell me what you're working with. I'll be honest about what it can cover — sometimes that means starting with a focused scope (like a logo system first, website later) rather than stretching thin." },
    ],
  },
  {
    title: "Process & Timelines",
    items: [
      { q: "How long does a project take?", a: "It depends on scope and what we agree together — a logo system and a full brand-plus-website are very different beasts. I'll give you a realistic timeline with your quote, and we lock it in before work starts." },
      { q: "What does the process look like?", a: "Discover → Design → Build → Launch. We start with a deep-dive on your goals and audience, I develop concepts with written rationale, we refine together through agreed revision rounds, and I deliver every file you need." },
      { q: "How many concepts and revisions do I get?", a: "Concepts and revision rounds are specified per project before work starts, so there are no surprises. Revisions beyond the agreed scope can be added — we discuss and agree before any extra work begins." },
      { q: "What if I don't like the first concepts?", a: "Concepts come with rationale, not just pretty pictures — but if a direction genuinely isn't landing, that's what the refinement stage is for. The discovery work up front makes this rare." },
      { q: "Do you offer rush delivery?", a: "Sometimes, depending on my current workload. If you have a hard deadline, mention it in your brief and I'll tell you honestly whether it's doable." },
    ],
  },
  {
    title: "Working Together",
    items: [
      { q: "Do you work with clients outside Kenya?", a: "Yes — I work remotely with clients worldwide, across time zones. Email is the main line for briefs, files and approvals; for calls and video walkthroughs we hop on WhatsApp." },
      { q: "Do you do logos only, or websites too?", a: "Both. I design brand identities and I also design and code the websites that carry them — so your brand and your site come from the same hands and feel like one thing." },
      { q: "Can you redesign my existing brand or website?", a: "Yes — rebrands and redesigns are some of my favourite briefs. I'll audit what you have, keep what's working, and rebuild what isn't." },
      { q: "What if I'm not sure what I need yet?", a: "That's exactly what the free 1-hour consultation is for. We'll talk through your goals and I'll tell you honestly what I'd recommend — even if that means starting smaller." },
    ],
  },
  {
    title: "Files & Ownership",
    items: [
      { q: "What files do I receive?", a: "Everything you need to use your brand anywhere: vector source files (AI, SVG, EPS), web and print exports (PNG, JPG, PDF), and brand guidelines where the scope includes them." },
      { q: "Who owns the final design?", a: "You do — once final payment is received, full ownership and usage rights to the approved deliverables are yours. Unused concepts and sketches remain my intellectual property." },
      { q: "Will my project appear in your portfolio?", a: "I may show completed work in my portfolio and social channels — unless you ask for confidentiality in writing before the project wraps." },
    ],
  },
];

function FaqPage() {
  return (
    <main className="page-enter">
      <PageHero index="06" eyebrow="Everything you're wondering" title="Frequent" outline="Questions" />

      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto space-y-20 md:space-y-28">
          {groups.map((g, gi) => (
            <div key={g.title} className="grid md:grid-cols-12 gap-8 md:gap-12" data-reveal>
              <div className="md:col-span-4">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-3">0{gi + 1}</p>
                <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">{g.title}</h2>
              </div>
              <div className="md:col-span-8 divide-y divide-white/10 border-y border-white/10">
                {g.items.map((f) => (
                  <details key={f.q} className="group py-6 md:py-8">
                    <summary className="flex items-center justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <span className="font-display text-lg md:text-2xl uppercase tracking-tight group-hover:text-neon transition-colors duration-300">{f.q}</span>
                      <span className="shrink-0 font-display text-3xl text-neon transition-transform duration-300 group-open:rotate-45 select-none">+</span>
                    </summary>
                    <p className="mt-4 max-w-2xl text-white/60 font-light leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto border border-neon/40 bg-neon/[0.03] p-8 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8" data-reveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon mb-3">Still curious?</p>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">Ask me directly —<br />no obligation.</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/consultation" className="px-8 py-4 bg-neon text-black font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300">Free 1-hr consult</Link>
            <Link to="/contact" className="px-8 py-4 border border-white/20 font-mono text-xs uppercase tracking-widest hover:border-neon hover:text-neon transition-colors duration-300">Send a brief</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
