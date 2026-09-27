import { useEffect, useState } from "react";

const LOGO = `${import.meta.env.BASE_URL}assets/logowhite.png`;

/** Shared by every route; plays on entry or refresh, not internal navigation. */
export function Preloader() {
  // Identical server/client initial markup; no browser storage during hydration.
  const [phase, setPhase] = useState<"idle" | "enter" | "exit" | "done">("idle");

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      setPhase("done");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setPhase("enter");
    const leave = window.setTimeout(() => setPhase("exit"), 1650);
    const finish = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = previousOverflow;
    }, 2450);
    const skip = () => {
      setPhase("done");
      window.clearTimeout(leave);
      window.clearTimeout(finish);
      document.body.style.overflow = previousOverflow;
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") skip();
    };
    const onMotion = () => { if (motion.matches) skip(); };
    window.addEventListener("keydown", onKey);
    motion.addEventListener("change", onMotion);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(finish);
      window.removeEventListener("keydown", onKey);
      motion.removeEventListener("change", onMotion);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="brand-intro" data-phase={phase} aria-hidden="true">
      <div className="brand-intro__curtain" />
      <div className="brand-intro__panel">
        <div className="brand-intro__top"><span>ONDWARIOBIKO®</span><span>DESIGN WITH INTENT</span></div>
        <div className="brand-intro__identity">
          <div className="brand-intro__orbit">
            <span className="brand-intro__ring" />
            <span className="brand-intro__cross brand-intro__cross--left">+</span>
            <span className="brand-intro__cross brand-intro__cross--right">+</span>
            <div className="brand-intro__mark">
              <img src={LOGO} alt="" fetchPriority="high" decoding="async" />
              <img className="brand-intro__echo" src={LOGO} alt="" />
            </div>
          </div>
          <p className="brand-intro__name">ondwariobiko<span>®</span></p>
          <p className="brand-intro__caption">STRATEGY. IDENTITY. IMPACT.</p>
        </div>
        <div className="brand-intro__bottom">
          <span>INDEPENDENT DESIGNER</span><span className="brand-intro__signal">ENTERING THE STUDIO</span>
          <div className="brand-intro__track"><span /></div>
        </div>
      </div>
    </div>
  );
}
