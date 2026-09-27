import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/** A staggered shutter reveal for all client-side page changes. */
export function PageTransition() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const previousPath = useRef(path);
  const [transition, setTransition] = useState<{ path: string; label: string } | null>(null);

  useEffect(() => {
    if (previousPath.current === path) return;
    previousPath.current = path;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTransition(null);
      return;
    }
    const segment = path.replace(/\/$/, "").split("/").pop() || "Home";
    const label = segment === "ondwariobiko-portfolio-website" ? "Home" : segment.replaceAll("-", " ");
    setTransition({ path, label });
    const timer = window.setTimeout(() => setTransition(null), 950);
    return () => window.clearTimeout(timer);
  }, [path]);

  if (!transition) return null;

  return (
    <div key={transition.path} className="page-shutter" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((index) => (
        <div key={index} className="page-shutter__blade" style={{ animationDelay: `${index * 45}ms` }} />
      ))}
      <div className="page-shutter__signature">
        <img src={`${import.meta.env.BASE_URL}assets/logoblack.png`} alt="" width="64" height="64" />
        <span>{transition.label}</span>
        <span className="page-shutter__arrow">↗</span>
      </div>
    </div>
  );
}
