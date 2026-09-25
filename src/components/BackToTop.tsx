import { useEffect, useState } from "react";

/**
 * Floating "back to top" button.
 * Appears once the visitor scrolls past the halfway point of the page.
 * Sits bottom-left so it never collides with the bottom-right consult button.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const half = document.documentElement.scrollHeight / 2;
      setVisible(window.scrollY > half);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 backdrop-blur-md px-3 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white transition-all duration-500 hover:border-neon hover:text-neon ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <span className="grid size-6 place-items-center rounded-full border border-white/20 leading-none transition-transform duration-500 group-hover:rotate-0 -rotate-45">
        ↑
      </span>
      <span className="hidden sm:inline">Top</span>
    </button>
  );
}
