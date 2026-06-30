"use client";

import { useEffect, useRef, useState } from "react";
import Keypad from "./Keypad";

/**
 * Renders a name and turns one inconspicuous letter into a hidden trigger.
 * It takes FIVE clicks on the first δ / d / D to open the keypad — the glyph is
 * styled to be indistinguishable from the surrounding text, so a viewer gets no
 * hint. Clicks reset if more than 2s pass between them.
 *
 * `inlineKeypad` (desktop): the keypad pops out as a small panel to the LEFT of
 * the name, matching its height. Otherwise (mobile): a full-screen overlay.
 */
const TRIGGERS = ["δ", "d", "D"];
const CLICKS_TO_OPEN = 5;

export default function SecretName({
  name,
  inlineKeypad = false,
}: {
  name: string;
  inlineKeypad?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const clicks = useRef(0);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    []
  );

  let idx = -1;
  let ch = "";
  for (const t of TRIGGERS) {
    const i = name.indexOf(t);
    if (i !== -1) {
      idx = i;
      ch = t;
      break;
    }
  }
  if (idx === -1) return <>{name}</>;

  const handleClick = () => {
    if (open) return;
    clicks.current += 1;
    if (clicks.current >= CLICKS_TO_OPEN) {
      clicks.current = 0;
      setOpen(true);
      return;
    }
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      clicks.current = 0;
    }, 2000);
  };

  const close = () => setOpen(false);

  const letter = (
    <span className="secret-letter" onClick={handleClick} aria-hidden="true">
      {ch}
    </span>
  );

  if (!inlineKeypad) {
    return (
      <>
        {name.slice(0, idx)}
        {letter}
        {name.slice(idx + 1)}
        {open && <Keypad variant="overlay" onClose={close} />}
      </>
    );
  }

  return (
    <span className="relative inline-block">
      {name.slice(0, idx)}
      {letter}
      {name.slice(idx + 1)}
      {open && (
        <span className="absolute right-full inset-y-0 mr-3 z-50 block">
          <Keypad variant="inline" onClose={close} />
        </span>
      )}
    </span>
  );
}
