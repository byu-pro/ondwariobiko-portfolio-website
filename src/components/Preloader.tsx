import { useEffect, useState } from "react";

const LOGO = `${import.meta.env.BASE_URL}assets/logowhite.png`;

/**
 * Branded preloader: counter + logo reveal, then a lime curtain wipe.
 * Shows once per browser session; respects reduced motion.
 */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("obiko_preloaded") === "1";
  });

  useEffect(() => {
    if (gone) return;
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const DURATION = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setCount(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        sessionStorage.setItem("obiko_preloaded", "1");
        window.setTimeout(() => {
          setGone(true);
          document.body.style.overflow = "";
        }, 900);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [gone]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving ? "-translate-y-full" : ""
      }`}
    >
      {/* lime curtain that trails the black panel on exit */}
      <div
        className={`absolute inset-x-0 -bottom-6 h-6 bg-neon transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          leaving ? "-translate-y-0" : ""
        }`}
      />
      <div className="relative overflow-hidden">
        <img
          src={LOGO}
          alt=""
          className="size-20 object-contain md:size-24 animate-preloader-logo"
        />
        {/* lime sweep across the logo */}
        <span className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-neon/40 to-transparent animate-preloader-sweep" />
      </div>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.5em] text-white/50">
        ondwariobiko
      </p>
      <div className="mt-8 h-px w-40 overflow-hidden bg-white/10 md:w-56">
        <div
          className="h-full bg-neon transition-[width] duration-100 ease-linear"
          style={{ width: `${count}%` }}
        />
      </div>
      <p className="mt-3 font-mono text-xs tabular-nums text-neon">{count}%</p>
    </div>
  );
}
