import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoBlack from "@/assets/jo-logo-black.png.asset.json";
import logoWhite from "@/assets/jo-logo-white.png.asset.json";
import logoNeon from "@/assets/jo-logo-neon.png.asset.json";
import { ConsultButton } from "@/components/ConsultButton";
import { heroImage, projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ondwariobiko — Creative Director & Brand Designer | Remote Worldwide" },
      { name: "description", content: "ondwariobiko is a designer working remotely worldwide, crafting premium logos, brand identities, UI/UX and front-end experiences. 10 years of practice." },
      { property: "og:title", content: "ondwariobiko — Creative Director & Brand Designer" },
      { property: "og:description", content: "Designer working remotely worldwide, crafting premium brand identities and digital experiences." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 px-5 md:px-8 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-6">
            <span className="text-neon">●</span> Logo · Brand · UI/UX · Front-end — Est. 2016
          </div>
          <h1 className="font-display text-[clamp(2.5rem,13.5vw,14rem)] leading-[0.85] tracking-tighter uppercase mb-10 md:mb-12 break-words">
            <RotatingWord /> <br />
            <span className="text-stroke">Designer</span>
            <span className="text-neon inline-block animate-[spin-slow_8s_linear_infinite]">*</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-10 md:gap-12 md:items-end">
            <div className="md:w-1/2">
              <p className="text-xl sm:text-2xl md:text-3xl font-light leading-tight max-w-xl mb-8">
                <span className="text-neon">ondwariobiko</span> designs logos and brand worlds that refuse to blend in — then builds them for the web.
              </p>
              <Link to="/work" className="inline-flex items-center gap-4 group">
                <span className="size-14 rounded-full bg-neon text-black grid place-items-center transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">↗</span>
                <span className="font-mono text-xs uppercase tracking-[0.25em] group-hover:text-neon transition-colors">See the work</span>
              </Link>
              <div className="mt-6"><ConsultButton label="Free 1-hour consultation" /></div>
            </div>
            <div className="md:w-1/2 w-full aspect-[4/5] overflow-hidden"><img src={heroImage} alt="Premium textured business cards with lime edges and JO monogram" width={800} height={1008} fetchPriority="high" decoding="async" className="w-full h-full object-cover scale-110" data-parallax="-0.08" /></div>
          </div>
        </div>
      </section>

      <div className="bg-neon text-black py-5 overflow-hidden -rotate-2 my-10 md:my-16 scale-105">
        <div className="flex w-max animate-marquee font-display uppercase text-2xl sm:text-3xl md:text-4xl tracking-tight whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex">
              {["Bold Logos", "Brand Systems", "Interfaces", "Typography", "Remote Worldwide"].map((w) => (
                <span key={w} className="px-10">{w} ✺</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-1">
          {[
            { src: logoBlack.url, bg: "bg-white", label: "Primary", c: "text-black/50" },
            { src: logoWhite.url, bg: "bg-black border border-white/10", label: "Inverse", c: "text-white/50" },
            { src: logoNeon.url, bg: "bg-neon", label: "Signature Lime", c: "text-black/50" },
          ].map((l) => (
            <div key={l.label} className={`group aspect-square ${l.bg} flex flex-col items-center justify-center`}>
              <img src={l.src} alt={`JO monogram — ${l.label}`} width={160} height={160} className="w-24 h-24 md:w-40 md:h-40 object-contain animate-float transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12" />
              <span className={`mt-8 font-mono text-[10px] uppercase tracking-widest ${l.c}`}>{l.label} Monogram</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-12 md:mb-16 gap-6 flex-wrap">
            <h2 className="font-display text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-[0.85]">Featured<br /><span className="text-stroke">Work</span></h2>
            <Link to="/work" className="font-mono text-xs uppercase tracking-[0.25em] hover:text-neon">All projects →</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {projects.slice(0, 2).map((p, i) => (
              <Link to="/work/$slug" params={{ slug: p.slug }} key={p.title} className={`group ${i ? "md:mt-40" : ""}`}>
                <div className="overflow-hidden mb-6">
                  <img src={p.image} alt={p.alt} width={1200} height={1500} loading="lazy" decoding="async" className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex justify-between">
                  <h3 className="font-display text-2xl sm:text-3xl uppercase group-hover:text-neon transition-colors">{p.title}</h3>
                  <span className="font-mono text-xs">{p.year}</span>
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-white/50 mt-2">{p.tag}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const words = ["Creative", "Logo", "Brand", "Visual", "UI/UX", "Digital", "Web", "Art"];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden align-bottom h-[0.9em] min-w-[5ch]">
      <span key={words[i]} className="block animate-rise text-neon">
        {words[i]}
      </span>
    </span>
  );
}
