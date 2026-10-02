import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Global motion: scroll progress, reveal-on-scroll, parallax, custom cursor. */
export function MotionLayer() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const bar = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  // Reveal on scroll — re-scan on each page change.
  // Deferred a frame so DOM mutations never race React hydration (avoids
  // hydration-mismatch warnings from class/style changes on SSR'd markup).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let io: IntersectionObserver | null = null;
    let raf = 0;
    let timer = 0;
    const scan = () => {
      const els = document.querySelectorAll<HTMLElement>(
        "main section > div > *, main article, [data-reveal]",
      );
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io?.unobserve(e.target);
            }
          }),
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      // Read geometry together before class/style writes to avoid layout thrashing.
      const belowFold = Array.from(els).filter((el) => el.getBoundingClientRect().top >= window.innerHeight * 0.9);
      belowFold.forEach((el, i) => {
        el.classList.add("reveal");
        el.style.transitionDelay = `${(i % 4) * 70}ms`;
        io?.observe(el);
      });
    };
    // Wait until the page has fully loaded (hydration settled) before
    // mutating any DOM — otherwise React flags hydration mismatches.
    if (document.readyState === "complete") {
      timer = window.setTimeout(() => { raf = requestAnimationFrame(scan); }, 50);
    } else {
      const onLoad = () => { timer = window.setTimeout(() => { raf = requestAnimationFrame(scan); }, 50); };
      window.addEventListener("load", onLoad, { once: true });
      return () => { window.removeEventListener("load", onLoad); clearTimeout(timer); cancelAnimationFrame(raf); io?.disconnect(); };
    }
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); io?.disconnect(); };
  }, [path]);

  // Scroll progress + parallax (initial tick deferred past hydration)
  useEffect(() => {
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const tick = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const updates = reduce.matches ? [] : parallax.flatMap((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return [];
        const off = (r.top + r.height / 2 - window.innerHeight / 2) * Number(el.dataset['parallax'] || 0.1);
        return [{ el, off }];
      });
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
      updates.forEach(({ el, off }) => {
        el.style.transform = `translate3d(0, ${off}px, 0)`;
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    // No initial tick — mutating style before hydration settles causes
    // hydration-mismatch warnings. Initial states are set inline in markup.
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [path]);

  // Decorative loops only run when visible, including when the tab is active.
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(
      ".animate-marquee, .animate-marquee-slow, .brand-loop__track, .hero-portrait__image",
    ));
    const visible = new Set<Element>();
    const sync = () => elements.forEach((el) => {
      el.classList.toggle("motion-paused", document.hidden || !visible.has(el));
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
      sync();
    });
    elements.forEach((el) => { el.classList.add("motion-paused"); observer.observe(el); });
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      elements.forEach((el) => el.classList.remove("motion-paused"));
    };
  }, [path]);

  // Custom cursor (fine pointers only)
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("has-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const hot = (e.target as HTMLElement).closest("a, button");
      ring.current?.classList.toggle("is-hot", !!hot);
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    window.addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); document.documentElement.classList.remove("has-cursor"); };
  }, []);

  return (
    <>
      <div ref={bar} className="fixed top-0 left-0 right-0 h-[3px] bg-neon origin-left z-[70] pointer-events-none" style={{ transform: "scaleX(0)" }} />
      <div ref={ring} className="cursor-ring hidden [.has-cursor_&]:block" />
      <div ref={dot} className="cursor-dot hidden [.has-cursor_&]:block" />
    </>
  );
}
