import { Mail, Phone } from "lucide-react";

/** Familiar contact cues; decorative only, with labels kept alongside them. */
export function CraftIcon({ name, className = "" }: { name: "email" | "phone" | "WhatsApp"; className?: string }) {
  const Icon = name === "email" ? Mail : Phone;
  return <span className={`craft-icon ${className}`} aria-hidden="true"><Icon size={20} strokeWidth={1.5} focusable="false" /></span>;
}
