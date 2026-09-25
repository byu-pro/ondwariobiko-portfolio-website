import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Index", hint: "Where it begins" },
  { to: "/work", label: "Work", hint: "Selected projects" },
  { to: "/services", label: "Services", hint: "What I craft" },
  { to: "/about", label: "About", hint: "The designer" },
  { to: "/contact", label: "Contact", hint: "Start a project" },
  { to: "/consultation", label: "Free Call", hint: "1 hour, on me" },
] as const;

function WorldClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () =>
      setT(new Date().toLocaleTimeString("en-GB", { timeZone: "UTC", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t || "--:--:--"}</span>;
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [pathname]);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-[60] px-5 md:px-8 flex items-center justify-between transition-all duration-500 ${open ? "py-5 bg-transparent" : scrolled ? "py-3 bg-black/50 backdrop-blur-xl border-b border-white/10" : "py-5 bg-transparent border-b border-transparent"}`}>
        <Link to="/" className="flex items-center gap-4 group">
          <img src="/assets/logowhite.png" alt="ondwariobiko monogram" width={80} height={80} className={`object-contain ${open ? "rounded-full" : ""} ${scrolled && !open ? "size-14 md:size-16" : "size-16 md:size-20"}`} style={{ transition: "all 0.6s" }} />
          <span className={`hidden sm:block font-display text-2xl uppercase tracking-tight leading-none ${open ? "text-black" : "text-white"}`}>
            ondwari<span className={open ? "text-black/50" : "text-neon"}>obiko</span>
          </span>
        </Link>

        <div className={`${open ? "lg:hidden" : ""} hidden lg:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 border border-white/15 rounded-full px-4 py-2 backdrop-blur bg-black/40`}>
          <span className="size-1.5 rounded-full bg-neon animate-pulse" />
          Available · Remote <WorldClock /> UTC
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-[60] flex items-center gap-3 group"
        >
          <span className={`font-mono text-xs uppercase tracking-[0.25em] transition-colors ${open ? "text-black" : "text-white group-hover:text-neon"}`}>
            {open ? "Close" : "Menu"}
          </span>
          <span className={`size-14 rounded-full grid place-items-center transition-all duration-500 ${open ? "bg-black rotate-90" : "bg-neon group-hover:scale-110"}`}>
            <span className="relative block w-5 h-3">
              <span className={`absolute left-0 h-0.5 w-5 transition-all duration-500 ${open ? "top-1.5 rotate-45 bg-neon" : "top-0 bg-black"}`} />
              <span className={`absolute left-0 h-0.5 transition-all duration-500 ${open ? "top-1.5 w-5 -rotate-45 bg-neon" : "top-2.5 w-3 bg-black"}`} />
            </span>
          </span>
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-[55] bg-neon text-black animate-menu-in flex flex-col overflow-y-auto overscroll-contain" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="flex-1 flex flex-col justify-center px-5 md:px-16 pt-32 pb-12">
            <ul>
              {links.map((l, i) => {
                const active = pathname === l.to;
                return (
                  <li key={l.to} className="overflow-hidden border-b border-black/15">
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-6 py-2 md:py-3 animate-rise"
                      style={{ animationDelay: `${200 + i * 70}ms` }}
                    >
                      <span className="font-mono text-xs md:text-sm w-10">0{i + 1}</span>
                      <span className={`font-display uppercase tracking-tighter leading-[0.9] text-[clamp(2.8rem,9vw,8rem)] transition-all duration-500 group-hover:translate-x-6 group-hover:italic ${active ? "text-stroke" : ""}`}>
                        {l.label}
                      </span>
                      <span className="ml-auto hidden md:block font-mono text-xs uppercase tracking-[0.25em] opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                        {l.hint} →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="shrink-0 overflow-hidden bg-black text-neon py-4">
            <div className="flex w-max animate-marquee font-display uppercase text-2xl tracking-tight whitespace-nowrap">
              {Array.from({ length: 2 }).map((_, k) => (
                <span key={k} className="flex">
                  {["Logo Design", "Brand Identity", "UI/UX", "Front-end", "Art Direction", "Remote Worldwide"].map((w) => (
                    <span key={w} className="px-8">{w} ✺</span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
