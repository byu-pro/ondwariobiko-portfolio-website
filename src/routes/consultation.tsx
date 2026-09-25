import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/SiteFooter";
import { BudgetField } from "@/components/BudgetField";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Free 1-Hour Consultation — ondwariobiko" },
      { name: "description", content: "Book a free one-hour consultation with ondwariobiko to discuss your logo, brand, UI/UX or web project and see if we're a good fit." },
      { property: "og:title", content: "Book a Free 1-Hour Consultation — ondwariobiko" },
      { property: "og:description", content: "No cost, no pressure. Talk through your project and find out if we're the right fit." },
    ],
  }),
  component: ConsultationPage,
});

const perks = [
  ["60 min", "Dedicated, one-to-one video or WhatsApp call"],
  ["$0", "Completely free — no obligation, no hard sell"],
  ["Clear plan", "Honest advice, scope, timeline & rough budget"],
  ["Good fit?", "We both find out if working together makes sense"],
];
const types = ["Logo", "Brand Identity", "UI/UX", "Website", "Not sure yet"];
function ConsultationPage() {
  const [type, setType] = useState<string>(types[0]!);
  const [budget, setBudget] = useState<string>("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = `Hi ondwariobiko! I'd like to book a free 1-hour consultation.\n\nName: ${f.get("name")}\nEmail: ${f.get("email")}\nProject: ${type}\nBudget: ${budget || "To be discussed"}\nPreferred time: ${f.get("time") || "Flexible"}\n\n${f.get("message") || ""}`;
    window.open(`https://wa.me/254702255575?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  const field = "w-full bg-transparent border-b border-white/20 py-4 text-lg md:text-xl outline-none focus:border-neon transition-colors placeholder:text-white/30";

  return (
    <>
      <PageHero index="✺" eyebrow="Free 1-hour consultation" title="Let's" outline="Talk" />
      <section className="px-5 md:px-8 pb-24">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="text-xl md:text-3xl font-light leading-tight">
              Before we start anything, let's have an honest <span className="text-neon">60-minute conversation</span> about your project, goals and budget — on me.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-px bg-white/15 border border-white/15">
              {perks.map(([k, v]) => (
                <div key={k} className="bg-black p-5 md:p-6">
                  <div className="font-display text-2xl md:text-3xl text-neon">{k}</div>
                  <div className="mt-2 text-sm text-white/60">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="lg:col-span-7 space-y-8">
            <div className="grid sm:grid-cols-2 gap-8">
              <input required name="name" placeholder="Your name *" className={field} />
              <input required type="email" name="email" placeholder="Email *" className={field} />
            </div>
            <Chips label="What do you need?" options={types} value={type} onChange={setType} />
            <BudgetField value={budget} onChange={setBudget} />
            <input name="time" placeholder="Preferred day & time (your timezone)" className={field} />
            <textarea name="message" rows={4} placeholder="Tell me a little about your project…" className={`${field} resize-none`} />
            <button type="submit" className="group w-full sm:w-auto inline-flex items-center justify-between gap-6 rounded-full bg-neon text-black pl-8 pr-2 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-transform hover:scale-[1.02]">
              Request my free call
              <span className="size-12 rounded-full bg-black text-neon grid place-items-center transition-transform duration-500 group-hover:rotate-45">↗</span>
            </button>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Opens WhatsApp with your details · Or email hello@ondwariobiko.com</p>
          </form>
        </div>
      </section>
    </>
  );
}

function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 mb-4">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button type="button" key={o} onClick={() => onChange(o)} className={`rounded-full border px-4 py-2 text-sm transition-colors ${value === o ? "bg-neon text-black border-neon" : "border-white/20 hover:border-neon hover:text-neon"}`}>
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
