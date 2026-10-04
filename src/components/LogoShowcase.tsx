import { useEffect, useRef, useState } from "react";

const slides = [
  {
    file: "otherworkcarousel/acceptionalacres.webp",
    mobileFile: "otherworkcarousel/acceptionalacres_mobile.webp",
    name: "Acceptional Acres",
    category: "Real Estate & Land",
  },
  {
    file: "otherworkcarousel/cabanabarandgrill.webp",
    mobileFile: "otherworkcarousel/cabanabarandgrill_mobile.webp",
    name: "Cabana Bar & Grill",
    category: "Hospitality & Dining",
  },
  {
    file: "otherworkcarousel/emergencylandingvetservices.webp",
    mobileFile: "otherworkcarousel/emergencylandingvetservices_mobile.webp",
    name: "Emergency Landing Vet Services",
    category: "Veterinary & Healthcare",
  },
  {
    file: "otherworkcarousel/fishcreekministries.webp",
    mobileFile: "otherworkcarousel/fishcreekministries_mobile.webp",
    name: "Fish Creek Ministries",
    category: "Community & Non-Profit",
  },
  {
    file: "otherworkcarousel/gridlockgang.webp",
    mobileFile: "otherworkcarousel/gridlockgang_mobile.webp",
    name: "Gridlock Gang",
    category: "Apparel & Lifestyle",
  },
  {
    file: "otherworkcarousel/lepetit.webp",
    mobileFile: "otherworkcarousel/lepetit_mobile.webp",
    name: "Le Petit",
    category: "Boutique & Retail",
  },
  {
    file: "otherworkcarousel/madevsisble.webp",
    mobileFile: "otherworkcarousel/madevsisble_mobile.webp",
    name: "Made Visible",
    category: "Creative Agency",
  },
  {
    file: "otherworkcarousel/maxvaluecollectibles.webp",
    mobileFile: "otherworkcarousel/maxvaluecollectibles_mobile.webp",
    name: "Max Value Collectibles",
    category: "Collectibles & Retail",
  },
  {
    file: "otherworkcarousel/pand.webp",
    mobileFile: "otherworkcarousel/pand_mobile.webp",
    name: "P & D",
    category: "Brand Identity",
  },
  {
    file: "otherworkcarousel/peelgoodproject.webp",
    mobileFile: "otherworkcarousel/peelgoodproject_mobile.webp",
    name: "Peel Good Project",
    category: "Wellness & Skincare",
  },
  {
    file: "otherworkcarousel/praevo.webp",
    mobileFile: "otherworkcarousel/praevo_mobile.webp",
    name: "Praevo",
    category: "Technology & Software",
  },
  {
    file: "otherworkcarousel/RitzenhoffCristalGmbH_fathersdayglassillustration.webp",
    mobileFile: "otherworkcarousel/RitzenhoffCristalGmbH_fathersdayglassillustration_mobile.webp",
    name: "Ritzenhoff Cristal",
    category: "Illustration & Glassware",
  },
  {
    file: "otherworkcarousel/spassartapartment.webp",
    mobileFile: "otherworkcarousel/spassartapartment_mobile.webp",
    name: "Spassart Apartment",
    category: "Hospitality & Living",
  },
  {
    file: "otherworkcarousel/sugarmama.webp",
    mobileFile: "otherworkcarousel/sugarmama_mobile.webp",
    name: "Sugar Mama",
    category: "Bakery & Confectionery",
  },
  {
    file: "otherworkcarousel/thegrillingthrone.webp",
    mobileFile: "otherworkcarousel/thegrillingthrone_mobile.webp",
    name: "The Grilling Throne",
    category: "Culinary & Lifestyle",
  },
  {
    file: "otherworkcarousel/theloadedmusketpub.webp",
    mobileFile: "otherworkcarousel/theloadedmusketpub_mobile.webp",
    name: "The Loaded Musket Pub",
    category: "Pub & Hospitality",
  },
  {
    file: "otherworkcarousel/themahjabout.webp",
    mobileFile: "otherworkcarousel/themahjabout_mobile.webp",
    name: "The Mahj About",
    category: "Entertainment & Gaming",
  },
  {
    file: "otherworkcarousel/thinkingandfeelingpodcast.webp",
    mobileFile: "otherworkcarousel/thinkingandfeelingpodcast_mobile.webp",
    name: "Thinking & Feeling Podcast",
    category: "Media & Audio",
  },
];

