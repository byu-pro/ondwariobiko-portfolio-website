import { faqSchema, seoHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteFooter";

const groups = [
  {
    title: "Pricing & Scope",
    items: [
      { q: "How much does a graphic design or logo design project cost?", a: "Every project is quoted individually based on scope, deliverables, timeline, and budget. Share your project brief to receive an exact tailored quote with no surprise fees." },
      { q: "Do you have fixed package prices for logo and brand design?", a: "The Services page outlines core scope frameworks (Logo Systems, Brand Identity Packages, Mascot Illustration, Web Design), but final investment is agreed upon after discussing your specific goals." },
      { q: "How does payment work for freelance design services?", a: "Typically a deposit before work begins, with the balance on completion before final files are delivered. Exact terms are agreed in writing before we start." },
      { q: "What if my budget is small?", a: "Tell me what you're working with. I'll be honest about what it can cover — sometimes that means starting with a focused scope (like a logo system first, website later) rather than stretching thin." },
    ],
  },
  {
    title: "Process & Timelines",
    items: [
      { q: "How long does a logo or brand identity project take?", a: "It depends on scope and what we agree together — a logo system and a full brand-plus-website are different beasts. Focused logo projects take 2–3 weeks, while full brand identities with websites take 4–6 weeks." },
      { q: "What does the graphic design process look like?", a: "Discover → Design → Build → Launch. We start with a deep-dive on your goals and audience, I develop hand-drawn vector concepts with written rationale, we refine together through agreed revision rounds, and I deliver master files." },
      { q: "How many concepts and revisions do I get?", a: "Concepts and revision rounds (typically 3 concepts and 2 revision rounds) are specified per project before work starts, so there are no surprises." },
      { q: "What if I don't like the first concepts?", a: "Concepts come with rationale, not just pretty pictures — but if a direction genuinely isn't landing, that's what the refinement stage is for. Discovery work up front makes this rare." },
      { q: "Do you offer rush delivery for logo design?", a: "Sometimes, depending on my current workload. If you have a hard deadline, mention it in your brief and I'll tell you honestly whether it's doable." },
    ],
  },
  {
    title: "Working Together",
    items: [
      { q: "Do you work with clients outside Kenya?", a: "Yes — I work remotely with clients worldwide across time zones (US, UK, Europe, Australia, Africa). Email is the main line for briefs, files and approvals; for calls we hop on WhatsApp or Zoom." },
      { q: "Do you do logos only, or websites too?", a: "Both. I design custom brand identities and I also design and code the websites that carry them — so your brand and site come from the same hands and feel like one cohesive system." },
      { q: "Can you redesign my existing brand or website?", a: "Yes — rebrands and logo redesigns are some of my favourite briefs. I'll audit what you have, keep what's working, and rebuild what isn't." },
      { q: "What if I'm not sure what I need yet?", a: "That's exactly what the free 1-hour consultation is for. We'll talk through your goals and I'll tell you honestly what I'd recommend — even if that means starting smaller." },
    ],
  },
  {
    title: "Files & Ownership",
    items: [
      { q: "What files do I receive upon project completion?", a: "Everything you need to use your brand anywhere: vector master source files (AI, SVG, EPS), web and print exports (PNG, JPG, PDF), favicons, and brand guidelines where included." },
      { q: "Who owns the final logo and brand design?", a: "You do — once final payment is received, full 100% ownership and copyright usage rights to approved deliverables are yours." },
      { q: "Will my project appear in your portfolio?", a: "I may show completed work in my portfolio and social channels — unless you ask for confidentiality in writing before the project wraps." },
    ],
  },
];

const flatFaqs = groups.flatMap((g) => g.items);

export const Route = createFileRoute("/faq")({
  head: () =>
    seoHead(
      "faq",
      "Graphic & Logo Design FAQ | Frequently Asked Questions | John Obiko",
      "Find answers to common questions about hiring freelance graphic designer John Obiko: logo design pricing, process, revisions, file deliverables, and remote collaboration.",
      "assets/pelicansocial_thumbnail.webp",
      [faqSchema(flatFaqs)],
      "graphic design FAQ, logo design cost, brand designer process, freelance logo designer timeline, vector logo files",
    ),
  component: FaqPage,
});

function FaqPage() {
  return (
    <main className="page-enter">
      <PageHero index="06" eyebrow="Everything you're wondering" title="Frequent" outline="Questions" />

      <section className="px-5 md:px-8 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto space-y-20 md:space-y-28">
          {groups.map((g, gi) => (
            <div key={g.title} className="grid md:grid-cols-12 gap-8 md:gap-12" data-reveal>
              <div className="md:col-span-4">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-ink mb-3">0{gi + 1}</p>

                <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">{g.title}</h2>
              </div>
              <div className="md:col-span-8 divide-y divide-white/10 border-y border-ink/10">
                {g.items.map((f) => (
                  <details key={f.q} className="group py-6 md:py-8">
                    <summary className="flex items-center justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <span className="font-display text-lg md:text-2xl uppercase tracking-tight group-hover:text-accent-ink transition-colors duration-300">{f.q}</span>
                      <span className="shrink-0 font-display text-3xl text-accent-ink transition-transform duration-300 group-open:rotate-45 select-none">+</span>
                    </summary>
                    <p className="mt-4 max-w-2xl text-ink/60 font-light leading-relaxed">{f.a}</p>
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
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-ink mb-3">Still curious?</p>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter leading-[0.9]">Ask me directly —<br />no obligation.</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/consultation" className="px-8 py-4 bg-neon text-black font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300">Free 1-hr consult</Link>
            <Link to="/contact" className="px-8 py-4 border border-ink/20 font-mono text-xs uppercase tracking-widest hover:border-neon hover:text-accent-ink transition-colors duration-300">Send a brief</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
