"use client";

import { useEffect } from "react";

/**
 * Mobile keyboard helpers, mounted once in the root layout:
 *
 *  1. When a text field is focused, scroll it into the middle of the visible
 *     area once the on-screen keyboard has opened, so it isn't hidden behind it.
 *  2. Pressing Enter in a single-line input advances focus to the next typeable
 *     field (there are no <form> elements, so browsers wouldn't otherwise). The
 *     focus is moved synchronously within the key gesture so the keyboard stays
 *     open, and the new field is then scrolled out from behind it.
 *
 * Gated to touch / small screens so desktop behaviour is untouched.
 */

// Fields the user actually types into (excludes checkboxes, buttons, etc.)
const TEXT_SELECTOR =
  "input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]):not([type=reset]):not([type=hidden]), textarea";

function typeableFields(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(TEXT_SELECTOR)).filter(
    (el) =>
      !(el as HTMLInputElement | HTMLTextAreaElement).disabled &&
      el.offsetParent !== null
  );
}

export default function KeyboardAwareFocus() {
  useEffect(() => {
    const isMobile =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    if (!isMobile) return;

    let timer: ReturnType<typeof setTimeout>;

    const reveal = (el: HTMLElement) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    };

    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      if (el.tagName !== "INPUT" && el.tagName !== "TEXTAREA") return;

      // Label the keyboard's action key: "next" when another field follows.
      if (el.tagName === "INPUT") {
        const fields = typeableFields();
        const idx = fields.indexOf(el);
        el.setAttribute("enterkeyhint", idx >= 0 && fields[idx + 1] ? "next" : "done");
      }
      reveal(el);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const el = e.target as HTMLElement | null;
      // Textareas keep their newline behaviour; only single-line inputs advance.
      if (!el || el.tagName !== "INPUT") return;

      const fields = typeableFields();
      const idx = fields.indexOf(el);
      const next = idx >= 0 ? fields[idx + 1] : null;
      if (!next) return; // nothing after this field — let other Enter handlers run

      e.preventDefault();
      next.focus();
      reveal(next);
    };

    window.addEventListener("focusin", onFocusIn);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
