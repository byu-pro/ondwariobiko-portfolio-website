import { Link } from "@tanstack/react-router";

export function ConsultButton({ label = "Book a free 1-hour consultation", className = "" }: { label?: string; className?: string }) {
  return (
    <Link to="/consultation" className={`group inline-flex items-center gap-4 rounded-full bg-neon text-black pl-6 pr-2 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-transform duration-300 hover:scale-[1.03] ${className}`}>
      <span>{label}</span>
      <span className="size-10 rounded-full bg-black text-neon grid place-items-center shrink-0 transition-transform duration-500 group-hover:rotate-45">↗</span>
    </Link>
  );
}

/** Floating pill, bottom-right on every page. */
export function FloatingConsult() {
  return (
    <Link to="/consultation" aria-label="Book a free 1-hour consultation" className="group fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-3 rounded-full bg-neon text-black pl-4 pr-1.5 py-1.5 shadow-[0_10px_40px_-10px_var(--neon)] transition-transform duration-300 hover:scale-105">
      <span className="relative flex size-2"><span className="absolute inset-0 rounded-full bg-black animate-ping opacity-60" /><span className="relative size-2 rounded-full bg-black" /></span>
      <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]">Free 1-hr consult</span>
      <span className="size-9 rounded-full bg-black text-neon grid place-items-center transition-transform duration-500 group-hover:rotate-45">↗</span>
    </Link>
  );
}
