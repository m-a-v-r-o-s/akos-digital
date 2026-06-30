"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/** sha256("1289") — kept hashed so the code never appears literally in the bundle. */
const CODE_HASH = "0e0c8d9c5fa46e66bd8293289e410bbc9e35da10a211a4d5c3e0b64a373db54f";
const LENGTH = 4; // actual code length (auto-checks here)
const DOTS = 6; // number of indicator lights shown (only LENGTH ever light up)

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

export default function Keypad({
  onClose,
  variant = "overlay",
}: {
  onClose: () => void;
  variant?: "overlay" | "inline";
}) {
  const router = useRouter();
  const [entry, setEntry] = useState("");
  const [wrong, setWrong] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const press = (digit: string) => {
    setWrong(false);
    setEntry((s) => (s.length >= LENGTH ? s : s + digit));
  };
  const back = () => {
    setWrong(false);
    setEntry((s) => s.slice(0, -1));
  };

  // Keyboard support (both variants)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === "Backspace") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Inline variant has no full-screen scrim, so dismiss on outside click.
  useEffect(() => {
    if (variant !== "inline") return;
    const onDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [variant, onClose]);

  // Check once the code is complete.
  useEffect(() => {
    if (entry.length !== LENGTH) return;
    (async () => {
      if ((await sha256Hex(entry)) === CODE_HASH) router.push("/hello");
      else {
        setWrong(true);
        setTimeout(() => setEntry(""), 400);
      }
    })();
  }, [entry, router]);

  // ── Inline: small panel, sized by its parent to match the name's height ──
  if (variant === "inline") {
    return (
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className={`h-full flex flex-col gap-1.5 fade-up ${wrong ? "shake" : ""}`}
        style={{ width: "5.5rem" }}
      >
        <div className="flex justify-center gap-1.5 py-0.5">
          {Array.from({ length: DOTS }).map((_, i) => (
            <span
              key={i}
              className={`keypad-dot ${i < entry.length ? "keypad-dot-on" : ""}`}
              style={{ width: "0.35rem", height: "0.35rem" }}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1 flex-1">
          {KEYS.map((k, i) =>
            k === "" ? (
              <span key={i} />
            ) : (
              <button
                key={i}
                type="button"
                aria-label={k === "⌫" ? "delete" : k}
                className="keypad-key-sm"
                onClick={() => (k === "⌫" ? back() : press(k))}
              >
                {k}
              </button>
            )
          )}
        </div>
      </div>
    );
  }

  // ── Overlay: full-screen, centered, blurs the page behind (mobile) ──
  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center px-6 fade-up"
      style={{
        background: "rgba(13,13,13,0.45)",
        backdropFilter: "blur(18px) saturate(115%)",
        WebkitBackdropFilter: "blur(18px) saturate(115%)",
      }}
      onClick={onClose}
    >
      <div
        className={`flex flex-col items-center ${wrong ? "shake" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-3 mb-10">
          {Array.from({ length: DOTS }).map((_, i) => (
            <span key={i} className={`keypad-dot ${i < entry.length ? "keypad-dot-on" : ""}`} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {KEYS.map((k, i) =>
            k === "" ? (
              <span key={i} />
            ) : (
              <button
                key={i}
                type="button"
                aria-label={k === "⌫" ? "delete" : k}
                className="keypad-key"
                onClick={() => (k === "⌫" ? back() : press(k))}
              >
                {k}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
