import { useState } from "react";

export function CopyContactButton({ value, label }: { value: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    let copied = false;
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
    } catch {
      // Support browsers where clipboard permissions or secure context are unavailable.
      const field = document.createElement("textarea");
      const previousFocus = document.activeElement as HTMLElement | null;
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.append(field);
      field.select();
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      } finally {
        field.remove();
        previousFocus?.focus({ preventScroll: true });
      }
    }
    setStatus(copied ? "copied" : "failed");
  }

  return (
    <div className="shrink-0 flex flex-col items-end">
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="min-h-11 min-w-20 px-3 font-mono text-[10px] uppercase tracking-widest text-ink/70 hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-neon focus-visible:outline-offset-2"
      >
        {status === "copied" ? "✓ Copied" : "Copy"}
      </button>
      <span className="sr-only" role="status">
        {status === "copied"
          ? `${label} copied to clipboard.`
          : status === "failed"
            ? "Could not copy. Please select and copy the contact text."
            : ""}
      </span>
    </div>
  );
}
