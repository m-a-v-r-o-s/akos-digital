"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/components/LanguageContext";
import { accents, accentKeys, DEFAULT_ACCENT } from "@/lib/accents";

const STORAGE_KEY = "accent";

// Swatches per row. The grid tracks and the arrow keys both read this, so the
// keyboard keeps matching what is on screen if the shape ever changes.
const COLS = 4;

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
  const [at, setAt] = useState<{ top: number; left: number } | null>(null);
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

  // Move focus into the panel on open, onto the selected swatch. Waits for the
  // measurement below, so focus lands on a panel that is already where the
  // visitor can see it. preventScroll because it is fixed: there is nothing to
  // scroll it into view, and trying would move the page underneath.
  useEffect(() => {
    if (!open || !at) return;
    panelRef.current
      ?.querySelector<HTMLElement>('[aria-checked="true"]')
      ?.focus({ preventScroll: true });
  }, [open, at]);

  /**
   * The panel is portalled to the body and positioned in viewport coordinates.
   *
   * It has to be: every header sits inside a .fade-up, whose animation fills
   * forwards and so leaves a transform in effect on the element. That makes a
   * stacking context, which traps any z-index set inside it, and the panel was
   * rendering underneath the cookie banner. No z-index on the panel can fix
   * that from within, and the end keyframe cannot either: a filled transform
   * animation resolves to an identity matrix rather than none, which still
   * makes the context. Leaving the subtree is the fix.
   *
   * Both axes are measured rather than assumed: the headers at the foot of a
   * sidebar have no room below them and nothing to scroll inside, and the
   * right-hand ones would otherwise run off the edge on a phone.
   */
  useMeasure(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;
    const t = trigger.getBoundingClientRect();
    const { offsetWidth: pw, offsetHeight: ph } = panel;
    const gap = 8;
    const below = window.innerHeight - t.bottom;
    setAt({
      top: below < ph + gap ? Math.max(gap, t.top - ph - gap) : t.bottom + gap,
      left: Math.min(Math.max(gap, t.right - pw), window.innerWidth - pw - gap),
    });
  }, [open]);

  // A fixed panel does not follow its trigger, so close rather than drift.
  useEffect(() => {
    if (!open) return;
    const onScroll = () => close(false);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
    };
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
    // The swatches are laid out as a grid, so up and down move a whole row.
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: COLS, ArrowUp: -COLS }[e.key];
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

      {open && createPortal(
        <div
          ref={panelRef}
          id={panelId}
          onKeyDown={onPanelKeyDown}
          className="fixed z-[140] rounded-xl p-1.5"
          style={{
            // Parked off screen for the one frame between mounting and being
            // measured, rather than flashing in the top left corner. Off screen
            // rather than visibility:hidden, because a hidden element cannot
            // take focus and the keyboard path opens by focusing a swatch.
            top: at?.top ?? -9999,
            left: at?.left ?? -9999,
            background: "rgba(13,13,13,0.96)",
            border: "1px solid rgb(var(--accent-rgb) / 0.25)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
          }}
        >
          <div
            role="radiogroup"
            aria-label={t.open}
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${COLS}, auto)` }}
          >
            {accents.map((a) => {
              const on = a.key === current;
              return (
                <button
                  key={a.key}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  tabIndex={on ? 0 : -1}
                  // The swatches carry no visible text, so the name lives here
                  // for a screen reader and in the title for a pointer.
                  aria-label={a.label[lang]}
                  title={a.label[lang]}
                  onClick={() => {
                    choose(a.key);
                    close();
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 items-center justify-center rounded-full text-[0.7rem] font-bold leading-none"
                    style={{
                      background: `rgb(${a.rgb})`,
                      color: "var(--ink)",
                      // The tick is what marks the choice for anyone who cannot
                      // tell these ten apart by colour. Without it the selected
                      // swatch would differ from the rest only in being the
                      // bright one, which is no signal at all.
                      boxShadow: on
                        ? `0 0 0 2px rgba(13,13,13,1), 0 0 0 3.5px rgb(${a.rgb})`
                        : undefined,
                    }}
                  >
                    {on ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
