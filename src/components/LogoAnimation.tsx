import { useEffect, useRef } from "react";

export function LogoAnimation() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = video.current;
    if (!element) return;

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
    return () => observer.disconnect();
  }, []);

  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="w-full overflow-hidden bg-black h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] relative" aria-label="John Obiko logo animation">
      <video
        ref={video}
        src={`${baseUrl}assets/logo-animation.mp4`}
        className="block w-full h-full object-cover pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
    </section>
  );
}

