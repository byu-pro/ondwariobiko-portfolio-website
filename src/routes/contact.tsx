import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/SiteFooter";
import { BudgetField } from "@/components/BudgetField";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ondwariobiko | Start a Project" },
      { name: "description", content: "Start a logo, branding, UI/UX or web project with ondwariobiko. Working remotely worldwide — replies within 24–48 hours." },
      { property: "og:title", content: "Contact ondwariobiko" },
      { property: "og:description", content: "Have a vision? Let's build something bold together." },
    ],
  }),
  component: ContactPage,
});

const projectTypes = [
  "Logo Design",
  "Brand Identity System",
  "Mascot Design",
  "Website Design & Development",
  "Brand + Website (combined)",
  "Not sure yet",
];

const startOptions = [
  "As soon as possible",
  "In the coming weeks",
  "In the next few months",
  "Flexible — let's discuss",
];

const sources = ["Behance", "LinkedIn", "Referral", "Google", "Other"];

function ContactPage() {
  return (
    <>
      <PageHero index="05" eyebrow="Start a project" title="Say" outline="Jambo" />

      {/* 1 + 2 — opening line + reassurance */}
      <section className="px-5 md:px-8 pb-10">
        <div className="max-w-[900px] mx-auto">
          <p className="font-display uppercase tracking-tighter leading-[0.95] text-[clamp(1.75rem,5vw,3rem)]">
            Let's build something together.{" "}
            <span className="text-stroke">Tell me about your project</span> —
            I'll reply within 24–48 hours.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
            Remote worldwide · working across time zones, from first concept to final delivery
          </p>
        </div>
      </section>

      <div className="px-5 md:px-8 pb-24">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* 3 — the inquiry form */}
          <InquiryForm />

          {/* 4 + 5 + 6 — alternative contact, next steps, social proof */}
          <aside className="lg:col-span-5 space-y-12">
            {/* 4 — alternative contact methods */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 mb-4">
                Prefer to reach out directly?
              </p>
              <div className="border-t border-white/15">
                <a href="mailto:hello@ondwariobiko.com" className="group relative overflow-hidden flex flex-col gap-1 py-5 border-b border-white/15">
                  <span className="absolute inset-0 bg-neon translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                  <span className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 group-hover:text-black px-2">Email — best way to reach me</span>
                  <span className="relative font-display uppercase tracking-tighter text-xl sm:text-2xl group-hover:text-black px-2 transition-transform duration-500 group-hover:-translate-x-2">hello@ondwariobiko.com ↗</span>
                </a>
                <a href="https://wa.me/254702255575" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden flex flex-col gap-1 py-5 border-b border-white/15">
                  <span className="absolute inset-0 bg-neon translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                  <span className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 group-hover:text-black px-2">WhatsApp — easiest for calls & video</span>
                  <span className="relative font-display uppercase tracking-tighter text-xl sm:text-2xl group-hover:text-black px-2 transition-transform duration-500 group-hover:-translate-x-2">+254 702 255 575 ↗</span>
                </a>
                <a href="https://www.behance.net/johnobiko" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden flex flex-col gap-1 py-5 border-b border-white/15">
                  <span className="absolute inset-0 bg-neon translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                  <span className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 group-hover:text-black px-2">Behance</span>
                  <span className="relative font-display uppercase tracking-tighter text-xl sm:text-2xl group-hover:text-black px-2 transition-transform duration-500 group-hover:-translate-x-2">/johnobiko ↗</span>
                </a>
                <a href="https://www.linkedin.com/in/ondwariobiko/" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden flex flex-col gap-1 py-5 border-b border-white/15">
                  <span className="absolute inset-0 bg-neon translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                  <span className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 group-hover:text-black px-2">LinkedIn</span>
                  <span className="relative font-display uppercase tracking-tighter text-xl sm:text-2xl group-hover:text-black px-2 transition-transform duration-500 group-hover:-translate-x-2">/in/ondwariobiko ↗</span>
                </a>
              </div>
            </div>

            {/* 5 — what happens next */}
            <div className="border border-white/15 rounded-2xl p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon mb-4">What happens next</p>
              <p className="text-white/80 leading-relaxed">
                I'll review your project details and follow up within 24–48 hours — either with
                clarifying questions or a proposed next step, like a quick call or a custom quote.
              </p>
            </div>

            {/* 6 — social proof */}
            <figure className="border-l-2 border-neon pl-6">
              <blockquote className="font-display uppercase tracking-tighter text-2xl sm:text-3xl leading-[0.95]">
                "Helped us launch a fintech brand now serving customers in 12 countries."
              </blockquote>
              <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                — Founder, Aura Finance <span className="text-neon">*</span>
              </figcaption>
            </figure>
          </aside>
        </div>
      </div>

      {/* 7 — contact-specific FAQ (remote + "not sure yet" only — Services covers pricing) */}
      <ContactFaq />
    </>
  );
}

