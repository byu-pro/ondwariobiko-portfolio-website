import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ondwariobiko | Start a Project" },
      { name: "description", content: "Start a logo, branding, UI/UX or web project with ondwariobiko. Working remotely worldwide." },
      { property: "og:title", content: "Contact ondwariobiko" },
      { property: "og:description", content: "Have a vision? Let's build something bold together." },
    ],
  }),
  component: ContactPage,
});

const channels = [["Email", "hello@ondwariobiko.com", "mailto:hello@ondwariobiko.com"], ["WhatsApp", "+254 702 255 575", "https://wa.me/254702255575"], ["LinkedIn", "/in/ondwariobiko", "https://www.linkedin.com/in/ondwariobiko/"], ["Behance", "/johnobiko", "https://www.behance.net/johnobiko"], ["Instagram", "@ondwariobiko", "#"]];

function ContactPage() {
  return (
    <>
      <PageHero index="05" eyebrow="Start a project" title="Say" outline="Jambo" />
      <section className="px-5 md:px-8 pb-24">
        <div className="max-w-[1400px] mx-auto border-t border-white/15">
          {channels.map(([k, v, href]) => (
            <a key={k} href={href} className="group relative overflow-hidden flex flex-col sm:flex-row gap-2 justify-between sm:items-center py-6 md:py-8 border-b border-white/15">
              <span className="absolute inset-0 bg-neon translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
              <span className="relative font-mono text-xs uppercase tracking-[0.25em] text-white/50 group-hover:text-black px-2">{k}</span>
              <span className="relative font-display uppercase tracking-tighter text-xl sm:text-3xl md:text-5xl break-all sm:break-normal group-hover:text-black px-2 transition-transform duration-500 group-hover:-translate-x-2">{v} ↗</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
