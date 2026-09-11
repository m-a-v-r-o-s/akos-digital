"use client";

import { usePathname } from "next/navigation";
import AccentSwitcher from "@/components/AccentSwitcher";
import LanguageToggle from "@/components/LanguageToggle";

/**
 * The controls that sit in every page's header. There is no shared header
 * component on this site: each page builds its own and mounts this, which is
 * why the rule about where the accent switcher may appear lives here, in the
 * one place it cannot be forgotten.
 *
 * The ESPA page and the smart-home sector page are exempt. Their palettes are
 * identity rather than taste: the ΕΣΠΑ cyan and green is a funding-programme
 * mark that has to be presented correctly, and the Home Assistant blue tells
 * anyone who recognises it which platform that work is built on. The cascade
 * already locks both, so the switcher would be inert there, and an inert
 * control reads as a bug. It is hidden instead.
 */
const LOCKED = [/\/espa$/, /\/sectors\/smarthome$/];

export default function HeaderControls() {
  const pathname = usePathname() ?? "";
  const locked = LOCKED.some((re) => re.test(pathname));

  return (
    <div className="flex items-center gap-3">
      {!locked && <AccentSwitcher />}
      <LanguageToggle />
    </div>
  );
}
