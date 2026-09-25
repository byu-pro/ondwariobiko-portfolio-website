import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ondwariobiko" },
      { name: "description", content: "Privacy Policy for ondwariobiko.com — what information is collected, how it's used, and your rights." },
      { property: "og:title", content: "Privacy Policy — ondwariobiko" },
      { property: "og:description", content: "What information is collected, how it's used, and your rights when you visit or contact ondwariobiko." },
    ],
  }),
  component: PrivacyPage,
});

type Section = { n: string; title: string; body: string[] };

const sections: Section[] = [
  {
    n: "01",
    title: "Introduction",
    body: [
      "This Privacy Policy explains how ondwariobiko (\"I,\" \"me,\" \"my\") collects, uses, and protects information when you visit ondwariobiko.com (\"the Site\") or contact me regarding design and development services.",
    ],
  },
  {
    n: "02",
    title: "Information I Collect",
    body: [
      "Information you provide directly:",
      "Name, email address, company / brand name.",
      "Project details you share via the contact / inquiry form (project type, budget, timeline, project description).",
      "Any files, briefs, or content you send me for a project.",
      "I do not use analytics, tracking, or cookie-based tools on this Site. The only information collected is what you choose to submit directly (e.g. through the contact form or email).",
    ],
  },
  {
    n: "03",
    title: "How I Use Your Information",
    body: [
      "To respond to inquiries and discuss potential projects.",
      "To deliver contracted design / development services.",
      "To send project-related communication (proposals, invoices, updates).",
      "I do not sell, rent, or trade your personal information to third parties.",
    ],
  },
  {
    n: "04",
    title: "Third-Party Services",
    body: [
      "I may use third-party tools to operate parts of this Site or deliver services, such as:",
      "Email / contact form providers.",
      "Payment processors (e.g. PayPal, Payoneer, Wise) for invoicing, where applicable.",
      "Project platforms, where separate platform privacy policies apply to interactions there.",
      "These third parties have their own privacy policies governing any data they process.",
    ],
  },
  {
    n: "05",
    title: "Data Storage & Security",
    body: [
      "Project files and client communication are stored securely and only accessed as needed to complete contracted work.",
      "I take reasonable measures to protect your information but cannot guarantee absolute security of data transmitted over the internet.",
    ],
  },
  {
    n: "06",
    title: "Data Retention",
    body: [
      "Contact form submissions and project-related information are retained only as long as necessary to complete the project or respond to your inquiry, or as required for tax / business record purposes.",
      "You may request deletion of your personal information at any time (see Section 07).",
    ],
  },
  {
    n: "07",
    title: "Your Rights",
    body: [
      "You may:",
      "Request access to the personal data I hold about you.",
      "Request correction or deletion of your data.",
      "Object to how your data is used.",
      "To exercise any of these rights, contact me at hello@ondwariobiko.com.",
    ],
  },
  {
    n: "08",
    title: "Children's Privacy",
    body: [
      "This Site is not directed at individuals under 18, and I do not knowingly collect personal information from children.",
    ],
  },
  {
    n: "09",
    title: "International Visitors",
    body: [
      "Since I work with clients internationally, your information may be processed in Kenya or other locations where I operate. By using this Site or my services, you consent to this processing.",
    ],
  },
  {
    n: "10",
    title: "Changes to This Policy",
    body: [
      "I may update this Privacy Policy from time to time. The \"Last updated\" date at the top will reflect the most recent revision. Continued use of the Site after changes constitutes acceptance of the updated policy.",
    ],
  },
  {
    n: "11",
    title: "Contact",
    body: [
      "Questions about this Privacy Policy or your personal data can be sent to hello@ondwariobiko.com.",
    ],
  },
];

function PrivacyPage() {
  return (
    <>
      <PageHero index="✺" eyebrow="Your data" title="Privacy" outline="Policy" />
      <section className="px-5 md:px-8 pb-24">
        <div className="max-w-[900px] mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 mb-14">
            Last updated: September 25, 2026
          </p>

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
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 mb-3">Questions about your data?</p>
            <a href="mailto:hello@ondwariobiko.com" className="group inline-flex items-center gap-3 font-display uppercase tracking-tighter text-2xl sm:text-3xl hover:text-neon transition-colors">
              hello@ondwariobiko.com <span className="transition-transform duration-500 group-hover:translate-x-2">↗</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
