import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteFooter";
import logoNeon from "@/assets/jo-logo-neon.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ondwariobiko | Nairobi Designer, 10 Years" },
      { name: "description", content: "Meet ondwariobiko: a Nairobi-based logo and brand designer, UI/UX designer and front-end developer with 10 years of experience." },
      { property: "og:title", content: "About ondwariobiko" },
      { property: "og:description", content: "A decade of logos, brands and interfaces from Nairobi, Kenya." },
    ],
  }),
  component: AboutPage,
});

const stats = [["10+", "Years of practice"], ["150+", "Brands launched"], ["NBO", "Based in Kenya"], ["∞", "Ideas generated"]];
const timeline = [["2016", "Started freelancing — first logos for Nairobi startups"], ["2019", "Moved into full brand systems & art direction"], ["2022", "Added UI/UX and front-end development"], ["2026", "Independent studio, clients across 4 continents"]];

function AboutPage() {
  return (
    <>
      <PageHero index="04" eyebrow="The designer" title="Designer" outline="Developer" />
      <section className="px-5 md:px-8 pb-24">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 aspect-square bg-neon grid place-items-center">
            <img src={logoNeon.url} alt="ondwariobiko monogram on lime" width={240} height={240} className="w-3/5 object-contain animate-[spin_30s_linear_infinite]" />
          </div>
          <div className="md:col-span-8">
            <p className="text-3xl md:text-5xl font-light leading-tight">
              I'm <span className="text-neon">ondwariobiko</span> — a graphic & web designer from Nairobi. For ten years I've drawn logos and built brands that look like nobody else, then carried them into interfaces and code.
            </p>
            <div className="mt-16 border-t border-white/15">
              {timeline.map(([y, t]) => (
                <div key={y} className="group flex gap-8 py-6 border-b border-white/15 hover:pl-4 transition-all">
                  <span className="font-display text-2xl text-neon w-24">{y}</span>
                  <span className="text-white/70 group-hover:text-white">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neon text-black py-20 px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-6xl tracking-tighter">{n}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest mt-2">{l}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
