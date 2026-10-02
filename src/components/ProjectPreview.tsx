import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

/** Keep the mockup underneath so a slow or failed logo load never leaves a blank card. */
export function ProjectPreview({ project, detail = false }: { project: Project; detail?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(false);
  const [logoReady, setLogoReady] = useState(false);
  useEffect(() => {
    if (detail) return;
    if (logo.current?.complete && logo.current.naturalWidth > 0) setLogoReady(true);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false));
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, [detail]);
  return (
    <div ref={container} className={`project-preview ${detail ? "project-preview--detail" : "aspect-[4/5]"}`} data-running={!detail && visible && logoReady}>
      <div className="project-preview__images">
        <img
          src={detail && project.heroBanner ? project.heroBanner : project.image}
          srcSet={detail && project.heroBanner ? `${project.heroBanner.replace(".webp", "-600.webp")} 600w, ${project.heroBanner} 1200w` : `${project.image.replace(".webp", "-600.webp")} 600w, ${project.image} 1200w`}
          sizes={detail ? (project.cat !== "Digital" ? "100vw" : "(min-width: 1400px) 1400px, 100vw") : "(min-width: 1400px) 650px, (min-width: 768px) 50vw, 100vw"}
          alt={project.alt}
          width={detail ? 1920 : 1200}
          height={detail ? 1200 : 1500}
          loading={detail ? "eager" : "lazy"}
          fetchPriority={detail ? "high" : "auto"}
          decoding="async"
          className="project-preview__mockup"
        />
        {!detail && (
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
        )}
      </div>
    </div>
  );
}
