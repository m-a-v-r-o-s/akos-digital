"use client";

import { useEffect } from "react";

/**
 * On mobile, when a text field is focused the on-screen keyboard can cover it.
 * This scrolls the focused input/textarea into the middle of the visible area
 * once the keyboard has had time to open. Mounted once in the root layout, it
 * covers every form (request wizard, ESPA, passkey) without per-field wiring.
 *
 * Gated to touch / small screens so desktop focus behaviour is untouched.
 */
export default function KeyboardAwareFocus() {
  useEffect(() => {
    const isMobile =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    if (!isMobile) return;

    let timer: ReturnType<typeof setTimeout>;

    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const tag = el.tagName;
      if (tag !== "INPUT" && tag !== "TEXTAREA") return;

      // Wait for the keyboard to open and shrink the viewport, then reveal.
      clearTimeout(timer);
      timer = setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    };

    window.addEventListener("focusin", onFocusIn);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  return null;
}
