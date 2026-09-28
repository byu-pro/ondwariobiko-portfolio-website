import { useEffect, useState } from "react";

const slides = [
  { file: "otherworkcarousel/acceptionalacres.webp", name: "Acceptional Acres", category: "Real Estate & Land" },
  { file: "otherworkcarousel/cabanabarandgrill.webp", name: "Cabana Bar & Grill", category: "Hospitality & Dining" },
  { file: "otherworkcarousel/emergencylandingvetservices.webp", name: "Emergency Landing Vet Services", category: "Veterinary & Healthcare" },
  { file: "otherworkcarousel/fishcreekministries.webp", name: "Fish Creek Ministries", category: "Community & Non-Profit" },
  { file: "otherworkcarousel/gridlockgang.webp", name: "Gridlock Gang", category: "Apparel & Lifestyle" },
  { file: "otherworkcarousel/lepetit.webp", name: "Le Petit", category: "Boutique & Retail" },
  { file: "otherworkcarousel/madevsisble.webp", name: "Made Visible", category: "Creative Agency" },
  { file: "otherworkcarousel/maxvaluecollectibles.webp", name: "Max Value Collectibles", category: "Collectibles & Retail" },
  { file: "otherworkcarousel/pand.webp", name: "P & D", category: "Brand Identity" },
  { file: "otherworkcarousel/peelgoodproject.webp", name: "Peel Good Project", category: "Wellness & Skincare" },
  { file: "otherworkcarousel/praevo.webp", name: "Praevo", category: "Technology & Software" },
  { file: "otherworkcarousel/RitzenhoffCristalGmbH_fathersdayglassillustration.webp", name: "Ritzenhoff Cristal", category: "Illustration & Glassware" },
  { file: "otherworkcarousel/spassartapartment.webp", name: "Spassart Apartment", category: "Hospitality & Living" },
  { file: "otherworkcarousel/sugarmama.webp", name: "Sugar Mama", category: "Bakery & Confectionery" },
  { file: "otherworkcarousel/thegrillingthrone.webp", name: "The Grilling Throne", category: "Culinary & Lifestyle" },
  { file: "otherworkcarousel/theloadedmusketpub.webp", name: "The Loaded Musket Pub", category: "Pub & Hospitality" },
  { file: "otherworkcarousel/themahjabout.webp", name: "The Mahj About", category: "Entertainment & Gaming" },
  { file: "otherworkcarousel/thinkingandfeelingpodcast.webp", name: "Thinking & Feeling Podcast", category: "Media & Audio" },
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
              width={1920}
              height={1080}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              className="w-full h-full object-cover md:object-contain p-0 md:p-12"
            />
          </div>
        ))}
      </div>
      <div className="px-4 sm:px-5 py-4 bg-surface border-t border-ink/10">
        <div className="flex items-start justify-between gap-3 min-h-12" aria-live={playing ? "off" : "polite"}>
          <div>
            <p className="font-display text-lg sm:text-xl uppercase leading-tight">{slides[active].name}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink/60 mt-1">{slides[active].category}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-ink/10">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[75%] sm:max-w-none" aria-label="Choose a logo">
            {slides.map((slide, index) => (
              <button
                key={slide.file}
                type="button"
                onClick={() => select(index)}
                aria-label={`Show ${slide.name}`}
                aria-pressed={active === index}
                className="min-w-5 min-h-11 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-ink shrink-0"
              >
                <span className={`block h-1.5 transition-all duration-300 ${active === index ? "w-5 bg-accent-ink" : "w-2.5 bg-ink/20 hover:bg-ink/40"}`} />
              </button>
            ))}
          </div>
          <button
            data-playback
            type="button"
            onClick={() => setPlaying((current) => !current)}
            aria-label={playing ? "Pause logo slideshow" : "Play logo slideshow"}
            className="min-h-8 px-2.5 font-mono text-[10px] uppercase tracking-widest border border-ink/15 hover:border-accent-ink hover:text-accent-ink transition-colors focus-visible:outline-2 focus-visible:outline-ink shrink-0"
          >
            {playing ? "Pause Ⅱ" : "Play ▷"}
          </button>
        </div>
      </div>
    </section>
  );
}
