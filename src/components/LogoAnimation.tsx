import { useEffect, useRef, useState } from "react";

export function LogoAnimation() {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(motion.matches);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (paused || reducedMotion) { element.pause(); return; }

    element.muted = true;
    const playVideo = () => {
      void element.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          playVideo();
        } else {
          element.pause();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(element);
    return () => { observer.disconnect(); element.pause(); };
  }, [paused, reducedMotion]);

  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="w-full overflow-hidden bg-black h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] relative border-0 outline-none -my-px" aria-label="John Obiko logo animation">
      <video
        ref={video}
        src={`${baseUrl}assets/logo-animation-web.mp4`}
        className="block w-full h-full object-cover pointer-events-none border-0 outline-none"
        loop
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        preload="none"
        poster={`${baseUrl}assets/logowhite.webp`}
        aria-hidden="true"
        tabIndex={-1}
      />
      <button type="button" className="absolute right-5 bottom-5 rounded-full bg-black/80 px-4 py-2 font-mono text-xs text-white border border-white/30" aria-pressed={paused || reducedMotion} onClick={() => { setPaused(!(paused || reducedMotion)); setReducedMotion(false); }}>
        {paused || reducedMotion ? "Play animation" : "Pause animation"}
      </button>
    </section>
  );
}
