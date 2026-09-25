import { useState } from "react";

/**
 * Shared budget input: currency choice (USD / KSh) + free amount.
 * Returns the composed string via onChange, e.g. "USD 1,500" or "KSh 80,000".
 */
export function BudgetField({
  label = "Your budget",
  value,
  onChange,
  dark = true,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  dark?: boolean;
}) {
  const [currency, setCurrency] = useState<"USD" | "KSh">("USD");
  const [amount, setAmount] = useState("");

  const emit = (cur: string, amt: string) => {
    onChange(amt.trim() ? `${cur} ${amt.trim()}` : "");
  };

  return (
    <fieldset>
      <legend className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 mb-4">{label}</legend>
      <div className="flex flex-wrap items-center gap-2">
        {(["USD", "KSh"] as const).map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => {
              setCurrency(c);
              emit(c, amount);
            }}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              currency === c ? "bg-neon text-black border-neon" : "border-white/20 hover:border-neon hover:text-neon"
            }`}
          >
            {c}
          </button>
        ))}
        <input
          type="text"
          inputMode="numeric"
          value={amount}
          onChange={(e) => {
            const v = e.target.value.replace(/[^\d,.\s]/g, "").slice(0, 20);
            setAmount(v);
            emit(currency, v);
          }}
          placeholder={currency === "USD" ? "e.g. 1,500" : "e.g. 80,000"}
          className={`flex-1 min-w-[140px] bg-transparent border-b border-white/20 py-2 text-lg outline-none focus:border-neon transition-colors placeholder:text-white/30 ${dark ? "text-white" : ""}`}
        />
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-white/35">
        A rough range is fine — I scope to fit, and I'll be honest if a brief isn't a match
      </p>
    </fieldset>
  );
}
