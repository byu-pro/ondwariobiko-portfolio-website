import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    setLight(document.documentElement.dataset['theme'] === "light");
    const sync = (event: StorageEvent) => {
      if (event.key !== "obiko-theme") return;
      const next = event.newValue === "light";
      document.documentElement.dataset['theme'] = next ? "light" : "dark";
      document.documentElement.classList.toggle("dark", !next);
      setLight(next);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const toggle = () => {
    const next = !light;
    document.documentElement.dataset['theme'] = next ? "light" : "dark";
    document.documentElement.classList.toggle("dark", !next);
    setLight(next);
    try { localStorage.setItem("obiko-theme", next ? "light" : "dark"); } catch { /* Storage can be disabled. */ }
  };
  return (
    <button type="button" onClick={toggle} className="theme-toggle" aria-label={`Switch to ${light ? "dark" : "light"} mode`} title={`Switch to ${light ? "dark" : "light"} mode`}>
      {light ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
    </button>
  );
}
