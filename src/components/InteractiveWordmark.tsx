import { useEffect, useRef, type CSSProperties, type PointerEvent } from "react";

const personalities: Record<string, { twist: number; spread: number; axis: "x" | "y" }> = {
  "pelican-social-bar-and-grill": { twist: 3, spread: 16, axis: "y" },
  "ikon-trailers": { twist: 0, spread: 24, axis: "x" },
  "iron-acre-land-co": { twist: -2, spread: 12, axis: "y" },
  "friends-of-unionville": { twist: 2, spread: 14, axis: "x" },
  "green-essentials-turf-and-mosquito": { twist: 4, spread: 18, axis: "y" },
  "sound-curves": { twist: -3, spread: 22, axis: "y" },
  "moods-n-meds": { twist: 1, spread: 10, axis: "y" },
  "yellow-dot-energy": { twist: 3, spread: 20, axis: "x" },
};

export function InteractiveWordmark({
  src,
  title,
  slug,
}: {
  src: string;
  title: string;
  slug: string;
}) {
  const root = useRef<HTMLButtonElement>(null);
  const frame = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );
  const personality = personalities[slug] ?? personalities["pelican-social-bar-and-grill"]!;
  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function move(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "touch" || reducedMotion()) return;
    pointer.current = { x: event.clientX, y: event.clientY };
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const element = root.current;
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (pointer.current.x - bounds.left) / bounds.width));
      const y = Math.max(0, Math.min(1, (pointer.current.y - bounds.top) / bounds.height));
      element.style.setProperty("--cursor-x", `${x * 100}%`);
      element.style.setProperty("--cursor-y", `${y * 100}%`);
      element.querySelectorAll<HTMLElement>(".wordmark-strip").forEach((strip, i) => {
        const distance = i / 7 - x;
        const wave = Math.cos(distance * Math.PI * 2) * (y - 0.5);
        strip.style.transform = `translate${personality.axis}(${wave * personality.spread}px) rotate(${distance * personality.twist * (y - 0.5)}deg)`;
      });
    });
  }

  function reset() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    root.current?.querySelectorAll<HTMLElement>(".wordmark-strip").forEach((strip) => {
      strip.style.transform = "";
    });
  }

  function remix() {
    if (reducedMotion()) return;
    root.current?.querySelectorAll<HTMLElement>(".wordmark-strip").forEach((strip, i) => {
      strip.getAnimations().forEach((animation) => animation.cancel());
      const offset = (i - 3.5) * personality.spread;
      strip.animate(
        [
          { transform: "translate(0, 0) rotate(0deg)" },
          {
            transform: `translate(${offset}px, ${(i % 2 ? -1 : 1) * personality.spread}px) rotate(${(i - 3.5) * personality.twist}deg)`,
            offset: 0.35,
          },
          { transform: "translate(0, 0) rotate(0deg)" },
        ],
        { duration: 1000, delay: i * 35, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    });
  }

  return (
    <div data-project={slug} className="case-wordmark-stage">
      <h1 className="sr-only">{title}</h1>
      <button
        ref={root}
        type="button"
        className="interactive-wordmark"
        aria-label={`Animate ${title} wordmark`}
        onPointerMove={move}
        onPointerLeave={reset}
        onBlur={reset}
        onClick={remix}
      >
        <span
          className="case-wordmark-reveal wordmark-canvas"
          style={{ "--wordmark-image": `url("${src}")` } as CSSProperties}
        >
          <img
            src={src}
            alt=""
            width={2800}
            height={800}
            fetchPriority="high"
            decoding="async"
            className="wordmark-spacer"
          />
          {Array.from({ length: 8 }, (_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="wordmark-strip"
              style={{ clipPath: `inset(0 ${100 - (i + 1) * 12.5}% 0 ${i * 12.5}%)` }}
            >
              <img src={src} alt="" className="case-study-wordmark" draggable={false} />
              <span className="wordmark-ink" />
            </span>
          ))}
        </span>
        <span className="wordmark-invitation font-mono">
          <span className="wordmark-pointer-hint">Move to bend · Click to remix</span>
          <span className="wordmark-touch-hint">Tap to remix</span>
        </span>
      </button>
    </div>
  );
}
