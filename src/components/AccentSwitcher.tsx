"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { accents, accentKeys, DEFAULT_ACCENT } from "@/lib/accents";

const STORAGE_KEY = "accent";

// The panel is only ever measured on the client, but the hook itself still runs
// during the server render, where useLayoutEffect warns.
const useMeasure = typeof window === "undefined" ? useEffect : useLayoutEffect;

const T = {
  en: { open: "Accent colour", current: (n: string) => `Accent colour: ${n}` },
  el: { open: "Χρώμα τόνου", current: (n: string) => `Χρώμα τόνου: ${n}` },
};

/**
 * Lets a visitor recolour the site's accent from a curated set of ten.
 *
 * The chosen key goes on <html data-accent>, and the cascade does the rest:
 * every accent-bearing rule already reads --accent-rgb. Nothing is re-rendered
 * and there is no context, which is also why the two locked pages need no
 * special case here: their scoped theme redefines the same variables on a
 * descendant and wins on specificity whatever is picked.
 *
 * The layout's inline boot script, not this component, is what applies the
 * stored choice on load. This only writes it.
 */
export default function AccentSwitcher() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const [current, setCurrent] = useState(DEFAULT_ACCENT);
  const panelId = useId(); // two instances can be mounted on one page
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // The boot script has already put the stored choice on <html>, so read it
  // from there rather than from storage again: one source of truth, and it
  // keeps the server render (which knows nothing) free of a mismatch.
  useEffect(() => {
    const a = document.documentElement.dataset.accent;
    if (a && accentKeys.includes(a)) setCurrent(a);
  }, []);

  const choose = (key: string) => {
    document.documentElement.dataset.accent = key;
    setCurrent(key);
    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch {
      // Private mode. The choice still applies for this page view.
    }
  };

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  // Move focus into the panel on open, onto the selected swatch.
  useEffect(() => {
    if (!open) return;
    panelRef.current
      ?.querySelector<HTMLElement>('[aria-checked="true"]')
      ?.focus();
  }, [open]);

  // Ten rows is taller than the gap below the trigger in the headers that sit
  // at the foot of a sidebar, and those panels have nothing to scroll inside,
  // so the last swatches would simply be unreachable. Measure live rather than
  // assuming a height: the panel is text, and the Greek labels are longer.
  useMeasure(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;
    const below = window.innerHeight - trigger.getBoundingClientRect().bottom;
    setUp(below < panel.offsetHeight + 16);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
        close(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    // Only the radiogroup is focusable in here, so Tab has nowhere to go:
    // hold it rather than dropping the visitor behind an open panel.
    if (e.key === "Tab") {
      e.preventDefault();
      return;
    }
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    const jump = e.key === "Home" ? 0 : e.key === "End" ? accents.length - 1 : null;
    if (step === undefined && jump === null) return;
    e.preventDefault();
    const i = accents.findIndex((a) => a.key === current);
    // Arrow keys in a radiogroup move and select in one gesture, and wrap.
    const next =
      jump !== null ? jump : (i + step! + accents.length) % accents.length;
    choose(accents[next].key);
    panelRef.current
      ?.querySelectorAll<HTMLElement>('[role="radio"]')
      [next]?.focus();
  };

  const name = (key: string) =>
    accents.find((a) => a.key === key)?.label[lang] ?? key;

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={t.current(name(current))}
        className="flex h-5 w-5 items-center justify-center rounded-full border border-stone-dark transition-colors duration-200 hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          onKeyDown={onPanelKeyDown}
          className={`absolute right-0 z-[140] w-44 rounded-xl p-1.5 ${
            up ? "bottom-7" : "top-7"
          }`}
          style={{
            background: "rgba(13,13,13,0.96)",
            border: "1px solid rgb(var(--accent-rgb) / 0.25)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
          }}
        >
          <div role="radiogroup" aria-label={t.open}>
            {accents.map((a) => {
              const on = a.key === current;
              return (
                <button
                  key={a.key}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => {
                    choose(a.key);
                    close();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left font-mono text-[0.7rem] tracking-wide transition-colors duration-150 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                  style={{ color: on ? `rgb(${a.rgb})` : undefined }}
                >
                  <span
                    aria-hidden="true"
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{
                      background: `rgb(${a.rgb})`,
                      // The ring is what marks the choice for anyone who cannot
                      // tell these ten apart by colour; the tick below is the
                      // other half of that.
                      boxShadow: on ? `0 0 0 2px rgba(13,13,13,1), 0 0 0 3.5px rgb(${a.rgb})` : undefined,
                    }}
                  />
                  <span className={on ? "" : "text-stone-light"}>{a.label[lang]}</span>
                  <span aria-hidden="true" className="ml-auto text-[0.8rem] leading-none">
                    {on ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
