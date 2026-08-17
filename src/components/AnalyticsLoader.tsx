"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { getCookieConsent } from "@/components/CookieConsent";

/** Loads Vercel Analytics only once the visitor has opted in via the cookie banner. */
export default function AnalyticsLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(getCookieConsent()?.analytics ?? false);
    sync();
    window.addEventListener("cookie-consent-changed", sync);
    return () => window.removeEventListener("cookie-consent-changed", sync);
  }, []);

  if (!enabled) return null;
  return <Analytics />;
}