export function LogoShowcase({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const request = useRef(0);
  const [interaction, setInteraction] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [paused, setPaused] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const root = useRef<HTMLElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const running = visible && pageVisible && !paused && !reducedMotion;

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(motion.matches);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const visibility = () => setPageVisible(!document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0 },
    );
    if (root.current) observer.observe(root.current);
    document.addEventListener("visibilitychange", visibility);
    visibility();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => { void select(active + 1); }, 6000);
    return () => window.clearTimeout(timer);
  }, [running, active, interaction]);

  async function select(index: number) {
    const next = (index + slides.length) % slides.length;
    const slide = slides[next];
    if (!slide) return;
    const id = ++request.current;
    // Keep the current artwork visible until the incoming image is fully decoded.
    const image = new Image();
    image.src = `${import.meta.env.BASE_URL}assets/${window.matchMedia("(max-width: 767px)").matches ? slide.mobileFile.replace(".webp", "-600.webp") : slide.file}`;
    try {
      await image.decode();
    } catch {
      // Retry on the next interval without exposing an empty slide.
      if (id === request.current) setInteraction((value) => value + 1);
      return;
    }
    if (id !== request.current) return;
    setPrevious(active);
    setActive(next);
    setInteraction((value) => value + 1);
  }

  return (
    <section
      ref={root}
      className={`logo-gallery ${className}`}
      aria-label="Selected logo designs"
      aria-roledescription="carousel"
      onFocusCapture={() => setPaused(true)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          select(active + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
    >
      <div
        className="logo-gallery-stage"
        onTouchStart={(event) => {
          const point = event.touches[0];
          if (point) touch.current = { x: point.clientX, y: point.clientY };
        }}
        onTouchEnd={(event) => {
          const point = event.changedTouches[0];
          if (point && touch.current) {
            const dx = point.clientX - touch.current.x;
            const dy = point.clientY - touch.current.y;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4)
              select(active + (dx < 0 ? 1 : -1));
          }
          touch.current = null;
        }}
        onTouchCancel={() => {
          touch.current = null;
        }}
      >
        {slides.map((slide, index) => {
          const isCurrent = active === index;
          const nearby = isCurrent || index === previous;
          return nearby ? (
            <div
              key={slide.file}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${slide.name}`}
              aria-hidden={!isCurrent}
              className={`logo-gallery-slide ${isCurrent ? `is-current ${previous === null ? "is-initial" : ""}` : index === previous ? "is-previous" : ""}`}
            >
              {[true, false].map((backdrop) => (
              <picture key={String(backdrop)} className={backdrop ? "logo-gallery-backdrop" : "logo-gallery-artwork"} aria-hidden={backdrop || undefined}>
                <source
                  media="(max-width: 767px)"
                  srcSet={`${import.meta.env.BASE_URL}assets/${slide.mobileFile.replace(".webp", "-600.webp")}`}
                  width={1200}
                  height={1500}
                />
                <img
                  src={`${import.meta.env.BASE_URL}assets/${slide.file}`}
                  alt={backdrop ? "" : `Logo for ${slide.name}, ${slide.category.toLowerCase()}`}
                  width={1920}
                  height={1080}
                  loading={isCurrent ? "eager" : "lazy"}
                  fetchPriority={isCurrent ? "high" : "low"}
                  decoding="async"
                  draggable={false}
                />
              </picture>
              ))}
            </div>
          ) : null;
        })}
      </div>
      <div className="logo-gallery-caption font-mono">
        <p className="flex-1 text-xs text-ink/70" aria-live={paused ? "polite" : "off"}>{slides[active]?.name}</p>
        <div className="logo-gallery-arrows">
          <button type="button" aria-label="Previous logo" onClick={() => { setPaused(true); void select(active - 1); }}>←</button>
          <button type="button" aria-label={paused || reducedMotion ? "Play logo slideshow" : "Pause logo slideshow"} aria-pressed={paused || reducedMotion} onClick={() => { setPaused(!(paused || reducedMotion)); setReducedMotion(false); }}>{paused || reducedMotion ? "▷" : "Ⅱ"}</button>
          <button type="button" aria-label="Next logo" onClick={() => { setPaused(true); void select(active + 1); }}>→</button>
        </div>
      </div>
    </section>
  );
}
