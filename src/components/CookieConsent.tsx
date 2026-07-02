"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

const STORAGE_KEY = "cookie-consent-v1";

export type Consent = { necessary: true; analytics: boolean; ts: number };

/** Read the stored choice (null = not decided yet). Use to gate optional scripts. */
export function getCookieConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

/** Re-open the banner so the user can change/withdraw consent (footer link). */
export function openCookiePreferences() {
  window.dispatchEvent(new Event("open-cookie-preferences"));
}

const T = {
  en: {
    title: "Cookies",
    body: "This site uses essential cookies to function. With your consent, optional cookies such as analytics help me improve it. You're in control: accept, reject, or manage your preferences.",
    learnMore: "Learn more",
    acceptAll: "Accept all",
    rejectAll: "Reject all",
    manage: "Manage preferences",
    save: "Save preferences",
    alwaysOn: "Always on",
    necessary: "Strictly necessary",
    necessaryDesc: "Needed for the site to work, including security and remembering this choice.",
    analytics: "Analytics",
    analyticsDesc: "Anonymous statistics that help me understand how the site is used.",
  },
  el: {
    title: "Cookies",
    body: "Αυτός ο ιστότοπος χρησιμοποιεί απαραίτητα cookies για να λειτουργεί. Με τη συγκατάθεσή σου, προαιρετικά cookies όπως analytics με βοηθούν να τον βελτιώσω. Έχεις τον έλεγχο: αποδοχή, απόρριψη ή διαχείριση προτιμήσεων.",
    learnMore: "Μάθε περισσότερα",
    acceptAll: "Αποδοχή όλων",
    rejectAll: "Απόρριψη όλων",
    manage: "Διαχείριση προτιμήσεων",
    save: "Αποθήκευση προτιμήσεων",
    alwaysOn: "Πάντα ενεργά",
    necessary: "Απολύτως απαραίτητα",
    necessaryDesc: "Απαραίτητα για τη λειτουργία του ιστότοπου, όπως ασφάλεια και η αποθήκευση αυτής της επιλογής.",
    analytics: "Analytics",
    analyticsDesc: "Ανώνυμα στατιστικά που με βοηθούν να καταλάβω πώς χρησιμοποιείται ο ιστότοπος.",
  },
};

export default function CookieConsent() {
  const { lang } = useLanguage();
  const t = T[lang];

  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!getCookieConsent()) setVisible(true);
    const onOpen = () => {
      const cur = getCookieConsent();
      setAnalytics(cur?.analytics ?? false);
      setShowPrefs(true);
      setVisible(true);
    };
    window.addEventListener("open-cookie-preferences", onOpen);
    return () => window.removeEventListener("open-cookie-preferences", onOpen);
  }, []);

  const persist = (analyticsChoice: boolean) => {
    const consent: Consent = { necessary: true, analytics: analyticsChoice, ts: Date.now() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      /* ignore */
    }
    setVisible(false);
    setShowPrefs(false);
    // Let any consent-gated code (e.g. analytics loader) react.
    window.dispatchEvent(new Event("cookie-consent-changed"));
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[130] flex justify-center sm:justify-start p-4 sm:p-6 pointer-events-none"
      role="dialog"
      aria-label={t.title}
      aria-live="polite"
    >
      <div
        className="pointer-events-auto w-full sm:max-w-md rounded-xl p-5 fade-up"
        style={{
          background: "rgba(13,13,13,0.92)",
          border: "1px solid rgba(201,168,76,0.25)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
        }}
      >
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold mb-3">
          <span className="ornament">— </span>
          {t.title}
        </p>

        {!showPrefs ? (
          <>
            <p className="text-sm text-stone leading-relaxed mb-4">
              {t.body}{" "}
              <Link href="/terms" className="gold-link">
                {t.learnMore}
              </Link>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => persist(true)} className="cta-button">
                {t.acceptAll}
              </button>
              <button
                onClick={() => persist(false)}
                className="inline-flex items-center rounded-full px-6 py-3 font-mono text-xs tracking-widest uppercase text-paper border border-stone-dark hover:border-gold-light transition-colors"
              >
                {t.rejectAll}
              </button>
              <button
                onClick={() => setShowPrefs(true)}
                className="font-mono text-xs tracking-widest uppercase text-stone hover:text-gold-light transition-colors"
              >
                {t.manage}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-4 mb-5">
              {/* Necessary — locked on */}
              <div className="flex items-start gap-3">
                <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-gold opacity-60" />
                <div className="min-w-0">
                  <p className="text-sm text-paper font-medium">
                    {t.necessary}
                    <span className="ml-2 font-mono text-[0.6rem] uppercase tracking-widest text-stone-dark">
                      {t.alwaysOn}
                    </span>
                  </p>
                  <p className="text-xs text-stone leading-relaxed mt-0.5">{t.necessaryDesc}</p>
                </div>
              </div>
              {/* Analytics — optional */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-gold cursor-pointer"
                />
                <div className="min-w-0">
                  <p className="text-sm text-paper font-medium">{t.analytics}</p>
                  <p className="text-xs text-stone leading-relaxed mt-0.5">{t.analyticsDesc}</p>
                </div>
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => persist(analytics)} className="cta-button">
                {t.save}
              </button>
              <button
                onClick={() => persist(true)}
                className="font-mono text-xs tracking-widest uppercase text-stone hover:text-gold-light transition-colors"
              >
                {t.acceptAll}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
