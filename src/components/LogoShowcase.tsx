import { useEffect, useState } from "react";

const slides = [
  { file: "pelicansocial_logo.webp", name: "Pelican Social", category: "Hospitality" },
  { file: "ikontrailers_logo.webp", name: "Ikon Trailers", category: "Industry" },
  { file: "friendsofunionvillecolor_logo.webp", name: "Friends of Unionville", category: "Community" },
  { file: "ironacrelandco_logo.webp", name: "Iron Acre Land Co", category: "Land & development" },
  { file: "greenessentials_logo.webp", name: "Green Essentials", category: "Lawn & landscape" },
];

export function LogoShowcase({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) setPlaying(false);
    const sync = (e: MediaQueryListEvent) => setPlaying(!e.matches);
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!playing || hovered) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [playing, hovered, active]);

  const select = (index: number) => {
    setActive(index);
  };

  return (
    <section
      className={`w-full min-w-0 border border-ink/15 ${className}`}
      aria-label="Selected logo designs"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em]">
        <span><span className="text-accent-ink" aria-hidden="true">✺ </span> Selected identities</span>
        <span className="text-ink/60">John Obiko / Design</span>
      </div>
      <div className="relative aspect-[4/5] md:aspect-[16/9] overflow-hidden bg-ink/5">
        {slides.map((slide, index) => (
          <div
            key={slide.file}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.name}`}
            aria-hidden={active !== index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none"
            style={{ opacity: active === index ? 1 : 0 }}
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/${slide.file}`}
              alt={`${slide.name} logo design`}
              width={1200}
              height={1500}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              className="w-full h-full object-cover md:object-contain p-0 md:p-12"
            />
          </div>
        ))}
      </div>
      <div className="px-4 sm:px-5 py-4 bg-surface">
        <div className="flex items-start justify-between gap-3 min-h-14" aria-live={playing ? "off" : "polite"}>
          <div>
            <p className="font-display text-lg leading-tight">{slides[active].name}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink/60 mt-1">{slides[active].category}</p>
          </div>
          <span className="font-mono text-xs text-ink/60 tabular-nums">0{active + 1} / 05</span>
        </div>
        <div className="flex items-center justify-between gap-3 mt-3">
          <div className="flex gap-1" aria-label="Choose a logo">
            {slides.map((slide, index) => (
              <button key={slide.file} type="button" onClick={() => select(index)} aria-label={`Show ${slide.name}`} aria-pressed={active === index} className="min-w-8 min-h-11 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-ink">
                <span className={`block h-1 w-6 transition-colors ${active === index ? "bg-accent-ink" : "bg-ink/20"}`} />
              </button>
            ))}
          </div>
          <button data-playback type="button" onClick={() => setPlaying((current) => !current)} aria-label={playing ? "Pause logo slideshow" : "Play logo slideshow"} className="min-h-11 px-2 font-mono text-[10px] uppercase tracking-widest hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-ink">
            {playing ? "Pause Ⅱ" : "Play ▷"}
          </button>
        </div>
      </div>
    </section>
  );
}
