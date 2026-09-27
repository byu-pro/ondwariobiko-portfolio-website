import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

/** Keep the mockup underneath so a slow or failed logo load never leaves a blank card. */
export function ProjectPreview({ project, detail = false }: { project: Project; detail?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(false);
  const [logoReady, setLogoReady] = useState(false);
  useEffect(() => {
    // Cached images may finish before React hydrates and attaches onLoad.
    if (logo.current?.complete && logo.current.naturalWidth > 0) setLogoReady(true);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false));
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={container} className={`project-preview ${detail ? "project-preview--detail" : "aspect-[4/5]"}`} data-running={visible && logoReady}>
      <div className="project-preview__images">
        <img
          src={project.image}
          srcSet={`${project.image.replace(".webp", "-600.webp")} 600w, ${project.image} 1200w`}
          sizes={detail ? "(min-width: 1400px) 1120px, 90vw" : "(min-width: 1400px) 650px, (min-width: 768px) 50vw, 100vw"}
          alt={project.alt}
          width={1200}
          height={1500}
          loading={detail ? "eager" : "lazy"}
          fetchPriority={detail ? "high" : "auto"}
          decoding="async"
          className="project-preview__mockup"
        />
        <img
          ref={logo}
          src={project.logoImage}
          alt=""
          aria-hidden="true"
          width={1200}
          height={1500}
          loading="lazy"
          decoding="async"
          onLoad={() => setLogoReady(true)}
          onError={() => setLogoReady(false)}
          className="project-preview__logo"
        />
      </div>
    </div>
  );
}
