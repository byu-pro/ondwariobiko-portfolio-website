import { brandMockupSlots, type BrandMockupImage } from "@/lib/brand-mockups";

type Props = {
  placement: "intro" | "applications" | "full-width";
  images?: BrandMockupImage[];
};

export function BrandMockupTiles({ placement, images = [] }: Props) {
  const slots = brandMockupSlots.filter((slot) => slot.placement === placement);

  return (
    <div className={placement === "full-width" ? "w-full" : "max-w-[1400px] mx-auto"}>
      {placement === "applications" && (
        <div className="mb-8 md:mb-10 border-t border-ink/15 pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink mb-3">
            Identity in use
          </p>
          <h2 className="font-display uppercase text-3xl md:text-5xl tracking-tight">
            A brand beyond the mark.
          </h2>
        </div>
      )}
      <div
        className={
          placement === "applications"
            ? "grid sm:grid-cols-2 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-12"
            : "grid"
        }
      >
        {slots.map((slot) => {
          const image = images.find((image) => image.id === slot.id);
          const portrait = slot.height > slot.width;
          const ratio = portrait ? "3:4" : slot.width * 9 === slot.height * 16 ? "16:9" : "3:2";
          const number = brandMockupSlots.findIndex((item) => item.id === slot.id) + 1;
          return (
            <figure key={slot.id} data-mockup-slot={slot.id}>
              <div
                className="relative overflow-hidden bg-ink/[0.03] border border-ink/15"
                style={{ aspectRatio: `${slot.width} / ${slot.height}` }}
              >
                {image ? (
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={slot.width}
                    height={slot.height}
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
                    aria-label={`${slot.title} mockup placeholder. Recommended image size ${slot.width} by ${slot.height} pixels.`}
                  >
                    <span className="absolute left-4 top-4 md:left-6 md:top-6 font-mono text-[10px] tracking-[0.2em] text-ink/45">
                      0{number} / MOCKUP
                    </span>
                    <span className="font-display text-[clamp(1.4rem,3vw,3rem)] tracking-tight leading-tight text-ink/70">
                      {slot.width} × {slot.height} <span className="text-base md:text-xl">px</span>
                    </span>
                    <span className="mt-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-ink/50">
                      {portrait ? "Portrait" : "Landscape"} / {ratio}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-accent-ink text-xl leading-none"
                    >
                      ＋
                    </span>
                  </div>
                )}
              </div>
              <figcaption
                className={`mt-3 md:mt-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.16em] text-ink/60 ${placement === "full-width" ? "max-w-[1400px] mx-auto px-5 md:px-8" : ""}`}
              >
                {slot.title}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
