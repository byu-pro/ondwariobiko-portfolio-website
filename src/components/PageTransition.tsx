import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

const chapters: Record<string, string> = {
  Home: "00", work: "01", services: "02", about: "03", contact: "04",
};

/** The monogram's circular geometry opens into the next page. */
export function PageTransition() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const previousPath = useRef(path);
  const [transition, setTransition] = useState<{ path: string; label: string; chapter: string } | null>(null);

  useEffect(() => {
    if (previousPath.current === path) return;
    previousPath.current = path;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTransition(null);
      return;
    }
    const segment = path.replace(/\/$/, "").split("/").pop() || "Home";
    const label = segment === "ondwariobiko-portfolio-website" ? "Home" : segment.replaceAll("-", " ");
    setTransition({ path, label, chapter: chapters[label] || "↗" });
    const timer = window.setTimeout(() => setTransition(null), 400);
    return () => window.clearTimeout(timer);
  }, [path]);

  if (!transition) return null;

  return (
    <div key={transition.path} className="monogram-passage" aria-hidden="true">
      <div className="monogram-passage__aperture" />
      <div className="monogram-passage__art">
        <img src={`${import.meta.env.BASE_URL}assets/logowhite.webp`} alt="" width={512} height={512} />
      </div>
      <div className="monogram-passage__orbit" />
      <div className="monogram-passage__caption">
        <span className="monogram-passage__index">{transition.chapter}</span>
        <span className="monogram-passage__rule" />
        <span className="monogram-passage__destination">{transition.label}</span>
      </div>
      <span className="monogram-passage__edition">ONDWARIOBIKO / SELECTED PERSPECTIVES</span>
    </div>
  );
}
