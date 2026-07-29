"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageContext";

/**
 * Monitor frame is hidden for now — the phone is the only thumbnail shown,
 * on desktop too. Flip this back to `true` to bring the monitor back; the
 * <Monitor> component and its CSS are kept intact for that.
 */
const SHOW_MONITOR: boolean = false;

/** Viewport the phone-preview window opens at. */
const PHONE_W = 442;
const PHONE_H = 920;

/** Screen sizes, in px. Bezels are drawn around these by the .device CSS. */
const SCREEN = {
  monitor: { w: 96, h: 60 },
  phoneSmall: { w: 40, h: 87 },
  phoneLarge: { w: 54, h: 117 },
};

const phoneLabel = {
  en: "Open in phone view",
  el: "Άνοιγμα σε προβολή κινητού",
};

function screenVars(size: { w: number; h: number }) {
  return {
    "--screen-w": `${size.w}px`,
    "--screen-h": `${size.h}px`,
  } as React.CSSProperties;
}

/**
 * What sits behind the glass: the screenshot if present, and a letter tile if
 * there's no image or the file fails to load — so a missing screenshot never
 * renders as a broken image inside the bezel.
 */
function Screen({ image, title }: { image?: string; title: string }) {
  const [failed, setFailed] = useState(false);

  if (image && !failed) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover object-top project-screenshot"
      />
    );
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center text-gold opacity-40 text-xl font-display italic"
      style={{
        background:
          "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(13,13,13,0.5) 100%)",
      }}
    >
      {title.charAt(0)}
    </div>
  );
}

/** Desktop screenshot in a CSS monitor bezel, on a stand. */
function Monitor({ image, title }: { image?: string; title: string }) {
  return (
    <div className="device device-monitor" style={screenVars(SCREEN.monitor)}>
      <div className="device-monitor-body">
        <div className="device-screen">
          <Screen image={image} title={title} />
        </div>
      </div>
      <div className="device-monitor-stand" />
      <div className="device-monitor-base" />
    </div>
  );
}

/** Mobile screenshot in a CSS phone bezel. */
function Phone({
  image,
  title,
  size,
}: {
  image?: string;
  title: string;
  size: { w: number; h: number };
}) {
  return (
    <div className="device device-phone" style={screenVars(size)}>
      <div className="device-phone-body">
        <div className="device-screen">
          <Screen image={image} title={title} />
        </div>
      </div>
    </div>
  );
}

export default function ProjectThumb({
  image,
  imageMobile,
  href,
  title,
  variant = "stack",
}: {
  image?: string;
  imageMobile?: string;
  href?: string;
  title: string;
  /**
   * "stack" — monitor with the phone beneath it, from `sm` up.
   * "mobile" — the phone alone, for the phone layout.
   */
  variant?: "stack" | "mobile";
}) {
  const { lang } = useLanguage();

  if (variant === "mobile") {
    if (!imageMobile) return null;
    return (
      <Phone
        image={imageMobile}
        title={`${title} — mobile`}
        size={SCREEN.phoneLarge}
      />
    );
  }

  /**
   * Opens the live site in a window sized to a phone viewport, so the mobile
   * layout renders without the visitor having to reach for devtools. Modified
   * clicks (new tab, new window) are left to the browser.
   */
  const openPhoneView = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    e.stopPropagation();

    const left = Math.max(0, Math.round((window.screen.availWidth - PHONE_W) / 2));
    const top = Math.max(0, Math.round((window.screen.availHeight - PHONE_H) / 2));
    const win = window.open(
      href,
      "_blank",
      `popup=yes,width=${PHONE_W},height=${PHONE_H},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );

    if (win) win.opener = null;
    /* Popup blocked — fall back to a normal tab rather than swallowing the click. */
    else window.open(href, "_blank", "noopener,noreferrer");
  };

  /* With the monitor hidden the phone carries the card on its own, so it gets
     the larger of the two sizes. */
  const phone = (
    <Phone
      image={imageMobile}
      title={`${title} — mobile`}
      size={SHOW_MONITOR ? SCREEN.phoneSmall : SCREEN.phoneLarge}
    />
  );

  return (
    <div className="hidden sm:flex flex-col items-center gap-2 shrink-0">
      {SHOW_MONITOR && <Monitor image={image} title={title} />}
      {imageMobile &&
        (href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openPhoneView}
            title={phoneLabel[lang]}
            aria-label={`${title} — ${phoneLabel[lang]}`}
            className="relative z-20 block rounded-lg transition-opacity hover:opacity-80"
          >
            {phone}
          </a>
        ) : (
          phone
        ))}
    </div>
  );
}
