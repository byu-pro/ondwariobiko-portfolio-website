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
  const [playing, setPlaying] = useState(true);
  const [interaction, setInteraction] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const root = useRef<HTMLElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const current = slides[active]!;
  const running = playing && visible && pageVisible;

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
    const timer = window.setTimeout(() => setActive((value) => (value + 1) % slides.length), 6000);
    return () => window.clearTimeout(timer);
  }, [running, active, interaction]);

  function select(index: number) {
    setActive((index + slides.length) % slides.length);
    // Give the chosen slide a full interval, then continue unless explicitly paused.
    setInteraction((value) => value + 1);
  }

  return (
    <section
      ref={root}
      className={`logo-gallery ${className}`}
      aria-label="Selected logo designs"
      aria-roledescription="carousel"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          select(active + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
    >
      <div className="logo-gallery-masthead font-mono">
        <span>
          <span className="text-accent-ink" aria-hidden="true">
            ✺
          </span>{" "}
          The identity collection
        </span>
        <span className="logo-gallery-edition">18 marks. Distinct characters.</span>
      </div>
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
          const nearby =
            isCurrent ||
            index === (active + 1) % slides.length ||
            index === (active - 1 + slides.length) % slides.length;
          return nearby ? (
            <div
              key={slide.file}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${slide.name}`}
              aria-hidden={!isCurrent}
              className={`logo-gallery-slide ${isCurrent ? "is-current" : ""}`}
            >
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={`${import.meta.env.BASE_URL}assets/${slide.mobileFile}`}
                  width={1200}
                  height={1500}
                />
                <img
                  src={`${import.meta.env.BASE_URL}assets/${slide.file}`}
                  alt={`${slide.name} logo design`}
                  width={1920}
                  height={1080}
                  loading={isCurrent ? "eager" : "lazy"}
                  fetchPriority={isCurrent ? "high" : "low"}
                  decoding="async"
                  draggable={false}
                />
              </picture>
            </div>
          ) : null;
        })}
        <span className="logo-gallery-stamp font-mono" aria-hidden="true">
          OB / {String(active + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="logo-gallery-caption">
        <div className="logo-gallery-number font-display" aria-hidden="true">
          {String(active + 1).padStart(2, "0")}
          <span>/18</span>
        </div>
        <div
          className="logo-gallery-title"
          aria-live={running ? "off" : "polite"}
          aria-atomic="true"
        >
          <p className="font-mono">{current.category}</p>
          <h2 className="font-display">{current.name}</h2>
        </div>
        <div className="logo-gallery-arrows">
          <button type="button" onClick={() => select(active - 1)} aria-label="Previous logo">
            ←
          </button>
          <button type="button" onClick={() => select(active + 1)} aria-label="Next logo">
            →
          </button>
        </div>
      </div>
      <div className="logo-gallery-footer">
        <div className="logo-gallery-index" aria-label="Choose a logo">
          {slides.map((slide, index) => (
            <button
              key={slide.file}
              type="button"
              onClick={() => select(index)}
              aria-label={`Show ${slide.name}`}
              aria-pressed={active === index}
              title={slide.name}
            >
              <span className={active === index ? "is-active" : ""} />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="logo-gallery-play font-mono"
          onClick={() => setPlaying((value) => !value)}
          aria-label={playing ? "Pause logo slideshow" : "Play logo slideshow"}
        >
          {playing ? "Ⅱ Pause" : "▷ Play"}
        </button>
      </div>
    </section>
  );
}
