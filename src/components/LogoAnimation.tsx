import { useEffect, useRef, useState } from "react";

export function LogoAnimation() {
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoaded(true);
          element.muted = true;
          void element.play().catch(() => {});
        } else {
          element.pause();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="w-full overflow-hidden bg-black h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] relative" aria-label="John Obiko logo animation">
      <video
        ref={video}
        src={loaded ? `${baseUrl}assets/logo-animation.mp4` : undefined}
        className="block w-full h-full object-cover pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
    </section>
  );
}

