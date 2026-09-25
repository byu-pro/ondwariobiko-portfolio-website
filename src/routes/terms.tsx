import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteFooter";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — ondwariobiko" },
      { name: "description", content: "Terms of Service for design and development work with ondwariobiko. How projects, payment, revisions and ownership work." },
      { property: "og:title", content: "Terms of Service — ondwariobiko" },
      { property: "og:description", content: "How projects, payment, revisions and ownership work when we work together." },
    ],
  }),
  component: TermsPage,
});

type Section = { n: string; title: string; body: string[] };

const sections: Section[] = [
  {
    n: "01",
    title: "Overview",
    body: [
      "These Terms of Service (\"Terms\") govern all design and development services provided by ondwariobiko (\"I,\" \"me,\" \"my\") to clients (\"you,\" \"the Client\") through ondwariobiko.com. By engaging my services — via this website, email, or a project platform — you agree to these Terms.",
    ],
  },
  {
    n: "02",
    title: "Services Provided",
    body: [
      "I offer logo design, brand identity systems, mascot illustration, and website design & development services. The exact scope, deliverables, and timeline for each project will be agreed upon in writing (via email, proposal, or platform messaging) before work begins.",
    ],
  },
  {
    n: "03",
    title: "Project Process",
    body: [
      "Projects typically begin with a discovery brief, followed by concept development, revisions, and final delivery.",
      "The number of concepts and revision rounds included will be specified per project before work starts.",
      "Revisions beyond the agreed scope may incur additional fees, to be discussed and agreed upon before extra work begins.",
    ],
  },
  {
    n: "04",
    title: "Payment Terms",
    body: [
      "Pricing is quoted individually per project based on scope.",
      "A deposit (typically 50%) is required before work begins, with the remaining balance due upon completion and before final files are delivered, unless otherwise agreed in writing.",
      "Accepted payment methods: bank transfer, PayPal, Payoneer, or platform escrow where applicable.",
      "Late payments may result in paused work or delayed delivery.",
    ],
  },
  {
    n: "05",
    title: "Ownership & Usage Rights",
    body: [
      "All design concepts, drafts, and working files remain my property until full payment is received.",
      "Upon full payment, the Client receives full ownership and usage rights to the final approved deliverables, unless otherwise specified in the project agreement.",
      "I retain the right to display completed work in my portfolio, website, and social media for self-promotional purposes, unless the Client requests confidentiality in writing before project completion.",
      "Unused concepts, sketches, and rejected drafts remain my intellectual property and may not be used by the Client without a separate agreement.",
    ],
  },
  {
    n: "06",
    title: "Client Responsibilities",
    body: [
      "The Client agrees to provide timely feedback, necessary brand information, content, and approvals to keep the project on schedule.",
      "Delays in Client feedback may result in corresponding delays to the final delivery timeline.",
    ],
  },
  {
    n: "07",
    title: "Revisions & Scope Changes",
    body: [
      "Each project includes a defined number of revision rounds, agreed before work starts.",
      "Requests that fall outside the original agreed scope (e.g. new concept directions after final approval, additional deliverables) will be treated as a new scope item and quoted separately.",
    ],
  },
  {
    n: "08",
    title: "Cancellations",
    body: [
      "If a Client cancels a project after work has begun, the deposit is non-refundable, and payment is due for any work completed up to the cancellation date.",
      "If I am unable to complete a project for any reason, any payment for undelivered work will be refunded.",
    ],
  },
  {
    n: "09",
    title: "Turnaround Time",
    body: [
      "Estimated timelines are provided per project and depend on project complexity and timely Client feedback.",
      "Rush delivery may be available for an additional fee, subject to availability.",
    ],
  },
  {
    n: "10",
    title: "Limitation of Liability",
    body: [
      "I am not liable for indirect, incidental, or consequential damages arising from the use of delivered designs or websites (e.g. business losses, third-party disputes).",
      "Websites are tested across common browsers and devices at delivery, but I am not responsible for issues arising from third-party hosting, plugins, or Client-made changes after handover.",
    ],
  },
  {
    n: "11",
    title: "Confidentiality",
    body: [
      "Any confidential information shared by the Client (business plans, unreleased products, etc.) will be kept private and not disclosed to third parties.",
    ],
  },
  {
    n: "12",
    title: "Governing Law",
    body: [
      "These Terms are governed by the laws of Kenya, without regard to conflict of law principles.",
      "Note: for international clients, an arbitration or mediation clause may apply instead of a single jurisdiction — worth clarifying with a lawyer given the cross-border nature of the work.",
    ],
  },
  {
    n: "13",
    title: "Changes to These Terms",
    body: [
      "I reserve the right to update these Terms at any time. Continued use of my services after changes constitutes acceptance of the updated Terms.",
    ],
  },
  {
    n: "14",
    title: "Contact",
    body: [
      "Questions about these Terms can be sent to hello@ondwariobiko.com.",
    ],
  },
];

function TermsPage() {
  return (
    <>
      <PageHero index="✺" eyebrow="The fine print" title="Terms" outline="of Service" />
      <section className="px-5 md:px-8 pb-24">
        <div className="max-w-[900px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 mb-10">
            Last updated: September 25, 2026
          </p>

          <aside className="border-l-2 border-neon pl-5 mb-14">
            <p className="text-white/70 leading-relaxed">
              This is a strong starting template, not formal legal advice. Before publishing,
              consider a quick review by a local lawyer or a templated legal review service —
              especially since projects span different legal jurisdictions.
            </p>
          </aside>

          <div className="space-y-12">
            {sections.map((s) => (
              <div key={s.n} className="border-t border-white/10 pt-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-mono text-xs text-neon">{s.n}</span>
                  <h2 className="font-display uppercase tracking-tighter text-2xl sm:text-3xl leading-[0.95]">{s.title}</h2>
                </div>
                <div className="space-y-3">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-white/70 leading-relaxed max-w-[65ch]">{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-white/10 pt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 mb-3">Still have questions?</p>
            <a href="mailto:hello@ondwariobiko.com" className="group inline-flex items-center gap-3 font-display uppercase tracking-tighter text-2xl sm:text-3xl hover:text-neon transition-colors">
              hello@ondwariobiko.com <span className="transition-transform duration-500 group-hover:translate-x-2">↗</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
