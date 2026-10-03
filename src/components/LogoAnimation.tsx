import { useEffect, useRef, useState } from "react";

export function LogoAnimation() {
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setLoaded(true);
        element.muted = true;
        void element.play().catch(() => {});
      } else {
        element.pause();
      }
    }, { rootMargin: "200px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full overflow-hidden bg-black" aria-label="John Obiko logo animation">
      <video
        ref={video}
        src={loaded ? `${import.meta.env.BASE_URL}assets/logo-animation.mp4` : undefined}
        className="block h-auto w-full pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
    </section>
  );
}