/* ---------- inquiry form ---------- */
function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [start, setStart] = useState("");
  const [details, setDetails] = useState("");
  const [source, setSource] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !details.trim()) {
      setError("Please add your name, email, and a few lines about the project.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("That email doesn't look right — check it and try again.");
      return;
    }
    setError("");
    const msg =
      `Hi! I'd like to start a project.\n\n` +
      `• Name: ${name.trim()}\n` +
      `• Email: ${email.trim()}\n` +
      (company.trim() ? `• Company / Brand: ${company.trim()}\n` : "") +
      `• Project type: ${type || "Not sure yet"}\n` +
      `• Budget: ${budget || "To be discussed"}\n` +
      `• When to start: ${start || "Flexible"}\n` +
      (source ? `• Found via: ${source}\n` : "") +
      `\nProject:\n${details.trim()}`;
    window.open(`https://wa.me/254702255575?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  const fieldClass =
    "w-full bg-transparent border-b border-white/20 py-3 text-lg text-white outline-none focus:border-neon transition-colors placeholder:text-white/30";
  const labelClass =
    "font-mono text-[10px] uppercase tracking-[0.25em] text-white/50";

  return (
    <form onSubmit={submit} className="lg:col-span-7 space-y-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
        Project inquiry
      </p>

      <div className="grid sm:grid-cols-2 gap-8">
        <label className="block">
          <span className={labelClass}>Name *</span>
          <input
            type="text"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Email *</span>
          <input
            type="email"
            required
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@brand.com"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <label className="block">
          <span className={labelClass}>Company / Brand (optional)</span>
          <input
            type="text"
            maxLength={100}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Brand name"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Project type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={`${fieldClass} appearance-none cursor-pointer`}
          >
            <option value="" className="bg-black">Select…</option>
            {projectTypes.map((t) => (
              <option key={t} value={t} className="bg-black">{t}</option>
            ))}
          </select>
        </label>
      </div>

      <BudgetField value={budget} onChange={setBudget} />

      <div className="grid sm:grid-cols-2 gap-8">
        <label className="block">
          <span className={labelClass}>When would you like to start?</span>
          <select
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className={`${fieldClass} appearance-none cursor-pointer`}
          >
            <option value="" className="bg-black">Select…</option>
            {startOptions.map((s) => (
              <option key={s} value={s} className="bg-black">{s}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelClass}>How did you find me? (optional)</span>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className={`${fieldClass} appearance-none cursor-pointer`}
          >
            <option value="" className="bg-black">Select…</option>
            {sources.map((s) => (
              <option key={s} value={s} className="bg-black">{s}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Tell me about your project *</span>
        <textarea
          required
          maxLength={1000}
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="What are you building, and what problem should this design solve?"
          className="w-full bg-transparent border-b border-white/20 py-3 text-lg text-white outline-none focus:border-neon transition-colors placeholder:text-white/30 resize-none"
        />
      </label>

      {error && (
        <p className="font-mono text-xs text-neon">{error}</p>
      )}

      <button
        type="submit"
        className="group inline-flex items-center justify-between gap-6 rounded-full bg-neon text-black pl-8 pr-2 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-transform hover:scale-[1.02]"
      >
        <span>Send the brief</span>
        <span className="size-12 rounded-full bg-black text-neon grid place-items-center transition-transform duration-500 group-hover:rotate-45">↗</span>
      </button>
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/35">
        Opens WhatsApp with your details pre-typed — or email hello@ondwariobiko.com directly.
      </p>
    </form>
  );
}

/* ---------- contact-specific FAQ ---------- */
const contactFaqs = [
  {
    q: "Do you work with clients outside Kenya?",
    a: "Yes — most of my clients are international, and everything is handled remotely from first contact to final delivery. Time zones are worked around, not against.",
  },
  {
    q: "What if I'm not sure exactly what I need yet?",
    a: "That's fine — select \"Not sure yet\" in the project type field and describe what you're working on. We can figure out the right scope together.",
  },
];

function ContactFaq() {
  return (
    <section className="px-5 md:px-8 pb-24 border-t border-white/10 pt-16">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10">
        <p className="lg:col-span-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
          Before you ask
        </p>
        <div className="lg:col-span-8 space-y-3">
          {contactFaqs.map((f) => (
            <details key={f.q} className="group border-b border-white/15 py-6">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                <span className="font-display uppercase tracking-tighter text-xl sm:text-2xl leading-[0.95]">{f.q}</span>
                <span className="font-mono text-neon text-2xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-[60ch] text-white/70 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
